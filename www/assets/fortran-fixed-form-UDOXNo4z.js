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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "882ad947-c420-44d8-8e3d-7f17197f7c5a", e._sentryDebugIdIdentifier = "sentry-dbid-882ad947-c420-44d8-8e3d-7f17197f7c5a");
    })();
  } catch (e) {
  }
}
;
import fortran_free_form from "./fortran-free-form-C8NIi11N.js";
const lang = Object.freeze(JSON.parse('{"displayName":"Fortran (Fixed Form)","fileTypes":["f","F","f77","F77","for","FOR"],"injections":{"source.fortran.fixed - ( string | comment )":{"patterns":[{"include":"#line-header"},{"include":"#line-end-comment"}]}},"name":"fortran-fixed-form","patterns":[{"include":"#comments"},{"include":"#line-header"},{"include":"source.fortran.free"}],"repository":{"comments":{"patterns":[{"begin":"^[*Cc]","end":"\\\\n","name":"comment.line.fortran"},{"begin":"^ *!","end":"\\\\n","name":"comment.line.fortran"}]},"line-end-comment":{"begin":"(?<=^.{72})(?!\\\\n)","end":"(?=\\\\n)","name":"comment.line-end.fortran"},"line-header":{"captures":{"1":{"name":"constant.numeric.fortran"},"2":{"name":"keyword.line-continuation-operator.fortran"},"3":{"name":"source.fortran.free"},"4":{"name":"invalid.error.fortran"}},"match":"^(?!\\\\s*[!#])(?:([ \\\\d]{5} )|( {5}.)|(\\\\t)|(.{1,5}))"}},"scopeName":"source.fortran.fixed","embeddedLangs":["fortran-free-form"],"aliases":["f","for","f77"]}'));
const fortranFixedForm = [
  ...fortran_free_form,
  lang
];
export {
  fortranFixedForm as default
};
