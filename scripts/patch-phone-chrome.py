#!/usr/bin/env python3
"""手机顶栏适配：导航按钮触控尺寸 + 标题让位。

renderer 里所有尺寸走 rem，而 root font-size 默认 13px
（UI_FONT_SIZE_DEFAULT = 13、UI_DENSITY_DEFAULT = compact），
所以 h-11（2.75rem）实算只有 35.75px、图标 size-4 只有 13px，
两者都低于 Android 48dp 的最小触控标准 —— 手机上顶栏按钮明显偏小。

另一处：ThreadResourcesButton（"Outputs & Sources"）的 right 偏移
按桌面 Windows 三个窗口控件算成 116px，手机壳没有那三个控件，
白留 116px 把按钮顶到屏幕中部，正好压在会话标题上。

⚠️ 关键教训（2026-10-29 踩坑）：**不要用 Tailwind 任意值类**
（h-[52px] / ml-[56px] / mr-[106px]）——Alma 的 CSS 是构建期预编译的，
只在源码里出现过的类才有对应规则。手机上这些类统统是死的：补丁一上，
main-titlebar-frame 拿不到高度 → 只剩 absolute 子元素 → 高度 0，
标题被 overflow-hidden 裁掉（现象：顶栏标题整个消失）。
⇒ 所有物理尺寸一律用 **内联 style**，不依赖 CSS 产物。

本补丁只改 isIOS（= 手机壳语义，Android 壳由 shim 把 isIOS 置 true）分支：
  1. main-titlebar-frame 手机态高度 52px（内联）
  2. TitleBar 52px 高 + 左对齐（原来 justify-center 居中）
  3. 标题：左让 56px（侧栏按钮）、右让 106px（资源 + 新建聊天）
  4. 顶栏按钮行 / 资源宿主 48px 高（按钮 44px 才能垂直居中）
  5. 资源按钮 right 偏移 116px → 56px，紧贴新建聊天右侧

按钮与图标自身的尺寸由 shim 注入的 CSS 兜（物理 px + !important，
因为 [&_svg:not([class*='size-'])]:size-4 会盖掉 lucide 的 size 属性）；
资源按钮的 aria-label 是硬编码英文，可安全当选择器。

桌面（isMac / Win-Linux）分支一字未动。
"""
import sys

P = 'www/assets/App-CHUt1SP7.js'
s = open(P, encoding='utf-8').read()
n = 0

REPL = [
    # 1a. 标题条框架：手机态不再靠 h-12（39px）/ h-[52px]（无此规则），改内联高度
    ('isIOS && !chatThreadInfo ? "h-0" : "h-12",',
     'isIOS && !chatThreadInfo ? "h-0" : isIOS ? "" : "h-12",',
     '框架去掉无用高度类'),

    # 1b. …高度交给内联 style（框架只有 absolute 子元素，没高度就塌成 0 → 标题被裁）
    ('contentVisible ? "opacity-100" : "opacity-0"\n'
     '              ),\n'
     '              style: { transitionDuration: immediate ? "0ms" : `${fadeDuration}ms` },',
     'contentVisible ? "opacity-100" : "opacity-0"\n'
     '              ),\n'
     '              style: { transitionDuration: immediate ? "0ms" : `${fadeDuration}ms`, '
     '...(isIOS && chatThreadInfo ? { height: 52 } : {}) },',
     '框架高度 52px（内联）'),

    # 2 + 3. iOS/手机 TitleBar：52px + 左对齐；标题去掉 70vw 居中限制，左右让位按钮
    ('"desktop-title-bar flex items-center justify-center h-11 select-none relative z-50 transition-shadow duration-200",\n'
     '          showBottomShadow && "shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-b border-border/50"\n'
     '        ),\n'
     '        children: displayThreadInfo ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-capture-redact": "center", '
     'className: "text-sm font-medium truncate max-w-[70vw] px-3", children:',
     '"desktop-title-bar flex items-center justify-start select-none relative z-50 transition-shadow duration-200",\n'
     '          showBottomShadow && "shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-b border-border/50"\n'
     '        ),\n'
     '        style: { height: 52 },\n'
     '        children: displayThreadInfo ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-capture-redact": "center", '
     'className: "text-sm font-medium truncate flex-1 min-w-0 text-left", '
     'style: { marginLeft: 56, marginRight: 106 }, children:',
     'TitleBar 52px / 左对齐 / 标题让位'),

    # 4a. 顶栏按钮行：手机态 48px 高
    ('"fixed h-12 flex items-center gap-1 z-[100] pointer-events-none ease-out",',
     '"fixed flex items-center gap-1 z-[100] pointer-events-none ease-out",',
     '按钮行去掉 h-12'),
    ('          top: isIOS ? "max(4px, env(safe-area-inset-top))" : "4px",',
     '          top: isIOS ? "max(4px, env(safe-area-inset-top))" : "4px", height: isIOS ? 48 : void 0,',
     '按钮行 48px（内联）'),

    # 4b. 资源宿主高度对齐按钮行
    ('"fixed top-1 z-[100] flex h-12 items-center pointer-events-none",\n'
     '        style: {\n'
     '          right: rightPx,\n'
     '          paddingRight: "8px",',
     '"fixed top-1 z-[100] flex items-center pointer-events-none",\n'
     '        style: {\n'
     '          right: rightPx,\n'
     '          paddingRight: "8px",\n'
     '          height: isPhoneShell() ? 48 : void 0,',
     '资源宿主 48px（内联）'),

    # 5. 资源按钮 right 偏移：桌面窗口控件 116px → 手机 56px
    ('let rightPx = (isWin98Theme ? isMac ? 66 : 116 : isMac || windowControlsHidden ? 4 : 116) + panelReserve;',
     'let rightPx = (isWin98Theme ? isMac ? 66 : 116 : isPhoneShell() ? 56 : isMac || windowControlsHidden ? 4 : 116) + panelReserve;',
     '资源按钮 right 56px'),
]

for old, new, why in REPL:
    c = s.count(old)
    if c != 1:
        sys.exit(f'✗ 锚点数异常（{c}）: {why}\n  {old[:90]}')
    s = s.replace(old, new, 1)
    n += 1
    print(f'  ✓ {why}')

open(P, 'w', encoding='utf-8').write(s)
print(f'✓ 手机顶栏补丁 {n} 处 → {P}')
