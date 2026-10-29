#!/bin/bash
# 从 alma-re 的运行树同步 Alma 官方 renderer 到 www/ 并注入手机平台桥。
# 用法: bash scripts/sync-assets.sh [alma-re路径]   （默认 ~/AlmaProjects/alma-re）
set -euo pipefail
cd "$(dirname "$0")/.."
SRC="${1:-$HOME/AlmaProjects/alma-re}/app/out/renderer"

[ -d "$SRC" ] || { echo "✗ 找不到 $SRC（先在 alma-re 跑 scripts/extract-app.py）"; exit 1; }

rm -rf www
mkdir -p www
# renderer 全量拷贝（assets/fonts/各 html 入口）
cp -R "$SRC/." www/

# ── 1. 注入 shim（紧跟 <body>：document.body 已存在 → 首帧即手机布局） ──
python3 - << 'PYEOF'
import glob, re, shutil
for src, dst in [('scripts/shim/alma-droid-shim.js', 'www/alma-droid-shim.js'),
                 ('scripts/shim/alma-local-engine.js', 'www/alma-local-engine.js')]:
    shutil.copyfile(src, dst)

for p in glob.glob('www/*.html'):
    s = open(p, encoding='utf-8').read()
    if '__ALMA_ANDROID__' in s:
        continue
    # 若旧注入残留在 head，先移除
    s = re.sub(r'<script>\s*// alma-android: 平台桥.*?</script>\n?', '', s, flags=re.S)
    m = re.search(r'<body[^>]*>', s)
    tags = '\n<script src="./alma-droid-shim.js"></script>' + \
           '\n<script src="./alma-local-engine.js"></script>'
    if m:
        s = s[:m.end()] + tags + s[m.end():]
    else:
        s = s.replace('</head>', tags.strip() + '</head>')
    open(p, 'w', encoding='utf-8').write(s)
    print('✓ 注入', p)
PYEOF

# ── 2. Android 平台身份补丁：所有手机 UI 门控纳入 android ──
python3 - << 'PYEOF'
import glob

# dataset 判定（phone shell 门控的通用形式，出现在 App / mermaid 等多个 chunk）
A_OLD = 'document.body.dataset.platform === "ios"'
A_NEW = '(document.body.dataset.platform === "ios" || document.body.dataset.platform === "android")'
# PlatformContext state 判定
B_OLD = 'const isPhone = platform === "ios";'
B_NEW = 'const isPhone = platform === "ios" || platform === "android";'
# 官方代码里 isIOS 的事实语义是「手机壳」（当时只有 iOS 壳）：
# App 手机标题栏/触控尺寸/边距与 settings 整套手机 UI 都挂在 context.isIOS 上。
# android 壳必须打开它；真值另由 isAndroid 表达，platform 字符串仍是 "android"。
C_OLD = 'isIOS: platform === "ios",'
C_NEW = 'isIOS: platform === "ios" || platform === "android", isAndroid: platform === "android",'
# 频闪残根：PlatformProvider 初始 state "darwin" → get() 异步回来才翻成 android，
# 首帧 context 是 isMac:true，整棵树重挂一次。改为同步从 dataset 初始化（shim 已提前设好）。
D_OLD = 'const [platform, setPlatform] = reactExports.useState("darwin");'
D_NEW = ('const [platform, setPlatform] = reactExports.useState(function () '
         '{ try { return document.body.dataset.platform || "darwin"; } catch (e) { return "darwin"; } });')
# settings 标题栏窗口控件：手机壳无桌面窗口控件
E_OLD = 'if (platform === "ios") return "none";'
E_NEW = 'if (platform === "ios" || platform === "android") return "none";'

PAIRS = [(A_OLD, A_NEW), (B_OLD, B_NEW), (C_OLD, C_NEW), (D_OLD, D_NEW), (E_OLD, E_NEW)]
for p in glob.glob('www/assets/*.js'):
    s = open(p, encoding='utf-8').read()
    o, n = s, 0
    for old, new in PAIRS:
        n += s.count(old)
        s = s.replace(old, new)
    if s != o:
        open(p, 'w', encoding='utf-8').write(s)
        print(f'✓ {p.split("/")[-1]}: {n} 处手机门控纳入 android')
PYEOF

# ── 2.5 手机 composer 布局修复：chip 可收缩 ──
# model/effort chip 只有 max-w-[46vw] 没有 min-w-0 —— flex 项的 min-content
# 会被长模型名（如 Deepseek-V3.2-Exp）撑死，行总宽超出屏宽，把 shrink-0 的
# 圆形发送按钮挤出屏幕右缘切半。加 min-w-0 让 chip 收缩（span 自带 truncate）。
python3 - << 'PYEOF'
p = 'www/assets/App-CHUt1SP7.js'
s = open(p, encoding='utf-8').read()
OLD = 'const chip = "flex h-9 max-w-[46vw] '
NEW = 'const chip = "flex h-9 min-w-0 max-w-[46vw] '
assert OLD in s, 'chip 类定义未找到'
s = s.replace(OLD, NEW)
open(p, 'w', encoding='utf-8').write(s)
print('✓ composer chip → min-w-0（修复发送按钮被切）')
PYEOF

# ── 2.6 手机聊天布局：释放桌面 gutter（左右共 ~126px）────────────────
# 配对聊天的消息区是桌面布局：滚动容器 paddingRight 51px（给浮动 artifact
# 栏/时间线尺让位，侧栏关闭也保留）+ 每行 pl-6 pr-[39px]（左 24 右 39）。
# 390px 屏上内容只剩 ~275px，用户气泡（80% 上限）再缩到 ~210px —— 一行只
# 排得下八九个汉字，整个界面显得很挤。手机壳没有 artifact 侧栏/时间线尺，
# 两个 gutter 都不该留：行内边距改 px-2，外层 paddingRight 归零。
# isPhoneShell() 为假（桌面/connected）时字符串原样，零回归。
python3 - << 'PYEOF'
p = 'www/assets/App-CHUt1SP7.js'
s = open(p, encoding='utf-8').read()
n = 0

OLD = '"pb-2 pl-6 pr-[39px]"'
NEW = '`pb-2 ${isPhoneShell() ? "px-2" : "pl-6 pr-[39px]"}`'
assert s.count(OLD) == 2, '消息行内边距锚点数异常: ' + str(s.count(OLD))
s = s.replace(OLD, NEW); n += 2

OLD = 'paddingRight: artifactSidebarVisiblyOpen && !showTimeline ? "0px" : "51px"'
NEW = 'paddingRight: isPhoneShell() ? "0px" : artifactSidebarVisiblyOpen && !showTimeline ? "0px" : "51px"'
assert s.count(OLD) == 1, '消息区 paddingRight 锚点数异常'
s = s.replace(OLD, NEW, 1); n += 1

open(p, 'w', encoding='utf-8').write(s)
print(f'✓ 手机聊天布局 {n} 处 → App-CHUt1SP7.js')
PYEOF

# ── 2.61 历史对话进入体验：加载空窗期给标题栏占位 ──────────────────────
# 配对模式下点击历史对话，getThread 要走中继完整往返（1-3s）；期间
# currentThread 为 null → chatThreadInfo 为 void 0，标题栏空白、消息区
# 空白，看起来像「点了没反应」。从 threads 列表缓存取标题先垫上（能从
# 抽屉点进来说明列表必然已加载），进入瞬间标题栏就有内容；线程数据到
# 达后自然替换。仅手机壳生效。
python3 - << 'PYEOF'
p = 'www/assets/App-CHUt1SP7.js'
s = open(p, encoding='utf-8').read()

OLD = 'const chatThreadInfo = reactExports.useMemo(\n    () => currentThread ? {'
NEW = '''const chatThreadInfo = reactExports.useMemo(
    () => {
      if (!currentThread && threadId && isPhoneShell()) {
        try {
          const listEntry = cache.get("threads")?.data;
          const summary = Array.isArray(listEntry) ? listEntry.find((th) => th && th.id === threadId) : null;
          if (summary) return { threadId, title: summary.title, messageCount: 0,
            selectedModel: selectedModel || summary.model || void 0, models, isLoading: true,
            isIncognito: summary.isIncognito, workspaceName, workspacePath,
            workspaceIsWorktree, workspaceIsSession, onModelChange: handleModelChange, onRefreshModels: loadModels };
        } catch {}
      }
      return currentThread ? {'''
assert s.count(OLD) == 1, 'chatThreadInfo 锚点数异常: ' + str(s.count(OLD))
s = s.replace(OLD, NEW, 1)

OLD2 = '      onModelChange: handleModelChange,\n      onRefreshModels: loadModels\n    } : void 0,'
NEW2 = '      onModelChange: handleModelChange,\n      onRefreshModels: loadModels\n    } : void 0;\n    },'
assert s.count(OLD2) == 1, 'chatThreadInfo 收尾锚点数异常: ' + str(s.count(OLD2))
s = s.replace(OLD2, NEW2, 1)

open(p, 'w', encoding='utf-8').write(s)
print('✓ 历史对话进入占位 → App-CHUt1SP7.js')
PYEOF

# ── 2.7 手机设置：语言行（跟随系统 / 手动切换 en·zh·ja）──
# 官方手机词典没有 language 键（iOS 靠系统级 per-app 语言设置），Android 壳自行提供：
# 外观区之后插入语言分段控件（与主题行同款交互），"跟随系统"档 = 清除手动选择标记，
# shim 下次启动回到原生 locale 检测。changeLanguage 经 i18next detector 自动持久化
# 到 i18nextLng；切换即时生效（useI18n 内部是 useTranslation，响应式）。
python3 - << 'PYEOF'
import glob

target = None
for p in sorted(glob.glob('www/assets/*.js')):
    with open(p, encoding='utf-8', errors='ignore') as f:
        if 'function PhoneSettings(' in f.read():
            target = p
            break
assert target, '手机设置 chunk（PhoneSettings）未找到'

s = open(target, encoding='utf-8').read()
n = 0

# 1) PhoneSettings 解构语言 API；当前选中态：手动选过 → 该语言，否则"跟随系统"
OLD = 'function PhoneSettings({ initialSection, onClose }) {\n  const { t: t2 } = useI18n();'
NEW = ('function PhoneSettings({ initialSection, onClose }) {\n'
       '  const { t: t2, changeLanguage, getSupportedLanguages, getCurrentLanguage } = useI18n();\n'
       '  const curLangSel = (() => {\n'
       '    try {\n'
       '      if (!localStorage.getItem("alma.android.lang.user")) return "__system";\n'
       '    } catch {}\n'
       '    return (getCurrentLanguage() || "en").split("-")[0];\n'
       '  })();')
assert OLD in s, 'PhoneSettings 解构锚点未找到'
s = s.replace(OLD, NEW, 1); n += 1

# 2) 外观 section 之后插入语言 section（标签一行 + 满宽 4 等分分段控件 ——
#    行内布局放不下 4 个选项会折行溢出，改为上下结构）
OLD = '        ] }),\n        mode2 === "local" &&'
NEW = '''        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-2 text-[16px]", children: t2("phone.settings.language", "Language") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-[9px] bg-muted p-[2px]", children: [{ id: "__system", label: t2("phone.settings.themeSystem", "System") }].concat(getSupportedLanguages().map((l2) => ({ id: l2.code, label: l2.name }))).map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                if (opt.id === curLangSel) return;
                void window.almaHaptics?.selection();
                if (opt.id === "__system") {
                  try { localStorage.removeItem("alma.android.lang.user"); } catch {}
                  const nat = String(window.__almaAndroidLang__ || navigator.language || "en").toLowerCase();
                  changeLanguage(nat.indexOf("zh") === 0 ? "zh" : nat.indexOf("ja") === 0 ? "ja" : "en");
                } else {
                  try { localStorage.setItem("alma.android.lang.user", "1"); } catch {}
                  changeLanguage(opt.id);
                }
                try { window.parent.postMessage({ type: "alma-android-reload-main" }, "*"); } catch {}
              },
              className: cn(
                "h-8 flex-1 rounded-[7px] px-1 text-[13px] font-medium transition-colors whitespace-nowrap",
                curLangSel === opt.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              ),
              children: opt.label
            },
            opt.id
          )) })
        ] }) }) }),
        mode2 === "local" &&'''
assert OLD in s, '外观 section 收尾锚点未找到'
s = s.replace(OLD, NEW, 1); n += 1

# 3) 三份手机词典补 language 键
for old, new in [
    ('theme: "Theme",\n    themeSystem:', 'theme: "Theme",\n    language: "Language",\n    themeSystem:'),
    ('theme: "主题",\n    themeSystem:', 'theme: "主题",\n    language: "语言",\n    themeSystem:'),
    ('theme: "テーマ",\n    themeSystem:', 'theme: "テーマ",\n    language: "言語",\n    themeSystem:'),
]:
    assert old in s, '词典锚点未找到: ' + old[:20]
    s = s.replace(old, new, 1); n += 1

open(target, 'w', encoding='utf-8').write(s)
print(f'✓ 手机设置语言行 {n} 处 → {target.split("/")[-1]}')
PYEOF

# ── 2.8 配对执行移回主帧（扫码 iframe 化回归的根治）─────────────────
# 设置层是 iframe：扫码解码成功后 apply() 在 iframe 内跑 —— 原生桥/存储在 iframe
# 环境的可用性无法在所有设备上保证，且 apply 的 try/finally 无 catch，任何一步
# reject 都静默无响应。主帧（index.html）有 mini-boot 装好的 almaIOSConfig 与
# 原生 Capacitor —— v1.0 配对成功的正是这个环境。iframe 只做解码，校验通过后
# 把链接转发主帧执行（主帧 applyPairingLink 成功后自行 location.reload()）。
python3 - << 'PYEOF'
import glob

target = None
for p in sorted(glob.glob('www/assets/*.js')):
    with open(p, encoding='utf-8', errors='ignore') as f:
        if 'function PhoneSettings(' in f.read():
            target = p
            break
assert target, '手机设置 chunk（PhoneSettings）未找到'

s = open(target, encoding='utf-8').read()
OLD = 'if (!text || !cfg.isPairingLink?.(text)) return false;\n      setBusy(true);'
NEW = '''if (!text || !cfg.isPairingLink?.(text)) return false;
      if (window.parent && window.parent !== window) {
        try { window.parent.postMessage({ type: "alma-android-apply-pairing", link: text }, "*"); } catch {}
        return true;
      }
      setBusy(true);'''
assert OLD in s, 'applyPairing 校验锚点未找到'
s = s.replace(OLD, NEW, 1)
open(target, 'w', encoding='utf-8').write(s)
print('✓ 配对执行转发主帧 →', target.split('/')[-1])
PYEOF

# ── 2.9 主题切换：iframe 内点击立即同步主帧 + 容忍 settings 未加载 ────
# 官方 setTheme 首行 `if (!settings) return;` —— settings SWR 未就绪时点击是静默
# no-op；且 iframe 内切换只作用于 iframe 文档，主界面不动（用户看到"点不了"）。
# 修复：先 postMessage 通知宿主同步切换主文档（shim 端换 class + 写 appearance-cache），
# 再走官方 updateSettings 持久化；settings 缺失时也照常提交（本地引擎会补默认值）。
python3 - << 'PYEOF'
import glob

target = None
for p in sorted(glob.glob('www/assets/*.js')):
    with open(p, encoding='utf-8', errors='ignore') as f:
        if 'const setTheme = async (newTheme) =>' in f.read():
            target = p
            break
assert target, 'ThemeContext chunk（setTheme）未找到'

s = open(target, encoding='utf-8').read()
OLD = 'const setTheme = async (newTheme) => {\n    if (!settings) return;\n    await updateSettings({'
NEW = '''const setTheme = async (newTheme) => {
    try {
      if (window.parent && window.parent !== window) window.parent.postMessage({ type: "alma-android-theme", theme: newTheme }, "*");
    } catch {}
    if (!settings) {
      await updateSettings({ general: { theme: newTheme } });
      return;
    }
    await updateSettings({'''
assert OLD in s, 'setTheme 锚点未找到'
s = s.replace(OLD, NEW, 1)
open(target, 'w', encoding='utf-8').write(s)
print('✓ 主题切换同步主帧 →', target.split('/')[-1])
PYEOF

# ── 3.0 手机 hero：移除"连接你的 Mac"配对引导块 ──────────────────────
# 未配对/无 provider 时 hero 下方渲染 connectHint 文案 + connectMac 按钮；
# 配对入口保留在 设置 → 我的 Mac，hero 只留标题/快捷 pill/输入框。
python3 - << 'PYEOF'
import glob

target = None
for p in sorted(glob.glob('www/assets/*.js')):
    with open(p, encoding='utf-8', errors='ignore') as f:
        if 'phone.home.connectHint' in f.read():
            target = p
            break
assert target, 'App chunk（phone.home.connectHint）未找到'

s = open(target, encoding='utf-8').read()
HEAD = 'children: isPhone ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment'
assert s.count(HEAD) == 1, 'hero phone 块头不唯一'
i = s.find(HEAD)
j = s.find('] }) :', i)
assert j > i, 'hero phone 块尾未找到'
s = s[:i] + 'children: isPhone ? null :' + s[j + len('] }) :'):]
open(target, 'w', encoding='utf-8').write(s)
print('✓ hero 配对引导块移除 →', target.split('/')[-1])
PYEOF

# ── 3.5 手机桥：复用官方 connected chunk 的桥实现（almaIOSConfig/E2E/全量 Electron shim）──
# 官方 iOS 壳由原生注入这些桥；Android 壳用 connected-D8mcBngn.js 里的 JS 参考实现。
# boot() 是桌面 handoff 流程（要求 #connect? hash、platform="connected"），不能跑——
# 换成迷你 boot：只装桥不渲染。全部 ??=，与 shim 共存（shim 先执行，android 身份优先）。
# 注意：不调 installConnectedWindowBridges（它非 ??= 覆盖 settingsWindow 为桌面 hash 路由）。
python3 - << 'PYEOF'
import re

p = 'www/assets/connected-D8mcBngn.js'
s = open(p, encoding='utf-8').read()
MINI_BOOT = '''// alma-android: 手机迷你 boot —— 只装桥，不做 connected 桌面渲染/hash 配对。
installElectronShim();
installE2EBridge();
installConnectedApprovalBridge(apiClient, E2E_SENTINEL_BASE);
installConnectedQuestionBridge(apiClient, E2E_SENTINEL_BASE);
installRendererFetchTimeoutGuard();
window.systemFile.openInPreview = (path) => downloadHostFile(path, E2E_SENTINEL_BASE);
window.systemFile.readAsDataUrl = (path) => readHostFileAsDataUrl(path, E2E_SENTINEL_BASE);
'''
new = re.sub(r'void boot\(\)\.catch\(\(error\) => \{.*?\}\);', MINI_BOOT, s, count=1, flags=re.S)
assert new != s, 'boot() 尾调用未找到，connected chunk 结构变了'
open(p, 'w', encoding='utf-8').write(new)
print('✓ connected chunk → 迷你 boot（装桥不渲染）')

# 入口注入：<head> 里 entry 模块之前加载 connected 模块（同为 deferred，按序执行；
# shim 是 body 里的非延迟脚本，仍最先执行 → ??= 以 shim 为准）
for p in ['www/index.html', 'www/settings.html']:
    s = open(p, encoding='utf-8').read()
    if 'connected-D8mcBngn.js' in s:
        continue
    tag = '<script type="module" crossorigin src="./assets/connected-D8mcBngn.js"></script>'
    m = re.search(r'<script type="module"[^>]*src="[^"]*"', s)
    s = s[:m.start()] + tag + '\n  ' + s[m.start():]
    open(p, 'w', encoding='utf-8').write(s)
    print('✓ 注入桥模块', p)
PYEOF

# ── 3.9 文案中性化：iOS 专属措辞 → 设备中性（只动可见整句，不碰 UA/平台检测代码） ──
python3 - << 'PYEOF'
import glob
REPL = [
    ('On this iPhone', 'On this device'),
    ('runs on this iPhone', 'runs on this device'),
    ('This iPhone only', 'This device only'),
    ('Pair this iPhone', 'Pair this device'),
    ('Connect this iPhone', 'Connect this device'),
    ('This iPhone drives', 'This device drives'),
    ('仅在这台 iPhone 上', '仅在这台设备上'),
    ('在这台 iPhone 上', '在这台设备上'),
    ('这台 iPhone', '这台设备'),
    ('iPhone 上で動作します', '端末上で動作します'),
    ('iPhone のみ', 'この端末のみ'),
    ('この iPhone で Alma を実行するときに使うキー', 'この端末で Alma を実行するときに使うキー'),
    ('この iPhone をペアリングして始めましょう', 'この端末をペアリングして始めましょう'),
    ('この iPhone だけで使う', 'この端末だけで使う'),
    ('この iPhone', 'この端末'),
    ('Use this iPhone only', 'Use this device only'),
    ('Allow it in iOS Settings → Alma.', 'Allow it in system Settings → Alma.'),
    ('相机权限已关闭。请在 iOS 设置 → Alma 中允许。', '相机权限已关闭。请在系统设置 → Alma 中允许。'),
    ('カメラへのアクセスがオフです。iOS の設定 → Alma で許可してください。', 'カメラへのアクセスがオフです。端末の設定 → Alma で許可してください。'),
    # 本机模式尚不完善（本地生成等未实现），设置区标题标注 beta（用户要求）
    ('onThisIphone: "On this device"', 'onThisIphone: "On this device (beta)"'),
    ('onThisIphone: "本机"', 'onThisIphone: "本机模式（beta）"'),
    ('onThisIphone: "この端末"', 'onThisIphone: "この端末（beta）"'),
]
n = 0
for p in glob.glob('www/assets/*.js'):
    s = open(p, encoding='utf-8').read()
    o = s
    for a, b in REPL:
        s = s.replace(a, b)
    if s != o:
        open(p, 'w', encoding='utf-8').write(s)
        n += sum(o.count(a) for a, _ in REPL)
print(f'✓ 文案中性化 {n} 处')
PYEOF

# ── 3.95 手机顶栏：触控尺寸 + 标题让位 ──────────────────────────
# renderer 的尺寸全走 rem，root font-size 默认 13px（UI_FONT_SIZE_DEFAULT=13，
# compact 密度）→ h-11 实算 35.75px、图标 size-4 只有 13px，远低于 Android
# 48dp 触控标准；"Outputs & Sources" 的 right 偏移又按桌面三个窗口控件算成
# 116px，手机上把按钮顶到屏幕中部压住会话标题。详见脚本内注释。
python3 scripts/patch-phone-chrome.py

echo "✓ www/ 就绪（$(du -sh www | cut -f1)）— npx cap sync android"
