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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "711ed004-411f-41bd-a2f7-bdf36619b5fb", e._sentryDebugIdIdentifier = "sentry-dbid-711ed004-411f-41bd-a2f7-bdf36619b5fb");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import "./ThemeContext-Ac9lDiNd.js";
import "./x-BzMxEGBY.js";
import "./createLucideIcon-sFEqYeet.js";
import { u as useTheme } from "./overflow-container-CXkfjaRd.js";
import "./preload-helper-D_8ag_Pp.js";
import "./index-CZUfqr00.js";
function HtmlRenderer({ artifact }) {
  const iframeRef = reactExports.useRef(null);
  const { effectiveTheme } = useTheme();
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!iframeRef.current) return;
    try {
      const themeStyles = `
                <style>
                    :root {
                        color-scheme: ${effectiveTheme === "dark" ? "dark" : "light"};
                    }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        margin: 0;
                        padding: 16px;
                        background: ${effectiveTheme === "dark" ? "#1a1a1a" : "#ffffff"};
                        color: ${effectiveTheme === "dark" ? "#e5e5e5" : "#1a1a1a"};
                    }
                </style>
            `;
      let htmlContent = artifact.content;
      if (!htmlContent.includes("<html") && !htmlContent.includes("<!DOCTYPE")) {
        htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${themeStyles}
</head>
<body>
    ${artifact.content}
</body>
</html>`;
      } else {
        htmlContent = htmlContent.replace("</head>", `${themeStyles}</head>`);
      }
      iframeRef.current.srcdoc = htmlContent;
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to render HTML");
    }
  }, [artifact.content, effectiveTheme]);
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-destructive text-sm", children: error }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { ref: iframeRef, className: "w-full h-full border-0", sandbox: "allow-scripts", title: artifact.title });
}
export {
  HtmlRenderer
};
