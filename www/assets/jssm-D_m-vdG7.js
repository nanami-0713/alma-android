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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "c3ce41a6-db76-49ab-9312-604a46eb5327", e._sentryDebugIdIdentifier = "sentry-dbid-c3ce41a6-db76-49ab-9312-604a46eb5327");
    })();
  } catch (e) {
  }
}
;
const lang = Object.freeze(JSON.parse(`{"displayName":"JSSM","fileTypes":["jssm","jssm_state"],"name":"jssm","patterns":[{"begin":"/\\\\*","captures":{"0":{"name":"punctuation.definition.comment.mn"}},"end":"\\\\*/","name":"comment.block.jssm"},{"begin":"//","end":"$","name":"comment.line.jssm"},{"begin":"\\\\$\\\\{","captures":{"0":{"name":"entity.name.function"}},"end":"}","name":"keyword.other"},{"match":"([0-9]*)(\\\\.)([0-9]*)(\\\\.)([0-9]*)","name":"constant.numeric"},{"match":"graph_layout(\\\\s*)(:)","name":"constant.language.jssmLanguage"},{"match":"machine_name(\\\\s*)(:)","name":"constant.language.jssmLanguage"},{"match":"machine_version(\\\\s*)(:)","name":"constant.language.jssmLanguage"},{"match":"jssm_version(\\\\s*)(:)","name":"constant.language.jssmLanguage"},{"match":"<->","name":"keyword.control.transition.jssmArrow.legal_legal"},{"match":"<-","name":"keyword.control.transition.jssmArrow.legal_none"},{"match":"->","name":"keyword.control.transition.jssmArrow.none_legal"},{"match":"<=>","name":"keyword.control.transition.jssmArrow.main_main"},{"match":"=>","name":"keyword.control.transition.jssmArrow.none_main"},{"match":"<=","name":"keyword.control.transition.jssmArrow.main_none"},{"match":"<~>","name":"keyword.control.transition.jssmArrow.forced_forced"},{"match":"~>","name":"keyword.control.transition.jssmArrow.none_forced"},{"match":"<~","name":"keyword.control.transition.jssmArrow.forced_none"},{"match":"<-=>","name":"keyword.control.transition.jssmArrow.legal_main"},{"match":"<=->","name":"keyword.control.transition.jssmArrow.main_legal"},{"match":"<-~>","name":"keyword.control.transition.jssmArrow.legal_forced"},{"match":"<~->","name":"keyword.control.transition.jssmArrow.forced_legal"},{"match":"<=~>","name":"keyword.control.transition.jssmArrow.main_forced"},{"match":"<~=>","name":"keyword.control.transition.jssmArrow.forced_main"},{"match":"([0-9]+)%","name":"constant.numeric.jssmProbability"},{"match":"'[^']*'","name":"constant.character.jssmAction"},{"match":"\\"[^\\"]*\\"","name":"entity.name.tag.jssmLabel.doublequoted"},{"match":"([!#\\\\&()+,.0-9?-Z_a-z])","name":"entity.name.tag.jssmLabel.atom"}],"scopeName":"source.jssm","aliases":["fsl"]}`));
const jssm = [
  lang
];
export {
  jssm as default
};
