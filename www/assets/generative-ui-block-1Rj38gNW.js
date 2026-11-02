!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "alma@0.4.378" };
  } catch (e2) {
  }
}();
;
{
  try {
    (function() {
      var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "aa53cf6d-3db9-4035-9003-6ca1ffe7fe79", e._sentryDebugIdIdentifier = "sentry-dbid-aa53cf6d-3db9-4035-9003-6ca1ffe7fe79");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { A as ArtifactWorkspaceContext } from "./artifactWorkspaceContextDef-Y91jRAgg.js";
import { L as LoaderCircle } from "./loader-circle-BsCo_wlW.js";
import { i as instance } from "./createLucideIcon-sFEqYeet.js";
const registry = /* @__PURE__ */ new Map();
function registerGenerativeUIComponent(component) {
  registry.set(component.name, component);
}
function unregisterGenerativeUIComponent(name) {
  return registry.delete(name);
}
function isGenerativeUITool(toolName) {
  return registry.has(toolName);
}
function getGenerativeUIComponent(name) {
  return registry.get(name);
}
function getAllGenerativeUIComponents() {
  return Array.from(registry.values());
}
function clearGenerativeUIRegistry() {
  registry.clear();
}
function getRegistrySize() {
  return registry.size;
}
const THEME_CSS = `
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --card: #ffffff;
  --card-foreground: #1a1a1a;
  --popover: #eef2f6;
  --popover-foreground: #1a1a1a;
  --primary: #7299a0;
  --primary-foreground: #f8fafc;
  --secondary: #e8ecf1;
  --secondary-foreground: #1e293b;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #f1f5f9;
  --accent-foreground: #1e293b;
  --destructive: #c45c5c;
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #cbd5e1;
  --radius: 0.625rem;
  --chart-1: #e07a5f;
  --chart-2: #3d9ea0;
  --chart-3: #2d5f6e;
  --chart-4: #d4a843;
  --chart-5: #c98a4f;
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: "SF Mono", "Fira Code", "Fira Mono", monospace;
}
[data-theme="dark"], html.dark {
  --background: #282c34;
  --foreground: #dcdfe4;
  --card: #21252b;
  --card-foreground: #dcdfe4;
  --popover: #21252b;
  --popover-foreground: #dcdfe4;
  --primary: #61afef;
  --primary-foreground: #0c111a;
  --secondary: #3e4451;
  --secondary-foreground: #f2f4f8;
  --muted: #3b404c;
  --muted-foreground: #8b92a4;
  --accent: #98c379;
  --accent-foreground: #0f141b;
  --destructive: #b56b6f;
  --destructive-foreground: #ffffff;
  --border: #3e4451;
  --input: #4b5263;
  --ring: rgba(97, 175, 239, 0.25);
  --chart-1: #61afef;
  --chart-2: #c678dd;
  --chart-3: #e5c07b;
  --chart-4: #98c379;
  --chart-5: #e06c75;
}
`;
const WIDGET_THEME_VARS = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--popover",
  "--popover-foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--destructive",
  "--destructive-foreground",
  "--border",
  "--input",
  "--ring",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5"
];
const WIN98_WIDGET_CSS = `
* { border-radius: 0 !important; }
body { font-family: Tahoma, 'MS Sans Serif', Arial, sans-serif; }
button {
  background: #c0c0c0; color: #0a0a0a; border: none;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
}
button:hover { background: #c0c0c0; }
button:active {
  transform: none;
  box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080;
}
button.primary {
  background: #c0c0c0; color: #0a0a0a;
  box-shadow: inset -2px -2px #0a0a0a, inset 1px 1px #0a0a0a, inset 2px 2px #ffffff, inset -3px -3px #808080, inset 3px 3px #dfdfdf;
}
button.primary:hover { opacity: 1; }
input[type="text"], input[type="number"], input[type="email"], input[type="search"], textarea, select {
  background: #ffffff; border: none;
  box-shadow: inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
}
input:focus, textarea:focus, select:focus { box-shadow: inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a; outline: 1px dotted #0a0a0a; outline-offset: -4px; }
input[type="range"] {
  -webkit-appearance: none; appearance: none;
  height: 21px; background: transparent; border: none; box-shadow: none; padding: 0;
}
input[type="range"]:focus { outline: none; }
input[type="range"]::-webkit-slider-runnable-track {
  height: 2px; background: #000; border-right: 1px solid grey; border-bottom: 1px solid grey;
  box-shadow: 1px 0 0 #fff, 1px 1px 0 #fff, 0 1px 0 #fff, -1px 0 0 #a9a9a9, -1px -1px 0 #a9a9a9, 0 -1px 0 #a9a9a9, -1px 1px 0 #fff, 1px -1px #a9a9a9;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 11px; height: 21px; margin-top: -10px; border: none; border-radius: 0;
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 0v16h2v2h2v2h1v-1H3v-2H1V1h9V0z' fill='%23fff'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1 1v15h1v1h1v1h1v1h2v-1h1v-1h1v-1h1V1z' fill='%23C0C7C8'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 1h1v15H8v2H6v2H5v-1h2v-2h2z' fill='%2387888F'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10 0h1v16H9v2H7v2H5v1h1v-2h2v-2h2z' fill='%23000'/%3E%3C/svg%3E");
  box-shadow: none;
}
input[type="checkbox"], input[type="radio"] { accent-color: #000080; }
.card { background: #c0c0c0; color: #0a0a0a; border: none;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
.badge { background: #ffffff; color: #0a0a0a; box-shadow: inset -1px -1px #dfdfdf, inset 1px 1px #808080; }
pre, code { background: #ffffff; border: none; box-shadow: inset -1px -1px #ffffff, inset 1px 1px #808080; }
tr:hover td { background: #000080; color: #ffffff; }
`;
const WINXP_WIDGET_CSS = `
body { font-family: Tahoma, 'Segoe UI', Arial, sans-serif; }
::selection { background: #316ac5; color: #fff; }
button {
  background: linear-gradient(180deg, #fff, #ecebe5 86%, #d8d0c4); color: #1a1815;
  border: 1px solid #003c74; border-radius: 3px; box-shadow: none;
}
button:hover {
  background: linear-gradient(180deg, #fff, #ecebe5 86%, #d8d0c4);
  box-shadow: inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a;
  opacity: 1;
}
button:active {
  transform: none;
  background: linear-gradient(180deg, #cdcac3, #e3e3db 8%, #e5e5de 94%, #f2f2f1);
  box-shadow: none;
}
button.primary {
  background: linear-gradient(180deg, #fff, #ecebe5 86%, #d8d0c4); color: #1a1815;
  box-shadow: inset -1px 1px #cee7ff, inset 1px 2px #98b8ea, inset -2px 2px #bcd4f6, inset 1px -1px #89ade4, inset 2px -2px #89ade4;
}
button.primary:hover { opacity: 1; }
input[type="text"], input[type="number"], input[type="email"], input[type="search"], textarea, select {
  background: #ffffff; border: 1px solid #7f9db9; border-radius: 0; box-shadow: none;
}
input:focus, textarea:focus, select:focus { outline: 1px dotted #000; outline-offset: -4px; }
input[type="range"] {
  -webkit-appearance: none; appearance: none;
  height: 21px; background: transparent; border: none; box-shadow: none; padding: 0;
}
input[type="range"]:focus { outline: none; }
input[type="range"]::-webkit-slider-runnable-track {
  width:100%;
  height:2px;
  box-sizing:border-box;
  background:#ecebe4;
  border-right:1px solid #f3f2ea;
  border-bottom:1px solid #f3f2ea;
  border-radius:2px;
  box-shadow:1px 0 0 #fff,1px 1px 0 #fff,0 1px 0 #fff,-1px 0 0 #9d9c99,-1px -1px 0 #9d9c99,0 -1px 0 #9d9c99,-1px 1px 0 #fff,1px -1px #9d9c99;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 11px; height: 21px; margin-top: -10px; border: none; border-radius: 0;
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -0.5 11 21' shape-rendering='crispEdges'%3E%3Cpath stroke='%23becbd3' d='M1 0h1M0 1h1'/%3E%3Cpath stroke='%23b6c5cd' d='M2 0h1M0 2h1'/%3E%3Cpath stroke='%23b5c4cd' d='M3 0h5M0 3h1M0 4h1M0 5h1M0 6h1M0 7h1M0 8h1M0 9h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1'/%3E%3Cpath stroke='%23afbfc8' d='M8 0h1M0 14h1'/%3E%3Cpath stroke='%239fb2be' d='M9 0h1M0 15h1'/%3E%3Cpath stroke='%23a6d1b1' d='M1 1h1'/%3E%3Cpath stroke='%236fd16e' d='M2 1h1M1 2h1'/%3E%3Cpath stroke='%2367ce65' d='M3 1h1M1 3h1'/%3E%3Cpath stroke='%2366ce64' d='M4 1h3'/%3E%3Cpath stroke='%2362cd61' d='M7 1h1'/%3E%3Cpath stroke='%2345c343' d='M8 1h1M7 2h1'/%3E%3Cpath stroke='%2363ac76' d='M9 1h1M2 16h1m0 1h1m0 1h1'/%3E%3Cpath stroke='%23879aa6' d='M10 1h1'/%3E%3Cpath stroke='%2363cd62' d='M2 2h1'/%3E%3Cpath stroke='%2349c547' d='M3 2h1M2 3h1'/%3E%3Cpath stroke='%2347c446' d='M4 2h3'/%3E%3Cpath stroke='%2321b71f' d='M8 2h1'/%3E%3Cpath stroke='%231da41c' d='M9 2h1'/%3E%3Cpath stroke='%237d8e99' d='M10 2h1'/%3E%3Cpath stroke='%2325b923' d='M3 3h1'/%3E%3Cpath stroke='%2321b81f' d='M4 3h4M2 15h1'/%3E%3Cpath stroke='%231ea71c' d='M8 3h1'/%3E%3Cpath stroke='%231b9619' d='M9 3h1'/%3E%3Cpath stroke='%23778892' d='M10 3h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1'/%3E%3Cpath stroke='%23f7f7f4' d='M1 4h1M1 5h1M1 6h1M1 7h1M1 8h1M1 9h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1'/%3E%3Cpath stroke='%23f5f5f2' d='M2 4h1M2 5h1M2 6h1M2 7h1M2 8h1M2 9h1m-1 1h1m-1 1h1m-1 1h1m-1 1h1'/%3E%3Cpath stroke='%23f3f3ef' d='M3 4h5M3 5h5M3 6h5M3 7h5M3 8h5M3 9h5m-5 1h5m-5 1h5m-5 1h5m-5 1h4m-4 1h3m-2 1h1'/%3E%3Cpath stroke='%23dcdcd9' d='M8 4h1M8 5h1M8 6h1M8 7h1M8 8h1M8 9h1m-1 1h1m-1 1h1m-1 1h1'/%3E%3Cpath stroke='%23c3c3c0' d='M9 4h1M9 5h1M9 6h1M9 7h1M9 8h1M9 9h1m-1 1h1m-1 1h1m-1 1h1'/%3E%3Cpath stroke='%23f1f1ed' d='M7 13h1m-2 1h1m-2 1h1'/%3E%3Cpath stroke='%23dbdbd8' d='M8 13h1'/%3E%3Cpath stroke='%23c4c4c1' d='M9 13h1'/%3E%3Cpath stroke='%234bc549' d='M1 14h1'/%3E%3Cpath stroke='%23f4f4f1' d='M2 14h1'/%3E%3Cpath stroke='%23e6e6e2' d='M7 14h1m-2 1h1'/%3E%3Cpath stroke='%23cececa' d='M8 14h1'/%3E%3Cpath stroke='%231a9319' d='M9 14h1'/%3E%3Cpath stroke='%23788993' d='M10 14h1'/%3E%3Cpath stroke='%2369b17b' d='M1 15h1'/%3E%3Cpath stroke='%23f2f2ee' d='M3 15h1m0 1h1'/%3E%3Cpath stroke='%23d0d0cc' d='M7 15h1m-2 1h1'/%3E%3Cpath stroke='%231a9118' d='M8 15h1m-2 1h1m-2 1h1'/%3E%3Cpath stroke='%234c845a' d='M9 15h1'/%3E%3Cpath stroke='%2372838d' d='M10 15h1'/%3E%3Cpath stroke='%2391a6b2' d='M1 16h1m0 1h1m0 1h1m0 1h1'/%3E%3Cpath stroke='%2321b61f' d='M3 16h1m0 1h1'/%3E%3Cpath stroke='%23e7e7e3' d='M5 16h1'/%3E%3Cpath stroke='%234b8259' d='M8 16h1m-2 1h1m-2 1h1'/%3E%3Cpath stroke='%236e7e88' d='M9 16h1m-2 1h1m-2 1h1m-2 1h1'/%3E%3Cpath stroke='%23d7d7d4' d='M5 17h1'/%3E%3Cpath stroke='%231da21b' d='M5 18h1'/%3E%3Cpath stroke='%23589868' d='M5 19h1'/%3E%3Cpath stroke='%2380929e' d='M5 20h1'/%3E%3C/svg%3E");
  box-shadow: none;
}
input[type="checkbox"], input[type="radio"] { accent-color: #316ac5; }
.card { background: #ffffff; color: #1a1815; border: 1px solid #aca899; border-radius: 3px; box-shadow: none; }
.badge { background: #316ac5; color: #ffffff; border-radius: 3px; }
pre, code { background: #ffffff; border: 1px solid #7f9db9; box-shadow: none; }
tr:hover td { background: #316ac5; color: #ffffff; }
`;
const LONGHORN_WIDGET_CSS = `
body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
::selection { background: #86b2e3; color: #fff; }
button {
  background: linear-gradient(180deg, #f4fcfc 20%, #d7e4fb 35%); color: #3a3f4a;
  border: 1px solid #9aa5c0; border-radius: 3px; box-shadow: none;
}
button:hover { background: linear-gradient(180deg, #f4fcfc 20%, #d7e4fb 35%); box-shadow: inset 0 0 3px 4px #d0e2ff; opacity: 1; }
button:active { transform: none; background: linear-gradient(180deg, #d5e0f2, #e4ecf9); box-shadow: none; }
button.primary {
  background: linear-gradient(180deg, #f4fcfc 20%, #d7e4fb 35%); color: #3a3f4a;
  border-color: #7e9cc9; box-shadow: inset 0 0 3px 2px #d0e2ff;
}
button.primary:hover { opacity: 1; }
input[type="text"], input[type="number"], input[type="email"], input[type="search"], textarea, select {
  background: #ffffff; color: #3a3f4a; border: 1px solid #a5b2cf; border-radius: 3px; box-shadow: none;
}
input:focus, textarea:focus, select:focus { outline: none; border-color: #86b2e3; box-shadow: 0 0 0 1px rgba(134,178,227,0.45); }
input[type="range"] {
  -webkit-appearance: none; appearance: none;
  height: 18px; background: transparent; border: none; box-shadow: none; padding: 0;
}
input[type="range"]:focus { outline: none; }
input[type="range"]::-webkit-slider-runnable-track {
  height: 4px; background: #ffffff; border: 1px solid #a5b2cf; border-radius: 2px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 12px; height: 18px; margin-top: -8px; border-radius: 3px;
  background: linear-gradient(180deg, #cfe3fb, #8db9ef 45%, #70a5e8); border: 1px solid #6b9cd6;
  box-shadow: inset 0 1px rgba(255,255,255,0.6);
}
input[type="checkbox"], input[type="radio"] { accent-color: #4f88d6; }
.card { background: #ffffff; color: #3a3f4a; border: 1px solid #c9d4ea; border-radius: 3px; box-shadow: none; }
.badge { background: #86b2e3; color: #ffffff; border-radius: 3px; }
pre, code { background: #f5f8fd; border: 1px solid #c9d4ea; }
tr:hover td { background: #86b2e3; color: #ffffff; }
`;
const LONGHORN_DARK_WIDGET_CSS = `
body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
::selection { background: #8578c7; color: #fff; }
button {
  background: linear-gradient(180deg, #2e2e36 20%, #232329 35%); color: #e4e4ea;
  border: 1px solid #45454f; border-radius: 3px; box-shadow: none;
}
button:hover { background: linear-gradient(180deg, #2e2e36 20%, #232329 35%); box-shadow: inset 0 0 3px 4px rgba(133,120,199,0.45); opacity: 1; }
button:active { transform: none; background: linear-gradient(180deg, #1a1a20, #24242b); box-shadow: none; }
button.primary {
  background: linear-gradient(180deg, #2e2e36 20%, #232329 35%); color: #e4e4ea;
  border-color: #6f63ad; box-shadow: inset 0 0 3px 2px rgba(133,120,199,0.4);
}
button.primary:hover { opacity: 1; }
input[type="text"], input[type="number"], input[type="email"], input[type="search"], textarea, select {
  background: #101014; color: #e4e4ea; border: 1px solid #3c3c46; border-radius: 3px; box-shadow: none;
}
input:focus, textarea:focus, select:focus { outline: none; border-color: #8578c7; box-shadow: 0 0 0 1px rgba(133,120,199,0.45); }
input[type="range"] {
  -webkit-appearance: none; appearance: none;
  height: 18px; background: transparent; border: none; box-shadow: none; padding: 0;
}
input[type="range"]:focus { outline: none; }
input[type="range"]::-webkit-slider-runnable-track {
  height: 4px; background: #101014; border: 1px solid #3c3c46; border-radius: 2px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 12px; height: 18px; margin-top: -8px; border-radius: 3px;
  background: linear-gradient(180deg, #a99fdb, #8578c7 45%, #6f63ad); border: 1px solid #5c5194;
  box-shadow: inset 0 1px rgba(255,255,255,0.25);
}
input[type="checkbox"], input[type="radio"] { accent-color: #8578c7; }
.card { background: #1d1d22; color: #e4e4ea; border: 1px solid #33333c; border-radius: 3px; box-shadow: none; }
.badge { background: #8578c7; color: #ffffff; border-radius: 3px; }
pre, code { background: #17171a; border: 1px solid #2e2e36; }
tr:hover td { background: #8578c7; color: #ffffff; }
`;
function buildThemeOverrideCss(theme) {
  let css = "";
  if (theme.cssVars && Object.keys(theme.cssVars).length > 0) {
    const lines = Object.entries(theme.cssVars).filter(([key]) => WIDGET_THEME_VARS.includes(key)).map(([key, value]) => `  ${key}: ${value};`).join("\n");
    css += `
:root, [data-theme="dark"], html.dark {
${lines}
}
`;
  }
  const retro = theme.retroTheme ?? (theme.win98 ? "win98" : void 0);
  if (retro === "win98") {
    css += WIN98_WIDGET_CSS;
  } else if (retro === "winxp") {
    css += WINXP_WIDGET_CSS;
  } else if (retro === "longhorn") {
    css += LONGHORN_WIDGET_CSS;
  } else if (retro === "longhorn-dark") {
    css += LONGHORN_DARK_WIDGET_CSS;
  }
  return css;
}
function normalizeTheme(theme) {
  return typeof theme === "boolean" ? { isDark: theme } : theme;
}
const COLOR_RAMPS = {
  purple: ["#EEEDFE", "#CECBF6", "#AFA9EC", "#534AB7", "#3C3489"],
  teal: ["#E1F5EE", "#9FE1CB", "#5DCAA5", "#0F6E56", "#085041"],
  coral: ["#FAECE7", "#F5C4B3", "#F0997B", "#993C1D", "#712B13"],
  pink: ["#FBEAF0", "#F4C0D1", "#ED93B1", "#993556", "#72243E"],
  gray: ["#F1EFE8", "#D3D1C7", "#B4B2A9", "#5F5E5A", "#444441"],
  blue: ["#E6F1FB", "#B5D4F4", "#85B7EB", "#185FA5", "#0C447C"],
  green: ["#EAF3DE", "#C0DD97", "#97C459", "#3B6D11", "#27500A"],
  amber: ["#FAEEDA", "#FAC775", "#EF9F27", "#854F0B", "#633806"],
  red: ["#FCEBEB", "#F7C1C1", "#F09595", "#A32D2D", "#791F1F"]
};
const RAMP_CLASSES = Object.keys(COLOR_RAMPS).map((name) => `.c-${name}`).join(", ");
const SVG_PREBUILT_CSS = `
:root { --p: var(--foreground); --s: var(--muted-foreground); --t: var(--muted-foreground); --bg2: var(--muted); --b: var(--border); }
svg .t { font-size: 14px; fill: var(--foreground); }
svg .ts { font-size: 12px; fill: var(--muted-foreground); }
svg .th { font-size: 14px; font-weight: 500; fill: var(--foreground); }
svg .leader { stroke: var(--muted-foreground); stroke-width: 0.5; stroke-dasharray: 3 3; fill: none; }
${Object.entries(COLOR_RAMPS).map(
  ([name, [s50, s100, s200, s600, s800]]) => `svg .c-${name} { --ramp-fill: ${s50}; --ramp-stroke: ${s600}; --ramp-title: ${s800}; --ramp-sub: ${s600}; }
html.dark svg .c-${name} { --ramp-fill: ${s800}; --ramp-stroke: ${s200}; --ramp-title: ${s100}; --ramp-sub: ${s200}; }`
).join("\n")}
svg :is(${RAMP_CLASSES}):is(rect, circle, ellipse, polygon):not([fill]),
svg :is(${RAMP_CLASSES}) :is(rect, circle, ellipse, polygon):not([fill]) { fill: var(--ramp-fill); }
svg :is(${RAMP_CLASSES}):is(rect, circle, ellipse, polygon):not([stroke]),
svg :is(${RAMP_CLASSES}) :is(rect, circle, ellipse, polygon):not([stroke]) { stroke: var(--ramp-stroke); }
svg :is(${RAMP_CLASSES}) text:not(.ts) { fill: var(--ramp-title); }
svg :is(${RAMP_CLASSES}) text.ts { fill: var(--ramp-sub); }
`;
const FORM_STYLES_CSS = `
* { box-sizing: border-box; margin: 0; }
html { background: transparent; overflow: hidden; }
body {
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.6;
  color: var(--foreground);
  background: transparent;
  -webkit-font-smoothing: antialiased;
  padding: 0;
  overflow: hidden;
}
h1, h2, h3, h4, h5, h6 { color: var(--foreground); font-weight: 600; }
h1 { font-size: 1.5rem; margin-bottom: 0.75rem; }
h2 { font-size: 1.25rem; margin-bottom: 0.5rem; }
h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
p { margin-bottom: 0.5rem; color: var(--foreground); }
small, .text-muted { color: var(--muted-foreground); }

button {
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--background);
  color: var(--foreground);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
}
button:hover { background: var(--muted); border-color: var(--muted-foreground); }
button:active { transform: scale(0.98); }
button.primary {
  background: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
}
button.primary:hover { opacity: 0.9; }
button.destructive {
  background: transparent;
  color: var(--destructive);
  border-color: var(--destructive);
}
button.destructive:hover { background: var(--destructive); color: var(--destructive-foreground); }

input[type="text"], input[type="number"], input[type="email"], input[type="search"],
textarea, select {
  font-family: inherit;
  font-size: 13px;
  padding: 6px 12px;
  height: 34px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--background);
  color: var(--foreground);
  transition: border-color 0.15s, box-shadow 0.15s;
  width: 100%;
}
input:hover, textarea:hover, select:hover { border-color: var(--muted-foreground); }
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px var(--ring);
}
textarea { height: auto; min-height: 72px; resize: vertical; }
input::placeholder, textarea::placeholder { color: var(--muted-foreground); }

input[type="range"] {
  -webkit-appearance: none; appearance: none;
  height: 4px; background: var(--border); border-radius: 2px; border: none; outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
  background: var(--primary); cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}
input[type="checkbox"], input[type="radio"] {
  width: 15px; height: 15px; accent-color: var(--primary);
}
label { font-size: 13px; font-weight: 500; color: var(--foreground); }

a { color: var(--primary); text-decoration: none; }
a:hover { text-decoration: underline; }

code {
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--muted);
  color: var(--foreground);
  padding: 2px 5px;
  border-radius: calc(var(--radius) * 0.6);
}
pre {
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--muted);
  color: var(--foreground);
  padding: 12px;
  border-radius: var(--radius);
  overflow-x: auto;
  border: 1px solid var(--border);
}

table { width: 100%; border-collapse: collapse; font-size: 13px; }
th { text-align: left; font-weight: 600; padding: 8px 12px; border-bottom: 2px solid var(--border); color: var(--foreground); }
td { padding: 8px 12px; border-bottom: 1px solid var(--border); color: var(--foreground); }
tr:hover td { background: var(--muted); }

.card {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}
.badge {
  display: inline-flex; align-items: center;
  font-size: 11px; font-weight: 500;
  padding: 2px 8px; border-radius: 9999px;
  background: var(--secondary); color: var(--secondary-foreground);
}
.badge.primary { background: var(--primary); color: var(--primary-foreground); }

hr { border: none; border-top: 1px solid var(--border); margin: 12px 0; }

/* SVG classes */
svg text { font-family: var(--font-sans); fill: var(--foreground); }
svg .node rect, svg .box rect, svg rect.box { fill: var(--muted); stroke: var(--border); rx: 6; }
svg .node:hover { opacity: 0.85; cursor: pointer; }
svg .arr, svg .edge { stroke: var(--muted-foreground); stroke-width: 1.5; fill: none; }
svg .label { font-size: 12px; fill: var(--muted-foreground); }
${SVG_PREBUILT_CSS}

/* Chart colors via Alma variables */
.chart-1, [data-chart="1"] { color: var(--chart-1); fill: var(--chart-1); }
.chart-2, [data-chart="2"] { color: var(--chart-2); fill: var(--chart-2); }
.chart-3, [data-chart="3"] { color: var(--chart-3); fill: var(--chart-3); }
.chart-4, [data-chart="4"] { color: var(--chart-4); fill: var(--chart-4); }
.chart-5, [data-chart="5"] { color: var(--chart-5); fill: var(--chart-5); }

@keyframes _fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
}
`;
const BRIDGE_JS = `
window._morphReady = false;
window._pending = null;
window._setContent = function(html) {
  if (!window._morphReady) { window._pending = html; return; }
  var root = document.getElementById('content');
  if (!root) return;
  var target = document.createElement('div');
  target.id = 'content';
  target.innerHTML = html;
  morphdom(root, target, {
    onBeforeElUpdated: function(from, to) {
      if (from.isEqualNode(to)) return false;
      return true;
    },
    onNodeAdded: function(node) {
      if (node.nodeType === 1 && node.tagName !== 'STYLE' && node.tagName !== 'SCRIPT') {
        node.style.animation = '_fadeIn 0.3s ease both';
      }
      return node;
    }
  });
  reportSize();
};
window._runScripts = function() {
  document.querySelectorAll('#content script').forEach(function(old) {
    var s = document.createElement('script');
    if (old.src) { s.src = old.src; } else { s.textContent = old.textContent; }
    old.parentNode.replaceChild(s, old);
  });
  setTimeout(reportSize, 100);
};
function reportSize() {
  var c = document.getElementById('content');
  var h = c ? c.offsetHeight : document.documentElement.scrollHeight;
  var n = c ? c.querySelectorAll('*').length : 0;
  window.parent.postMessage({ type: 'widget-resize', height: h, elementCount: n }, '*');
}
var _ro = new ResizeObserver(reportSize);
// Bridge: sendPrompt — sends a message to chat as if the user typed it
window.sendPrompt = function(text) {
  window.parent.postMessage({ type: 'send-prompt', text: text }, '*');
};
// Bridge: openLink — opens a URL in the default browser
window.openLink = function(url) {
  window.parent.postMessage({ type: 'open-link', url: url }, '*');
};
window.addEventListener('message', function(e) {
  var d = e.data;
  if (!d || typeof d !== 'object') return;
  if (d.type === 'set-content' && typeof d.html === 'string') {
    window._setContent(d.html);
  } else if (d.type === 'run-scripts') {
    window._runScripts();
  }
});
document.addEventListener('click', function(e) {
  var a = e.target.closest && e.target.closest('a[href]');
  if (a && a.href && a.href.startsWith('http')) {
    e.preventDefault();
    window.parent.postMessage({ type: 'open-link', url: a.href }, '*');
  }
});
var _ri = setInterval(reportSize, 300);
setTimeout(function() { clearInterval(_ri); }, 15000);
`;
function assembleShellDocument(theme) {
  const t = normalizeTheme(theme);
  return `<!DOCTYPE html>
<html${t.isDark ? ' data-theme="dark" class="dark"' : ' data-theme="light"'}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>${THEME_CSS}${FORM_STYLES_CSS}${buildThemeOverrideCss(t)}</style>
</head>
<body>
<div id="content"></div>
<script>${BRIDGE_JS}<\/script>
<script src="https://cdn.jsdelivr.net/npm/morphdom@2.7.4/dist/morphdom-umd.min.js"
  onload="window._morphReady=true;_ro.observe(document.getElementById('content')||document.body);if(window._pending){window._setContent(window._pending);window._pending=null;}"><\/script>
</body>
</html>`;
}
function assembleDocument(html, theme) {
  const t = normalizeTheme(theme);
  return `<!DOCTYPE html>
<html${t.isDark ? ' data-theme="dark" class="dark"' : ' data-theme="light"'}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>${THEME_CSS}${FORM_STYLES_CSS}${buildThemeOverrideCss(t)}</style>
</head>
<body>
<div id="content">${html}</div>
<script>
function reportSize() {
  var c = document.getElementById('content');
  var h = c ? c.offsetHeight : document.documentElement.scrollHeight;
  var n = c ? c.querySelectorAll('*').length : 0;
  window.parent.postMessage({ type: 'widget-resize', height: h, elementCount: n }, '*');
}
var ro = new ResizeObserver(reportSize);
ro.observe(document.getElementById('content') || document.body);
window.addEventListener('load', reportSize);
var _ri = setInterval(reportSize, 300);
setTimeout(function() { clearInterval(_ri); }, 15000);
window.sendPrompt = function(text) {
  window.parent.postMessage({ type: 'send-prompt', text: text }, '*');
};
window.openLink = function(url) {
  window.parent.postMessage({ type: 'open-link', url: url }, '*');
};
document.addEventListener('click', function(e) {
  var a = e.target.closest && e.target.closest('a[href]');
  if (a && a.href && a.href.startsWith('http')) {
    e.preventDefault();
    window.parent.postMessage({ type: 'open-link', url: a.href }, '*');
  }
});
<\/script>
</body>
</html>`;
}
const LOADING_PHRASES = [
  "Sketching pixels",
  "Wiring up nodes",
  "Painting gradients",
  "Compiling visuals",
  "Arranging atoms",
  "Rendering magic",
  "Polishing edges"
];
function useArtifactWorkspaceContext() {
  const context = reactExports.useContext(ArtifactWorkspaceContext);
  if (!context) {
    throw new Error("useArtifactWorkspaceContext must be used within an ArtifactWorkspaceProvider");
  }
  return context;
}
const STREAM_DEBOUNCE_MS = 150;
const FORCE_SHOW_MS = 4e3;
function useLoadingPhrase(active) {
  const [index, setIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!active) return;
    setIndex(0);
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % LOADING_PHRASES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [active]);
  return LOADING_PHRASES[index];
}
const WidgetRenderer = reactExports.memo(function WidgetRenderer2({ title, description, html, isStreaming = false }) {
  const iframeRef = reactExports.useRef(null);
  const [height, setHeight] = reactExports.useState(0);
  const elementCountRef = reactExports.useRef(0);
  const [elementCount, setElementCount] = reactExports.useState(0);
  const [loaded, setLoaded] = reactExports.useState(false);
  const shellInitRef = reactExports.useRef(false);
  const lastSentHtmlRef = reactExports.useRef("");
  const debounceTimerRef = reactExports.useRef(null);
  const scriptsRunRef = reactExports.useRef(false);
  const usedStreamingRef = reactExports.useRef(false);
  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const widgetTheme = reactExports.useMemo(() => {
    if (typeof document === "undefined") return isDark;
    const root = document.documentElement;
    const computed = getComputedStyle(root);
    const cssVars = {};
    for (const key of WIDGET_THEME_VARS) {
      const value = computed.getPropertyValue(key).trim();
      if (value) cssVars[key] = value;
    }
    const themeName = root.getAttribute("data-base46-theme");
    const retroTheme = themeName === "win98" || themeName === "winxp" || themeName === "longhorn" ? themeName : void 0;
    return { isDark, cssVars, win98: retroTheme === "win98", retroTheme };
  }, [isDark]);
  const { sendMessage } = useArtifactWorkspaceContext();
  const handleMessage = reactExports.useCallback(
    (e) => {
      if (!iframeRef.current) return;
      if (e.source !== iframeRef.current.contentWindow) return;
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "widget-resize" && typeof d.height === "number") {
        setHeight(Math.max(50, Math.min(d.height + 8, 4e3)));
        if (typeof d.elementCount === "number") {
          const prev = elementCountRef.current;
          elementCountRef.current = d.elementCount;
          if (d.elementCount !== prev) {
            setElementCount(d.elementCount);
          }
        }
      }
      if (d.type === "open-link" && typeof d.url === "string") {
        window.systemFile?.openExternal(d.url).catch((err) => {
          console.error("Failed to open external URL:", err);
        });
      }
      if (d.type === "send-prompt" && typeof d.text === "string" && d.text.trim()) {
        sendMessage?.(d.text.trim());
      }
    },
    [sendMessage]
  );
  reactExports.useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);
  reactExports.useEffect(() => {
    if (!iframeRef.current) return;
    if (isStreaming && html && !shellInitRef.current) {
      shellInitRef.current = true;
      usedStreamingRef.current = true;
      scriptsRunRef.current = false;
      lastSentHtmlRef.current = "";
      iframeRef.current.srcdoc = assembleShellDocument(widgetTheme);
      setLoaded(false);
      setHeight(0);
    }
  }, [isStreaming, html, isDark, widgetTheme]);
  reactExports.useEffect(() => {
    if (!html || !loaded || !iframeRef.current) return;
    if (usedStreamingRef.current && isStreaming) {
      if (html === lastSentHtmlRef.current || html.length < 20) return;
      if (debounceTimerRef.current) return;
      debounceTimerRef.current = setTimeout(() => {
        debounceTimerRef.current = null;
        if (!iframeRef.current || !html) return;
        lastSentHtmlRef.current = html;
        iframeRef.current.contentWindow?.postMessage({ type: "set-content", html }, "*");
      }, STREAM_DEBOUNCE_MS);
    }
  }, [html, isStreaming, loaded]);
  reactExports.useEffect(() => {
    if (!html || !loaded || !iframeRef.current) return;
    if (usedStreamingRef.current && !isStreaming && !scriptsRunRef.current) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      scriptsRunRef.current = true;
      lastSentHtmlRef.current = html;
      iframeRef.current.contentWindow?.postMessage({ type: "set-content", html }, "*");
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage({ type: "run-scripts" }, "*");
      }, 50);
    }
  }, [html, isStreaming, loaded]);
  reactExports.useEffect(() => {
    if (!html || !iframeRef.current) return;
    if (usedStreamingRef.current) return;
    if (isStreaming) return;
    shellInitRef.current = false;
    scriptsRunRef.current = true;
    iframeRef.current.srcdoc = assembleDocument(html, widgetTheme);
    setLoaded(false);
    setHeight(0);
  }, [html, isStreaming, isDark, widgetTheme]);
  const forceShowTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!html || forceShowTimerRef.current) return;
    forceShowTimerRef.current = setTimeout(() => {
      forceShowTimerRef.current = null;
      setLoaded(true);
      setHeight((h) => h > 0 ? h : 500);
    }, FORCE_SHOW_MS);
  }, [html]);
  reactExports.useEffect(
    () => () => {
      if (forceShowTimerRef.current) clearTimeout(forceShowTimerRef.current);
    },
    []
  );
  reactExports.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  const ready = loaded && height > 0;
  const showLoading = !!html && !ready && !isStreaming;
  const loadingPhrase = useLoadingPhrase(showLoading);
  const [layoutSettled, setLayoutSettled] = reactExports.useState(false);
  const settleTimerRef = reactExports.useRef(null);
  const prevElementCountRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (!isStreaming || !ready) {
      setLayoutSettled(false);
      prevElementCountRef.current = 0;
      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
      return;
    }
    if (elementCount !== prevElementCountRef.current) {
      prevElementCountRef.current = elementCount;
      setLayoutSettled(false);
      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
      }
      settleTimerRef.current = setTimeout(() => {
        settleTimerRef.current = null;
        setLayoutSettled(true);
      }, 1200);
    }
    return () => {
      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
    };
  }, [isStreaming, ready, elementCount]);
  const showShimmer = isStreaming && ready && layoutSettled;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-3 w-full", "data-testid": "widget-renderer", children: [
    (title || description) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 px-1", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground", children: title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: description })
    ] }),
    showLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border/60 bg-muted/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 animate-pulse bg-gradient-to-r from-primary/40 via-primary to-primary/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 shrink-0 animate-spin text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[13px] font-medium text-muted-foreground", children: [
          loadingPhrase,
          "..."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { display: html ? void 0 : "none" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          ref: iframeRef,
          sandbox: "allow-scripts",
          className: "w-full",
          onLoad: () => setLoaded(true),
          style: {
            height: ready ? height : 0,
            overflow: "hidden",
            background: "transparent",
            opacity: ready ? 1 : 0,
            transition: "opacity 300ms ease-in"
          },
          title: title || "Interactive widget"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute inset-0 overflow-hidden rounded-xl",
          style: {
            opacity: showShimmer ? 1 : 0,
            transition: "opacity 600ms ease-out",
            height: ready ? height : 0
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: showShimmer ? "widget-shimmer-band" : void 0,
              style: {
                position: "absolute",
                // Oversized so the band can travel fully across the container
                width: "200%",
                height: "200%",
                top: "-50%",
                left: "-50%",
                background: isDark ? "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)" : "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.25) 55%, transparent 60%)"
              }
            }
          )
        }
      )
    ] })
  ] });
});
WidgetRenderer.displayName = "WidgetRenderer";
function usePlottable(data) {
  return reactExports.useMemo(() => {
    if (!Array.isArray(data)) return [];
    const out = [];
    for (const item of data) {
      if (!item || typeof item !== "object") continue;
      const { label, value } = item;
      const numeric = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
      if (typeof label !== "string" || !label || !Number.isFinite(numeric)) continue;
      out.push({ label, value: numeric });
    }
    return out;
  }, [data]);
}
const CHART_COLORS = [
  "#3b82f6",
  // blue
  "#8b5cf6",
  // purple
  "#ec4899",
  // pink
  "#f59e0b",
  // amber
  "#10b981",
  // emerald
  "#06b6d4",
  // cyan
  "#f97316"
  // orange
];
const CHART_CONFIG = {
  tooltipStyle: {
    backgroundColor: "hsl(var(--popover))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    padding: "8px 12px",
    color: "hsl(var(--popover-foreground))"
  }
};
function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * Math.PI / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}
function describeArc(cx, cy, r, startAngle, endAngle) {
  if (endAngle - startAngle >= 359.99) {
    const mid = (startAngle + endAngle) / 2;
    return describeArc(cx, cy, r, startAngle, mid) + " " + describeArc(cx, cy, r, mid, endAngle);
  }
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L ${cx} ${cy} Z`;
}
const PieChart = reactExports.memo(function PieChart2({ title, description, data: rawData }) {
  const data = usePlottable(rawData);
  if (data.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-3 max-w-lg rounded-xl border border-border/60 bg-background p-6 shadow-sm", "data-testid": "generative-pie-chart", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-muted-foreground", children: instance.t("common.noData") })
    ] });
  }
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const cx = 120;
  const cy = 120;
  const r = 100;
  let currentAngle = 0;
  const slices = data.map((item, index) => {
    const sliceAngle = total > 0 ? item.value / total * 360 : 0;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;
    return {
      path: describeArc(cx, cy, r, startAngle, endAngle),
      color: CHART_COLORS[index % CHART_COLORS.length],
      label: item.label,
      value: item.value,
      percentage: total > 0 ? (item.value / total * 100).toFixed(1) : "0"
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-3 max-w-lg rounded-xl border border-border/60 bg-background p-6 shadow-sm", "data-testid": "generative-pie-chart", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: 240, height: 240, viewBox: `0 0 ${cx * 2} ${cy * 2}`, children: slices.map((slice, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: slice.path, fill: slice.color, stroke: "hsl(var(--background))", strokeWidth: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
      slice.label,
      ": ",
      slice.value,
      " (",
      slice.percentage,
      "%)"
    ] }) }, index)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 gap-2", children: data.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-3 shrink-0 rounded-sm", style: { backgroundColor: CHART_COLORS[index % CHART_COLORS.length] } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm text-foreground", children: item.label })
    ] }, index)) })
  ] });
});
PieChart.displayName = "PieChart";
const BarChart = reactExports.memo(function BarChart2({ title, description, data: rawData }) {
  const [hoveredIndex, setHoveredIndex] = reactExports.useState(null);
  const data = usePlottable(rawData);
  if (data.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-3 rounded-xl border border-border/60 bg-background p-6 shadow-sm", "data-testid": "generative-bar-chart", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-muted-foreground", children: instance.t("common.noData") })
    ] });
  }
  const maxValue = data.reduce((m, d) => Math.max(m, d.value), 0);
  const chartWidth = 500;
  const chartHeight = 250;
  const padding = { top: 20, right: 20, bottom: 50, left: 60 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const barGap = 8;
  const barWidth = Math.max(10, (plotWidth - barGap * (data.length - 1)) / data.length);
  const tickCount = 5;
  const niceMax = Math.ceil(maxValue / tickCount) * tickCount || tickCount;
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round(niceMax / tickCount * i));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-3 rounded-xl border border-border/60 bg-background p-6 shadow-sm", "data-testid": "generative-bar-chart", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: chartWidth, height: chartHeight, viewBox: `0 0 ${chartWidth} ${chartHeight}`, children: [
      yTicks.map((tick, i) => {
        const y = padding.top + plotHeight - tick / niceMax * plotHeight;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: padding.left,
              y1: y,
              x2: chartWidth - padding.right,
              y2: y,
              stroke: "currentColor",
              strokeOpacity: 0.1,
              strokeDasharray: i === 0 ? void 0 : "4 4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: padding.left - 8, y, textAnchor: "end", dominantBaseline: "middle", className: "fill-muted-foreground", fontSize: 11, children: tick })
        ] }, `y-${i}`);
      }),
      data.map((item, index) => {
        const barHeight = niceMax > 0 ? item.value / niceMax * plotHeight : 0;
        const x = padding.left + index * (barWidth + barGap);
        const y = padding.top + plotHeight - barHeight;
        const isHovered = hoveredIndex === index;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { onMouseEnter: () => setHoveredIndex(index), onMouseLeave: () => setHoveredIndex(null), style: { cursor: "pointer" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x,
              y,
              width: barWidth,
              height: barHeight,
              fill: CHART_COLORS[index % CHART_COLORS.length],
              rx: 4,
              ry: 4,
              opacity: isHovered ? 0.85 : 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: x + barWidth / 2,
              y: padding.top + plotHeight + 16,
              textAnchor: "middle",
              className: "fill-muted-foreground",
              fontSize: 11,
              children: item.label.length > 10 ? `${item.label.slice(0, 9)}…` : item.label
            }
          ),
          isHovered && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "rect",
              {
                x: x + barWidth / 2 - 30,
                y: y - 28,
                width: 60,
                height: 22,
                rx: 4,
                fill: "hsl(var(--popover))",
                stroke: "hsl(var(--border))",
                strokeWidth: 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: x + barWidth / 2, y: y - 14, textAnchor: "middle", className: "fill-foreground", fontSize: 11, fontWeight: 500, children: item.value })
          ] })
        ] }, index);
      })
    ] }) })
  ] });
});
BarChart.displayName = "BarChart";
function extractToolInput(part) {
  if ("input" in part && part.input && typeof part.input === "object") {
    return part.input;
  }
  if ("args" in part && part.args && typeof part.args === "object") {
    return part.args;
  }
  return {};
}
function isToolStreaming(part) {
  return part.state !== "output-available" && part.state !== "output-error" && part.state !== "output-denied";
}
const GenerativeUIBlock = reactExports.memo(function GenerativeUIBlock2({ part, toolName }) {
  const componentDef = reactExports.useMemo(() => getGenerativeUIComponent(toolName), [toolName]);
  const input = reactExports.useMemo(() => extractToolInput(part), [part]);
  const streaming = isToolStreaming(part);
  if (!componentDef) {
    return null;
  }
  const Component = componentDef.render;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2", "data-testid": `generative-ui-${toolName}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...input, isStreaming: streaming }) });
});
GenerativeUIBlock.displayName = "GenerativeUIBlock";
export {
  BarChart as B,
  CHART_COLORS as C,
  GenerativeUIBlock as G,
  PieChart as P,
  WidgetRenderer as W,
  CHART_CONFIG as a,
  assembleDocument as b,
  clearGenerativeUIRegistry as c,
  getGenerativeUIComponent as d,
  getRegistrySize as e,
  unregisterGenerativeUIComponent as f,
  getAllGenerativeUIComponents as g,
  isGenerativeUITool as i,
  registerGenerativeUIComponent as r,
  useArtifactWorkspaceContext as u
};
