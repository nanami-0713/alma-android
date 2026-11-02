const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-CaavD3LB.js","./preload-helper-D_8ag_Pp.js","./index-B0zE39VE.js","./index--fUMxuuf.css","./apiClient-DmP45vUN.js","./web-DNDwHOUa.js","./web-qSgEn7GG.js","./web-Cgshzwgw.js","./web-BEcWYPB_.js","./web-B2WIkTE1.js","./web-CbR48UH8.js","./client-DCFZpNwr.js","./index-CZUfqr00.js","./App-CJD1Pyfa.js","./ThemeContext-Ac9lDiNd.js","./createLucideIcon-sFEqYeet.js","./x-BzMxEGBY.js","./PluginNotificationListener-DQz_TGb2.js","./label-CF1Fh03r.js","./wand-sparkles-D4aHx43i.js","./overflow-container-CXkfjaRd.js","./PlatformContext-BWz3dz-T.js","./TwemojiIcon-qeDCXH7q.js","./index-pfi9S7gc.js","./loader-circle-BsCo_wlW.js","./slider-CpZgBHCs.js","./pencil-BtEsZPL8.js","./trash-2-DTP27QMN.js","./image-C_h5oH_f.js","./alma-icon-BzHspoaH.js","./addLeadingZeros-DCGuLiwe.js","./PluginNotificationListener-DrKknvT7.css","./mermaid-NA5CF7SZ-Cgt6mXZw.js","./useLiveCoding-DqcVzuV6.js","./artifactWorkspaceContextDef-Y91jRAgg.js","./ExecutionHistory-CJxOXAbK.js","./generative-ui-block-1Rj38gNW.js","./en-US-CZvvliM3.js","./ImageAnnotator-CcNrU1f9.js","./v4-D_ZMSocT.js","./ConditionalPostHogProvider-Cgb2BAQg.js","./App-BKlWQB97.css","./katex-CSpiQNGJ.css","./index-r7jQG3Y1.js"])))=>i.map(i=>d[i]);
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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "04130599-11e9-490c-a5f1-057f7d3f22e2", e._sentryDebugIdIdentifier = "sentry-dbid-04130599-11e9-490c-a5f1-057f7d3f22e2");
    })();
  } catch (e) {
  }
}
;
import { _ as __vitePreload } from "./preload-helper-D_8ag_Pp.js";
import { i as installRendererFetchTimeoutGuard, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { s as setPhoneConnectionState, r as registerPhoneReconnect, p as parseRemoteHandoffPairing, b as remoteHandoffHash, H as HANDOFF_APPROVAL_WS_PATH, c as HANDOFF_QUESTION_WS_PATH, a as apiClient } from "./apiClient-DmP45vUN.js";
class IpcEmitter {
  listeners = /* @__PURE__ */ new Map();
  on(channel, listener) {
    let set = this.listeners.get(channel);
    if (!set) {
      set = /* @__PURE__ */ new Set();
      this.listeners.set(channel, set);
    }
    set.add(listener);
    return this;
  }
  off(channel, listener) {
    this.listeners.get(channel)?.delete(listener);
    return this;
  }
  removeListener(channel, listener) {
    return this.off(channel, listener);
  }
  removeAllListeners(channel) {
    if (channel) this.listeners.delete(channel);
    else this.listeners.clear();
    return this;
  }
  emit(channel, ...args) {
    const set = this.listeners.get(channel);
    if (!set) return false;
    const event = {};
    for (const fn of set) {
      try {
        fn(event, ...args);
      } catch (err) {
        console.error(`[ios-ipc] listener error for ${channel}:`, err);
      }
    }
    return true;
  }
  // The renderer occasionally calls `send` / `invoke` for fire-and-forget IPC.
  // We log them so we can audit which features try to talk to a missing main process.
  send(channel, ...args) {
  }
  invoke(channel, ..._args) {
    return Promise.resolve(void 0);
  }
  postMessage(_channel, _message, _transfer) {
  }
  sendToHost(_channel, ..._args) {
  }
}
const ipcRendererShim = new IpcEmitter();
/*! Capacitor: https://capacitorjs.com/ - MIT License */
const createCapacitorPlatforms = (win) => {
  const defaultPlatformMap = /* @__PURE__ */ new Map();
  defaultPlatformMap.set("web", { name: "web" });
  const capPlatforms = win.CapacitorPlatforms || {
    currentPlatform: { name: "web" },
    platforms: defaultPlatformMap
  };
  const addPlatform = (name, platform) => {
    capPlatforms.platforms.set(name, platform);
  };
  const setPlatform = (name) => {
    if (capPlatforms.platforms.has(name)) {
      capPlatforms.currentPlatform = capPlatforms.platforms.get(name);
    }
  };
  capPlatforms.addPlatform = addPlatform;
  capPlatforms.setPlatform = setPlatform;
  return capPlatforms;
};
const initPlatforms = (win) => win.CapacitorPlatforms = createCapacitorPlatforms(win);
const CapacitorPlatforms = /* @__PURE__ */ initPlatforms(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
CapacitorPlatforms.addPlatform;
CapacitorPlatforms.setPlatform;
var ExceptionCode;
(function(ExceptionCode2) {
  ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
  ExceptionCode2["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
class CapacitorException extends Error {
  constructor(message, code, data) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
const getPlatformId = (win) => {
  var _a, _b;
  if (win === null || win === void 0 ? void 0 : win.androidBridge) {
    return "android";
  } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
    return "ios";
  } else {
    return "web";
  }
};
const createCapacitor = (win) => {
  var _a, _b, _c, _d, _e;
  const capCustomPlatform = win.CapacitorCustomPlatform || null;
  const cap = win.Capacitor || {};
  const Plugins = cap.Plugins = cap.Plugins || {};
  const capPlatforms = win.CapacitorPlatforms;
  const defaultGetPlatform = () => {
    return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
  };
  const getPlatform = ((_a = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _a === void 0 ? void 0 : _a.getPlatform) || defaultGetPlatform;
  const defaultIsNativePlatform = () => getPlatform() !== "web";
  const isNativePlatform = ((_b = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _b === void 0 ? void 0 : _b.isNativePlatform) || defaultIsNativePlatform;
  const defaultIsPluginAvailable = (pluginName) => {
    const plugin = registeredPlugins.get(pluginName);
    if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
      return true;
    }
    if (getPluginHeader(pluginName)) {
      return true;
    }
    return false;
  };
  const isPluginAvailable = ((_c = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _c === void 0 ? void 0 : _c.isPluginAvailable) || defaultIsPluginAvailable;
  const defaultGetPluginHeader = (pluginName) => {
    var _a2;
    return (_a2 = cap.PluginHeaders) === null || _a2 === void 0 ? void 0 : _a2.find((h) => h.name === pluginName);
  };
  const getPluginHeader = ((_d = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _d === void 0 ? void 0 : _d.getPluginHeader) || defaultGetPluginHeader;
  const handleError = (err) => win.console.error(err);
  const pluginMethodNoop = (_target, prop, pluginName) => {
    return Promise.reject(`${pluginName} does not have an implementation of "${prop}".`);
  };
  const registeredPlugins = /* @__PURE__ */ new Map();
  const defaultRegisterPlugin = (pluginName, jsImplementations = {}) => {
    const registeredPlugin = registeredPlugins.get(pluginName);
    if (registeredPlugin) {
      console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
      return registeredPlugin.proxy;
    }
    const platform = getPlatform();
    const pluginHeader = getPluginHeader(pluginName);
    let jsImplementation;
    const loadPluginImplementation = async () => {
      if (!jsImplementation && platform in jsImplementations) {
        jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
      } else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) {
        jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
      }
      return jsImplementation;
    };
    const createPluginMethod = (impl, prop) => {
      var _a2, _b2;
      if (pluginHeader) {
        const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
        if (methodHeader) {
          if (methodHeader.rtype === "promise") {
            return (options) => cap.nativePromise(pluginName, prop.toString(), options);
          } else {
            return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
          }
        } else if (impl) {
          return (_a2 = impl[prop]) === null || _a2 === void 0 ? void 0 : _a2.bind(impl);
        }
      } else if (impl) {
        return (_b2 = impl[prop]) === null || _b2 === void 0 ? void 0 : _b2.bind(impl);
      } else {
        throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
      }
    };
    const createPluginMethodWrapper = (prop) => {
      let remove;
      const wrapper = (...args) => {
        const p = loadPluginImplementation().then((impl) => {
          const fn = createPluginMethod(impl, prop);
          if (fn) {
            const p2 = fn(...args);
            remove = p2 === null || p2 === void 0 ? void 0 : p2.remove;
            return p2;
          } else {
            throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
          }
        });
        if (prop === "addListener") {
          p.remove = async () => remove();
        }
        return p;
      };
      wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
      Object.defineProperty(wrapper, "name", {
        value: prop,
        writable: false,
        configurable: false
      });
      return wrapper;
    };
    const addListener = createPluginMethodWrapper("addListener");
    const removeListener = createPluginMethodWrapper("removeListener");
    const addListenerNative = (eventName, callback) => {
      const call = addListener({ eventName }, callback);
      const remove = async () => {
        const callbackId = await call;
        removeListener({
          eventName,
          callbackId
        }, callback);
      };
      const p = new Promise((resolve) => call.then(() => resolve({ remove })));
      p.remove = async () => {
        console.warn(`Using addListener() without 'await' is deprecated.`);
        await remove();
      };
      return p;
    };
    const proxy = new Proxy({}, {
      get(_, prop) {
        switch (prop) {
          case "$$typeof":
            return void 0;
          case "toJSON":
            return () => ({});
          case "addListener":
            return pluginHeader ? addListenerNative : addListener;
          case "removeListener":
            return removeListener;
          default:
            return createPluginMethodWrapper(prop);
        }
      }
    });
    Plugins[pluginName] = proxy;
    registeredPlugins.set(pluginName, {
      name: pluginName,
      proxy,
      platforms: /* @__PURE__ */ new Set([
        ...Object.keys(jsImplementations),
        ...pluginHeader ? [platform] : []
      ])
    });
    return proxy;
  };
  const registerPlugin2 = ((_e = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _e === void 0 ? void 0 : _e.registerPlugin) || defaultRegisterPlugin;
  if (!cap.convertFileSrc) {
    cap.convertFileSrc = (filePath) => filePath;
  }
  cap.getPlatform = getPlatform;
  cap.handleError = handleError;
  cap.isNativePlatform = isNativePlatform;
  cap.isPluginAvailable = isPluginAvailable;
  cap.pluginMethodNoop = pluginMethodNoop;
  cap.registerPlugin = registerPlugin2;
  cap.Exception = CapacitorException;
  cap.DEBUG = !!cap.DEBUG;
  cap.isLoggingEnabled = !!cap.isLoggingEnabled;
  cap.platform = cap.getPlatform();
  cap.isNative = cap.isNativePlatform();
  return cap;
};
const initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
const Capacitor = /* @__PURE__ */ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
const registerPlugin = Capacitor.registerPlugin;
Capacitor.Plugins;
class WebPlugin {
  constructor(config) {
    this.listeners = {};
    this.retainedEventArguments = {};
    this.windowListeners = {};
    if (config) {
      console.warn(`Capacitor WebPlugin "${config.name}" config object was deprecated in v3 and will be removed in v4.`);
      this.config = config;
    }
  }
  addListener(eventName, listenerFunc) {
    let firstListener = false;
    const listeners = this.listeners[eventName];
    if (!listeners) {
      this.listeners[eventName] = [];
      firstListener = true;
    }
    this.listeners[eventName].push(listenerFunc);
    const windowListener = this.windowListeners[eventName];
    if (windowListener && !windowListener.registered) {
      this.addWindowListener(windowListener);
    }
    if (firstListener) {
      this.sendRetainedArgumentsForEvent(eventName);
    }
    const remove = async () => this.removeListener(eventName, listenerFunc);
    const p = Promise.resolve({ remove });
    return p;
  }
  async removeAllListeners() {
    this.listeners = {};
    for (const listener in this.windowListeners) {
      this.removeWindowListener(this.windowListeners[listener]);
    }
    this.windowListeners = {};
  }
  notifyListeners(eventName, data, retainUntilConsumed) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      if (retainUntilConsumed) {
        let args = this.retainedEventArguments[eventName];
        if (!args) {
          args = [];
        }
        args.push(data);
        this.retainedEventArguments[eventName] = args;
      }
      return;
    }
    listeners.forEach((listener) => listener(data));
  }
  hasListeners(eventName) {
    return !!this.listeners[eventName].length;
  }
  registerWindowListener(windowEventName, pluginEventName) {
    this.windowListeners[pluginEventName] = {
      registered: false,
      windowEventName,
      pluginEventName,
      handler: (event) => {
        this.notifyListeners(pluginEventName, event);
      }
    };
  }
  unimplemented(msg = "not implemented") {
    return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
  }
  unavailable(msg = "not available") {
    return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
  }
  async removeListener(eventName, listenerFunc) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      return;
    }
    const index = listeners.indexOf(listenerFunc);
    this.listeners[eventName].splice(index, 1);
    if (!this.listeners[eventName].length) {
      this.removeWindowListener(this.windowListeners[eventName]);
    }
  }
  addWindowListener(handle) {
    window.addEventListener(handle.windowEventName, handle.handler);
    handle.registered = true;
  }
  removeWindowListener(handle) {
    if (!handle) {
      return;
    }
    window.removeEventListener(handle.windowEventName, handle.handler);
    handle.registered = false;
  }
  sendRetainedArgumentsForEvent(eventName) {
    const args = this.retainedEventArguments[eventName];
    if (!args) {
      return;
    }
    delete this.retainedEventArguments[eventName];
    args.forEach((arg) => {
      this.notifyListeners(eventName, arg);
    });
  }
}
const encode = (str) => encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
const decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class CapacitorCookiesPluginWeb extends WebPlugin {
  async getCookies() {
    const cookies = document.cookie;
    const cookieMap = {};
    cookies.split(";").forEach((cookie) => {
      if (cookie.length <= 0)
        return;
      let [key2, value] = cookie.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
      key2 = decode(key2).trim();
      value = decode(value).trim();
      cookieMap[key2] = value;
    });
    return cookieMap;
  }
  async setCookie(options) {
    try {
      const encodedKey = encode(options.key);
      const encodedValue = encode(options.value);
      const expires = `; expires=${(options.expires || "").replace("expires=", "")}`;
      const path = (options.path || "/").replace("path=", "");
      const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : "";
      document.cookie = `${encodedKey}=${encodedValue || ""}${expires}; path=${path}; ${domain};`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async deleteCookie(options) {
    try {
      document.cookie = `${options.key}=; Max-Age=0`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearCookies() {
    try {
      const cookies = document.cookie.split(";") || [];
      for (const cookie of cookies) {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearAllCookies() {
    try {
      await this.clearCookies();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
registerPlugin("CapacitorCookies", {
  web: () => new CapacitorCookiesPluginWeb()
});
const readBlobAsBase64 = async (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result;
    resolve(base64String.indexOf(",") >= 0 ? base64String.split(",")[1] : base64String);
  };
  reader.onerror = (error) => reject(error);
  reader.readAsDataURL(blob);
});
const normalizeHttpHeaders = (headers = {}) => {
  const originalKeys = Object.keys(headers);
  const loweredKeys = Object.keys(headers).map((k) => k.toLocaleLowerCase());
  const normalized = loweredKeys.reduce((acc, key2, index) => {
    acc[key2] = headers[originalKeys[index]];
    return acc;
  }, {});
  return normalized;
};
const buildUrlParams = (params, shouldEncode = true) => {
  if (!params)
    return null;
  const output = Object.entries(params).reduce((accumulator, entry) => {
    const [key2, value] = entry;
    let encodedValue;
    let item;
    if (Array.isArray(value)) {
      item = "";
      value.forEach((str) => {
        encodedValue = shouldEncode ? encodeURIComponent(str) : str;
        item += `${key2}=${encodedValue}&`;
      });
      item.slice(0, -1);
    } else {
      encodedValue = shouldEncode ? encodeURIComponent(value) : value;
      item = `${key2}=${encodedValue}`;
    }
    return `${accumulator}&${item}`;
  }, "");
  return output.substr(1);
};
const buildRequestInit = (options, extra = {}) => {
  const output = Object.assign({ method: options.method || "GET", headers: options.headers }, extra);
  const headers = normalizeHttpHeaders(options.headers);
  const type = headers["content-type"] || "";
  if (typeof options.data === "string") {
    output.body = options.data;
  } else if (type.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams();
    for (const [key2, value] of Object.entries(options.data || {})) {
      params.set(key2, value);
    }
    output.body = params.toString();
  } else if (type.includes("multipart/form-data") || options.data instanceof FormData) {
    const form = new FormData();
    if (options.data instanceof FormData) {
      options.data.forEach((value, key2) => {
        form.append(key2, value);
      });
    } else {
      for (const key2 of Object.keys(options.data)) {
        form.append(key2, options.data[key2]);
      }
    }
    output.body = form;
    const headers2 = new Headers(output.headers);
    headers2.delete("content-type");
    output.headers = headers2;
  } else if (type.includes("application/json") || typeof options.data === "object") {
    output.body = JSON.stringify(options.data);
  }
  return output;
};
class CapacitorHttpPluginWeb extends WebPlugin {
  /**
   * Perform an Http request given a set of options
   * @param options Options to build the HTTP request
   */
  async request(options) {
    const requestInit = buildRequestInit(options, options.webFetchExtra);
    const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
    const url = urlParams ? `${options.url}?${urlParams}` : options.url;
    const response = await fetch(url, requestInit);
    const contentType = response.headers.get("content-type") || "";
    let { responseType = "text" } = response.ok ? options : {};
    if (contentType.includes("application/json")) {
      responseType = "json";
    }
    let data;
    let blob;
    switch (responseType) {
      case "arraybuffer":
      case "blob":
        blob = await response.blob();
        data = await readBlobAsBase64(blob);
        break;
      case "json":
        data = await response.json();
        break;
      case "document":
      case "text":
      default:
        data = await response.text();
    }
    const headers = {};
    response.headers.forEach((value, key2) => {
      headers[key2] = value;
    });
    return {
      data,
      headers,
      status: response.status,
      url: response.url
    };
  }
  /**
   * Perform an Http GET request given a set of options
   * @param options Options to build the HTTP request
   */
  async get(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "GET" }));
  }
  /**
   * Perform an Http POST request given a set of options
   * @param options Options to build the HTTP request
   */
  async post(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "POST" }));
  }
  /**
   * Perform an Http PUT request given a set of options
   * @param options Options to build the HTTP request
   */
  async put(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "PUT" }));
  }
  /**
   * Perform an Http PATCH request given a set of options
   * @param options Options to build the HTTP request
   */
  async patch(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "PATCH" }));
  }
  /**
   * Perform an Http DELETE request given a set of options
   * @param options Options to build the HTTP request
   */
  async delete(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "DELETE" }));
  }
}
registerPlugin("CapacitorHttp", {
  web: () => new CapacitorHttpPluginWeb()
});
const Preferences = registerPlugin("Preferences", {
  web: () => __vitePreload(() => import("./web-CaavD3LB.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0, import.meta.url).then((m) => new m.PreferencesWeb())
});
const __vite_import_meta_env__ = { "BASE_URL": "./", "DEV": false, "MODE": "production", "PROD": true, "SSR": false, "VITE_PUBLIC_POSTHOG_HOST": "https://us.i.posthog.com", "VITE_PUBLIC_POSTHOG_KEY": "phc_FkvAQwNvenoNykTvsEsI3wM7GSXhzJhsf8e3cqUSQE2", "VITE_SENTRY_DSN": "https://d6d12e1b5a6744f646725d7539440852@o441417.ingest.us.sentry.io/4510488586485760" };
const STORAGE_KEY$1 = "alma.ios.apiBaseURL";
const ENV_KEY = "VITE_ALMA_API_URL";
let cached$1;
async function getRemoteApiBaseURL() {
  if (cached$1 !== void 0) return cached$1;
  const env = __vite_import_meta_env__;
  const fromEnv = env?.[ENV_KEY];
  if (fromEnv && fromEnv.length > 0) {
    cached$1 = normalise(fromEnv);
    return cached$1;
  }
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEY$1 });
    cached$1 = value && value.length > 0 ? normalise(value) : null;
  } catch {
    cached$1 = null;
  }
  return cached$1;
}
async function setRemoteApiBaseURL(url) {
  cached$1 = url ? normalise(url) : null;
  if (cached$1) {
    await Preferences.set({ key: STORAGE_KEY$1, value: cached$1 });
  } else {
    await Preferences.remove({ key: STORAGE_KEY$1 });
  }
}
function normalise(url) {
  return url.replace(/\/+$/, "");
}
const apiBase = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRemoteApiBaseURL,
  setRemoteApiBaseURL
}, Symbol.toStringTag, { value: "Module" }));
const STORAGE_KEY = "alma.ios.backendMode";
const EVENT$1 = "alma:ios:backend-mode-changed";
let cached;
async function getBackendMode() {
  if (cached !== void 0) return cached;
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    cached = value === "remote" ? "remote" : "local";
  } catch {
    cached = "local";
  }
  return cached;
}
function getBackendModeSync() {
  return cached ?? "local";
}
async function setBackendMode(mode2) {
  cached = mode2;
  await Preferences.set({ key: STORAGE_KEY, value: mode2 });
  window.dispatchEvent(new CustomEvent(EVENT$1, { detail: mode2 }));
}
function onBackendModeChange(cb) {
  const handler = (e) => cb(e.detail);
  window.addEventListener(EVENT$1, handler);
  return () => window.removeEventListener(EVENT$1, handler);
}
const mode = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getBackendMode,
  getBackendModeSync,
  onBackendModeChange,
  setBackendMode
}, Symbol.toStringTag, { value: "Module" }));
const LOCAL_BASE = "http://alma.local";
const KEY_ENABLED = "alma.ios.e2e.enabled";
const KEY_ORIGIN = "alma.ios.e2e.relayOrigin";
const KEY_CODE = "alma.ios.e2e.code";
const EVENT = "alma:ios:e2e-config-changed";
let cache = { enabled: false, relayOrigin: "", code: "" };
let loadPromise = null;
function setSessionE2EConfig(relayOrigin, code) {
  cache = { enabled: true, relayOrigin, code };
  loadPromise = Promise.resolve(cache);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: cache }));
}
function ensureE2ELoaded() {
  if (!loadPromise) loadPromise = consumeHashPairing().then(() => loadE2EConfig());
  return loadPromise;
}
async function consumeHashPairing() {
  try {
    const hash = window.location.hash;
    if (!hash.startsWith("#connect?")) return;
    const params = new URLSearchParams(hash.slice("#connect?".length));
    const origin = params.get("u") || "";
    const code = params.get("k") || "";
    const e2e = params.get("e2e") === "1";
    if (!/^https?:\/\//.test(origin)) return;
    if (e2e && code) {
      cache = { enabled: true, relayOrigin: origin.replace(/\/+$/, ""), code };
      await Promise.all([
        Preferences.set({ key: KEY_ENABLED, value: "true" }),
        Preferences.set({ key: KEY_ORIGIN, value: cache.relayOrigin }),
        Preferences.set({ key: KEY_CODE, value: cache.code })
      ]);
    } else {
      const { setRemoteApiBaseURL: setRemoteApiBaseURL2 } = await __vitePreload(async () => {
        const { setRemoteApiBaseURL: setRemoteApiBaseURL3 } = await Promise.resolve().then(() => apiBase);
        return { setRemoteApiBaseURL: setRemoteApiBaseURL3 };
      }, true ? void 0 : void 0, import.meta.url);
      await setRemoteApiBaseURL2(origin);
    }
    const { setBackendMode: setBackendMode2 } = await __vitePreload(async () => {
      const { setBackendMode: setBackendMode3 } = await Promise.resolve().then(() => mode);
      return { setBackendMode: setBackendMode3 };
    }, true ? void 0 : void 0, import.meta.url);
    await setBackendMode2("remote");
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  } catch {
  }
}
async function loadE2EConfig() {
  try {
    const [enabled, relayOrigin, code] = await Promise.all([
      Preferences.get({ key: KEY_ENABLED }),
      Preferences.get({ key: KEY_ORIGIN }),
      Preferences.get({ key: KEY_CODE })
    ]);
    cache = {
      enabled: enabled.value === "true",
      relayOrigin: relayOrigin.value ?? "",
      code: code.value ?? ""
    };
  } catch {
    cache = { enabled: false, relayOrigin: "", code: "" };
  }
  return cache;
}
function getE2EConfigSync() {
  return cache;
}
function isE2EActiveSync() {
  return cache.enabled && cache.relayOrigin.length > 0 && cache.code.length > 0;
}
async function setE2EConfig(relayOrigin, code) {
  cache = { enabled: true, relayOrigin: relayOrigin.replace(/\/+$/, ""), code };
  await Promise.all([
    Preferences.set({ key: KEY_ENABLED, value: "true" }),
    Preferences.set({ key: KEY_ORIGIN, value: cache.relayOrigin }),
    Preferences.set({ key: KEY_CODE, value: cache.code })
  ]);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: cache }));
}
async function clearE2EConfig() {
  cache = { enabled: false, relayOrigin: "", code: "" };
  await Promise.all([Preferences.remove({ key: KEY_ENABLED }), Preferences.remove({ key: KEY_ORIGIN }), Preferences.remove({ key: KEY_CODE })]);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: cache }));
}
function onE2EConfigChange(cb) {
  const handler = (e) => cb(e.detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
const CURVE = "P-256";
const HKDF_HASH = "SHA-256";
const AES = "AES-GCM";
const PROTOCOL = "alma-relay-e2e/v1";
const subtle = (globalThis.crypto || globalThis.crypto).subtle;
const getRandomValues = (a) => globalThis.crypto.getRandomValues(a);
const enc$2 = new TextEncoder();
function b64uEncode(bytes) {
  let binary = "";
  const chunk = 32768;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64uDecode(text) {
  const padded = text.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - padded.length % 4) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
function concat(...parts) {
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const p of parts) {
    out.set(p, offset);
    offset += p.length;
  }
  return out;
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
async function deriveRoutingToken(code) {
  const key2 = await subtle.importKey("raw", enc$2.encode(code), "HKDF", false, ["deriveBits"]);
  const bits = await subtle.deriveBits({ name: "HKDF", hash: HKDF_HASH, salt: enc$2.encode(`${PROTOCOL}/routing`), info: new Uint8Array(0) }, key2, 128);
  return b64uEncode(new Uint8Array(bits));
}
async function generateEphemeralKeyPair() {
  const pair = await subtle.generateKey({ name: "ECDH", namedCurve: CURVE }, false, ["deriveBits"]);
  const publicKeyRaw = new Uint8Array(await subtle.exportKey("raw", pair.publicKey));
  return { privateKey: pair.privateKey, publicKeyRaw };
}
function randomNonce16() {
  return getRandomValues(new Uint8Array(16));
}
async function hkdf(ikm, salt, info, bits) {
  return new Uint8Array(await subtle.deriveBits({ name: "HKDF", hash: HKDF_HASH, salt: asArrayBuffer(salt), info: asArrayBuffer(info) }, ikm, bits));
}
async function deriveSessionKeys(params) {
  const peerPublicKey = await subtle.importKey("raw", asArrayBuffer(params.peerPublicKeyRaw), { name: "ECDH", namedCurve: CURVE }, false, []);
  const sharedBits = await subtle.deriveBits({ name: "ECDH", public: peerPublicKey }, params.privateKey, 256);
  const dhKey = await subtle.importKey("raw", sharedBits, "HKDF", false, ["deriveBits"]);
  const transcript = await subtle.digest(
    HKDF_HASH,
    asArrayBuffer(concat(enc$2.encode(PROTOCOL), params.initiatorPublicKeyRaw, params.responderPublicKeyRaw, params.initiatorNonce, params.responderNonce))
  );
  const transcriptBytes = new Uint8Array(transcript);
  const salt = enc$2.encode(params.code);
  const [c2sBits, s2cBits, cr, ci] = await Promise.all([
    hkdf(dhKey, salt, concat(enc$2.encode("c2s|"), transcriptBytes), 256),
    hkdf(dhKey, salt, concat(enc$2.encode("s2c|"), transcriptBytes), 256),
    hkdf(dhKey, salt, concat(enc$2.encode("confirm-r|"), transcriptBytes), 256),
    hkdf(dhKey, salt, concat(enc$2.encode("confirm-i|"), transcriptBytes), 256)
  ]);
  const c2s = await subtle.importKey("raw", asArrayBuffer(c2sBits), AES, false, ["encrypt", "decrypt"]);
  const s2c = await subtle.importKey("raw", asArrayBuffer(s2cBits), AES, false, ["encrypt", "decrypt"]);
  return { c2s, s2c, confirmResponder: cr, confirmInitiator: ci };
}
function asArrayBuffer(bytes) {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}
function nonceFromCounter(counter) {
  const nonce = new Uint8Array(12);
  const view = new DataView(nonce.buffer);
  view.setBigUint64(4, counter);
  return nonce;
}
class AeadStream {
  constructor(key2) {
    this.key = key2;
  }
  counter = 0n;
  async seal(plaintext) {
    const nonce = nonceFromCounter(this.counter++);
    const ct = new Uint8Array(await subtle.encrypt({ name: AES, iv: asArrayBuffer(nonce) }, this.key, asArrayBuffer(plaintext)));
    return concat(nonce, ct);
  }
  async open(frame) {
    if (frame.length < 12) throw new Error("E2E frame too short");
    const nonce = frame.subarray(0, 12);
    const ct = frame.subarray(12);
    const pt = await subtle.decrypt({ name: AES, iv: asArrayBuffer(nonce) }, this.key, asArrayBuffer(ct));
    return new Uint8Array(pt);
  }
}
const BINARY_FRAMES_FIELD = "bin";
const STREAMED_BODIES_FIELD = "sb";
const MARKER = 0;
const enc$1 = new TextEncoder();
const dec = new TextDecoder();
function asBytes(value) {
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (ArrayBuffer.isView(value)) return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  return null;
}
function encodeInnerFrame(frame, binary) {
  const bytes = asBytes(frame.b);
  if (binary) {
    let field = null;
    let payload = null;
    if (bytes) {
      field = "b";
      payload = bytes;
    } else if (frame.t === "wmsg" && typeof frame.s === "string") {
      field = "s";
      payload = enc$1.encode(frame.s);
    }
    if (field && payload) {
      const header = { ...frame, $: field };
      delete header[field];
      const head = enc$1.encode(JSON.stringify(header));
      const out = new Uint8Array(5 + head.length + payload.length);
      out[0] = MARKER;
      new DataView(out.buffer).setUint32(1, head.length);
      out.set(head, 5);
      out.set(payload, 5 + head.length);
      return out;
    }
  }
  if (bytes) return enc$1.encode(JSON.stringify({ ...frame, b: b64uEncode(bytes) }));
  return enc$1.encode(JSON.stringify(frame));
}
function decodeInnerFrame(plaintext) {
  if (plaintext.length > 0 && plaintext[0] === MARKER) {
    if (plaintext.length < 5) throw new Error("E2E frame header truncated");
    const view = new DataView(plaintext.buffer, plaintext.byteOffset, plaintext.byteLength);
    const headLen = view.getUint32(1);
    if (5 + headLen > plaintext.length) throw new Error("E2E frame header truncated");
    const frame2 = JSON.parse(dec.decode(plaintext.subarray(5, 5 + headLen)));
    const field = frame2.$;
    delete frame2.$;
    const payload = plaintext.slice(5 + headLen);
    if (field === "s") frame2.s = dec.decode(payload);
    else frame2.b = payload;
    return frame2;
  }
  const frame = JSON.parse(dec.decode(plaintext));
  if (typeof frame.b === "string") frame.b = b64uDecode(frame.b);
  return frame;
}
class E2ESession {
  role;
  code;
  send;
  onReady;
  onFrame;
  onError;
  offerBinary;
  /** Both sides agreed on binary inner frames. */
  binary = false;
  offerStreamed;
  /** Both sides agreed on streamed request bodies. */
  streamed = false;
  eph = null;
  myNonce = randomNonce16();
  keys = null;
  sendStream = null;
  recvStream = null;
  state = "init";
  outbox = [];
  outgoing = Promise.resolve();
  incoming = Promise.resolve();
  constructor(opts) {
    this.role = opts.role;
    this.code = opts.code;
    this.send = opts.send;
    this.onReady = opts.onReady;
    this.onFrame = opts.onFrame;
    this.onError = opts.onError;
    this.offerBinary = opts.binaryFrames ?? (function(){ try { return localStorage.getItem("alma.android.e2e.text") !== "1"; } catch (e) { return true; } })();
    this.offerStreamed = opts.streamedBodies ?? false;
  }
  /** Initiator only: kick off the handshake once the socket is open. */
  async start() {
    if (this.role !== "initiator") return;
    this.eph = await generateEphemeralKeyPair();
    this.state = "await-hi";
    const hi = { t: "hi", epk: b64uEncode(this.eph.publicKeyRaw), n: b64uEncode(this.myNonce) };
    if (this.offerBinary) hi[BINARY_FRAMES_FIELD] = 1;
    if (this.offerStreamed) hi[STREAMED_BODIES_FIELD] = 1;
    this.send(JSON.stringify(hi));
  }
  isReady() {
    return this.state === "ready";
  }
  /** Whether inner frames go out binary (both peers offered it). */
  usesBinaryFrames() {
    return this.binary;
  }
  /** Whether request bodies may be streamed (both peers offered it). */
  usesStreamedBodies() {
    return this.streamed;
  }
  /** Queue (pre-handshake) or send (post-handshake) an inner protocol frame. */
  async sendFrame(frame) {
    if (this.state === "failed") return;
    if (this.state !== "ready" || !this.sendStream) {
      this.outbox.push(frame);
      return;
    }
    const work = this.outgoing.then(async () => {
      if (this.state === "failed" || !this.sendStream) throw new Error("E2E session failed");
      const sealed = await this.sendStream.seal(encodeInnerFrame(frame, this.binary));
      this.send(sealed);
    });
    this.outgoing = work.catch((error) => this.fail(error instanceof Error ? error.message : String(error)));
    return work;
  }
  onMessage(data) {
    this.incoming = this.incoming.then(() => this.consumeMessage(data));
    return this.incoming;
  }
  async consumeMessage(data) {
    if (this.state === "failed") return;
    try {
      if (typeof data === "string") {
        await this.onHandshake(JSON.parse(data));
      } else {
        if (!this.recvStream) return;
        const plaintext = await this.recvStream.open(data);
        this.onFrame(decodeInnerFrame(plaintext));
      }
    } catch (error) {
      this.fail(error instanceof Error ? error.message : String(error));
    }
  }
  async onHandshake(msg) {
    if (this.role === "responder" && msg.t === "hi" && this.state === "init") {
      const peerPub = b64uDecode(String(msg.epk));
      const peerNonce = b64uDecode(String(msg.n));
      this.binary = this.offerBinary && msg[BINARY_FRAMES_FIELD] === 1;
      this.streamed = this.offerStreamed && msg[STREAMED_BODIES_FIELD] === 1;
      this.eph = await generateEphemeralKeyPair();
      this.keys = await deriveSessionKeys({
        privateKey: this.eph.privateKey,
        peerPublicKeyRaw: peerPub,
        code: this.code,
        initiatorPublicKeyRaw: peerPub,
        responderPublicKeyRaw: this.eph.publicKeyRaw,
        initiatorNonce: peerNonce,
        responderNonce: this.myNonce
      });
      this.state = "await-ok";
      const hi = {
        t: "hi",
        epk: b64uEncode(this.eph.publicKeyRaw),
        n: b64uEncode(this.myNonce),
        cr: b64uEncode(this.keys.confirmResponder)
      };
      if (this.binary) hi[BINARY_FRAMES_FIELD] = 1;
      if (this.streamed) hi[STREAMED_BODIES_FIELD] = 1;
      this.send(JSON.stringify(hi));
      return;
    }
    if (this.role === "initiator" && msg.t === "hi" && this.state === "await-hi") {
      const peerPub = b64uDecode(String(msg.epk));
      const peerNonce = b64uDecode(String(msg.n));
      this.binary = this.offerBinary && msg[BINARY_FRAMES_FIELD] === 1;
      this.streamed = this.offerStreamed && msg[STREAMED_BODIES_FIELD] === 1;
      this.keys = await deriveSessionKeys({
        privateKey: this.eph.privateKey,
        peerPublicKeyRaw: peerPub,
        code: this.code,
        initiatorPublicKeyRaw: this.eph.publicKeyRaw,
        responderPublicKeyRaw: peerPub,
        initiatorNonce: this.myNonce,
        responderNonce: peerNonce
      });
      if (!timingSafeEqual(b64uDecode(String(msg.cr)), this.keys.confirmResponder)) {
        this.fail("Handshake authentication failed (wrong code or man-in-the-middle)");
        this.send(JSON.stringify({ t: "err", message: "auth-failed" }));
        return;
      }
      this.send(JSON.stringify({ t: "ok", ci: b64uEncode(this.keys.confirmInitiator) }));
      this.sendStream = new AeadStream(this.keys.c2s);
      this.recvStream = new AeadStream(this.keys.s2c);
      await this.markReady();
      return;
    }
    if (this.role === "responder" && msg.t === "ok" && this.state === "await-ok") {
      if (!timingSafeEqual(b64uDecode(String(msg.ci)), this.keys.confirmInitiator)) {
        this.fail("Handshake authentication failed (wrong code or man-in-the-middle)");
        return;
      }
      this.sendStream = new AeadStream(this.keys.s2c);
      this.recvStream = new AeadStream(this.keys.c2s);
      await this.markReady();
      return;
    }
    if (msg.t === "err") {
      this.fail(`Peer rejected handshake: ${String(msg.message || "unknown")}`);
    }
  }
  async markReady() {
    this.state = "ready";
    this.onReady();
    const queued = this.outbox;
    this.outbox = [];
    for (const frame of queued) await this.sendFrame(frame);
  }
  fail(message) {
    if (this.state === "failed") return;
    this.state = "failed";
    this.onError(message);
  }
}
const enc = new TextEncoder();
async function toBytes(body) {
  if (body == null) return null;
  if (typeof body === "string") return enc.encode(body);
  if (body instanceof Uint8Array) return body;
  if (body instanceof ArrayBuffer) return new Uint8Array(body);
  const buf = await new Response(body).arrayBuffer();
  return new Uint8Array(buf);
}
function normalizeHeaders(init) {
  const out = {};
  if (!init) return out;
  if (init instanceof Headers) {
    init.forEach((v, k) => out[k] = v);
  } else if (Array.isArray(init)) {
    for (const [k, v] of init) out[k.toLowerCase()] = v;
  } else {
    for (const [k, v] of Object.entries(init)) out[k.toLowerCase()] = String(v);
  }
  return out;
}
function withAbort(promise, signal) {
  if (!signal) return promise;
  const reason = () => signal.reason ?? new DOMException("Request aborted", "AbortError");
  if (signal.aborted) return Promise.reject(reason());
  return new Promise((resolve, reject) => {
    const abort = () => {
      signal.removeEventListener("abort", abort);
      reject(reason());
    };
    signal.addEventListener("abort", abort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", abort);
        resolve(value);
      },
      (error) => {
        signal.removeEventListener("abort", abort);
        reject(error);
      }
    );
  });
}
class RelayE2EClient {
  wsBase;
  directUrl;
  connectTimeoutMs;
  code;
  WebSocketImpl;
  onStateChange;
  ws = null;
  session = null;
  state = "closed";
  counter = 0;
  readyWaiters = [];
  httpCalls = /* @__PURE__ */ new Map();
  bridges = /* @__PURE__ */ new Map();
  closedByUser = false;
  connectTimer;
  connectionEpoch = 0;
  constructor(opts) {
    this.wsBase = opts.serverUrl.replace(/\/+$/, "").replace(/^http/, "ws");
    this.directUrl = opts.directUrl;
    this.connectTimeoutMs = opts.connectTimeoutMs ?? 2e4;
    this.code = opts.code;
    this.WebSocketImpl = opts.WebSocketImpl ?? globalThis.WebSocket;
    this.onStateChange = opts.onStateChange;
  }
  getState() {
    return this.state;
  }
  /** Requests still waiting on the host; a route switch now would fail them. */
  inFlight() {
    return this.httpCalls.size;
  }
  async connect() {
    if (this.state === "connecting" || this.state === "ready") return this.ready();
    this.closedByUser = false;
    this.setState("connecting");
    const epoch = ++this.connectionEpoch;
    let routingToken;
    let ws;
    try {
      routingToken = await deriveRoutingToken(this.code);
      if (epoch !== this.connectionEpoch) throw new Error("Client disconnected during pairing");
      ws = new this.WebSocketImpl(this.directUrl ?? `${this.wsBase}/c/${routingToken}/__alma_e2e__`);
    } catch (error) {
      if (epoch === this.connectionEpoch) this.fail(error instanceof Error ? error.message : String(error));
      throw error;
    }
    ws.binaryType = "arraybuffer";
    this.ws = ws;
    this.connectTimer = setTimeout(() => {
      this.fail("Encrypted relay connection timed out");
      ws.close();
    }, this.connectTimeoutMs);
    const session = new E2ESession({
      role: "initiator",
      code: this.code,
      send: (data) => {
        if (typeof data === "string") ws.send(data);
        else ws.send(data);
      },
      onReady: () => {
        if (this.ws !== ws) return;
        this.setState("ready");
        for (const w of this.readyWaiters) w.resolve();
        this.readyWaiters = [];
      },
      onFrame: (frame) => this.onInnerFrame(frame),
      onError: (message) => this.fail(message)
    });
    this.session = session;
    ws.onopen = () => {
      if (this.ws !== ws) return;
      void session.start();
    };
    ws.onmessage = (ev) => {
      if (this.ws !== ws) return;
      const data = ev.data;
      if (typeof data === "string") void session.onMessage(data);
      else if (data instanceof ArrayBuffer) void session.onMessage(new Uint8Array(data));
      else if (ArrayBuffer.isView(data)) void session.onMessage(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
    };
    ws.onclose = () => {
      if (this.ws === ws) this.handleClose("Relay tunnel closed");
    };
    ws.onerror = () => {
      if (this.ws !== ws) return;
      if (this.state === "connecting") this.fail("Failed to open relay tunnel");
    };
    return this.ready();
  }
  ready() {
    if (this.state === "ready") return Promise.resolve();
    if (this.state === "error" || this.state === "closed") return Promise.reject(new Error("E2E tunnel not connected"));
    return new Promise((resolve, reject) => this.readyWaiters.push({ resolve, reject }));
  }
  close() {
    this.connectionEpoch++;
    this.closedByUser = true;
    this.setState("closed");
    const ws = this.ws;
    this.ws = null;
    this.handleClose("Client disconnected");
    try {
      ws?.close();
    } catch {
    }
  }
  async fetch(path, init) {
    if (init?.signal?.aborted) throw init.signal.reason ?? new DOMException("Request aborted", "AbortError");
    await withAbort(this.connect(), init?.signal);
    const id = `h${++this.counter}`;
    const method = (init?.method || "GET").toUpperCase();
    const headers = normalizeHeaders(init?.headers);
    const body = method === "GET" || method === "HEAD" ? null : await toBytes(init?.body);
    if (init?.signal?.aborted) throw init.signal.reason ?? new DOMException("Request aborted", "AbortError");
    const head = new Promise((resolve, reject) => {
      const call = { resolveHead: resolve, rejectHead: reject, enqueue: null, close: null, fail: null, headSent: false };
      this.httpCalls.set(id, call);
    });
    const stream = new ReadableStream({
      start: (controller) => {
        const call = this.httpCalls.get(id);
        call.enqueue = (chunk) => {
          try {
            controller.enqueue(chunk);
          } catch {
          }
        };
        call.close = () => {
          try {
            controller.close();
          } catch {
          }
        };
        call.fail = (message) => {
          try {
            controller.error(message instanceof Error ? message : new Error(message));
          } catch {
          }
        };
      },
      cancel: () => {
        const call = this.httpCalls.get(id);
        call?.cleanup?.();
        if (this.httpCalls.delete(id)) void this.session?.sendFrame({ t: "hcancel", id }).catch(() => {
        });
      }
    });
    const signal = init?.signal;
    if (signal) {
      const abort = () => {
        const call = this.httpCalls.get(id);
        if (!call) return;
        this.httpCalls.delete(id);
        call.cleanup?.();
        const error = signal.reason ?? new DOMException("Request aborted", "AbortError");
        call.rejectHead(error);
        call.fail?.(error);
        void this.session?.sendFrame({ t: "hcancel", id }).catch(() => {
        });
      };
      this.httpCalls.get(id).cleanup = () => signal.removeEventListener("abort", abort);
      signal.addEventListener("abort", abort, { once: true });
      if (signal.aborted) abort();
    }
    const request = this.httpCalls.has(id) ? this.session.sendFrame({ t: "hreq", id, method, path, headers, b: body ?? void 0 }) : Promise.resolve();
    const [res] = await Promise.all([head, request]).catch((error) => {
      const call = this.httpCalls.get(id);
      this.httpCalls.delete(id);
      call?.cleanup?.();
      call?.fail?.(error);
      throw error;
    });
    return new Response(res.status === 204 || res.status === 304 ? null : stream, {
      status: res.status,
      headers: new Headers(res.headers)
    });
  }
  openWebSocket(path) {
    const id = `w${++this.counter}`;
    const bridge = new TunneledWebSocket(id, (frame) => this.session?.sendFrame(frame));
    this.bridges.set(id, bridge);
    void this.connect().then(() => {
      if (bridge.readyState >= 2) {
        this.bridges.delete(id);
        return;
      }
      return this.session.sendFrame({ t: "wopen", id, path });
    }).catch((e) => bridge._fail(e instanceof Error ? e.message : String(e)));
    return bridge;
  }
  onInnerFrame(frame) {
    const id = String(frame.id ?? "");
    switch (frame.t) {
      case "hres": {
        const call = this.httpCalls.get(id);
        if (!call) return;
        call.headSent = true;
        call.resolveHead({ status: Number(frame.status) || 200, headers: frame.headers || {} });
        break;
      }
      case "hchunk": {
        if (frame.b instanceof Uint8Array) this.httpCalls.get(id)?.enqueue?.(frame.b);
        break;
      }
      case "hend": {
        const call = this.httpCalls.get(id);
        if (!call) return;
        this.httpCalls.delete(id);
        call.cleanup?.();
        call.close?.();
        break;
      }
      case "herr": {
        const call = this.httpCalls.get(id);
        if (!call) return;
        this.httpCalls.delete(id);
        call.cleanup?.();
        if (!call.headSent) call.rejectHead(new Error(String(frame.message || "Upstream error")));
        else call.fail?.(String(frame.message || "Upstream error"));
        break;
      }
      case "wopened":
        this.bridges.get(id)?._open();
        break;
      case "werr":
        this.bridges.get(id)?._fail(String(frame.message || "Desktop could not open the socket"));
        this.bridges.delete(id);
        break;
      case "wmsg": {
        const bridge = this.bridges.get(id);
        if (!bridge) return;
        if (typeof frame.s === "string") bridge._deliver(frame.s);
        else if (frame.b instanceof Uint8Array) bridge._deliver(frame.b.buffer.slice(frame.b.byteOffset, frame.b.byteOffset + frame.b.byteLength));
        break;
      }
      case "wclose":
        this.bridges.get(id)?._closed(Number(frame.code) || 1e3, String(frame.reason || ""));
        this.bridges.delete(id);
        break;
    }
  }
  handleClose(reason) {
    for (const waiter of this.readyWaiters) waiter.reject(new Error(reason));
    this.readyWaiters = [];
    for (const call of this.httpCalls.values()) {
      call.cleanup?.();
      if (!call.headSent) call.rejectHead(new Error(reason));
      else call.fail?.(reason);
    }
    this.httpCalls.clear();
    for (const bridge of this.bridges.values()) bridge._closed(1006, reason);
    this.bridges.clear();
    if (!this.closedByUser && this.state !== "error") this.setState("closed");
  }
  fail(message) {
    this.setState("error", message);
    for (const w of this.readyWaiters) w.reject(new Error(message));
    this.readyWaiters = [];
    this.handleClose(message);
  }
  setState(state, error) {
    if (state !== "connecting" && this.connectTimer) {
      clearTimeout(this.connectTimer);
      this.connectTimer = void 0;
    }
    this.state = state;
    this.onStateChange?.(state, error);
  }
}
class TunneledWebSocket {
  constructor(id, emit) {
    this.id = id;
    this.emit = emit;
  }
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  binaryType = "blob";
  readyState = 0;
  onopen = null;
  onmessage = null;
  onclose = null;
  onerror = null;
  sendQueue = [];
  send(data) {
    if (this.readyState >= 2) throw new DOMException("WebSocket is closed", "InvalidStateError");
    let frame;
    if (typeof data === "string") {
      frame = { t: "wmsg", id: this.id, s: data };
    } else {
      const bytes = data instanceof ArrayBuffer ? new Uint8Array(data.slice(0)) : new Uint8Array(data.buffer, data.byteOffset, data.byteLength).slice();
      frame = { t: "wmsg", id: this.id, b: bytes };
    }
    if (this.readyState === 1) this.emit(frame);
    else this.sendQueue.push(frame);
  }
  close(code, reason) {
    if (this.readyState === 3) return;
    this.readyState = 2;
    this.emit({ t: "wclose", id: this.id, code, reason });
    this._closed(code || 1e3, reason || "");
  }
  _open() {
    if (this.readyState >= 2) return;
    this.readyState = 1;
    this.onopen?.({});
    for (const frame of this.sendQueue) this.emit(frame);
    this.sendQueue = [];
  }
  _deliver(data) {
    this.onmessage?.({ data });
  }
  _fail(message) {
    this.onerror?.({ message });
    this._closed(1011, message);
  }
  _closed(code, reason) {
    if (this.readyState === 3) return;
    this.readyState = 3;
    this.onclose?.({ code, reason });
  }
}
const E2E_SENTINEL_HOST = "alma-e2e.local";
const E2E_SENTINEL_BASE = `https://${E2E_SENTINEL_HOST}`;
let installed = false;
let client = null;
let RealWebSocket;
function relayPeerLabel(origin) {
  try {
    return new URL(origin).host;
  } catch {
    return origin;
  }
}
function getClient() {
  const cfg = getE2EConfigSync();
  if (!client) {
    const peer = relayPeerLabel(cfg.relayOrigin);
    const mine = new RelayE2EClient({
      serverUrl: cfg.relayOrigin,
      code: cfg.code,
      WebSocketImpl: RealWebSocket,
      onStateChange: (state, error) => {
        if (client !== mine) return;
        setPhoneConnectionState({
          kind: "relay",
          peer,
          status: state === "ready" ? "online" : state === "connecting" ? "connecting" : state === "error" ? "error" : "offline",
          error
        });
      }
    });
    client = mine;
    setPhoneConnectionState({ kind: "relay", peer, status: "connecting" });
  }
  return client;
}
function resetClient() {
  try {
    client?.close();
  } catch {
  }
  client = null;
}
function reconnectE2E() {
  if (!isE2EActiveSync()) return;
  const s = client?.getState();
  if (s === "ready" || s === "connecting") return;
  resetClient();
  void getClient().connect().catch(() => {
  });
}
function isSentinel(url) {
  return url.host === E2E_SENTINEL_HOST;
}
function toURL(input) {
  try {
    if (input instanceof Request) return new URL(input.url);
    if (input instanceof URL) return input;
    const str = String(input);
    if (str.startsWith("/")) return new URL(str, E2E_SENTINEL_BASE);
    return new URL(str);
  } catch {
    return null;
  }
}
function installE2EBridge() {
  if (installed) return;
  installed = true;
  RealWebSocket = window.WebSocket;
  onE2EConfigChange(() => resetClient());
  registerPhoneReconnect(reconnectE2E);
  const originalFetch = window.fetch.bind(window);
  window.fetch = async function e2eFetch(input, init) {
    if (!isE2EActiveSync()) return originalFetch(input, init);
    const url = toURL(input);
    if (!url || !isSentinel(url)) return originalFetch(input, init);
    let path = url.pathname + url.search;
    let finalInit = init;
    if (input instanceof Request) {
      const body = input.method === "GET" || input.method === "HEAD" ? void 0 : await input.clone().arrayBuffer();
      finalInit = { method: input.method, headers: input.headers, body, ...init };
      path = new URL(input.url).pathname + new URL(input.url).search;
    }
    return getClient().fetch(path, finalInit);
  };
  const PatchedWebSocket = function(url, protocols) {
    const u = typeof url === "string" ? toURL(url) : url instanceof URL ? url : null;
    if (u && isSentinel(u) && isE2EActiveSync()) {
      return getClient().openWebSocket(u.pathname + u.search);
    }
    return new RealWebSocket(url, protocols);
  };
  PatchedWebSocket.prototype = RealWebSocket.prototype;
  PatchedWebSocket.CONNECTING = RealWebSocket.CONNECTING;
  PatchedWebSocket.OPEN = RealWebSocket.OPEN;
  PatchedWebSocket.CLOSING = RealWebSocket.CLOSING;
  PatchedWebSocket.CLOSED = RealWebSocket.CLOSED;
  window.WebSocket = PatchedWebSocket;
}
const apiServerShim = {
  async getInfo() {
    const mode2 = await getBackendMode();
    if (mode2 === "remote") {
      await ensureE2ELoaded();
      if (isE2EActiveSync()) {
        return { port: null, baseURL: E2E_SENTINEL_BASE };
      }
      const baseURL = await getRemoteApiBaseURL();
      return { port: null, baseURL };
    }
    return { port: null, baseURL: LOCAL_BASE };
  }
};
const platformShim = {
  get: () => Promise.resolve("ios")
};
const Browser = registerPlugin("Browser", {
  web: () => __vitePreload(() => import("./web-DNDwHOUa.js"), true ? __vite__mapDeps([5,1,2,3,4]) : void 0, import.meta.url).then((m) => new m.BrowserWeb())
});
const Share = registerPlugin("Share", {
  web: () => __vitePreload(() => import("./web-qSgEn7GG.js"), true ? __vite__mapDeps([6,1,2,3,4]) : void 0, import.meta.url).then((m) => new m.ShareWeb())
});
const systemFileShim = {
  async openInPreview(_filePath) {
    console.warn("[ios] systemFile.openInPreview is not supported on iOS");
    return false;
  },
  async openExternal(url) {
    try {
      await Browser.open({ url });
      return true;
    } catch (err) {
      console.error("[ios] Browser.open failed", err);
      return false;
    }
  },
  async showItemInFolder(_filePath) {
    console.warn("[ios] systemFile.showItemInFolder is not supported on iOS");
    return false;
  },
  async share(payload) {
    try {
      await Share.share(payload);
      return true;
    } catch (err) {
      console.error("[ios] Share.share failed", err);
      return false;
    }
  },
  async readAsDataUrl(fileUrl) {
    try {
      const res = await fetch(fileUrl);
      if (!res.ok) return { success: false, error: `HTTP ${res.status}` };
      const blob = await res.blob();
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error ?? new Error("FileReader error"));
        reader.readAsDataURL(blob);
      });
      return { success: true, dataUrl };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  }
};
class ClipboardWeb extends WebPlugin {
  async write(options) {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      throw this.unavailable("Clipboard API not available in this browser");
    }
    if (options.string !== void 0) {
      await this.writeText(options.string);
    } else if (options.url) {
      await this.writeText(options.url);
    } else if (options.image) {
      if (typeof ClipboardItem !== "undefined") {
        try {
          const blob = await (await fetch(options.image)).blob();
          const clipboardItemInput = new ClipboardItem({ [blob.type]: blob });
          await navigator.clipboard.write([clipboardItemInput]);
        } catch (err) {
          throw new Error("Failed to write image");
        }
      } else {
        throw this.unavailable("Writing images to the clipboard is not supported in this browser");
      }
    } else {
      throw new Error("Nothing to write");
    }
  }
  async read() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      throw this.unavailable("Clipboard API not available in this browser");
    }
    if (typeof ClipboardItem !== "undefined") {
      try {
        const clipboardItems = await navigator.clipboard.read();
        const type = clipboardItems[0].types[0];
        const clipboardBlob = await clipboardItems[0].getType(type);
        const data = await this._getBlobData(clipboardBlob, type);
        return { value: data, type };
      } catch (err) {
        return this.readText();
      }
    } else {
      return this.readText();
    }
  }
  async readText() {
    if (typeof navigator === "undefined" || !navigator.clipboard || !navigator.clipboard.readText) {
      throw this.unavailable("Reading from clipboard not supported in this browser");
    }
    const text = await navigator.clipboard.readText();
    return { value: text, type: "text/plain" };
  }
  async writeText(text) {
    if (typeof navigator === "undefined" || !navigator.clipboard || !navigator.clipboard.writeText) {
      throw this.unavailable("Writting to clipboard not supported in this browser");
    }
    await navigator.clipboard.writeText(text);
  }
  _getBlobData(clipboardBlob, type) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (type.includes("image")) {
        reader.readAsDataURL(clipboardBlob);
      } else {
        reader.readAsText(clipboardBlob);
      }
      reader.onloadend = () => {
        const r = reader.result;
        resolve(r);
      };
      reader.onerror = (e) => {
        reject(e);
      };
    });
  }
}
const Clipboard = registerPlugin("Clipboard", {
  web: () => new ClipboardWeb()
});
const clipboardShim = {
  async readText() {
    try {
      const { value } = await Clipboard.read();
      return value ?? "";
    } catch {
      return "";
    }
  },
  async writeText(text) {
    await Clipboard.write({ string: text });
  },
  async writeImage(_dataUrl) {
    try {
      await Clipboard.write({ image: _dataUrl });
      return true;
    } catch {
      return false;
    }
  }
};
const App = registerPlugin("App", {
  web: () => __vitePreload(() => import("./web-Cgshzwgw.js"), true ? __vite__mapDeps([7,1,2,3,4]) : void 0, import.meta.url).then((m) => new m.AppWeb())
});
const Device = registerPlugin("Device", {
  web: () => __vitePreload(() => import("./web-BEcWYPB_.js"), true ? __vite__mapDeps([8,1,2,3,4]) : void 0, import.meta.url).then((m) => new m.DeviceWeb())
});
let cachedInfo = null;
async function readInfo() {
  if (cachedInfo) return cachedInfo;
  try {
    const info = await App.getInfo();
    cachedInfo = {
      name: info.name ?? "Alma",
      version: info.version ?? "0.0.0",
      build: info.build,
      platform: "ios"
    };
  } catch {
    cachedInfo = { name: "Alma", version: "0.0.0", platform: "ios" };
  }
  return cachedInfo;
}
const noopUnsub$2 = () => () => {
};
const almaAppShim = {
  async getInfo() {
    const info = await readInfo();
    const dev = await Device.getInfo().catch(() => null);
    return {
      name: info.name,
      version: info.version,
      build: info.build,
      platform: "ios",
      arch: dev?.iOSVersion ? `ios-${dev.iOSVersion}` : "ios"
    };
  },
  // App Store manages updates on iOS — report "no update available".
  async checkForUpdates() {
    return { available: false, version: null };
  },
  async getUpdateInfo() {
    return null;
  },
  async downloadUpdate() {
    return { ok: false };
  },
  async quitAndInstall() {
  },
  onAutoUpdateStatus: noopUnsub$2,
  async setAutoStart(_enabled) {
    return false;
  },
  async getAutoStart() {
    return false;
  },
  async setDockVisibility(_visible) {
    return void 0;
  },
  async setAppIcon(_icon) {
    return false;
  }
};
var Weekday;
(function(Weekday2) {
  Weekday2[Weekday2["Sunday"] = 1] = "Sunday";
  Weekday2[Weekday2["Monday"] = 2] = "Monday";
  Weekday2[Weekday2["Tuesday"] = 3] = "Tuesday";
  Weekday2[Weekday2["Wednesday"] = 4] = "Wednesday";
  Weekday2[Weekday2["Thursday"] = 5] = "Thursday";
  Weekday2[Weekday2["Friday"] = 6] = "Friday";
  Weekday2[Weekday2["Saturday"] = 7] = "Saturday";
})(Weekday || (Weekday = {}));
const LocalNotifications = registerPlugin("LocalNotifications", {
  web: () => __vitePreload(() => import("./web-B2WIkTE1.js"), true ? __vite__mapDeps([9,1,2,3,4]) : void 0, import.meta.url).then((m) => new m.LocalNotificationsWeb())
});
const clickListeners = /* @__PURE__ */ new Set();
const actionListeners = /* @__PURE__ */ new Set();
let registered = false;
async function ensurePermission() {
  try {
    const status = await LocalNotifications.checkPermissions();
    if (status.display === "granted") return true;
    const req = await LocalNotifications.requestPermissions();
    return req.display === "granted";
  } catch {
    return false;
  }
}
async function registerOnce() {
  if (registered) return;
  registered = true;
  LocalNotifications.addListener("localNotificationActionPerformed", (event) => {
    const payload = { id: String(event.notification.id ?? ""), actionId: event.actionId };
    for (const fn of clickListeners) fn(payload);
    for (const fn of actionListeners) fn(payload);
  });
}
const almaNotificationsShim = {
  /** ThemeContext calls this so the native macOS notifier inherits app theme.
   *  iOS LocalNotifications styling is system-driven, so we accept and ignore. */
  async setTheme(_payload) {
  },
  async notify(payload) {
    const granted = await ensurePermission();
    if (!granted) return false;
    await registerOnce();
    const idNumber = numericId(payload.id);
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: idNumber,
            title: payload.title ?? "Alma",
            body: payload.body ?? "",
            sound: payload.silent ? void 0 : "default",
            extra: payload.data
          }
        ]
      });
      return true;
    } catch (err) {
      console.error("[ios] LocalNotifications.schedule failed", err);
      return false;
    }
  },
  async close(id) {
    const idNumber = numericId(id);
    try {
      await LocalNotifications.cancel({ notifications: [{ id: idNumber }] });
    } catch {
    }
  },
  onAction: (cb) => {
    actionListeners.add(cb);
    return () => actionListeners.delete(cb);
  },
  onClick: (cb) => {
    clickListeners.add(cb);
    return () => clickListeners.delete(cb);
  }
};
function numericId(value) {
  if (typeof value === "number") return value;
  if (!value) return Math.floor(Math.random() * 2 ** 31);
  let hash = 0;
  for (const ch of String(value)) {
    hash = (hash << 5) - hash + ch.charCodeAt(0);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
}
var CameraSource;
(function(CameraSource2) {
  CameraSource2["Prompt"] = "PROMPT";
  CameraSource2["Camera"] = "CAMERA";
  CameraSource2["Photos"] = "PHOTOS";
})(CameraSource || (CameraSource = {}));
var CameraDirection;
(function(CameraDirection2) {
  CameraDirection2["Rear"] = "REAR";
  CameraDirection2["Front"] = "FRONT";
})(CameraDirection || (CameraDirection = {}));
var CameraResultType;
(function(CameraResultType2) {
  CameraResultType2["Uri"] = "uri";
  CameraResultType2["Base64"] = "base64";
  CameraResultType2["DataUrl"] = "dataUrl";
})(CameraResultType || (CameraResultType = {}));
class CameraWeb extends WebPlugin {
  async getPhoto(options) {
    return new Promise(async (resolve, reject) => {
      if (options.webUseInput || options.source === CameraSource.Photos) {
        this.fileInputExperience(options, resolve, reject);
      } else if (options.source === CameraSource.Prompt) {
        let actionSheet = document.querySelector("pwa-action-sheet");
        if (!actionSheet) {
          actionSheet = document.createElement("pwa-action-sheet");
          document.body.appendChild(actionSheet);
        }
        actionSheet.header = options.promptLabelHeader || "Photo";
        actionSheet.cancelable = false;
        actionSheet.options = [
          { title: options.promptLabelPhoto || "From Photos" },
          { title: options.promptLabelPicture || "Take Picture" }
        ];
        actionSheet.addEventListener("onSelection", async (e) => {
          const selection = e.detail;
          if (selection === 0) {
            this.fileInputExperience(options, resolve, reject);
          } else {
            this.cameraExperience(options, resolve, reject);
          }
        });
      } else {
        this.cameraExperience(options, resolve, reject);
      }
    });
  }
  async pickImages(_options) {
    return new Promise(async (resolve, reject) => {
      this.multipleFileInputExperience(resolve, reject);
    });
  }
  async cameraExperience(options, resolve, reject) {
    if (customElements.get("pwa-camera-modal")) {
      const cameraModal = document.createElement("pwa-camera-modal");
      cameraModal.facingMode = options.direction === CameraDirection.Front ? "user" : "environment";
      document.body.appendChild(cameraModal);
      try {
        await cameraModal.componentOnReady();
        cameraModal.addEventListener("onPhoto", async (e) => {
          const photo = e.detail;
          if (photo === null) {
            reject(new CapacitorException("User cancelled photos app"));
          } else if (photo instanceof Error) {
            reject(photo);
          } else {
            resolve(await this._getCameraPhoto(photo, options));
          }
          cameraModal.dismiss();
          document.body.removeChild(cameraModal);
        });
        cameraModal.present();
      } catch (e) {
        this.fileInputExperience(options, resolve, reject);
      }
    } else {
      console.error(`Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements.`);
      this.fileInputExperience(options, resolve, reject);
    }
  }
  fileInputExperience(options, resolve, reject) {
    let input = document.querySelector("#_capacitor-camera-input");
    const cleanup = () => {
      var _a;
      (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
    };
    if (!input) {
      input = document.createElement("input");
      input.id = "_capacitor-camera-input";
      input.type = "file";
      input.hidden = true;
      document.body.appendChild(input);
      input.addEventListener("change", (_e) => {
        const file = input.files[0];
        let format = "jpeg";
        if (file.type === "image/png") {
          format = "png";
        } else if (file.type === "image/gif") {
          format = "gif";
        }
        if (options.resultType === "dataUrl" || options.resultType === "base64") {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            if (options.resultType === "dataUrl") {
              resolve({
                dataUrl: reader.result,
                format
              });
            } else if (options.resultType === "base64") {
              const b64 = reader.result.split(",")[1];
              resolve({
                base64String: b64,
                format
              });
            }
            cleanup();
          });
          reader.readAsDataURL(file);
        } else {
          resolve({
            webPath: URL.createObjectURL(file),
            format
          });
          cleanup();
        }
      });
      input.addEventListener("cancel", (_e) => {
        reject(new CapacitorException("User cancelled photos app"));
        cleanup();
      });
    }
    input.accept = "image/*";
    input.capture = true;
    if (options.source === CameraSource.Photos || options.source === CameraSource.Prompt) {
      input.removeAttribute("capture");
    } else if (options.direction === CameraDirection.Front) {
      input.capture = "user";
    } else if (options.direction === CameraDirection.Rear) {
      input.capture = "environment";
    }
    input.click();
  }
  multipleFileInputExperience(resolve, reject) {
    let input = document.querySelector("#_capacitor-camera-input-multiple");
    const cleanup = () => {
      var _a;
      (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
    };
    if (!input) {
      input = document.createElement("input");
      input.id = "_capacitor-camera-input-multiple";
      input.type = "file";
      input.hidden = true;
      input.multiple = true;
      document.body.appendChild(input);
      input.addEventListener("change", (_e) => {
        const photos = [];
        for (let i = 0; i < input.files.length; i++) {
          const file = input.files[i];
          let format = "jpeg";
          if (file.type === "image/png") {
            format = "png";
          } else if (file.type === "image/gif") {
            format = "gif";
          }
          photos.push({
            webPath: URL.createObjectURL(file),
            format
          });
        }
        resolve({ photos });
        cleanup();
      });
      input.addEventListener("cancel", (_e) => {
        reject(new CapacitorException("User cancelled photos app"));
        cleanup();
      });
    }
    input.accept = "image/*";
    input.click();
  }
  _getCameraPhoto(photo, options) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const format = photo.type.split("/")[1];
      if (options.resultType === "uri") {
        resolve({
          webPath: URL.createObjectURL(photo),
          format,
          saved: false
        });
      } else {
        reader.readAsDataURL(photo);
        reader.onloadend = () => {
          const r = reader.result;
          if (options.resultType === "dataUrl") {
            resolve({
              dataUrl: r,
              format,
              saved: false
            });
          } else {
            resolve({
              base64String: r.split(",")[1],
              format,
              saved: false
            });
          }
        };
        reader.onerror = (e) => {
          reject(e);
        };
      }
    });
  }
  async checkPermissions() {
    if (typeof navigator === "undefined" || !navigator.permissions) {
      throw this.unavailable("Permissions API not available in this browser");
    }
    try {
      const permission = await window.navigator.permissions.query({
        name: "camera"
      });
      return {
        camera: permission.state,
        photos: "granted"
      };
    } catch (_a) {
      throw this.unavailable("Camera permissions are not available in this browser");
    }
  }
  async requestPermissions() {
    throw this.unimplemented("Not implemented on web.");
  }
  async pickLimitedLibraryPhotos() {
    throw this.unavailable("Not implemented on web.");
  }
  async getLimitedLibraryPhotos() {
    throw this.unavailable("Not implemented on web.");
  }
}
new CameraWeb();
const Camera = registerPlugin("Camera", {
  web: () => new CameraWeb()
});
const cameraShim = {
  async pickImage() {
    try {
      const photo = await Camera.getPhoto({
        source: CameraSource.Photos,
        resultType: CameraResultType.DataUrl,
        quality: 88,
        allowEditing: false,
        presentationStyle: "popover"
      });
      return resultToPicked(photo);
    } catch (err) {
      return failQuietly(err, "pickImage");
    }
  },
  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        source: CameraSource.Camera,
        resultType: CameraResultType.DataUrl,
        quality: 88,
        allowEditing: false,
        presentationStyle: "fullscreen"
      });
      return resultToPicked(photo);
    } catch (err) {
      return failQuietly(err, "takePhoto");
    }
  },
  async pickMany(maxCount = 8) {
    try {
      const result = await Camera.pickImages({
        quality: 88,
        limit: maxCount
      });
      const out = [];
      for (const photo of result.photos ?? []) {
        if (photo.webPath) {
          const dataUrl = await fetchAsDataURL(photo.webPath);
          if (dataUrl) {
            out.push({ dataUrl, format: photo.format ?? "jpeg" });
          }
        }
      }
      return out;
    } catch (err) {
      failQuietly(err, "pickMany");
      return [];
    }
  }
};
function resultToPicked(photo) {
  if (!photo.dataUrl) return null;
  return { dataUrl: photo.dataUrl, format: photo.format ?? "jpeg" };
}
function failQuietly(err, where) {
  const msg = err instanceof Error ? err.message : String(err);
  if (/cancel/i.test(msg)) return null;
  console.warn(`[ios] cameraShim.${where} failed:`, msg);
  return null;
}
async function fetchAsDataURL(url) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error ?? new Error("FileReader error"));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
var ImpactStyle;
(function(ImpactStyle2) {
  ImpactStyle2["Heavy"] = "HEAVY";
  ImpactStyle2["Medium"] = "MEDIUM";
  ImpactStyle2["Light"] = "LIGHT";
})(ImpactStyle || (ImpactStyle = {}));
var NotificationType;
(function(NotificationType2) {
  NotificationType2["Success"] = "SUCCESS";
  NotificationType2["Warning"] = "WARNING";
  NotificationType2["Error"] = "ERROR";
})(NotificationType || (NotificationType = {}));
const Haptics = registerPlugin("Haptics", {
  web: () => __vitePreload(() => import("./web-CbR48UH8.js"), true ? __vite__mapDeps([10,1,2,3,4]) : void 0, import.meta.url).then((m) => new m.HapticsWeb())
});
const STYLE_MAP = {
  light: ImpactStyle.Light,
  medium: ImpactStyle.Medium,
  heavy: ImpactStyle.Heavy
};
const hapticsShim = {
  async impact(intensity = "light") {
    try {
      await Haptics.impact({ style: STYLE_MAP[intensity] });
    } catch {
    }
  },
  async selection() {
    try {
      await Haptics.selectionStart();
      await Haptics.selectionEnd();
    } catch {
    }
  },
  async notify(kind = "success") {
    try {
      await Haptics.notification({
        type: kind === "success" ? NotificationType.Success : kind === "warning" ? NotificationType.Warning : NotificationType.Error
      });
    } catch {
    }
  }
};
const PushNotifications = registerPlugin("PushNotifications", {});
let initialized = false;
async function registerPushNotifications() {
  if (initialized) return { ok: true };
  try {
    const perm = await PushNotifications.requestPermissions();
    if (perm.receive !== "granted") {
      return { ok: false, error: `permission ${perm.receive}` };
    }
    let resolveToken;
    const tokenPromise = new Promise((r) => {
      resolveToken = r;
    });
    await PushNotifications.addListener("registration", (token2) => {
      initialized = true;
      window.dispatchEvent(new CustomEvent("alma:ios:apns-token", { detail: token2.value }));
      resolveToken(token2.value);
    });
    await PushNotifications.addListener("registrationError", (err) => {
      console.error("[ios] PushNotifications registration error", err);
    });
    await PushNotifications.addListener("pushNotificationReceived", (notification) => {
      window.dispatchEvent(new CustomEvent("alma:ios:push-received", { detail: notification }));
    });
    await PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
      window.dispatchEvent(new CustomEvent("alma:ios:push-action", { detail: action }));
    });
    await PushNotifications.register();
    const token = await Promise.race([tokenPromise, new Promise((_, reject) => setTimeout(() => reject(new Error("apns token timeout")), 1e4))]);
    return { ok: true, token };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
function getSpeechCtor() {
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}
function isWebSpeechAvailable() {
  return getSpeechCtor() !== null;
}
const whisperShim = {
  async getStatus() {
    return {
      initialized: isWebSpeechAvailable(),
      currentModel: isWebSpeechAvailable() ? "ios-dictation" : null,
      downloadedModels: isWebSpeechAvailable() ? ["ios-dictation"] : []
    };
  },
  async initialize(_model, _language) {
    return { success: isWebSpeechAvailable() };
  },
  async transcribe(_audioData, _sampleRate) {
    return { text: "", error: "use-transcribe-live-on-ios" };
  },
  async requestMicrophonePermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      return { granted: true };
    } catch {
      return { granted: false };
    }
  },
  async openMicrophoneSettings() {
  },
  transcribeLive
};
function transcribeLive(opts) {
  const Ctor = getSpeechCtor();
  if (!Ctor) return null;
  const recognition = new Ctor();
  recognition.lang = opts.language ?? "en-US";
  recognition.continuous = true;
  recognition.interimResults = opts.interim ?? true;
  let finalTranscript = "";
  let resolved = false;
  let resolveStop = null;
  recognition.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const r = event.results[i];
      const text = r[0]?.transcript ?? "";
      if (r.isFinal) {
        finalTranscript += text;
        opts.onUpdate?.(text, true);
      } else {
        interim += text;
      }
    }
    if (interim) opts.onUpdate?.(interim, false);
  };
  recognition.onerror = (err) => {
    console.warn("[ios] SpeechRecognition error", err.error, err.message);
  };
  recognition.onend = () => {
    if (!resolved && resolveStop) {
      resolved = true;
      resolveStop(finalTranscript.trim());
    }
  };
  try {
    recognition.start();
  } catch (err) {
    console.warn("[ios] SpeechRecognition start failed", err);
    return null;
  }
  return {
    stop: () => {
      return new Promise((resolve) => {
        resolveStop = resolve;
        try {
          recognition.stop();
        } catch {
          resolve(finalTranscript.trim());
        }
      });
    },
    abort: () => {
      try {
        recognition.abort();
      } catch {
      }
    }
  };
}
function parsePairingLink(raw) {
  let parsed;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return null;
  }
  if (parsed.protocol !== "alma:") return null;
  if ((parsed.hostname || parsed.pathname.replace(/^\/+/, "")) !== "connect") return null;
  const target = parsed.searchParams.get("u");
  if (!target || !/^https?:\/\//.test(target)) return null;
  const e2e = parsed.searchParams.get("e2e") === "1";
  const code = parsed.searchParams.get("k") || "";
  let host = target;
  try {
    host = new URL(target).host;
  } catch {
  }
  return { target, e2e, code, host };
}
async function applyPairing(p) {
  if (p.e2e && p.code) {
    await setE2EConfig(p.target, p.code);
  } else {
    await clearE2EConfig();
    await setRemoteApiBaseURL(p.target);
  }
  await setBackendMode("remote");
  window.location.reload();
}
async function applyPairingLink(raw, opts = {}) {
  const p = parsePairingLink(raw);
  if (!p) return "invalid";
  if (opts.confirm) {
    const security = p.e2e ? "End-to-end encrypted." : "Not end-to-end encrypted.";
    if (!window.confirm(`Connect this device to Alma on ${p.host}?
${security}`)) return "cancelled";
  }
  await applyPairing(p);
  return "applied";
}
async function getPairingInfo() {
  const e2e = await ensureE2ELoaded();
  if (e2e.enabled && e2e.relayOrigin) {
    let host2 = e2e.relayOrigin;
    try {
      host2 = new URL(e2e.relayOrigin).host;
    } catch {
    }
    return { host: host2, e2e: true };
  }
  const url = await getRemoteApiBaseURL();
  if (!url) return null;
  let host = url;
  try {
    host = new URL(url).host;
  } catch {
  }
  return { host, e2e: false };
}
async function forgetPairing() {
  await clearE2EConfig();
  await setRemoteApiBaseURL(null);
  await setBackendMode("local");
  window.location.reload();
}
const noopFn$1 = () => {
};
const noopUnsub$1 = () => noopFn$1;
const noopAsync = (value) => () => Promise.resolve(value);
const windowControlsNoop = {
  minimize: noopAsync(),
  maximize: noopAsync(false),
  fullscreen: noopAsync(false),
  close: noopAsync(),
  isMaximized: noopAsync(false),
  isFullScreen: noopAsync(false),
  isFocused: noopAsync(true),
  onFocusChange: (_cb) => noopFn$1
};
let pendingSettingsTab = null;
const settingsWindowNoop = {
  open: (initialTab) => {
    pendingSettingsTab = initialTab || null;
    window.location.hash = "#/settings";
    return Promise.resolve("opened");
  },
  close: () => {
    window.location.hash = "#/";
    return Promise.resolve();
  },
  getInitialTab: () => {
    const tab = pendingSettingsTab;
    pendingSettingsTab = null;
    return Promise.resolve(tab);
  },
  onTabChange: noopUnsub$1,
  navigateToThread: (_id) => Promise.resolve("ok")
};
const promptAppRunnerNoop = {
  open: (_app) => Promise.resolve("opened"),
  close: noopAsync(),
  getPromptApp: () => Promise.resolve(null),
  navigateToThread: (_id) => Promise.resolve("ok"),
  saveWindowSize: (_id, _w, _h) => Promise.resolve(true),
  registerShortcut: (_id, _data) => Promise.resolve(false),
  unregisterShortcut: (_id) => Promise.resolve(false)
};
const quickChatWindowNoop = {
  toggle: () => Promise.resolve("noop"),
  close: noopAsync(),
  hide: () => Promise.resolve("noop"),
  expand: (_threadId, _options) => Promise.resolve("noop"),
  updateShortcut: (_v) => Promise.resolve(false),
  initializeShortcut: (_v) => Promise.resolve(false),
  onFocusInput: noopUnsub$1,
  setClickThrough: (_enabled) => Promise.resolve(false),
  getClickThrough: () => Promise.resolve(false),
  onClickThroughChanged: noopUnsub$1,
  onNeedsAccessibilityPermission: noopUnsub$1,
  onFrontAppContext: noopUnsub$1,
  onTraversedContent: noopUnsub$1,
  onAppIcon: noopUnsub$1
};
const moreMenuNoop = {
  open: (_payload) => Promise.resolve("opened"),
  close: noopAsync(),
  cancelClose: noopAsync(),
  scheduleClose: noopAsync(),
  reportSize: (_w, _h) => Promise.resolve(void 0),
  emit: (_action, _payload) => Promise.resolve(void 0),
  prewarm: noopAsync(),
  onSetAnchor: noopUnsub$1,
  onHide: noopUnsub$1,
  onAction: noopUnsub$1,
  onState: noopUnsub$1
};
const galleryWindowNoop = {
  open: (_imageId) => Promise.resolve("opened"),
  close: noopAsync(),
  navigateToThread: (_id) => Promise.resolve("ok"),
  onNavigateToImage: noopUnsub$1
};
const lightboxWindowNoop = {
  open: (_params) => Promise.resolve("opened"),
  close: noopAsync(),
  getInitialParams: () => Promise.resolve(null),
  navigateToThread: (_id) => Promise.resolve("ok"),
  onNavigate: noopUnsub$1,
  onUpdate: noopUnsub$1
};
const liveCodingWindowNoop = {
  open: () => Promise.resolve("opened"),
  close: noopAsync(),
  onSnippet: noopUnsub$1,
  onCodeReceived: noopUnsub$1,
  onShareCodeReceived: noopUnsub$1,
  sendToChat: (_code) => Promise.resolve("")
};
const notificationWindowNoop = {
  show: (_payload) => Promise.resolve("shown"),
  hide: noopAsync(),
  dismiss: (_id) => Promise.resolve(void 0),
  onAction: noopUnsub$1,
  onClick: noopUnsub$1,
  onDismiss: noopUnsub$1
};
const noopFn = () => {
};
const noopUnsub = () => noopFn;
const permissionsNoop = {
  getAll: () => Promise.resolve({}),
  request: (_key) => Promise.resolve({}),
  openSettings: (_key) => Promise.resolve(void 0),
  onStatusChanged: noopUnsub
};
const accessibilityNoop = {
  getStatus: () => Promise.resolve("unsupported"),
  triggerSystemPrompt: () => Promise.resolve("unsupported"),
  openSettings: () => Promise.resolve(void 0),
  startFlow: () => Promise.resolve("unsupported"),
  closeOverlay: () => Promise.resolve(void 0),
  onStatusChanged: noopUnsub,
  startDrag: () => void 0
};
const playwrightNoop = {
  install: () => Promise.resolve({ ok: false, reason: "unsupported-on-ios" }),
  status: () => Promise.resolve({ installed: false, browsers: [] }),
  onProgress: noopUnsub
};
const copilotNoop = {
  startAuth: () => Promise.resolve(null),
  pollAuth: () => Promise.resolve(null),
  cancelAuth: () => Promise.resolve(void 0),
  getAccount: () => Promise.resolve(null),
  signOut: () => Promise.resolve(void 0),
  onAuthStateChanged: noopUnsub
};
const claudeSubscriptionNoop = {
  buildAuthUrl: () => Promise.resolve(null),
  exchangeCode: (_code, _verifier) => Promise.resolve(null),
  getTokens: () => Promise.resolve(null),
  refresh: () => Promise.resolve(null),
  signOut: () => Promise.resolve(void 0),
  getQuota: () => Promise.resolve(null),
  onAuthStateChanged: noopUnsub
};
const mcpOAuthNoop = {
  startAuth: () => Promise.resolve(null),
  getStatus: () => Promise.resolve({ isAuthorized: false, needsReauth: false }),
  revoke: () => Promise.resolve(void 0),
  onStatusChanged: noopUnsub,
  onAuthCallback: noopUnsub
};
const webSearchNoop = {
  search: (_query) => Promise.resolve([])
};
const webFetchNoop = {
  fetch: (_url) => Promise.resolve({ ok: false, status: 0, body: "" })
};
const snapshotNoop = {
  list: () => Promise.resolve([]),
  create: () => Promise.resolve(null),
  restore: () => Promise.resolve(false),
  delete: () => Promise.resolve(false),
  onUpdate: noopUnsub
};
const pluginCommandsNoop = {
  register: () => Promise.resolve(void 0),
  unregister: () => Promise.resolve(void 0),
  execute: () => Promise.resolve(void 0),
  list: () => Promise.resolve([]),
  getAll: () => Promise.resolve([]),
  onCommand: noopUnsub
};
const pluginThemeNoop = {
  onApply: noopUnsub,
  onClear: noopUnsub
};
const pluginStatusBarNoop = {
  onUpdate: noopUnsub,
  getState: () => Promise.resolve({ items: [] }),
  executeCommand: (_pluginId, _command) => Promise.resolve(void 0)
};
const pluginInputBoxNoop = {
  onShow: noopUnsub,
  onDismiss: noopUnsub,
  respond: (_id, _value) => Promise.resolve(void 0)
};
const pluginQuickPickNoop = {
  onShow: noopUnsub,
  onDismiss: noopUnsub,
  respond: (_id, _value) => Promise.resolve(void 0)
};
const pluginConfirmDialogNoop = {
  onShow: noopUnsub,
  onDismiss: noopUnsub,
  respond: (_id, _value) => Promise.resolve(void 0)
};
const pluginNotificationNoop = {
  onShow: noopUnsub
};
const toolApprovalDialogNoop = {
  onShow: noopUnsub,
  onResolved: noopUnsub,
  respond: (_requestId, _response) => Promise.resolve(void 0)
};
const appshotsNoop = {
  start: () => Promise.resolve(void 0),
  stop: () => Promise.resolve(void 0),
  getStatus: () => Promise.resolve({ running: false }),
  getState: () => Promise.resolve({ supported: false, platform: "ios", configuredHotkey: null, isActive: false }),
  setHotkey: (_hotkey) => Promise.resolve(void 0),
  onStarting: noopUnsub,
  onFired: noopUnsub,
  onDataURL: noopUnsub,
  onFailed: noopUnsub,
  onContextUpdate: noopUnsub
};
const SHIM_TAG = "__almaIOSShimInstalled";
function installElectronShim() {
  const w = window;
  if (w[SHIM_TAG]) return;
  w[SHIM_TAG] = true;
  w.ipcRenderer ??= ipcRendererShim;
  w.apiServer ??= apiServerShim;
  w.platform ??= platformShim;
  w.systemFile ??= systemFileShim;
  w.electronClipboard ??= clipboardShim;
  w.almaApp ??= almaAppShim;
  w.windowControls ??= windowControlsNoop;
  w.settingsWindow ??= settingsWindowNoop;
  w.promptAppRunner ??= promptAppRunnerNoop;
  w.quickChatWindow ??= quickChatWindowNoop;
  w.moreMenu ??= moreMenuNoop;
  w.galleryWindow ??= galleryWindowNoop;
  w.lightboxWindow ??= lightboxWindowNoop;
  w.liveCodingWindow ??= liveCodingWindowNoop;
  w.notificationWindow ??= notificationWindowNoop;
  w.permissions ??= permissionsNoop;
  w.accessibility ??= accessibilityNoop;
  w.playwright ??= playwrightNoop;
  w.copilot ??= copilotNoop;
  w.claudeSubscription ??= claudeSubscriptionNoop;
  w.mcpOAuth ??= mcpOAuthNoop;
  w.whisper ??= whisperShim;
  w.webSearch ??= webSearchNoop;
  w.webFetch ??= webFetchNoop;
  w.snapshot ??= snapshotNoop;
  w.pluginCommands ??= pluginCommandsNoop;
  w.pluginTheme ??= pluginThemeNoop;
  w.pluginStatusBar ??= pluginStatusBarNoop;
  w.pluginInputBox ??= pluginInputBoxNoop;
  w.pluginQuickPick ??= pluginQuickPickNoop;
  w.pluginConfirmDialog ??= pluginConfirmDialogNoop;
  w.pluginNotification ??= pluginNotificationNoop;
  w.toolApprovalDialog ??= toolApprovalDialogNoop;
  w.appshots ??= appshotsNoop;
  w.almaNotifications ??= almaNotificationsShim;
  w.selectDirectory ??= () => Promise.resolve(null);
  w.getPathForFile ??= (_file) => "";
  w.almaIOSConfig ??= {
    getApiBaseURL: () => getRemoteApiBaseURL(),
    setApiBaseURL: (url) => setRemoteApiBaseURL(url),
    getBackendMode: () => getBackendMode(),
    setBackendMode: (mode2) => setBackendMode(mode2),
    isPairingLink: (link) => parsePairingLink(link) !== null,
    applyPairingLink: (link) => applyPairingLink(link),
    getPairingInfo: () => getPairingInfo(),
    forgetPairing: () => forgetPairing()
  };
  w.almaCamera ??= cameraShim;
  w.almaHaptics ??= hapticsShim;
  w.almaPush ??= { register: registerPushNotifications };
}
const key = "alma-private-handoff-pairing";
function consumeConnectedPairing(storage, hash) {
  const incoming = hash.startsWith("#connect?");
  const fragment = incoming ? hash.slice(1) : storage.getItem(key);
  const pairing = fragment?.startsWith("connect?") ? parseRemoteHandoffPairing(`alma://connect?${fragment.slice("connect?".length)}`) : null;
  if (pairing) storage.setItem(key, remoteHandoffHash(pairing).replace(/^#/, ""));
  else storage.removeItem(key);
  return pairing;
}
function installConnectedWindowBridges() {
  let previousHash = "#/";
  let initialTab = null;
  window.settingsWindow = {
    open: async (tab) => {
      if (!window.location.hash.startsWith("#/settings")) previousHash = window.location.hash;
      initialTab = tab || null;
      window.location.hash = "#/settings";
      return "connected-settings";
    },
    close: async () => {
      window.location.hash = previousHash;
    },
    navigateToThread: async (threadId) => {
      window.location.hash = `#/chat/${encodeURIComponent(threadId)}`;
      return "connected-thread";
    },
    getInitialTab: async () => initialTab,
    onTabChange: () => () => {
    }
  };
  const show = /* @__PURE__ */ new Set();
  const hide = /* @__PURE__ */ new Set();
  const actions = /* @__PURE__ */ new Set();
  const states = /* @__PURE__ */ new Set();
  let visible = false;
  let closeTimer;
  const cancel = async () => {
    clearTimeout(closeTimer);
  };
  const close = async () => {
    await cancel();
    visible = false;
    hide.forEach((listener) => listener());
    states.forEach((listener) => listener("closed"));
  };
  const subscribe = (listeners, listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };
  window.moreMenu = {
    open: async (payload) => {
      await cancel();
      if (visible) {
        await close();
        return "connected-menu";
      }
      visible = true;
      show.forEach((listener) => listener({ ...payload, showExternalThreads: !!payload.showExternalThreads }));
      states.forEach((listener) => listener("open"));
      return "connected-menu";
    },
    close,
    cancelClose: cancel,
    scheduleClose: async () => {
      await cancel();
      closeTimer = setTimeout(() => {
        void close();
      }, 250);
    },
    emit: async (action, payload) => {
      actions.forEach((listener) => listener({ action, payload }));
    },
    reportSize: async () => {
    },
    prewarm: async () => {
    },
    onSetAnchor: () => () => {
    },
    onHide: (listener) => subscribe(hide, listener),
    onShowInApp: (listener) => subscribe(show, listener),
    onHideInApp: (listener) => subscribe(hide, listener),
    onAction: (listener) => subscribe(actions, listener),
    onState: (listener) => subscribe(states, listener)
  };
}
function normalizeHostFilePath(value) {
  if (!value.startsWith("file:")) return value;
  const url = new URL(value);
  let path = decodeURIComponent(url.pathname);
  if (/^\/[A-Za-z]:\//.test(path)) path = path.slice(1);
  return url.hostname && url.hostname !== "localhost" ? `//${url.hostname}${path}` : path;
}
async function fetchHostFile(path, base) {
  const response = await window.fetch(`${base}/api/files-abs-binary?path=${encodeURIComponent(normalizeHostFilePath(path))}`);
  if (!response.ok) throw new Error(`Download failed (${response.status})`);
  return response.blob();
}
async function downloadHostFile(path, base) {
  const url = URL.createObjectURL(await fetchHostFile(path, base));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = normalizeHostFilePath(path).split(/[\\/]/).pop() || "download";
  try {
    document.body.append(anchor);
    anchor.click();
  } finally {
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 6e4);
  }
  return true;
}
async function readHostFileAsDataUrl(path, base) {
  try {
    const blob = await fetchHostFile(path, base);
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error || new Error("Unable to read host file"));
      reader.readAsDataURL(blob);
    });
    return { success: true, dataUrl };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
function createConnectedPendingBridge(client2, createSocket, decodeEvent, reportError = (error) => console.error("[HandoffPending]", error)) {
  const show = /* @__PURE__ */ new Set();
  const resolved = /* @__PURE__ */ new Set();
  const snapshots = /* @__PURE__ */ new Set();
  let pending = /* @__PURE__ */ new Map();
  let socket;
  let reconnectTimer;
  let closed = false;
  let inFlight;
  let syncEpoch = 0;
  let changesDuringSync = /* @__PURE__ */ new Map();
  const snapshot = () => Array.from(pending.values());
  const notifySnapshot = () => {
    for (const listener of snapshots) listener(snapshot());
  };
  const sync = () => {
    if (inFlight) return inFlight;
    const epoch = syncEpoch;
    const changes = /* @__PURE__ */ new Map();
    changesDuringSync = changes;
    const operation = client2.getPending().then((requests) => {
      if (closed || epoch !== syncEpoch) return snapshot();
      const next = new Map(requests.map((request) => [request.requestId, request]));
      for (const [id, request] of changes) {
        if (request) next.set(id, request);
        else next.delete(id);
      }
      pending = next;
      notifySnapshot();
      return snapshot();
    }).finally(() => {
      if (inFlight === operation) {
        inFlight = void 0;
        changesDuringSync.clear();
      }
    });
    inFlight = operation;
    return operation;
  };
  const connect = () => {
    if (closed || socket) return;
    let current;
    try {
      current = createSocket();
    } catch (error) {
      reportError(error);
      reconnectTimer = setTimeout(connect, 1e3);
      return;
    }
    socket = current;
    current.onopen = () => {
      if (!closed && socket === current) void sync().catch(reportError);
    };
    current.onmessage = (event) => {
      if (closed || socket !== current || typeof event.data !== "string") return;
      let data;
      try {
        data = decodeEvent(JSON.parse(event.data));
      } catch {
        return;
      }
      if (data?.type === "show" && typeof data.request?.requestId === "string") {
        pending.set(data.request.requestId, data.request);
        if (inFlight) changesDuringSync.set(data.request.requestId, data.request);
        for (const listener of show) listener(data.request);
      } else if (data?.type === "resolved" && typeof data.decision?.requestId === "string") {
        pending.delete(data.decision.requestId);
        if (inFlight) changesDuringSync.set(data.decision.requestId, null);
        for (const listener of resolved) listener(data.decision);
      }
    };
    current.onerror = reportError;
    current.onclose = () => {
      if (socket !== current) return;
      socket = void 0;
      syncEpoch++;
      inFlight = void 0;
      if (!closed) reconnectTimer = setTimeout(connect, 1e3);
    };
  };
  const subscribe = (listeners, listener) => {
    listeners.add(listener);
    connect();
    return () => {
      listeners.delete(listener);
    };
  };
  return {
    bridge: {
      onShow: (listener) => subscribe(show, listener),
      onResolved: (listener) => subscribe(resolved, listener),
      onPending: (listener) => subscribe(snapshots, listener),
      getPending: () => {
        connect();
        return sync();
      },
      respond: client2.respond
    },
    close: () => {
      closed = true;
      syncEpoch++;
      clearTimeout(reconnectTimer);
      socket?.close();
      socket = void 0;
      show.clear();
      resolved.clear();
      snapshots.clear();
    }
  };
}
function createConnectedApprovalBridge(client2, createSocket, reportError) {
  return createConnectedPendingBridge(
    {
      getPending: () => client2.getHandoffToolApprovals(),
      respond: (id, response) => client2.respondToHandoffToolApproval(id, typeof response === "boolean" ? { action: response ? "allow_once" : "deny" } : response)
    },
    createSocket,
    (data) => {
      if (!data || typeof data !== "object") return null;
      const event = data;
      return event.type === "show" || event.type === "resolved" && typeof event.decision?.approved === "boolean" ? event : null;
    },
    reportError
  );
}
function installConnectedApprovalBridge(client2, baseURL) {
  const { bridge, close } = createConnectedApprovalBridge(client2, () => new WebSocket(`${baseURL.replace(/^http/, "ws")}${HANDOFF_APPROVAL_WS_PATH}`));
  window.toolApprovalDialog = bridge;
  window.addEventListener("pagehide", close, { once: true });
}
function createConnectedQuestionBridge(client2, createSocket) {
  return createConnectedPendingBridge(
    { getPending: () => client2.getHandoffUserQuestions(), respond: (id, answer) => client2.respondToHandoffUserQuestion(id, answer) },
    createSocket,
    (data) => {
      if (!data || typeof data !== "object") return null;
      const event = data;
      if (event.type === "show" && Array.isArray(event.request?.questions)) return event;
      if (event.type === "resolved" && ["accept", "decline", "cancel"].includes(event.decision?.action)) return event;
      return null;
    }
  );
}
function installConnectedQuestionBridge(client2, baseURL) {
  const { bridge, close } = createConnectedQuestionBridge(client2, () => new WebSocket(`${baseURL.replace(/^http/, "ws")}${HANDOFF_QUESTION_WS_PATH}`));
  window.userQuestionDialog = bridge;
  window.addEventListener("pagehide", close, { once: true });
}
async function boot() {
  const initialHash = window.location.hash;
  const pairing = consumeConnectedPairing(window.sessionStorage, initialHash);
  window.history.replaceState(null, "", `${window.location.pathname}${initialHash.startsWith("#connect?") ? "#/" : initialHash || "#/"}`);
  if (!pairing) throw new Error("Invalid encrypted pairing link. Reconnect from Remote Access settings.");
  window.apiServer = { getInfo: async () => ({ port: null, baseURL: E2E_SENTINEL_BASE }) };
  window.platform = { get: async () => "connected" };
  installElectronShim();
  installConnectedWindowBridges();
  setSessionE2EConfig(pairing.relayOrigin, pairing.code);
  installE2EBridge();
  installConnectedApprovalBridge(apiClient, E2E_SENTINEL_BASE);
  installConnectedQuestionBridge(apiClient, E2E_SENTINEL_BASE);
  installRendererFetchTimeoutGuard();
  window.systemFile.openInPreview = (path) => downloadHostFile(path, E2E_SENTINEL_BASE);
  window.systemFile.readAsDataUrl = (path) => readHostFileAsDataUrl(path, E2E_SENTINEL_BASE);
  const [{ createRoot }, { App: App2 }, { setupDefaultGenerativeUIComponents }] = await Promise.all([
    __vitePreload(() => import("./client-DCFZpNwr.js").then((n) => n.c), true ? __vite__mapDeps([11,12,2,3]) : void 0, import.meta.url),
    __vitePreload(() => import("./App-CJD1Pyfa.js").then((n) => n.c), true ? __vite__mapDeps([13,2,3,14,15,16,12,1,17,18,19,20,21,22,23,4,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]) : void 0, import.meta.url),
    __vitePreload(() => import("./index-r7jQG3Y1.js"), true ? __vite__mapDeps([43,36,2,3,34,24,15]) : void 0, import.meta.url)
  ]);
  setupDefaultGenerativeUIComponents();
  createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App2, {}));
}
// alma-android: 手机迷你 boot —— 只装桥，不做 connected 桌面渲染/hash 配对。
installElectronShim();
installE2EBridge();
installConnectedApprovalBridge(apiClient, E2E_SENTINEL_BASE);
installConnectedQuestionBridge(apiClient, E2E_SENTINEL_BASE);
installRendererFetchTimeoutGuard();
window.systemFile.openInPreview = (path) => downloadHostFile(path, E2E_SENTINEL_BASE);
window.systemFile.readAsDataUrl = (path) => readHostFileAsDataUrl(path, E2E_SENTINEL_BASE);

export {
  ImpactStyle as I,
  NotificationType as N,
  WebPlugin as W
};
