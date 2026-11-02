# Alma for Android

Unofficial Android port of [Alma](https://alma.now) — same architecture as iOS Alma : **a thin Capacitor shell hosting the exact same React renderer that ships in the Mac app**. Zero re-implemented UI: the official mobile interface is activated through platform identity + bridge injection.

> 中文说明见下方。

## Quick build (self-contained)

```bash
npm install                 # Capacitor 7 CLI + plugins
npx cap sync android        # copy www/ (bundled renderer) into the Android project
cd android
JAVA_HOME=<jdk21> ./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

Requires JDK **21** and the Android SDK (platform 35). No other local dependencies — the Alma renderer is bundled in `www/` (included with the author's permission).

**Pairing**: on your Mac, open Alma → Settings → Remote Access, show the QR code; on Android: Settings → 我的 Mac → scan (grant camera on first scan). Chats run on your Mac over an E2E-encrypted relay. 

---

Alma 的非官方 Android 版：**Capacitor 壳 + 与 Mac 安装包完全相同的 React renderer**，与 yetone 的 iOS 端 Alma 同构。UI 通过平台身份补丁与桥注入直接激活。

## 架构（与 iOS Alma 同构）

```
┌─ Android 壳（Capacitor 7）──────────────────────────────┐
│ WebView (https scheme) + MainActivity 运行时 CAMERA 授权 │
│ platform 身份 = "android"                               │
├─ 桥层（两层，shim 先执行优先）─────────────────────────────┤
│ ① scripts/shim/alma-droid-shim.js                     │
│    platform.get→"android" / settingsWindow→settings.html│
│    / haptics / clipboard / ipcRenderer 降级面          │
│ ② connected chunk 迷你 boot（官方 JS 参考实现）          │
│    installElectronShim（≈45 桥）+ almaIOSConfig（配对）  │
│    + E2E fetch/WebSocket 拦截 + 官方 apiServerShim      │
└───────────────┬───────────────────────────────────────┘
                ↓ 加载 www/（Alma 官方 renderer 产物）
   手机 UI（composer/抽屉/配对/设置/本机会话）
                ↓ E2E 中继（P-256+HKDF+AES-GCM，纯 JS）
   relay.alma.now / 自建中继 ←→ Mac 端 Alma（MobileRelay）
```

yetone iOS 壳的原生桥（`almaIOSConfig` 等）在本项目中由 connected chunk 里的官方 JS 实现提供：`scripts/sync-assets.sh` 把它的 `boot()`（桌面 handoff 流程）替换为「只装桥不渲染」的迷你 boot，注入 index.html / settings.html。**注意不可调用 `installConnectedWindowBridges`**（它会以非 `??=` 方式覆盖 settingsWindow）。

## 目录

```
alma-android/
├── www/                    # Alma renderer
├── android/                # Capacitor Gradle 工程
├── scripts/sync-assets.sh  # 【可选】升级用：新版 renderer → www/ 全流程重建
├── scripts/shim/alma-droid-shim.js
├── scripts/shim/alma-screen-remote.js   # 远程屏幕（看/控 Mac，仅注入 index.html）
├── capacitor.config.json   # appId local.almaandroid.app / androidScheme https
└── package.json
```

## 补丁系统（sync-assets.sh，为适配 Android ）

| 块 | 作用 |
|---|---|
| 1 | 注入 shim（紧跟 `<body>`，首帧即手机布局；`alma-webview-gate.js` 纯 ES5，必须排最前） |
| 2 | 平台身份补丁 A–E：`isPhoneShell`/`isPhone`/`isIOS`(=手机壳语义)/PlatformProvider 初始 state 同步读 dataset/settings 标题栏 |
| 2.5 | composer chip `min-w-0`（修复长模型名把发送按钮挤出屏幕） |
| 2.7 | 手机设置语言行（跟随系统 / English·中文·日本語，词典补键） |
| 2.8 | 配对执行转发主帧（iframe 只解码，规避 iframe 桥环境差异） |
| 2.9 | 主题切换同步主帧 + 容忍 settings 未加载 |
| 3.0 | 手机 hero 移除「连接你的 Mac」配对引导块（入口保留在 设置→我的 Mac） |
| 3.5 | connected chunk 迷你 boot + 桥模块注入 |

## 机型适配（屏闪 / 状态栏 / 老 WebView 内核）

1. **屏闪（暗色下白闪）**——整条底色链统一为主题色（light `#ffffff` / dark `#282c34`，`values(-night)/colors.xml:launch_background`）：纯色 splash（替换 Capacitor 黑底 PNG）→ `AppTheme.NoActionBar` 的 `windowBackground` → 12+ 系统 splash `windowSplashScreenBackground`（values-v31）→ WebView 底色（`MainActivity`，不再恒白）→ 设置层 iframe 底色（shim `pageBg()`，不再硬编码 `#fff`）。重载/开设置/冷启动各环节不再出现异色空窗。活动补 `windowSoftInputMode=adjustResize`，键盘行为在 ROM 间一致。
2. **标题顶进状态栏（部分 ROM）**——targetSdk 35 在 Android 15 强制 edge-to-edge，而 Capacitor 的 `adjustMarginsForEdgeToEdge` 默认 `disable`：`capacitor.config.json` 改 `force`，Capacitor 给 WebView 补 systemBars+cutout 边距；键盘 insets 由 `MainActivity` 在 WebView 父容器上补（Capacitor 在 WebView 上 CONSUMED 了 ime）。状态栏/导航栏图标深浅随主题（`WindowInsetsControllerCompat`，shim 经 `__almaAndroidUi.setTheme` 上报应用内主题，系统深浅色切换由 `onConfigurationChanged` 同步）。
3. **UI 完全无样式（老 WebView 内核，如 MIUI 14 无 Play 更新）**——renderer 主样式表依赖 Chromium 111+（`oklch()` 126 处 / `color-mix()` 1148 处 / `:has()` 19 处）。内核 85–110 时 JS 正常但配色/布局全失效（白框界面，MIUI 还会挂「网页显示异常」提示）；<85 连 `??=` 都无法解析。`alma-webview-gate.js`（**纯 ES5**，注入在所有脚本之前）检测 UA 的 Chromium 版本，低于 111 时全屏给出升级「Android System WebView」的指引（可关闭并记忆）。老设备唯一根治办法是升级系统 WebView（系统应用商店 / 系统应用更新，或侧载 WebView APK）。

## 使用 / 配对

1. Mac 上打开 Alma → 设置 → Remote Access，生成配对二维码（`alma://connect?u=…&e2e=1&k=…` 深链格式）
2. Android 安装后：设置 → 我的 Mac → 扫码（需授予相机权限；被系统静默拒绝的去 系统设置→应用→Alma→权限 手动开）
3. 配对成功自动重载 → 完整手机体验（会话列表/生成跑在 Mac 上，经 E2E 加密中继）
4. 不连 Mac：设置 → 本机模式（beta）→ AI 提供商，配自己的密钥
**（注：本机模式暂不完善，待后续开发...）**

## 远程屏幕：看 + 触控你的 Mac（beta）

配对后主界面左上 ⋯ 菜单下方出现「显示器」小钮，点开全屏查看器（iOS 端「Computer」同款能力）：

- **看**：Mac 桌面实时流。基础 JPEG 通道（~8fps，任何环境可用），出帧后自动协商 WebRTC H.264 高清通道（更流畅更省流量，顶栏亮 `HD`；协商失败静默留在 JPEG）。
- **控**（需 Mac 端「Alma Computer Use」helper + 屏幕录制/辅助功能授权，未授权时显示「仅查看」）：
  - 单指 = 鼠标：轻点点击、双击双击、长按 500ms 右键、按住拖动
  - 双指 = 滚轮（自然滚动方向）；双指捏合 = 缩放（1× 适合 ↔ 1:1 原生，顶栏切换）
  - 三指拖动 = 放大后平移视图
- **键盘条**：粘贴 / esc / tab / 方向键 + 输入框（中文 IME 可用，回车或 ↑ 发送到 Mac）
- **剪贴板互通**：Mac 复制 → 自动同步到手机；手机复制 → 「粘贴」键打到 Mac（等价 ⌘V）
- 顶栏显示 `宽 × 高 · 码率 kbit/s`，Android 返回键关闭查看器

技术：`scripts/shim/alma-screen-remote.js`（无构建步骤，随 shim 注入 index.html），协议 = Mac 本地 API 的 `/ws/screen` WebSocket（`pointer/scroll/text/key/clipboard` 上行、`status/frame/viewport/clipboard/rtc_*` 下行），经 E2E 中继隧道透传（sentinel host `alma-e2e.local` 被 connected chunk 的 WebSocket 拦截接管）。要求 Mac 端 Alma ≥ 0.4.378。调试可设 localStorage `alma.android.screen.base`（如 `ws://127.0.0.1:23001`）直连本地 API 验证协议。

## 局域网直连（E2E 隧道直连优先）

`scripts/shim/alma-lan-direct.js`（注入在所有 chunk 之前）：Mac 端 Alma 在全网卡监听 `/__alma_e2e__`（实测 :23019），与中继路径完全同构（同一 E2ESession + connectCode）。手机侧在 connected chunk 捕获 `window.WebSocket` 前装好包装器：

- **拨号**：有新鲜直连缓存（12h）→ 先拨 `ws://<host>:<port>/__alma_e2e__`（LAN 上 <50ms），2.5s 内未通立即回落中继（routing token 是 code 的确定派生，可复用）
- **发现**（隧道就绪后 / 拨号失败 / 启动 12s 后台补课）：herdr 主机名 `.local`（mDNS）优先；RTC host 候选**默认被 mDNS 混淆**（Chromium 隐私策略，srflx raddr 也清零——WebView 拿不到本机私网 IP），故主路径是**网关探测**：no-cors fetch 常见家用网段的 `.1`（路由器管理页必开），活的网段再做 /24 假 hi 探扫（真 P-256 密钥对，0.4.39x 桌面端为 P-256；随机 32B 会被秒断）
- **中继完全断时也能自救**：无需先经中继建立一次——网关探测独立于隧道
- E2E 加密在应用层（P-256 ECDH + HKDF + AES-GCM），直连走 ws:// 明文传输与桌面版直连一致，无安全降级；为此 `capacitor.config.json` 开 `allowMixedContent`
- 实测黑洞中继（10.255.255.1）下：无缓存无主机名冷启动 → 网关探测找到网段 → 扫描命中 → 缓存 → 下一次拨号直连建立（「已连接到你的 Mac」）
- 调试：`window.__almaLanDirect`（discover/cache/lastResult/clear）；localStorage `alma.android.lan.mode='off'` 整体停用

> 注：0.4.39x 桌面端 E2E 已从 X25519（0.4.213）改为 **P-256**；relay-kit 的 client 尚未跟进，跨版本联调时留意。

**语言**：首启跟随系统语言；设置 → 外观下方可切换 跟随系统 / English / 中文 / 日本語，选择立即生效并持久化。

## 应用内更新（自动检查 + 手动安装）

renderer 自带完整 updater UI（设置 → 关于：状态行/进度条/重启确认，桌面 badge 同款逻辑），shim 把它的 `window.almaApp` autoUpdate 协议接到真实现：

- **检查**：启动静默检查（6 小时限频，发现新版才亮 badge）；设置 → 关于 → Check for updates 手动检查。先查 GitHub API `releases/latest`，直连失败（国内网络）自动改走镜像读仓库根 `latest.json`。
- **下载**：原生 `DownloadManager`（通知栏可见、断点续传），直连失败用镜像 URL 重试一次；完成经 FileProvider 拉起系统安装器。Android 8+ 首次会引导「安装未知应用」授权，授权后回 App 再点一次安装即可。
- **版本**：以内嵌 renderer 版本为准（如 `0.4.213`，与 Alma 桌面一致）——APK `versionName` 即它，About 页只显示这一个版本号；GitHub tag 同号（`v0.4.213`）。
- **镜像可配**：默认 `https://gh-proxy.com/`；改 localStorage `alma.android.update.mirror` 可换前缀，置空串禁用镜像（只走直连）。

发布用 `scripts/release.sh`（见下节），它会重写 `latest.json` 随 main 推送 —— 镜像兜底源永远和最新 Release 一致。

## 发布

```bash
bash scripts/release.sh [版本号] [发布说明]
# 例：bash scripts/release.sh 1.4.0 "修复 XX；新增 YY"
```

一条龙：回归测试三件套（全绿才继续，对齐「测试不过不提交」+ [LESSONS.md](LESSONS.md) 的发版底线）→ 版本号取 www/ 内嵌 renderer 版本（同版本的壳修复自动出 `-N` 后缀 tag，如 `v0.4.213-6`）→ `cap sync` + `assembleDebug` → 同步 `../apk-serve/` → 写 `latest.json` → commit + tag + push → `gh release create`（附 `alma-android-vX.Y.Z.apk`）。

**语言切换**：设置 → 语言选任意档位即时生效（主界面 live 切换，不重载不闪屏）；「跟随系统」跟随系统语言，选择持久化。

## 升级到新版 Alma

`www/` 提交的是**已打补丁的最终态**，日常构建不需要重新生成。Alma 发新版时：

```bash
# 先从新版 Mac 安装包解出 renderer（或更新本地解包），然后：
bash scripts/sync-assets.sh [renderer目录]   # 默认 ~/AlmaProjects/alma-re/app/out/renderer
npx cap sync android
```

脚本内含 assert：上游结构变化（补丁定位失败）会直接报错，不会静默漏 patch。

## 许可

[MIT](LICENSE) — 版权归 Alma 作者 **yetone（叶天帝）** 所有。

本项目为非官方个人移植，与 Alma 官方无隶属关系。`www/` 内嵌的 renderer 来自 Alma 官方安装包，经作者许可以 MIT 随本仓库发布。
