const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DsShE29I.js","./index-B0zE39VE.js","./index--fUMxuuf.css","./PluginNotificationListener-DQz_TGb2.js","./createLucideIcon-sFEqYeet.js","./ThemeContext-Ac9lDiNd.js","./x-BzMxEGBY.js","./index-CZUfqr00.js","./preload-helper-D_8ag_Pp.js","./label-CF1Fh03r.js","./wand-sparkles-D4aHx43i.js","./overflow-container-CXkfjaRd.js","./PlatformContext-BWz3dz-T.js","./TwemojiIcon-qeDCXH7q.js","./index-pfi9S7gc.js","./apiClient-DmP45vUN.js","./loader-circle-BsCo_wlW.js","./slider-CpZgBHCs.js","./pencil-BtEsZPL8.js","./trash-2-DTP27QMN.js","./image-C_h5oH_f.js","./alma-icon-BzHspoaH.js","./addLeadingZeros-DCGuLiwe.js","./PluginNotificationListener-DrKknvT7.css"])))=>i.map(i=>d[i]);
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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "05705d2f-dd5b-474b-a54b-01735ac749a0", e._sentryDebugIdIdentifier = "sentry-dbid-05705d2f-dd5b-474b-a54b-01735ac749a0");
    })();
  } catch (e) {
  }
}
;
import { _ as __vitePreload } from "./preload-helper-D_8ag_Pp.js";
import { r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { u as useTheme, O as OverflowContainer } from "./overflow-container-CXkfjaRd.js";
import "./ThemeContext-Ac9lDiNd.js";
import "./x-BzMxEGBY.js";
import "./createLucideIcon-sFEqYeet.js";
import { L as LoaderCircle } from "./loader-circle-BsCo_wlW.js";
import "./index-CZUfqr00.js";
const DocxPreview = reactExports.memo(function DocxPreview2({ src }) {
  const [htmlContent, setHtmlContent] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const { effectiveTheme } = useTheme();
  reactExports.useEffect(() => {
    let mounted = true;
    const loadDocx = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(src);
        if (!response.ok) throw new Error("Failed to fetch document");
        const arrayBuffer = await response.arrayBuffer();
        const mammoth = await __vitePreload(() => import("./index-DsShE29I.js").then((n) => n.i), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]) : void 0, import.meta.url);
        const result = await mammoth.convertToHtml({ arrayBuffer });
        if (mounted) {
          setHtmlContent(result.value);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load document");
          setIsLoading(false);
        }
      }
    };
    loadDocx();
    return () => {
      mounted = false;
    };
  }, [src]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-8 animate-spin text-muted-foreground" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Failed to load document: ",
      error
    ] }) });
  }
  const isDark = effectiveTheme === "dark";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(OverflowContainer, { className: "h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                    .docx-content {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: ${isDark ? "#e5e5e5" : "#1a1a1a"};
                        padding: 24px;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    .docx-content h1, .docx-content h2, .docx-content h3,
                    .docx-content h4, .docx-content h5, .docx-content h6 {
                        margin-top: 1.5em;
                        margin-bottom: 0.5em;
                    }
                    .docx-content p {
                        margin: 0.5em 0;
                    }
                    .docx-content table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 16px 0;
                    }
                    .docx-content th, .docx-content td {
                        border: 1px solid ${isDark ? "#404040" : "#e0e0e0"};
                        padding: 8px 12px;
                        text-align: left;
                    }
                    .docx-content th {
                        background: ${isDark ? "#2a2a2a" : "#f5f5f5"};
                    }
                    .docx-content img {
                        max-width: 100%;
                        height: auto;
                    }
                    .docx-content ul, .docx-content ol {
                        padding-left: 2em;
                        margin: 0.5em 0;
                    }
                    .docx-content li {
                        margin: 0.25em 0;
                    }
                ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "docx-content", dangerouslySetInnerHTML: { __html: htmlContent || "" } })
  ] });
});
export {
  DocxPreview
};
