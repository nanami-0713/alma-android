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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "958042b2-8791-4e0d-b2a9-9451dbbb5024", e._sentryDebugIdIdentifier = "sentry-dbid-958042b2-8791-4e0d-b2a9-9451dbbb5024");
    })();
  } catch (e) {
  }
}
;
const lang = Object.freeze(JSON.parse('{"displayName":"QML Directory","name":"qmldir","patterns":[{"include":"#comment"},{"include":"#keywords"},{"include":"#version"},{"include":"#names"}],"repository":{"comment":{"patterns":[{"begin":"#","end":"$","name":"comment.line.number-sign.qmldir"}]},"file-name":{"patterns":[{"match":"\\\\b\\\\w+\\\\.(qmltypes|qml|js)\\\\b","name":"string.unquoted.qmldir"}]},"identifier":{"patterns":[{"match":"\\\\b\\\\w+\\\\b","name":"variable.parameter.qmldir"}]},"keywords":{"patterns":[{"match":"\\\\b(module|singleton|internal|plugin|classname|typeinfo|depends|designersupported)\\\\b","name":"keyword.other.qmldir"}]},"module-name":{"patterns":[{"match":"\\\\b[A-Z]\\\\w*\\\\b","name":"entity.name.type.qmldir"}]},"names":{"patterns":[{"include":"#file-name"},{"include":"#module-name"},{"include":"#identifier"}]},"version":{"patterns":[{"match":"\\\\b\\\\d+\\\\.\\\\d+\\\\b","name":"constant.numeric.qml"}]}},"scopeName":"source.qmldir"}'));
const qmldir = [
  lang
];
export {
  qmldir as default
};
