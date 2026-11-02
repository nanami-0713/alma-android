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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "928cb61b-cbf2-4183-9dab-ab59ec139992", e._sentryDebugIdIdentifier = "sentry-dbid-928cb61b-cbf2-4183-9dab-ab59ec139992");
    })();
  } catch (e) {
  }
}
;
import { i as installRendererFetchTimeoutGuard, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { a as client } from "./client-DCFZpNwr.js";
import "./createLucideIcon-sFEqYeet.js";
import "./clipboard-polyfill-B3oH85Ao.js";
import { i as initObservability } from "./ThemeContext-Ac9lDiNd.js";
import "./generative-ui-block-1Rj38gNW.js";
import { setupDefaultGenerativeUIComponents } from "./index-r7jQG3Y1.js";
import { A as App } from "./App-CJD1Pyfa.js";
import "./index-CZUfqr00.js";
import "./x-BzMxEGBY.js";
import "./preload-helper-D_8ag_Pp.js";
import "./artifactWorkspaceContextDef-Y91jRAgg.js";
import "./loader-circle-BsCo_wlW.js";
import "./PluginNotificationListener-DQz_TGb2.js";
import "./label-CF1Fh03r.js";
import "./wand-sparkles-D4aHx43i.js";
import "./overflow-container-CXkfjaRd.js";
import "./PlatformContext-BWz3dz-T.js";
import "./TwemojiIcon-qeDCXH7q.js";
import "./index-pfi9S7gc.js";
import "./apiClient-DmP45vUN.js";
import "./slider-CpZgBHCs.js";
import "./pencil-BtEsZPL8.js";
import "./trash-2-DTP27QMN.js";
import "./image-C_h5oH_f.js";
import "./alma-icon-BzHspoaH.js";
import "./addLeadingZeros-DCGuLiwe.js";
import "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
import "./useLiveCoding-DqcVzuV6.js";
import "./ExecutionHistory-CJxOXAbK.js";
import "./en-US-CZvvliM3.js";
/* empty css                   */
import "./ImageAnnotator-CcNrU1f9.js";
import "./v4-D_ZMSocT.js";
import "./ConditionalPostHogProvider-Cgb2BAQg.js";
installRendererFetchTimeoutGuard();
setupDefaultGenerativeUIComponents();
initObservability();
client.createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
window.ipcRenderer?.on("main-process-message", (_event, message) => {
  console.log(message);
});
