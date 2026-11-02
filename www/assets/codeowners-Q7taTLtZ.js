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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "00ac5169-2750-4de0-9a7c-ea25a3984ade", e._sentryDebugIdIdentifier = "sentry-dbid-00ac5169-2750-4de0-9a7c-ea25a3984ade");
    })();
  } catch (e) {
  }
}
;
const lang = Object.freeze(JSON.parse('{"displayName":"CODEOWNERS","name":"codeowners","patterns":[{"include":"#comment"},{"include":"#pattern"},{"include":"#owner"}],"repository":{"comment":{"patterns":[{"begin":"^\\\\s*#","captures":{"0":{"name":"punctuation.definition.comment.codeowners"}},"end":"$","name":"comment.line.codeowners"}]},"owner":{"match":"\\\\S*@\\\\S+","name":"storage.type.function.codeowners"},"pattern":{"match":"^\\\\s*(\\\\S+)","name":"variable.other.codeowners"}},"scopeName":"text.codeowners"}'));
const codeowners = [
  lang
];
export {
  codeowners as default
};
