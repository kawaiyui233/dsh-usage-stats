<p align="center">
  <img src="screenshots/icon.svg" alt="dsh-usage-stats" width="80" height="80">
</p>

<h1 align="center">dsh-usage-stats</h1>

<p align="center">
  <strong>See your token usage, balances, and provider quotas inside DSH.</strong><br>
  A local usage dashboard for <a href="https://github.com/deepseek-ai/deepseek-harness">DeepSeek Harness Web</a>.
</p>

<p align="center">
  <a href="#installation"><img src="https://img.shields.io/badge/DSH-Web-2563eb?style=flat-square" alt="DSH Web"></a>
  <a href="https://github.com/kawaiyui233/dsh-usage-stats/releases/latest"><img src="https://img.shields.io/badge/release-v1.0.1--web.1-64748b?style=flat-square" alt="Plugin version 1.0.1-web.1"></a>
  <a href="https://github.com/kawaiyui233/dsh-usage-stats"><img src="https://img.shields.io/badge/Web%20edition-kawaiyui233-7c3aed?style=flat-square" alt="Web edition"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-22c55e?style=flat-square" alt="Apache 2.0 license"></a>
</p>

<p align="center">
  <a href="README.md">简体中文</a><br>
  <a href="https://github.com/kawaiyui233/dsh-usage-stats/releases/latest">Download</a> ·
  <a href="#features">Features</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#usage">Usage</a> ·
  <a href="#faq">FAQ</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="https://github.com/kawaiyui233/dsh-usage-stats/issues">Feedback</a>
</p>

<p align="center">
  <a href="screenshots/usage.png"><img src="screenshots/usage.png" alt="Usage overview, hourly tokens and calendar heatmap" width="800"></a>
</p>

<p align="center"><sub>Today's usage, lifetime totals, and usage patterns.</sub></p>

<table align="center">
  <thead>
    <tr><th align="center">Quotas</th><th align="center">Controls</th></tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><a href="screenshots/quotas.png"><img src="screenshots/quotas.png" alt="Provider balances and account credits" width="400"></a></td>
      <td align="center"><a href="screenshots/controls.png"><img src="screenshots/controls.png" alt="Model features, display preferences and query sources" width="400"></a></td>
    </tr>
    <tr>
      <td align="center">Check provider balances, account credits and quota windows.</td>
      <td align="center">Set model features, display preferences and custom quota queries.</td>
    </tr>
  </tbody>
</table>

<p align="center">
  <a href="screenshots/detection.png"><img src="screenshots/detection.png" alt="Detection candidates, library confidence and sample status" width="800"></a>
</p>

<p align="center"><sub>LM Fingerprint candidate rankings, sample status and incurred usage.</sub></p>

## Features

| Tab | What you can do |
| --- | --- |
| **Usage** | View today's and lifetime tokens, active days, hourly calls, daily/weekly heatmaps, trends, model breakdowns and output speed. |
| **Quotas** | Check provider balances, account credits and quota windows, with manual or scheduled refresh and custom queries. |
| **Detection** | Select a provider and model independently, confirm a budget, then run LM Fingerprint sampling and review request progress, sample status, candidate rankings and saved results. |
| **Controls** | Adjust display preferences, quota query settings, the advanced model selector and per-model reasoning levels. |

- **Follow usage trends:** browse daily/weekly heatmaps, switch between 7/30-day trends and compare providers and models.
- **Compare output speed:** rank models by TPS and show average time to first token (TTFT); samples without valid timing are excluded from speed rankings.
- **Refresh quotas on demand:** use DSH credentials for configured providers. Account quotas require the corresponding plugin or host service. Automatic refresh is off by default.
- **Consistent number units:** large values use `k` / `M` / `B` across Chinese, English and Japanese.
- **Run independent detection:** follow model selection, budget confirmation and results. Use three samples by default or one for screening, with progress, cancellation, timeouts and usage budgets.
- **Adjust model settings:** control the advanced model selector and reasoning features independently while retaining model properties, parameter mappings and saved preferences.
- **Follow the application language:** Chinese, English and Japanese UI text follows DSH's selected language; custom names and quota labels remain unchanged.
- **See WorkBuddy credits:** the quota tab shows total remaining credits, credits used today, and each package's remaining/size/expiry, plus per-account usage for today.

Detection compares random-number samples with a reference library. Rankings and library confidence measure similarity to known candidates; they do not prove model identity or capability. Reading catalogs, budgets or saved results does not start inference.

## Installation (Web edition)

This is version **1.0.1-web.1** (Web edition), for **DSH Web `0.2.1-rc.1` – `0.2.1-rc.3`**. The upstream desktop-profile restriction is removed, so it mounts on the `web` profile.

### Install from this repository

In DSH Web, open **Plugins → Add plugin**, paste the address below into **Package name or address**, and click **Install**:

```text
github:kawaiyui233/dsh-usage-stats
```

The full Git URL works too:

```text
https://github.com/kawaiyui233/dsh-usage-stats.git
```

The build output `lib/` is committed, so nothing is built locally during installation. Click **Enable now**, reload the page, then open **Settings → Usage Stats**.

> This edition is **not published to npm** — install it only from the GitHub repository address above. Because the source is a repository rather than an npm name, the plugin page's **Check updates** does not apply; to update, uninstall and reinstall from the same address.

### Relationship to upstream

- Upstream: [`Jockjrop/dsh-usage-stats`](https://github.com/Jockjrop/dsh-usage-stats) (`@sligqoer/dsh-usage-stats`, Apache-2.0).
- This repository is **kawaiyui233's Web edition**, published as `@kawaiyui233/dsh-usage-stats` with version `1.0.1-web.1` to distinguish it from upstream.
- See "Web edition changes" below for the diff.

## Usage

1. Open Usage for the overview, trends, heatmaps and output speed. Use Controls to adjust model breakdown and speed visibility.
2. Refresh provider or account cards in Quotas. Automatic refresh is off by default; enable it in Controls after confirming the notice.
3. Select a provider and model in Detection, set sample counts and output limits, click **Preview detection budget**, then confirm with **Start detection (uses tokens)**. Reading catalogs or saved results never starts detection.
4. Use Controls to toggle the advanced model selector, reasoning features and detection independently, or edit custom quota queries.

Detection guides you through choosing a model, confirming the budget and reviewing results. Changing the model or parameters requires a new budget preview. While a test runs, you can follow request progress and sample status or cancel it. Saved results retain their original model and parameters; detection details and engine information expand on demand.

## Web edition changes

This repository is a Web edition of upstream `Jockjrop/dsh-usage-stats`, modified by **kawaiyui233**.

| Item | Upstream | This repository |
| --- | --- | --- |
| Package | `@sligqoer/dsh-usage-stats` | `@kawaiyui233/dsh-usage-stats` |
| Version | `0.2.5` | `1.0.1-web.1` |
| Profile | `desktop` only | `web` and any profile providing the host services |
| Install source | npm / GitHub Release | GitHub repo `github:kawaiyui233/dsh-usage-stats` |

Changes:

1. **Profile gate removed** — `cordis.patch.yml` no longer carries `!!js "ctx.get('profileContext')?.name !== 'desktop'"`, so the row mounts on the `web` profile.
2. **Host-side profile check removed** — `apply()` in `src/index.js` no longer returns early for non-desktop profiles; it relies only on `sessionQuery`, `webServer` and `timer`, and `inject` drops `profileContext`.
3. **Renderer preload-bridge gate removed** — `apply()` in `src/client.js` no longer requires `window.dshDesktop`. A Web page has no Electron preload bridge, so upstream bailed out there and never registered the settings page; it now registers whenever the `slots` service exists.
4. **Renamed and re-versioned** — package name, version, repository URLs, README, CHANGELOG and locale descriptions all updated.
5. **Tests realigned** — assertions that "non-desktop profiles never mount" were rewritten to Web semantics.

The upstream `/api/dsh-usage-stats/*` loopback trust fence is retained, and the data directory and cache file locations are unchanged, so upgrading preserves saved usage.

### WorkBuddy credits and daily usage

The WorkBuddy card on the quota tab talks to the installed `dsh-connect-workbuddy` plugin:

- It reads `GET /plugins/dsh-connect-workbuddy/usage?region=cn|global` and shows total credits, per-package rows (remaining / size / expiry) and check-in status.
- It reads only when the quota tab opens or on manual refresh: each upstream call is roughly 60 KB and takes 6-20 seconds, so there is no background polling.
- **Daily per-account usage is derived, not reported.** The upstream exposes only a current balance, with no "used today" field. On each read the plugin compares the same account's balance with the previous reading, counts the drop as today's consumption, and persists it to `usage-stats-workbuddy-daily.json`. Balance increases (top-ups, check-ins) only re-baseline and never cancel consumption already recorded, so the first day starts from zero.

## Data and compatibility

Local data is stored under `DSH_HOME/storages`:

| File or directory | Contents |
| --- | --- |
| `usage-stats-corpus.json` | Session usage aggregates. |
| `usage-stats-display.json` | Usage display preferences. |
| `usage-stats-quota-controls.json` | Query and model settings plus provider quota caches. |
| `usage-stats-detections.json` | Detection results and reported sample usage. |
| `usage-stats-lm-fingerprint/` | Verified engine and reference updates. |
| `usage-stats-supplemental.json` | Detection usage deduplicated by task and sample ID and retained across restarts. |

Conversation tokens come from DSH session logs. Detection usage is deduplicated by task and sample ID before aggregation. Request diagnostics are excluded from token totals. Updates retain saved configuration and usage history. On platforms that support it, these files are written owner-only.

After upgrading from 0.2.0, detection uses LM Fingerprint. The earlier behavioral references, KBF import/export and capability baseline tests are no longer provided; previously incurred detection usage remains available. Release packages exclude personal sessions, account credentials, quota caches and detection history; local caches are written with owner-only permissions.

## FAQ

**Does it work in DSH Web?**

This version supports only DSH Desktop's desktop profile.

**Why is a quota card missing or unavailable?**

Check provider configuration, credentials, enabled account plugins and support for the quota API. A model API key may not have billing permissions.

**Are token totals a bill?**

No. Token totals come from local sessions and reported detection usage. Balances and quota windows come from provider APIs.

**Can detection rankings prove model identity?**

No. Rankings measure similarity to the reference library. When the requested model is outside the library, candidates serve only as comparisons.

## API

The `dshUsageStats` host service uses `protocolVersion: 1` and exposes `readStats`, `readControls`, `updateControls`, `readProviderQuotas` and `readSupplementalUsage`.

HTTP routes under `/api/dsh-usage-stats/*` provide statistics, controls, quotas and detection. They require loopback access and trusted origins and disable caching.

## Development

Use Node.js 22 or later (development and CI use 24) and the dependencies pinned in `package-lock.json`:

```sh
npm ci
npm run lint
npm run build
npm test
npm run check:release
npm run release
```

Edit `src/` and run `npm run build` to generate `lib/`. `src/client.js` is the renderer template; the build inlines `client-messages.js`, `client-styles.js`, `client-format.js` and the other modules at their markers, so the shipped artifact is still a single `lib/client.js`. `npm run lint` checks syntax, JSON documents and the three-language table; `npm run check:release` checks versions, generated files, third-party integrity and private workspace files. `npm run release` builds the package and verifies installation and loading in an isolated temporary project; artifacts go to `release/`.

The GitHub workflow requires the tag to match the package version (`v1.0.1-web.1` for this release) and publishes the same verified archive to npm and GitHub Releases. The npm trusted publisher workflow file is `.github/workflows/release.yml`. Third-party assets, source revisions and licenses are recorded in `third_party/` and [NOTICE](NOTICE). This project uses the [Apache-2.0 license](LICENSE).
