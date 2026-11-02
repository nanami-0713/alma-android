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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "9709384e-2987-4404-afc5-251c38ecfafc", e._sentryDebugIdIdentifier = "sentry-dbid-9709384e-2987-4404-afc5-251c38ecfafc");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports } from "./index-B0zE39VE.js";
const isString = (obj) => typeof obj === "string";
const defer = () => {
  let res;
  let rej;
  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
};
const makeString = (object) => {
  if (object == null) return "";
  return "" + object;
};
const copy = (a, s, t) => {
  a.forEach((m) => {
    if (s[m]) t[m] = s[m];
  });
};
const lastOfPathSeparatorRegExp = /###/g;
const cleanKey = (key) => key && key.indexOf("###") > -1 ? key.replace(lastOfPathSeparatorRegExp, ".") : key;
const canNotTraverseDeeper = (object) => !object || isString(object);
const getLastOfPath = (object, path2, Empty) => {
  const stack = !isString(path2) ? path2 : path2.split(".");
  let stackIndex = 0;
  while (stackIndex < stack.length - 1) {
    if (canNotTraverseDeeper(object)) return {};
    const key = cleanKey(stack[stackIndex]);
    if (!object[key] && Empty) object[key] = new Empty();
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
    ++stackIndex;
  }
  if (canNotTraverseDeeper(object)) return {};
  return {
    obj: object,
    k: cleanKey(stack[stackIndex])
  };
};
const setPath = (object, path2, newValue) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path2, Object);
  if (obj !== void 0 || path2.length === 1) {
    obj[k] = newValue;
    return;
  }
  let e = path2[path2.length - 1];
  let p = path2.slice(0, path2.length - 1);
  let last = getLastOfPath(object, p, Object);
  while (last.obj === void 0 && p.length) {
    e = `${p[p.length - 1]}.${e}`;
    p = p.slice(0, p.length - 1);
    last = getLastOfPath(object, p, Object);
    if (last?.obj && typeof last.obj[`${last.k}.${e}`] !== "undefined") {
      last.obj = void 0;
    }
  }
  last.obj[`${last.k}.${e}`] = newValue;
};
const pushPath = (object, path2, newValue, concat) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path2, Object);
  obj[k] = obj[k] || [];
  obj[k].push(newValue);
};
const getPath = (object, path2) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path2);
  if (!obj) return void 0;
  if (!Object.prototype.hasOwnProperty.call(obj, k)) return void 0;
  return obj[k];
};
const getPathWithDefaults = (data, defaultData, key) => {
  const value = getPath(data, key);
  if (value !== void 0) {
    return value;
  }
  return getPath(defaultData, key);
};
const deepExtend = (target, source, overwrite) => {
  for (const prop in source) {
    if (prop !== "__proto__" && prop !== "constructor") {
      if (prop in target) {
        if (isString(target[prop]) || target[prop] instanceof String || isString(source[prop]) || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
};
const regexEscape = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var _entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
const escape = (data) => {
  if (isString(data)) {
    return data.replace(/[&<>"'\/]/g, (s) => _entityMap[s]);
  }
  return data;
};
class RegExpCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.regExpMap = /* @__PURE__ */ new Map();
    this.regExpQueue = [];
  }
  getRegExp(pattern) {
    const regExpFromCache = this.regExpMap.get(pattern);
    if (regExpFromCache !== void 0) {
      return regExpFromCache;
    }
    const regExpNew = new RegExp(pattern);
    if (this.regExpQueue.length === this.capacity) {
      this.regExpMap.delete(this.regExpQueue.shift());
    }
    this.regExpMap.set(pattern, regExpNew);
    this.regExpQueue.push(pattern);
    return regExpNew;
  }
}
const chars = [" ", ",", "?", "!", ";"];
const looksLikeObjectPathRegExpCache = new RegExpCache(20);
const looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
  nsSeparator = nsSeparator || "";
  keySeparator = keySeparator || "";
  const possibleChars = chars.filter((c) => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
  if (possibleChars.length === 0) return true;
  const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map((c) => c === "?" ? "\\?" : c).join("|")})`);
  let matched = !r.test(key);
  if (!matched) {
    const ki = key.indexOf(keySeparator);
    if (ki > 0 && !r.test(key.substring(0, ki))) {
      matched = true;
    }
  }
  return matched;
};
const deepFind = (obj, path2, keySeparator = ".") => {
  if (!obj) return void 0;
  if (obj[path2]) {
    if (!Object.prototype.hasOwnProperty.call(obj, path2)) return void 0;
    return obj[path2];
  }
  const tokens = path2.split(keySeparator);
  let current = obj;
  for (let i = 0; i < tokens.length; ) {
    if (!current || typeof current !== "object") {
      return void 0;
    }
    let next;
    let nextPath = "";
    for (let j = i; j < tokens.length; ++j) {
      if (j !== i) {
        nextPath += keySeparator;
      }
      nextPath += tokens[j];
      next = current[nextPath];
      if (next !== void 0) {
        if (["string", "number", "boolean"].indexOf(typeof next) > -1 && j < tokens.length - 1) {
          continue;
        }
        i += j - i + 1;
        break;
      }
    }
    current = next;
  }
  return current;
};
const getCleanedCode = (code) => code?.replace("_", "-");
const consoleLogger = {
  type: "logger",
  log(args) {
    this.output("log", args);
  },
  warn(args) {
    this.output("warn", args);
  },
  error(args) {
    this.output("error", args);
  },
  output(type, args) {
    console?.[type]?.apply?.(console, args);
  }
};
class Logger {
  constructor(concreteLogger, options2 = {}) {
    this.init(concreteLogger, options2);
  }
  init(concreteLogger, options2 = {}) {
    this.prefix = options2.prefix || "i18next:";
    this.logger = concreteLogger || consoleLogger;
    this.options = options2;
    this.debug = options2.debug;
  }
  log(...args) {
    return this.forward(args, "log", "", true);
  }
  warn(...args) {
    return this.forward(args, "warn", "", true);
  }
  error(...args) {
    return this.forward(args, "error", "");
  }
  deprecate(...args) {
    return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
  }
  forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (isString(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
    return this.logger[lvl](args);
  }
  create(moduleName) {
    return new Logger(this.logger, {
      ...{
        prefix: `${this.prefix}:${moduleName}:`
      },
      ...this.options
    });
  }
  clone(options2) {
    options2 = options2 || this.options;
    options2.prefix = options2.prefix || this.prefix;
    return new Logger(this.logger, options2);
  }
}
var baseLogger = new Logger();
class EventEmitter {
  constructor() {
    this.observers = {};
  }
  on(events, listener) {
    events.split(" ").forEach((event) => {
      if (!this.observers[event]) this.observers[event] = /* @__PURE__ */ new Map();
      const numListeners = this.observers[event].get(listener) || 0;
      this.observers[event].set(listener, numListeners + 1);
    });
    return this;
  }
  off(event, listener) {
    if (!this.observers[event]) return;
    if (!listener) {
      delete this.observers[event];
      return;
    }
    this.observers[event].delete(listener);
  }
  emit(event, ...args) {
    if (this.observers[event]) {
      const cloned = Array.from(this.observers[event].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer(...args);
        }
      });
    }
    if (this.observers["*"]) {
      const cloned = Array.from(this.observers["*"].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer.apply(observer, [event, ...args]);
        }
      });
    }
  }
}
class ResourceStore extends EventEmitter {
  constructor(data, options2 = {
    ns: ["translation"],
    defaultNS: "translation"
  }) {
    super();
    this.data = data || {};
    this.options = options2;
    if (this.options.keySeparator === void 0) {
      this.options.keySeparator = ".";
    }
    if (this.options.ignoreJSONStructure === void 0) {
      this.options.ignoreJSONStructure = true;
    }
  }
  addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  }
  removeNamespaces(ns) {
    const index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  }
  getResource(lng, ns, key, options2 = {}) {
    const keySeparator = options2.keySeparator !== void 0 ? options2.keySeparator : this.options.keySeparator;
    const ignoreJSONStructure = options2.ignoreJSONStructure !== void 0 ? options2.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let path2;
    if (lng.indexOf(".") > -1) {
      path2 = lng.split(".");
    } else {
      path2 = [lng, ns];
      if (key) {
        if (Array.isArray(key)) {
          path2.push(...key);
        } else if (isString(key) && keySeparator) {
          path2.push(...key.split(keySeparator));
        } else {
          path2.push(key);
        }
      }
    }
    const result = getPath(this.data, path2);
    if (!result && !ns && !key && lng.indexOf(".") > -1) {
      lng = path2[0];
      ns = path2[1];
      key = path2.slice(2).join(".");
    }
    if (result || !ignoreJSONStructure || !isString(key)) return result;
    return deepFind(this.data?.[lng]?.[ns], key, keySeparator);
  }
  addResource(lng, ns, key, value, options2 = {
    silent: false
  }) {
    const keySeparator = options2.keySeparator !== void 0 ? options2.keySeparator : this.options.keySeparator;
    let path2 = [lng, ns];
    if (key) path2 = path2.concat(keySeparator ? key.split(keySeparator) : key);
    if (lng.indexOf(".") > -1) {
      path2 = lng.split(".");
      value = ns;
      ns = path2[1];
    }
    this.addNamespaces(ns);
    setPath(this.data, path2, value);
    if (!options2.silent) this.emit("added", lng, ns, key, value);
  }
  addResources(lng, ns, resources2, options2 = {
    silent: false
  }) {
    for (const m in resources2) {
      if (isString(resources2[m]) || Array.isArray(resources2[m])) this.addResource(lng, ns, m, resources2[m], {
        silent: true
      });
    }
    if (!options2.silent) this.emit("added", lng, ns, resources2);
  }
  addResourceBundle(lng, ns, resources2, deep, overwrite, options2 = {
    silent: false,
    skipCopy: false
  }) {
    let path2 = [lng, ns];
    if (lng.indexOf(".") > -1) {
      path2 = lng.split(".");
      deep = resources2;
      resources2 = ns;
      ns = path2[1];
    }
    this.addNamespaces(ns);
    let pack = getPath(this.data, path2) || {};
    if (!options2.skipCopy) resources2 = JSON.parse(JSON.stringify(resources2));
    if (deep) {
      deepExtend(pack, resources2, overwrite);
    } else {
      pack = {
        ...pack,
        ...resources2
      };
    }
    setPath(this.data, path2, pack);
    if (!options2.silent) this.emit("added", lng, ns, resources2);
  }
  removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);
    this.emit("removed", lng, ns);
  }
  hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== void 0;
  }
  getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;
    return this.getResource(lng, ns);
  }
  getDataByLanguage(lng) {
    return this.data[lng];
  }
  hasLanguageSomeTranslations(lng) {
    const data = this.getDataByLanguage(lng);
    const n = data && Object.keys(data) || [];
    return !!n.find((v) => data[v] && Object.keys(data[v]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var postProcessor = {
  processors: {},
  addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle(processors, value, key, options2, translator) {
    processors.forEach((processor) => {
      value = this.processors[processor]?.process(value, key, options2, translator) ?? value;
    });
    return value;
  }
};
const checkedLoadedFor = {};
const shouldHandleAsObject = (res) => !isString(res) && typeof res !== "boolean" && typeof res !== "number";
class Translator extends EventEmitter {
  constructor(services, options2 = {}) {
    super();
    copy(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], services, this);
    this.options = options2;
    if (this.options.keySeparator === void 0) {
      this.options.keySeparator = ".";
    }
    this.logger = baseLogger.create("translator");
  }
  changeLanguage(lng) {
    if (lng) this.language = lng;
  }
  exists(key, o = {
    interpolation: {}
  }) {
    const opt = {
      ...o
    };
    if (key == null) return false;
    const resolved = this.resolve(key, opt);
    return resolved?.res !== void 0;
  }
  extractFromKey(key, opt) {
    let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === void 0) nsSeparator = ":";
    const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
    let namespaces = opt.ns || this.options.defaultNS || [];
    const wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
    const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !opt.keySeparator && !this.options.userDefinedNsSeparator && !opt.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
    if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
      const m = key.match(this.interpolator.nestingRegexp);
      if (m && m.length > 0) {
        return {
          key,
          namespaces: isString(namespaces) ? [namespaces] : namespaces
        };
      }
      const parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    return {
      key,
      namespaces: isString(namespaces) ? [namespaces] : namespaces
    };
  }
  translate(keys, o, lastKey) {
    let opt = typeof o === "object" ? {
      ...o
    } : o;
    if (typeof opt !== "object" && this.options.overloadTranslationOptionHandler) {
      opt = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (typeof options === "object") opt = {
      ...opt
    };
    if (!opt) opt = {};
    if (keys == null) return "";
    if (!Array.isArray(keys)) keys = [String(keys)];
    const returnDetails = opt.returnDetails !== void 0 ? opt.returnDetails : this.options.returnDetails;
    const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
    const {
      key,
      namespaces
    } = this.extractFromKey(keys[keys.length - 1], opt);
    const namespace = namespaces[namespaces.length - 1];
    let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === void 0) nsSeparator = ":";
    const lng = opt.lng || this.language;
    const appendNamespaceToCIMode = opt.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng?.toLowerCase() === "cimode") {
      if (appendNamespaceToCIMode) {
        if (returnDetails) {
          return {
            res: `${namespace}${nsSeparator}${key}`,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace,
            usedParams: this.getUsedParamsDetails(opt)
          };
        }
        return `${namespace}${nsSeparator}${key}`;
      }
      if (returnDetails) {
        return {
          res: key,
          usedKey: key,
          exactUsedKey: key,
          usedLng: lng,
          usedNS: namespace,
          usedParams: this.getUsedParamsDetails(opt)
        };
      }
      return key;
    }
    const resolved = this.resolve(keys, opt);
    let res = resolved?.res;
    const resUsedKey = resolved?.usedKey || key;
    const resExactUsedKey = resolved?.exactUsedKey || key;
    const noObject = ["[object Number]", "[object Function]", "[object RegExp]"];
    const joinArrays = opt.joinArrays !== void 0 ? opt.joinArrays : this.options.joinArrays;
    const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
    const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
    const hasDefaultValue = Translator.hasDefaultValue(opt);
    const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, opt) : "";
    const defaultValueSuffixOrdinalFallback = opt.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, {
      ordinal: false
    }) : "";
    const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
    const defaultValue = needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] || opt[`defaultValue${defaultValueSuffix}`] || opt[`defaultValue${defaultValueSuffixOrdinalFallback}`] || opt.defaultValue;
    let resForObjHndl = res;
    if (handleAsObjectInI18nFormat && !res && hasDefaultValue) {
      resForObjHndl = defaultValue;
    }
    const handleAsObject = shouldHandleAsObject(resForObjHndl);
    const resType = Object.prototype.toString.apply(resForObjHndl);
    if (handleAsObjectInI18nFormat && resForObjHndl && handleAsObject && noObject.indexOf(resType) < 0 && !(isString(joinArrays) && Array.isArray(resForObjHndl))) {
      if (!opt.returnObjects && !this.options.returnObjects) {
        if (!this.options.returnedObjectHandler) {
          this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        }
        const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, resForObjHndl, {
          ...opt,
          ns: namespaces
        }) : `key '${key} (${this.language})' returned an object instead of string.`;
        if (returnDetails) {
          resolved.res = r;
          resolved.usedParams = this.getUsedParamsDetails(opt);
          return resolved;
        }
        return r;
      }
      if (keySeparator) {
        const resTypeIsArray = Array.isArray(resForObjHndl);
        const copy2 = resTypeIsArray ? [] : {};
        const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
        for (const m in resForObjHndl) {
          if (Object.prototype.hasOwnProperty.call(resForObjHndl, m)) {
            const deepKey = `${newKeyToUse}${keySeparator}${m}`;
            if (hasDefaultValue && !res) {
              copy2[m] = this.translate(deepKey, {
                ...opt,
                defaultValue: shouldHandleAsObject(defaultValue) ? defaultValue[m] : void 0,
                ...{
                  joinArrays: false,
                  ns: namespaces
                }
              });
            } else {
              copy2[m] = this.translate(deepKey, {
                ...opt,
                ...{
                  joinArrays: false,
                  ns: namespaces
                }
              });
            }
            if (copy2[m] === deepKey) copy2[m] = resForObjHndl[m];
          }
        }
        res = copy2;
      }
    } else if (handleAsObjectInI18nFormat && isString(joinArrays) && Array.isArray(res)) {
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, keys, opt, lastKey);
    } else {
      let usedDefault = false;
      let usedKey = false;
      if (!this.isValidLookup(res) && hasDefaultValue) {
        usedDefault = true;
        res = defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }
      const missingKeyNoValueFallbackToKey = opt.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
      const resForMissing = missingKeyNoValueFallbackToKey && usedKey ? void 0 : res;
      const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, key, updateMissing ? defaultValue : res);
        if (keySeparator) {
          const fk = this.resolve(key, {
            ...opt,
            keySeparator: false
          });
          if (fk && fk.res) this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let lngs = [];
        const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, opt.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) {
          for (let i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === "all") {
          lngs = this.languageUtils.toResolveHierarchy(opt.lng || this.language);
        } else {
          lngs.push(opt.lng || this.language);
        }
        const send = (l, k, specificDefaultValue) => {
          const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
          if (this.options.missingKeyHandler) {
            this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, opt);
          } else if (this.backendConnector?.saveMissing) {
            this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, opt);
          }
          this.emit("missingKey", l, namespace, k, res);
        };
        if (this.options.saveMissing) {
          if (this.options.saveMissingPlurals && needsPluralHandling) {
            lngs.forEach((language) => {
              const suffixes = this.pluralResolver.getSuffixes(language, opt);
              if (needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] && suffixes.indexOf(`${this.options.pluralSeparator}zero`) < 0) {
                suffixes.push(`${this.options.pluralSeparator}zero`);
              }
              suffixes.forEach((suffix) => {
                send([language], key + suffix, opt[`defaultValue${suffix}`] || defaultValue);
              });
            });
          } else {
            send(lngs, key, defaultValue);
          }
        }
      }
      res = this.extendTranslation(res, keys, opt, resolved, lastKey);
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) {
        res = `${namespace}${nsSeparator}${key}`;
      }
      if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
        res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}${nsSeparator}${key}` : key, usedDefault ? res : void 0, opt);
      }
    }
    if (returnDetails) {
      resolved.res = res;
      resolved.usedParams = this.getUsedParamsDetails(opt);
      return resolved;
    }
    return res;
  }
  extendTranslation(res, key, opt, resolved, lastKey) {
    if (this.i18nFormat?.parse) {
      res = this.i18nFormat.parse(res, {
        ...this.options.interpolation.defaultVariables,
        ...opt
      }, opt.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, {
        resolved
      });
    } else if (!opt.skipInterpolation) {
      if (opt.interpolation) this.interpolator.init({
        ...opt,
        ...{
          interpolation: {
            ...this.options.interpolation,
            ...opt.interpolation
          }
        }
      });
      const skipOnVariables = isString(res) && (opt?.interpolation?.skipOnVariables !== void 0 ? opt.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let nestBef;
      if (skipOnVariables) {
        const nb = res.match(this.interpolator.nestingRegexp);
        nestBef = nb && nb.length;
      }
      let data = opt.replace && !isString(opt.replace) ? opt.replace : opt;
      if (this.options.interpolation.defaultVariables) data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
      res = this.interpolator.interpolate(res, data, opt.lng || this.language || resolved.usedLng, opt);
      if (skipOnVariables) {
        const na = res.match(this.interpolator.nestingRegexp);
        const nestAft = na && na.length;
        if (nestBef < nestAft) opt.nest = false;
      }
      if (!opt.lng && resolved && resolved.res) opt.lng = this.language || resolved.usedLng;
      if (opt.nest !== false) res = this.interpolator.nest(res, (...args) => {
        if (lastKey?.[0] === args[0] && !opt.context) {
          this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
          return null;
        }
        return this.translate(...args, key);
      }, opt);
      if (opt.interpolation) this.interpolator.reset();
    }
    const postProcess = opt.postProcess || this.options.postProcess;
    const postProcessorNames = isString(postProcess) ? [postProcess] : postProcess;
    if (res != null && postProcessorNames?.length && opt.applyPostProcessor !== false) {
      res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
        i18nResolved: {
          ...resolved,
          usedParams: this.getUsedParamsDetails(opt)
        },
        ...opt
      } : opt, this);
    }
    return res;
  }
  resolve(keys, opt = {}) {
    let found;
    let usedKey;
    let exactUsedKey;
    let usedLng;
    let usedNS;
    if (isString(keys)) keys = [keys];
    keys.forEach((k) => {
      if (this.isValidLookup(found)) return;
      const extracted = this.extractFromKey(k, opt);
      const key = extracted.key;
      usedKey = key;
      let namespaces = extracted.namespaces;
      if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
      const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
      const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
      const needsContextHandling = opt.context !== void 0 && (isString(opt.context) || typeof opt.context === "number") && opt.context !== "";
      const codes = opt.lngs ? opt.lngs : this.languageUtils.toResolveHierarchy(opt.lng || this.language, opt.fallbackLng);
      namespaces.forEach((ns) => {
        if (this.isValidLookup(found)) return;
        usedNS = ns;
        if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
          checkedLoadedFor[`${codes[0]}-${ns}`] = true;
          this.logger.warn(`key "${usedKey}" for languages "${codes.join(", ")}" won't get resolved as namespace "${usedNS}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
        }
        codes.forEach((code) => {
          if (this.isValidLookup(found)) return;
          usedLng = code;
          const finalKeys = [key];
          if (this.i18nFormat?.addLookupKeys) {
            this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, opt);
          } else {
            let pluralSuffix;
            if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, opt.count, opt);
            const zeroSuffix = `${this.options.pluralSeparator}zero`;
            const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (needsPluralHandling) {
              if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
              }
              finalKeys.push(key + pluralSuffix);
              if (needsZeroSuffixLookup) {
                finalKeys.push(key + zeroSuffix);
              }
            }
            if (needsContextHandling) {
              const contextKey = `${key}${this.options.contextSeparator || "_"}${opt.context}`;
              finalKeys.push(contextKey);
              if (needsPluralHandling) {
                if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                finalKeys.push(contextKey + pluralSuffix);
                if (needsZeroSuffixLookup) {
                  finalKeys.push(contextKey + zeroSuffix);
                }
              }
            }
          }
          let possibleKey;
          while (possibleKey = finalKeys.pop()) {
            if (!this.isValidLookup(found)) {
              exactUsedKey = possibleKey;
              found = this.getResource(code, ns, possibleKey, opt);
            }
          }
        });
      });
    });
    return {
      res: found,
      usedKey,
      exactUsedKey,
      usedLng,
      usedNS
    };
  }
  isValidLookup(res) {
    return res !== void 0 && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
  }
  getResource(code, ns, key, options2 = {}) {
    if (this.i18nFormat?.getResource) return this.i18nFormat.getResource(code, ns, key, options2);
    return this.resourceStore.getResource(code, ns, key, options2);
  }
  getUsedParamsDetails(options2 = {}) {
    const optionsKeys = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"];
    const useOptionsReplaceForData = options2.replace && !isString(options2.replace);
    let data = useOptionsReplaceForData ? options2.replace : options2;
    if (useOptionsReplaceForData && typeof options2.count !== "undefined") {
      data.count = options2.count;
    }
    if (this.options.interpolation.defaultVariables) {
      data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
    }
    if (!useOptionsReplaceForData) {
      data = {
        ...data
      };
      for (const key of optionsKeys) {
        delete data[key];
      }
    }
    return data;
  }
  static hasDefaultValue(options2) {
    const prefix = "defaultValue";
    for (const option in options2) {
      if (Object.prototype.hasOwnProperty.call(options2, option) && prefix === option.substring(0, prefix.length) && void 0 !== options2[option]) {
        return true;
      }
    }
    return false;
  }
}
class LanguageUtil {
  constructor(options2) {
    this.options = options2;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create("languageUtils");
  }
  getScriptPartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf("-") < 0) return null;
    const p = code.split("-");
    if (p.length === 2) return null;
    p.pop();
    if (p[p.length - 1].toLowerCase() === "x") return null;
    return this.formatLanguageCode(p.join("-"));
  }
  getLanguagePartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf("-") < 0) return code;
    const p = code.split("-");
    return this.formatLanguageCode(p[0]);
  }
  formatLanguageCode(code) {
    if (isString(code) && code.indexOf("-") > -1) {
      let formattedCode;
      try {
        formattedCode = Intl.getCanonicalLocales(code)[0];
      } catch (e) {
      }
      if (formattedCode && this.options.lowerCaseLng) {
        formattedCode = formattedCode.toLowerCase();
      }
      if (formattedCode) return formattedCode;
      if (this.options.lowerCaseLng) {
        return code.toLowerCase();
      }
      return code;
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  }
  isSupportedCode(code) {
    if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
  }
  getBestMatchFromCodes(codes) {
    if (!codes) return null;
    let found;
    codes.forEach((code) => {
      if (found) return;
      const cleanedLng = this.formatLanguageCode(code);
      if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
    });
    if (!found && this.options.supportedLngs) {
      codes.forEach((code) => {
        if (found) return;
        const lngScOnly = this.getScriptPartFromCode(code);
        if (this.isSupportedCode(lngScOnly)) return found = lngScOnly;
        const lngOnly = this.getLanguagePartFromCode(code);
        if (this.isSupportedCode(lngOnly)) return found = lngOnly;
        found = this.options.supportedLngs.find((supportedLng) => {
          if (supportedLng === lngOnly) return supportedLng;
          if (supportedLng.indexOf("-") < 0 && lngOnly.indexOf("-") < 0) return;
          if (supportedLng.indexOf("-") > 0 && lngOnly.indexOf("-") < 0 && supportedLng.substring(0, supportedLng.indexOf("-")) === lngOnly) return supportedLng;
          if (supportedLng.indexOf(lngOnly) === 0 && lngOnly.length > 1) return supportedLng;
        });
      });
    }
    if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
    return found;
  }
  getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === "function") fallbacks = fallbacks(code);
    if (isString(fallbacks)) fallbacks = [fallbacks];
    if (Array.isArray(fallbacks)) return fallbacks;
    if (!code) return fallbacks.default || [];
    let found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
    if (!found) found = fallbacks.default;
    return found || [];
  }
  toResolveHierarchy(code, fallbackCode) {
    const fallbackCodes = this.getFallbackCodes((fallbackCode === false ? [] : fallbackCode) || this.options.fallbackLng || [], code);
    const codes = [];
    const addCode = (c) => {
      if (!c) return;
      if (this.isSupportedCode(c)) {
        codes.push(c);
      } else {
        this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
      }
    };
    if (isString(code) && (code.indexOf("-") > -1 || code.indexOf("_") > -1)) {
      if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code));
      if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code));
    } else if (isString(code)) {
      addCode(this.formatLanguageCode(code));
    }
    fallbackCodes.forEach((fc) => {
      if (codes.indexOf(fc) < 0) addCode(this.formatLanguageCode(fc));
    });
    return codes;
  }
}
const suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
const dummyRule = {
  select: (count) => count === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class PluralResolver {
  constructor(languageUtils, options2 = {}) {
    this.languageUtils = languageUtils;
    this.options = options2;
    this.logger = baseLogger.create("pluralResolver");
    this.pluralRulesCache = {};
  }
  addRule(lng, obj) {
    this.rules[lng] = obj;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(code, options2 = {}) {
    const cleanedCode = getCleanedCode(code === "dev" ? "en" : code);
    const type = options2.ordinal ? "ordinal" : "cardinal";
    const cacheKey = JSON.stringify({
      cleanedCode,
      type
    });
    if (cacheKey in this.pluralRulesCache) {
      return this.pluralRulesCache[cacheKey];
    }
    let rule;
    try {
      rule = new Intl.PluralRules(cleanedCode, {
        type
      });
    } catch (err) {
      if (!Intl) {
        this.logger.error("No Intl support, please use an Intl polyfill!");
        return dummyRule;
      }
      if (!code.match(/-|_/)) return dummyRule;
      const lngPart = this.languageUtils.getLanguagePartFromCode(code);
      rule = this.getRule(lngPart, options2);
    }
    this.pluralRulesCache[cacheKey] = rule;
    return rule;
  }
  needsPlural(code, options2 = {}) {
    let rule = this.getRule(code, options2);
    if (!rule) rule = this.getRule("dev", options2);
    return rule?.resolvedOptions().pluralCategories.length > 1;
  }
  getPluralFormsOfKey(code, key, options2 = {}) {
    return this.getSuffixes(code, options2).map((suffix) => `${key}${suffix}`);
  }
  getSuffixes(code, options2 = {}) {
    let rule = this.getRule(code, options2);
    if (!rule) rule = this.getRule("dev", options2);
    if (!rule) return [];
    return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map((pluralCategory) => `${this.options.prepend}${options2.ordinal ? `ordinal${this.options.prepend}` : ""}${pluralCategory}`);
  }
  getSuffix(code, count, options2 = {}) {
    const rule = this.getRule(code, options2);
    if (rule) {
      return `${this.options.prepend}${options2.ordinal ? `ordinal${this.options.prepend}` : ""}${rule.select(count)}`;
    }
    this.logger.warn(`no plural rule found for: ${code}`);
    return this.getSuffix("dev", count, options2);
  }
}
const deepFindWithDefaults = (data, defaultData, key, keySeparator = ".", ignoreJSONStructure = true) => {
  let path2 = getPathWithDefaults(data, defaultData, key);
  if (!path2 && ignoreJSONStructure && isString(key)) {
    path2 = deepFind(data, key, keySeparator);
    if (path2 === void 0) path2 = deepFind(defaultData, key, keySeparator);
  }
  return path2;
};
const regexSafe = (val) => val.replace(/\$/g, "$$$$");
class Interpolator {
  constructor(options2 = {}) {
    this.logger = baseLogger.create("interpolator");
    this.options = options2;
    this.format = options2?.interpolation?.format || ((value) => value);
    this.init(options2);
  }
  init(options2 = {}) {
    if (!options2.interpolation) options2.interpolation = {
      escapeValue: true
    };
    const {
      escape: escape$1,
      escapeValue,
      useRawValueToEscape,
      prefix,
      prefixEscaped,
      suffix,
      suffixEscaped,
      formatSeparator,
      unescapeSuffix,
      unescapePrefix,
      nestingPrefix,
      nestingPrefixEscaped,
      nestingSuffix,
      nestingSuffixEscaped,
      nestingOptionsSeparator,
      maxReplaces,
      alwaysFormat
    } = options2.interpolation;
    this.escape = escape$1 !== void 0 ? escape$1 : escape;
    this.escapeValue = escapeValue !== void 0 ? escapeValue : true;
    this.useRawValueToEscape = useRawValueToEscape !== void 0 ? useRawValueToEscape : false;
    this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || "{{";
    this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || "}}";
    this.formatSeparator = formatSeparator || ",";
    this.unescapePrefix = unescapeSuffix ? "" : unescapePrefix || "-";
    this.unescapeSuffix = this.unescapePrefix ? "" : unescapeSuffix || "";
    this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape("$t(");
    this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(")");
    this.nestingOptionsSeparator = nestingOptionsSeparator || ",";
    this.maxReplaces = maxReplaces || 1e3;
    this.alwaysFormat = alwaysFormat !== void 0 ? alwaysFormat : false;
    this.resetRegExp();
  }
  reset() {
    if (this.options) this.init(this.options);
  }
  resetRegExp() {
    const getOrResetRegExp = (existingRegExp, pattern) => {
      if (existingRegExp?.source === pattern) {
        existingRegExp.lastIndex = 0;
        return existingRegExp;
      }
      return new RegExp(pattern, "g");
    };
    this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
    this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
    this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
  }
  interpolate(str, data, lng, options2) {
    let match;
    let value;
    let replaces;
    const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    const handleFormat = (key) => {
      if (key.indexOf(this.formatSeparator) < 0) {
        const path2 = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(path2, void 0, lng, {
          ...options2,
          ...data,
          interpolationkey: key
        }) : path2;
      }
      const p = key.split(this.formatSeparator);
      const k = p.shift().trim();
      const f = p.join(this.formatSeparator).trim();
      return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
        ...options2,
        ...data,
        interpolationkey: k
      });
    };
    this.resetRegExp();
    const missingInterpolationHandler = options2?.missingInterpolationHandler || this.options.missingInterpolationHandler;
    const skipOnVariables = options2?.interpolation?.skipOnVariables !== void 0 ? options2.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    const todos = [{
      regex: this.regexpUnescape,
      safeValue: (val) => regexSafe(val)
    }, {
      regex: this.regexp,
      safeValue: (val) => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
    }];
    todos.forEach((todo) => {
      replaces = 0;
      while (match = todo.regex.exec(str)) {
        const matchedVar = match[1].trim();
        value = handleFormat(matchedVar);
        if (value === void 0) {
          if (typeof missingInterpolationHandler === "function") {
            const temp = missingInterpolationHandler(str, match, options2);
            value = isString(temp) ? temp : "";
          } else if (options2 && Object.prototype.hasOwnProperty.call(options2, matchedVar)) {
            value = "";
          } else if (skipOnVariables) {
            value = match[0];
            continue;
          } else {
            this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
            value = "";
          }
        } else if (!isString(value) && !this.useRawValueToEscape) {
          value = makeString(value);
        }
        const safeValue = todo.safeValue(value);
        str = str.replace(match[0], safeValue);
        if (skipOnVariables) {
          todo.regex.lastIndex += value.length;
          todo.regex.lastIndex -= match[0].length;
        } else {
          todo.regex.lastIndex = 0;
        }
        replaces++;
        if (replaces >= this.maxReplaces) {
          break;
        }
      }
    });
    return str;
  }
  nest(str, fc, options2 = {}) {
    let match;
    let value;
    let clonedOptions;
    const handleHasOptions = (key, inheritedOptions) => {
      const sep = this.nestingOptionsSeparator;
      if (key.indexOf(sep) < 0) return key;
      const c = key.split(new RegExp(`${sep}[ ]*{`));
      let optionsString = `{${c[1]}`;
      key = c[0];
      optionsString = this.interpolate(optionsString, clonedOptions);
      const matchedSingleQuotes = optionsString.match(/'/g);
      const matchedDoubleQuotes = optionsString.match(/"/g);
      if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
        optionsString = optionsString.replace(/'/g, '"');
      }
      try {
        clonedOptions = JSON.parse(optionsString);
        if (inheritedOptions) clonedOptions = {
          ...inheritedOptions,
          ...clonedOptions
        };
      } catch (e) {
        this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
        return `${key}${sep}${optionsString}`;
      }
      if (clonedOptions.defaultValue && clonedOptions.defaultValue.indexOf(this.prefix) > -1) delete clonedOptions.defaultValue;
      return key;
    };
    while (match = this.nestingRegexp.exec(str)) {
      let formatters = [];
      clonedOptions = {
        ...options2
      };
      clonedOptions = clonedOptions.replace && !isString(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;
      const keyEndIndex = /{.*}/.test(match[1]) ? match[1].lastIndexOf("}") + 1 : match[1].indexOf(this.formatSeparator);
      if (keyEndIndex !== -1) {
        formatters = match[1].slice(keyEndIndex).split(this.formatSeparator).map((elem) => elem.trim()).filter(Boolean);
        match[1] = match[1].slice(0, keyEndIndex);
      }
      value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
      if (value && match[0] === str && !isString(value)) return value;
      if (!isString(value)) value = makeString(value);
      if (!value) {
        this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
        value = "";
      }
      if (formatters.length) {
        value = formatters.reduce((v, f) => this.format(v, f, options2.lng, {
          ...options2,
          interpolationkey: match[1].trim()
        }), value.trim());
      }
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  }
}
const parseFormatStr = (formatStr) => {
  let formatName = formatStr.toLowerCase().trim();
  const formatOptions = {};
  if (formatStr.indexOf("(") > -1) {
    const p = formatStr.split("(");
    formatName = p[0].toLowerCase().trim();
    const optStr = p[1].substring(0, p[1].length - 1);
    if (formatName === "currency" && optStr.indexOf(":") < 0) {
      if (!formatOptions.currency) formatOptions.currency = optStr.trim();
    } else if (formatName === "relativetime" && optStr.indexOf(":") < 0) {
      if (!formatOptions.range) formatOptions.range = optStr.trim();
    } else {
      const opts = optStr.split(";");
      opts.forEach((opt) => {
        if (opt) {
          const [key, ...rest] = opt.split(":");
          const val = rest.join(":").trim().replace(/^'+|'+$/g, "");
          const trimmedKey = key.trim();
          if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
          if (val === "false") formatOptions[trimmedKey] = false;
          if (val === "true") formatOptions[trimmedKey] = true;
          if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
        }
      });
    }
  }
  return {
    formatName,
    formatOptions
  };
};
const createCachedFormatter = (fn) => {
  const cache = {};
  return (v, l, o) => {
    let optForCache = o;
    if (o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey]) {
      optForCache = {
        ...optForCache,
        [o.interpolationkey]: void 0
      };
    }
    const key = l + JSON.stringify(optForCache);
    let frm = cache[key];
    if (!frm) {
      frm = fn(getCleanedCode(l), o);
      cache[key] = frm;
    }
    return frm(v);
  };
};
const createNonCachedFormatter = (fn) => (v, l, o) => fn(getCleanedCode(l), o)(v);
class Formatter {
  constructor(options2 = {}) {
    this.logger = baseLogger.create("formatter");
    this.options = options2;
    this.init(options2);
  }
  init(services, options2 = {
    interpolation: {}
  }) {
    this.formatSeparator = options2.interpolation.formatSeparator || ",";
    const cf = options2.cacheInBuiltFormats ? createCachedFormatter : createNonCachedFormatter;
    this.formats = {
      number: cf((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val);
      }),
      currency: cf((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt,
          style: "currency"
        });
        return (val) => formatter.format(val);
      }),
      datetime: cf((lng, opt) => {
        const formatter = new Intl.DateTimeFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val);
      }),
      relativetime: cf((lng, opt) => {
        const formatter = new Intl.RelativeTimeFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val, opt.range || "day");
      }),
      list: cf((lng, opt) => {
        const formatter = new Intl.ListFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val);
      })
    };
  }
  add(name, fc) {
    this.formats[name.toLowerCase().trim()] = fc;
  }
  addCached(name, fc) {
    this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
  }
  format(value, format, lng, options2 = {}) {
    const formats = format.split(this.formatSeparator);
    if (formats.length > 1 && formats[0].indexOf("(") > 1 && formats[0].indexOf(")") < 0 && formats.find((f) => f.indexOf(")") > -1)) {
      const lastIndex = formats.findIndex((f) => f.indexOf(")") > -1);
      formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
    }
    const result = formats.reduce((mem, f) => {
      const {
        formatName,
        formatOptions
      } = parseFormatStr(f);
      if (this.formats[formatName]) {
        let formatted = mem;
        try {
          const valOptions = options2?.formatParams?.[options2.interpolationkey] || {};
          const l = valOptions.locale || valOptions.lng || options2.locale || options2.lng || lng;
          formatted = this.formats[formatName](mem, l, {
            ...formatOptions,
            ...options2,
            ...valOptions
          });
        } catch (error) {
          this.logger.warn(error);
        }
        return formatted;
      } else {
        this.logger.warn(`there was no format function for ${formatName}`);
      }
      return mem;
    }, value);
    return result;
  }
}
const removePending = (q, name) => {
  if (q.pending[name] !== void 0) {
    delete q.pending[name];
    q.pendingCount--;
  }
};
class Connector extends EventEmitter {
  constructor(backend, store, services, options2 = {}) {
    super();
    this.backend = backend;
    this.store = store;
    this.services = services;
    this.languageUtils = services.languageUtils;
    this.options = options2;
    this.logger = baseLogger.create("backendConnector");
    this.waitingReads = [];
    this.maxParallelReads = options2.maxParallelReads || 10;
    this.readingCalls = 0;
    this.maxRetries = options2.maxRetries >= 0 ? options2.maxRetries : 5;
    this.retryTimeout = options2.retryTimeout >= 1 ? options2.retryTimeout : 350;
    this.state = {};
    this.queue = [];
    this.backend?.init?.(services, options2.backend, options2);
  }
  queueLoad(languages, namespaces, options2, callback) {
    const toLoad = {};
    const pending = {};
    const toLoadLanguages = {};
    const toLoadNamespaces = {};
    languages.forEach((lng) => {
      let hasAllNamespaces = true;
      namespaces.forEach((ns) => {
        const name = `${lng}|${ns}`;
        if (!options2.reload && this.store.hasResourceBundle(lng, ns)) {
          this.state[name] = 2;
        } else if (this.state[name] < 0) ;
        else if (this.state[name] === 1) {
          if (pending[name] === void 0) pending[name] = true;
        } else {
          this.state[name] = 1;
          hasAllNamespaces = false;
          if (pending[name] === void 0) pending[name] = true;
          if (toLoad[name] === void 0) toLoad[name] = true;
          if (toLoadNamespaces[ns] === void 0) toLoadNamespaces[ns] = true;
        }
      });
      if (!hasAllNamespaces) toLoadLanguages[lng] = true;
    });
    if (Object.keys(toLoad).length || Object.keys(pending).length) {
      this.queue.push({
        pending,
        pendingCount: Object.keys(pending).length,
        loaded: {},
        errors: [],
        callback
      });
    }
    return {
      toLoad: Object.keys(toLoad),
      pending: Object.keys(pending),
      toLoadLanguages: Object.keys(toLoadLanguages),
      toLoadNamespaces: Object.keys(toLoadNamespaces)
    };
  }
  loaded(name, err, data) {
    const s = name.split("|");
    const lng = s[0];
    const ns = s[1];
    if (err) this.emit("failedLoading", lng, ns, err);
    if (!err && data) {
      this.store.addResourceBundle(lng, ns, data, void 0, void 0, {
        skipCopy: true
      });
    }
    this.state[name] = err ? -1 : 2;
    if (err && data) this.state[name] = 0;
    const loaded = {};
    this.queue.forEach((q) => {
      pushPath(q.loaded, [lng], ns);
      removePending(q, name);
      if (err) q.errors.push(err);
      if (q.pendingCount === 0 && !q.done) {
        Object.keys(q.loaded).forEach((l) => {
          if (!loaded[l]) loaded[l] = {};
          const loadedKeys = q.loaded[l];
          if (loadedKeys.length) {
            loadedKeys.forEach((n) => {
              if (loaded[l][n] === void 0) loaded[l][n] = true;
            });
          }
        });
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });
    this.emit("loaded", loaded);
    this.queue = this.queue.filter((q) => !q.done);
  }
  read(lng, ns, fcName, tried = 0, wait = this.retryTimeout, callback) {
    if (!lng.length) return callback(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng,
        ns,
        fcName,
        tried,
        wait,
        callback
      });
      return;
    }
    this.readingCalls++;
    const resolver = (err, data) => {
      this.readingCalls--;
      if (this.waitingReads.length > 0) {
        const next = this.waitingReads.shift();
        this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
      }
      if (err && data && tried < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    };
    const fc = this.backend[fcName].bind(this.backend);
    if (fc.length === 2) {
      try {
        const r = fc(lng, ns);
        if (r && typeof r.then === "function") {
          r.then((data) => resolver(null, data)).catch(resolver);
        } else {
          resolver(null, r);
        }
      } catch (err) {
        resolver(err);
      }
      return;
    }
    return fc(lng, ns, resolver);
  }
  prepareLoading(languages, namespaces, options2 = {}, callback) {
    if (!this.backend) {
      this.logger.warn("No backend was added via i18next.use. Will not load resources.");
      return callback && callback();
    }
    if (isString(languages)) languages = this.languageUtils.toResolveHierarchy(languages);
    if (isString(namespaces)) namespaces = [namespaces];
    const toLoad = this.queueLoad(languages, namespaces, options2, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback();
      return null;
    }
    toLoad.toLoad.forEach((name) => {
      this.loadOne(name);
    });
  }
  load(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {}, callback);
  }
  reload(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {
      reload: true
    }, callback);
  }
  loadOne(name, prefix = "") {
    const s = name.split("|");
    const lng = s[0];
    const ns = s[1];
    this.read(lng, ns, "read", void 0, void 0, (err, data) => {
      if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
      if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
      this.loaded(name, err, data);
    });
  }
  saveMissing(languages, namespace, key, fallbackValue, isUpdate, options2 = {}, clb = () => {
  }) {
    if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
      this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (key === void 0 || key === null || key === "") return;
    if (this.backend?.create) {
      const opts = {
        ...options2,
        isUpdate
      };
      const fc = this.backend.create.bind(this.backend);
      if (fc.length < 6) {
        try {
          let r;
          if (fc.length === 5) {
            r = fc(languages, namespace, key, fallbackValue, opts);
          } else {
            r = fc(languages, namespace, key, fallbackValue);
          }
          if (r && typeof r.then === "function") {
            r.then((data) => clb(null, data)).catch(clb);
          } else {
            clb(null, r);
          }
        } catch (err) {
          clb(err);
        }
      } else {
        fc(languages, namespace, key, fallbackValue, clb, opts);
      }
    }
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  }
}
const get = () => ({
  debug: false,
  initAsync: true,
  ns: ["translation"],
  defaultNS: ["translation"],
  fallbackLng: ["dev"],
  fallbackNS: false,
  supportedLngs: false,
  nonExplicitSupportedLngs: false,
  load: "all",
  preload: false,
  simplifyPluralSuffix: true,
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  partialBundledLanguages: false,
  saveMissing: false,
  updateMissing: false,
  saveMissingTo: "fallback",
  saveMissingPlurals: true,
  missingKeyHandler: false,
  missingInterpolationHandler: false,
  postProcess: false,
  postProcessPassResolved: false,
  returnNull: false,
  returnEmptyString: true,
  returnObjects: false,
  joinArrays: false,
  returnedObjectHandler: false,
  parseMissingKeyHandler: false,
  appendNamespaceToMissingKey: false,
  appendNamespaceToCIMode: false,
  overloadTranslationOptionHandler: (args) => {
    let ret = {};
    if (typeof args[1] === "object") ret = args[1];
    if (isString(args[1])) ret.defaultValue = args[1];
    if (isString(args[2])) ret.tDescription = args[2];
    if (typeof args[2] === "object" || typeof args[3] === "object") {
      const options2 = args[3] || args[2];
      Object.keys(options2).forEach((key) => {
        ret[key] = options2[key];
      });
    }
    return ret;
  },
  interpolation: {
    escapeValue: true,
    format: (value) => value,
    prefix: "{{",
    suffix: "}}",
    formatSeparator: ",",
    unescapePrefix: "-",
    nestingPrefix: "$t(",
    nestingSuffix: ")",
    nestingOptionsSeparator: ",",
    maxReplaces: 1e3,
    skipOnVariables: true
  },
  cacheInBuiltFormats: true
});
const transformOptions = (options2) => {
  if (isString(options2.ns)) options2.ns = [options2.ns];
  if (isString(options2.fallbackLng)) options2.fallbackLng = [options2.fallbackLng];
  if (isString(options2.fallbackNS)) options2.fallbackNS = [options2.fallbackNS];
  if (options2.supportedLngs?.indexOf?.("cimode") < 0) {
    options2.supportedLngs = options2.supportedLngs.concat(["cimode"]);
  }
  if (typeof options2.initImmediate === "boolean") options2.initAsync = options2.initImmediate;
  return options2;
};
const noop = () => {
};
const bindMemberFunctions = (inst) => {
  const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
  mems.forEach((mem) => {
    if (typeof inst[mem] === "function") {
      inst[mem] = inst[mem].bind(inst);
    }
  });
};
class I18n extends EventEmitter {
  constructor(options2 = {}, callback) {
    super();
    this.options = transformOptions(options2);
    this.services = {};
    this.logger = baseLogger;
    this.modules = {
      external: []
    };
    bindMemberFunctions(this);
    if (callback && !this.isInitialized && !options2.isClone) {
      if (!this.options.initAsync) {
        this.init(options2, callback);
        return this;
      }
      setTimeout(() => {
        this.init(options2, callback);
      }, 0);
    }
  }
  init(options2 = {}, callback) {
    this.isInitializing = true;
    if (typeof options2 === "function") {
      callback = options2;
      options2 = {};
    }
    if (options2.defaultNS == null && options2.ns) {
      if (isString(options2.ns)) {
        options2.defaultNS = options2.ns;
      } else if (options2.ns.indexOf("translation") < 0) {
        options2.defaultNS = options2.ns[0];
      }
    }
    const defOpts = get();
    this.options = {
      ...defOpts,
      ...this.options,
      ...transformOptions(options2)
    };
    this.options.interpolation = {
      ...defOpts.interpolation,
      ...this.options.interpolation
    };
    if (options2.keySeparator !== void 0) {
      this.options.userDefinedKeySeparator = options2.keySeparator;
    }
    if (options2.nsSeparator !== void 0) {
      this.options.userDefinedNsSeparator = options2.nsSeparator;
    }
    const createClassOnDemand = (ClassOrObject) => {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === "function") return new ClassOrObject();
      return ClassOrObject;
    };
    if (!this.options.isClone) {
      if (this.modules.logger) {
        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        baseLogger.init(null, this.options);
      }
      let formatter;
      if (this.modules.formatter) {
        formatter = this.modules.formatter;
      } else {
        formatter = Formatter;
      }
      const lu = new LanguageUtil(this.options);
      this.store = new ResourceStore(this.options.resources, this.options);
      const s = this.services;
      s.logger = baseLogger;
      s.resourceStore = this.store;
      s.languageUtils = lu;
      s.pluralResolver = new PluralResolver(lu, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      });
      const usingLegacyFormatFunction = this.options.interpolation.format && this.options.interpolation.format !== defOpts.interpolation.format;
      if (usingLegacyFormatFunction) {
        this.logger.warn(`init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting`);
      }
      if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
        s.formatter = createClassOnDemand(formatter);
        if (s.formatter.init) s.formatter.init(s, this.options);
        this.options.interpolation.format = s.formatter.format.bind(s.formatter);
      }
      s.interpolator = new Interpolator(this.options);
      s.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      };
      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      s.backendConnector.on("*", (event, ...args) => {
        this.emit(event, ...args);
      });
      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
      }
      if (this.modules.i18nFormat) {
        s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
        if (s.i18nFormat.init) s.i18nFormat.init(this);
      }
      this.translator = new Translator(this.services, this.options);
      this.translator.on("*", (event, ...args) => {
        this.emit(event, ...args);
      });
      this.modules.external.forEach((m) => {
        if (m.init) m.init(this);
      });
    }
    this.format = this.options.interpolation.format;
    if (!callback) callback = noop;
    if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      if (codes.length > 0 && codes[0] !== "dev") this.options.lng = codes[0];
    }
    if (!this.services.languageDetector && !this.options.lng) {
      this.logger.warn("init: no languageDetector is used and no lng is defined");
    }
    const storeApi = ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"];
    storeApi.forEach((fcName) => {
      this[fcName] = (...args) => this.store[fcName](...args);
    });
    const storeApiChained = ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"];
    storeApiChained.forEach((fcName) => {
      this[fcName] = (...args) => {
        this.store[fcName](...args);
        return this;
      };
    });
    const deferred = defer();
    const load = () => {
      const finish = (err, t) => {
        this.isInitializing = false;
        if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn("init: i18next is already initialized. You should call init just once!");
        this.isInitialized = true;
        if (!this.options.isClone) this.logger.log("initialized", this.options);
        this.emit("initialized", this.options);
        deferred.resolve(t);
        callback(err, t);
      };
      if (this.languages && !this.isInitialized) return finish(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, finish);
    };
    if (this.options.resources || !this.options.initAsync) {
      load();
    } else {
      setTimeout(load, 0);
    }
    return deferred;
  }
  loadResources(language, callback = noop) {
    let usedCallback = callback;
    const usedLng = isString(language) ? language : this.language;
    if (typeof language === "function") usedCallback = language;
    if (!this.options.resources || this.options.partialBundledLanguages) {
      if (usedLng?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
      const toLoad = [];
      const append = (lng) => {
        if (!lng) return;
        if (lng === "cimode") return;
        const lngs = this.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach((l) => {
          if (l === "cimode") return;
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };
      if (!usedLng) {
        const fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach((l) => append(l));
      } else {
        append(usedLng);
      }
      this.options.preload?.forEach?.((l) => append(l));
      this.services.backendConnector.load(toLoad, this.options.ns, (e) => {
        if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
        usedCallback(e);
      });
    } else {
      usedCallback(null);
    }
  }
  reloadResources(lngs, ns, callback) {
    const deferred = defer();
    if (typeof lngs === "function") {
      callback = lngs;
      lngs = void 0;
    }
    if (typeof ns === "function") {
      callback = ns;
      ns = void 0;
    }
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    if (!callback) callback = noop;
    this.services.backendConnector.reload(lngs, ns, (err) => {
      deferred.resolve();
      callback(err);
    });
    return deferred;
  }
  use(module) {
    if (!module) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!module.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    if (module.type === "backend") {
      this.modules.backend = module;
    }
    if (module.type === "logger" || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }
    if (module.type === "languageDetector") {
      this.modules.languageDetector = module;
    }
    if (module.type === "i18nFormat") {
      this.modules.i18nFormat = module;
    }
    if (module.type === "postProcessor") {
      postProcessor.addPostProcessor(module);
    }
    if (module.type === "formatter") {
      this.modules.formatter = module;
    }
    if (module.type === "3rdParty") {
      this.modules.external.push(module);
    }
    return this;
  }
  setResolvedLanguage(l) {
    if (!l || !this.languages) return;
    if (["cimode", "dev"].indexOf(l) > -1) return;
    for (let li = 0; li < this.languages.length; li++) {
      const lngInLngs = this.languages[li];
      if (["cimode", "dev"].indexOf(lngInLngs) > -1) continue;
      if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
        this.resolvedLanguage = lngInLngs;
        break;
      }
    }
    if (!this.resolvedLanguage && this.languages.indexOf(l) < 0 && this.store.hasLanguageSomeTranslations(l)) {
      this.resolvedLanguage = l;
      this.languages.unshift(l);
    }
  }
  changeLanguage(lng, callback) {
    this.isLanguageChangingTo = lng;
    const deferred = defer();
    this.emit("languageChanging", lng);
    const setLngProps = (l) => {
      this.language = l;
      this.languages = this.services.languageUtils.toResolveHierarchy(l);
      this.resolvedLanguage = void 0;
      this.setResolvedLanguage(l);
    };
    const done = (err, l) => {
      if (l) {
        if (this.isLanguageChangingTo === lng) {
          setLngProps(l);
          this.translator.changeLanguage(l);
          this.isLanguageChangingTo = void 0;
          this.emit("languageChanged", l);
          this.logger.log("languageChanged", l);
        }
      } else {
        this.isLanguageChangingTo = void 0;
      }
      deferred.resolve((...args) => this.t(...args));
      if (callback) callback(err, (...args) => this.t(...args));
    };
    const setLng = (lngs) => {
      if (!lng && !lngs && this.services.languageDetector) lngs = [];
      const fl = isString(lngs) ? lngs : lngs && lngs[0];
      const l = this.store.hasLanguageSomeTranslations(fl) ? fl : this.services.languageUtils.getBestMatchFromCodes(isString(lngs) ? [lngs] : lngs);
      if (l) {
        if (!this.language) {
          setLngProps(l);
        }
        if (!this.translator.language) this.translator.changeLanguage(l);
        this.services.languageDetector?.cacheUserLanguage?.(l);
      }
      this.loadResources(l, (err) => {
        done(err, l);
      });
    };
    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      if (this.services.languageDetector.detect.length === 0) {
        this.services.languageDetector.detect().then(setLng);
      } else {
        this.services.languageDetector.detect(setLng);
      }
    } else {
      setLng(lng);
    }
    return deferred;
  }
  getFixedT(lng, ns, keyPrefix) {
    const fixedT = (key, opts, ...rest) => {
      let o;
      if (typeof opts !== "object") {
        o = this.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      } else {
        o = {
          ...opts
        };
      }
      o.lng = o.lng || fixedT.lng;
      o.lngs = o.lngs || fixedT.lngs;
      o.ns = o.ns || fixedT.ns;
      if (o.keyPrefix !== "") o.keyPrefix = o.keyPrefix || keyPrefix || fixedT.keyPrefix;
      const keySeparator = this.options.keySeparator || ".";
      let resultKey;
      if (o.keyPrefix && Array.isArray(key)) {
        resultKey = key.map((k) => `${o.keyPrefix}${keySeparator}${k}`);
      } else {
        resultKey = o.keyPrefix ? `${o.keyPrefix}${keySeparator}${key}` : key;
      }
      return this.t(resultKey, o);
    };
    if (isString(lng)) {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    fixedT.keyPrefix = keyPrefix;
    return fixedT;
  }
  t(...args) {
    return this.translator?.translate(...args);
  }
  exists(...args) {
    return this.translator?.exists(...args);
  }
  setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  }
  hasLoadedNamespace(ns, options2 = {}) {
    if (!this.isInitialized) {
      this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages);
      return false;
    }
    if (!this.languages || !this.languages.length) {
      this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages);
      return false;
    }
    const lng = options2.lng || this.resolvedLanguage || this.languages[0];
    const fallbackLng = this.options ? this.options.fallbackLng : false;
    const lastLng = this.languages[this.languages.length - 1];
    if (lng.toLowerCase() === "cimode") return true;
    const loadNotPending = (l, n) => {
      const loadState = this.services.backendConnector.state[`${l}|${n}`];
      return loadState === -1 || loadState === 0 || loadState === 2;
    };
    if (options2.precheck) {
      const preResult = options2.precheck(this, loadNotPending);
      if (preResult !== void 0) return preResult;
    }
    if (this.hasResourceBundle(lng, ns)) return true;
    if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
    if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
    return false;
  }
  loadNamespaces(ns, callback) {
    const deferred = defer();
    if (!this.options.ns) {
      if (callback) callback();
      return Promise.resolve();
    }
    if (isString(ns)) ns = [ns];
    ns.forEach((n) => {
      if (this.options.ns.indexOf(n) < 0) this.options.ns.push(n);
    });
    this.loadResources((err) => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  loadLanguages(lngs, callback) {
    const deferred = defer();
    if (isString(lngs)) lngs = [lngs];
    const preloaded = this.options.preload || [];
    const newLngs = lngs.filter((lng) => preloaded.indexOf(lng) < 0 && this.services.languageUtils.isSupportedCode(lng));
    if (!newLngs.length) {
      if (callback) callback();
      return Promise.resolve();
    }
    this.options.preload = preloaded.concat(newLngs);
    this.loadResources((err) => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  dir(lng) {
    if (!lng) lng = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language);
    if (!lng) return "rtl";
    try {
      const l = new Intl.Locale(lng);
      if (l && l.getTextInfo) {
        const ti = l.getTextInfo();
        if (ti && ti.direction) return ti.direction;
      }
    } catch (e) {
    }
    const rtlLngs = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"];
    const languageUtils = this.services?.languageUtils || new LanguageUtil(get());
    if (lng.toLowerCase().indexOf("-latn") > 1) return "ltr";
    return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance(options2 = {}, callback) {
    return new I18n(options2, callback);
  }
  cloneInstance(options2 = {}, callback = noop) {
    const forkResourceStore = options2.forkResourceStore;
    if (forkResourceStore) delete options2.forkResourceStore;
    const mergedOptions = {
      ...this.options,
      ...options2,
      ...{
        isClone: true
      }
    };
    const clone = new I18n(mergedOptions);
    if (options2.debug !== void 0 || options2.prefix !== void 0) {
      clone.logger = clone.logger.clone(options2);
    }
    const membersToCopy = ["store", "services", "language"];
    membersToCopy.forEach((m) => {
      clone[m] = this[m];
    });
    clone.services = {
      ...this.services
    };
    clone.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    if (forkResourceStore) {
      const clonedData = Object.keys(this.store.data).reduce((prev, l) => {
        prev[l] = {
          ...this.store.data[l]
        };
        prev[l] = Object.keys(prev[l]).reduce((acc, n) => {
          acc[n] = {
            ...prev[l][n]
          };
          return acc;
        }, prev[l]);
        return prev;
      }, {});
      clone.store = new ResourceStore(clonedData, mergedOptions);
      clone.services.resourceStore = clone.store;
    }
    clone.translator = new Translator(clone.services, mergedOptions);
    clone.translator.on("*", (event, ...args) => {
      clone.emit(event, ...args);
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = mergedOptions;
    clone.translator.backendConnector.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    return clone;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;
instance.createInstance;
instance.dir;
instance.init;
instance.loadResources;
instance.reloadResources;
instance.use;
instance.changeLanguage;
instance.getFixedT;
instance.t;
instance.exists;
instance.setDefaultNamespace;
instance.hasLoadedNamespace;
instance.loadNamespaces;
instance.loadLanguages;
const matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
const htmlEntities = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
};
const unescapeHtmlEntity = (m) => htmlEntities[m];
const unescape = (text) => text.replace(matchHtmlEntity, unescapeHtmlEntity);
let defaultOptions = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: true,
  unescape
};
const setDefaults = (options2 = {}) => {
  defaultOptions = {
    ...defaultOptions,
    ...options2
  };
};
const getDefaults$1 = () => defaultOptions;
let i18nInstance;
const setI18n = (instance2) => {
  i18nInstance = instance2;
};
const getI18n = () => i18nInstance;
const initReactI18next = {
  type: "3rdParty",
  init(instance2) {
    setDefaults(instance2.options.react);
    setI18n(instance2);
  }
};
const {
  slice,
  forEach
} = [];
function defaults(obj) {
  forEach.call(slice.call(arguments, 1), (source) => {
    if (source) {
      for (const prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}
function hasXSS(input) {
  if (typeof input !== "string") return false;
  const xssPatterns = [/<\s*script.*?>/i, /<\s*\/\s*script\s*>/i, /<\s*img.*?on\w+\s*=/i, /<\s*\w+\s*on\w+\s*=.*?>/i, /javascript\s*:/i, /vbscript\s*:/i, /expression\s*\(/i, /eval\s*\(/i, /alert\s*\(/i, /document\.cookie/i, /document\.write\s*\(/i, /window\.location/i, /innerHTML/i];
  return xssPatterns.some((pattern) => pattern.test(input));
}
const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
const serializeCookie = function(name, val) {
  let options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    path: "/"
  };
  const opt = options2;
  const value = encodeURIComponent(val);
  let str = `${name}=${value}`;
  if (opt.maxAge > 0) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge)) throw new Error("maxAge should be a Number");
    str += `; Max-Age=${Math.floor(maxAge)}`;
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== "function") {
      throw new TypeError("option expires is invalid");
    }
    str += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) str += "; HttpOnly";
  if (opt.secure) str += "; Secure";
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  if (opt.partitioned) str += "; Partitioned";
  return str;
};
const cookie = {
  create(name, value, minutes, domain) {
    let cookieOptions = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      path: "/",
      sameSite: "strict"
    };
    if (minutes) {
      cookieOptions.expires = /* @__PURE__ */ new Date();
      cookieOptions.expires.setTime(cookieOptions.expires.getTime() + minutes * 60 * 1e3);
    }
    if (domain) cookieOptions.domain = domain;
    document.cookie = serializeCookie(name, value, cookieOptions);
  },
  read(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  remove(name, domain) {
    this.create(name, "", -1, domain);
  }
};
var cookie$1 = {
  name: "cookie",
  // Deconstruct the options object and extract the lookupCookie property
  lookup(_ref) {
    let {
      lookupCookie
    } = _ref;
    if (lookupCookie && typeof document !== "undefined") {
      return cookie.read(lookupCookie) || void 0;
    }
    return void 0;
  },
  // Deconstruct the options object and extract the lookupCookie, cookieMinutes, cookieDomain, and cookieOptions properties
  cacheUserLanguage(lng, _ref2) {
    let {
      lookupCookie,
      cookieMinutes,
      cookieDomain,
      cookieOptions
    } = _ref2;
    if (lookupCookie && typeof document !== "undefined") {
      cookie.create(lookupCookie, lng, cookieMinutes, cookieDomain, cookieOptions);
    }
  }
};
var querystring = {
  name: "querystring",
  // Deconstruct the options object and extract the lookupQuerystring property
  lookup(_ref) {
    let {
      lookupQuerystring
    } = _ref;
    let found;
    if (typeof window !== "undefined") {
      let {
        search
      } = window.location;
      if (!window.location.search && window.location.hash?.indexOf("?") > -1) {
        search = window.location.hash.substring(window.location.hash.indexOf("?"));
      }
      const query = search.substring(1);
      const params = query.split("&");
      for (let i = 0; i < params.length; i++) {
        const pos = params[i].indexOf("=");
        if (pos > 0) {
          const key = params[i].substring(0, pos);
          if (key === lookupQuerystring) {
            found = params[i].substring(pos + 1);
          }
        }
      }
    }
    return found;
  }
};
var hash = {
  name: "hash",
  // Deconstruct the options object and extract the lookupHash property and the lookupFromHashIndex property
  lookup(_ref) {
    let {
      lookupHash,
      lookupFromHashIndex
    } = _ref;
    let found;
    if (typeof window !== "undefined") {
      const {
        hash: hash2
      } = window.location;
      if (hash2 && hash2.length > 2) {
        const query = hash2.substring(1);
        if (lookupHash) {
          const params = query.split("&");
          for (let i = 0; i < params.length; i++) {
            const pos = params[i].indexOf("=");
            if (pos > 0) {
              const key = params[i].substring(0, pos);
              if (key === lookupHash) {
                found = params[i].substring(pos + 1);
              }
            }
          }
        }
        if (found) return found;
        if (!found && lookupFromHashIndex > -1) {
          const language = hash2.match(/\/([a-zA-Z-]*)/g);
          if (!Array.isArray(language)) return void 0;
          const index = typeof lookupFromHashIndex === "number" ? lookupFromHashIndex : 0;
          return language[index]?.replace("/", "");
        }
      }
    }
    return found;
  }
};
let hasLocalStorageSupport = null;
const localStorageAvailable = () => {
  if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;
  try {
    hasLocalStorageSupport = typeof window !== "undefined" && window.localStorage !== null;
    if (!hasLocalStorageSupport) {
      return false;
    }
    const testKey = "i18next.translate.boo";
    window.localStorage.setItem(testKey, "foo");
    window.localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorageSupport = false;
  }
  return hasLocalStorageSupport;
};
var localStorage = {
  name: "localStorage",
  // Deconstruct the options object and extract the lookupLocalStorage property
  lookup(_ref) {
    let {
      lookupLocalStorage
    } = _ref;
    if (lookupLocalStorage && localStorageAvailable()) {
      return window.localStorage.getItem(lookupLocalStorage) || void 0;
    }
    return void 0;
  },
  // Deconstruct the options object and extract the lookupLocalStorage property
  cacheUserLanguage(lng, _ref2) {
    let {
      lookupLocalStorage
    } = _ref2;
    if (lookupLocalStorage && localStorageAvailable()) {
      window.localStorage.setItem(lookupLocalStorage, lng);
    }
  }
};
let hasSessionStorageSupport = null;
const sessionStorageAvailable = () => {
  if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;
  try {
    hasSessionStorageSupport = typeof window !== "undefined" && window.sessionStorage !== null;
    if (!hasSessionStorageSupport) {
      return false;
    }
    const testKey = "i18next.translate.boo";
    window.sessionStorage.setItem(testKey, "foo");
    window.sessionStorage.removeItem(testKey);
  } catch (e) {
    hasSessionStorageSupport = false;
  }
  return hasSessionStorageSupport;
};
var sessionStorage = {
  name: "sessionStorage",
  lookup(_ref) {
    let {
      lookupSessionStorage
    } = _ref;
    if (lookupSessionStorage && sessionStorageAvailable()) {
      return window.sessionStorage.getItem(lookupSessionStorage) || void 0;
    }
    return void 0;
  },
  cacheUserLanguage(lng, _ref2) {
    let {
      lookupSessionStorage
    } = _ref2;
    if (lookupSessionStorage && sessionStorageAvailable()) {
      window.sessionStorage.setItem(lookupSessionStorage, lng);
    }
  }
};
var navigator$1 = {
  name: "navigator",
  lookup(options2) {
    const found = [];
    if (typeof navigator !== "undefined") {
      const {
        languages,
        userLanguage,
        language
      } = navigator;
      if (languages) {
        for (let i = 0; i < languages.length; i++) {
          found.push(languages[i]);
        }
      }
      if (userLanguage) {
        found.push(userLanguage);
      }
      if (language) {
        found.push(language);
      }
    }
    return found.length > 0 ? found : void 0;
  }
};
var htmlTag = {
  name: "htmlTag",
  // Deconstruct the options object and extract the htmlTag property
  lookup(_ref) {
    let {
      htmlTag: htmlTag2
    } = _ref;
    let found;
    const internalHtmlTag = htmlTag2 || (typeof document !== "undefined" ? document.documentElement : null);
    if (internalHtmlTag && typeof internalHtmlTag.getAttribute === "function") {
      found = internalHtmlTag.getAttribute("lang");
    }
    return found;
  }
};
var path = {
  name: "path",
  // Deconstruct the options object and extract the lookupFromPathIndex property
  lookup(_ref) {
    let {
      lookupFromPathIndex
    } = _ref;
    if (typeof window === "undefined") return void 0;
    const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
    if (!Array.isArray(language)) return void 0;
    const index = typeof lookupFromPathIndex === "number" ? lookupFromPathIndex : 0;
    return language[index]?.replace("/", "");
  }
};
var subdomain = {
  name: "subdomain",
  lookup(_ref) {
    let {
      lookupFromSubdomainIndex
    } = _ref;
    const internalLookupFromSubdomainIndex = typeof lookupFromSubdomainIndex === "number" ? lookupFromSubdomainIndex + 1 : 1;
    const language = typeof window !== "undefined" && window.location?.hostname?.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);
    if (!language) return void 0;
    return language[internalLookupFromSubdomainIndex];
  }
};
let canCookies = false;
try {
  document.cookie;
  canCookies = true;
} catch (e) {
}
const order = ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"];
if (!canCookies) order.splice(1, 1);
const getDefaults = () => ({
  order,
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  // cache user language
  caches: ["localStorage"],
  excludeCacheFor: ["cimode"],
  // cookieMinutes: 10,
  // cookieDomain: 'myDomain'
  convertDetectedLanguage: (l) => l
});
class Browser {
  constructor(services) {
    let options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.type = "languageDetector";
    this.detectors = {};
    this.init(services, options2);
  }
  init() {
    let services = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
      languageUtils: {}
    };
    let options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let i18nOptions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.services = services;
    this.options = defaults(options2, this.options || {}, getDefaults());
    if (typeof this.options.convertDetectedLanguage === "string" && this.options.convertDetectedLanguage.indexOf("15897") > -1) {
      this.options.convertDetectedLanguage = (l) => l.replace("-", "_");
    }
    if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;
    this.i18nOptions = i18nOptions;
    this.addDetector(cookie$1);
    this.addDetector(querystring);
    this.addDetector(localStorage);
    this.addDetector(sessionStorage);
    this.addDetector(navigator$1);
    this.addDetector(htmlTag);
    this.addDetector(path);
    this.addDetector(subdomain);
    this.addDetector(hash);
  }
  addDetector(detector) {
    this.detectors[detector.name] = detector;
    return this;
  }
  detect() {
    let detectionOrder = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.order;
    let detected = [];
    detectionOrder.forEach((detectorName) => {
      if (this.detectors[detectorName]) {
        let lookup = this.detectors[detectorName].lookup(this.options);
        if (lookup && typeof lookup === "string") lookup = [lookup];
        if (lookup) detected = detected.concat(lookup);
      }
    });
    detected = detected.filter((d) => d !== void 0 && d !== null && !hasXSS(d)).map((d) => this.options.convertDetectedLanguage(d));
    if (this.services && this.services.languageUtils && this.services.languageUtils.getBestMatchFromCodes) return detected;
    return detected.length > 0 ? detected[0] : null;
  }
  cacheUserLanguage(lng) {
    let caches = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.options.caches;
    if (!caches) return;
    if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
    caches.forEach((cacheName) => {
      if (this.detectors[cacheName]) this.detectors[cacheName].cacheUserLanguage(lng, this.options);
    });
  }
}
Browser.type = "languageDetector";
const timeClues$2 = {
  title: "Time clues",
  description: "Dates mentioned in your conversations. Follow a clue back to its source.",
  unread: "{{count}} unseen clues for today",
  ranges: {
    today: "Today",
    "this week": "This week",
    "next week": "Next week"
  },
  start: "From",
  end: "To",
  custom: "Date range",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  dateOnly: "—",
  otherInThread: "Other dates in this conversation",
  currentThread: "This conversation",
  teamSource: "{{author}} in {{channel}}",
  openSource: "Open original message",
  about: "About time clues",
  unreadOne: "Unseen clue",
  ignore: "Ignore",
  scheduledTask: "Scheduled task",
  scheduledFired: "ran",
  currentAndToday: "This conversation + today's cross-thread matches",
  failed: "Could not load clues.",
  empty: "No indexed clues for these dates.",
  unresolved: "Unresolved date",
  previous: "Previous page",
  next: "Next page",
  markSeen: "Mark today's visible clues seen",
  seenFailed: "Could not save seen state. Please retry.",
  coverage: "Only new original human messages and explicitly indexed sources. Time expressions are read by the tool model (周一, 大后天, next Friday…); without a tool model, a small fixed grammar reads them instead. Relative dates use the source time and timezone. Red dots mean unseen, never overdue or incomplete. No reminders are created."
};
const remoteHandoff$2 = {
  download: "Download to this computer",
  title: "Continue projects on another computer",
  description: "Enable Remote Access and end-to-end encryption on your original host, then paste its pairing link here. A separate window uses that host's projects, conversations, models, skills and MCP. Uploads go to the host; downloads go to this PC. The host must stay online.",
  placeholder: "Paste your own host's encrypted Alma pairing link",
  connect: "Open project handoff",
  security: "The pairing link is a key to your host; never share it. The window uses a temporary isolated session: closing it clears this computer's cache, without stopping work on the host. A remembered host keeps only its pairing link, encrypted by the system keychain; remove it with ×. Local-machine actions are unavailable.",
  open: "Open",
  forget: "Forget this host",
  remember: "Remember this host on this computer",
  labelPlaceholder: "Name (optional), e.g. Office Mac"
};
const dateReference$2 = {
  invalid: "Invalid date reference",
  endExclusive: "End date is exclusive",
  coverage: "Discover conversations by message time; keep event, deadline and completion dates separate. Date references are read-only and never schedule tasks. Original-text indexing is explicit; reading calendars may request host permission.",
  indexOriginal: "Index this conversation's original time records",
  indexing: "Indexing original pages…",
  workRecords: "Related work records",
  workCoverage: "Model-derived, only from explicitly indexed original text; verify the quotations. Older imports keep actual dates, not import dates. No results does not prove absence. Files and other apps still require inspection.",
  eventDate: "Event date",
  dueDate: "Deadline",
  completedDate: "Completion date",
  states: {
    completed: "Completed (source claim)",
    "in-progress": "In progress",
    planned: "Planned",
    unconfirmed: "Unconfirmed"
  },
  projected: "Projected due time, not an execution receipt",
  previouslyRun: "Previously attempted; check the run receipt for success or failure",
  runHistory: "Actual reminder executions",
  runCoverage: "Retained run receipts only, not complete history. Successful reminder execution does not prove the underlying work is completed.",
  runStarted: "Started",
  runFinished: "Finished",
  runPreview: "Result preview is truncated; inspect the original conversation or run history.",
  runStates: {
    running: "Running",
    succeeded: "Execution succeeded",
    failed: "Execution failed",
    unconfirmed: "Outcome unconfirmed"
  },
  calendar: "Host calendar",
  readCalendar: "Read host calendar (read-only)",
  retry: "Retry",
  noCalendarEvents: "No host calendar events in this range.",
  conversations: "Conversations with messages in this range",
  noConversations: "No messages found in this range; this does not mean no work was completed.",
  moreSources: "More sources exist; this list is not complete coverage.",
  reminders: "Reminders and recurring schedules due in this range",
  noReminders: "No reminders with a known due time in this range."
};
const conversationTime$2 = {
  created: "Created",
  firstConversation: "First conversation",
  lastConversation: "Last conversation",
  lastKnownConversation: "Last known conversation",
  lastActivity: "Last activity",
  partialCoverage: "Conversation dates cover opened threads only; older unread threads are not yet indexed."
};
const app$2 = {
  name: "Alma",
  description: "An elegant desktop for AI provider orchestration",
  updateBadge: {
    label: "Update Available",
    updating: "Updating…",
    dismiss: "Dismiss"
  }
};
const navigation$2 = {
  main: "Home",
  providers: "Providers",
  chat: "Chat",
  settings: "Settings"
};
const providers$2 = {
  title: "AI Providers",
  add: "Add Provider",
  edit: "Edit Provider",
  "delete": "Delete Provider",
  name: "Name",
  type: "Type",
  apiKey: "API Key",
  baseUrl: "Base URL",
  model: "Model",
  actions: "Actions",
  enable: "Enable",
  disable: "Disable",
  enabled: "Enabled",
  disabled: "Disabled",
  deleteConfirm: "Are you sure you want to delete this provider?",
  getStarted: 'Click "Add Provider" to get started',
  noProviders: "No providers",
  providerName: "Provider Name",
  providerNameRequired: "Provider name is required",
  apiKeyRequired: "API key is required",
  modelRequired: "Model name is required",
  invalidUrl: "Please enter a valid URL format",
  baseUrlRequired: "Custom providers require a base URL",
  saveFailed: "Save failed",
  addNew: "Add New Provider",
  editConfig: "Edit Provider Configuration",
  providerType: "Provider Type",
  apiKeySecure: "API keys are stored securely locally and will not be uploaded to servers",
  openai: {
    name: "OpenAI",
    description: "GPT series models"
  },
  anthropic: {
    name: "Anthropic",
    description: "Claude series models"
  },
  google: {
    name: "Google",
    description: "Gemini series models"
  },
  custom: {
    name: "Custom",
    description: "Custom OpenAI-compatible API"
  },
  aihubmix: {
    name: "AiHubMix",
    description: "Secure, affordable, and fast. Supports Alipay payments.",
    affiliateNoteBefore: "Signing up through ",
    affiliateLinkText: "this link",
    affiliateNoteAfter: " helps support Alma's continued development. Thank you!"
  },
  volcengine: {
    name: "Volcengine",
    description: "Volcengine Ark (Doubao) models with chat and image generation support"
  },
  moonshot: {
    name: "Moonshot",
    description: "Moonshot AI (Kimi) models with long context support",
    region: "Region",
    regionChina: "China (api.moonshot.cn)",
    regionInternational: "International (api.moonshot.ai)",
    regionHint: "Select China for mainland China users, International for users outside China"
  },
  baseUrlOptional: "(Optional, leave empty to use default)",
  baseUrlOptionalDescription: "Optional, leave empty to use official API address",
  modelPlaceholder: "e.g.: gpt-4o-mini, claude-sonnet-4",
  testConnection: "Test Connection",
  selectModelToTest: "Select a model to test",
  noModelsFound: "No models found",
  connectionSuccess: "Connection successful!",
  connectionFailed: "Connection test failed",
  noModelsEnabled: "Please enable at least one model before testing the connection",
  configure: "Configure Provider",
  enableProvider: "Enable this provider",
  namePlaceholder: "My Custom Provider",
  configDescription: "Configure AI provider access information. All data is stored securely locally."
};
const chat$2 = {
  workedFor: "Worked for {{duration}}",
  backgroundAgentsRunning_one: "{{count}} agent still running in the background · continues automatically when it finishes",
  backgroundAgentsRunning_other: "{{count}} agents still running in the background · continues automatically when they finish",
  title: "Chat",
  newChat: "New Chat",
  newChatDragHint: "New chat — or drag onto a conversation's edge to open it as a split",
  editMode: "Edit",
  splitPane: {
    close: "Close split",
    openLeft: "Open on the left",
    openRight: "Open on the right",
    openBottom: "Open below",
    pairedWith: "Opens in a split with “{{title}}”",
    ungroup: "Ungroup split",
    leaveGroup: "Leave split group"
  },
  sendMessage: "Send Message",
  typing: "Type a message...",
  clearHistory: "Clear History",
  noHistory: "No chat history",
  startChatting: "Start chatting",
  messages: "messages",
  selectModel: "Select Model",
  noModelsAvailable: "No models available",
  generationError: "Generation error",
  stopGeneration: "Stop Generation",
  steer: "Steer",
  steerGeneration: "Send now — steers the current response",
  compose: "Compose",
  aiAvatarLabel: "A",
  aiThinking: "Thinking...",
  followBottom: "Follow bottom",
  historyBack: "Back",
  historyForward: "Forward",
  historyBackTo: "Back to “{{title}}”",
  historyForwardTo: "Forward to “{{title}}”",
  autoCompact: {
    compacting: "Compacting context...",
    compacted: "{{count}} messages compacted",
    compactedTitle: "Context Compacted",
    savedTokens: "Saved ~{{tokens}} tokens",
    indicatorTitle: "Context Compacted",
    indicatorMessages: "{{count}} messages summarized",
    indicatorTokens: "saved ~{{saved}} tokens"
  },
  compact: {
    success: "Compacted {{count}} messages, saved ~{{tokens}} tokens",
    error: "Failed to compact context",
    noMessages: "Not enough messages to compact",
    commandDescription: "Compress conversation history to save tokens"
  },
  contextUsage: {
    title: "Context Usage",
    tokens: "{{used}} / {{total}} tokens",
    compactNow: "Compact now",
    autoCompactAt: "Auto-compacts at {{percent}}%",
    autoCompactOff: "Auto-compact is off",
    overflowNotice: "Context is over the limit — it will be compacted before the next message.",
    compactFailed: "Compaction failed",
    nothingToCompact: "Nothing left to compact"
  },
  queuedMessages: {
    count_one: "{{count}} queued message",
    count_other: "{{count}} queued messages",
    sendNow: "Send queued messages now",
    files: "file(s)",
    clickToEdit: "Click to edit",
    steerHint: "Steer — inject this message into the running response now",
    steerError: "Failed to steer the current response"
  },
  renderFailed: {
    title: "This message could not be displayed.",
    retry: "Retry"
  },
  fileReference: {
    notFound: "{{name}} is not in this workspace"
  },
  taskResume: {
    resumeAsNewRun: "Resume as New Run",
    resuming: "Resuming…",
    runLabel: "Run {{index}}",
    resumeHint: "Starts a fresh retry from this interruption point.",
    resumeFailed: "Failed to resume the interrupted task",
    noOutput: "No output",
    statusCompletedNoOutput: "Task completed with no text output",
    statusFailedNoDetail: "Task failed with no error details",
    statusNotFound: "Task not found — it may have been cleaned up",
    statusStillRunning: "Task is still running"
  },
  todo: {
    progress: "{{completed}} out of {{total}} tasks completed",
    clear: "Clear todo list"
  },
  plan: {
    rework: "Reworking feedback from {{ref}}",
    feedbackOpen: "Rework requested by review {{ref}}",
    after: "after {{deps}}"
  },
  crew: {
    title: "Crew",
    kicker: "Agent Crew",
    mission: "Mission",
    run: "Run",
    handoff: "Handoff",
    handoffs: "Handoffs",
    running: "Running",
    completed: "Done",
    delegated: "Delegated",
    spawned: "Spawned",
    deliverable: "Deliverable",
    summary: "{{missions}} missions, {{runs}} runs, {{active}} active",
    empty: "No delegated specialists have been spawned in this thread yet.",
    emptyHint: "Once Alma delegates work to Designer, Developer, Researcher, or another specialist, the mission graph will show up here.",
    phase: "Phase",
    sprint: "Sprint",
    contract: "Contract",
    evaluation: "Evaluations",
    attempt: "Attempt",
    passed: "Passed",
    failed: "Failed",
    criteria: "criteria",
    planning: "Planning",
    contracting: "Contracting",
    generating: "Generating",
    evaluating: "Evaluating",
    iterating: "Iterating",
    harnessMode: "Sprint Harness",
    jumpToWork: "View in thread"
  },
  messageMenu: {
    copy: "Copy",
    copyAsMarkdown: "Copy as Markdown",
    copyAsPlainText: "Copy as Plain Text",
    readAloud: "Read aloud",
    stopReading: "Stop reading",
    regenerate: "Regenerate",
    regenerateDisabled: "Regenerate (disabled)",
    more: "More",
    usage: "Usage",
    context: "Context",
    inputTokens: "Input tokens",
    outputTokens: "Output tokens",
    cacheRead: "Cache read",
    cacheHitRate: "Cache hit rate",
    cacheWrite: "Cache write",
    totalTokens: "Total tokens",
    timeToFirstToken: "Time to first token",
    tokensPerSecond: "Tokens / second",
    turnEndReason: "Turn end reason",
    previousVersion: "Previous version",
    nextVersion: "Next version",
    branchCreated: "Branch Created",
    creatingBranch: "Creating Branch…",
    createBranch: "Create Branch",
    deleteMessage: "Delete Message",
    memory: "Memory",
    usedMemories: "Used Memories",
    createdMemories: "Created Memories",
    deletedMemories: "Deleted Memories",
    noMemories: "No memories associated",
    rollback: "Rollback Files",
    viewTrace: "View Trace"
  },
  trace: {
    title: "Execution Trace",
    loading: "Loading trace…",
    none: "No trace recorded for this message.",
    steps: "steps"
  },
  rollback: {
    title: "Rollback to this message",
    description: "This will restore all files to the state when you sent this message, undoing file changes from the AI response and all subsequent messages.",
    filesOnly: "Rollback files only",
    filesOnlyDescription: "Restore files to the state when you sent this message, but keep all conversation history",
    filesAndMessages: "Rollback files and messages",
    filesAndMessagesDescription: "Restore files to the state when you sent this message, and remove all subsequent messages (including AI response)",
    confirm: "Rollback",
    rollingBack: "Rolling back…"
  },
  toolPermission: {
    awaitingApproval: "Awaiting approval",
    approved: "Approved",
    denied: "Denied",
    permissionRequired: "Permission Required",
    approve: "Approve",
    deny: "Deny",
    decidedAt: "Decided at: {{time}}",
    toolPermissionRequired: "Tool permission required",
    allow: "Allow",
    allowOnce: "Allow Once",
    alwaysAllow: "Always Allow",
    denyWithReason: "Deny With Reason",
    submitDenyReason: "Submit Deny Reason"
  },
  permission: {
    awaitingApproval: "Awaiting approval",
    approved: "Approved",
    approvedAll: "Approved (auto-approve enabled for this chat)",
    denied: "Denied",
    accept: "Accept",
    acceptAll: "Accept All",
    rejectWithReason: "Reject",
    reject: "Reject",
    rejectReasonPlaceholder: "Enter reason for rejection (optional)...",
    reason: "Reason",
    decidedAt: "Decided at"
  },
  imageAnnotate: {
    button: "Annotate & Edit",
    buttonTitle: "Mark up the image and let AI edit it",
    imageButtonTitle: "Annotate & Edit — draw marks and let AI edit",
    tool: {
      select: "Select",
      rect: "Box",
      ellipse: "Circle",
      brush: "Draw",
      arrow: "Arrow"
    },
    color: "Color",
    undo: "Undo",
    redo: "Redo",
    clearAll: "Clear all",
    exit: "Exit",
    regionPlaceholder: "What to change here?",
    removeRegion: "Remove this region",
    overallNotePlaceholder: "Overall note (optional): style / lighting / keep unchanged…",
    apply: "Apply edit",
    applyDisabledHint: "Mark a spot and describe it first",
    applyShortcut: "⌘↵",
    canvasHint: "Draw the spots to change — a note box appears at each; write what to change.",
    prompt: {
      directive: "Please edit this annotated image directly (use image editing on the original — do NOT generate a new image).",
      sourcePathLabel: "Local path of the source image (use it as the edit input): ",
      visibleHeader: "🖌️ Please edit this image per the marks below (numbers match the regions on the image):",
      overallLabel: "Overall: "
    }
  },
  mermaidAnnotate: {
    buttonTitle: "Annotate & Edit — mark the diagram and let AI rewrite it",
    cardTitle: "Diagram edit",
    prompt: {
      directive: "The attached image is a rendered preview of a Mermaid diagram with numbered annotation marks. Update the diagram's Mermaid source per the numbered requests and reply with the complete updated diagram in a ```mermaid code block — do NOT generate or edit any image.",
      sourceLabel: "Current Mermaid source of the diagram:",
      visibleHeader: "🖌️ Please update this diagram per the marks below (numbers match the annotated preview):"
    }
  },
  imageMenu: {
    copyImage: "Copy Image",
    openImage: "Open Image",
    saveImage: "Save Image"
  },
  artifacts: {
    button: "Artifacts",
    enabled: "Artifacts mode enabled",
    disabled: "Artifacts mode disabled"
  },
  capabilities: {
    button: "Tools & Skills",
    searchPlaceholder: "Search tools & skills..."
  },
  tools: {
    button: "Tools",
    noneSelected: "Tools disabled",
    someSelected: "{{count}} tools selected",
    selectedCount: "{{count}} tools",
    description: "Allow Alma to use the selected tools for the next response.",
    selectAll: "Select all",
    clearAll: "Clear all",
    auto: "Auto",
    autoDescription: "Let Alma automatically select the most relevant tools based on your message.",
    autoSelectedTools: "Auto-selected tools:",
    selectGroup: "Select this category",
    clearGroup: "Clear this category",
    switchLayout: "Switch layout",
    groups: {
      workspace: "Project & files",
      shell: "Shell & processes",
      web: "Web & research",
      planning: "Planning & delegation"
    },
    items: {
      Task: {
        label: "Task delegation",
        description: "Launch a delegated sub-agent to handle multi-step work."
      },
      TodoWrite: {
        label: "Todo writer",
        description: "Update the shared TODO list while executing plans."
      },
      EnterPlanMode: {
        label: "Enter plan mode",
        description: "Switch the conversation into structured planning."
      },
      ExitPlanMode: {
        label: "Exit plan mode",
        description: "Return from planning mode to normal chatting."
      },
      Skill: {
        label: "Skill runner",
        description: "Invoke saved skills or workflows."
      },
      SlashCommand: {
        label: "Slash commands",
        description: "Trigger custom slash-command shortcuts."
      },
      Bash: {
        label: "Bash",
        description: "Run shell commands inside the project workspace."
      },
      BashOutput: {
        label: "Bash output",
        description: "Inspect stdout and stderr captured from recent shell runs."
      },
      KillShell: {
        label: "Kill shell",
        description: "Terminate any long-running shell command."
      },
      Glob: {
        label: "Glob files",
        description: "Expand glob patterns to list matching files."
      },
      Grep: {
        label: "ripgrep search",
        description: "Search project files with ripgrep."
      },
      Read: {
        label: "Read file",
        description: "Read file contents for additional context."
      },
      Edit: {
        label: "Apply patch",
        description: "Modify files using structured patches."
      },
      Write: {
        label: "Write file",
        description: "Overwrite a file with provided content."
      },
      NotebookEdit: {
        label: "Notebook edit",
        description: "Apply batched file edits via the notebook tool."
      },
      WebFetch: {
        label: "Web fetch",
        description: "Fetch the raw contents of a URL."
      },
      WebSearch: {
        label: "Web search",
        description: "Search the web for fresh information."
      },
      ToolSearch: {
        label: "Tool search",
        description: "Search and discover available tools by name or description."
      },
      widgetRenderer: {
        label: "Widget renderer",
        description: "Render interactive HTML/SVG visualizations in the chat."
      },
      pieChart: {
        label: "Pie chart",
        description: "Display data as an interactive pie chart."
      },
      barChart: {
        label: "Bar chart",
        description: "Display data as an interactive bar chart."
      }
    }
  },
  skills: {
    title: "Skills",
    auto: "Auto",
    autoDesc: "AI automatically selects relevant skills",
    selectAll: "Select all",
    clearAll: "Clear all",
    bundled: "Built-in Skills",
    personal: "Personal Skills",
    claudeCode: "Claude Code Skills",
    marketplace: "Marketplace Skills",
    project: "Project Skills",
    noSkills: "No skills available",
    selectedCount: "{{count}} skills",
    autoSelectedSkills: "Auto-selected skills:",
    agents: "Agent Skills"
  },
  mcp: {
    button: "MCP Servers",
    title: "MCP Servers",
    description: "Select MCP servers to enable for this conversation.",
    selectAll: "Select all",
    clearAll: "Clear all",
    noServers: "No MCP servers installed",
    installServers: "Install Servers",
    openSettings: "Open MCP Settings",
    refresh: "Refresh MCP Servers",
    error: "Error"
  },
  memory: {
    retrieving: "Retrieving memories...",
    retrievedCount: "{{count}} memories",
    retrievedMemories: "Retrieved Memories"
  },
  skillExtraction: {
    title: "Skill Extracted",
    analyzing: "Analyzing conversation for reusable patterns...",
    extracting: "Crafting a new skill...",
    saving: "Saving skill...",
    created: "New",
    updated: "Updated",
    viewSkill: "View Skill"
  },
  endResource: {
    open: "Open",
    openMenuLabel: "Open menu",
    openResource: "Open {{filename}}",
    revealInFolder: "Show in Finder",
    revealInExplorer: "Show in File Explorer",
    copyPath: "Copy path",
    pathCopied: "Path copied",
    copyLink: "Copy link",
    linkCopied: "Link copied",
    websiteSubtitle: "Website",
    documentFileType: "Document · {{extension}}",
    spreadsheetFileType: "Spreadsheet · {{extension}}",
    presentationFileType: "Slides · {{extension}}",
    imageFileType: "Image · {{extension}}",
    archiveFileType: "Archive · {{extension}}",
    locationProject: "Project",
    locationTemp: "Temp",
    locationGlobal: "Global",
    reviewInSidebar: "Preview in sidebar",
    openInApp: "Open in default app"
  },
  previewLink: {
    open: "Open preview"
  },
  incognito: {
    button: "Incognito Mode",
    enabled: "Incognito mode is ON - Memory features are disabled for this chat",
    disabled: "Incognito mode is OFF - Click to disable memory features"
  },
  commands: "Commands",
  commandsAndPrompts: "Commands & Prompts",
  commandsAndSkills: "Commands & Skills",
  promptsAndSkills: "Prompts & Skills",
  commandsPromptsAndSkills: "Commands, Prompts & Skills",
  skillEnabled: 'Skill "{{name}}" enabled',
  skillDisabled: 'Skill "{{name}}" disabled',
  workspaceFiles: "Project Files",
  noFilesFound: "No files found",
  typeToFilter: "Type to filter more files...",
  imageAspect: {
    title: "Aspect ratio",
    description: "Shape for generated images — applied when the AI generates or edits an image.",
    auto: "Auto"
  },
  queueMessage: "Queue message",
  queueMessageHint: "Add to the queue — send it into this turn with Steer, or let it run when the turn ends",
  permissionRequest: "Permission Request",
  systemNote: "System note",
  dropFilesHere: "Drop files here",
  modelPicker: {
    favorites: "Favorites",
    favorite: "Add to favorites",
    unfavorite: "Remove from favorites"
  },
  modelSelectorError: "Model selector error",
  denialReasonPlaceholder: "Enter denial reason...",
  downloadFile: "Download file"
};
const reasoning$2 = {
  thinking: "Thinking...",
  thought: "Thought",
  duration: "Thought for {{duration}} seconds",
  button: "Reasoning",
  description: "Adjust the reasoning effort for models that support extended thinking.",
  fast: "Fast",
  fastDesc: "About 1.5× faster, uses plan limits faster. Subagents follow it.",
  effortDesc: {
    off: "Disable extended thinking",
    low: "Quick responses with minimal reasoning",
    medium: "Balanced speed and reasoning depth",
    high: "Deep reasoning for complex tasks",
    xhigh: "Extra high reasoning for the hardest tasks",
    max: "Maximum reasoning depth",
    ultra: "Ultra-deep reasoning for the most demanding tasks"
  }
};
const settings$2 = {
  plugins: {
    providerSetupHint: "After installing a Provider plugin, head to the {link} to finish setting it up.",
    providersPageLink: "Providers page",
    updatesBadge: "Plugin updates ({{count}})",
    updatesAvailable: "{{count}} plugin update(s) available",
    updateAll: "Update All"
  },
  title: "Settings",
  searchSettings: "Search",
  language: "Language",
  theme: "Theme",
  save: "Save",
  cancel: "Cancel",
  appearance: {
    light: "Light",
    dark: "Dark",
    system: "System"
  },
  appIcon: {
    title: "App Icon",
    description: "Choose your preferred app icon for the dock, taskbar, and tray."
  },
  startup: {
    title: "Startup Settings",
    autoStart: "Auto Start",
    startMinimized: "Start minimized to system tray"
  },
  window: {
    title: "Window Behavior",
    minimizeToTray: "Minimize to system tray",
    closeToTray: "Close to system tray",
    hideDockIcon: "Hide Dock icon (menu bar only mode)",
    hideDockIconDesc: "When enabled, the app icon will be hidden from the Dock and only appear in the menu bar (macOS only)",
    hideMenuBarIcon: "Hide menu bar icon",
    hideMenuBarIconDesc: "Removes Alma from the menu bar. The Dock icon and the Quick Chat shortcut still open the app, so this cannot be combined with hiding the Dock icon",
    hideTrayIcon: "Hide system tray icon",
    hideTrayIconDesc: "Removes Alma from the system tray; the taskbar and the Quick Chat shortcut still open the app",
    trayDescription: "When enabled, clicking the close button will hide the app to system tray instead of exiting"
  },
  quickChat: {
    title: "Quick Chat",
    hideOnBlur: "Hide quick chat on blur",
    hideOnBlurDesc: "When enabled, the quick chat window hides automatically when it loses focus"
  },
  openWindow: "Open Settings Window",
  dataSecure: "All settings are saved locally in real-time. Your data is completely private and secure.",
  unsavedChanges: "Unsaved changes",
  allSaved: "All changes saved",
  saving: "Saving...",
  resetConfirm: "Are you sure you want to reset all settings to default values? This action cannot be undone.",
  resetFailed: "Failed to reset settings",
  exportFailed: "Failed to export settings",
  importFailed: "Failed to import settings",
  closeConfirm: "There are unsaved changes. Are you sure you want to close? Unsaved changes will be lost.",
  saveFailed: "Failed to save settings",
  saveError: "Failed to save settings",
  resetError: "Failed to reset settings",
  exportError: "Failed to export settings",
  importError: "Failed to import settings",
  importSettings: "Import Settings",
  exportSettings: "Export Settings",
  resetSettings: "Reset Settings",
  more: "More",
  loadingSettings: "Loading settings...",
  tabRenderError: "This settings page failed to load. The error has been reported — please try again or switch to another tab.",
  "interface": "Interface",
  responseSettings: "Response Settings",
  historySettings: "History Settings",
  soundEffects: "Sound Effects",
  soundEffectsCredit: "Inspired by <author>Ryo Lu</author>'s <project>ryOS</project>, thanks!",
  preview: "Preview",
  enableStreamingResponse: "Enable Streaming Response",
  enableMarkdownRendering: "Enable Markdown Rendering",
  autoSaveChatHistory: "Auto Save Chat History",
  encryptApiKeysStorage: "Encrypt API Keys Storage",
  enableApplicationPasswordProtection: "Enable Application Password Protection",
  changePassword: "Change Password",
  enableOperationLogging: "Enable Operation Logging",
  currentSession: "Current Session",
  clearActiveSessions: "Clear Active Sessions",
  loggingSettings: "Logging Settings",
  privacySettings: "Privacy Settings",
  enableAutomaticBackup: "Enable Automatic Backup",
  enableCloudSync: "Enable Cloud Sync",
  backupSettings: "Backup Settings",
  syncSettings: "Sync Settings",
  enableProxy: "Enable Proxy",
  proxySettings: "Proxy Settings",
  fontSettings: "Font Settings",
  layoutSettings: "Layout Settings",
  editorSettings: "Editor Settings",
  defaultSettings: "Default Settings",
  enableExperimentalFeatures: "Enable Experimental Features",
  defaultLocation: "Default Location",
  systemError: "Error",
  systemWarn: "Warning",
  systemInfo: "Info",
  systemDebug: "Debug",
  about: {
    title: "About",
    description: "Alma is a polished desktop orchestrator for AI providers, crafted by <author>yetone</author>.",
    version: "Current version",
    statusLabel: "Update status",
    checkUpdates: "Check for updates",
    checking: "Checking…",
    lastChecked: "Last checked",
    autoDownload: "Download updates automatically",
    autoDownloadDesc: "Download new versions in the background, then prompt to restart when ready.",
    never: "Never",
    unsupportedHint: "Auto-update is only available on packaged macOS & Windows builds.",
    status: {
      idle: "Idle",
      checking: "Checking for updates…",
      updateAvailable: "Update available!",
      upToDate: "You're already on the latest version.",
      downloading: "Downloading update…",
      downloaded: "Update downloaded. Restart to apply.",
      error: "Update failed",
      unsupported: "Auto-update not supported on this build."
    },
    feedback: "Send Feedback",
    feedbackDesc: "Help us improve Alma by sharing your thoughts, reporting bugs, or requesting features.",
    discord: "Discord Community",
    discordDesc: "Join our Discord server to connect with other users, get help, and stay updated.",
    joinDiscord: "Join Discord"
  },
  memory: {
    title: "Memory",
    description: "Manage AI memory and context settings",
    memoryFeature: "Memory Feature",
    enableMemory: "Enable Memory",
    enableMemoryDesc: "When enabled, the AI will remember important information from your conversations and use it to provide more personalized responses.",
    retrieval: "Memory Retrieval",
    autoRetrieve: "Auto Retrieve Memories",
    autoRetrieveDesc: "Automatically search and inject relevant memories before each conversation to provide context.",
    maxRetrievedMemories: "Max Retrieved Memories",
    maxRetrievedMemoriesDesc: "Maximum number of relevant memories to inject into the conversation context (1-20).",
    similarityThreshold: "Similarity Threshold",
    similarityThresholdDesc: "Minimum similarity score required for a memory to be retrieved. Higher values mean stricter matching.",
    looseMatch: "Loose (0%)",
    strictMatch: "Strict (100%)",
    queryRewriting: "Query Rewriting",
    queryRewritingDesc: "Use the tool model to optimize your message before searching memories. This transforms conversational queries into semantic search terms for better matching.",
    summarization: "Memory Summarization",
    autoSummarize: "Auto Summarize Conversations",
    autoSummarizeDesc: "Automatically extract and store important information from conversations as new memories.",
    embeddingModel: "Embedding Model",
    embeddingModelDesc: "The embedding model used for semantic search. Leave empty to use the default (text-embedding-3-small).",
    selectEmbeddingModel: "Select embedding model",
    searchEmbeddingModels: "Search embedding models...",
    defaultModel: "default",
    useDefaultEmbeddingModel: "Use default (text-embedding-3-small)",
    noEmbeddingModelsFound: "No embedding models found",
    localModels: "Local Models",
    downloadingModel: "Downloading model…",
    loadingModel: "Loading model into memory…",
    modelReady: "Local model ready",
    downloadFailed: "Model download failed",
    dimensions: "dimensions",
    embeddingModelChanged: "Embedding model has changed",
    rebuildRequired: "You need to rebuild all memory embeddings to use the new model. This will regenerate embeddings for all stored memories.",
    rebuildEmbeddings: "Rebuild Embeddings",
    manualRebuildDesc: "Manually regenerate all memory embeddings if needed.",
    rebuilding: "Rebuilding embeddings...",
    rebuildCompleted: "Embedding rebuild completed successfully!",
    rebuildFailed: "Embedding rebuild failed",
    starting: "Starting...",
    cancel: "Cancel",
    retry: "Retry",
    confirmEmbeddingChange: "Change Embedding Model?",
    confirmEmbeddingChangeDesc: "Changing the embedding model requires rebuilding all memory embeddings. This process may take some time depending on the number of memories. Do you want to continue?",
    requirements: "Requirements",
    requirementsDesc: "Memory features require an OpenAI provider with an API key configured for generating embeddings. Please ensure you have at least one OpenAI provider set up.",
    statistics: "Statistics",
    totalMemories: "Total Memories",
    autoGenerated: "Auto Generated",
    manuallyAdded: "Manually Added",
    addMemory: "Add Memory",
    addMemoryPlaceholder: "Enter a memory you want the AI to remember...",
    addMemoryButton: "Add Memory",
    adding: "Adding...",
    searchMemories: "Search Memories",
    searchPlaceholder: "Search by semantic similarity...",
    rewrittenAs: "Searched as:",
    searchResults: "Search Results",
    match: "match",
    memoryList: "Memory List",
    clearAll: "Clear All",
    clearAllConfirm: "Are you sure you want to delete all memories? This action cannot be undone.",
    loading: "Loading memories...",
    noMemories: "No memories yet. Memories will be automatically created from your conversations or you can add them manually.",
    auto: "Auto",
    manual: "Manual",
    permanent: "Permanent",
    temporary: "Temporary",
    permanentDesc: "Long-term memory that is unlikely to change (e.g., preferences, personal facts)",
    temporaryDesc: "Short-term memory that may become outdated (e.g., current projects, ongoing tasks)",
    accessedTimes: "Accessed {{count}} times",
    fromChat: "From chat",
    viewMessage: "View message",
    sleep: {
      title: "Memory Sleep",
      enable: "Enable nightly memory consolidation",
      enableDesc: "Once a day at the time below, dedupe the memory store: archive exact duplicates, drop expired temporary memories, and merge near-duplicate clusters. If your machine was off when the time hit, the cycle runs quietly the next time you start the app. Removed entries go to an archive you can restore.",
      summary: "{{archived}} archived · next: {{date}} {{time}}",
      time: "Sleep time",
      timeDesc: "Local time the cycle fires each day. 03:00 keeps it out of your way; pick whatever fits.",
      runNow: "Run sleep cycle now",
      running: "Running…",
      cancel: "Cancel",
      lastCycle: "Last cycle: {{status}} ({{trigger}})",
      examined: "Examined {{examined}} · archived {{exact}} exact, {{expired}} expired, {{similarity}} near-dup, {{llm}} LLM-merged",
      errorPrefix: "Error: {{message}}",
      retention: "Retention",
      temporaryTtl: "Temporary memory TTL (days)",
      temporaryTtlDesc: "Temporary memories older than this are archived if never accessed.",
      archiveRetention: "Archive retention (days)",
      archiveRetentionDesc: "Archived (soft-deleted) memories are purged after this. Restore stops working past this point.",
      advancedToggle: "Similarity & LLM merge tuning",
      similarityLabel: "Similarity merge threshold: {{percent}}%",
      similarityDesc: "Cosine similarity above this is treated as a near-duplicate and merged without LLM.",
      useLlm: "Use LLM to merge borderline near-duplicates",
      llmLowLabel: "LLM merge low bound: {{percent}}%",
      llmLowDesc: "Pairs above this and below the similarity merge threshold are sent to the memory tool model for a conservative merge decision.",
      llmBatchSize: "LLM batch size (memories per call)",
      llmBatchSizeDesc: "Maximum cluster size sent to the model in one merge prompt.",
      archiveSection: "Archived memories ({{total}})",
      noArchive: "No archived memories.",
      restore: "Restore",
      recentRuns: "Recent cycles ({{count}})",
      genericFailure: "Sleep cycle failed",
      failedToRun: "Failed to run sleep cycle",
      failedToRestore: "Restore failed",
      reason: {
        exact_dup: "Exact duplicate",
        expired: "Expired temporary",
        orphan: "Orphan",
        similarity_merge: "Near-duplicate (vector)",
        llm_merge: "Merged by LLM",
        manual: "Manual"
      },
      retry: "Retry",
      progressTitle: "Running sleep cycle",
      stage: {
        exact: "Removing exact duplicates…",
        expired: "Cleaning up expired temporary memories…",
        similarity: "Clustering near-duplicates…",
        purge: "Purging old archive entries…"
      },
      progressArchived: "Archived so far: {{exact}} exact · {{expired}} expired · {{similarity}} near-dup · {{llm}} LLM-merged",
      dedupAcrossUserIds: "Dedup across user namespaces",
      dedupAcrossUserIdsDesc: "When on, identical memories from different channel bridges (Slack, Discord, etc.) collapse into one. Turn off in shared multi-user setups where each namespace must keep its own copy.",
      exportSnapshot: "Export memory snapshot",
      exporting: "Exporting…",
      exportFailed: "Export failed",
      archivePage: "{{start}}–{{end}} of {{total}}",
      tokensUsed: "LLM tokens: {{input}} in / {{output}} out",
      previewCycle: "Preview next cycle",
      previewing: "Previewing…",
      previewArchive: "Would archive {{count}} memories",
      previewSynthesize: "Would synthesize {{count}} merged memories",
      previewSkipped: "Preview skipped: {{reason}}",
      previewClose: "Dismiss preview",
      restoreMergedNotice: 'This memory was previously folded into a merged entry that is still live: "{{content}}". You may want to delete that merged entry manually.',
      archiveChain: "→ {{visible}} (chain depth {{depth}})"
    }
  },
  prompts: {
    title: "Prompts",
    description: "Create quick prompts that can be triggered by typing / in the chat",
    add: "Add Prompt",
    edit: "Edit Prompt",
    "delete": "Delete Prompt",
    deleteConfirm: "Are you sure you want to delete this prompt?",
    name: "Name",
    namePlaceholder: "e.g., commit, review, explain",
    nameHint: "Trigger with /prompts:{name}. Only letters, numbers, hyphens, and underscores allowed.",
    nameRequired: "Name is required",
    nameFormatError: "Name can only contain letters, numbers, hyphens, and underscores",
    content: "Content",
    contentPlaceholder: "Enter the prompt content...",
    contentRequired: "Content is required",
    noPrompts: "No prompts yet",
    addFirst: "Add your first prompt to get started"
  },
  general: {
    title: "General",
    permissionRequest: {
      title: "Permission Request",
      autoApprove: "Auto-approve all tool requests",
      autoApproveDesc: "When enabled, all tool permission requests will be automatically approved without prompting. Use with caution."
    },
    analytics: {
      title: "Privacy",
      enable: "Enable anonymous analytics",
      enableDesc: "Send anonymous usage data to help improve Alma. No personal data or conversation content is collected. Disable to stop all telemetry."
    }
  },
  toolModel: {
    title: "Tool Model",
    description: "A fast model that maintains quality, used for thread title generation, memory operations, and other automated tasks.",
    selectModel: "Select Tool Model",
    noProviders: "No providers configured",
    noProvidersDesc: "Please configure at least one AI provider to use the tool model feature.",
    configureProviders: "Configure Providers",
    autoDetected: "Auto",
    autoDetectedDesc: "This model was automatically selected based on your configured providers. You can manually select a different model if preferred.",
    recommended: "Recommended",
    notConfigured: "Tool model not configured",
    notConfiguredDesc: "Configure a tool model for better thread titles and memory management.",
    configure: "Configure",
    memoryToolModel: "Memory Tool Model",
    memoryToolModelDesc: "Override the default tool model for memory operations. Leave empty to use the general tool model.",
    useDefault: "Use Default Tool Model",
    searchModels: "Search models...",
    noResults: "No models found",
    noModels: "No models available",
    test: "Test Model",
    testSuccess: "Test Passed",
    testFailed: "Test Failed",
    testTimedOut: "Test timed out — the model did not respond in time",
    testSlow: "Model Too Slow - Consider choosing a faster model",
    testUnusable: "Model Unusable - Response time is too long, please choose another model",
    testExpensive: "Model Too Expensive - High pricing will add up quickly, consider a cheaper model",
    generatedTitle: "Generated title",
    selectedTools: "Selected tools",
    totalTime: "Total time",
    cost: "Cost",
    ttft: "TTFT",
    tps: "TPS"
  },
  visionModel: {
    title: "Vision Model",
    description: "Off by default — images are sent straight to your main model, which is assumed to support vision. When on, if the main model can't read images they are first described by the selected vision model and the resulting text is passed to the main model.",
    selectModel: "Select a vision model",
    disable: "Disable (don't use a vision model)"
  },
  codingAgent: {
    title: "Coding Agent",
    description: "Choose which backend `coder` subagents use for Task tool code work.",
    selectLabel: "Default Coding Agent",
    auto: "Auto",
    autoDesc: "Prefer Claude Code when available, otherwise fall back to the built-in agent.",
    claudeCode: "Claude Code",
    claudeCodeDesc: "Use the locally installed Claude Code CLI directly.",
    builtin: "Built-in Agent",
    builtinDesc: "Use Alma's built-in subagent with the current chat model.",
    acpProviderGroup: "ACP Providers",
    acpProviderDesc: "Use a configured ACP provider such as Codex CLI or Gemini CLI.",
    manageProviders: "Manage Providers",
    noAcpProviders: "No ACP providers configured yet."
  },
  agents: {
    kicker: "Agent Crew",
    title: "Agents",
    tagline: "Delegate with intent",
    description: "Define a specialist roster for Alma. These managed agents sit above raw subagent types, so a subagent can hand work to Designer, Product Manager, Developer, Researcher, or Operator with a clearer brief and execution lane.",
    controlRing: "Control ring",
    controlRingDesc: "Turn orchestration on for the whole app, then decide whether spawned subagents may delegate to peers automatically.",
    enabled: "Enable managed agents",
    enabledDesc: "Expose the managed crew to Alma and Task routing.",
    allowDelegation: "Allow subagent-to-agent delegation",
    allowDelegationDesc: "Inject the roster into subagent prompts so they can hand work to other specialists.",
    subagentFast: "Fast for subagents",
    subagentFastDesc: "On models with a Fast tier. Fast uses plan limits faster.",
    subagentFastInherit: "Follow chat",
    subagentFastOff: "Off",
    subagentFastOn: "On",
    profileFast: "Fast",
    profileFastDesc: "On models with a Fast tier. The default follows “Fast for subagents” in the overview.",
    profileFastInherit: "Use subagent default",
    flowHint: "Runtime flow: parent assistant picks an agent profile -> Alma maps it to an execution mode -> the specialist prompt is injected -> that specialist may delegate further using agent_id.",
    providersCta: "Tune providers for stronger specialists",
    rosterTitle: "Crew roster",
    rosterDesc: "Choose a profile to inspect or edit its brief.",
    addCustom: "Custom",
    restoreBuiltIns: "Restore",
    disabledPill: "Paused",
    builtIn: "Built-in",
    custom: "Custom",
    resetBuiltIn: "Reset built-in",
    deleteAgent: "Delete agent",
    name: "Name",
    executionMode: "Execution mode",
    status: "Availability",
    availableForRouting: "Available for routing",
    availableForRoutingDesc: "Disabled agents stay in the roster but cannot be delegated to.",
    preferredModel: "Preferred model",
    preferredModelPlaceholder: "Inherit parent conversation model",
    preferredModelDesc: "Leave empty to inherit the parent conversation model.",
    preferredModelEffortDesc: "Reasoning models also take a thinking level here; leave it on the provider default to keep the current behavior.",
    reasoningEffort: "Reasoning effort",
    reasoningEffortDefault: "Provider default",
    searchModels: "Search models...",
    noModels: "No models found",
    useInheritedModel: "Inherit parent conversation model",
    modelDefaultsGroup: "Defaults",
    unavailableModelGroup: "Unavailable",
    summary: "Mission summary",
    summaryDesc: "One sharp sentence describing what this agent owns.",
    focusAreas: "Focus areas",
    focusAreasDesc: "One line per specialty so Alma can route work more confidently.",
    delegatesTo: "Can delegate to",
    delegatesToDesc: "These links become explicit handoff suggestions in the specialist prompt.",
    prompt: "Specialist prompt",
    promptDesc: "This brief is injected when the profile is invoked through Task agent_id routing.",
    previewTitle: "Routing preview",
    previewDesc: "This is the summary other agents will see when deciding whether to hand work to this specialist.",
    delegationGraph: "Delegation graph",
    noDelegates: "This specialist currently has no explicit handoff targets.",
    roleFit: "Role fit",
    stats: {
      active: "Active specialists",
      activeHint: "Profiles available for routing right now.",
      links: "Delegation links",
      linksHint: "Explicit handoff paths between specialists.",
      custom: "Custom profiles",
      customHint: "Additional roles beyond the built-in crew."
    }
  },
  channels: {
    title: "Channels"
  },
  providers: {
    title: "Providers",
    defaultSettings: "Default Settings",
    defaultModel: "Default Model",
    selectDefaultModel: "Select Default Model",
    defaultModelDescription: "This is the default model selected when starting new conversations",
    getStartedProvider: 'Click "Add Provider" to get started',
    deleteFailed: "Delete failed: ",
    aiProviders: "AI Providers",
    addProvider: "Add Provider",
    model: "Model",
    baseUrl: "Base URL",
    edit: "Edit",
    "delete": "Delete",
    noProvidersYet: "No Providers configured yet",
    addProviderToGetStarted: 'Click "Add Provider" to get started',
    defaultModelForNewChats: "This will be the default model for new chat sessions",
    deleteProviderConfirm: "Are you sure you want to delete this Provider?",
    searchProvidersPlaceholder: "Search providers...",
    pluginHint: "Can't find a provider? Install the plugin from the Plugins page first.",
    proxyEndpoints: {
      title: "API Proxy Endpoints",
      advanced: "Advanced",
      description: "Alma provides API proxy endpoints for {{providerName}}. These endpoints convert API requests to Chat Completions format, enabling compatibility with various AI tools.",
      responsesApi: {
        title: "OpenAI Responses API Proxy",
        tooltip: "Converts OpenAI Responses API requests to Chat Completions API",
        description: "Use this endpoint with tools that require OpenAI's Responses API (e.g., Codex). Requests will be converted to Chat Completions format."
      },
      anthropicApi: {
        title: "Anthropic Messages API Proxy",
        tooltip: "Converts Anthropic Messages API requests to Chat Completions API",
        description: "Use this endpoint with Anthropic-compatible tools. Requests will be converted to Chat Completions format."
      },
      claudeCodeHint: {
        title: "Use with Claude Code",
        description: "You can use this provider with Claude Code by setting the following environment variable:"
      }
    }
  },
  chat: {
    title: "Chat",
    chatParameters: "Chat Parameters",
    temperature: "Temperature",
    conservativeDesc: "Conservative (0.0)",
    balancedDesc: "Balanced (1.0)",
    creativeDesc: "Creative (2.0)",
    temperatureDesc: "Controls randomness of responses. Lower values produce more consistent replies, higher values produce more creative replies.",
    maxTokens: "Max Tokens",
    maxTokensDesc: "Maximum length limit for single response (1-8192)",
    showTokenUsage: "Show Token Usage",
    showTokenUsageDesc: "Display token consumption statistics for each conversation in the chat interface",
    streamingResponseDesc: "When enabled, AI replies will be displayed in real-time, otherwise wait for complete reply before displaying all at once",
    markdownRenderingDesc: "Automatically render Markdown formatted content in replies",
    singleDollarTextMath: "Render Single Dollar Sign Math",
    singleDollarTextMathDesc: "Enable rendering of inline math with single dollar signs (e.g., $x = y$). Disabled by default to avoid conflicts with regular dollar signs. See https://github.com/vercel/streamdown/issues/108",
    infographicEnabled: "Enable Infographic Visualization",
    infographicEnabledDesc: "When enabled, injects infographic guidance into the system prompt to encourage AI to generate visualizations. Disabling only removes the guidance; existing infographic blocks will still render normally.",
    autoCollapseReasoning: "Auto-collapse reasoning process",
    autoCollapseReasoningDesc: "When enabled, AI thinking process (e.g., DeepSeek-R1 <think> blocks) will be collapsed by default to keep the chat interface clean.",
    historyRetentionDays: "History Retention Days",
    historyRetentionDaysDesc: "Chat records older than the specified days will be automatically deleted (1-365 days)",
    autoCompact: {
      title: "Auto Compact",
      enable: "Enable Auto Compact",
      enableDesc: "Automatically compress conversation history when approaching the model's context window limit. This allows conversations to continue indefinitely without manual intervention.",
      threshold: "Compaction Threshold",
      thresholdEarly: "Early (5%)",
      thresholdLate: "Late (95%)",
      thresholdDesc: "When context usage exceeds this percentage, compression will be triggered. Lower values provide more buffer space, while higher values preserve more original content.",
      keepRecentMessages: "Keep Recent Turns",
      keepRecentMessagesDesc: "Number of recent turns to always keep in full. A turn is one of your messages plus every reply and tool call after it. Kept turns are not folded into the summary (2-20). If the recent turns alone exceed the budget, fewer are kept.",
      notification: "Context compacted",
      notificationDesc: "{{count}} messages have been summarized to free up context space.",
      summaryModel: "Compaction model",
      summaryModelDefault: "Same as conversation model (recommended)",
      summaryModelDesc: "Which model summarizes the conversation when compacting. Defaults to the current conversation model for the best summary quality — a small/cheap model produces poor summaries that lose context."
    },
    defaultToolSelection: {
      title: "Default Tool Selection",
      description: "Set the default tool selection for new conversations",
      auto: "Auto",
      autoDesc: "AI automatically determines which tools to use based on context",
      all: "All Tools",
      allDesc: "Enable all available tools for every conversation",
      none: "No Tools",
      noneDesc: "Disable tools by default (pure conversation mode)"
    },
    defaultSkillSelection: {
      title: "Default Skill Selection",
      description: "Set the default skill selection for new conversations",
      auto: "Auto",
      autoDesc: "AI automatically determines which skills to use based on context",
      all: "All Skills",
      allDesc: "Enable all available skills for every conversation",
      none: "No Skills",
      noneDesc: "Disable skills by default (pure conversation mode)"
    },
    autoSuggestions: {
      enable: "Enable Quick Reply Suggestions",
      enableDesc: "Show suggested quick replies after AI responses to help continue the conversation"
    },
    openLinksInApp: "Open links in the built-in browser",
    openLinksInAppDesc: "Links in replies open in the dock browser so you can verify sources without leaving Alma. Cmd/Ctrl+click always opens the system browser.",
    browserAutoPip: "Show picture-in-picture when the AI uses the browser",
    browserAutoPipDesc: "When the AI drives the built-in browser and its panel is out of view, a small floating window shows what it is doing. Turn off to stop it popping up; you can still open it by hand.",
    selectionActions: {
      title: "Ask about selected text",
      description: 'Custom buttons shown next to "Reference selection" when you select text in a message. One click sends the prompt with the selection attached as your question.',
      labelPlaceholder: "Button, e.g. What does this mean",
      promptPlaceholder: "Prompt sent with the selection, e.g. Explain what this means",
      add: "Add button"
    }
  },
  ui: {
    title: "User Interface",
    fontSettings: "Font Settings",
    fontFamily: "Font Family",
    fontFamilyDesc: "Select a font for the application interface. Leave as system default to use your OS font.",
    systemDefault: "System Default",
    fontSize: "Font Size",
    small: "Small",
    medium: "Medium",
    large: "Large",
    layoutSettings: "Layout Settings",
    interfaceDensity: "Interface Density",
    compact: "Compact",
    comfortable: "Comfortable",
    spacious: "Spacious",
    compactDesc: "More content",
    comfortableDesc: "Balanced layout",
    spaciousDesc: "More space",
    sidebarWidth: "Sidebar Width",
    editorSettings: "Editor Settings",
    showLineNumbers: "Show Line Numbers",
    showLineNumbersDesc: "Display line numbers in code blocks and text editing areas",
    wordWrap: "Word Wrap",
    wordWrapDesc: "Automatically wrap long text to avoid horizontal scrolling",
    showMinimap: "Show Minimap",
    showMinimapDesc: "Display minimap navigation on the right side of long code blocks",
    useSystemCaret: "Use System Caret",
    useSystemCaretDesc: "Use native system caret instead of custom animated caret in the input area",
    showEditDiffPreview: "Show Edit Diff Preview",
    showEditDiffPreviewDesc: "Render Edit/Write tool calls as full syntax-highlighted diffs. Disable on low-end hardware to reduce lag — a lightweight summary is shown instead.",
    toolCardDefaultExpand: "Tool Card Default Expand",
    toolCardDefaultExpandDesc: "Controls how tool cards are expanded by default during generation. SubAgent cards always auto-expand regardless of this setting.",
    toolCardExpandAuto: "Auto",
    toolCardExpandAutoDesc: "Edit/Write/Bash expanded",
    toolCardExpandAlways: "Always",
    toolCardExpandAlwaysDesc: "All tools expanded",
    toolCardExpandNever: "Never",
    toolCardExpandNeverDesc: "All tools collapsed",
    haptics: "Trackpad Haptics",
    hapticsDesc: "Feel a tick for every marker you sweep across on the conversation timeline rail (Force Touch trackpads only).",
    hapticsEnabled: "Enable haptic feedback",
    hapticsStyle: "Ratchet style",
    hapticStyle_edc: "EDC",
    hapticStyle_edc_desc: "Velocity-adaptive: deep detents when slow, fine teeth when fast, end stops at the edges",
    hapticStyle_single: "Single",
    hapticStyle_single_desc: "One crisp click per notch",
    hapticStyle_double: "Double",
    hapticStyle_double_desc: "A click with a lighter rebound",
    hapticStyle_engage: "Engage",
    hapticStyle_engage_desc: "A light catch, then the snap",
    hapticStyle_triple: "Triple",
    hapticStyle_triple_desc: "Two light taps rolling into the click",
    hapticStyle_soft: "Soft",
    hapticStyle_soft_desc: "The system's subtle alignment pulse",
    hapticsStrength: "Strength",
    hapticStrength_weak: "Light",
    hapticStrength_medium: "Medium",
    hapticStrength_strong: "Strong",
    hapticsPreviewHint: "Changes play a preview — keep a finger resting on the trackpad to feel them.",
    terminalSettings: "Terminal Settings",
    terminalFontFamily: "Font Family",
    terminalFontFamilyDesc: "Select a font from your system for the terminal",
    terminalFontSize: "Font Size",
    persistTerminals: "Persist Terminals",
    persistTerminalsDesc: "Keep terminal sessions alive when switching between chats",
    terminalCursorBlink: "Blink Cursor",
    terminalCursorBlinkDesc: "Make the terminal cursor blink",
    selectFont: "Select a font...",
    searchFonts: "Search fonts...",
    noFontsFound: "No fonts found",
    sidebarSettings: "Sidebar Settings",
    sidebarMode: "Sidebar Mode",
    sidebarSimple: "Simple",
    sidebarSimpleDesc: "Clean chronological list",
    sidebarGtd: "GTD",
    sidebarGtdDesc: "Status, labels & favorites",
    sidebarProject: "Projects",
    sidebarProjectDesc: "Grouped by workspace",
    manageLabels: "Manage Labels",
    addLabel: "Add Label",
    editLabel: "Edit Label",
    noLabels: "No labels created yet",
    labelDialogDesc: "Create a label to organize your conversations",
    labelName: "Label Name",
    labelNamePlaceholder: "e.g., Work, Personal, Research",
    labelColor: "Label Color",
    deleteLabelTitle: "Delete Label",
    deleteLabelDesc: "Are you sure you want to delete this label? Threads using this label will no longer be tagged with it."
  },
  network: {
    title: "Network",
    proxySettings: "Proxy Settings",
    enableProxy: "Enable Proxy",
    proxyType: "Proxy Type",
    proxyTypeSystem: "Follow system proxy",
    proxyTypeSystemHint: "Uses whatever proxy the system (or its PAC script) reports for each address, like a browser does — so a desktop proxy catches Alma without TUN/enhanced mode.",
    proxyServer: "Proxy Server",
    port: "Port",
    username: "Username (Optional)",
    password: "Password (Optional)",
    networkParameters: "Network Parameters",
    requestTimeout: "Request Timeout",
    seconds: "seconds",
    retryAttempts: "Retry Attempts",
    llmTimeouts: "AI Generation Timeouts",
    llmTimeout: "Time to first response (seconds)",
    llmTimeoutDesc: "How long to wait for the AI provider to start answering before giving up. Reasoning models behind a gateway can take minutes; the general request timeout above does not apply here. 0 = wait indefinitely. Default 300.",
    streamIdleTimeout: "Stream idle timeout (seconds)",
    streamIdleTimeoutDesc: 'Abort a generation when no data arrives for this long. 0 = automatic (60s text, 240s reasoning, 180s image, 300s scheduled tasks). Raise it if you see "Stream timed out" on a slow model.',
    requestLog: "Log network requests",
    requestLogDesc: "Write one line per HTTP attempt (URL host and path, timeout in force, time to headers, outcome) to network-requests.log in the app data folder. For diagnosing timeouts; no request bodies or keys are logged.",
    retryAttemptsDesc: "Number of automatic retries when requests fail (0-10)",
    customUserAgent: "Custom User-Agent (Optional)",
    customUserAgentPlaceholder: "Leave empty to use default",
    customUserAgentDesc: "Custom User-Agent identifier for HTTP requests",
    preferIpv4: "Prefer IPv4",
    preferIpv4Desc: "Force DNS resolution to use IPv4 addresses. Enable this if you experience 'fetch failed' errors due to unreachable IPv6 addresses.",
    testProxy: "Test Proxy",
    testingProxy: "Testing...",
    testProxySuccess: "Proxy OK · {{latency}} ms {{ip}}",
    testProxyFailed: "Proxy failed: {{message}}",
    testProxyUnknownError: "Unknown proxy test error",
    caCertPath: "Custom CA Certificate Bundle",
    caCertPathPlaceholder: "/path/to/corporate-ca-bundle.pem",
    caCertPathDesc: "PEM bundle for corporate networks behind TLS-intercepting proxies (e.g. Zscaler). Added on top of the system roots for all outbound connections. SSL_CERT_FILE / REQUESTS_CA_BUNDLE environment variables are used as fallback when empty."
  },
  webSearch: {
    title: "Web Search",
    searchEngine: "Search Engine",
    selectEngine: "Select Search Engine",
    xiaohongshu: "Xiaohongshu (RED)",
    xiaohongshuWarning: "Using Xiaohongshu search may result in account suspension, use at your own risk",
    engineDescription: "Choose which search engine to use for web searches. Google is recommended for general searches, while Xiaohongshu is useful for Chinese lifestyle and shopping content.",
    googleSettings: "Google Search Settings",
    googleSettingsDesc: "Open a browser window to configure Google search settings (language, region, SafeSearch, etc.). These settings will be used when WebSearch retrieves results.",
    openGoogleSettings: "Open Google Settings",
    xiaohongshuSettings: "Xiaohongshu Settings",
    xiaohongshuSettingsDesc: "Open a browser window to log in to Xiaohongshu and configure your account. Logging in helps get better search results and access personalized content.",
    openXiaohongshuSettings: "Open Xiaohongshu Settings",
    webFetchBrowser: "WebFetch Browser",
    webFetchBrowserDesc: "Open a browser window to log in to websites. After logging in, WebFetch can access content that requires authentication.",
    openWebFetchBrowser: "Open Browser",
    cookieManagement: "Cookie Management",
    cookieManagementDesc: "Import/export cookies to share login state with browser extensions like Cookie-Editor. This allows you to stay logged in on both Alma and your browser.",
    exportCookies: "Export",
    importCookies: "Import",
    clearCookies: "Clear",
    cookieExportSuccess: "Exported {{count}} cookies to clipboard",
    cookieExportError: "Failed to export cookies",
    cookieImportSuccess: "Imported {{count}} cookies successfully",
    cookieImportError: "Failed to import cookies",
    cookieImportEmpty: "No cookies found in clipboard. Copy cookies from Cookie-Editor first.",
    cookieClearSuccess: "Cleared {{count}} cookies",
    cookieClearError: "Failed to clear cookies"
  },
  mobileRelay: {
    title: "Remote Access",
    description: "Control this Alma from your phone. The desktop keeps an outbound connection to a relay server, so no port forwarding is needed.",
    relayConnection: "Relay connection",
    deviceName: "Device name",
    deviceNameHint: "How your phone and other devices list this computer. Leave empty to use the name from the system.",
    deviceNameSave: "Save",
    deviceNameSaved: "Saved",
    officialRelayHint: "Uses the Alma relay ({{host}}).",
    customRelayHint: "Uses your self-hosted relay ({{host}}).",
    selfHostedToggle: "Use a self-hosted relay",
    useOfficialRelay: "Switch back to the Alma relay",
    useThisRelay: "Use this relay",
    selfHostedHint: "Deploy your own relay (Docker or Cloudflare Workers) behind HTTPS, then enter its address. Paired phones follow this desktop's relay; re-pair after switching. If your relay sets a registration key, paste it as the token below.",
    selfHostedGuide: "Deployment guide",
    enable: "Enable",
    disable: "Disable",
    status: "Status",
    replaced: "Another Alma desktop signed in with this pairing and is now serving your phone. This one stays disconnected so the two don’t keep replacing each other.",
    reconnect: "Use this Mac",
    phones: {
      none: "No phone has connected yet — scan the code below with your phone.",
      unnamed: "Your phone",
      connectedNow: "Connected now",
      lastSeen: "Last seen {{when}}",
      justNow: "just now"
    },
    state: {
      stopped: "Off",
      connecting: "Connecting…",
      connected: "Connected",
      error: "Error",
      replaced: "Taken over"
    },
    pairTitle: "Pair your phone",
    pairDescription: "Scan with your phone camera to open Alma and connect, or paste the URL into Alma → Settings → Connection.",
    regenerate: "Regenerate",
    regenerateConfirm: "Regenerate the connect code? Paired phones will lose access until they re-pair.",
    firewallHint: "{{name}} is on, so a phone on the same Wi-Fi goes through the relay. Allow TCP {{port}} to connect directly:",
    secretHint: "This link grants full access to this Alma. Share it only with your own devices; regenerate it to revoke access.",
    e2eTitle: "End-to-end encryption",
    e2eDescription: "Encrypt all traffic between your phone and this Mac so the relay server only ever sees ciphertext. Changing this re-pairs your phone.",
    pairDescriptionE2E: "Scan with your phone camera to open Alma and connect over an encrypted channel. The QR code carries the secret key, so show it only to your own phone.",
    accountToken: "Alma account token",
    tokenSaved: "Saved",
    tokenHint: "The shared relay is free for all Alma users but needs your account token. Sign in, copy the token, and paste it here.",
    tokenPlaceholder: "Paste your relay token",
    saveToken: "Save",
    getToken: "Get a token from your Alma account",
    tokenRequired: "The relay needs a valid account token. Sign in to reconnect.",
    account: "Alma account",
    accountHint: "Sign in once to authorize this desktop. The relay is free for Alma users and requires an account token before your phone can connect.",
    signInGoogle: "Sign in with Google",
    reSignIn: "Sign in again",
    signedInAs: "Signed in as {{email}}",
    manualToken: "Paste a token manually",
    betaNotice: "The mobile app and pairing flow are still being built; expect breaking changes."
  },
  permissions: {
    title: "Permissions",
    heading: "System permissions",
    intro: "What Alma is allowed to see on this Mac. Each one can be changed any time in System Settings.",
    onboardingIntro: "Alma needs a couple of system permissions to do its best work. Grant them now, or later from Settings — your call.",
    local: "Everything stays on your machine. Alma only reads what it needs to answer your current question.",
    checking: "Checking permissions…",
    unknown: "Could not determine permission status.",
    noneRequired: "No permissions are needed on {{platform}}.",
    allSet: "All set.",
    grant: "Grant",
    pending: "Pending",
    "continue": "Continue",
    back: "Back",
    toastTitle: "Permissions granted",
    toastDesc: "Alma can now read your focused window and capture screen context.",
    items: {
      accessibility: {
        label: "Accessibility",
        description: "Lets Alma read the focused window so QuickChat can answer questions about whatever you’re looking at."
      },
      screen_recording: {
        label: "Screen Recording",
        description: "Lets Alma capture the active screen for visual context — needed for tools that look at images of the page or app."
      }
    }
  },
  data: {
    title: "Data",
    dataStorage: "Data Storage",
    dataStorageLocation: "Data Storage Location",
    selectLocation: "Select Location",
    dataStorageLocationDesc: "Storage location for application data, including chat history, configuration files, etc.",
    backupSettings: "Backup Settings",
    enableAutomaticBackup: "Enable Automatic Backup",
    backupFrequency: "Backup Frequency",
    dailyBackup: "Daily Backup",
    weeklyBackup: "Weekly Backup",
    monthlyBackup: "Monthly Backup",
    maxBackups: "Maximum Backups to Keep",
    maxBackupsDesc: "Old backups exceeding this number will be automatically deleted (1-30)",
    cloudSync: "Cloud Sync",
    experimentalFeature: "Experimental Feature",
    enableCloudSync: "Enable Cloud Sync",
    enableCloudSyncDesc: "Sync settings and partial data to the cloud to maintain consistency across different devices",
    syncProvider: "Sync Service Provider",
    selectSyncProvider: "Select Sync Service Provider",
    dataManagement: "Data Management",
    exportData: "Export Data",
    importData: "Import Data",
    selectExportData: "Select Data to Export",
    selectAll: "Select All",
    selectNone: "Select None",
    "export": "Export",
    selectExportDataDesc: "Choose which data to include in your backup file",
    selected: "selected",
    exportOption: {
      settings: "Settings",
      providers: "AI Providers",
      threads: "Chat History",
      promptApps: "Prompt Apps",
      prompts: "Quick Prompts",
      workspaces: "Projects",
      mcpServers: "MCP Servers",
      customThemes: "Custom Themes",
      memories: "Memories"
    },
    exportOptionDesc: {
      settings: "App preferences, appearance, and behavior settings",
      providers: "API keys and provider configurations",
      threads: "All conversation threads and messages",
      promptApps: "Custom prompt application configurations",
      prompts: "Quick slash command prompts",
      workspaces: "Project directories and preferences",
      mcpServers: "MCP server configurations",
      customThemes: "User-created color schemes",
      memories: "AI memory entries and context"
    },
    dangerousOperations: "Dangerous Operations",
    clearAllLocalData: "Clear All Local Data",
    clearAllLocalDataDesc: "This will delete all chat history, provider configurations, and application settings. This action cannot be recovered",
    clearDataConfirm: "Are you sure you want to clear all local data? This action cannot be recovered!\n\nThis will delete all chat history, provider configurations, and application settings.",
    clearDataNotImplemented: "Data clearing feature is pending implementation",
    exportFailed: "Failed to export data",
    importSuccess: "Data imported successfully",
    importFailed: "Failed to import data",
    rearview: {
      title: "Rearview",
      count: "{{count}} trails",
      description: "A local ledger of the system waypoints each run passed through — predefined locations only, never prompts, names, arguments, outputs or identity. ✓ = completion receipt, ! = explicit failure, ? = no reliable receipt. It stays on this machine; ask @Rearview in chat to explore it.",
      freeze: "Freeze snapshot",
      freezeHint: "Immutable plain text, public columns only — exactly what you could choose to share."
    }
  },
  usage: {
    title: "Usage",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",
    allTime: "All Time",
    totalCost: "Total Cost",
    messages: "Messages",
    inputTokens: "Input Tokens",
    outputTokens: "Output Tokens",
    cachedTokens: "Cached Tokens",
    cacheRead: "Cache Read",
    cacheWrite: "Cache Write",
    tokens: "Tokens",
    cost: "Cost",
    activityHeatmap: "Activity Heatmap",
    activityHeatmapDesc: "Your chat activity over the past year",
    messagesInPeriod: "messages in this period",
    tokensInPeriod: "tokens in the past year",
    costOverTime: "Cost Over Time",
    costOverTimeDesc: "Track your spending across the selected period",
    byProvider: "Usage by Provider",
    byProviderDesc: "Cost breakdown by AI provider",
    byModel: "Usage by Model",
    byModelDesc: "Top 10 models by cost",
    detailedStats: "Detailed Statistics",
    detailedStatsDesc: "Complete breakdown of usage by model",
    model: "Model",
    provider: "Provider",
    noData: "No usage data",
    noDataDesc: "Start chatting to see your usage statistics here",
    migratingData: "Optimizing usage data for faster loading...",
    migrationFailed: "Usage data optimization failed",
    includedInPlan: "Included",
    includedInPlanHint: "This plan bills by subscription, not per token, so these tokens add nothing to the total.",
    noPricingHint: "No unit price is known for this model, so its tokens are not counted in the total. Set one under the model's Options in Providers.",
    includedModelsNote: "{{count}} in plan",
    unpricedModelsNote: "{{count}} unpriced"
  },
  rtk: {
    title: "Token Savings",
    overview: "RTK Compression Overview",
    overviewDesc: "Token savings from RTK command output compression",
    tokensSaved: "Tokens Saved",
    commands: "Commands",
    avgSavings: "Avg Savings",
    inputTokens: "Input Tokens",
    outputTokens: "Output Tokens",
    avgTime: "Avg Time",
    dailySavings: "Daily Savings",
    dailySavingsDesc: "Tokens saved per day over the last 30 days",
    byCommand: "Savings by Command",
    byCommandDesc: "Top commands by total tokens saved",
    recentCommands: "Recent Commands",
    recentCommandsDesc: "Latest RTK-compressed command executions",
    time: "Time",
    command: "Command",
    saved: "Saved",
    reduction: "Reduction",
    noData: "No savings data yet",
    noDataDesc: "RTK will automatically compress tool output when Alma runs commands. Start a conversation and the savings will show up here.",
    ptcTitle: "Programmatic Tool Calling",
    ptcDesc: "Tokens kept out of the model's context by run_script (tool results processed in the sandbox)",
    ptcTokensSaved: "Tokens Saved",
    ptcRuns: "Scripts Run",
    ptcToolCalls: "Tool Calls",
    ptcResultTokens: "Results Processed"
  },
  security: {
    title: "Security",
    sandbox: "Command Sandbox",
    sandboxEnabled: "Enable Shell Command Sandbox",
    sandboxEnabledDesc: "Run shell commands in a sandboxed environment with restricted access to sensitive files and network. Helps prevent malicious commands from accessing sensitive data.",
    dataEncryption: "Data Encryption",
    encryptApiKeysStorageDesc: "Use local encryption algorithms to protect API keys and sensitive configuration information",
    accessControl: "Access Control",
    enableApplicationPasswordProtection: "Enable Application Password Protection",
    enableApplicationPasswordProtectionDesc: "Require password authentication when starting the application",
    changePassword: "Change Password",
    sessionTimeout: "Session Timeout",
    minutes: "minutes",
    sessionTimeoutDesc: "The application will automatically lock after this period of inactivity",
    loggingAndAudit: "Logging and Audit",
    logLevel: "Log Level",
    error: "Error",
    warn: "Warning",
    info: "Info",
    debug: "Debug",
    logLevelDesc: "Record application operations and error information to help troubleshoot issues",
    sessionManagement: "Session Management",
    currentSession: "Current Session",
    lastActivity: "Last Activity: Just now",
    clearAllSessions: "Clear All Sessions",
    privacySettings: "Privacy Settings",
    privacyCommitment: "Alma values your privacy protection. Here are our privacy commitments:",
    localDataStorage: "All data is stored on your local device",
    encryptedApiKeys: "API keys and sensitive information are encrypted and protected",
    noChatDataCollection: "We do not collect or upload your chat content",
    dataExportDelete: "You can export or delete all data at any time",
    viewPrivacyPolicy: "View Full Privacy Policy",
    currentPasswordPrompt: "Enter current password:",
    newPasswordPrompt: "Enter new password:",
    confirmPasswordPrompt: "Confirm new password:",
    passwordsNotMatch: "Passwords do not match",
    passwordUpdateNotImplemented: "Password update feature is pending implementation",
    clearSessionConfirm: "Are you sure you want to clear all login sessions? This will require re-login.",
    clearSessionNotImplemented: "Clear session feature is pending implementation"
  },
  keybindings: {
    title: "Keybindings",
    shortcuts: "Shortcuts",
    resetAll: "Reset All",
    none: "None",
    clear: "Clear shortcut",
    resetToDefault: "Reset to default",
    newChatThread: {
      label: "New Chat Thread",
      description: "Create a new chat thread"
    },
    sendMessage: {
      label: "Send Message",
      description: "Send the current message"
    },
    openSettings: {
      label: "Open Settings",
      description: "Open the settings window"
    },
    toggleSidebar: {
      label: "Toggle Sidebar",
      description: "Show or hide the sidebar"
    },
    toggleWhisper: {
      label: "Toggle Voice Input",
      description: "Start or stop voice recording"
    },
    nextThread: {
      label: "Next Thread",
      description: "Switch to the next chat thread"
    },
    previousThread: {
      label: "Previous Thread",
      description: "Switch to the previous chat thread"
    },
    goBack: {
      label: "Back",
      description: "Return to the previous page in history"
    },
    goForward: {
      label: "Forward",
      description: "Go to the next page in history"
    },
    quickChat: {
      label: "Quick Chat",
      description: "Open quick chat overlay window"
    },
    searchThreads: {
      label: "Open Search",
      description: "Open thread search modal"
    },
    pressKeys: "Press keys...",
    clickToRecord: "Click to record",
    resetKeybindingConfirm: "Reset all keybindings to default values?",
    tips: {
      title: "Tips",
      clickField: "Click on a keybinding field and press the desired key combination",
      useModifiers: "Use Cmd (⌘) on macOS or Ctrl on Windows/Linux for system shortcuts",
      escapeToCancel: "Press Escape while recording to cancel",
      backspaceToClear: "Press Backspace or Delete while recording to clear the shortcut",
      systemShortcuts: "Some system shortcuts may not be available or may be overridden"
    }
  },
  advanced: {
    title: "Advanced",
    experimentalFeatures: "Experimental Features",
    experimentalFeaturesWarning: "⚠️ Experimental features may be unstable, please backup important data before use",
    enableExperimentalFeatures: "Enable Experimental Features",
    enableExperimentalFeaturesDesc: "Enable new features in development that may contain bugs or unstable factors",
    developerOptions: "Developer Options",
    debugMode: "Debug Mode",
    debugModeDesc: "Enable detailed log output and error message display",
    developerMode: "Developer Mode",
    developerModeDesc: "Enable developer-specific features and debugging tools",
    openDevTools: "Open Developer Tools",
    customStyles: "Custom Styles",
    customCss: "Custom CSS",
    customCssPlaceholder: "/* Add custom CSS styles here */\n.chat-message {\n  font-size: 14px;\n}",
    customCssDesc: "Add custom CSS to personalize the application appearance",
    customJs: "Custom JavaScript",
    customJsPlaceholder: "// Add custom JavaScript code here\n// Please use carefully, incorrect code may cause application errors\nconsole.log('Custom script loaded');",
    customJsDesc: "Add custom JavaScript to extend application functionality (advanced users)",
    customJsWarning: "⚠️ Custom JavaScript may pose security risks, please ensure code sources are trusted",
    applicationManagement: "Application Management",
    restartApplication: "Restart Application",
    resetApplicationData: "Reset Application Data",
    applicationInfo: "Application Information",
    version: "Version: 0.0.1",
    buildTime: "Build Time: ",
    electron: "Electron: 30.0.1",
    nodejs: "Node.js: ",
    chrome: "Chrome: ",
    unknown: "Unknown",
    performanceMonitoring: "Performance Monitoring",
    memoryUsage: "Memory Usage",
    runtime: "Runtime",
    runtimeMinutes: "minutes",
    viewDetailedPerformanceReport: "View Detailed Performance Report",
    restartConfirm: "Are you sure you want to restart the application? Unsaved data may be lost.",
    resetDataConfirm: "Are you sure you want to reset application data? This will clear all settings and cache but keep provider configurations and chat history.",
    devToolsNotImplemented: "Developer tools feature is pending implementation"
  },
  whisper: {
    title: "Speech",
    description: "Enable speech-to-text input using local Whisper models",
    enableWhisper: "Enable Speech Input",
    enableWhisperDesc: "When enabled, you can use voice input in the chat by clicking the microphone button.",
    modelSelection: "Model Settings",
    selectedModel: "Active Model",
    selectModel: "Select a model",
    noModelsDownloaded: "No models downloaded",
    downloadModelFirst: "Please download at least one model to enable speech input.",
    language: "Recognition Language",
    languageDesc: "Select the language for speech recognition. Use 'Auto Detect' if you speak multiple languages.",
    availableModels: "Available Models",
    availableModelsDesc: "Download Whisper models for local speech recognition. Larger models are more accurate but require more storage and processing power.",
    download: "Download",
    deleteConfirm: "Are you sure you want to delete this model?",
    remaining: "remaining",
    calculating: "Calculating..."
  },
  mcp: {
    title: "MCP Servers",
    description: "Manage Model Context Protocol (MCP) servers for extended AI capabilities",
    marketplace: "Marketplace",
    installed: "Installed",
    searchPlaceholder: "Search MCP servers...",
    allCategories: "All Categories",
    noServersFound: "No MCP servers found",
    fetchError: "Failed to fetch MCP marketplace",
    verified: "Verified",
    featured: "Featured",
    by: "by",
    viewDocs: "View Documentation",
    install: "Install",
    installing: "Installing...",
    installServer: "Install MCP Server",
    installationMethod: "Installation Method",
    prerequisites: "Prerequisites",
    installMode: "Installation Mode",
    agentInstall: "Agent Install",
    manualInstall: "Manual Install",
    agentInstallDesc: "Let AI agent handle the installation automatically. It will verify prerequisites and configure everything for you.",
    manualInstallDesc: "Add the server configuration directly. You'll need to ensure prerequisites are installed.",
    requiredParams: "Required Parameters",
    optionalParams: "Optional Parameters",
    noServersInstalled: "No MCP servers installed",
    serversCount: "{{count}} server(s) installed",
    addServer: "Add Server",
    noServersHint: "Install servers from the Marketplace or add one manually",
    statusConnected: "Connected",
    statusConnecting: "Connecting",
    statusError: "Error",
    statusDisconnected: "Disconnected",
    connect: "Connect",
    deleteConfirmTitle: "Delete MCP Server",
    deleteConfirmDesc: 'Are you sure you want to delete "{{name}}"? This action cannot be undone.',
    editServer: "Edit MCP Server",
    editServerDesc: "Modify the server configuration",
    addServerDesc: "Add a custom MCP server configuration",
    serverName: "Server Name",
    serverNamePlaceholder: "My MCP Server",
    serverDescription: "Description",
    serverDescriptionPlaceholder: "Optional description",
    command: "Command",
    commandHint: "The command to start the MCP server",
    "arguments": "Arguments",
    argumentsPlaceholder: "arg1 arg2 arg3",
    argumentsHint: "Space-separated arguments for the command",
    envVars: "Environment Variables",
    envVarsHint: "One per line in KEY=value format",
    transportType: "Transport Type",
    urlHint: "The HTTP endpoint URL for the MCP server",
    remoteTransportType: "Transport Protocol",
    remoteTransportHint: "Streamable HTTP is recommended. Use SSE for servers that don't support Streamable HTTP.",
    headers: "Headers",
    headersHint: 'HTTP headers in "Key: Value" format, one per line',
    requiredFieldsError: "Name and command/URL are required",
    fromClipboard: "From Clipboard",
    invalidClipboardJson: "Invalid MCP server JSON in clipboard",
    oauth: {
      autoDetect: "OAuth 2.1 Supported",
      autoDetectHint: "If this server requires OAuth authentication, it will be detected automatically when you connect.",
      autoRedirectHint: "If this server requires OAuth, you'll be redirected to authorize after clicking Add.",
      requiresOAuth: "Requires OAuth",
      requiresOAuthHint: "Enable if this server requires OAuth 2.1 authorization",
      notAuthorizedYet: "Not authorized yet",
      checking: "Checking...",
      authorizing: "Authorizing...",
      noAuth: "No Auth",
      noAuthHint: "This server may not require OAuth, or hasn't been accessed yet",
      authorized: "Authorized",
      authorizedHint: "OAuth authorization is active",
      expiresAt: "Expires: {{date}}",
      scope: "Scope",
      needsReauth: "Needs Re-auth",
      needsReauthHint: "Token has expired, re-authorization required",
      error: "Auth Error",
      notAuthorized: "Not Authorized",
      notAuthorizedHint: "Connect to the server to trigger OAuth authorization",
      authorize: "Authorize",
      retry: "Retry",
      reauthorize: "Re-authorize",
      revoke: "Revoke Access",
      revokeConfirmTitle: "Revoke OAuth Access",
      revokeConfirmDesc: 'Are you sure you want to revoke OAuth access for "{{name}}"? You will need to re-authorize when connecting again.'
    },
    basicInformation: "Basic Information",
    commandConfiguration: "Command Configuration",
    remoteConfiguration: "Remote Configuration",
    endpointUrlDesc: "The HTTP endpoint URL for the MCP server",
    failedAddServer: "Failed to add server",
    failedSave: "Failed to save"
  },
  themeConfig: {
    title: "Color Scheme",
    "default": "Default (Built-in)",
    darkModeTheme: "Dark Mode Theme",
    darkModeThemeDesc: "Select a color scheme for dark mode. Choose 'Default' to use the built-in theme.",
    lightModeTheme: "Light Mode Theme",
    lightModeThemeDesc: "Select a color scheme for light mode. Choose 'Default' to use the built-in theme.",
    darkThemes: "Dark Themes",
    lightThemes: "Light Themes",
    searchPlaceholder: "Search themes...",
    noThemesFound: "No themes found matching your search.",
    themeCount: "{{dark}} dark themes, {{light}} light themes, {{custom}} custom themes available",
    customThemes: "Custom Themes",
    customThemesDesc: "Create and manage your own custom color schemes",
    createTheme: "Create Theme",
    noCustomThemes: "No custom themes yet. Click 'Create Theme' to get started.",
    customDarkThemes: "Custom Dark Themes",
    customLightThemes: "Custom Light Themes",
    pluginThemes: "Plugin Themes",
    pluginThemesDesc: "Themes provided by installed plugins",
    pluginDarkThemes: "Plugin Dark Themes",
    pluginLightThemes: "Plugin Light Themes",
    clearPluginTheme: "Clear",
    win98Trail: "Window drag trail",
    win98TrailDesc: "Classic Win98 easter egg: dragging the window leaves a pile of frozen-frame afterimages behind it."
  },
  themeEditor: {
    createTitle: "Create Custom Theme",
    createDescription: "Design your own color scheme with 30 UI colors and 16 syntax highlighting colors.",
    editTitle: "Edit Custom Theme",
    editDescription: "Modify your custom color scheme.",
    name: "Internal Name",
    displayName: "Display Name",
    type: "Type",
    dark: "Dark",
    light: "Light",
    cloneFrom: "Clone From",
    selectTheme: "Select a theme to clone...",
    darkThemes: "Dark Themes",
    lightThemes: "Light Themes",
    uiColors: "UI Colors",
    syntaxColors: "Syntax",
    "import": "Import/Export",
    preview: "Preview",
    groups: {
      backgrounds: "Background Colors",
      grays: "Gray & Text Colors",
      primary: "Primary Colors",
      ui: "UI Element Colors",
      base16Backgrounds: "Background Shades",
      base16Foregrounds: "Foreground Shades",
      base16Syntax: "Syntax Colors"
    },
    importLua: "Import from NvChad Lua",
    importPlaceholder: "Paste your NvChad theme Lua code here...",
    importButton: "Import",
    importSuccess: "Theme imported successfully",
    importFailed: "Failed to import theme. Please check the format.",
    exportJSON: "Export as JSON",
    exportDescription: "Copy the theme configuration as JSON to your clipboard.",
    copyJSON: "Copy to Clipboard",
    exportSuccess: "Theme copied to clipboard",
    cloneSuccess: "Cloned colors from {{name}}",
    nameRequired: "Please enter a theme name",
    displayNameRequired: "Please enter a display name",
    saveFailed: "Failed to save theme",
    createSuccess: "Custom theme created successfully",
    updateSuccess: "Custom theme updated successfully",
    deleteSuccess: "Custom theme deleted successfully",
    deleteTitle: "Delete Custom Theme",
    deleteDescription: 'Are you sure you want to delete "{{name}}"? This action cannot be undone.',
    simpleMode: "Simple",
    advancedMode: "Advanced",
    simpleModeDesc: "Pick 4 colors and we'll generate a complete theme for you.",
    presets: "Quick Start Presets",
    presetApplied: "Applied {{name}} preset",
    backgroundColor: "Background",
    backgroundColorDesc: "Main background color",
    foregroundColor: "Text",
    foregroundColorDesc: "Main text color",
    accentColor: "Accent",
    accentColorDesc: "Buttons, links, highlights",
    secondaryColor: "Secondary",
    secondaryColorDesc: "Success states, info",
    switchToAdvanced: "Switch to Advanced mode to fine-tune individual colors."
  },
  skills: {
    title: "Skills",
    description: "Manage Claude Skills for specialized AI capabilities",
    noSkills: "No skills found",
    skillsCount: "{{count}} skill(s) available",
    refresh: "Refresh",
    openFolder: "Open Folder",
    noSkillsHint: "No skills installed yet",
    addSkillsHint: "Add skills by placing SKILL.md folders in ~/.config/alma/skills/",
    bundledSkills: "Built-in Skills",
    personalSkills: "Personal Skills",
    claudeCodeSkills: "Claude Code Skills",
    agentsSkills: "Agent Skills",
    folders: {
      title: "Skill folders from other tools",
      description: "Alma also reads the skills you installed for these tools. Turn a folder off to stop loading its skills in Alma; the folder itself is left alone."
    },
    marketplaceSkills: "Marketplace Skills",
    projectSkills: "Project Skills",
    viewContent: "View Content",
    deleteConfirmTitle: "Delete Skill",
    deleteConfirmDesc: 'Are you sure you want to delete "{{name}}"? This action cannot be undone.',
    searchPlaceholder: "Search skills by name, description, or path... (/ or ⌘F)",
    noResults: "No skills match your search",
    extraction: {
      title: "Auto Skill Extraction",
      description: "Automatically extract reusable skills from long conversations",
      minToolCalls: "Minimum tool calls to trigger",
      minToolCallsHint: "Conversations with fewer tool calls will be skipped"
    }
  },
  hooks: {
    title: "Hooks",
    description: "Configure shell command hooks that run at lifecycle events. Hooks are stored as a JSON config file for easy editing.",
    noHooks: "No hooks configured",
    noHooksHint: "Add hook rules to run shell commands at lifecycle events.",
    addHooksHint: "Edit ~/.config/alma/hooks.json or add hooks below.",
    hooksCount: "{{count}} hook event(s) configured",
    addHookEvent: "Add Hook Event",
    addRule: "Add Rule",
    addCommand: "Add Command",
    matcher: "Matcher (regex)",
    matcherHint: "Regular expression to filter when this hook fires",
    command: "Command",
    commandHint: "Shell command to execute. Receives JSON on stdin.",
    timeout: "Timeout (ms)",
    enabled: "Enabled",
    reload: "Reload",
    openFile: "Open Config",
    deleteRule: "Delete Rule",
    deleteRuleConfirm: "Delete this rule?",
    deleteRuleDesc: "This will remove the rule and all its commands.",
    deleteCommand: "Delete Command",
    deleteCommandConfirm: "Delete this command?",
    deleteCommandDesc: "This will remove the command from the rule.",
    selectEvent: "Select hook event",
    protocol: "Exit code 0 = allow, 2 = block. JSON stdout can include decision, reason, updatedInput.",
    noCommands: "No commands in this rule",
    rules: "rule(s)",
    commands: "command(s)"
  },
  secrets: {
    title: "Secrets",
    description: "Encrypted tokens for third-party APIs and services the agent uses. Values are write-only — they are injected into agent shells as environment variables and redacted from all output; nothing here (or in the API) can read one back.",
    empty: "No secrets yet.",
    add: "Add secret",
    name: "Name",
    namePlaceholder: "GH_TOKEN",
    nameHint: "Env-var style: A–Z, digits, underscores. The agent sees it as $NAME.",
    value: "Value",
    valuePlaceholder: "Paste the token…",
    note: "Note",
    notePlaceholder: "What is this for? (optional)",
    envInject: "Inject into agent shells",
    envInjectHint: "When on, this secret is available to commands the agent runs as $NAME.",
    save: "Save",
    cancel: "Cancel",
    update: "Update value",
    "delete": "Delete",
    deleteTitle: "Delete secret?",
    deleteBody: "{{name}} will be removed. Commands that rely on ${{name}} will stop working.",
    unencrypted: "Stored without OS-level encryption (safeStorage unavailable on this system).",
    envOn: "env: on",
    envOff: "env: off",
    saved: "Secret saved",
    deleted: "Secret deleted",
    cliHint: "CLI: alma secret set <NAME> (value from stdin) · alma secret list · alma secret rm <NAME>"
  },
  imageGen: {
    title: "Image Generation",
    model: "Model",
    auto: "Auto",
    loading: "Loading available models…",
    noProvider: "No image models found. Enable an image model (Gemini, GPT Image, DALL·E, Flux…) on a provider under Providers.",
    loadError: "Failed to load image models.",
    unavailable: "Configured model not currently available:",
    description: "Model the image-gen skill (alma image generate / edit) uses — across Gemini and OpenAI-compatible providers (GPT Image, DALL·E…). Whatever you pick here is what generates, unless you name another model in a request. Auto lets Alma choose from the models you have enabled.",
    aspectRatio: "Aspect ratio",
    aspectRatioDescription: "Default shape for generated images. Can also be changed from the composer."
  },
  translateTo: {
    title: "Translate into",
    description: "The language the Translate action on selected text translates into. It is offered for text written in a different script.",
    auto: "Same as interface language"
  },
  windowsShell: {
    title: "Windows Shell",
    description: "Which shell the Bash tool uses to run commands. Auto prefers Git Bash when installed and falls back to PowerShell. PowerShell means PowerShell 7 (pwsh) when it is installed, otherwise the built-in Windows PowerShell 5.1.",
    auto: "Auto (Git Bash if installed)",
    gitbash: "Git Bash",
    powershell: "PowerShell (7 if installed)"
  },
  computerUse: {
    never: "never",
    justNow: "just now",
    minutesAgo: "{{n}}m ago",
    hoursAgo: "{{n}}h ago",
    daysAgo: "{{n}}d ago",
    helperNotFound: "✗ Helper binary not found. Run `pnpm build:computer-use`.",
    helperAlive: "✓ Helper v{{version}} alive (uptime {{uptime}}s)",
    axGranted: "✓ Accessibility permission granted",
    axMissing: "✗ Accessibility permission missing",
    srGranted: "✓ Screen Recording permission granted",
    srMissing: "✗ Screen Recording permission missing",
    title: "Computer Use",
    desc1: "Lets Alma drive native Mac apps in the background without stealing focus from your current app. Requires a signed helper (",
    desc2: ") and macOS permissions.",
    helperSection: "Helper",
    helperPathMissing: "(not found — run `pnpm build:computer-use`)",
    permissionsSection: "Permissions",
    accessibility: "Accessibility",
    screenRecording: "Screen Recording",
    focusGuardTitle: "Focus protection is not active",
    focusGuardBody: "Alma could not arm the guard that keeps apps from stealing your frontmost window while it works, so actions may pull your focus away. This usually means Accessibility needs to be granted again for the helper — macOS resets that for each new build. Re-grant it above, then retry.",
    triggerAxDialog: "Trigger AX dialog",
    testMySetup: "Test my setup",
    strictTitle: "Strict per-app approval",
    strictDesc: "When on, Alma blocks any new app until you explicitly approve it below. When off, any app is auto-approved on first use (you can still revoke later).",
    actionLogTitle: "Record action log",
    actionLogDesc: "Keeps a local rolling log of every Computer Use action (tool, app, args, duration) for debugging. Nothing leaves your Mac.",
    pipTitle: "Picture-in-picture",
    pipDesc: "A floating panel that mirrors the screen while Alma drives your desktop, so you can watch the whole run from any Space — even while working in another app.",
    approvedApps: "Approved apps",
    noApprovedApps: "No approved apps yet. The first time Alma drives an app, it'll appear here (auto-approved unless strict mode is on).",
    usedLast: "{{count}}× used · last {{last}}",
    revoke: "Revoke",
    revokeTitle: "Revoke approval?",
    revokeDesc1: "Alma will no longer be allowed to drive ",
    revokeDesc2: " until you approve it again."
  },
  activityRecorder: {
    justNow: "just now",
    minutesAgo: "{{n}}m ago",
    hoursAgo: "{{n}}h ago",
    daysAgo: "{{n}}d ago",
    title: "Activity Recorder",
    recording: "recording",
    screenLocked: "screen locked",
    desc: "Silently captures screenshots, OCRs them, and tracks input events so Chat can answer “what was I just doing?”. Nothing leaves your machine.",
    statSessions: "Sessions",
    statSnapshots: "Snapshots",
    statCurrentSession: "Current session",
    statFrontApp: "Front app",
    active: "active",
    idle: "idle",
    storageUsedLabel: "Storage used:",
    storageUsedOf: "of {{max}} ({{pct}}%)",
    autoDeleteHint: "old snapshots auto-deleted past cap",
    macosPermissions: "macOS Permissions",
    screenRecording: "Screen Recording",
    accessibilityLabel: "Accessibility (for global keyboard/mouse)",
    granted: "granted",
    notGranted: "not granted",
    captureSection: "Capture",
    snapshotDebounceLabel: "Snapshot debounce (ms)",
    snapshotDebounceHint: "Minimum gap between captures",
    heartbeatIntervalLabel: "Heartbeat interval (ms)",
    heartbeatIntervalHint: "Force capture this often even when idle",
    idleThresholdLabel: "Idle threshold (ms)",
    idleThresholdHint: "Close session after no input for this long",
    typingPauseLabel: "Typing pause (ms)",
    typingPauseHint: "Capture after N ms of no keypress",
    visualPollLabel: "Visual-change poll (ms)",
    visualPollHint: "Detect animations / video without input (0 = off)",
    jpegQualityLabel: "JPEG quality",
    jpegQualityHint: "1–100. Lower = smaller files",
    ocrInputSection: "OCR & Input",
    runOcrLabel: "Run Vision OCR on each snapshot",
    runOcrHint: "macOS only. Feeds the keyword + semantic search.",
    inputMonitorLabel: "Global keyboard & mouse monitor",
    inputMonitorHint: "Records click / keypress events. Requires Accessibility permission.",
    ocrLanguagesLabel: "OCR languages (Vision codes, comma-separated)",
    ocrEveryNLabel: "OCR every Nth snapshot",
    ocrEveryNHint: "1 = every snapshot, 5 = 1 in 5. Lower DB load for long sessions.",
    sensitiveAppsSection: "Sensitive apps (never captured)",
    sensitiveAppsHint: "One bundle ID per line. Captures are suppressed when any of these is frontmost.",
    storageQuotaSection: "Storage quota",
    maxStorageLabel: "Max storage (MB)",
    maxStorageHint: "Rotator deletes oldest snapshots past this cap. 10240 = 10 GB.",
    outputDirectory: "Output directory",
    tieringHint: "Aged snapshots are re-encoded as they move tiers (warm ≈1280×720 q40, cold ≈640×360 q30) so 10 GB holds weeks of history rather than days.",
    recentSessions: "Recent sessions",
    sessionFallback: "Session",
    sessionMeta: "{{when}} · {{duration}} · {{snapshots}} snapshots · {{events}} events",
    dangerZone: "Danger zone",
    dangerZoneHint: "Delete all recorded activity (sessions, screenshots on disk, OCR text, embeddings). Cannot be undone.",
    clearAllData: "Clear all activity data",
    deleteAllTitle: "Delete all activity data?",
    deleteAllDesc: "This removes all {{count}} sessions along with their events, screenshots, OCR text, and embeddings. The recorder itself stays configured. This cannot be undone.",
    deleteEverything: "Delete everything",
    runningFooter: "Running · recorder updates most knobs live; session / idle timer changes take effect on the next session.",
    openSystemSettings: "Open System Settings"
  },
  copilot: {
    failedGetDeviceCode: "Failed to get device code",
    failedStartAuth: "Failed to start authentication",
    failedSaveToken: "Failed to save token",
    failedGetAccessToken: "Failed to get access token",
    failedCompleteAuth: "Failed to complete authentication",
    addAnotherAccount: "Add another GitHub account",
    connectAccount: "Connect GitHub account",
    gettingCode: "Getting authorization code...",
    step1: "Step 1: Copy this code",
    requiredBadge: "Required",
    step2: "Step 2: Open GitHub & paste the code",
    openVerificationPage: "Open GitHub Verification Page",
    step3: "Step 3: Click here after authorizing",
    finalStepBadge: "Final step",
    authorizedButton: "I've Authorized on GitHub",
    completingAuth: "Completing authentication...",
    authError: "An error occurred during authentication",
    tryAgain: "Try Again",
    checkingAuth: "Checking authentication status...",
    authenticated: "Authenticated",
    signedInAs: "Signed in as @{{username}}",
    "switch": "Switch",
    addAccount: "Add Account",
    disconnect: "Disconnect",
    switchAccount: "Switch GitHub Account",
    active: "Active",
    connectedFooter: "Your GitHub Copilot subscription is connected. You can now use Copilot models in your chats.",
    accountsAvailable: "({{count}} accounts available)",
    authTitle: "GitHub Copilot Authentication",
    authDesc: "Connect your GitHub account to use models through your Copilot subscription. You'll need an active GitHub Copilot subscription.",
    useExistingAccount: "Use an existing account",
    use: "Use",
    or: "or",
    connectAnotherAccountTitle: "Connect Another GitHub Account",
    connectAccountTitle: "Connect GitHub Account"
  },
  appshots: {
    hintDoubleCommand: "Press both ⌘ keys together — or quickly tap ⌘ twice",
    hintDoubleOption: "Press both ⌥ keys together — or quickly tap ⌥ twice",
    hintDoubleShift: "Press both ⇧ keys together — or quickly tap ⇧ twice",
    hintBothCommand: "Press both ⌘ keys together. A double tap does nothing.",
    hintBothOption: "Press both ⌥ keys together. A double tap does nothing.",
    hintBothShift: "Press both ⇧ keys together. A double tap does nothing.",
    togetherOnly: "(together only)",
    helperUnreachable: "Computer Use helper unreachable: {{error}}",
    none: "None",
    heroTitle: "Take an appshot to show Alma your frontmost window",
    heroDesc1: "Appshots capture your frontmost window — both the visible pixels and the accessibility text outline — and attach it to the chat composer. From any app, either ",
    heroDescStrong: "press the two ⌘ keys together",
    heroDesc2: " or quickly tap the modifier twice. Alma comes forward with the snapshot already attached; the AX text rides invisibly into the message so the model sees the full window context.",
    unsupportedNotice: "Appshots requires macOS and the Alma Computer Use helper with Accessibility + Screen Recording permissions. Grant them in the Computer Use settings, then come back here to arm the hotkey.",
    hotkey: "Hotkey",
    noHotkey: "No hotkey configured — Appshots is off.",
    warmingUp: "Warming up Computer Use helper…",
    openAccessibilitySettings: "Open Accessibility settings",
    whereItLands: "Where it lands",
    currentThread: "Current thread",
    newThread: "New thread",
    whereDesc1: " (default) drops the appshot into whichever chat is already open, so you can keep the conversation going about the window you're inspecting. ",
    whereDesc2: " always opens a fresh chat for the appshot — Codex-style dedicated hotkey-window behaviour.",
    testIt: "Test it",
    testItDesc: "Trigger a capture of whatever Alma thinks is the user's frontmost window, ignoring the hotkey. Useful for verifying permissions.",
    captureNow: "Capture now"
  },
  channelBindings: {
    title: "Channel Workspace Bindings",
    desc: "Bind channels/chats to specific workspaces so tools (Bash, Read, Write) run in the correct project directory. Unbound channels use the global default workspace.",
    searchChannel: "Search {{label}}...",
    noChannelsFound: "No channels found. Type an ID manually below.",
    typeIdManually: "Or type ID manually...",
    workspace: "Workspace",
    selectWorkspace: "Select workspace..."
  },
  readAloud: {
    voiceChinese: "Chinese",
    voiceEnglish: "English",
    title: "Read Aloud (on-device)",
    desc: "A private, on-device voice reads replies and notifications. The voice (~160–320 MB) downloads the first time you turn one of these on, or you can download and test the voices below.",
    notAvailable: "On-device speech is not available on this platform.",
    autoReadReplies: "Auto-read chat replies",
    autoReadRepliesDesc: "Speak each assistant reply when it finishes.",
    readNotifications: "Read notifications aloud",
    readNotificationsDesc: "Speak background notifications as they arrive.",
    voices: "Voices",
    starting: "Starting…",
    preparingVoice: "Preparing the voice for first use…",
    downloadOf: "{{downloaded}} of {{total}}",
    installed: "Installed",
    notInstalled: "Not installed",
    loading: "Loading…",
    test: "Test",
    removeVoice: "Remove this voice",
    download: "Download"
  },
  chatUi: {
    enableStreamingSoundEffects: "Enable streaming sound effects",
    streamingSoundEffectsDesc: "Play synthesized sounds during AI response streaming",
    soundPreset: "Sound Preset",
    presetClassicDesc: "Warm triangle wave with gentle reverb",
    presetEtherealDesc: "Soft sine wave with spacious atmosphere",
    presetDigitalDesc: "Crisp square wave with minimal effects",
    presetRetroDesc: "Nostalgic sawtooth with warm filtering",
    presetHint: 'Choose a synth preset and click "{{preview}}" to hear it',
    volumeLabel: "Volume: {{volume}}%",
    adjustSynthVolume: "Adjust synth volume"
  },
  iosConnection: {
    bridgeUnavailable: "Native config bridge unavailable — is this the iOS app?",
    backendTitle: "Backend",
    localTitle: "On this device",
    localDesc: "Chats and API keys stay on this device. Works offline; no Mac needed.",
    remoteTitle: "Your Mac, over the relay",
    remoteDesc: "Drive the Alma running on your Mac from anywhere: Terminal, Computer Use, local MCP servers, your files.",
    statusTitle: "Status",
    reconnect: "Reconnect",
    pairTitle: "Pair with your Mac",
    step1: "On your Mac, open Settings → Remote Access and turn the relay on.",
    step2: "Point the Camera app at the QR code shown there, then tap the Alma banner.",
    pasteLabel: "Or paste the pairing link from your Mac",
    pastePlaceholder: "alma://connect?…",
    paste: "Paste",
    connect: "Connect",
    connecting: "Connecting…",
    invalidLink: "That doesn't look like an Alma pairing link or address.",
    unreachable: "Couldn't reach {{host}}. Is Alma running there?",
    lanHint: "On the same Wi‑Fi? Your Mac's LAN address works too, e.g. http://192.168.1.20:23001.",
    onboardingTitle: "Pair with your Mac",
    onboardingDesc: "This device drives the Alma running on your Mac. Pair once; the relay carries everything end-to-end encrypted."
  },
  claudeSubscription: {
    tomorrowAt: "tomorrow, {{time}}",
    failedStartAuth: "Failed to start authorization",
    failedGetTokens: "Failed to get tokens",
    failedCompleteAuth: "Failed to complete authentication",
    checkingAuth: "Checking authentication status...",
    authenticated: "Authenticated",
    connectedFallback: "Connected to Claude Pro/Max",
    logout: "Logout",
    usageQuota: "Usage Quota",
    loadingQuota: "Loading quota...",
    fiveHour: "5-hour",
    sevenDay: "7-day",
    opusSevenDay: "Opus 7-day",
    sonnetSevenDay: "Sonnet 7-day",
    resetsAt: "resets {{time}}",
    quotaLoadFailed: "Couldn't load quota — the usage endpoint may be rate limited. Try refreshing in a moment.",
    authTitle: "Claude Pro/Max Authentication",
    authDesc: "Connect your Anthropic account to use Claude models through your Pro or Max subscription. You'll be redirected to Anthropic's authorization page, then paste the code back here.",
    connectButton: "Connect Claude Pro/Max",
    enterCode: "Enter Authorization Code",
    stepBadge: "Step 2 of 2",
    enterCodeDesc: "After authorizing in your browser, copy the code from the page and paste it below.",
    codePlaceholder: "Paste authorization code here...",
    authError: "An error occurred during authentication",
    tryAgain: "Try Again"
  },
  themeUi: {
    basedOn: "Based on: {{name}}",
    pluginBadge: "Plugin",
    byAuthor: "by {{author}}"
  },
  providerIcon: {
    defaultIcon: "Default icon",
    searchIcons: "Search icons…",
    loadingIcons: "Loading icons…",
    noIconsFound: "No icons found"
  },
  networkUi: {
    hostPlaceholder: "e.g. 127.0.0.1",
    portPlaceholder: "e.g. 8080"
  },
  generalUi: {
    iconDefault: "Default",
    iconAlt: "Alt",
    injectScreenContext: "Inject live screen context",
    injectScreenContextDesc: "Each QuickChat message will include a fresh snippet of what's on screen (frontmost app, browser URL, latest OCR, last analyzed session). Requires the activity recorder to be enabled.",
    ambientMode: "Start in ambient (click-through) mode",
    ambientModeDesc: "QuickChat opens visible but ignores mouse events, so it floats over your work without grabbing focus. Press the QuickChat shortcut to wake it."
  },
  people: {
    title: "People Profiles",
    description: "Manage people profiles for cross-platform identity matching. Each person can have platform IDs (Telegram, Discord, Feishu) and a markdown profile.",
    searchPlaceholder: "Search people...",
    addPerson: "Add Person",
    newPerson: "New Person",
    loading: "Loading...",
    noSearchMatch: "No people match your search",
    noPeopleYet: "No people profiles yet",
    deletePersonTitle: "Delete Person",
    deletePersonDescription: 'Are you sure you want to delete "{{name}}"? This will remove their profile and avatar. This action cannot be undone.',
    cancel: "Cancel",
    "delete": "Delete",
    edit: "Edit",
    telegramId: "Telegram ID",
    discordId: "Discord ID",
    discordUsername: "Discord Username",
    feishuId: "Feishu ID",
    username: "Username",
    name: "Name",
    namePlaceholder: "Person name (used as filename)",
    telegramIdPlaceholder: "e.g. 403000703",
    discordIdPlaceholder: "e.g. 123456789",
    discordUsernamePlaceholder: "e.g. someone#1234",
    feishuIdPlaceholder: "e.g. ou_xxxxx",
    usernamePlaceholder: "e.g. someone",
    profileContent: "Profile Content",
    profileContentPlaceholder: "Markdown profile content...",
    avatar: "Avatar",
    uploadImage: "Upload Image",
    removeAvatar: "Remove Avatar",
    create: "Create",
    save: "Save"
  },
  weixin: {
    secondsAgo: "{{seconds}}s ago",
    minutesAgo: "{{minutes}}m ago",
    hoursMinutesAgo: "{{hours}}h {{minutes}}m ago",
    daysHoursAgo: "{{days}}d {{hours}}h ago",
    enableBot: "Enable WeChat Bot",
    enableBotDescription: "Connect Alma to WeChat for messaging",
    loggedIn: "Logged in",
    loggingOut: "Logging out...",
    logout: "Logout",
    scanQrHint: "Scan QR code with WeChat to log in",
    qrCodeAlt: "WeChat QR Code",
    waitingForScan: "Waiting for scan...",
    qrExpired: "QR code expired",
    refresh: "Refresh",
    generatingQr: "Generating QR code...",
    loading: "Loading...",
    retry: "Retry",
    showQrCode: "Show QR Code",
    defaultModel: "Default Model",
    defaultModelDescription: "AI model for WeChat conversations. Falls back to global default if not set.",
    selectModelPlaceholder: "Select model...",
    status: "Status",
    connection: "Connection",
    running: "Running",
    stopped: "Stopped",
    started: "Started",
    lastEvent: "Last Event",
    noEventsYet: "No events yet",
    debugLogs: "Debug Logs",
    botLog: "Bot Log",
    bridgeLog: "Bridge Log",
    conversationId: "Conversation ID",
    conversationIdPlaceholder: "e.g. wxid_xxxxx"
  },
  chromeRelay: {
    regenerateConfirm: "Are you sure you want to regenerate the auth token? Any connected extensions will need to be updated with the new token.",
    connectionStatus: "Connection Status",
    status: "Status",
    connected: "Connected",
    disconnected: "Disconnected",
    attachedTabs: "Attached Tabs",
    authToken: "Auth Token",
    copied: "Copied",
    copy: "Copy",
    regenerate: "Regenerate",
    tokenDescription: "This token is used to authenticate the Chrome extension with Alma. Keep it secret.",
    launchChrome: "Launch Chrome",
    launchDescription: "Start Chromium or Chrome for Testing with the relay extension preloaded; it connects automatically. Google Chrome 137+ no longer allows this, so install the extension there with the manual steps below.",
    launchUnsupported: "Google Chrome no longer loads extensions this way. Install it once with the manual steps below (Load unpacked); it stays installed after that.",
    launchNotFound: "No Chromium or Chrome for Testing was found. Install the extension manually with the steps below.",
    launchFailed: "Could not launch the browser. Install the extension manually with the steps below.",
    closeChromeFirst: "For best results, close all Chrome windows first.",
    launching: "Launching...",
    launchWithExtension: "Launch Chrome with Extension",
    manualInstall: "Manual Install",
    extensionPath: "Extension Path",
    loading: "Loading...",
    steps: "Steps",
    step1: "Copy the extension path above",
    step2: "Open Chrome and navigate to",
    step3Before: "Enable",
    step3After: "(toggle in the top-right corner)",
    step4Before: "Click",
    step4After: "and paste the extension path",
    step5: "Open the extension popup and enter the auth token shown above",
    tab: "Tab {{id}}",
    none: "(none)"
  },
  discord: {
    discordBot: "Discord Bot",
    enableBot: "Enable Discord Bot",
    enableBotDescription: "Connect Alma to Discord for server chat access",
    botToken: "Bot Token",
    createBotAt: "Create a bot at",
    enableIntentBefore: "Enable",
    enableIntentAfter: "intent in Bot settings.",
    defaultModel: "Default Model",
    defaultModelDescription: "The AI model used for Discord conversations. Falls back to Chat default model if not set.",
    selectModelPlaceholder: "Select a model...",
    accessControl: "Access Control",
    accessControlDescription: "Restrict which servers and channels Alma can interact with. Leave empty to allow all.",
    allowedServerIds: "Allowed Server IDs",
    allowedServerIdsDescription: "Only respond in these Discord servers. Right-click a server → Copy Server ID.",
    serverIdPlaceholder: "Server ID (e.g. 123456789)",
    add: "Add",
    allowedChannelIds: "Allowed Channel IDs",
    allowedChannelIdsDescription: "Only respond in these channels. Right-click a channel → Copy Channel ID.",
    channelIdPlaceholder: "Channel ID (e.g. 987654321)",
    mentionOnlyMode: "Mention-only Mode",
    mentionOnlyDescription: "Only respond when @mentioned, replied to, or DMed. Ignores all other messages.",
    setupGuide: "Setup Guide",
    setupStep1Before: "Go to",
    setupStep1After: "→ New Application",
    setupStep2: "Go to Bot tab → Copy Token → Paste above",
    setupStep3Before: "Enable",
    setupStep3After: "in Bot → Privileged Gateway Intents",
    setupStep4Before: "Go to OAuth2 → URL Generator → Select",
    setupStep4After: "scope",
    setupStep5: "Select permissions: Send Messages, Read Messages/View Channels, Attach Files, Add Reactions, Read Message History",
    setupStep6: "Copy the generated URL and open it to invite the bot to your server",
    channelId: "Channel ID",
    bindingChannelPlaceholder: "e.g. 987654321"
  },
  telegram: {
    noInactiveSessions: "No inactive Telegram sessions found.",
    scanFailed: "Scan failed",
    deletedInactiveSessions: "Deleted {{num}} inactive session(s).",
    cleanupFailed: "Cleanup failed",
    deleteByPatternConfirm: 'Delete ALL threads whose title contains "{{pattern}}"? This cannot be undone.',
    deletedThreadsWithSkipped: "Deleted {{num}} thread(s), skipped {{skipped}} (busy).",
    deletedThreads: "Deleted {{num}} thread(s).",
    batchDeleteFailed: "Batch delete failed",
    testMessageSent: "test message sent!",
    sendFailed: "token valid, but send failed: {{error}}",
    testFailed: "Test failed",
    connectionError: "Connection error",
    foundUsers: "Found {{num}} user(s)",
    noUsersFound: "No users found. Send a message to the bot first, then try again.",
    detectionFailed: "Detection failed",
    telegramBot: "Telegram Bot",
    enableBot: "Enable Telegram Bot",
    enableBotDescription: "Connect Alma to Telegram for mobile chat access",
    botToken: "Bot Token",
    getTokenFrom: "Get a token from",
    testing: "Testing...",
    sendTestMessage: "Send Test Message",
    allowedUserIds: "Allowed User IDs",
    allowedUserIdsDescription: "Only these Telegram users can interact with the bot. Leave empty to allow everyone. Send a message to the bot first, then click Detect to auto-discover user IDs.",
    userIdPlaceholder: "Telegram user ID",
    add: "Add",
    detecting: "Detecting...",
    detect: "Detect",
    detectedUsersHint: "Detected users (click to add):",
    defaultModel: "Default Model",
    defaultModelDescription: "The AI model used for Telegram conversations. New threads created via Telegram will use this model.",
    selectModelPlaceholder: "Select a model...",
    chatId: "Chat ID",
    chatIdPlaceholder: "e.g. 123456789",
    sessionCleanup: "Session Cleanup",
    sessionCleanupDescription: "Remove leftover Telegram threads. Inactive sessions are threads that were superseded and are no longer bound to any chat.",
    foundInactivePrefix: "Found",
    foundInactiveSuffix: "inactive session(s). Delete them?",
    "delete": "Delete",
    cancel: "Cancel",
    clearing: "Clearing…",
    clearInactiveSessions: "Clear Inactive Sessions",
    batchDeleteByTitle: "Batch Delete by Title",
    batchDeleteDescription: 'Delete all threads whose title contains the text below (e.g. "Telegram:").',
    patternPlaceholder: "e.g. Telegram:",
    deleteMatching: "Delete Matching"
  },
  providersUi: {
    remoteSignIn: {
      title: "Sign in to {{name}}",
      description: "Alma is running on a server without a browser, so you sign in here, on this computer.",
      openStep: "Open the sign-in page and sign in",
      openButton: "Open sign-in page",
      copyLink: "Copy link",
      copied: "Copied",
      copyFailed: "Could not copy the link",
      pasteStep: "Paste the address you land on",
      pasteHint: "After signing in, your browser goes to {{host}} and shows a page that can't be reached. That's expected: copy that page's full address from the address bar and paste it here.",
      finish: "Finish sign-in",
      waiting: "Alma connects as soon as you've signed in."
    },
    versionHintBefore: "Some providers require a version path (e.g.",
    versionHintAfter: ") at the end of the URL. If requests fail, try appending one.",
    capVision: "Vision",
    capVisionTooltip: "Supports image input",
    capImage: "Image",
    capImageTooltip: "Can generate images",
    capTools: "Tools",
    capToolsTooltip: "Supports function calling",
    capToolsXmlTooltip: "Supports function calling via XML middleware",
    capReasoning: "Reasoning",
    capReasoningTooltip: "Extended thinking/reasoning",
    capEmbedding: "Embedding",
    capEmbeddingTooltip: "Embedding model for vector generation",
    contextWindowTooltip: "{{tokens}} token context window",
    quotaResetNow: "now",
    unknownModel: "Unknown Model",
    manualBadge: "Manual",
    providerOptionsTooltip: "Provider Options",
    searchModelsPlaceholder: "Search models...",
    noModelFound: "No model found.",
    fetchModelsFailed: "Failed to fetch models",
    providerOptionsMustBeObject: "Provider options must be a JSON object",
    invalidJson: "Invalid JSON syntax",
    customHeadersMustBeObject: "Custom headers must be a JSON object",
    invalidJsonHeaders: "Invalid JSON syntax in custom headers",
    extraBodyMustBeObject: "Extra body must be a JSON object",
    invalidJsonExtraBody: "Invalid JSON syntax in extra body",
    saveOptionsFailed: "Failed to save options",
    testFailed: "Test failed",
    customAcpShort: "Custom ACP",
    addCustomAcpProvider: "Add Custom ACP Provider",
    custom: "Custom",
    addCustomProvider: "Add Custom Provider",
    active: "Active",
    inactive: "Inactive",
    unknownError: "Unknown error",
    enableProvider: "Enable Provider",
    baseUrl: "Base URL",
    asyncImageGeneration: "Asynchronous image generation",
    asyncImageGenerationHint: "Enable for providers that return a task ID and require status polling, such as ModelScope or ToAPIs.",
    imageGenerationRequestMode: "Image generation request mode",
    imageGenerationRequestModeHint: "Override the provider default for this model.",
    imageGenerationModeInherit: "Follow provider setting",
    imageGenerationModeSync: "Synchronous",
    imageGenerationModeAsync: "Asynchronous",
    ollamaBaseUrlHint: "Leave empty to use the default Ollama endpoint (http://localhost:11434/v1)",
    gettingStarted: "Getting Started:",
    ollamaEnsureRunning: "Make sure Ollama is installed and running locally.",
    installLabel: "Install:",
    pullModelLabel: "Pull a model:",
    runLabel: "Run:",
    command: "Command",
    commandPlaceholder: "e.g., claude-code-acp, gemini, codex",
    cliCommandHint: "The CLI command to spawn the ACP agent",
    argumentsLabel: "Arguments",
    argsPlaceholder: "e.g., --acp --experimental-acp",
    argsHint: "Command line arguments (space-separated)",
    authenticationMethod: "Authentication Method",
    selectAuthMethodPlaceholder: "Select authentication method",
    noneSkipAuth: "None (skip authentication)",
    selectAuthMethodHint: "Select an authentication method for this ACP agent",
    apiProvider: "API Provider",
    selectApiProviderPlaceholder: "Select API provider",
    noneUseAnthropicDirectly: "None (use Anthropic directly via claude login)",
    usesProviderKeyClaudeCode: "Uses this provider's API key and base URL for Claude Code",
    runClaudeLoginHint: "Run `claude login` to authenticate with Anthropic directly",
    runAgyLoginHint: "Run `agy` once in a terminal and sign in with Google (Antigravity CLI: https://antigravity.google/cli). Alma launches the agy-acp adapter, which reuses that login.",
    agyTermsCaveat: "Google's FAQ states that driving Antigravity through third-party tools may violate its Terms of Service. Use at your own risk.",
    noCompatibleProvidersAnthropic: "No compatible providers configured. Add any provider (Anthropic, OpenAI, DeepSeek, OpenRouter, etc.) first.",
    modelMapping: "Model Mapping",
    mapClaudeTiers: "Map Claude model tiers to {{name}} models",
    defaultModelLabel: "Default Model",
    selectDefaultModel: "Select default model",
    opusModel: "Opus Model",
    selectOpusModel: "Select opus model",
    sonnetModel: "Sonnet Model",
    selectSonnetModel: "Select sonnet model",
    haikuModel: "Haiku Model",
    selectHaikuModel: "Select haiku model",
    subagentModel: "Subagent Model",
    selectSubagentModel: "Select subagent model",
    noneUseBuiltinAuth: "None (use built-in authentication)",
    usesProviderKeyCodex: "Uses this provider's API key and base URL for Codex",
    usesBuiltinCodexAuth: "Uses built-in Codex authentication method",
    noCompatibleProvidersOpenai: "No compatible providers configured. Add an OpenAI, OpenRouter, or other OpenAI-compatible provider first.",
    mcpServers: "MCP Servers",
    disabledBadge: "Disabled",
    selectMcpServersHint: "Select MCP servers the ACP agent can access",
    installation: "Installation:",
    installNoSetupBefore: "No setup needed — Alma auto-fetches the agent via",
    installNoSetupAfter: "on first use. To skip that one-time download, you can install the CLI globally:",
    apiKey: "API Key",
    enterApiKeyPlaceholder: "Enter your API key",
    getApiKeyFrom: "Get your API key from",
    apiProxyEndpoint: "API Proxy Endpoint (Optional)",
    copilotProxyHint: "For inference requests only. Leave empty to use the default GitHub Copilot endpoint.",
    baseUrlOptional: "Base URL (Optional)",
    defaultEndpointHint: "Leave empty to use the default {{name}} API endpoint",
    apiHost: "API Host",
    azureEndpointHint: "Your Azure OpenAI resource endpoint URL",
    responseApi: "Response API",
    azureResponseApiHint: "Use Azure OpenAI Responses API instead of Chat Completions API",
    apiVersion: "API Version",
    azureApiVersionHint: "Leave empty to use default (2024-08-01-preview)",
    zaiEndpointHint: "Z.AI Coding Plan endpoint (default: https://api.z.ai/api/coding/paas/v4)",
    kimiEndpointHint: "Kimi Coding Plan endpoint (default: https://api.kimi.com/coding/v1)",
    opencodeEndpointHint: "OpenCode Go subscription endpoint; model protocols are selected automatically.",
    accountId: "Account ID",
    findInDashboardHint: "Find it in Cloudflare Dashboard → AI → AI Gateway",
    gatewayId: "Gateway ID",
    gatewayUrlAuto: "Gateway URL (auto-generated)",
    gatewayUrlHint: "Auto-constructed from Account ID and Gateway ID above. The provider suffix (e.g. /openai) is added automatically per model.",
    deployments: "Deployments",
    models: "Models",
    fetch: "Fetch",
    deploymentNamePlaceholder: "Deployment name (e.g., gpt-4o)",
    modelIdAcpPlaceholder: "Model ID (e.g., opus, gpt-5-codex-low)",
    modelIdPlaceholder: "Model ID (e.g., gpt-4o)",
    displayNamePlaceholder: "Display Name (optional)",
    add: "Add",
    azureAddDeploymentsHint: "Add your Azure OpenAI deployment names",
    manualAddHint: "Manually add model IDs if auto-discovery fails",
    searchDeploymentsPlaceholder: "Search deployments...",
    loadingModels: "Loading models...",
    errorLabel: "Error:",
    showingDeploymentsEnabledFirst: "Showing {{num}} deployments (enabled first)",
    showingModelsEnabledFirst: "Showing {{num}} models (enabled first)",
    showingModelsEnabledShownFirst: "Showing {{num}} models (enabled models shown first)",
    noModelsAvailable: "No models available",
    checkApiKeyHint: "Please check your API key and try refreshing",
    providerName: "Provider Name",
    providerNamePlaceholder: "Provider name",
    icon: "Icon",
    apiFormat: "API Format",
    apiFormatHint: "Choose the API endpoint format your provider uses",
    useMaxCompletionTokens: "Use max_completion_tokens",
    maxCompletionTokensHint: "Enable for newer OpenAI models (o1, o3, etc.) that require max_completion_tokens instead of max_tokens",
    customHeadersJson: "Custom Headers (JSON)",
    customHeadersHint: "Optional HTTP headers to send with each request (must be valid JSON format).",
    addModelsManuallyHint: "Add models manually or use Fetch to load from API",
    fetchingModels: "Fetching models...",
    pluginBadge: "Plugin",
    connected: "Connected",
    notConnected: "Not Connected",
    loggedOutSuccess: "Logged out successfully",
    logoutFailed: "Logout failed",
    logout: "Logout",
    authSuccess: "Authentication successful",
    authFailed: "Authentication failed",
    connecting: "Connecting...",
    connect: "Connect",
    connectedAccounts: "Connected Accounts ({{num}})",
    quotasRefreshed: "Quotas refreshed",
    refreshQuotasFailed: "Failed to refresh quotas",
    refreshQuotasTitle: "Refresh quotas",
    accountAdded: "Account added successfully",
    addAccountFailed: "Failed to add account",
    adding: "Adding...",
    addAccount: "Add Account",
    accountFallback: "Account {{id}}",
    quotaDetails: "Quota Details",
    rateLimited: "Rate limited",
    rateLimitResets: "(resets in {{minutes}} min)",
    accountRemoved: "Account removed",
    removeAccountFailed: "Failed to remove account",
    cannotRemoveOnlyAccount: "Cannot remove the only account. Use Logout to disconnect.",
    removeAccount: "Remove account",
    availableModels: "Available Models",
    noModelsConnectFirst: "No models available. Connect first to see available models.",
    pluginIdLabel: "Plugin ID:",
    authTypeLabel: "Auth Type:",
    myCustomProviderPlaceholder: "My Custom Provider",
    iconPickHint: "Pick a brand icon for this provider. Custom providers are marked with a *.",
    cancel: "Cancel",
    addProvider: "Add Provider",
    myCustomAcpProviderPlaceholder: "My Custom ACP Provider",
    argumentsOptional: "Arguments (optional)",
    note: "Note:",
    acpNote: "ACP providers spawn local CLI processes. Make sure the command is installed and accessible in your PATH. You can configure MCP servers after creating the provider.",
    modelOptions: "Model Options",
    configureOptionsFor: "Configure options for",
    modelCapabilities: "Model Capabilities",
    resetToDefault: "Reset to Default",
    overrideCapabilitiesHint: "Override the auto-detected capabilities for this model",
    reasoningLevels: "Thinking levels",
    reasoningLevelsHint: "The levels this model's API accepts. The reasoning menu offers only these.",
    reasoningLevelsMapping: "Levels you leave off are sent as:",
    imageOutput: "Image Output",
    toolCalling: "Tool Calling",
    autoSuffix: "(auto)",
    contextWindow: "Context Window",
    autoValue: "Auto: {{value}}",
    maxOutputTokens: "Max Output Tokens",
    pricing: "Unit Price",
    pricingUnit: "USD per 1M tokens",
    pricing_input: "Input",
    pricing_output: "Output",
    pricing_cacheRead: "Cache read",
    pricing_cacheWrite: "Cache write",
    pricingUnknown: "Unknown",
    providerOptionsJson: "Provider Options (JSON)",
    exampleLabel: "Example:",
    disableReasoningExampleHint: "to disable reasoning for models like doubao-seed-1.8",
    perModelHeadersHint: "Sent with requests for this model only — merged over the provider-level Custom Headers (same key wins here).",
    extraBodyJson: "Extra Body (JSON)",
    extraBodyExampleBefore: "Merged into every request body for this model. Example:",
    or: "or",
    extraBodyExampleAfter: "to turn off <think> output on reasoning models.",
    save: "Save",
    acpAuth: {
      googleAccount: "Google Account",
      googleAccountDesc: "Login with your Google account",
      geminiApiKey: "Gemini API Key",
      geminiApiKeyDesc: "Requires GEMINI_API_KEY env var",
      chatgptLogin: "ChatGPT Login",
      chatgptLoginDesc: "Use your ChatGPT login (requires paid subscription)",
      codexApiKey: "Codex API Key",
      codexApiKeyDesc: "Requires CODEX_API_KEY env var",
      openaiApiKey: "OpenAI API Key",
      openaiApiKeyDesc: "Requires OPENAI_API_KEY env var"
    },
    providerDescriptions: {
      openai: "OpenAI models including GPT-5.2, o3, and GPT-4o",
      anthropic: "Claude models from Anthropic",
      gemini: "Google Gemini AI models",
      deepseek: "DeepSeek AI models with reasoning capabilities",
      moonshot: "Moonshot AI (Kimi) models with long context support",
      zaiCodingPlan: "Z.AI (Zhipu) GLM models subscription plan - powered by GLM-4.7",
      kimiCodingPlan: "Kimi For Coding - Anthropic-compatible API with K2 models",
      opencodeGo: "OpenCode Go subscription models with automatic OpenAI/Anthropic protocol routing",
      openrouter: "Access hundreds of AI models through OpenRouter unified API",
      azure: "Microsoft Azure OpenAI Service with enterprise features",
      copilot: "Access AI models through your GitHub Copilot subscription (requires OAuth)",
      claudeSubscription: "Access Claude models through your Anthropic Pro/Max subscription (requires OAuth)",
      claudeCodeAcp: "Claude Code agent via ACP protocol - spawns local Claude Code process",
      geminiAcp: "Gemini CLI agent via ACP protocol - spawns local Gemini process",
      antigravityAcp: "Antigravity CLI (agy) via the agy-acp ACP adapter - Google's successor to Gemini CLI for personal Google accounts",
      codexAcp: "OpenAI Codex CLI agent via ACP protocol - spawns local Codex process",
      ollama: "Run open-source LLMs locally with Ollama",
      cloudflareAiGateway: "Proxy AI providers through Cloudflare AI Gateway for caching, rate limiting & analytics"
    }
  }
};
const main$2 = {
  configureProvider: "Please configure at least one AI provider to start chatting",
  heroTitle: "Where shall we begin?",
  heroSubtitle: "An idea, a half-thought, a paste — Alma takes it from there.",
  inputPlaceholder: "Type something. Anything.",
  send: "Send",
  suggestionsLoading: "Reading the room…",
  connectToStartIOS: "Connect to your Mac — or configure a provider — to start chatting",
  openConnection: "Set up Connection"
};
const languageSwitcher$2 = {
  placeholder: "Language"
};
const speech$2 = {
  button: "Voice Input",
  startRecording: "Click to start voice input",
  stopRecording: "Click to stop recording",
  processing: "Processing speech...",
  modelNotDownloaded: "Speech model not downloaded. Go to Settings > Speech to download.",
  noAudioData: "No audio data captured",
  microphoneDenied: "Microphone access denied. Please enable in System Settings > Privacy & Security > Microphone.",
  microphonePermissionRequired: "Microphone permission is required for voice input."
};
const titlebar$2 = {
  minimize: "Minimize",
  maximize: "Maximize",
  close: "Close"
};
const share$2 = {
  title: "Share Conversation",
  selectMessages: "{{selected}} of {{total}} messages selected",
  selectAll: "Select All",
  deselectAll: "Deselect All",
  user: "User",
  assistant: "Assistant",
  includeHeader: "Include header",
  includeTimestamp: "Include timestamps",
  preview: "Preview",
  previewHint: "Scroll to zoom, drag to pan",
  noMessagesSelected: "No messages selected",
  saveAsPng: "Save as PNG",
  copyToClipboard: "Copy to Clipboard",
  savedToFile: "Image saved successfully",
  copiedToClipboard: "Image copied to clipboard",
  exportFailed: "Failed to export image",
  copyFailed: "Failed to copy image",
  generatedBy: "Generated by Alma"
};
const label$2 = {
  dialog: {
    addTitle: "Add Label",
    addDesc: "Create a label to organize your conversations",
    editTitle: "Edit Label",
    editDesc: "Update the label name or color",
    name: "Label Name",
    namePlaceholder: "e.g., Work, Personal, Research",
    color: "Label Color"
  }
};
const common$2 = {
  ok: "OK",
  cancel: "Cancel",
  save: "Save",
  "delete": "Delete",
  confirmDelete: "Click again to confirm",
  edit: "Edit",
  dragToReorder: "Drag to reorder",
  add: "Add",
  close: "Close",
  back: "Back",
  next: "Next",
  loading: "Loading...",
  error: "Error",
  success: "Success",
  unknown: "Unknown error",
  failed: "Failed",
  required: "Required",
  refresh: "Refresh",
  created: "Created",
  updated: "Updated",
  create: "Create",
  update: "Update",
  selectPreset: "Select preset...",
  enable: "Enable",
  disable: "Disable",
  confirm: "Confirm",
  stop: "Stop",
  copy: "Copy",
  copied: "Copied",
  learnMore: "Learn more",
  optional: "optional",
  quote: "Quote",
  toggleTheme: "Toggle theme",
  searchThreads: "Search threads",
  clearAll: "Clear All",
  noData: "No data available",
  "continue": "Continue",
  title: "Title",
  description: "Description",
  dragToResize: "Drag to resize",
  previous: "Previous",
  search: "Search",
  dismissNotification: "Dismiss notification",
  removeQuote: "Remove quote",
  working: "Working",
  dismiss: "Dismiss",
  clear: "Clear",
  submit: "Submit",
  input: "Input",
  saving: "Saving…",
  closeEsc: "Close (Esc)"
};
const phone$2 = {
  drawer: {
    pinned: "Pinned",
    today: "Today",
    yesterday: "Yesterday",
    previous7Days: "Previous 7 days",
    previous30Days: "Previous 30 days",
    empty: "No conversations yet",
    onThisPhone: "On this device",
    localSub: "Chats stay on device",
    noPeer: "Not paired",
    viaRelay: "via relay, end-to-end encrypted",
    connectedToMac: "Connected to your Mac",
    connecting: "Connecting…",
    offline: "Offline",
    tapToReconnect: "Tap to reconnect",
    cantReach: "Can't reach your Mac",
    deleteTitle: "Delete this chat?"
  }
};
const sidebar$2 = {
  settingsWindowOpen: "Settings is open — bring it to the front",
  expand: "Expand Sidebar",
  collapse: "Collapse Sidebar",
  unreadCompletion: "Finished — unread",
  toggle: "Toggle Sidebar",
  newChat: "New Chat",
  settings: "Settings",
  gallery: "Gallery",
  soundEffects: "Sound Effects",
  contextMenu: {
    rename: "Rename",
    copyId: "Copy thread ID",
    shareWithTeam: "Share with team",
    stopSharingWithTeam: "Stop sharing with team",
    sharedWithTeam: "Shared with the team",
    stoppedSharingWithTeam: "No longer shared with the team",
    favorite: "Add to Favorites",
    unfavorite: "Remove from Favorites",
    pinFavorite: "Add to Project Card",
    unpinFavorite: "Remove from Project Card",
    incognito: "Enable Incognito",
    disableIncognito: "Disable Incognito",
    selectMode: "Select Mode",
    "delete": "Delete"
  },
  pinned: {
    title: "Pinned",
    empty: "Right-click a thread and choose Pin to sidebar",
    pin: "Pin to sidebar",
    unpin: "Unpin from sidebar",
    replaceTitle: "Choose a pinned thread to replace"
  },
  selectionMode: {
    selected: "{{count}} selected"
  },
  batchDeleteConfirm: {
    title: "Delete Selected Threads",
    description: "Are you sure you want to delete {{count}} selected threads? This action cannot be undone."
  },
  renameDialog: {
    title: "Rename Thread",
    placeholder: "Enter new title",
    cancel: "Cancel",
    save: "Save"
  },
  deleteConfirm: {
    title: "Delete Thread",
    description: "Are you sure you want to delete this thread? This action cannot be undone."
  },
  gtd: {
    favorites: "Favorites",
    status: "Status",
    labels: "Labels",
    inbox: "Inbox",
    todo: "To Do",
    inProgress: "In Progress",
    done: "Done",
    archived: "Archived",
    setStatus: "Set Status",
    setLabels: "Set Labels",
    showMore: "Show {{count}} more",
    showLess: "Show less",
    selectMode: "Select Mode",
    selected: "{{count}} selected",
    selectAll: "Select All",
    deselectAll: "Deselect All",
    batchActions: "Batch Actions",
    moveToStatus: "Move to Status",
    toggleLabel: "Toggle Label",
    deleteSelected: "Delete Selected",
    batchDeleteTitle: "Delete Selected Threads",
    batchDeleteDesc: "Are you sure you want to delete {{count}} selected threads? This action cannot be undone.",
    addLabel: "Add Label",
    addLabelDesc: "Create a new label to organize your threads.",
    labelName: "Label Name",
    labelNamePlaceholder: "Enter label name",
    labelColor: "Label Color",
    noLabelsHint: "Click or right-click to add a label",
    renameLabel: "Rename Label",
    deleteLabel: "Delete Label",
    editLabel: "Edit Label",
    editLabelDesc: "Edit the label name and color.",
    deleteLabelTitle: "Delete Label",
    deleteLabelDesc: "Are you sure you want to delete this label? Threads with this label will not be deleted.",
    autoTagged: "Alma tagged this To Do",
    summarize: "Have Alma read this conversation",
    summarizeSelected: "Have Alma read these conversations",
    summarizeQueued: "Queued — Alma will read them in the background"
  },
  project: {
    uncategorized: "Uncategorized",
    working: "Working...",
    showAll: "Show all · {{count}} more",
    showRecent: "Show recent only"
  },
  hideExternalChats: "Hide External Chats",
  showExternalChats: "Show External Chats"
};
const windowControls$2 = {
  minimize: "Minimize",
  maximize: "Maximize",
  restore: "Restore",
  close: "Close",
  fullscreen: "Enter Full Screen",
  exitFullscreen: "Exit Full Screen"
};
const errors$2 = {
  failedToCreateThread: "Failed to create thread",
  failedToLoadModels: "Failed to load models",
  failedToOpenSettings: "Failed to open settings",
  failedToLoadProviders: "Failed to load providers",
  failedToDeleteProvider: "Failed to delete provider",
  failedToToggleProvider: "Failed to toggle provider status",
  failedToStopGeneration: "Failed to stop generation",
  generationError: "Generation error",
  chatError: "Chat error",
  apiServerNotAvailable: "API server not available",
  networkError: "Network error",
  streamingError: "Streaming error",
  noResponseBody: "No response body",
  webSocketNotAvailable: "WebSocket connection not available",
  invalidSettingsFormat: "Invalid settings file format"
};
const warnings$2 = {
  threadNotFound: "Thread not found"
};
const gallery$2 = {
  title: "Gallery",
  empty: "No images yet",
  openGallery: "Open Gallery"
};
const capture$2 = {
  title: "Capture Window",
  background: "Background",
  padding: "Padding",
  shadow: "Shadow",
  privacy: "Privacy",
  privacyHint: "Redact thread titles in the sidebar",
  transparent: "Transparent",
  customImage: "Custom image",
  customColor: "Custom color",
  changeImage: "Change image…",
  retake: "Retake",
  copy: "Copy",
  save: "Save…",
  copied: "Copied to clipboard",
  saved: "Saved",
  reveal: "Show in Finder",
  failed: "Capture failed",
  panTool: "Move",
  redactTool: "Redact areas",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  zoomReset: "Reset view",
  regionHint: "Click a dashed suggestion, or drag to redact an area",
  regionSuggestion: "Click to redact",
  regionRemove: "Click to remove redaction",
  undo: "Undo",
  redo: "Redo",
  styleMosaic: "Mosaic",
  styleBlur: "Blur",
  styleSolid: "Blackout",
  solidColor: "Bar color",
  sourceAuto: "Detected areas",
  sourceAutoHint: "Click a detected area to mask it",
  sourceDraw: "Draw",
  sourceDrawHint: "Drag to mask any area, including part of a detected one",
  regionHintDraw: "Drag to mask any area — detected areas stay out of the way"
};
const liveCoding$2 = {
  title: "Live Coding",
  musicSnippet: "Music Snippet",
  play: "Play",
  stop: "Stop",
  openInEditor: "Open in Editor",
  shareToChat: "Share to Chat",
  bpm: "BPM",
  help: "Help",
  ready: "Ready",
  initializing: "Initializing...",
  playing: "Playing...",
  helpTitle: "Live Coding Help",
  helpDescription: "Quick reference for Strudel live coding patterns",
  keyboardShortcuts: "Keyboard Shortcuts",
  evaluateAndPlay: "Evaluate & Play",
  basicPatterns: "Basic Patterns",
  basicDrumPattern: "Basic drum pattern: kick, snare, hihat, snare",
  melodicPattern: "Melodic pattern with notes",
  repeatPattern: "Repeat 4 times per cycle",
  miniNotation: "Mini Notation",
  groupElements: "Group elements",
  repeatN: "Repeat n times",
  slowN: "Slow down by n",
  rest: "Rest/silence",
  alternate: "Alternate each cycle",
  random: "Random 50% chance",
  effects: "Effects",
  lowPassFilter: "Low-pass filter",
  highPassFilter: "High-pass filter",
  volume: "Volume (0-1)",
  decay: "Decay time",
  pan: "Stereo position (-1 to 1)",
  speed: "Playback speed",
  transformations: "Transformations",
  speedUp: "Speed up by n",
  slowDown: "Slow down by n",
  reverse: "Reverse pattern",
  sometimes: "Apply 50% of the time",
  stack: "Play patterns together",
  examples: "Examples",
  houseBeat: "House Beat:",
  synthMelody: "Synth Melody:",
  resources: "Resources",
  strudelDocs: "Full documentation at: https://strudel.cc/learn"
};
const onboarding$2 = {
  audioCheck: {
    title: "Ready to Experience?",
    description: "This experience includes ambient music and visuals. Are you in an environment where you can play sound, or do you have headphones on?",
    withSound: "Play with Sound",
    muted: "Continue Silently"
  }
};
const updater$2 = {
  title: "Software Update",
  description: "A new version is available",
  badge: "Update",
  badgeRestart: "Restart to update",
  skipVersion: "Skip This Version",
  updateAvailable: "Update available",
  currentVersion: "Current Version",
  latestVersion: "Latest Version",
  changelog: "What's New",
  downloading: "Downloading...",
  downloadNow: "Download Now",
  incremental: "Incremental",
  downloadComplete: "Download complete! Ready to install.",
  downloadFailed: "Download failed. Please try again.",
  retry: "Retry",
  restartNow: "Restart Now",
  restarting: "Restarting…",
  restartConfirm: {
    title: "Restart to Apply Update?",
    description: "The update has been downloaded. Would you like to restart the application now to apply the update?",
    restart: "Restart Now",
    later: "Later"
  }
};
const promptApps$2 = {
  title: "Prompt Apps",
  create: "New App",
  edit: "Edit Prompt App",
  "delete": "Delete",
  manage: "Manage Prompt Apps",
  run: "Run",
  empty: "No prompt apps yet",
  emptyHint: "Create a prompt app to get started",
  deleteConfirm: "Are you sure you want to delete this prompt app?",
  editor: {
    icon: "Icon",
    name: "Name",
    namePlaceholder: "My Prompt App",
    description: "Description",
    descriptionPlaceholder: "A brief description of what this app does",
    enabled: "Enabled",
    expectsImageResult: "Expects Image Result",
    expectsImageResultHint: "Auto-retry up to 10 times if result contains no image",
    incognito: "Incognito Mode",
    incognitoHint: "Disable memory features for threads created by this app",
    modelConfig: "Model Configuration",
    model: "Model",
    selectModel: "Select a model",
    useDefault: "Use default model",
    modelHint: "Leave empty to use the default model when running this app.",
    tools: "Tools",
    reasoning: "Reasoning",
    noAdvancedFeatures: "This model does not support advanced features like tools or reasoning.",
    template: "Prompt Template",
    templatePlaceholder: "Enter your prompt template here. Use {{placeholder_name}} for dynamic values.",
    templateHint: "Use {{placeholder_name}} syntax to add dynamic placeholders that users can fill in.",
    placeholders: "Placeholders",
    addPlaceholder: "Add",
    noPlaceholders: "No placeholders configured. Add one to make your prompt dynamic.",
    shortcut: "Global Shortcut",
    shortcutPlaceholder: "Click to set",
    shortcutHint: "Set a global keyboard shortcut to quickly launch this app. Press Backspace to clear.",
    fontSize: "Font Size",
    fontSizeDefault: "Default",
    fontSizeHint: "Set a custom font size for this prompt app window."
  },
  placeholder: {
    name: "Variable Name",
    type: "Type",
    label: "Display Label",
    placeholderText: "Placeholder Text",
    required: "Required",
    options: "Options (one per line)",
    min: "Min",
    max: "Max",
    accept: "Accept (MIME types)",
    multiple: "Allow Multiple",
    defaultValue: "Default Value",
    defaultChecked: "Default Checked",
    text: "Text",
    textarea: "Textarea",
    select: "Select",
    number: "Number",
    checkbox: "Checkbox",
    date: "Date",
    image: "Image",
    file: "File"
  },
  runner: {
    generate: "Generate",
    generating: "Generating...",
    regenerate: "Regenerate",
    pleaseWait: "Please wait while AI processes your request...",
    result: "Result",
    openThread: "Open",
    viewInChat: "View in Chat →",
    preview: "Preview",
    emptyPreview: "Fill in the fields above to see preview",
    noPlaceholders: "This prompt app has no input fields.",
    selectOption: "Select an option",
    selectedFiles: "Selected",
    clickToUpload: "Click to upload",
    orDragDrop: "or drag and drop",
    anyFile: "Any file type",
    addMore: "Add more",
    pasteHint: "PNG, JPG, GIF, WebP • Paste from clipboard supported",
    pasteToAdd: "Paste from clipboard to add more images",
    clickToReplace: "Click image to replace",
    retrying: "Retrying for image ({{count}}/{{max}})...",
    maxRetriesReached: "No image generated after maximum retries"
  },
  history: {
    title: "History",
    empty: "No execution history yet",
    emptyHint: "Run this app to create history",
    openChat: "Open Chat",
    rerun: "Re-run with these values",
    deleteConfirm: "Delete this execution record?",
    attachments: "attachments",
    threadDeleted: "Thread deleted",
    showPrompt: "Show generated prompt"
  },
  enterTopic: "Enter topic...",
  typeHere: "Type here..."
};
const artifact$2 = {
  panel: {
    title: "Artifact Preview"
  },
  viewMode: {
    preview: "Preview",
    code: "Code"
  },
  actions: {
    copy: "Copy to clipboard",
    download: "Download file",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit fullscreen"
  },
  types: {
    code: "Code",
    html: "HTML",
    react: "React Component",
    markdown: "Markdown",
    mermaid: "Mermaid Diagram",
    svg: "SVG Image"
  }
};
const fileExplorer$2 = {
  contextMenu: {
    copy: "Copy",
    cut: "Cut",
    paste: "Paste",
    rename: "Rename",
    revealInFinder: "Reveal in Finder",
    revealInExplorer: "Reveal in File Explorer",
    copyRelativePath: "Copy Relative Path",
    copyAbsolutePath: "Copy Absolute Path",
    newFolder: "New Folder",
    "delete": "Delete",
    deleteConfirm: 'Are you sure you want to delete "{{name}}"?'
  },
  newFolderDialog: {
    title: "New Folder",
    placeholder: "Enter folder name",
    cancel: "Cancel",
    create: "Create"
  },
  renameDialog: {
    title: "Rename",
    placeholder: "Enter new name",
    cancel: "Cancel",
    save: "Save"
  },
  showHiddenFiles: "Show hidden files",
  hideHiddenFiles: "Hide hidden files",
  filter: "Filter files",
  filterPlaceholder: "Filter by name or path…",
  clearFilter: "Clear filter",
  noMatches: "No files match",
  collapseAll: "Collapse all folders",
  expandAll: "Expand all folders",
  resultLimit: "Showing the first {{count}} matches. Refine your search to narrow the results."
};
const projectCard$2 = {
  brief: "What this project is",
  briefPlaceholder: "One or two sentences — its long-term purpose.",
  focus: "Current focus",
  focusPlaceholder: "Where the work stands right now.",
  resume: "Resume from",
  resumeEmpty: "Nothing to resume from yet. Pick the thread, message or object you'll come back to.",
  resumeSearchPlaceholder: "Search threads/messages/objects, or paste an alma:// link…",
  addResume: "Add pointer",
  starred: "Added threads",
  runConfig: "Run configuration",
  residents: "Resident collaborators",
  defaults: "Defaults",
  boundary: "Boundary (only these allowed)",
  templates: "Completion templates",
  tools: "tools",
  models: "models",
  agents: "agents",
  configHint: "Edit via: alma project config set <id> --json '{…}' (user shell)",
  pendingProposal: "Alma proposed an update — confirm or dismiss (your confirmed card is untouched until you accept)",
  proposalWaiting: "Alma suggested an update to this project card",
  accept: "Accept",
  dismiss: "Dismiss",
  proposalAccepted: "Proposal applied",
  proposalDismissed: "Proposal dismissed",
  saved: "Project card saved",
  invalidUri: "Enter an alma:// URI",
  uriCopied: "Reference copied — paste it into a message",
  close: "Close",
  confirmSave: "Confirm & save",
  open: "Project card",
  draftIntro: "New project? The card is still empty.",
  draftOpenConsult: "Have Alma draft it in Consult",
  changeIcon: "Change icon",
  searchEmoji: "Search emoji",
  useLetterIcon: "Use the letter instead",
  fromApp: "Choose from installed apps",
  fromWebsite: "Use a website’s icon",
  siteUrlPlaceholder: "Website address, e.g. github.com",
  siteHint: "Enter a website address and press Enter to fetch its icon.",
  loadingSiteIcon: "Fetching icon…",
  noSiteIcon: "Couldn’t find an icon for this site. Check the address and try again.",
  useSiteIcon: "Use this icon",
  searchApps: "Search apps",
  noApps: "No apps found",
  loadingApps: "Loading apps…",
  backToEmoji: "Back to emoji",
  rename: "Rename (the folder stays as it is)",
  drafting: "Drafting…",
  drafted: "Draft ready — review the pending proposal on the card",
  draftedFromConsult: "Drafted from your consultation",
  editConfig: "Edit run configuration",
  saveConfig: "Save configuration",
  configSaved: "Run configuration saved",
  cancel: "Cancel",
  noConfig: "No defaults or boundary set.",
  noDefault: "(none)",
  defaultModel: "Default model",
  defaultEffort: "Default reasoning effort",
  preferredSkills: "Preferred skills",
  boundaryEditor: "Boundary — ONLY these are allowed (empty = unrestricted)",
  boundaryEditorHint: "Capability allow-list, enforced for this project and its subagents. Not a filesystem sandbox — shells can still leave the folder.",
  skillsLabel: "skills",
  templateName: "Name",
  templateCondition: "Completion condition (e.g. tests exit 0 and lint clean)",
  addTemplate: "Add template",
  picker: {
    search: "Search…",
    empty: "No matches",
    addCustom: "Add “{{value}}”",
    pickAgents: "Pick collaborators…",
    pickSkills: "Pick skills…",
    unrestricted: "unrestricted",
    clearAll: "Clear all"
  },
  consult: {
    title: "Consult",
    paneTitle: "Consultant",
    paneSubtitle: "Explains and suggests. A drafted card is only written once you accept it.",
    emptyIntro: "Ask how a field should be filled, what a boundary means, or for wording you can paste in. The consultant sees the saved card, your unsaved draft, and every option available here.",
    emptyIntroNew: "New project? Say below what this folder is for, then press “Draft card” — Alma drafts one from this conversation, and nothing is written until you accept it. You can also ask how any field should be filled.",
    draft: "Draft card",
    draftTitle: "Turn this consultation (and what's in the input) into a card draft. It arrives as a pending proposal; nothing is written until you accept it.",
    starter1: "How should I write the brief and the focus?",
    starter2: "Which tools and models should this project restrict?",
    starter3: "What differs between my draft and the saved card?",
    placeholder: "Ask about the card…",
    send: "Send",
    thinking: "Thinking…",
    seesDraft: "Sees your unsaved draft",
    seesSaved: "Sees the saved card",
    compacted: "{{count}} earlier turns folded into a summary",
    showSummary: "Show summary",
    hideSummary: "Hide summary",
    clear: "Clear conversation",
    clearConfirmTitle: "Clear this consultation?",
    clearConfirmBody: "The whole conversation with the consultant for this project is deleted, including its summary. The card itself is not touched.",
    cleared: "Consultation cleared",
    close: "Close consultant",
    savedIn: "Saved in the project folder"
  }
};
const workspace$2 = {
  title: "Projects",
  selectWorkspace: "Select Project",
  selectDirectory: "Select Directory...",
  remote: {
    selectRemoteFolder: "Remote Folder...",
    disconnected: "Remote host disconnected",
    reconnect: "Reconnect",
    reconnecting: "Reconnecting...",
    pickerTitle: "Remote Project",
    pickerDescription: "Pick an SSH host, then choose a project folder on it. Hosts from ~/.ssh/config work out of the box.",
    browseDescription: "Choose the project folder on this host.",
    fromSshConfig: "From ~/.ssh/config",
    noHosts: "No SSH hosts yet. Add one as user@host below.",
    addHost: "Add host manually...",
    connect: "Connect",
    emptyDirectory: "No subdirectories",
    useThisFolder: "Use This Folder",
    hostsTitle: "Remote Hosts",
    hostsDescription: "SSH hosts used by remote projects. Authentication uses your ssh keys and ~/.ssh/config.",
    test: "Test",
    testing: "Testing...",
    connected: "Connected",
    connectionFailed: "Connection failed",
    notChecked: "Not checked",
    deleteHostConfirm: "Remove this host?",
    deleteHostHasProjects: "This host still has projects and cannot be removed.",
    projectCount: "{{count}} project(s)"
  },
  temporary: "Temp",
  locked: "Project locked",
  recent: "Recent Projects",
  info: "All tool operations will use this directory as working directory",
  addWorkspace: "Add Project",
  showTemporary: "Show temporary",
  showInList: "Show in list",
  openInFinder: "Open in Finder",
  openInExplorer: "Open in File Explorer",
  deleteConfirm: "Delete this project? Its conversations are not deleted: they are hidden with the project and come back if you add this folder as a project again. The project folder is not touched.",
  deleteFailed: "Failed to delete project",
  deleteKeepThreads: {
    menu: "Delete Project…",
    title: "Delete project “{{name}}”?",
    description: "This only removes the project from Alma. The project folder is not deleted.",
    descriptionWithThreads: "This only removes the project from Alma. Its {{count}} conversations are kept but hidden with it, and come back if you add this folder as a project again. The project folder is not deleted.",
    confirm: "Delete Project"
  },
  deleteDefaultForbidden: "The default project cannot be deleted.",
  noWorkspaces: "No projects yet",
  searchProjects: "Search projects...",
  searchNoResults: "No matching projects",
  noWorkspace: "No project",
  noWorkspaceDescription: "Tools will use a temporary directory",
  auto: "Auto",
  autoDescription: "Create temp directory automatically",
  cannotChange: "Project cannot be changed after sending messages",
  artifacts: {
    title: "Artifacts Mode",
    description: "Use a dedicated directory for artifact files",
    enabled: "Artifacts mode enabled"
  },
  defaultWorkspace: "Default Project",
  listDescription: "Folders the agent works in. The starred project is used for new conversations; without one, each conversation gets a temporary folder.",
  defaultWorkspaceDescription: "New conversations will use this directory instead of creating a temporary one",
  setAsDefault: "Set as Default",
  clearDefault: "Clear Default",
  isDefault: "Default",
  noDefault: "None (use temporary)",
  autoWorktree: "Auto Worktree",
  autoWorktreeDescription: "Automatically create a git worktree for each new conversation",
  outputs: {
    label: "Outputs",
    tooltip: "Open this session's Outputs folder"
  },
  worktree: {
    title: "Git Worktree",
    description: "Work in an isolated git worktree for this chat",
    needsProject: "Select a project to enable",
    badge: "Worktree"
  },
  pins: {
    buttonTitle: "Pinned references",
    title: "Pinned references — {{name}}",
    description: "Objects every thread in this project always works with (plans, rules, agents, folders…). Set here or via `alma workspace pin` — conversations inherit them and cannot change them.",
    empty: "Nothing pinned yet. Search below to pin an object.",
    searchPlaceholder: "Search objects to pin (skills, agents, files, hosts…)",
    saving: "Saving…"
  }
};
const github$2 = {
  notInstalled: "GitHub CLI is not installed",
  notAuthenticated: "GitHub CLI is not authenticated",
  install: "Install",
  runAuthLogin: "Run: gh auth login",
  pr: {
    title: "Pull Request",
    noPr: "No pull request",
    create: "Create PR",
    createTitle: "Create Pull Request",
    createDescription: "Create a pull request for branch",
    titleLabel: "Title",
    titlePlaceholder: "Pull request title",
    bodyLabel: "Description",
    bodyPlaceholder: "Describe your changes...",
    draft: "Create as draft",
    creating: "Creating...",
    titleRequired: "Title is required",
    open: "Open",
    merged: "Merged",
    closed: "Closed",
    changes: "Changes",
    files: "files",
    status: "Status",
    mergeable: "Can be merged",
    conflicting: "Has conflicts",
    unknown: "Unknown",
    checks: "Checks",
    review: "Review",
    update: "Update",
    merge: "Merge",
    close: "Close",
    merging: "Merging...",
    closing: "Closing..."
  },
  postMerge: {
    title: "PR Merged",
    description: "Your pull request has been successfully merged. What would you like to do with this worktree?",
    keep: "Keep worktree",
    keepDescription: "Continue working in this worktree",
    "delete": "Delete worktree",
    deleteDescription: "Remove the worktree and branch",
    archive: "Delete and archive thread",
    archiveDescription: "Remove worktree and archive associated conversations",
    decideLater: "Decide later"
  },
  conflicts: {
    title: "Conflicts",
    noConflicts: "No conflicts to resolve",
    resolveAll: "Resolve All with AI",
    resolving: "Resolving...",
    resolved: "Resolved",
    resolution: "Resolution",
    "continue": "Continue Rebase",
    abort: "Abort Rebase",
    confidence: {
      high: "High confidence",
      medium: "Medium confidence",
      low: "Low confidence"
    }
  }
};
const taskTool$2 = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  error: "Error",
  denied: "Denied",
  approvalRequested: "Approval Requested",
  approvalResponded: "Approval Responded",
  streaming: "Streaming",
  result: "Result",
  errorLabel: "Error",
  tool: "tool",
  tools: "tools"
};
const hooks$2 = {
  events: {
    "chat.message.willSend": "Before Message Send",
    "chat.message.didReceive": "After Message Receive",
    "chat.system.transform": "System Prompt Transform",
    "chat.params.transform": "Chat Params Transform",
    "tool.willExecute": "Before Tool Execute",
    "tool.didExecute": "After Tool Execute",
    "tool.onError": "On Tool Error",
    "thread.created": "Thread Created",
    "thread.deleted": "Thread Deleted",
    "thread.activated": "Thread Activated",
    "app.ready": "App Ready",
    "app.willQuit": "App Will Quit"
  },
  discard: "Discard",
  save: "Save",
  matchHints: {
    messageContent: "message content",
    toolName: "tool name"
  }
};
const modelCapabilities$1 = {
  vision: "Vision",
  image: "Image",
  tools: "Tools",
  reasoning: "Reasoning",
  embedding: "Embedding"
};
const providerStatus$2 = {
  notConfigured: "Not configured",
  active: "Active",
  disabled: "Disabled",
  inactive: "Inactive"
};
const askUserQuestion$2 = {
  previous: "Previous",
  next: "Next",
  submit: "Submit",
  customPlaceholder: "Enter a custom answer...",
  fallbackTitle: "Your input is needed",
  sidebarWaiting: "Waiting for your answer",
  waiting: "Waiting for your answer…",
  yourAnswer: "Your answer",
  dismissed: "Dismissed",
  goToQuestion: "Go to question {{index}}"
};
const commandPalette$2 = {
  openBeside: "Open beside",
  removeRecent: "Remove from history",
  placeholder: "Search threads, files, settings, actions...",
  searching: "Searching...",
  noResults: "No results found.",
  group: {
    quickActions: "Quick Actions",
    settings: "Settings Pages",
    allSettings: "All Settings",
    threads: "Threads",
    recent: "Recent Searches",
    projectFiles: "Project Files",
    projectFilesIn: "Files in {{name}}",
    actions: "Actions"
  },
  hint: {
    openBeside: "open beside",
    navigate: "navigate",
    select: "select",
    close: "close"
  },
  settings: {
    tts: "Text-to-Speech",
    people: "People",
    chromeRelay: "Chrome Relay"
  },
  toggle: {
    theme: "Theme",
    streamResponse: "Streaming Response",
    showTokenUsage: "Show Token Usage",
    enableMarkdown: "Markdown Rendering",
    infographic: "Infographic Visualization",
    soundEffects: "Sound Effects",
    memory: "Memory",
    lineNumbers: "Show Line Numbers",
    wordWrap: "Word Wrap",
    systemCaret: "System Caret",
    whisper: "Speech Input",
    debugMode: "Debug Mode"
  },
  theme: {
    light: "Light",
    dark: "Dark",
    system: "System"
  },
  deep: {
    toolModel: "Tool Model",
    codingAgent: "Coding Agent",
    language: "Language",
    appIcon: "App Icon",
    startup: "Startup Behavior",
    window: "Window & Tray Behavior",
    quickChat: "Quick Chat",
    permissions: "Permission & Auto-Approve",
    temperature: "Temperature",
    maxTokens: "Max Tokens",
    streaming: "Streaming Response",
    tokenUsage: "Token Usage Display",
    markdown: "Markdown Rendering",
    singleDollarMath: "Single Dollar Math",
    infographic: "Infographic Visualization",
    autoSuggestions: "Auto Suggestions",
    toolSelection: "Default Tool Selection",
    skillSelection: "Default Skill Selection",
    soundEffects: "Sound Effects & Presets",
    autoCompact: "Auto Context Compaction",
    hashlineEdit: "Hashline Edit Mode",
    uiTheme: "Theme Appearance",
    font: "Font Family & Size",
    density: "Interface Density",
    sidebarWidth: "Sidebar Width",
    sidebarMode: "Sidebar Mode",
    lineNumbers: "Show Line Numbers",
    uiWordWrap: "Word Wrap",
    minimap: "Show Minimap",
    systemCaret: "System Caret",
    toolCardExpand: "Tool Card Default Expand",
    terminalFont: "Terminal Font",
    persistTerminals: "Persist Terminals",
    terminalCursorBlink: "Terminal Cursor Blink",
    proxy: "Proxy Settings",
    timeout: "Request Timeout & Retry",
    memoryConfig: "Memory Configuration",
    shortcuts: "Keyboard Shortcuts",
    whisperModel: "Speech Model & Language",
    ttsProvider: "TTS Provider & Voice",
    searchEngine: "Search Engine",
    backup: "Data Backup & Restore",
    cloudSync: "Cloud Sync",
    darkTheme: "Dark Mode Theme",
    lightTheme: "Light Mode Theme"
  },
  action: {
    checkUpdates: "Check for Updates"
  }
};
const toolGroupSummary$2 = {
  count: "{{count}} tool calls",
  compose: "{{verb}} {{object}}",
  running: "Working on {{text}}",
  fallback: "Continue working",
  waiting: "Waiting for approval: {{object}}",
  waitingPlan: "Waiting to run plan",
  waitingAnswer: "Waiting for your answer",
  categoryCount: "{{count}} kinds of operations",
  multiStage: "{{verb1}} & {{verb2}}: {{topic}}",
  action: {
    read: "Read",
    write: "Write",
    edit: "Edit",
    "delete": "Delete",
    list: "List files in",
    searchFile: "Search files",
    searchContent: "Search code",
    lints: "Check diagnostics",
    command: "Run command",
    webSearch: "Search web",
    webFetch: "Fetch page",
    codebaseSearch: "Search codebase",
    todo: "Update task plan",
    exitPlan: "Waiting to run plan",
    subtask: "Run subtask",
    skill: "Load skill",
    userQuestion: "Waiting for your answer",
    imageGen: "Generate image",
    mcpCall: "Call MCP",
    run: "Run tool"
  },
  noObject: {
    read: "Review related files",
    write: "Write file",
    edit: "Edit file",
    "delete": "Delete file",
    list: "List files",
    searchFile: "Search related files",
    searchContent: "Search related code",
    lints: "Check diagnostics",
    command: "Run command",
    webSearch: "Search the web",
    webFetch: "Fetch page content",
    codebaseSearch: "Search codebase",
    todo: "Update task plan",
    exitPlan: "Waiting to run plan",
    subtask: "Run subtask",
    skill: "Load skill",
    userQuestion: "Waiting for your answer",
    imageGen: "Generate image",
    mcpCall: "Call MCP tool",
    unknown: "Run other tools"
  },
  group: {
    read: "Review {{topic}}",
    search: "Locate code for {{topic}}",
    research: "Gather research on {{topic}}",
    modify: "Edit {{topic}}",
    command: "Run {{topic}}",
    diagnostics: "Check {{topic}}",
    plan: "Plan {{topic}}",
    collab: "Collaborate on {{topic}}",
    external: "Fetch {{topic}}",
    other: "Process {{topic}}"
  },
  groupNoTopic: {
    read: "Review files",
    search: "Search code",
    research: "Gather research",
    modify: "Edit files",
    command: "Run commands",
    diagnostics: "Check diagnostics",
    plan: "Update plan",
    collab: "Delegate work",
    external: "Call external service",
    other: "Process steps"
  },
  groupVerb: {
    read: "read files",
    search: "locate code",
    research: "gather research",
    modify: "edit",
    command: "run checks",
    diagnostics: "check diagnostics",
    plan: "organize plan",
    collab: "delegate",
    external: "call service",
    other: "process"
  }
};
const minesweeper$2 = {
  title: "Minesweeper",
  bestTimesMenu: "Best Times...",
  bestTimes: "Best Times",
  levels: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    expert: "Expert"
  },
  seconds_one: "{{count}} second",
  seconds_other: "{{count}} seconds",
  resetScores: "Reset Scores",
  congratulations: "Congratulations",
  fastestTime: "You have the fastest time for {{level}} level.",
  enterName: "Please enter your name:"
};
const activity$2 = {
  verb: {
    read: "Read",
    globbed: "Globbed",
    searched: "Searched",
    searchedWeb: "Searched web",
    fetched: "Fetched",
    edited: "Edited",
    wrote: "Wrote",
    ran: "Ran",
    checked: "Checked",
    killed: "Killed",
    usedSkill: "Used skill",
    updated: "Updated"
  },
  object: {
    shellOutput: "shell output",
    task: "task {{id}}",
    shell: "shell",
    codeScript: "code script",
    todos: "todos"
  },
  phase: {
    thinking: "Thinking",
    thought: "Thought",
    thoughtFor: "for {{seconds}}s",
    exploring: "Exploring",
    explored: "Explored",
    making: "Making",
    made: "Made",
    running: "Running",
    ran: "Ran",
    using: "Using",
    used: "Used",
    working: "Working",
    worked: "Worked",
    files_one: "{{count}} file",
    files_other: "{{count}} files",
    places_one: "{{count}} place",
    places_other: "{{count}} places",
    creates_one: "{{count}} create",
    creates_other: "{{count}} creates",
    edits_one: "{{count}} edit",
    edits_other: "{{count}} edits",
    commands_one: "{{count}} command",
    commands_other: "{{count}} commands",
    steps_one: "{{count}} step",
    steps_other: "{{count}} steps"
  },
  toolsUsed_one: "{{count}} tool used",
  toolsUsed_other: "{{count}} tools used",
  timelineView: "Timeline view",
  collapse: "Collapse activity",
  expand: "Expand activity",
  taskFallback: "Task",
  focus: {
    workingFor: "Working for {{seconds}}s",
    working: "Working",
    showSteps: "Show steps",
    hideSteps: "Hide steps",
    hideComposer: "Hide composer",
    showComposer: "Show composer"
  }
};
const infographic$2 = {
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  resetZoom: "Reset zoom",
  downloadSvg: "Download as SVG",
  viewFullscreen: "View fullscreen",
  resetView: "Reset view",
  expandDiagram: "Expand diagram",
  copySourceCode: "Copy source code",
  copyAsPng: "Copy as PNG"
};
const branchNav$2 = {
  previous: "Previous branch",
  next: "Next branch"
};
const toolBlock$2 = {
  output: "Output",
  command: "Command",
  "arguments": "Arguments",
  noArguments: "No arguments",
  expandArguments: "Expand to view arguments",
  changes: "Changes",
  content: "Content",
  result: "Result",
  noOutput: "No output",
  fileChanges: "File Changes"
};
const threadResources$2 = {
  outputs: "Outputs",
  sources: "Sources"
};
const toolRuns$2 = {
  title: "Tool Runs"
};
const goalLoop$2 = {
  repeatSchedule: "Repeat on a schedule",
  untilCondition: "Work until a condition holds",
  keepWorking: "Keep this thread working",
  appliesToNextChat: "No chat here yet — what you set is applied automatically when your first message creates one.",
  pendingGoal: "Goal pending: {{text}}",
  pendingLoop: "Loop pending: {{text}}",
  pendingTitle: "Set, applies when the new chat is created: {{text}}"
};
const webPreview$2 = {
  noConsoleOutput: "No console output",
  enterUrl: "Enter URL...",
  preview: "Preview"
};
const a11yRequest$2 = {
  title: "Enable {{appName}} Live Context",
  subtitle: "QuickChat answers questions about whatever you're looking at — code, docs, errors, web pages. To read your focused window it needs Accessibility access.",
  permissionName: "Accessibility",
  permissionDesc: "Lets {{appName}} read the focused window's text content.",
  done: "Done",
  opening: "Opening…",
  allow: "Allow",
  allSet: "All set.",
  completeInSettings: "Complete in System Settings.",
  close: "Close",
  maybeLater: "Maybe later"
};
const artifactsUi$2 = {
  railPin: "Keep toolbar open",
  dockPin: "Keep open in this chat",
  dockUnpin: "Stop keeping open",
  railUnpin: "Auto-hide toolbar",
  railShow: "Show toolbar",
  showExplorer: "Show explorer",
  locateInExplorer: "Locate in file tree",
  openInBuiltInBrowser: "Open in built-in browser",
  closeFile: "Close file",
  explorer: "Explorer",
  noContent: "No content to display",
  noFileSelected: "No file selected",
  sheetEmpty: "This sheet is empty",
  previewUnavailable: "Preview not available",
  noConflicts: "No conflicts to resolve",
  createPR: "Create Pull Request",
  local: "Local",
  remote: "Remote",
  noUncommitted: "No uncommitted changes",
  failedCommitDetails: "Failed to load commit details",
  stageToCommit: "Stage changes to commit",
  failedDiff: "Failed to load diff",
  noChanges: "No changes",
  noCommits: "No commits yet",
  ghNotAuthed: "GitHub CLI is not authenticated",
  stashes: "Stashes",
  noStashes: "No stashes",
  continueWorktree: "Continue working in this worktree",
  deleteArchiveThread: "Delete and archive thread",
  deleteWorktree: "Delete worktree",
  keepWorktree: "Keep worktree",
  failedFileChanges: "Failed to load file changes",
  aiFilesHint: "Files modified by the AI will appear here",
  noFileChanges: "No file changes",
  noThreadSelected: "No thread selected",
  previewStartFailed: "Failed to start preview server",
  noHtmlFiles: "No HTML files found",
  readyToBrowse: "Ready to browse",
  reuseBrowserLogin: "Reuse a browser login",
  noActiveTerminal: "No active terminal",
  tabFiles: "Files",
  tabChanges: "Changes",
  tabCommit: "Commit",
  tabTerminal: "Terminal",
  tabBrowser: "Browser",
  tabTools: "Tools",
  moreTabs: "More tabs",
  preparingWorkspace: "Preparing workspace…",
  selectFileToPreview: "Select a file to preview",
  writing: "Writing...",
  noFilesYet: "No files yet. AI will create files here.",
  fileIsLarge: "This file is large",
  largeFileHint: "Previewing it inline may freeze the app. Open it in an editor instead, or preview the first part anyway.",
  previewAnyway: "Preview anyway",
  preview: "Preview",
  code: "Code",
  truncatedNotice: "Large file — showing the first {{shown}}.",
  truncatedNoticeOfTotal: "Large file — showing the first {{shown}} of {{total}}.",
  failedLoadSpreadsheet: "Failed to load spreadsheet",
  fileTypeNotSupported: "File type .{{extension}} is not supported",
  itemsCount: "{{n}} items",
  fileTooLargePreview: "File too large to preview ({{size}})",
  binaryFileInArchive: "Binary file ({{type}}) — preview not supported inside archives",
  failedLoadArchive: "Failed to load archive",
  filesCount: "{{n}} files",
  foldersCount: "{{n}} folders",
  totalSize: "Total: {{size}}",
  loadingConflicts: "Loading conflicts...",
  conflictsCount: "{{n}} conflict(s)",
  resolveAllWithAI: "Resolve All with AI",
  resolvingProgress: "Resolving {{current}} of {{total}}...",
  abortRebase: "Abort Rebase",
  continueRebase: "Continue Rebase",
  resolutionLabel: "Resolution:",
  clickWandToResolve: "Click the wand icon to resolve this conflict with AI",
  titleRequired: "Title is required",
  failedCreatePR: "Failed to create PR",
  createPRForBranch: "Create a pull request for branch",
  prTitlePlaceholder: "Pull request title",
  prBodyPlaceholder: "Describe your changes...",
  createAsDraft: "Create as draft",
  createPRShort: "Create PR",
  noBranch: "No branch",
  newBranchPlaceholder: "New branch name...",
  fetch: "Fetch",
  pull: "Pull",
  noUpstream: "No upstream set",
  push: "Push",
  pushSetUpstream: "Push and set upstream",
  unselectAll: "Unselect all",
  selectAll: "Select all",
  unselectAllFiles: "Unselect all {{n}} files",
  selectAllFiles: "Select all {{n}} files",
  conflicts: "Conflicts",
  stagedChanges: "Staged Changes",
  changes: "Changes",
  loadingCommitDetails: "Loading commit details...",
  filesChanged: "{{n}} files changed",
  insertions: "{{n}} insertions(+)",
  deletions: "{{n}} deletions(-)",
  failedCreateCommit: "Failed to create commit",
  failedGenerateCommitMessage: "Failed to generate commit message",
  commitMessagePlaceholder: "Commit message...",
  generateCommitMessage: "Generate commit message with AI",
  committing: "Committing...",
  commit: "Commit",
  loadingDiff: "Loading diff...",
  stagedTag: "(staged)",
  unstagedTag: "(unstaged)",
  loadingHistory: "Loading history...",
  loadMore: "Load more",
  ghNotInstalled: "GitHub CLI is not installed",
  install: "Install",
  stashChanges: "Stash Changes",
  stashMessagePlaceholder: "Stash message (optional)",
  stashing: "Stashing...",
  loadingStashes: "Loading stashes...",
  popStash: "Pop stash",
  dropStash: "Drop stash",
  failedProcess: "Failed to process",
  prMerged: "PR #{{number}} Merged",
  prMergedDesc: "Your pull request has been successfully merged. What would you like to do with this worktree?",
  removeWorktreeAndBranch: "Remove the worktree and branch",
  removeWorktreeArchiveDesc: "Remove worktree and archive associated conversations",
  decideLater: "Decide later",
  linesCount: "{{n}} lines",
  selectConversationHint: "Select a conversation to view file changes",
  loadingFileChanges: "Loading file changes...",
  retry: "Retry",
  changesCount: "{{n}} changes",
  writesCount: "{{n}} writes",
  editsCount: "{{n}} edits",
  importedCookies: "Imported {{n}} cookies from {{app}}",
  importedCookiesDesc: "Reloading the preview so your logins take effect.",
  importProfileFailed: "Could not import browser profile",
  browserDesktopOnly: "The in-app browser only works in the Alma desktop app.",
  openInNewTab: "Open {{url}} in a new tab",
  openedByAgent: "Opened by agent",
  closeTab: "Close tab",
  pinTab: "Pin tab",
  unpinTab: "Unpin tab",
  newTab: "New tab",
  runDevServer: "Run dev server",
  searchHtmlFiles: "Search HTML files...",
  selectEntryFile: "Select entry file",
  installing: "Installing...",
  starting: "Starting...",
  goBack: "Go back",
  goForward: "Go forward",
  inspectActiveHint: "Click elements to describe changes, then Send (Esc to cancel)",
  inspectHint: "Select elements to edit with AI",
  reuseBrowserLoginTitle: "Reuse a browser login (import cookies from Chrome, Edge, Brave…)",
  reuseBrowserLoginDesc: "Import cookies from a browser profile so this preview is already signed in. macOS may ask for Keychain access the first time.",
  envSectionTitle: "Environments",
  envSectionDesc: "Each environment keeps its own sign-ins, so one site can be open with different accounts.",
  envDefault: "Default",
  envNew: "New environment",
  envNewEllipsis: "New environment…",
  envEdit: "Edit",
  envDelete: "Delete environment",
  envNewTitle: "New environment",
  envEditTitle: "Edit environment",
  envDialogDesc: "Tabs in this environment keep their own cookies and storage, separate from every other environment.",
  envNamePlaceholder: "e.g. Work, Personal, Test account",
  envNameTaken: "An environment with this name already exists.",
  envColor: "Color",
  envCreate: "Create",
  envOpenIn: "Open in environment",
  envSwitchTo: "Switch environment",
  envDeleteTitle: "Delete “{{name}}”?",
  envDeleteDesc: "Its tabs will close, and everything it stored (sign-ins, cookies, site data) will be erased. This cannot be undone.",
  envClearFailed: "Could not erase the environment’s data",
  envImportInto: "Imports into {{name}}",
  findingProfiles: "Finding browser profiles…",
  noProfilesFound: "No Chromium-based browser profiles found.",
  closePip: "Close the floating Picture-in-Picture mirror",
  openPip: "Picture in Picture — float this browser tab on top so you can watch it anywhere",
  addressPlaceholder: "Search or enter a URL",
  openInBrowser: "Open in Browser",
  unknownError: "An unknown error occurred",
  sendErrorToAI: "Send the error to the AI to diagnose and fix",
  fixWithAI: "Fix with AI",
  noErrorOutput: "No error output was captured.",
  installingDeps: "Installing dependencies...",
  startingServer: "Starting server...",
  preparingInstall: "Preparing to install...",
  initializing: "Initializing...",
  readyToBrowseHint: "Type a URL in the address bar to browse, or run this project's dev server",
  executionFailed: "Execution failed",
  run: "Run",
  terminalExited: "Terminal process exited.",
  closeTerminal: "Close terminal",
  newTerminal: "New Terminal",
  connected: "Connected",
  connecting: "Connecting...",
  disconnected: "Disconnected",
  restart: "Restart",
  createTerminal: "Create Terminal",
  discardChanges: "Discard changes",
  failedGetCILogs: "Failed to get CI logs",
  failedMergePR: "Failed to merge PR",
  failedUpdateFromMain: "Failed to update from main",
  canBeMerged: "Can be merged",
  hasConflicts: "Has conflicts",
  unknownStatus: "Unknown",
  noWorkspaceSelected: "No workspace selected",
  loadingGitStatus: "Loading git status...",
  failedLoadGitStatus: "Failed to load git status",
  notGitRepo: "Not a git repository",
  initializeRepository: "Initialize Repository",
  loadingPRStatus: "Loading PR status...",
  noPullRequest: "No pull request",
  draftBadge: "Draft",
  statusLabel: "Status",
  checksLabel: "Checks",
  fix: "Fix",
  reviewLabel: "Review",
  commitAndPush: "Commit & Push",
  merge: "Merge",
  focusMode: "Focus mode (full-width preview)",
  exitFocusMode: "Exit focus mode (Esc)",
  edit: "Edit",
  editFile: "Edit this file (Cmd/Ctrl+S to save)",
  save: "Save",
  editNotSupportedHere: "This file lives outside the workspace and can't be saved here",
  externalFile: "External",
  externalFileHint: "This file lives outside the project. The agent can read and change it, but it is not part of the project: it will not appear under @, and it cannot be edited here.",
  missingFileTitle: "This file was moved or deleted",
  missingFileHint: "It is no longer at this path. If it was moved, open it again from the file tree.",
  missingFileShowFiles: "Show files"
};
const quickChat$2 = {
  selectModel: "Select model...",
  expandToMain: "Expand to main window",
  newChat: "New chat",
  scrollToBottom: "Scroll to bottom"
};
const references$2 = {
  kinds: {
    file: "File",
    project: "Project",
    host: "Host",
    agent: "Agent",
    skill: "Skill",
    prompt: "Prompt",
    thread: "Thread",
    message: "Message",
    snippet: "Snippet",
    mission: "Mission",
    plan: "Plan",
    mcp: "MCP Server",
    model: "Model",
    memory: "Memory",
    artifact: "Artifact",
    tool: "Tool Call",
    task: "Task",
    provider: "Provider",
    cron: "Scheduled Task",
    module: "Module",
    mail: "Email",
    rearview: "Rearview",
    crystal: "Crystal",
    bundle: "Record Bundle",
    scratch: "Temporary reference"
  },
  picker: {
    title: "Reference anything",
    searching: "Searching…",
    empty: "No matches — try another word or a kind: prefix",
    filterHint: "Filter:",
    types: "Types",
    unknownType: "No reference type “{{name}}” — pick a type below",
    pickType: "Pick a type",
    viewAll: "View all {{kind}} →",
    back: "Back to all types",
    favorites: "Favorites"
  },
  chip: {
    copied: "Reference copied",
    missing: "missing",
    expired: "reference expired",
    loading: "Loading…",
    backlinks_one: "Mentioned in {{count}} message",
    backlinks_other: "Mentioned in {{count}} messages",
    noBacklinks: "No chat messages mention this yet",
    open: "Open",
    insert: "Mention",
    copy: "Copy",
    thisThread: "this thread",
    related: "Related"
  },
  actions: {
    referenceMessage: "Mention this message",
    referenceSelection: "Mention selection",
    quoteSelection: "Quote selection",
    referenceFile: "Mention in chat",
    snippetCaptured: "Selection saved as a snippet reference"
  },
  link: {
    action: "Link",
    title: "Link from “{{title}}” to…",
    searchPlaceholder: "Search objects to link…",
    linked: "Linked to {{title}}",
    remove: "Remove link"
  },
  scope: {
    thread: "this thread",
    project: "this project",
    global: "global"
  },
  messageRefs: {
    menuItem: "References",
    title: "References to this message",
    empty: "Nothing references this message yet",
    mentionedBy: "Mentioned by"
  },
  timeline: {
    select: "Select this turn",
    deselect: "Deselect",
    createSnippet: "Create snippet ({{count}})",
    clear: "Clear selection",
    createBundle: "Bundle"
  },
  snippetDialog: {
    title: "Create snippet from {{count}} turn(s)",
    nameLabel: "Name",
    namePlaceholder: "Leave empty to let AI name it",
    aiSummary: "Also generate an AI summary (original content is kept)",
    hint: "The snippet keeps the original messages and tool calls, with automatic backlinks to their sources. Reference it anywhere with @snippet.",
    create: "Create",
    created: "Snippet “{{title}}” created — token added to composer"
  },
  selectionSnippet: {
    title: "Create text snippet",
    namePlaceholder: "Optional, e.g. Read with me",
    hint: "The name is used for @ search and compact display; the full original text is still referenced."
  },
  renameSnippet: {
    action: "Rename snippet",
    title: "Rename snippet",
    placeholder: "Leave empty to use a text preview",
    hint: "This changes only the name, not the original text, source, or existing references.",
    saved: "Snippet name updated"
  },
  deleteSnippet: {
    action: "Delete snippet",
    title: "Delete this snippet?",
    description: "“{{title}}” is removed for good; references to it in sent messages stop resolving.",
    confirm: "Delete",
    deleted: "Snippet deleted"
  },
  recipes: {
    ready: "“{{title}}” — these materials can be extracted into a repeatable task",
    extract: "Extract",
    dismiss: "Dismiss",
    prefilled: "Extraction prompt prefilled — review and send"
  },
  scratch: {
    add: "Add as reference",
    addPage: "Add the whole page as a reference",
    addSelection: "Add selection as a reference",
    addImage: "Add image as a reference",
    addMedia: "Add media as a reference",
    added: "Added as a reference — kept for 30 minutes",
    title: "References",
    description: "Material for the discussion at hand; cleared after 30 minutes unless you keep it as an @.",
    empty: 'No temporary references yet. Right-click a file, message text or image, or a web page and choose "Add as reference".',
    insert: "Add to this message",
    promote: "Keep as @",
    promoted: "Kept as a permanent reference",
    remove: "Remove",
    kept: "kept",
    minutesLeft: "{{count}} min left",
    expiringSoon: '"{{label}}" expires in 3 minutes',
    expiringHint: "Keep it as an @ if it is worth it; otherwise it is cleared.",
    limit: "A message can carry at most 5 temporary references",
    noThread: "Open a conversation first — the kept passage becomes a snippet of it",
    countBadge: "{{count}} temporary references",
    inserted: "Added",
    searchPlaceholder: "Filter references…",
    noMatch: 'Nothing matches "{{query}}"',
    selectedCount: "{{count}} selected",
    clearSelection: "Clear",
    insertSelected: "Add {{count}} to this message",
    select: "Select",
    deselect: "Deselect",
    kinds: {
      text: "text",
      file: "file",
      image: "image",
      web: "web page",
      media: "media"
    }
  },
  surfaceActions: {
    openInBrowser: "Open in browser",
    viewDateRecords: "View date records and schedules",
    goToThread: "Go to thread",
    goToMessage: "Go to message",
    loginTerminal: "Log in via Terminal",
    viewHostSettings: "Host settings",
    openInEditor: "Open in editor",
    needWorkspace: "This thread has no workspace — open one to create a terminal."
  }
};
const channels$2 = {
  email: {
    title: "Email Accounts",
    description: "Connect mailboxes you manage (IMAP in, SMTP out). New mail becomes inbox items — raw material processed via @-references, never auto-threads.",
    addAccount: "Add account",
    accountName: "Display name (e.g. Office inbox)",
    username: "Username (defaults to address)",
    password: "Password / app password",
    passwordHint: "Use an app-specific password (Gmail/QQ/163 all support them). Stored locally only.",
    test: "Test connection",
    save: "Connect",
    testOk: "IMAP + SMTP OK",
    testFailed: "Connection failed",
    noAccounts: "No email accounts connected yet.",
    checkNow: "Check for new mail now",
    notifyOn: "New-mail notifications on (click to turn off)",
    notifyOff: "New-mail notifications off (click to turn on)",
    pendingBadge: "{{count}} pending",
    inboxTitle: "Inbox (raw material)",
    inboxHint: "New mail lands here as inbox items. Reference one in chat with @mail to process it (classify, extract attachments, draft replies) — drafts come back here for your confirmation before anything is sent.",
    inboxEmpty: "Nothing here.",
    noSubject: "(no subject)",
    status_pending: "Pending",
    status_done: "Done",
    status_dismissed: "Dismissed",
    draftBadge: "Draft awaiting confirmation",
    draftTo: "Draft to {{to}}",
    confirmSend: "Confirm & send",
    discardDraft: "Discard draft",
    sentAt: "Sent {{at}}",
    markDone: "Mark done",
    dismiss: "Dismiss",
    reopen: "Reopen"
  }
};
const support$2 = {
  entryTitle: "Official Support (zero-permission)",
  entryDescription: "A support assistant maintained by the Alma team, running on YOUR model and compute. It has no tools, cannot touch your files or settings, and can never accept credentials — even if you offer them.",
  entryButton: "Start a support session",
  title: "Alma Official Support",
  subtitle: "No tools, no file access, no credentials — enforced locally, not by the conversation.",
  greeting: "Describe your problem — installation, model setup, features, or troubleshooting. Evidence you share is always previewed and confirmed by you first.",
  offlineNoModel: 'Offline triage mode: no usable model is configured, so replies come from the local rule engine — built exactly for the "my model is broken" case.',
  offlineModelFailed: "Offline triage mode: your model did not respond, so the local rule engine took over this turn.",
  inputPlaceholder: "Describe your problem… (Enter to send)",
  defenseTitle: "Local defense",
  defenseRules: "Support can never: read files, run commands, change settings, or receive passwords/API keys. Requests for any of these are blocked here, and severe ones cut the session.",
  exportsTitle: "Share evidence (preview first)",
  export_version: "Version info",
  export_errors: "Error summary",
  export_tasks: "Recent task status",
  export_rearview: "Rearview trails",
  exportPreviewHint: "Review and prune below — only what you confirm goes into the input box, and only you press send.",
  exportInsert: "Insert into input",
  defenseLog: "Defense events",
  defenseLogEmpty: "Nothing intercepted.",
  kill: "Cut session",
  terminated: "Session terminated: {{reason}}",
  killedByUser: "cut by you",
  zeroPermBadge: "zero-permission"
};
const crystal$2 = {
  dockTitle: "Crystallization",
  emptySlot: "Empty slot {{n}}",
  contourHint: "Nuclei forming: {{count}}",
  backpack: "Backpack (dormant)",
  formal: "Formal crystals",
  empty: "No crystallization yet. Recurring appellations grow on their own; you can also multi-select Timeline cards to plant a seed.",
  recall: "Recall to backpack",
  wake: "Wake into a slot",
  originSeed: "Seed",
  originNucleus: "Nucleus",
  stageCandidate: "candidate",
  stageFormal: "formal",
  subtitle: "Becomes a formal @-object only when sources are traceable, the checklist is complete, and YOU approve.",
  termStats: "{{count}} mentions · {{turns}} turns · {{threads}} threads · {{days}} days",
  materials: "Materials ({{count}})",
  noMaterials: "No materials yet.",
  type: "Object type",
  type_entity: "Entity/Event",
  type_concept: "Concept",
  type_claim: "Claim",
  type_process: "Process",
  type_rule: "Rule",
  type_project: "Project",
  checklist: "Fixed checklist",
  prefill: "AI prefill (draft only)",
  fieldMissing: "missing value or source",
  fieldConflict: "unresolved conflict",
  markConflict: "Mark conflict",
  clearConflict: "Clear conflict",
  fieldPlaceholder: "Content (source recorded on save)",
  sources: "Sources",
  readyTitle: "Ready to crystallize",
  readyHint: "On confirm this candidate id upgrades in place to a formal @-object; all trails, materials and backlinks are kept. A formal crystal gains no execution rights.",
  confirm: "Crystallize",
  cancelToBackpack: "Cancel (to backpack)",
  bundleTitle: "Create a record bundle ({{count}} cards)",
  bundleSubtitle: "A bundle keeps pointers to the original cards only — nothing is copied.",
  bundleNamePlaceholder: "Observation direction (required for a seed)",
  bundleAsSeed: "Also plant a seed to observe future turns (takes 1 slot)",
  slotsFull: "All 3 slots are taken — recall a seed in the dock first.",
  field_identity: "Identity",
  field_time: "Time",
  field_participants: "Participants",
  field_source: "Source",
  field_status: "Status",
  field_definition: "Definition",
  field_includes: "Includes",
  field_excludes: "Excludes",
  field_examples: "Examples",
  field_statement: "Statement",
  field_scope: "Scope",
  field_supporting: "Supporting",
  field_opposing: "Opposing",
  field_trigger: "Trigger",
  field_inputs: "Inputs",
  field_steps: "Steps",
  field_outputs: "Outputs",
  field_failure_handling: "Failure handling",
  field_permissions: "Permissions",
  field_subjects: "Applies to",
  field_conditions: "Conditions",
  field_forbidden_allowed: "Forbidden & allowed",
  field_exceptions: "Exceptions",
  field_stop_conditions: "Stop conditions",
  field_goal: "Goal",
  field_deliverables: "Deliverables",
  field_version: "Version",
  field_rights_status: "Rights status",
  related: "Related crystals (shared materials)",
  sharedMaterials: "{{count}} shared",
  settings: {
    title: "Crystallization",
    description: "How repeated appellations condense into candidate objects. The passive path spends one small-model call per turn; the switch and the gates are yours.",
    passive: "Passive observation (LLM appellation extraction)",
    passiveHint: "Off means no small-model spend. Turns that pass while it is off are not mined retroactively; seed scans are unaffected.",
    semantic: "Semantic seed scan",
    semanticHint: "Only runs when a local embedding model is already loaded — it never downloads one or goes online.",
    gatesHint: "Gates measure dispersion: repeats inside one message count once.",
    contour: "Contour",
    nucleus: "Nucleus",
    count: "count",
    turns: "turns",
    spread: "spread",
    dormant: "Dormant",
    days: "days without new material → backpack",
    reset: "Reset"
  }
};
const mentions$2 = {
  tab: "Mentions",
  emptyHint: "Pick something with @ and it opens here — with its content, or how to use it.",
  pin: "Keep this open",
  unpin: "Stop keeping this open",
  pinHint: "Keeps the tab open. It does not attach the object to later messages.",
  thread: {
    you: "You",
    assistant: "Alma",
    messages: "{{count}} messages",
    earlier: "{{count}} earlier messages not shown"
  }
};
const projectSuggestion$2 = {
  createTitle: "Make these conversations a project?",
  linkTitle: "Add this conversation to a project?",
  defaultReason: "These conversations keep coming back to the same thing.",
  bannerCreate: "A few of your conversations look like one ongoing effort",
  bannerLink: "This looks like part of a project you already have",
  viewDraft: "See the draft",
  name: "Project name",
  understanding: "What Alma thinks this is",
  focus: "Where it stands",
  threads: "Conversations included",
  remove: "Not part of this",
  putBack: "Put back",
  conclusions: "Already settled",
  location: "Save location",
  choose: "Choose…",
  noMigration: "Only links these conversations to the project. Nothing is moved or copied — files already written stay where they are; new work in these threads uses the project folder.",
  feedbackIntro: "Something off? Tell Alma in your own words and it will redraft — you don't have to rewrite the card yourself.",
  feedbackPlaceholder: "e.g. these two are not the same thing / you missed the actual goal",
  revise: "Redraft",
  revising: "Redrafting…",
  notNow: "Not now",
  confirmCreate: "Create project",
  confirmLink: "Add to project",
  created: "Created “{{name}}”"
};
const threadBrief$2 = {
  settings: {
    title: "Conversation briefs",
    description: "After a conversation pauses, Alma writes a short background summary of what it was about. That summary is what lets it tag a thread To Do and notice when several conversations have become one project.",
    reset: "Reset",
    enabled: "Summarize conversations in the background",
    enabledHint: "One small-model call, only when a conversation has grown substantively. Only conversations from after you turn this on — older ones are read only when you ask.",
    autoTodo: "Tag To Do when you say you will do something later",
    autoTodoHint: 'Only your own stated intentions. Suggestions, hypotheticals and "do it now" instructions never count, and a status you have changed is never overwritten.',
    projectSuggestions: "Suggest projects when conversations converge",
    projectSuggestionsHint: "Always a draft card you confirm. Nothing is created, linked or moved on its own.",
    budget: "Budget",
    minUserTurns: "min turns",
    minNewChars: "new characters",
    cluster: "Convergence",
    clusterThreads: "conversations",
    clusterSpread: "days apart",
    clusterHint: "How much recurrence is required before Alma will call something a project. A shared keyword is never enough on its own."
  }
};
const layout$2 = {
  reset: "Reset Layout",
  resetAction: "Reset",
  resetDesc: "Restore the default widths of the sidebar and the right-hand panel.",
  dividerHint: "Double-click to restore the default width"
};
const translate$2 = {
  action: "Translate",
  busy: "Translating…",
  clickToRevert: "Click to show the original",
  failed: "Could not translate — try again."
};
const codeBlock$2 = {
  copyCode: "Copy code",
  copied: "Copied!"
};
const ttsDownload$2 = {
  loading: "Loading {{label}} voice…",
  downloading: "Downloading {{label}} voice",
  preparing: "Preparing the voice for first use…",
  progress: "{{downloaded}} of {{total}}",
  starting: "Starting…",
  ready: "{{label}} voice is ready",
  failed: "{{label}} voice download failed"
};
const team$2 = {
  common: {
    join: "Join",
    startHosting: "Start hosting",
    someone: "someone",
    today: "Today",
    almaAnswering: "Alma is answering",
    connectingRelay: "Connecting to the relay…"
  },
  landing: {
    title: "Team",
    intro: "A shared channel between Almas. Only what is posted there is shared — your own chats never leave this machine.",
    joinWithLink: "Join with a link",
    hostTeam: "Host a team",
    yourName: "Your name",
    yourNameOrganizer: "Your name, shown as the organizer",
    emailPlaceholder: "Email, for your Gravatar — stays on this machine",
    askOrganizer: "Ask the organizer for the link.",
    inviteAfter: "You can invite people right after."
  },
  header: {
    archived: "archived",
    disconnected: "disconnected",
    reconnecting: "reconnecting…",
    reopenChannel: "Reopen channel",
    archiveChannel: "Archive channel",
    archiveChannelHint: "Archive channel — keeps the history, stops new posts",
    hideMembers: "Hide members",
    showMembers: "Show members",
    searchMessages: "Search messages",
    clearSearch: "Clear search"
  },
  rail: {
    channels: "Channels",
    newChannelPlaceholder: "new-channel",
    newChannelName: "New channel name",
    addChannel: "Add channel",
    sharedThreads: "Shared threads",
    archived: "Archived"
  },
  images: {
    encodeFailed: "Could not encode image",
    readFailed: "Could not read image"
  },
  savePerson: {
    inPeople: "In People",
    saveToPeople: "Save to People"
  },
  composer: {
    mentionCandidates: "Mention candidates",
    replyingTo: "Replying to <name>{{name}}</name>",
    cancelReply: "Cancel reply",
    draftedByAlma: "Drafted by your Alma — post it as is, edit it, or",
    discard: "discard",
    uploading: "Uploading",
    removeAttachment: "Remove {{name}}",
    placeholderWithImages: "Add a message, or just send",
    placeholder: "Message {{channel}}",
    silentHint: "The organizer set the team's Alma to silent",
    silent: "Alma is silent here",
    askOnHint: "The team's Alma will answer this post",
    askOffHint: "Only people see this post unless it says @alma",
    almaWillAnswer: "Alma will answer",
    askAlma: "Ask Alma",
    addImage: "Add an image",
    addImageHint: "Add an image — or paste or drop one",
    post: "Post"
  },
  members: {
    title: "Members",
    countOnline: "{{total}} · {{online}} online",
    organizer: "organizer",
    organizerYou: "organizer · you",
    you: "you",
    away: "away",
    online: "online",
    loading: "loading"
  },
  invite: {
    relayOffHint: "Invite links go through the Alma relay so they open from anywhere.",
    turnOnRelay: "Turn on the relay",
    signInHint: "Sign in once to publish this host through the relay.",
    relayError: "Relay: {{error}}",
    relayUnreachable: "The relay is not reachable right now.",
    linkCopied: "Invite link copied",
    link: "Invite link",
    thisNetworkOnly: "Works on this network only",
    singleUseWeek: "Single use · valid for 7 days",
    another: "another",
    waiting: "waiting",
    sameNetwork: "Same network?",
    copyLocalLink: "Copy a local link",
    copyInviteLink: "Copy an invite link",
    opensAnywhere: "Opens from anywhere through the relay."
  },
  messages: {
    yesterday: "Yesterday",
    replyToThis: "Reply to this",
    usedTools_one: "used {{count}} tool",
    usedTools_other: "used {{count}} tools",
    almaAnsweringEllipsis: "Alma is answering…",
    imageN: "image {{n}}",
    reply: "Reply",
    replyLower: "reply"
  },
  privatePane: {
    sharedWithTeam: "Shared with team",
    onlyYouHint: "Nobody in the team sees this conversation",
    onlyYou: "Only you",
    shareWithTeam: "Share with team"
  },
  search: {
    searching: "Searching",
    searchingEllipsis: "Searching…",
    noResults: "Nothing for <q>“{{query}}”</q>",
    results_one: "{{count}} message for <q>“{{query}}”</q>",
    results_other: "{{count}} messages for <q>“{{query}}”</q>",
    newest50: " — the 50 newest",
    you: "You",
    images_one: "An image",
    images_other: "{{count}} images"
  },
  settings: {
    title: "Team",
    intro: "Host channels that other Almas can join, or join a teammate's. Only what is posted in a channel is shared — private chats never leave the machine they were typed on.",
    hostingAs: "Hosting as {{name}}",
    portValue: "Port {{port}}",
    lanValue: "LAN {{addresses}}",
    hostHint: "Members join with an invite link — through the Alma relay from anywhere, or over your LAN.",
    stopHosting: "Stop hosting",
    shownAsOrganizer: "shown as the organizer",
    emailLabel: "Email, for your Gravatar",
    staysOnMachine: "stays on this machine",
    staysOnMachineLong: "stays on this machine — the team only sees the picture",
    port: "Port",
    memberOf: "Member of {{team}}",
    aTeam: "a team",
    joinTeam: "Join a team",
    asName: "as {{name}}",
    clientState: {
      idle: "idle",
      connecting: "connecting",
      connected: "connected",
      error: "error",
      reconnecting: "reconnecting"
    },
    joinHint: "Paste the invite link the organizer gave you.",
    leave: "Leave",
    howTeamSeesYou: "how the team sees you",
    profileTitle: "You",
    profileHint: "Your name and Gravatar, as the team sees them.",
    name: "Name",
    relayOff: "Off — only people on your LAN can join.",
    relaySignInHint: "Sign in once so people outside your LAN can join. No port forwarding needed.",
    relayError: "Relay error",
    reachAnywhere: "Reach from anywhere",
    copyRelayUrl: "Copy relay URL",
    inviteTitle: "Invite",
    inviteHint: "Each link admits one person and expires after a week.",
    inviteForPlaceholder: "who it is for (optional)",
    newInvite: "New invite",
    copyInviteLink: "Copy invite link",
    linkNetworkOnly: "This link only works on your network.",
    noAddress: "No address to reach this machine at.",
    reasonRelayOff: "For one that opens from anywhere, turn on Reach from anywhere above.",
    reasonSignIn: "For one that opens from anywhere, sign in above.",
    reasonError: "The relay is not up.",
    reasonErrorDetail: "The relay is not up — {{error}}.",
    reasonConnecting: "Connecting to the relay — make another in a moment for one that opens from anywhere.",
    singleUseExpires: "Single use · expires {{date}}",
    codeAndAddresses: "code and addresses",
    code: "code",
    copyCode: "Copy code",
    address: "address",
    copyHostAddress: "Copy host address",
    noMembers: "No one has joined yet.",
    membersOnline_one: "{{count}} member · {{online}} online",
    membersOnline_other: "{{count}} members · {{online}} online",
    revoked: "revoked",
    revoke: "revoke",
    modes: {
      silent: {
        label: "Silent",
        help: "Never answers members, not even @alma. You can still ask it from here."
      },
      onMention: {
        label: "On mention",
        help: "Answers a post that says @alma, or one the member asked it to answer."
      },
      topics: {
        label: "Topics",
        help: "As on mention, and any post that names one of the topics below."
      }
    },
    teamAlma: "Team Alma",
    teamAlmaHint: "When the team's Alma answers members. You are never limited on your own machine.",
    topicsLabel: "Topics — one per line; members get them as @ suggestions",
    answersPerHour: "Answers per hour — blank means unlimited",
    answersPerMemberAria: "Answers per member per hour",
    perMember: "per member",
    answersPerChannelAria: "Answers per channel per hour",
    perChannel: "per channel",
    channelsHint: "Every member sees every channel.",
    posts_one: "{{count}} post",
    posts_other: "{{count}} posts",
    newChannelPlaceholder: "new channel"
  }
};
const herdr$2 = {
  notify: {
    needsYou: "Needs your input",
    finished: "Finished",
    open: "Open",
    tab: "Tab {{n}}"
  },
  toggle: {
    label: "Sidebar",
    shortcut: "Switch sidebar (⌘⇧A)"
  },
  add: {
    title: "Add a computer",
    description: "Paste the pairing link from Settings › Mobile in Alma on that computer.",
    link: "Pairing link",
    name: "Name",
    optional: "optional",
    checking: "Checking the link…",
    add: "Add"
  },
  manage: {
    title: "Computers",
    description: "Computers whose agents you can drive from here.",
    empty: "No other computers yet.",
    name: "Name",
    forget: "Forget",
    forgetTitle: "Forget {{name}}?",
    forgetDescription: "You'll need its pairing link to add it again."
  },
  rename: {
    placeholder: "Name",
    rename: "Rename",
    tabTitle: "Rename tab",
    workspaceTitle: "Rename workspace"
  },
  newWorkspace: {
    title: "New workspace",
    folder: "Folder",
    folderHint: "A folder on that computer. Leave it empty for the home folder.",
    recent: "Recent",
    name: "Name",
    start: "Start",
    nothing: "Nothing",
    create: "Create",
    menu: "New workspace…"
  },
  host: {
    thisMac: "This Mac",
    thisComputer: "This computer",
    computers: "Computers",
    add: "Add computer…",
    manage: "Manage computers…",
    reconnect: "Reconnect",
    noKeychain: "This computer can't store keys safely, so it can't remember other computers."
  },
  route: {
    notConnected: "Not connected",
    direct: "Local network",
    relay: "Via relay",
    connecting: "Connecting…",
    relayReconnecting: "Reconnecting · via relay",
    offline: "Offline",
    directToast: "On your local Wi-Fi",
    directToastDetail: "Straight to your computer. Faster and smoother."
  },
  sidebar: {
    agentsOn: "Agents on {{name}}",
    more: "More",
    reconnect: "Reconnect",
    needsYou: "Needs you",
    panes_one: "{{count}} pane",
    panes_other: "{{count}} panes",
    workspaces: "Workspaces",
    newTab: "New tab",
    today: "Today",
    yesterday: "Yesterday",
    earlier: "Earlier",
    allProjects: "All projects",
    all: "All",
    needsInput: "Needs input",
    done: "Done",
    working: "Working…",
    nothingHere: "No conversations here yet",
    unread: "Unread",
    showUnread: "Show only unread",
    showAll: "Show all",
    allRead: "All caught up"
  },
  newTab: {
    button: "New tab",
    failed: "Couldn't open a new tab: {{error}}",
    elsewhere: "In another workspace"
  },
  sort: {
    label: "Sort",
    herdr: "As in herdr",
    status: "By status",
    name: "By name"
  },
  menu: {
    renameWorkspace: "Rename workspace…",
    muteWorkspace: "Mute notifications",
    unmuteWorkspace: "Unmute notifications",
    moveUp: "Move up",
    moveDown: "Move down",
    closeWorkspace: "Close workspace…",
    renameTab: "Rename tab…",
    muteTab: "Mute notifications",
    unmuteTab: "Unmute notifications",
    closeTab: "Close tab…",
    muteFailed: "Couldn't change notifications: {{error}}",
    moveFailed: "Couldn't move it: {{error}}"
  },
  close: {
    title: "Close {{name}}?",
    tabDescription: "The agent in this tab quits. Its session stays on the computer.",
    workspaceDescription: "Every tab in this workspace closes, and their agents quit.",
    tabAction: "Close tab",
    workspaceAction: "Close workspace",
    failed: "Couldn't close it: {{error}}"
  },
  empty: {
    connecting: "Connecting…",
    unreachable: "Can't reach {{name}}",
    tooOld: "Update Alma on that computer to use its agents here.",
    offline: "herdr isn't running",
    offlineDetail: "Start herdr on that computer and its agents show up here.",
    noWorkspaces: "No workspaces",
    noWorkspacesDetail: "Start one to run an agent in a folder."
  },
  status: {
    blocked: "Needs input",
    working: "Working",
    done: "Done",
    idle: "Idle",
    unknown: "—"
  },
  page: {
    pick: "Agents on {{name}}",
    pickDetail: "Pick an agent in the sidebar to chat with it or see its screen.",
    paneClosed: "Pane closed",
    paneClosedDetail: "This pane is no longer open on your computer.",
    nothingWaiting: "Nothing needs you right now",
    all: "All",
    nothingWaitingDetail: "Agents that finish or ask you something show up here.",
    nothingWorking: "No agent is working",
    nothingWorkingDetail: "Agents busy with a turn show up here.",
    noAgents: "No agents yet",
    noAgentsDetail: "Start one with the new-tab button at the top of the sidebar."
  },
  remoteScreen: {
    title: "Remote Screen",
    open: "See and control {{name}}'s screen",
    video: "Live",
    stills: "Snapshots",
    clickToControl: "Click to control",
    typing: "Typing goes there",
    unavailable: "Can't see {{name}}'s screen",
    unavailableDetail: "Open Alma on that Mac and allow Screen Recording and Accessibility.",
    thisComputer: "This is the computer you're on"
  },
  simulator: {
    title: "Simulator",
    open: "Open a simulator or Android emulator on this computer",
    openLocal: "Open Simulator",
    home: "Home (⌘⇧H)",
    screenshot: "Screenshot (⌘S)",
    rotate: "Rotate (⌘← ⌘→)",
    shake: "Shake",
    hardware: "Device buttons",
    lock: "Lock",
    volumeUp: "Volume Up",
    volumeDown: "Volume Down",
    popOut: "Pop out",
    dock: "Dock beside the chat",
    close: "Close",
    keepOnTop: "Keep on top",
    saved: "Screenshot saved to Downloads and copied",
    none: "No simulators or emulators on this computer. Install Xcode or Android Studio there, or update its Alma.",
    other: "Other",
    running: "Running",
    gone: "This simulator was shut down.",
    booting: "Starting the simulator…",
    failed: "Can't show the simulator on {{name}}",
    back: "Back (⌘⌫)",
    homeAndroid: "Home",
    recents: "Recents",
    power: "Power"
  },
  pane: {
    chat: "Chat",
    screen: "Terminal",
    view: "View",
    showScreen: "Show terminal",
    working: "Working…"
  },
  chat: {
    loadEarlier: "Load earlier messages",
    noTranscriptYet: "The agent hasn't written anything in this session yet.",
    noTranscript: "This pane's agent doesn't share a transcript. Use the screen view instead.",
    unsupportedAgent: "Update Alma on your computer to read {{name}}'s chats here. Use the screen view until then.",
    queued_one: "Queued",
    queued_other: "{{count}} queued",
    sentWhileWorking: "Sent while working",
    recap: "Recap",
    teammateMessage: "Message from @{{name}}",
    thinking: "Thinking",
    toBottom: "Scroll to bottom"
  },
  composer: {
    placeholder: "Message {{name}}",
    attach: "Attach files",
    send: "Send",
    edit: "Edit",
    file: "File",
    remove: "Remove",
    tooBig: "{{name}} is over 30 MB.",
    suggestionHint: "Click to send. Right-click to edit first."
  },
  annotate: {
    action: "Annotate",
    title: "Annotate image",
    header: "Marks on the image (numbers match the regions):",
    regionPlaceholder: "What about this spot?",
    notePlaceholder: "Anything else to say (optional)",
    hint: "Draw on the image where you mean, then say what each spot is about",
    add: "Add to message",
    loadFailed: "Couldn't load the image."
  },
  restart: {
    restart: "Restart {{name}}",
    restartDetail: "Quit and open the same session",
    "continue": "Restart & Continue",
    continueDetail: "Then send “{{prompt}}”",
    quitting: "Quitting {{name}}…",
    reopening: "Reopening the session…",
    back: "{{name}} is back",
    retry: "Retry",
    line: "Restarted · {{time}}"
  },
  prompt: {
    waiting: "Waiting for you",
    typeSomething: "Type something",
    changed: "The question changed on the computer. Nothing was sent."
  },
  screen: {
    loading: "Reading the screen…",
    reflow: "Wrap to window",
    original: "Original width",
    fit: "Shrink to fit",
    width: "Screen width",
    smaller: "Smaller text",
    larger: "Larger text",
    typeCommand: "Type a command",
    terminalInput: "Terminal input",
    clickToType: "Click to type in the terminal",
    send: "Send",
    showKeys: "Show keys",
    hideKeys: "Hide keys"
  },
  subagent: {
    title: "Subagent",
    working: "Working",
    failed: "Failed",
    done: "Done",
    calls_one: "{{count}} tool call",
    calls_other: "{{count}} tool calls",
    outdated: "Update Alma on your computer to follow the subagent's own steps. Its result is below.",
    missing: "This Claude Code version keeps no transcript for the subagent.",
    loadFailed: "Couldn't load the subagent",
    pill_one: "{{count}} subagent working",
    pill_other: "{{count}} subagents working",
    openLog: "Open the subagent's log"
  },
  errors: {
    http: "The computer answered with HTTP {{status}}."
  },
  time: {
    now: "now",
    minutes: "{{count}}m",
    hours: "{{count}}h"
  },
  steps: {
    separator: ", ",
    command_one: "ran {{count}} command",
    command_other: "ran {{count}} commands",
    edit_one: "edited {{count}} file",
    edit_other: "edited {{count}} files",
    read_one: "read {{count}} file",
    read_other: "read {{count}} files",
    search_one: "searched once",
    search_other: "searched {{count}} times",
    web_one: "looked up {{count}} page",
    web_other: "looked up {{count}} pages",
    agent_one: "ran {{count}} subagent",
    agent_other: "ran {{count}} subagents",
    other_one: "{{count}} other step",
    other_other: "{{count}} other steps"
  }
};
const en = {
  timeClues: timeClues$2,
  remoteHandoff: remoteHandoff$2,
  dateReference: dateReference$2,
  conversationTime: conversationTime$2,
  app: app$2,
  navigation: navigation$2,
  providers: providers$2,
  chat: chat$2,
  reasoning: reasoning$2,
  settings: settings$2,
  main: main$2,
  languageSwitcher: languageSwitcher$2,
  speech: speech$2,
  titlebar: titlebar$2,
  share: share$2,
  label: label$2,
  common: common$2,
  phone: phone$2,
  sidebar: sidebar$2,
  windowControls: windowControls$2,
  errors: errors$2,
  warnings: warnings$2,
  gallery: gallery$2,
  capture: capture$2,
  liveCoding: liveCoding$2,
  onboarding: onboarding$2,
  updater: updater$2,
  promptApps: promptApps$2,
  artifact: artifact$2,
  fileExplorer: fileExplorer$2,
  projectCard: projectCard$2,
  workspace: workspace$2,
  github: github$2,
  taskTool: taskTool$2,
  hooks: hooks$2,
  modelCapabilities: modelCapabilities$1,
  providerStatus: providerStatus$2,
  askUserQuestion: askUserQuestion$2,
  commandPalette: commandPalette$2,
  toolGroupSummary: toolGroupSummary$2,
  minesweeper: minesweeper$2,
  activity: activity$2,
  infographic: infographic$2,
  branchNav: branchNav$2,
  toolBlock: toolBlock$2,
  threadResources: threadResources$2,
  toolRuns: toolRuns$2,
  goalLoop: goalLoop$2,
  webPreview: webPreview$2,
  a11yRequest: a11yRequest$2,
  artifactsUi: artifactsUi$2,
  quickChat: quickChat$2,
  references: references$2,
  channels: channels$2,
  support: support$2,
  crystal: crystal$2,
  mentions: mentions$2,
  projectSuggestion: projectSuggestion$2,
  threadBrief: threadBrief$2,
  layout: layout$2,
  translate: translate$2,
  codeBlock: codeBlock$2,
  ttsDownload: ttsDownload$2,
  team: team$2,
  herdr: herdr$2
};
const timeClues$1 = {
  title: "时间线索",
  description: "对话里提到的日期，点开即可回到原文。",
  unread: "今天有 {{count}} 条未读线索",
  ranges: {
    today: "今天",
    "this week": "本周",
    "next week": "下周"
  },
  start: "开始日期",
  end: "结束日期",
  custom: "选择日期",
  previousMonth: "上个月",
  nextMonth: "下个月",
  dateOnly: "—",
  otherInThread: "本对话中的其他日期",
  currentThread: "当前对话",
  teamSource: "{{author}} 在 {{channel}}",
  openSource: "查看原消息",
  about: "关于时间线索",
  unreadOne: "未读线索",
  ignore: "忽略",
  scheduledTask: "定时任务",
  scheduledFired: "已执行",
  currentAndToday: "本 Thread 的线索 + 今天的跨 Thread 命中",
  failed: "线索加载失败。",
  empty: "这些日期暂无已索引的线索。",
  unresolved: "日期待确认",
  previous: "上一页",
  next: "下一页",
  markSeen: "将显示的今日线索标为已读",
  seenFailed: "已读状态保存失败，请重试。",
  coverage: "仅覆盖新的人类原消息及明确索引的来源。时间表达由工具模型智能识别（周一、大后天、next Friday……）；未配置工具模型时退回一套固定语法。相对日期依据原消息时间及时区。红点仅表示未读，不表示逾期或未完成。不会自动创建提醒。"
};
const remoteHandoff$1 = {
  download: "下载到当前电脑",
  title: "连接另一台电脑上的项目",
  description: "在原主机启用远程访问与端到端加密，复制配对链接到这里。新窗口使用原主机的项目、对话、模型、Skills 与 MCP，无需重新配置；文件上传到原主机，结果下载到当前电脑。原主机必须保持在线。",
  placeholder: "粘贴自己原主机的加密 Alma 配对链接",
  connect: "打开项目接力窗口",
  security: "配对链接相当于主机访问钥匙，请勿分享。窗口使用临时隔离会话；关闭会清除本机缓存，不会停止原主机任务。记住的主机只保存配对链接，并由系统钥匙串加密，可随时点 × 移除。本机应用操作不可用。",
  open: "打开",
  forget: "移除此主机",
  remember: "在此电脑上记住此主机",
  labelPlaceholder: "名称（可选），例如 办公室 Mac"
};
const dateReference$1 = {
  invalid: "无效的日期引用",
  endExclusive: "结束日期不包含在范围内",
  coverage: "对话按消息时间发现；工作记录分别保留发生日、截止日和完成日；提醒按到期时间关联。日期引用只读，不会自动安排任务。原文整理需主动点击，日历读取可能请求主机权限。",
  indexOriginal: "整理这条对话的原文时间记录",
  indexing: "正在逐页整理原文…",
  workRecords: "关联工作记录",
  workCoverage: "模型整理，仅覆盖主动整理过的原文；请核对引句。旧记录按实际日期关联，不按补录日计入成果。无结果不代表历史中不存在，文件和其他 App 仍需核查。",
  eventDate: "发生日",
  dueDate: "截止日",
  completedDate: "完成日",
  states: {
    completed: "已完成（原文声明）",
    "in-progress": "进行中",
    planned: "计划",
    unconfirmed: "待确认"
  },
  projected: "按规则预计到期，并非已执行",
  previouslyRun: "曾执行；成功与否需核对运行记录",
  runHistory: "提醒的实际执行记录",
  runCoverage: "仅覆盖保留下来的执行记录，并非完整历史。提醒执行成功不代表事项本身已完成。",
  runStarted: "开始执行",
  runFinished: "执行结束",
  runPreview: "结果预览已截断，请核查原始对话或执行历史。",
  runStates: {
    running: "正在执行",
    succeeded: "执行成功",
    failed: "执行失败",
    unconfirmed: "结果待确认"
  },
  calendar: "主机日历安排",
  readCalendar: "读取主机日历（只读）",
  retry: "重试",
  noCalendarEvents: "主机日历在此范围没有安排。",
  conversations: "此期间有消息的对话",
  noConversations: "此期间没有找到消息，不代表没有工作成果。",
  moreSources: "还存在更多来源，当前列表并非完整覆盖。",
  reminders: "此期间到期的提醒与周期安排",
  noReminders: "没有找到可确定到期时间的提醒。"
};
const conversationTime$1 = {
  created: "创建时间",
  firstConversation: "首次对话",
  lastConversation: "最后对话",
  lastKnownConversation: "已知最后对话",
  lastActivity: "最后活动",
  partialCoverage: "对话时间仅覆盖已打开的 Thread，旧的未读 Thread 尚未建立索引。"
};
const app$1 = {
  name: "Alma",
  description: "优雅的 AI 提供商编排桌面应用",
  updateBadge: {
    label: "有可用更新",
    updating: "更新中…",
    dismiss: "忽略"
  }
};
const navigation$1 = {
  main: "主页",
  providers: "提供商",
  chat: "聊天",
  settings: "设置"
};
const providers$1 = {
  title: "AI 提供商",
  add: "添加提供商",
  edit: "编辑提供商",
  "delete": "删除提供商",
  name: "名称",
  type: "类型",
  apiKey: "API 密钥",
  baseUrl: "基础 URL",
  model: "模型",
  actions: "操作",
  enable: "启用",
  disable: "禁用",
  enabled: "已启用",
  disabled: "已禁用",
  deleteConfirm: "确定要删除此提供商吗？",
  getStarted: '点击"添加提供商"开始使用',
  noProviders: "暂无提供商",
  providerName: "提供商名称",
  providerNameRequired: "提供商名称不能为空",
  apiKeyRequired: "API 密钥不能为空",
  modelRequired: "模型名称不能为空",
  invalidUrl: "请输入有效的 URL 格式",
  baseUrlRequired: "自定义提供商需要基础 URL",
  saveFailed: "保存失败",
  addNew: "添加新提供商",
  editConfig: "编辑提供商配置",
  providerType: "提供商类型",
  apiKeySecure: "API 密钥安全存储在本地，不会上传到服务器",
  openai: {
    name: "OpenAI",
    description: "GPT 系列模型"
  },
  anthropic: {
    name: "Anthropic",
    description: "Claude 系列模型"
  },
  google: {
    name: "Google",
    description: "Gemini 系列模型"
  },
  custom: {
    name: "自定义",
    description: "自定义 OpenAI 兼容 API"
  },
  aihubmix: {
    name: "AiHubMix",
    description: "安全便宜快速，可以使用支付宝支付",
    affiliateNoteBefore: "通过",
    affiliateLinkText: "此链接",
    affiliateNoteAfter: "注册可以帮助 Alma 获得一点收益以持续开发，感谢您的支持！"
  },
  volcengine: {
    name: "火山引擎",
    description: "火山引擎方舟（豆包）模型，支持对话和图片生成"
  },
  moonshot: {
    name: "Moonshot",
    description: "月之暗面 (Kimi) 模型，支持超长上下文",
    region: "区域",
    regionChina: "中国大陆 (api.moonshot.cn)",
    regionInternational: "国际版 (api.moonshot.ai)",
    regionHint: "中国大陆用户选择中国大陆，其他地区用户选择国际版"
  },
  baseUrlOptional: "（可选，留空使用默认值）",
  baseUrlOptionalDescription: "可选，留空使用官方 API 地址",
  modelPlaceholder: "例如：gpt-4o-mini, claude-sonnet-4",
  testConnection: "测试连接",
  selectModelToTest: "选择要测试的模型",
  noModelsFound: "未找到模型",
  connectionSuccess: "连接成功！",
  connectionFailed: "连接测试失败",
  noModelsEnabled: "请先启用至少一个模型再测试连接",
  configure: "配置提供商",
  enableProvider: "启用此提供商",
  namePlaceholder: "我的自定义提供商",
  configDescription: "配置 AI 提供商访问信息。所有数据都安全存储在本地。"
};
const chat$1 = {
  workedFor: "耗时 {{duration}}",
  backgroundAgentsRunning: "后台 {{count}} 个 agent 运行中 · 完成后自动继续",
  title: "聊天",
  newChat: "新建聊天",
  newChatDragHint: "新对话 — 拖到对话区边缘可分屏新建",
  editMode: "编辑",
  splitPane: {
    close: "关闭分屏",
    openLeft: "在左侧打开",
    openRight: "在右侧打开",
    openBottom: "在下方打开",
    pairedWith: "与「{{title}}」分屏打开",
    ungroup: "打散分屏",
    leaveGroup: "移出分屏组"
  },
  sendMessage: "发送消息",
  typing: "输入消息...",
  clearHistory: "清除历史",
  noHistory: "暂无聊天记录",
  startChatting: "开始对话",
  messages: "条消息",
  selectModel: "选择模型",
  noModelsAvailable: "无可用模型",
  generationError: "生成错误",
  stopGeneration: "停止生成",
  steer: "插话",
  steerGeneration: "立即发送 — 引导当前回答",
  compose: "撰写",
  aiAvatarLabel: "A",
  aiThinking: "思考中...",
  followBottom: "跟随底部",
  historyBack: "后退",
  historyForward: "前进",
  historyBackTo: "后退到“{{title}}”",
  historyForwardTo: "前进到“{{title}}”",
  autoCompact: {
    compacting: "正在压缩上下文...",
    compacted: "已压缩 {{count}} 条消息",
    compactedTitle: "上下文已压缩",
    savedTokens: "节省了约 {{tokens}} 个 token",
    indicatorTitle: "上下文已压缩",
    indicatorMessages: "{{count}} 条消息已摘要",
    indicatorTokens: "节省约 {{saved}} tokens"
  },
  compact: {
    success: "已压缩 {{count}} 条消息，节省约 {{tokens}} 个 token",
    error: "压缩上下文失败",
    noMessages: "消息数量不足，无法压缩",
    commandDescription: "压缩对话历史以节省 token"
  },
  contextUsage: {
    title: "上下文使用量",
    tokens: "{{used}} / {{total}} tokens",
    compactNow: "立即压缩",
    autoCompactAt: "达到 {{percent}}% 时自动压缩",
    autoCompactOff: "自动压缩已关闭",
    overflowNotice: "上下文已超限，下一条消息发送前将自动压缩。",
    compactFailed: "压缩失败",
    nothingToCompact: "没有可压缩的内容"
  },
  queuedMessages: {
    count_other: "{{count}} 条待发送消息",
    sendNow: "立即发送待发送消息",
    files: "个文件",
    clickToEdit: "点击编辑",
    steerHint: "插话 — 立即把这条消息注入正在生成的回答",
    steerError: "插话失败，无法引导当前回答"
  },
  renderFailed: {
    title: "这条消息无法显示。",
    retry: "重试"
  },
  fileReference: {
    notFound: "工作区里没有找到 {{name}}"
  },
  taskResume: {
    resumeAsNewRun: "从中断处重试",
    resuming: "正在重试…",
    runLabel: "运行 {{index}}",
    resumeHint: "会从当前中断点重新启动一轮新的运行。",
    resumeFailed: "恢复中断任务失败",
    noOutput: "无输出",
    statusCompletedNoOutput: "任务已完成，无文本输出",
    statusFailedNoDetail: "任务已失败，未提供错误详情",
    statusNotFound: "未找到该任务，可能已被清理",
    statusStillRunning: "任务仍在运行中"
  },
  todo: {
    progress: "已完成 {{completed}} / {{total}} 个任务",
    clear: "清除任务列表"
  },
  plan: {
    rework: "正在返工 {{ref}} 的评审反馈",
    feedbackOpen: "评审 {{ref}} 要求返工",
    after: "先做 {{deps}}"
  },
  crew: {
    title: "Crew",
    kicker: "Agent Crew",
    mission: "Mission",
    run: "执行",
    handoff: "交接",
    handoffs: "交接数",
    running: "进行中",
    completed: "已完成",
    delegated: "委派给",
    spawned: "派生出",
    deliverable: "交付物",
    summary: "{{missions}} 个 mission，{{runs}} 次执行，{{active}} 个活跃",
    empty: "这个线程里还没有派生出 specialist。",
    emptyHint: "当 Alma 把工作委派给 Designer、Developer、Researcher 或其他 specialist 后，这里就会出现 mission graph。",
    phase: "阶段",
    sprint: "冲刺",
    contract: "契约",
    evaluation: "评估",
    attempt: "尝试",
    passed: "通过",
    failed: "失败",
    criteria: "个标准",
    planning: "规划中",
    contracting: "订立契约中",
    generating: "生成中",
    evaluating: "评估中",
    iterating: "迭代中",
    harnessMode: "冲刺编排",
    jumpToWork: "跳转到工作现场"
  },
  messageMenu: {
    copy: "复制",
    copyAsMarkdown: "复制为 Markdown",
    copyAsPlainText: "复制为纯文本",
    readAloud: "朗读",
    stopReading: "停止朗读",
    regenerate: "重新生成",
    regenerateDisabled: "重新生成（不可用）",
    more: "更多",
    usage: "用量",
    context: "上下文",
    inputTokens: "输入 Token",
    outputTokens: "输出 Token",
    cacheRead: "缓存读取",
    cacheHitRate: "缓存命中率",
    cacheWrite: "缓存写入",
    totalTokens: "总 Token",
    timeToFirstToken: "首个 Token 时间",
    tokensPerSecond: "Token/秒",
    turnEndReason: "Turn 结束原因",
    previousVersion: "上一版本",
    nextVersion: "下一版本",
    branchCreated: "分支已创建",
    creatingBranch: "正在创建分支…",
    createBranch: "创建分支",
    deleteMessage: "删除消息",
    memory: "记忆",
    usedMemories: "使用的记忆",
    createdMemories: "创建的记忆",
    deletedMemories: "删除的记忆",
    noMemories: "无关联记忆",
    rollback: "回滚文件",
    viewTrace: "查看 Trace"
  },
  trace: {
    title: "执行 Trace",
    loading: "正在加载 Trace…",
    none: "这条消息没有记录 Trace。",
    steps: "步"
  },
  rollback: {
    title: "回滚到此消息",
    description: "这将把所有文件恢复到发送这条消息时的状态，撤销 AI 回复及之后所有消息的文件修改。",
    filesOnly: "仅回滚文件",
    filesOnlyDescription: "恢复文件到发送此消息时的状态，但保留所有对话历史",
    filesAndMessages: "回滚文件和消息",
    filesAndMessagesDescription: "恢复文件到发送此消息时的状态，并删除此消息之后的所有消息（包括 AI 回复）",
    confirm: "回滚",
    rollingBack: "正在回滚…"
  },
  toolPermission: {
    awaitingApproval: "等待批准",
    approved: "已批准",
    denied: "已拒绝",
    permissionRequired: "需要授权",
    approve: "批准",
    deny: "拒绝",
    decidedAt: "决定时间：{{time}}",
    toolPermissionRequired: "需要工具权限",
    allow: "允许",
    allowOnce: "允许一次",
    alwaysAllow: "始终允许",
    denyWithReason: "拒绝并说明原因",
    submitDenyReason: "提交拒绝原因"
  },
  permission: {
    awaitingApproval: "等待批准",
    approved: "已批准",
    approvedAll: "已批准（此对话已启用自动批准）",
    denied: "已拒绝",
    accept: "允许",
    acceptAll: "全部允许",
    rejectWithReason: "拒绝",
    reject: "拒绝",
    rejectReasonPlaceholder: "输入拒绝原因（可选）...",
    reason: "原因",
    decidedAt: "决定时间"
  },
  imageAnnotate: {
    button: "标注编辑",
    buttonTitle: "在图片上标注并交给 AI 修改",
    imageButtonTitle: "标注编辑 — 在图上画标记交给 AI 修改",
    tool: {
      select: "选择",
      rect: "框选",
      ellipse: "圈出",
      brush: "画笔",
      arrow: "箭头"
    },
    color: "颜色",
    undo: "撤销",
    redo: "重做",
    clearAll: "清除全部",
    exit: "退出标注",
    regionPlaceholder: "这里要怎么改？",
    removeRegion: "删除该区域",
    overallNotePlaceholder: "整体说明（可选）：风格 / 光线 / 不要动的地方…",
    apply: "应用编辑",
    applyDisabledHint: "先在图上画一处并写说明",
    applyShortcut: "⌘↵",
    canvasHint: "在图上画出要改的地方，每处会就地浮现说明框，写上「这里要怎么改」",
    prompt: {
      directive: "请直接编辑下面这张已标注的图片（务必用图像编辑能力在原图上修改，不要重新生成一张新图）。",
      sourcePathLabel: "要编辑的源图片本地路径（请用它作为编辑输入）：",
      visibleHeader: "🖌️ 请按下面的标注修改这张图片（序号对应图上的区域）：",
      overallLabel: "整体说明："
    }
  },
  mermaidAnnotate: {
    buttonTitle: "标注编辑 — 在图上圈出要改的地方，让 AI 重写图表",
    cardTitle: "图表标注编辑",
    prompt: {
      directive: "附件图片是一张 Mermaid 图表的渲染预览，上面带有编号标注。请按编号要求修改这张图表的 Mermaid 源码，并以完整的 ```mermaid 代码块回复更新后的图表——不要生成或编辑任何图片。",
      sourceLabel: "该图表当前的 Mermaid 源码：",
      visibleHeader: "🖌️ 请按下面的标注修改这张图表（编号对应标注预览图上的位置）："
    }
  },
  imageMenu: {
    copyImage: "复制图片",
    openImage: "打开图片",
    saveImage: "保存图片"
  },
  artifacts: {
    button: "Artifacts",
    enabled: "Artifacts 模式已开启",
    disabled: "Artifacts 模式已关闭"
  },
  capabilities: {
    button: "工具与技能",
    searchPlaceholder: "搜索工具与技能…"
  },
  tools: {
    button: "工具",
    noneSelected: "未启用任何工具",
    someSelected: "已启用 {{count}} 个工具",
    selectedCount: "{{count}} 个工具",
    description: "允许 Alma 在下一次回复时使用所选工具。",
    selectAll: "全选",
    clearAll: "全不选",
    auto: "自动",
    autoDescription: "让 Alma 根据你的消息自动选择最相关的工具。",
    autoSelectedTools: "自动选择的工具：",
    selectGroup: "全选该分类",
    clearGroup: "全不选该分类",
    switchLayout: "切换布局",
    groups: {
      workspace: "项目与文件",
      shell: "Shell 与进程",
      web: "网络与搜索",
      planning: "规划与指令"
    },
    items: {
      Task: {
        label: "任务委派",
        description: "启动托管子代理来处理多步骤任务。"
      },
      TodoWrite: {
        label: "待办同步",
        description: "在执行计划时更新共享待办列表。"
      },
      EnterPlanMode: {
        label: "进入规划模式",
        description: "将对话切换到结构化规划流程。"
      },
      ExitPlanMode: {
        label: "退出规划模式",
        description: "从规划流程回到普通对话。"
      },
      Skill: {
        label: "技能调用",
        description: "调用已保存的技能或工作流。"
      },
      SlashCommand: {
        label: "斜杠指令",
        description: "触发自定义的斜杠命令。"
      },
      Bash: {
        label: "Bash",
        description: "在工作区中执行 Shell 命令。"
      },
      BashOutput: {
        label: "Bash 输出",
        description: "查看最近 Shell 运行的标准输出与标准错误。"
      },
      KillShell: {
        label: "终止 Shell",
        description: "结束正在运行的 Shell 命令。"
      },
      Glob: {
        label: "Glob 文件",
        description: "用 glob 模式列出匹配的文件。"
      },
      Grep: {
        label: "ripgrep 搜索",
        description: "在项目文件中执行 ripgrep 搜索。"
      },
      Read: {
        label: "读取文件",
        description: "读取文件内容以获取上下文。"
      },
      Edit: {
        label: "补丁编辑",
        description: "通过结构化补丁修改文件。"
      },
      Write: {
        label: "写入文件",
        description: "用提供的内容覆盖文件。"
      },
      NotebookEdit: {
        label: "Notebook 编辑",
        description: "通过 Notebook API 批量应用文件修改。"
      },
      WebFetch: {
        label: "网络获取",
        description: "抓取 URL 的原始内容。"
      },
      WebSearch: {
        label: "网络搜索",
        description: "在网上搜索最新信息。"
      },
      ToolSearch: {
        label: "工具搜索",
        description: "按名称或描述搜索和发现可用工具。"
      },
      widgetRenderer: {
        label: "交互组件",
        description: "在聊天中渲染可交互的 HTML/SVG 可视化。"
      },
      pieChart: {
        label: "饼图",
        description: "以交互式饼图展示数据。"
      },
      barChart: {
        label: "柱状图",
        description: "以交互式柱状图展示数据。"
      }
    }
  },
  skills: {
    title: "技能",
    auto: "自动",
    autoDesc: "AI 自动选择相关技能",
    selectAll: "全选",
    clearAll: "清除全部",
    bundled: "内置技能",
    personal: "个人技能",
    claudeCode: "Claude Code 技能",
    marketplace: "应用商店技能",
    project: "项目技能",
    noSkills: "暂无可用技能",
    selectedCount: "{{count}} 个技能",
    autoSelectedSkills: "自动选择的技能：",
    agents: "Agent Skills"
  },
  mcp: {
    button: "MCP 服务器",
    title: "MCP 服务器",
    description: "选择要为此对话启用的 MCP 服务器。",
    selectAll: "全选",
    clearAll: "清除全部",
    noServers: "未安装 MCP 服务器",
    installServers: "安装服务器",
    openSettings: "打开 MCP 设置",
    refresh: "刷新 MCP 服务器",
    error: "错误"
  },
  memory: {
    retrieving: "正在检索记忆...",
    retrievedCount: "{{count}} 条记忆",
    retrievedMemories: "检索到的记忆"
  },
  skillExtraction: {
    title: "技能已提取",
    analyzing: "正在分析对话中的可复用模式...",
    extracting: "正在生成新技能...",
    saving: "正在保存技能...",
    created: "新建",
    updated: "更新",
    viewSkill: "查看技能"
  },
  endResource: {
    open: "打开",
    openMenuLabel: "打开菜单",
    openResource: "打开 {{filename}}",
    revealInFolder: "在访达中显示",
    revealInExplorer: "在资源管理器中显示",
    copyPath: "复制路径",
    pathCopied: "路径已复制",
    copyLink: "复制链接",
    linkCopied: "链接已复制",
    websiteSubtitle: "网页",
    documentFileType: "文档 · {{extension}}",
    spreadsheetFileType: "电子表格 · {{extension}}",
    presentationFileType: "幻灯片 · {{extension}}",
    imageFileType: "图片 · {{extension}}",
    archiveFileType: "压缩包 · {{extension}}",
    locationProject: "项目",
    locationTemp: "临时",
    locationGlobal: "全局",
    reviewInSidebar: "在 Artifact 侧边栏预览",
    openInApp: "用默认应用打开"
  },
  previewLink: {
    open: "打开预览"
  },
  incognito: {
    button: "隐身模式",
    enabled: "隐身模式已开启 - 此对话的记忆功能已禁用",
    disabled: "隐身模式已关闭 - 点击禁用记忆功能"
  },
  commands: "命令",
  commandsAndPrompts: "命令和提示词",
  commandsAndSkills: "命令和技能",
  promptsAndSkills: "提示词和技能",
  commandsPromptsAndSkills: "命令、提示词和技能",
  skillEnabled: '技能 "{{name}}" 已启用',
  skillDisabled: '技能 "{{name}}" 已禁用',
  workspaceFiles: "项目文件",
  noFilesFound: "没有找到文件",
  typeToFilter: "输入以筛选更多文件...",
  imageAspect: {
    title: "宽高比",
    description: "生成图片的画面比例——AI 生成或编辑图片时生效。",
    auto: "自动"
  },
  queueMessage: "加入队列",
  queueMessageHint: "加入待发送队列 — 点「插话」立即注入本轮，或等本轮结束后自动发送",
  permissionRequest: "权限请求",
  systemNote: "系统提示",
  dropFilesHere: "拖放文件到此处",
  modelPicker: {
    favorites: "收藏",
    favorite: "收藏模型",
    unfavorite: "取消收藏"
  },
  modelSelectorError: "模型选择器出错",
  denialReasonPlaceholder: "输入拒绝原因...",
  downloadFile: "下载文件"
};
const reasoning$1 = {
  thinking: "思考中...",
  thought: "思考完成",
  duration: "思考了 {{duration}} 秒",
  button: "推理",
  description: "调整支持扩展思考的模型的推理强度。",
  fast: "Fast",
  fastDesc: "约快 1.5 倍，额度消耗也更快。子 Agent 跟随。",
  effortDesc: {
    off: "禁用扩展思考",
    low: "快速响应，最少推理",
    medium: "平衡速度与推理深度",
    high: "深度推理，适合复杂任务",
    xhigh: "最强推理强度，适合最复杂任务",
    max: "极高推理深度",
    ultra: "至强推理深度，适合最苛刻的任务"
  }
};
const settings$1 = {
  plugins: {
    providerSetupHint: "安装 Provider 插件后，请前往 {link} 完成后续配置。",
    providersPageLink: "Providers 页面",
    updatesBadge: "插件更新 ({{count}})",
    updatesAvailable: "{{count}} 个插件有可用更新",
    updateAll: "全部更新"
  },
  title: "设置",
  searchSettings: "搜索",
  language: "语言",
  theme: "主题",
  save: "保存",
  cancel: "取消",
  appearance: {
    light: "浅色",
    dark: "深色",
    system: "跟随系统"
  },
  appIcon: {
    title: "应用图标",
    description: "选择你喜欢的应用图标，将应用于 Dock、任务栏和托盘。"
  },
  startup: {
    title: "启动设置",
    autoStart: "开机启动",
    startMinimized: "启动时最小化到系统托盘"
  },
  window: {
    title: "窗口行为",
    minimizeToTray: "最小化到系统托盘",
    closeToTray: "关闭到系统托盘",
    hideDockIcon: "隐藏 Dock 图标（仅菜单栏模式）",
    hideDockIconDesc: "启用后，应用图标将从 Dock 中隐藏，仅显示在菜单栏中（仅限 macOS）",
    hideMenuBarIcon: "隐藏菜单栏图标",
    hideMenuBarIconDesc: "从菜单栏移除 Alma。仍可通过 Dock 图标和快速对话快捷键打开应用，因此不能与隐藏 Dock 图标同时启用",
    hideTrayIcon: "隐藏系统托盘图标",
    hideTrayIconDesc: "从系统托盘移除 Alma；仍可通过任务栏和快速对话快捷键打开应用",
    trayDescription: "启用时，点击关闭按钮将隐藏应用到系统托盘而不是退出"
  },
  quickChat: {
    title: "快速对话",
    hideOnBlur: "失焦时自动隐藏",
    hideOnBlurDesc: "开启后，Quick Chat 窗口在失去焦点时会自动隐藏"
  },
  openWindow: "打开设置窗口",
  dataSecure: "所有设置都会实时保存到本地，您的数据完全私密和安全。",
  unsavedChanges: "未保存的更改",
  allSaved: "所有更改已保存",
  saving: "保存中...",
  resetConfirm: "确定要将所有设置重置为默认值吗？此操作无法撤销。",
  resetFailed: "重置设置失败",
  exportFailed: "导出设置失败",
  importFailed: "导入设置失败",
  closeConfirm: "有未保存的更改，确定要关闭吗？未保存的更改将丢失。",
  saveFailed: "保存设置失败",
  saveError: "保存设置失败",
  resetError: "重置设置失败",
  exportError: "导出设置失败",
  importError: "导入设置失败",
  importSettings: "导入设置",
  exportSettings: "导出设置",
  resetSettings: "重置设置",
  more: "更多",
  loadingSettings: "加载设置中...",
  tabRenderError: "此设置页面加载失败，错误已上报。请重试或切换到其他标签页。",
  "interface": "界面",
  responseSettings: "响应设置",
  historySettings: "历史设置",
  soundEffects: "音效",
  soundEffectsCredit: "此功能借鉴自 <author>Ryo Lu</author> 的 <project>ryOS</project>，十分感谢。",
  preview: "试听",
  enableStreamingResponse: "启用流式响应",
  enableMarkdownRendering: "启用 Markdown 渲染",
  autoSaveChatHistory: "自动保存聊天历史",
  encryptApiKeysStorage: "加密 API 密钥存储",
  enableApplicationPasswordProtection: "启用应用程序密码保护",
  changePassword: "更改密码",
  enableOperationLogging: "启用操作日志",
  currentSession: "当前会话",
  clearActiveSessions: "清除活动会话",
  loggingSettings: "日志设置",
  privacySettings: "隐私设置",
  enableAutomaticBackup: "启用自动备份",
  enableCloudSync: "启用云同步",
  backupSettings: "备份设置",
  syncSettings: "同步设置",
  enableProxy: "启用代理",
  proxySettings: "代理设置",
  fontSettings: "字体设置",
  layoutSettings: "布局设置",
  editorSettings: "编辑器设置",
  defaultSettings: "默认设置",
  enableExperimentalFeatures: "启用实验性功能",
  defaultLocation: "默认位置",
  systemError: "错误",
  systemWarn: "警告",
  systemInfo: "信息",
  systemDebug: "调试",
  about: {
    title: "关于",
    description: "Alma 是 <author>yetone</author> 打造的优雅 AI 提供商编排桌面端。",
    version: "当前版本",
    statusLabel: "更新状态",
    checkUpdates: "检查更新",
    checking: "正在检查…",
    lastChecked: "上次检查",
    autoDownload: "自动下载更新",
    autoDownloadDesc: "发现新版本时在后台下载，下载完成后提示重启即可升级。",
    never: "从未",
    unsupportedHint: "自动更新仅适用于已打包的 macOS 和 Windows 版本。",
    status: {
      idle: "空闲",
      checking: "正在检查更新…",
      updateAvailable: "发现新版本！",
      upToDate: "已经是最新版本。",
      downloading: "正在下载更新…",
      downloaded: "更新已下载，重启即可应用。",
      error: "检查更新失败",
      unsupported: "当前构建不支持自动更新。"
    },
    feedback: "发送反馈",
    feedbackDesc: "分享您的想法、报告问题或提出功能建议，帮助我们改进 Alma。",
    discord: "Discord 社区",
    discordDesc: "加入我们的 Discord 服务器，与其他用户交流、获取帮助并了解最新动态。",
    joinDiscord: "加入 Discord"
  },
  memory: {
    title: "记忆",
    description: "管理 AI 记忆和上下文设置",
    memoryFeature: "记忆功能",
    enableMemory: "启用记忆",
    enableMemoryDesc: "启用后，AI 将记住您对话中的重要信息，并使用这些信息提供更个性化的回复。",
    retrieval: "记忆检索",
    autoRetrieve: "自动检索记忆",
    autoRetrieveDesc: "在每次对话前自动搜索并注入相关记忆以提供上下文。",
    maxRetrievedMemories: "最大检索记忆数",
    maxRetrievedMemoriesDesc: "注入对话上下文的相关记忆最大数量（1-20）。",
    similarityThreshold: "相似度阈值",
    similarityThresholdDesc: "检索记忆所需的最低相似度分数。值越高，匹配越严格。",
    looseMatch: "宽松 (0%)",
    strictMatch: "严格 (100%)",
    queryRewriting: "查询重写",
    queryRewritingDesc: "使用工具模型优化你的消息再进行记忆搜索。这会将对话式查询转换为语义搜索词，以获得更好的匹配效果。",
    summarization: "记忆总结",
    autoSummarize: "自动总结对话",
    autoSummarizeDesc: "自动从对话中提取并存储重要信息作为新记忆。",
    embeddingModel: "嵌入模型",
    embeddingModelDesc: "用于语义搜索的嵌入模型。留空则使用默认值（text-embedding-3-small）。",
    selectEmbeddingModel: "选择嵌入模型",
    searchEmbeddingModels: "搜索嵌入模型...",
    defaultModel: "默认",
    useDefaultEmbeddingModel: "使用默认值（text-embedding-3-small）",
    noEmbeddingModelsFound: "未找到嵌入模型",
    localModels: "本地模型",
    downloadingModel: "正在下载模型…",
    loadingModel: "正在加载模型到内存…",
    modelReady: "本地模型已就绪",
    downloadFailed: "模型下载失败",
    dimensions: "维度",
    embeddingModelChanged: "嵌入模型已更改",
    rebuildRequired: "您需要重建所有记忆的嵌入向量才能使用新模型。这将为所有已存储的记忆重新生成嵌入向量。",
    rebuildEmbeddings: "重建嵌入向量",
    manualRebuildDesc: "如有需要，手动重新生成所有记忆的嵌入向量。",
    rebuilding: "正在重建嵌入向量...",
    rebuildCompleted: "嵌入向量重建完成！",
    rebuildFailed: "嵌入向量重建失败",
    starting: "正在启动...",
    cancel: "取消",
    retry: "重试",
    confirmEmbeddingChange: "更换嵌入模型？",
    confirmEmbeddingChangeDesc: "更换嵌入模型需要重建所有记忆的嵌入向量。此过程可能需要一些时间，具体取决于记忆数量。是否继续？",
    requirements: "使用要求",
    requirementsDesc: "记忆功能需要配置一个带有 API Key 的 OpenAI 提供商来生成嵌入向量。请确保您已设置至少一个 OpenAI 提供商。",
    statistics: "统计",
    totalMemories: "记忆总数",
    autoGenerated: "自动生成",
    manuallyAdded: "手动添加",
    addMemory: "添加记忆",
    addMemoryPlaceholder: "输入您希望 AI 记住的内容...",
    addMemoryButton: "添加记忆",
    adding: "添加中...",
    searchMemories: "搜索记忆",
    searchPlaceholder: "按语义相似度搜索...",
    rewrittenAs: "实际搜索：",
    searchResults: "搜索结果",
    match: "匹配",
    memoryList: "记忆列表",
    clearAll: "清空全部",
    clearAllConfirm: "确定要删除所有记忆吗？此操作无法撤销。",
    loading: "加载中...",
    noMemories: "暂无记忆。记忆会从您的对话中自动创建，或者您可以手动添加。",
    auto: "自动",
    manual: "手动",
    permanent: "长期",
    temporary: "临时",
    permanentDesc: "不太可能改变的长期记忆（如偏好、个人信息）",
    temporaryDesc: "可能过期的短期记忆（如当前项目、进行中的任务）",
    accessedTimes: "已访问 {{count}} 次",
    fromChat: "来自对话",
    viewMessage: "查看消息",
    sleep: {
      title: "记忆睡眠",
      enable: "启用每日记忆整理",
      enableDesc: "每天在下方设定的时间点对记忆库做一次整理：归档完全重复的条目、清理过期的临时记忆、合并语义近似的条目。机器在设定时间未开机时，下次启动时会自动补跑。被移除的条目会进入归档，可以从中恢复。",
      summary: "已归档 {{archived}} · 下次：{{date}} {{time}}",
      time: "触发时间",
      timeDesc: "每天本地触发时间。03:00 默认避开使用高峰，可改成你想要的任意时间。",
      runNow: "立即运行睡眠周期",
      running: "运行中…",
      cancel: "取消",
      lastCycle: "上次：{{status}}（{{trigger}}）",
      examined: "检查 {{examined}} 条 · 归档 {{exact}} 条完全重复、{{expired}} 条过期、{{similarity}} 条近似、{{llm}} 条 LLM 合并",
      errorPrefix: "错误：{{message}}",
      retention: "保留策略",
      temporaryTtl: "临时记忆 TTL（天）",
      temporaryTtlDesc: "超过该天数仍未被访问的临时记忆会被归档。",
      archiveRetention: "归档保留（天）",
      archiveRetentionDesc: "归档中的记忆超过该天数会被彻底删除，超出后无法恢复。",
      advancedToggle: "相似度与 LLM 合并参数",
      similarityLabel: "相似度合并阈值：{{percent}}%",
      similarityDesc: "余弦相似度高于此阈值的条目视为近似重复，直接合并，不调用 LLM。",
      useLlm: "使用 LLM 合并模糊相似的条目",
      llmLowLabel: "LLM 合并下界：{{percent}}%",
      llmLowDesc: "相似度在此值与上方阈值之间的条目会送到记忆工具模型，由它保守判断是否合并。",
      llmBatchSize: "LLM 单次批量大小",
      llmBatchSizeDesc: "一次合并提示送给模型的最大簇成员数。",
      archiveSection: "归档记忆（{{total}}）",
      noArchive: "暂无归档记忆。",
      restore: "恢复",
      recentRuns: "近期运行（{{count}}）",
      genericFailure: "睡眠周期失败",
      failedToRun: "运行睡眠周期失败",
      failedToRestore: "恢复失败",
      reason: {
        exact_dup: "完全重复",
        expired: "已过期",
        orphan: "孤立条目",
        similarity_merge: "近似（向量）",
        llm_merge: "LLM 合并",
        manual: "手动"
      },
      retry: "重试",
      progressTitle: "正在运行睡眠周期",
      stage: {
        exact: "正在移除完全重复…",
        expired: "正在清理过期的临时记忆…",
        similarity: "正在聚类近似条目…",
        purge: "正在清除旧归档…"
      },
      progressArchived: "已归档：{{exact}} 完全重复 · {{expired}} 过期 · {{similarity}} 近似 · {{llm}} LLM 合并",
      dedupAcrossUserIds: "跨用户命名空间去重",
      dedupAcrossUserIdsDesc: "启用时，来自不同 channel bridge（Slack、Discord 等）的完全相同的记忆会合并为一条。多用户共享场景中需要保留各 namespace 各自的副本时关闭此项。",
      exportSnapshot: "导出记忆快照",
      exporting: "正在导出…",
      exportFailed: "导出失败",
      archivePage: "{{start}}–{{end}} / 共 {{total}}",
      tokensUsed: "LLM tokens：{{input}} 输入 / {{output}} 输出",
      previewCycle: "预览下一次周期",
      previewing: "预览中…",
      previewArchive: "将归档 {{count}} 条记忆",
      previewSynthesize: "将合成 {{count}} 条新记忆",
      previewSkipped: "预览跳过：{{reason}}",
      previewClose: "关闭预览",
      restoreMergedNotice: '此条记忆曾被合并到一条仍在使用的合成记忆里："{{content}}"。如果不再需要，可手动删除该合成项。',
      archiveChain: "→ {{visible}}（链深度 {{depth}}）"
    }
  },
  prompts: {
    title: "快捷提示",
    description: "创建可以在聊天中通过输入 / 触发的快捷提示",
    add: "添加提示",
    edit: "编辑提示",
    "delete": "删除提示",
    deleteConfirm: "确定要删除此提示吗？",
    name: "名称",
    namePlaceholder: "例如：commit、review、explain",
    nameHint: "通过 /prompts:{name} 触发。只允许字母、数字、连字符和下划线。",
    nameRequired: "名称为必填项",
    nameFormatError: "名称只能包含字母、数字、连字符和下划线",
    content: "内容",
    contentPlaceholder: "输入提示内容...",
    contentRequired: "内容为必填项",
    noPrompts: "暂无提示",
    addFirst: "添加您的第一个提示以开始使用"
  },
  general: {
    title: "通用",
    permissionRequest: {
      title: "权限请求",
      autoApprove: "自动批准所有工具请求",
      autoApproveDesc: "开启后，所有工具权限请求将被自动批准，无需手动确认。请谨慎使用。"
    },
    analytics: {
      title: "隐私",
      enable: "启用匿名分析",
      enableDesc: "发送匿名使用数据以帮助改进 Alma。不会收集任何个人数据或对话内容。关闭后将停止所有遥测上报。"
    }
  },
  toolModel: {
    title: "工具模型",
    description: "在保证生成质量的前提下尽可能快的模型，用于对话标题生成、记忆相关操作等自动化任务。",
    selectModel: "选择工具模型",
    noProviders: "未配置提供商",
    noProvidersDesc: "请至少配置一个 AI 提供商以使用工具模型功能。",
    configureProviders: "配置提供商",
    autoDetected: "自动",
    autoDetectedDesc: "此模型根据您已配置的提供商自动选择。您可以手动选择其他模型。",
    recommended: "推荐",
    notConfigured: "工具模型未配置",
    notConfiguredDesc: "配置工具模型以获得更好的对话标题和记忆管理。",
    configure: "配置",
    memoryToolModel: "记忆工具模型",
    memoryToolModelDesc: "为记忆操作指定专用工具模型。留空则使用通用工具模型。",
    useDefault: "使用默认工具模型",
    searchModels: "搜索模型...",
    noResults: "未找到模型",
    noModels: "暂无可用模型",
    test: "测试模型",
    testSuccess: "测试通过",
    testFailed: "测试失败",
    testTimedOut: "测试超时 — 模型未在限定时间内响应",
    testSlow: "模型太慢 - 建议选择更快的模型",
    testUnusable: "模型不可用 - 响应时间过长，请选择其他模型",
    testExpensive: "模型太贵 - 高定价会快速累积成本，建议选择更便宜的模型",
    generatedTitle: "生成的标题",
    selectedTools: "选择的工具",
    totalTime: "总耗时",
    cost: "单价",
    ttft: "首字时间",
    tps: "生成速度"
  },
  visionModel: {
    title: "视觉模型",
    description: "默认关闭，此时图片直接发给主模型（视主模型为支持识图）。开启后，当主模型不支持识图时，先用指定的视觉模型把图片识别成文字，再交给主模型处理。",
    selectModel: "选择视觉模型",
    disable: "关闭（不使用视觉模型）"
  },
  codingAgent: {
    title: "Coding Agent",
    description: "选择 `coder` 类型 subagent 执行代码任务时使用的后端。",
    selectLabel: "默认 Coding Agent",
    auto: "自动",
    autoDesc: "优先使用 Claude Code，不可用时回退到内置 agent。",
    claudeCode: "Claude Code",
    claudeCodeDesc: "直接使用本地安装的 Claude Code CLI。",
    builtin: "内置 Agent",
    builtinDesc: "使用 Alma 内置 subagent，并沿用当前聊天模型。",
    acpProviderGroup: "ACP Providers",
    acpProviderDesc: "使用已配置的 ACP provider，例如 Codex CLI 或 Gemini CLI。",
    manageProviders: "管理 Providers",
    noAcpProviders: "还没有配置 ACP provider。"
  },
  agents: {
    kicker: "Agent Crew",
    title: "Agents",
    tagline: "带着意图去委派",
    description: "为 Alma 定义一套可管理的 specialist roster。这些托管 agent 位于底层 subagent 类型之上，因此 subagent 可以用更清晰的 brief 和执行分工，把工作交给 Designer、产品经理、开发工程师、研究员或操作员。",
    controlRing: "控制环",
    controlRingDesc: "先决定整个应用是否启用 agent orchestration，再决定已启动的 subagent 是否允许继续委派给其他 specialist。",
    enabled: "启用托管 Agents",
    enabledDesc: "把这套 managed crew 暴露给 Alma 与 Task 路由。",
    allowDelegation: "允许 subagent 继续委派给 agent",
    allowDelegationDesc: "把 roster 注入 subagent prompt，让它们能继续把工作交给其他 specialist。",
    subagentFast: "子 Agent 的 Fast",
    subagentFastDesc: "仅对支持 Fast 的模型生效，Fast 消耗额度更快。",
    subagentFastInherit: "跟随会话",
    subagentFastOff: "关闭",
    subagentFastOn: "开启",
    profileFast: "Fast",
    profileFastDesc: "仅对支持 Fast 档的模型生效。默认跟随总览里的“子 Agent 的 Fast”。",
    profileFastInherit: "跟随子 Agent 默认",
    flowHint: "运行时流程：父助手选择 agent profile -> Alma 映射到执行模式 -> 注入 specialist prompt -> 该 specialist 再按需继续通过 agent_id 委派。",
    providersCta: "调整 Providers，让 specialist 更强",
    rosterTitle: "成员列表",
    rosterDesc: "选择一个 profile 查看或编辑它的 brief。",
    addCustom: "自定义",
    restoreBuiltIns: "恢复内置",
    disabledPill: "已暂停",
    builtIn: "内置",
    custom: "自定义",
    resetBuiltIn: "重置内置角色",
    deleteAgent: "删除 Agent",
    name: "名称",
    executionMode: "执行模式",
    status: "可用状态",
    availableForRouting: "允许参与路由",
    availableForRoutingDesc: "禁用后该 agent 仍保留在 roster 中，但不会再被委派。",
    preferredModel: "偏好模型",
    preferredModelPlaceholder: "继承父对话模型",
    preferredModelDesc: "留空则继承父对话当前模型。",
    preferredModelEffortDesc: "推理模型还可在此选择思考程度；保持「提供商默认」即沿用当前行为。",
    reasoningEffort: "推理程度",
    reasoningEffortDefault: "提供商默认",
    searchModels: "搜索模型...",
    noModels: "未找到模型",
    useInheritedModel: "继承父对话模型",
    modelDefaultsGroup: "默认项",
    unavailableModelGroup: "不可用",
    summary: "使命摘要",
    summaryDesc: "用一句精准的话说明这个 agent 负责什么。",
    focusAreas: "关注领域",
    focusAreasDesc: "每行一个专长，帮助 Alma 更稳定地判断是否该路由给它。",
    delegatesTo: "可委派给",
    delegatesToDesc: "这些链接会进入 specialist prompt，作为明确的 handoff 建议。",
    prompt: "Specialist Prompt",
    promptDesc: "当通过 Task 的 agent_id 调用该 profile 时，会把这段 brief 注入执行上下文。",
    previewTitle: "路由预览",
    previewDesc: "这是其他 agent 在判断是否要把工作交给该 specialist 时会看到的摘要。",
    delegationGraph: "委派图谱",
    noDelegates: "这个 specialist 目前还没有显式的 handoff 目标。",
    roleFit: "角色定位",
    stats: {
      active: "活跃 Specialist",
      activeHint: "当前可参与路由的 profile 数量。",
      links: "委派链路",
      linksHint: "specialist 之间显式配置的 handoff 路径。",
      custom: "自定义 Profile",
      customHint: "除了内置 crew 以外，你额外定义的角色。"
    }
  },
  channels: {
    title: "渠道"
  },
  providers: {
    title: "提供商",
    defaultSettings: "默认设置",
    defaultModel: "默认模型",
    selectDefaultModel: "选择默认模型",
    defaultModelDescription: "这是开始新对话时选择的默认模型",
    getStartedProvider: '点击"添加提供商"开始',
    deleteFailed: "删除失败: ",
    aiProviders: "AI 提供商",
    addProvider: "添加提供商",
    model: "模型",
    baseUrl: "基础 URL",
    edit: "编辑",
    "delete": "删除",
    noProvidersYet: "尚未配置任何提供商",
    addProviderToGetStarted: '点击"添加提供商"开始使用',
    defaultModelForNewChats: "这将是新聊天会话的默认模型",
    deleteProviderConfirm: "确定要删除此提供商吗？",
    searchProvidersPlaceholder: "搜索提供商...",
    pluginHint: "找不到想要的提供商？请先去插件页面安装对应的插件，然后再回到此页面。",
    proxyEndpoints: {
      title: "API 代理端点",
      advanced: "高级",
      description: "Alma 为 {{providerName}} 提供 API 代理端点。这些端点会将 API 请求转换为 Chat Completions 格式，以兼容各种 AI 工具。",
      responsesApi: {
        title: "OpenAI Responses API 代理",
        tooltip: "将 OpenAI Responses API 请求转换为 Chat Completions API",
        description: "将此端点用于需要 OpenAI Responses API 的工具（如 Codex）。请求将被转换为 Chat Completions 格式。"
      },
      anthropicApi: {
        title: "Anthropic Messages API 代理",
        tooltip: "将 Anthropic Messages API 请求转换为 Chat Completions API",
        description: "将此端点用于 Anthropic 兼容的工具。请求将被转换为 Chat Completions 格式。"
      },
      claudeCodeHint: {
        title: "与 Claude Code 一起使用",
        description: "您可以通过设置以下环境变量，将此提供商与 Claude Code 一起使用："
      }
    }
  },
  chat: {
    title: "聊天",
    chatParameters: "聊天参数",
    temperature: "温度",
    conservativeDesc: "保守 (0.0)",
    balancedDesc: "平衡 (1.0)",
    creativeDesc: "创意 (2.0)",
    temperatureDesc: "控制回复的随机性。较低的值产生更一致的回复，较高的值产生更有创意的回复。",
    maxTokens: "最大令牌数",
    maxTokensDesc: "单次回复的最大长度限制 (1-8192)",
    showTokenUsage: "显示令牌使用情况",
    showTokenUsageDesc: "在聊天界面中显示每次对话的令牌消耗统计",
    streamingResponseDesc: "启用后，AI 回复将实时显示，否则等待完整回复后一次性显示",
    markdownRenderingDesc: "自动渲染回复中的 Markdown 格式内容",
    singleDollarTextMath: "渲染单美元符号数学公式",
    singleDollarTextMathDesc: "启用单美元符号内联数学公式渲染（例如 $x = y$）。默认关闭以避免与普通美元符号冲突。详见 https://github.com/vercel/streamdown/issues/108",
    infographicEnabled: "启用信息图可视化",
    infographicEnabledDesc: "开启时会在 system prompt 中注入信息图相关提示，引导 AI 生成可视化内容。关闭仅移除该提示，不影响已有信息图块的渲染。",
    autoCollapseReasoning: "默认折叠思考过程",
    autoCollapseReasoningDesc: "启用后，在生成回复时将默认折叠 AI 的思考过程（如 DeepSeek-R1 的 <think> 标签内容），让聊天界面更整洁。",
    historyRetentionDays: "历史记录保留天数",
    historyRetentionDaysDesc: "超过指定天数的聊天记录将被自动删除 (1-365 天)",
    autoCompact: {
      title: "自动压缩",
      enable: "启用自动压缩",
      enableDesc: "当对话接近模型上下文窗口限制时，自动压缩历史消息。这使得对话可以无限延续，无需手动干预。",
      threshold: "压缩阈值",
      thresholdEarly: "提前 (5%)",
      thresholdLate: "延迟 (95%)",
      thresholdDesc: "当上下文使用率超过此百分比时触发压缩。较低的值提供更多缓冲空间，较高的值保留更多原始内容。",
      keepRecentMessages: "保留最近轮数",
      keepRecentMessagesDesc: "始终完整保留的最近轮数。一轮 = 你的一条消息 + 其后 AI 的全部回复与工具调用。保留的轮次不会被压缩进摘要 (2-20)。若最近几轮本身就超出预算，会少保留几轮。",
      notification: "上下文已压缩",
      notificationDesc: "已将 {{count}} 条消息压缩为摘要，以释放上下文空间。",
      summaryModel: "压缩模型",
      summaryModelDefault: "与对话模型相同(推荐)",
      summaryModelDesc: "压缩对话时用哪个模型生成摘要。默认使用当前对话模型以获得最佳摘要质量——用小/便宜的模型会导致摘要质量差、丢失上下文。"
    },
    defaultToolSelection: {
      title: "默认工具选择",
      description: "为新对话设置默认的工具选择",
      auto: "自动",
      autoDesc: "AI 根据上下文自动决定使用哪些工具",
      all: "全部工具",
      allDesc: "为每个对话启用所有可用工具",
      none: "禁用工具",
      noneDesc: "默认禁用工具（纯对话模式）"
    },
    defaultSkillSelection: {
      title: "默认技能选择",
      description: "为新对话设置默认的技能选择",
      auto: "自动",
      autoDesc: "AI 根据上下文自动决定使用哪些技能",
      all: "全部技能",
      allDesc: "为每个对话启用所有可用技能",
      none: "禁用技能",
      noneDesc: "默认禁用技能（纯对话模式）"
    },
    autoSuggestions: {
      enable: "启用快捷回复建议",
      enableDesc: "在 AI 回复后显示建议的快捷回复，帮助继续对话"
    },
    openLinksInApp: "在内置浏览器打开链接",
    openLinksInAppDesc: "回复中的链接在侧栏内置浏览器打开，核验证据不用离开 Alma。Cmd/Ctrl+点击 始终使用系统浏览器。",
    browserAutoPip: "AI 操作浏览器时弹出画中画",
    browserAutoPipDesc: "AI 用内置浏览器时，如果浏览器面板不在眼前，会弹出一个悬浮小窗让你看它在做什么。关掉后不再自动弹出，需要时仍可手动打开。",
    selectionActions: {
      title: "选中文本快捷提问",
      description: "在消息里选中文本时，这些按钮会出现在「引用选中内容」旁边。点一下就把提示语和选中内容作为你的提问发出。",
      labelPlaceholder: "按钮名，如：这是啥意思",
      promptPlaceholder: "随选中内容一起发出的提示语，如：解释一下这段是什么意思",
      add: "添加按钮"
    }
  },
  ui: {
    title: "用户界面",
    fontSettings: "字体设置",
    fontFamily: "字体",
    fontFamilyDesc: "选择应用界面的字体。保留系统默认将使用操作系统字体。",
    systemDefault: "系统默认",
    fontSize: "字体大小",
    small: "小",
    medium: "中",
    large: "大",
    layoutSettings: "布局设置",
    interfaceDensity: "界面密度",
    compact: "紧凑",
    comfortable: "舒适",
    spacious: "宽松",
    compactDesc: "更多内容",
    comfortableDesc: "平衡布局",
    spaciousDesc: "更多空间",
    sidebarWidth: "侧边栏宽度",
    editorSettings: "编辑器设置",
    showLineNumbers: "显示行号",
    showLineNumbersDesc: "在代码块和文本编辑区域显示行号",
    wordWrap: "自动换行",
    wordWrapDesc: "自动换行长文本以避免水平滚动",
    showMinimap: "显示代码缩略图",
    showMinimapDesc: "在长代码块右侧显示缩略图导航",
    useSystemCaret: "使用系统光标",
    useSystemCaretDesc: "在输入区域使用系统原生光标，而非自定义动画光标",
    showEditDiffPreview: "显示编辑 Diff 预览",
    showEditDiffPreviewDesc: "将 Edit/Write 工具调用渲染为完整语法高亮 diff。低配设备可关闭以减少卡顿，将改为显示轻量摘要。",
    toolCardDefaultExpand: "工具卡片默认展开",
    toolCardDefaultExpandDesc: "控制生成过程中工具卡片的默认展开行为。SubAgent 卡片始终自动展开，不受此设置影响。",
    toolCardExpandAuto: "自动",
    toolCardExpandAutoDesc: "Edit/Write/Bash 展开",
    toolCardExpandAlways: "总是",
    toolCardExpandAlwaysDesc: "所有工具都展开",
    toolCardExpandNever: "从不",
    toolCardExpandNeverDesc: "所有工具都折叠",
    haptics: "触摸板触觉反馈",
    hapticsDesc: "鼠标扫过右侧对话导航条时，每越过一格刻度触摸板就震动一下（仅限 Force Touch 触摸板）。",
    hapticsEnabled: "启用触觉反馈",
    hapticsStyle: "棘轮方式",
    hapticStyle_edc: "EDC 机械",
    hapticStyle_edc_desc: "速度自适应：慢扫深咬合、快扫细密齿、两端有挡块",
    hapticStyle_single: "单齿",
    hapticStyle_single_desc: "每格一声干脆的哒",
    hapticStyle_double: "双齿",
    hapticStyle_double_desc: "主响后带一声轻回弹",
    hapticStyle_engage: "咬合",
    hapticStyle_engage_desc: "先轻咬合，再重落扣",
    hapticStyle_triple: "三连",
    hapticStyle_triple_desc: "两声轻点滚入一声重响",
    hapticStyle_soft: "磁吸",
    hapticStyle_soft_desc: "系统原生的轻微对齐脉冲",
    hapticsStrength: "强度",
    hapticStrength_weak: "轻",
    hapticStrength_medium: "中",
    hapticStrength_strong: "重",
    hapticsPreviewHint: "调整时会立即试震一下，把手指搭在触摸板上就能感受到。",
    terminalSettings: "终端设置",
    terminalFontFamily: "字体",
    terminalFontFamilyDesc: "从系统中选择终端字体",
    terminalFontSize: "字体大小",
    persistTerminals: "终端持久化",
    persistTerminalsDesc: "切换聊天时保持终端会话不被关闭",
    terminalCursorBlink: "光标闪烁",
    terminalCursorBlinkDesc: "让终端光标闪烁",
    selectFont: "选择字体...",
    searchFonts: "搜索字体...",
    noFontsFound: "未找到字体",
    sidebarSettings: "侧边栏设置",
    sidebarMode: "侧边栏模式",
    sidebarSimple: "简洁",
    sidebarSimpleDesc: "按时间排序的列表",
    sidebarGtd: "GTD",
    sidebarGtdDesc: "状态、标签和收藏",
    sidebarProject: "项目",
    sidebarProjectDesc: "按工作区分组",
    manageLabels: "管理标签",
    addLabel: "添加标签",
    editLabel: "编辑标签",
    noLabels: "还没有创建标签",
    labelDialogDesc: "创建标签来组织你的对话",
    labelName: "标签名称",
    labelNamePlaceholder: "例如：工作、个人、研究",
    labelColor: "标签颜色",
    deleteLabelTitle: "删除标签",
    deleteLabelDesc: "确定要删除此标签吗？使用此标签的对话将不再被标记。"
  },
  network: {
    title: "网络",
    proxySettings: "代理设置",
    enableProxy: "启用代理",
    proxyType: "代理类型",
    proxyTypeSystem: "跟随系统代理",
    proxyTypeSystemHint: "按系统（或 PAC 脚本）为每个网址给出的代理走，和浏览器一致。这样不用开代理软件的增强/TUN 模式，Alma 的模型请求也会被接管。",
    proxyServer: "代理服务器",
    port: "端口",
    username: "用户名（可选）",
    password: "密码（可选）",
    networkParameters: "网络参数",
    requestTimeout: "请求超时",
    seconds: "秒",
    retryAttempts: "重试次数",
    llmTimeouts: "AI 生成超时",
    llmTimeout: "首次响应等待时间（秒）",
    llmTimeoutDesc: "等待 AI 服务开始回答的最长时间。经网关中转的推理模型可能需要数分钟，上方的通用请求超时不适用于此处。0 = 无限等待。默认 300。",
    streamIdleTimeout: "流空闲超时（秒）",
    streamIdleTimeoutDesc: "生成过程中连续这么久没有收到数据就中止。0 = 自动（文本 60 秒、推理 240 秒、生图 180 秒、定时任务 300 秒）。慢模型上频繁出现“Stream timed out”时可调大。",
    requestLog: "记录网络请求日志",
    requestLogDesc: "每次 HTTP 尝试写一行（域名与路径、生效超时、响应头耗时、结果）到应用数据目录的 network-requests.log。用于排查超时问题；不记录请求体或密钥。",
    retryAttemptsDesc: "请求失败时自动重试的次数（0-10）",
    customUserAgent: "自定义 User-Agent（可选）",
    customUserAgentPlaceholder: "留空使用默认值",
    customUserAgentDesc: "HTTP 请求的自定义 User-Agent 标识符",
    preferIpv4: "优先使用 IPv4",
    preferIpv4Desc: "强制 DNS 解析使用 IPv4 地址。如果遇到因 IPv6 地址不可达导致的 'fetch failed' 错误，请启用此选项。",
    testProxy: "测试代理",
    testingProxy: "正在测试...",
    testProxySuccess: "代理正常 · {{latency}} ms {{ip}}",
    testProxyFailed: "代理测试失败：{{message}}",
    testProxyUnknownError: "代理测试出现未知错误",
    caCertPath: "自定义 CA 证书包",
    caCertPathPlaceholder: "/path/to/corporate-ca-bundle.pem",
    caCertPathDesc: "用于 TLS 拦截代理（如 Zscaler）企业网络的 PEM 证书包。在系统根证书基础上追加，作用于所有出站连接。留空时回退读取 SSL_CERT_FILE / REQUESTS_CA_BUNDLE 环境变量。"
  },
  webSearch: {
    title: "网络搜索",
    searchEngine: "搜索引擎",
    selectEngine: "选择搜索引擎",
    xiaohongshu: "小红书",
    xiaohongshuWarning: "使用小红书搜索可能被封号，请自行承担此风险",
    engineDescription: "选择用于网络搜索的搜索引擎。Google 适用于通用搜索，小红书适用于中文生活方式和购物内容。",
    googleSettings: "Google 搜索设置",
    googleSettingsDesc: "打开浏览器窗口以配置 Google 搜索设置（语言、地区、安全搜索等）。这些设置将在网络搜索获取结果时使用。",
    openGoogleSettings: "打开 Google 设置",
    xiaohongshuSettings: "小红书设置",
    xiaohongshuSettingsDesc: "打开浏览器窗口登录小红书并配置您的账户。登录后可以获得更好的搜索结果和个性化内容。",
    openXiaohongshuSettings: "打开小红书设置",
    webFetchBrowser: "WebFetch 浏览器",
    webFetchBrowserDesc: "打开浏览器窗口登录网站。登录后，WebFetch 可以访问需要身份验证的内容。",
    openWebFetchBrowser: "打开浏览器",
    cookieManagement: "Cookie 管理",
    cookieManagementDesc: "导入/导出 Cookie 以与浏览器扩展（如 Cookie-Editor）共享登录状态。这样您可以同时在 Alma 和浏览器中保持登录。",
    exportCookies: "导出",
    importCookies: "导入",
    clearCookies: "清除",
    cookieExportSuccess: "已导出 {{count}} 个 Cookie 到剪贴板",
    cookieExportError: "导出 Cookie 失败",
    cookieImportSuccess: "成功导入 {{count}} 个 Cookie",
    cookieImportError: "导入 Cookie 失败",
    cookieImportEmpty: "剪贴板中没有 Cookie。请先从 Cookie-Editor 复制 Cookie。",
    cookieClearSuccess: "已清除 {{count}} 个 Cookie",
    cookieClearError: "清除 Cookie 失败"
  },
  mobileRelay: {
    title: "远程访问",
    description: "用手机控制这台电脑上的 Alma。桌面端向中继服务器保持出站连接，无需端口转发。",
    relayConnection: "中继连接",
    deviceName: "设备名称",
    deviceNameHint: "手机和其他设备上显示的这台电脑的名称。留空则使用系统名称。",
    deviceNameSave: "保存",
    deviceNameSaved: "已保存",
    officialRelayHint: "使用 Alma 官方中继（{{host}}）。",
    customRelayHint: "正在使用你自建的中继（{{host}}）。",
    selfHostedToggle: "使用自建中继",
    useOfficialRelay: "切回 Alma 官方中继",
    useThisRelay: "使用此中继",
    selfHostedHint: "自行部署一个中继（Docker 或 Cloudflare Workers），通过 HTTPS 提供服务，再填入它的地址。手机会跟随这台桌面端使用的中继；切换后需重新配对。如果你的中继设置了注册密钥，请在下方以令牌形式粘贴。",
    selfHostedGuide: "部署指南",
    enable: "启用",
    disable: "停用",
    status: "状态",
    replaced: "另一台 Alma 桌面端用同一配对登录了中继，现在由它为手机服务。这一台保持断开，避免两台互相顶替。",
    reconnect: "改用这台",
    phones: {
      none: "还没有手机连接过 — 用手机扫描下方二维码。",
      unnamed: "你的手机",
      connectedNow: "已连接",
      lastSeen: "最近连接 {{when}}",
      justNow: "刚刚"
    },
    state: {
      stopped: "未启用",
      connecting: "连接中…",
      connected: "已连接",
      error: "出错",
      replaced: "已被接管"
    },
    pairTitle: "配对手机",
    pairDescription: "用手机相机扫码即可打开 Alma 并自动连接；也可以把下方链接粘贴到手机端 Alma → 设置 → 连接。",
    regenerate: "重新生成",
    regenerateConfirm: "重新生成连接码？已配对的手机将失去访问权限，需重新配对。",
    firewallHint: "{{name}} 防火墙已开启，同一 Wi-Fi 下的手机也会走 relay。放行 TCP {{port}} 即可局域网直连：",
    secretHint: "此链接拥有这台 Alma 的完全控制权，仅与自己的设备分享；重新生成即可吊销旧链接。",
    e2eTitle: "端到端加密",
    e2eDescription: "加密手机与这台电脑之间的全部流量，中继服务器只能看到密文。修改此项需要重新配对手机。",
    pairDescriptionE2E: "用手机相机扫码即可打开 Alma 并通过加密通道连接。二维码包含密钥，只展示给自己的手机。",
    accountToken: "Alma 账号令牌",
    tokenSaved: "已保存",
    tokenHint: "共享中继对所有 Alma 用户免费，但需要你的账号令牌。登录后复制令牌，粘贴到这里。",
    tokenPlaceholder: "粘贴你的中继令牌",
    saveToken: "保存",
    getToken: "从你的 Alma 账号获取令牌",
    tokenRequired: "中继缺少有效的账号令牌，重新登录后即可连接。",
    account: "Alma 账号",
    accountHint: "登录一次即可授权这台电脑。共享中继对 Alma 用户免费，连接需要账号令牌。",
    signInGoogle: "使用 Google 登录",
    reSignIn: "重新登录",
    signedInAs: "已登录：{{email}}",
    manualToken: "手动粘贴令牌",
    betaNotice: "手机端 App 和配对流程尚未完成，可能出现不兼容的变更。"
  },
  permissions: {
    title: "权限",
    heading: "系统权限",
    intro: "Alma 在这台 Mac 上可以看到什么。每一项都可以随时在系统设置里更改。",
    onboardingIntro: "Alma 需要几项系统权限才能发挥全部能力。现在授予，或稍后在设置里授予都可以。",
    local: "一切都留在你的电脑上。Alma 只读取回答当前问题所需的内容。",
    checking: "正在检查权限…",
    unknown: "无法获取权限状态。",
    noneRequired: "{{platform}} 上不需要任何权限。",
    allSet: "都已就绪。",
    grant: "授权",
    pending: "待授权",
    "continue": "继续",
    back: "返回",
    toastTitle: "权限已授予",
    toastDesc: "Alma 现在可以读取当前窗口并获取屏幕上下文。",
    items: {
      accessibility: {
        label: "辅助功能",
        description: "让 Alma 读取当前聚焦的窗口，QuickChat 才能回答你正在看的内容。"
      },
      screen_recording: {
        label: "屏幕录制",
        description: "让 Alma 截取当前屏幕作为视觉上下文，需要查看页面或应用画面的工具依赖它。"
      }
    }
  },
  data: {
    title: "数据",
    dataStorage: "数据存储",
    dataStorageLocation: "数据存储位置",
    selectLocation: "选择位置",
    dataStorageLocationDesc: "应用程序数据的存储位置，包括聊天历史、配置文件等",
    backupSettings: "备份设置",
    enableAutomaticBackup: "启用自动备份",
    backupFrequency: "备份频率",
    dailyBackup: "每日备份",
    weeklyBackup: "每周备份",
    monthlyBackup: "每月备份",
    maxBackups: "保留备份数量",
    maxBackupsDesc: "超过此数量的旧备份将自动删除（1-30）",
    cloudSync: "云同步",
    experimentalFeature: "实验性功能",
    enableCloudSync: "启用云同步",
    enableCloudSyncDesc: "将设置和部分数据同步到云端，保持不同设备间的一致性",
    syncProvider: "同步服务提供商",
    selectSyncProvider: "选择同步服务提供商",
    dataManagement: "数据管理",
    exportData: "导出数据",
    importData: "导入数据",
    selectExportData: "选择要导出的数据",
    selectAll: "全选",
    selectNone: "取消全选",
    "export": "导出",
    selectExportDataDesc: "选择要包含在备份文件中的数据",
    selected: "已选择",
    exportOption: {
      settings: "设置",
      providers: "AI 提供商",
      threads: "聊天历史",
      promptApps: "提示词应用",
      prompts: "快捷提示词",
      workspaces: "项目",
      mcpServers: "MCP 服务器",
      customThemes: "自定义主题",
      memories: "记忆"
    },
    exportOptionDesc: {
      settings: "应用偏好设置、外观和行为配置",
      providers: "API 密钥和提供商配置",
      threads: "所有对话线程和消息",
      promptApps: "自定义提示词应用配置",
      prompts: "快捷斜杠命令提示词",
      workspaces: "项目目录和偏好设置",
      mcpServers: "MCP 服务器配置",
      customThemes: "用户创建的配色方案",
      memories: "AI 记忆条目和上下文"
    },
    dangerousOperations: "危险操作",
    clearAllLocalData: "清除所有本地数据",
    clearAllLocalDataDesc: "这将删除所有聊天历史、提供商配置和应用程序设置。此操作无法恢复",
    clearDataConfirm: "确定要清除所有本地数据吗？此操作无法恢复！\n\n这将删除所有聊天历史、提供商配置和应用程序设置。",
    clearDataNotImplemented: "数据清除功能待实现",
    exportFailed: "导出数据失败",
    importSuccess: "数据导入成功",
    importFailed: "导入数据失败",
    rearview: {
      title: "倒后镜",
      count: "{{count}} 条足迹",
      description: "本机账本，记录每次运行实际经过的系统地点——只含预定义地点，绝不含提示词、名称、参数、输出或身份。✓=完成回执，!=明确失败，?=无可靠回执。它只存在于这台机器上；在对话里 @倒后镜 即可查看分析。",
      freeze: "冻结快照",
      freezeHint: "不可变纯文本，仅公开列——你看到的就是你可以选择分享的全部。"
    }
  },
  usage: {
    title: "使用量",
    today: "今天",
    thisWeek: "本周",
    thisMonth: "本月",
    thisYear: "今年",
    allTime: "全部时间",
    totalCost: "总费用",
    messages: "消息数",
    inputTokens: "输入 Token",
    outputTokens: "输出 Token",
    cachedTokens: "缓存 Token",
    cacheRead: "缓存读取",
    cacheWrite: "缓存写入",
    tokens: "Token",
    cost: "费用",
    activityHeatmap: "活动热力图",
    activityHeatmapDesc: "过去一年的聊天活动",
    messagesInPeriod: "条消息",
    tokensInPeriod: "tokens（过去一年）",
    costOverTime: "费用趋势",
    costOverTimeDesc: "追踪所选时段的支出情况",
    byProvider: "按提供商统计",
    byProviderDesc: "按 AI 提供商的费用分布",
    byModel: "按模型统计",
    byModelDesc: "费用最高的前 10 个模型",
    detailedStats: "详细统计",
    detailedStatsDesc: "按模型的完整使用明细",
    model: "模型",
    provider: "提供商",
    noData: "暂无使用数据",
    noDataDesc: "开始聊天后即可在此查看使用统计",
    migratingData: "正在优化使用数据以加快加载速度...",
    migrationFailed: "使用数据优化失败",
    includedInPlan: "套餐内",
    includedInPlanHint: "该套餐按订阅计费而非按 Token 计费，这些 Token 不计入总费用。",
    noPricingHint: "该模型没有已知单价，其 Token 未计入总费用。可在「模型提供商」中打开该模型的选项设置单价。",
    includedModelsNote: "套餐内 {{count}} 个",
    unpricedModelsNote: "未定价 {{count}} 个"
  },
  rtk: {
    title: "Token 节省",
    overview: "RTK 压缩概览",
    overviewDesc: "RTK 命令输出压缩节省的 Token 统计",
    tokensSaved: "已节省 Token",
    commands: "命令次数",
    avgSavings: "平均节省",
    inputTokens: "输入 Token",
    outputTokens: "输出 Token",
    avgTime: "平均耗时",
    dailySavings: "每日节省",
    dailySavingsDesc: "过去 30 天每日节省的 Token 数量",
    byCommand: "按命令统计",
    byCommandDesc: "按节省 Token 总量排列的热门命令",
    recentCommands: "最近命令",
    recentCommandsDesc: "最近经过 RTK 压缩的命令执行记录",
    time: "时间",
    command: "命令",
    saved: "已节省",
    reduction: "压缩率",
    noData: "暂无节省数据",
    noDataDesc: "当 Alma 执行命令时，RTK 会自动压缩工具输出。开始一段对话，节省数据就会显示在这里。",
    ptcTitle: "编程式工具调用",
    ptcDesc: "run_script 在沙箱中处理工具结果，从而避免进入模型上下文所节省的 token",
    ptcTokensSaved: "节省 Token",
    ptcRuns: "脚本运行次数",
    ptcToolCalls: "工具调用次数",
    ptcResultTokens: "已处理结果"
  },
  security: {
    title: "安全",
    sandbox: "命令沙箱",
    sandboxEnabled: "启用 Shell 命令沙箱",
    sandboxEnabledDesc: "在受限环境中运行 Shell 命令，限制对敏感文件和网络的访问。有助于防止恶意命令访问敏感数据。",
    dataEncryption: "数据加密",
    encryptApiKeysStorageDesc: "使用本地加密算法保护 API 密钥和敏感配置信息",
    accessControl: "访问控制",
    enableApplicationPasswordProtection: "启用应用程序密码保护",
    enableApplicationPasswordProtectionDesc: "启动应用程序时需要密码验证",
    changePassword: "更改密码",
    sessionTimeout: "会话超时",
    minutes: "分钟",
    sessionTimeoutDesc: "在此不活动时间后应用程序将自动锁定",
    loggingAndAudit: "日志记录和审计",
    logLevel: "日志级别",
    error: "错误",
    warn: "警告",
    info: "信息",
    debug: "调试",
    logLevelDesc: "记录应用程序操作和错误信息以帮助排查问题",
    sessionManagement: "会话管理",
    currentSession: "当前会话",
    lastActivity: "最后活动：刚才",
    clearAllSessions: "清除所有会话",
    privacySettings: "隐私设置",
    privacyCommitment: "Alma 重视您的隐私保护。以下是我们的隐私承诺：",
    localDataStorage: "所有数据存储在您的本地设备",
    encryptedApiKeys: "API 密钥和敏感信息经过加密保护",
    noChatDataCollection: "我们不收集或上传您的聊天内容",
    dataExportDelete: "您可以随时导出或删除所有数据",
    viewPrivacyPolicy: "查看完整隐私政策",
    currentPasswordPrompt: "输入当前密码：",
    newPasswordPrompt: "输入新密码：",
    confirmPasswordPrompt: "确认新密码：",
    passwordsNotMatch: "密码不匹配",
    passwordUpdateNotImplemented: "密码更新功能待实现",
    clearSessionConfirm: "确定要清除所有登录会话吗？这将需要重新登录。",
    clearSessionNotImplemented: "清除会话功能待实现"
  },
  keybindings: {
    title: "快捷键",
    shortcuts: "快捷键",
    resetAll: "重置全部",
    none: "无",
    clear: "清除快捷键",
    resetToDefault: "重置为默认值",
    newChatThread: {
      label: "新建聊天",
      description: "创建一个新的聊天会话"
    },
    sendMessage: {
      label: "发送消息",
      description: "发送当前消息"
    },
    openSettings: {
      label: "打开设置",
      description: "打开设置窗口"
    },
    toggleSidebar: {
      label: "切换侧边栏",
      description: "显示或隐藏侧边栏"
    },
    toggleWhisper: {
      label: "切换语音输入",
      description: "开始或停止语音录制"
    },
    nextThread: {
      label: "下一个对话",
      description: "切换到下一个对话"
    },
    previousThread: {
      label: "上一个对话",
      description: "切换到上一个对话"
    },
    goBack: {
      label: "后退",
      description: "回到历史中的上一页"
    },
    goForward: {
      label: "前进",
      description: "前往历史中的下一页"
    },
    quickChat: {
      label: "快捷对话",
      description: "打开快捷对话悬浮窗"
    },
    searchThreads: {
      label: "打开搜索",
      description: "打开会话搜索"
    },
    pressKeys: "按键录制中...",
    clickToRecord: "点击录制",
    resetKeybindingConfirm: "确定要将所有快捷键重置为默认值吗？",
    tips: {
      title: "提示",
      clickField: "点击快捷键输入框并按下所需的组合键",
      useModifiers: "在 macOS 上使用 Cmd (⌘)，在 Windows/Linux 上使用 Ctrl 作为系统快捷键",
      escapeToCancel: "录制时按 Escape 取消",
      backspaceToClear: "录制时按 Backspace 或 Delete 可清除快捷键",
      systemShortcuts: "某些系统快捷键可能不可用或被覆盖"
    }
  },
  advanced: {
    title: "高级",
    experimentalFeatures: "实验性功能",
    experimentalFeaturesWarning: "⚠️ 实验性功能可能不稳定，使用前请备份重要数据",
    enableExperimentalFeatures: "启用实验性功能",
    enableExperimentalFeaturesDesc: "启用开发中的新功能，可能包含错误或不稳定因素",
    developerOptions: "开发者选项",
    debugMode: "调试模式",
    debugModeDesc: "启用详细的日志输出和错误消息显示",
    developerMode: "开发者模式",
    developerModeDesc: "启用开发者专用功能和调试工具",
    openDevTools: "打开开发者工具",
    customStyles: "自定义样式",
    customCss: "自定义 CSS",
    customCssPlaceholder: "/* 在此添加自定义 CSS 样式 */\n.chat-message {\n  font-size: 14px;\n}",
    customCssDesc: "添加自定义 CSS 以个性化应用程序外观",
    customJs: "自定义 JavaScript",
    customJsPlaceholder: "// 在此添加自定义 JavaScript 代码\n// 请谨慎使用，错误的代码可能导致应用程序错误\nconsole.log('自定义脚本已加载');",
    customJsDesc: "添加自定义 JavaScript 以扩展应用程序功能（高级用户）",
    customJsWarning: "⚠️ 自定义 JavaScript 可能带来安全风险，请确保代码来源可信",
    applicationManagement: "应用程序管理",
    restartApplication: "重启应用程序",
    resetApplicationData: "重置应用程序数据",
    applicationInfo: "应用程序信息",
    version: "版本：0.0.1",
    buildTime: "构建时间：",
    electron: "Electron：30.0.1",
    nodejs: "Node.js：",
    chrome: "Chrome：",
    unknown: "未知",
    performanceMonitoring: "性能监控",
    memoryUsage: "内存使用",
    runtime: "运行时间",
    runtimeMinutes: "分钟",
    viewDetailedPerformanceReport: "查看详细性能报告",
    restartConfirm: "确定要重启应用程序吗？未保存的数据可能会丢失。",
    resetDataConfirm: "确定要重置应用程序数据吗？这将清除所有设置和缓存，但保留提供商配置和聊天历史。",
    devToolsNotImplemented: "开发者工具功能待实现"
  },
  whisper: {
    title: "语音",
    description: "使用本地 Whisper 模型启用语音转文字输入",
    enableWhisper: "启用语音输入",
    enableWhisperDesc: "启用后，您可以通过点击麦克风按钮在聊天中使用语音输入。",
    modelSelection: "模型设置",
    selectedModel: "当前模型",
    selectModel: "选择模型",
    noModelsDownloaded: "未下载任何模型",
    downloadModelFirst: "请至少下载一个模型以启用语音输入。",
    language: "识别语言",
    languageDesc: "选择语音识别的语言。如果您使用多种语言，请选择「自动检测」。",
    availableModels: "可用模型",
    availableModelsDesc: "下载 Whisper 模型以进行本地语音识别。较大的模型更准确，但需要更多存储空间和处理能力。",
    download: "下载",
    deleteConfirm: "确定要删除此模型吗？",
    remaining: "剩余",
    calculating: "计算中..."
  },
  mcp: {
    title: "MCP 服务器",
    description: "管理模型上下文协议 (MCP) 服务器以扩展 AI 能力",
    marketplace: "应用市场",
    installed: "已安装",
    searchPlaceholder: "搜索 MCP 服务器...",
    allCategories: "所有分类",
    noServersFound: "未找到 MCP 服务器",
    fetchError: "获取 MCP 应用市场失败",
    verified: "已验证",
    featured: "精选",
    by: "作者",
    viewDocs: "查看文档",
    install: "安装",
    installing: "安装中...",
    installServer: "安装 MCP 服务器",
    installationMethod: "安装方式",
    prerequisites: "前置条件",
    installMode: "安装模式",
    agentInstall: "智能安装",
    manualInstall: "手动安装",
    agentInstallDesc: "让 AI 助手自动处理安装。它会验证前置条件并为您配置一切。",
    manualInstallDesc: "直接添加服务器配置。您需要确保前置条件已安装。",
    requiredParams: "必填参数",
    optionalParams: "可选参数",
    noServersInstalled: "未安装 MCP 服务器",
    serversCount: "已安装 {{count}} 个服务器",
    addServer: "添加服务器",
    noServersHint: "从应用市场安装服务器或手动添加",
    statusConnected: "已连接",
    statusConnecting: "连接中",
    statusError: "错误",
    statusDisconnected: "未连接",
    connect: "连接",
    deleteConfirmTitle: "删除 MCP 服务器",
    deleteConfirmDesc: '确定要删除 "{{name}}" 吗？此操作无法撤销。',
    editServer: "编辑 MCP 服务器",
    editServerDesc: "修改服务器配置",
    addServerDesc: "添加自定义 MCP 服务器配置",
    serverName: "服务器名称",
    serverNamePlaceholder: "我的 MCP 服务器",
    serverDescription: "描述",
    serverDescriptionPlaceholder: "可选描述",
    command: "命令",
    commandHint: "启动 MCP 服务器的命令",
    "arguments": "参数",
    argumentsPlaceholder: "参数1 参数2 参数3",
    argumentsHint: "以空格分隔的命令参数",
    envVars: "环境变量",
    envVarsHint: "每行一个，格式为 KEY=value",
    transportType: "传输类型",
    urlHint: "MCP 服务器的 HTTP 端点 URL",
    remoteTransportType: "传输协议",
    remoteTransportHint: "推荐使用 Streamable HTTP。对于不支持 Streamable HTTP 的服务器，请选择 SSE。",
    headers: "请求头",
    headersHint: 'HTTP 请求头，格式为 "Key: Value"，每行一个',
    requiredFieldsError: "名称和命令/URL 为必填项",
    fromClipboard: "从剪贴板导入",
    invalidClipboardJson: "剪贴板中的 MCP 服务器 JSON 格式无效",
    oauth: {
      autoDetect: "支持 OAuth 2.1",
      autoDetectHint: "如果此服务器需要 OAuth 认证，连接时会自动检测并处理。",
      autoRedirectHint: "如果此服务器需要 OAuth，点击添加后将自动跳转授权页面。",
      requiresOAuth: "需要 OAuth",
      requiresOAuthHint: "如果此服务器需要 OAuth 2.1 授权，请启用此选项",
      notAuthorizedYet: "尚未授权",
      checking: "检查中...",
      authorizing: "授权中...",
      noAuth: "无授权",
      noAuthHint: "此服务器可能不需要 OAuth，或尚未访问过",
      authorized: "已授权",
      authorizedHint: "OAuth 授权已激活",
      expiresAt: "过期时间: {{date}}",
      scope: "范围",
      needsReauth: "需要重新授权",
      needsReauthHint: "令牌已过期，需要重新授权",
      error: "授权错误",
      notAuthorized: "未授权",
      notAuthorizedHint: "连接服务器以触发 OAuth 授权",
      authorize: "授权",
      retry: "重试",
      reauthorize: "重新授权",
      revoke: "撤销授权",
      revokeConfirmTitle: "撤销 OAuth 授权",
      revokeConfirmDesc: '确定要撤销 "{{name}}" 的 OAuth 授权吗？再次连接时需要重新授权。'
    },
    basicInformation: "基本信息",
    commandConfiguration: "命令配置",
    remoteConfiguration: "远程配置",
    endpointUrlDesc: "MCP 服务器的 HTTP 端点 URL",
    failedAddServer: "添加服务器失败",
    failedSave: "保存失败"
  },
  themeConfig: {
    title: "配色方案",
    "default": "默认（内置）",
    darkModeTheme: "深色模式主题",
    darkModeThemeDesc: "选择深色模式的配色方案。选择「默认」使用内置主题。",
    lightModeTheme: "浅色模式主题",
    lightModeThemeDesc: "选择浅色模式的配色方案。选择「默认」使用内置主题。",
    darkThemes: "深色主题",
    lightThemes: "浅色主题",
    searchPlaceholder: "搜索主题...",
    noThemesFound: "未找到匹配的主题。",
    themeCount: "{{dark}} 个深色主题，{{light}} 个浅色主题，{{custom}} 个自定义主题可用",
    customThemes: "自定义主题",
    customThemesDesc: "创建和管理您自己的配色方案",
    createTheme: "创建主题",
    noCustomThemes: "暂无自定义主题。点击「创建主题」开始创建。",
    customDarkThemes: "自定义深色主题",
    customLightThemes: "自定义浅色主题",
    pluginThemes: "插件主题",
    pluginThemesDesc: "由已安装插件提供的主题",
    pluginDarkThemes: "插件深色主题",
    pluginLightThemes: "插件浅色主题",
    clearPluginTheme: "清除",
    win98Trail: "窗口拖影彩蛋",
    win98TrailDesc: "Windows 98 经典彩蛋：拖动窗口时身后留下未重绘的残影堆叠。"
  },
  themeEditor: {
    createTitle: "创建自定义主题",
    createDescription: "设计您自己的配色方案，包含 30 个 UI 颜色和 16 个语法高亮颜色。",
    editTitle: "编辑自定义主题",
    editDescription: "修改您的自定义配色方案。",
    name: "内部名称",
    displayName: "显示名称",
    type: "类型",
    dark: "深色",
    light: "浅色",
    cloneFrom: "克隆自",
    selectTheme: "选择要克隆的主题...",
    darkThemes: "深色主题",
    lightThemes: "浅色主题",
    uiColors: "界面颜色",
    syntaxColors: "语法颜色",
    "import": "导入/导出",
    preview: "预览",
    groups: {
      backgrounds: "背景颜色",
      grays: "灰色和文字颜色",
      primary: "主要颜色",
      ui: "界面元素颜色",
      base16Backgrounds: "背景色阶",
      base16Foregrounds: "前景色阶",
      base16Syntax: "语法颜色"
    },
    importLua: "从 NvChad Lua 导入",
    importPlaceholder: "在此粘贴您的 NvChad 主题 Lua 代码...",
    importButton: "导入",
    importSuccess: "主题导入成功",
    importFailed: "导入主题失败，请检查格式。",
    exportJSON: "导出为 JSON",
    exportDescription: "将主题配置复制为 JSON 到剪贴板。",
    copyJSON: "复制到剪贴板",
    exportSuccess: "主题已复制到剪贴板",
    cloneSuccess: "已从 {{name}} 克隆颜色",
    nameRequired: "请输入主题名称",
    displayNameRequired: "请输入显示名称",
    saveFailed: "保存主题失败",
    createSuccess: "自定义主题创建成功",
    updateSuccess: "自定义主题更新成功",
    deleteSuccess: "自定义主题删除成功",
    deleteTitle: "删除自定义主题",
    deleteDescription: '确定要删除 "{{name}}" 吗？此操作无法撤销。',
    simpleMode: "简单模式",
    advancedMode: "高级模式",
    simpleModeDesc: "只需选择 4 种颜色，我们将为您生成完整的主题。",
    presets: "快速开始预设",
    presetApplied: "已应用 {{name}} 预设",
    backgroundColor: "背景色",
    backgroundColorDesc: "主背景颜色",
    foregroundColor: "文字色",
    foregroundColorDesc: "主文字颜色",
    accentColor: "强调色",
    accentColorDesc: "按钮、链接、高亮",
    secondaryColor: "辅助色",
    secondaryColorDesc: "成功状态、信息提示",
    switchToAdvanced: "切换到高级模式可以微调每个颜色。"
  },
  skills: {
    title: "技能",
    description: "管理 Claude 技能以获取专业 AI 能力",
    noSkills: "未找到技能",
    skillsCount: "{{count}} 个技能可用",
    refresh: "刷新",
    openFolder: "打开文件夹",
    noSkillsHint: "尚未安装技能",
    addSkillsHint: "将包含 SKILL.md 的文件夹放入 ~/.config/alma/skills/ 来添加技能",
    bundledSkills: "内置技能",
    personalSkills: "个人技能",
    claudeCodeSkills: "Claude Code 技能",
    agentsSkills: "Agent Skills",
    folders: {
      title: "其他工具的技能目录",
      description: "Alma 默认也会读取你给这些工具装的技能。关掉某个目录，Alma 就不再加载里面的技能，目录本身不受影响。"
    },
    marketplaceSkills: "应用商店技能",
    projectSkills: "项目技能",
    viewContent: "查看内容",
    deleteConfirmTitle: "删除技能",
    deleteConfirmDesc: '确定要删除 "{{name}}" 吗？此操作无法撤销。',
    searchPlaceholder: "搜索技能名称、描述或路径…（/ 或 ⌘F）",
    noResults: "没有匹配的技能",
    extraction: {
      title: "自动技能提取",
      description: "从长对话中自动提取可复用的技能",
      minToolCalls: "最少工具调用次数",
      minToolCallsHint: "工具调用次数低于此值的对话将被跳过"
    }
  },
  hooks: {
    title: "钩子",
    description: "配置在生命周期事件中运行的 Shell 命令钩子。钩子以 JSON 配置文件的形式存储，便于编辑。",
    noHooks: "未配置钩子",
    noHooksHint: "添加钩子规则以在生命周期事件中运行 Shell 命令。",
    addHooksHint: "编辑 ~/.config/alma/hooks.json 或在下方添加钩子。",
    hooksCount: "已配置 {{count}} 个钩子事件",
    addHookEvent: "添加钩子事件",
    addRule: "添加规则",
    addCommand: "添加命令",
    matcher: "匹配器 (正则表达式)",
    matcherHint: "用于过滤钩子触发条件的正则表达式",
    command: "命令",
    commandHint: "要执行的 Shell 命令。通过 stdin 接收 JSON 输入。",
    timeout: "超时时间 (毫秒)",
    enabled: "启用",
    reload: "重新加载",
    openFile: "打开配置",
    deleteRule: "删除规则",
    deleteRuleConfirm: "删除此规则？",
    deleteRuleDesc: "将删除该规则及其所有命令。",
    deleteCommand: "删除命令",
    deleteCommandConfirm: "删除此命令？",
    deleteCommandDesc: "将从规则中删除该命令。",
    selectEvent: "选择钩子事件",
    protocol: "退出码 0 = 允许，2 = 阻止。JSON stdout 可包含 decision、reason、updatedInput。",
    noCommands: "此规则中没有命令",
    rules: "条规则",
    commands: "条命令"
  },
  secrets: {
    title: "密钥",
    description: "供 Agent 使用的第三方 API/服务令牌，加密存储。值是只写的——以环境变量形式注入 Agent 执行的命令，且所有输出中会被打码；这里和 API 都无法读回值。",
    empty: "还没有密钥。",
    add: "添加密钥",
    name: "名称",
    namePlaceholder: "GH_TOKEN",
    nameHint: "环境变量风格：大写字母、数字、下划线。Agent 以 $NAME 使用它。",
    value: "值",
    valuePlaceholder: "粘贴令牌…",
    note: "备注",
    notePlaceholder: "用途说明（可选）",
    envInject: "注入到 Agent 命令",
    envInjectHint: "开启后，Agent 执行的命令可通过 $NAME 使用该密钥。",
    save: "保存",
    cancel: "取消",
    update: "更新值",
    "delete": "删除",
    deleteTitle: "删除密钥？",
    deleteBody: "将删除 {{name}}。依赖 ${{name}} 的命令会失效。",
    unencrypted: "未使用系统级加密存储（此系统上 safeStorage 不可用）。",
    envOn: "注入：开",
    envOff: "注入：关",
    saved: "密钥已保存",
    deleted: "密钥已删除",
    cliHint: "CLI：alma secret set <NAME>（值从 stdin 读取）· alma secret list · alma secret rm <NAME>"
  },
  imageGen: {
    title: "图像生成",
    model: "模型",
    auto: "自动",
    loading: "正在加载可用模型…",
    noProvider: "没有可用的图像模型。请在「提供商」里为某个 provider 启用图像模型（Gemini、GPT Image、DALL·E、Flux…）。",
    loadError: "加载图像模型失败。",
    unavailable: "配置的模型当前不可用：",
    description: "图像生成技能（alma image generate / edit）使用的模型，涵盖 Gemini 和 OpenAI 兼容提供商（GPT Image、DALL·E…）。除非你在对话里点名别的模型，否则出图用的就是这里选的模型。「自动」会从你已启用的模型里挑一个。",
    aspectRatio: "宽高比",
    aspectRatioDescription: "生成图片的默认画面比例,也可在输入框里随时切换。"
  },
  translateTo: {
    title: "翻译为",
    description: "选中文字后「翻译」会译成这种语言；只有与它文字不同的内容才会出现翻译按钮。",
    auto: "跟随界面语言"
  },
  windowsShell: {
    title: "Windows Shell",
    description: "Bash 工具执行命令所用的 shell。Auto 优先使用已安装的 Git Bash，否则回退 PowerShell。PowerShell 会优先使用已安装的 PowerShell 7（pwsh），否则使用系统自带的 Windows PowerShell 5.1。",
    auto: "自动（优先 Git Bash）",
    gitbash: "Git Bash",
    powershell: "PowerShell（已安装则用 7）"
  },
  computerUse: {
    never: "从未",
    justNow: "刚刚",
    minutesAgo: "{{n}} 分钟前",
    hoursAgo: "{{n}} 小时前",
    daysAgo: "{{n}} 天前",
    helperNotFound: "✗ 未找到 helper 二进制。请运行 `pnpm build:computer-use`。",
    helperAlive: "✓ Helper v{{version}} 运行中（已运行 {{uptime}} 秒）",
    axGranted: "✓ 已授予辅助功能权限",
    axMissing: "✗ 缺少辅助功能权限",
    srGranted: "✓ 已授予屏幕录制权限",
    srMissing: "✗ 缺少屏幕录制权限",
    title: "Computer Use",
    desc1: "让 Alma 在后台操作原生 Mac 应用而不抢占你当前应用的焦点。需要已签名的 helper（",
    desc2: "）及 macOS 权限。",
    helperSection: "Helper",
    helperPathMissing: "（未找到——请运行 `pnpm build:computer-use`）",
    permissionsSection: "权限",
    accessibility: "辅助功能",
    screenRecording: "屏幕录制",
    focusGuardTitle: "焦点保护未生效",
    focusGuardBody: "Alma 无法启用防止应用抢占前台窗口的守卫，操作可能会夺走你的焦点。通常是 helper 需要重新授予辅助功能权限——macOS 会在每次新构建后重置。请在上方重新授权后重试。",
    triggerAxDialog: "触发 AX 授权弹窗",
    testMySetup: "测试我的配置",
    strictTitle: "按应用严格审批",
    strictDesc: "开启时，新应用必须在下方显式批准后 Alma 才能操作；关闭时，应用首次使用即自动批准（之后仍可撤销）。",
    actionLogTitle: "记录操作日志",
    actionLogDesc: "在本地滚动记录每次 Computer Use 操作（工具、应用、参数、时长）用于调试。数据不会离开你的 Mac。",
    pipTitle: "画中画",
    pipDesc: "Alma 操作桌面时悬浮镜像屏幕的面板，在任何 Space 都能围观全程——哪怕你正在别的应用里干活。",
    approvedApps: "已批准的应用",
    noApprovedApps: "还没有已批准的应用。Alma 首次操作某个应用时会出现在这里（除非开启严格模式，否则自动批准）。",
    usedLast: "使用 {{count}} 次 · 最近 {{last}}",
    revoke: "撤销",
    revokeTitle: "撤销批准？",
    revokeDesc1: "Alma 将不再被允许操作 ",
    revokeDesc2: " ，直到你再次批准。"
  },
  activityRecorder: {
    justNow: "刚刚",
    minutesAgo: "{{n}} 分钟前",
    hoursAgo: "{{n}} 小时前",
    daysAgo: "{{n}} 天前",
    title: "活动记录器",
    recording: "录制中",
    screenLocked: "屏幕已锁定",
    desc: "静默截屏、OCR 识别并跟踪输入事件，让 Chat 能回答“我刚才在干什么”。数据不会离开本机。",
    statSessions: "会话数",
    statSnapshots: "快照数",
    statCurrentSession: "当前会话",
    statFrontApp: "前台应用",
    active: "活跃",
    idle: "空闲",
    storageUsedLabel: "已用存储：",
    storageUsedOf: "/ {{max}}（{{pct}}%）",
    autoDeleteHint: "超出上限的旧快照会自动删除",
    macosPermissions: "macOS 权限",
    screenRecording: "屏幕录制",
    accessibilityLabel: "辅助功能（用于全局键鼠监听）",
    granted: "已授权",
    notGranted: "未授权",
    captureSection: "采集",
    snapshotDebounceLabel: "快照防抖（毫秒）",
    snapshotDebounceHint: "两次采集之间的最小间隔",
    heartbeatIntervalLabel: "心跳间隔（毫秒）",
    heartbeatIntervalHint: "即使空闲也按此间隔强制采集",
    idleThresholdLabel: "空闲阈值（毫秒）",
    idleThresholdHint: "无输入达到该时长后关闭会话",
    typingPauseLabel: "输入停顿（毫秒）",
    typingPauseHint: "无按键 N 毫秒后采集",
    visualPollLabel: "画面变化轮询（毫秒）",
    visualPollHint: "无输入时检测动画/视频（0 = 关闭）",
    jpegQualityLabel: "JPEG 质量",
    jpegQualityHint: "1–100，越低文件越小",
    ocrInputSection: "OCR 与输入",
    runOcrLabel: "对每张快照运行 Vision OCR",
    runOcrHint: "仅 macOS。供关键词与语义搜索使用。",
    inputMonitorLabel: "全局键盘与鼠标监听",
    inputMonitorHint: "记录点击/按键事件。需要辅助功能权限。",
    ocrLanguagesLabel: "OCR 语言（Vision 代码，逗号分隔）",
    ocrEveryNLabel: "每 N 张快照 OCR 一次",
    ocrEveryNHint: "1 = 每张都识别，5 = 每 5 张识别 1 张。长会话可降低数据库负载。",
    sensitiveAppsSection: "敏感应用（永不采集）",
    sensitiveAppsHint: "每行一个 bundle ID。这些应用在前台时不采集。",
    storageQuotaSection: "存储配额",
    maxStorageLabel: "最大存储（MB）",
    maxStorageHint: "超过上限时自动删除最旧快照。10240 = 10 GB。",
    outputDirectory: "输出目录",
    tieringHint: "快照随年龄降级重编码（warm ≈1280×720 q40，cold ≈640×360 q30），10 GB 能存数周而非数天的历史。",
    recentSessions: "最近会话",
    sessionFallback: "会话",
    sessionMeta: "{{when}} · {{duration}} · {{snapshots}} 张快照 · {{events}} 个事件",
    dangerZone: "危险区",
    dangerZoneHint: "删除全部已记录的活动（会话、磁盘上的截图、OCR 文本、向量）。不可撤销。",
    clearAllData: "清除全部活动数据",
    deleteAllTitle: "删除全部活动数据？",
    deleteAllDesc: "将删除全部 {{count}} 个会话及其事件、截图、OCR 文本和向量。记录器配置保持不变。此操作不可撤销。",
    deleteEverything: "全部删除",
    runningFooter: "运行中 · 多数参数即时生效；会话/空闲计时相关改动在下个会话生效。",
    openSystemSettings: "打开系统设置"
  },
  copilot: {
    failedGetDeviceCode: "获取设备码失败",
    failedStartAuth: "启动认证失败",
    failedSaveToken: "保存 token 失败",
    failedGetAccessToken: "获取 access token 失败",
    failedCompleteAuth: "完成认证失败",
    addAnotherAccount: "添加另一个 GitHub 账号",
    connectAccount: "连接 GitHub 账号",
    gettingCode: "正在获取授权码...",
    step1: "第 1 步：复制此授权码",
    requiredBadge: "必需",
    step2: "第 2 步：打开 GitHub 并粘贴授权码",
    openVerificationPage: "打开 GitHub 验证页面",
    step3: "第 3 步：授权完成后点击这里",
    finalStepBadge: "最后一步",
    authorizedButton: "我已在 GitHub 完成授权",
    completingAuth: "正在完成认证...",
    authError: "认证过程中发生错误",
    tryAgain: "重试",
    checkingAuth: "正在检查认证状态...",
    authenticated: "已认证",
    signedInAs: "已登录为 @{{username}}",
    "switch": "切换",
    addAccount: "添加账号",
    disconnect: "断开连接",
    switchAccount: "切换 GitHub 账号",
    active: "当前使用",
    connectedFooter: "GitHub Copilot 订阅已连接，现在可以在聊天中使用 Copilot 模型。",
    accountsAvailable: "（{{count}} 个可用账号）",
    authTitle: "GitHub Copilot 认证",
    authDesc: "连接 GitHub 账号，通过 Copilot 订阅使用模型。需要有效的 GitHub Copilot 订阅。",
    useExistingAccount: "使用已有账号",
    use: "使用",
    or: "或",
    connectAnotherAccountTitle: "连接另一个 GitHub 账号",
    connectAccountTitle: "连接 GitHub 账号"
  },
  appshots: {
    hintDoubleCommand: "同时按下两个 ⌘ 键——或快速连按 ⌘ 两次",
    hintDoubleOption: "同时按下两个 ⌥ 键——或快速连按 ⌥ 两次",
    hintDoubleShift: "同时按下两个 ⇧ 键——或快速连按 ⇧ 两次",
    hintBothCommand: "同时按下左右两个 ⌘ 键；连按两次不会触发",
    hintBothOption: "同时按下左右两个 ⌥ 键；连按两次不会触发",
    hintBothShift: "同时按下左右两个 ⇧ 键；连按两次不会触发",
    togetherOnly: "（仅同时按）",
    helperUnreachable: "无法连接 Computer Use helper：{{error}}",
    none: "无",
    heroTitle: "用 Appshot 把前台窗口展示给 Alma",
    heroDesc1: "Appshot 会捕获前台窗口——包括可见像素和辅助功能文本轮廓——并附加到聊天输入框。在任何应用中，",
    heroDescStrong: "同时按下两个 ⌘ 键",
    heroDesc2: "或快速连按修饰键两次。Alma 会带着已附加的快照来到前台；AX 文本随消息隐形携带，模型能看到完整窗口上下文。",
    unsupportedNotice: "Appshot 需要 macOS 以及具备辅助功能 + 屏幕录制权限的 Alma Computer Use helper。请先在 Computer Use 设置中授权，再回来启用快捷键。",
    hotkey: "快捷键",
    noHotkey: "未配置快捷键——Appshot 处于关闭状态。",
    warmingUp: "正在预热 Computer Use helper…",
    openAccessibilitySettings: "打开辅助功能设置",
    whereItLands: "快照去向",
    currentThread: "当前会话",
    newThread: "新会话",
    whereDesc1: "（默认）把 Appshot 放进当前打开的聊天，方便继续讨论你正在查看的窗口。",
    whereDesc2: "则总是为 Appshot 开一个新聊天——类似 Codex 的专用快捷键窗口行为。",
    testIt: "测一下",
    testItDesc: "忽略快捷键，直接对 Alma 认为的前台窗口截取一次。用于验证权限。",
    captureNow: "立即截取"
  },
  channelBindings: {
    title: "频道工作区绑定",
    desc: "把频道/聊天绑定到特定工作区，让工具（Bash、Read、Write）在正确的项目目录里运行。未绑定的频道使用全局默认工作区。",
    searchChannel: "搜索 {{label}}...",
    noChannelsFound: "未找到频道。请在下方手动输入 ID。",
    typeIdManually: "或手动输入 ID...",
    workspace: "工作区",
    selectWorkspace: "选择工作区..."
  },
  readAloud: {
    voiceChinese: "中文",
    voiceEnglish: "英语",
    title: "朗读（端上）",
    desc: "私有的端上语音朗读回复和通知。首次开启时会下载语音（约 160–320 MB），也可以在下方提前下载并试听。",
    notAvailable: "此平台不支持端上语音。",
    autoReadReplies: "自动朗读聊天回复",
    autoReadRepliesDesc: "每条助手回复完成后朗读。",
    readNotifications: "朗读通知",
    readNotificationsDesc: "后台通知到达时朗读。",
    voices: "语音",
    starting: "启动中…",
    preparingVoice: "正在为首次使用准备语音…",
    downloadOf: "{{downloaded}} / {{total}}",
    installed: "已安装",
    notInstalled: "未安装",
    loading: "加载中…",
    test: "试听",
    removeVoice: "移除此语音",
    download: "下载"
  },
  chatUi: {
    enableStreamingSoundEffects: "启用流式音效",
    streamingSoundEffectsDesc: "AI 回复流式输出时播放合成音效",
    soundPreset: "音效预设",
    presetClassicDesc: "温暖的三角波，带轻柔混响",
    presetEtherealDesc: "柔和的正弦波，氛围空灵",
    presetDigitalDesc: "清脆的方波，效果极简",
    presetRetroDesc: "怀旧的锯齿波，带温暖滤波",
    presetHint: "选择一个合成器预设并点击“{{preview}}”试听",
    volumeLabel: "音量：{{volume}}%",
    adjustSynthVolume: "调整合成器音量"
  },
  iosConnection: {
    bridgeUnavailable: "原生配置桥不可用——这是 iOS 应用吗？",
    backendTitle: "后端",
    localTitle: "仅在这台设备上",
    localDesc: "对话和 API 密钥都留在本机。离线可用，不需要 Mac。",
    remoteTitle: "你的 Mac（经中继）",
    remoteDesc: "随时随地操控 Mac 上运行的 Alma：终端、Computer Use、本地 MCP 服务器、你的文件。",
    statusTitle: "状态",
    reconnect: "重连",
    pairTitle: "与 Mac 配对",
    step1: "在 Mac 上打开「设置 → 远程访问」，开启中继。",
    step2: "用「相机」对准那里显示的二维码，点按顶部的 Alma 横幅。",
    pasteLabel: "或粘贴 Mac 上的配对链接",
    pastePlaceholder: "alma://connect?…",
    paste: "粘贴",
    connect: "连接",
    connecting: "连接中…",
    invalidLink: "这不像是 Alma 的配对链接或地址。",
    unreachable: "连不上 {{host}}。Alma 在那里运行着吗？",
    lanHint: "同一 Wi‑Fi 下也可以直接填 Mac 的局域网地址，例如 http://192.168.1.20:23001。",
    onboardingTitle: "与 Mac 配对",
    onboardingDesc: "这台设备 操控的是你 Mac 上运行的 Alma。配对一次即可，所有数据经中继端到端加密传输。"
  },
  claudeSubscription: {
    tomorrowAt: "明天 {{time}}",
    failedStartAuth: "启动授权失败",
    failedGetTokens: "获取 token 失败",
    failedCompleteAuth: "完成认证失败",
    checkingAuth: "正在检查认证状态...",
    authenticated: "已认证",
    connectedFallback: "已连接 Claude Pro/Max",
    logout: "退出登录",
    usageQuota: "用量配额",
    loadingQuota: "正在加载配额...",
    fiveHour: "5 小时",
    sevenDay: "7 天",
    opusSevenDay: "Opus 7 天",
    sonnetSevenDay: "Sonnet 7 天",
    resetsAt: "{{time}} 重置",
    quotaLoadFailed: "无法加载配额——用量接口可能被限流，稍后刷新重试。",
    authTitle: "Claude Pro/Max 认证",
    authDesc: "连接 Anthropic 账号，通过 Pro 或 Max 订阅使用 Claude 模型。会跳转到 Anthropic 授权页，然后把授权码粘贴回这里。",
    connectButton: "连接 Claude Pro/Max",
    enterCode: "输入授权码",
    stepBadge: "第 2 步 / 共 2 步",
    enterCodeDesc: "在浏览器完成授权后，从页面复制授权码并粘贴到下方。",
    codePlaceholder: "在此粘贴授权码...",
    authError: "认证过程中发生错误",
    tryAgain: "重试"
  },
  themeUi: {
    basedOn: "基于：{{name}}",
    pluginBadge: "插件",
    byAuthor: "作者：{{author}}"
  },
  providerIcon: {
    defaultIcon: "默认图标",
    searchIcons: "搜索图标…",
    loadingIcons: "正在加载图标…",
    noIconsFound: "未找到图标"
  },
  networkUi: {
    hostPlaceholder: "例如 127.0.0.1",
    portPlaceholder: "例如 8080"
  },
  generalUi: {
    iconDefault: "默认",
    iconAlt: "备选",
    injectScreenContext: "注入实时屏幕上下文",
    injectScreenContextDesc: "每条 QuickChat 消息都会附带最新的屏幕内容片段（前台应用、浏览器 URL、最新 OCR、最近分析的会话）。需要启用活动记录器。",
    ambientMode: "以环境（点击穿透）模式启动",
    ambientModeDesc: "QuickChat 可见但忽略鼠标事件，悬浮在工作上方而不抢焦点。按 QuickChat 快捷键唤醒。"
  },
  people: {
    title: "联系人档案",
    description: "管理用于跨平台身份匹配的联系人档案。每个人可以有平台 ID（Telegram、Discord、飞书）和一份 markdown 档案。",
    searchPlaceholder: "搜索联系人...",
    addPerson: "添加联系人",
    newPerson: "新联系人",
    loading: "加载中...",
    noSearchMatch: "没有匹配的联系人",
    noPeopleYet: "还没有联系人档案",
    deletePersonTitle: "删除联系人",
    deletePersonDescription: "确定删除“{{name}}”？将移除其档案和头像。此操作不可撤销。",
    cancel: "取消",
    "delete": "删除",
    edit: "编辑",
    telegramId: "Telegram ID",
    discordId: "Discord ID",
    discordUsername: "Discord 用户名",
    feishuId: "飞书 ID",
    username: "用户名",
    name: "姓名",
    namePlaceholder: "联系人姓名（用作文件名）",
    telegramIdPlaceholder: "例如 403000703",
    discordIdPlaceholder: "例如 123456789",
    discordUsernamePlaceholder: "例如 someone#1234",
    feishuIdPlaceholder: "例如 ou_xxxxx",
    usernamePlaceholder: "例如 someone",
    profileContent: "档案内容",
    profileContentPlaceholder: "Markdown 档案内容...",
    avatar: "头像",
    uploadImage: "上传图片",
    removeAvatar: "移除头像",
    create: "创建",
    save: "保存"
  },
  weixin: {
    secondsAgo: "{{seconds}} 秒前",
    minutesAgo: "{{minutes}} 分钟前",
    hoursMinutesAgo: "{{hours}} 小时 {{minutes}} 分钟前",
    daysHoursAgo: "{{days}} 天 {{hours}} 小时前",
    enableBot: "启用微信机器人",
    enableBotDescription: "把 Alma 接入微信收发消息",
    loggedIn: "已登录",
    loggingOut: "正在退出...",
    logout: "退出登录",
    scanQrHint: "用微信扫码登录",
    qrCodeAlt: "微信二维码",
    waitingForScan: "等待扫码...",
    qrExpired: "二维码已过期",
    refresh: "刷新",
    generatingQr: "正在生成二维码...",
    loading: "加载中...",
    retry: "重试",
    showQrCode: "显示二维码",
    defaultModel: "默认模型",
    defaultModelDescription: "微信对话使用的 AI 模型。未设置时回退到全局默认。",
    selectModelPlaceholder: "选择模型...",
    status: "状态",
    connection: "连接",
    running: "运行中",
    stopped: "已停止",
    started: "启动于",
    lastEvent: "最近事件",
    noEventsYet: "暂无事件",
    debugLogs: "调试日志",
    botLog: "机器人日志",
    bridgeLog: "桥接日志",
    conversationId: "会话 ID",
    conversationIdPlaceholder: "例如 wxid_xxxxx"
  },
  chromeRelay: {
    regenerateConfirm: "确定重新生成认证 token？已连接的扩展需要更新为新 token。",
    connectionStatus: "连接状态",
    status: "状态",
    connected: "已连接",
    disconnected: "未连接",
    attachedTabs: "已附加标签页",
    authToken: "认证 Token",
    copied: "已复制",
    copy: "复制",
    regenerate: "重新生成",
    tokenDescription: "此 token 用于 Chrome 扩展与 Alma 的认证。请保密。",
    launchChrome: "启动 Chrome",
    launchDescription: "启动预装 relay 扩展的 Chromium 或 Chrome for Testing，扩展会自动连接。Google Chrome 137 起不再允许这种方式，请用下方手动安装。",
    launchUnsupported: "Google Chrome 已不支持以这种方式加载扩展。请按下方步骤手动安装一次（加载已解压的扩展程序），之后会一直保留。",
    launchNotFound: "未找到 Chromium 或 Chrome for Testing。请按下方步骤手动安装扩展。",
    launchFailed: "无法启动浏览器。请按下方步骤手动安装扩展。",
    closeChromeFirst: "为获得最佳效果，请先关闭所有 Chrome 窗口。",
    launching: "启动中...",
    launchWithExtension: "启动带扩展的 Chrome",
    manualInstall: "手动安装",
    extensionPath: "扩展路径",
    loading: "加载中...",
    steps: "步骤",
    step1: "复制上方扩展路径",
    step2: "打开 Chrome 并访问",
    step3Before: "启用",
    step3After: "（右上角开关）",
    step4Before: "点击",
    step4After: "并粘贴扩展路径",
    step5: "打开扩展弹窗并输入上方显示的认证 token",
    tab: "标签页 {{id}}",
    none: "（无）"
  },
  discord: {
    discordBot: "Discord 机器人",
    enableBot: "启用 Discord 机器人",
    enableBotDescription: "把 Alma 接入 Discord 服务器聊天",
    botToken: "机器人 Token",
    createBotAt: "在此创建机器人：",
    enableIntentBefore: "需在 Bot 设置中启用",
    enableIntentAfter: "intent。",
    defaultModel: "默认模型",
    defaultModelDescription: "Discord 对话使用的 AI 模型。未设置时回退到聊天默认模型。",
    selectModelPlaceholder: "选择模型...",
    accessControl: "访问控制",
    accessControlDescription: "限制 Alma 可交互的服务器和频道。留空表示全部允许。",
    allowedServerIds: "允许的服务器 ID",
    allowedServerIdsDescription: "只在这些服务器响应。右键服务器 → 复制服务器 ID。",
    serverIdPlaceholder: "服务器 ID（例如 123456789）",
    add: "添加",
    allowedChannelIds: "允许的频道 ID",
    allowedChannelIdsDescription: "只在这些频道响应。右键频道 → 复制频道 ID。",
    channelIdPlaceholder: "频道 ID（例如 987654321）",
    mentionOnlyMode: "仅 @ 模式",
    mentionOnlyDescription: "仅在被 @、被回复或私聊时响应，忽略其他消息。",
    setupGuide: "配置指南",
    setupStep1Before: "前往",
    setupStep1After: "→ New Application",
    setupStep2: "进入 Bot 标签 → 复制 Token → 粘贴到上方",
    setupStep3Before: "在 Bot → Privileged Gateway Intents 中启用",
    setupStep3After: "。",
    setupStep4Before: "进入 OAuth2 → URL Generator → 选择",
    setupStep4After: "scope",
    setupStep5: "选择权限：Send Messages、Read Messages/View Channels、Attach Files、Add Reactions、Read Message History",
    setupStep6: "复制生成的 URL 并打开，把机器人邀请进你的服务器",
    channelId: "频道 ID",
    bindingChannelPlaceholder: "例如 987654321"
  },
  telegram: {
    noInactiveSessions: "没有发现闲置的 Telegram 会话。",
    scanFailed: "扫描失败",
    deletedInactiveSessions: "已删除 {{num}} 个闲置会话。",
    cleanupFailed: "清理失败",
    deleteByPatternConfirm: "删除所有标题包含“{{pattern}}”的会话？此操作不可撤销。",
    deletedThreadsWithSkipped: "已删除 {{num}} 个会话，跳过 {{skipped}} 个（忙碌中）。",
    deletedThreads: "已删除 {{num}} 个会话。",
    batchDeleteFailed: "批量删除失败",
    testMessageSent: "测试消息已发送！",
    sendFailed: "token 有效，但发送失败：{{error}}",
    testFailed: "测试失败",
    connectionError: "连接错误",
    foundUsers: "发现 {{num}} 个用户",
    noUsersFound: "未发现用户。请先给机器人发一条消息再重试。",
    detectionFailed: "检测失败",
    telegramBot: "Telegram 机器人",
    enableBot: "启用 Telegram 机器人",
    enableBotDescription: "把 Alma 接入 Telegram 实现移动端聊天",
    botToken: "机器人 Token",
    getTokenFrom: "从这里获取 token：",
    testing: "测试中...",
    sendTestMessage: "发送测试消息",
    allowedUserIds: "允许的用户 ID",
    allowedUserIdsDescription: "只有这些 Telegram 用户能与机器人交互。留空表示所有人可用。先给机器人发消息，再点检测自动发现用户 ID。",
    userIdPlaceholder: "Telegram 用户 ID",
    add: "添加",
    detecting: "检测中...",
    detect: "检测",
    detectedUsersHint: "检测到的用户（点击添加）：",
    defaultModel: "默认模型",
    defaultModelDescription: "Telegram 对话使用的 AI 模型。经 Telegram 新建的会话将使用此模型。",
    selectModelPlaceholder: "选择模型...",
    chatId: "Chat ID",
    chatIdPlaceholder: "例如 123456789",
    sessionCleanup: "会话清理",
    sessionCleanupDescription: "清理残留的 Telegram 会话。闲置会话指已被替代、不再绑定任何聊天的会话。",
    foundInactivePrefix: "发现",
    foundInactiveSuffix: "个闲置会话。删除它们？",
    "delete": "删除",
    cancel: "取消",
    clearing: "清理中…",
    clearInactiveSessions: "清理闲置会话",
    batchDeleteByTitle: "按标题批量删除",
    batchDeleteDescription: "删除标题包含下方文本的所有会话（例如“Telegram:”）。",
    patternPlaceholder: "例如 Telegram:",
    deleteMatching: "删除匹配项"
  },
  providersUi: {
    remoteSignIn: {
      title: "登录 {{name}}",
      description: "Alma 运行在没有浏览器的服务器上，请在这台电脑上完成登录。",
      openStep: "打开登录页并登录",
      openButton: "打开登录页",
      copyLink: "复制链接",
      copied: "已复制",
      copyFailed: "无法复制链接",
      pasteStep: "粘贴跳转后的地址",
      pasteHint: "登录后浏览器会跳到 {{host}}，并显示无法访问。这是正常的：从地址栏复制这个页面的完整地址，粘贴到这里。",
      finish: "完成登录",
      waiting: "登录完成后 Alma 会自动连接。"
    },
    versionHintBefore: "部分服务商要求 URL 末尾带版本路径（例如",
    versionHintAfter: "）。请求失败时可尝试追加。",
    capVision: "视觉",
    capVisionTooltip: "支持图片输入",
    capImage: "生图",
    capImageTooltip: "可生成图片",
    capTools: "工具",
    capToolsTooltip: "支持函数调用",
    capToolsXmlTooltip: "经 XML 中间件支持函数调用",
    capReasoning: "推理",
    capReasoningTooltip: "扩展思考/推理",
    capEmbedding: "向量",
    capEmbeddingTooltip: "用于生成向量的 embedding 模型",
    contextWindowTooltip: "{{tokens}} token 上下文窗口",
    quotaResetNow: "现在",
    unknownModel: "未知模型",
    manualBadge: "手动",
    providerOptionsTooltip: "服务商选项",
    searchModelsPlaceholder: "搜索模型...",
    noModelFound: "未找到模型。",
    fetchModelsFailed: "获取模型失败",
    providerOptionsMustBeObject: "服务商选项必须是 JSON 对象",
    invalidJson: "JSON 语法无效",
    customHeadersMustBeObject: "自定义 Header 必须是 JSON 对象",
    invalidJsonHeaders: "自定义 Header 的 JSON 语法无效",
    extraBodyMustBeObject: "Extra body 必须是 JSON 对象",
    invalidJsonExtraBody: "Extra body 的 JSON 语法无效",
    saveOptionsFailed: "保存选项失败",
    testFailed: "测试失败",
    customAcpShort: "自定义 ACP",
    addCustomAcpProvider: "添加自定义 ACP 服务商",
    custom: "自定义",
    addCustomProvider: "添加自定义服务商",
    active: "已启用",
    inactive: "未启用",
    unknownError: "未知错误",
    enableProvider: "启用服务商",
    baseUrl: "Base URL",
    asyncImageGeneration: "异步生图",
    asyncImageGenerationHint: "适用于先返回任务 ID、再查询结果的服务商，例如 ModelScope、ToAPIs。",
    imageGenerationRequestMode: "生图请求模式",
    imageGenerationRequestModeHint: "可为当前模型覆盖服务商的默认设置。",
    imageGenerationModeInherit: "跟随服务商设置",
    imageGenerationModeSync: "同步",
    imageGenerationModeAsync: "异步",
    ollamaBaseUrlHint: "留空使用默认 Ollama 端点（http://localhost:11434/v1）",
    gettingStarted: "快速开始：",
    ollamaEnsureRunning: "确保本机已安装并运行 Ollama。",
    installLabel: "安装：",
    pullModelLabel: "拉取模型：",
    runLabel: "运行：",
    command: "命令",
    commandPlaceholder: "例如 claude-code-acp、gemini、codex",
    cliCommandHint: "用于启动 ACP agent 的 CLI 命令",
    argumentsLabel: "参数",
    argsPlaceholder: "例如 --acp --experimental-acp",
    argsHint: "命令行参数（空格分隔）",
    authenticationMethod: "认证方式",
    selectAuthMethodPlaceholder: "选择认证方式",
    noneSkipAuth: "无（跳过认证）",
    selectAuthMethodHint: "为此 ACP agent 选择认证方式",
    apiProvider: "API 服务商",
    selectApiProviderPlaceholder: "选择 API 服务商",
    noneUseAnthropicDirectly: "无（通过 claude login 直连 Anthropic）",
    usesProviderKeyClaudeCode: "Claude Code 使用该服务商的 API key 和 base URL",
    runClaudeLoginHint: "运行 `claude login` 直接向 Anthropic 认证",
    runAgyLoginHint: "请先在终端运行一次 `agy` 并用 Google 账号登录（Antigravity CLI：https://antigravity.google/cli）。Alma 启动的 agy-acp 适配器会复用该登录。",
    agyTermsCaveat: "Google FAQ 声明通过第三方工具使用 Antigravity 可能违反其服务条款，请自行承担风险。",
    noCompatibleProvidersAnthropic: "未配置兼容的服务商。请先添加任一服务商（Anthropic、OpenAI、DeepSeek、OpenRouter 等）。",
    modelMapping: "模型映射",
    mapClaudeTiers: "把 Claude 模型档位映射到 {{name}} 模型",
    defaultModelLabel: "默认模型",
    selectDefaultModel: "选择默认模型",
    opusModel: "Opus 模型",
    selectOpusModel: "选择 opus 模型",
    sonnetModel: "Sonnet 模型",
    selectSonnetModel: "选择 sonnet 模型",
    haikuModel: "Haiku 模型",
    selectHaikuModel: "选择 haiku 模型",
    subagentModel: "子代理模型",
    selectSubagentModel: "选择子代理模型",
    noneUseBuiltinAuth: "无（使用内置认证）",
    usesProviderKeyCodex: "Codex 使用该服务商的 API key 和 base URL",
    usesBuiltinCodexAuth: "使用 Codex 内置认证方式",
    noCompatibleProvidersOpenai: "未配置兼容的服务商。请先添加 OpenAI、OpenRouter 或其他 OpenAI 兼容服务商。",
    mcpServers: "MCP 服务器",
    disabledBadge: "已禁用",
    selectMcpServersHint: "选择 ACP agent 可访问的 MCP 服务器",
    installation: "安装：",
    installNoSetupBefore: "无需配置——Alma 首次使用时会通过",
    installNoSetupAfter: "自动获取 agent。想跳过这次性下载，可全局安装 CLI：",
    apiKey: "API Key",
    enterApiKeyPlaceholder: "输入你的 API key",
    getApiKeyFrom: "在此获取 API key：",
    apiProxyEndpoint: "API 代理端点（可选）",
    copilotProxyHint: "仅用于推理请求。留空使用默认 GitHub Copilot 端点。",
    baseUrlOptional: "Base URL（可选）",
    defaultEndpointHint: "留空使用默认 {{name}} API 端点",
    apiHost: "API Host",
    azureEndpointHint: "你的 Azure OpenAI 资源端点 URL",
    responseApi: "Response API",
    azureResponseApiHint: "使用 Azure OpenAI Responses API 而非 Chat Completions API",
    apiVersion: "API 版本",
    azureApiVersionHint: "留空使用默认值（2024-08-01-preview）",
    zaiEndpointHint: "Z.AI Coding Plan 端点（默认：https://api.z.ai/api/coding/paas/v4）",
    kimiEndpointHint: "Kimi Coding Plan 端点（默认：https://api.kimi.com/coding/v1）",
    opencodeEndpointHint: "OpenCode Go 订阅端点；模型协议自动选择。",
    accountId: "Account ID",
    findInDashboardHint: "在 Cloudflare Dashboard → AI → AI Gateway 查看",
    gatewayId: "Gateway ID",
    gatewayUrlAuto: "Gateway URL（自动生成）",
    gatewayUrlHint: "由上方 Account ID 与 Gateway ID 自动拼接。服务商后缀（如 /openai）按模型自动添加。",
    deployments: "部署",
    models: "模型",
    fetch: "获取",
    deploymentNamePlaceholder: "部署名称（例如 gpt-4o）",
    modelIdAcpPlaceholder: "模型 ID（例如 opus、gpt-5-codex-low）",
    modelIdPlaceholder: "模型 ID（例如 gpt-4o）",
    displayNamePlaceholder: "显示名称（可选）",
    add: "添加",
    azureAddDeploymentsHint: "添加你的 Azure OpenAI 部署名称",
    manualAddHint: "自动发现失败时可手动添加模型 ID",
    searchDeploymentsPlaceholder: "搜索部署...",
    loadingModels: "正在加载模型...",
    errorLabel: "错误：",
    showingDeploymentsEnabledFirst: "显示 {{num}} 个部署（已启用优先）",
    showingModelsEnabledFirst: "显示 {{num}} 个模型（已启用优先）",
    showingModelsEnabledShownFirst: "显示 {{num}} 个模型（已启用的模型排在前面）",
    noModelsAvailable: "暂无可用模型",
    checkApiKeyHint: "请检查 API key 并尝试刷新",
    providerName: "服务商名称",
    providerNamePlaceholder: "服务商名称",
    icon: "图标",
    apiFormat: "API 格式",
    apiFormatHint: "选择服务商使用的 API 端点格式",
    useMaxCompletionTokens: "使用 max_completion_tokens",
    maxCompletionTokensHint: "为需要 max_completion_tokens 而非 max_tokens 的较新 OpenAI 模型（o1、o3 等）启用",
    customHeadersJson: "自定义 Header（JSON）",
    customHeadersHint: "随每个请求发送的可选 HTTP header（须为有效 JSON 格式）。",
    addModelsManuallyHint: "手动添加模型，或用获取按钮从 API 加载",
    fetchingModels: "正在获取模型...",
    pluginBadge: "插件",
    connected: "已连接",
    notConnected: "未连接",
    loggedOutSuccess: "已退出登录",
    logoutFailed: "退出登录失败",
    logout: "退出登录",
    authSuccess: "认证成功",
    authFailed: "认证失败",
    connecting: "连接中...",
    connect: "连接",
    connectedAccounts: "已连接账号（{{num}}）",
    quotasRefreshed: "配额已刷新",
    refreshQuotasFailed: "刷新配额失败",
    refreshQuotasTitle: "刷新配额",
    accountAdded: "账号添加成功",
    addAccountFailed: "添加账号失败",
    adding: "添加中...",
    addAccount: "添加账号",
    accountFallback: "账号 {{id}}",
    quotaDetails: "配额详情",
    rateLimited: "已限流",
    rateLimitResets: "（{{minutes}} 分钟后重置）",
    accountRemoved: "已移除账号",
    removeAccountFailed: "移除账号失败",
    cannotRemoveOnlyAccount: "不能移除唯一的账号。请用退出登录断开。",
    removeAccount: "移除账号",
    availableModels: "可用模型",
    noModelsConnectFirst: "暂无模型。请先连接以查看可用模型。",
    pluginIdLabel: "插件 ID：",
    authTypeLabel: "认证类型：",
    myCustomProviderPlaceholder: "我的自定义服务商",
    iconPickHint: "为该服务商选择品牌图标。自定义服务商带 * 标记。",
    cancel: "取消",
    addProvider: "添加服务商",
    myCustomAcpProviderPlaceholder: "我的自定义 ACP 服务商",
    argumentsOptional: "参数（可选）",
    note: "注意：",
    acpNote: "ACP 服务商会启动本地 CLI 进程。请确保命令已安装且在 PATH 中可用。创建后可再配置 MCP 服务器。",
    modelOptions: "模型选项",
    configureOptionsFor: "配置选项：",
    modelCapabilities: "模型能力",
    resetToDefault: "重置为默认",
    overrideCapabilitiesHint: "覆盖该模型自动检测的能力",
    reasoningLevels: "思考档位",
    reasoningLevelsHint: "勾选该模型 API 实际接受的档位，输入框的思考菜单只列出这些档位。",
    reasoningLevelsMapping: "未勾选的档位会这样发送：",
    imageOutput: "图片输出",
    toolCalling: "工具调用",
    autoSuffix: "（自动）",
    contextWindow: "上下文窗口",
    autoValue: "自动：{{value}}",
    maxOutputTokens: "最大输出 Token",
    pricing: "单价",
    pricingUnit: "美元 / 每百万 Token",
    pricing_input: "输入",
    pricing_output: "输出",
    pricing_cacheRead: "缓存读取",
    pricing_cacheWrite: "缓存写入",
    pricingUnknown: "未知",
    providerOptionsJson: "服务商选项（JSON）",
    exampleLabel: "示例：",
    disableReasoningExampleHint: "可为 doubao-seed-1.8 等模型关闭推理",
    perModelHeadersHint: "仅随该模型的请求发送——与服务商级自定义 Header 合并（同名以此处为准）。",
    extraBodyJson: "Extra Body（JSON）",
    extraBodyExampleBefore: "会合并进该模型的每个请求体。示例：",
    or: "或",
    extraBodyExampleAfter: "可关闭推理模型的 <think> 输出。",
    save: "保存",
    acpAuth: {
      googleAccount: "Google 账号",
      googleAccountDesc: "使用 Google 账号登录",
      geminiApiKey: "Gemini API Key",
      geminiApiKeyDesc: "需要 GEMINI_API_KEY 环境变量",
      chatgptLogin: "ChatGPT 登录",
      chatgptLoginDesc: "使用 ChatGPT 登录（需要付费订阅）",
      codexApiKey: "Codex API Key",
      codexApiKeyDesc: "需要 CODEX_API_KEY 环境变量",
      openaiApiKey: "OpenAI API Key",
      openaiApiKeyDesc: "需要 OPENAI_API_KEY 环境变量"
    },
    providerDescriptions: {
      openai: "OpenAI 模型，包括 GPT-5.2、o3 和 GPT-4o",
      anthropic: "Anthropic 的 Claude 模型",
      gemini: "Google Gemini AI 模型",
      deepseek: "具备推理能力的 DeepSeek AI 模型",
      moonshot: "支持长上下文的 Moonshot AI（Kimi）模型",
      zaiCodingPlan: "Z.AI（智谱）GLM 模型订阅计划——由 GLM-4.7 驱动",
      kimiCodingPlan: "Kimi For Coding——K2 模型的 Anthropic 兼容 API",
      opencodeGo: "OpenCode Go 订阅模型，自动路由 OpenAI/Anthropic 协议",
      openrouter: "通过 OpenRouter 统一 API 访问数百个 AI 模型",
      azure: "具备企业特性的 Microsoft Azure OpenAI 服务",
      copilot: "通过 GitHub Copilot 订阅使用 AI 模型（需要 OAuth）",
      claudeSubscription: "通过 Anthropic Pro/Max 订阅使用 Claude 模型（需要 OAuth）",
      claudeCodeAcp: "经 ACP 协议的 Claude Code agent——启动本地 Claude Code 进程",
      geminiAcp: "经 ACP 协议的 Gemini CLI agent——启动本地 Gemini 进程",
      antigravityAcp: "经 agy-acp ACP 适配器的 Antigravity CLI（agy）——个人 Google 账号下 Gemini CLI 的官方替代",
      codexAcp: "经 ACP 协议的 OpenAI Codex CLI agent——启动本地 Codex 进程",
      ollama: "用 Ollama 在本地运行开源大模型",
      cloudflareAiGateway: "通过 Cloudflare AI Gateway 代理 AI 服务商，获得缓存、限流与分析"
    }
  }
};
const main$1 = {
  configureProvider: "请至少配置一个 AI 提供商以开始聊天",
  heroTitle: "今天聊点什么？",
  heroSubtitle: "一个想法、半句话、一段粘贴——剩下交给 Alma。",
  inputPlaceholder: "随便说点什么…",
  send: "发送",
  suggestionsLoading: "正在读取你的近期活动…",
  connectToStartIOS: "连接你的 Mac——或配置一个 AI 提供商——即可开始聊天",
  openConnection: "设置连接"
};
const languageSwitcher$1 = {
  placeholder: "语言"
};
const speech$1 = {
  button: "语音输入",
  startRecording: "点击开始语音输入",
  stopRecording: "点击停止录音",
  processing: "正在处理语音...",
  modelNotDownloaded: "语音模型未下载，请前往 设置 > 语音 下载。",
  noAudioData: "未捕获到音频数据",
  microphoneDenied: "麦克风访问被拒绝，请在 系统设置 > 隐私与安全性 > 麦克风 中启用。",
  microphonePermissionRequired: "语音输入需要麦克风权限。"
};
const titlebar$1 = {
  minimize: "最小化",
  maximize: "最大化",
  close: "关闭"
};
const share$1 = {
  title: "分享对话",
  selectMessages: "已选择 {{selected}} / {{total}} 条消息",
  selectAll: "全选",
  deselectAll: "取消全选",
  user: "用户",
  assistant: "助手",
  includeHeader: "包含标题头",
  includeTimestamp: "包含时间戳",
  preview: "预览",
  previewHint: "滚轮缩放，拖拽平移",
  noMessagesSelected: "未选择消息",
  saveAsPng: "保存为 PNG",
  copyToClipboard: "复制到剪贴板",
  savedToFile: "图片保存成功",
  copiedToClipboard: "图片已复制到剪贴板",
  exportFailed: "导出图片失败",
  copyFailed: "复制图片失败",
  generatedBy: "由 Alma 生成"
};
const label$1 = {
  dialog: {
    addTitle: "添加标签",
    addDesc: "创建标签以整理你的对话",
    editTitle: "编辑标签",
    editDesc: "更新标签名称或颜色",
    name: "标签名称",
    namePlaceholder: "例如：工作、个人、研究",
    color: "标签颜色"
  }
};
const common$1 = {
  ok: "确定",
  cancel: "取消",
  save: "保存",
  "delete": "删除",
  confirmDelete: "再次点击确认删除",
  edit: "编辑",
  dragToReorder: "拖动排序",
  add: "添加",
  close: "关闭",
  back: "返回",
  next: "下一步",
  loading: "加载中...",
  error: "错误",
  success: "成功",
  unknown: "未知错误",
  failed: "失败",
  required: "必填",
  refresh: "刷新",
  created: "创建时间",
  updated: "更新时间",
  create: "创建",
  update: "更新",
  selectPreset: "选择预设...",
  enable: "启用",
  disable: "禁用",
  confirm: "确认",
  stop: "停止",
  copy: "复制",
  copied: "已复制",
  learnMore: "了解更多",
  optional: "可选",
  quote: "引用",
  toggleTheme: "切换主题",
  searchThreads: "搜索会话",
  clearAll: "全部清除",
  noData: "暂无数据",
  "continue": "继续",
  title: "标题",
  description: "描述",
  dragToResize: "拖动调整大小",
  previous: "上一个",
  search: "搜索",
  dismissNotification: "关闭通知",
  removeQuote: "移除引用",
  working: "工作中",
  dismiss: "关闭",
  clear: "清除",
  submit: "提交",
  input: "输入",
  saving: "保存中…",
  closeEsc: "关闭 (Esc)"
};
const phone$1 = {
  drawer: {
    pinned: "置顶",
    today: "今天",
    yesterday: "昨天",
    previous7Days: "过去 7 天",
    previous30Days: "过去 30 天",
    empty: "还没有对话",
    onThisPhone: "在这台设备上",
    localSub: "对话只保存在本机",
    noPeer: "未配对",
    viaRelay: "经中继，端到端加密",
    connectedToMac: "已连接到你的 Mac",
    connecting: "连接中…",
    offline: "离线",
    tapToReconnect: "点按重新连接",
    cantReach: "无法连接到你的 Mac",
    deleteTitle: "删除这个对话？"
  }
};
const sidebar$1 = {
  settingsWindowOpen: "设置窗口仍开着，点击切回",
  expand: "展开侧边栏",
  collapse: "收起侧边栏",
  unreadCompletion: "已完成 — 未读",
  toggle: "切换侧边栏",
  newChat: "新对话",
  settings: "设置",
  gallery: "图库",
  soundEffects: "声音效果",
  contextMenu: {
    rename: "重命名",
    copyId: "复制会话 ID",
    shareWithTeam: "分享给团队",
    stopSharingWithTeam: "停止分享给团队",
    sharedWithTeam: "已分享给团队",
    stoppedSharingWithTeam: "已停止分享给团队",
    favorite: "添加到收藏",
    unfavorite: "取消收藏",
    pinFavorite: "添加到项目卡片",
    unpinFavorite: "从项目卡片移除",
    incognito: "开启隐身模式",
    disableIncognito: "关闭隐身模式",
    selectMode: "选择模式",
    "delete": "删除"
  },
  pinned: {
    title: "置顶",
    empty: "右键对话并选择固定到侧边栏",
    pin: "固定到侧边栏",
    unpin: "取消侧边栏固定",
    replaceTitle: "选择要替换的置顶对话"
  },
  selectionMode: {
    selected: "已选择 {{count}} 项"
  },
  batchDeleteConfirm: {
    title: "删除所选对话",
    description: "确定要删除 {{count}} 个所选对话吗？此操作无法撤销。"
  },
  renameDialog: {
    title: "重命名对话",
    placeholder: "输入新标题",
    cancel: "取消",
    save: "保存"
  },
  deleteConfirm: {
    title: "删除对话",
    description: "确定要删除此对话吗？此操作无法撤销。"
  },
  gtd: {
    favorites: "收藏",
    status: "状态",
    labels: "标签",
    inbox: "收件箱",
    todo: "待办",
    inProgress: "进行中",
    done: "已完成",
    archived: "已归档",
    setStatus: "设置状态",
    setLabels: "设置标签",
    showMore: "显示更多 {{count}} 项",
    showLess: "收起",
    selectMode: "选择模式",
    selected: "已选择 {{count}} 项",
    selectAll: "全选",
    deselectAll: "取消全选",
    batchActions: "批量操作",
    moveToStatus: "更改状态",
    toggleLabel: "切换标签",
    deleteSelected: "删除所选",
    batchDeleteTitle: "删除所选对话",
    batchDeleteDesc: "确定要删除 {{count}} 个所选对话吗？此操作无法撤销。",
    addLabel: "添加标签",
    addLabelDesc: "创建新标签来组织你的对话。",
    labelName: "标签名称",
    labelNamePlaceholder: "输入标签名称",
    labelColor: "标签颜色",
    noLabelsHint: "点击或右键添加标签",
    renameLabel: "重命名标签",
    deleteLabel: "删除标签",
    editLabel: "编辑标签",
    editLabelDesc: "编辑标签名称和颜色。",
    deleteLabelTitle: "删除标签",
    deleteLabelDesc: "确定要删除此标签吗？带有此标签的对话不会被删除。",
    autoTagged: "Alma 标记为待办",
    summarize: "让 Alma 读一下这段对话",
    summarizeSelected: "让 Alma 读一下这些对话",
    summarizeQueued: "已排队，Alma 会在后台读"
  },
  project: {
    uncategorized: "未分类",
    working: "工作中...",
    showAll: "显示全部 · 还有 {{count}} 条",
    showRecent: "只看最近"
  },
  hideExternalChats: "隐藏外部对话",
  showExternalChats: "显示外部对话"
};
const windowControls$1 = {
  minimize: "最小化",
  maximize: "最大化",
  restore: "还原",
  close: "关闭",
  fullscreen: "进入全屏",
  exitFullscreen: "退出全屏"
};
const errors$1 = {
  failedToCreateThread: "创建对话失败",
  failedToLoadModels: "加载模型失败",
  failedToOpenSettings: "打开设置失败",
  failedToLoadProviders: "加载提供商失败",
  failedToDeleteProvider: "删除提供商失败",
  failedToToggleProvider: "切换提供商状态失败",
  failedToStopGeneration: "停止生成失败",
  generationError: "生成错误",
  chatError: "聊天错误",
  apiServerNotAvailable: "API 服务器不可用",
  networkError: "网络错误",
  streamingError: "流式传输错误",
  noResponseBody: "无响应内容",
  webSocketNotAvailable: "WebSocket 连接不可用",
  invalidSettingsFormat: "无效的设置文件格式"
};
const warnings$1 = {
  threadNotFound: "未找到对话"
};
const gallery$1 = {
  title: "图库",
  empty: "暂无图片",
  openGallery: "打开图库"
};
const capture$1 = {
  title: "截取窗口",
  background: "背景",
  padding: "边距",
  shadow: "阴影",
  privacy: "隐私",
  privacyHint: "对侧边栏会话标题打码",
  transparent: "透明",
  customImage: "自定义图片",
  customColor: "自定义颜色",
  changeImage: "更换图片…",
  retake: "重拍",
  copy: "复制",
  save: "保存…",
  copied: "已复制到剪贴板",
  saved: "已保存",
  reveal: "在 Finder 中显示",
  failed: "截图失败",
  panTool: "移动",
  redactTool: "区域打码",
  zoomIn: "放大",
  zoomOut: "缩小",
  zoomReset: "复位视图",
  regionHint: "点击虚线建议区域，或拖拽框选打码",
  regionSuggestion: "点击打码",
  regionRemove: "点击移除打码",
  undo: "撤销",
  redo: "重做",
  styleMosaic: "马赛克",
  styleBlur: "模糊",
  styleSolid: "纯色遮盖",
  solidColor: "遮盖颜色",
  sourceAuto: "识别区域",
  sourceAutoHint: "点击识别出的区域即可打码",
  sourceDraw: "手动划选",
  sourceDrawHint: "拖拽任意区域打码，识别区内也可以",
  regionHintDraw: "拖拽划选任意区域打码——识别块此时不抢指针"
};
const liveCoding$1 = {
  title: "现场编程",
  musicSnippet: "音乐片段",
  play: "播放",
  stop: "停止",
  openInEditor: "在编辑器中打开",
  shareToChat: "分享到聊天",
  bpm: "BPM",
  help: "帮助",
  ready: "就绪",
  initializing: "初始化中...",
  playing: "播放中...",
  helpTitle: "现场编程帮助",
  helpDescription: "Strudel 现场编程模式快速参考",
  keyboardShortcuts: "键盘快捷键",
  evaluateAndPlay: "执行并播放",
  basicPatterns: "基础模式",
  basicDrumPattern: "基础鼓点：底鼓、军鼓、踩镲、军鼓",
  melodicPattern: "带音符的旋律模式",
  repeatPattern: "每个周期重复4次",
  miniNotation: "迷你记谱法",
  groupElements: "分组元素",
  repeatN: "重复n次",
  slowN: "减慢n倍",
  rest: "休止/静音",
  alternate: "每个周期交替",
  random: "50%随机概率",
  effects: "效果器",
  lowPassFilter: "低通滤波器",
  highPassFilter: "高通滤波器",
  volume: "音量 (0-1)",
  decay: "衰减时间",
  pan: "立体声位置 (-1 到 1)",
  speed: "播放速度",
  transformations: "变换",
  speedUp: "加速n倍",
  slowDown: "减速n倍",
  reverse: "反转模式",
  sometimes: "50%概率应用",
  stack: "同时播放多个模式",
  examples: "示例",
  houseBeat: "浩室节拍：",
  synthMelody: "合成器旋律：",
  resources: "资源",
  strudelDocs: "完整文档请访问：https://strudel.cc/learn"
};
const onboarding$1 = {
  audioCheck: {
    title: "准备好开始体验了吗？",
    description: "这段体验包含背景音乐和视觉效果。您是否在一个可以外放声音的环境中，或者已经戴好耳机了？",
    withSound: "播放声音",
    muted: "静音继续"
  }
};
const updater$1 = {
  title: "软件更新",
  description: "发现新版本可用",
  badge: "更新",
  badgeRestart: "重启更新",
  skipVersion: "跳过此版本",
  updateAvailable: "有可用更新",
  currentVersion: "当前版本",
  latestVersion: "最新版本",
  changelog: "更新内容",
  downloading: "下载中...",
  downloadNow: "立即下载",
  incremental: "增量更新",
  downloadComplete: "下载完成！准备安装。",
  downloadFailed: "下载失败，请重试。",
  retry: "重试",
  restartNow: "立即重启",
  restarting: "正在重启…",
  restartConfirm: {
    title: "重启以应用更新？",
    description: "更新已下载完成。是否立即重启应用程序以应用更新？",
    restart: "立即重启",
    later: "稍后"
  }
};
const promptApps$1 = {
  title: "提示词应用",
  create: "新建应用",
  edit: "编辑提示词应用",
  "delete": "删除",
  manage: "管理提示词应用",
  run: "运行",
  empty: "暂无提示词应用",
  emptyHint: "创建一个提示词应用开始使用",
  deleteConfirm: "确定要删除此提示词应用吗？",
  editor: {
    icon: "图标",
    name: "名称",
    namePlaceholder: "我的提示词应用",
    description: "描述",
    descriptionPlaceholder: "简要描述此应用的功能",
    enabled: "启用",
    expectsImageResult: "期望图片结果",
    expectsImageResultHint: "如果结果不含图片，自动重试最多10次",
    incognito: "隐身模式",
    incognitoHint: "禁用此应用创建的对话的记忆功能",
    modelConfig: "模型配置",
    model: "模型",
    selectModel: "选择模型",
    useDefault: "使用默认模型",
    modelHint: "留空则运行此应用时使用默认模型。",
    tools: "工具",
    reasoning: "推理",
    noAdvancedFeatures: "此模型不支持工具或推理等高级功能。",
    template: "提示词模板",
    templatePlaceholder: "在此输入提示词模板。使用 {{placeholder_name}} 表示动态值。",
    templateHint: "使用 {{placeholder_name}} 语法添加动态占位符，用户可以在运行时填写。",
    placeholders: "占位符",
    addPlaceholder: "添加",
    noPlaceholders: "尚未配置占位符。添加一个使您的提示词更灵活。",
    shortcut: "全局快捷键",
    shortcutPlaceholder: "点击设置",
    shortcutHint: "设置全局快捷键以快速启动此应用。按 Backspace 清除。",
    fontSize: "字体大小",
    fontSizeDefault: "默认",
    fontSizeHint: "为此提示词应用窗口设置自定义字体大小。"
  },
  placeholder: {
    name: "变量名",
    type: "类型",
    label: "显示标签",
    placeholderText: "占位文本",
    required: "必填",
    options: "选项（每行一个）",
    min: "最小值",
    max: "最大值",
    accept: "接受类型（MIME）",
    multiple: "允许多选",
    defaultValue: "默认值",
    defaultChecked: "默认选中",
    text: "文本",
    textarea: "文本区域",
    select: "下拉选择",
    number: "数字",
    checkbox: "复选框",
    date: "日期",
    image: "图片",
    file: "文件"
  },
  runner: {
    generate: "生成",
    generating: "生成中...",
    regenerate: "重新生成",
    pleaseWait: "请稍候，AI 正在处理您的请求...",
    result: "结果",
    openThread: "打开",
    viewInChat: "在对话中查看 →",
    preview: "预览",
    emptyPreview: "填写上面的字段以查看预览",
    noPlaceholders: "此提示词应用没有输入字段。",
    selectOption: "选择一个选项",
    selectedFiles: "已选择",
    clickToUpload: "点击上传",
    orDragDrop: "或拖放文件",
    anyFile: "任意文件类型",
    addMore: "添加更多",
    pasteHint: "PNG, JPG, GIF, WebP • 支持从剪贴板粘贴",
    pasteToAdd: "从剪贴板粘贴以添加更多图片",
    clickToReplace: "点击图片以替换",
    retrying: "正在重试获取图片 ({{count}}/{{max}})...",
    maxRetriesReached: "达到最大重试次数后仍未生成图片"
  },
  history: {
    title: "历史记录",
    empty: "暂无执行历史",
    emptyHint: "运行此应用以创建历史记录",
    openChat: "打开对话",
    rerun: "使用这些值重新运行",
    deleteConfirm: "删除此执行记录？",
    attachments: "个附件",
    threadDeleted: "对话已删除",
    showPrompt: "显示生成的提示词"
  },
  enterTopic: "输入主题...",
  typeHere: "在此输入..."
};
const artifact$1 = {
  panel: {
    title: "预览"
  },
  viewMode: {
    preview: "预览",
    code: "代码"
  },
  actions: {
    copy: "复制到剪贴板",
    download: "下载文件",
    fullscreen: "全屏",
    exitFullscreen: "退出全屏"
  },
  types: {
    code: "代码",
    html: "HTML",
    react: "React 组件",
    markdown: "Markdown",
    mermaid: "Mermaid 图表",
    svg: "SVG 图像"
  }
};
const fileExplorer$1 = {
  contextMenu: {
    copy: "复制",
    cut: "剪切",
    paste: "粘贴",
    rename: "重命名",
    revealInFinder: "在访达中显示",
    revealInExplorer: "在资源管理器中显示",
    copyRelativePath: "复制相对路径",
    copyAbsolutePath: "复制绝对路径",
    newFolder: "新建文件夹",
    "delete": "删除",
    deleteConfirm: '确定要删除 "{{name}}" 吗？'
  },
  newFolderDialog: {
    title: "新建文件夹",
    placeholder: "输入文件夹名称",
    cancel: "取消",
    create: "创建"
  },
  renameDialog: {
    title: "重命名",
    placeholder: "输入新名称",
    cancel: "取消",
    save: "保存"
  },
  showHiddenFiles: "显示隐藏文件",
  hideHiddenFiles: "隐藏隐藏文件",
  filter: "筛选文件",
  filterPlaceholder: "按名称或路径筛选…",
  clearFilter: "清除筛选",
  noMatches: "没有匹配的文件",
  collapseAll: "折叠全部文件夹",
  expandAll: "展开全部文件夹",
  resultLimit: "仅显示前 {{count}} 个匹配项，请继续输入以缩小范围。"
};
const projectCard$1 = {
  brief: "这个项目是什么",
  briefPlaceholder: "一两句话——它的长期目的。",
  focus: "当前焦点",
  focusPlaceholder: "目前主要做到哪里。",
  resume: "从哪里继续",
  resumeEmpty: "还没有继续入口。选一个下次要回到的 Thread、消息或对象。",
  resumeSearchPlaceholder: "搜索 Thread/消息/对象，或粘贴 alma:// 链接…",
  addResume: "添加入口",
  starred: "已添加的 Thread",
  runConfig: "运行配置",
  residents: "常驻协作者",
  defaults: "默认运行",
  boundary: "边界（仅限使用）",
  templates: "完成约定",
  tools: "工具",
  models: "模型",
  agents: "Agent",
  configHint: "修改方式：alma project config set <id> --json '{…}'（用户终端）",
  pendingProposal: "Alma 提议了一次更新——确认或忽略（接受前你已确认的卡片不会变）",
  proposalWaiting: "Alma 对项目卡片有新建议",
  accept: "接受",
  dismiss: "忽略",
  proposalAccepted: "提议已应用",
  proposalDismissed: "提议已忽略",
  saved: "项目卡片已保存",
  invalidUri: "请输入 alma:// URI",
  uriCopied: "引用已复制——粘贴到消息中即可 @",
  close: "关闭",
  confirmSave: "确认并保存",
  open: "项目卡片",
  draftIntro: "新项目？卡片还是空的。",
  draftOpenConsult: "在咨询里让 Alma 起草",
  changeIcon: "更换图标",
  searchEmoji: "搜索 emoji",
  useLetterIcon: "改回首字母",
  fromApp: "从本机应用选择",
  fromWebsite: "使用网站图标",
  siteUrlPlaceholder: "网址，例如 github.com",
  siteHint: "输入网址后按回车，获取该网站的图标。",
  loadingSiteIcon: "正在获取图标…",
  noSiteIcon: "没有找到这个网站的图标，请检查网址后重试。",
  useSiteIcon: "使用这个图标",
  searchApps: "搜索应用",
  noApps: "没有找到应用",
  loadingApps: "正在读取应用…",
  backToEmoji: "返回 emoji",
  rename: "重命名（不改动文件夹本身）",
  drafting: "起草中…",
  drafted: "草稿已就绪——请在卡片的待确认提议中审阅",
  draftedFromConsult: "根据你的咨询起草",
  editConfig: "编辑运行配置",
  saveConfig: "保存配置",
  configSaved: "运行配置已保存",
  cancel: "取消",
  noConfig: "尚未设置默认值或边界。",
  noDefault: "（无）",
  defaultModel: "默认模型",
  defaultEffort: "默认推理强度",
  preferredSkills: "常用 Skill",
  boundaryEditor: "边界——仅允许以下项（留空=不限制）",
  boundaryEditorHint: "能力白名单，对本项目及其 Subagent 生效。不是文件沙箱——shell 仍可离开目录。",
  skillsLabel: "Skill",
  templateName: "名称",
  templateCondition: "完成条件（如：测试退出码 0 且 lint 干净）",
  addTemplate: "添加模板",
  picker: {
    search: "搜索…",
    empty: "没有匹配项",
    addCustom: "添加“{{value}}”",
    pickAgents: "选择常驻协作者…",
    pickSkills: "选择常用 Skill…",
    unrestricted: "不限制",
    clearAll: "清空"
  },
  consult: {
    title: "咨询",
    paneTitle: "咨询助手",
    paneSubtitle: "只解释和建议；起草的卡片要你接受后才会写入。",
    emptyIntro: "问它某一项该怎么填、边界是什么意思，或者要一段可以直接粘贴的措辞。助手能看到已保存的卡片、你尚未保存的草稿，以及这里所有可选项。",
    emptyIntroNew: "新项目？在下面说说这个文件夹是干什么的，然后点「起草卡片」，Alma 会结合这里的对话起草一份，接受之前不会写入。也可以先问它某一项该怎么填。",
    draft: "起草卡片",
    draftTitle: "把这段咨询（连同输入框里的话）整理成卡片草稿；草稿作为待确认提议出现，接受之前不会写入。",
    starter1: "「这个项目是什么」和「当前焦点」该怎么写？",
    starter2: "这个项目应该限制哪些工具和模型？",
    starter3: "我的草稿和已保存的卡片有什么不同？",
    placeholder: "问问卡片怎么填…",
    send: "发送",
    thinking: "思考中…",
    seesDraft: "看得到你未保存的草稿",
    seesSaved: "看到的是已保存的卡片",
    compacted: "较早的 {{count}} 条对话已压缩为摘要",
    showSummary: "查看摘要",
    hideSummary: "收起摘要",
    clear: "清空对话",
    clearConfirmTitle: "清空这次咨询？",
    clearConfirmBody: "会删除这个项目与咨询助手的全部对话及其摘要，卡片本身不受影响。",
    cleared: "咨询已清空",
    close: "关闭咨询助手",
    savedIn: "记录保存在项目文件夹里"
  }
};
const workspace$1 = {
  title: "项目",
  selectWorkspace: "选择项目",
  selectDirectory: "选择目录...",
  remote: {
    selectRemoteFolder: "远程文件夹...",
    disconnected: "远程主机连接已断开",
    reconnect: "重连",
    reconnecting: "重连中...",
    pickerTitle: "远程项目",
    pickerDescription: "先选择一台 SSH 主机，再选择其上的项目文件夹。~/.ssh/config 里的主机开箱即用。",
    browseDescription: "选择这台主机上的项目文件夹。",
    fromSshConfig: "来自 ~/.ssh/config",
    noHosts: "还没有 SSH 主机，在下方以 user@host 形式添加。",
    addHost: "手动添加主机...",
    connect: "连接",
    emptyDirectory: "没有子目录",
    useThisFolder: "使用此文件夹",
    hostsTitle: "远程主机",
    hostsDescription: "远程项目使用的 SSH 主机。认证使用你的 ssh 密钥和 ~/.ssh/config。",
    test: "测试",
    testing: "测试中...",
    connected: "已连接",
    connectionFailed: "连接失败",
    notChecked: "未检测",
    deleteHostConfirm: "移除这台主机？",
    deleteHostHasProjects: "这台主机上仍有项目，无法移除。",
    projectCount: "{{count}} 个项目"
  },
  temporary: "临时",
  locked: "项目已锁定",
  recent: "最近使用",
  info: "所有工具操作将使用此目录作为工作目录",
  addWorkspace: "添加项目",
  showTemporary: "显示临时目录",
  showInList: "显示在列表中",
  openInFinder: "在访达中打开",
  openInExplorer: "在资源管理器中打开",
  deleteConfirm: "确定要删除此项目吗？项目里的对话不会被删除，会随项目一起隐藏；以后再把这个文件夹添加为项目，对话会一起恢复。项目文件夹也不会动。",
  deleteFailed: "删除项目失败",
  deleteKeepThreads: {
    menu: "删除项目…",
    title: "删除项目「{{name}}」？",
    description: "只会从 Alma 中移除这个项目，项目文件夹不会被删除。",
    descriptionWithThreads: "只会从 Alma 中移除这个项目：其中 {{count}} 个对话会保留，但随项目一起隐藏；以后再把这个文件夹添加为项目，对话会一起恢复。项目文件夹也不会被删除。",
    confirm: "删除项目"
  },
  deleteDefaultForbidden: "默认项目无法删除。",
  noWorkspaces: "暂无项目",
  searchProjects: "搜索项目...",
  searchNoResults: "没有匹配的项目",
  noWorkspace: "不选择项目",
  noWorkspaceDescription: "工具将使用临时目录",
  auto: "自动",
  autoDescription: "自动创建临时目录",
  cannotChange: "发送消息后无法更改项目",
  artifacts: {
    title: "Artifacts 模式",
    description: "使用专用目录存放 Artifact 文件",
    enabled: "已启用 Artifacts 模式"
  },
  defaultWorkspace: "默认项目",
  listDescription: "Agent 工作所在的文件夹。新对话会使用标星的项目；没有标星时，每个对话使用一个临时目录。",
  defaultWorkspaceDescription: "新对话将自动使用此目录，而不是创建临时目录",
  setAsDefault: "设为默认",
  clearDefault: "取消默认",
  isDefault: "默认",
  noDefault: "无（使用临时目录）",
  autoWorktree: "自动工作树",
  autoWorktreeDescription: "为每个新对话自动创建 git 工作树",
  outputs: {
    label: "产物",
    tooltip: "打开此会话的产物目录"
  },
  worktree: {
    title: "Git 工作树",
    description: "在独立的 git 工作树中进行此对话",
    needsProject: "选择项目后可开启",
    badge: "工作树"
  },
  pins: {
    buttonTitle: "置顶引用",
    title: "置顶引用 — {{name}}",
    description: "本项目所有对话始终携带的对象（Plan、规则、Agent、目录……）。只能在这里或 `alma workspace pin` 设置——对话只能继承，不能修改。",
    empty: "还没有置顶对象，在下方搜索并添加。",
    searchPlaceholder: "搜索要置顶的对象（技能、Agent、文件、主机……）",
    saving: "保存中…"
  }
};
const github$1 = {
  notInstalled: "GitHub CLI 未安装",
  notAuthenticated: "GitHub CLI 未认证",
  install: "安装",
  runAuthLogin: "运行: gh auth login",
  pr: {
    title: "Pull Request",
    noPr: "暂无 Pull Request",
    create: "创建 PR",
    createTitle: "创建 Pull Request",
    createDescription: "为分支创建 Pull Request",
    titleLabel: "标题",
    titlePlaceholder: "Pull Request 标题",
    bodyLabel: "描述",
    bodyPlaceholder: "描述你的更改...",
    draft: "创建为草稿",
    creating: "创建中...",
    titleRequired: "标题为必填项",
    open: "开放",
    merged: "已合并",
    closed: "已关闭",
    changes: "变更",
    files: "文件",
    status: "状态",
    mergeable: "可合并",
    conflicting: "存在冲突",
    unknown: "未知",
    checks: "检查",
    review: "审核",
    update: "更新",
    merge: "合并",
    close: "关闭",
    merging: "合并中...",
    closing: "关闭中..."
  },
  postMerge: {
    title: "PR 已合并",
    description: "你的 Pull Request 已成功合并。你想如何处理这个工作树？",
    keep: "保留工作树",
    keepDescription: "继续在此工作树中工作",
    "delete": "删除工作树",
    deleteDescription: "删除工作树和分支",
    archive: "删除并归档对话",
    archiveDescription: "删除工作树并归档相关对话",
    decideLater: "稍后决定"
  },
  conflicts: {
    title: "冲突",
    noConflicts: "没有需要解决的冲突",
    resolveAll: "AI 解决全部",
    resolving: "解决中...",
    resolved: "已解决",
    resolution: "解决方案",
    "continue": "继续 Rebase",
    abort: "中止 Rebase",
    confidence: {
      high: "高置信度",
      medium: "中等置信度",
      low: "低置信度"
    }
  }
};
const taskTool$1 = {
  pending: "等待中",
  running: "运行中",
  completed: "已完成",
  error: "错误",
  denied: "已拒绝",
  approvalRequested: "等待审批",
  approvalResponded: "已审批",
  streaming: "流式传输中",
  result: "结果",
  errorLabel: "错误",
  tool: "工具",
  tools: "工具"
};
const hooks$1 = {
  events: {
    "chat.message.willSend": "消息发送前",
    "chat.message.didReceive": "消息接收后",
    "chat.system.transform": "系统提示词转换",
    "chat.params.transform": "聊天参数转换",
    "tool.willExecute": "工具执行前",
    "tool.didExecute": "工具执行后",
    "tool.onError": "工具出错时",
    "thread.created": "会话创建时",
    "thread.deleted": "会话删除时",
    "thread.activated": "会话激活时",
    "app.ready": "应用就绪时",
    "app.willQuit": "应用退出前"
  },
  discard: "放弃",
  save: "保存",
  matchHints: {
    messageContent: "消息内容",
    toolName: "工具名称"
  }
};
const modelCapabilities = {
  vision: "视觉",
  image: "图像",
  tools: "工具",
  reasoning: "推理",
  embedding: "嵌入"
};
const providerStatus$1 = {
  notConfigured: "未配置",
  active: "已激活",
  disabled: "已禁用",
  inactive: "未激活"
};
const askUserQuestion$1 = {
  previous: "上一题",
  next: "下一题",
  submit: "提交",
  customPlaceholder: "输入自定义答案...",
  fallbackTitle: "需要你的输入",
  sidebarWaiting: "等待你的回答",
  waiting: "等待你的回答…",
  yourAnswer: "你的选择",
  dismissed: "已取消",
  goToQuestion: "跳转到第 {{index}} 题"
};
const commandPalette$1 = {
  openBeside: "在侧边分屏打开",
  removeRecent: "从历史中移除",
  placeholder: "搜索对话、文件、设置、操作...",
  searching: "搜索中...",
  noResults: "没有找到结果。",
  group: {
    quickActions: "快捷操作",
    settings: "设置页面",
    allSettings: "所有设置",
    threads: "对话",
    recent: "最近搜索",
    projectFiles: "项目文件",
    projectFilesIn: "{{name}} 中的文件",
    actions: "操作"
  },
  hint: {
    openBeside: "侧边分屏打开",
    navigate: "导航",
    select: "选择",
    close: "关闭"
  },
  settings: {
    tts: "文字转语音",
    people: "联系人",
    chromeRelay: "Chrome Relay"
  },
  toggle: {
    theme: "主题",
    streamResponse: "流式响应",
    showTokenUsage: "显示 Token 用量",
    enableMarkdown: "Markdown 渲染",
    infographic: "信息图可视化",
    soundEffects: "音效",
    memory: "记忆",
    lineNumbers: "显示行号",
    wordWrap: "自动换行",
    systemCaret: "系统光标",
    whisper: "语音输入",
    debugMode: "调试模式"
  },
  theme: {
    light: "浅色",
    dark: "深色",
    system: "跟随系统"
  },
  deep: {
    toolModel: "工具模型",
    codingAgent: "编码代理",
    language: "语言",
    appIcon: "应用图标",
    startup: "启动行为",
    window: "窗口与托盘行为",
    quickChat: "快捷聊天",
    permissions: "权限与自动批准",
    temperature: "温度参数",
    maxTokens: "最大 Token 数",
    streaming: "流式响应",
    tokenUsage: "Token 用量显示",
    markdown: "Markdown 渲染",
    singleDollarMath: "单美元符号数学公式",
    infographic: "信息图可视化",
    autoSuggestions: "自动建议",
    toolSelection: "默认工具选择",
    skillSelection: "默认技能选择",
    soundEffects: "音效与预设",
    autoCompact: "自动上下文压缩",
    hashlineEdit: "Hashline 编辑模式",
    uiTheme: "主题外观",
    font: "字体与字号",
    density: "界面密度",
    sidebarWidth: "侧边栏宽度",
    sidebarMode: "侧边栏模式",
    lineNumbers: "显示行号",
    uiWordWrap: "自动换行",
    minimap: "显示缩略图",
    systemCaret: "系统光标",
    toolCardExpand: "工具卡片默认展开",
    terminalFont: "终端字体",
    persistTerminals: "保持终端会话",
    terminalCursorBlink: "终端光标闪烁",
    proxy: "代理设置",
    timeout: "请求超时与重试",
    memoryConfig: "记忆配置",
    shortcuts: "快捷键",
    whisperModel: "语音模型与语言",
    ttsProvider: "TTS 提供商与语音",
    searchEngine: "搜索引擎",
    backup: "数据备份与恢复",
    cloudSync: "云端同步",
    darkTheme: "深色模式主题",
    lightTheme: "浅色模式主题"
  },
  action: {
    checkUpdates: "检查更新"
  }
};
const toolGroupSummary$1 = {
  count: "{{count}} 个工具调用",
  compose: "{{verb}} {{object}}",
  running: "正在{{text}}",
  fallback: "继续处理任务",
  waiting: "等待确认：{{object}}",
  waitingPlan: "等待确认执行计划",
  waitingAnswer: "等待你的回答",
  categoryCount: "{{count}} 类操作",
  multiStage: "{{verb1}}、{{verb2}}：{{topic}}",
  action: {
    read: "读取",
    write: "写入",
    edit: "修改",
    "delete": "删除",
    list: "查看文件列表",
    searchFile: "搜索文件",
    searchContent: "搜索代码",
    lints: "检查诊断",
    command: "运行命令",
    webSearch: "搜索资料",
    webFetch: "读取网页",
    codebaseSearch: "检索代码库",
    todo: "整理任务计划",
    exitPlan: "等待确认执行计划",
    subtask: "调用子任务",
    skill: "加载技能",
    userQuestion: "等待你的回答",
    imageGen: "生成图片",
    mcpCall: "调用 MCP",
    run: "执行操作"
  },
  noObject: {
    read: "查看相关文件",
    write: "写入文件",
    edit: "修改文件",
    "delete": "删除文件",
    list: "查看文件列表",
    searchFile: "搜索相关文件",
    searchContent: "搜索相关代码",
    lints: "检查代码诊断",
    command: "运行命令",
    webSearch: "搜索网络资料",
    webFetch: "读取网页内容",
    codebaseSearch: "检索代码库",
    todo: "整理任务计划",
    exitPlan: "等待确认执行计划",
    subtask: "调用子任务",
    skill: "加载技能",
    userQuestion: "等待你的回答",
    imageGen: "生成图片",
    mcpCall: "调用 MCP 工具",
    unknown: "执行其他操作"
  },
  group: {
    read: "查看 {{topic}}",
    search: "定位{{topic}}相关代码",
    research: "收集{{topic}}资料",
    modify: "修改{{topic}}",
    command: "运行 {{topic}}",
    diagnostics: "检查 {{topic}}",
    plan: "整理 {{topic}} 计划",
    collab: "协作处理{{topic}}",
    external: "获取 {{topic}}",
    other: "处理{{topic}}"
  },
  groupNoTopic: {
    read: "查看相关文件",
    search: "搜索相关代码",
    research: "收集资料",
    modify: "修改文件",
    command: "运行命令",
    diagnostics: "检查诊断",
    plan: "整理计划",
    collab: "协作分派",
    external: "调用外部服务",
    other: "处理多个步骤"
  },
  groupVerb: {
    read: "查看文件",
    search: "定位代码",
    research: "收集资料",
    modify: "修改",
    command: "运行校验",
    diagnostics: "检查诊断",
    plan: "整理计划",
    collab: "协作分派",
    external: "调用服务",
    other: "处理"
  }
};
const minesweeper$1 = {
  title: "扫雷",
  bestTimesMenu: "最佳成绩...",
  bestTimes: "最佳成绩",
  levels: {
    beginner: "初级",
    intermediate: "中级",
    expert: "高级"
  },
  seconds_other: "{{count}} 秒",
  resetScores: "重置成绩",
  congratulations: "恭喜",
  fastestTime: "你创造了{{level}}的最快纪录。",
  enterName: "请输入你的名字："
};
const activity$1 = {
  verb: {
    read: "读取",
    globbed: "匹配",
    searched: "搜索",
    searchedWeb: "搜索网页",
    fetched: "抓取",
    edited: "编辑",
    wrote: "写入",
    ran: "执行",
    checked: "查看",
    killed: "终止",
    usedSkill: "使用技能",
    updated: "更新"
  },
  object: {
    shellOutput: "shell 输出",
    task: "任务 {{id}}",
    shell: "shell",
    codeScript: "代码脚本",
    todos: "待办事项"
  },
  phase: {
    thinking: "思考中",
    thought: "已思考",
    thoughtFor: "{{seconds}} 秒",
    exploring: "探索中",
    explored: "已探索",
    making: "修改中",
    made: "已修改",
    running: "执行中",
    ran: "已执行",
    using: "使用中",
    used: "已使用",
    working: "进行中",
    worked: "已完成",
    files_other: "{{count}} 个文件",
    places_other: "{{count}} 处",
    creates_other: "新建 {{count}}",
    edits_other: "编辑 {{count}}",
    commands_other: "{{count}} 条命令",
    steps_other: "{{count}} 步"
  },
  toolsUsed_other: "用了 {{count}} 个工具",
  timelineView: "时间线视图",
  collapse: "收起活动",
  expand: "展开活动",
  taskFallback: "任务",
  focus: {
    workingFor: "已工作 {{seconds}} 秒",
    working: "工作中",
    showSteps: "展开步骤",
    hideSteps: "收起步骤",
    hideComposer: "隐藏输入框",
    showComposer: "显示输入框"
  }
};
const infographic$1 = {
  zoomIn: "放大",
  zoomOut: "缩小",
  resetZoom: "重置缩放",
  downloadSvg: "下载 SVG",
  viewFullscreen: "全屏查看",
  resetView: "重置视图",
  expandDiagram: "展开图表",
  copySourceCode: "复制源代码",
  copyAsPng: "复制为 PNG"
};
const branchNav$1 = {
  previous: "上一个分支",
  next: "下一个分支"
};
const toolBlock$1 = {
  output: "输出",
  command: "命令",
  "arguments": "参数",
  noArguments: "无参数",
  expandArguments: "展开查看参数",
  changes: "变更",
  content: "内容",
  result: "结果",
  noOutput: "无输出",
  fileChanges: "文件变更"
};
const threadResources$1 = {
  outputs: "产出",
  sources: "来源"
};
const toolRuns$1 = {
  title: "工具运行"
};
const goalLoop$1 = {
  repeatSchedule: "按计划重复",
  untilCondition: "持续工作直到满足条件",
  keepWorking: "让此会话持续工作",
  appliesToNextChat: "这里还没有会话——设定的目标会在你发出第一条消息、会话建立时自动生效。",
  pendingGoal: "待生效目标：{{text}}",
  pendingLoop: "待生效循环：{{text}}",
  pendingTitle: "已设定，将在新会话建立时生效：{{text}}"
};
const webPreview$1 = {
  noConsoleOutput: "无控制台输出",
  enterUrl: "输入 URL...",
  preview: "预览"
};
const a11yRequest$1 = {
  title: "启用 {{appName}} 实时上下文",
  subtitle: "QuickChat 可以就你正在查看的任何内容答疑——代码、文档、报错、网页。读取当前聚焦窗口需要「辅助功能」权限。",
  permissionName: "辅助功能",
  permissionDesc: "允许 {{appName}} 读取聚焦窗口的文本内容。",
  done: "已完成",
  opening: "正在打开…",
  allow: "允许",
  allSet: "设置完成。",
  completeInSettings: "请在「系统设置」中完成授权。",
  close: "关闭",
  maybeLater: "稍后再说"
};
const artifactsUi$1 = {
  railPin: "固定工具栏",
  dockPin: "固定在这个对话里",
  dockUnpin: "取消固定",
  railUnpin: "自动隐藏工具栏",
  railShow: "显示工具栏",
  showExplorer: "显示文件树",
  locateInExplorer: "在文件树中定位",
  openInBuiltInBrowser: "在内置浏览器中打开",
  closeFile: "关闭文件",
  explorer: "文件树",
  noContent: "暂无内容",
  noFileSelected: "未选择文件",
  sheetEmpty: "此工作表为空",
  previewUnavailable: "无法预览",
  noConflicts: "没有需要解决的冲突",
  createPR: "创建 Pull Request",
  local: "本地",
  remote: "远程",
  noUncommitted: "没有未提交的变更",
  failedCommitDetails: "加载提交详情失败",
  stageToCommit: "暂存变更以提交",
  failedDiff: "加载差异失败",
  noChanges: "无变更",
  noCommits: "暂无提交",
  ghNotAuthed: "GitHub CLI 未登录",
  stashes: "贮藏",
  noStashes: "暂无贮藏",
  continueWorktree: "继续在此 worktree 中工作",
  deleteArchiveThread: "删除并归档会话",
  deleteWorktree: "删除 worktree",
  keepWorktree: "保留 worktree",
  failedFileChanges: "加载文件变更失败",
  aiFilesHint: "AI 修改的文件会显示在这里",
  noFileChanges: "无文件变更",
  noThreadSelected: "未选择会话",
  previewStartFailed: "预览服务器启动失败",
  noHtmlFiles: "未找到 HTML 文件",
  readyToBrowse: "随时可以浏览",
  reuseBrowserLogin: "复用浏览器登录态",
  noActiveTerminal: "没有活动的终端",
  tabFiles: "文件",
  tabChanges: "变更",
  tabCommit: "提交",
  tabTerminal: "终端",
  tabBrowser: "浏览器",
  tabTools: "工具",
  moreTabs: "更多标签页",
  preparingWorkspace: "正在准备工作区…",
  selectFileToPreview: "选择要预览的文件",
  writing: "写入中...",
  noFilesYet: "暂无文件。AI 会在这里创建文件。",
  fileIsLarge: "文件较大",
  largeFileHint: "内联预览可能导致应用卡死。建议用编辑器打开，或仅预览开头部分。",
  previewAnyway: "仍然预览",
  preview: "预览",
  code: "代码",
  truncatedNotice: "文件较大——仅显示前 {{shown}}。",
  truncatedNoticeOfTotal: "文件较大——仅显示前 {{shown}}（共 {{total}}）。",
  failedLoadSpreadsheet: "加载电子表格失败",
  fileTypeNotSupported: "不支持 .{{extension}} 文件类型",
  itemsCount: "{{n}} 项",
  fileTooLargePreview: "文件过大，无法预览（{{size}}）",
  binaryFileInArchive: "二进制文件（{{type}}）——压缩包内不支持预览",
  failedLoadArchive: "加载压缩包失败",
  filesCount: "{{n}} 个文件",
  foldersCount: "{{n}} 个文件夹",
  totalSize: "总计：{{size}}",
  loadingConflicts: "正在加载冲突...",
  conflictsCount: "{{n}} 个冲突",
  resolveAllWithAI: "用 AI 解决全部",
  resolvingProgress: "正在解决第 {{current}}/{{total}} 个...",
  abortRebase: "中止 Rebase",
  continueRebase: "继续 Rebase",
  resolutionLabel: "解决方案：",
  clickWandToResolve: "点击魔杖图标用 AI 解决此冲突",
  titleRequired: "标题为必填项",
  failedCreatePR: "创建 PR 失败",
  createPRForBranch: "为分支创建 Pull Request",
  prTitlePlaceholder: "Pull Request 标题",
  prBodyPlaceholder: "描述你的变更...",
  createAsDraft: "创建为草稿",
  createPRShort: "创建 PR",
  noBranch: "无分支",
  newBranchPlaceholder: "新分支名称...",
  fetch: "Fetch",
  pull: "Pull",
  noUpstream: "未设置上游分支",
  push: "Push",
  pushSetUpstream: "Push 并设置上游",
  unselectAll: "取消全选",
  selectAll: "全选",
  unselectAllFiles: "取消全选 {{n}} 个文件",
  selectAllFiles: "全选 {{n}} 个文件",
  conflicts: "冲突",
  stagedChanges: "已暂存变更",
  changes: "变更",
  loadingCommitDetails: "正在加载提交详情...",
  filesChanged: "{{n}} 个文件变更",
  insertions: "{{n}} 行新增(+)",
  deletions: "{{n}} 行删除(-)",
  failedCreateCommit: "创建提交失败",
  failedGenerateCommitMessage: "生成提交信息失败",
  commitMessagePlaceholder: "提交信息...",
  generateCommitMessage: "用 AI 生成提交信息",
  committing: "提交中...",
  commit: "提交",
  loadingDiff: "正在加载差异...",
  stagedTag: "（已暂存）",
  unstagedTag: "（未暂存）",
  loadingHistory: "正在加载历史...",
  loadMore: "加载更多",
  ghNotInstalled: "未安装 GitHub CLI",
  install: "安装",
  stashChanges: "贮藏变更",
  stashMessagePlaceholder: "贮藏说明（可选）",
  stashing: "贮藏中...",
  loadingStashes: "正在加载贮藏...",
  popStash: "弹出贮藏",
  dropStash: "删除贮藏",
  failedProcess: "处理失败",
  prMerged: "PR #{{number}} 已合并",
  prMergedDesc: "你的 Pull Request 已成功合并。要如何处理这个 worktree？",
  removeWorktreeAndBranch: "删除 worktree 和分支",
  removeWorktreeArchiveDesc: "删除 worktree 并归档相关会话",
  decideLater: "稍后决定",
  linesCount: "{{n}} 行",
  selectConversationHint: "选择一个会话以查看文件变更",
  loadingFileChanges: "正在加载文件变更...",
  retry: "重试",
  changesCount: "{{n}} 处变更",
  writesCount: "{{n}} 次写入",
  editsCount: "{{n}} 次编辑",
  importedCookies: "已从 {{app}} 导入 {{n}} 个 cookie",
  importedCookiesDesc: "正在重新加载预览以使登录态生效。",
  importProfileFailed: "无法导入浏览器配置文件",
  browserDesktopOnly: "内置浏览器只能在 Alma 桌面版里使用。",
  openInNewTab: "在新标签页打开 {{url}}",
  openedByAgent: "由 agent 打开",
  closeTab: "关闭标签页",
  pinTab: "固定标签页",
  unpinTab: "取消固定",
  newTab: "新标签页",
  runDevServer: "运行开发服务器",
  searchHtmlFiles: "搜索 HTML 文件...",
  selectEntryFile: "选择入口文件",
  installing: "安装中...",
  starting: "启动中...",
  goBack: "后退",
  goForward: "前进",
  inspectActiveHint: "点击元素描述改动，然后发送（Esc 取消）",
  inspectHint: "选择元素用 AI 编辑",
  reuseBrowserLoginTitle: "复用浏览器登录态（从 Chrome、Edge、Brave 等导入 cookie）",
  reuseBrowserLoginDesc: "从浏览器配置文件导入 cookie，让预览直接处于已登录状态。macOS 首次可能会请求钥匙串权限。",
  envSectionTitle: "环境",
  envSectionDesc: "每个环境有独立的登录状态，同一个网站可以同时登录不同账号。",
  envDefault: "默认",
  envNew: "新建环境",
  envNewEllipsis: "新建环境…",
  envEdit: "编辑",
  envDelete: "删除环境",
  envNewTitle: "新建环境",
  envEditTitle: "编辑环境",
  envDialogDesc: "这个环境里的标签页有独立的 Cookie 和存储，与其他环境互不影响。",
  envNamePlaceholder: "例如：工作、个人、测试账号",
  envNameTaken: "已存在同名环境。",
  envColor: "颜色",
  envCreate: "创建",
  envOpenIn: "在环境中打开",
  envSwitchTo: "切换环境",
  envDeleteTitle: "删除“{{name}}”？",
  envDeleteDesc: "它的标签页会被关闭，保存的所有数据（登录状态、Cookie、网站数据）都会被清除，无法恢复。",
  envClearFailed: "无法清除该环境的数据",
  envImportInto: "导入到 {{name}}",
  findingProfiles: "正在查找浏览器配置文件…",
  noProfilesFound: "未找到基于 Chromium 的浏览器配置文件。",
  closePip: "关闭悬浮画中画镜像",
  openPip: "画中画——将此浏览器标签页悬浮置顶，随处可见",
  addressPlaceholder: "搜索或输入 URL",
  openInBrowser: "在浏览器中打开",
  unknownError: "发生未知错误",
  sendErrorToAI: "把错误发给 AI 诊断修复",
  fixWithAI: "用 AI 修复",
  noErrorOutput: "未捕获到错误输出。",
  installingDeps: "正在安装依赖...",
  startingServer: "正在启动服务器...",
  preparingInstall: "正在准备安装...",
  initializing: "初始化中...",
  readyToBrowseHint: "在地址栏输入 URL 浏览，或运行此项目的开发服务器",
  executionFailed: "执行失败",
  run: "运行",
  terminalExited: "终端进程已退出。",
  closeTerminal: "关闭终端",
  newTerminal: "新建终端",
  connected: "已连接",
  connecting: "连接中...",
  disconnected: "已断开",
  restart: "重启",
  createTerminal: "创建终端",
  discardChanges: "丢弃变更",
  failedGetCILogs: "获取 CI 日志失败",
  failedMergePR: "合并 PR 失败",
  failedUpdateFromMain: "从 main 更新失败",
  canBeMerged: "可以合并",
  hasConflicts: "存在冲突",
  unknownStatus: "未知",
  noWorkspaceSelected: "未选择工作区",
  loadingGitStatus: "正在加载 git 状态...",
  failedLoadGitStatus: "加载 git 状态失败",
  notGitRepo: "不是 git 仓库",
  initializeRepository: "初始化仓库",
  loadingPRStatus: "正在加载 PR 状态...",
  noPullRequest: "暂无 Pull Request",
  draftBadge: "草稿",
  statusLabel: "状态",
  checksLabel: "检查",
  fix: "修复",
  reviewLabel: "评审",
  commitAndPush: "提交并推送",
  merge: "合并",
  focusMode: "专注模式（预览占满，输入框悬浮）",
  exitFocusMode: "退出专注模式（Esc）",
  edit: "编辑",
  editFile: "编辑此文件（Cmd/Ctrl+S 保存）",
  save: "保存",
  editNotSupportedHere: "该文件不在工作区内，无法在此保存",
  externalFile: "外部文件",
  externalFileHint: "该文件在项目目录之外。Agent 可以读取和修改它，但它不属于本项目：不会出现在 @文件 中，也不能在这里编辑。",
  missingFileTitle: "文件已被移动或删除",
  missingFileHint: "这个路径下已经没有它了。如果是被移动了，请在文件树里重新打开。",
  missingFileShowFiles: "显示文件树"
};
const quickChat$1 = {
  selectModel: "选择模型...",
  expandToMain: "展开到主窗口",
  newChat: "新对话",
  scrollToBottom: "滚动到底部"
};
const references$1 = {
  kinds: {
    file: "文件",
    project: "项目",
    host: "主机",
    agent: "Agent",
    skill: "技能",
    prompt: "提示词",
    thread: "会话",
    message: "消息",
    snippet: "片段",
    mission: "任务",
    plan: "计划",
    mcp: "MCP 服务",
    model: "模型",
    memory: "记忆",
    artifact: "制品",
    tool: "工具调用",
    task: "子任务",
    provider: "服务商",
    cron: "定时任务",
    module: "模块",
    mail: "邮件",
    rearview: "倒后镜",
    crystal: "结晶",
    bundle: "记录束",
    scratch: "临时参考"
  },
  picker: {
    title: "引用任意对象",
    searching: "搜索中…",
    empty: "没有匹配项 — 换个词，或用 kind: 前缀限定类型",
    filterHint: "筛选：",
    types: "类型",
    unknownType: "没有「{{name}}」这个引用类型 — 从下面选一个",
    pickType: "选择一个类型",
    viewAll: "查看全部{{kind}} →",
    back: "返回全部类型",
    favorites: "收藏"
  },
  chip: {
    copied: "引用已复制",
    missing: "已不存在",
    expired: "参考已过期",
    loading: "加载中…",
    backlinks_one: "被 {{count}} 条消息提及",
    backlinks_other: "被 {{count}} 条消息提及",
    noBacklinks: "还没有聊天消息提及它",
    open: "打开",
    insert: "引用",
    copy: "复制",
    thisThread: "当前会话",
    related: "关联"
  },
  actions: {
    referenceMessage: "引用这条消息",
    referenceSelection: "引用选中内容",
    quoteSelection: "引用选中内容",
    referenceFile: "在对话中引用",
    snippetCaptured: "已保存为片段引用"
  },
  link: {
    action: "关联",
    title: "从「{{title}}」关联到…",
    searchPlaceholder: "搜索要关联的对象…",
    linked: "已关联到 {{title}}",
    remove: "移除关联"
  },
  scope: {
    thread: "当前会话",
    project: "当前项目",
    global: "全局"
  },
  messageRefs: {
    menuItem: "引用关系",
    title: "引用这条消息的关系",
    empty: "还没有任何引用关系",
    mentionedBy: "被以下消息提及"
  },
  timeline: {
    select: "选择此回合",
    deselect: "取消选择",
    createSnippet: "创建片段（{{count}}）",
    clear: "清除选择",
    createBundle: "组成记录束"
  },
  snippetDialog: {
    title: "从 {{count}} 个回合创建片段",
    nameLabel: "名称",
    namePlaceholder: "留空由 AI 自动命名",
    aiSummary: "同时生成 AI 摘要（不替代原始内容）",
    hint: "片段会保留所选原始对话与工具调用，并自动建立到来源消息的反向链接。之后可在任意会话中用 @片段 引用。",
    create: "创建",
    created: "片段「{{title}}」已创建 — 引用已放入输入框"
  },
  selectionSnippet: {
    title: "创建文字片段",
    namePlaceholder: "可选，例如：陪我读",
    hint: "名称用于 @ 搜索和简短显示；实际引用仍会带入完整原文。"
  },
  renameSnippet: {
    action: "修改片段名称",
    title: "修改片段名称",
    placeholder: "留空则恢复为正文摘要",
    hint: "只修改名称，不会改动片段原文、来源或已有引用。",
    saved: "片段名称已更新"
  },
  deleteSnippet: {
    action: "删除片段",
    title: "删除这个片段？",
    description: "「{{title}}」会被永久删除；已经发出的消息里对它的引用会失效。",
    confirm: "删除",
    deleted: "片段已删除"
  },
  recipes: {
    ready: "「{{title}}」— 这些材料现在可以提取成一个可重复任务",
    extract: "提取",
    dismiss: "忽略",
    prefilled: "提取指令已填入输入框 — 确认后发送"
  },
  scratch: {
    add: "加入参考",
    addPage: "把整个网页加入参考",
    addSelection: "把选中文字加入参考",
    addImage: "把图片加入参考",
    addMedia: "把媒体加入参考",
    added: "已加入参考，30 分钟内有效",
    title: "参考",
    description: "眼下想放在一起讨论的材料，30 分钟后自动清空；值得留的升级为 @。",
    empty: "还没有临时参考。在文件、消息里的文字或图片、网页上右键，选「加入参考」。",
    insert: "加入当前提问",
    promote: "升级为 @",
    promoted: "已升级为正式引用",
    remove: "移除",
    kept: "已保留",
    minutesLeft: "剩 {{count}} 分钟",
    expiringSoon: "「{{label}}」还有 3 分钟过期",
    expiringHint: "值得留的话就升级为 @，否则会自动清空。",
    limit: "一次提问最多 5 个临时参考",
    noThread: "先打开一个对话，升级后的片段会归到那个对话里",
    countBadge: "{{count}} 个临时参考",
    inserted: "已加入",
    searchPlaceholder: "筛选参考…",
    noMatch: "没有匹配「{{query}}」的参考",
    selectedCount: "已选 {{count}} 项",
    clearSelection: "清除",
    insertSelected: "把 {{count}} 项加入当前提问",
    select: "选中",
    deselect: "取消选中",
    kinds: {
      text: "文字",
      file: "文件",
      image: "图片",
      web: "网页",
      media: "音视频"
    }
  },
  surfaceActions: {
    openInBrowser: "在浏览器打开",
    viewDateRecords: "查看日期记录与安排",
    goToThread: "跳转到该对话",
    goToMessage: "跳转到该消息",
    loginTerminal: "在 Terminal 登录",
    viewHostSettings: "主机设置",
    openInEditor: "在编辑器打开",
    needWorkspace: "当前线程没有工作区——打开一个工作区后才能创建终端。"
  }
};
const channels$1 = {
  email: {
    title: "邮箱账户",
    description: "连接你有权管理的邮箱（IMAP 收、SMTP 发）。新邮件进入收件箱成为原料，用 @ 引用按需处理，不会自动生成对话。",
    addAccount: "添加账户",
    accountName: "显示名（如 教研室邮箱）",
    username: "用户名（默认同地址）",
    password: "密码 / 应用专用密码",
    passwordHint: "建议使用应用专用密码（Gmail/QQ/163 均支持），仅保存在本地。",
    test: "测试连接",
    save: "连接",
    testOk: "IMAP + SMTP 正常",
    testFailed: "连接失败",
    noAccounts: "还没有连接邮箱账户。",
    checkNow: "立即收信",
    notifyOn: "新邮件提醒已开启（点击关闭）",
    notifyOff: "新邮件提醒已关闭（点击开启）",
    pendingBadge: "{{count}} 封待处理",
    inboxTitle: "收件箱（原料仓）",
    inboxHint: "新邮件在这里成为原料条目。在对话里用 @邮件 引用它即可处理（分类、提取附件、生成回复草稿）——草稿会回到这里，经你确认后才会发出。",
    inboxEmpty: "空空如也。",
    noSubject: "（无主题）",
    status_pending: "待处理",
    status_done: "已完成",
    status_dismissed: "已忽略",
    draftBadge: "草稿待确认",
    draftTo: "草稿 → {{to}}",
    confirmSend: "确认发送",
    discardDraft: "丢弃草稿",
    sentAt: "已发送 {{at}}",
    markDone: "标记完成",
    dismiss: "忽略",
    reopen: "恢复"
  }
};
const support$1 = {
  entryTitle: "官方客服（零权限）",
  entryDescription: "由 Alma 团队维护知识与诊断体系、跑在你自己的模型和算力上的客服。它没有任何工具，不能碰你的文件或配置，也永远不能接收凭据——即使你主动想给。",
  entryButton: "发起客服会话",
  title: "Alma 官方客服",
  subtitle: "无工具、无文件访问、永不接收凭据 —— 由本机独立执行。",
  greeting: "描述你的问题——安装、模型接入、功能使用或故障排查。你分享的任何证据都会先经你预览确认。",
  offlineNoModel: '离线排查模式：当前没有可用的模型，以下回答来自本地规则引擎——这正是客服为"模型接不上"的情况准备的。',
  offlineModelFailed: "离线排查模式：你的模型没有响应，本轮由本地规则引擎接管应答。",
  inputPlaceholder: "描述你的问题…（Enter 发送）",
  defenseTitle: "本机防御",
  defenseRules: "客服永远不能：读文件、执行命令、修改配置、索取密码/API Key。此类内容在这里被拦截，严重越界直接切断会话。",
  exportsTitle: "出示证据（先预览）",
  export_version: "版本信息",
  export_errors: "错误摘要",
  export_tasks: "最近 Task 状态",
  export_rearview: "倒后镜片段",
  exportPreviewHint: "在下方检查并删减——只有你确认的内容才进入输入框，且只有你能按发送。",
  exportInsert: "插入输入框",
  defenseLog: "防御事件",
  defenseLogEmpty: "暂无拦截。",
  kill: "切断会话",
  terminated: "会话已切断：{{reason}}",
  killedByUser: "你主动切断",
  zeroPermBadge: "零权限"
};
const crystal$1 = {
  dockTitle: "结晶区",
  emptySlot: "空槽位 {{n}}",
  contourHint: "待产生晶核：{{count}} 个",
  backpack: "背包（休眠）",
  formal: "正式结晶",
  empty: "还没有结晶活动。重复出现的称呼会自己长出来；也可以在 Timeline 里多选记录卡建立晶种。",
  recall: "收回背包",
  wake: "唤醒到槽位",
  originSeed: "晶种",
  originNucleus: "晶核",
  stageCandidate: "候选",
  stageFormal: "正式",
  subtitle: "来源可回查、清单齐备后，由你批准成为正式 @对象。",
  termStats: "出现 {{count}} 次 · {{turns}} 个轮次 · {{threads}} 个 Thread · {{days}} 天",
  materials: "形成材料（{{count}}）",
  noMaterials: "还没有材料。",
  type: "对象类型",
  type_entity: "实体／事件",
  type_concept: "概念",
  type_claim: "主张／论证",
  type_process: "流程",
  type_rule: "规则",
  type_project: "项目／成果",
  checklist: "固定清单",
  prefill: "AI 预填（仅草稿）",
  fieldMissing: "缺少内容或来源",
  fieldConflict: "存在未处理冲突",
  markConflict: "标记冲突",
  clearConflict: "解除冲突",
  fieldPlaceholder: "内容（保存时自动记来源）",
  sources: "来源",
  readyTitle: "原料仓已具备生成结晶的条件",
  readyHint: "确认后，此候选 ID 将原地升级为正式 @对象；语迹、材料与反向关系全部保留。正式结晶不获得任何执行能力。",
  confirm: "确认结晶",
  cancelToBackpack: "取消（收回背包）",
  bundleTitle: "组成记录束（{{count}} 张记录卡）",
  bundleSubtitle: "记录束只保留对原始卡片的指向，不复制内容。",
  bundleNamePlaceholder: "观察方向名称（建立晶种时必填）",
  bundleAsSeed: "同时建立晶种，开始观察后续对话（占用 1 个槽位）",
  slotsFull: "3 个槽位已满——先在结晶区收回一个晶种。",
  field_identity: "身份",
  field_time: "时间",
  field_participants: "参与者",
  field_source: "来源",
  field_status: "状态",
  field_definition: "定义",
  field_includes: "包含范围",
  field_excludes: "排除边界",
  field_examples: "实例",
  field_statement: "主张",
  field_scope: "范围",
  field_supporting: "支持材料",
  field_opposing: "反向材料",
  field_trigger: "触发",
  field_inputs: "输入",
  field_steps: "步骤",
  field_outputs: "输出",
  field_failure_handling: "失败处理",
  field_permissions: "权限",
  field_subjects: "适用对象",
  field_conditions: "生效条件",
  field_forbidden_allowed: "禁止与允许",
  field_exceptions: "例外",
  field_stop_conditions: "停止条件",
  field_goal: "目标",
  field_deliverables: "交付物",
  field_version: "版本",
  field_rights_status: "权利状态",
  related: "相关结晶（共享形成材料）",
  sharedMaterials: "共享 {{count}}",
  settings: {
    title: "结晶",
    description: "重复出现的称呼如何凝结成候选对象。被动路径每轮会花一次小模型调用；门槛与开关都由你定。",
    passive: "被动观察（LLM 抽取称呼）",
    passiveHint: "关闭后不再消耗小模型；关闭期间的对话不会被回溯挖掘，晶种的词面/语义扫描不受影响。",
    semantic: "晶种语义扫描",
    semanticHint: "仅在本地嵌入模型已加载时生效，绝不会因此下载模型或联网。",
    gatesHint: "门槛看的是分散度：同一条消息重复只计一次。",
    contour: "轮廓",
    nucleus: "晶核",
    count: "次数",
    turns: "轮次",
    spread: "散布",
    dormant: "休眠",
    days: "天无新材料后收回背包",
    reset: "恢复默认"
  }
};
const mentions$1 = {
  tab: "引用",
  emptyHint: "用 @ 选中一个对象，这里就会打开它——内容型显示内容，功能型显示用法。",
  pin: "固定查看",
  unpin: "取消固定",
  pinHint: "只固定查看页面，不会把该对象带入之后的消息。",
  thread: {
    you: "你",
    assistant: "Alma",
    messages: "{{count}} 条消息",
    earlier: "前面 {{count}} 条未显示"
  }
};
const projectSuggestion$1 = {
  createTitle: "把这几段对话变成一个项目？",
  linkTitle: "把这段对话归到某个项目？",
  defaultReason: "这几段对话一直在绕同一件事。",
  bannerCreate: "你有几段对话看起来是同一件事",
  bannerLink: "这段对话像是你已有项目的一部分",
  viewDraft: "看看草稿",
  name: "项目名",
  understanding: "Alma 对这件事的理解",
  focus: "目前进展",
  threads: "包含的对话",
  remove: "不是这件事",
  putBack: "放回来",
  conclusions: "已有结论",
  location: "保存位置",
  choose: "选择…",
  noMigration: "只是把这些对话关联到项目，不会移动或复制任何文件：已经写出的文件留在原处，之后在这些对话里做的事会用项目目录。",
  feedbackIntro: "哪里理解偏了？直接告诉 Alma，它会重写这张卡片，不用你自己改。",
  feedbackPlaceholder: "例如：这两段不是同一件事 / 重点理解偏了 / 还漏了这个目标",
  revise: "重写",
  revising: "重写中…",
  notNow: "先不处理",
  confirmCreate: "创建项目",
  confirmLink: "归入项目",
  created: "已创建「{{name}}」"
};
const threadBrief$1 = {
  settings: {
    title: "对话摘要",
    description: "对话告一段落后，Alma 会在后台写一份很短的摘要，记下这段对话在聊什么。待办标记和项目建议都建立在这份摘要上。",
    reset: "恢复默认",
    enabled: "后台生成对话摘要",
    enabledHint: "只在对话有实质新增时调用一次小模型。默认只处理开启之后的新对话，旧对话只有你主动选择时才会读。",
    autoTodo: "你说了「之后要做」就标成待办",
    autoTodoHint: "只认你自己表达的意图。模型的建议、假设性讨论、以及让它现在就做的指令都不算；你改过的状态不会被覆盖。",
    projectSuggestions: "多段对话收敛时建议建项目",
    projectSuggestionsHint: "永远只是一张等你确认的草稿卡片，不会自动创建、关联或搬动任何东西。",
    budget: "预算",
    minUserTurns: "最少轮数",
    minNewChars: "新增字符",
    cluster: "收敛门槛",
    clusterThreads: "对话数",
    clusterSpread: "跨天数",
    clusterHint: "多少次重复出现才值得叫「一个项目」。只是关键词相似永远不够。"
  }
};
const layout$1 = {
  reset: "恢复默认布局",
  resetAction: "恢复",
  resetDesc: "把侧边栏和右侧面板恢复为默认宽度。",
  dividerHint: "双击恢复默认宽度"
};
const translate$1 = {
  action: "翻译",
  busy: "翻译中…",
  clickToRevert: "点击显示原文",
  failed: "翻译失败，请重试。"
};
const codeBlock$1 = {
  copyCode: "复制代码",
  copied: "已复制！"
};
const ttsDownload$1 = {
  loading: "正在加载{{label}}语音…",
  downloading: "正在下载{{label}}语音",
  preparing: "正在准备语音，首次使用需要一点时间…",
  progress: "{{downloaded}} / {{total}}",
  starting: "正在开始…",
  ready: "{{label}}语音已就绪",
  failed: "{{label}}语音下载失败"
};
const team$1 = {
  common: {
    join: "加入",
    startHosting: "开始托管",
    someone: "某人",
    today: "今天",
    almaAnswering: "Alma 正在回答",
    connectingRelay: "正在连接中继…"
  },
  landing: {
    title: "团队",
    intro: "Alma 之间共享的频道。只有发到频道里的内容会被共享——你自己的对话永远不会离开这台电脑。",
    joinWithLink: "通过链接加入",
    hostTeam: "托管团队",
    yourName: "你的名字",
    yourNameOrganizer: "你的名字，将显示为组织者",
    emailPlaceholder: "邮箱，用于 Gravatar 头像——只保存在这台电脑上",
    askOrganizer: "向组织者索取链接。",
    inviteAfter: "之后即可邀请成员。"
  },
  header: {
    archived: "已归档",
    disconnected: "已断开",
    reconnecting: "正在重连…",
    reopenChannel: "重新打开频道",
    archiveChannel: "归档频道",
    archiveChannelHint: "归档频道——保留历史记录，停止新的发言",
    hideMembers: "隐藏成员",
    showMembers: "显示成员",
    searchMessages: "搜索消息",
    clearSearch: "清除搜索"
  },
  rail: {
    channels: "频道",
    newChannelPlaceholder: "新频道",
    newChannelName: "新频道名称",
    addChannel: "添加频道",
    sharedThreads: "共享的对话",
    archived: "已归档"
  },
  images: {
    encodeFailed: "无法编码图片",
    readFailed: "无法读取图片"
  },
  savePerson: {
    inPeople: "已在联系人中",
    saveToPeople: "保存到联系人"
  },
  composer: {
    mentionCandidates: "提及候选",
    replyingTo: "回复 <name>{{name}}</name>",
    cancelReply: "取消回复",
    draftedByAlma: "由你的 Alma 起草——可以直接发送、编辑，或",
    discard: "丢弃",
    uploading: "正在上传",
    removeAttachment: "移除 {{name}}",
    placeholderWithImages: "添加一条消息，或直接发送",
    placeholder: "发消息到 {{channel}}",
    silentHint: "组织者已将团队的 Alma 设为静默",
    silent: "Alma 在这里保持静默",
    askOnHint: "团队的 Alma 会回答这条消息",
    askOffHint: "除非包含 @alma，否则这条消息只有成员能看到",
    almaWillAnswer: "Alma 会回答",
    askAlma: "询问 Alma",
    addImage: "添加图片",
    addImageHint: "添加图片——也可以粘贴或拖入",
    post: "发送"
  },
  members: {
    title: "成员",
    countOnline: "{{total}} · {{online}} 在线",
    organizer: "组织者",
    organizerYou: "组织者 · 你",
    you: "你",
    away: "离开",
    online: "在线",
    loading: "加载中"
  },
  invite: {
    relayOffHint: "邀请链接通过 Alma 中继，在任何地方都能打开。",
    turnOnRelay: "开启中继",
    signInHint: "登录一次即可通过中继发布此主机。",
    relayError: "中继：{{error}}",
    relayUnreachable: "当前无法连接到中继。",
    linkCopied: "邀请链接已复制",
    link: "邀请链接",
    thisNetworkOnly: "仅限当前网络",
    singleUseWeek: "一次性 · 7 天内有效",
    another: "再来一个",
    waiting: "等待中",
    sameNetwork: "在同一网络？",
    copyLocalLink: "复制局域网链接",
    copyInviteLink: "复制邀请链接",
    opensAnywhere: "通过中继在任何地方都能打开。"
  },
  messages: {
    yesterday: "昨天",
    replyToThis: "回复这段",
    usedTools_other: "使用了 {{count}} 个工具",
    almaAnsweringEllipsis: "Alma 正在回答…",
    imageN: "图片 {{n}}",
    reply: "回复",
    replyLower: "回复"
  },
  privatePane: {
    sharedWithTeam: "已与团队共享",
    onlyYouHint: "团队中没有人能看到这段对话",
    onlyYou: "仅自己可见",
    shareWithTeam: "与团队共享"
  },
  search: {
    searching: "正在搜索",
    searchingEllipsis: "正在搜索…",
    noResults: "没有找到 <q>“{{query}}”</q> 的结果",
    results_other: "<q>“{{query}}”</q> 共 {{count}} 条消息",
    newest50: "——最新的 50 条",
    you: "你",
    images_other: "{{count}} 张图片"
  },
  settings: {
    title: "团队",
    intro: "托管可供其他 Alma 加入的频道，或加入队友的频道。只有发到频道里的内容会被共享——私人对话永远不会离开输入它的那台电脑。",
    hostingAs: "以 {{name}} 的身份托管",
    portValue: "端口 {{port}}",
    lanValue: "局域网 {{addresses}}",
    hostHint: "成员通过邀请链接加入——可以经由 Alma 中继从任何地方加入，也可以通过局域网加入。",
    stopHosting: "停止托管",
    shownAsOrganizer: "将显示为组织者",
    emailLabel: "邮箱，用于 Gravatar 头像",
    staysOnMachine: "只保存在这台电脑上",
    staysOnMachineLong: "只保存在这台电脑上——团队只能看到头像",
    port: "端口",
    memberOf: "{{team}} 的成员",
    aTeam: "某个团队",
    joinTeam: "加入团队",
    asName: "身份：{{name}}",
    clientState: {
      idle: "空闲",
      connecting: "连接中",
      connected: "已连接",
      error: "出错",
      reconnecting: "正在重连"
    },
    joinHint: "粘贴组织者给你的邀请链接。",
    leave: "退出",
    howTeamSeesYou: "团队看到的你的名字",
    profileTitle: "你",
    profileHint: "团队看到的你的名字和 Gravatar 头像。",
    name: "名字",
    relayOff: "已关闭——只有局域网内的人可以加入。",
    relaySignInHint: "登录一次，局域网外的人就能加入。无需端口转发。",
    relayError: "中继出错",
    reachAnywhere: "随处可达",
    copyRelayUrl: "复制中继地址",
    inviteTitle: "邀请",
    inviteHint: "每个链接只能邀请一人，一周后过期。",
    inviteForPlaceholder: "邀请谁（可选）",
    newInvite: "新建邀请",
    copyInviteLink: "复制邀请链接",
    linkNetworkOnly: "此链接仅在你的网络内有效。",
    noAddress: "没有可以访问这台电脑的地址。",
    reasonRelayOff: "如需在任何地方都能打开的链接，请开启上方的“随处可达”。",
    reasonSignIn: "如需在任何地方都能打开的链接，请在上方登录。",
    reasonError: "中继未运行。",
    reasonErrorDetail: "中继未运行——{{error}}。",
    reasonConnecting: "正在连接中继——稍后再生成一个，即可得到随处可打开的链接。",
    singleUseExpires: "一次性 · {{date}} 过期",
    codeAndAddresses: "邀请码和地址",
    code: "邀请码",
    copyCode: "复制邀请码",
    address: "地址",
    copyHostAddress: "复制主机地址",
    noMembers: "还没有人加入。",
    membersOnline_other: "{{count}} 位成员 · {{online}} 在线",
    revoked: "已撤销",
    revoke: "撤销",
    modes: {
      silent: {
        label: "静默",
        help: "从不回答成员，即使是 @alma 也不回答。你仍然可以在本机向它提问。"
      },
      onMention: {
        label: "被提及时",
        help: "回答包含 @alma 的消息，或成员要求它回答的消息。"
      },
      topics: {
        label: "话题",
        help: "同“被提及时”，并且会回答提到下方任一话题的消息。"
      }
    },
    teamAlma: "团队 Alma",
    teamAlmaHint: "团队的 Alma 何时回答成员。你在自己的电脑上不受任何限制。",
    topicsLabel: "话题——每行一个；成员输入 @ 时会看到这些建议",
    answersPerHour: "每小时回答次数——留空表示不限",
    answersPerMemberAria: "每位成员每小时回答次数",
    perMember: "每位成员",
    answersPerChannelAria: "每个频道每小时回答次数",
    perChannel: "每个频道",
    channelsHint: "每位成员都能看到所有频道。",
    posts_other: "{{count}} 条消息",
    newChannelPlaceholder: "新频道"
  }
};
const herdr$1 = {
  notify: {
    needsYou: "需要你回复",
    finished: "已完成",
    open: "打开",
    tab: "标签页 {{n}}"
  },
  toggle: {
    label: "侧边栏",
    shortcut: "切换侧边栏 (⌘⇧A)"
  },
  add: {
    title: "添加电脑",
    description: "粘贴那台电脑上 Alma「设置 › 移动端」里的配对链接。",
    link: "配对链接",
    name: "名称",
    optional: "可选",
    checking: "正在检查链接…",
    add: "添加"
  },
  manage: {
    title: "电脑",
    description: "可以在这里操控其上 Agent 的电脑。",
    empty: "还没有其他电脑。",
    name: "名称",
    forget: "移除",
    forgetTitle: "移除 {{name}}？",
    forgetDescription: "之后需要它的配对链接才能再次添加。"
  },
  rename: {
    placeholder: "名称",
    rename: "重命名",
    tabTitle: "重命名标签页",
    workspaceTitle: "重命名工作区"
  },
  newWorkspace: {
    title: "新建工作区",
    folder: "文件夹",
    folderHint: "那台电脑上的文件夹。留空则使用主目录。",
    recent: "最近",
    name: "名称",
    start: "启动",
    nothing: "不启动",
    create: "创建",
    menu: "新建工作区…"
  },
  host: {
    thisMac: "这台 Mac",
    thisComputer: "这台电脑",
    computers: "电脑",
    add: "添加电脑…",
    manage: "管理电脑…",
    reconnect: "重新连接",
    noKeychain: "这台电脑无法安全保存密钥，因此无法记住其他电脑。"
  },
  route: {
    notConnected: "未连接",
    direct: "局域网直连",
    relay: "经由 Relay",
    connecting: "正在连接…",
    relayReconnecting: "正在重连 · 经由 Relay",
    offline: "离线",
    directToast: "已在同一局域网",
    directToastDetail: "直连你的电脑，更快更流畅。"
  },
  sidebar: {
    agentsOn: "{{name}} 上的 Agent",
    more: "更多",
    reconnect: "重新连接",
    needsYou: "等你处理",
    panes_other: "{{count}} 个窗格",
    workspaces: "工作区",
    newTab: "新标签页",
    today: "今天",
    yesterday: "昨天",
    earlier: "更早",
    allProjects: "全部项目",
    all: "全部",
    needsInput: "等你回复",
    done: "已完成",
    working: "进行中…",
    nothingHere: "这里还没有对话",
    unread: "未读",
    showUnread: "只看未读",
    showAll: "显示全部",
    allRead: "都看过了"
  },
  newTab: {
    button: "新标签页",
    failed: "无法打开新标签页：{{error}}",
    elsewhere: "在其他工作区"
  },
  sort: {
    label: "排序",
    herdr: "与 herdr 一致",
    status: "按状态",
    name: "按名称"
  },
  menu: {
    renameWorkspace: "重命名工作区…",
    muteWorkspace: "静音通知",
    unmuteWorkspace: "取消静音",
    moveUp: "上移",
    moveDown: "下移",
    closeWorkspace: "关闭工作区…",
    renameTab: "重命名标签页…",
    muteTab: "静音通知",
    unmuteTab: "取消静音",
    closeTab: "关闭标签页…",
    muteFailed: "无法更改通知设置：{{error}}",
    moveFailed: "无法移动：{{error}}"
  },
  close: {
    title: "关闭 {{name}}？",
    tabDescription: "此标签页里的 Agent 会退出，会话仍保留在电脑上。",
    workspaceDescription: "此工作区的所有标签页都会关闭，其中的 Agent 会退出。",
    tabAction: "关闭标签页",
    workspaceAction: "关闭工作区",
    failed: "无法关闭：{{error}}"
  },
  empty: {
    connecting: "正在连接…",
    unreachable: "无法连接 {{name}}",
    tooOld: "请更新那台电脑上的 Alma，才能在这里使用它的 Agent。",
    offline: "herdr 没有运行",
    offlineDetail: "在那台电脑上启动 herdr，它的 Agent 就会出现在这里。",
    noWorkspaces: "没有工作区",
    noWorkspacesDetail: "新建一个，在某个文件夹里运行 Agent。"
  },
  status: {
    blocked: "等待输入",
    working: "工作中",
    done: "已完成",
    idle: "空闲",
    unknown: "—"
  },
  page: {
    pick: "{{name}} 上的 Agent",
    pickDetail: "在侧边栏选择一个 Agent，与它对话或查看它的屏幕。",
    paneClosed: "窗格已关闭",
    paneClosedDetail: "这个窗格已经不在你的电脑上打开了。",
    nothingWaiting: "目前没有需要你处理的",
    all: "全部",
    nothingWaitingDetail: "Agent 完成任务或向你提问时，会出现在这里。",
    nothingWorking: "没有正在工作的 Agent",
    nothingWorkingDetail: "正在执行任务的 Agent 会出现在这里。",
    noAgents: "还没有 Agent",
    noAgentsDetail: "用侧边栏顶部的新建按钮开始一个。"
  },
  remoteScreen: {
    title: "远程屏幕",
    open: "查看并操控 {{name}} 的屏幕",
    video: "实时",
    stills: "截图",
    clickToControl: "点击即可操控",
    typing: "键盘输入会发到那边",
    unavailable: "看不到 {{name}} 的屏幕",
    unavailableDetail: "请在那台 Mac 上打开 Alma，并允许屏幕录制和辅助功能权限。",
    thisComputer: "这就是你正在用的电脑"
  },
  simulator: {
    title: "模拟器",
    open: "打开这台电脑上的模拟器或 Android 模拟器",
    openLocal: "打开 Simulator",
    home: "主屏幕 (⌘⇧H)",
    screenshot: "截图 (⌘S)",
    rotate: "旋转 (⌘← ⌘→)",
    shake: "摇一摇",
    hardware: "设备按键",
    lock: "锁屏",
    volumeUp: "调高音量",
    volumeDown: "调低音量",
    popOut: "弹出为窗口",
    dock: "停靠到对话旁边",
    close: "关闭",
    keepOnTop: "保持在最前",
    saved: "截图已存到“下载”并已复制",
    none: "这台电脑上没有模拟器。请在那台电脑上安装 Xcode 或 Android Studio，或更新它的 Alma。",
    other: "其他",
    running: "运行中",
    gone: "这个模拟器已经关闭。",
    booting: "正在启动模拟器…",
    failed: "无法显示 {{name}} 上的模拟器",
    back: "返回 (⌘⌫)",
    homeAndroid: "主屏幕",
    recents: "最近任务",
    power: "电源键"
  },
  pane: {
    chat: "对话",
    screen: "终端",
    view: "视图",
    showScreen: "查看终端",
    working: "工作中…"
  },
  chat: {
    loadEarlier: "加载更早的消息",
    noTranscriptYet: "Agent 在这个会话里还没写下任何内容。",
    noTranscript: "这个窗格的 Agent 不提供对话记录，请使用屏幕视图。",
    unsupportedAgent: "请更新电脑上的 Alma，才能在这里阅读 {{name}} 的对话。在此之前请使用屏幕视图。",
    queued_other: "{{count}} 条排队中",
    sentWhileWorking: "在工作中发送",
    recap: "回顾",
    teammateMessage: "来自 @{{name}} 的消息",
    thinking: "思考",
    toBottom: "滚动到底部"
  },
  composer: {
    placeholder: "给 {{name}} 发消息",
    attach: "添加文件",
    send: "发送",
    edit: "编辑",
    file: "文件",
    remove: "移除",
    tooBig: "{{name}} 超过 30 MB。",
    suggestionHint: "点击发送，右键可先编辑。"
  },
  annotate: {
    action: "标注",
    title: "标注图片",
    header: "图上的标注（序号对应图中区域）：",
    regionPlaceholder: "这里怎么了？",
    notePlaceholder: "补充说明（可选）",
    hint: "在图上圈出你说的地方，再写上每处是怎么回事",
    add: "加入消息",
    loadFailed: "图片加载失败。"
  },
  restart: {
    restart: "重启 {{name}}",
    restartDetail: "退出并重新打开同一会话",
    "continue": "重启并继续",
    continueDetail: "然后发送“{{prompt}}”",
    quitting: "正在退出 {{name}}…",
    reopening: "正在重新打开会话…",
    back: "{{name}} 已恢复",
    retry: "重试",
    line: "已重启 · {{time}}"
  },
  prompt: {
    waiting: "等你回应",
    typeSomething: "输入内容",
    changed: "电脑上的问题已经变了，没有发送任何内容。"
  },
  screen: {
    loading: "正在读取屏幕…",
    reflow: "适应窗口换行",
    original: "原始宽度",
    fit: "缩小以适应",
    width: "屏幕宽度",
    smaller: "缩小文字",
    larger: "放大文字",
    typeCommand: "输入命令",
    terminalInput: "终端输入",
    clickToType: "点一下，直接在终端里输入",
    send: "发送",
    showKeys: "显示按键",
    hideKeys: "隐藏按键"
  },
  subagent: {
    title: "子 Agent",
    working: "工作中",
    failed: "失败",
    done: "已完成",
    calls_other: "{{count}} 次工具调用",
    outdated: "请更新电脑上的 Alma 以查看子 Agent 的每一步。它的结果如下。",
    missing: "这个版本的 Claude Code 不保存子 Agent 的记录。",
    loadFailed: "无法加载子 Agent",
    pill_other: "{{count}} 个子 Agent 在工作",
    openLog: "打开子 Agent 的日志"
  },
  errors: {
    http: "电脑返回了 HTTP {{status}}。"
  },
  time: {
    now: "刚刚",
    minutes: "{{count}} 分钟",
    hours: "{{count}} 小时"
  },
  steps: {
    separator: "，",
    command_other: "运行了 {{count}} 条命令",
    edit_other: "编辑了 {{count}} 个文件",
    read_other: "读了 {{count}} 个文件",
    search_other: "搜索了 {{count}} 次",
    web_other: "查了 {{count}} 个网页",
    agent_other: "派出 {{count}} 个子代理",
    other_other: "另外 {{count}} 步"
  }
};
const zh = {
  timeClues: timeClues$1,
  remoteHandoff: remoteHandoff$1,
  dateReference: dateReference$1,
  conversationTime: conversationTime$1,
  app: app$1,
  navigation: navigation$1,
  providers: providers$1,
  chat: chat$1,
  reasoning: reasoning$1,
  settings: settings$1,
  main: main$1,
  languageSwitcher: languageSwitcher$1,
  speech: speech$1,
  titlebar: titlebar$1,
  share: share$1,
  label: label$1,
  common: common$1,
  phone: phone$1,
  sidebar: sidebar$1,
  windowControls: windowControls$1,
  errors: errors$1,
  warnings: warnings$1,
  gallery: gallery$1,
  capture: capture$1,
  liveCoding: liveCoding$1,
  onboarding: onboarding$1,
  updater: updater$1,
  promptApps: promptApps$1,
  artifact: artifact$1,
  fileExplorer: fileExplorer$1,
  projectCard: projectCard$1,
  workspace: workspace$1,
  github: github$1,
  taskTool: taskTool$1,
  hooks: hooks$1,
  modelCapabilities,
  providerStatus: providerStatus$1,
  askUserQuestion: askUserQuestion$1,
  commandPalette: commandPalette$1,
  toolGroupSummary: toolGroupSummary$1,
  minesweeper: minesweeper$1,
  activity: activity$1,
  infographic: infographic$1,
  branchNav: branchNav$1,
  toolBlock: toolBlock$1,
  threadResources: threadResources$1,
  toolRuns: toolRuns$1,
  goalLoop: goalLoop$1,
  webPreview: webPreview$1,
  a11yRequest: a11yRequest$1,
  artifactsUi: artifactsUi$1,
  quickChat: quickChat$1,
  references: references$1,
  channels: channels$1,
  support: support$1,
  crystal: crystal$1,
  mentions: mentions$1,
  projectSuggestion: projectSuggestion$1,
  threadBrief: threadBrief$1,
  layout: layout$1,
  translate: translate$1,
  codeBlock: codeBlock$1,
  ttsDownload: ttsDownload$1,
  team: team$1,
  herdr: herdr$1
};
const timeClues = {
  title: "時間の手がかり",
  description: "会話で触れた日付。手がかりから元のメッセージを確認できます。",
  unread: "今日の未読の手がかり：{{count}} 件",
  ranges: {
    today: "今日",
    "this week": "今週",
    "next week": "来週"
  },
  start: "開始日",
  end: "終了日",
  custom: "期間を選択",
  previousMonth: "前の月",
  nextMonth: "次の月",
  dateOnly: "—",
  otherInThread: "この会話のその他の日付",
  currentThread: "この会話",
  teamSource: "{{channel}} の {{author}}",
  openSource: "元のメッセージを開く",
  about: "時間の手がかりについて",
  unreadOne: "未読の手がかり",
  ignore: "無視",
  scheduledTask: "予定タスク",
  scheduledFired: "実行済み",
  currentAndToday: "この会話 + 今日の他の会話からの一致",
  failed: "読み込めませんでした。",
  empty: "この期間に索引済みの手がかりはありません。",
  unresolved: "日付未確定",
  previous: "前のページ",
  next: "次のページ",
  markSeen: "表示中の今日の手がかりを既読に",
  seenFailed: "既読状態を保存できませんでした。再試行してください。",
  coverage: "新しいユーザーの元メッセージと明示的に索引した出典のみ。時間表現はツールモデルが読み取ります（月曜、明々後日、next Friday など）。ツールモデル未設定時は固定文法で代替します。相対日付は元の送信日時とタイムゾーンに固定されます。赤い点は未読であり、期限超過や未完了ではありません。リマインダーを作成しません。"
};
const remoteHandoff = {
  download: "このコンピューターにダウンロード",
  title: "別のパソコンのプロジェクトを続ける",
  description: "元のホストでリモートアクセスとエンドツーエンド暗号化を有効にし、ペアリングリンクを貼り付けます。別ウィンドウでホストのプロジェクト、会話、モデル、Skills、MCPを使います。アップロードはホストへ、ダウンロードは現在のPCへ。ホストはオンラインである必要があります。",
  placeholder: "自分のホストの暗号化Almaペアリングリンク",
  connect: "プロジェクト接続を開く",
  security: "リンクはアクセス鍵です。共有しないでください。一時隔離セッションを閉じるとローカルのキャッシュを消去しますが、ホストのタスクは停止しません。記憶したホストはペアリングリンクのみをシステムのキーチェーンで暗号化して保存し、× でいつでも削除できます。ローカルのネイティブアプリ操作は使えません。",
  open: "開く",
  forget: "このホストを削除",
  remember: "このコンピューターでこのホストを記憶する",
  labelPlaceholder: "名前（任意）例：オフィスの Mac"
};
const dateReference = {
  invalid: "無効な日付参照",
  endExclusive: "終了日は範囲に含みません",
  coverage: "会話の送信日時、出来事、期限、完了日を区別します。日付参照は読み取り専用で、タスクを自動作成しません。原文の索引は明示操作のみ。カレンダーの読み取りにはホストの許可が必要な場合があります。",
  indexOriginal: "会話の原文から日時記録を整理",
  indexing: "原文をページごとに整理中…",
  workRecords: "関連する作業記録",
  workCoverage: "モデルによる整理で、明示的に索引した原文のみが対象です。引用文を確認してください。過去の記録は登録日ではなく実際の日付で関連付けます。結果なしは記録不存在の証明ではありません。ファイルと他のアプリは別途確認が必要です。",
  eventDate: "発生日",
  dueDate: "期限",
  completedDate: "完了日",
  states: {
    completed: "完了（原文の申告）",
    "in-progress": "進行中",
    planned: "計画",
    unconfirmed: "未確認"
  },
  projected: "規則による予定時刻、実行の証明ではありません",
  previouslyRun: "実行試行済み。成功・失敗は実行記録で確認",
  runHistory: "リマインダーの実行記録",
  runCoverage: "保存済みの実行記録のみで、完全な履歴ではありません。リマインダーの成功は作業自体の完了を証明しません。",
  runStarted: "実行開始",
  runFinished: "実行終了",
  runPreview: "結果のプレビューは省略されています。元の会話または実行履歴を確認してください。",
  runStates: {
    running: "実行中",
    succeeded: "実行成功",
    failed: "実行失敗",
    unconfirmed: "結果未確認"
  },
  calendar: "ホストのカレンダー",
  readCalendar: "ホストの予定を読む（読み取り専用）",
  retry: "再試行",
  noCalendarEvents: "この期間にホストの予定はありません。",
  conversations: "この期間にメッセージのある会話",
  noConversations: "該当メッセージなし。成果がないとは限りません。",
  moreSources: "他にも情報源があり、この一覧は完全ではありません。",
  reminders: "この期間のリマインダーと定期予定",
  noReminders: "期限を特定できるリマインダーはありません。"
};
const conversationTime = {
  created: "作成日時",
  firstConversation: "最初の会話",
  lastConversation: "最後の会話",
  lastKnownConversation: "確認済みの最後の会話",
  lastActivity: "最後のアクティビティ",
  partialCoverage: "会話日時は開いたスレッドのみを対象とします。未読の古いスレッドは未索引です。"
};
const app = {
  name: "Alma",
  description: "AIプロバイダー管理デスクトップアプリ",
  updateBadge: {
    label: "Update Available",
    updating: "Updating…",
    dismiss: "Dismiss"
  }
};
const navigation = {
  main: "メイン",
  providers: "プロバイダー",
  chat: "チャット",
  settings: "設定"
};
const providers = {
  title: "AIプロバイダー",
  add: "プロバイダーを追加",
  edit: "プロバイダーを編集",
  "delete": "プロバイダーを削除",
  name: "名前",
  type: "タイプ",
  apiKey: "APIキー",
  baseUrl: "ベースURL",
  model: "モデル",
  actions: "操作",
  enable: "有効化",
  disable: "無効化",
  enabled: "有効",
  disabled: "無効",
  deleteConfirm: "このプロバイダーを削除してもよろしいですか？",
  getStarted: "「プロバイダーを追加」をクリックして開始",
  noProviders: "プロバイダーがありません",
  providerName: "プロバイダー名",
  providerNameRequired: "プロバイダー名は必須です",
  apiKeyRequired: "APIキーは必須です",
  modelRequired: "モデル名は必須です",
  invalidUrl: "有効なURL形式を入力してください",
  baseUrlRequired: "カスタムプロバイダーにはベースURLが必要です",
  saveFailed: "保存に失敗しました",
  addNew: "新しいプロバイダーを追加",
  editConfig: "プロバイダー設定を編集",
  providerType: "プロバイダータイプ",
  apiKeySecure: "APIキーはローカルに安全に保存され、サーバーにアップロードされません",
  openai: {
    name: "OpenAI",
    description: "GPTシリーズモデル"
  },
  anthropic: {
    name: "Anthropic",
    description: "Claudeシリーズモデル"
  },
  google: {
    name: "Google",
    description: "Geminiシリーズモデル"
  },
  custom: {
    name: "カスタム",
    description: "カスタムOpenAI互換API"
  },
  aihubmix: {
    name: "AiHubMix",
    description: "安全・低価格・高速。Alipay決済に対応。",
    affiliateNoteBefore: "",
    affiliateLinkText: "このリンク",
    affiliateNoteAfter: "から登録していただくと、Almaの継続的な開発を支援できます。ご協力ありがとうございます！"
  },
  volcengine: {
    name: "Volcengine",
    description: "Volcengine Ark（Doubao）モデル、チャットと画像生成に対応"
  },
  moonshot: {
    name: "Moonshot",
    description: "Moonshot AI（Kimi）モデル、長文コンテキスト対応",
    region: "リージョン",
    regionChina: "中国 (api.moonshot.cn)",
    regionInternational: "国際版 (api.moonshot.ai)",
    regionHint: "中国本土のユーザーは中国を、その他の地域のユーザーは国際版を選択してください"
  },
  baseUrlOptional: "（オプション、空白の場合はデフォルトを使用）",
  baseUrlOptionalDescription: "オプション、空白の場合は公式APIアドレスを使用",
  modelPlaceholder: "例：gpt-4o-mini, claude-sonnet-4",
  testConnection: "接続テスト",
  selectModelToTest: "テストするモデルを選択",
  noModelsFound: "モデルが見つかりません",
  connectionSuccess: "接続成功！",
  connectionFailed: "接続テストに失敗しました",
  noModelsEnabled: "接続テストを行う前に、少なくとも1つのモデルを有効にしてください",
  configure: "プロバイダーを設定",
  enableProvider: "このプロバイダーを有効化",
  namePlaceholder: "私のカスタムプロバイダー",
  configDescription: "AIプロバイダーアクセス情報を設定します。すべてのデータはローカルに安全に保存されます。"
};
const chat = {
  workedFor: "作業時間 {{duration}}",
  backgroundAgentsRunning: "バックグラウンドで {{count}} 個のエージェントが実行中 · 完了後に自動で続行",
  title: "チャット",
  newChat: "新しいチャット",
  newChatDragHint: "新しいチャット — 会話の端へドラッグすると分割表示で開きます",
  editMode: "編集",
  splitPane: {
    close: "分割を閉じる",
    openLeft: "左に開く",
    openRight: "右に開く",
    openBottom: "下に開く",
    pairedWith: "「{{title}}」と分割表示で開く",
    ungroup: "分割表示を解除",
    leaveGroup: "分割グループから外す"
  },
  sendMessage: "メッセージを送信",
  typing: "メッセージを入力...",
  clearHistory: "履歴をクリア",
  noHistory: "チャット履歴がありません",
  startChatting: "会話を開始",
  messages: "件のメッセージ",
  selectModel: "モデルを選択",
  noModelsAvailable: "利用可能なモデルがありません",
  generationError: "生成エラー",
  stopGeneration: "生成を停止",
  steer: "介入",
  steerGeneration: "今すぐ送信 — 現在の応答に割り込みます",
  compose: "作成",
  aiAvatarLabel: "A",
  aiThinking: "考え中...",
  followBottom: "下に向かう",
  historyBack: "戻る",
  historyForward: "進む",
  historyBackTo: "「{{title}}」に戻る",
  historyForwardTo: "「{{title}}」に進む",
  autoCompact: {
    compacting: "コンテキストを圧縮中...",
    compacted: "{{count}}件のメッセージを圧縮",
    compactedTitle: "コンテキストが圧縮されました",
    savedTokens: "約{{tokens}}トークンを節約",
    indicatorTitle: "コンテキスト圧縮済み",
    indicatorMessages: "{{count}}件を要約",
    indicatorTokens: "約{{saved}}トークン節約"
  },
  compact: {
    success: "{{count}}件のメッセージを圧縮、約{{tokens}}トークンを節約",
    error: "コンテキストの圧縮に失敗しました",
    noMessages: "圧縮するのに十分なメッセージがありません",
    commandDescription: "会話履歴を圧縮してトークンを節約"
  },
  contextUsage: {
    title: "コンテキスト使用量",
    tokens: "{{used}} / {{total}} トークン",
    compactNow: "今すぐ圧縮",
    autoCompactAt: "{{percent}}% で自動圧縮します",
    autoCompactOff: "自動圧縮はオフです",
    overflowNotice: "コンテキストが上限を超えています。次のメッセージ送信前に自動圧縮されます。",
    compactFailed: "圧縮に失敗しました",
    nothingToCompact: "圧縮できる内容がありません"
  },
  queuedMessages: {
    count_other: "{{count}} 件の待機中メッセージ",
    sendNow: "待機中のメッセージを今すぐ送信",
    files: "ファイル",
    clickToEdit: "クリックして編集",
    steerHint: "介入 — このメッセージを生成中の応答に今すぐ差し込みます",
    steerError: "現在の応答への介入に失敗しました"
  },
  renderFailed: {
    title: "このメッセージを表示できませんでした。",
    retry: "再試行"
  },
  fileReference: {
    notFound: "{{name}} はこのワークスペースにありません"
  },
  taskResume: {
    resumeAsNewRun: "新しい実行として再開",
    resuming: "再開中…",
    runLabel: "実行 {{index}}",
    resumeHint: "この中断地点から新しい実行をやり直します。",
    resumeFailed: "中断されたタスクの再開に失敗しました",
    noOutput: "出力なし",
    statusCompletedNoOutput: "タスクは完了しました（テキスト出力なし）",
    statusFailedNoDetail: "タスクは失敗しました（エラー詳細なし）",
    statusNotFound: "タスクが見つかりません（クリーンアップされた可能性があります）",
    statusStillRunning: "タスクは実行中です"
  },
  todo: {
    progress: "{{completed}} / {{total}} タスク完了",
    clear: "タスクリストをクリア"
  },
  plan: {
    rework: "{{ref}} のフィードバックに対応中",
    feedbackOpen: "レビュー {{ref}} から修正依頼あり",
    after: "{{deps}} の後"
  },
  messageMenu: {
    copy: "コピー",
    copyAsMarkdown: "Markdown でコピー",
    copyAsPlainText: "プレーンテキストでコピー",
    readAloud: "読み上げ",
    stopReading: "読み上げを停止",
    regenerate: "再生成",
    regenerateDisabled: "再生成（無効）",
    more: "その他",
    usage: "使用状況",
    context: "コンテキスト",
    inputTokens: "入力トークン",
    outputTokens: "出力トークン",
    cacheRead: "キャッシュ読取",
    cacheHitRate: "キャッシュヒット率",
    cacheWrite: "キャッシュ書込",
    totalTokens: "トークン合計",
    timeToFirstToken: "最初のトークンまでの時間",
    tokensPerSecond: "トークン/秒",
    turnEndReason: "Turn終了理由",
    previousVersion: "前のバージョン",
    nextVersion: "次のバージョン",
    branchCreated: "ブランチを作成しました",
    creatingBranch: "ブランチを作成中…",
    createBranch: "ブランチを作成",
    deleteMessage: "メッセージを削除",
    memory: "メモリ",
    usedMemories: "使用したメモリ",
    createdMemories: "作成したメモリ",
    deletedMemories: "削除したメモリ",
    noMemories: "関連メモリなし",
    rollback: "ファイルをロールバック",
    viewTrace: "トレースを表示"
  },
  trace: {
    title: "実行トレース",
    loading: "トレースを読み込み中…",
    none: "このメッセージにトレースは記録されていません。",
    steps: "ステップ"
  },
  rollback: {
    title: "このメッセージにロールバック",
    description: "このメッセージ送信時の状態にすべてのファイルを復元し、AI応答および以降のメッセージによるファイル変更を取り消します。",
    filesOnly: "ファイルのみロールバック",
    filesOnlyDescription: "このメッセージ送信時の状態にファイルを復元しますが、会話履歴はすべて保持します",
    filesAndMessages: "ファイルとメッセージをロールバック",
    filesAndMessagesDescription: "このメッセージ送信時の状態にファイルを復元し、以降のすべてのメッセージ（AI応答を含む）を削除します",
    confirm: "ロールバック",
    rollingBack: "ロールバック中…"
  },
  toolPermission: {
    awaitingApproval: "承認待ち",
    approved: "承認済み",
    denied: "拒否済み",
    permissionRequired: "権限が必要",
    approve: "承認",
    deny: "拒否",
    decidedAt: "決定時刻：{{time}}",
    toolPermissionRequired: "ツールの権限が必要です",
    allow: "許可",
    allowOnce: "今回のみ許可",
    alwaysAllow: "常に許可",
    denyWithReason: "理由を付けて拒否",
    submitDenyReason: "拒否理由を送信"
  },
  permission: {
    awaitingApproval: "承認待ち",
    approved: "承認済み",
    approvedAll: "承認済み（このチャットで自動承認が有効）",
    denied: "拒否済み",
    accept: "許可",
    acceptAll: "すべて許可",
    rejectWithReason: "拒否",
    reject: "拒否",
    rejectReasonPlaceholder: "拒否理由を入力（任意）...",
    reason: "理由",
    decidedAt: "決定時刻"
  },
  imageAnnotate: {
    button: "注釈して編集",
    buttonTitle: "画像に注釈を付けてAIに編集させる",
    imageButtonTitle: "注釈して編集 — 印を描いてAIに編集させる",
    tool: {
      select: "選択",
      rect: "矩形",
      ellipse: "円",
      brush: "ペン",
      arrow: "矢印"
    },
    color: "色",
    undo: "元に戻す",
    redo: "やり直し",
    clearAll: "すべて消去",
    exit: "注釈を終了",
    regionPlaceholder: "ここをどう変える？",
    removeRegion: "この領域を削除",
    overallNotePlaceholder: "全体メモ（任意）：スタイル / 光 / 変更しない箇所…",
    apply: "編集を適用",
    applyDisabledHint: "まず画像に印を付けて説明を書いてください",
    applyShortcut: "⌘↵",
    canvasHint: "変更したい箇所を描くと、その場に説明ボックスが現れます。",
    prompt: {
      directive: "この注釈付き画像を直接編集してください（元画像を画像編集で修正し、新しい画像を生成しないでください）。",
      sourcePathLabel: "編集元画像のローカルパス（編集入力に使用）：",
      visibleHeader: "🖌️ 下記の注釈に従ってこの画像を編集してください（番号は画像上の領域に対応）：",
      overallLabel: "全体："
    }
  },
  mermaidAnnotate: {
    buttonTitle: "注釈して編集 — 図に印を付けて AI に書き直させる",
    cardTitle: "図の注釈編集",
    prompt: {
      directive: "添付画像は番号付きの注釈が入った Mermaid 図のレンダリングプレビューです。番号ごとの要望に従って図の Mermaid ソースを修正し、更新後の図を完全な ```mermaid コードブロックで返信してください。画像の生成や編集はしないでください。",
      sourceLabel: "この図の現在の Mermaid ソース:",
      visibleHeader: "🖌️ 以下の注釈に従ってこの図を修正してください（番号は注釈プレビューに対応）:"
    }
  },
  imageMenu: {
    copyImage: "画像をコピー",
    openImage: "画像を開く",
    saveImage: "画像を保存"
  },
  artifacts: {
    button: "Artifacts",
    enabled: "Artifacts モードが有効",
    disabled: "Artifacts モードが無効"
  },
  capabilities: {
    button: "ツールとスキル",
    searchPlaceholder: "ツールとスキルを検索…"
  },
  tools: {
    button: "ツール",
    noneSelected: "ツールは無効です",
    someSelected: "{{count}} 個のツールを使用",
    selectedCount: "{{count}} 個のツール",
    description: "次の応答で利用するツールを選択します。",
    selectAll: "すべて選択",
    clearAll: "すべて解除",
    auto: "自動",
    autoDescription: "メッセージに基づいて、最も適切なツールを Alma が自動的に選択します。",
    autoSelectedTools: "自動選択されたツール：",
    selectGroup: "このカテゴリをすべて選択",
    clearGroup: "このカテゴリの選択を解除",
    switchLayout: "レイアウト切替",
    groups: {
      workspace: "プロジェクトとファイル",
      shell: "シェルとプロセス",
      web: "ウェブと検索",
      planning: "計画と指示"
    },
    items: {
      Task: {
        label: "タスク委任",
        description: "複数ステップの作業を行うサブエージェントを起動します。"
      },
      TodoWrite: {
        label: "ToDo 更新",
        description: "計画の実行中に共有 ToDo リストを更新します。"
      },
      EnterPlanMode: {
        label: "プランモード開始",
        description: "会話を計画モードに切り替えます。"
      },
      ExitPlanMode: {
        label: "プランモード終了",
        description: "計画モードから通常会話に戻します。"
      },
      Skill: {
        label: "スキル実行",
        description: "保存済みのスキルやワークフローを呼び出します。"
      },
      SlashCommand: {
        label: "スラッシュコマンド",
        description: "カスタムスラッシュコマンドを実行します。"
      },
      Bash: {
        label: "Bash",
        description: "ワークスペースでシェルコマンドを実行します。"
      },
      BashOutput: {
        label: "Bash 出力",
        description: "最近のシェル実行の stdout/stderr を確認します。"
      },
      KillShell: {
        label: "シェル停止",
        description: "実行中のシェルコマンドを停止します。"
      },
      Glob: {
        label: "Glob 検索",
        description: "Glob パターンで一致するファイルを列挙します。"
      },
      Grep: {
        label: "ripgrep 検索",
        description: "ripgrep でプロジェクト内を検索します。"
      },
      Read: {
        label: "ファイル読込",
        description: "ファイル内容を読み込みます。"
      },
      Edit: {
        label: "パッチ編集",
        description: "構造化パッチでファイルを変更します。"
      },
      Write: {
        label: "ファイル書き込み",
        description: "指定した内容でファイルを書き換えます。"
      },
      NotebookEdit: {
        label: "Notebook 編集",
        description: "Notebook API で一括編集を適用します。"
      },
      WebFetch: {
        label: "ウェブ取得",
        description: "URL の生データを取得します。"
      },
      WebSearch: {
        label: "ウェブ検索",
        description: "最新情報をウェブで検索します。"
      },
      ToolSearch: {
        label: "ツール検索",
        description: "名前や説明でツールを検索・発見します。"
      },
      widgetRenderer: {
        label: "ウィジェット",
        description: "チャット内にインタラクティブなHTML/SVGビジュアライゼーションを表示します。"
      },
      pieChart: {
        label: "円グラフ",
        description: "データをインタラクティブな円グラフで表示します。"
      },
      barChart: {
        label: "棒グラフ",
        description: "データをインタラクティブな棒グラフで表示します。"
      }
    }
  },
  skills: {
    title: "スキル",
    auto: "自動",
    autoDesc: "AIが関連スキルを自動選択",
    selectAll: "すべて選択",
    clearAll: "すべてクリア",
    bundled: "内蔵スキル",
    personal: "個人スキル",
    claudeCode: "Claude Code スキル",
    marketplace: "マーケットプレイススキル",
    project: "プロジェクトスキル",
    noSkills: "利用可能なスキルがありません",
    selectedCount: "{{count}}個のスキル",
    autoSelectedSkills: "自動選択されたスキル:",
    agents: "Agent Skills"
  },
  mcp: {
    button: "MCPサーバー",
    title: "MCPサーバー",
    description: "この会話で有効にするMCPサーバーを選択します。",
    selectAll: "すべて選択",
    clearAll: "すべてクリア",
    noServers: "MCPサーバーがインストールされていません",
    installServers: "サーバーをインストール",
    openSettings: "MCP設定を開く",
    refresh: "MCPサーバーを更新",
    error: "エラー"
  },
  memory: {
    retrieving: "メモリを取得中...",
    retrievedCount: "{{count}} 件のメモリ",
    retrievedMemories: "取得したメモリ"
  },
  skillExtraction: {
    title: "スキルを抽出しました",
    analyzing: "再利用可能なパターンを分析中...",
    extracting: "新しいスキルを作成中...",
    saving: "スキルを保存中...",
    created: "新規",
    updated: "更新",
    viewSkill: "スキルを表示"
  },
  endResource: {
    open: "開く",
    openMenuLabel: "メニューを開く",
    openResource: "{{filename}} を開く",
    revealInFolder: "Finder で表示",
    revealInExplorer: "エクスプローラーで表示",
    copyPath: "パスをコピー",
    pathCopied: "パスをコピーしました",
    copyLink: "リンクをコピー",
    linkCopied: "リンクをコピーしました",
    websiteSubtitle: "ウェブサイト",
    documentFileType: "ドキュメント · {{extension}}",
    spreadsheetFileType: "スプレッドシート · {{extension}}",
    presentationFileType: "スライド · {{extension}}",
    imageFileType: "画像 · {{extension}}",
    archiveFileType: "アーカイブ · {{extension}}",
    locationProject: "プロジェクト",
    locationTemp: "一時",
    locationGlobal: "グローバル",
    reviewInSidebar: "サイドバーでプレビュー",
    openInApp: "デフォルトアプリで開く"
  },
  previewLink: {
    open: "プレビューを開く"
  },
  incognito: {
    button: "シークレットモード",
    enabled: "シークレットモードがON - このチャットのメモリ機能は無効です",
    disabled: "シークレットモードがOFF - クリックしてメモリ機能を無効にします"
  },
  commands: "コマンド",
  commandsAndPrompts: "コマンド＆プロンプト",
  commandsAndSkills: "コマンド＆スキル",
  promptsAndSkills: "プロンプト＆スキル",
  commandsPromptsAndSkills: "コマンド、プロンプト＆スキル",
  skillEnabled: "スキル「{{name}}」を有効にしました",
  skillDisabled: "スキル「{{name}}」を無効にしました",
  workspaceFiles: "プロジェクトファイル",
  noFilesFound: "ファイルが見つかりません",
  typeToFilter: "入力してファイルを絞り込む...",
  imageAspect: {
    title: "アスペクト比",
    description: "生成画像の縦横比 — AIが画像を生成・編集する際に適用されます。",
    auto: "自動"
  },
  queueMessage: "キューに追加",
  queueMessageHint: "キューに追加 — 「介入」で今すぐ現在の応答に差し込むか、ターン終了後に自動送信",
  crew: {
    jumpToWork: "スレッドで見る"
  },
  permissionRequest: "権限リクエスト",
  systemNote: "システムノート",
  dropFilesHere: "ここにファイルをドロップ",
  modelPicker: {
    favorites: "お気に入り",
    favorite: "お気に入りに追加",
    unfavorite: "お気に入りから外す"
  },
  modelSelectorError: "モデルセレクターエラー",
  denialReasonPlaceholder: "拒否理由を入力...",
  downloadFile: "ファイルをダウンロード"
};
const reasoning = {
  thinking: "考え中...",
  thought: "考えた",
  duration: "考えるのに {{duration}} 秒かかりました",
  button: "推論",
  description: "拡張思考をサポートするモデルの推論強度を調整します。",
  fast: "Fast",
  fastDesc: "約 1.5 倍速く、利用枠の消費も速くなります。サブエージェントにも適用。",
  effortDesc: {
    off: "拡張思考を無効にする",
    low: "最小限の推論で高速応答",
    medium: "速度と推論深度のバランス",
    high: "複雑なタスク向けの深い推論",
    xhigh: "最難タスク向けの最大推論",
    max: "最大の推論深度",
    ultra: "最も過酷なタスク向けの極限推論"
  }
};
const settings = {
  plugins: {
    providerSetupHint: "Provider プラグインをインストールしたら、{link} で設定を完了してください。",
    providersPageLink: "Providers ページ",
    updatesBadge: "プラグイン更新 ({{count}})",
    updatesAvailable: "{{count}} 件のプラグインに更新があります",
    updateAll: "すべて更新"
  },
  title: "設定",
  searchSettings: "検索",
  language: "言語",
  theme: "テーマ",
  save: "保存",
  cancel: "キャンセル",
  appearance: {
    light: "ライト",
    dark: "ダーク",
    system: "システムに従う"
  },
  appIcon: {
    title: "アプリアイコン",
    description: "Dock、タスクバー、トレイに表示されるアプリアイコンを選択します。"
  },
  startup: {
    title: "起動設定",
    autoStart: "システム起動時に開始",
    startMinimized: "起動時にシステムトレイに最小化"
  },
  window: {
    title: "ウィンドウ動作",
    minimizeToTray: "システムトレイに最小化",
    closeToTray: "システムトレイに閉じる",
    hideDockIcon: "Dockアイコンを非表示（メニューバーのみモード）",
    hideDockIconDesc: "有効にすると、アプリアイコンがDockから非表示になり、メニューバーにのみ表示されます（macOSのみ）",
    hideMenuBarIcon: "メニューバーアイコンを非表示",
    hideMenuBarIconDesc: "メニューバーから Alma を取り除きます。Dock アイコンとクイックチャットのショートカットからは引き続き開けるため、Dock アイコンの非表示とは併用できません",
    hideTrayIcon: "システムトレイアイコンを非表示",
    hideTrayIconDesc: "システムトレイから Alma を取り除きます。タスクバーとクイックチャットのショートカットからは引き続き開けます",
    trayDescription: "有効にすると、閉じるボタンをクリックした際に終了ではなくシステムトレイに隠します"
  },
  openWindow: "設定ウィンドウを開く",
  dataSecure: "すべての設定はリアルタイムでローカルに保存され、データは完全にプライベートで安全です。",
  unsavedChanges: "未保存の変更",
  allSaved: "すべての変更が保存されました",
  saving: "保存中...",
  resetConfirm: "すべての設定をデフォルト値にリセットしますか？この操作は元に戻せません。",
  resetFailed: "設定のリセットに失敗しました",
  exportFailed: "設定のエクスポートに失敗しました",
  importFailed: "設定のインポートに失敗しました",
  closeConfirm: "未保存の変更があります。閉じてもよろしいですか？未保存の変更は失われます。",
  saveFailed: "設定の保存に失敗しました",
  saveError: "設定の保存に失敗しました",
  resetError: "設定のリセットに失敗しました",
  exportError: "設定のエクスポートに失敗しました",
  importError: "設定のインポートに失敗しました",
  importSettings: "設定をインポート",
  exportSettings: "設定をエクスポート",
  resetSettings: "設定をリセット",
  more: "その他",
  loadingSettings: "設定を読み込み中...",
  tabRenderError: "この設定ページの読み込みに失敗しました。エラーは報告されました。再試行するか、他のタブに切り替えてください。",
  "interface": "インターフェース",
  responseSettings: "応答設定",
  historySettings: "履歴設定",
  soundEffects: "サウンドエフェクト",
  soundEffectsCredit: "<author>Ryo Lu</author> の <project>ryOS</project> にインスパイアされました。感謝します！",
  preview: "プレビュー",
  enableStreamingResponse: "ストリーミング応答を有効化",
  enableMarkdownRendering: "Markdownレンダリングを有効化",
  autoSaveChatHistory: "チャット履歴を自動保存",
  encryptApiKeysStorage: "APIキーストレージを暗号化",
  enableApplicationPasswordProtection: "アプリケーションパスワード保護を有効化",
  changePassword: "パスワードを変更",
  enableOperationLogging: "操作ログを有効化",
  currentSession: "現在のセッション",
  clearActiveSessions: "アクティブセッションをクリア",
  loggingSettings: "ログ設定",
  privacySettings: "プライバシー設定",
  enableAutomaticBackup: "自動バックアップを有効化",
  enableCloudSync: "クラウド同期を有効化",
  backupSettings: "バックアップ設定",
  syncSettings: "同期設定",
  enableProxy: "プロキシを有効化",
  proxySettings: "プロキシ設定",
  fontSettings: "フォント設定",
  layoutSettings: "レイアウト設定",
  editorSettings: "エディター設定",
  defaultSettings: "デフォルト設定",
  enableExperimentalFeatures: "実験的機能を有効化",
  defaultLocation: "デフォルト場所",
  systemError: "エラー",
  systemWarn: "警告",
  systemInfo: "情報",
  systemDebug: "デバッグ",
  about: {
    title: "バージョン情報",
    description: "Alma は <author>yetone</author> が手掛ける洗練された AI プロバイダー統合デスクトップです。",
    version: "現在のバージョン",
    statusLabel: "アップデートの状態",
    checkUpdates: "アップデートを確認",
    checking: "確認中…",
    lastChecked: "最終確認",
    autoDownload: "アップデートを自動でダウンロード",
    autoDownloadDesc: "新しいバージョンをバックグラウンドでダウンロードし、完了したら再起動を案内します。",
    never: "未確認",
    unsupportedHint: "自動更新はパッケージされた macOS / Windows 版でのみ利用できます。",
    status: {
      idle: "待機中",
      checking: "アップデートを確認中…",
      updateAvailable: "新しいバージョンがあります！",
      upToDate: "最新バージョンを使用しています。",
      downloading: "アップデートをダウンロード中…",
      downloaded: "アップデートをダウンロードしました。再起動で適用できます。",
      error: "アップデートに失敗しました",
      unsupported: "このビルドでは自動更新を利用できません。"
    },
    feedback: "フィードバックを送信",
    feedbackDesc: "ご意見、バグ報告、機能リクエストをお寄せいただき、Alma の改善にご協力ください。",
    discord: "Discord コミュニティ",
    discordDesc: "Discord サーバーに参加して、他のユーザーと交流したり、サポートを受けたり、最新情報を入手しましょう。",
    joinDiscord: "Discord に参加"
  },
  memory: {
    title: "メモリー",
    description: "AI のメモリーとコンテキスト設定を管理",
    memoryFeature: "メモリー機能",
    enableMemory: "メモリーを有効にする",
    enableMemoryDesc: "有効にすると、AIは会話から重要な情報を記憶し、よりパーソナライズされた回答を提供します。",
    retrieval: "メモリー取得",
    autoRetrieve: "自動メモリー取得",
    autoRetrieveDesc: "会話の前に関連するメモリーを自動的に検索してコンテキストとして注入します。",
    maxRetrievedMemories: "最大取得メモリー数",
    maxRetrievedMemoriesDesc: "会話コンテキストに注入する関連メモリーの最大数（1〜20）。",
    similarityThreshold: "類似度しきい値",
    similarityThresholdDesc: "メモリーを取得するために必要な最小類似度スコア。値が高いほど、厳密なマッチングになります。",
    looseMatch: "緩い (0%)",
    strictMatch: "厳密 (100%)",
    queryRewriting: "クエリ書き換え",
    queryRewritingDesc: "メモリー検索前にツールモデルでメッセージを最適化します。会話的なクエリをセマンティック検索語に変換し、より良いマッチングを実現します。",
    summarization: "メモリー要約",
    autoSummarize: "会話を自動要約",
    autoSummarizeDesc: "会話から重要な情報を自動的に抽出して新しいメモリーとして保存します。",
    embeddingModel: "埋め込みモデル",
    embeddingModelDesc: "セマンティック検索に使用する埋め込みモデル。空白の場合はデフォルト（text-embedding-3-small）を使用します。",
    selectEmbeddingModel: "埋め込みモデルを選択",
    searchEmbeddingModels: "埋め込みモデルを検索...",
    defaultModel: "デフォルト",
    useDefaultEmbeddingModel: "デフォルトを使用（text-embedding-3-small）",
    noEmbeddingModelsFound: "埋め込みモデルが見つかりません",
    localModels: "ローカルモデル",
    downloadingModel: "モデルをダウンロード中…",
    loadingModel: "モデルをメモリに読み込み中…",
    modelReady: "ローカルモデル準備完了",
    downloadFailed: "モデルのダウンロードに失敗しました",
    dimensions: "次元",
    embeddingModelChanged: "埋め込みモデルが変更されました",
    rebuildRequired: "新しいモデルを使用するには、すべてのメモリー埋め込みを再構築する必要があります。保存されているすべてのメモリーの埋め込みが再生成されます。",
    rebuildEmbeddings: "埋め込みを再構築",
    manualRebuildDesc: "必要に応じてすべてのメモリー埋め込みを手動で再生成します。",
    rebuilding: "埋め込みを再構築中...",
    rebuildCompleted: "埋め込みの再構築が完了しました！",
    rebuildFailed: "埋め込みの再構築に失敗しました",
    starting: "開始中...",
    cancel: "キャンセル",
    retry: "再試行",
    confirmEmbeddingChange: "埋め込みモデルを変更しますか？",
    confirmEmbeddingChangeDesc: "埋め込みモデルを変更すると、すべてのメモリーの埋め込みを再構築する必要があります。この処理にはメモリーの数によって時間がかかる場合があります。続行しますか？",
    requirements: "必要条件",
    requirementsDesc: "メモリー機能には、埋め込みベクトルを生成するためにAPIキーが設定されたOpenAIプロバイダーが必要です。少なくとも1つのOpenAIプロバイダーが設定されていることを確認してください。",
    statistics: "統計",
    totalMemories: "メモリー総数",
    autoGenerated: "自動生成",
    manuallyAdded: "手動追加",
    addMemory: "メモリーを追加",
    addMemoryPlaceholder: "AIに覚えてほしい内容を入力...",
    addMemoryButton: "メモリーを追加",
    adding: "追加中...",
    searchMemories: "メモリーを検索",
    searchPlaceholder: "意味的類似度で検索...",
    rewrittenAs: "実際の検索：",
    searchResults: "検索結果",
    match: "一致",
    memoryList: "メモリーリスト",
    clearAll: "すべて削除",
    clearAllConfirm: "すべてのメモリーを削除してもよろしいですか？この操作は元に戻せません。",
    loading: "読み込み中...",
    noMemories: "メモリーはまだありません。会話から自動的に作成されるか、手動で追加できます。",
    auto: "自動",
    manual: "手動",
    permanent: "永続",
    temporary: "一時",
    permanentDesc: "変わりにくい長期記憶（好み、個人情報など）",
    temporaryDesc: "古くなる可能性のある短期記憶（現在のプロジェクト、進行中のタスクなど）",
    accessedTimes: "{{count}}回アクセス",
    fromChat: "チャットから",
    viewMessage: "メッセージを見る",
    sleep: {
      title: "メモリスリープ",
      enable: "毎日のメモリ整理を有効にする",
      enableDesc: "毎日以下の時刻に、完全な重複を削除し、期限切れの一時的なメモリを破棄し、類似クラスターをマージします。マシンが停止していた場合、次回アプリ起動時に静かに実行されます。削除されたエントリはアーカイブから復元できます。",
      summary: "アーカイブ {{archived}} · 次回: {{date}} {{time}}",
      time: "実行時刻",
      timeDesc: "毎日のローカル実行時刻。03:00 はデフォルトで邪魔にならない時間帯です。",
      runNow: "いますぐ実行",
      running: "実行中…",
      cancel: "キャンセル",
      lastCycle: "前回: {{status}} ({{trigger}})",
      examined: "{{examined}} 件確認 · {{exact}} 件完全重複、{{expired}} 件期限切れ、{{similarity}} 件近似、{{llm}} 件 LLM マージ",
      errorPrefix: "エラー: {{message}}",
      retention: "保持期間",
      temporaryTtl: "一時メモリ TTL（日）",
      temporaryTtlDesc: "この日数を超えてアクセスがない一時メモリはアーカイブされます。",
      archiveRetention: "アーカイブ保持期間（日）",
      archiveRetentionDesc: "アーカイブ中のメモリはこの日数を過ぎると削除されます。これ以降は復元できません。",
      advancedToggle: "類似度・LLM マージ調整",
      similarityLabel: "類似度マージ閾値: {{percent}}%",
      similarityDesc: "コサイン類似度がこの値を超えるエントリは近似重複として LLM なしでマージされます。",
      useLlm: "LLM で曖昧な類似エントリをマージ",
      llmLowLabel: "LLM マージ下限: {{percent}}%",
      llmLowDesc: "類似度がこの値と類似度マージ閾値の間のペアはメモリツールモデルに送られ、保守的にマージ判定されます。",
      llmBatchSize: "LLM バッチサイズ",
      llmBatchSizeDesc: "1 回のマージプロンプトで送る最大クラスタサイズ。",
      archiveSection: "アーカイブされたメモリ ({{total}})",
      noArchive: "アーカイブはありません。",
      restore: "復元",
      recentRuns: "直近のサイクル ({{count}})",
      genericFailure: "スリープサイクルに失敗",
      failedToRun: "スリープサイクルの実行に失敗",
      failedToRestore: "復元に失敗",
      reason: {
        exact_dup: "完全重複",
        expired: "期限切れ",
        orphan: "孤立",
        similarity_merge: "近似 (ベクトル)",
        llm_merge: "LLM マージ",
        manual: "手動"
      },
      retry: "再試行",
      progressTitle: "スリープサイクルを実行中",
      stage: {
        exact: "完全重複を削除中…",
        expired: "期限切れの一時メモリをクリーンアップ中…",
        similarity: "近似クラスタリング中…",
        purge: "古いアーカイブを削除中…"
      },
      progressArchived: "アーカイブ済み: {{exact}} 完全 · {{expired}} 期限切れ · {{similarity}} 近似 · {{llm}} LLM",
      dedupAcrossUserIds: "ユーザーネームスペース横断の重複削除",
      dedupAcrossUserIdsDesc: "オンの場合、異なるチャンネルブリッジ（Slack、Discord など）からの同一メモリは 1 件に統合されます。各ネームスペースで独立したコピーが必要な共有マルチユーザー環境ではオフにしてください。",
      exportSnapshot: "メモリスナップショットをエクスポート",
      exporting: "エクスポート中…",
      exportFailed: "エクスポート失敗",
      archivePage: "{{start}}–{{end}} / 全 {{total}} 件",
      tokensUsed: "LLM tokens: {{input}} 入力 / {{output}} 出力",
      previewCycle: "次回サイクルをプレビュー",
      previewing: "プレビュー中…",
      previewArchive: "{{count}} 件をアーカイブ予定",
      previewSynthesize: "{{count}} 件のマージメモリを合成予定",
      previewSkipped: "プレビューをスキップ: {{reason}}",
      previewClose: "プレビューを閉じる",
      restoreMergedNotice: "このメモリは以前、現在もライブで存在するマージ済みエントリ「{{content}}」に統合されました。必要なければ手動で削除してください。",
      archiveChain: "→ {{visible}} (チェーン深度 {{depth}})"
    }
  },
  prompts: {
    title: "プロンプト",
    description: "チャットで / を入力して呼び出せるクイックプロンプトを作成します",
    add: "プロンプトを追加",
    edit: "プロンプトを編集",
    "delete": "プロンプトを削除",
    deleteConfirm: "このプロンプトを削除してもよろしいですか？",
    name: "名前",
    namePlaceholder: "例：commit、review、explain",
    nameHint: "/prompts:{name} で呼び出します。英数字、ハイフン、アンダースコアのみ使用できます。",
    nameRequired: "名前は必須です",
    nameFormatError: "名前には英数字、ハイフン、アンダースコアのみ使用できます",
    content: "内容",
    contentPlaceholder: "プロンプトの内容を入力...",
    contentRequired: "内容は必須です",
    noPrompts: "プロンプトがありません",
    addFirst: "最初のプロンプトを追加して始めましょう"
  },
  general: {
    title: "一般",
    permissionRequest: {
      title: "権限リクエスト",
      autoApprove: "すべてのツールリクエストを自動承認",
      autoApproveDesc: "有効にすると、すべてのツール権限リクエストが確認なしで自動的に承認されます。慎重にご使用ください。"
    },
    analytics: {
      title: "プライバシー",
      enable: "匿名分析を有効にする",
      enableDesc: "Almaの改善に役立てるため匿名の使用データを送信します。個人データや会話内容は収集されません。無効にするとすべてのテレメトリーが停止します。"
    }
  },
  toolModel: {
    title: "ツールモデル",
    description: "品質を維持しながら高速なモデル。スレッドタイトルの生成、メモリー操作、その他の自動化タスクに使用されます。",
    selectModel: "ツールモデルを選択",
    noProviders: "プロバイダーが設定されていません",
    noProvidersDesc: "ツールモデル機能を使用するには、少なくとも1つのAIプロバイダーを設定してください。",
    configureProviders: "プロバイダーを設定",
    autoDetected: "自動",
    autoDetectedDesc: "このモデルは、設定済みのプロバイダーに基づいて自動的に選択されました。別のモデルを手動で選択することもできます。",
    recommended: "推奨",
    notConfigured: "ツールモデルが設定されていません",
    notConfiguredDesc: "より良いスレッドタイトルとメモリー管理のためにツールモデルを設定してください。",
    configure: "設定",
    memoryToolModel: "メモリーツールモデル",
    memoryToolModelDesc: "メモリー操作用のツールモデルを上書きします。空白の場合は汎用ツールモデルを使用します。",
    useDefault: "デフォルトツールモデルを使用",
    searchModels: "モデルを検索...",
    noResults: "モデルが見つかりません",
    noModels: "利用可能なモデルがありません",
    test: "モデルをテスト",
    testSuccess: "テスト成功",
    testFailed: "テスト失敗",
    testTimedOut: "テストがタイムアウトしました — モデルが時間内に応答しませんでした",
    testSlow: "モデルが遅い - より高速なモデルの選択を推奨",
    testUnusable: "モデル使用不可 - 応答時間が長すぎます、別のモデルを選択してください",
    testExpensive: "モデルが高価 - 高い料金はすぐに積み重なります、より安いモデルの選択を推奨",
    generatedTitle: "生成されたタイトル",
    selectedTools: "選択されたツール",
    totalTime: "合計時間",
    cost: "単価",
    ttft: "初回トークン時間",
    tps: "トークン/秒"
  },
  visionModel: {
    title: "ビジョンモデル",
    description: "デフォルトは無効です。無効時は画像をそのままメインモデルに送ります（メインモデルが画像対応とみなします）。有効にすると、メインモデルが画像を読み取れない場合に、指定したビジョンモデルで画像を説明文へ変換し、そのテキストをメインモデルに渡します。",
    selectModel: "ビジョンモデルを選択",
    disable: "無効化（ビジョンモデルを使用しない）"
  },
  codingAgent: {
    title: "Coding Agent",
    description: "Task ツールの `coder` サブエージェントがコード作業に使う実行バックエンドを選択します。",
    selectLabel: "デフォルト Coding Agent",
    auto: "自動",
    autoDesc: "Claude Code を優先し、使えない場合は内蔵エージェントにフォールバックします。",
    claudeCode: "Claude Code",
    claudeCodeDesc: "ローカルにインストールされた Claude Code CLI を直接使います。",
    builtin: "内蔵エージェント",
    builtinDesc: "Alma の内蔵サブエージェントを使い、現在のチャットモデルを流用します。",
    acpProviderGroup: "ACP Providers",
    acpProviderDesc: "Codex CLI や Gemini CLI など、設定済みの ACP provider を使います。",
    manageProviders: "Providers を管理",
    noAcpProviders: "ACP provider はまだ設定されていません。"
  },
  channels: {
    title: "チャンネル"
  },
  providers: {
    title: "プロバイダー",
    defaultSettings: "デフォルト設定",
    defaultModel: "デフォルトモデル",
    selectDefaultModel: "デフォルトモデルを選択",
    defaultModelDescription: "新しい会話を開始する際に選択されるデフォルトモデルです",
    getStartedProvider: "「プロバイダーを追加」をクリックして開始",
    deleteFailed: "削除に失敗しました: ",
    aiProviders: "AIプロバイダー",
    addProvider: "プロバイダーを追加",
    model: "モデル",
    baseUrl: "ベースURL",
    edit: "編集",
    "delete": "削除",
    noProvidersYet: "プロバイダーがまだ設定されていません",
    addProviderToGetStarted: "「プロバイダーを追加」をクリックして開始してください",
    defaultModelForNewChats: "これは新しいチャットセッションのデフォルトモデルになります",
    deleteProviderConfirm: "このプロバイダーを削除してよろしいですか？",
    searchProvidersPlaceholder: "プロバイダーを検索...",
    pluginHint: "プロバイダーが見つかりませんか？まずプラグインページで対応するプラグインをインストールしてください。",
    proxyEndpoints: {
      title: "APIプロキシエンドポイント",
      advanced: "高度な設定",
      description: "Almaは{{providerName}}用のAPIプロキシエンドポイントを提供します。これらのエンドポイントはAPIリクエストをChat Completions形式に変換し、様々なAIツールとの互換性を実現します。",
      responsesApi: {
        title: "OpenAI Responses APIプロキシ",
        tooltip: "OpenAI Responses APIリクエストをChat Completions APIに変換",
        description: "OpenAI Responses APIを必要とするツール（例：Codex）でこのエンドポイントを使用してください。リクエストはChat Completions形式に変換されます。"
      },
      anthropicApi: {
        title: "Anthropic Messages APIプロキシ",
        tooltip: "Anthropic Messages APIリクエストをChat Completions APIに変換",
        description: "Anthropic互換ツールでこのエンドポイントを使用してください。リクエストはChat Completions形式に変換されます。"
      },
      claudeCodeHint: {
        title: "Claude Codeで使用",
        description: "以下の環境変数を設定することで、このプロバイダーをClaude Codeで使用できます："
      }
    }
  },
  chat: {
    title: "チャット",
    chatParameters: "チャットパラメーター",
    temperature: "温度",
    conservativeDesc: "保守的 (0.0)",
    balancedDesc: "バランス (1.0)",
    creativeDesc: "创造的 (2.0)",
    temperatureDesc: "応答のランダム性を制御します。低い値はより一貫した応答を生成し、高い値はより初造的な応答を生成します。",
    maxTokens: "最大トークン数",
    maxTokensDesc: "単一応答の最大長制限 (1-8192)",
    showTokenUsage: "トークン使用量を表示",
    showTokenUsageDesc: "チャットインターフェースで各会話のトークン消費統計を表示",
    streamingResponseDesc: "有効にすると、AIの応答がリアルタイムで表示されます。無効の場合は完全な応答を待ってから一度に表示します",
    markdownRenderingDesc: "応答内のMarkdown形式コンテンツを自動でレンダリング",
    singleDollarTextMath: "単一ドル記号の数式をレンダリング",
    singleDollarTextMathDesc: "単一ドル記号によるインライン数式のレンダリングを有効にします（例：$x = y$）。通常のドル記号との競合を避けるため、デフォルトでは無効です。詳細: https://github.com/vercel/streamdown/issues/108",
    infographicEnabled: "インフォグラフィック可視化を有効にする",
    infographicEnabledDesc: "有効にすると、システムプロンプトにインフォグラフィックのガイダンスを注入し、AIに可視化を生成させます。無効にしてもガイダンスが削除されるだけで、既存のインフォグラフィックブロックは正常にレンダリングされます。",
    historyRetentionDays: "履歴保持日数",
    historyRetentionDaysDesc: "指定された日数より古いチャット記録は自動的に削除されます (1-365日)",
    autoCompact: {
      title: "自動圧縮",
      enable: "自動圧縮を有効にする",
      enableDesc: "モデルのコンテキストウィンドウ制限に近づくと、会話履歴を自動的に圧縮します。これにより、手動介入なしで会話を無限に続けることができます。",
      threshold: "圧縮しきい値",
      thresholdEarly: "早め (5%)",
      thresholdLate: "遅め (95%)",
      thresholdDesc: "コンテキスト使用率がこのパーセンテージを超えると圧縮がトリガーされます。低い値はより多くのバッファスペースを提供し、高い値はより多くの元のコンテンツを保持します。",
      keepRecentMessages: "保持する最近のターン数",
      keepRecentMessagesDesc: "常に完全な形で保持する最近のターン数。1ターン = あなたのメッセージ1件と、その後の AI の返信・ツール呼び出しすべて。保持されたターンは要約に圧縮されません (2-20)。直近のターンだけで予算を超える場合は、保持数を減らします。",
      notification: "コンテキストが圧縮されました",
      notificationDesc: "{{count}}件のメッセージが要約され、コンテキストスペースが確保されました。",
      summaryModel: "圧縮モデル",
      summaryModelDefault: "会話モデルと同じ（推奨）",
      summaryModelDesc: "会話を圧縮する際に要約を生成するモデル。最良の要約品質のため既定では現在の会話モデルを使用します——小型/安価なモデルは要約品質が低く文脈を失います。"
    },
    defaultToolSelection: {
      title: "デフォルトツール選択",
      description: "新しい会話のデフォルトツール選択を設定",
      auto: "自動",
      autoDesc: "AIがコンテキストに基づいて使用するツールを自動的に決定",
      all: "全てのツール",
      allDesc: "すべての会話で利用可能なすべてのツールを有効化",
      none: "ツールなし",
      noneDesc: "デフォルトでツールを無効化（純粋な会話モード）"
    },
    defaultSkillSelection: {
      title: "デフォルトスキル選択",
      description: "新しい会話のデフォルトスキル選択を設定",
      auto: "自動",
      autoDesc: "AIがコンテキストに基づいて使用するスキルを自動的に決定",
      all: "全てのスキル",
      allDesc: "すべての会話で利用可能なすべてのスキルを有効化",
      none: "スキルなし",
      noneDesc: "デフォルトでスキルを無効化（純粋な会話モード）"
    },
    autoSuggestions: {
      enable: "クイック返信候補を有効にする",
      enableDesc: "AI応答後に会話を続けるための候補を表示"
    },
    openLinksInApp: "内蔵ブラウザでリンクを開く",
    openLinksInAppDesc: "返信内のリンクをドックの内蔵ブラウザで開き、Alma を離れずに検証できます。Cmd/Ctrl+クリックで常にシステムブラウザを使用。",
    browserAutoPip: "AI がブラウザを操作するときにピクチャーインピクチャーを表示",
    browserAutoPipDesc: "AI が内蔵ブラウザを使うとき、ブラウザパネルが見えていなければ小さなフローティングウィンドウで様子を表示します。オフにすると自動では開かず、必要なときに手動で開けます。",
    selectionActions: {
      title: "選択テキストで質問",
      description: "メッセージ内でテキストを選択したとき「選択内容を参照」の隣に表示されるボタン。クリックすると、プロンプトと選択内容が質問として送信されます。",
      labelPlaceholder: "ボタン名（例：これは何？）",
      promptPlaceholder: "選択内容と一緒に送るプロンプト（例：この部分の意味を説明して）",
      add: "ボタンを追加"
    }
  },
  ui: {
    title: "ユーザーインターフェース",
    fontSettings: "フォント設定",
    fontFamily: "フォント",
    fontFamilyDesc: "アプリケーションインターフェースのフォントを選択します。システムデフォルトのままにすると、OSのフォントが使用されます。",
    systemDefault: "システムデフォルト",
    fontSize: "フォントサイズ",
    small: "小",
    medium: "中",
    large: "大",
    layoutSettings: "レイアウト設定",
    interfaceDensity: "インターフェース密度",
    compact: "コンパクト",
    comfortable: "快適",
    spacious: "ゆったり",
    compactDesc: "より多くのコンテンツ",
    comfortableDesc: "バランスの取れたレイアウト",
    spaciousDesc: "より多くのスペース",
    sidebarWidth: "サイドバー幅",
    editorSettings: "エディター設定",
    showLineNumbers: "行番号を表示",
    showLineNumbersDesc: "コードブロックとテキスト編集エリアで行番号を表示",
    wordWrap: "自動改行",
    wordWrapDesc: "水平スクロールを避けるため長いテキストを自動改行",
    showMinimap: "コード縮略図を表示",
    showMinimapDesc: "長いコードブロックの右側に縮略図ナビゲーションを表示",
    useSystemCaret: "システムカーソルを使用",
    useSystemCaretDesc: "入力エリアでカスタムアニメーションカーソルの代わりにネイティブのシステムカーソルを使用",
    showEditDiffPreview: "編集Diffプレビューを表示",
    showEditDiffPreviewDesc: "Edit/Writeツール呼び出しを構文ハイライト付きの完全なdiffとして表示します。低スペック環境ではオフにすると軽量なサマリー表示になります。",
    toolCardDefaultExpand: "ツールカードのデフォルト展開",
    toolCardDefaultExpandDesc: "生成中のツールカードのデフォルト展開動作を制御します。SubAgentカードはこの設定に関係なく常に自動展開されます。",
    toolCardExpandAuto: "自動",
    toolCardExpandAutoDesc: "Edit/Write/Bashのみ展開",
    toolCardExpandAlways: "常に",
    toolCardExpandAlwaysDesc: "すべて展開",
    toolCardExpandNever: "なし",
    toolCardExpandNeverDesc: "すべて折りたたみ",
    haptics: "トラックパッド触覚フィードバック",
    hapticsDesc: "会話タイムラインのレールを掃くとき、目盛りを越えるたびにトラックパッドが振動します（Force Touch トラックパッドのみ）。",
    hapticsEnabled: "触覚フィードバックを有効にする",
    hapticsStyle: "ラチェットスタイル",
    hapticStyle_edc: "EDC メカニカル",
    hapticStyle_edc_desc: "速度適応型：ゆっくりで深い噛み合い、速くで細かい歯、両端にストッパー",
    hapticStyle_single: "シングル",
    hapticStyle_single_desc: "目盛りごとに軽快なクリック",
    hapticStyle_double: "ダブル",
    hapticStyle_double_desc: "クリックの後に軽い跳ね返り",
    hapticStyle_engage: "噛み合い",
    hapticStyle_engage_desc: "軽く噛んでからスナップ",
    hapticStyle_triple: "三連",
    hapticStyle_triple_desc: "軽い2打からクリックへ",
    hapticStyle_soft: "ソフト",
    hapticStyle_soft_desc: "システム標準の控えめなパルス",
    hapticsStrength: "強さ",
    hapticStrength_weak: "弱",
    hapticStrength_medium: "中",
    hapticStrength_strong: "強",
    hapticsPreviewHint: "変更するとプレビューが再生されます。指をトラックパッドに載せたままお試しください。",
    terminalSettings: "ターミナル設定",
    terminalFontFamily: "フォント",
    terminalFontFamilyDesc: "システムからターミナルのフォントを選択",
    terminalFontSize: "フォントサイズ",
    persistTerminals: "ターミナルの永続化",
    persistTerminalsDesc: "チャット切り替え時にターミナルセッションを維持する",
    terminalCursorBlink: "カーソル点滅",
    terminalCursorBlinkDesc: "ターミナルのカーソルを点滅させる",
    selectFont: "フォントを選択...",
    searchFonts: "フォントを検索...",
    noFontsFound: "フォントが見つかりません",
    sidebarSettings: "サイドバー設定",
    sidebarMode: "サイドバーモード",
    sidebarSimple: "シンプル",
    sidebarSimpleDesc: "時系列のリスト",
    sidebarGtd: "GTD",
    sidebarGtdDesc: "ステータス、ラベル、お気に入り",
    sidebarProject: "プロジェクト",
    sidebarProjectDesc: "ワークスペース別にグループ化",
    manageLabels: "ラベルを管理",
    addLabel: "ラベルを追加",
    editLabel: "ラベルを編集",
    noLabels: "ラベルがまだ作成されていません",
    labelDialogDesc: "会話を整理するためのラベルを作成します",
    labelName: "ラベル名",
    labelNamePlaceholder: "例：仕事、個人、研究",
    labelColor: "ラベルの色",
    deleteLabelTitle: "ラベルを削除",
    deleteLabelDesc: "このラベルを削除してもよろしいですか？このラベルを使用している会話はタグ付けされなくなります。"
  },
  network: {
    title: "ネットワーク",
    proxySettings: "プロキシ設定",
    enableProxy: "プロキシを有効化",
    proxyType: "プロキシタイプ",
    proxyTypeSystem: "システムプロキシに従う",
    proxyTypeSystemHint: "システム（または PAC スクリプト）が各アドレスに対して返すプロキシをブラウザと同じように使います。プロキシアプリの TUN/拡張モードなしで Alma の通信も経由します。",
    proxyServer: "プロキシサーバー",
    port: "ポート",
    username: "ユーザー名（オプション）",
    password: "パスワード（オプション）",
    networkParameters: "ネットワークパラメータ",
    requestTimeout: "リクエストタイムアウト",
    seconds: "秒",
    retryAttempts: "リトライ回数",
    llmTimeouts: "AI 生成のタイムアウト",
    llmTimeout: "最初の応答までの待ち時間（秒）",
    llmTimeoutDesc: "AI プロバイダーが応答を始めるまで待つ最長時間。ゲートウェイ経由の推論モデルは数分かかることがあり、上の一般的なリクエストタイムアウトはここには適用されません。0 = 無制限。既定値 300。",
    streamIdleTimeout: "ストリームのアイドルタイムアウト（秒）",
    streamIdleTimeoutDesc: "この時間データが届かなければ生成を中止します。0 = 自動（テキスト 60 秒、推論 240 秒、画像 180 秒、定期タスク 300 秒）。遅いモデルで「Stream timed out」が出る場合は大きくしてください。",
    requestLog: "ネットワークリクエストを記録",
    requestLogDesc: "HTTP 試行ごとに 1 行（ホストとパス、適用タイムアウト、ヘッダー到着までの時間、結果）をアプリデータフォルダーの network-requests.log に書き込みます。タイムアウト調査用で、リクエスト本文やキーは記録しません。",
    retryAttemptsDesc: "リクエスト失敗時の自動リトライ回数（0-10）",
    customUserAgent: "カスタムUser-Agent（オプション）",
    customUserAgentPlaceholder: "空白の場合はデフォルトを使用",
    customUserAgentDesc: "HTTPリクエストのカスタムUser-Agent識別子",
    preferIpv4: "IPv4を優先",
    preferIpv4Desc: "DNS解決でIPv4アドレスを強制的に使用します。IPv6アドレスに到達できず「fetch failed」エラーが発生する場合に有効にしてください。",
    testProxy: "プロキシをテスト",
    testingProxy: "テスト中...",
    testProxySuccess: "プロキシ正常 · {{latency}} ms {{ip}}",
    testProxyFailed: "プロキシテスト失敗: {{message}}",
    testProxyUnknownError: "プロキシテストで不明なエラーが発生しました",
    caCertPath: "カスタム CA 証明書バンドル",
    caCertPathPlaceholder: "/path/to/corporate-ca-bundle.pem",
    caCertPathDesc: "TLS 検査プロキシ（Zscaler など）を使う企業ネットワーク向けの PEM バンドル。システムのルート証明書に追加され、すべての外部接続に適用されます。空の場合は SSL_CERT_FILE / REQUESTS_CA_BUNDLE 環境変数を参照します。"
  },
  webSearch: {
    title: "Web検索",
    searchEngine: "検索エンジン",
    selectEngine: "検索エンジンを選択",
    xiaohongshu: "小红书（RED）",
    xiaohongshuWarning: "小红书検索を使用するとアカウントが停止される可能性があります。ご自身の責任でご利用ください",
    engineDescription: "Web検索に使用する検索エンジンを選択します。Googleは一般的な検索に推奨され、小红书は中国のライフスタイルやショッピングコンテンツに適しています。",
    googleSettings: "Google検索設定",
    googleSettingsDesc: "ブラウザウィンドウを開いてGoogle検索設定（言語、地域、セーフサーチなど）を構成します。これらの設定はWeb検索の結果取得時に使用されます。",
    openGoogleSettings: "Google設定を開く",
    xiaohongshuSettings: "小红书設定",
    xiaohongshuSettingsDesc: "ブラウザウィンドウを開いて小红书にログインし、アカウントを設定します。ログインすると、より良い検索結果とパーソナライズされたコンテンツにアクセスできます。",
    openXiaohongshuSettings: "小红书設定を開く",
    webFetchBrowser: "WebFetchブラウザ",
    webFetchBrowserDesc: "ブラウザウィンドウを開いてウェブサイトにログインします。ログイン後、WebFetchは認証が必要なコンテンツにアクセスできます。",
    openWebFetchBrowser: "ブラウザを開く",
    cookieManagement: "Cookie管理",
    cookieManagementDesc: "Cookie-Editorなどのブラウザ拡張機能とログイン状態を共有するためにCookieをインポート/エクスポートします。これにより、Almaとブラウザの両方でログイン状態を維持できます。",
    exportCookies: "エクスポート",
    importCookies: "インポート",
    clearCookies: "クリア",
    cookieExportSuccess: "{{count}}個のCookieをクリップボードにエクスポートしました",
    cookieExportError: "Cookieのエクスポートに失敗しました",
    cookieImportSuccess: "{{count}}個のCookieを正常にインポートしました",
    cookieImportError: "Cookieのインポートに失敗しました",
    cookieImportEmpty: "クリップボードにCookieがありません。先にCookie-EditorからCookieをコピーしてください。",
    cookieClearSuccess: "{{count}}個のCookieをクリアしました",
    cookieClearError: "Cookieのクリアに失敗しました"
  },
  mobileRelay: {
    title: "リモートアクセス",
    description: "外出先からスマートフォンでこの Alma を操作できます。デスクトップがリレーサーバーへ外向き接続を維持するため、ポート開放は不要です。",
    relayConnection: "リレー接続",
    deviceName: "デバイス名",
    deviceNameHint: "スマートフォンや他のデバイスでこのコンピュータが表示される名前です。空欄にするとシステムの名前を使います。",
    deviceNameSave: "保存",
    deviceNameSaved: "保存しました",
    officialRelayHint: "Alma リレー（{{host}}）を使用します。",
    customRelayHint: "セルフホストのリレー（{{host}}）を使用中です。",
    selfHostedToggle: "セルフホストのリレーを使う",
    useOfficialRelay: "Alma のリレーに戻す",
    useThisRelay: "このリレーを使う",
    selfHostedHint: "自分のリレー（Docker または Cloudflare Workers）を HTTPS 越しにデプロイし、そのアドレスを入力してください。ペアリング済みのスマホはこのデスクトップのリレーに従います。切り替え後は再ペアリングが必要です。リレーに登録キーを設定している場合は、下のトークン欄に貼り付けてください。",
    selfHostedGuide: "デプロイガイド",
    enable: "有効化",
    disable: "無効化",
    status: "ステータス",
    replaced: "同じペアリングで別の Alma デスクトップが接続し、いまはそちらがスマートフォンに応答しています。互いに置き換え合わないよう、こちらは切断したままにします。",
    reconnect: "この Mac を使う",
    phones: {
      none: "まだスマートフォンが接続していません — 下のコードをスマートフォンで読み取ってください。",
      unnamed: "あなたのスマートフォン",
      connectedNow: "接続中",
      lastSeen: "最終接続 {{when}}",
      justNow: "たった今"
    },
    state: {
      stopped: "オフ",
      connecting: "接続中…",
      connected: "接続済み",
      error: "エラー",
      replaced: "引き継がれました"
    },
    pairTitle: "スマートフォンとペアリング",
    pairDescription: "スマートフォンのカメラでスキャンすると Alma が開いて自動接続されます。または下の URL を Alma → 設定 → 接続 に貼り付けてください。",
    regenerate: "再生成",
    regenerateConfirm: "接続コードを再生成しますか？ペアリング済みの端末は再ペアリングが必要になります。",
    firewallHint: "{{name}} が有効なため、同じ Wi-Fi のスマートフォンもリレー経由になります。直接接続するには TCP {{port}} を許可してください：",
    secretHint: "この URL はこの Alma への完全なアクセス権を与えます。自分のデバイスとだけ共有し、無効化するには再生成してください。",
    e2eTitle: "エンドツーエンド暗号化",
    e2eDescription: "スマートフォンとこの Mac の間の全トラフィックを暗号化し、リレーサーバーには暗号文しか見えないようにします。変更するとスマートフォンの再ペアリングが必要です。",
    pairDescriptionE2E: "スマートフォンのカメラでスキャンすると Alma が開き、暗号化チャネルで接続します。QR には秘密鍵が含まれるため、自分のスマートフォンにのみ表示してください。",
    accountToken: "Alma アカウントトークン",
    tokenSaved: "保存済み",
    tokenHint: "共有リレーは全 Alma ユーザーが無料で使えますが、アカウントトークンが必要です。サインインしてトークンをコピーし、ここに貼り付けてください。",
    tokenPlaceholder: "リレートークンを貼り付け",
    saveToken: "保存",
    getToken: "Alma アカウントからトークンを取得",
    tokenRequired: "リレーに有効なアカウントトークンがありません。サインインし直すと再接続できます。",
    account: "Alma アカウント",
    accountHint: "一度サインインすると、このデスクトップが認可されます。共有リレーは Alma ユーザーなら無料で、接続にはアカウントトークンが必要です。",
    signInGoogle: "Google でサインイン",
    reSignIn: "再サインイン",
    signedInAs: "{{email}} としてサインイン済み",
    manualToken: "トークンを手動で貼り付け",
    betaNotice: "モバイルアプリとペアリングフローは開発中のため、互換性のない変更が入る可能性があります。"
  },
  permissions: {
    title: "権限",
    heading: "システム権限",
    intro: "この Mac で Alma が見てよいもの。それぞれシステム設定からいつでも変更できます。",
    onboardingIntro: "Alma が本来の力を発揮するにはいくつかのシステム権限が必要です。今許可しても、あとで設定から許可しても構いません。",
    local: "すべてはこの Mac の中に留まります。Alma は今の質問に答えるのに必要なものだけを読みます。",
    checking: "権限を確認しています…",
    unknown: "権限の状態を取得できませんでした。",
    noneRequired: "{{platform}} では権限は必要ありません。",
    allSet: "すべて準備できました。",
    grant: "許可",
    pending: "未許可",
    "continue": "続ける",
    back: "戻る",
    toastTitle: "権限が許可されました",
    toastDesc: "Alma は前面のウィンドウを読み、画面のコンテキストを取得できるようになりました。",
    items: {
      accessibility: {
        label: "アクセシビリティ",
        description: "前面のウィンドウを Alma が読めるようにし、QuickChat が見ているものについて答えられるようにします。"
      },
      screen_recording: {
        label: "画面収録",
        description: "視覚的なコンテキストとして画面を取得できるようにします。ページやアプリの画像を見るツールに必要です。"
      }
    }
  },
  data: {
    title: "データ",
    dataStorage: "データストレージ",
    dataStorageLocation: "データ保存場所",
    selectLocation: "場所を選択",
    dataStorageLocationDesc: "チャット履歴、設定ファイルなどのアプリケーションデータの保存場所",
    backupSettings: "バックアップ設定",
    enableAutomaticBackup: "自動バックアップを有効化",
    backupFrequency: "バックアップ頻度",
    dailyBackup: "毎日バックアップ",
    weeklyBackup: "毎週バックアップ",
    monthlyBackup: "毎月バックアップ",
    maxBackups: "保持するバックアップ数",
    maxBackupsDesc: "この数を超える古いバックアップは自動削除されます（1-30）",
    cloudSync: "クラウド同期",
    experimentalFeature: "実験的機能",
    enableCloudSync: "クラウド同期を有効化",
    enableCloudSyncDesc: "設定と一部データをクラウドに同期し、異なるデバイス間で一貫性を保ちます",
    syncProvider: "同期サービスプロバイダー",
    selectSyncProvider: "同期サービスプロバイダーを選択",
    dataManagement: "データ管理",
    exportData: "データをエクスポート",
    importData: "データをインポート",
    selectExportData: "エクスポートするデータを選択",
    selectAll: "すべて選択",
    selectNone: "すべて解除",
    "export": "エクスポート",
    selectExportDataDesc: "バックアップファイルに含めるデータを選択してください",
    selected: "選択済み",
    exportOption: {
      settings: "設定",
      providers: "AIプロバイダー",
      threads: "チャット履歴",
      promptApps: "プロンプトアプリ",
      prompts: "クイックプロンプト",
      workspaces: "プロジェクト",
      mcpServers: "MCPサーバー",
      customThemes: "カスタムテーマ",
      memories: "メモリ"
    },
    exportOptionDesc: {
      settings: "アプリの設定、外観、動作の構成",
      providers: "APIキーとプロバイダー設定",
      threads: "すべての会話スレッドとメッセージ",
      promptApps: "カスタムプロンプトアプリの設定",
      prompts: "クイックスラッシュコマンドプロンプト",
      workspaces: "プロジェクトディレクトリと設定",
      mcpServers: "MCPサーバー設定",
      customThemes: "ユーザー作成のカラースキーム",
      memories: "AIメモリエントリとコンテキスト"
    },
    dangerousOperations: "危険な操作",
    clearAllLocalData: "すべてのローカルデータをクリア",
    clearAllLocalDataDesc: "すべてのチャット履歴、プロバイダー設定、アプリケーション設定が削除されます。この操作は復元できません",
    clearDataConfirm: "すべてのローカルデータをクリアしますか？この操作は復元できません！\n\nすべてのチャット履歴、プロバイダー設定、アプリケーション設定が削除されます。",
    clearDataNotImplemented: "データクリア機能は実装待ちです",
    exportFailed: "データのエクスポートに失敗しました",
    importSuccess: "データのインポートに成功しました",
    importFailed: "データのインポートに失敗しました",
    rearview: {
      title: "リアビュー",
      count: "{{count}} 件の足跡",
      description: "各実行が通過したシステム地点のローカル台帳。定義済み地点のみで、プロンプト・名前・引数・出力・身元は一切含みません。✓=完了受領、!=明示的失敗、?=信頼できる受領なし。この端末内に留まり、チャットで @リアビュー と参照できます。",
      freeze: "スナップショットを凍結",
      freezeHint: "不変のプレーンテキスト（公開列のみ）— 共有するか決めるのはあなた自身です。"
    }
  },
  usage: {
    title: "使用量",
    today: "今日",
    thisWeek: "今週",
    thisMonth: "今月",
    thisYear: "今年",
    allTime: "全期間",
    totalCost: "総コスト",
    messages: "メッセージ数",
    inputTokens: "入力トークン",
    outputTokens: "出力トークン",
    cachedTokens: "キャッシュトークン",
    cacheRead: "キャッシュ読取",
    cacheWrite: "キャッシュ書込",
    tokens: "トークン",
    cost: "コスト",
    activityHeatmap: "アクティビティヒートマップ",
    activityHeatmapDesc: "過去1年間のチャットアクティビティ",
    messagesInPeriod: "件のメッセージ",
    tokensInPeriod: "トークン（過去1年間）",
    costOverTime: "コスト推移",
    costOverTimeDesc: "選択期間の支出を追跡",
    byProvider: "プロバイダー別使用量",
    byProviderDesc: "AIプロバイダー別のコスト内訳",
    byModel: "モデル別使用量",
    byModelDesc: "コスト上位10モデル",
    detailedStats: "詳細統計",
    detailedStatsDesc: "モデル別の使用量詳細",
    model: "モデル",
    provider: "プロバイダー",
    noData: "使用データなし",
    noDataDesc: "チャットを開始すると使用統計が表示されます",
    migratingData: "使用データを最適化しています...",
    migrationFailed: "使用データの最適化に失敗しました",
    includedInPlan: "プラン内",
    includedInPlanHint: "このプランはトークン単位ではなくサブスクリプションで課金されるため、合計には含まれません。",
    noPricingHint: "このモデルの単価が不明なため、トークンは合計に含まれていません。プロバイダー設定のモデルオプションで単価を設定できます。",
    includedModelsNote: "プラン内 {{count}}",
    unpricedModelsNote: "単価なし {{count}}"
  },
  rtk: {
    title: "トークン節約",
    overview: "RTK 圧縮概要",
    overviewDesc: "RTK コマンド出力圧縮によるトークン節約統計",
    tokensSaved: "節約トークン",
    commands: "コマンド数",
    avgSavings: "平均節約率",
    inputTokens: "入力トークン",
    outputTokens: "出力トークン",
    avgTime: "平均時間",
    dailySavings: "日別節約",
    dailySavingsDesc: "過去30日間の日別トークン節約量",
    byCommand: "コマンド別統計",
    byCommandDesc: "トークン節約量が多いコマンドのランキング",
    recentCommands: "最近のコマンド",
    recentCommandsDesc: "RTK で圧縮された最近のコマンド実行履歴",
    time: "時刻",
    command: "コマンド",
    saved: "節約",
    reduction: "圧縮率",
    noData: "節約データがありません",
    noDataDesc: "Alma がコマンドを実行すると、RTK が自動的にツール出力を圧縮します。会話を開始すると、節約データがここに表示されます。",
    ptcTitle: "プログラム的ツール呼び出し",
    ptcDesc: "run_script がサンドボックス内でツール結果を処理し、モデルのコンテキストに入らずに節約したトークン",
    ptcTokensSaved: "節約トークン",
    ptcRuns: "スクリプト実行回数",
    ptcToolCalls: "ツール呼び出し回数",
    ptcResultTokens: "処理済み結果"
  },
  security: {
    title: "セキュリティ",
    sandbox: "コマンドサンドボックス",
    sandboxEnabled: "シェルコマンドサンドボックスを有効化",
    sandboxEnabledDesc: "シェルコマンドを制限された環境で実行し、機密ファイルやネットワークへのアクセスを制限します。悪意のあるコマンドが機密データにアクセスすることを防ぎます。",
    dataEncryption: "データ暗号化",
    encryptApiKeysStorageDesc: "ローカル暗号化アルゴリズムを使用してAPIキーと機密設定情報を保護",
    accessControl: "アクセス制御",
    enableApplicationPasswordProtection: "アプリケーションパスワード保護を有効化",
    enableApplicationPasswordProtectionDesc: "アプリケーション起動時にパスワード認証が必要",
    changePassword: "パスワードを変更",
    sessionTimeout: "セッションタイムアウト",
    minutes: "分",
    sessionTimeoutDesc: "この非アクティブ時間後にアプリケーションが自動的にロックされます",
    loggingAndAudit: "ログ記録と監査",
    logLevel: "ログレベル",
    error: "エラー",
    warn: "警告",
    info: "情報",
    debug: "デバッグ",
    logLevelDesc: "問題の特定に役立つアプリケーション操作とエラー情報を記録",
    sessionManagement: "セッション管理",
    currentSession: "現在のセッション",
    lastActivity: "最終アクティビティ：たった今",
    clearAllSessions: "すべてのセッションをクリア",
    privacySettings: "プライバシー設定",
    privacyCommitment: "Almaはプライバシー保護を重視しています。以下は私たちのプライバシーへの取り組みです：",
    localDataStorage: "すべてのデータはローカルデバイスに保存されます",
    encryptedApiKeys: "APIキーと機密情報は暗号化保護されます",
    noChatDataCollection: "チャット内容の収集やアップロードは行いません",
    dataExportDelete: "いつでもすべてのデータをエクスポートまたは削除できます",
    viewPrivacyPolicy: "完全なプライバシーポリシーを表示",
    currentPasswordPrompt: "現在のパスワードを入力：",
    newPasswordPrompt: "新しいパスワードを入力：",
    confirmPasswordPrompt: "新しいパスワードを確認：",
    passwordsNotMatch: "パスワードが一致しません",
    passwordUpdateNotImplemented: "パスワード更新機能は実装待ちです",
    clearSessionConfirm: "すべてのログインセッションをクリアしますか？再ログインが必要になります。",
    clearSessionNotImplemented: "セッションクリア機能は実装待ちです"
  },
  keybindings: {
    title: "キーバインド",
    shortcuts: "ショートカット",
    resetAll: "すべてリセット",
    none: "なし",
    clear: "ショートカットを削除",
    resetToDefault: "デフォルトにリセット",
    newChatThread: {
      label: "新しいチャット",
      description: "新しいチャットスレッドを作成"
    },
    sendMessage: {
      label: "メッセージ送信",
      description: "現在のメッセージを送信"
    },
    openSettings: {
      label: "設定を開く",
      description: "設定ウィンドウを開く"
    },
    toggleSidebar: {
      label: "サイドバー切替",
      description: "サイドバーの表示/非表示を切り替え"
    },
    toggleWhisper: {
      label: "音声入力切替",
      description: "音声録音の開始/停止を切り替え"
    },
    nextThread: {
      label: "次のスレッド",
      description: "次のチャットスレッドに切り替え"
    },
    previousThread: {
      label: "前のスレッド",
      description: "前のチャットスレッドに切り替え"
    },
    goBack: {
      label: "戻る",
      description: "履歴の前のページへ戻る"
    },
    goForward: {
      label: "進む",
      description: "履歴の次のページへ進む"
    },
    pressKeys: "キーを押してください...",
    clickToRecord: "クリックして記録",
    resetKeybindingConfirm: "すべてのキーバインドをデフォルト値にリセットしますか？",
    tips: {
      title: "ヒント",
      clickField: "キーバインドフィールドをクリックして必要なキー組み合わせを押してください",
      useModifiers: "macOSではCmd (⌘)、Windows/LinuxではCtrlをシステムショートカットに使用",
      escapeToCancel: "記録中にEscapeを押すとキャンセル",
      backspaceToClear: "記録中にBackspaceまたはDeleteを押すとショートカットを削除",
      systemShortcuts: "一部のシステムショートカットは利用できないか上書きされる場合があります"
    }
  },
  advanced: {
    title: "高度",
    experimentalFeatures: "実験的機能",
    experimentalFeaturesWarning: "⚠️ 実験的機能は不安定な場合があります。使用前に重要なデータをバックアップしてください",
    enableExperimentalFeatures: "実験的機能を有効化",
    enableExperimentalFeaturesDesc: "開発中の新機能を有効化します。バグや不安定要素が含まれる可能性があります",
    developerOptions: "開発者オプション",
    debugMode: "デバッグモード",
    debugModeDesc: "詳細なログ出力とエラーメッセージ表示を有効化",
    developerMode: "開発者モード",
    developerModeDesc: "開発者専用機能とデバッグツールを有効化",
    openDevTools: "開発者ツールを開く",
    customStyles: "カスタムスタイル",
    customCss: "カスタムCSS",
    customCssPlaceholder: "/* ここにカスタムCSSスタイルを追加 */\n.chat-message {\n  font-size: 14px;\n}",
    customCssDesc: "アプリケーションの外観をカスタマイズするためのカスタムCSSを追加",
    customJs: "カスタムJavaScript",
    customJsPlaceholder: "// ここにカスタムJavaScriptコードを追加\n// 注意して使用してください。間違ったコードはアプリケーションエラーの原因となります\nconsole.log('カスタムスクリプトが読み込まれました');",
    customJsDesc: "アプリケーション機能を拡張するカスタムJavaScriptを追加（上級ユーザー向け）",
    customJsWarning: "⚠️ カスタムJavaScriptはセキュリティリスクを伴う可能性があります。信頼できるソースからのコードであることを確認してください",
    applicationManagement: "アプリケーション管理",
    restartApplication: "アプリケーションを再起動",
    resetApplicationData: "アプリケーションデータをリセット",
    applicationInfo: "アプリケーション情報",
    version: "バージョン：0.0.1",
    buildTime: "ビルド時間：",
    electron: "Electron：30.0.1",
    nodejs: "Node.js：",
    chrome: "Chrome：",
    unknown: "不明",
    performanceMonitoring: "パフォーマンス監視",
    memoryUsage: "メモリ使用量",
    runtime: "実行時間",
    runtimeMinutes: "分",
    viewDetailedPerformanceReport: "詳細なパフォーマンスレポートを表示",
    restartConfirm: "アプリケーションを再起動しますか？未保存のデータが失われる可能性があります。",
    resetDataConfirm: "アプリケーションデータをリセットしますか？すべての設定とキャッシュがクリアされますが、プロバイダー設定とチャット履歴は保持されます。",
    devToolsNotImplemented: "開発者ツール機能は実装待ちです"
  },
  whisper: {
    title: "音声",
    description: "ローカルWhisperモデルを使用して音声テキスト入力を有効化",
    enableWhisper: "音声入力を有効化",
    enableWhisperDesc: "有効にすると、マイクボタンをクリックしてチャットで音声入力を使用できます。",
    modelSelection: "モデル設定",
    selectedModel: "使用中のモデル",
    selectModel: "モデルを選択",
    noModelsDownloaded: "モデルがダウンロードされていません",
    downloadModelFirst: "音声入力を有効にするには、少なくとも1つのモデルをダウンロードしてください。",
    language: "認識言語",
    languageDesc: "音声認識の言語を選択します。複数の言語を話す場合は「自動検出」を選択してください。",
    availableModels: "利用可能なモデル",
    availableModelsDesc: "ローカル音声認識用のWhisperモデルをダウンロードします。大きいモデルはより正確ですが、より多くのストレージと処理能力が必要です。",
    download: "ダウンロード",
    deleteConfirm: "このモデルを削除してもよろしいですか？",
    remaining: "残り",
    calculating: "計算中..."
  },
  mcp: {
    title: "MCPサーバー",
    description: "モデルコンテキストプロトコル（MCP）サーバーを管理してAI機能を拡張",
    marketplace: "マーケットプレイス",
    installed: "インストール済み",
    searchPlaceholder: "MCPサーバーを検索...",
    allCategories: "すべてのカテゴリ",
    noServersFound: "MCPサーバーが見つかりません",
    fetchError: "MCPマーケットプレイスの取得に失敗しました",
    verified: "認証済み",
    featured: "注目",
    by: "作者",
    viewDocs: "ドキュメントを見る",
    install: "インストール",
    installing: "インストール中...",
    installServer: "MCPサーバーをインストール",
    installationMethod: "インストール方法",
    prerequisites: "前提条件",
    installMode: "インストールモード",
    agentInstall: "エージェントインストール",
    manualInstall: "手動インストール",
    agentInstallDesc: "AIエージェントが自動的にインストールを処理します。前提条件を確認し、すべてを設定します。",
    manualInstallDesc: "サーバー設定を直接追加します。前提条件がインストールされていることを確認してください。",
    requiredParams: "必須パラメータ",
    optionalParams: "オプションパラメータ",
    noServersInstalled: "MCPサーバーがインストールされていません",
    serversCount: "{{count}}個のサーバーがインストール済み",
    addServer: "サーバーを追加",
    noServersHint: "マーケットプレイスからサーバーをインストールするか、手動で追加してください",
    statusConnected: "接続済み",
    statusConnecting: "接続中",
    statusError: "エラー",
    statusDisconnected: "未接続",
    connect: "接続",
    deleteConfirmTitle: "MCPサーバーを削除",
    deleteConfirmDesc: "「{{name}}」を削除してもよろしいですか？この操作は元に戻せません。",
    editServer: "MCPサーバーを編集",
    editServerDesc: "サーバー設定を変更",
    addServerDesc: "カスタムMCPサーバー設定を追加",
    serverName: "サーバー名",
    serverNamePlaceholder: "マイMCPサーバー",
    serverDescription: "説明",
    serverDescriptionPlaceholder: "オプションの説明",
    command: "コマンド",
    commandHint: "MCPサーバーを起動するコマンド",
    "arguments": "引数",
    argumentsPlaceholder: "引数1 引数2 引数3",
    argumentsHint: "スペースで区切られたコマンド引数",
    envVars: "環境変数",
    envVarsHint: "1行に1つ、KEY=value形式で",
    transportType: "トランスポートタイプ",
    urlHint: "MCPサーバーのHTTPエンドポイントURL",
    remoteTransportType: "トランスポートプロトコル",
    remoteTransportHint: "Streamable HTTPを推奨します。Streamable HTTPをサポートしていないサーバーにはSSEを使用してください。",
    headers: "ヘッダー",
    headersHint: "HTTPヘッダーを「Key: Value」形式で、1行に1つ",
    requiredFieldsError: "名前とコマンド/URLは必須です",
    fromClipboard: "クリップボードから",
    invalidClipboardJson: "クリップボードのMCPサーバーJSONが無効です",
    oauth: {
      autoDetect: "OAuth 2.1 対応",
      autoDetectHint: "このサーバーがOAuth認証を必要とする場合、接続時に自動的に検出されます。",
      autoRedirectHint: "このサーバーがOAuthを必要とする場合、追加をクリックすると認可ページにリダイレクトされます。",
      requiresOAuth: "OAuthが必要",
      requiresOAuthHint: "このサーバーがOAuth 2.1認可を必要とする場合は有効にしてください",
      notAuthorizedYet: "まだ認可されていません",
      checking: "確認中...",
      authorizing: "認可中...",
      noAuth: "認証なし",
      noAuthHint: "このサーバーはOAuthを必要としないか、まだアクセスされていません",
      authorized: "認可済み",
      authorizedHint: "OAuth認可がアクティブです",
      expiresAt: "有効期限: {{date}}",
      scope: "スコープ",
      needsReauth: "再認可が必要",
      needsReauthHint: "トークンの有効期限が切れました。再認可が必要です",
      error: "認証エラー",
      notAuthorized: "未認可",
      notAuthorizedHint: "サーバーに接続してOAuth認可を開始してください",
      authorize: "認可",
      retry: "再試行",
      reauthorize: "再認可",
      revoke: "アクセスを取り消す",
      revokeConfirmTitle: "OAuthアクセスを取り消す",
      revokeConfirmDesc: '"{{name}}"のOAuthアクセスを取り消しますか？再接続時に再認可が必要になります。'
    },
    basicInformation: "基本情報",
    commandConfiguration: "コマンド設定",
    remoteConfiguration: "リモート設定",
    endpointUrlDesc: "MCP サーバーの HTTP エンドポイント URL",
    failedAddServer: "サーバーの追加に失敗",
    failedSave: "保存に失敗"
  },
  themeConfig: {
    title: "カラースキーム",
    "default": "デフォルト（内蔵）",
    darkModeTheme: "ダークモードテーマ",
    darkModeThemeDesc: "ダークモードのカラースキームを選択してください。「デフォルト」を選択すると内蔵テーマを使用します。",
    lightModeTheme: "ライトモードテーマ",
    lightModeThemeDesc: "ライトモードのカラースキームを選択してください。「デフォルト」を選択すると内蔵テーマを使用します。",
    darkThemes: "ダークテーマ",
    lightThemes: "ライトテーマ",
    searchPlaceholder: "テーマを検索...",
    noThemesFound: "一致するテーマが見つかりませんでした。",
    themeCount: "{{dark}}個のダークテーマ、{{light}}個のライトテーマ、{{custom}}個のカスタムテーマが利用可能",
    customThemes: "カスタムテーマ",
    customThemesDesc: "独自のカラースキームを作成・管理",
    createTheme: "テーマを作成",
    noCustomThemes: "カスタムテーマがありません。「テーマを作成」をクリックして始めましょう。",
    customDarkThemes: "カスタムダークテーマ",
    customLightThemes: "カスタムライトテーマ",
    pluginThemes: "プラグインテーマ",
    pluginThemesDesc: "インストールされたプラグインによって提供されるテーマ",
    pluginDarkThemes: "プラグインダークテーマ",
    pluginLightThemes: "プラグインライトテーマ",
    clearPluginTheme: "クリア",
    win98Trail: "ウィンドウ残像トレイル",
    win98TrailDesc: "Win98 名物のイースターエッグ：ウィンドウをドラッグすると固まったフレームの残像が積み重なります。"
  },
  themeEditor: {
    createTitle: "カスタムテーマを作成",
    createDescription: "30個のUI色と16個のシンタックスハイライト色を使って独自のカラースキームをデザインします。",
    editTitle: "カスタムテーマを編集",
    editDescription: "カスタムカラースキームを修正します。",
    name: "内部名",
    displayName: "表示名",
    type: "タイプ",
    dark: "ダーク",
    light: "ライト",
    cloneFrom: "クローン元",
    selectTheme: "クローンするテーマを選択...",
    darkThemes: "ダークテーマ",
    lightThemes: "ライトテーマ",
    uiColors: "UI色",
    syntaxColors: "シンタックス",
    "import": "インポート/エクスポート",
    preview: "プレビュー",
    groups: {
      backgrounds: "背景色",
      grays: "グレー・テキスト色",
      primary: "プライマリ色",
      ui: "UI要素色",
      base16Backgrounds: "背景グラデーション",
      base16Foregrounds: "前景グラデーション",
      base16Syntax: "シンタックス色"
    },
    importLua: "NvChad Luaからインポート",
    importPlaceholder: "NvChadテーマのLuaコードをここに貼り付け...",
    importButton: "インポート",
    importSuccess: "テーマのインポートに成功しました",
    importFailed: "テーマのインポートに失敗しました。形式を確認してください。",
    exportJSON: "JSONとしてエクスポート",
    exportDescription: "テーマ設定をJSONとしてクリップボードにコピーします。",
    copyJSON: "クリップボードにコピー",
    exportSuccess: "テーマをクリップボードにコピーしました",
    cloneSuccess: "{{name}}から色をクローンしました",
    nameRequired: "テーマ名を入力してください",
    displayNameRequired: "表示名を入力してください",
    saveFailed: "テーマの保存に失敗しました",
    createSuccess: "カスタムテーマを作成しました",
    updateSuccess: "カスタムテーマを更新しました",
    deleteSuccess: "カスタムテーマを削除しました",
    deleteTitle: "カスタムテーマを削除",
    deleteDescription: '"{{name}}"を削除しますか？この操作は取り消せません。',
    simpleMode: "シンプル",
    advancedMode: "詳細",
    simpleModeDesc: "4色を選ぶだけで、完全なテーマを自動生成します。",
    presets: "クイックスタートプリセット",
    presetApplied: "{{name}}プリセットを適用しました",
    backgroundColor: "背景色",
    backgroundColorDesc: "メイン背景色",
    foregroundColor: "文字色",
    foregroundColorDesc: "メインテキスト色",
    accentColor: "アクセント",
    accentColorDesc: "ボタン、リンク、ハイライト",
    secondaryColor: "セカンダリ",
    secondaryColorDesc: "成功状態、情報",
    switchToAdvanced: "詳細モードに切り替えて、各色を微調整できます。"
  },
  skills: {
    title: "スキル",
    description: "専門的なAI機能のためのClaudeスキルを管理",
    noSkills: "スキルが見つかりません",
    skillsCount: "{{count}}個のスキルが利用可能",
    refresh: "更新",
    openFolder: "フォルダを開く",
    noSkillsHint: "まだスキルがインストールされていません",
    addSkillsHint: "~/.config/alma/skills/にSKILL.mdフォルダを配置してスキルを追加",
    bundledSkills: "内蔵スキル",
    personalSkills: "個人スキル",
    claudeCodeSkills: "Claude Code スキル",
    agentsSkills: "Agent Skills",
    folders: {
      title: "他のツールのスキルフォルダ",
      description: "Alma はこれらのツール用にインストールしたスキルも読み込みます。オフにしたフォルダのスキルは Alma で読み込まれなくなります。フォルダ自体は変更されません。"
    },
    marketplaceSkills: "マーケットプレイススキル",
    projectSkills: "プロジェクトスキル",
    viewContent: "内容を表示",
    deleteConfirmTitle: "スキルを削除",
    deleteConfirmDesc: '"{{name}}"を削除してもよろしいですか？この操作は取り消せません。',
    searchPlaceholder: "名前、説明、パスでスキルを検索…（/ または ⌘F）",
    noResults: "一致するスキルがありません",
    extraction: {
      title: "自動スキル抽出",
      description: "長い会話から再利用可能なスキルを自動的に抽出",
      minToolCalls: "最小ツール呼び出し回数",
      minToolCallsHint: "ツール呼び出しがこの数未満の会話はスキップされます"
    }
  },
  hooks: {
    title: "フック",
    description: "ライフサイクルイベントで実行するシェルコマンドフックを設定します。フックはJSON設定ファイルとして保存され、簡単に編集できます。",
    noHooks: "フックが設定されていません",
    noHooksHint: "ライフサイクルイベントでシェルコマンドを実行するフックルールを追加してください。",
    addHooksHint: "~/.config/alma/hooks.jsonを編集するか、以下でフックを追加してください。",
    hooksCount: "{{count}}個のフックイベントが設定済み",
    addHookEvent: "フックイベントを追加",
    addRule: "ルールを追加",
    addCommand: "コマンドを追加",
    matcher: "マッチャー（正規表現）",
    matcherHint: "フックの発火条件をフィルタリングする正規表現",
    command: "コマンド",
    commandHint: "実行するシェルコマンド。stdinでJSONを受け取ります。",
    timeout: "タイムアウト（ミリ秒）",
    enabled: "有効",
    reload: "再読み込み",
    openFile: "設定を開く",
    deleteRule: "ルールを削除",
    deleteRuleConfirm: "このルールを削除しますか？",
    deleteRuleDesc: "ルールとそのすべてのコマンドが削除されます。",
    deleteCommand: "コマンドを削除",
    deleteCommandConfirm: "このコマンドを削除しますか？",
    deleteCommandDesc: "ルールからコマンドが削除されます。",
    selectEvent: "フックイベントを選択",
    protocol: "終了コード 0 = 許可、2 = ブロック。JSON stdout に decision、reason、updatedInput を含めることができます。",
    noCommands: "このルールにコマンドはありません",
    rules: "ルール",
    commands: "コマンド"
  },
  secrets: {
    title: "シークレット",
    description: "エージェントが使うサードパーティ API/サービスのトークンを暗号化して保存します。値は書き込み専用 — 環境変数としてエージェントのコマンドに注入され、出力からはマスクされます。ここからも API からも読み出せません。",
    empty: "シークレットはまだありません。",
    add: "シークレットを追加",
    name: "名前",
    namePlaceholder: "GH_TOKEN",
    nameHint: "環境変数スタイル：大文字・数字・アンダースコア。エージェントは $NAME で参照します。",
    value: "値",
    valuePlaceholder: "トークンを貼り付け…",
    note: "メモ",
    notePlaceholder: "用途（任意）",
    envInject: "エージェントのコマンドに注入",
    envInjectHint: "オンにすると、エージェントが実行するコマンドから $NAME で利用できます。",
    save: "保存",
    cancel: "キャンセル",
    update: "値を更新",
    "delete": "削除",
    deleteTitle: "シークレットを削除しますか？",
    deleteBody: "{{name}} を削除します。${{name}} に依存するコマンドは動かなくなります。",
    unencrypted: "OS レベルの暗号化なしで保存されています（safeStorage が利用不可）。",
    envOn: "注入：オン",
    envOff: "注入：オフ",
    saved: "保存しました",
    deleted: "削除しました",
    cliHint: "CLI：alma secret set <NAME>（値は stdin から）· alma secret list · alma secret rm <NAME>"
  },
  imageGen: {
    title: "画像生成",
    model: "モデル",
    auto: "自動",
    loading: "利用可能なモデルを読み込み中…",
    noProvider: "利用可能な画像モデルがありません。「プロバイダー」でいずれかのプロバイダーに画像モデル（Gemini・GPT Image・DALL·E・Flux…）を有効化してください。",
    loadError: "画像モデルの読み込みに失敗しました。",
    unavailable: "設定したモデルは現在利用できません：",
    description: "画像生成スキル（alma image generate / edit）が使うモデル。Gemini と OpenAI 互換プロバイダー（GPT Image・DALL·E…）に対応。会話で別のモデルを指定しない限り、ここで選んだモデルがそのまま使われます。「自動」は有効化済みのモデルから Alma が選びます。",
    aspectRatio: "アスペクト比",
    aspectRatioDescription: "生成画像のデフォルトの縦横比。入力欄からも変更できます。"
  },
  translateTo: {
    title: "翻訳先",
    description: "選択したテキストの「翻訳」で訳す言語です。文字体系が異なるテキストに翻訳ボタンが表示されます。",
    auto: "表示言語に合わせる"
  },
  windowsShell: {
    title: "Windows シェル",
    description: "Bash ツールがコマンド実行に使うシェル。Auto は Git Bash があればそれを、なければ PowerShell を使います。PowerShell は PowerShell 7（pwsh）がインストールされていればそれを、なければ内蔵の Windows PowerShell 5.1 を使います。",
    auto: "自動（Git Bash 優先）",
    gitbash: "Git Bash",
    powershell: "PowerShell（7 があれば優先）"
  },
  computerUse: {
    never: "なし",
    justNow: "たった今",
    minutesAgo: "{{n}} 分前",
    hoursAgo: "{{n}} 時間前",
    daysAgo: "{{n}} 日前",
    helperNotFound: "✗ ヘルパーバイナリが見つかりません。`pnpm build:computer-use` を実行してください。",
    helperAlive: "✓ ヘルパー v{{version}} 稼働中（稼働 {{uptime}} 秒）",
    axGranted: "✓ アクセシビリティ権限が付与済み",
    axMissing: "✗ アクセシビリティ権限がありません",
    srGranted: "✓ 画面収録権限が付与済み",
    srMissing: "✗ 画面収録権限がありません",
    title: "Computer Use",
    desc1: "Alma がフォーカスを奪わずにネイティブ Mac アプリをバックグラウンドで操作できます。署名済みヘルパー（",
    desc2: "）と macOS の権限が必要です。",
    helperSection: "ヘルパー",
    helperPathMissing: "（見つかりません——`pnpm build:computer-use` を実行）",
    permissionsSection: "権限",
    accessibility: "アクセシビリティ",
    screenRecording: "画面収録",
    focusGuardTitle: "フォーカス保護が有効ではありません",
    focusGuardBody: "作業中にアプリが最前面ウィンドウを奪うのを防ぐガードを有効化できませんでした。通常はヘルパーにアクセシビリティ権限を再付与する必要があります——macOS はビルドごとにリセットします。上で再付与してから再試行してください。",
    triggerAxDialog: "AX ダイアログを表示",
    testMySetup: "セットアップをテスト",
    strictTitle: "アプリごとの厳格な承認",
    strictDesc: "オンにすると、下で明示的に承認するまで新しいアプリをブロックします。オフの場合は初回使用時に自動承認されます（後で取り消し可能）。",
    actionLogTitle: "操作ログを記録",
    actionLogDesc: "デバッグ用に Computer Use の全操作（ツール、アプリ、引数、時間）をローカルに記録します。Mac の外には出ません。",
    pipTitle: "ピクチャーインピクチャー",
    pipDesc: "Alma がデスクトップを操作する間、画面をミラーするフローティングパネル。他のアプリで作業中でもどの Space からでも様子を見られます。",
    approvedApps: "承認済みアプリ",
    noApprovedApps: "承認済みアプリはまだありません。Alma が初めてアプリを操作するとここに表示されます（厳格モードでなければ自動承認）。",
    usedLast: "{{count}} 回使用 · 最終 {{last}}",
    revoke: "取り消し",
    revokeTitle: "承認を取り消しますか？",
    revokeDesc1: "Alma は ",
    revokeDesc2: " を再承認するまで操作できなくなります。"
  },
  activityRecorder: {
    justNow: "たった今",
    minutesAgo: "{{n}} 分前",
    hoursAgo: "{{n}} 時間前",
    daysAgo: "{{n}} 日前",
    title: "アクティビティレコーダー",
    recording: "記録中",
    screenLocked: "画面ロック中",
    desc: "スクリーンショットを静かに取得して OCR し、入力イベントを追跡します。「さっき何をしてた？」に Chat が答えられるように。データは端末外に出ません。",
    statSessions: "セッション",
    statSnapshots: "スナップショット",
    statCurrentSession: "現在のセッション",
    statFrontApp: "最前面のアプリ",
    active: "アクティブ",
    idle: "アイドル",
    storageUsedLabel: "使用ストレージ：",
    storageUsedOf: "/ {{max}}（{{pct}}%）",
    autoDeleteHint: "上限超過の古いスナップショットは自動削除",
    macosPermissions: "macOS の権限",
    screenRecording: "画面収録",
    accessibilityLabel: "アクセシビリティ（グローバルキーボード/マウス用）",
    granted: "付与済み",
    notGranted: "未付与",
    captureSection: "キャプチャ",
    snapshotDebounceLabel: "スナップショットのデバウンス（ms）",
    snapshotDebounceHint: "キャプチャ間の最小間隔",
    heartbeatIntervalLabel: "ハートビート間隔（ms）",
    heartbeatIntervalHint: "アイドル時でもこの間隔で強制キャプチャ",
    idleThresholdLabel: "アイドルしきい値（ms）",
    idleThresholdHint: "この時間入力がなければセッションを終了",
    typingPauseLabel: "タイピング停止（ms）",
    typingPauseHint: "キー入力が N ms ない場合にキャプチャ",
    visualPollLabel: "画面変化ポーリング（ms）",
    visualPollHint: "入力なしでアニメ/動画を検出（0 = オフ）",
    jpegQualityLabel: "JPEG 品質",
    jpegQualityHint: "1–100。低いほどファイルが小さい",
    ocrInputSection: "OCR と入力",
    runOcrLabel: "各スナップショットに Vision OCR を実行",
    runOcrHint: "macOS のみ。キーワード検索とセマンティック検索に使われます。",
    inputMonitorLabel: "グローバルキーボード＆マウス監視",
    inputMonitorHint: "クリック/キー入力を記録します。アクセシビリティ権限が必要です。",
    ocrLanguagesLabel: "OCR 言語（Vision コード、カンマ区切り）",
    ocrEveryNLabel: "N 枚ごとに OCR",
    ocrEveryNHint: "1 = 毎回、5 = 5 枚に 1 回。長いセッションでの DB 負荷を軽減。",
    sensitiveAppsSection: "機密アプリ（キャプチャしない）",
    sensitiveAppsHint: "1 行につき 1 つの bundle ID。これらが最前面の間はキャプチャしません。",
    storageQuotaSection: "ストレージ上限",
    maxStorageLabel: "最大ストレージ（MB)",
    maxStorageHint: "上限を超えると最古のスナップショットから削除。10240 = 10 GB。",
    outputDirectory: "出力ディレクトリ",
    tieringHint: "古いスナップショットは階層移動時に再エンコード（warm ≈1280×720 q40、cold ≈640×360 q30）され、10 GB で数日ではなく数週間分を保持できます。",
    recentSessions: "最近のセッション",
    sessionFallback: "セッション",
    sessionMeta: "{{when}} · {{duration}} · スナップショット {{snapshots}} · イベント {{events}}",
    dangerZone: "危険な操作",
    dangerZoneHint: "記録された全アクティビティ（セッション、スクリーンショット、OCR テキスト、埋め込み）を削除します。元に戻せません。",
    clearAllData: "全アクティビティデータを消去",
    deleteAllTitle: "全アクティビティデータを削除しますか？",
    deleteAllDesc: "{{count}} 件のセッションとそのイベント、スクリーンショット、OCR テキスト、埋め込みをすべて削除します。レコーダー自体の設定は残ります。元に戻せません。",
    deleteEverything: "すべて削除",
    runningFooter: "稼働中 · ほとんどの設定は即時反映。セッション/アイドルタイマーの変更は次のセッションから有効。",
    openSystemSettings: "システム設定を開く"
  },
  copilot: {
    failedGetDeviceCode: "デバイスコードの取得に失敗",
    failedStartAuth: "認証の開始に失敗",
    failedSaveToken: "トークンの保存に失敗",
    failedGetAccessToken: "アクセストークンの取得に失敗",
    failedCompleteAuth: "認証の完了に失敗",
    addAnotherAccount: "別の GitHub アカウントを追加",
    connectAccount: "GitHub アカウントを接続",
    gettingCode: "認証コードを取得中...",
    step1: "ステップ 1：このコードをコピー",
    requiredBadge: "必須",
    step2: "ステップ 2：GitHub を開いてコードを貼り付け",
    openVerificationPage: "GitHub 認証ページを開く",
    step3: "ステップ 3：認証後にここをクリック",
    finalStepBadge: "最終ステップ",
    authorizedButton: "GitHub で認証しました",
    completingAuth: "認証を完了中...",
    authError: "認証中にエラーが発生しました",
    tryAgain: "再試行",
    checkingAuth: "認証状態を確認中...",
    authenticated: "認証済み",
    signedInAs: "@{{username}} としてログイン中",
    "switch": "切替",
    addAccount: "アカウントを追加",
    disconnect: "接続解除",
    switchAccount: "GitHub アカウントを切替",
    active: "使用中",
    connectedFooter: "GitHub Copilot サブスクリプションが接続されました。チャットで Copilot モデルを利用できます。",
    accountsAvailable: "（利用可能なアカウント {{count}} 件）",
    authTitle: "GitHub Copilot 認証",
    authDesc: "GitHub アカウントを接続して Copilot サブスクリプション経由でモデルを利用します。有効な GitHub Copilot サブスクリプションが必要です。",
    useExistingAccount: "既存のアカウントを使用",
    use: "使用",
    or: "または",
    connectAnotherAccountTitle: "別の GitHub アカウントを接続",
    connectAccountTitle: "GitHub アカウントを接続"
  },
  appshots: {
    hintDoubleCommand: "両方の ⌘ キーを同時に押すか、⌘ をすばやく 2 回タップ",
    hintDoubleOption: "両方の ⌥ キーを同時に押すか、⌥ をすばやく 2 回タップ",
    hintDoubleShift: "両方の ⇧ キーを同時に押すか、⇧ をすばやく 2 回タップ",
    hintBothCommand: "左右の ⌘ キーを同時に押します。2 回タップでは起動しません",
    hintBothOption: "左右の ⌥ キーを同時に押します。2 回タップでは起動しません",
    hintBothShift: "左右の ⇧ キーを同時に押します。2 回タップでは起動しません",
    togetherOnly: "（同時押しのみ）",
    helperUnreachable: "Computer Use ヘルパーに接続できません：{{error}}",
    none: "なし",
    heroTitle: "Appshot で最前面のウィンドウを Alma に見せる",
    heroDesc1: "Appshot は最前面のウィンドウ（表示ピクセルとアクセシビリティテキスト）をキャプチャしてチャット入力欄に添付します。どのアプリからでも、",
    heroDescStrong: "両方の ⌘ キーを同時に押す",
    heroDesc2: "か修飾キーをすばやく 2 回タップします。Alma がスナップショット付きで前面に出ます。AX テキストはメッセージに不可視で同乗し、モデルは完全なウィンドウコンテキストを見られます。",
    unsupportedNotice: "Appshot には macOS と、アクセシビリティ + 画面収録権限を持つ Alma Computer Use ヘルパーが必要です。Computer Use 設定で権限を付与してからホットキーを設定してください。",
    hotkey: "ホットキー",
    noHotkey: "ホットキー未設定——Appshot はオフです。",
    warmingUp: "Computer Use ヘルパーを起動中…",
    openAccessibilitySettings: "アクセシビリティ設定を開く",
    whereItLands: "スナップショットの送り先",
    currentThread: "現在のスレッド",
    newThread: "新しいスレッド",
    whereDesc1: "（デフォルト）は開いているチャットに Appshot を投入し、見ているウィンドウについて会話を続けられます。",
    whereDesc2: "は常に Appshot 用の新しいチャットを開きます——Codex 風の専用ホットキーウィンドウの挙動です。",
    testIt: "テスト",
    testItDesc: "ホットキーを無視して、Alma が最前面と判断したウィンドウをキャプチャします。権限の確認に便利です。",
    captureNow: "今すぐキャプチャ"
  },
  channelBindings: {
    title: "チャンネルとワークスペースのバインド",
    desc: "チャンネル/チャットを特定のワークスペースにバインドし、ツール（Bash、Read、Write）を正しいプロジェクトディレクトリで実行します。未バインドはグローバルデフォルトを使用。",
    searchChannel: "{{label}} を検索...",
    noChannelsFound: "チャンネルが見つかりません。下に ID を手入力してください。",
    typeIdManually: "または ID を手入力...",
    workspace: "ワークスペース",
    selectWorkspace: "ワークスペースを選択..."
  },
  readAloud: {
    voiceChinese: "中国語",
    voiceEnglish: "英語",
    title: "読み上げ（オンデバイス）",
    desc: "プライベートなオンデバイス音声が返信と通知を読み上げます。初回オン時に音声（約 160–320 MB）をダウンロードします。下で事前ダウンロードと試聴も可能。",
    notAvailable: "このプラットフォームではオンデバイス音声を利用できません。",
    autoReadReplies: "チャット返信を自動読み上げ",
    autoReadRepliesDesc: "アシスタントの返信完了時に読み上げます。",
    readNotifications: "通知を読み上げ",
    readNotificationsDesc: "バックグラウンド通知の到着時に読み上げます。",
    voices: "音声",
    starting: "開始中…",
    preparingVoice: "初回使用のため音声を準備中…",
    downloadOf: "{{downloaded}} / {{total}}",
    installed: "インストール済み",
    notInstalled: "未インストール",
    loading: "読み込み中…",
    test: "テスト",
    removeVoice: "この音声を削除",
    download: "ダウンロード"
  },
  chatUi: {
    enableStreamingSoundEffects: "ストリーミング効果音を有効化",
    streamingSoundEffectsDesc: "AI 応答のストリーミング中に合成音を再生",
    soundPreset: "サウンドプリセット",
    presetClassicDesc: "温かい三角波とやわらかなリバーブ",
    presetEtherealDesc: "柔らかなサイン波と広がりのある空気感",
    presetDigitalDesc: "クリアな矩形波とミニマルなエフェクト",
    presetRetroDesc: "ノスタルジックなノコギリ波と温かいフィルター",
    presetHint: "プリセットを選んで「{{preview}}」をクリックすると試聴できます",
    volumeLabel: "音量：{{volume}}%",
    adjustSynthVolume: "シンセ音量を調整"
  },
  iosConnection: {
    bridgeUnavailable: "ネイティブ設定ブリッジが利用できません — iOS アプリですか？",
    backendTitle: "バックエンド",
    localTitle: "この この端末のみ",
    localDesc: "チャットと API キーはこの端末に保存されます。オフラインでも使え、Mac は不要です。",
    remoteTitle: "あなたの Mac（リレー経由）",
    remoteDesc: "Mac で動く Alma をどこからでも操作：ターミナル、Computer Use、ローカル MCP サーバー、ファイル。",
    statusTitle: "状態",
    reconnect: "再接続",
    pairTitle: "Mac とペアリング",
    step1: "Mac で「設定 → リモートアクセス」を開き、リレーをオンにします。",
    step2: "「カメラ」をそこに表示された QR コードに向け、上部の Alma バナーをタップします。",
    pasteLabel: "または Mac のペアリングリンクを貼り付け",
    pastePlaceholder: "alma://connect?…",
    paste: "ペースト",
    connect: "接続",
    connecting: "接続中…",
    invalidLink: "Alma のペアリングリンクやアドレスではないようです。",
    unreachable: "{{host}} に到達できません。そこで Alma は起動していますか？",
    lanHint: "同じ Wi‑Fi なら Mac の LAN アドレスでも接続できます（例: http://192.168.1.20:23001）。",
    onboardingTitle: "Mac とペアリング",
    onboardingDesc: "この端末 は Mac で動く Alma を操作します。一度ペアリングすれば、すべてリレー経由でエンドツーエンド暗号化されます。"
  },
  claudeSubscription: {
    tomorrowAt: "明日 {{time}}",
    failedStartAuth: "認可の開始に失敗",
    failedGetTokens: "トークンの取得に失敗",
    failedCompleteAuth: "認証の完了に失敗",
    checkingAuth: "認証状態を確認中...",
    authenticated: "認証済み",
    connectedFallback: "Claude Pro/Max に接続済み",
    logout: "ログアウト",
    usageQuota: "使用量クォータ",
    loadingQuota: "クォータを読み込み中...",
    fiveHour: "5 時間",
    sevenDay: "7 日間",
    opusSevenDay: "Opus 7 日間",
    sonnetSevenDay: "Sonnet 7 日間",
    resetsAt: "{{time}} にリセット",
    quotaLoadFailed: "クォータを読み込めません——使用量エンドポイントがレート制限中かもしれません。しばらくして更新してください。",
    authTitle: "Claude Pro/Max 認証",
    authDesc: "Anthropic アカウントを接続して Pro/Max サブスクリプション経由で Claude モデルを利用します。認可ページへ移動後、コードをここに貼り付けてください。",
    connectButton: "Claude Pro/Max に接続",
    enterCode: "認証コードを入力",
    stepBadge: "ステップ 2 / 2",
    enterCodeDesc: "ブラウザで認可した後、ページのコードをコピーして下に貼り付けてください。",
    codePlaceholder: "認証コードをここに貼り付け...",
    authError: "認証中にエラーが発生しました",
    tryAgain: "再試行"
  },
  themeUi: {
    basedOn: "ベース：{{name}}",
    pluginBadge: "プラグイン",
    byAuthor: "作者：{{author}}"
  },
  providerIcon: {
    defaultIcon: "デフォルトアイコン",
    searchIcons: "アイコンを検索…",
    loadingIcons: "アイコンを読み込み中…",
    noIconsFound: "アイコンが見つかりません"
  },
  networkUi: {
    hostPlaceholder: "例：127.0.0.1",
    portPlaceholder: "例：8080"
  },
  generalUi: {
    iconDefault: "デフォルト",
    iconAlt: "代替",
    injectScreenContext: "ライブ画面コンテキストを注入",
    injectScreenContextDesc: "QuickChat の各メッセージに画面の最新情報（最前面アプリ、ブラウザ URL、最新 OCR、直近の分析セッション）を含めます。アクティビティレコーダーの有効化が必要。",
    ambientMode: "アンビエント（クリック透過）モードで起動",
    ambientModeDesc: "QuickChat は表示されつつマウスイベントを無視し、フォーカスを奪わず作業の上に浮かびます。ショートカットで起こせます。"
  },
  people: {
    title: "人物プロファイル",
    description: "クロスプラットフォームの同一人物照合用プロファイルを管理します。各人物にプラットフォーム ID（Telegram、Discord、Feishu）と Markdown プロファイルを設定できます。",
    searchPlaceholder: "人物を検索...",
    addPerson: "人物を追加",
    newPerson: "新しい人物",
    loading: "読み込み中...",
    noSearchMatch: "検索に一致する人物がいません",
    noPeopleYet: "人物プロファイルはまだありません",
    deletePersonTitle: "人物を削除",
    deletePersonDescription: "「{{name}}」を削除しますか？プロファイルとアバターが削除されます。元に戻せません。",
    cancel: "キャンセル",
    "delete": "削除",
    edit: "編集",
    telegramId: "Telegram ID",
    discordId: "Discord ID",
    discordUsername: "Discord ユーザー名",
    feishuId: "Feishu ID",
    username: "ユーザー名",
    name: "名前",
    namePlaceholder: "人物名（ファイル名として使用）",
    telegramIdPlaceholder: "例：403000703",
    discordIdPlaceholder: "例：123456789",
    discordUsernamePlaceholder: "例：someone#1234",
    feishuIdPlaceholder: "例：ou_xxxxx",
    usernamePlaceholder: "例：someone",
    profileContent: "プロファイル内容",
    profileContentPlaceholder: "Markdown プロファイル内容...",
    avatar: "アバター",
    uploadImage: "画像をアップロード",
    removeAvatar: "アバターを削除",
    create: "作成",
    save: "保存"
  },
  weixin: {
    secondsAgo: "{{seconds}} 秒前",
    minutesAgo: "{{minutes}} 分前",
    hoursMinutesAgo: "{{hours}} 時間 {{minutes}} 分前",
    daysHoursAgo: "{{days}} 日 {{hours}} 時間前",
    enableBot: "WeChat ボットを有効化",
    enableBotDescription: "Alma を WeChat に接続してメッセージをやり取り",
    loggedIn: "ログイン済み",
    loggingOut: "ログアウト中...",
    logout: "ログアウト",
    scanQrHint: "WeChat で QR コードをスキャンしてログイン",
    qrCodeAlt: "WeChat QR コード",
    waitingForScan: "スキャン待ち...",
    qrExpired: "QR コードの期限切れ",
    refresh: "更新",
    generatingQr: "QR コードを生成中...",
    loading: "読み込み中...",
    retry: "再試行",
    showQrCode: "QR コードを表示",
    defaultModel: "デフォルトモデル",
    defaultModelDescription: "WeChat 会話用の AI モデル。未設定時はグローバルデフォルトを使用。",
    selectModelPlaceholder: "モデルを選択...",
    status: "ステータス",
    connection: "接続",
    running: "稼働中",
    stopped: "停止中",
    started: "開始",
    lastEvent: "最新イベント",
    noEventsYet: "イベントはまだありません",
    debugLogs: "デバッグログ",
    botLog: "ボットログ",
    bridgeLog: "ブリッジログ",
    conversationId: "会話 ID",
    conversationIdPlaceholder: "例：wxid_xxxxx"
  },
  chromeRelay: {
    regenerateConfirm: "認証トークンを再生成しますか？接続済みの拡張機能は新トークンへの更新が必要です。",
    connectionStatus: "接続状態",
    status: "ステータス",
    connected: "接続済み",
    disconnected: "未接続",
    attachedTabs: "接続中のタブ",
    authToken: "認証トークン",
    copied: "コピー済み",
    copy: "コピー",
    regenerate: "再生成",
    tokenDescription: "このトークンは Chrome 拡張と Alma の認証に使われます。秘密にしてください。",
    launchChrome: "Chrome を起動",
    launchDescription: "relay 拡張機能をプリロードした Chromium または Chrome for Testing を起動し、自動で接続します。Google Chrome 137 以降はこの方法に対応していないため、下の手動インストールを使ってください。",
    launchUnsupported: "Google Chrome はこの方法で拡張機能を読み込めなくなりました。下の手順で一度だけ手動インストール（パッケージ化されていない拡張機能を読み込む）してください。以後はそのまま残ります。",
    launchNotFound: "Chromium または Chrome for Testing が見つかりません。下の手順で拡張機能を手動インストールしてください。",
    launchFailed: "ブラウザを起動できませんでした。下の手順で拡張機能を手動インストールしてください。",
    closeChromeFirst: "事前にすべての Chrome ウィンドウを閉じることを推奨します。",
    launching: "起動中...",
    launchWithExtension: "拡張付きで Chrome を起動",
    manualInstall: "手動インストール",
    extensionPath: "拡張機能のパス",
    loading: "読み込み中...",
    steps: "手順",
    step1: "上の拡張パスをコピー",
    step2: "Chrome を開いて次へ移動：",
    step3Before: "有効化：",
    step3After: "（右上のトグル）",
    step4Before: "クリック：",
    step4After: "して拡張パスを貼り付け",
    step5: "拡張のポップアップを開き、上の認証トークンを入力",
    tab: "タブ {{id}}",
    none: "（なし）"
  },
  discord: {
    discordBot: "Discord ボット",
    enableBot: "Discord ボットを有効化",
    enableBotDescription: "Alma を Discord サーバーチャットに接続",
    botToken: "ボットトークン",
    createBotAt: "ボットの作成先：",
    enableIntentBefore: "Bot 設定で",
    enableIntentAfter: "インテントを有効化してください。",
    defaultModel: "デフォルトモデル",
    defaultModelDescription: "Discord 会話用の AI モデル。未設定時はチャットのデフォルトを使用。",
    selectModelPlaceholder: "モデルを選択...",
    accessControl: "アクセス制御",
    accessControlDescription: "Alma が応答できるサーバー/チャンネルを制限します。空欄で全許可。",
    allowedServerIds: "許可するサーバー ID",
    allowedServerIdsDescription: "これらのサーバーでのみ応答します。サーバーを右クリック → サーバー ID をコピー。",
    serverIdPlaceholder: "サーバー ID（例：123456789）",
    add: "追加",
    allowedChannelIds: "許可するチャンネル ID",
    allowedChannelIdsDescription: "これらのチャンネルでのみ応答します。チャンネルを右クリック → チャンネル ID をコピー。",
    channelIdPlaceholder: "チャンネル ID（例：987654321）",
    mentionOnlyMode: "メンション限定モード",
    mentionOnlyDescription: "@メンション、返信、DM のときのみ応答し、他は無視します。",
    setupGuide: "セットアップガイド",
    setupStep1Before: "次へ移動：",
    setupStep1After: "→ New Application",
    setupStep2: "Bot タブ → トークンをコピー → 上に貼り付け",
    setupStep3Before: "Bot → Privileged Gateway Intents で",
    setupStep3After: "を有効化",
    setupStep4Before: "OAuth2 → URL Generator →",
    setupStep4After: "スコープを選択",
    setupStep5: "権限を選択：Send Messages、Read Messages/View Channels、Attach Files、Add Reactions、Read Message History",
    setupStep6: "生成された URL を開いてボットをサーバーに招待",
    channelId: "チャンネル ID",
    bindingChannelPlaceholder: "例：987654321"
  },
  telegram: {
    noInactiveSessions: "非アクティブな Telegram セッションはありません。",
    scanFailed: "スキャンに失敗",
    deletedInactiveSessions: "{{num}} 件の非アクティブセッションを削除しました。",
    cleanupFailed: "クリーンアップに失敗",
    deleteByPatternConfirm: "タイトルに「{{pattern}}」を含むスレッドをすべて削除しますか？元に戻せません。",
    deletedThreadsWithSkipped: "{{num}} 件削除、{{skipped}} 件スキップ（使用中）。",
    deletedThreads: "{{num}} 件のスレッドを削除しました。",
    batchDeleteFailed: "一括削除に失敗",
    testMessageSent: "テストメッセージを送信しました！",
    sendFailed: "トークンは有効ですが送信に失敗：{{error}}",
    testFailed: "テストに失敗",
    connectionError: "接続エラー",
    foundUsers: "{{num}} 人のユーザーを検出",
    noUsersFound: "ユーザーが見つかりません。先にボットへメッセージを送ってから再試行してください。",
    detectionFailed: "検出に失敗",
    telegramBot: "Telegram ボット",
    enableBot: "Telegram ボットを有効化",
    enableBotDescription: "Alma を Telegram に接続してモバイルから利用",
    botToken: "ボットトークン",
    getTokenFrom: "トークンの取得先：",
    testing: "テスト中...",
    sendTestMessage: "テストメッセージを送信",
    allowedUserIds: "許可するユーザー ID",
    allowedUserIdsDescription: "これらのユーザーのみボットを利用できます。空欄で全員許可。先にボットへメッセージを送り、検出をクリックすると自動発見します。",
    userIdPlaceholder: "Telegram ユーザー ID",
    add: "追加",
    detecting: "検出中...",
    detect: "検出",
    detectedUsersHint: "検出されたユーザー（クリックで追加）：",
    defaultModel: "デフォルトモデル",
    defaultModelDescription: "Telegram 会話用の AI モデル。Telegram 経由の新規スレッドで使用されます。",
    selectModelPlaceholder: "モデルを選択...",
    chatId: "Chat ID",
    chatIdPlaceholder: "例：123456789",
    sessionCleanup: "セッションのクリーンアップ",
    sessionCleanupDescription: "残った Telegram スレッドを削除します。非アクティブセッションとは置き換え済みでどのチャットにも紐付かないスレッドです。",
    foundInactivePrefix: "非アクティブセッションが",
    foundInactiveSuffix: "件見つかりました。削除しますか？",
    "delete": "削除",
    cancel: "キャンセル",
    clearing: "消去中…",
    clearInactiveSessions: "非アクティブセッションを消去",
    batchDeleteByTitle: "タイトルで一括削除",
    batchDeleteDescription: "タイトルに下記テキストを含むスレッドをすべて削除します（例：「Telegram:」）。",
    patternPlaceholder: "例：Telegram:",
    deleteMatching: "一致項目を削除"
  },
  providersUi: {
    remoteSignIn: {
      title: "{{name}} にサインイン",
      description: "Alma はブラウザのないサーバーで動作しているため、このコンピューターでサインインしてください。",
      openStep: "サインインページを開いてサインイン",
      openButton: "サインインページを開く",
      copyLink: "リンクをコピー",
      copied: "コピーしました",
      copyFailed: "リンクをコピーできませんでした",
      pasteStep: "遷移先のアドレスを貼り付け",
      pasteHint: "サインイン後、ブラウザは {{host}} に移動し、接続できないページが表示されます。これは正常です。アドレスバーからそのページのアドレス全体をコピーして、ここに貼り付けてください。",
      finish: "サインインを完了",
      waiting: "サインインが完了すると Alma が自動的に接続します。"
    },
    versionHintBefore: "一部のプロバイダーは URL 末尾にバージョンパス（例：",
    versionHintAfter: "）が必要です。リクエスト失敗時は追加を試してください。",
    capVision: "画像認識",
    capVisionTooltip: "画像入力に対応",
    capImage: "画像生成",
    capImageTooltip: "画像を生成可能",
    capTools: "ツール",
    capToolsTooltip: "関数呼び出しに対応",
    capToolsXmlTooltip: "XML ミドルウェア経由で関数呼び出しに対応",
    capReasoning: "推論",
    capReasoningTooltip: "拡張思考/推論",
    capEmbedding: "埋め込み",
    capEmbeddingTooltip: "ベクトル生成用の埋め込みモデル",
    contextWindowTooltip: "{{tokens}} トークンのコンテキストウィンドウ",
    quotaResetNow: "今",
    unknownModel: "不明なモデル",
    manualBadge: "手動",
    providerOptionsTooltip: "プロバイダーオプション",
    searchModelsPlaceholder: "モデルを検索...",
    noModelFound: "モデルが見つかりません。",
    fetchModelsFailed: "モデルの取得に失敗",
    providerOptionsMustBeObject: "プロバイダーオプションは JSON オブジェクトである必要があります",
    invalidJson: "JSON 構文が無効です",
    customHeadersMustBeObject: "カスタムヘッダーは JSON オブジェクトである必要があります",
    invalidJsonHeaders: "カスタムヘッダーの JSON 構文が無効です",
    extraBodyMustBeObject: "Extra body は JSON オブジェクトである必要があります",
    invalidJsonExtraBody: "Extra body の JSON 構文が無効です",
    saveOptionsFailed: "オプションの保存に失敗",
    testFailed: "テストに失敗",
    customAcpShort: "カスタム ACP",
    addCustomAcpProvider: "カスタム ACP プロバイダーを追加",
    custom: "カスタム",
    addCustomProvider: "カスタムプロバイダーを追加",
    active: "有効",
    inactive: "無効",
    unknownError: "不明なエラー",
    enableProvider: "プロバイダーを有効化",
    baseUrl: "Base URL",
    asyncImageGeneration: "非同期画像生成",
    asyncImageGenerationHint: "ModelScope や ToAPIs のように、タスク ID を返して結果のポーリングが必要なプロバイダー向けです。",
    imageGenerationRequestMode: "画像生成リクエストモード",
    imageGenerationRequestModeHint: "このモデルではプロバイダーの既定値を上書きできます。",
    imageGenerationModeInherit: "プロバイダー設定に従う",
    imageGenerationModeSync: "同期",
    imageGenerationModeAsync: "非同期",
    ollamaBaseUrlHint: "空欄でデフォルトの Ollama エンドポイント（http://localhost:11434/v1）を使用",
    gettingStarted: "はじめに：",
    ollamaEnsureRunning: "Ollama がローカルにインストールされ稼働中であることを確認してください。",
    installLabel: "インストール：",
    pullModelLabel: "モデルを取得：",
    runLabel: "実行：",
    command: "コマンド",
    commandPlaceholder: "例：claude-code-acp、gemini、codex",
    cliCommandHint: "ACP エージェントを起動する CLI コマンド",
    argumentsLabel: "引数",
    argsPlaceholder: "例：--acp --experimental-acp",
    argsHint: "コマンドライン引数（スペース区切り）",
    authenticationMethod: "認証方式",
    selectAuthMethodPlaceholder: "認証方式を選択",
    noneSkipAuth: "なし（認証をスキップ）",
    selectAuthMethodHint: "この ACP エージェントの認証方式を選択",
    apiProvider: "API プロバイダー",
    selectApiProviderPlaceholder: "API プロバイダーを選択",
    noneUseAnthropicDirectly: "なし（claude login で Anthropic に直接接続）",
    usesProviderKeyClaudeCode: "Claude Code にこのプロバイダーの API キーと Base URL を使用",
    runClaudeLoginHint: "`claude login` を実行して Anthropic に直接認証",
    runAgyLoginHint: "ターミナルで一度 `agy` を実行し、Google アカウントでサインインしてください（Antigravity CLI：https://antigravity.google/cli）。Alma が起動する agy-acp アダプターはそのログインを再利用します。",
    agyTermsCaveat: "Google の FAQ では、サードパーティツール経由で Antigravity を利用すると利用規約に違反する可能性があるとされています。自己責任でご利用ください。",
    noCompatibleProvidersAnthropic: "互換プロバイダーが未設定です。先にプロバイダー（Anthropic、OpenAI、DeepSeek、OpenRouter など）を追加してください。",
    modelMapping: "モデルマッピング",
    mapClaudeTiers: "Claude のモデル階層を {{name}} モデルにマッピング",
    defaultModelLabel: "デフォルトモデル",
    selectDefaultModel: "デフォルトモデルを選択",
    opusModel: "Opus モデル",
    selectOpusModel: "Opus モデルを選択",
    sonnetModel: "Sonnet モデル",
    selectSonnetModel: "Sonnet モデルを選択",
    haikuModel: "Haiku モデル",
    selectHaikuModel: "Haiku モデルを選択",
    subagentModel: "サブエージェントモデル",
    selectSubagentModel: "サブエージェントモデルを選択",
    noneUseBuiltinAuth: "なし（組み込み認証を使用）",
    usesProviderKeyCodex: "Codex にこのプロバイダーの API キーと Base URL を使用",
    usesBuiltinCodexAuth: "Codex の組み込み認証方式を使用",
    noCompatibleProvidersOpenai: "互換プロバイダーが未設定です。先に OpenAI、OpenRouter などの OpenAI 互換プロバイダーを追加してください。",
    mcpServers: "MCP サーバー",
    disabledBadge: "無効",
    selectMcpServersHint: "ACP エージェントがアクセスできる MCP サーバーを選択",
    installation: "インストール：",
    installNoSetupBefore: "セットアップ不要——初回使用時に Alma が",
    installNoSetupAfter: "でエージェントを自動取得します。この初回ダウンロードを省くには CLI をグローバルインストール：",
    apiKey: "API キー",
    enterApiKeyPlaceholder: "API キーを入力",
    getApiKeyFrom: "API キーの取得先：",
    apiProxyEndpoint: "API プロキシエンドポイント（任意）",
    copilotProxyHint: "推論リクエスト専用。空欄でデフォルトの GitHub Copilot エンドポイントを使用。",
    baseUrlOptional: "Base URL（任意）",
    defaultEndpointHint: "空欄でデフォルトの {{name}} API エンドポイントを使用",
    apiHost: "API ホスト",
    azureEndpointHint: "Azure OpenAI リソースのエンドポイント URL",
    responseApi: "Response API",
    azureResponseApiHint: "Chat Completions API の代わりに Azure OpenAI Responses API を使用",
    apiVersion: "API バージョン",
    azureApiVersionHint: "空欄でデフォルト（2024-08-01-preview）を使用",
    zaiEndpointHint: "Z.AI Coding Plan エンドポイント（デフォルト：https://api.z.ai/api/coding/paas/v4）",
    kimiEndpointHint: "Kimi Coding Plan エンドポイント（デフォルト：https://api.kimi.com/coding/v1）",
    opencodeEndpointHint: "OpenCode Go サブスクリプションのエンドポイント。モデルプロトコルは自動選択。",
    accountId: "アカウント ID",
    findInDashboardHint: "Cloudflare ダッシュボード → AI → AI Gateway で確認",
    gatewayId: "ゲートウェイ ID",
    gatewayUrlAuto: "ゲートウェイ URL（自動生成）",
    gatewayUrlHint: "上の Account ID と Gateway ID から自動構築。プロバイダーのサフィックス（例：/openai）はモデルごとに自動付加。",
    deployments: "デプロイメント",
    models: "モデル",
    fetch: "取得",
    deploymentNamePlaceholder: "デプロイメント名（例：gpt-4o）",
    modelIdAcpPlaceholder: "モデル ID（例：opus、gpt-5-codex-low）",
    modelIdPlaceholder: "モデル ID（例：gpt-4o）",
    displayNamePlaceholder: "表示名（任意）",
    add: "追加",
    azureAddDeploymentsHint: "Azure OpenAI のデプロイメント名を追加",
    manualAddHint: "自動検出に失敗した場合はモデル ID を手動追加",
    searchDeploymentsPlaceholder: "デプロイメントを検索...",
    loadingModels: "モデルを読み込み中...",
    errorLabel: "エラー：",
    showingDeploymentsEnabledFirst: "{{num}} 件のデプロイメントを表示（有効を先頭に）",
    showingModelsEnabledFirst: "{{num}} 件のモデルを表示（有効を先頭に）",
    showingModelsEnabledShownFirst: "{{num}} 件のモデルを表示（有効なモデルを先に表示）",
    noModelsAvailable: "利用可能なモデルがありません",
    checkApiKeyHint: "API キーを確認して更新をお試しください",
    providerName: "プロバイダー名",
    providerNamePlaceholder: "プロバイダー名",
    icon: "アイコン",
    apiFormat: "API 形式",
    apiFormatHint: "プロバイダーが使う API エンドポイント形式を選択",
    useMaxCompletionTokens: "max_completion_tokens を使用",
    maxCompletionTokensHint: "max_tokens の代わりに max_completion_tokens が必要な新しい OpenAI モデル（o1、o3 など）で有効化",
    customHeadersJson: "カスタムヘッダー（JSON）",
    customHeadersHint: "各リクエストに付与する任意の HTTP ヘッダー（有効な JSON 形式）。",
    addModelsManuallyHint: "モデルを手動追加するか、取得ボタンで API から読み込み",
    fetchingModels: "モデルを取得中...",
    pluginBadge: "プラグイン",
    connected: "接続済み",
    notConnected: "未接続",
    loggedOutSuccess: "ログアウトしました",
    logoutFailed: "ログアウトに失敗",
    logout: "ログアウト",
    authSuccess: "認証に成功",
    authFailed: "認証に失敗",
    connecting: "接続中...",
    connect: "接続",
    connectedAccounts: "接続済みアカウント（{{num}}）",
    quotasRefreshed: "クォータを更新しました",
    refreshQuotasFailed: "クォータの更新に失敗",
    refreshQuotasTitle: "クォータを更新",
    accountAdded: "アカウントを追加しました",
    addAccountFailed: "アカウントの追加に失敗",
    adding: "追加中...",
    addAccount: "アカウントを追加",
    accountFallback: "アカウント {{id}}",
    quotaDetails: "クォータ詳細",
    rateLimited: "レート制限中",
    rateLimitResets: "（{{minutes}} 分後にリセット）",
    accountRemoved: "アカウントを削除しました",
    removeAccountFailed: "アカウントの削除に失敗",
    cannotRemoveOnlyAccount: "唯一のアカウントは削除できません。ログアウトで切断してください。",
    removeAccount: "アカウントを削除",
    availableModels: "利用可能なモデル",
    noModelsConnectFirst: "モデルがありません。先に接続すると表示されます。",
    pluginIdLabel: "プラグイン ID：",
    authTypeLabel: "認証タイプ：",
    myCustomProviderPlaceholder: "マイカスタムプロバイダー",
    iconPickHint: "このプロバイダーのブランドアイコンを選択。カスタムは * 付き。",
    cancel: "キャンセル",
    addProvider: "プロバイダーを追加",
    myCustomAcpProviderPlaceholder: "マイカスタム ACP プロバイダー",
    argumentsOptional: "引数（任意）",
    note: "注意：",
    acpNote: "ACP プロバイダーはローカル CLI プロセスを起動します。コマンドがインストール済みで PATH から実行できることを確認してください。作成後に MCP サーバーを設定できます。",
    modelOptions: "モデルオプション",
    configureOptionsFor: "オプション設定対象：",
    modelCapabilities: "モデル能力",
    resetToDefault: "デフォルトに戻す",
    overrideCapabilitiesHint: "このモデルの自動検出された能力を上書き",
    reasoningLevels: "思考レベル",
    reasoningLevelsHint: "このモデルの API が受け付けるレベルを選びます。推論メニューにはこれらだけが表示されます。",
    reasoningLevelsMapping: "選ばなかったレベルの送信先：",
    imageOutput: "画像出力",
    toolCalling: "ツール呼び出し",
    autoSuffix: "（自動）",
    contextWindow: "コンテキストウィンドウ",
    autoValue: "自動：{{value}}",
    maxOutputTokens: "最大出力トークン",
    pricing: "単価",
    pricingUnit: "USD / 100万トークン",
    pricing_input: "入力",
    pricing_output: "出力",
    pricing_cacheRead: "キャッシュ読み取り",
    pricing_cacheWrite: "キャッシュ書き込み",
    pricingUnknown: "不明",
    providerOptionsJson: "プロバイダーオプション（JSON）",
    exampleLabel: "例：",
    disableReasoningExampleHint: "doubao-seed-1.8 などのモデルで推論を無効化",
    perModelHeadersHint: "このモデルのリクエストのみに付与——プロバイダーレベルのカスタムヘッダーとマージ（同名キーはこちらが優先）。",
    extraBodyJson: "Extra Body（JSON）",
    extraBodyExampleBefore: "このモデルの全リクエストボディにマージされます。例：",
    or: "または",
    extraBodyExampleAfter: "で推論モデルの <think> 出力をオフにできます。",
    save: "保存",
    acpAuth: {
      googleAccount: "Google アカウント",
      googleAccountDesc: "Google アカウントでログイン",
      geminiApiKey: "Gemini API キー",
      geminiApiKeyDesc: "GEMINI_API_KEY 環境変数が必要",
      chatgptLogin: "ChatGPT ログイン",
      chatgptLoginDesc: "ChatGPT ログインを使用（有料サブスクリプションが必要）",
      codexApiKey: "Codex API キー",
      codexApiKeyDesc: "CODEX_API_KEY 環境変数が必要",
      openaiApiKey: "OpenAI API キー",
      openaiApiKeyDesc: "OPENAI_API_KEY 環境変数が必要"
    },
    providerDescriptions: {
      openai: "GPT-5.2、o3、GPT-4o などの OpenAI モデル",
      anthropic: "Anthropic の Claude モデル",
      gemini: "Google Gemini AI モデル",
      deepseek: "推論能力を持つ DeepSeek AI モデル",
      moonshot: "長いコンテキストに対応する Moonshot AI（Kimi）モデル",
      zaiCodingPlan: "Z.AI（Zhipu）GLM モデルのサブスクリプションプラン——GLM-4.7 搭載",
      kimiCodingPlan: "Kimi For Coding——K2 モデルの Anthropic 互換 API",
      opencodeGo: "OpenAI/Anthropic プロトコルを自動ルーティングする OpenCode Go サブスクリプションモデル",
      openrouter: "OpenRouter 統一 API で数百の AI モデルにアクセス",
      azure: "エンタープライズ機能を備えた Microsoft Azure OpenAI Service",
      copilot: "GitHub Copilot サブスクリプション経由で AI モデルを利用（OAuth 必要）",
      claudeSubscription: "Anthropic Pro/Max サブスクリプション経由で Claude モデルを利用（OAuth 必要）",
      claudeCodeAcp: "ACP プロトコル経由の Claude Code エージェント——ローカルプロセスを起動",
      geminiAcp: "ACP プロトコル経由の Gemini CLI エージェント——ローカルプロセスを起動",
      antigravityAcp: "agy-acp ACP アダプター経由の Antigravity CLI（agy）——個人 Google アカウント向け Gemini CLI の後継",
      codexAcp: "ACP プロトコル経由の OpenAI Codex CLI エージェント——ローカルプロセスを起動",
      ollama: "Ollama でオープンソース LLM をローカル実行",
      cloudflareAiGateway: "Cloudflare AI Gateway 経由でプロキシし、キャッシュ・レート制限・分析を利用"
    }
  }
};
const main = {
  configureProvider: "チャットを開始するには、少なくとも1つのAIプロバイダーを設定してください",
  heroTitle: "今日は何から始めますか？",
  heroSubtitle: "思いつき、書きかけ、貼り付け — あとはAlmaにお任せください。",
  inputPlaceholder: "何か入力してみてください…",
  send: "送信",
  suggestionsLoading: "最近のアクティビティを読み込み中…",
  connectToStartIOS: "Mac に接続する — またはプロバイダーを設定する — とチャットを開始できます",
  openConnection: "接続を設定"
};
const languageSwitcher = {
  placeholder: "言語"
};
const speech = {
  button: "音声入力",
  startRecording: "クリックして音声入力を開始",
  stopRecording: "クリックして録音を停止",
  processing: "音声を処理中...",
  modelNotDownloaded: "音声モデルがダウンロードされていません。設定 > 音声 でダウンロードしてください。",
  noAudioData: "音声データがキャプチャされませんでした",
  microphoneDenied: "マイクへのアクセスが拒否されました。システム設定 > プライバシーとセキュリティ > マイク で有効にしてください。",
  microphonePermissionRequired: "音声入力にはマイクの許可が必要です。"
};
const titlebar = {
  minimize: "最小化",
  maximize: "最大化",
  close: "閉じる"
};
const share = {
  title: "会話を共有",
  selectMessages: "{{selected}} / {{total}} 件のメッセージを選択",
  selectAll: "すべて選択",
  deselectAll: "選択解除",
  user: "ユーザー",
  assistant: "アシスタント",
  includeHeader: "ヘッダーを含める",
  includeTimestamp: "タイムスタンプを含める",
  preview: "プレビュー",
  previewHint: "スクロールで拡大縮小、ドラッグで移動",
  noMessagesSelected: "メッセージが選択されていません",
  saveAsPng: "PNGとして保存",
  copyToClipboard: "クリップボードにコピー",
  savedToFile: "画像を保存しました",
  copiedToClipboard: "画像をクリップボードにコピーしました",
  exportFailed: "画像のエクスポートに失敗しました",
  copyFailed: "画像のコピーに失敗しました",
  generatedBy: "Alma で生成"
};
const label = {
  dialog: {
    addTitle: "ラベルを追加",
    addDesc: "会話を整理するためのラベルを作成",
    editTitle: "ラベルを編集",
    editDesc: "ラベル名または色を更新",
    name: "ラベル名",
    namePlaceholder: "例：仕事、個人、研究",
    color: "ラベルの色"
  }
};
const common = {
  ok: "OK",
  cancel: "キャンセル",
  save: "保存",
  "delete": "削除",
  confirmDelete: "もう一度クリックで確定",
  edit: "編集",
  dragToReorder: "ドラッグして並べ替え",
  add: "追加",
  close: "閉じる",
  back: "戻る",
  next: "次へ",
  loading: "読み込み中...",
  error: "エラー",
  success: "成功",
  unknown: "不明なエラー",
  failed: "失敗",
  required: "必須",
  refresh: "更新",
  created: "作成日時",
  updated: "更新日時",
  create: "作成",
  update: "更新",
  selectPreset: "プリセットを選択...",
  enable: "有効化",
  disable: "無効化",
  confirm: "確認",
  stop: "停止",
  copy: "コピー",
  copied: "コピーしました",
  learnMore: "詳細を見る",
  optional: "任意",
  quote: "引用",
  toggleTheme: "テーマ切替",
  searchThreads: "スレッドを検索",
  clearAll: "すべてクリア",
  noData: "データなし",
  "continue": "続行",
  title: "タイトル",
  description: "説明",
  dragToResize: "ドラッグしてサイズ変更",
  previous: "前へ",
  search: "検索",
  dismissNotification: "通知を閉じる",
  removeQuote: "引用を削除",
  working: "作業中",
  dismiss: "閉じる",
  clear: "クリア",
  submit: "送信",
  input: "入力",
  saving: "保存中…",
  closeEsc: "閉じる (Esc)"
};
const phone = {
  drawer: {
    pinned: "ピン留め",
    today: "今日",
    yesterday: "昨日",
    previous7Days: "過去7日間",
    previous30Days: "過去30日間",
    empty: "まだ会話はありません",
    onThisPhone: "このiPhone上",
    localSub: "チャットは端末内に保存されます",
    noPeer: "未ペアリング",
    viaRelay: "リレー経由・エンドツーエンド暗号化",
    connectedToMac: "Macに接続済み",
    connecting: "接続中…",
    offline: "オフライン",
    tapToReconnect: "タップして再接続",
    cantReach: "Macに接続できません",
    deleteTitle: "このチャットを削除しますか？"
  }
};
const sidebar = {
  settingsWindowOpen: "設定ウィンドウが開いています — 前面に表示",
  expand: "サイドバーを展開",
  collapse: "サイドバーを折りたたむ",
  unreadCompletion: "完了 — 未読",
  toggle: "サイドバーを切り替え",
  newChat: "新規チャット",
  settings: "設定",
  gallery: "ギャラリー",
  soundEffects: "サウンドエフェクト",
  hideExternalChats: "外部チャットを非表示",
  showExternalChats: "外部チャットを表示",
  contextMenu: {
    rename: "名前を変更",
    copyId: "スレッド ID をコピー",
    shareWithTeam: "チームと共有",
    stopSharingWithTeam: "チームとの共有を停止",
    sharedWithTeam: "チームと共有しました",
    stoppedSharingWithTeam: "チームとの共有を停止しました",
    favorite: "お気に入りに追加",
    unfavorite: "お気に入りから削除",
    pinFavorite: "プロジェクトカードに追加",
    unpinFavorite: "プロジェクトカードから削除",
    incognito: "シークレットモードを有効化",
    disableIncognito: "シークレットモードを無効化",
    selectMode: "選択モード",
    "delete": "削除"
  },
  pinned: {
    title: "ピン留め",
    empty: "スレッドを右クリックしてサイドバーにピン留め",
    pin: "サイドバーにピン留め",
    unpin: "サイドバーのピン留めを解除",
    replaceTitle: "置き換えるピン留めスレッドを選択"
  },
  selectionMode: {
    selected: "{{count}} 件選択中"
  },
  batchDeleteConfirm: {
    title: "選択したスレッドを削除",
    description: "選択した {{count}} 件のスレッドを削除してもよろしいですか？この操作は元に戻せません。"
  },
  renameDialog: {
    title: "会話の名前を変更",
    placeholder: "新しいタイトルを入力",
    cancel: "キャンセル",
    save: "保存"
  },
  deleteConfirm: {
    title: "会話を削除",
    description: "この会話を削除してもよろしいですか？この操作は元に戻せません。"
  },
  gtd: {
    favorites: "お気に入り",
    status: "ステータス",
    labels: "ラベル",
    inbox: "受信トレイ",
    todo: "やること",
    inProgress: "進行中",
    done: "完了",
    archived: "アーカイブ済み",
    setStatus: "ステータスを設定",
    setLabels: "ラベルを設定",
    showMore: "さらに {{count}} 件を表示",
    showLess: "表示を減らす",
    selectMode: "選択モード",
    selected: "{{count}} 件選択中",
    selectAll: "すべて選択",
    deselectAll: "選択解除",
    batchActions: "一括操作",
    moveToStatus: "ステータスへ移動",
    toggleLabel: "ラベルを切替",
    deleteSelected: "選択を削除",
    batchDeleteTitle: "選択したスレッドを削除",
    batchDeleteDesc: "選択した {{count}} 件のスレッドを削除してもよろしいですか？この操作は元に戻せません。",
    addLabel: "ラベルを追加",
    addLabelDesc: "スレッドを整理するための新しいラベルを作成します。",
    labelName: "ラベル名",
    labelNamePlaceholder: "ラベル名を入力",
    labelColor: "ラベルの色",
    noLabelsHint: "クリックまたは右クリックでラベルを追加",
    renameLabel: "ラベル名を変更",
    deleteLabel: "ラベルを削除",
    editLabel: "ラベルを編集",
    editLabelDesc: "ラベル名と色を編集します。",
    deleteLabelTitle: "ラベルを削除",
    deleteLabelDesc: "このラベルを削除してもよろしいですか？このラベルが付いたスレッドは削除されません。",
    autoTagged: "Alma が「やること」に設定",
    summarize: "この会話を Alma に読んでもらう",
    summarizeSelected: "これらの会話を Alma に読んでもらう",
    summarizeQueued: "キューに入れました。バックグラウンドで読みます"
  },
  project: {
    uncategorized: "未分類",
    working: "作業中...",
    showAll: "すべて表示 · 他 {{count}} 件",
    showRecent: "最近のみ表示"
  }
};
const windowControls = {
  minimize: "最小化",
  maximize: "最大化",
  restore: "復元",
  close: "閉じる",
  fullscreen: "フルスクリーンにする",
  exitFullscreen: "フルスクリーンを解除"
};
const errors = {
  failedToCreateThread: "会話の作成に失敗しました",
  failedToLoadModels: "モデルの読み込みに失敗しました",
  failedToOpenSettings: "設定を開くのに失敗しました",
  failedToLoadProviders: "プロバイダーの読み込みに失敗しました",
  failedToDeleteProvider: "プロバイダーの削除に失敗しました",
  failedToToggleProvider: "プロバイダーの状態切り替えに失敗しました",
  failedToStopGeneration: "生成の停止に失敗しました",
  generationError: "生成エラー",
  chatError: "チャットエラー",
  apiServerNotAvailable: "APIサーバーが利用できません",
  networkError: "ネットワークエラー",
  streamingError: "ストリーミングエラー",
  noResponseBody: "応答内容がありません",
  webSocketNotAvailable: "WebSocket接続が利用できません",
  invalidSettingsFormat: "無効な設定ファイル形式"
};
const warnings = {
  threadNotFound: "会話が見つかりません"
};
const gallery = {
  title: "ギャラリー",
  empty: "画像がありません",
  openGallery: "ギャラリーを開く"
};
const capture = {
  title: "ウィンドウをキャプチャ",
  background: "背景",
  padding: "余白",
  shadow: "シャドウ",
  privacy: "プライバシー",
  privacyHint: "サイドバーのスレッドタイトルを隠す",
  transparent: "透明",
  customImage: "カスタム画像",
  customColor: "カスタムカラー",
  changeImage: "画像を変更…",
  retake: "再撮影",
  copy: "コピー",
  save: "保存…",
  copied: "クリップボードにコピーしました",
  saved: "保存しました",
  reveal: "Finder に表示",
  failed: "キャプチャに失敗しました",
  panTool: "移動",
  redactTool: "範囲マスク",
  zoomIn: "拡大",
  zoomOut: "縮小",
  zoomReset: "表示をリセット",
  regionHint: "点線の候補をクリック、またはドラッグで範囲をマスク",
  regionSuggestion: "クリックでマスク",
  regionRemove: "クリックでマスクを解除",
  undo: "元に戻す",
  redo: "やり直す",
  styleMosaic: "モザイク",
  styleBlur: "ぼかし",
  styleSolid: "塗りつぶし",
  solidColor: "マスクの色",
  sourceAuto: "検出領域",
  sourceAutoHint: "検出された領域をクリックしてマスク",
  sourceDraw: "手描き",
  sourceDrawHint: "ドラッグで任意の領域をマスク（検出領域の一部も可）",
  regionHintDraw: "ドラッグで任意の領域をマスク — 検出領域は邪魔をしません"
};
const liveCoding = {
  title: "ライブコーディング",
  musicSnippet: "音楽スニペット",
  play: "再生",
  stop: "停止",
  openInEditor: "エディタで開く",
  shareToChat: "チャットに共有",
  bpm: "BPM",
  help: "ヘルプ",
  ready: "準備完了",
  initializing: "初期化中...",
  playing: "再生中...",
  helpTitle: "ライブコーディングヘルプ",
  helpDescription: "Strudelライブコーディングパターンのクイックリファレンス",
  keyboardShortcuts: "キーボードショートカット",
  evaluateAndPlay: "評価して再生",
  basicPatterns: "基本パターン",
  basicDrumPattern: "基本ドラムパターン：キック、スネア、ハイハット、スネア",
  melodicPattern: "音符付きのメロディパターン",
  repeatPattern: "1サイクルで4回繰り返す",
  miniNotation: "ミニ記法",
  groupElements: "要素をグループ化",
  repeatN: "n回繰り返す",
  slowN: "n倍遅くする",
  rest: "休符/無音",
  alternate: "サイクルごとに交互",
  random: "50%のランダム確率",
  effects: "エフェクト",
  lowPassFilter: "ローパスフィルター",
  highPassFilter: "ハイパスフィルター",
  volume: "音量 (0-1)",
  decay: "減衰時間",
  pan: "ステレオ位置 (-1 から 1)",
  speed: "再生速度",
  transformations: "変換",
  speedUp: "n倍速くする",
  slowDown: "n倍遅くする",
  reverse: "パターンを逆転",
  sometimes: "50%の確率で適用",
  stack: "パターンを同時再生",
  examples: "例",
  houseBeat: "ハウスビート：",
  synthMelody: "シンセメロディ：",
  resources: "リソース",
  strudelDocs: "完全なドキュメントは https://strudel.cc/learn をご覧ください"
};
const onboarding = {
  audioCheck: {
    title: "体験を始める準備はできましたか？",
    description: "この体験にはアンビエントミュージックとビジュアルが含まれています。音を再生できる環境にいますか？またはヘッドフォンを装着していますか？",
    withSound: "音声付きで再生",
    muted: "音声なしで続ける"
  }
};
const updater = {
  title: "ソフトウェアアップデート",
  description: "新しいバージョンが利用可能です",
  badge: "更新",
  badgeRestart: "再起動して更新",
  skipVersion: "このバージョンをスキップ",
  updateAvailable: "アップデートがあります",
  currentVersion: "現在のバージョン",
  latestVersion: "最新バージョン",
  changelog: "変更点",
  downloading: "ダウンロード中...",
  downloadNow: "今すぐダウンロード",
  incremental: "差分更新",
  downloadComplete: "ダウンロード完了！インストール準備ができました。",
  downloadFailed: "ダウンロードに失敗しました。もう一度お試しください。",
  retry: "再試行",
  restartNow: "今すぐ再起動",
  restarting: "再起動中…",
  restartConfirm: {
    title: "再起動してアップデートを適用しますか？",
    description: "アップデートがダウンロードされました。アプリケーションを今すぐ再起動してアップデートを適用しますか？",
    restart: "今すぐ再起動",
    later: "後で"
  }
};
const promptApps = {
  title: "プロンプトアプリ",
  create: "新規作成",
  edit: "プロンプトアプリを編集",
  "delete": "削除",
  manage: "プロンプトアプリを管理",
  run: "実行",
  empty: "プロンプトアプリがありません",
  emptyHint: "プロンプトアプリを作成して始めましょう",
  deleteConfirm: "このプロンプトアプリを削除してもよろしいですか？",
  editor: {
    icon: "アイコン",
    name: "名前",
    namePlaceholder: "マイプロンプトアプリ",
    description: "説明",
    descriptionPlaceholder: "このアプリの機能の簡単な説明",
    enabled: "有効",
    expectsImageResult: "画像結果を期待",
    expectsImageResultHint: "結果に画像がない場合、最大10回まで自動リトライ",
    incognito: "シークレットモード",
    incognitoHint: "このアプリで作成されたスレッドのメモリ機能を無効にします",
    modelConfig: "モデル設定",
    model: "モデル",
    selectModel: "モデルを選択",
    useDefault: "デフォルトモデルを使用",
    modelHint: "空のままにすると、このアプリ実行時にデフォルトモデルが使用されます。",
    tools: "ツール",
    reasoning: "推論",
    noAdvancedFeatures: "このモデルはツールや推論などの高度な機能をサポートしていません。",
    template: "プロンプトテンプレート",
    templatePlaceholder: "プロンプトテンプレートを入力してください。{{placeholder_name}} で動的な値を指定できます。",
    templateHint: "{{placeholder_name}} 構文を使用して、ユーザーが入力できる動的プレースホルダーを追加します。",
    placeholders: "プレースホルダー",
    addPlaceholder: "追加",
    noPlaceholders: "プレースホルダーが設定されていません。追加してプロンプトを動的にしましょう。",
    shortcut: "グローバルショートカット",
    shortcutPlaceholder: "クリックして設定",
    shortcutHint: "このアプリを素早く起動するためのグローバルショートカットを設定します。Backspaceでクリア。",
    fontSize: "フォントサイズ",
    fontSizeDefault: "デフォルト",
    fontSizeHint: "このプロンプトアプリウィンドウのカスタムフォントサイズを設定します。"
  },
  placeholder: {
    name: "変数名",
    type: "タイプ",
    label: "表示ラベル",
    placeholderText: "プレースホルダーテキスト",
    required: "必須",
    options: "オプション（1行に1つ）",
    min: "最小値",
    max: "最大値",
    accept: "受け入れ（MIMEタイプ）",
    multiple: "複数選択を許可",
    defaultValue: "デフォルト値",
    defaultChecked: "デフォルトでチェック",
    text: "テキスト",
    textarea: "テキストエリア",
    select: "セレクト",
    number: "数値",
    checkbox: "チェックボックス",
    date: "日付",
    image: "画像",
    file: "ファイル"
  },
  runner: {
    generate: "生成",
    generating: "生成中...",
    regenerate: "再生成",
    pleaseWait: "AIがリクエストを処理しています。お待ちください...",
    result: "結果",
    openThread: "開く",
    viewInChat: "チャットで表示 →",
    preview: "プレビュー",
    emptyPreview: "上記のフィールドに入力するとプレビューが表示されます",
    noPlaceholders: "このプロンプトアプリには入力フィールドがありません。",
    selectOption: "オプションを選択",
    selectedFiles: "選択済み",
    clickToUpload: "クリックしてアップロード",
    orDragDrop: "またはドラッグ＆ドロップ",
    anyFile: "すべてのファイル形式",
    addMore: "追加",
    pasteHint: "PNG, JPG, GIF, WebP • クリップボードからの貼り付けに対応",
    pasteToAdd: "クリップボードから貼り付けて画像を追加",
    clickToReplace: "クリックして画像を置換",
    retrying: "画像取得をリトライ中 ({{count}}/{{max}})...",
    maxRetriesReached: "最大リトライ回数に達しましたが画像が生成されませんでした"
  },
  history: {
    title: "履歴",
    empty: "実行履歴がありません",
    emptyHint: "このアプリを実行して履歴を作成します",
    openChat: "チャットを開く",
    rerun: "これらの値で再実行",
    deleteConfirm: "この実行記録を削除しますか？",
    attachments: "添付ファイル",
    threadDeleted: "スレッドは削除されました",
    showPrompt: "生成されたプロンプトを表示"
  },
  enterTopic: "トピックを入力...",
  typeHere: "ここに入力..."
};
const artifact = {
  panel: {
    title: "プレビュー"
  },
  viewMode: {
    preview: "プレビュー",
    code: "コード"
  },
  actions: {
    copy: "クリップボードにコピー",
    download: "ファイルをダウンロード",
    fullscreen: "全画面表示",
    exitFullscreen: "全画面を終了"
  },
  types: {
    code: "コード",
    html: "HTML",
    react: "Reactコンポーネント",
    markdown: "Markdown",
    mermaid: "Mermaid図",
    svg: "SVG画像"
  }
};
const fileExplorer = {
  contextMenu: {
    copy: "コピー",
    cut: "切り取り",
    paste: "貼り付け",
    rename: "名前を変更",
    revealInFinder: "Finderで表示",
    revealInExplorer: "エクスプローラーで表示",
    copyRelativePath: "相対パスをコピー",
    copyAbsolutePath: "絶対パスをコピー",
    newFolder: "新しいフォルダ",
    "delete": "削除",
    deleteConfirm: '"{{name}}" を削除してもよろしいですか？'
  },
  newFolderDialog: {
    title: "新しいフォルダ",
    placeholder: "フォルダ名を入力",
    cancel: "キャンセル",
    create: "作成"
  },
  renameDialog: {
    title: "名前を変更",
    placeholder: "新しい名前を入力",
    cancel: "キャンセル",
    save: "保存"
  },
  showHiddenFiles: "隠しファイルを表示",
  hideHiddenFiles: "隠しファイルを非表示",
  filter: "ファイルを絞り込む",
  filterPlaceholder: "名前またはパスで絞り込む…",
  clearFilter: "絞り込みをクリア",
  noMatches: "一致するファイルはありません",
  collapseAll: "すべてのフォルダを折りたたむ",
  expandAll: "すべてのフォルダを展開",
  resultLimit: "最初の {{count}} 件を表示しています。検索語を追加して絞り込んでください。"
};
const projectCard = {
  brief: "このプロジェクトとは",
  briefPlaceholder: "一〜二文で — 長期的な目的。",
  focus: "現在のフォーカス",
  focusPlaceholder: "いま作業がどこまで進んでいるか。",
  resume: "再開ポイント",
  resumeEmpty: "再開ポイントはまだありません。次に戻るスレッド・メッセージ・オブジェクトを選んでください。",
  resumeSearchPlaceholder: "スレッド/メッセージ/オブジェクトを検索、または alma:// リンクを貼り付け…",
  addResume: "追加",
  starred: "追加済みスレッド",
  runConfig: "実行設定",
  residents: "常駐コラボレーター",
  defaults: "デフォルト",
  boundary: "境界（これのみ許可）",
  templates: "完了条件テンプレート",
  tools: "ツール",
  models: "モデル",
  agents: "エージェント",
  configHint: "変更: alma project config set <id> --json '{…}'（ユーザーのシェル）",
  pendingProposal: "Alma が更新を提案しています — 承認または却下（承認まで確定カードは変わりません）",
  proposalWaiting: "Alma がこのプロジェクトカードの更新を提案しています",
  accept: "承認",
  dismiss: "却下",
  proposalAccepted: "提案を適用しました",
  proposalDismissed: "提案を却下しました",
  saved: "保存しました",
  invalidUri: "alma:// URI を入力してください",
  uriCopied: "参照をコピーしました",
  close: "閉じる",
  confirmSave: "確認して保存",
  open: "プロジェクトカード",
  draftIntro: "新しいプロジェクト？カードはまだ空です。",
  draftOpenConsult: "相談で Alma に起草させる",
  changeIcon: "アイコンを変更",
  searchEmoji: "絵文字を検索",
  useLetterIcon: "頭文字に戻す",
  fromApp: "インストール済みアプリから選ぶ",
  fromWebsite: "ウェブサイトのアイコンを使う",
  siteUrlPlaceholder: "ウェブサイトのアドレス（例: github.com）",
  siteHint: "アドレスを入力して Enter を押すと、サイトのアイコンを取得します。",
  loadingSiteIcon: "アイコンを取得中…",
  noSiteIcon: "このサイトのアイコンが見つかりませんでした。アドレスを確認してもう一度お試しください。",
  useSiteIcon: "このアイコンを使う",
  searchApps: "アプリを検索",
  noApps: "アプリが見つかりません",
  loadingApps: "アプリを読み込み中…",
  backToEmoji: "絵文字に戻る",
  rename: "名前を変更（フォルダ名はそのまま）",
  drafting: "起草中…",
  drafted: "ドラフト完成 — カードの保留中の提案を確認してください",
  draftedFromConsult: "相談内容から作成",
  editConfig: "実行設定を編集",
  saveConfig: "設定を保存",
  configSaved: "保存しました",
  cancel: "キャンセル",
  noConfig: "デフォルトや境界は未設定です。",
  noDefault: "（なし）",
  defaultModel: "デフォルトモデル",
  defaultEffort: "デフォルト推論強度",
  preferredSkills: "よく使うスキル",
  boundaryEditor: "境界 — これのみ許可（空=無制限）",
  boundaryEditorHint: "能力の許可リストで、このプロジェクトとサブエージェントに適用されます。ファイルサンドボックスではありません。",
  skillsLabel: "スキル",
  templateName: "名前",
  templateCondition: "完了条件（例：テスト exit 0 かつ lint クリーン）",
  addTemplate: "テンプレートを追加",
  picker: {
    search: "検索…",
    empty: "該当なし",
    addCustom: "「{{value}}」を追加",
    pickAgents: "協力者を選択…",
    pickSkills: "スキルを選択…",
    unrestricted: "無制限",
    clearAll: "すべてクリア"
  },
  consult: {
    title: "相談",
    paneTitle: "相談アシスタント",
    paneSubtitle: "説明と提案のみ。起草したカードは承認するまで書き込まれません。",
    emptyIntro: "各項目の書き方、境界の意味、そのまま貼れる文言などを尋ねられます。保存済みのカード、未保存の下書き、ここで選べる選択肢をすべて把握しています。",
    emptyIntroNew: "新しいプロジェクト？このフォルダの用途を下に書いて「カードを起草」を押すと、Alma がこの会話をもとに起草します。承認するまで何も書き込まれません。各項目の書き方を尋ねることもできます。",
    draft: "カードを起草",
    draftTitle: "この相談（と入力欄の内容）をカードの下書きにまとめます。保留中の提案として届き、承認するまで何も書き込まれません。",
    starter1: "「このプロジェクトとは」と「現在の焦点」はどう書けばいい？",
    starter2: "このプロジェクトで制限すべきツールやモデルは？",
    starter3: "下書きと保存済みのカードの違いは？",
    placeholder: "カードについて質問…",
    send: "送信",
    thinking: "考えています…",
    seesDraft: "未保存の下書きを参照中",
    seesSaved: "保存済みのカードを参照中",
    compacted: "以前の {{count}} 件のやり取りを要約に畳みました",
    showSummary: "要約を表示",
    hideSummary: "要約を隠す",
    clear: "会話を消去",
    clearConfirmTitle: "この相談を消去しますか？",
    clearConfirmBody: "このプロジェクトの相談アシスタントとの会話と要約をすべて削除します。カード自体には影響しません。",
    cleared: "相談を消去しました",
    close: "相談アシスタントを閉じる",
    savedIn: "記録はプロジェクトフォルダに保存されます"
  }
};
const workspace = {
  title: "プロジェクト",
  selectWorkspace: "プロジェクトを選択",
  selectDirectory: "ディレクトリを選択...",
  remote: {
    selectRemoteFolder: "リモートフォルダ...",
    disconnected: "リモートホストとの接続が切断されました",
    reconnect: "再接続",
    reconnecting: "再接続中...",
    pickerTitle: "リモートプロジェクト",
    pickerDescription: "SSH ホストを選び、その上のプロジェクトフォルダを選択します。~/.ssh/config のホストはそのまま使えます。",
    browseDescription: "このホスト上のプロジェクトフォルダを選択します。",
    fromSshConfig: "~/.ssh/config から",
    noHosts: "SSH ホストがまだありません。下で user@host 形式で追加してください。",
    addHost: "ホストを手動で追加...",
    connect: "接続",
    emptyDirectory: "サブディレクトリはありません",
    useThisFolder: "このフォルダを使う",
    hostsTitle: "リモートホスト",
    hostsDescription: "リモートプロジェクトが使う SSH ホスト。認証には ssh キーと ~/.ssh/config を使用します。",
    test: "テスト",
    testing: "テスト中...",
    connected: "接続済み",
    connectionFailed: "接続失敗",
    notChecked: "未確認",
    deleteHostConfirm: "このホストを削除しますか？",
    deleteHostHasProjects: "このホストにはまだプロジェクトがあるため削除できません。",
    projectCount: "{{count}} 件のプロジェクト"
  },
  temporary: "一時",
  locked: "プロジェクトはロックされています",
  recent: "最近のプロジェクト",
  info: "すべてのツール操作はこのディレクトリを作業ディレクトリとして使用します",
  addWorkspace: "プロジェクトを追加",
  showTemporary: "一時を表示",
  showInList: "リストに表示",
  openInFinder: "Finderで開く",
  openInExplorer: "エクスプローラーで開く",
  deleteConfirm: "このプロジェクトを削除しますか？会話は削除されずプロジェクトと一緒に非表示になり、このフォルダを再びプロジェクトとして追加すると元に戻ります。プロジェクトフォルダもそのままです。",
  deleteFailed: "プロジェクトの削除に失敗しました",
  deleteKeepThreads: {
    menu: "プロジェクトを削除…",
    title: "プロジェクト「{{name}}」を削除しますか？",
    description: "Alma からプロジェクトを外すだけで、プロジェクトフォルダは削除されません。",
    descriptionWithThreads: "Alma からプロジェクトを外すだけです。{{count}} 件の会話は残りますがプロジェクトと一緒に非表示になり、このフォルダを再びプロジェクトとして追加すると元に戻ります。プロジェクトフォルダも削除されません。",
    confirm: "プロジェクトを削除"
  },
  deleteDefaultForbidden: "デフォルトのプロジェクトは削除できません。",
  noWorkspaces: "プロジェクトがありません",
  searchProjects: "プロジェクトを検索...",
  searchNoResults: "一致するプロジェクトがありません",
  noWorkspace: "プロジェクトなし",
  noWorkspaceDescription: "ツールは一時ディレクトリを使用します",
  auto: "自動",
  autoDescription: "一時ディレクトリを自動作成",
  cannotChange: "メッセージ送信後はプロジェクトを変更できません",
  artifacts: {
    title: "Artifactsモード",
    description: "Artifactファイル用の専用ディレクトリを使用",
    enabled: "Artifactsモードが有効"
  },
  defaultWorkspace: "デフォルトプロジェクト",
  listDescription: "エージェントが作業するフォルダー。新しい会話はスター付きのプロジェクトを使います。スターがなければ会話ごとに一時フォルダーを作成します。",
  defaultWorkspaceDescription: "新しい会話は一時ディレクトリを作成せずにこのディレクトリを使用します",
  setAsDefault: "デフォルトに設定",
  clearDefault: "デフォルトを解除",
  isDefault: "デフォルト",
  noDefault: "なし（一時を使用）",
  autoWorktree: "自動ワークツリー",
  autoWorktreeDescription: "新しい会話ごとにgitワークツリーを自動作成",
  outputs: {
    label: "成果物",
    tooltip: "このセッションの成果物フォルダを開く"
  },
  worktree: {
    title: "Gitワークツリー",
    description: "このチャットを独立したgitワークツリーで作業します",
    needsProject: "プロジェクトを選択すると有効化できます",
    badge: "ワークツリー"
  },
  pins: {
    buttonTitle: "ピン留め参照",
    title: "ピン留め参照 — {{name}}",
    description: "このプロジェクトのすべてのスレッドが常に参照するオブジェクト（プラン、ルール、エージェント、フォルダなど）。ここまたは `alma workspace pin` でのみ設定でき、会話からは変更できません。",
    empty: "まだピン留めがありません。下で検索して追加してください。",
    searchPlaceholder: "ピン留めするオブジェクトを検索（スキル、エージェント、ファイルなど）",
    saving: "保存中…"
  }
};
const github = {
  notInstalled: "GitHub CLIがインストールされていません",
  notAuthenticated: "GitHub CLIが認証されていません",
  install: "インストール",
  runAuthLogin: "実行: gh auth login",
  pr: {
    title: "Pull Request",
    noPr: "Pull Requestがありません",
    create: "PR作成",
    createTitle: "Pull Requestを作成",
    createDescription: "ブランチのPull Requestを作成",
    titleLabel: "タイトル",
    titlePlaceholder: "Pull Requestのタイトル",
    bodyLabel: "説明",
    bodyPlaceholder: "変更内容を説明...",
    draft: "ドラフトとして作成",
    creating: "作成中...",
    titleRequired: "タイトルは必須です",
    open: "オープン",
    merged: "マージ済み",
    closed: "クローズ",
    changes: "変更",
    files: "ファイル",
    status: "ステータス",
    mergeable: "マージ可能",
    conflicting: "コンフリクトあり",
    unknown: "不明",
    checks: "チェック",
    review: "レビュー",
    update: "更新",
    merge: "マージ",
    close: "閉じる",
    merging: "マージ中...",
    closing: "クローズ中..."
  },
  postMerge: {
    title: "PRがマージされました",
    description: "Pull Requestが正常にマージされました。このワークツリーをどうしますか？",
    keep: "ワークツリーを保持",
    keepDescription: "このワークツリーで作業を続ける",
    "delete": "ワークツリーを削除",
    deleteDescription: "ワークツリーとブランチを削除",
    archive: "削除してスレッドをアーカイブ",
    archiveDescription: "ワークツリーを削除し、関連する会話をアーカイブ",
    decideLater: "後で決める"
  },
  conflicts: {
    title: "コンフリクト",
    noConflicts: "解決するコンフリクトがありません",
    resolveAll: "AIで全て解決",
    resolving: "解決中...",
    resolved: "解決済み",
    resolution: "解決方法",
    "continue": "Rebaseを続行",
    abort: "Rebaseを中止",
    confidence: {
      high: "高い信頼度",
      medium: "中程度の信頼度",
      low: "低い信頼度"
    }
  }
};
const askUserQuestion = {
  previous: "前の質問",
  next: "次の質問",
  submit: "送信",
  customPlaceholder: "カスタム回答を入力...",
  fallbackTitle: "入力が必要です",
  sidebarWaiting: "回答を待っています",
  waiting: "回答を待っています…",
  yourAnswer: "あなたの回答",
  dismissed: "スキップ済み",
  goToQuestion: "質問{{index}}へ移動"
};
const commandPalette = {
  openBeside: "横に分割して開く",
  removeRecent: "履歴から削除",
  placeholder: "スレッド、ファイル、設定、アクションを検索...",
  searching: "検索中...",
  noResults: "結果が見つかりません。",
  group: {
    quickActions: "クイックアクション",
    settings: "設定ページ",
    allSettings: "すべての設定",
    threads: "スレッド",
    recent: "最近の検索",
    projectFiles: "プロジェクトファイル",
    projectFilesIn: "{{name}} のファイル",
    actions: "アクション"
  },
  hint: {
    openBeside: "横に分割して開く",
    navigate: "移動",
    select: "選択",
    close: "閉じる"
  },
  settings: {
    tts: "テキスト読み上げ",
    people: "ピープル",
    chromeRelay: "Chrome Relay"
  },
  toggle: {
    theme: "テーマ",
    streamResponse: "ストリーミング応答",
    showTokenUsage: "トークン使用量を表示",
    enableMarkdown: "Markdownレンダリング",
    infographic: "インフォグラフィック",
    soundEffects: "サウンドエフェクト",
    memory: "メモリ",
    lineNumbers: "行番号を表示",
    wordWrap: "折り返し",
    systemCaret: "システムキャレット",
    whisper: "音声入力",
    debugMode: "デバッグモード"
  },
  theme: {
    light: "ライト",
    dark: "ダーク",
    system: "システム"
  },
  deep: {
    toolModel: "ツールモデル",
    codingAgent: "コーディングエージェント",
    language: "言語",
    appIcon: "アプリアイコン",
    startup: "起動設定",
    window: "ウィンドウとトレイ",
    quickChat: "クイックチャット",
    permissions: "権限と自動承認",
    temperature: "Temperature",
    maxTokens: "最大トークン数",
    streaming: "ストリーミング応答",
    tokenUsage: "トークン使用量表示",
    markdown: "Markdownレンダリング",
    singleDollarMath: "ドル記号数式",
    infographic: "インフォグラフィック",
    autoSuggestions: "自動サジェスト",
    toolSelection: "デフォルトツール選択",
    skillSelection: "デフォルトスキル選択",
    soundEffects: "サウンドエフェクトとプリセット",
    autoCompact: "自動コンテキスト圧縮",
    hashlineEdit: "Hashline編集モード",
    uiTheme: "テーマ外観",
    font: "フォントとサイズ",
    density: "インターフェース密度",
    sidebarWidth: "サイドバー幅",
    sidebarMode: "サイドバーモード",
    lineNumbers: "行番号表示",
    uiWordWrap: "折り返し",
    minimap: "ミニマップ表示",
    systemCaret: "システムキャレット",
    toolCardExpand: "ツールカードのデフォルト展開",
    terminalFont: "ターミナルフォント",
    persistTerminals: "ターミナルセッション保持",
    terminalCursorBlink: "ターミナルのカーソル点滅",
    proxy: "プロキシ設定",
    timeout: "タイムアウトとリトライ",
    memoryConfig: "メモリ設定",
    shortcuts: "キーボードショートカット",
    whisperModel: "音声モデルと言語",
    ttsProvider: "TTSプロバイダーと音声",
    searchEngine: "検索エンジン",
    backup: "データバックアップと復元",
    cloudSync: "クラウド同期",
    darkTheme: "ダークモードテーマ",
    lightTheme: "ライトモードテーマ"
  },
  action: {
    checkUpdates: "アップデートを確認"
  }
};
const toolGroupSummary = {
  count: "{{count}} 件のツール呼び出し",
  compose: "{{object}} を{{verb}}",
  running: "{{text}}中",
  fallback: "タスクを継続",
  waiting: "承認待ち：{{object}}",
  waitingPlan: "プラン実行の確認待ち",
  waitingAnswer: "回答待ち",
  categoryCount: "{{count}} 種類の操作",
  multiStage: "{{verb1}}・{{verb2}}：{{topic}}",
  action: {
    read: "読み取り",
    write: "書き込み",
    edit: "編集",
    "delete": "削除",
    list: "ファイル一覧",
    searchFile: "ファイル検索",
    searchContent: "コード検索",
    lints: "診断チェック",
    command: "コマンド実行",
    webSearch: "Web検索",
    webFetch: "ページ取得",
    codebaseSearch: "コードベース検索",
    todo: "タスク計画を更新",
    exitPlan: "プラン実行の確認待ち",
    subtask: "サブタスク実行",
    skill: "スキル読み込み",
    userQuestion: "回答待ち",
    imageGen: "画像生成",
    mcpCall: "MCP呼び出し",
    run: "ツール実行"
  },
  noObject: {
    read: "関連ファイルを確認",
    write: "ファイルを書き込み",
    edit: "ファイルを編集",
    "delete": "ファイルを削除",
    list: "ファイル一覧",
    searchFile: "関連ファイルを検索",
    searchContent: "関連コードを検索",
    lints: "診断をチェック",
    command: "コマンドを実行",
    webSearch: "Webを検索",
    webFetch: "ページ内容を取得",
    codebaseSearch: "コードベースを検索",
    todo: "タスク計画を更新",
    exitPlan: "プラン実行の確認待ち",
    subtask: "サブタスクを実行",
    skill: "スキルを読み込み",
    userQuestion: "回答待ち",
    imageGen: "画像を生成",
    mcpCall: "MCPツールを呼び出し",
    unknown: "その他の操作を実行"
  },
  group: {
    read: "{{topic}}を確認",
    search: "{{topic}}のコードを特定",
    research: "{{topic}}の情報を収集",
    modify: "{{topic}}を編集",
    command: "{{topic}}を実行",
    diagnostics: "{{topic}}をチェック",
    plan: "{{topic}}の計画を整理",
    collab: "{{topic}}を協働",
    external: "{{topic}}を取得",
    other: "{{topic}}を処理"
  },
  groupNoTopic: {
    read: "関連ファイルを確認",
    search: "関連コードを検索",
    research: "情報を収集",
    modify: "ファイルを編集",
    command: "コマンドを実行",
    diagnostics: "診断をチェック",
    plan: "計画を整理",
    collab: "作業を委譲",
    external: "外部サービスを呼び出し",
    other: "複数のステップを処理"
  },
  groupVerb: {
    read: "ファイル確認",
    search: "コード特定",
    research: "情報収集",
    modify: "編集",
    command: "チェック実行",
    diagnostics: "診断チェック",
    plan: "計画整理",
    collab: "委譲",
    external: "サービス呼び出し",
    other: "処理"
  }
};
const minesweeper = {
  title: "マインスイーパ",
  bestTimesMenu: "ベストタイム...",
  bestTimes: "ベストタイム",
  levels: {
    beginner: "初級",
    intermediate: "中級",
    expert: "上級"
  },
  seconds_other: "{{count}} 秒",
  resetScores: "記録をリセット",
  congratulations: "おめでとうございます",
  fastestTime: "{{level}}の最速記録を達成しました。",
  enterName: "名前を入力してください："
};
const taskTool = {
  pending: "待機中",
  running: "実行中",
  completed: "完了",
  error: "エラー",
  denied: "拒否",
  approvalRequested: "承認待ち",
  approvalResponded: "承認済み",
  streaming: "ストリーミング中",
  result: "結果",
  errorLabel: "エラー",
  tool: "ツール",
  tools: "ツール"
};
const activity = {
  verb: {
    read: "読み取り",
    globbed: "パターン検索",
    searched: "検索",
    searchedWeb: "ウェブ検索",
    fetched: "取得",
    edited: "編集",
    wrote: "書き込み",
    ran: "実行",
    checked: "確認",
    killed: "終了",
    usedSkill: "スキル使用",
    updated: "更新"
  },
  object: {
    shellOutput: "シェル出力",
    task: "タスク {{id}}",
    shell: "シェル",
    codeScript: "コードスクリプト",
    todos: "Todo"
  },
  phase: {
    thinking: "思考中",
    thought: "思考済み",
    thoughtFor: "{{seconds}} 秒",
    exploring: "調査中",
    explored: "調査済み",
    making: "作成中",
    made: "作成済み",
    running: "実行中",
    ran: "実行済み",
    using: "使用中",
    used: "使用済み",
    working: "作業中",
    worked: "作業済み",
    files_other: "{{count}} 個のファイル",
    places_other: "{{count}} 箇所",
    creates_other: "新規 {{count}}",
    edits_other: "編集 {{count}}",
    commands_other: "{{count}} 個のコマンド",
    steps_other: "{{count}} ステップ"
  },
  toolsUsed_other: "{{count}} 個のツールを使用",
  timelineView: "タイムライン表示",
  collapse: "アクティビティを折りたたむ",
  expand: "アクティビティを展開",
  taskFallback: "タスク",
  focus: {
    workingFor: "{{seconds}}秒 作業中",
    working: "作業中",
    showSteps: "ステップを表示",
    hideSteps: "ステップを隠す",
    hideComposer: "コンポーザーを隠す",
    showComposer: "コンポーザーを表示"
  }
};
const infographic = {
  zoomIn: "拡大",
  zoomOut: "縮小",
  resetZoom: "ズームをリセット",
  downloadSvg: "SVG をダウンロード",
  viewFullscreen: "全画面表示",
  resetView: "ビューをリセット",
  expandDiagram: "図を展開",
  copySourceCode: "ソースコードをコピー",
  copyAsPng: "PNG としてコピー"
};
const branchNav = {
  previous: "前のブランチ",
  next: "次のブランチ"
};
const toolBlock = {
  output: "出力",
  command: "コマンド",
  "arguments": "引数",
  noArguments: "引数なし",
  expandArguments: "展開して引数を表示",
  changes: "変更",
  content: "内容",
  result: "結果",
  noOutput: "出力なし",
  fileChanges: "ファイル変更"
};
const threadResources = {
  outputs: "成果物",
  sources: "ソース"
};
const toolRuns = {
  title: "ツール実行"
};
const goalLoop = {
  repeatSchedule: "スケジュールで繰り返す",
  untilCondition: "条件を満たすまで実行",
  keepWorking: "このスレッドを動かし続ける",
  appliesToNextChat: "ここにはまだチャットがありません。設定した内容は、最初のメッセージでチャットが作成された時点で自動的に適用されます。",
  pendingGoal: "適用待ちのゴール：{{text}}",
  pendingLoop: "適用待ちのループ：{{text}}",
  pendingTitle: "設定済み。新しいチャット作成時に適用されます：{{text}}"
};
const webPreview = {
  noConsoleOutput: "コンソール出力なし",
  enterUrl: "URL を入力...",
  preview: "プレビュー"
};
const a11yRequest = {
  title: "{{appName}} ライブコンテキストを有効化",
  subtitle: "QuickChat は今見ているもの——コード、ドキュメント、エラー、ウェブページ——について答えます。フォーカス中のウィンドウを読み取るにはアクセシビリティ権限が必要です。",
  permissionName: "アクセシビリティ",
  permissionDesc: "{{appName}} がフォーカス中のウィンドウのテキストを読み取れるようにします。",
  done: "完了",
  opening: "開いています…",
  allow: "許可",
  allSet: "設定完了。",
  completeInSettings: "「システム設定」で許可してください。",
  close: "閉じる",
  maybeLater: "あとで"
};
const artifactsUi = {
  railPin: "ツールバーを固定",
  dockPin: "このチャットで開いたままにする",
  dockUnpin: "固定を解除",
  railUnpin: "ツールバーを自動的に隠す",
  railShow: "ツールバーを表示",
  showExplorer: "エクスプローラーを表示",
  locateInExplorer: "ファイルツリーで表示",
  openInBuiltInBrowser: "内蔵ブラウザで開く",
  closeFile: "ファイルを閉じる",
  explorer: "エクスプローラー",
  noContent: "表示する内容がありません",
  noFileSelected: "ファイル未選択",
  sheetEmpty: "このシートは空です",
  previewUnavailable: "プレビューできません",
  noConflicts: "解決すべき競合はありません",
  createPR: "Pull Request を作成",
  local: "ローカル",
  remote: "リモート",
  noUncommitted: "未コミットの変更はありません",
  failedCommitDetails: "コミット詳細の読み込みに失敗",
  stageToCommit: "変更をステージしてコミット",
  failedDiff: "差分の読み込みに失敗",
  noChanges: "変更なし",
  noCommits: "コミットはまだありません",
  ghNotAuthed: "GitHub CLI が未認証です",
  stashes: "スタッシュ",
  noStashes: "スタッシュなし",
  continueWorktree: "この worktree で作業を続ける",
  deleteArchiveThread: "スレッドを削除してアーカイブ",
  deleteWorktree: "worktree を削除",
  keepWorktree: "worktree を保持",
  failedFileChanges: "ファイル変更の読み込みに失敗",
  aiFilesHint: "AI が変更したファイルがここに表示されます",
  noFileChanges: "ファイル変更なし",
  noThreadSelected: "スレッド未選択",
  previewStartFailed: "プレビューサーバーの起動に失敗",
  noHtmlFiles: "HTML ファイルが見つかりません",
  readyToBrowse: "ブラウズの準備完了",
  reuseBrowserLogin: "ブラウザのログインを再利用",
  noActiveTerminal: "アクティブなターミナルなし",
  tabFiles: "ファイル",
  tabChanges: "変更",
  tabCommit: "コミット",
  tabTerminal: "ターミナル",
  tabBrowser: "ブラウザ",
  tabTools: "ツール",
  moreTabs: "その他のタブ",
  preparingWorkspace: "ワークスペースを準備中…",
  selectFileToPreview: "プレビューするファイルを選択",
  writing: "書き込み中...",
  noFilesYet: "まだファイルがありません。AI がここにファイルを作成します。",
  fileIsLarge: "このファイルは大きいです",
  largeFileHint: "インラインプレビューはアプリが固まる恐れがあります。エディタで開くか、冒頭のみプレビューしてください。",
  previewAnyway: "それでもプレビュー",
  preview: "プレビュー",
  code: "コード",
  truncatedNotice: "大きなファイル——先頭の {{shown}} のみ表示。",
  truncatedNoticeOfTotal: "大きなファイル——{{total}} 中先頭の {{shown}} のみ表示。",
  failedLoadSpreadsheet: "スプレッドシートの読み込みに失敗",
  fileTypeNotSupported: "ファイル形式 .{{extension}} はサポートされていません",
  itemsCount: "{{n}} 項目",
  fileTooLargePreview: "ファイルが大きすぎてプレビューできません（{{size}}）",
  binaryFileInArchive: "バイナリファイル（{{type}}）——アーカイブ内ではプレビュー不可",
  failedLoadArchive: "アーカイブの読み込みに失敗",
  filesCount: "{{n}} ファイル",
  foldersCount: "{{n}} フォルダ",
  totalSize: "合計：{{size}}",
  loadingConflicts: "競合を読み込み中...",
  conflictsCount: "{{n}} 件の競合",
  resolveAllWithAI: "AI ですべて解決",
  resolvingProgress: "{{total}} 中 {{current}} 件目を解決中...",
  abortRebase: "リベースを中止",
  continueRebase: "リベースを続行",
  resolutionLabel: "解決策：",
  clickWandToResolve: "ワンドアイコンをクリックして AI でこの競合を解決",
  titleRequired: "タイトルは必須です",
  failedCreatePR: "PR の作成に失敗",
  createPRForBranch: "ブランチの Pull Request を作成",
  prTitlePlaceholder: "Pull Request のタイトル",
  prBodyPlaceholder: "変更内容を記述...",
  createAsDraft: "ドラフトとして作成",
  createPRShort: "PR を作成",
  noBranch: "ブランチなし",
  newBranchPlaceholder: "新しいブランチ名...",
  fetch: "フェッチ",
  pull: "プル",
  noUpstream: "アップストリーム未設定",
  push: "プッシュ",
  pushSetUpstream: "プッシュしてアップストリームを設定",
  unselectAll: "すべて選択解除",
  selectAll: "すべて選択",
  unselectAllFiles: "{{n}} ファイルの選択をすべて解除",
  selectAllFiles: "{{n}} ファイルをすべて選択",
  conflicts: "競合",
  stagedChanges: "ステージ済みの変更",
  changes: "変更",
  loadingCommitDetails: "コミット詳細を読み込み中...",
  filesChanged: "{{n}} ファイル変更",
  insertions: "{{n}} 行追加(+)",
  deletions: "{{n}} 行削除(-)",
  failedCreateCommit: "コミットの作成に失敗",
  failedGenerateCommitMessage: "コミットメッセージの生成に失敗",
  commitMessagePlaceholder: "コミットメッセージ...",
  generateCommitMessage: "AI でコミットメッセージを生成",
  committing: "コミット中...",
  commit: "コミット",
  loadingDiff: "差分を読み込み中...",
  stagedTag: "（ステージ済み）",
  unstagedTag: "（未ステージ）",
  loadingHistory: "履歴を読み込み中...",
  loadMore: "さらに読み込む",
  ghNotInstalled: "GitHub CLI がインストールされていません",
  install: "インストール",
  stashChanges: "変更をスタッシュ",
  stashMessagePlaceholder: "スタッシュメッセージ（任意）",
  stashing: "スタッシュ中...",
  loadingStashes: "スタッシュを読み込み中...",
  popStash: "スタッシュをポップ",
  dropStash: "スタッシュを削除",
  failedProcess: "処理に失敗",
  prMerged: "PR #{{number}} がマージされました",
  prMergedDesc: "Pull Request が正常にマージされました。この worktree をどうしますか？",
  removeWorktreeAndBranch: "worktree とブランチを削除",
  removeWorktreeArchiveDesc: "worktree を削除して関連スレッドをアーカイブ",
  decideLater: "あとで決める",
  linesCount: "{{n}} 行",
  selectConversationHint: "スレッドを選択してファイル変更を表示",
  loadingFileChanges: "ファイル変更を読み込み中...",
  retry: "再試行",
  changesCount: "{{n}} 件の変更",
  writesCount: "{{n}} 回の書き込み",
  editsCount: "{{n}} 回の編集",
  importedCookies: "{{app}} から {{n}} 個の Cookie をインポート",
  importedCookiesDesc: "ログインを反映するためプレビューを再読み込みしています。",
  importProfileFailed: "ブラウザプロファイルをインポートできません",
  browserDesktopOnly: "アプリ内ブラウザは Alma デスクトップ版でのみ使えます。",
  openInNewTab: "{{url}} を新しいタブで開く",
  openedByAgent: "エージェントが開きました",
  closeTab: "タブを閉じる",
  pinTab: "タブを固定",
  unpinTab: "固定を解除",
  newTab: "新しいタブ",
  runDevServer: "開発サーバーを起動",
  searchHtmlFiles: "HTML ファイルを検索...",
  selectEntryFile: "エントリーファイルを選択",
  installing: "インストール中...",
  starting: "起動中...",
  goBack: "戻る",
  goForward: "進む",
  inspectActiveHint: "要素をクリックして変更内容を記述し、送信（Esc でキャンセル）",
  inspectHint: "要素を選択して AI で編集",
  reuseBrowserLoginTitle: "ブラウザのログインを再利用（Chrome、Edge、Brave などから Cookie をインポート）",
  reuseBrowserLoginDesc: "ブラウザプロファイルから Cookie をインポートして、プレビューをログイン済みにします。macOS では初回にキーチェーンへのアクセスを求められることがあります。",
  envSectionTitle: "環境",
  envSectionDesc: "環境ごとにログイン状態が分かれるため、同じサイトを別のアカウントで同時に開けます。",
  envDefault: "デフォルト",
  envNew: "新しい環境",
  envNewEllipsis: "新しい環境…",
  envEdit: "編集",
  envDelete: "環境を削除",
  envNewTitle: "新しい環境",
  envEditTitle: "環境を編集",
  envDialogDesc: "この環境のタブは、ほかの環境とは別の Cookie とストレージを使います。",
  envNamePlaceholder: "例：仕事、個人、テスト用アカウント",
  envNameTaken: "同じ名前の環境がすでにあります。",
  envColor: "色",
  envCreate: "作成",
  envOpenIn: "環境で開く",
  envSwitchTo: "環境を切り替え",
  envDeleteTitle: "「{{name}}」を削除しますか？",
  envDeleteDesc: "タブは閉じられ、保存されたデータ（ログイン状態、Cookie、サイトデータ）はすべて消去されます。元に戻せません。",
  envClearFailed: "環境のデータを消去できませんでした",
  envImportInto: "{{name}} にインポート",
  findingProfiles: "ブラウザプロファイルを検索中…",
  noProfilesFound: "Chromium ベースのブラウザプロファイルが見つかりません。",
  closePip: "フローティングのピクチャーインピクチャーを閉じる",
  openPip: "ピクチャーインピクチャー——このタブを最前面にフロート表示",
  addressPlaceholder: "検索または URL を入力",
  openInBrowser: "ブラウザで開く",
  unknownError: "不明なエラーが発生しました",
  sendErrorToAI: "エラーを AI に送って診断・修正",
  fixWithAI: "AI で修正",
  noErrorOutput: "エラー出力はありませんでした。",
  installingDeps: "依存関係をインストール中...",
  startingServer: "サーバーを起動中...",
  preparingInstall: "インストールの準備中...",
  initializing: "初期化中...",
  readyToBrowseHint: "アドレスバーに URL を入力するか、このプロジェクトの開発サーバーを起動",
  executionFailed: "実行に失敗",
  run: "実行",
  terminalExited: "ターミナルプロセスが終了しました。",
  closeTerminal: "ターミナルを閉じる",
  newTerminal: "新しいターミナル",
  connected: "接続済み",
  connecting: "接続中...",
  disconnected: "切断されました",
  restart: "再起動",
  createTerminal: "ターミナルを作成",
  discardChanges: "変更を破棄",
  failedGetCILogs: "CI ログの取得に失敗",
  failedMergePR: "PR のマージに失敗",
  failedUpdateFromMain: "main からの更新に失敗",
  canBeMerged: "マージ可能",
  hasConflicts: "競合あり",
  unknownStatus: "不明",
  noWorkspaceSelected: "ワークスペース未選択",
  loadingGitStatus: "git ステータスを読み込み中...",
  failedLoadGitStatus: "git ステータスの読み込みに失敗",
  notGitRepo: "git リポジトリではありません",
  initializeRepository: "リポジトリを初期化",
  loadingPRStatus: "PR ステータスを読み込み中...",
  noPullRequest: "Pull Request なし",
  draftBadge: "ドラフト",
  statusLabel: "ステータス",
  checksLabel: "チェック",
  fix: "修正",
  reviewLabel: "レビュー",
  commitAndPush: "コミット＆プッシュ",
  merge: "マージ",
  focusMode: "フォーカスモード（全幅プレビュー）",
  exitFocusMode: "フォーカスモードを終了（Esc）",
  edit: "編集",
  editFile: "このファイルを編集（Cmd/Ctrl+S で保存）",
  save: "保存",
  editNotSupportedHere: "このファイルはワークスペース外のため、ここでは保存できません",
  externalFile: "外部ファイル",
  externalFileHint: "このファイルはプロジェクトの外にあります。エージェントは読み書きできますが、プロジェクトの一部ではありません: @ には表示されず、ここでは編集できません。",
  missingFileTitle: "ファイルは移動または削除されました",
  missingFileHint: "このパスにはもうありません。移動された場合は、ファイルツリーから開き直してください。",
  missingFileShowFiles: "ファイルツリーを表示"
};
const quickChat = {
  selectModel: "モデルを選択...",
  expandToMain: "メインウィンドウで開く",
  newChat: "新しいチャット",
  scrollToBottom: "最下部へスクロール"
};
const references = {
  kinds: {
    file: "ファイル",
    project: "プロジェクト",
    host: "ホスト",
    agent: "エージェント",
    skill: "スキル",
    prompt: "プロンプト",
    thread: "スレッド",
    message: "メッセージ",
    snippet: "スニペット",
    mission: "ミッション",
    plan: "プラン",
    mcp: "MCP サーバー",
    model: "モデル",
    memory: "メモリ",
    artifact: "アーティファクト",
    tool: "ツール呼び出し",
    task: "タスク",
    provider: "プロバイダー",
    cron: "予約タスク",
    module: "モジュール",
    mail: "メール",
    rearview: "リアビュー",
    crystal: "結晶",
    bundle: "記録バンドル",
    scratch: "一時参照"
  },
  picker: {
    title: "何でも参照",
    searching: "検索中…",
    empty: "一致なし — 別の語か kind: プレフィックスを試してください",
    filterHint: "絞り込み：",
    types: "タイプ",
    unknownType: "「{{name}}」という参照タイプはありません — 下から選択",
    pickType: "タイプを選択",
    viewAll: "すべての{{kind}}を表示 →",
    back: "すべての種類に戻る",
    favorites: "お気に入り"
  },
  chip: {
    copied: "参照をコピーしました",
    missing: "存在しません",
    expired: "参照は期限切れ",
    loading: "読み込み中…",
    backlinks_one: "{{count}} 件のメッセージで言及",
    backlinks_other: "{{count}} 件のメッセージで言及",
    noBacklinks: "まだチャットメッセージでの言及はありません",
    open: "開く",
    insert: "メンション",
    copy: "コピー",
    thisThread: "このスレッド",
    related: "関連"
  },
  actions: {
    referenceMessage: "このメッセージを参照",
    referenceSelection: "選択範囲を参照",
    quoteSelection: "選択範囲を引用",
    referenceFile: "チャットで参照",
    snippetCaptured: "スニペット参照として保存しました"
  },
  link: {
    action: "リンク",
    title: "「{{title}}」からリンク…",
    searchPlaceholder: "リンクする対象を検索…",
    linked: "{{title}} にリンクしました",
    remove: "リンクを解除"
  },
  scope: {
    thread: "このスレッド",
    project: "このプロジェクト",
    global: "全体"
  },
  messageRefs: {
    menuItem: "参照関係",
    title: "このメッセージへの参照",
    empty: "まだ参照はありません",
    mentionedBy: "言及元"
  },
  timeline: {
    select: "このターンを選択",
    deselect: "選択解除",
    createSnippet: "スニペット作成（{{count}}）",
    clear: "選択をクリア",
    createBundle: "バンドル化"
  },
  snippetDialog: {
    title: "{{count}} ターンからスニペットを作成",
    nameLabel: "名前",
    namePlaceholder: "空欄で AI が命名",
    aiSummary: "AI 要約も生成（原文は保持）",
    hint: "スニペットは元の会話とツール呼び出しを保持し、ソースへのバックリンクを自動作成します。@snippet でどこからでも参照できます。",
    create: "作成",
    created: "スニペット「{{title}}」を作成しました"
  },
  selectionSnippet: {
    title: "テキストスニペットを作成",
    namePlaceholder: "任意（例：一緒に読む）",
    hint: "名前は @ 検索と短縮表示に使われ、参照時には元の全文が保持されます。"
  },
  renameSnippet: {
    action: "スニペット名を変更",
    title: "スニペット名を変更",
    placeholder: "空欄で本文プレビューに戻す",
    hint: "名前だけを変更し、原文、出典、既存の参照は変更しません。",
    saved: "スニペット名を更新しました"
  },
  deleteSnippet: {
    action: "スニペットを削除",
    title: "このスニペットを削除しますか？",
    description: "「{{title}}」は完全に削除され、送信済みメッセージ内の参照は解決できなくなります。",
    confirm: "削除",
    deleted: "スニペットを削除しました"
  },
  recipes: {
    ready: "「{{title}}」— これらの材料は繰り返しタスクとして抽出できます",
    extract: "抽出",
    dismiss: "無視",
    prefilled: "抽出プロンプトを入力欄に設定しました"
  },
  scratch: {
    add: "参照に追加",
    addPage: "ページ全体を参照に追加",
    addSelection: "選択テキストを参照に追加",
    addImage: "画像を参照に追加",
    addMedia: "メディアを参照に追加",
    added: "参照に追加しました（30 分間有効）",
    title: "参照",
    description: "いま一緒に話したい材料。30 分後に自動で消えます。残したいものは @ に昇格を。",
    empty: "一時参照はまだありません。ファイル、メッセージの文字や画像、ページを右クリックして「参照に追加」。",
    insert: "この質問に追加",
    promote: "@ に昇格",
    promoted: "正式な参照として保存しました",
    remove: "削除",
    kept: "保存済み",
    minutesLeft: "残り {{count}} 分",
    expiringSoon: "「{{label}}」はあと 3 分で期限切れ",
    expiringHint: "残す価値があれば @ に昇格を。そうでなければ自動で消えます。",
    limit: "1 回の質問に付けられる一時参照は 5 個まで",
    noThread: "先に会話を開いてください。昇格したスニペットはその会話に入ります",
    countBadge: "一時参照 {{count}} 件",
    inserted: "追加済み",
    searchPlaceholder: "参照を絞り込む…",
    noMatch: "「{{query}}」に一致する参照はありません",
    selectedCount: "{{count}} 件選択中",
    clearSelection: "解除",
    insertSelected: "{{count}} 件をこの質問に追加",
    select: "選択",
    deselect: "選択解除",
    kinds: {
      text: "テキスト",
      file: "ファイル",
      image: "画像",
      web: "ウェブページ",
      media: "メディア"
    }
  },
  surfaceActions: {
    openInBrowser: "ブラウザで開く",
    viewDateRecords: "日付の記録と予定を見る",
    goToThread: "このスレッドへ移動",
    goToMessage: "このメッセージへ移動",
    loginTerminal: "ターミナルでログイン",
    viewHostSettings: "ホスト設定",
    openInEditor: "エディタで開く",
    needWorkspace: "このスレッドにはワークスペースがありません。ターミナルを作成するには先に開いてください。"
  }
};
const channels = {
  email: {
    title: "メールアカウント",
    description: "管理するメールボックスを接続（IMAP 受信、SMTP 送信）。新着メールは受信トレイの素材となり、@ 参照で必要に応じて処理します。自動でスレッド化はされません。",
    addAccount: "アカウント追加",
    accountName: "表示名（例：研究室メール）",
    username: "ユーザー名（既定はアドレス）",
    password: "パスワード / アプリパスワード",
    passwordHint: "アプリ専用パスワードを推奨します（Gmail/QQ/163 対応）。ローカルにのみ保存されます。",
    test: "接続テスト",
    save: "接続",
    testOk: "IMAP + SMTP OK",
    testFailed: "接続に失敗しました",
    noAccounts: "メールアカウントはまだ接続されていません。",
    checkNow: "今すぐ受信",
    notifyOn: "新着メール通知: オン(クリックでオフ)",
    notifyOff: "新着メール通知: オフ(クリックでオン)",
    pendingBadge: "未処理 {{count}} 件",
    inboxTitle: "受信トレイ（素材庫）",
    inboxHint: "新着メールはここに素材として届きます。チャットで @メール として参照して処理（分類・添付抽出・返信草稿）。草稿はここに戻り、確認後にのみ送信されます。",
    inboxEmpty: "何もありません。",
    noSubject: "（件名なし）",
    status_pending: "未処理",
    status_done: "完了",
    status_dismissed: "無視",
    draftBadge: "草稿確認待ち",
    draftTo: "草稿 → {{to}}",
    confirmSend: "確認して送信",
    discardDraft: "草稿を破棄",
    sentAt: "送信済み {{at}}",
    markDone: "完了にする",
    dismiss: "無視",
    reopen: "再開"
  }
};
const support = {
  entryTitle: "公式サポート（ゼロ権限）",
  entryDescription: "Alma チームが知識と診断体系を管理し、あなた自身のモデルと計算資源で動くサポート。ツールを一切持たず、ファイルや設定に触れられず、認証情報は決して受け取りません。",
  entryButton: "サポートセッションを開始",
  title: "Alma 公式サポート",
  subtitle: "ツールなし・ファイルアクセスなし・認証情報も受け取りません — ローカルで強制。",
  greeting: "問題を説明してください — インストール、モデル設定、機能、トラブルシューティング。共有する証拠は必ずあなたが先にプレビューし確認します。",
  offlineNoModel: "オフライン診断モード：利用可能なモデルがないため、ローカルのルールエンジンが応答します。モデル接続の問題にはまさにこのモードが対応します。",
  offlineModelFailed: "オフライン診断モード：モデルが応答しなかったため、このターンはローカルのルールエンジンが応答しました。",
  inputPlaceholder: "問題を説明…（Enter で送信）",
  defenseTitle: "ローカル防御",
  defenseRules: "サポートは決して：ファイルを読む、コマンドを実行、設定を変更、パスワード/API キーを要求できません。該当内容はここで遮断され、深刻な逸脱はセッションを切断します。",
  exportsTitle: "証拠を提示（先にプレビュー）",
  export_version: "バージョン情報",
  export_errors: "エラー概要",
  export_tasks: "最近のタスク状態",
  export_rearview: "リアビュー足跡",
  exportPreviewHint: "下で確認・削除してください — 確認した内容だけが入力欄に入り、送信するのはあなただけです。",
  exportInsert: "入力欄に挿入",
  defenseLog: "防御イベント",
  defenseLogEmpty: "遮断なし。",
  kill: "セッション切断",
  terminated: "セッション切断：{{reason}}",
  killedByUser: "あなたが切断",
  zeroPermBadge: "ゼロ権限"
};
const crystal = {
  dockTitle: "結晶化",
  emptySlot: "空きスロット {{n}}",
  contourHint: "形成中の晶核：{{count}} 個",
  backpack: "バックパック（休眠）",
  formal: "正式な結晶",
  empty: "まだ結晶活動はありません。繰り返される呼称は自然に育ちます。Timeline のカードを複数選択して晶種を植えることもできます。",
  recall: "バックパックへ戻す",
  wake: "スロットへ起こす",
  originSeed: "晶種",
  originNucleus: "晶核",
  stageCandidate: "候補",
  stageFormal: "正式",
  subtitle: "出典が追跡でき、チェックリストが揃い、あなたが承認して初めて正式な @オブジェクトになります。",
  termStats: "{{count}} 回 · {{turns}} ターン · {{threads}} スレッド · {{days}} 日",
  materials: "形成材料（{{count}}）",
  noMaterials: "まだ材料がありません。",
  type: "オブジェクト種別",
  type_entity: "実体／イベント",
  type_concept: "概念",
  type_claim: "主張",
  type_process: "プロセス",
  type_rule: "ルール",
  type_project: "プロジェクト",
  checklist: "固定チェックリスト",
  prefill: "AI 下書き（承認はしない）",
  fieldMissing: "内容または出典が未記入",
  fieldConflict: "未解決の衝突",
  markConflict: "衝突をマーク",
  clearConflict: "衝突を解除",
  fieldPlaceholder: "内容（保存時に出典を記録）",
  sources: "出典",
  readyTitle: "結晶化の条件が揃いました",
  readyHint: "確認すると候補 ID がそのまま正式 @オブジェクトに昇格します。履歴・材料・バックリンクは保持され、実行権限は付与されません。",
  confirm: "結晶化を確認",
  cancelToBackpack: "キャンセル（バックパックへ）",
  bundleTitle: "記録バンドルを作成（{{count}} 枚）",
  bundleSubtitle: "バンドルは元カードへのポインタのみを保持します。内容は複製しません。",
  bundleNamePlaceholder: "観察方向の名前（晶種には必須）",
  bundleAsSeed: "同時に晶種を植えて以降の会話を観察（スロットを 1 つ使用）",
  slotsFull: "3 スロットが満杯です。先にドックで晶種を回収してください。",
  field_identity: "アイデンティティ",
  field_time: "時間",
  field_participants: "参加者",
  field_source: "出典",
  field_status: "状態",
  field_definition: "定義",
  field_includes: "含む範囲",
  field_excludes: "除外範囲",
  field_examples: "実例",
  field_statement: "主張",
  field_scope: "範囲",
  field_supporting: "支持材料",
  field_opposing: "反証材料",
  field_trigger: "トリガー",
  field_inputs: "入力",
  field_steps: "手順",
  field_outputs: "出力",
  field_failure_handling: "失敗処理",
  field_permissions: "権限",
  field_subjects: "適用対象",
  field_conditions: "発効条件",
  field_forbidden_allowed: "禁止と許可",
  field_exceptions: "例外",
  field_stop_conditions: "停止条件",
  field_goal: "目標",
  field_deliverables: "成果物",
  field_version: "バージョン",
  field_rights_status: "権利状態",
  related: "関連する結晶（共有材料）",
  sharedMaterials: "共有 {{count}}",
  settings: {
    title: "結晶化",
    description: "繰り返される呼称が候補オブジェクトへ凝結する仕組み。受動経路は1ターンごとに小型モデルを1回使います。スイッチとしきい値はあなたのものです。",
    passive: "受動観察（LLM による呼称抽出）",
    passiveHint: "オフにすると小型モデルを消費しません。オフの間のターンは遡って解析されません。晶種のスキャンには影響しません。",
    semantic: "晶種の意味スキャン",
    semanticHint: "ローカル埋め込みモデルが既に読み込まれている場合のみ動作し、ダウンロードや通信は行いません。",
    gatesHint: "しきい値は分散度で判定します（同一メッセージ内の繰り返しは1回）。",
    contour: "輪郭",
    nucleus: "晶核",
    count: "回数",
    turns: "ターン",
    spread: "分散",
    dormant: "休眠",
    days: "日間新材料がなければバックパックへ",
    reset: " 既定に戻す"
  }
};
const mentions = {
  tab: "メンション",
  emptyHint: "@ で対象を選ぶとここに開きます — 内容、または使い方が表示されます。",
  pin: "開いたままにする",
  unpin: "固定を解除",
  pinHint: "タブを開いたままにするだけです。以降のメッセージに対象を添付しません。",
  thread: {
    you: "あなた",
    assistant: "Alma",
    messages: "{{count}} 件のメッセージ",
    earlier: "前の {{count}} 件は表示していません"
  }
};
const projectSuggestion = {
  createTitle: "これらの会話をひとつのプロジェクトにしますか？",
  linkTitle: "この会話をプロジェクトに入れますか？",
  defaultReason: "これらの会話は同じことを繰り返し扱っています。",
  bannerCreate: "いくつかの会話が同じ取り組みに見えます",
  bannerLink: "この会話は既存のプロジェクトの一部に見えます",
  viewDraft: "下書きを見る",
  name: "プロジェクト名",
  understanding: "Alma の理解",
  focus: "現在の状況",
  threads: "含まれる会話",
  remove: "これは別の話",
  putBack: "戻す",
  conclusions: "決まったこと",
  location: "保存場所",
  choose: "選択…",
  noMigration: "会話をプロジェクトに関連付けるだけです。ファイルの移動やコピーはしません。既存のファイルはそのまま、以後の作業はプロジェクトフォルダを使います。",
  feedbackIntro: "ずれていますか？そのまま Alma に伝えれば書き直します。自分で直す必要はありません。",
  feedbackPlaceholder: "例：この2つは別の話 / 重点がずれている / この目標が抜けている",
  revise: "書き直す",
  revising: "書き直し中…",
  notNow: "今はしない",
  confirmCreate: "プロジェクトを作成",
  confirmLink: "プロジェクトに追加",
  created: "「{{name}}」を作成しました"
};
const threadBrief = {
  settings: {
    title: "会話の要約",
    description: "会話が一段落すると、Alma がバックグラウンドで短い要約を書きます。「やること」の自動タグとプロジェクト提案はこの要約に基づきます。",
    reset: "リセット",
    enabled: "バックグラウンドで会話を要約する",
    enabledHint: "実質的な追加があったときだけ小さいモデルを1回呼びます。既定では有効化後の会話のみ。古い会話はあなたが指定したときだけ読みます。",
    autoTodo: "「あとでやる」と言ったら「やること」に入れる",
    autoTodoHint: "あなた自身の意思表明のみ。提案・仮定・いま実行する指示は対象外で、変更済みのステータスは上書きしません。",
    projectSuggestions: "会話が収束したらプロジェクトを提案する",
    projectSuggestionsHint: "常に確認待ちの下書きです。自動で作成・関連付け・移動は行いません。",
    budget: "予算",
    minUserTurns: "最小ターン数",
    minNewChars: "新規文字数",
    cluster: "収束のしきい値",
    clusterThreads: "会話数",
    clusterSpread: "日数",
    clusterHint: "プロジェクトと呼ぶまでにどれだけ繰り返しが必要か。キーワードが同じだけでは足りません。"
  }
};
const layout = {
  reset: "レイアウトをリセット",
  resetAction: "リセット",
  resetDesc: "サイドバーと右側パネルの幅を既定に戻します。",
  dividerHint: "ダブルクリックで既定の幅に戻す"
};
const translate = {
  action: "翻訳",
  busy: "翻訳中…",
  clickToRevert: "クリックで原文を表示",
  failed: "翻訳できませんでした。もう一度お試しください。"
};
const codeBlock = {
  copyCode: "コードをコピー",
  copied: "コピーしました！"
};
const ttsDownload = {
  loading: "{{label}}の音声を読み込み中…",
  downloading: "{{label}}の音声をダウンロード中",
  preparing: "初回利用に向けて音声を準備中…",
  progress: "{{downloaded}} / {{total}}",
  starting: "開始しています…",
  ready: "{{label}}の音声の準備ができました",
  failed: "{{label}}の音声のダウンロードに失敗しました"
};
const hooks = {
  events: {
    "chat.message.willSend": "メッセージ送信前",
    "chat.message.didReceive": "メッセージ受信後",
    "chat.system.transform": "システムプロンプト変換",
    "chat.params.transform": "チャットパラメータ変換",
    "tool.willExecute": "ツール実行前",
    "tool.didExecute": "ツール実行後",
    "tool.onError": "ツールエラー時",
    "thread.created": "スレッド作成時",
    "thread.deleted": "スレッド削除時",
    "thread.activated": "スレッド切り替え時",
    "app.ready": "アプリ起動完了時",
    "app.willQuit": "アプリ終了前"
  },
  matchHints: {
    messageContent: "メッセージ内容",
    toolName: "ツール名"
  },
  discard: "破棄",
  save: "保存"
};
const providerStatus = {
  notConfigured: "未設定",
  active: "有効",
  disabled: "無効",
  inactive: "非アクティブ"
};
const team = {
  common: {
    join: "参加",
    startHosting: "ホストを開始",
    someone: "誰か",
    today: "今日",
    almaAnswering: "Alma が回答中",
    connectingRelay: "リレーに接続中…"
  },
  landing: {
    title: "チーム",
    intro: "Alma 同士で共有するチャンネルです。共有されるのは投稿した内容だけで、自分のチャットがこのマシンの外に出ることはありません。",
    joinWithLink: "リンクで参加",
    hostTeam: "チームをホスト",
    yourName: "あなたの名前",
    yourNameOrganizer: "あなたの名前（主催者として表示）",
    emailPlaceholder: "Gravatar 用のメールアドレス（このマシンにのみ保存）",
    askOrganizer: "主催者にリンクをもらってください。",
    inviteAfter: "このあとすぐにメンバーを招待できます。"
  },
  header: {
    archived: "アーカイブ済み",
    disconnected: "切断されました",
    reconnecting: "再接続中…",
    reopenChannel: "チャンネルを再開",
    archiveChannel: "チャンネルをアーカイブ",
    archiveChannelHint: "チャンネルをアーカイブ（履歴は残り、新しい投稿は停止）",
    hideMembers: "メンバーを隠す",
    showMembers: "メンバーを表示",
    searchMessages: "メッセージを検索",
    clearSearch: "検索をクリア"
  },
  rail: {
    channels: "チャンネル",
    newChannelPlaceholder: "new-channel",
    newChannelName: "新しいチャンネル名",
    addChannel: "チャンネルを追加",
    sharedThreads: "共有スレッド",
    archived: "アーカイブ済み"
  },
  images: {
    encodeFailed: "画像をエンコードできませんでした",
    readFailed: "画像を読み込めませんでした"
  },
  savePerson: {
    inPeople: "People に登録済み",
    saveToPeople: "People に保存"
  },
  composer: {
    mentionCandidates: "メンション候補",
    replyingTo: "<name>{{name}}</name> に返信",
    cancelReply: "返信をキャンセル",
    draftedByAlma: "あなたの Alma による下書きです。そのまま投稿、編集、または",
    discard: "破棄",
    uploading: "アップロード中",
    removeAttachment: "{{name}} を削除",
    placeholderWithImages: "メッセージを追加、またはそのまま送信",
    placeholder: "{{channel}} にメッセージ",
    silentHint: "主催者がチームの Alma をサイレントに設定しています",
    silent: "ここでは Alma は応答しません",
    askOnHint: "チームの Alma がこの投稿に回答します",
    askOffHint: "@alma を含めない限り、この投稿はメンバーだけが見ます",
    almaWillAnswer: "Alma が回答します",
    askAlma: "Alma に聞く",
    addImage: "画像を追加",
    addImageHint: "画像を追加（貼り付けやドロップも可）",
    post: "投稿"
  },
  members: {
    title: "メンバー",
    countOnline: "{{total}} · {{online}} オンライン",
    organizer: "主催者",
    organizerYou: "主催者 · あなた",
    you: "あなた",
    away: "離席中",
    online: "オンライン",
    loading: "読み込み中"
  },
  invite: {
    relayOffHint: "招待リンクは Alma リレーを経由するので、どこからでも開けます。",
    turnOnRelay: "リレーをオンにする",
    signInHint: "一度サインインすると、このホストをリレー経由で公開できます。",
    relayError: "リレー: {{error}}",
    relayUnreachable: "現在リレーに接続できません。",
    linkCopied: "招待リンクをコピーしました",
    link: "招待リンク",
    thisNetworkOnly: "このネットワーク内でのみ有効",
    singleUseWeek: "1 回限り · 7 日間有効",
    another: "別のリンク",
    waiting: "待機中",
    sameNetwork: "同じネットワーク？",
    copyLocalLink: "ローカルリンクをコピー",
    copyInviteLink: "招待リンクをコピー",
    opensAnywhere: "リレー経由でどこからでも開けます。"
  },
  messages: {
    yesterday: "昨日",
    replyToThis: "これに返信",
    usedTools_other: "{{count}} 個のツールを使用",
    almaAnsweringEllipsis: "Alma が回答中…",
    imageN: "画像 {{n}}",
    reply: "返信",
    replyLower: "返信"
  },
  privatePane: {
    sharedWithTeam: "チームと共有中",
    onlyYouHint: "チームの誰もこの会話を見られません",
    onlyYou: "自分のみ",
    shareWithTeam: "チームと共有"
  },
  search: {
    searching: "検索中",
    searchingEllipsis: "検索中…",
    noResults: "<q>「{{query}}」</q> に一致するものはありません",
    results_other: "<q>「{{query}}」</q> の検索結果 {{count}} 件",
    newest50: "（最新 50 件）",
    you: "あなた",
    images_other: "画像 {{count}} 枚"
  },
  settings: {
    title: "チーム",
    intro: "他の Alma が参加できるチャンネルをホストするか、チームメイトのチャンネルに参加します。共有されるのはチャンネルに投稿した内容だけで、プライベートなチャットが入力したマシンの外に出ることはありません。",
    hostingAs: "{{name}} としてホスト中",
    portValue: "ポート {{port}}",
    lanValue: "LAN {{addresses}}",
    hostHint: "メンバーは招待リンクで参加します。Alma リレー経由でどこからでも、または LAN 経由で参加できます。",
    stopHosting: "ホストを停止",
    shownAsOrganizer: "主催者として表示されます",
    emailLabel: "Gravatar 用のメールアドレス",
    staysOnMachine: "このマシンにのみ保存",
    staysOnMachineLong: "このマシンにのみ保存（チームには画像だけが表示されます）",
    port: "ポート",
    memberOf: "{{team}} のメンバー",
    aTeam: "チーム",
    joinTeam: "チームに参加",
    asName: "{{name}} として",
    clientState: {
      idle: "待機中",
      connecting: "接続中",
      connected: "接続済み",
      error: "エラー",
      reconnecting: "再接続中"
    },
    joinHint: "主催者から受け取った招待リンクを貼り付けてください。",
    leave: "退出",
    howTeamSeesYou: "チームに表示される名前",
    profileTitle: "あなた",
    profileHint: "チームに表示される名前と Gravatar。",
    name: "名前",
    relayOff: "オフ — LAN 内の人だけが参加できます。",
    relaySignInHint: "一度サインインすると LAN 外の人も参加できます。ポート転送は不要です。",
    relayError: "リレーエラー",
    reachAnywhere: "どこからでも接続",
    copyRelayUrl: "リレー URL をコピー",
    inviteTitle: "招待",
    inviteHint: "各リンクで参加できるのは 1 人までで、1 週間で期限切れになります。",
    inviteForPlaceholder: "招待する相手（任意）",
    newInvite: "新しい招待",
    copyInviteLink: "招待リンクをコピー",
    linkNetworkOnly: "このリンクはあなたのネットワーク内でのみ有効です。",
    noAddress: "このマシンに到達できるアドレスがありません。",
    reasonRelayOff: "どこからでも開けるリンクにするには、上の「どこからでも接続」をオンにしてください。",
    reasonSignIn: "どこからでも開けるリンクにするには、上でサインインしてください。",
    reasonError: "リレーが起動していません。",
    reasonErrorDetail: "リレーが起動していません — {{error}}。",
    reasonConnecting: "リレーに接続中です。少し待ってからもう一度作成すると、どこからでも開けるリンクになります。",
    singleUseExpires: "1 回限り · {{date}} に期限切れ",
    codeAndAddresses: "コードとアドレス",
    code: "コード",
    copyCode: "コードをコピー",
    address: "アドレス",
    copyHostAddress: "ホストアドレスをコピー",
    noMembers: "まだ誰も参加していません。",
    membersOnline_other: "メンバー {{count}} 人 · {{online}} オンライン",
    revoked: "取り消し済み",
    revoke: "取り消す",
    modes: {
      silent: {
        label: "サイレント",
        help: "メンバーには、@alma でも一切回答しません。あなたはここから引き続き質問できます。"
      },
      onMention: {
        label: "メンション時",
        help: "@alma を含む投稿や、メンバーが回答を求めた投稿に回答します。"
      },
      topics: {
        label: "トピック",
        help: "メンション時と同じに加え、下のトピックのいずれかに触れた投稿にも回答します。"
      }
    },
    teamAlma: "チームの Alma",
    teamAlmaHint: "チームの Alma がメンバーに回答するタイミング。自分のマシンでは制限されません。",
    topicsLabel: "トピック — 1 行に 1 つ。メンバーには @ の候補として表示されます",
    answersPerHour: "1 時間あたりの回答数 — 空欄は無制限",
    answersPerMemberAria: "メンバーごとの 1 時間あたりの回答数",
    perMember: "メンバーごと",
    answersPerChannelAria: "チャンネルごとの 1 時間あたりの回答数",
    perChannel: "チャンネルごと",
    channelsHint: "すべてのメンバーがすべてのチャンネルを見られます。",
    posts_other: "{{count}} 件の投稿",
    newChannelPlaceholder: "新しいチャンネル"
  }
};
const herdr = {
  notify: {
    needsYou: "入力が必要です",
    finished: "完了しました",
    open: "開く",
    tab: "タブ {{n}}"
  },
  toggle: {
    label: "サイドバー",
    shortcut: "サイドバーを切り替え (⌘⇧A)"
  },
  add: {
    title: "コンピュータを追加",
    description: "そのコンピュータの Alma の「設定 › モバイル」にあるペアリングリンクを貼り付けてください。",
    link: "ペアリングリンク",
    name: "名前",
    optional: "任意",
    checking: "リンクを確認中…",
    add: "追加"
  },
  manage: {
    title: "コンピュータ",
    description: "ここからエージェントを操作できるコンピュータ。",
    empty: "ほかのコンピュータはまだありません。",
    name: "名前",
    forget: "削除",
    forgetTitle: "{{name}} を削除しますか？",
    forgetDescription: "再度追加するにはペアリングリンクが必要です。"
  },
  rename: {
    placeholder: "名前",
    rename: "名前を変更",
    tabTitle: "タブ名を変更",
    workspaceTitle: "ワークスペース名を変更"
  },
  newWorkspace: {
    title: "新規ワークスペース",
    folder: "フォルダ",
    folderHint: "そのコンピュータ上のフォルダ。空欄ならホームフォルダです。",
    recent: "最近",
    name: "名前",
    start: "起動",
    nothing: "なし",
    create: "作成",
    menu: "新規ワークスペース…"
  },
  host: {
    thisMac: "この Mac",
    thisComputer: "このコンピュータ",
    computers: "コンピュータ",
    add: "コンピュータを追加…",
    manage: "コンピュータを管理…",
    reconnect: "再接続",
    noKeychain: "このコンピュータは鍵を安全に保存できないため、ほかのコンピュータを記憶できません。"
  },
  route: {
    notConnected: "未接続",
    direct: "ローカルネットワーク",
    relay: "Relay 経由",
    connecting: "接続中…",
    relayReconnecting: "再接続中 · Relay 経由",
    offline: "オフライン",
    directToast: "同じ Wi-Fi に接続中",
    directToastDetail: "コンピュータへ直接接続。より速く、なめらかに。"
  },
  sidebar: {
    agentsOn: "{{name}} のエージェント",
    more: "その他",
    reconnect: "再接続",
    needsYou: "対応待ち",
    panes_other: "{{count}} ペイン",
    workspaces: "ワークスペース",
    newTab: "新規タブ",
    today: "今日",
    yesterday: "昨日",
    earlier: "それ以前",
    allProjects: "すべてのプロジェクト",
    all: "すべて",
    needsInput: "入力待ち",
    done: "完了",
    working: "作業中…",
    nothingHere: "まだ会話はありません",
    unread: "未読",
    showUnread: "未読だけ表示",
    showAll: "すべて表示",
    allRead: "すべて既読です"
  },
  newTab: {
    button: "新規タブ",
    failed: "新しいタブを開けませんでした：{{error}}",
    elsewhere: "ほかのワークスペース"
  },
  sort: {
    label: "並べ替え",
    herdr: "herdr の順",
    status: "状態順",
    name: "名前順"
  },
  menu: {
    renameWorkspace: "ワークスペース名を変更…",
    muteWorkspace: "通知をミュート",
    unmuteWorkspace: "ミュートを解除",
    moveUp: "上へ移動",
    moveDown: "下へ移動",
    closeWorkspace: "ワークスペースを閉じる…",
    renameTab: "タブ名を変更…",
    muteTab: "通知をミュート",
    unmuteTab: "ミュートを解除",
    closeTab: "タブを閉じる…",
    muteFailed: "通知を変更できませんでした：{{error}}",
    moveFailed: "移動できませんでした：{{error}}"
  },
  close: {
    title: "{{name}} を閉じますか？",
    tabDescription: "このタブのエージェントは終了します。セッションはコンピュータに残ります。",
    workspaceDescription: "このワークスペースのタブがすべて閉じ、エージェントは終了します。",
    tabAction: "タブを閉じる",
    workspaceAction: "ワークスペースを閉じる",
    failed: "閉じられませんでした：{{error}}"
  },
  empty: {
    connecting: "接続中…",
    unreachable: "{{name}} に接続できません",
    tooOld: "ここでエージェントを使うには、そのコンピュータの Alma をアップデートしてください。",
    offline: "herdr が起動していません",
    offlineDetail: "そのコンピュータで herdr を起動すると、エージェントがここに表示されます。",
    noWorkspaces: "ワークスペースがありません",
    noWorkspacesDetail: "作成すると、フォルダでエージェントを実行できます。"
  },
  status: {
    blocked: "入力待ち",
    working: "作業中",
    done: "完了",
    idle: "待機中",
    unknown: "—"
  },
  page: {
    pick: "{{name}} のエージェント",
    pickDetail: "サイドバーでエージェントを選ぶと、チャットや画面を表示できます。",
    paneClosed: "ペインは閉じられました",
    paneClosedDetail: "このペインはもうコンピュータで開かれていません。",
    nothingWaiting: "今は対応が必要なものはありません",
    all: "すべて",
    nothingWaitingDetail: "完了したエージェントや質問しているエージェントがここに表示されます。",
    nothingWorking: "作業中のエージェントはありません",
    nothingWorkingDetail: "ターンを実行中のエージェントがここに表示されます。",
    noAgents: "エージェントはまだありません",
    noAgentsDetail: "サイドバー上部の新規ボタンから始めましょう。"
  },
  remoteScreen: {
    title: "リモート画面",
    open: "{{name}} の画面を表示して操作",
    video: "ライブ",
    stills: "スナップショット",
    clickToControl: "クリックで操作",
    typing: "キー入力は相手側へ",
    unavailable: "{{name}} の画面を表示できません",
    unavailableDetail: "その Mac で Alma を開き、画面収録とアクセシビリティを許可してください。",
    thisComputer: "いま使っているコンピュータです"
  },
  simulator: {
    title: "シミュレータ",
    open: "このコンピュータのシミュレータや Android エミュレータを開く",
    openLocal: "Simulator を開く",
    home: "ホーム (⌘⇧H)",
    screenshot: "スクリーンショット (⌘S)",
    rotate: "回転 (⌘← ⌘→)",
    shake: "シェイク",
    hardware: "デバイスのボタン",
    lock: "ロック",
    volumeUp: "音量を上げる",
    volumeDown: "音量を下げる",
    popOut: "別ウインドウで開く",
    dock: "チャットの横に戻す",
    close: "閉じる",
    keepOnTop: "常に手前に表示",
    saved: "スクリーンショットをダウンロードに保存し、コピーしました",
    none: "このコンピュータにシミュレータがありません。Xcode か Android Studio をインストールするか、Alma を更新してください。",
    other: "その他",
    running: "実行中",
    gone: "このシミュレータは終了しました。",
    booting: "シミュレータを起動しています…",
    failed: "{{name}} のシミュレータを表示できません",
    back: "戻る (⌘⌫)",
    homeAndroid: "ホーム",
    recents: "最近使ったアプリ",
    power: "電源ボタン"
  },
  pane: {
    chat: "チャット",
    screen: "ターミナル",
    view: "表示",
    showScreen: "ターミナルを表示",
    working: "作業中…"
  },
  chat: {
    loadEarlier: "以前のメッセージを読み込む",
    noTranscriptYet: "このセッションでエージェントはまだ何も書いていません。",
    noTranscript: "このペインのエージェントは記録を共有しません。画面表示を使ってください。",
    unsupportedAgent: "{{name}} のチャットをここで読むには、コンピュータの Alma をアップデートしてください。それまでは画面表示を使ってください。",
    queued_other: "{{count}} 件待機中",
    sentWhileWorking: "作業中に送信",
    recap: "振り返り",
    teammateMessage: "@{{name}} からのメッセージ",
    thinking: "思考",
    toBottom: "一番下へ"
  },
  composer: {
    placeholder: "{{name}} にメッセージ",
    attach: "ファイルを添付",
    send: "送信",
    edit: "編集",
    file: "ファイル",
    remove: "削除",
    tooBig: "{{name}} は 30 MB を超えています。",
    suggestionHint: "クリックで送信、右クリックで編集してから送信。"
  },
  annotate: {
    action: "注釈",
    title: "画像に注釈",
    header: "画像の注釈（番号は画像上の領域に対応）：",
    regionPlaceholder: "ここはどうしましたか？",
    notePlaceholder: "補足（任意）",
    hint: "画像の該当箇所を囲み、それぞれについて書き添えてください",
    add: "メッセージに追加",
    loadFailed: "画像を読み込めませんでした。"
  },
  restart: {
    restart: "{{name}} を再起動",
    restartDetail: "終了して同じセッションを開き直す",
    "continue": "再起動して続行",
    continueDetail: "その後「{{prompt}}」を送信",
    quitting: "{{name}} を終了中…",
    reopening: "セッションを開き直し中…",
    back: "{{name}} が戻りました",
    retry: "再試行",
    line: "再起動 · {{time}}"
  },
  prompt: {
    waiting: "あなたの応答待ち",
    typeSomething: "入力する",
    changed: "コンピュータ側で質問が変わりました。何も送信していません。"
  },
  screen: {
    loading: "画面を読み込み中…",
    reflow: "ウィンドウに合わせて折り返す",
    original: "元の幅",
    fit: "縮小して全体を表示",
    width: "画面の幅",
    smaller: "文字を小さく",
    larger: "文字を大きく",
    typeCommand: "コマンドを入力",
    terminalInput: "ターミナル入力",
    clickToType: "クリックしてターミナルに入力",
    send: "送信",
    showKeys: "キーを表示",
    hideKeys: "キーを隠す"
  },
  subagent: {
    title: "サブエージェント",
    working: "作業中",
    failed: "失敗",
    done: "完了",
    calls_other: "ツール呼び出し {{count}} 回",
    outdated: "サブエージェントの各ステップを見るには、コンピュータの Alma をアップデートしてください。結果は以下のとおりです。",
    missing: "この Claude Code のバージョンはサブエージェントの記録を残しません。",
    loadFailed: "サブエージェントを読み込めませんでした",
    pill_other: "{{count}} 個のサブエージェントが作業中",
    openLog: "サブエージェントのログを開く"
  },
  errors: {
    http: "コンピュータが HTTP {{status}} を返しました。"
  },
  time: {
    now: "たった今",
    minutes: "{{count}}分",
    hours: "{{count}}時間"
  },
  steps: {
    separator: "、",
    command_other: "コマンドを {{count}} 件実行",
    edit_other: "ファイルを {{count}} 件編集",
    read_other: "ファイルを {{count}} 件読み込み",
    search_other: "{{count}} 回検索",
    web_other: "ページを {{count}} 件参照",
    agent_other: "サブエージェントを {{count}} 件実行",
    other_other: "ほか {{count}} ステップ"
  }
};
const ja = {
  timeClues,
  remoteHandoff,
  dateReference,
  conversationTime,
  app,
  navigation,
  providers,
  chat,
  reasoning,
  settings,
  main,
  languageSwitcher,
  speech,
  titlebar,
  share,
  label,
  common,
  phone,
  sidebar,
  windowControls,
  errors,
  warnings,
  gallery,
  capture,
  liveCoding,
  onboarding,
  updater,
  promptApps,
  artifact,
  fileExplorer,
  projectCard,
  workspace,
  github,
  askUserQuestion,
  commandPalette,
  toolGroupSummary,
  minesweeper,
  taskTool,
  activity,
  infographic,
  branchNav,
  toolBlock,
  threadResources,
  toolRuns,
  goalLoop,
  webPreview,
  a11yRequest,
  artifactsUi,
  quickChat,
  references,
  channels,
  support,
  crystal,
  mentions,
  projectSuggestion,
  threadBrief,
  layout,
  translate,
  codeBlock,
  ttsDownload,
  hooks,
  providerStatus,
  team,
  herdr
};
const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  },
  ja: {
    translation: ja
  }
};
instance.use(Browser).use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ["localStorage", "navigator", "htmlTag"],
    lookupLocalStorage: "i18nextLng",
    caches: ["localStorage"]
  }
});
function documentLangFor(language) {
  const lng = (language ?? "").trim();
  if (!lng) return "en";
  if (/^zh\b/i.test(lng)) return /^zh-(hant|tw|hk|mo)/i.test(lng) ? "zh-TW" : "zh-CN";
  if (/^ja\b/i.test(lng)) return "ja";
  return lng;
}
if (typeof document !== "undefined") {
  const sync = (language) => {
    document.documentElement.lang = documentLangFor(language);
  };
  sync(instance.language);
  instance.on("languageChanged", sync);
}
// alma-android: 跨帧实时语言切换。设置层 iframe 里选语言 → postMessage 到宿主，
// 宿主的同一 i18next 单例 live 切换（不整页 reload —— 冷启动会闪屏且把用户
// 挤回首页）。同时把选择同步写入 i18nextLng（detector 的缓存写入是异步的，
// 曾与 reload 竞态导致选择丢失回退系统语言）。
if (typeof window !== "undefined") {
  try {
    instance.on("languageChanged", (l2) => {
      try { localStorage.setItem("i18nextLng", String(l2).split("-")[0]); } catch {}
    });
    window.addEventListener("message", (e2) => {
      const d2 = e2 && e2.data;
      if (d2 && d2.type === "alma-android-lang" && d2.lang) {
        try { instance.changeLanguage(String(d2.lang).split("-")[0]); } catch {}
      }
    });
  } catch {}
}
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
export {
  getDefaults$1 as a,
  createLucideIcon as c,
  getI18n as g,
  instance as i
};
