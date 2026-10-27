/**
 * WorkBuddy daily-usage ledger.
 *
 * The WorkBuddy upstream API exposes only a CURRENT credit balance per
 * account (`fetchCredits`); it has no "used today" field, and
 * dsh-connect-workbuddy 5.x does not record one either. Daily usage is
 * therefore DERIVED here, from successive balance readings:
 *
 *   - every reading updates `lastSeen` for that account;
 *   - a DROP from the previous reading counts as consumption and is
 *     accumulated into `used`;
 *   - a RISE is a top-up (check-in, package refresh, a granted benefit) and
 *     re-baselines `lastSeen` without ever subtracting from `used`.
 *
 * That asymmetry is what keeps the number honest: a +100 daily check-in must
 * not cancel out real spending, and treating |delta| as usage would report a
 * grant as negative consumption.
 *
 * Readings are bucketed by LOCAL calendar day, so the ledger resets at
 * midnight without any timer. Only balances and account display names are
 * stored — never credentials, tokens or account ids.
 */
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { randomUUID } from 'node:crypto'

/** Keep a bounded window: today plus enough history to answer "yesterday". */
const KEEP_DAYS = 14
/** Cap the per-provider account list so a runaway roster cannot bloat the file. */
const MAX_ACCOUNTS = 200

const isPlain = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
const num = (value) => typeof value === 'number' && Number.isFinite(value) ? value : null
const text = (value) => typeof value === 'string' ? value.slice(0, 160) : ''

/** Local `YYYY-MM-DD` for the host's timezone. */
function localDay(now = Date.now()) {
  const date = new Date(now)
  const pad = (value) => String(value).padStart(2, '0')
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
}

export function createWorkBuddyDaily(path, { now = () => Date.now() } = {}) {
  let loaded = null
  let saveQueue = Promise.resolve()

  /** `{ day: { '<provider>': { accounts: { '<name>': {used, lastSeen} }, total: {used, lastSeen} } } }` */
  const load = () => loaded ||= (async () => {
    try {
      const parsed = JSON.parse(await readFile(path, 'utf8'))
      return isPlain(parsed) && isPlain(parsed.days) ? parsed : { days: Object.create(null) }
    } catch {
      return { days: Object.create(null) }
    }
  })()

  const persist = async (state) => {
    const payload = JSON.stringify(state)
    saveQueue = saveQueue.catch(() => {}).then(async () => {
      await mkdir(dirname(path), { recursive: true })
      const temp = path + '.' + randomUUID() + '.tmp'
      await writeFile(temp, payload, { encoding: 'utf8', mode: 0o600 })
      await rename(temp, path)
    })
    return saveQueue
  }

  /**
   * Fold one reading into the ledger.
   *
   * @param provider Source key (`workbuddy` / `workbuddy-ai`).
   * @param body     A `signed-in` WorkBuddy document from readWorkBuddyQuota.
   * @returns the day's summary, or null when the reading carries no balance.
   */
  const record = async (provider, body) => {
    if (!isPlain(body) || body.status !== 'signed-in') return null
    const credits = isPlain(body.credits) ? body.credits : null
    if (!credits) return null
    const total = num(credits.total)
    const balances = Array.isArray(credits.balances) ? credits.balances : []
    if (total === null && balances.length === 0) return null

    const state = await load()
    const day = localDay(now())
    if (!isPlain(state.days[day])) state.days[day] = Object.create(null)
    const slot = isPlain(state.days[day][provider]) ? state.days[day][provider] : { accounts: Object.create(null), total: null }
    if (!isPlain(slot.accounts)) slot.accounts = Object.create(null)

    const fold = (previous, value) => {
      const seen = num(previous && previous.lastSeen)
      const used = num(previous && previous.used) || 0
      if (value === null) return previous || { used: 0, lastSeen: null }
      // Only a decrease is consumption; an increase is a grant and merely
      // re-baselines. First sighting of the day establishes the baseline.
      const next = seen !== null && value < seen ? used + (seen - value) : used
      return { used: next, lastSeen: value }
    }

    if (total !== null) slot.total = fold(slot.total, total)
    for (const row of balances.slice(0, MAX_ACCOUNTS)) {
      if (!isPlain(row)) continue
      const name = text(row.accountName)
      const value = num(row.credits)
      if (name === '' || value === null) continue
      slot.accounts[name] = { ...fold(slot.accounts[name], value), current: row.current === true }
    }
    state.days[day][provider] = slot

    // Trim to the most recent KEEP_DAYS buckets.
    const days = Object.keys(state.days).sort()
    for (const stale of days.slice(0, Math.max(0, days.length - KEEP_DAYS))) delete state.days[stale]
    await persist(state)
    return summarize(state, provider, day)
  }

  const summarize = (state, provider, day) => {
    const slot = isPlain(state.days[day]?.[provider]) ? state.days[day][provider] : null
    if (!slot) return { date: day, accounts: [], totalUsed: 0, previousDate: null, previousTotalUsed: 0 }
    const accounts = Object.entries(slot.accounts || {}).map(([name, row]) => ({
      accountName: name,
      used: Math.round((num(row.used) || 0) * 100) / 100,
      credits: num(row.lastSeen),
      current: row.current === true,
    })).sort((left, right) => right.used - left.used)
    const previousDate = Object.keys(state.days).sort().filter((key) => key < day).pop() || null
    const previousSlot = previousDate && isPlain(state.days[previousDate]?.[provider]) ? state.days[previousDate][provider] : null
    return {
      date: day,
      accounts,
      totalUsed: Math.round((num(slot.total?.used) || 0) * 100) / 100,
      previousDate,
      previousTotalUsed: Math.round((num(previousSlot?.total?.used) || 0) * 100) / 100,
    }
  }

  /** Current day's ledger for one source, without touching the network. */
  const summary = async (provider) => {
    const state = await load()
    return summarize(state, provider, localDay(now()))
  }

  return { record, summary }
}
