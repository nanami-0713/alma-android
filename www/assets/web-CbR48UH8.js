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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "fa814d3c-c89d-466e-93d6-a2e39de2748d", e._sentryDebugIdIdentifier = "sentry-dbid-fa814d3c-c89d-466e-93d6-a2e39de2748d");
    })();
  } catch (e) {
  }
}
;
import { W as WebPlugin, I as ImpactStyle, N as NotificationType } from "./connected-C8Gvg28Q.js";
import "./preload-helper-D_8ag_Pp.js";
import "./index-B0zE39VE.js";
import "./apiClient-DmP45vUN.js";
class HapticsWeb extends WebPlugin {
  constructor() {
    super(...arguments);
    this.selectionStarted = false;
  }
  async impact(options) {
    const pattern = this.patternForImpact(options === null || options === void 0 ? void 0 : options.style);
    this.vibrateWithPattern(pattern);
  }
  async notification(options) {
    const pattern = this.patternForNotification(options === null || options === void 0 ? void 0 : options.type);
    this.vibrateWithPattern(pattern);
  }
  async vibrate(options) {
    const duration = (options === null || options === void 0 ? void 0 : options.duration) || 300;
    this.vibrateWithPattern([duration]);
  }
  async selectionStart() {
    this.selectionStarted = true;
  }
  async selectionChanged() {
    if (this.selectionStarted) {
      this.vibrateWithPattern([70]);
    }
  }
  async selectionEnd() {
    this.selectionStarted = false;
  }
  patternForImpact(style = ImpactStyle.Heavy) {
    if (style === ImpactStyle.Medium) {
      return [43];
    } else if (style === ImpactStyle.Light) {
      return [20];
    }
    return [61];
  }
  patternForNotification(type = NotificationType.Success) {
    if (type === NotificationType.Warning) {
      return [30, 40, 30, 50, 60];
    } else if (type === NotificationType.Error) {
      return [27, 45, 50];
    }
    return [35, 65, 21];
  }
  vibrateWithPattern(pattern) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    } else {
      throw this.unavailable("Browser does not support the vibrate API");
    }
  }
}
export {
  HapticsWeb
};
