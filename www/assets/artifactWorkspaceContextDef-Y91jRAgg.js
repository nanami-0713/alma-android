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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "4d338559-9e73-420d-8a2f-4eb8ee0b47df", e._sentryDebugIdIdentifier = "sentry-dbid-4d338559-9e73-420d-8a2f-4eb8ee0b47df");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports } from "./index-B0zE39VE.js";
const ArtifactWorkspaceContext = reactExports.createContext(null);
export {
  ArtifactWorkspaceContext as A
};
