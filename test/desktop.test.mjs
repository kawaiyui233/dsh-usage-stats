import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { renderClient } from '../scripts/build.mjs'
import { apply, inject } from '../src/index.js'

test('the bundle mounts both plugin halves on the web profile', () => {
  const patch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
  // Web edition: the upstream desktop-profile gate is gone, so the row has no
  // `disabled:` expression at all and stays enabled on every profile.
  assert.doesNotMatch(patch, /disabled:\s*!!js/, 'the web edition must not gate on profileContext')
  assert.match(patch, /name: '@kawaiyui233\/dsh-usage-stats'/)
  // The client bundle format stays `web`: the Web UI and Electron share it, and
  // DSH's client-modules scanner would skip any other platform value.
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
  assert.equal(pkg.dsh.client.platform, 'web')
  // profileContext is no longer a hard dependency of the host half.
  assert.ok(!inject.includes('profileContext'))
  assert.deepEqual(inject, ['sessionQuery', 'webServer', 'timer'])
})

test('a web host mounts the routes and starts timers like any supported host', async () => {
  // The host half no longer short-circuits on profileContext, so `apply` reaches
  // the services it actually needs. Assert it asks only for those services.
  const requested = []
  const registered = []
  const services = {
    sessionQuery: { listSessions: async () => [] },
    webServer: { register(route) { registered.push(route.path); return () => {} } },
  }
  apply({
    get(service) { requested.push(service); return services[service] },
    effect(callback) { const dispose = callback(); return typeof dispose === 'function' ? dispose : () => {} },
    interval: () => () => {},
    on: () => () => {},
  })
  assert.ok(!requested.includes('profileContext'), 'the web edition must not consult profileContext')
  assert.deepEqual(requested.includes('webServer'), true)
  assert.ok(registered.length > 0, 'the host half must register its /api routes')
})

test('browser clients without an Electron preload bridge still register the settings section', () => {
  const source = renderClient()
  // A plain browser tab has no `window.dshDesktop`. Upstream bailed out here,
  // which is exactly why the settings page never appeared on the Web UI.
  let plugin
  const registrations = []
  const slots = {
    inject(_name, callback) { return callback() },
    register(options) { registrations.push(options.id); return () => {} },
  }
  vm.runInNewContext(source, {
    window: {
      localStorage: { getItem: () => null },
      __ModuleLoader__: { load(definition) { plugin = definition.factory(() => ({})) } },
    },
    document: { getElementById: () => null, createElement: () => ({}), head: { appendChild() {} } },
    URLSearchParams,
    fetch() { assert.fail('registering the settings section must not issue requests') },
  })
  plugin.apply({
    get: name => name === 'slots' ? slots : undefined,
    effect(callback, label) { return label === 'dsh-usage-stats: settings section' ? callback() : () => {} },
  })
  assert.deepEqual(registrations, ['usage-stats'])
})

test('browser clients without the slots service stay inert', () => {
  const source = renderClient()
  for (const slots of [undefined, null]) {
    let plugin
    vm.runInNewContext(source, {
      window: {
        localStorage: { getItem() { assert.fail('the browser must not restore preferences without slots') } },
        __ModuleLoader__: { load(definition) { plugin = definition.factory(() => ({})) } },
      },
      document: new Proxy({}, { get() { assert.fail('the renderer must not touch the DOM without slots') } }),
      fetch() { assert.fail('the renderer must not request host data without slots') },
    })
    plugin.apply({
      get: () => slots,
      effect() { assert.fail('the renderer must not register effects without slots') },
    })
  }
})
