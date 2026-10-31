# LESSONS — 项目教训录

> 底线（nanami 定，2026-10-29）：**每次发版必须通过端到端的真实测试和回归测试**。
> 一为保证新功能真的成功，二为保障以前的错误不再犯、以前的功能保持稳定正常。
> 任何"测试全绿"都要先问一句：测的是不是发出去的那个包？

## 2026-10-29 语言切换：闪屏 + 挤回首页 + 3-4 秒后弹回系统语言

- **现象**：设置里从「跟随系统」切到日语 → 主界面整页闪屏、被挤回首页；约 3-4 秒后语言弹回系统中文，切换永远不生效。
- **根因一（灾难切换体验）**：语言行补丁用 `postMessage → 主帧 location.reload()` 同步主界面语言 —— 整页冷启动 = 闪屏 + 重置到首页。
- **根因二（选择丢失）**：i18next detector 的 localStorage 缓存写入挂在 `languageChanged` **异步链**上（语言资源异步加载后才发事件），而 reload 同步抢跑把 iframe 连同未完成的写入一起销毁 → `i18nextLng` 没写进去 → 重启按系统语言检测 → 回到中文。
- **修复**：i18next 单例（两个文档同一 chunk）加 `message` 监听 —— iframe 选语言 → `postMessage(alma-android-lang)` → 主帧同单例 `changeLanguage` live 切换；语言行**同步**写 `i18nextLng`；不再任何 reload。
- **教训**：
  1. 状态持久化要区分「同步写」与「框架异步链写」；有竞态窗口时自己先同步落盘。
  2. 跨 iframe 同步状态：postMessage + 单例监听，不要用 reload 大锤 —— reload 的代价（冷启动/丢导航态/闪屏）永远比想象中大。
  3. 测试断言别假设环境 locale（headless Chrome 跟随宿主系统语言，本机是 zh 不是 en）。

## 2026-10-29 自动更新 v1.3.0：mock 全绿 ≠ 真实可用（AVD 闭环实测抓出三个真 bug）

- **cap sync 缺失**：`assets/public` 不进 git，构建直接 assembleDebug 打出**旧 web 层** —— 测试全绿测的是 www/，发出去的是 assets/ 里的旧包（首测 APK 里更新功能整个不存在即此故）。release.sh 已强制构建前 `npx cap sync android`。
- **DownloadManager 完成广播收不到**：Android 14+ 上 DownloadProvider（Mainline 模块）发出的 `ACTION_DOWNLOAD_COMPLETE` 会被 `RECEIVER_NOT_EXPORTED` 当"其他应用"拦掉（AVD 实测零回调、UI 永远"下载中"）。该广播是 protected broadcast，改 `RECEIVER_EXPORTED` 安全；另加 shim 轮询兜底（downloadProgress 连续 3 次 failed → error 终态）。
- **默认镜像会死**：mirror.ghproxy.com 当时已无响应 → 换 gh-proxy.com。免费 GitHub 代理没有 SLA，默认值要实测，且保留 localStorage 覆盖口。
- **教训**：
  1. 发版前必须走一次**真实闭环**：装上一版 → 应用内检查/下载/装上新一版。mock 测试再全也覆盖不了"广播被系统拦""镜像死了""构建产物没更新"这类环境事实。
  2. "测试通过"的对象要和"发布"的对象是同一份产物（cap sync 教训的本质）。

## 2026-10-29 手机 UI ≠ 桌面 UI：两套组件，别混

- 官方 updater UI（AboutSettings，Card 版，含完整状态机/进度条）**只在桌面设置布局**；手机设置页（PhoneRow 版）的「关于」区只有一行版本号 —— "renderer 自带更新 UI、零补丁接入"的结论对手机端不成立，仍需给手机设置页补入口行。
- 同理：改任何"renderer 自带 X"的结论前，先确认**目标平台布局**真的渲染那个组件。

## 2026-10-29 忘记这台 Mac 踢出设置层：转发类补丁要按方向分支

- **现象**（v0.4.213-6 实机反馈）：设置 → 我的 Mac →「忘记这台 Mac」后预期回设置页，实际整层退出到对话页；重开设置还可能落在配对屏。
- **根因**：shim 把设置 iframe 里的 `backend-mode-changed` **无条件**转发成宿主整页重载。这个转发本为配对（→remote，主应用要以连接态重启）设计，但「忘记/切回本机」（→local）走同一事件 → 用户被立即踹回对话页。
- **修复**：→local 不重载、挂 pending 标记，设置层关闭（完成/原生返回）时才重载主文档；→remote 维持立即重载并清标记。
- **教训**：一个事件两个语义相反的方向时，转发/响应要**按方向分支**，别写无条件转发；"主应用需要重载"和"此刻就要重载"是两回事，时机可以（且应该）推迟到用户离开当前上下文的自然过渡点。
- 排查技巧：Capacitor Preferences 的 web 存储是 `localStorage["CapacitorStorage." + key]`（预置/伪造配对态用它）；真机上 addJavascriptInterface 桥不可 JS 覆写（见环境事实），行为差异先在 Chrome CDP 真实点击流复现。

## 2026-10-29 版本号权威 = 内嵌 renderer 版本

- 用户可见版本统一为 renderer 版本（0.4.213 形态，与 Alma 桌面一致）：APK `versionName` = renderer 版本，GitHub tag = `v0.4.213`；About 页只显示一个版本号（build 留空）。
- 壳独立修复（renderer 没变）：release.sh 自动出 `v0.4.213-<code>` 后缀 tag，应用内比较含第 4 段。
- 曾经的 1.x 壳版本号（v1.3.0）与 renderer 版本并存，用户看到 "1.3.0 (0.4.213)" 两套版本 → 混乱，弃。
- **后缀判定要看线上最新 tag，不能只看本地 CUR≠NEW**（v0.4.213-6 发布前修正）：build.gradle 预写成新版本号后 CUR==NEW，只比本地会漏加后缀 → 折算后相等 → 老用户收不到提示。规则 = tag 占用 **或** 对已发布最新 tag 不构成严格更新（与应用内 isNewer 同款比较，含遗留折算）。
- **过渡死结（已知，接受）**：v1.3.0 旧 shim 是 3 段点分比较，`0.4.213-x` 数值恒小于 `1.3.0` → 老包**收不到**新形态版的自动提示，且不存在同时满足新旧两个比较器的 tag（旧要求 ≥1.x，新要求 ≤0.4.x）。v1.3.0 用户需最后一次手动安装 v0.4.213-6，此后永续自动。
- **教训**：换版本号方案时，先审计**已发出设备的旧代码**怎么比较版本，再定新 tag 形态；两个方向的过渡（新 app 认旧号、旧 app 认新 tag）要分开验证。

## 环境事实（测试时别再踩）

- **alma-api35 的 DownloadManager 系统级坏**：任何 enqueue（含默认目标裸下载）秒失败 reason 0、netd DNS 循环重试，同 URL WebView fetch 却正常，重启无效。下载传输只能真机验证；模拟器可验证到"下载已入队 + 安装器全链"。
- `adb root` / `adb reboot` 会清掉所有 forward，要重新 `adb forward`。
- uiautomator 看不到 WebView 内文本：权限弹窗先 `pm grant` 预授权，WebView 内容用 CDP 远程调试断言。
- 沙箱内 kill 8778 服务会静默失败；本地端口监听/连接需非沙箱跑。
- **addJavascriptInterface 的原生桥对象不可 JS 覆写**：真机 WebView 里 `window.__almaAndroidUpdate` 是 Java 代理，`getVersionName = () => '1.3.0'` 这类属性赋值**静默失效**（不报错、不生效）；Chrome mock 里却能覆写。要在真机验证"特定壳版本号下的行为"，唯一可靠办法是改 build.gradle 的 versionName 重打包装机（test/post-release-verify.sh 的替代法），别指望运行时覆写。
- **测试脚本自己也会写错**：模板串里多打反引号、正则双重转义（`/settings\\.html/` 不匹配 `./settings.html`）、PNG 滤镜未解码、箭头参数作用域。测试红了先分辨是产品 bug 还是测试 bug（git stash 基线对照）。

## 观察中（未定位）

- 2026-10-29 用户报告：relay 已连 Mac 但模型/思考强度/历史对话全部消失，「连接中…」卡住 —— 数分钟后自愈。代码层排查无版本握手/门控消费 `almaApp.version`，疑似中继服务器或 Mac 端瞬时状态。再遇时先抓：chrome://inspect console 报错、Mac 端 Alma 版本号、`relay.alma.now` WebSocket 状态。

## 2026-10-29 返回键不认 iframe 内部层级：配对页侧滑两次直接退出 App

- **现象**（v0.4.213-7 OPPO 实机反馈）：设置 → 我的 Mac 配对页侧滑返回，预期回设置页，实际被退出 Alma 应用。
- **根因**（AVD keyevent 4 逐步实证）：`__almaAndroidBack` 只认「设置层 iframe 可见」一刀切关整层——返回键第一次把配对屏连着设置层全关（用户看到"退出到对话页"），第二次 `canGoBack()=false` + JS 返回 false → `super.onBackPressed()` → Activity 结束 → **退出 App**。手机上连续两次侧滑被感知为"直接退出"。
- **实验要点**：设置层 iframe 的加载**不进** WebView 历史栈（`Page.getNavigationHistory` 恒 1 条）→ `canGoBack()` 恒 false → 返回键永远走 JS 路径，修 shim 即可，原生侧不用动。
- **修复**：`__almaAndroidBack` 实现层级链——detail Pane 已推出时先点 renderer 自己的返回钮（iframe 内部回退，走其滑动动画与状态机），已在根页才整层关闭。
- **语言无关的 DOM 锚点**（设置页中/英/日三语，文案匹配不可靠）：renderer 返回钮 = ChevronLeft `svg` + 头部样式 `pl-1`/`pr-2`（Tailwind 工具类名不随构建哈希）；**detail Pane 的 `aria-hidden` 直接由 `pushed`（`section !== null`）驱动**——`false` = 子屛当前推出，`true` = 已收回，是比 rect/transform 更干净的判定（React 渲染同步翻转，无动画中间态）。
- **教训**：宿主给 iframe 盖了一层导航时，返回键的处理必须穿透到 iframe 内部层级，否则用户的"返回"语义会在某一层被吞掉整层；找 DOM 锚点优先看 aria 属性/结构/工具类名，别用文案。

## 2026-10-30 下载"成功"≠文件有效：安装器收到垃圾报「安装包已损坏」

- **现象**（v0.4.213-8 OPPO 实机）：应用内更新下载完成、拉起安装器，安装器报「安装包已损坏」。GitHub 资产本身字节级完好（gh 下载 sha256 与本地构建一致）。
- **根因**：DownloadManager 报 SUCCESSFUL 只代表 HTTP 传输走完——透明代理/门户对 GitHub 资产可能返回 **200 的 HTML 错误页**，旧代码拿到文件不校验直接交安装器。另实测 gh-proxy 镜像对该网络只有 ~15KB/s（38MB 拉了 570s 只到 8.4MB）——镜像兜底也会慢到不可用。
- **修复**：`installUpdate()` 交安装器前 `getPackageArchiveInfo` 预检（截断 zip/HTML/空文件 → null）**且包名必须匹配本应用**；坏了删文件、自动换镜像重下（与下载失败同路径），镜像也坏才报 error。
- **教训**：把系统组件的"成功"当数据完整性保证是错的——下载完成≠内容正确；对外来文件先验后用（解析即校验，比比对长度/哈希更省事且权威）。
- **测试技巧**：往 `getExternalFilesDir` 塞文件——`run-as`/shell 对 `/storage/emulated/0/Android/data/<pkg>` 均无权限；`adb root` 后写 raw 路径 `/data/media/0/...` 可行（google_apis 镜像可 root）。**同一文件路径被覆写后 FUSE 视图可能陈旧读到旧内容**（换文件要 rm + force-stop 应用 + drop_caches，或干脆隔离测试）；测试钩子链式包装共享变量会让状态计数逐轮 +1（每轮 arm 都把上一轮 wrapper 当 prev 链上）——arm 要幂等替换而不是包一层。

## 2026-10-30 给 React 树外面挂 UI：fixed 注入 + MutationObserver 重挂（更新 pill）

- **需求**：有新版时在 renderer 左上菜单钮旁放「更新」pill + 版本说明弹窗，但 UI 是 renderer 的 React 树，不能改其源码。
- **注入策略**：pill/弹窗 append 到 `document.body` 且 `position:fixed`——React 重渲染会**吞掉**React 根内的外来节点，body 直挂 + 几何定位（菜单钮 rect 推算 `left/top`）不受影响；`MutationObserver(childList+subtree, 250ms 防抖)` 被移除即重挂（CDP 有断言：手动 remove 700ms 内复活）。
- **定位菜单钮**：几何特征（20–60px 宽、left<60、top<60、含 svg），不依赖文案/类名哈希。
- **真机桥不可 mock**：`window.__almaAndroidUpdate` 是 addJavascriptInterface 注入，页内 JS **覆盖不了**——CDP/浏览器测试里 mock 有效是因为宿主是浏览器。真机侧 UI 流程只能：装新版后用 CDP（webview_devtools socket）mock `fetch` 喂假新版，或等下一个真版本。
- **弹窗条目来自 release notes**：`updateNoteItems()` 逐行过滤（跳过 `^#` 标题、Co-Authored-By/🤖 署名行；剥 `[-*•] `/**/反引号；≤140 字、至多 8 条）——release.sh 自动取 git log 生成 notes，两端约定字段。
- **发布后实测（AVD api33 装 -10，真实网络）**：直连 GitHub 在本机 reset → 镜像 raw latest.json 兜底成功，`rel` 落盘含双镜像 fallbacks + notes，壳=tag → 已是最新。链路端到端通。

## 2026-10-30 「检查更新→安装包已损坏」复盘：陈旧终态 + 校验只查 manifest；返回键 canGoBack 判序

- **陈旧终态死循环**（-10 实机复现于 AVD）：手动装新版后 localStorage 残留 `update-downloaded` + 磁盘残留旧 `alma-update.apk`。设置页按状态分派，点行=launchInstaller；-10 校验只查 manifest+包名 → **旧的有效包照样放行** → 系统安装器拿旧包报「安装包已损坏」（国产 ROM 对降级/坏包的通用文案）。修复三重：shim 启动时 rel.tag 不新于壳 → 清回 idle；quitAndInstall 同守卫；原生校验追加 versionName 严格新于当前 + 签名一致。
- **返回键 canGoBack() 判在 JS 之前是错的**：renderer 主页面积累 pushState 历史（真机用几天必然有）后 canGoBack=true → 返回手势全被 webView.goBack() 吃掉，设置层层级逻辑永远不跑（实机「配对页侧滑退出」在 AVD 复现不了——刚装的壳没有历史）。正确优先级：JS（弹窗→设置层）→ WebView 历史 → 默认。AVD 造历史法：`history.pushState` ×2 再走 keyevent 4。
- **弃用 DownloadManager**（社区共识 + 实测根因）：透明代理对 GitHub 资产回 200 HTML，DownloadManager 照落盘报 SUCCESSFUL。应用内 HttpURLConnection：写盘前验状态码/Content-Type/长度，第一块数据验 zip 魔数 PK，垃圾不落盘直接换镜像；.part 原子改名；代次号 dlGen 让旧线程让位。
- **AVD 实测事实**：api33 镜像拉起 PackageInstaller 会把 qemu 整个带崩（连崩 3 次的元凶），api30 正常——安装器全链测试用 api30；WebView localStorage 是异步落盘，force-stop 会丢，seed 后必须 location.reload() 触发提交；`cleartext` 白名单走 network_security_config（仅 10.0.2.2），本地 http.server 8808 当下载源。
- **测试基建坑**：模拟器连环崩时把 8778 静态服务一并带走 → 一串 CDP 套件假失败（no-button/NO_FRAME），先查服务再怀疑代码；qemu 进程名是 qemu-system-x86_64，pkill "emulator" 杀不掉。

## 2026-10-30 横屏左侧空白条 = Capacitor 把挖孔 inset 折成 WebView 边距；pill 穿模 = z-index 压过 renderer 覆层

- **横屏空白条复现法（AVD 实证）**：模拟器开打孔 overlay `adb shell cmd overlay enable com.android.internal.display.cutout.emulation.hole` → `settings put system accelerometer_rotation 0; user_rotation 1` → uiautomator 量 WebView bounds。api35 实测 2400×1080 屏上 WebView=[136,63][2400,1017]——左缘 136px 恰是挖孔外接矩形，被系统报成 displayCutout inset，而 `adjustMarginsForEdgeToEdge:"force"` 让 CapacitorWebView 把 `systemBars|displayCutout` 并集写成四边 margin（CapacitorWebView.edgeToEdgeHandler）。OPPO 打孔在横屏落左缘 → 用户看到的"没什么用的 bar"。窗口本身全幅（API35 EDGE_TO_EDGE_ENFORCED 且 cutoutMode=always），bar 不是系统 letterbox 而是 WebView margin。
- **修复**：MainActivity 在 super.onCreate 之后 `setOnApplyWindowInsetsListener(webView, …)` **顶掉** Capacitor 的监听（后设者胜）：左右只取 systemBars（挖孔侧贴 0，聊天内容在孔下滚动——全屏应用常态），上下取 systemBars 与 displayCutout 的较大者（竖屏刘海行为不变）；另设 `LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES` 兜住 Android≤14（默认模式横屏整个窗口避让挖孔）。实测修复后 WebView=[0,63][2400,1017] 全幅，竖屏 [0,136][1080,2337] 无回归。
- **pill 穿模**：pill 挂 body、z-index 2147482000 压过 renderer 一切覆层（抽屉面板 z-201/遮罩 z-200/底部动作单 z-130）。修复 = 露头条件加 `!rendererOverlayOpen()`：遮罩（computed z==200 且 pointer-events≠none 且全宽）或面板（z==201 且已滑入）或非自身的全屏 role=dialog。**computed style 判定优于 class 串**（`z-[201]` 是构建产物）。
- **attributes observer 自激励坑**：observer 加 `attributes:true` 后，pill 自己写 style.cssText 会再触发 observer → 250ms 死循环。修法：位置没变就不写（dataset.pos 缓存比对）。
- **构建陷阱（重要）**：`./gradlew assembleDebug` **不会**拷 www → `npx cap sync android` 必须先跑，否则 APK 里是 assets/public 的旧 shim（症状：CDP www 测试全绿但装机不生效——先 `unzip -p apk assets/public/alma-droid-shim.js | grep` 验证）。
- **测试基建**：CDP 套件 for-loop 连跑会端口互撞（上一只 Chrome 未退，下一只 bind 失败）→ 逐个跑或加 sleep；uiautomator dump 的 shell 命令要整体引号（`;` 会被本地 shell 拆开）；AVD 状态污染会让主题断言假失败（探针先 `pm clear` 再测）；杀模拟器后 `~/.android/avd/<avd>/*.lock` 残留会让下次启动超时，rm 掉。

## 2026-10-31 下载涓流掐死看门狗；adb forward 会劫持桌面 CDP 端口；release.sh 的 C locale 陷阱

- **readTimeout 掐不死涓流（本轮根因）**：HttpURLConnection 的 readTimeout 只在「单次 read 完全无数据满 30s」时触发；镜像以 ~15KB/s 匀速回流时每次 read 都有数据 → 永不超时、永不换镜、UI 永远"下载中"（-13 上实测复现：140s 只爬 2MB/39MB）。修复 = 下载看门狗：宽限 15s 且已写 >512KB 后，均速 <128KB/s 即 `IOException("too-slow xB/s")` 弃址换镜像；另加 6min 总时限兜底；计时用 `SystemClock.elapsedRealtime()`（单调钟，不受改时间影响）。
- **代次检查要在写入之前**：`gen != dlGen` 原来判在 `out.write` 之后——换链瞬间旧线程仍可向已被新线程 truncate 的 .part 交错写一块。移到 read 循环体首行。
- **检查更新兜底也要多镜像**：raw latest.json 兜底原来只打 `mirrorPrefix()` 一个源，那个镜像挂了整次检查失败（"检查更新有时超时"另一半）。改为 [当前镜像, ...UPDATE.mirrors] 去重轮试；**保留 mirrorKey 空串 = 显式禁用镜像的语义**（空串时不轮试，直连失败即失败）。
- **adb forward 劫持 CDP 端口（排查 3 小时的环境坑）**：会话遗留的 `adb forward tcp:9223 localabstract:webview_devtools_remote_<旧pid>` 让 adb 占住 127.0.0.1:9223（IPv4）——CDP 套件 spawn 的 Chrome 绑不上自己的调试口，WebSocket 全连进**手机 WebView**（症状：target 是旧 URL、页内 ERR_CONNECTION_REFUSED、location.pathname='/'、断言 no-button）。chrome 新实例只绑 IPv6 [::1] 所以互不报错，极具迷惑性。排查法：`lsof -nP -i :9223` 看占用者是 adb 就 `adb forward --remove-all`。**跑桌面 CDP 套件前先清 adb forwards**。
- **套件本身会泄漏 Chrome**：cdp-*.mjs 多数 spawn 后不 kill，且固定 sleep(1500) 等调试口——机器高负载（模拟器同跑）下 Chrome 起得慢就 ECONNREFUSED。连环跑前 `pkill -f "remote-debugging-port=92"` 并等进程真的退掉（循环 pgrep），或干脆分次跑。
- **release.sh C locale 陷阱**：中文 notes 经 argv 传给内嵌 python，LANG 为空/C 时 argv 被 surrogateescape 解码 → `json.dump` 炸 `UnicodeEncodeError: surrogates not allowed`（且炸在 latest.json 一步，build.gradle/latest.json 已改但未提交——重跑前 `git checkout --` 还原）。修复 = 脚本头强制 `LC_ALL/LANG=en_US.UTF-8`。
- **zsh 把方括号字符串当 glob**：`B=[798,1297][978,1439]; ... $B ...` 会被 zsh 展开成奇怪的东西（tap 坐标全错）。引用变量或改 awk 单命令内联。
- **uiautomator 装器按钮**：api35 的 PackageInstaller 确认键是 "Update"（不是 Install/安装），Cancel 在左 Update 在右；dump 后 grep text="Update" 取 bounds。

## 2026-10-31 照片图库点了没反应 = renderer 有 JS 桩、壳没带原生插件

- **根因**：composer 的「照片图库/拍照」走 `window.almaCamera`（connected 模块 `installElectronShim()` 无条件 `w.almaCamera ??= cameraShim`，三个方法都调 Capacitor **Camera 插件**），而壳的 package.json 只带了 browser/clipboard/haptics/preferences/share —— Camera 原生实现根本不在 APK 里。`Camera.pickImages()` reject `"Camera" plugin is not implemented on android` → cameraShim.failQuietly 吞成 `[]`/`null` → composer 静默无反应。「选择文件」走隐藏 `<input type=file>` 的 WebView 文件选择，不受影响（可当鉴别症状）。
- **修复**：`npm i @capacitor/camera@^7` + `npx cap sync android`（自动写入 capacitor.build.gradle / capacitor.settings.gradle）。MainActivity 不用动：CAMERA 运行时权限启动已申请；API 33+ 的 pickImages 走系统 Photo Picker 零权限，旧设备由插件 manifest 合并 READ_MEDIA/READ_EXTERNAL_STORAGE。
- **教训**：**「JS 侧 registerPlugin 了」≠「原生可用」**——CDP 探针 `Object.keys(Capacitor.Plugins)` 会把没实现的也列出来（JS 注册表而已）；确认原生在不在，得真调用一次看 console 有没有 `[ios] cameraShim.xxx failed: ... not implemented`。升级 renderer 后对照 connected 模块的 `??=` 清单盘点壳插件。
- **AVD 验证法**：CDP evaluate `window.almaCamera.pickMany(6)`（fire-and-forget，存全局抓终态）→ `dumpsys window | grep mCurrentFocus` 应见 `photopicker.PhotoPickerActivity`。空模拟器造照片：`adb push` 到 /sdcard 后 MEDIA_SCANNER_SCAN_FILE 广播已死，要 `content insert --uri content://media/external/images/media` 建 row 再 `adb exec-in content write --uri …/<id>` 灌真实字节（exec-in 传二进制，adb shell 会掰坏）。选择器多选确认键文本是 `Add (N)`，dump 后按 text 取 bounds。
