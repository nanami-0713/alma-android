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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "fef079a2-2fed-45d2-89d7-19d986f07732", e._sentryDebugIdIdentifier = "sentry-dbid-fef079a2-2fed-45d2-89d7-19d986f07732");
    })();
  } catch (e) {
  }
}
;
import { W as WebPlugin } from "./connected-C8Gvg28Q.js";
import "./preload-helper-D_8ag_Pp.js";
import "./index-B0zE39VE.js";
import "./apiClient-DmP45vUN.js";
class DeviceWeb extends WebPlugin {
  async getId() {
    return {
      identifier: this.getUid()
    };
  }
  async getInfo() {
    if (typeof navigator === "undefined" || !navigator.userAgent) {
      throw this.unavailable("Device API not available in this browser");
    }
    const ua = navigator.userAgent;
    const uaFields = this.parseUa(ua);
    return {
      model: uaFields.model,
      platform: "web",
      operatingSystem: uaFields.operatingSystem,
      osVersion: uaFields.osVersion,
      manufacturer: navigator.vendor,
      isVirtual: false,
      webViewVersion: uaFields.browserVersion
    };
  }
  async getBatteryInfo() {
    if (typeof navigator === "undefined" || !navigator.getBattery) {
      throw this.unavailable("Device API not available in this browser");
    }
    let battery = {};
    try {
      battery = await navigator.getBattery();
    } catch (e) {
    }
    return {
      batteryLevel: battery.level,
      isCharging: battery.charging
    };
  }
  async getLanguageCode() {
    return {
      value: navigator.language.split("-")[0].toLowerCase()
    };
  }
  async getLanguageTag() {
    return {
      value: navigator.language
    };
  }
  parseUa(ua) {
    const uaFields = {};
    const start = ua.indexOf("(") + 1;
    let end = ua.indexOf(") AppleWebKit");
    if (ua.indexOf(") Gecko") !== -1) {
      end = ua.indexOf(") Gecko");
    }
    const fields = ua.substring(start, end);
    if (ua.indexOf("Android") !== -1) {
      const tmpFields = fields.replace("; wv", "").split("; ").pop();
      if (tmpFields) {
        uaFields.model = tmpFields.split(" Build")[0];
      }
      uaFields.osVersion = fields.split("; ")[1];
    } else {
      uaFields.model = fields.split("; ")[0];
      if (typeof navigator !== "undefined" && navigator.oscpu) {
        uaFields.osVersion = navigator.oscpu;
      } else {
        if (ua.indexOf("Windows") !== -1) {
          uaFields.osVersion = fields;
        } else {
          const tmpFields = fields.split("; ").pop();
          if (tmpFields) {
            const lastParts = tmpFields.replace(" like Mac OS X", "").split(" ");
            uaFields.osVersion = lastParts[lastParts.length - 1].replace(/_/g, ".");
          }
        }
      }
    }
    if (/android/i.test(ua)) {
      uaFields.operatingSystem = "android";
    } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      uaFields.operatingSystem = "ios";
    } else if (/Win/.test(ua)) {
      uaFields.operatingSystem = "windows";
    } else if (/Mac/i.test(ua)) {
      uaFields.operatingSystem = "mac";
    } else {
      uaFields.operatingSystem = "unknown";
    }
    const isSafari = !!window.ApplePaySession;
    const isChrome = !!window.chrome;
    const isFirefox = /Firefox/.test(ua);
    const isEdge = /Edg/.test(ua);
    const isFirefoxIOS = /FxiOS/.test(ua);
    const isChromeIOS = /CriOS/.test(ua);
    const isEdgeIOS = /EdgiOS/.test(ua);
    if (isSafari || isChrome && !isEdge || isFirefoxIOS || isChromeIOS || isEdgeIOS) {
      let searchWord;
      if (isFirefoxIOS) {
        searchWord = "FxiOS";
      } else if (isChromeIOS) {
        searchWord = "CriOS";
      } else if (isEdgeIOS) {
        searchWord = "EdgiOS";
      } else if (isSafari) {
        searchWord = "Version";
      } else {
        searchWord = "Chrome";
      }
      const words = ua.split(" ");
      for (const word of words) {
        if (word.includes(searchWord)) {
          const version = word.split("/")[1];
          uaFields.browserVersion = version;
        }
      }
    } else if (isFirefox || isEdge) {
      const reverseUA = ua.split("").reverse().join("");
      const reverseVersion = reverseUA.split("/")[0];
      const version = reverseVersion.split("").reverse().join("");
      uaFields.browserVersion = version;
    }
    return uaFields;
  }
  getUid() {
    if (typeof window !== "undefined" && window.localStorage) {
      let uid = window.localStorage.getItem("_capuid");
      if (uid) {
        return uid;
      }
      uid = this.uuid4();
      window.localStorage.setItem("_capuid", uid);
      return uid;
    }
    return this.uuid4();
  }
  uuid4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
}
export {
  DeviceWeb
};
