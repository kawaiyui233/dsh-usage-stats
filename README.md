<p align="center">
  <img src="screenshots/icon.svg" alt="DSH 用量统计" width="80" height="80">
</p>

<h1 align="center">dsh-usage-stats</h1>

<p align="center">
  <strong>在 DSH 里，看清 Token 用量、账户余额与供应商配额。</strong><br>
  为 <a href="https://github.com/deepseek-ai/deepseek-harness">DeepSeek Harness Web 版</a>打造的本地用量面板。
</p>

<p align="center">
  <a href="#安装"><img src="https://img.shields.io/badge/DSH-Desktop-2563eb?style=flat-square" alt="DSH 桌面端"></a>
  <a href="https://github.com/kawaiyui233/dsh-usage-stats/releases/latest"><img src="https://img.shields.io/badge/release-v1.0.1--web.1-64748b?style=flat-square" alt="插件版本 1.0.1-web.1"></a>
  <a href="https://github.com/kawaiyui233/dsh-usage-stats"><img src="https://img.shields.io/badge/Web%20%E6%94%B9%E9%80%A0-kawaiyui233-7c3aed?style=flat-square" alt="Web 改造版"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-22c55e?style=flat-square" alt="Apache 2.0 许可"></a>
</p>

<p align="center">
  <a href="README.en.md">English</a><br>
  <a href="https://github.com/kawaiyui233/dsh-usage-stats/releases/latest">下载</a> ·
  <a href="#功能">功能</a> ·
  <a href="#安装">安装</a> ·
  <a href="#使用">使用</a> ·
  <a href="#常见问题">常见问题</a> ·
  <a href="CHANGELOG.md">更新日志</a> ·
  <a href="https://github.com/kawaiyui233/dsh-usage-stats/issues">反馈问题</a>
</p>

<p align="center">
  <a href="screenshots/usage.png"><img src="screenshots/usage.png" alt="用量面板：概览指标、今日图表与使用量热力图" width="800"></a>
</p>

<p align="center"><sub>查看今日与累计 Token、小时趋势和使用量热力图。</sub></p>

<table align="center">
  <thead>
    <tr><th align="center">配额</th><th align="center">控制</th></tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><a href="screenshots/quotas.png"><img src="screenshots/quotas.png" alt="供应商余额与账号积分" width="400"></a></td>
      <td align="center"><a href="screenshots/controls.png"><img src="screenshots/controls.png" alt="模型功能、展示偏好与查询来源" width="400"></a></td>
    </tr>
    <tr>
      <td align="center">集中查看供应商余额、账号积分和周期额度。</td>
      <td align="center">设置模型功能、展示偏好和自定义配额查询。</td>
    </tr>
  </tbody>
</table>

<p align="center">
  <a href="screenshots/detection.png"><img src="screenshots/detection.png" alt="模型检测：候选排名、库内置信度与采样状态" width="800"></a>
</p>

<p align="center"><sub>查看 LM Fingerprint 候选排名、采样状态和已发生用量。</sub></p>

## 功能

| 页面 | 你可以做什么 |
| --- | --- |
| **用量** | 查看今日与累计 Token、使用天数、小时调用次数、每日／每周热力图、趋势、模型明细与输出速度。 |
| **配额** | 集中查看供应商余额、账号积分与周期配额，支持手动或定时刷新及自定义查询。 |
| **检测** | 独立选择供应商和模型，确认预算后运行 LM Fingerprint 检测，查看请求进度、采样状态、候选排名与历史结果。 |
| **控制** | 调整展示偏好、配额查询设置、高级模型选择器与逐模型推理强度。 |

- **看清使用趋势**：按日／周浏览热力图，切换 7／30 天趋势，按供应商与模型查看用量。
- **比较输出速度**：按 TPS 排序，显示平均首 Token 耗时（TTFT）；缺少有效时间记录的样本不参与速度排名。
- **按需刷新配额**：通过 DSH 凭据服务查询已配置供应商，账号配额需要对应的账号插件或宿主服务。自动查询默认关闭。
- **统一数值单位**：大数值统一以 `k` / `M` / `B` 显示，中英日界面读法一致。
- **独立运行检测**：按步骤选择模型、确认预算并查看结果；默认采样 3 次，也可选择 1 次初筛，支持进度查看、取消、超时和用量预算控制。
- **调整模型设置**：分别控制高级模型选择器与模型推理强度，保留已有的模型属性、参数映射和个人设置。
- **跟随应用语言**：支持中文、英语和日语，随 DSH 所选语言切换；用户自定义名称与配额标签保持原样。
- **查看 WorkBuddy 积分**：在「配额」页直接看到剩余总积分、今日已用积分与各积分包的剩余/总量/到期时间，并按账号列出今日用量。

检测通过随机数样本与参考库对照。排名和库内置信度表示与已知候选的接近程度，不能证明模型身份或能力。读取模型目录、预算和历史结果不会启动推理。

## 安装（Web 版）

当前版本为 **1.0.1-web.1**（Web 改造版），适配 **DSH Web `0.2.1-rc.1` ~ `0.2.1-rc.3`**。本版本去除了上游的 desktop profile 限制，在 `web` profile 下即可挂载。

### 从本仓库安装

在 DSH Web 的 **插件 → 添加插件** 中，把下面的地址粘贴到 **包名或地址**，然后点击 **安装**：

```text
github:kawaiyui233/dsh-usage-stats
```

也可以使用完整 Git 地址：

```text
https://github.com/kawaiyui233/dsh-usage-stats.git
```

仓库中已经提交了构建产物 `lib/`，安装时不需要在本机构建。安装完成后点击 **立即启用**，刷新页面，进入 **设置 → 用量统计**。

> 本版本不会从 npm 发布，**只能通过上面的 GitHub 仓库地址安装**。因为仓库地址不是 npm 包名，插件页的「检查更新」不适用于本版本；需要更新时，先卸载再按同一地址重新安装。

### 与上游的关系

- 上游项目：[`Jockjrop/dsh-usage-stats`](https://github.com/Jockjrop/dsh-usage-stats)（`@sligqoer/dsh-usage-stats`，Apache-2.0）。
- 本仓库是 **kawaiyui233 的 Web 改造版**，包名为 `@kawaiyui233/dsh-usage-stats`，版本从上游 `0.2.5` 起跳为 `1.0.1-web.1`，用于区分上游版本。
- 改造内容见下方「Web 改造说明」。

## 使用

1. 在「用量」查看概览、趋势、热力图和输出速度；在「控制」调整模型明细与速度的显示。
2. 在「配额」点击供应商或账号卡片的刷新按钮。自动查询默认关闭，可在「控制」确认提示后开启。
3. 在「检测」选择供应商与模型，设置采样次数和输出上限，点击「查看检测预算」，确认后点击「开始检测（会消耗 Token）」。读取目录或历史结果不会启动检测。
4. 在「控制」分别开启或关闭高级模型选择器、模型推理强度和模型检测，编辑自定义配额查询。

检测页按「选择检测模型 → 确认预算 → 检测结果」提示当前步骤。更改模型或参数后，需要重新查看预算；检测中可查看请求进度、逐次采样状态并取消。历史结果保留原模型与参数，检测详情和指纹引擎信息可按需展开。

## Web 改造说明

本仓库是上游 `Jockjrop/dsh-usage-stats` 的 Web 改造版，改造者为 **kawaiyui233**。

| 项目 | 上游 | 本仓库 |
| --- | --- | --- |
| 包名 | `@sligqoer/dsh-usage-stats` | `@kawaiyui233/dsh-usage-stats` |
| 版本 | `0.2.5` | `1.0.1-web.1` |
| 运行 profile | 仅 `desktop` | `web` 及任何提供宿主服务的 profile |
| 安装来源 | npm / GitHub Release | GitHub 仓库 `github:kawaiyui233/dsh-usage-stats` |

具体改动：

1. **移除 profile 门禁**：`cordis.patch.yml` 删除了 `!!js "ctx.get('profileContext')?.name !== 'desktop'"` 判断，插件行在 `web` profile 下也会挂载。
2. **移除宿主侧 profile 判断**：`src/index.js` 的 `apply()` 删除了 `profileContext.name !== 'desktop'` 的提前返回，改为只依赖 `sessionQuery`、`webServer`、`timer` 三个宿主服务；`inject` 同步移除 `profileContext`。
3. **移除渲染器 preload 桥门禁**：`src/client.js` 的 `apply()` 删除了 `window.dshDesktop` 检查。Web 页面没有 Electron preload 桥，上游会在这里直接退出，导致设置页永远不注册；现在只要有 `slots` 服务就注册「用量统计」设置页。
4. **更名改版**：包名改为 `@kawaiyui233/dsh-usage-stats`，版本改为 `1.0.1-web.1`，仓库地址、README、CHANGELOG、locale 描述同步更新。
5. **测试对齐**：原先断言「非 desktop profile 不挂载」的测试改为断言 Web 语义（任意 profile 均挂载、浏览器无 preload 桥也能注册设置页）。

改造保留了上游的 `/api/dsh-usage-stats/*` 本机来源校验，data 目录与缓存文件位置不变，因此升级不会丢失已保存的用量记录。

### WorkBuddy 积分与每日用量

「配额」页的 WorkBuddy 卡片对接已安装的 `dsh-connect-workbuddy` 插件：

- 读取 `GET /plugins/dsh-connect-workbuddy/usage?region=cn|global`，显示总积分、积分包明细（剩余 / 总量 / 到期时间）与签到状态。
- 只在打开「配额」页或点刷新时读取一次；该上游接口每次约 60 KB、耗时 6–20 秒，不做后台轮询。
- **每日每账号用量是推算值**：上游接口只提供当前余额，没有「今日已用」字段。插件在每次读取时比较同一账号前后两次余额，余额下降的部分计入当日消耗并保存到 `usage-stats-workbuddy-daily.json`；充值、签到等余额上升只重新设定基准，不会冲抵已发生的消耗。因此首次安装的当天从 0 开始累计。

## 数据与兼容

本地数据位于 `DSH_HOME/storages`：

| 文件或目录 | 内容 |
| --- | --- |
| `usage-stats-corpus.json` | 会话用量汇总。 |
| `usage-stats-display.json` | 用量展示偏好。 |
| `usage-stats-quota-controls.json` | 查询和模型设置、供应商配额缓存。 |
| `usage-stats-detections.json` | 检测结果与逐次样本用量。 |
| `usage-stats-lm-fingerprint/` | 通过校验的指纹引擎与参考库更新。 |
| `usage-stats-supplemental.json` | 按任务和样本 ID 去重的检测用量，重启后保留。 |

普通对话从 DSH 会话日志计数，检测用量按任务和样本 ID 去重后计入统计。请求诊断日志不参与 Token 汇总。更新会保留已保存的配置与历史用量。上述文件在支持的平台上以仅当前用户可读的权限写入。

从 0.2.0 升级后，模型检测使用 LM Fingerprint，不再提供旧版行为参考、KBF 导入／导出和能力基线测试；已发生的检测用量继续保留。发布安装包不包含个人会话、账号凭据、配额缓存或检测历史；本地缓存以仅当前用户可读的权限写入。

## 常见问题

**支持 DSH Web 吗？**

支持。本仓库即 Web 改造版：去除了上游仅限 `desktop` profile 的限制，在 `web` profile 下会正常挂载设置页并注册 `/api/dsh-usage-stats` 路由。

**为什么配额卡片不显示或无法获取？**

先确认供应商已配置、凭据可用、账号插件已启用且账户支持对应配额接口。普通模型 API Key 可能没有账单查询权限。

**Token 总数就是账单金额吗？**

不是。Token 统计来自本地会话和已上报的检测用量，账户余额与周期额度来自供应商接口。

**检测排名能证明真实模型身份吗？**

不能。候选排名表示与参考库的接近程度；请求模型不在参考库时，候选仅供比较。

## 接口

宿主服务 `dshUsageStats` 使用 `protocolVersion: 1`，提供 `readStats`、`readControls`、`updateControls`、`readProviderQuotas` 和 `readSupplementalUsage`。

HTTP 接口使用 `/api/dsh-usage-stats/*`，提供统计、控制、配额查询与检测功能，仅接受本机与可信来源请求，并禁用缓存。

## 开发

使用 Node.js 22 或更高（开发与 CI 使用 24），并安装 `package-lock.json` 锁定的依赖：

```sh
npm ci
npm run lint
npm run build
npm test
npm run check:release
npm run release
```

修改 `src/` 后运行 `npm run build` 生成 `lib/`。`src/client.js` 是渲染器模板，`client-messages.js`、`client-styles.js`、`client-format.js` 等模块由构建按标记内联，发布产物仍是单个 `lib/client.js`。`npm run lint` 校验语法、JSON 文档与三语条目；`npm run check:release` 检查版本、构建一致性、第三方完整性与工作区隐私文件；`npm run release` 构建安装包并在独立临时项目中验证安装与加载，输出位于 `release/`。

GitHub 发布流程要求标签与包版本一致（本版为 `v1.0.1-web.1`），通过检查后使用同一份安装包发布 npm 与 GitHub Release。npm 可信发布对应的工作流文件为 `.github/workflows/release.yml`。第三方资源、来源版本和许可记录于 `third_party/` 与 [NOTICE](NOTICE)，本项目使用 [Apache-2.0 许可证](LICENSE)。
