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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "652e3318-d6a6-4ac5-a63f-0571d7604e30", e._sentryDebugIdIdentifier = "sentry-dbid-652e3318-d6a6-4ac5-a63f-0571d7604e30");
    })();
  } catch (e) {
  }
}
;
import { r as reactDomExports } from "./index-CZUfqr00.js";
function _mergeNamespaces(n, m2) {
  for (var i = 0; i < m2.length; i++) {
    const e = m2[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var client$1 = {};
var hydrateRoot;
var createRoot;
var m = reactDomExports;
{
  createRoot = client$1.createRoot = m.createRoot;
  hydrateRoot = client$1.hydrateRoot = m.hydrateRoot;
}
const client = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  get createRoot() {
    return createRoot;
  },
  default: client$1,
  get hydrateRoot() {
    return hydrateRoot;
  }
}, [client$1]);
export {
  client$1 as a,
  client as c
};
