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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "02a3e39e-b25e-4b16-a67d-8cd89f7339f5", e._sentryDebugIdIdentifier = "sentry-dbid-02a3e39e-b25e-4b16-a67d-8cd89f7339f5");
    })();
  } catch (e) {
  }
}
;
import { b as getAugmentedNamespace, c as commonjsGlobal } from "./index-B0zE39VE.js";
import { f as jszip_minExports } from "./PluginNotificationListener-DQz_TGb2.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
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
var lib$2 = {};
var VERSION = "1.13.7";
var root = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {};
var ArrayProto = Array.prototype, ObjProto = Object.prototype;
var SymbolProto = typeof Symbol !== "undefined" ? Symbol.prototype : null;
var push = ArrayProto.push, slice = ArrayProto.slice, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
var supportsArrayBuffer = typeof ArrayBuffer !== "undefined", supportsDataView = typeof DataView !== "undefined";
var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeCreate = Object.create, nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;
var _isNaN = isNaN, _isFinite = isFinite;
var hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
var nonEnumerableProps = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
];
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function() {
    var length = Math.max(arguments.length - startIndex, 0), rest2 = Array(length), index2 = 0;
    for (; index2 < length; index2++) {
      rest2[index2] = arguments[index2 + startIndex];
    }
    switch (startIndex) {
      case 0:
        return func.call(this, rest2);
      case 1:
        return func.call(this, arguments[0], rest2);
      case 2:
        return func.call(this, arguments[0], arguments[1], rest2);
    }
    var args = Array(startIndex + 1);
    for (index2 = 0; index2 < startIndex; index2++) {
      args[index2] = arguments[index2];
    }
    args[startIndex] = rest2;
    return func.apply(this, args);
  };
}
function isObject(obj) {
  var type = typeof obj;
  return type === "function" || type === "object" && !!obj;
}
function isNull(obj) {
  return obj === null;
}
function isUndefined(obj) {
  return obj === void 0;
}
function isBoolean(obj) {
  return obj === true || obj === false || toString.call(obj) === "[object Boolean]";
}
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}
function tagTester(name) {
  var tag = "[object " + name + "]";
  return function(obj) {
    return toString.call(obj) === tag;
  };
}
const isString = tagTester("String");
const isNumber = tagTester("Number");
const isDate = tagTester("Date");
const isRegExp = tagTester("RegExp");
const isError = tagTester("Error");
const isSymbol = tagTester("Symbol");
const isArrayBuffer = tagTester("ArrayBuffer");
var isFunction = tagTester("Function");
var nodelist = root.document && root.document.childNodes;
if (typeof /./ != "function" && typeof Int8Array != "object" && typeof nodelist != "function") {
  isFunction = function(obj) {
    return typeof obj == "function" || false;
  };
}
const isFunction$1 = isFunction;
const hasObjectTag = tagTester("Object");
var hasDataViewBug = supportsDataView && (!/\[native code\]/.test(String(DataView)) || hasObjectTag(new DataView(new ArrayBuffer(8)))), isIE11 = typeof Map !== "undefined" && hasObjectTag(/* @__PURE__ */ new Map());
var isDataView = tagTester("DataView");
function alternateIsDataView(obj) {
  return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
}
const isDataView$1 = hasDataViewBug ? alternateIsDataView : isDataView;
const isArray = nativeIsArray || tagTester("Array");
function has$1(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
}
var isArguments = tagTester("Arguments");
(function() {
  if (!isArguments(arguments)) {
    isArguments = function(obj) {
      return has$1(obj, "callee");
    };
  }
})();
const isArguments$1 = isArguments;
function isFinite$1(obj) {
  return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
}
function isNaN$1(obj) {
  return isNumber(obj) && _isNaN(obj);
}
function constant(value) {
  return function() {
    return value;
  };
}
function createSizePropertyCheck(getSizeProperty) {
  return function(collection) {
    var sizeProperty = getSizeProperty(collection);
    return typeof sizeProperty == "number" && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
  };
}
function shallowProperty(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
}
const getByteLength = shallowProperty("byteLength");
const isBufferLike = createSizePropertyCheck(getByteLength);
var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function isTypedArray(obj) {
  return nativeIsView ? nativeIsView(obj) && !isDataView$1(obj) : isBufferLike(obj) && typedArrayPattern.test(toString.call(obj));
}
const isTypedArray$1 = supportsArrayBuffer ? isTypedArray : constant(false);
const getLength = shallowProperty("length");
function emulatedSet(keys2) {
  var hash = {};
  for (var l = keys2.length, i = 0; i < l; ++i) hash[keys2[i]] = true;
  return {
    contains: function(key) {
      return hash[key] === true;
    },
    push: function(key) {
      hash[key] = true;
      return keys2.push(key);
    }
  };
}
function collectNonEnumProps(obj, keys2) {
  keys2 = emulatedSet(keys2);
  var nonEnumIdx = nonEnumerableProps.length;
  var constructor = obj.constructor;
  var proto = isFunction$1(constructor) && constructor.prototype || ObjProto;
  var prop = "constructor";
  if (has$1(obj, prop) && !keys2.contains(prop)) keys2.push(prop);
  while (nonEnumIdx--) {
    prop = nonEnumerableProps[nonEnumIdx];
    if (prop in obj && obj[prop] !== proto[prop] && !keys2.contains(prop)) {
      keys2.push(prop);
    }
  }
}
function keys(obj) {
  if (!isObject(obj)) return [];
  if (nativeKeys) return nativeKeys(obj);
  var keys2 = [];
  for (var key in obj) if (has$1(obj, key)) keys2.push(key);
  if (hasEnumBug) collectNonEnumProps(obj, keys2);
  return keys2;
}
function isEmpty(obj) {
  if (obj == null) return true;
  var length = getLength(obj);
  if (typeof length == "number" && (isArray(obj) || isString(obj) || isArguments$1(obj))) return length === 0;
  return getLength(keys(obj)) === 0;
}
function isMatch(object2, attrs) {
  var _keys = keys(attrs), length = _keys.length;
  if (object2 == null) return !length;
  var obj = Object(object2);
  for (var i = 0; i < length; i++) {
    var key = _keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }
  return true;
}
function _$i(obj) {
  if (obj instanceof _$i) return obj;
  if (!(this instanceof _$i)) return new _$i(obj);
  this._wrapped = obj;
}
_$i.VERSION = VERSION;
_$i.prototype.value = function() {
  return this._wrapped;
};
_$i.prototype.valueOf = _$i.prototype.toJSON = _$i.prototype.value;
_$i.prototype.toString = function() {
  return String(this._wrapped);
};
function toBufferView(bufferSource) {
  return new Uint8Array(
    bufferSource.buffer || bufferSource,
    bufferSource.byteOffset || 0,
    getByteLength(bufferSource)
  );
}
var tagDataView = "[object DataView]";
function eq(a, b, aStack, bStack) {
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  if (a == null || b == null) return false;
  if (a !== a) return b !== b;
  var type = typeof a;
  if (type !== "function" && type !== "object" && typeof b != "object") return false;
  return deepEq(a, b, aStack, bStack);
}
function deepEq(a, b, aStack, bStack) {
  if (a instanceof _$i) a = a._wrapped;
  if (b instanceof _$i) b = b._wrapped;
  var className = toString.call(a);
  if (className !== toString.call(b)) return false;
  if (hasDataViewBug && className == "[object Object]" && isDataView$1(a)) {
    if (!isDataView$1(b)) return false;
    className = tagDataView;
  }
  switch (className) {
    case "[object RegExp]":
    case "[object String]":
      return "" + a === "" + b;
    case "[object Number]":
      if (+a !== +a) return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case "[object Date]":
    case "[object Boolean]":
      return +a === +b;
    case "[object Symbol]":
      return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    case "[object ArrayBuffer]":
    case tagDataView:
      return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
  }
  var areArrays = className === "[object Array]";
  if (!areArrays && isTypedArray$1(a)) {
    var byteLength2 = getByteLength(a);
    if (byteLength2 !== getByteLength(b)) return false;
    if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
    areArrays = true;
  }
  if (!areArrays) {
    if (typeof a != "object" || typeof b != "object") return false;
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(isFunction$1(aCtor) && aCtor instanceof aCtor && isFunction$1(bCtor) && bCtor instanceof bCtor) && ("constructor" in a && "constructor" in b)) {
      return false;
    }
  }
  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    if (aStack[length] === a) return bStack[length] === b;
  }
  aStack.push(a);
  bStack.push(b);
  if (areArrays) {
    length = a.length;
    if (length !== b.length) return false;
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    var _keys = keys(a), key;
    length = _keys.length;
    if (keys(b).length !== length) return false;
    while (length--) {
      key = _keys[length];
      if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
}
function isEqual(a, b) {
  return eq(a, b);
}
function allKeys(obj) {
  if (!isObject(obj)) return [];
  var keys2 = [];
  for (var key in obj) keys2.push(key);
  if (hasEnumBug) collectNonEnumProps(obj, keys2);
  return keys2;
}
function ie11fingerprint(methods) {
  var length = getLength(methods);
  return function(obj) {
    if (obj == null) return false;
    var keys2 = allKeys(obj);
    if (getLength(keys2)) return false;
    for (var i = 0; i < length; i++) {
      if (!isFunction$1(obj[methods[i]])) return false;
    }
    return methods !== weakMapMethods || !isFunction$1(obj[forEachName]);
  };
}
var forEachName = "forEach", hasName = "has", commonInit = ["clear", "delete"], mapTail = ["get", hasName, "set"];
var mapMethods = commonInit.concat(forEachName, mapTail), weakMapMethods = commonInit.concat(mapTail), setMethods = ["add"].concat(commonInit, forEachName, hasName);
const isMap = isIE11 ? ie11fingerprint(mapMethods) : tagTester("Map");
const isWeakMap = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester("WeakMap");
const isSet = isIE11 ? ie11fingerprint(setMethods) : tagTester("Set");
const isWeakSet = tagTester("WeakSet");
function values(obj) {
  var _keys = keys(obj);
  var length = _keys.length;
  var values2 = Array(length);
  for (var i = 0; i < length; i++) {
    values2[i] = obj[_keys[i]];
  }
  return values2;
}
function pairs(obj) {
  var _keys = keys(obj);
  var length = _keys.length;
  var pairs2 = Array(length);
  for (var i = 0; i < length; i++) {
    pairs2[i] = [_keys[i], obj[_keys[i]]];
  }
  return pairs2;
}
function invert(obj) {
  var result2 = {};
  var _keys = keys(obj);
  for (var i = 0, length = _keys.length; i < length; i++) {
    result2[obj[_keys[i]]] = _keys[i];
  }
  return result2;
}
function functions(obj) {
  var names = [];
  for (var key in obj) {
    if (isFunction$1(obj[key])) names.push(key);
  }
  return names.sort();
}
function createAssigner(keysFunc, defaults2) {
  return function(obj) {
    var length = arguments.length;
    if (defaults2) obj = Object(obj);
    if (length < 2 || obj == null) return obj;
    for (var index2 = 1; index2 < length; index2++) {
      var source = arguments[index2], keys2 = keysFunc(source), l = keys2.length;
      for (var i = 0; i < l; i++) {
        var key = keys2[i];
        if (!defaults2 || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
}
const extend = createAssigner(allKeys);
const extendOwn = createAssigner(keys);
const defaults = createAssigner(allKeys, true);
function ctor() {
  return function() {
  };
}
function baseCreate(prototype) {
  if (!isObject(prototype)) return {};
  if (nativeCreate) return nativeCreate(prototype);
  var Ctor = ctor();
  Ctor.prototype = prototype;
  var result2 = new Ctor();
  Ctor.prototype = null;
  return result2;
}
function create(prototype, props2) {
  var result2 = baseCreate(prototype);
  if (props2) extendOwn(result2, props2);
  return result2;
}
function clone(obj) {
  if (!isObject(obj)) return obj;
  return isArray(obj) ? obj.slice() : extend({}, obj);
}
function tap(obj, interceptor) {
  interceptor(obj);
  return obj;
}
function toPath$1(path) {
  return isArray(path) ? path : [path];
}
_$i.toPath = toPath$1;
function toPath(path) {
  return _$i.toPath(path);
}
function deepGet(obj, path) {
  var length = path.length;
  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }
  return length ? obj : void 0;
}
function get(object2, path, defaultValue) {
  var value = deepGet(object2, toPath(path));
  return isUndefined(value) ? defaultValue : value;
}
function has(obj, path) {
  path = toPath(path);
  var length = path.length;
  for (var i = 0; i < length; i++) {
    var key = path[i];
    if (!has$1(obj, key)) return false;
    obj = obj[key];
  }
  return !!length;
}
function identity$2(value) {
  return value;
}
function matcher(attrs) {
  attrs = extendOwn({}, attrs);
  return function(obj) {
    return isMatch(obj, attrs);
  };
}
function property(path) {
  path = toPath(path);
  return function(obj) {
    return deepGet(obj, path);
  };
}
function optimizeCb(func, context2, argCount) {
  if (context2 === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function(value) {
        return func.call(context2, value);
      };
    case 3:
      return function(value, index2, collection) {
        return func.call(context2, value, index2, collection);
      };
    case 4:
      return function(accumulator, value, index2, collection) {
        return func.call(context2, accumulator, value, index2, collection);
      };
  }
  return function() {
    return func.apply(context2, arguments);
  };
}
function baseIteratee(value, context2, argCount) {
  if (value == null) return identity$2;
  if (isFunction$1(value)) return optimizeCb(value, context2, argCount);
  if (isObject(value) && !isArray(value)) return matcher(value);
  return property(value);
}
function iteratee(value, context2) {
  return baseIteratee(value, context2, Infinity);
}
_$i.iteratee = iteratee;
function cb(value, context2, argCount) {
  if (_$i.iteratee !== iteratee) return _$i.iteratee(value, context2);
  return baseIteratee(value, context2, argCount);
}
function mapObject(obj, iteratee2, context2) {
  iteratee2 = cb(iteratee2, context2);
  var _keys = keys(obj), length = _keys.length, results2 = {};
  for (var index2 = 0; index2 < length; index2++) {
    var currentKey = _keys[index2];
    results2[currentKey] = iteratee2(obj[currentKey], currentKey, obj);
  }
  return results2;
}
function noop() {
}
function propertyOf(obj) {
  if (obj == null) return noop;
  return function(path) {
    return get(obj, path);
  };
}
function times(n, iteratee2, context2) {
  var accum = Array(Math.max(0, n));
  iteratee2 = optimizeCb(iteratee2, context2, 1);
  for (var i = 0; i < n; i++) accum[i] = iteratee2(i);
  return accum;
}
function random(min2, max2) {
  if (max2 == null) {
    max2 = min2;
    min2 = 0;
  }
  return min2 + Math.floor(Math.random() * (max2 - min2 + 1));
}
const now = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
function createEscaper(map2) {
  var escaper = function(match) {
    return map2[match];
  };
  var source = "(?:" + keys(map2).join("|") + ")";
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, "g");
  return function(string) {
    string = string == null ? "" : "" + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
}
const escapeMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};
const escape = createEscaper(escapeMap);
const unescapeMap = invert(escapeMap);
const unescape = createEscaper(unescapeMap);
const templateSettings = _$i.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var noMatch = /(.)^/;
var escapes = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
};
var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
function escapeChar(match) {
  return "\\" + escapes[match];
}
var bareIdentifier = /^\s*(\w|\$)+\s*$/;
function template(text, settings, oldSettings) {
  if (!settings && oldSettings) settings = oldSettings;
  settings = defaults({}, settings, _$i.templateSettings);
  var matcher2 = RegExp([
    (settings.escape || noMatch).source,
    (settings.interpolate || noMatch).source,
    (settings.evaluate || noMatch).source
  ].join("|") + "|$", "g");
  var index2 = 0;
  var source = "__p+='";
  text.replace(matcher2, function(match, escape2, interpolate, evaluate, offset) {
    source += text.slice(index2, offset).replace(escapeRegExp, escapeChar);
    index2 = offset + match.length;
    if (escape2) {
      source += "'+\n((__t=(" + escape2 + "))==null?'':_.escape(__t))+\n'";
    } else if (interpolate) {
      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
    } else if (evaluate) {
      source += "';\n" + evaluate + "\n__p+='";
    }
    return match;
  });
  source += "';\n";
  var argument = settings.variable;
  if (argument) {
    if (!bareIdentifier.test(argument)) throw new Error(
      "variable is not a bare identifier: " + argument
    );
  } else {
    source = "with(obj||{}){\n" + source + "}\n";
    argument = "obj";
  }
  source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
  var render;
  try {
    render = new Function(argument, "_", source);
  } catch (e) {
    e.source = source;
    throw e;
  }
  var template2 = function(data) {
    return render.call(this, data, _$i);
  };
  template2.source = "function(" + argument + "){\n" + source + "}";
  return template2;
}
function result(obj, path, fallback) {
  path = toPath(path);
  var length = path.length;
  if (!length) {
    return isFunction$1(fallback) ? fallback.call(obj) : fallback;
  }
  for (var i = 0; i < length; i++) {
    var prop = obj == null ? void 0 : obj[path[i]];
    if (prop === void 0) {
      prop = fallback;
      i = length;
    }
    obj = isFunction$1(prop) ? prop.call(obj) : prop;
  }
  return obj;
}
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter + "";
  return prefix ? prefix + id : id;
}
function chain(obj) {
  var instance = _$i(obj);
  instance._chain = true;
  return instance;
}
function executeBound(sourceFunc, boundFunc, context2, callingContext, args) {
  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context2, args);
  var self2 = baseCreate(sourceFunc.prototype);
  var result2 = sourceFunc.apply(self2, args);
  if (isObject(result2)) return result2;
  return self2;
}
var partial = restArguments(function(func, boundArgs) {
  var placeholder = partial.placeholder;
  var bound = function() {
    var position2 = 0, length = boundArgs.length;
    var args = Array(length);
    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === placeholder ? arguments[position2++] : boundArgs[i];
    }
    while (position2 < arguments.length) args.push(arguments[position2++]);
    return executeBound(func, bound, this, this, args);
  };
  return bound;
});
partial.placeholder = _$i;
const bind$1 = restArguments(function(func, context2, args) {
  if (!isFunction$1(func)) throw new TypeError("Bind must be called on a function");
  var bound = restArguments(function(callArgs) {
    return executeBound(func, bound, context2, this, args.concat(callArgs));
  });
  return bound;
});
const isArrayLike = createSizePropertyCheck(getLength);
function flatten$1(input, depth, strict, output) {
  output = output || [];
  if (!depth && depth !== 0) {
    depth = Infinity;
  } else if (depth <= 0) {
    return output.concat(input);
  }
  var idx = output.length;
  for (var i = 0, length = getLength(input); i < length; i++) {
    var value = input[i];
    if (isArrayLike(value) && (isArray(value) || isArguments$1(value))) {
      if (depth > 1) {
        flatten$1(value, depth - 1, strict, output);
        idx = output.length;
      } else {
        var j = 0, len = value.length;
        while (j < len) output[idx++] = value[j++];
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
}
const bindAll = restArguments(function(obj, keys2) {
  keys2 = flatten$1(keys2, false, false);
  var index2 = keys2.length;
  if (index2 < 1) throw new Error("bindAll must be passed function names");
  while (index2--) {
    var key = keys2[index2];
    obj[key] = bind$1(obj[key], obj);
  }
  return obj;
});
function memoize(func, hasher) {
  var memoize2 = function(key) {
    var cache = memoize2.cache;
    var address = "" + (hasher ? hasher.apply(this, arguments) : key);
    if (!has$1(cache, address)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  memoize2.cache = {};
  return memoize2;
}
const delay = restArguments(function(func, wait, args) {
  return setTimeout(function() {
    return func.apply(null, args);
  }, wait);
});
const defer$1 = partial(delay, _$i, 1);
function throttle(func, wait, options) {
  var timeout, context2, args, result2;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result2 = func.apply(context2, args);
    if (!timeout) context2 = args = null;
  };
  var throttled = function() {
    var _now = now();
    if (!previous && options.leading === false) previous = _now;
    var remaining = wait - (_now - previous);
    context2 = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result2 = func.apply(context2, args);
      if (!timeout) context2 = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result2;
  };
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context2 = args = null;
  };
  return throttled;
}
function debounce(func, wait, immediate) {
  var timeout, previous, args, result2, context2;
  var later = function() {
    var passed = now() - previous;
    if (wait > passed) {
      timeout = setTimeout(later, wait - passed);
    } else {
      timeout = null;
      if (!immediate) result2 = func.apply(context2, args);
      if (!timeout) args = context2 = null;
    }
  };
  var debounced = restArguments(function(_args) {
    context2 = this;
    args = _args;
    previous = now();
    if (!timeout) {
      timeout = setTimeout(later, wait);
      if (immediate) result2 = func.apply(context2, args);
    }
    return result2;
  });
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = args = context2 = null;
  };
  return debounced;
}
function wrap(func, wrapper) {
  return partial(wrapper, func);
}
function negate(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
}
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
    var i = start;
    var result2 = args[start].apply(this, arguments);
    while (i--) result2 = args[i].call(this, result2);
    return result2;
  };
}
function after(times2, func) {
  return function() {
    if (--times2 < 1) {
      return func.apply(this, arguments);
    }
  };
}
function before(times2, func) {
  var memo;
  return function() {
    if (--times2 > 0) {
      memo = func.apply(this, arguments);
    }
    if (times2 <= 1) func = null;
    return memo;
  };
}
const once = partial(before, 2);
function findKey(obj, predicate, context2) {
  predicate = cb(predicate, context2);
  var _keys = keys(obj), key;
  for (var i = 0, length = _keys.length; i < length; i++) {
    key = _keys[i];
    if (predicate(obj[key], key, obj)) return key;
  }
}
function createPredicateIndexFinder(dir) {
  return function(array, predicate, context2) {
    predicate = cb(predicate, context2);
    var length = getLength(array);
    var index2 = dir > 0 ? 0 : length - 1;
    for (; index2 >= 0 && index2 < length; index2 += dir) {
      if (predicate(array[index2], index2, array)) return index2;
    }
    return -1;
  };
}
const findIndex = createPredicateIndexFinder(1);
const findLastIndex = createPredicateIndexFinder(-1);
function sortedIndex(array, obj, iteratee2, context2) {
  iteratee2 = cb(iteratee2, context2, 1);
  var value = iteratee2(obj);
  var low = 0, high = getLength(array);
  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee2(array[mid]) < value) low = mid + 1;
    else high = mid;
  }
  return low;
}
function createIndexFinder(dir, predicateFind, sortedIndex2) {
  return function(array, item, idx) {
    var i = 0, length = getLength(array);
    if (typeof idx == "number") {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex2 && idx && length) {
      idx = sortedIndex2(array, item);
      return array[idx] === item ? idx : -1;
    }
    if (item !== item) {
      idx = predicateFind(slice.call(array, i, length), isNaN$1);
      return idx >= 0 ? idx + i : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  };
}
const indexOf = createIndexFinder(1, findIndex, sortedIndex);
const lastIndexOf = createIndexFinder(-1, findLastIndex);
function find$2(obj, predicate, context2) {
  var keyFinder = isArrayLike(obj) ? findIndex : findKey;
  var key = keyFinder(obj, predicate, context2);
  if (key !== void 0 && key !== -1) return obj[key];
}
function findWhere(obj, attrs) {
  return find$2(obj, matcher(attrs));
}
function each$1(obj, iteratee2, context2) {
  iteratee2 = optimizeCb(iteratee2, context2);
  var i, length;
  if (isArrayLike(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee2(obj[i], i, obj);
    }
  } else {
    var _keys = keys(obj);
    for (i = 0, length = _keys.length; i < length; i++) {
      iteratee2(obj[_keys[i]], _keys[i], obj);
    }
  }
  return obj;
}
function map$1(obj, iteratee2, context2) {
  iteratee2 = cb(iteratee2, context2);
  var _keys = !isArrayLike(obj) && keys(obj), length = (_keys || obj).length, results2 = Array(length);
  for (var index2 = 0; index2 < length; index2++) {
    var currentKey = _keys ? _keys[index2] : index2;
    results2[index2] = iteratee2(obj[currentKey], currentKey, obj);
  }
  return results2;
}
function createReduce(dir) {
  var reducer = function(obj, iteratee2, memo, initial2) {
    var _keys = !isArrayLike(obj) && keys(obj), length = (_keys || obj).length, index2 = dir > 0 ? 0 : length - 1;
    if (!initial2) {
      memo = obj[_keys ? _keys[index2] : index2];
      index2 += dir;
    }
    for (; index2 >= 0 && index2 < length; index2 += dir) {
      var currentKey = _keys ? _keys[index2] : index2;
      memo = iteratee2(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };
  return function(obj, iteratee2, memo, context2) {
    var initial2 = arguments.length >= 3;
    return reducer(obj, optimizeCb(iteratee2, context2, 4), memo, initial2);
  };
}
const reduce$1 = createReduce(1);
const reduceRight = createReduce(-1);
function filter$1(obj, predicate, context2) {
  var results2 = [];
  predicate = cb(predicate, context2);
  each$1(obj, function(value, index2, list) {
    if (predicate(value, index2, list)) results2.push(value);
  });
  return results2;
}
function reject(obj, predicate, context2) {
  return filter$1(obj, negate(cb(predicate)), context2);
}
function every(obj, predicate, context2) {
  predicate = cb(predicate, context2);
  var _keys = !isArrayLike(obj) && keys(obj), length = (_keys || obj).length;
  for (var index2 = 0; index2 < length; index2++) {
    var currentKey = _keys ? _keys[index2] : index2;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }
  return true;
}
function some$1(obj, predicate, context2) {
  predicate = cb(predicate, context2);
  var _keys = !isArrayLike(obj) && keys(obj), length = (_keys || obj).length;
  for (var index2 = 0; index2 < length; index2++) {
    var currentKey = _keys ? _keys[index2] : index2;
    if (predicate(obj[currentKey], currentKey, obj)) return true;
  }
  return false;
}
function contains(obj, item, fromIndex, guard) {
  if (!isArrayLike(obj)) obj = values(obj);
  if (typeof fromIndex != "number" || guard) fromIndex = 0;
  return indexOf(obj, item, fromIndex) >= 0;
}
const invoke = restArguments(function(obj, path, args) {
  var contextPath, func;
  if (isFunction$1(path)) {
    func = path;
  } else {
    path = toPath(path);
    contextPath = path.slice(0, -1);
    path = path[path.length - 1];
  }
  return map$1(obj, function(context2) {
    var method2 = func;
    if (!method2) {
      if (contextPath && contextPath.length) {
        context2 = deepGet(context2, contextPath);
      }
      if (context2 == null) return void 0;
      method2 = context2[path];
    }
    return method2 == null ? method2 : method2.apply(context2, args);
  });
});
function pluck(obj, key) {
  return map$1(obj, property(key));
}
function where(obj, attrs) {
  return filter$1(obj, matcher(attrs));
}
function max(obj, iteratee2, context2) {
  var result2 = -Infinity, lastComputed = -Infinity, value, computed;
  if (iteratee2 == null || typeof iteratee2 == "number" && typeof obj[0] != "object" && obj != null) {
    obj = isArrayLike(obj) ? obj : values(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value != null && value > result2) {
        result2 = value;
      }
    }
  } else {
    iteratee2 = cb(iteratee2, context2);
    each$1(obj, function(v, index2, list) {
      computed = iteratee2(v, index2, list);
      if (computed > lastComputed || computed === -Infinity && result2 === -Infinity) {
        result2 = v;
        lastComputed = computed;
      }
    });
  }
  return result2;
}
function min(obj, iteratee2, context2) {
  var result2 = Infinity, lastComputed = Infinity, value, computed;
  if (iteratee2 == null || typeof iteratee2 == "number" && typeof obj[0] != "object" && obj != null) {
    obj = isArrayLike(obj) ? obj : values(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value != null && value < result2) {
        result2 = value;
      }
    }
  } else {
    iteratee2 = cb(iteratee2, context2);
    each$1(obj, function(v, index2, list) {
      computed = iteratee2(v, index2, list);
      if (computed < lastComputed || computed === Infinity && result2 === Infinity) {
        result2 = v;
        lastComputed = computed;
      }
    });
  }
  return result2;
}
var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function toArray(obj) {
  if (!obj) return [];
  if (isArray(obj)) return slice.call(obj);
  if (isString(obj)) {
    return obj.match(reStrSymbol);
  }
  if (isArrayLike(obj)) return map$1(obj, identity$2);
  return values(obj);
}
function sample(obj, n, guard) {
  if (n == null || guard) {
    if (!isArrayLike(obj)) obj = values(obj);
    return obj[random(obj.length - 1)];
  }
  var sample2 = toArray(obj);
  var length = getLength(sample2);
  n = Math.max(Math.min(n, length), 0);
  var last2 = length - 1;
  for (var index2 = 0; index2 < n; index2++) {
    var rand = random(index2, last2);
    var temp = sample2[index2];
    sample2[index2] = sample2[rand];
    sample2[rand] = temp;
  }
  return sample2.slice(0, n);
}
function shuffle(obj) {
  return sample(obj, Infinity);
}
function sortBy(obj, iteratee2, context2) {
  var index2 = 0;
  iteratee2 = cb(iteratee2, context2);
  return pluck(map$1(obj, function(value, key, list) {
    return {
      value,
      index: index2++,
      criteria: iteratee2(value, key, list)
    };
  }).sort(function(left, right) {
    var a = left.criteria;
    var b = right.criteria;
    if (a !== b) {
      if (a > b || a === void 0) return 1;
      if (a < b || b === void 0) return -1;
    }
    return left.index - right.index;
  }), "value");
}
function group(behavior, partition2) {
  return function(obj, iteratee2, context2) {
    var result2 = partition2 ? [[], []] : {};
    iteratee2 = cb(iteratee2, context2);
    each$1(obj, function(value, index2) {
      var key = iteratee2(value, index2, obj);
      behavior(result2, value, key);
    });
    return result2;
  };
}
const groupBy = group(function(result2, value, key) {
  if (has$1(result2, key)) result2[key].push(value);
  else result2[key] = [value];
});
const indexBy = group(function(result2, value, key) {
  result2[key] = value;
});
const countBy = group(function(result2, value, key) {
  if (has$1(result2, key)) result2[key]++;
  else result2[key] = 1;
});
const partition = group(function(result2, value, pass) {
  result2[pass ? 0 : 1].push(value);
}, true);
function size(obj) {
  if (obj == null) return 0;
  return isArrayLike(obj) ? obj.length : keys(obj).length;
}
function keyInObj(value, key, obj) {
  return key in obj;
}
const pick = restArguments(function(obj, keys2) {
  var result2 = {}, iteratee2 = keys2[0];
  if (obj == null) return result2;
  if (isFunction$1(iteratee2)) {
    if (keys2.length > 1) iteratee2 = optimizeCb(iteratee2, keys2[1]);
    keys2 = allKeys(obj);
  } else {
    iteratee2 = keyInObj;
    keys2 = flatten$1(keys2, false, false);
    obj = Object(obj);
  }
  for (var i = 0, length = keys2.length; i < length; i++) {
    var key = keys2[i];
    var value = obj[key];
    if (iteratee2(value, key, obj)) result2[key] = value;
  }
  return result2;
});
const omit = restArguments(function(obj, keys2) {
  var iteratee2 = keys2[0], context2;
  if (isFunction$1(iteratee2)) {
    iteratee2 = negate(iteratee2);
    if (keys2.length > 1) context2 = keys2[1];
  } else {
    keys2 = map$1(flatten$1(keys2, false, false), String);
    iteratee2 = function(value, key) {
      return !contains(keys2, key);
    };
  }
  return pick(obj, iteratee2, context2);
});
function initial(array, n, guard) {
  return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
}
function first(array, n, guard) {
  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
  if (n == null || guard) return array[0];
  return initial(array, array.length - n);
}
function rest(array, n, guard) {
  return slice.call(array, n == null || guard ? 1 : n);
}
function last(array, n, guard) {
  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
  if (n == null || guard) return array[array.length - 1];
  return rest(array, Math.max(0, array.length - n));
}
function compact(array) {
  return filter$1(array, Boolean);
}
function flatten(array, depth) {
  return flatten$1(array, depth, false);
}
const difference = restArguments(function(array, rest2) {
  rest2 = flatten$1(rest2, true, true);
  return filter$1(array, function(value) {
    return !contains(rest2, value);
  });
});
const without = restArguments(function(array, otherArrays) {
  return difference(array, otherArrays);
});
function uniq(array, isSorted, iteratee2, context2) {
  if (!isBoolean(isSorted)) {
    context2 = iteratee2;
    iteratee2 = isSorted;
    isSorted = false;
  }
  if (iteratee2 != null) iteratee2 = cb(iteratee2, context2);
  var result2 = [];
  var seen = [];
  for (var i = 0, length = getLength(array); i < length; i++) {
    var value = array[i], computed = iteratee2 ? iteratee2(value, i, array) : value;
    if (isSorted && !iteratee2) {
      if (!i || seen !== computed) result2.push(value);
      seen = computed;
    } else if (iteratee2) {
      if (!contains(seen, computed)) {
        seen.push(computed);
        result2.push(value);
      }
    } else if (!contains(result2, value)) {
      result2.push(value);
    }
  }
  return result2;
}
const union = restArguments(function(arrays) {
  return uniq(flatten$1(arrays, true, true));
});
function intersection(array) {
  var result2 = [];
  var argsLength = arguments.length;
  for (var i = 0, length = getLength(array); i < length; i++) {
    var item = array[i];
    if (contains(result2, item)) continue;
    var j;
    for (j = 1; j < argsLength; j++) {
      if (!contains(arguments[j], item)) break;
    }
    if (j === argsLength) result2.push(item);
  }
  return result2;
}
function unzip$2(array) {
  var length = array && max(array, getLength).length || 0;
  var result2 = Array(length);
  for (var index2 = 0; index2 < length; index2++) {
    result2[index2] = pluck(array, index2);
  }
  return result2;
}
const zip = restArguments(unzip$2);
function object(list, values2) {
  var result2 = {};
  for (var i = 0, length = getLength(list); i < length; i++) {
    if (values2) {
      result2[list[i]] = values2[i];
    } else {
      result2[list[i][0]] = list[i][1];
    }
  }
  return result2;
}
function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  if (!step) {
    step = stop < start ? -1 : 1;
  }
  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range2 = Array(length);
  for (var idx = 0; idx < length; idx++, start += step) {
    range2[idx] = start;
  }
  return range2;
}
function chunk(array, count) {
  if (count == null || count < 1) return [];
  var result2 = [];
  var i = 0, length = array.length;
  while (i < length) {
    result2.push(slice.call(array, i, i += count));
  }
  return result2;
}
function chainResult(instance, obj) {
  return instance._chain ? _$i(obj).chain() : obj;
}
function mixin(obj) {
  each$1(functions(obj), function(name) {
    var func = _$i[name] = obj[name];
    _$i.prototype[name] = function() {
      var args = [this._wrapped];
      push.apply(args, arguments);
      return chainResult(this, func.apply(_$i, args));
    };
  });
  return _$i;
}
each$1(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
  var method2 = ArrayProto[name];
  _$i.prototype[name] = function() {
    var obj = this._wrapped;
    if (obj != null) {
      method2.apply(obj, arguments);
      if ((name === "shift" || name === "splice") && obj.length === 0) {
        delete obj[0];
      }
    }
    return chainResult(this, obj);
  };
});
each$1(["concat", "join", "slice"], function(name) {
  var method2 = ArrayProto[name];
  _$i.prototype[name] = function() {
    var obj = this._wrapped;
    if (obj != null) obj = method2.apply(obj, arguments);
    return chainResult(this, obj);
  };
});
const allExports = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION,
  after,
  all: every,
  allKeys,
  any: some$1,
  assign: extendOwn,
  before,
  bind: bind$1,
  bindAll,
  chain,
  chunk,
  clone,
  collect: map$1,
  compact,
  compose,
  constant,
  contains,
  countBy,
  create,
  debounce,
  default: _$i,
  defaults,
  defer: defer$1,
  delay,
  detect: find$2,
  difference,
  drop: rest,
  each: each$1,
  escape,
  every,
  extend,
  extendOwn,
  filter: filter$1,
  find: find$2,
  findIndex,
  findKey,
  findLastIndex,
  findWhere,
  first,
  flatten,
  foldl: reduce$1,
  foldr: reduceRight,
  forEach: each$1,
  functions,
  get,
  groupBy,
  has,
  head: first,
  identity: identity$2,
  include: contains,
  includes: contains,
  indexBy,
  indexOf,
  initial,
  inject: reduce$1,
  intersection,
  invert,
  invoke,
  isArguments: isArguments$1,
  isArray,
  isArrayBuffer,
  isBoolean,
  isDataView: isDataView$1,
  isDate,
  isElement,
  isEmpty,
  isEqual,
  isError,
  isFinite: isFinite$1,
  isFunction: isFunction$1,
  isMap,
  isMatch,
  isNaN: isNaN$1,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isTypedArray: isTypedArray$1,
  isUndefined,
  isWeakMap,
  isWeakSet,
  iteratee,
  keys,
  last,
  lastIndexOf,
  map: map$1,
  mapObject,
  matcher,
  matches: matcher,
  max,
  memoize,
  methods: functions,
  min,
  mixin,
  negate,
  noop,
  now,
  object,
  omit,
  once,
  pairs,
  partial,
  partition,
  pick,
  pluck,
  property,
  propertyOf,
  random,
  range,
  reduce: reduce$1,
  reduceRight,
  reject,
  rest,
  restArguments,
  result,
  sample,
  select: filter$1,
  shuffle,
  size,
  some: some$1,
  sortBy,
  sortedIndex,
  tail: rest,
  take: first,
  tap,
  template,
  templateSettings,
  throttle,
  times,
  toArray,
  toPath: toPath$1,
  transpose: unzip$2,
  unescape,
  union,
  uniq,
  unique: uniq,
  uniqueId,
  unzip: unzip$2,
  values,
  where,
  without,
  wrap,
  zip
}, Symbol.toStringTag, { value: "Module" }));
var _$h = mixin(allExports);
_$h._ = _$h;
const indexAll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION,
  after,
  all: every,
  allKeys,
  any: some$1,
  assign: extendOwn,
  before,
  bind: bind$1,
  bindAll,
  chain,
  chunk,
  clone,
  collect: map$1,
  compact,
  compose,
  constant,
  contains,
  countBy,
  create,
  debounce,
  default: _$h,
  defaults,
  defer: defer$1,
  delay,
  detect: find$2,
  difference,
  drop: rest,
  each: each$1,
  escape,
  every,
  extend,
  extendOwn,
  filter: filter$1,
  find: find$2,
  findIndex,
  findKey,
  findLastIndex,
  findWhere,
  first,
  flatten,
  foldl: reduce$1,
  foldr: reduceRight,
  forEach: each$1,
  functions,
  get,
  groupBy,
  has,
  head: first,
  identity: identity$2,
  include: contains,
  includes: contains,
  indexBy,
  indexOf,
  initial,
  inject: reduce$1,
  intersection,
  invert,
  invoke,
  isArguments: isArguments$1,
  isArray,
  isArrayBuffer,
  isBoolean,
  isDataView: isDataView$1,
  isDate,
  isElement,
  isEmpty,
  isEqual,
  isError,
  isFinite: isFinite$1,
  isFunction: isFunction$1,
  isMap,
  isMatch,
  isNaN: isNaN$1,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isTypedArray: isTypedArray$1,
  isUndefined,
  isWeakMap,
  isWeakSet,
  iteratee,
  keys,
  last,
  lastIndexOf,
  map: map$1,
  mapObject,
  matcher,
  matches: matcher,
  max,
  memoize,
  methods: functions,
  min,
  mixin,
  negate,
  noop,
  now,
  object,
  omit,
  once,
  pairs,
  partial,
  partition,
  pick,
  pluck,
  property,
  propertyOf,
  random,
  range,
  reduce: reduce$1,
  reduceRight,
  reject,
  rest,
  restArguments,
  result,
  sample,
  select: filter$1,
  shuffle,
  size,
  some: some$1,
  sortBy,
  sortedIndex,
  tail: rest,
  take: first,
  tap,
  template,
  templateSettings,
  throttle,
  times,
  toArray,
  toPath: toPath$1,
  transpose: unzip$2,
  unescape,
  union,
  uniq,
  unique: uniq,
  uniqueId,
  unzip: unzip$2,
  values,
  where,
  without,
  wrap,
  zip
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(indexAll);
var docxReader$1 = {};
var promises$7 = {};
var promise = { exports: {} };
var es5 = { exports: {} };
var hasRequiredEs5;
function requireEs5() {
  if (hasRequiredEs5) return es5.exports;
  hasRequiredEs5 = 1;
  var isES5 = /* @__PURE__ */ function() {
    return this === void 0;
  }();
  if (isES5) {
    es5.exports = {
      freeze: Object.freeze,
      defineProperty: Object.defineProperty,
      getDescriptor: Object.getOwnPropertyDescriptor,
      keys: Object.keys,
      names: Object.getOwnPropertyNames,
      getPrototypeOf: Object.getPrototypeOf,
      isArray: Array.isArray,
      isES5,
      propertyIsWritable: function(obj, prop) {
        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        return !!(!descriptor || descriptor.writable || descriptor.set);
      }
    };
  } else {
    var has2 = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;
    var ObjectKeys = function(o) {
      var ret = [];
      for (var key in o) {
        if (has2.call(o, key)) {
          ret.push(key);
        }
      }
      return ret;
    };
    var ObjectGetDescriptor = function(o, key) {
      return { value: o[key] };
    };
    var ObjectDefineProperty = function(o, key, desc) {
      o[key] = desc.value;
      return o;
    };
    var ObjectFreeze = function(obj) {
      return obj;
    };
    var ObjectGetPrototypeOf = function(obj) {
      try {
        return Object(obj).constructor.prototype;
      } catch (e) {
        return proto;
      }
    };
    var ArrayIsArray = function(obj) {
      try {
        return str.call(obj) === "[object Array]";
      } catch (e) {
        return false;
      }
    };
    es5.exports = {
      isArray: ArrayIsArray,
      keys: ObjectKeys,
      names: ObjectKeys,
      defineProperty: ObjectDefineProperty,
      getDescriptor: ObjectGetDescriptor,
      freeze: ObjectFreeze,
      getPrototypeOf: ObjectGetPrototypeOf,
      isES5,
      propertyIsWritable: function() {
        return true;
      }
    };
  }
  return es5.exports;
}
var util;
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  var define_process_env_default = {};
  var es52 = requireEs5();
  var canEvaluate = typeof navigator == "undefined";
  var errorObj = { e: {} };
  var tryCatchTarget;
  var globalObject = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal !== void 0 ? commonjsGlobal : null;
  function tryCatcher() {
    try {
      var target = tryCatchTarget;
      tryCatchTarget = null;
      return target.apply(this, arguments);
    } catch (e) {
      errorObj.e = e;
      return errorObj;
    }
  }
  function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
  }
  var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;
    function T() {
      this.constructor = Child;
      this.constructor$ = Parent;
      for (var propertyName in Parent.prototype) {
        if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
          this[propertyName + "$"] = Parent.prototype[propertyName];
        }
      }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
  };
  function isPrimitive(val) {
    return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
  }
  function isObject2(value) {
    return typeof value === "function" || typeof value === "object" && value !== null;
  }
  function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;
    return new Error(safeToString(maybeError));
  }
  function withAppended(target, appendee) {
    var len = target.length;
    var ret2 = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
      ret2[i] = target[i];
    }
    ret2[i] = appendee;
    return ret2;
  }
  function getDataPropertyOrDefault(obj2, key, defaultValue) {
    if (es52.isES5) {
      var desc = Object.getOwnPropertyDescriptor(obj2, key);
      if (desc != null) {
        return desc.get == null && desc.set == null ? desc.value : defaultValue;
      }
    } else {
      return {}.hasOwnProperty.call(obj2, key) ? obj2[key] : void 0;
    }
  }
  function notEnumerableProp(obj2, name, value) {
    if (isPrimitive(obj2)) return obj2;
    var descriptor = {
      value,
      configurable: true,
      enumerable: false,
      writable: true
    };
    es52.defineProperty(obj2, name, descriptor);
    return obj2;
  }
  function thrower(r) {
    throw r;
  }
  var inheritedDataKeys = function() {
    var excludedPrototypes = [
      Array.prototype,
      Object.prototype,
      Function.prototype
    ];
    var isExcludedProto = function(val) {
      for (var i = 0; i < excludedPrototypes.length; ++i) {
        if (excludedPrototypes[i] === val) {
          return true;
        }
      }
      return false;
    };
    if (es52.isES5) {
      var getKeys = Object.getOwnPropertyNames;
      return function(obj2) {
        var ret2 = [];
        var visitedKeys = /* @__PURE__ */ Object.create(null);
        while (obj2 != null && !isExcludedProto(obj2)) {
          var keys2;
          try {
            keys2 = getKeys(obj2);
          } catch (e) {
            return ret2;
          }
          for (var i = 0; i < keys2.length; ++i) {
            var key = keys2[i];
            if (visitedKeys[key]) continue;
            visitedKeys[key] = true;
            var desc = Object.getOwnPropertyDescriptor(obj2, key);
            if (desc != null && desc.get == null && desc.set == null) {
              ret2.push(key);
            }
          }
          obj2 = es52.getPrototypeOf(obj2);
        }
        return ret2;
      };
    } else {
      var hasProp = {}.hasOwnProperty;
      return function(obj2) {
        if (isExcludedProto(obj2)) return [];
        var ret2 = [];
        enumeration: for (var key in obj2) {
          if (hasProp.call(obj2, key)) {
            ret2.push(key);
          } else {
            for (var i = 0; i < excludedPrototypes.length; ++i) {
              if (hasProp.call(excludedPrototypes[i], key)) {
                continue enumeration;
              }
            }
            ret2.push(key);
          }
        }
        return ret2;
      };
    }
  }();
  var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
  function isClass(fn) {
    try {
      if (typeof fn === "function") {
        var keys2 = es52.names(fn.prototype);
        var hasMethods = es52.isES5 && keys2.length > 1;
        var hasMethodsOtherThanConstructor = keys2.length > 0 && !(keys2.length === 1 && keys2[0] === "constructor");
        var hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es52.names(fn).length > 0;
        if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  function toFastProperties(obj) {
    return obj;
  }
  var rident = /^[a-z$_][a-z$_0-9]*$/i;
  function isIdentifier(str) {
    return rident.test(str);
  }
  function filledRange(count, prefix, suffix) {
    var ret2 = new Array(count);
    for (var i = 0; i < count; ++i) {
      ret2[i] = prefix + i + suffix;
    }
    return ret2;
  }
  function safeToString(obj2) {
    try {
      return obj2 + "";
    } catch (e) {
      return "[no string representation]";
    }
  }
  function isError2(obj2) {
    return obj2 !== null && typeof obj2 === "object" && typeof obj2.message === "string" && typeof obj2.name === "string";
  }
  function markAsOriginatingFromRejection(e) {
    try {
      notEnumerableProp(e, "isOperational", true);
    } catch (ignore) {
    }
  }
  function originatesFromRejection(e) {
    if (e == null) return false;
    return e instanceof Error["__BluebirdErrorTypes__"].OperationalError || e["isOperational"] === true;
  }
  function canAttachTrace(obj2) {
    return isError2(obj2) && es52.propertyIsWritable(obj2, "stack");
  }
  var ensureErrorObject = function() {
    if (!("stack" in new Error())) {
      return function(value) {
        if (canAttachTrace(value)) return value;
        try {
          throw new Error(safeToString(value));
        } catch (err) {
          return err;
        }
      };
    } else {
      return function(value) {
        if (canAttachTrace(value)) return value;
        return new Error(safeToString(value));
      };
    }
  }();
  function classString(obj2) {
    return {}.toString.call(obj2);
  }
  function copyDescriptors(from, to, filter2) {
    var keys2 = es52.names(from);
    for (var i = 0; i < keys2.length; ++i) {
      var key = keys2[i];
      if (filter2(key)) {
        try {
          es52.defineProperty(to, key, es52.getDescriptor(from, key));
        } catch (ignore) {
        }
      }
    }
  }
  var asArray = function(v) {
    if (es52.isArray(v)) {
      return v;
    }
    return null;
  };
  if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
      return Array.from(v);
    } : function(v) {
      var ret2 = [];
      var it = v[Symbol.iterator]();
      var itResult;
      while (!(itResult = it.next()).done) {
        ret2.push(itResult.value);
      }
      return ret2;
    };
    asArray = function(v) {
      if (es52.isArray(v)) {
        return v;
      } else if (v != null && typeof v[Symbol.iterator] === "function") {
        return ArrayFrom(v);
      }
      return null;
    };
  }
  var isNode = typeof process !== "undefined" && classString(process).toLowerCase() === "[object process]";
  var hasEnvVariables = typeof process !== "undefined" && typeof define_process_env_default !== "undefined";
  function env(key) {
    return hasEnvVariables ? define_process_env_default[key] : void 0;
  }
  function getNativePromise() {
    if (typeof Promise === "function") {
      try {
        var promise2 = new Promise(function() {
        });
        if ({}.toString.call(promise2) === "[object Promise]") {
          return Promise;
        }
      } catch (e) {
      }
    }
  }
  function domainBind(self2, cb2) {
    return self2.bind(cb2);
  }
  var ret = {
    isClass,
    isIdentifier,
    inheritedDataKeys,
    getDataPropertyOrDefault,
    thrower,
    isArray: es52.isArray,
    asArray,
    notEnumerableProp,
    isPrimitive,
    isObject: isObject2,
    isError: isError2,
    canEvaluate,
    errorObj,
    tryCatch,
    inherits,
    withAppended,
    maybeWrapAsError,
    toFastProperties,
    filledRange,
    toString: safeToString,
    canAttachTrace,
    ensureErrorObject,
    originatesFromRejection,
    markAsOriginatingFromRejection,
    classString,
    copyDescriptors,
    hasDevTools: typeof chrome !== "undefined" && chrome && typeof chrome.loadTimes === "function",
    isNode,
    hasEnvVariables,
    env,
    global: globalObject,
    getNativePromise,
    domainBind
  };
  ret.isRecentNode = ret.isNode && function() {
    var version = process.versions.node.split(".").map(Number);
    return version[0] === 0 && version[1] > 10 || version[0] > 0;
  }();
  if (ret.isNode) ret.toFastProperties(process);
  try {
    throw new Error();
  } catch (e) {
    ret.lastLineError = e;
  }
  util = ret;
  return util;
}
var async = { exports: {} };
var schedule_1;
var hasRequiredSchedule;
function requireSchedule() {
  if (hasRequiredSchedule) return schedule_1;
  hasRequiredSchedule = 1;
  var util2 = requireUtil();
  var schedule;
  var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
  };
  var NativePromise = util2.getNativePromise();
  if (util2.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = commonjsGlobal.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util2.isRecentNode ? function(fn) {
      GlobalSetImmediate.call(commonjsGlobal, fn);
    } : function(fn) {
      ProcessNextTick.call(process, fn);
    };
  } else if (typeof NativePromise === "function" && typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
      nativePromise.then(fn);
    };
  } else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && (window.navigator.standalone || window.cordova))) {
    schedule = function() {
      var div = document.createElement("div");
      var opts = { attributes: true };
      var toggleScheduled = false;
      var div2 = document.createElement("div");
      var o2 = new MutationObserver(function() {
        div.classList.toggle("foo");
        toggleScheduled = false;
      });
      o2.observe(div2, opts);
      var scheduleToggle = function() {
        if (toggleScheduled) return;
        toggleScheduled = true;
        div2.classList.toggle("foo");
      };
      return function schedule2(fn) {
        var o = new MutationObserver(function() {
          o.disconnect();
          fn();
        });
        o.observe(div, opts);
        scheduleToggle();
      };
    }();
  } else if (typeof setImmediate !== "undefined") {
    schedule = function(fn) {
      setImmediate(fn);
    };
  } else if (typeof setTimeout !== "undefined") {
    schedule = function(fn) {
      setTimeout(fn, 0);
    };
  } else {
    schedule = noAsyncScheduler;
  }
  schedule_1 = schedule;
  return schedule_1;
}
var queue;
var hasRequiredQueue;
function requireQueue() {
  if (hasRequiredQueue) return queue;
  hasRequiredQueue = 1;
  function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
      dst[j + dstIndex] = src[j + srcIndex];
      src[j + srcIndex] = void 0;
    }
  }
  function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
  }
  Queue.prototype._willBeOverCapacity = function(size2) {
    return this._capacity < size2;
  };
  Queue.prototype._pushOne = function(arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = this._front + length & this._capacity - 1;
    this[i] = arg;
    this._length = length + 1;
  };
  Queue.prototype.push = function(fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
      this._pushOne(fn);
      this._pushOne(receiver);
      this._pushOne(arg);
      return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[j + 0 & wrapMask] = fn;
    this[j + 1 & wrapMask] = receiver;
    this[j + 2 & wrapMask] = arg;
    this._length = length;
  };
  Queue.prototype.shift = function() {
    var front = this._front, ret = this[front];
    this[front] = void 0;
    this._front = front + 1 & this._capacity - 1;
    this._length--;
    return ret;
  };
  Queue.prototype.length = function() {
    return this._length;
  };
  Queue.prototype._checkCapacity = function(size2) {
    if (this._capacity < size2) {
      this._resizeTo(this._capacity << 1);
    }
  };
  Queue.prototype._resizeTo = function(capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = front + length & oldCapacity - 1;
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
  };
  queue = Queue;
  return queue;
}
var hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync) return async.exports;
  hasRequiredAsync = 1;
  var firstLineError;
  try {
    throw new Error();
  } catch (e) {
    firstLineError = e;
  }
  var schedule = requireSchedule();
  var Queue = requireQueue();
  var util2 = requireUtil();
  function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new Queue(16);
    this._normalQueue = new Queue(16);
    this._haveDrainedQueues = false;
    this._trampolineEnabled = true;
    var self2 = this;
    this.drainQueues = function() {
      self2._drainQueues();
    };
    this._schedule = schedule;
  }
  Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
  };
  Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
  };
  Async.prototype.enableTrampoline = function() {
    this._trampolineEnabled = true;
  };
  Async.prototype.disableTrampolineIfNecessary = function() {
    if (util2.hasDevTools) {
      this._trampolineEnabled = false;
    }
  };
  Async.prototype.haveItemsQueued = function() {
    return this._isTickUsed || this._haveDrainedQueues;
  };
  Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
      process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n");
      process.exit(2);
    } else {
      this.throwLater(e);
    }
  };
  Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
      arg = fn;
      fn = function() {
        throw arg;
      };
    }
    if (typeof setTimeout !== "undefined") {
      setTimeout(function() {
        fn(arg);
      }, 0);
    } else try {
      this._schedule(function() {
        fn(arg);
      });
    } catch (e) {
      throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
    }
  };
  function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
  }
  function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
  }
  function AsyncSettlePromises(promise2) {
    this._normalQueue._pushOne(promise2);
    this._queueTick();
  }
  if (!util2.hasDevTools) {
    Async.prototype.invokeLater = AsyncInvokeLater;
    Async.prototype.invoke = AsyncInvoke;
    Async.prototype.settlePromises = AsyncSettlePromises;
  } else {
    Async.prototype.invokeLater = function(fn, receiver, arg) {
      if (this._trampolineEnabled) {
        AsyncInvokeLater.call(this, fn, receiver, arg);
      } else {
        this._schedule(function() {
          setTimeout(function() {
            fn.call(receiver, arg);
          }, 100);
        });
      }
    };
    Async.prototype.invoke = function(fn, receiver, arg) {
      if (this._trampolineEnabled) {
        AsyncInvoke.call(this, fn, receiver, arg);
      } else {
        this._schedule(function() {
          fn.call(receiver, arg);
        });
      }
    };
    Async.prototype.settlePromises = function(promise2) {
      if (this._trampolineEnabled) {
        AsyncSettlePromises.call(this, promise2);
      } else {
        this._schedule(function() {
          promise2._settlePromises();
        });
      }
    };
  }
  Async.prototype._drainQueue = function(queue2) {
    while (queue2.length() > 0) {
      var fn = queue2.shift();
      if (typeof fn !== "function") {
        fn._settlePromises();
        continue;
      }
      var receiver = queue2.shift();
      var arg = queue2.shift();
      fn.call(receiver, arg);
    }
  };
  Async.prototype._drainQueues = function() {
    this._drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    this._drainQueue(this._lateQueue);
  };
  Async.prototype._queueTick = function() {
    if (!this._isTickUsed) {
      this._isTickUsed = true;
      this._schedule(this.drainQueues);
    }
  };
  Async.prototype._reset = function() {
    this._isTickUsed = false;
  };
  async.exports = Async;
  async.exports.firstLineError = firstLineError;
  return async.exports;
}
var errors$1;
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors$1;
  hasRequiredErrors = 1;
  var es52 = requireEs5();
  var Objectfreeze = es52.freeze;
  var util2 = requireUtil();
  var inherits = util2.inherits;
  var notEnumerableProp = util2.notEnumerableProp;
  function subError(nameProperty, defaultMessage) {
    function SubError(message) {
      if (!(this instanceof SubError)) return new SubError(message);
      notEnumerableProp(
        this,
        "message",
        typeof message === "string" ? message : defaultMessage
      );
      notEnumerableProp(this, "name", nameProperty);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        Error.call(this);
      }
    }
    inherits(SubError, Error);
    return SubError;
  }
  var _TypeError, _RangeError;
  var Warning = subError("Warning", "warning");
  var CancellationError = subError("CancellationError", "cancellation error");
  var TimeoutError = subError("TimeoutError", "timeout error");
  var AggregateError = subError("AggregateError", "aggregate error");
  try {
    _TypeError = TypeError;
    _RangeError = RangeError;
  } catch (e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
  }
  var methods = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" ");
  for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
      AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
  }
  es52.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
  });
  AggregateError.prototype["isOperational"] = true;
  var level = 0;
  AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i2 = 0; i2 < this.length; ++i2) {
      var str = this[i2] === this ? "[Circular AggregateError]" : this[i2] + "";
      var lines = str.split("\n");
      for (var j = 0; j < lines.length; ++j) {
        lines[j] = indent + lines[j];
      }
      str = lines.join("\n");
      ret += str + "\n";
    }
    level--;
    return ret;
  };
  function OperationalError(message) {
    if (!(this instanceof OperationalError))
      return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError");
    notEnumerableProp(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;
    if (message instanceof Error) {
      notEnumerableProp(this, "message", message.message);
      notEnumerableProp(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  inherits(OperationalError, Error);
  var errorTypes = Error["__BluebirdErrorTypes__"];
  if (!errorTypes) {
    errorTypes = Objectfreeze({
      CancellationError,
      TimeoutError,
      OperationalError,
      RejectionError: OperationalError,
      AggregateError
    });
    es52.defineProperty(Error, "__BluebirdErrorTypes__", {
      value: errorTypes,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  errors$1 = {
    Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning
  };
  return errors$1;
}
var thenables;
var hasRequiredThenables;
function requireThenables() {
  if (hasRequiredThenables) return thenables;
  hasRequiredThenables = 1;
  thenables = function(Promise2, INTERNAL) {
    var util2 = requireUtil();
    var errorObj = util2.errorObj;
    var isObject2 = util2.isObject;
    function tryConvertToPromise(obj, context2) {
      if (isObject2(obj)) {
        if (obj instanceof Promise2) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
          if (context2) context2._pushContext();
          var ret = Promise2.reject(then.e);
          if (context2) context2._popContext();
          return ret;
        } else if (typeof then === "function") {
          if (isAnyBluebirdPromise(obj)) {
            var ret = new Promise2(INTERNAL);
            obj._then(
              ret._fulfill,
              ret._reject,
              void 0,
              ret,
              null
            );
            return ret;
          }
          return doThenable(obj, then, context2);
        }
      }
      return obj;
    }
    function doGetThen(obj) {
      return obj.then;
    }
    function getThen(obj) {
      try {
        return doGetThen(obj);
      } catch (e) {
        errorObj.e = e;
        return errorObj;
      }
    }
    var hasProp = {}.hasOwnProperty;
    function isAnyBluebirdPromise(obj) {
      try {
        return hasProp.call(obj, "_promise0");
      } catch (e) {
        return false;
      }
    }
    function doThenable(x, then, context2) {
      var promise2 = new Promise2(INTERNAL);
      var ret = promise2;
      if (context2) context2._pushContext();
      promise2._captureStackTrace();
      if (context2) context2._popContext();
      var synchronous = true;
      var result2 = util2.tryCatch(then).call(x, resolve, reject2);
      synchronous = false;
      if (promise2 && result2 === errorObj) {
        promise2._rejectCallback(result2.e, true, true);
        promise2 = null;
      }
      function resolve(value) {
        if (!promise2) return;
        promise2._resolveCallback(value);
        promise2 = null;
      }
      function reject2(reason) {
        if (!promise2) return;
        promise2._rejectCallback(reason, synchronous, true);
        promise2 = null;
      }
      return ret;
    }
    return tryConvertToPromise;
  };
  return thenables;
}
var promise_array;
var hasRequiredPromise_array;
function requirePromise_array() {
  if (hasRequiredPromise_array) return promise_array;
  hasRequiredPromise_array = 1;
  promise_array = function(Promise2, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
    var util2 = requireUtil();
    util2.isArray;
    function toResolutionValue(val) {
      switch (val) {
        case -2:
          return [];
        case -3:
          return {};
      }
    }
    function PromiseArray(values2) {
      var promise2 = this._promise = new Promise2(INTERNAL);
      if (values2 instanceof Promise2) {
        promise2._propagateFrom(values2, 3);
      }
      promise2._setOnCancel(this);
      this._values = values2;
      this._length = 0;
      this._totalResolved = 0;
      this._init(void 0, -2);
    }
    util2.inherits(PromiseArray, Proxyable);
    PromiseArray.prototype.length = function() {
      return this._length;
    };
    PromiseArray.prototype.promise = function() {
      return this._promise;
    };
    PromiseArray.prototype._init = function init(_2, resolveValueIfEmpty) {
      var values2 = tryConvertToPromise(this._values, this._promise);
      if (values2 instanceof Promise2) {
        values2 = values2._target();
        var bitField = values2._bitField;
        this._values = values2;
        if ((bitField & 50397184) === 0) {
          this._promise._setAsyncGuaranteed();
          return values2._then(
            init,
            this._reject,
            void 0,
            this,
            resolveValueIfEmpty
          );
        } else if ((bitField & 33554432) !== 0) {
          values2 = values2._value();
        } else if ((bitField & 16777216) !== 0) {
          return this._reject(values2._reason());
        } else {
          return this._cancel();
        }
      }
      values2 = util2.asArray(values2);
      if (values2 === null) {
        var err = apiRejection(
          "expecting an array or an iterable object but got " + util2.classString(values2)
        ).reason();
        this._promise._rejectCallback(err, false);
        return;
      }
      if (values2.length === 0) {
        if (resolveValueIfEmpty === -5) {
          this._resolveEmptyArray();
        } else {
          this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
      }
      this._iterate(values2);
    };
    PromiseArray.prototype._iterate = function(values2) {
      var len = this.getActualLength(values2.length);
      this._length = len;
      this._values = this.shouldCopyValues() ? new Array(len) : this._values;
      var result2 = this._promise;
      var isResolved = false;
      var bitField = null;
      for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values2[i], result2);
        if (maybePromise instanceof Promise2) {
          maybePromise = maybePromise._target();
          bitField = maybePromise._bitField;
        } else {
          bitField = null;
        }
        if (isResolved) {
          if (bitField !== null) {
            maybePromise.suppressUnhandledRejections();
          }
        } else if (bitField !== null) {
          if ((bitField & 50397184) === 0) {
            maybePromise._proxy(this, i);
            this._values[i] = maybePromise;
          } else if ((bitField & 33554432) !== 0) {
            isResolved = this._promiseFulfilled(maybePromise._value(), i);
          } else if ((bitField & 16777216) !== 0) {
            isResolved = this._promiseRejected(maybePromise._reason(), i);
          } else {
            isResolved = this._promiseCancelled(i);
          }
        } else {
          isResolved = this._promiseFulfilled(maybePromise, i);
        }
      }
      if (!isResolved) result2._setAsyncGuaranteed();
    };
    PromiseArray.prototype._isResolved = function() {
      return this._values === null;
    };
    PromiseArray.prototype._resolve = function(value) {
      this._values = null;
      this._promise._fulfill(value);
    };
    PromiseArray.prototype._cancel = function() {
      if (this._isResolved() || !this._promise._isCancellable()) return;
      this._values = null;
      this._promise._cancel();
    };
    PromiseArray.prototype._reject = function(reason) {
      this._values = null;
      this._promise._rejectCallback(reason, false);
    };
    PromiseArray.prototype._promiseFulfilled = function(value, index2) {
      this._values[index2] = value;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
      }
      return false;
    };
    PromiseArray.prototype._promiseCancelled = function() {
      this._cancel();
      return true;
    };
    PromiseArray.prototype._promiseRejected = function(reason) {
      this._totalResolved++;
      this._reject(reason);
      return true;
    };
    PromiseArray.prototype._resultCancelled = function() {
      if (this._isResolved()) return;
      var values2 = this._values;
      this._cancel();
      if (values2 instanceof Promise2) {
        values2.cancel();
      } else {
        for (var i = 0; i < values2.length; ++i) {
          if (values2[i] instanceof Promise2) {
            values2[i].cancel();
          }
        }
      }
    };
    PromiseArray.prototype.shouldCopyValues = function() {
      return true;
    };
    PromiseArray.prototype.getActualLength = function(len) {
      return len;
    };
    return PromiseArray;
  };
  return promise_array;
}
var context;
var hasRequiredContext;
function requireContext() {
  if (hasRequiredContext) return context;
  hasRequiredContext = 1;
  context = function(Promise2) {
    var longStackTraces = false;
    var contextStack = [];
    Promise2.prototype._promiseCreated = function() {
    };
    Promise2.prototype._pushContext = function() {
    };
    Promise2.prototype._popContext = function() {
      return null;
    };
    Promise2._peekContext = Promise2.prototype._peekContext = function() {
    };
    function Context() {
      this._trace = new Context.CapturedTrace(peekContext());
    }
    Context.prototype._pushContext = function() {
      if (this._trace !== void 0) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
      }
    };
    Context.prototype._popContext = function() {
      if (this._trace !== void 0) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
      }
      return null;
    };
    function createContext() {
      if (longStackTraces) return new Context();
    }
    function peekContext() {
      var lastIndex = contextStack.length - 1;
      if (lastIndex >= 0) {
        return contextStack[lastIndex];
      }
      return void 0;
    }
    Context.CapturedTrace = null;
    Context.create = createContext;
    Context.deactivateLongStackTraces = function() {
    };
    Context.activateLongStackTraces = function() {
      var Promise_pushContext = Promise2.prototype._pushContext;
      var Promise_popContext = Promise2.prototype._popContext;
      var Promise_PeekContext = Promise2._peekContext;
      var Promise_peekContext = Promise2.prototype._peekContext;
      var Promise_promiseCreated = Promise2.prototype._promiseCreated;
      Context.deactivateLongStackTraces = function() {
        Promise2.prototype._pushContext = Promise_pushContext;
        Promise2.prototype._popContext = Promise_popContext;
        Promise2._peekContext = Promise_PeekContext;
        Promise2.prototype._peekContext = Promise_peekContext;
        Promise2.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
      };
      longStackTraces = true;
      Promise2.prototype._pushContext = Context.prototype._pushContext;
      Promise2.prototype._popContext = Context.prototype._popContext;
      Promise2._peekContext = Promise2.prototype._peekContext = peekContext;
      Promise2.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
      };
    };
    return Context;
  };
  return context;
}
var debuggability;
var hasRequiredDebuggability;
function requireDebuggability() {
  if (hasRequiredDebuggability) return debuggability;
  hasRequiredDebuggability = 1;
  debuggability = function(Promise2, Context) {
    var getDomain = Promise2._getDomain;
    var async2 = Promise2._async;
    var Warning = requireErrors().Warning;
    var util2 = requireUtil();
    var canAttachTrace = util2.canAttachTrace;
    var unhandledRejectionHandled;
    var possiblyUnhandledRejection;
    var bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
    var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
    var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
    var stackFramePattern = null;
    var formatStack = null;
    var indentStackFrames = false;
    var printWarning;
    var debugging = !!(util2.env("BLUEBIRD_DEBUG") != 0 && (util2.env("BLUEBIRD_DEBUG") || util2.env("NODE_ENV") === "development"));
    var warnings = !!(util2.env("BLUEBIRD_WARNINGS") != 0 && (debugging || util2.env("BLUEBIRD_WARNINGS")));
    var longStackTraces = !!(util2.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (debugging || util2.env("BLUEBIRD_LONG_STACK_TRACES")));
    var wForgottenReturn = util2.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (warnings || !!util2.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
    Promise2.prototype.suppressUnhandledRejections = function() {
      var target = this._target();
      target._bitField = target._bitField & -1048577 | 524288;
    };
    Promise2.prototype._ensurePossibleRejectionHandled = function() {
      if ((this._bitField & 524288) !== 0) return;
      this._setRejectionIsUnhandled();
      async2.invokeLater(this._notifyUnhandledRejection, this, void 0);
    };
    Promise2.prototype._notifyUnhandledRejectionIsHandled = function() {
      fireRejectionEvent(
        "rejectionHandled",
        unhandledRejectionHandled,
        void 0,
        this
      );
    };
    Promise2.prototype._setReturnedNonUndefined = function() {
      this._bitField = this._bitField | 268435456;
    };
    Promise2.prototype._returnedNonUndefined = function() {
      return (this._bitField & 268435456) !== 0;
    };
    Promise2.prototype._notifyUnhandledRejection = function() {
      if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent(
          "unhandledRejection",
          possiblyUnhandledRejection,
          reason,
          this
        );
      }
    };
    Promise2.prototype._setUnhandledRejectionIsNotified = function() {
      this._bitField = this._bitField | 262144;
    };
    Promise2.prototype._unsetUnhandledRejectionIsNotified = function() {
      this._bitField = this._bitField & -262145;
    };
    Promise2.prototype._isUnhandledRejectionNotified = function() {
      return (this._bitField & 262144) > 0;
    };
    Promise2.prototype._setRejectionIsUnhandled = function() {
      this._bitField = this._bitField | 1048576;
    };
    Promise2.prototype._unsetRejectionIsUnhandled = function() {
      this._bitField = this._bitField & -1048577;
      if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
      }
    };
    Promise2.prototype._isRejectionUnhandled = function() {
      return (this._bitField & 1048576) > 0;
    };
    Promise2.prototype._warn = function(message, shouldUseOwnTrace, promise2) {
      return warn(message, shouldUseOwnTrace, promise2 || this);
    };
    Promise2.onPossiblyUnhandledRejection = function(fn) {
      var domain = getDomain();
      possiblyUnhandledRejection = typeof fn === "function" ? domain === null ? fn : util2.domainBind(domain, fn) : void 0;
    };
    Promise2.onUnhandledRejectionHandled = function(fn) {
      var domain = getDomain();
      unhandledRejectionHandled = typeof fn === "function" ? domain === null ? fn : util2.domainBind(domain, fn) : void 0;
    };
    var disableLongStackTraces = function() {
    };
    Promise2.longStackTraces = function() {
      if (async2.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
      }
      if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise2.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise2.prototype._attachExtraTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
          if (async2.haveItemsQueued() && !config.longStackTraces) {
            throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
          }
          Promise2.prototype._captureStackTrace = Promise_captureStackTrace;
          Promise2.prototype._attachExtraTrace = Promise_attachExtraTrace;
          Context.deactivateLongStackTraces();
          async2.enableTrampoline();
          config.longStackTraces = false;
        };
        Promise2.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise2.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Context.activateLongStackTraces();
        async2.disableTrampolineIfNecessary();
      }
    };
    Promise2.hasLongStackTraces = function() {
      return config.longStackTraces && longStackTracesIsSupported();
    };
    var fireDomEvent = function() {
      try {
        if (typeof CustomEvent === "function") {
          var event = new CustomEvent("CustomEvent");
          util2.global.dispatchEvent(event);
          return function(name, event2) {
            var domEvent = new CustomEvent(name.toLowerCase(), {
              detail: event2,
              cancelable: true
            });
            return !util2.global.dispatchEvent(domEvent);
          };
        } else if (typeof Event === "function") {
          var event = new Event("CustomEvent");
          util2.global.dispatchEvent(event);
          return function(name, event2) {
            var domEvent = new Event(name.toLowerCase(), {
              cancelable: true
            });
            domEvent.detail = event2;
            return !util2.global.dispatchEvent(domEvent);
          };
        } else {
          var event = document.createEvent("CustomEvent");
          event.initCustomEvent("testingtheevent", false, true, {});
          util2.global.dispatchEvent(event);
          return function(name, event2) {
            var domEvent = document.createEvent("CustomEvent");
            domEvent.initCustomEvent(
              name.toLowerCase(),
              false,
              true,
              event2
            );
            return !util2.global.dispatchEvent(domEvent);
          };
        }
      } catch (e) {
      }
      return function() {
        return false;
      };
    }();
    var fireGlobalEvent = function() {
      if (util2.isNode) {
        return function() {
          return process.emit.apply(process, arguments);
        };
      } else {
        if (!util2.global) {
          return function() {
            return false;
          };
        }
        return function(name) {
          var methodName = "on" + name.toLowerCase();
          var method2 = util2.global[methodName];
          if (!method2) return false;
          method2.apply(util2.global, [].slice.call(arguments, 1));
          return true;
        };
      }
    }();
    function generatePromiseLifecycleEventObject(name, promise2) {
      return { promise: promise2 };
    }
    var eventToObjectGenerator = {
      promiseCreated: generatePromiseLifecycleEventObject,
      promiseFulfilled: generatePromiseLifecycleEventObject,
      promiseRejected: generatePromiseLifecycleEventObject,
      promiseResolved: generatePromiseLifecycleEventObject,
      promiseCancelled: generatePromiseLifecycleEventObject,
      promiseChained: function(name, promise2, child) {
        return { promise: promise2, child };
      },
      warning: function(name, warning2) {
        return { warning: warning2 };
      },
      unhandledRejection: function(name, reason, promise2) {
        return { reason, promise: promise2 };
      },
      rejectionHandled: generatePromiseLifecycleEventObject
    };
    var activeFireEvent = function(name) {
      var globalEventFired = false;
      try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
      } catch (e) {
        async2.throwLater(e);
        globalEventFired = true;
      }
      var domEventFired = false;
      try {
        domEventFired = fireDomEvent(
          name,
          eventToObjectGenerator[name].apply(null, arguments)
        );
      } catch (e) {
        async2.throwLater(e);
        domEventFired = true;
      }
      return domEventFired || globalEventFired;
    };
    Promise2.config = function(opts) {
      opts = Object(opts);
      if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
          Promise2.longStackTraces();
        } else if (!opts.longStackTraces && Promise2.hasLongStackTraces()) {
          disableLongStackTraces();
        }
      }
      if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;
        if (util2.isObject(warningsOption)) {
          if ("wForgottenReturn" in warningsOption) {
            wForgottenReturn = !!warningsOption.wForgottenReturn;
          }
        }
      }
      if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async2.haveItemsQueued()) {
          throw new Error(
            "cannot enable cancellation after promises are in use"
          );
        }
        Promise2.prototype._clearCancellationData = cancellationClearCancellationData;
        Promise2.prototype._propagateFrom = cancellationPropagateFrom;
        Promise2.prototype._onCancel = cancellationOnCancel;
        Promise2.prototype._setOnCancel = cancellationSetOnCancel;
        Promise2.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
        Promise2.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
      }
      if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
          config.monitoring = true;
          Promise2.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
          config.monitoring = false;
          Promise2.prototype._fireEvent = defaultFireEvent;
        }
      }
      return Promise2;
    };
    function defaultFireEvent() {
      return false;
    }
    Promise2.prototype._fireEvent = defaultFireEvent;
    Promise2.prototype._execute = function(executor, resolve, reject2) {
      try {
        executor(resolve, reject2);
      } catch (e) {
        return e;
      }
    };
    Promise2.prototype._onCancel = function() {
    };
    Promise2.prototype._setOnCancel = function(handler) {
    };
    Promise2.prototype._attachCancellationCallback = function(onCancel) {
    };
    Promise2.prototype._captureStackTrace = function() {
    };
    Promise2.prototype._attachExtraTrace = function() {
    };
    Promise2.prototype._clearCancellationData = function() {
    };
    Promise2.prototype._propagateFrom = function(parent, flags) {
    };
    function cancellationExecute(executor, resolve, reject2) {
      var promise2 = this;
      try {
        executor(resolve, reject2, function(onCancel) {
          if (typeof onCancel !== "function") {
            throw new TypeError("onCancel must be a function, got: " + util2.toString(onCancel));
          }
          promise2._attachCancellationCallback(onCancel);
        });
      } catch (e) {
        return e;
      }
    }
    function cancellationAttachCancellationCallback(onCancel) {
      if (!this._isCancellable()) return this;
      var previousOnCancel = this._onCancel();
      if (previousOnCancel !== void 0) {
        if (util2.isArray(previousOnCancel)) {
          previousOnCancel.push(onCancel);
        } else {
          this._setOnCancel([previousOnCancel, onCancel]);
        }
      } else {
        this._setOnCancel(onCancel);
      }
    }
    function cancellationOnCancel() {
      return this._onCancelField;
    }
    function cancellationSetOnCancel(onCancel) {
      this._onCancelField = onCancel;
    }
    function cancellationClearCancellationData() {
      this._cancellationParent = void 0;
      this._onCancelField = void 0;
    }
    function cancellationPropagateFrom(parent, flags) {
      if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === void 0) {
          branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
      }
      if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
      }
    }
    function bindingPropagateFrom(parent, flags) {
      if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
      }
    }
    var propagateFromFunction = bindingPropagateFrom;
    function boundValueFunction() {
      var ret = this._boundTo;
      if (ret !== void 0) {
        if (ret instanceof Promise2) {
          if (ret.isFulfilled()) {
            return ret.value();
          } else {
            return void 0;
          }
        }
      }
      return ret;
    }
    function longStackTracesCaptureStackTrace() {
      this._trace = new CapturedTrace(this._peekContext());
    }
    function longStackTracesAttachExtraTrace(error2, ignoreSelf) {
      if (canAttachTrace(error2)) {
        var trace = this._trace;
        if (trace !== void 0) {
          if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== void 0) {
          trace.attachExtraTrace(error2);
        } else if (!error2.__stackCleaned__) {
          var parsed = parseStackAndMessage(error2);
          util2.notEnumerableProp(
            error2,
            "stack",
            parsed.message + "\n" + parsed.stack.join("\n")
          );
          util2.notEnumerableProp(error2, "__stackCleaned__", true);
        }
      }
    }
    function checkForgottenReturns(returnValue, promiseCreated, name, promise2, parent) {
      if (returnValue === void 0 && promiseCreated !== null && wForgottenReturn) {
        if (parent !== void 0 && parent._returnedNonUndefined()) return;
        if ((promise2._bitField & 65535) === 0) return;
        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
          var traceLines = promiseCreated._trace.stack.split("\n");
          var stack = cleanStack(traceLines);
          for (var i = stack.length - 1; i >= 0; --i) {
            var line = stack[i];
            if (!nodeFramePattern.test(line)) {
              var lineMatches = line.match(parseLinePattern);
              if (lineMatches) {
                handlerLine = "at " + lineMatches[1] + ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
              }
              break;
            }
          }
          if (stack.length > 0) {
            var firstUserLine = stack[0];
            for (var i = 0; i < traceLines.length; ++i) {
              if (traceLines[i] === firstUserLine) {
                if (i > 0) {
                  creatorLine = "\n" + traceLines[i - 1];
                }
                break;
              }
            }
          }
        }
        var msg = "a promise was created in a " + name + "handler " + handlerLine + "but was not returned from it, see http://goo.gl/rRqMUw" + creatorLine;
        promise2._warn(msg, true, promiseCreated);
      }
    }
    function deprecated(name, replacement) {
      var message = name + " is deprecated and will be removed in a future version.";
      if (replacement) message += " Use " + replacement + " instead.";
      return warn(message);
    }
    function warn(message, shouldUseOwnTrace, promise2) {
      if (!config.warnings) return;
      var warning2 = new Warning(message);
      var ctx;
      if (shouldUseOwnTrace) {
        promise2._attachExtraTrace(warning2);
      } else if (config.longStackTraces && (ctx = Promise2._peekContext())) {
        ctx.attachExtraTrace(warning2);
      } else {
        var parsed = parseStackAndMessage(warning2);
        warning2.stack = parsed.message + "\n" + parsed.stack.join("\n");
      }
      if (!activeFireEvent("warning", warning2)) {
        formatAndLogError(warning2, "", true);
      }
    }
    function reconstructStack(message, stacks) {
      for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
      }
      if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
      }
      return message + "\n" + stacks.join("\n");
    }
    function removeDuplicateOrEmptyJumps(stacks) {
      for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) {
          stacks.splice(i, 1);
          i--;
        }
      }
    }
    function removeCommonRoots(stacks) {
      var current = stacks[0];
      for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;
        for (var j = prev.length - 1; j >= 0; --j) {
          if (prev[j] === currentLastLine) {
            commonRootMeetPoint = j;
            break;
          }
        }
        for (var j = commonRootMeetPoint; j >= 0; --j) {
          var line = prev[j];
          if (current[currentLastIndex] === line) {
            current.pop();
            currentLastIndex--;
          } else {
            break;
          }
        }
        current = prev;
      }
    }
    function cleanStack(stack) {
      var ret = [];
      for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line || stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
          if (indentStackFrames && line.charAt(0) !== " ") {
            line = "    " + line;
          }
          ret.push(line);
        }
      }
      return ret;
    }
    function stackFramesAsArray(error2) {
      var stack = error2.stack.replace(/\s+$/g, "").split("\n");
      for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
          break;
        }
      }
      if (i > 0 && error2.name != "SyntaxError") {
        stack = stack.slice(i);
      }
      return stack;
    }
    function parseStackAndMessage(error2) {
      var stack = error2.stack;
      var message = error2.toString();
      stack = typeof stack === "string" && stack.length > 0 ? stackFramesAsArray(error2) : ["    (No stack trace)"];
      return {
        message,
        stack: error2.name == "SyntaxError" ? stack : cleanStack(stack)
      };
    }
    function formatAndLogError(error2, title, isSoft) {
      if (typeof console !== "undefined") {
        var message;
        if (util2.isObject(error2)) {
          var stack = error2.stack;
          message = title + formatStack(stack, error2);
        } else {
          message = title + String(error2);
        }
        if (typeof printWarning === "function") {
          printWarning(message, isSoft);
        } else if (typeof console.log === "function" || typeof console.log === "object") {
          console.log(message);
        }
      }
    }
    function fireRejectionEvent(name, localHandler, reason, promise2) {
      var localEventFired = false;
      try {
        if (typeof localHandler === "function") {
          localEventFired = true;
          if (name === "rejectionHandled") {
            localHandler(promise2);
          } else {
            localHandler(reason, promise2);
          }
        }
      } catch (e) {
        async2.throwLater(e);
      }
      if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise2) && !localEventFired) {
          formatAndLogError(reason, "Unhandled rejection ");
        }
      } else {
        activeFireEvent(name, promise2);
      }
    }
    function formatNonError(obj) {
      var str;
      if (typeof obj === "function") {
        str = "[function " + (obj.name || "anonymous") + "]";
      } else {
        str = obj && typeof obj.toString === "function" ? obj.toString() : util2.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
          try {
            var newStr = JSON.stringify(obj);
            str = newStr;
          } catch (e) {
          }
        }
        if (str.length === 0) {
          str = "(empty array)";
        }
      }
      return "(<" + snip(str) + ">, no stack trace)";
    }
    function snip(str) {
      var maxChars = 41;
      if (str.length < maxChars) {
        return str;
      }
      return str.substr(0, maxChars - 3) + "...";
    }
    function longStackTracesIsSupported() {
      return typeof captureStackTrace === "function";
    }
    var shouldIgnore = function() {
      return false;
    };
    var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
    function parseLineInfo(line) {
      var matches = line.match(parseLineInfoRegex);
      if (matches) {
        return {
          fileName: matches[1],
          line: parseInt(matches[2], 10)
        };
      }
    }
    function setBounds(firstLineError, lastLineError) {
      if (!longStackTracesIsSupported()) return;
      var firstStackLines = firstLineError.stack.split("\n");
      var lastStackLines = lastLineError.stack.split("\n");
      var firstIndex = -1;
      var lastIndex = -1;
      var firstFileName;
      var lastFileName;
      for (var i = 0; i < firstStackLines.length; ++i) {
        var result2 = parseLineInfo(firstStackLines[i]);
        if (result2) {
          firstFileName = result2.fileName;
          firstIndex = result2.line;
          break;
        }
      }
      for (var i = 0; i < lastStackLines.length; ++i) {
        var result2 = parseLineInfo(lastStackLines[i]);
        if (result2) {
          lastFileName = result2.fileName;
          lastIndex = result2.line;
          break;
        }
      }
      if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
      }
      shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
          if (info.fileName === firstFileName && (firstIndex <= info.line && info.line <= lastIndex)) {
            return true;
          }
        }
        return false;
      };
    }
    function CapturedTrace(parent) {
      this._parent = parent;
      this._promisesCreated = 0;
      var length = this._length = 1 + (parent === void 0 ? 0 : parent._length);
      captureStackTrace(this, CapturedTrace);
      if (length > 32) this.uncycle();
    }
    util2.inherits(CapturedTrace, Error);
    Context.CapturedTrace = CapturedTrace;
    CapturedTrace.prototype.uncycle = function() {
      var length = this._length;
      if (length < 2) return;
      var nodes2 = [];
      var stackToIndex = {};
      for (var i = 0, node = this; node !== void 0; ++i) {
        nodes2.push(node);
        node = node._parent;
      }
      length = this._length = i;
      for (var i = length - 1; i >= 0; --i) {
        var stack = nodes2[i].stack;
        if (stackToIndex[stack] === void 0) {
          stackToIndex[stack] = i;
        }
      }
      for (var i = 0; i < length; ++i) {
        var currentStack = nodes2[i].stack;
        var index2 = stackToIndex[currentStack];
        if (index2 !== void 0 && index2 !== i) {
          if (index2 > 0) {
            nodes2[index2 - 1]._parent = void 0;
            nodes2[index2 - 1]._length = 1;
          }
          nodes2[i]._parent = void 0;
          nodes2[i]._length = 1;
          var cycleEdgeNode = i > 0 ? nodes2[i - 1] : this;
          if (index2 < length - 1) {
            cycleEdgeNode._parent = nodes2[index2 + 1];
            cycleEdgeNode._parent.uncycle();
            cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
          } else {
            cycleEdgeNode._parent = void 0;
            cycleEdgeNode._length = 1;
          }
          var currentChildLength = cycleEdgeNode._length + 1;
          for (var j = i - 2; j >= 0; --j) {
            nodes2[j]._length = currentChildLength;
            currentChildLength++;
          }
          return;
        }
      }
    };
    CapturedTrace.prototype.attachExtraTrace = function(error2) {
      if (error2.__stackCleaned__) return;
      this.uncycle();
      var parsed = parseStackAndMessage(error2);
      var message = parsed.message;
      var stacks = [parsed.stack];
      var trace = this;
      while (trace !== void 0) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
      }
      removeCommonRoots(stacks);
      removeDuplicateOrEmptyJumps(stacks);
      util2.notEnumerableProp(error2, "stack", reconstructStack(message, stacks));
      util2.notEnumerableProp(error2, "__stackCleaned__", true);
    };
    var captureStackTrace = function stackDetection() {
      var v8stackFramePattern = /^\s*at\s*/;
      var v8stackFormatter = function(stack, error2) {
        if (typeof stack === "string") return stack;
        if (error2.name !== void 0 && error2.message !== void 0) {
          return error2.toString();
        }
        return formatNonError(error2);
      };
      if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace2 = Error.captureStackTrace;
        shouldIgnore = function(line) {
          return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
          Error.stackTraceLimit += 6;
          captureStackTrace2(receiver, ignoreUntil);
          Error.stackTraceLimit -= 6;
        };
      }
      var err = new Error();
      if (typeof err.stack === "string" && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace3(o) {
          o.stack = new Error().stack;
        };
      }
      var hasStackAfterThrow;
      try {
        throw new Error();
      } catch (e) {
        hasStackAfterThrow = "stack" in e;
      }
      if (!("stack" in err) && hasStackAfterThrow && typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace3(o) {
          Error.stackTraceLimit += 6;
          try {
            throw new Error();
          } catch (e) {
            o.stack = e.stack;
          }
          Error.stackTraceLimit -= 6;
        };
      }
      formatStack = function(stack, error2) {
        if (typeof stack === "string") return stack;
        if ((typeof error2 === "object" || typeof error2 === "function") && error2.name !== void 0 && error2.message !== void 0) {
          return error2.toString();
        }
        return formatNonError(error2);
      };
      return null;
    }();
    if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
      printWarning = function(message) {
        console.warn(message);
      };
      if (util2.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
          var color = isSoft ? "\x1B[33m" : "\x1B[31m";
          console.warn(color + message + "\x1B[0m\n");
        };
      } else if (!util2.isNode && typeof new Error().stack === "string") {
        printWarning = function(message, isSoft) {
          console.warn(
            "%c" + message,
            isSoft ? "color: darkorange" : "color: red"
          );
        };
      }
    }
    var config = {
      warnings,
      longStackTraces: false,
      cancellation: false,
      monitoring: false
    };
    if (longStackTraces) Promise2.longStackTraces();
    return {
      longStackTraces: function() {
        return config.longStackTraces;
      },
      warnings: function() {
        return config.warnings;
      },
      cancellation: function() {
        return config.cancellation;
      },
      monitoring: function() {
        return config.monitoring;
      },
      propagateFromFunction: function() {
        return propagateFromFunction;
      },
      boundValueFunction: function() {
        return boundValueFunction;
      },
      checkForgottenReturns,
      setBounds,
      warn,
      deprecated,
      CapturedTrace,
      fireDomEvent,
      fireGlobalEvent
    };
  };
  return debuggability;
}
var _finally;
var hasRequired_finally;
function require_finally() {
  if (hasRequired_finally) return _finally;
  hasRequired_finally = 1;
  _finally = function(Promise2, tryConvertToPromise) {
    var util2 = requireUtil();
    var CancellationError = Promise2.CancellationError;
    var errorObj = util2.errorObj;
    function PassThroughHandlerContext(promise2, type, handler) {
      this.promise = promise2;
      this.type = type;
      this.handler = handler;
      this.called = false;
      this.cancelPromise = null;
    }
    PassThroughHandlerContext.prototype.isFinallyHandler = function() {
      return this.type === 0;
    };
    function FinallyHandlerCancelReaction(finallyHandler2) {
      this.finallyHandler = finallyHandler2;
    }
    FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
      checkCancel(this.finallyHandler);
    };
    function checkCancel(ctx, reason) {
      if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
          ctx.cancelPromise._reject(reason);
        } else {
          ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
      }
      return false;
    }
    function succeed() {
      return finallyHandler.call(this, this.promise._target()._settledValue());
    }
    function fail(reason) {
      if (checkCancel(this, reason)) return;
      errorObj.e = reason;
      return errorObj;
    }
    function finallyHandler(reasonOrValue) {
      var promise2 = this.promise;
      var handler = this.handler;
      if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler() ? handler.call(promise2._boundValue()) : handler.call(promise2._boundValue(), reasonOrValue);
        if (ret !== void 0) {
          promise2._setReturnedNonUndefined();
          var maybePromise = tryConvertToPromise(ret, promise2);
          if (maybePromise instanceof Promise2) {
            if (this.cancelPromise != null) {
              if (maybePromise._isCancelled()) {
                var reason = new CancellationError("late cancellation observer");
                promise2._attachExtraTrace(reason);
                errorObj.e = reason;
                return errorObj;
              } else if (maybePromise.isPending()) {
                maybePromise._attachCancellationCallback(
                  new FinallyHandlerCancelReaction(this)
                );
              }
            }
            return maybePromise._then(
              succeed,
              fail,
              void 0,
              this,
              void 0
            );
          }
        }
      }
      if (promise2.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
      } else {
        checkCancel(this);
        return reasonOrValue;
      }
    }
    Promise2.prototype._passThrough = function(handler, type, success2, fail2) {
      if (typeof handler !== "function") return this.then();
      return this._then(
        success2,
        fail2,
        void 0,
        new PassThroughHandlerContext(this, type, handler),
        void 0
      );
    };
    Promise2.prototype.lastly = Promise2.prototype["finally"] = function(handler) {
      return this._passThrough(
        handler,
        0,
        finallyHandler,
        finallyHandler
      );
    };
    Promise2.prototype.tap = function(handler) {
      return this._passThrough(handler, 1, finallyHandler);
    };
    return PassThroughHandlerContext;
  };
  return _finally;
}
var catch_filter;
var hasRequiredCatch_filter;
function requireCatch_filter() {
  if (hasRequiredCatch_filter) return catch_filter;
  hasRequiredCatch_filter = 1;
  catch_filter = function(NEXT_FILTER) {
    var util2 = requireUtil();
    var getKeys = requireEs5().keys;
    var tryCatch = util2.tryCatch;
    var errorObj = util2.errorObj;
    function catchFilter(instances, cb2, promise2) {
      return function(e) {
        var boundTo = promise2._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
          var item = instances[i];
          if (item === Error || item != null && item.prototype instanceof Error) {
            if (e instanceof item) {
              return tryCatch(cb2).call(boundTo, e);
            }
          } else if (typeof item === "function") {
            var matchesPredicate = tryCatch(item).call(boundTo, e);
            if (matchesPredicate === errorObj) {
              return matchesPredicate;
            } else if (matchesPredicate) {
              return tryCatch(cb2).call(boundTo, e);
            }
          } else if (util2.isObject(e)) {
            var keys2 = getKeys(item);
            for (var j = 0; j < keys2.length; ++j) {
              var key = keys2[j];
              if (item[key] != e[key]) {
                continue predicateLoop;
              }
            }
            return tryCatch(cb2).call(boundTo, e);
          }
        }
        return NEXT_FILTER;
      };
    }
    return catchFilter;
  };
  return catch_filter;
}
var nodeback;
var hasRequiredNodeback;
function requireNodeback() {
  if (hasRequiredNodeback) return nodeback;
  hasRequiredNodeback = 1;
  var util2 = requireUtil();
  var maybeWrapAsError = util2.maybeWrapAsError;
  var errors2 = requireErrors();
  var OperationalError = errors2.OperationalError;
  var es52 = requireEs5();
  function isUntypedError(obj) {
    return obj instanceof Error && es52.getPrototypeOf(obj) === Error.prototype;
  }
  var rErrorKey = /^(?:name|message|stack|cause)$/;
  function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
      ret = new OperationalError(obj);
      ret.name = obj.name;
      ret.message = obj.message;
      ret.stack = obj.stack;
      var keys2 = es52.keys(obj);
      for (var i = 0; i < keys2.length; ++i) {
        var key = keys2[i];
        if (!rErrorKey.test(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
    util2.markAsOriginatingFromRejection(obj);
    return obj;
  }
  function nodebackForPromise(promise2, multiArgs) {
    return function(err, value) {
      if (promise2 === null) return;
      if (err) {
        var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
        promise2._attachExtraTrace(wrapped);
        promise2._reject(wrapped);
      } else if (!multiArgs) {
        promise2._fulfill(value);
      } else {
        var $_len = arguments.length;
        var args = new Array(Math.max($_len - 1, 0));
        for (var $_i = 1; $_i < $_len; ++$_i) {
          args[$_i - 1] = arguments[$_i];
        }
        promise2._fulfill(args);
      }
      promise2 = null;
    };
  }
  nodeback = nodebackForPromise;
  return nodeback;
}
var method;
var hasRequiredMethod;
function requireMethod() {
  if (hasRequiredMethod) return method;
  hasRequiredMethod = 1;
  method = function(Promise2, INTERNAL, tryConvertToPromise, apiRejection, debug) {
    var util2 = requireUtil();
    var tryCatch = util2.tryCatch;
    Promise2.method = function(fn) {
      if (typeof fn !== "function") {
        throw new Promise2.TypeError("expecting a function but got " + util2.classString(fn));
      }
      return function() {
        var ret = new Promise2(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
          value,
          promiseCreated,
          "Promise.method",
          ret
        );
        ret._resolveFromSyncValue(value);
        return ret;
      };
    };
    Promise2.attempt = Promise2["try"] = function(fn) {
      if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util2.classString(fn));
      }
      var ret = new Promise2(INTERNAL);
      ret._captureStackTrace();
      ret._pushContext();
      var value;
      if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util2.isArray(arg) ? tryCatch(fn).apply(ctx, arg) : tryCatch(fn).call(ctx, arg);
      } else {
        value = tryCatch(fn)();
      }
      var promiseCreated = ret._popContext();
      debug.checkForgottenReturns(
        value,
        promiseCreated,
        "Promise.try",
        ret
      );
      ret._resolveFromSyncValue(value);
      return ret;
    };
    Promise2.prototype._resolveFromSyncValue = function(value) {
      if (value === util2.errorObj) {
        this._rejectCallback(value.e, false);
      } else {
        this._resolveCallback(value, true);
      }
    };
  };
  return method;
}
var bind;
var hasRequiredBind;
function requireBind() {
  if (hasRequiredBind) return bind;
  hasRequiredBind = 1;
  bind = function(Promise2, INTERNAL, tryConvertToPromise, debug) {
    var calledBind = false;
    var rejectThis = function(_2, e) {
      this._reject(e);
    };
    var targetRejected = function(e, context2) {
      context2.promiseRejectionQueued = true;
      context2.bindingPromise._then(rejectThis, rejectThis, null, this, e);
    };
    var bindingResolved = function(thisArg, context2) {
      if ((this._bitField & 50397184) === 0) {
        this._resolveCallback(context2.target);
      }
    };
    var bindingRejected = function(e, context2) {
      if (!context2.promiseRejectionQueued) this._reject(e);
    };
    Promise2.prototype.bind = function(thisArg) {
      if (!calledBind) {
        calledBind = true;
        Promise2.prototype._propagateFrom = debug.propagateFromFunction();
        Promise2.prototype._boundValue = debug.boundValueFunction();
      }
      var maybePromise = tryConvertToPromise(thisArg);
      var ret = new Promise2(INTERNAL);
      ret._propagateFrom(this, 1);
      var target = this._target();
      ret._setBoundTo(maybePromise);
      if (maybePromise instanceof Promise2) {
        var context2 = {
          promiseRejectionQueued: false,
          promise: ret,
          target,
          bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, void 0, ret, context2);
        maybePromise._then(
          bindingResolved,
          bindingRejected,
          void 0,
          ret,
          context2
        );
        ret._setOnCancel(maybePromise);
      } else {
        ret._resolveCallback(target);
      }
      return ret;
    };
    Promise2.prototype._setBoundTo = function(obj) {
      if (obj !== void 0) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
      } else {
        this._bitField = this._bitField & -2097153;
      }
    };
    Promise2.prototype._isBound = function() {
      return (this._bitField & 2097152) === 2097152;
    };
    Promise2.bind = function(thisArg, value) {
      return Promise2.resolve(value).bind(thisArg);
    };
  };
  return bind;
}
var cancel;
var hasRequiredCancel;
function requireCancel() {
  if (hasRequiredCancel) return cancel;
  hasRequiredCancel = 1;
  cancel = function(Promise2, PromiseArray, apiRejection, debug) {
    var util2 = requireUtil();
    var tryCatch = util2.tryCatch;
    var errorObj = util2.errorObj;
    var async2 = Promise2._async;
    Promise2.prototype["break"] = Promise2.prototype.cancel = function() {
      if (!debug.cancellation()) return this._warn("cancellation is disabled");
      var promise2 = this;
      var child = promise2;
      while (promise2._isCancellable()) {
        if (!promise2._cancelBy(child)) {
          if (child._isFollowing()) {
            child._followee().cancel();
          } else {
            child._cancelBranched();
          }
          break;
        }
        var parent = promise2._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
          if (promise2._isFollowing()) {
            promise2._followee().cancel();
          } else {
            promise2._cancelBranched();
          }
          break;
        } else {
          if (promise2._isFollowing()) promise2._followee().cancel();
          promise2._setWillBeCancelled();
          child = promise2;
          promise2 = parent;
        }
      }
    };
    Promise2.prototype._branchHasCancelled = function() {
      this._branchesRemainingToCancel--;
    };
    Promise2.prototype._enoughBranchesHaveCancelled = function() {
      return this._branchesRemainingToCancel === void 0 || this._branchesRemainingToCancel <= 0;
    };
    Promise2.prototype._cancelBy = function(canceller) {
      if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
      } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
          this._invokeOnCancel();
          return true;
        }
      }
      return false;
    };
    Promise2.prototype._cancelBranched = function() {
      if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
      }
    };
    Promise2.prototype._cancel = function() {
      if (!this._isCancellable()) return;
      this._setCancelled();
      async2.invoke(this._cancelPromises, this, void 0);
    };
    Promise2.prototype._cancelPromises = function() {
      if (this._length() > 0) this._settlePromises();
    };
    Promise2.prototype._unsetOnCancel = function() {
      this._onCancelField = void 0;
    };
    Promise2.prototype._isCancellable = function() {
      return this.isPending() && !this._isCancelled();
    };
    Promise2.prototype.isCancellable = function() {
      return this.isPending() && !this.isCancelled();
    };
    Promise2.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
      if (util2.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
          this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
      } else if (onCancelCallback !== void 0) {
        if (typeof onCancelCallback === "function") {
          if (!internalOnly) {
            var e = tryCatch(onCancelCallback).call(this._boundValue());
            if (e === errorObj) {
              this._attachExtraTrace(e.e);
              async2.throwLater(e.e);
            }
          }
        } else {
          onCancelCallback._resultCancelled(this);
        }
      }
    };
    Promise2.prototype._invokeOnCancel = function() {
      var onCancelCallback = this._onCancel();
      this._unsetOnCancel();
      async2.invoke(this._doInvokeOnCancel, this, onCancelCallback);
    };
    Promise2.prototype._invokeInternalOnCancel = function() {
      if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
      }
    };
    Promise2.prototype._resultCancelled = function() {
      this.cancel();
    };
  };
  return cancel;
}
var direct_resolve;
var hasRequiredDirect_resolve;
function requireDirect_resolve() {
  if (hasRequiredDirect_resolve) return direct_resolve;
  hasRequiredDirect_resolve = 1;
  direct_resolve = function(Promise2) {
    function returner() {
      return this.value;
    }
    function thrower() {
      throw this.reason;
    }
    Promise2.prototype["return"] = Promise2.prototype.thenReturn = function(value) {
      if (value instanceof Promise2) value.suppressUnhandledRejections();
      return this._then(
        returner,
        void 0,
        void 0,
        { value },
        void 0
      );
    };
    Promise2.prototype["throw"] = Promise2.prototype.thenThrow = function(reason) {
      return this._then(
        thrower,
        void 0,
        void 0,
        { reason },
        void 0
      );
    };
    Promise2.prototype.catchThrow = function(reason) {
      if (arguments.length <= 1) {
        return this._then(
          void 0,
          thrower,
          void 0,
          { reason },
          void 0
        );
      } else {
        var _reason = arguments[1];
        var handler = function() {
          throw _reason;
        };
        return this.caught(reason, handler);
      }
    };
    Promise2.prototype.catchReturn = function(value) {
      if (arguments.length <= 1) {
        if (value instanceof Promise2) value.suppressUnhandledRejections();
        return this._then(
          void 0,
          returner,
          void 0,
          { value },
          void 0
        );
      } else {
        var _value = arguments[1];
        if (_value instanceof Promise2) _value.suppressUnhandledRejections();
        var handler = function() {
          return _value;
        };
        return this.caught(value, handler);
      }
    };
  };
  return direct_resolve;
}
var synchronous_inspection;
var hasRequiredSynchronous_inspection;
function requireSynchronous_inspection() {
  if (hasRequiredSynchronous_inspection) return synchronous_inspection;
  hasRequiredSynchronous_inspection = 1;
  synchronous_inspection = function(Promise2) {
    function PromiseInspection(promise2) {
      if (promise2 !== void 0) {
        promise2 = promise2._target();
        this._bitField = promise2._bitField;
        this._settledValueField = promise2._isFateSealed() ? promise2._settledValue() : void 0;
      } else {
        this._bitField = 0;
        this._settledValueField = void 0;
      }
    }
    PromiseInspection.prototype._settledValue = function() {
      return this._settledValueField;
    };
    var value = PromiseInspection.prototype.value = function() {
      if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
      }
      return this._settledValue();
    };
    var reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function() {
      if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
      }
      return this._settledValue();
    };
    var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
      return (this._bitField & 33554432) !== 0;
    };
    var isRejected = PromiseInspection.prototype.isRejected = function() {
      return (this._bitField & 16777216) !== 0;
    };
    var isPending = PromiseInspection.prototype.isPending = function() {
      return (this._bitField & 50397184) === 0;
    };
    var isResolved = PromiseInspection.prototype.isResolved = function() {
      return (this._bitField & 50331648) !== 0;
    };
    PromiseInspection.prototype.isCancelled = function() {
      return (this._bitField & 8454144) !== 0;
    };
    Promise2.prototype.__isCancelled = function() {
      return (this._bitField & 65536) === 65536;
    };
    Promise2.prototype._isCancelled = function() {
      return this._target().__isCancelled();
    };
    Promise2.prototype.isCancelled = function() {
      return (this._target()._bitField & 8454144) !== 0;
    };
    Promise2.prototype.isPending = function() {
      return isPending.call(this._target());
    };
    Promise2.prototype.isRejected = function() {
      return isRejected.call(this._target());
    };
    Promise2.prototype.isFulfilled = function() {
      return isFulfilled.call(this._target());
    };
    Promise2.prototype.isResolved = function() {
      return isResolved.call(this._target());
    };
    Promise2.prototype.value = function() {
      return value.call(this._target());
    };
    Promise2.prototype.reason = function() {
      var target = this._target();
      target._unsetRejectionIsUnhandled();
      return reason.call(target);
    };
    Promise2.prototype._value = function() {
      return this._settledValue();
    };
    Promise2.prototype._reason = function() {
      this._unsetRejectionIsUnhandled();
      return this._settledValue();
    };
    Promise2.PromiseInspection = PromiseInspection;
  };
  return synchronous_inspection;
}
var join;
var hasRequiredJoin;
function requireJoin() {
  if (hasRequiredJoin) return join;
  hasRequiredJoin = 1;
  join = function(Promise2, PromiseArray, tryConvertToPromise, INTERNAL, async2, getDomain) {
    var util2 = requireUtil();
    var canEvaluate = util2.canEvaluate;
    var tryCatch = util2.tryCatch;
    var errorObj = util2.errorObj;
    var reject2;
    {
      if (canEvaluate) {
        var thenCallback = function(i2) {
          return new Function("value", "holder", "                             \n	            'use strict';                                                    \n	            holder.pIndex = value;                                           \n	            holder.checkFulfillment(this);                                   \n	            ".replace(/Index/g, i2));
        };
        var promiseSetter = function(i2) {
          return new Function("promise", "holder", "                           \n	            'use strict';                                                    \n	            holder.pIndex = promise;                                         \n	            ".replace(/Index/g, i2));
        };
        var generateHolderClass = function(total) {
          var props2 = new Array(total);
          for (var i2 = 0; i2 < props2.length; ++i2) {
            props2[i2] = "this.p" + (i2 + 1);
          }
          var assignment = props2.join(" = ") + " = null;";
          var cancellationCode = "var promise;\n" + props2.map(function(prop) {
            return "                                                         \n	                promise = " + prop + ";                                      \n	                if (promise instanceof Promise) {                            \n	                    promise.cancel();                                        \n	                }                                                            \n	            ";
          }).join("\n");
          var passedArguments = props2.join(", ");
          var name = "Holder$" + total;
          var code2 = "return function(tryCatch, errorObj, Promise, async) {    \n	            'use strict';                                                    \n	            function [TheName](fn) {                                         \n	                [TheProperties]                                              \n	                this.fn = fn;                                                \n	                this.asyncNeeded = true;                                     \n	                this.now = 0;                                                \n	            }                                                                \n	                                                                             \n	            [TheName].prototype._callFunction = function(promise) {          \n	                promise._pushContext();                                      \n	                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n	                promise._popContext();                                       \n	                if (ret === errorObj) {                                      \n	                    promise._rejectCallback(ret.e, false);                   \n	                } else {                                                     \n	                    promise._resolveCallback(ret);                           \n	                }                                                            \n	            };                                                               \n	                                                                             \n	            [TheName].prototype.checkFulfillment = function(promise) {       \n	                var now = ++this.now;                                        \n	                if (now === [TheTotal]) {                                    \n	                    if (this.asyncNeeded) {                                  \n	                        async.invoke(this._callFunction, this, promise);     \n	                    } else {                                                 \n	                        this._callFunction(promise);                         \n	                    }                                                        \n	                                                                             \n	                }                                                            \n	            };                                                               \n	                                                                             \n	            [TheName].prototype._resultCancelled = function() {              \n	                [CancellationCode]                                           \n	            };                                                               \n	                                                                             \n	            return [TheName];                                                \n	        }(tryCatch, errorObj, Promise, async);                               \n	        ";
          code2 = code2.replace(/\[TheName\]/g, name).replace(/\[TheTotal\]/g, total).replace(/\[ThePassedArguments\]/g, passedArguments).replace(/\[TheProperties\]/g, assignment).replace(/\[CancellationCode\]/g, cancellationCode);
          return new Function("tryCatch", "errorObj", "Promise", "async", code2)(tryCatch, errorObj, Promise2, async2);
        };
        var holderClasses = [];
        var thenCallbacks = [];
        var promiseSetters = [];
        for (var i = 0; i < 8; ++i) {
          holderClasses.push(generateHolderClass(i + 1));
          thenCallbacks.push(thenCallback(i + 1));
          promiseSetters.push(promiseSetter(i + 1));
        }
        reject2 = function(reason) {
          this._reject(reason);
        };
      }
    }
    Promise2.join = function() {
      var last2 = arguments.length - 1;
      var fn;
      if (last2 > 0 && typeof arguments[last2] === "function") {
        fn = arguments[last2];
        {
          if (last2 <= 8 && canEvaluate) {
            var ret = new Promise2(INTERNAL);
            ret._captureStackTrace();
            var HolderClass = holderClasses[last2 - 1];
            var holder = new HolderClass(fn);
            var callbacks = thenCallbacks;
            for (var i2 = 0; i2 < last2; ++i2) {
              var maybePromise = tryConvertToPromise(arguments[i2], ret);
              if (maybePromise instanceof Promise2) {
                maybePromise = maybePromise._target();
                var bitField = maybePromise._bitField;
                if ((bitField & 50397184) === 0) {
                  maybePromise._then(
                    callbacks[i2],
                    reject2,
                    void 0,
                    ret,
                    holder
                  );
                  promiseSetters[i2](maybePromise, holder);
                  holder.asyncNeeded = false;
                } else if ((bitField & 33554432) !== 0) {
                  callbacks[i2].call(
                    ret,
                    maybePromise._value(),
                    holder
                  );
                } else if ((bitField & 16777216) !== 0) {
                  ret._reject(maybePromise._reason());
                } else {
                  ret._cancel();
                }
              } else {
                callbacks[i2].call(ret, maybePromise, holder);
              }
            }
            if (!ret._isFateSealed()) {
              if (holder.asyncNeeded) {
                var domain = getDomain();
                if (domain !== null) {
                  holder.fn = util2.domainBind(domain, holder.fn);
                }
              }
              ret._setAsyncGuaranteed();
              ret._setOnCancel(holder);
            }
            return ret;
          }
        }
      }
      var $_len = arguments.length;
      var args = new Array($_len);
      for (var $_i = 0; $_i < $_len; ++$_i) {
        args[$_i] = arguments[$_i];
      }
      if (fn) args.pop();
      var ret = new PromiseArray(args).promise();
      return fn !== void 0 ? ret.spread(fn) : ret;
    };
  };
  return join;
}
var map;
var hasRequiredMap;
function requireMap() {
  if (hasRequiredMap) return map;
  hasRequiredMap = 1;
  map = function(Promise2, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
    var getDomain = Promise2._getDomain;
    var util2 = requireUtil();
    var tryCatch = util2.tryCatch;
    var errorObj = util2.errorObj;
    var async2 = Promise2._async;
    function MappingPromiseArray(promises2, fn, limit, _filter) {
      this.constructor$(promises2);
      this._promise._captureStackTrace();
      var domain = getDomain();
      this._callback = domain === null ? fn : util2.domainBind(domain, fn);
      this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
      this._limit = limit;
      this._inFlight = 0;
      this._queue = [];
      async2.invoke(this._asyncInit, this, void 0);
    }
    util2.inherits(MappingPromiseArray, PromiseArray);
    MappingPromiseArray.prototype._asyncInit = function() {
      this._init$(void 0, -2);
    };
    MappingPromiseArray.prototype._init = function() {
    };
    MappingPromiseArray.prototype._promiseFulfilled = function(value, index2) {
      var values2 = this._values;
      var length = this.length();
      var preservedValues = this._preservedValues;
      var limit = this._limit;
      if (index2 < 0) {
        index2 = index2 * -1 - 1;
        values2[index2] = value;
        if (limit >= 1) {
          this._inFlight--;
          this._drainQueue();
          if (this._isResolved()) return true;
        }
      } else {
        if (limit >= 1 && this._inFlight >= limit) {
          values2[index2] = value;
          this._queue.push(index2);
          return false;
        }
        if (preservedValues !== null) preservedValues[index2] = value;
        var promise2 = this._promise;
        var callback = this._callback;
        var receiver = promise2._boundValue();
        promise2._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index2, length);
        var promiseCreated = promise2._popContext();
        debug.checkForgottenReturns(
          ret,
          promiseCreated,
          preservedValues !== null ? "Promise.filter" : "Promise.map",
          promise2
        );
        if (ret === errorObj) {
          this._reject(ret.e);
          return true;
        }
        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise2) {
          maybePromise = maybePromise._target();
          var bitField = maybePromise._bitField;
          if ((bitField & 50397184) === 0) {
            if (limit >= 1) this._inFlight++;
            values2[index2] = maybePromise;
            maybePromise._proxy(this, (index2 + 1) * -1);
            return false;
          } else if ((bitField & 33554432) !== 0) {
            ret = maybePromise._value();
          } else if ((bitField & 16777216) !== 0) {
            this._reject(maybePromise._reason());
            return true;
          } else {
            this._cancel();
            return true;
          }
        }
        values2[index2] = ret;
      }
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= length) {
        if (preservedValues !== null) {
          this._filter(values2, preservedValues);
        } else {
          this._resolve(values2);
        }
        return true;
      }
      return false;
    };
    MappingPromiseArray.prototype._drainQueue = function() {
      var queue2 = this._queue;
      var limit = this._limit;
      var values2 = this._values;
      while (queue2.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index2 = queue2.pop();
        this._promiseFulfilled(values2[index2], index2);
      }
    };
    MappingPromiseArray.prototype._filter = function(booleans, values2) {
      var len = values2.length;
      var ret = new Array(len);
      var j = 0;
      for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values2[i];
      }
      ret.length = j;
      this._resolve(ret);
    };
    MappingPromiseArray.prototype.preservedValues = function() {
      return this._preservedValues;
    };
    function map2(promises2, fn, options, _filter) {
      if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util2.classString(fn));
      }
      var limit = 0;
      if (options !== void 0) {
        if (typeof options === "object" && options !== null) {
          if (typeof options.concurrency !== "number") {
            return Promise2.reject(
              new TypeError("'concurrency' must be a number but it is " + util2.classString(options.concurrency))
            );
          }
          limit = options.concurrency;
        } else {
          return Promise2.reject(new TypeError(
            "options argument must be an object but it is " + util2.classString(options)
          ));
        }
      }
      limit = typeof limit === "number" && isFinite(limit) && limit >= 1 ? limit : 0;
      return new MappingPromiseArray(promises2, fn, limit, _filter).promise();
    }
    Promise2.prototype.map = function(fn, options) {
      return map2(this, fn, options, null);
    };
    Promise2.map = function(promises2, fn, options, _filter) {
      return map2(promises2, fn, options, _filter);
    };
  };
  return map;
}
var call_get;
var hasRequiredCall_get;
function requireCall_get() {
  if (hasRequiredCall_get) return call_get;
  hasRequiredCall_get = 1;
  var cr = Object.create;
  if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
  }
  call_get = function(Promise2) {
    var util2 = requireUtil();
    var canEvaluate = util2.canEvaluate;
    var isIdentifier = util2.isIdentifier;
    var getMethodCaller;
    var getGetter;
    {
      var makeMethodCaller = function(methodName) {
        return new Function("ensureMethod", "                                    \n	        return function(obj) {                                               \n	            'use strict'                                                     \n	            var len = this.length;                                           \n	            ensureMethod(obj, 'methodName');                                 \n	            switch(len) {                                                    \n	                case 1: return obj.methodName(this[0]);                      \n	                case 2: return obj.methodName(this[0], this[1]);             \n	                case 3: return obj.methodName(this[0], this[1], this[2]);    \n	                case 0: return obj.methodName();                             \n	                default:                                                     \n	                    return obj.methodName.apply(obj, this);                  \n	            }                                                                \n	        };                                                                   \n	        ".replace(/methodName/g, methodName))(ensureMethod);
      };
      var makeGetter = function(propertyName) {
        return new Function("obj", "                                             \n	        'use strict';                                                        \n	        return obj.propertyName;                                             \n	        ".replace("propertyName", propertyName));
      };
      var getCompiled = function(name, compiler, cache) {
        var ret = cache[name];
        if (typeof ret !== "function") {
          if (!isIdentifier(name)) {
            return null;
          }
          ret = compiler(name);
          cache[name] = ret;
          cache[" size"]++;
          if (cache[" size"] > 512) {
            var keys2 = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys2[i]];
            cache[" size"] = keys2.length - 256;
          }
        }
        return ret;
      };
      getMethodCaller = function(name) {
        return getCompiled(name, makeMethodCaller, callerCache);
      };
      getGetter = function(name) {
        return getCompiled(name, makeGetter, getterCache);
      };
    }
    function ensureMethod(obj, methodName) {
      var fn;
      if (obj != null) fn = obj[methodName];
      if (typeof fn !== "function") {
        var message = "Object " + util2.classString(obj) + " has no method '" + util2.toString(methodName) + "'";
        throw new Promise2.TypeError(message);
      }
      return fn;
    }
    function caller(obj) {
      var methodName = this.pop();
      var fn = ensureMethod(obj, methodName);
      return fn.apply(obj, this);
    }
    Promise2.prototype.call = function(methodName) {
      var $_len = arguments.length;
      var args = new Array(Math.max($_len - 1, 0));
      for (var $_i = 1; $_i < $_len; ++$_i) {
        args[$_i - 1] = arguments[$_i];
      }
      {
        if (canEvaluate) {
          var maybeCaller = getMethodCaller(methodName);
          if (maybeCaller !== null) {
            return this._then(
              maybeCaller,
              void 0,
              void 0,
              args,
              void 0
            );
          }
        }
      }
      args.push(methodName);
      return this._then(caller, void 0, void 0, args, void 0);
    };
    function namedGetter(obj) {
      return obj[this];
    }
    function indexedGetter(obj) {
      var index2 = +this;
      if (index2 < 0) index2 = Math.max(0, index2 + obj.length);
      return obj[index2];
    }
    Promise2.prototype.get = function(propertyName) {
      var isIndex = typeof propertyName === "number";
      var getter;
      if (!isIndex) {
        if (canEvaluate) {
          var maybeGetter = getGetter(propertyName);
          getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
          getter = namedGetter;
        }
      } else {
        getter = indexedGetter;
      }
      return this._then(getter, void 0, void 0, propertyName, void 0);
    };
  };
  return call_get;
}
var using;
var hasRequiredUsing;
function requireUsing() {
  if (hasRequiredUsing) return using;
  hasRequiredUsing = 1;
  using = function(Promise2, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
    var util2 = requireUtil();
    var TypeError2 = requireErrors().TypeError;
    var inherits = requireUtil().inherits;
    var errorObj = util2.errorObj;
    var tryCatch = util2.tryCatch;
    var NULL = {};
    function thrower(e) {
      setTimeout(function() {
        throw e;
      }, 0);
    }
    function castPreservingDisposable(thenable) {
      var maybePromise = tryConvertToPromise(thenable);
      if (maybePromise !== thenable && typeof thenable._isDisposable === "function" && typeof thenable._getDisposer === "function" && thenable._isDisposable()) {
        maybePromise._setDisposable(thenable._getDisposer());
      }
      return maybePromise;
    }
    function dispose(resources, inspection) {
      var i = 0;
      var len = resources.length;
      var ret = new Promise2(INTERNAL);
      function iterator() {
        if (i >= len) return ret._fulfill();
        var maybePromise = castPreservingDisposable(resources[i++]);
        if (maybePromise instanceof Promise2 && maybePromise._isDisposable()) {
          try {
            maybePromise = tryConvertToPromise(
              maybePromise._getDisposer().tryDispose(inspection),
              resources.promise
            );
          } catch (e) {
            return thrower(e);
          }
          if (maybePromise instanceof Promise2) {
            return maybePromise._then(
              iterator,
              thrower,
              null,
              null,
              null
            );
          }
        }
        iterator();
      }
      iterator();
      return ret;
    }
    function Disposer(data, promise2, context2) {
      this._data = data;
      this._promise = promise2;
      this._context = context2;
    }
    Disposer.prototype.data = function() {
      return this._data;
    };
    Disposer.prototype.promise = function() {
      return this._promise;
    };
    Disposer.prototype.resource = function() {
      if (this.promise().isFulfilled()) {
        return this.promise().value();
      }
      return NULL;
    };
    Disposer.prototype.tryDispose = function(inspection) {
      var resource = this.resource();
      var context2 = this._context;
      if (context2 !== void 0) context2._pushContext();
      var ret = resource !== NULL ? this.doDispose(resource, inspection) : null;
      if (context2 !== void 0) context2._popContext();
      this._promise._unsetDisposable();
      this._data = null;
      return ret;
    };
    Disposer.isDisposer = function(d) {
      return d != null && typeof d.resource === "function" && typeof d.tryDispose === "function";
    };
    function FunctionDisposer(fn, promise2, context2) {
      this.constructor$(fn, promise2, context2);
    }
    inherits(FunctionDisposer, Disposer);
    FunctionDisposer.prototype.doDispose = function(resource, inspection) {
      var fn = this.data();
      return fn.call(resource, resource, inspection);
    };
    function maybeUnwrapDisposer(value) {
      if (Disposer.isDisposer(value)) {
        this.resources[this.index]._setDisposable(value);
        return value.promise();
      }
      return value;
    }
    function ResourceList(length) {
      this.length = length;
      this.promise = null;
      this[length - 1] = null;
    }
    ResourceList.prototype._resultCancelled = function() {
      var len = this.length;
      for (var i = 0; i < len; ++i) {
        var item = this[i];
        if (item instanceof Promise2) {
          item.cancel();
        }
      }
    };
    Promise2.using = function() {
      var len = arguments.length;
      if (len < 2) return apiRejection(
        "you must pass at least 2 arguments to Promise.using"
      );
      var fn = arguments[len - 1];
      if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util2.classString(fn));
      }
      var input;
      var spreadArgs = true;
      if (len === 2 && Array.isArray(arguments[0])) {
        input = arguments[0];
        len = input.length;
        spreadArgs = false;
      } else {
        input = arguments;
        len--;
      }
      var resources = new ResourceList(len);
      for (var i = 0; i < len; ++i) {
        var resource = input[i];
        if (Disposer.isDisposer(resource)) {
          var disposer = resource;
          resource = resource.promise();
          resource._setDisposable(disposer);
        } else {
          var maybePromise = tryConvertToPromise(resource);
          if (maybePromise instanceof Promise2) {
            resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
              resources,
              index: i
            }, void 0);
          }
        }
        resources[i] = resource;
      }
      var reflectedResources = new Array(resources.length);
      for (var i = 0; i < reflectedResources.length; ++i) {
        reflectedResources[i] = Promise2.resolve(resources[i]).reflect();
      }
      var resultPromise = Promise2.all(reflectedResources).then(function(inspections) {
        for (var i2 = 0; i2 < inspections.length; ++i2) {
          var inspection = inspections[i2];
          if (inspection.isRejected()) {
            errorObj.e = inspection.error();
            return errorObj;
          } else if (!inspection.isFulfilled()) {
            resultPromise.cancel();
            return;
          }
          inspections[i2] = inspection.value();
        }
        promise2._pushContext();
        fn = tryCatch(fn);
        var ret = spreadArgs ? fn.apply(void 0, inspections) : fn(inspections);
        var promiseCreated = promise2._popContext();
        debug.checkForgottenReturns(
          ret,
          promiseCreated,
          "Promise.using",
          promise2
        );
        return ret;
      });
      var promise2 = resultPromise.lastly(function() {
        var inspection = new Promise2.PromiseInspection(resultPromise);
        return dispose(resources, inspection);
      });
      resources.promise = promise2;
      promise2._setOnCancel(resources);
      return promise2;
    };
    Promise2.prototype._setDisposable = function(disposer) {
      this._bitField = this._bitField | 131072;
      this._disposer = disposer;
    };
    Promise2.prototype._isDisposable = function() {
      return (this._bitField & 131072) > 0;
    };
    Promise2.prototype._getDisposer = function() {
      return this._disposer;
    };
    Promise2.prototype._unsetDisposable = function() {
      this._bitField = this._bitField & -131073;
      this._disposer = void 0;
    };
    Promise2.prototype.disposer = function(fn) {
      if (typeof fn === "function") {
        return new FunctionDisposer(fn, this, createContext());
      }
      throw new TypeError2();
    };
  };
  return using;
}
var timers;
var hasRequiredTimers;
function requireTimers() {
  if (hasRequiredTimers) return timers;
  hasRequiredTimers = 1;
  timers = function(Promise2, INTERNAL, debug) {
    var util2 = requireUtil();
    var TimeoutError = Promise2.TimeoutError;
    function HandleWrapper(handle) {
      this.handle = handle;
    }
    HandleWrapper.prototype._resultCancelled = function() {
      clearTimeout(this.handle);
    };
    var afterValue = function(value) {
      return delay2(+this).thenReturn(value);
    };
    var delay2 = Promise2.delay = function(ms, value) {
      var ret;
      var handle;
      if (value !== void 0) {
        ret = Promise2.resolve(value)._then(afterValue, null, null, ms, void 0);
        if (debug.cancellation() && value instanceof Promise2) {
          ret._setOnCancel(value);
        }
      } else {
        ret = new Promise2(INTERNAL);
        handle = setTimeout(function() {
          ret._fulfill();
        }, +ms);
        if (debug.cancellation()) {
          ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
      }
      ret._setAsyncGuaranteed();
      return ret;
    };
    Promise2.prototype.delay = function(ms) {
      return delay2(ms, this);
    };
    var afterTimeout = function(promise2, message, parent) {
      var err;
      if (typeof message !== "string") {
        if (message instanceof Error) {
          err = message;
        } else {
          err = new TimeoutError("operation timed out");
        }
      } else {
        err = new TimeoutError(message);
      }
      util2.markAsOriginatingFromRejection(err);
      promise2._attachExtraTrace(err);
      promise2._reject(err);
      if (parent != null) {
        parent.cancel();
      }
    };
    function successClear(value) {
      clearTimeout(this.handle);
      return value;
    }
    function failureClear(reason) {
      clearTimeout(this.handle);
      throw reason;
    }
    Promise2.prototype.timeout = function(ms, message) {
      ms = +ms;
      var ret, parent;
      var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
          afterTimeout(ret, message, parent);
        }
      }, ms));
      if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(
          successClear,
          failureClear,
          void 0,
          handleWrapper,
          void 0
        );
        ret._setOnCancel(handleWrapper);
      } else {
        ret = this._then(
          successClear,
          failureClear,
          void 0,
          handleWrapper,
          void 0
        );
      }
      return ret;
    };
  };
  return timers;
}
var generators;
var hasRequiredGenerators;
function requireGenerators() {
  if (hasRequiredGenerators) return generators;
  hasRequiredGenerators = 1;
  generators = function(Promise2, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug) {
    var errors2 = requireErrors();
    var TypeError2 = errors2.TypeError;
    var util2 = requireUtil();
    var errorObj = util2.errorObj;
    var tryCatch = util2.tryCatch;
    var yieldHandlers = [];
    function promiseFromYieldHandler(value, yieldHandlers2, traceParent) {
      for (var i = 0; i < yieldHandlers2.length; ++i) {
        traceParent._pushContext();
        var result2 = tryCatch(yieldHandlers2[i])(value);
        traceParent._popContext();
        if (result2 === errorObj) {
          traceParent._pushContext();
          var ret = Promise2.reject(errorObj.e);
          traceParent._popContext();
          return ret;
        }
        var maybePromise = tryConvertToPromise(result2, traceParent);
        if (maybePromise instanceof Promise2) return maybePromise;
      }
      return null;
    }
    function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
      if (debug.cancellation()) {
        var internal = new Promise2(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise2(INTERNAL);
        this._promise = internal.lastly(function() {
          return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
      } else {
        var promise2 = this._promise = new Promise2(INTERNAL);
        promise2._captureStackTrace();
      }
      this._stack = stack;
      this._generatorFunction = generatorFunction;
      this._receiver = receiver;
      this._generator = void 0;
      this._yieldHandlers = typeof yieldHandler === "function" ? [yieldHandler].concat(yieldHandlers) : yieldHandlers;
      this._yieldedPromise = null;
      this._cancellationPhase = false;
    }
    util2.inherits(PromiseSpawn, Proxyable);
    PromiseSpawn.prototype._isResolved = function() {
      return this._promise === null;
    };
    PromiseSpawn.prototype._cleanup = function() {
      this._promise = this._generator = null;
      if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
      }
    };
    PromiseSpawn.prototype._promiseCancelled = function() {
      if (this._isResolved()) return;
      var implementsReturn = typeof this._generator["return"] !== "undefined";
      var result2;
      if (!implementsReturn) {
        var reason = new Promise2.CancellationError(
          "generator .return() sentinel"
        );
        Promise2.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result2 = tryCatch(this._generator["throw"]).call(
          this._generator,
          reason
        );
        this._promise._popContext();
      } else {
        this._promise._pushContext();
        result2 = tryCatch(this._generator["return"]).call(
          this._generator,
          void 0
        );
        this._promise._popContext();
      }
      this._cancellationPhase = true;
      this._yieldedPromise = null;
      this._continue(result2);
    };
    PromiseSpawn.prototype._promiseFulfilled = function(value) {
      this._yieldedPromise = null;
      this._promise._pushContext();
      var result2 = tryCatch(this._generator.next).call(this._generator, value);
      this._promise._popContext();
      this._continue(result2);
    };
    PromiseSpawn.prototype._promiseRejected = function(reason) {
      this._yieldedPromise = null;
      this._promise._attachExtraTrace(reason);
      this._promise._pushContext();
      var result2 = tryCatch(this._generator["throw"]).call(this._generator, reason);
      this._promise._popContext();
      this._continue(result2);
    };
    PromiseSpawn.prototype._resultCancelled = function() {
      if (this._yieldedPromise instanceof Promise2) {
        var promise2 = this._yieldedPromise;
        this._yieldedPromise = null;
        promise2.cancel();
      }
    };
    PromiseSpawn.prototype.promise = function() {
      return this._promise;
    };
    PromiseSpawn.prototype._run = function() {
      this._generator = this._generatorFunction.call(this._receiver);
      this._receiver = this._generatorFunction = void 0;
      this._promiseFulfilled(void 0);
    };
    PromiseSpawn.prototype._continue = function(result2) {
      var promise2 = this._promise;
      if (result2 === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
          return promise2.cancel();
        } else {
          return promise2._rejectCallback(result2.e, false);
        }
      }
      var value = result2.value;
      if (result2.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
          return promise2.cancel();
        } else {
          return promise2._resolveCallback(value);
        }
      } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise2)) {
          maybePromise = promiseFromYieldHandler(
            maybePromise,
            this._yieldHandlers,
            this._promise
          );
          if (maybePromise === null) {
            this._promiseRejected(
              new TypeError2(
                "A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", value) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")
              )
            );
            return;
          }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        if ((bitField & 50397184) === 0) {
          this._yieldedPromise = maybePromise;
          maybePromise._proxy(this, null);
        } else if ((bitField & 33554432) !== 0) {
          Promise2._async.invoke(
            this._promiseFulfilled,
            this,
            maybePromise._value()
          );
        } else if ((bitField & 16777216) !== 0) {
          Promise2._async.invoke(
            this._promiseRejected,
            this,
            maybePromise._reason()
          );
        } else {
          this._promiseCancelled();
        }
      }
    };
    Promise2.coroutine = function(generatorFunction, options) {
      if (typeof generatorFunction !== "function") {
        throw new TypeError2("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
      }
      var yieldHandler = Object(options).yieldHandler;
      var PromiseSpawn$ = PromiseSpawn;
      var stack = new Error().stack;
      return function() {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(
          void 0,
          void 0,
          yieldHandler,
          stack
        );
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(void 0);
        return ret;
      };
    };
    Promise2.coroutine.addYieldHandler = function(fn) {
      if (typeof fn !== "function") {
        throw new TypeError2("expecting a function but got " + util2.classString(fn));
      }
      yieldHandlers.push(fn);
    };
    Promise2.spawn = function(generatorFunction) {
      debug.deprecated("Promise.spawn()", "Promise.coroutine()");
      if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
      }
      var spawn = new PromiseSpawn(generatorFunction, this);
      var ret = spawn.promise();
      spawn._run(Promise2.spawn);
      return ret;
    };
  };
  return generators;
}
var nodeify;
var hasRequiredNodeify;
function requireNodeify() {
  if (hasRequiredNodeify) return nodeify;
  hasRequiredNodeify = 1;
  nodeify = function(Promise2) {
    var util2 = requireUtil();
    var async2 = Promise2._async;
    var tryCatch = util2.tryCatch;
    var errorObj = util2.errorObj;
    function spreadAdapter(val, nodeback2) {
      var promise2 = this;
      if (!util2.isArray(val)) return successAdapter.call(promise2, val, nodeback2);
      var ret = tryCatch(nodeback2).apply(promise2._boundValue(), [null].concat(val));
      if (ret === errorObj) {
        async2.throwLater(ret.e);
      }
    }
    function successAdapter(val, nodeback2) {
      var promise2 = this;
      var receiver = promise2._boundValue();
      var ret = val === void 0 ? tryCatch(nodeback2).call(receiver, null) : tryCatch(nodeback2).call(receiver, null, val);
      if (ret === errorObj) {
        async2.throwLater(ret.e);
      }
    }
    function errorAdapter(reason, nodeback2) {
      var promise2 = this;
      if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
      }
      var ret = tryCatch(nodeback2).call(promise2._boundValue(), reason);
      if (ret === errorObj) {
        async2.throwLater(ret.e);
      }
    }
    Promise2.prototype.asCallback = Promise2.prototype.nodeify = function(nodeback2, options) {
      if (typeof nodeback2 == "function") {
        var adapter = successAdapter;
        if (options !== void 0 && Object(options).spread) {
          adapter = spreadAdapter;
        }
        this._then(
          adapter,
          errorAdapter,
          void 0,
          this,
          nodeback2
        );
      }
      return this;
    };
  };
  return nodeify;
}
var promisify;
var hasRequiredPromisify;
function requirePromisify() {
  if (hasRequiredPromisify) return promisify;
  hasRequiredPromisify = 1;
  promisify = function(Promise2, INTERNAL) {
    var THIS = {};
    var util2 = requireUtil();
    var nodebackForPromise = requireNodeback();
    var withAppended = util2.withAppended;
    var maybeWrapAsError = util2.maybeWrapAsError;
    var canEvaluate = util2.canEvaluate;
    var TypeError2 = requireErrors().TypeError;
    var defaultSuffix = "Async";
    var defaultPromisified = { __isPromisified__: true };
    var noCopyProps = [
      "arity",
      "length",
      "name",
      "arguments",
      "caller",
      "callee",
      "prototype",
      "__isPromisified__"
    ];
    var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");
    var defaultFilter = function(name) {
      return util2.isIdentifier(name) && name.charAt(0) !== "_" && name !== "constructor";
    };
    function propsFilter(key) {
      return !noCopyPropsPattern.test(key);
    }
    function isPromisified(fn) {
      try {
        return fn.__isPromisified__ === true;
      } catch (e) {
        return false;
      }
    }
    function hasPromisified(obj, key, suffix) {
      var val = util2.getDataPropertyOrDefault(
        obj,
        key + suffix,
        defaultPromisified
      );
      return val ? isPromisified(val) : false;
    }
    function checkValid(ret, suffix, suffixRegexp) {
      for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
          var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
          for (var j = 0; j < ret.length; j += 2) {
            if (ret[j] === keyWithoutAsyncSuffix) {
              throw new TypeError2("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", suffix));
            }
          }
        }
      }
    }
    function promisifiableMethods(obj, suffix, suffixRegexp, filter2) {
      var keys2 = util2.inheritedDataKeys(obj);
      var ret = [];
      for (var i = 0; i < keys2.length; ++i) {
        var key = keys2[i];
        var value = obj[key];
        var passesDefaultFilter = filter2 === defaultFilter ? true : defaultFilter(key);
        if (typeof value === "function" && !isPromisified(value) && !hasPromisified(obj, key, suffix) && filter2(key, value, obj, passesDefaultFilter)) {
          ret.push(key, value);
        }
      }
      checkValid(ret, suffix, suffixRegexp);
      return ret;
    }
    var escapeIdentRegex = function(str) {
      return str.replace(/([$])/, "\\$");
    };
    var makeNodePromisifiedEval;
    {
      var switchCaseArgumentOrder = function(likelyArgumentCount) {
        var ret = [likelyArgumentCount];
        var min2 = Math.max(0, likelyArgumentCount - 1 - 3);
        for (var i = likelyArgumentCount - 1; i >= min2; --i) {
          ret.push(i);
        }
        for (var i = likelyArgumentCount + 1; i <= 3; ++i) {
          ret.push(i);
        }
        return ret;
      };
      var argumentSequence = function(argumentCount) {
        return util2.filledRange(argumentCount, "_arg", "");
      };
      var parameterDeclaration = function(parameterCount2) {
        return util2.filledRange(
          Math.max(parameterCount2, 3),
          "_arg",
          ""
        );
      };
      var parameterCount = function(fn) {
        if (typeof fn.length === "number") {
          return Math.max(Math.min(fn.length, 1023 + 1), 0);
        }
        return 0;
      };
      makeNodePromisifiedEval = function(callback, receiver, originalName, fn, _2, multiArgs) {
        var newParameterCount = Math.max(0, parameterCount(fn) - 1);
        var argumentOrder = switchCaseArgumentOrder(newParameterCount);
        var shouldProxyThis = typeof callback === "string" || receiver === THIS;
        function generateCallForArgumentCount(count) {
          var args = argumentSequence(count).join(", ");
          var comma = count > 0 ? ", " : "";
          var ret;
          if (shouldProxyThis) {
            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
          } else {
            ret = receiver === void 0 ? "ret = callback({{args}}, nodeback); break;\n" : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
          }
          return ret.replace("{{args}}", args).replace(", ", comma);
        }
        function generateArgumentSwitchCase() {
          var ret = "";
          for (var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] + ":" + generateCallForArgumentCount(argumentOrder[i]);
          }
          ret += "                                                             \n	        default:                                                             \n	            var args = new Array(len + 1);                                   \n	            var i = 0;                                                       \n	            for (var i = 0; i < len; ++i) {                                  \n	               args[i] = arguments[i];                                       \n	            }                                                                \n	            args[i] = nodeback;                                              \n	            [CodeForCall]                                                    \n	            break;                                                           \n	        ".replace("[CodeForCall]", shouldProxyThis ? "ret = callback.apply(this, args);\n" : "ret = callback.apply(receiver, args);\n");
          return ret;
        }
        var getFunctionCode = typeof callback === "string" ? "this != null ? this['" + callback + "'] : fn" : "fn";
        var body = "'use strict';                                                \n	        var ret = function (Parameters) {                                    \n	            'use strict';                                                    \n	            var len = arguments.length;                                      \n	            var promise = new Promise(INTERNAL);                             \n	            promise._captureStackTrace();                                    \n	            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n	            var ret;                                                         \n	            var callback = tryCatch([GetFunctionCode]);                      \n	            switch(len) {                                                    \n	                [CodeForSwitchCase]                                          \n	            }                                                                \n	            if (ret === errorObj) {                                          \n	                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n	            }                                                                \n	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n	            return promise;                                                  \n	        };                                                                   \n	        notEnumerableProp(ret, '__isPromisified__', true);                   \n	        return ret;                                                          \n	    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase()).replace("[GetFunctionCode]", getFunctionCode);
        body = body.replace("Parameters", parameterDeclaration(newParameterCount));
        return new Function(
          "Promise",
          "fn",
          "receiver",
          "withAppended",
          "maybeWrapAsError",
          "nodebackForPromise",
          "tryCatch",
          "errorObj",
          "notEnumerableProp",
          "INTERNAL",
          body
        )(
          Promise2,
          fn,
          receiver,
          withAppended,
          maybeWrapAsError,
          nodebackForPromise,
          util2.tryCatch,
          util2.errorObj,
          util2.notEnumerableProp,
          INTERNAL
        );
      };
    }
    function makeNodePromisifiedClosure(callback, receiver, _2, fn, __, multiArgs) {
      var defaultThis = /* @__PURE__ */ function() {
        return this;
      }();
      var method2 = callback;
      if (typeof method2 === "string") {
        callback = fn;
      }
      function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise2 = new Promise2(INTERNAL);
        promise2._captureStackTrace();
        var cb2 = typeof method2 === "string" && this !== defaultThis ? this[method2] : callback;
        var fn2 = nodebackForPromise(promise2, multiArgs);
        try {
          cb2.apply(_receiver, withAppended(arguments, fn2));
        } catch (e) {
          promise2._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise2._isFateSealed()) promise2._setAsyncGuaranteed();
        return promise2;
      }
      util2.notEnumerableProp(promisified, "__isPromisified__", true);
      return promisified;
    }
    var makeNodePromisified = canEvaluate ? makeNodePromisifiedEval : makeNodePromisifiedClosure;
    function promisifyAll(obj, suffix, filter2, promisifier, multiArgs) {
      var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
      var methods = promisifiableMethods(obj, suffix, suffixRegexp, filter2);
      for (var i = 0, len = methods.length; i < len; i += 2) {
        var key = methods[i];
        var fn = methods[i + 1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
          obj[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
          var promisified = promisifier(fn, function() {
            return makeNodePromisified(
              key,
              THIS,
              key,
              fn,
              suffix,
              multiArgs
            );
          });
          util2.notEnumerableProp(promisified, "__isPromisified__", true);
          obj[promisifiedKey] = promisified;
        }
      }
      util2.toFastProperties(obj);
      return obj;
    }
    function promisify2(callback, receiver, multiArgs) {
      return makeNodePromisified(
        callback,
        receiver,
        void 0,
        callback,
        null,
        multiArgs
      );
    }
    Promise2.promisify = function(fn, options) {
      if (typeof fn !== "function") {
        throw new TypeError2("expecting a function but got " + util2.classString(fn));
      }
      if (isPromisified(fn)) {
        return fn;
      }
      options = Object(options);
      var receiver = options.context === void 0 ? THIS : options.context;
      var multiArgs = !!options.multiArgs;
      var ret = promisify2(fn, receiver, multiArgs);
      util2.copyDescriptors(fn, ret, propsFilter);
      return ret;
    };
    Promise2.promisifyAll = function(target, options) {
      if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError2("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
      }
      options = Object(options);
      var multiArgs = !!options.multiArgs;
      var suffix = options.suffix;
      if (typeof suffix !== "string") suffix = defaultSuffix;
      var filter2 = options.filter;
      if (typeof filter2 !== "function") filter2 = defaultFilter;
      var promisifier = options.promisifier;
      if (typeof promisifier !== "function") promisifier = makeNodePromisified;
      if (!util2.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
      }
      var keys2 = util2.inheritedDataKeys(target);
      for (var i = 0; i < keys2.length; ++i) {
        var value = target[keys2[i]];
        if (keys2[i] !== "constructor" && util2.isClass(value)) {
          promisifyAll(
            value.prototype,
            suffix,
            filter2,
            promisifier,
            multiArgs
          );
          promisifyAll(value, suffix, filter2, promisifier, multiArgs);
        }
      }
      return promisifyAll(target, suffix, filter2, promisifier, multiArgs);
    };
  };
  return promisify;
}
var props;
var hasRequiredProps;
function requireProps() {
  if (hasRequiredProps) return props;
  hasRequiredProps = 1;
  props = function(Promise2, PromiseArray, tryConvertToPromise, apiRejection) {
    var util2 = requireUtil();
    var isObject2 = util2.isObject;
    var es52 = requireEs5();
    var Es6Map;
    if (typeof Map === "function") Es6Map = Map;
    var mapToEntries = /* @__PURE__ */ function() {
      var index2 = 0;
      var size2 = 0;
      function extractEntry(value, key) {
        this[index2] = value;
        this[index2 + size2] = key;
        index2++;
      }
      return function mapToEntries2(map2) {
        size2 = map2.size;
        index2 = 0;
        var ret = new Array(map2.size * 2);
        map2.forEach(extractEntry, ret);
        return ret;
      };
    }();
    var entriesToMap = function(entries) {
      var ret = new Es6Map();
      var length = entries.length / 2 | 0;
      for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
      }
      return ret;
    };
    function PropertiesPromiseArray(obj) {
      var isMap2 = false;
      var entries;
      if (Es6Map !== void 0 && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap2 = true;
      } else {
        var keys2 = es52.keys(obj);
        var len = keys2.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
          var key = keys2[i];
          entries[i] = obj[key];
          entries[i + len] = key;
        }
      }
      this.constructor$(entries);
      this._isMap = isMap2;
      this._init$(void 0, -3);
    }
    util2.inherits(PropertiesPromiseArray, PromiseArray);
    PropertiesPromiseArray.prototype._init = function() {
    };
    PropertiesPromiseArray.prototype._promiseFulfilled = function(value, index2) {
      this._values[index2] = value;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
          val = entriesToMap(this._values);
        } else {
          val = {};
          var keyOffset = this.length();
          for (var i = 0, len = this.length(); i < len; ++i) {
            val[this._values[i + keyOffset]] = this._values[i];
          }
        }
        this._resolve(val);
        return true;
      }
      return false;
    };
    PropertiesPromiseArray.prototype.shouldCopyValues = function() {
      return false;
    };
    PropertiesPromiseArray.prototype.getActualLength = function(len) {
      return len >> 1;
    };
    function props2(promises2) {
      var ret;
      var castValue = tryConvertToPromise(promises2);
      if (!isObject2(castValue)) {
        return apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
      } else if (castValue instanceof Promise2) {
        ret = castValue._then(
          Promise2.props,
          void 0,
          void 0,
          void 0,
          void 0
        );
      } else {
        ret = new PropertiesPromiseArray(castValue).promise();
      }
      if (castValue instanceof Promise2) {
        ret._propagateFrom(castValue, 2);
      }
      return ret;
    }
    Promise2.prototype.props = function() {
      return props2(this);
    };
    Promise2.props = function(promises2) {
      return props2(promises2);
    };
  };
  return props;
}
var race;
var hasRequiredRace;
function requireRace() {
  if (hasRequiredRace) return race;
  hasRequiredRace = 1;
  race = function(Promise2, INTERNAL, tryConvertToPromise, apiRejection) {
    var util2 = requireUtil();
    var raceLater = function(promise2) {
      return promise2.then(function(array) {
        return race2(array, promise2);
      });
    };
    function race2(promises2, parent) {
      var maybePromise = tryConvertToPromise(promises2);
      if (maybePromise instanceof Promise2) {
        return raceLater(maybePromise);
      } else {
        promises2 = util2.asArray(promises2);
        if (promises2 === null)
          return apiRejection("expecting an array or an iterable object but got " + util2.classString(promises2));
      }
      var ret = new Promise2(INTERNAL);
      if (parent !== void 0) {
        ret._propagateFrom(parent, 3);
      }
      var fulfill = ret._fulfill;
      var reject2 = ret._reject;
      for (var i = 0, len = promises2.length; i < len; ++i) {
        var val = promises2[i];
        if (val === void 0 && !(i in promises2)) {
          continue;
        }
        Promise2.cast(val)._then(fulfill, reject2, void 0, ret, null);
      }
      return ret;
    }
    Promise2.race = function(promises2) {
      return race2(promises2, void 0);
    };
    Promise2.prototype.race = function() {
      return race2(this, void 0);
    };
  };
  return race;
}
var reduce;
var hasRequiredReduce;
function requireReduce() {
  if (hasRequiredReduce) return reduce;
  hasRequiredReduce = 1;
  reduce = function(Promise2, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
    var getDomain = Promise2._getDomain;
    var util2 = requireUtil();
    var tryCatch = util2.tryCatch;
    function ReductionPromiseArray(promises2, fn, initialValue, _each) {
      this.constructor$(promises2);
      var domain = getDomain();
      this._fn = domain === null ? fn : util2.domainBind(domain, fn);
      if (initialValue !== void 0) {
        initialValue = Promise2.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
      }
      this._initialValue = initialValue;
      this._currentCancellable = null;
      if (_each === INTERNAL) {
        this._eachValues = Array(this._length);
      } else if (_each === 0) {
        this._eachValues = null;
      } else {
        this._eachValues = void 0;
      }
      this._promise._captureStackTrace();
      this._init$(void 0, -5);
    }
    util2.inherits(ReductionPromiseArray, PromiseArray);
    ReductionPromiseArray.prototype._gotAccum = function(accum) {
      if (this._eachValues !== void 0 && this._eachValues !== null && accum !== INTERNAL) {
        this._eachValues.push(accum);
      }
    };
    ReductionPromiseArray.prototype._eachComplete = function(value) {
      if (this._eachValues !== null) {
        this._eachValues.push(value);
      }
      return this._eachValues;
    };
    ReductionPromiseArray.prototype._init = function() {
    };
    ReductionPromiseArray.prototype._resolveEmptyArray = function() {
      this._resolve(this._eachValues !== void 0 ? this._eachValues : this._initialValue);
    };
    ReductionPromiseArray.prototype.shouldCopyValues = function() {
      return false;
    };
    ReductionPromiseArray.prototype._resolve = function(value) {
      this._promise._resolveCallback(value);
      this._values = null;
    };
    ReductionPromiseArray.prototype._resultCancelled = function(sender) {
      if (sender === this._initialValue) return this._cancel();
      if (this._isResolved()) return;
      this._resultCancelled$();
      if (this._currentCancellable instanceof Promise2) {
        this._currentCancellable.cancel();
      }
      if (this._initialValue instanceof Promise2) {
        this._initialValue.cancel();
      }
    };
    ReductionPromiseArray.prototype._iterate = function(values2) {
      this._values = values2;
      var value;
      var i;
      var length = values2.length;
      if (this._initialValue !== void 0) {
        value = this._initialValue;
        i = 0;
      } else {
        value = Promise2.resolve(values2[0]);
        i = 1;
      }
      this._currentCancellable = value;
      if (!value.isRejected()) {
        for (; i < length; ++i) {
          var ctx = {
            accum: null,
            value: values2[i],
            index: i,
            length,
            array: this
          };
          value = value._then(gotAccum, void 0, void 0, ctx, void 0);
        }
      }
      if (this._eachValues !== void 0) {
        value = value._then(this._eachComplete, void 0, void 0, this, void 0);
      }
      value._then(completed, completed, void 0, value, this);
    };
    Promise2.prototype.reduce = function(fn, initialValue) {
      return reduce2(this, fn, initialValue, null);
    };
    Promise2.reduce = function(promises2, fn, initialValue, _each) {
      return reduce2(promises2, fn, initialValue, _each);
    };
    function completed(valueOrReason, array) {
      if (this.isFulfilled()) {
        array._resolve(valueOrReason);
      } else {
        array._reject(valueOrReason);
      }
    }
    function reduce2(promises2, fn, initialValue, _each) {
      if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util2.classString(fn));
      }
      var array = new ReductionPromiseArray(promises2, fn, initialValue, _each);
      return array.promise();
    }
    function gotAccum(accum) {
      this.accum = accum;
      this.array._gotAccum(accum);
      var value = tryConvertToPromise(this.value, this.array._promise);
      if (value instanceof Promise2) {
        this.array._currentCancellable = value;
        return value._then(gotValue, void 0, void 0, this, void 0);
      } else {
        return gotValue.call(this, value);
      }
    }
    function gotValue(value) {
      var array = this.array;
      var promise2 = array._promise;
      var fn = tryCatch(array._fn);
      promise2._pushContext();
      var ret;
      if (array._eachValues !== void 0) {
        ret = fn.call(promise2._boundValue(), value, this.index, this.length);
      } else {
        ret = fn.call(
          promise2._boundValue(),
          this.accum,
          value,
          this.index,
          this.length
        );
      }
      if (ret instanceof Promise2) {
        array._currentCancellable = ret;
      }
      var promiseCreated = promise2._popContext();
      debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== void 0 ? "Promise.each" : "Promise.reduce",
        promise2
      );
      return ret;
    }
  };
  return reduce;
}
var settle;
var hasRequiredSettle;
function requireSettle() {
  if (hasRequiredSettle) return settle;
  hasRequiredSettle = 1;
  settle = function(Promise2, PromiseArray, debug) {
    var PromiseInspection = Promise2.PromiseInspection;
    var util2 = requireUtil();
    function SettledPromiseArray(values2) {
      this.constructor$(values2);
    }
    util2.inherits(SettledPromiseArray, PromiseArray);
    SettledPromiseArray.prototype._promiseResolved = function(index2, inspection) {
      this._values[index2] = inspection;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
      }
      return false;
    };
    SettledPromiseArray.prototype._promiseFulfilled = function(value, index2) {
      var ret = new PromiseInspection();
      ret._bitField = 33554432;
      ret._settledValueField = value;
      return this._promiseResolved(index2, ret);
    };
    SettledPromiseArray.prototype._promiseRejected = function(reason, index2) {
      var ret = new PromiseInspection();
      ret._bitField = 16777216;
      ret._settledValueField = reason;
      return this._promiseResolved(index2, ret);
    };
    Promise2.settle = function(promises2) {
      debug.deprecated(".settle()", ".reflect()");
      return new SettledPromiseArray(promises2).promise();
    };
    Promise2.prototype.settle = function() {
      return Promise2.settle(this);
    };
  };
  return settle;
}
var some;
var hasRequiredSome;
function requireSome() {
  if (hasRequiredSome) return some;
  hasRequiredSome = 1;
  some = function(Promise2, PromiseArray, apiRejection) {
    var util2 = requireUtil();
    var RangeError2 = requireErrors().RangeError;
    var AggregateError = requireErrors().AggregateError;
    var isArray2 = util2.isArray;
    var CANCELLATION = {};
    function SomePromiseArray(values2) {
      this.constructor$(values2);
      this._howMany = 0;
      this._unwrap = false;
      this._initialized = false;
    }
    util2.inherits(SomePromiseArray, PromiseArray);
    SomePromiseArray.prototype._init = function() {
      if (!this._initialized) {
        return;
      }
      if (this._howMany === 0) {
        this._resolve([]);
        return;
      }
      this._init$(void 0, -5);
      var isArrayResolved = isArray2(this._values);
      if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
      }
    };
    SomePromiseArray.prototype.init = function() {
      this._initialized = true;
      this._init();
    };
    SomePromiseArray.prototype.setUnwrap = function() {
      this._unwrap = true;
    };
    SomePromiseArray.prototype.howMany = function() {
      return this._howMany;
    };
    SomePromiseArray.prototype.setHowMany = function(count) {
      this._howMany = count;
    };
    SomePromiseArray.prototype._promiseFulfilled = function(value) {
      this._addFulfilled(value);
      if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
          this._resolve(this._values[0]);
        } else {
          this._resolve(this._values);
        }
        return true;
      }
      return false;
    };
    SomePromiseArray.prototype._promiseRejected = function(reason) {
      this._addRejected(reason);
      return this._checkOutcome();
    };
    SomePromiseArray.prototype._promiseCancelled = function() {
      if (this._values instanceof Promise2 || this._values == null) {
        return this._cancel();
      }
      this._addRejected(CANCELLATION);
      return this._checkOutcome();
    };
    SomePromiseArray.prototype._checkOutcome = function() {
      if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
          if (this._values[i] !== CANCELLATION) {
            e.push(this._values[i]);
          }
        }
        if (e.length > 0) {
          this._reject(e);
        } else {
          this._cancel();
        }
        return true;
      }
      return false;
    };
    SomePromiseArray.prototype._fulfilled = function() {
      return this._totalResolved;
    };
    SomePromiseArray.prototype._rejected = function() {
      return this._values.length - this.length();
    };
    SomePromiseArray.prototype._addRejected = function(reason) {
      this._values.push(reason);
    };
    SomePromiseArray.prototype._addFulfilled = function(value) {
      this._values[this._totalResolved++] = value;
    };
    SomePromiseArray.prototype._canPossiblyFulfill = function() {
      return this.length() - this._rejected();
    };
    SomePromiseArray.prototype._getRangeError = function(count) {
      var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
      return new RangeError2(message);
    };
    SomePromiseArray.prototype._resolveEmptyArray = function() {
      this._reject(this._getRangeError(0));
    };
    function some2(promises2, howMany) {
      if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
      }
      var ret = new SomePromiseArray(promises2);
      var promise2 = ret.promise();
      ret.setHowMany(howMany);
      ret.init();
      return promise2;
    }
    Promise2.some = function(promises2, howMany) {
      return some2(promises2, howMany);
    };
    Promise2.prototype.some = function(howMany) {
      return some2(this, howMany);
    };
    Promise2._SomePromiseArray = SomePromiseArray;
  };
  return some;
}
var filter;
var hasRequiredFilter;
function requireFilter() {
  if (hasRequiredFilter) return filter;
  hasRequiredFilter = 1;
  filter = function(Promise2, INTERNAL) {
    var PromiseMap = Promise2.map;
    Promise2.prototype.filter = function(fn, options) {
      return PromiseMap(this, fn, options, INTERNAL);
    };
    Promise2.filter = function(promises2, fn, options) {
      return PromiseMap(promises2, fn, options, INTERNAL);
    };
  };
  return filter;
}
var each;
var hasRequiredEach;
function requireEach() {
  if (hasRequiredEach) return each;
  hasRequiredEach = 1;
  each = function(Promise2, INTERNAL) {
    var PromiseReduce = Promise2.reduce;
    var PromiseAll = Promise2.all;
    function promiseAllThis() {
      return PromiseAll(this);
    }
    function PromiseMapSeries(promises2, fn) {
      return PromiseReduce(promises2, fn, INTERNAL, INTERNAL);
    }
    Promise2.prototype.each = function(fn) {
      return PromiseReduce(this, fn, INTERNAL, 0)._then(promiseAllThis, void 0, void 0, this, void 0);
    };
    Promise2.prototype.mapSeries = function(fn) {
      return PromiseReduce(this, fn, INTERNAL, INTERNAL);
    };
    Promise2.each = function(promises2, fn) {
      return PromiseReduce(promises2, fn, INTERNAL, 0)._then(promiseAllThis, void 0, void 0, promises2, void 0);
    };
    Promise2.mapSeries = PromiseMapSeries;
  };
  return each;
}
var any;
var hasRequiredAny;
function requireAny() {
  if (hasRequiredAny) return any;
  hasRequiredAny = 1;
  any = function(Promise2) {
    var SomePromiseArray = Promise2._SomePromiseArray;
    function any2(promises2) {
      var ret = new SomePromiseArray(promises2);
      var promise2 = ret.promise();
      ret.setHowMany(1);
      ret.setUnwrap();
      ret.init();
      return promise2;
    }
    Promise2.any = function(promises2) {
      return any2(promises2);
    };
    Promise2.prototype.any = function() {
      return any2(this);
    };
  };
  return any;
}
(function(module) {
  module.exports = function() {
    var makeSelfResolutionError = function() {
      return new TypeError2("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
    };
    var reflectHandler = function() {
      return new Promise2.PromiseInspection(this._target());
    };
    var apiRejection = function(msg) {
      return Promise2.reject(new TypeError2(msg));
    };
    function Proxyable() {
    }
    var UNDEFINED_BINDING = {};
    var util2 = requireUtil();
    var getDomain;
    if (util2.isNode) {
      getDomain = function() {
        var ret = process.domain;
        if (ret === void 0) ret = null;
        return ret;
      };
    } else {
      getDomain = function() {
        return null;
      };
    }
    util2.notEnumerableProp(Promise2, "_getDomain", getDomain);
    var es52 = requireEs5();
    var Async = requireAsync();
    var async2 = new Async();
    es52.defineProperty(Promise2, "_async", { value: async2 });
    var errors2 = requireErrors();
    var TypeError2 = Promise2.TypeError = errors2.TypeError;
    Promise2.RangeError = errors2.RangeError;
    var CancellationError = Promise2.CancellationError = errors2.CancellationError;
    Promise2.TimeoutError = errors2.TimeoutError;
    Promise2.OperationalError = errors2.OperationalError;
    Promise2.RejectionError = errors2.OperationalError;
    Promise2.AggregateError = errors2.AggregateError;
    var INTERNAL = function() {
    };
    var APPLY = {};
    var NEXT_FILTER = {};
    var tryConvertToPromise = requireThenables()(Promise2, INTERNAL);
    var PromiseArray = requirePromise_array()(
      Promise2,
      INTERNAL,
      tryConvertToPromise,
      apiRejection,
      Proxyable
    );
    var Context = requireContext()(Promise2);
    var createContext = Context.create;
    var debug = requireDebuggability()(Promise2, Context);
    debug.CapturedTrace;
    var PassThroughHandlerContext = require_finally()(Promise2, tryConvertToPromise);
    var catchFilter = requireCatch_filter()(NEXT_FILTER);
    var nodebackForPromise = requireNodeback();
    var errorObj = util2.errorObj;
    var tryCatch = util2.tryCatch;
    function check(self2, executor) {
      if (typeof executor !== "function") {
        throw new TypeError2("expecting a function but got " + util2.classString(executor));
      }
      if (self2.constructor !== Promise2) {
        throw new TypeError2("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
      }
    }
    function Promise2(executor) {
      this._bitField = 0;
      this._fulfillmentHandler0 = void 0;
      this._rejectionHandler0 = void 0;
      this._promise0 = void 0;
      this._receiver0 = void 0;
      if (executor !== INTERNAL) {
        check(this, executor);
        this._resolveFromExecutor(executor);
      }
      this._promiseCreated();
      this._fireEvent("promiseCreated", this);
    }
    Promise2.prototype.toString = function() {
      return "[object Promise]";
    };
    Promise2.prototype.caught = Promise2.prototype["catch"] = function(fn) {
      var len = arguments.length;
      if (len > 1) {
        var catchInstances = new Array(len - 1), j = 0, i;
        for (i = 0; i < len - 1; ++i) {
          var item = arguments[i];
          if (util2.isObject(item)) {
            catchInstances[j++] = item;
          } else {
            return apiRejection("expecting an object but got A catch statement predicate " + util2.classString(item));
          }
        }
        catchInstances.length = j;
        fn = arguments[i];
        return this.then(void 0, catchFilter(catchInstances, fn, this));
      }
      return this.then(void 0, fn);
    };
    Promise2.prototype.reflect = function() {
      return this._then(
        reflectHandler,
        reflectHandler,
        void 0,
        this,
        void 0
      );
    };
    Promise2.prototype.then = function(didFulfill, didReject) {
      if (debug.warnings() && arguments.length > 0 && typeof didFulfill !== "function" && typeof didReject !== "function") {
        var msg = ".then() only accepts functions but was passed: " + util2.classString(didFulfill);
        if (arguments.length > 1) {
          msg += ", " + util2.classString(didReject);
        }
        this._warn(msg);
      }
      return this._then(didFulfill, didReject, void 0, void 0, void 0);
    };
    Promise2.prototype.done = function(didFulfill, didReject) {
      var promise2 = this._then(didFulfill, didReject, void 0, void 0, void 0);
      promise2._setIsFinal();
    };
    Promise2.prototype.spread = function(fn) {
      if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util2.classString(fn));
      }
      return this.all()._then(fn, void 0, void 0, APPLY, void 0);
    };
    Promise2.prototype.toJSON = function() {
      var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: void 0,
        rejectionReason: void 0
      };
      if (this.isFulfilled()) {
        ret.fulfillmentValue = this.value();
        ret.isFulfilled = true;
      } else if (this.isRejected()) {
        ret.rejectionReason = this.reason();
        ret.isRejected = true;
      }
      return ret;
    };
    Promise2.prototype.all = function() {
      if (arguments.length > 0) {
        this._warn(".all() was passed arguments but it does not take any");
      }
      return new PromiseArray(this).promise();
    };
    Promise2.prototype.error = function(fn) {
      return this.caught(util2.originatesFromRejection, fn);
    };
    Promise2.getNewLibraryCopy = module.exports;
    Promise2.is = function(val) {
      return val instanceof Promise2;
    };
    Promise2.fromNode = Promise2.fromCallback = function(fn) {
      var ret = new Promise2(INTERNAL);
      ret._captureStackTrace();
      var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false;
      var result2 = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
      if (result2 === errorObj) {
        ret._rejectCallback(result2.e, true);
      }
      if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
      return ret;
    };
    Promise2.all = function(promises2) {
      return new PromiseArray(promises2).promise();
    };
    Promise2.cast = function(obj) {
      var ret = tryConvertToPromise(obj);
      if (!(ret instanceof Promise2)) {
        ret = new Promise2(INTERNAL);
        ret._captureStackTrace();
        ret._setFulfilled();
        ret._rejectionHandler0 = obj;
      }
      return ret;
    };
    Promise2.resolve = Promise2.fulfilled = Promise2.cast;
    Promise2.reject = Promise2.rejected = function(reason) {
      var ret = new Promise2(INTERNAL);
      ret._captureStackTrace();
      ret._rejectCallback(reason, true);
      return ret;
    };
    Promise2.setScheduler = function(fn) {
      if (typeof fn !== "function") {
        throw new TypeError2("expecting a function but got " + util2.classString(fn));
      }
      return async2.setScheduler(fn);
    };
    Promise2.prototype._then = function(didFulfill, didReject, _2, receiver, internalData) {
      var haveInternalData = internalData !== void 0;
      var promise2 = haveInternalData ? internalData : new Promise2(INTERNAL);
      var target = this._target();
      var bitField = target._bitField;
      if (!haveInternalData) {
        promise2._propagateFrom(this, 3);
        promise2._captureStackTrace();
        if (receiver === void 0 && (this._bitField & 2097152) !== 0) {
          if (!((bitField & 50397184) === 0)) {
            receiver = this._boundValue();
          } else {
            receiver = target === this ? void 0 : this._boundTo;
          }
        }
        this._fireEvent("promiseChained", this, promise2);
      }
      var domain = getDomain();
      if (!((bitField & 50397184) === 0)) {
        var handler, value, settler = target._settlePromiseCtx;
        if ((bitField & 33554432) !== 0) {
          value = target._rejectionHandler0;
          handler = didFulfill;
        } else if ((bitField & 16777216) !== 0) {
          value = target._fulfillmentHandler0;
          handler = didReject;
          target._unsetRejectionIsUnhandled();
        } else {
          settler = target._settlePromiseLateCancellationObserver;
          value = new CancellationError("late cancellation observer");
          target._attachExtraTrace(value);
          handler = didReject;
        }
        async2.invoke(settler, target, {
          handler: domain === null ? handler : typeof handler === "function" && util2.domainBind(domain, handler),
          promise: promise2,
          receiver,
          value
        });
      } else {
        target._addCallbacks(didFulfill, didReject, promise2, receiver, domain);
      }
      return promise2;
    };
    Promise2.prototype._length = function() {
      return this._bitField & 65535;
    };
    Promise2.prototype._isFateSealed = function() {
      return (this._bitField & 117506048) !== 0;
    };
    Promise2.prototype._isFollowing = function() {
      return (this._bitField & 67108864) === 67108864;
    };
    Promise2.prototype._setLength = function(len) {
      this._bitField = this._bitField & -65536 | len & 65535;
    };
    Promise2.prototype._setFulfilled = function() {
      this._bitField = this._bitField | 33554432;
      this._fireEvent("promiseFulfilled", this);
    };
    Promise2.prototype._setRejected = function() {
      this._bitField = this._bitField | 16777216;
      this._fireEvent("promiseRejected", this);
    };
    Promise2.prototype._setFollowing = function() {
      this._bitField = this._bitField | 67108864;
      this._fireEvent("promiseResolved", this);
    };
    Promise2.prototype._setIsFinal = function() {
      this._bitField = this._bitField | 4194304;
    };
    Promise2.prototype._isFinal = function() {
      return (this._bitField & 4194304) > 0;
    };
    Promise2.prototype._unsetCancelled = function() {
      this._bitField = this._bitField & -65537;
    };
    Promise2.prototype._setCancelled = function() {
      this._bitField = this._bitField | 65536;
      this._fireEvent("promiseCancelled", this);
    };
    Promise2.prototype._setWillBeCancelled = function() {
      this._bitField = this._bitField | 8388608;
    };
    Promise2.prototype._setAsyncGuaranteed = function() {
      if (async2.hasCustomScheduler()) return;
      this._bitField = this._bitField | 134217728;
    };
    Promise2.prototype._receiverAt = function(index2) {
      var ret = index2 === 0 ? this._receiver0 : this[index2 * 4 - 4 + 3];
      if (ret === UNDEFINED_BINDING) {
        return void 0;
      } else if (ret === void 0 && this._isBound()) {
        return this._boundValue();
      }
      return ret;
    };
    Promise2.prototype._promiseAt = function(index2) {
      return this[index2 * 4 - 4 + 2];
    };
    Promise2.prototype._fulfillmentHandlerAt = function(index2) {
      return this[index2 * 4 - 4 + 0];
    };
    Promise2.prototype._rejectionHandlerAt = function(index2) {
      return this[index2 * 4 - 4 + 1];
    };
    Promise2.prototype._boundValue = function() {
    };
    Promise2.prototype._migrateCallback0 = function(follower) {
      follower._bitField;
      var fulfill = follower._fulfillmentHandler0;
      var reject2 = follower._rejectionHandler0;
      var promise2 = follower._promise0;
      var receiver = follower._receiverAt(0);
      if (receiver === void 0) receiver = UNDEFINED_BINDING;
      this._addCallbacks(fulfill, reject2, promise2, receiver, null);
    };
    Promise2.prototype._migrateCallbackAt = function(follower, index2) {
      var fulfill = follower._fulfillmentHandlerAt(index2);
      var reject2 = follower._rejectionHandlerAt(index2);
      var promise2 = follower._promiseAt(index2);
      var receiver = follower._receiverAt(index2);
      if (receiver === void 0) receiver = UNDEFINED_BINDING;
      this._addCallbacks(fulfill, reject2, promise2, receiver, null);
    };
    Promise2.prototype._addCallbacks = function(fulfill, reject2, promise2, receiver, domain) {
      var index2 = this._length();
      if (index2 >= 65535 - 4) {
        index2 = 0;
        this._setLength(0);
      }
      if (index2 === 0) {
        this._promise0 = promise2;
        this._receiver0 = receiver;
        if (typeof fulfill === "function") {
          this._fulfillmentHandler0 = domain === null ? fulfill : util2.domainBind(domain, fulfill);
        }
        if (typeof reject2 === "function") {
          this._rejectionHandler0 = domain === null ? reject2 : util2.domainBind(domain, reject2);
        }
      } else {
        var base = index2 * 4 - 4;
        this[base + 2] = promise2;
        this[base + 3] = receiver;
        if (typeof fulfill === "function") {
          this[base + 0] = domain === null ? fulfill : util2.domainBind(domain, fulfill);
        }
        if (typeof reject2 === "function") {
          this[base + 1] = domain === null ? reject2 : util2.domainBind(domain, reject2);
        }
      }
      this._setLength(index2 + 1);
      return index2;
    };
    Promise2.prototype._proxy = function(proxyable, arg) {
      this._addCallbacks(void 0, void 0, arg, proxyable, null);
    };
    Promise2.prototype._resolveCallback = function(value, shouldBind) {
      if ((this._bitField & 117506048) !== 0) return;
      if (value === this)
        return this._rejectCallback(makeSelfResolutionError(), false);
      var maybePromise = tryConvertToPromise(value, this);
      if (!(maybePromise instanceof Promise2)) return this._fulfill(value);
      if (shouldBind) this._propagateFrom(maybePromise, 2);
      var promise2 = maybePromise._target();
      if (promise2 === this) {
        this._reject(makeSelfResolutionError());
        return;
      }
      var bitField = promise2._bitField;
      if ((bitField & 50397184) === 0) {
        var len = this._length();
        if (len > 0) promise2._migrateCallback0(this);
        for (var i = 1; i < len; ++i) {
          promise2._migrateCallbackAt(this, i);
        }
        this._setFollowing();
        this._setLength(0);
        this._setFollowee(promise2);
      } else if ((bitField & 33554432) !== 0) {
        this._fulfill(promise2._value());
      } else if ((bitField & 16777216) !== 0) {
        this._reject(promise2._reason());
      } else {
        var reason = new CancellationError("late cancellation observer");
        promise2._attachExtraTrace(reason);
        this._reject(reason);
      }
    };
    Promise2.prototype._rejectCallback = function(reason, synchronous, ignoreNonErrorWarnings) {
      var trace = util2.ensureErrorObject(reason);
      var hasStack = trace === reason;
      if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " + util2.classString(reason);
        this._warn(message, true);
      }
      this._attachExtraTrace(trace, synchronous ? hasStack : false);
      this._reject(reason);
    };
    Promise2.prototype._resolveFromExecutor = function(executor) {
      var promise2 = this;
      this._captureStackTrace();
      this._pushContext();
      var synchronous = true;
      var r = this._execute(executor, function(value) {
        promise2._resolveCallback(value);
      }, function(reason) {
        promise2._rejectCallback(reason, synchronous);
      });
      synchronous = false;
      this._popContext();
      if (r !== void 0) {
        promise2._rejectCallback(r, true);
      }
    };
    Promise2.prototype._settlePromiseFromHandler = function(handler, receiver, value, promise2) {
      var bitField = promise2._bitField;
      if ((bitField & 65536) !== 0) return;
      promise2._pushContext();
      var x;
      if (receiver === APPLY) {
        if (!value || typeof value.length !== "number") {
          x = errorObj;
          x.e = new TypeError2("cannot .spread() a non-array: " + util2.classString(value));
        } else {
          x = tryCatch(handler).apply(this._boundValue(), value);
        }
      } else {
        x = tryCatch(handler).call(receiver, value);
      }
      var promiseCreated = promise2._popContext();
      bitField = promise2._bitField;
      if ((bitField & 65536) !== 0) return;
      if (x === NEXT_FILTER) {
        promise2._reject(value);
      } else if (x === errorObj) {
        promise2._rejectCallback(x.e, false);
      } else {
        debug.checkForgottenReturns(x, promiseCreated, "", promise2, this);
        promise2._resolveCallback(x);
      }
    };
    Promise2.prototype._target = function() {
      var ret = this;
      while (ret._isFollowing()) ret = ret._followee();
      return ret;
    };
    Promise2.prototype._followee = function() {
      return this._rejectionHandler0;
    };
    Promise2.prototype._setFollowee = function(promise2) {
      this._rejectionHandler0 = promise2;
    };
    Promise2.prototype._settlePromise = function(promise2, handler, receiver, value) {
      var isPromise = promise2 instanceof Promise2;
      var bitField = this._bitField;
      var asyncGuaranteed = (bitField & 134217728) !== 0;
      if ((bitField & 65536) !== 0) {
        if (isPromise) promise2._invokeInternalOnCancel();
        if (receiver instanceof PassThroughHandlerContext && receiver.isFinallyHandler()) {
          receiver.cancelPromise = promise2;
          if (tryCatch(handler).call(receiver, value) === errorObj) {
            promise2._reject(errorObj.e);
          }
        } else if (handler === reflectHandler) {
          promise2._fulfill(reflectHandler.call(receiver));
        } else if (receiver instanceof Proxyable) {
          receiver._promiseCancelled(promise2);
        } else if (isPromise || promise2 instanceof PromiseArray) {
          promise2._cancel();
        } else {
          receiver.cancel();
        }
      } else if (typeof handler === "function") {
        if (!isPromise) {
          handler.call(receiver, value, promise2);
        } else {
          if (asyncGuaranteed) promise2._setAsyncGuaranteed();
          this._settlePromiseFromHandler(handler, receiver, value, promise2);
        }
      } else if (receiver instanceof Proxyable) {
        if (!receiver._isResolved()) {
          if ((bitField & 33554432) !== 0) {
            receiver._promiseFulfilled(value, promise2);
          } else {
            receiver._promiseRejected(value, promise2);
          }
        }
      } else if (isPromise) {
        if (asyncGuaranteed) promise2._setAsyncGuaranteed();
        if ((bitField & 33554432) !== 0) {
          promise2._fulfill(value);
        } else {
          promise2._reject(value);
        }
      }
    };
    Promise2.prototype._settlePromiseLateCancellationObserver = function(ctx) {
      var handler = ctx.handler;
      var promise2 = ctx.promise;
      var receiver = ctx.receiver;
      var value = ctx.value;
      if (typeof handler === "function") {
        if (!(promise2 instanceof Promise2)) {
          handler.call(receiver, value, promise2);
        } else {
          this._settlePromiseFromHandler(handler, receiver, value, promise2);
        }
      } else if (promise2 instanceof Promise2) {
        promise2._reject(value);
      }
    };
    Promise2.prototype._settlePromiseCtx = function(ctx) {
      this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
    };
    Promise2.prototype._settlePromise0 = function(handler, value, bitField) {
      var promise2 = this._promise0;
      var receiver = this._receiverAt(0);
      this._promise0 = void 0;
      this._receiver0 = void 0;
      this._settlePromise(promise2, handler, receiver, value);
    };
    Promise2.prototype._clearCallbackDataAtIndex = function(index2) {
      var base = index2 * 4 - 4;
      this[base + 2] = this[base + 3] = this[base + 0] = this[base + 1] = void 0;
    };
    Promise2.prototype._fulfill = function(value) {
      var bitField = this._bitField;
      if ((bitField & 117506048) >>> 16) return;
      if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._reject(err);
      }
      this._setFulfilled();
      this._rejectionHandler0 = value;
      if ((bitField & 65535) > 0) {
        if ((bitField & 134217728) !== 0) {
          this._settlePromises();
        } else {
          async2.settlePromises(this);
        }
      }
    };
    Promise2.prototype._reject = function(reason) {
      var bitField = this._bitField;
      if ((bitField & 117506048) >>> 16) return;
      this._setRejected();
      this._fulfillmentHandler0 = reason;
      if (this._isFinal()) {
        return async2.fatalError(reason, util2.isNode);
      }
      if ((bitField & 65535) > 0) {
        async2.settlePromises(this);
      } else {
        this._ensurePossibleRejectionHandled();
      }
    };
    Promise2.prototype._fulfillPromises = function(len, value) {
      for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i);
        var promise2 = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise2, handler, receiver, value);
      }
    };
    Promise2.prototype._rejectPromises = function(len, reason) {
      for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i);
        var promise2 = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise2, handler, receiver, reason);
      }
    };
    Promise2.prototype._settlePromises = function() {
      var bitField = this._bitField;
      var len = bitField & 65535;
      if (len > 0) {
        if ((bitField & 16842752) !== 0) {
          var reason = this._fulfillmentHandler0;
          this._settlePromise0(this._rejectionHandler0, reason, bitField);
          this._rejectPromises(len, reason);
        } else {
          var value = this._rejectionHandler0;
          this._settlePromise0(this._fulfillmentHandler0, value, bitField);
          this._fulfillPromises(len, value);
        }
        this._setLength(0);
      }
      this._clearCancellationData();
    };
    Promise2.prototype._settledValue = function() {
      var bitField = this._bitField;
      if ((bitField & 33554432) !== 0) {
        return this._rejectionHandler0;
      } else if ((bitField & 16777216) !== 0) {
        return this._fulfillmentHandler0;
      }
    };
    function deferResolve(v) {
      this.promise._resolveCallback(v);
    }
    function deferReject(v) {
      this.promise._rejectCallback(v, false);
    }
    Promise2.defer = Promise2.pending = function() {
      debug.deprecated("Promise.defer", "new Promise");
      var promise2 = new Promise2(INTERNAL);
      return {
        promise: promise2,
        resolve: deferResolve,
        reject: deferReject
      };
    };
    util2.notEnumerableProp(
      Promise2,
      "_makeSelfResolutionError",
      makeSelfResolutionError
    );
    requireMethod()(
      Promise2,
      INTERNAL,
      tryConvertToPromise,
      apiRejection,
      debug
    );
    requireBind()(Promise2, INTERNAL, tryConvertToPromise, debug);
    requireCancel()(Promise2, PromiseArray, apiRejection, debug);
    requireDirect_resolve()(Promise2);
    requireSynchronous_inspection()(Promise2);
    requireJoin()(
      Promise2,
      PromiseArray,
      tryConvertToPromise,
      INTERNAL,
      async2,
      getDomain
    );
    Promise2.Promise = Promise2;
    Promise2.version = "3.4.7";
    requireMap()(Promise2, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
    requireCall_get()(Promise2);
    requireUsing()(Promise2, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
    requireTimers()(Promise2, INTERNAL, debug);
    requireGenerators()(Promise2, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
    requireNodeify()(Promise2);
    requirePromisify()(Promise2, INTERNAL);
    requireProps()(Promise2, PromiseArray, tryConvertToPromise, apiRejection);
    requireRace()(Promise2, INTERNAL, tryConvertToPromise, apiRejection);
    requireReduce()(Promise2, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
    requireSettle()(Promise2, PromiseArray, debug);
    requireSome()(Promise2, PromiseArray, apiRejection);
    requireFilter()(Promise2, INTERNAL);
    requireEach()(Promise2, INTERNAL);
    requireAny()(Promise2);
    util2.toFastProperties(Promise2);
    util2.toFastProperties(Promise2.prototype);
    function fillTypes(value) {
      var p = new Promise2(INTERNAL);
      p._fulfillmentHandler0 = value;
      p._rejectionHandler0 = value;
      p._promise0 = value;
      p._receiver0 = value;
    }
    fillTypes({ a: 1 });
    fillTypes({ b: 2 });
    fillTypes({ c: 3 });
    fillTypes(1);
    fillTypes(function() {
    });
    fillTypes(void 0);
    fillTypes(false);
    fillTypes(new Promise2(INTERNAL));
    debug.setBounds(Async.firstLineError, util2.lastLineError);
    return Promise2;
  };
})(promise);
var promiseExports = promise.exports;
var _$g = require$$0;
var bluebird = promiseExports();
promises$7.defer = defer;
promises$7.when = bluebird.resolve;
promises$7.resolve = bluebird.resolve;
promises$7.all = bluebird.all;
promises$7.props = bluebird.props;
promises$7.reject = bluebird.reject;
promises$7.promisify = bluebird.promisify;
promises$7.mapSeries = bluebird.mapSeries;
promises$7.attempt = bluebird.attempt;
promises$7.nfcall = function(func) {
  var args = Array.prototype.slice.call(arguments, 1);
  var promisedFunc = bluebird.promisify(func);
  return promisedFunc.apply(null, args);
};
bluebird.prototype.fail = bluebird.prototype.caught;
bluebird.prototype.also = function(func) {
  return this.then(function(value) {
    var returnValue = _$g.extend({}, value, func(value));
    return bluebird.props(returnValue);
  });
};
function defer() {
  var resolve;
  var reject2;
  var promise2 = new bluebird.Promise(function(resolveArg, rejectArg) {
    resolve = resolveArg;
    reject2 = rejectArg;
  });
  return {
    resolve,
    reject: reject2,
    promise: promise2
  };
}
var documents$7 = {};
var _$f = require$$0;
var types = documents$7.types = {
  document: "document",
  paragraph: "paragraph",
  run: "run",
  text: "text",
  tab: "tab",
  checkbox: "checkbox",
  hyperlink: "hyperlink",
  noteReference: "noteReference",
  image: "image",
  note: "note",
  commentReference: "commentReference",
  comment: "comment",
  table: "table",
  tableRow: "tableRow",
  tableCell: "tableCell",
  "break": "break",
  bookmarkStart: "bookmarkStart"
};
function Document$1(children, options) {
  options = options || {};
  return {
    type: types.document,
    children,
    notes: options.notes || new Notes({}),
    comments: options.comments || []
  };
}
function Paragraph(children, properties) {
  properties = properties || {};
  var indent = properties.indent || {};
  return {
    type: types.paragraph,
    children,
    styleId: properties.styleId || null,
    styleName: properties.styleName || null,
    numbering: properties.numbering || null,
    alignment: properties.alignment || null,
    indent: {
      start: indent.start || null,
      end: indent.end || null,
      firstLine: indent.firstLine || null,
      hanging: indent.hanging || null
    }
  };
}
function Run(children, properties) {
  properties = properties || {};
  return {
    type: types.run,
    children,
    styleId: properties.styleId || null,
    styleName: properties.styleName || null,
    isBold: !!properties.isBold,
    isUnderline: !!properties.isUnderline,
    isItalic: !!properties.isItalic,
    isStrikethrough: !!properties.isStrikethrough,
    isAllCaps: !!properties.isAllCaps,
    isSmallCaps: !!properties.isSmallCaps,
    verticalAlignment: properties.verticalAlignment || verticalAlignment.baseline,
    font: properties.font || null,
    fontSize: properties.fontSize || null,
    highlight: properties.highlight || null
  };
}
var verticalAlignment = {
  baseline: "baseline",
  superscript: "superscript",
  subscript: "subscript"
};
function Text$1(value) {
  return {
    type: types.text,
    value
  };
}
function Tab() {
  return {
    type: types.tab
  };
}
function Checkbox(options) {
  return {
    type: types.checkbox,
    checked: options.checked
  };
}
function Hyperlink(children, options) {
  return {
    type: types.hyperlink,
    children,
    href: options.href,
    anchor: options.anchor,
    targetFrame: options.targetFrame
  };
}
function NoteReference(options) {
  return {
    type: types.noteReference,
    noteType: options.noteType,
    noteId: options.noteId
  };
}
function Notes(notes) {
  this._notes = _$f.indexBy(notes, function(note) {
    return noteKey(note.noteType, note.noteId);
  });
}
Notes.prototype.resolve = function(reference) {
  return this.findNoteByKey(noteKey(reference.noteType, reference.noteId));
};
Notes.prototype.findNoteByKey = function(key) {
  return this._notes[key] || null;
};
function Note(options) {
  return {
    type: types.note,
    noteType: options.noteType,
    noteId: options.noteId,
    body: options.body
  };
}
function commentReference(options) {
  return {
    type: types.commentReference,
    commentId: options.commentId
  };
}
function comment(options) {
  return {
    type: types.comment,
    commentId: options.commentId,
    body: options.body,
    authorName: options.authorName,
    authorInitials: options.authorInitials
  };
}
function noteKey(noteType, id) {
  return noteType + "-" + id;
}
function Image(options) {
  return {
    type: types.image,
    // `read` is retained for backwards compatibility, but other read
    // methods should be preferred.
    read: function(encoding) {
      if (encoding) {
        return options.readImage(encoding);
      } else {
        return options.readImage().then(function(arrayBuffer) {
          return Buffer.from(arrayBuffer);
        });
      }
    },
    readAsArrayBuffer: function() {
      return options.readImage();
    },
    readAsBase64String: function() {
      return options.readImage("base64");
    },
    readAsBuffer: function() {
      return options.readImage().then(function(arrayBuffer) {
        return Buffer.from(arrayBuffer);
      });
    },
    altText: options.altText,
    contentType: options.contentType
  };
}
function Table(children, properties) {
  properties = properties || {};
  return {
    type: types.table,
    children,
    styleId: properties.styleId || null,
    styleName: properties.styleName || null
  };
}
function TableRow(children, options) {
  options = options || {};
  return {
    type: types.tableRow,
    children,
    isHeader: options.isHeader || false
  };
}
function TableCell(children, options) {
  options = options || {};
  return {
    type: types.tableCell,
    children,
    colSpan: options.colSpan == null ? 1 : options.colSpan,
    rowSpan: options.rowSpan == null ? 1 : options.rowSpan
  };
}
function Break(breakType) {
  return {
    type: types["break"],
    breakType
  };
}
function BookmarkStart(options) {
  return {
    type: types.bookmarkStart,
    name: options.name
  };
}
documents$7.document = documents$7.Document = Document$1;
documents$7.paragraph = documents$7.Paragraph = Paragraph;
documents$7.run = documents$7.Run = Run;
documents$7.text = documents$7.Text = Text$1;
documents$7.tab = documents$7.Tab = Tab;
documents$7.checkbox = documents$7.Checkbox = Checkbox;
documents$7.Hyperlink = Hyperlink;
documents$7.noteReference = documents$7.NoteReference = NoteReference;
documents$7.Notes = Notes;
documents$7.Note = Note;
documents$7.commentReference = commentReference;
documents$7.comment = comment;
documents$7.Image = Image;
documents$7.Table = Table;
documents$7.TableRow = TableRow;
documents$7.TableCell = TableCell;
documents$7.lineBreak = Break("line");
documents$7.pageBreak = Break("page");
documents$7.columnBreak = Break("column");
documents$7.BookmarkStart = BookmarkStart;
documents$7.verticalAlignment = verticalAlignment;
var results$2 = {};
var _$e = require$$0;
results$2.Result = Result$7;
results$2.success = success;
results$2.warning = warning$1;
results$2.error = error;
function Result$7(value, messages) {
  this.value = value;
  this.messages = messages || [];
}
Result$7.prototype.map = function(func) {
  return new Result$7(func(this.value), this.messages);
};
Result$7.prototype.flatMap = function(func) {
  var funcResult = func(this.value);
  return new Result$7(funcResult.value, combineMessages([this, funcResult]));
};
Result$7.prototype.flatMapThen = function(func) {
  var that = this;
  return func(this.value).then(function(otherResult) {
    return new Result$7(otherResult.value, combineMessages([that, otherResult]));
  });
};
Result$7.combine = function(results2) {
  var values2 = _$e.flatten(_$e.pluck(results2, "value"));
  var messages = combineMessages(results2);
  return new Result$7(values2, messages);
};
function success(value) {
  return new Result$7(value, []);
}
function warning$1(message) {
  return {
    type: "warning",
    message
  };
}
function error(exception) {
  return {
    type: "error",
    message: exception.message,
    error: exception
  };
}
function combineMessages(results2) {
  var messages = [];
  _$e.flatten(_$e.pluck(results2, "messages"), true).forEach(function(message) {
    if (!containsMessage(messages, message)) {
      messages.push(message);
    }
  });
  return messages;
}
function containsMessage(messages, message) {
  return _$e.find(messages, isSameMessage.bind(null, message)) !== void 0;
}
function isSameMessage(first2, second) {
  return first2.type === second.type && first2.message === second.message;
}
var zipfile$2 = {};
var base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
    );
  }
  return parts.join("");
}
var base64js = base64Js;
var JSZip = jszip_minExports;
zipfile$2.openArrayBuffer = openArrayBuffer;
zipfile$2.splitPath = splitPath;
zipfile$2.joinPath = joinPath;
function openArrayBuffer(arrayBuffer) {
  return JSZip.loadAsync(arrayBuffer).then(function(zipFile) {
    function exists(name) {
      return zipFile.file(name) !== null;
    }
    function read2(name, encoding) {
      return zipFile.file(name).async("uint8array").then(function(array) {
        if (encoding === "base64") {
          return base64js.fromByteArray(array);
        } else if (encoding) {
          var decoder = new TextDecoder(encoding);
          return decoder.decode(array);
        } else {
          return array;
        }
      });
    }
    function write(name, contents) {
      zipFile.file(name, contents);
    }
    function toArrayBuffer() {
      return zipFile.generateAsync({ type: "arraybuffer" });
    }
    return {
      exists,
      read: read2,
      write,
      toArrayBuffer
    };
  });
}
function splitPath(path) {
  var lastIndex = path.lastIndexOf("/");
  if (lastIndex === -1) {
    return { dirname: "", basename: path };
  } else {
    return {
      dirname: path.substring(0, lastIndex),
      basename: path.substring(lastIndex + 1)
    };
  }
}
function joinPath() {
  var nonEmptyPaths = Array.prototype.filter.call(arguments, function(path) {
    return path;
  });
  var relevantPaths = [];
  nonEmptyPaths.forEach(function(path) {
    if (/^\//.test(path)) {
      relevantPaths = [path];
    } else {
      relevantPaths.push(path);
    }
  });
  return relevantPaths.join("/");
}
var officeXmlReader = {};
var xml$3 = {};
var nodes$2 = {};
var _$d = require$$0;
nodes$2.Element = Element$2;
nodes$2.element = function(name, attributes, children) {
  return new Element$2(name, attributes, children);
};
nodes$2.text = function(value) {
  return {
    type: "text",
    value
  };
};
var emptyElement = nodes$2.emptyElement = {
  first: function() {
    return null;
  },
  firstOrEmpty: function() {
    return emptyElement;
  },
  attributes: {},
  children: []
};
function Element$2(name, attributes, children) {
  this.type = "element";
  this.name = name;
  this.attributes = attributes || {};
  this.children = children || [];
}
Element$2.prototype.first = function(name) {
  return _$d.find(this.children, function(child) {
    return child.name === name;
  });
};
Element$2.prototype.firstOrEmpty = function(name) {
  return this.first(name) || emptyElement;
};
Element$2.prototype.getElementsByTagName = function(name) {
  var elements2 = _$d.filter(this.children, function(child) {
    return child.name === name;
  });
  return toElementList(elements2);
};
Element$2.prototype.text = function() {
  if (this.children.length === 0) {
    return "";
  } else if (this.children.length !== 1 || this.children[0].type !== "text") {
    throw new Error("Not implemented");
  }
  return this.children[0].value;
};
var elementListPrototype = {
  getElementsByTagName: function(name) {
    return toElementList(_$d.flatten(this.map(function(element2) {
      return element2.getElementsByTagName(name);
    }, true)));
  }
};
function toElementList(array) {
  return _$d.extend(array, elementListPrototype);
}
var reader = {};
var xmldom$2 = {};
var lib$1 = {};
var dom$3 = {};
var conventions$2 = {};
function find$1(list, predicate, ac) {
  if (ac === void 0) {
    ac = Array.prototype;
  }
  if (list && typeof ac.find === "function") {
    return ac.find.call(list, predicate);
  }
  for (var i = 0; i < list.length; i++) {
    if (Object.prototype.hasOwnProperty.call(list, i)) {
      var item = list[i];
      if (predicate.call(void 0, item, i, list)) {
        return item;
      }
    }
  }
}
function freeze(object2, oc) {
  if (oc === void 0) {
    oc = Object;
  }
  return oc && typeof oc.freeze === "function" ? oc.freeze(object2) : object2;
}
function assign(target, source) {
  if (target === null || typeof target !== "object") {
    throw new TypeError("target is not an object");
  }
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
  return target;
}
var MIME_TYPE = freeze({
  /**
   * `text/html`, the only mime type that triggers treating an XML document as HTML.
   *
   * @see DOMParser.SupportedType.isHTML
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
   */
  HTML: "text/html",
  /**
   * Helper method to check a mime type if it indicates an HTML document
   *
   * @param {string} [value]
   * @returns {boolean}
   *
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
  isHTML: function(value) {
    return value === MIME_TYPE.HTML;
  },
  /**
   * `application/xml`, the standard mime type for XML documents.
   *
   * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
   * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
   * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
   */
  XML_APPLICATION: "application/xml",
  /**
   * `text/html`, an alias for `application/xml`.
   *
   * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
   * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
   */
  XML_TEXT: "text/xml",
  /**
   * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
   * but is parsed as an XML document.
   *
   * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
   * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
   */
  XML_XHTML_APPLICATION: "application/xhtml+xml",
  /**
   * `image/svg+xml`,
   *
   * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
   * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
   * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
   */
  XML_SVG_IMAGE: "image/svg+xml"
});
var NAMESPACE$3 = freeze({
  /**
   * The XHTML namespace.
   *
   * @see http://www.w3.org/1999/xhtml
   */
  HTML: "http://www.w3.org/1999/xhtml",
  /**
   * Checks if `uri` equals `NAMESPACE.HTML`.
   *
   * @param {string} [uri]
   *
   * @see NAMESPACE.HTML
   */
  isHTML: function(uri) {
    return uri === NAMESPACE$3.HTML;
  },
  /**
   * The SVG namespace.
   *
   * @see http://www.w3.org/2000/svg
   */
  SVG: "http://www.w3.org/2000/svg",
  /**
   * The `xml:` namespace.
   *
   * @see http://www.w3.org/XML/1998/namespace
   */
  XML: "http://www.w3.org/XML/1998/namespace",
  /**
   * The `xmlns:` namespace
   *
   * @see https://www.w3.org/2000/xmlns/
   */
  XMLNS: "http://www.w3.org/2000/xmlns/"
});
conventions$2.assign = assign;
conventions$2.find = find$1;
conventions$2.freeze = freeze;
conventions$2.MIME_TYPE = MIME_TYPE;
conventions$2.NAMESPACE = NAMESPACE$3;
var conventions$1 = conventions$2;
var find = conventions$1.find;
var NAMESPACE$2 = conventions$1.NAMESPACE;
function notEmptyString(input) {
  return input !== "";
}
function splitOnASCIIWhitespace(input) {
  return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
}
function orderedSetReducer(current, element2) {
  if (!current.hasOwnProperty(element2)) {
    current[element2] = true;
  }
  return current;
}
function toOrderedSet(input) {
  if (!input) return [];
  var list = splitOnASCIIWhitespace(input);
  return Object.keys(list.reduce(orderedSetReducer, {}));
}
function arrayIncludes(list) {
  return function(element2) {
    return list && list.indexOf(element2) !== -1;
  };
}
function copy(src, dest) {
  for (var p in src) {
    if (Object.prototype.hasOwnProperty.call(src, p)) {
      dest[p] = src[p];
    }
  }
}
function _extends(Class, Super) {
  var pt = Class.prototype;
  if (!(pt instanceof Super)) {
    let t = function() {
    };
    t.prototype = Super.prototype;
    t = new t();
    copy(pt, t);
    Class.prototype = pt = t;
  }
  if (pt.constructor != Class) {
    if (typeof Class != "function") {
      console.error("unknown Class:" + Class);
    }
    pt.constructor = Class;
  }
}
var NodeType = {};
var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
var TEXT_NODE = NodeType.TEXT_NODE = 3;
var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
var ExceptionCode = {};
var ExceptionMessage = {};
ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
function DOMException(code2, message) {
  if (message instanceof Error) {
    var error2 = message;
  } else {
    error2 = this;
    Error.call(this, ExceptionMessage[code2]);
    this.message = ExceptionMessage[code2];
    if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
  }
  error2.code = code2;
  if (message) this.message = this.message + ": " + message;
  return error2;
}
DOMException.prototype = Error.prototype;
copy(ExceptionCode, DOMException);
function NodeList() {
}
NodeList.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,
  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
   */
  item: function(index2) {
    return index2 >= 0 && index2 < this.length ? this[index2] : null;
  },
  toString: function(isHTML, nodeFilter) {
    for (var buf = [], i = 0; i < this.length; i++) {
      serializeToString(this[i], buf, isHTML, nodeFilter);
    }
    return buf.join("");
  },
  /**
   * @private
   * @param {function (Node):boolean} predicate
   * @returns {Node[]}
   */
  filter: function(predicate) {
    return Array.prototype.filter.call(this, predicate);
  },
  /**
   * @private
   * @param {Node} item
   * @returns {number}
   */
  indexOf: function(item) {
    return Array.prototype.indexOf.call(this, item);
  }
};
function LiveNodeList(node, refresh) {
  this._node = node;
  this._refresh = refresh;
  _updateLiveList(this);
}
function _updateLiveList(list) {
  var inc = list._node._inc || list._node.ownerDocument._inc;
  if (list._inc !== inc) {
    var ls = list._refresh(list._node);
    __set__(list, "length", ls.length);
    if (!list.$$length || ls.length < list.$$length) {
      for (var i = ls.length; i in list; i++) {
        if (Object.prototype.hasOwnProperty.call(list, i)) {
          delete list[i];
        }
      }
    }
    copy(ls, list);
    list._inc = inc;
  }
}
LiveNodeList.prototype.item = function(i) {
  _updateLiveList(this);
  return this[i] || null;
};
_extends(LiveNodeList, NodeList);
function NamedNodeMap() {
}
function _findNodeIndex(list, node) {
  var i = list.length;
  while (i--) {
    if (list[i] === node) {
      return i;
    }
  }
}
function _addNamedNode(el, list, newAttr, oldAttr) {
  if (oldAttr) {
    list[_findNodeIndex(list, oldAttr)] = newAttr;
  } else {
    list[list.length++] = newAttr;
  }
  if (el) {
    newAttr.ownerElement = el;
    var doc = el.ownerDocument;
    if (doc) {
      oldAttr && _onRemoveAttribute(doc, el, oldAttr);
      _onAddAttribute(doc, el, newAttr);
    }
  }
}
function _removeNamedNode(el, list, attr) {
  var i = _findNodeIndex(list, attr);
  if (i >= 0) {
    var lastIndex = list.length - 1;
    while (i < lastIndex) {
      list[i] = list[++i];
    }
    list.length = lastIndex;
    if (el) {
      var doc = el.ownerDocument;
      if (doc) {
        _onRemoveAttribute(doc, el, attr);
        attr.ownerElement = null;
      }
    }
  } else {
    throw new DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
  }
}
NamedNodeMap.prototype = {
  length: 0,
  item: NodeList.prototype.item,
  getNamedItem: function(key) {
    var i = this.length;
    while (i--) {
      var attr = this[i];
      if (attr.nodeName == key) {
        return attr;
      }
    }
  },
  setNamedItem: function(attr) {
    var el = attr.ownerElement;
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }
    var oldAttr = this.getNamedItem(attr.nodeName);
    _addNamedNode(this._ownerElement, this, attr, oldAttr);
    return oldAttr;
  },
  /* returns Node */
  setNamedItemNS: function(attr) {
    var el = attr.ownerElement, oldAttr;
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }
    oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
    _addNamedNode(this._ownerElement, this, attr, oldAttr);
    return oldAttr;
  },
  /* returns Node */
  removeNamedItem: function(key) {
    var attr = this.getNamedItem(key);
    _removeNamedNode(this._ownerElement, this, attr);
    return attr;
  },
  // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
  //for level2
  removeNamedItemNS: function(namespaceURI, localName) {
    var attr = this.getNamedItemNS(namespaceURI, localName);
    _removeNamedNode(this._ownerElement, this, attr);
    return attr;
  },
  getNamedItemNS: function(namespaceURI, localName) {
    var i = this.length;
    while (i--) {
      var node = this[i];
      if (node.localName == localName && node.namespaceURI == namespaceURI) {
        return node;
      }
    }
    return null;
  }
};
function DOMImplementation$1() {
}
DOMImplementation$1.prototype = {
  /**
   * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
   * The different implementations fairly diverged in what kind of features were reported.
   * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
   *
   * @deprecated It is deprecated and modern browsers return true in all cases.
   *
   * @param {string} feature
   * @param {string} [version]
   * @returns {boolean} always true
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
   * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
   */
  hasFeature: function(feature, version) {
    return true;
  },
  /**
   * Creates an XML Document object of the specified type with its document element.
   *
   * __It behaves slightly different from the description in the living standard__:
   * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
   * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
   * - this implementation is not validating names or qualified names
   *   (when parsing XML strings, the SAX parser takes care of that)
   *
   * @param {string|null} namespaceURI
   * @param {string} qualifiedName
   * @param {DocumentType=null} doctype
   * @returns {Document}
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
   *
   * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
   * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
   * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
   */
  createDocument: function(namespaceURI, qualifiedName, doctype) {
    var doc = new Document();
    doc.implementation = this;
    doc.childNodes = new NodeList();
    doc.doctype = doctype || null;
    if (doctype) {
      doc.appendChild(doctype);
    }
    if (qualifiedName) {
      var root2 = doc.createElementNS(namespaceURI, qualifiedName);
      doc.appendChild(root2);
    }
    return doc;
  },
  /**
   * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
   *
   * __This behavior is slightly different from the in the specs__:
   * - this implementation is not validating names or qualified names
   *   (when parsing XML strings, the SAX parser takes care of that)
   *
   * @param {string} qualifiedName
   * @param {string} [publicId]
   * @param {string} [systemId]
   * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
   * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
   *
   * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
   * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
   * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
   */
  createDocumentType: function(qualifiedName, publicId, systemId) {
    var node = new DocumentType();
    node.name = qualifiedName;
    node.nodeName = qualifiedName;
    node.publicId = publicId || "";
    node.systemId = systemId || "";
    return node;
  }
};
function Node$1() {
}
Node$1.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore: function(newChild, refChild) {
    return _insertBefore(this, newChild, refChild);
  },
  replaceChild: function(newChild, oldChild) {
    _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
    if (oldChild) {
      this.removeChild(oldChild);
    }
  },
  removeChild: function(oldChild) {
    return _removeChild(this, oldChild);
  },
  appendChild: function(newChild) {
    return this.insertBefore(newChild, null);
  },
  hasChildNodes: function() {
    return this.firstChild != null;
  },
  cloneNode: function(deep) {
    return cloneNode(this.ownerDocument || this, this, deep);
  },
  // Modified in DOM Level 2:
  normalize: function() {
    var child = this.firstChild;
    while (child) {
      var next = child.nextSibling;
      if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
        this.removeChild(next);
        child.appendData(next.data);
      } else {
        child.normalize();
        child = next;
      }
    }
  },
  // Introduced in DOM Level 2:
  isSupported: function(feature, version) {
    return this.ownerDocument.implementation.hasFeature(feature, version);
  },
  // Introduced in DOM Level 2:
  hasAttributes: function() {
    return this.attributes.length > 0;
  },
  /**
   * Look up the prefix associated to the given namespace URI, starting from this node.
   * **The default namespace declarations are ignored by this method.**
   * See Namespace Prefix Lookup for details on the algorithm used by this method.
   *
   * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
   *
   * @param {string | null} namespaceURI
   * @returns {string | null}
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
   * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
   * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
   * @see https://github.com/xmldom/xmldom/issues/322
   */
  lookupPrefix: function(namespaceURI) {
    var el = this;
    while (el) {
      var map2 = el._nsMap;
      if (map2) {
        for (var n in map2) {
          if (Object.prototype.hasOwnProperty.call(map2, n) && map2[n] === namespaceURI) {
            return n;
          }
        }
      }
      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function(prefix) {
    var el = this;
    while (el) {
      var map2 = el._nsMap;
      if (map2) {
        if (Object.prototype.hasOwnProperty.call(map2, prefix)) {
          return map2[prefix];
        }
      }
      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace: function(namespaceURI) {
    var prefix = this.lookupPrefix(namespaceURI);
    return prefix == null;
  }
};
function _xmlEncoder(c) {
  return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
}
copy(NodeType, Node$1);
copy(NodeType, Node$1.prototype);
function _visitNode(node, callback) {
  if (callback(node)) {
    return true;
  }
  if (node = node.firstChild) {
    do {
      if (_visitNode(node, callback)) {
        return true;
      }
    } while (node = node.nextSibling);
  }
}
function Document() {
  this.ownerDocument = this;
}
function _onAddAttribute(doc, el, newAttr) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;
  if (ns === NAMESPACE$2.XMLNS) {
    el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
  }
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;
  if (ns === NAMESPACE$2.XMLNS) {
    delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
  }
}
function _onUpdateChild(doc, el, newChild) {
  if (doc && doc._inc) {
    doc._inc++;
    var cs = el.childNodes;
    if (newChild) {
      cs[cs.length++] = newChild;
    } else {
      var child = el.firstChild;
      var i = 0;
      while (child) {
        cs[i++] = child;
        child = child.nextSibling;
      }
      cs.length = i;
      delete cs[cs.length];
    }
  }
}
function _removeChild(parentNode, child) {
  var previous = child.previousSibling;
  var next = child.nextSibling;
  if (previous) {
    previous.nextSibling = next;
  } else {
    parentNode.firstChild = next;
  }
  if (next) {
    next.previousSibling = previous;
  } else {
    parentNode.lastChild = previous;
  }
  child.parentNode = null;
  child.previousSibling = null;
  child.nextSibling = null;
  _onUpdateChild(parentNode.ownerDocument, parentNode);
  return child;
}
function hasValidParentNodeType(node) {
  return node && (node.nodeType === Node$1.DOCUMENT_NODE || node.nodeType === Node$1.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node$1.ELEMENT_NODE);
}
function hasInsertableNodeType(node) {
  return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node$1.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node$1.COMMENT_NODE || node.nodeType === Node$1.PROCESSING_INSTRUCTION_NODE);
}
function isDocTypeNode(node) {
  return node && node.nodeType === Node$1.DOCUMENT_TYPE_NODE;
}
function isElementNode(node) {
  return node && node.nodeType === Node$1.ELEMENT_NODE;
}
function isTextNode(node) {
  return node && node.nodeType === Node$1.TEXT_NODE;
}
function isElementInsertionPossible(doc, child) {
  var parentChildNodes = doc.childNodes || [];
  if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
    return false;
  }
  var docTypeNode = find(parentChildNodes, isDocTypeNode);
  return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}
function isElementReplacementPossible(doc, child) {
  var parentChildNodes = doc.childNodes || [];
  function hasElementChildThatIsNotChild(node) {
    return isElementNode(node) && node !== child;
  }
  if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
    return false;
  }
  var docTypeNode = find(parentChildNodes, isDocTypeNode);
  return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}
function assertPreInsertionValidity1to5(parent, node, child) {
  if (!hasValidParentNodeType(parent)) {
    throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
  }
  if (child && child.parentNode !== parent) {
    throw new DOMException(NOT_FOUND_ERR, "child not in parent");
  }
  if (
    // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
    !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
    // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
    // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
    isDocTypeNode(node) && parent.nodeType !== Node$1.DOCUMENT_NODE
  ) {
    throw new DOMException(
      HIERARCHY_REQUEST_ERR,
      "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
    );
  }
}
function assertPreInsertionValidityInDocument(parent, node, child) {
  var parentChildNodes = parent.childNodes || [];
  var nodeChildNodes = node.childNodes || [];
  if (node.nodeType === Node$1.DOCUMENT_FRAGMENT_NODE) {
    var nodeChildElements = nodeChildNodes.filter(isElementNode);
    if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
    }
    if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
  }
  if (isElementNode(node)) {
    if (!isElementInsertionPossible(parent, child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    }
  }
  if (isDocTypeNode(node)) {
    if (find(parentChildNodes, isDocTypeNode)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
    }
    var parentElementChild = find(parentChildNodes, isElementNode);
    if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
    if (!child && parentElementChild) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
    }
  }
}
function assertPreReplacementValidityInDocument(parent, node, child) {
  var parentChildNodes = parent.childNodes || [];
  var nodeChildNodes = node.childNodes || [];
  if (node.nodeType === Node$1.DOCUMENT_FRAGMENT_NODE) {
    var nodeChildElements = nodeChildNodes.filter(isElementNode);
    if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
    }
    if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
  }
  if (isElementNode(node)) {
    if (!isElementReplacementPossible(parent, child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    }
  }
  if (isDocTypeNode(node)) {
    let hasDoctypeChildThatIsNotChild = function(node2) {
      return isDocTypeNode(node2) && node2 !== child;
    };
    if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
    }
    var parentElementChild = find(parentChildNodes, isElementNode);
    if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
  }
}
function _insertBefore(parent, node, child, _inDocumentAssertion) {
  assertPreInsertionValidity1to5(parent, node, child);
  if (parent.nodeType === Node$1.DOCUMENT_NODE) {
    (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
  }
  var cp = node.parentNode;
  if (cp) {
    cp.removeChild(node);
  }
  if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
    var newFirst = node.firstChild;
    if (newFirst == null) {
      return node;
    }
    var newLast = node.lastChild;
  } else {
    newFirst = newLast = node;
  }
  var pre = child ? child.previousSibling : parent.lastChild;
  newFirst.previousSibling = pre;
  newLast.nextSibling = child;
  if (pre) {
    pre.nextSibling = newFirst;
  } else {
    parent.firstChild = newFirst;
  }
  if (child == null) {
    parent.lastChild = newLast;
  } else {
    child.previousSibling = newLast;
  }
  do {
    newFirst.parentNode = parent;
    var targetDoc = parent.ownerDocument || parent;
    _updateOwnerDocument(newFirst, targetDoc);
  } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
  _onUpdateChild(parent.ownerDocument || parent, parent);
  if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
    node.firstChild = node.lastChild = null;
  }
  return node;
}
function _updateOwnerDocument(node, newOwnerDocument) {
  if (node.ownerDocument === newOwnerDocument) {
    return;
  }
  node.ownerDocument = newOwnerDocument;
  if (node.nodeType === ELEMENT_NODE && node.attributes) {
    for (var i = 0; i < node.attributes.length; i++) {
      var attr = node.attributes.item(i);
      if (attr) {
        attr.ownerDocument = newOwnerDocument;
      }
    }
  }
  var child = node.firstChild;
  while (child) {
    _updateOwnerDocument(child, newOwnerDocument);
    child = child.nextSibling;
  }
}
function _appendSingleChild(parentNode, newChild) {
  if (newChild.parentNode) {
    newChild.parentNode.removeChild(newChild);
  }
  newChild.parentNode = parentNode;
  newChild.previousSibling = parentNode.lastChild;
  newChild.nextSibling = null;
  if (newChild.previousSibling) {
    newChild.previousSibling.nextSibling = newChild;
  } else {
    parentNode.firstChild = newChild;
  }
  parentNode.lastChild = newChild;
  _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
  var targetDoc = parentNode.ownerDocument || parentNode;
  _updateOwnerDocument(newChild, targetDoc);
  return newChild;
}
Document.prototype = {
  //implementation : null,
  nodeName: "#document",
  nodeType: DOCUMENT_NODE,
  /**
   * The DocumentType node of the document.
   *
   * @readonly
   * @type DocumentType
   */
  doctype: null,
  documentElement: null,
  _inc: 1,
  insertBefore: function(newChild, refChild) {
    if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
      var child = newChild.firstChild;
      while (child) {
        var next = child.nextSibling;
        this.insertBefore(child, refChild);
        child = next;
      }
      return newChild;
    }
    _insertBefore(this, newChild, refChild);
    _updateOwnerDocument(newChild, this);
    if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
      this.documentElement = newChild;
    }
    return newChild;
  },
  removeChild: function(oldChild) {
    if (this.documentElement == oldChild) {
      this.documentElement = null;
    }
    return _removeChild(this, oldChild);
  },
  replaceChild: function(newChild, oldChild) {
    _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
    _updateOwnerDocument(newChild, this);
    if (oldChild) {
      this.removeChild(oldChild);
    }
    if (isElementNode(newChild)) {
      this.documentElement = newChild;
    }
  },
  // Introduced in DOM Level 2:
  importNode: function(importedNode, deep) {
    return importNode(this, importedNode, deep);
  },
  // Introduced in DOM Level 2:
  getElementById: function(id) {
    var rtv = null;
    _visitNode(this.documentElement, function(node) {
      if (node.nodeType == ELEMENT_NODE) {
        if (node.getAttribute("id") == id) {
          rtv = node;
          return true;
        }
      }
    });
    return rtv;
  },
  /**
   * The `getElementsByClassName` method of `Document` interface returns an array-like object
   * of all child elements which have **all** of the given class name(s).
   *
   * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
   *
   *
   * Warning: This is a live LiveNodeList.
   * Changes in the DOM will reflect in the array as the changes occur.
   * If an element selected by this array no longer qualifies for the selector,
   * it will automatically be removed. Be aware of this for iteration purposes.
   *
   * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
   * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
   */
  getElementsByClassName: function(classNames) {
    var classNamesSet = toOrderedSet(classNames);
    return new LiveNodeList(this, function(base) {
      var ls = [];
      if (classNamesSet.length > 0) {
        _visitNode(base.documentElement, function(node) {
          if (node !== base && node.nodeType === ELEMENT_NODE) {
            var nodeClassNames = node.getAttribute("class");
            if (nodeClassNames) {
              var matches = classNames === nodeClassNames;
              if (!matches) {
                var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
              }
              if (matches) {
                ls.push(node);
              }
            }
          }
        });
      }
      return ls;
    });
  },
  //document factory method:
  createElement: function(tagName) {
    var node = new Element$1();
    node.ownerDocument = this;
    node.nodeName = tagName;
    node.tagName = tagName;
    node.localName = tagName;
    node.childNodes = new NodeList();
    var attrs = node.attributes = new NamedNodeMap();
    attrs._ownerElement = node;
    return node;
  },
  createDocumentFragment: function() {
    var node = new DocumentFragment();
    node.ownerDocument = this;
    node.childNodes = new NodeList();
    return node;
  },
  createTextNode: function(data) {
    var node = new Text();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createComment: function(data) {
    var node = new Comment();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createCDATASection: function(data) {
    var node = new CDATASection();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createProcessingInstruction: function(target, data) {
    var node = new ProcessingInstruction();
    node.ownerDocument = this;
    node.tagName = node.nodeName = node.target = target;
    node.nodeValue = node.data = data;
    return node;
  },
  createAttribute: function(name) {
    var node = new Attr();
    node.ownerDocument = this;
    node.name = name;
    node.nodeName = name;
    node.localName = name;
    node.specified = true;
    return node;
  },
  createEntityReference: function(name) {
    var node = new EntityReference();
    node.ownerDocument = this;
    node.nodeName = name;
    return node;
  },
  // Introduced in DOM Level 2:
  createElementNS: function(namespaceURI, qualifiedName) {
    var node = new Element$1();
    var pl = qualifiedName.split(":");
    var attrs = node.attributes = new NamedNodeMap();
    node.childNodes = new NodeList();
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.tagName = qualifiedName;
    node.namespaceURI = namespaceURI;
    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      node.localName = qualifiedName;
    }
    attrs._ownerElement = node;
    return node;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function(namespaceURI, qualifiedName) {
    var node = new Attr();
    var pl = qualifiedName.split(":");
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.name = qualifiedName;
    node.namespaceURI = namespaceURI;
    node.specified = true;
    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      node.localName = qualifiedName;
    }
    return node;
  }
};
_extends(Document, Node$1);
function Element$1() {
  this._nsMap = {};
}
Element$1.prototype = {
  nodeType: ELEMENT_NODE,
  hasAttribute: function(name) {
    return this.getAttributeNode(name) != null;
  },
  getAttribute: function(name) {
    var attr = this.getAttributeNode(name);
    return attr && attr.value || "";
  },
  getAttributeNode: function(name) {
    return this.attributes.getNamedItem(name);
  },
  setAttribute: function(name, value) {
    var attr = this.ownerDocument.createAttribute(name);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  removeAttribute: function(name) {
    var attr = this.getAttributeNode(name);
    attr && this.removeAttributeNode(attr);
  },
  //four real opeartion method
  appendChild: function(newChild) {
    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return this.insertBefore(newChild, null);
    } else {
      return _appendSingleChild(this, newChild);
    }
  },
  setAttributeNode: function(newAttr) {
    return this.attributes.setNamedItem(newAttr);
  },
  setAttributeNodeNS: function(newAttr) {
    return this.attributes.setNamedItemNS(newAttr);
  },
  removeAttributeNode: function(oldAttr) {
    return this.attributes.removeNamedItem(oldAttr.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function(namespaceURI, localName) {
    var old = this.getAttributeNodeNS(namespaceURI, localName);
    old && this.removeAttributeNode(old);
  },
  hasAttributeNS: function(namespaceURI, localName) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null;
  },
  getAttributeNS: function(namespaceURI, localName) {
    var attr = this.getAttributeNodeNS(namespaceURI, localName);
    return attr && attr.value || "";
  },
  setAttributeNS: function(namespaceURI, qualifiedName, value) {
    var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  getAttributeNodeNS: function(namespaceURI, localName) {
    return this.attributes.getNamedItemNS(namespaceURI, localName);
  },
  getElementsByTagName: function(tagName) {
    return new LiveNodeList(this, function(base) {
      var ls = [];
      _visitNode(base, function(node) {
        if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
          ls.push(node);
        }
      });
      return ls;
    });
  },
  getElementsByTagNameNS: function(namespaceURI, localName) {
    return new LiveNodeList(this, function(base) {
      var ls = [];
      _visitNode(base, function(node) {
        if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
          ls.push(node);
        }
      });
      return ls;
    });
  }
};
Document.prototype.getElementsByTagName = Element$1.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element$1.prototype.getElementsByTagNameNS;
_extends(Element$1, Node$1);
function Attr() {
}
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr, Node$1);
function CharacterData() {
}
CharacterData.prototype = {
  data: "",
  substringData: function(offset, count) {
    return this.data.substring(offset, offset + count);
  },
  appendData: function(text) {
    text = this.data + text;
    this.nodeValue = this.data = text;
    this.length = text.length;
  },
  insertData: function(offset, text) {
    this.replaceData(offset, 0, text);
  },
  appendChild: function(newChild) {
    throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
  },
  deleteData: function(offset, count) {
    this.replaceData(offset, count, "");
  },
  replaceData: function(offset, count, text) {
    var start = this.data.substring(0, offset);
    var end = this.data.substring(offset + count);
    text = start + text + end;
    this.nodeValue = this.data = text;
    this.length = text.length;
  }
};
_extends(CharacterData, Node$1);
function Text() {
}
Text.prototype = {
  nodeName: "#text",
  nodeType: TEXT_NODE,
  splitText: function(offset) {
    var text = this.data;
    var newText = text.substring(offset);
    text = text.substring(0, offset);
    this.data = this.nodeValue = text;
    this.length = text.length;
    var newNode = this.ownerDocument.createTextNode(newText);
    if (this.parentNode) {
      this.parentNode.insertBefore(newNode, this.nextSibling);
    }
    return newNode;
  }
};
_extends(Text, CharacterData);
function Comment() {
}
Comment.prototype = {
  nodeName: "#comment",
  nodeType: COMMENT_NODE
};
_extends(Comment, CharacterData);
function CDATASection() {
}
CDATASection.prototype = {
  nodeName: "#cdata-section",
  nodeType: CDATA_SECTION_NODE
};
_extends(CDATASection, CharacterData);
function DocumentType() {
}
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType, Node$1);
function Notation() {
}
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation, Node$1);
function Entity() {
}
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity, Node$1);
function EntityReference() {
}
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference, Node$1);
function DocumentFragment() {
}
DocumentFragment.prototype.nodeName = "#document-fragment";
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment, Node$1);
function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction, Node$1);
function XMLSerializer() {
}
XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
  return nodeSerializeToString.call(node, isHtml, nodeFilter);
};
Node$1.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml, nodeFilter) {
  var buf = [];
  var refNode = this.nodeType == 9 && this.documentElement || this;
  var prefix = refNode.prefix;
  var uri = refNode.namespaceURI;
  if (uri && prefix == null) {
    var prefix = refNode.lookupPrefix(uri);
    if (prefix == null) {
      var visibleNamespaces = [
        { namespace: uri, prefix: null }
        //{namespace:uri,prefix:''}
      ];
    }
  }
  serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
  return buf.join("");
}
function needNamespaceDefine(node, isHTML, visibleNamespaces) {
  var prefix = node.prefix || "";
  var uri = node.namespaceURI;
  if (!uri) {
    return false;
  }
  if (prefix === "xml" && uri === NAMESPACE$2.XML || uri === NAMESPACE$2.XMLNS) {
    return false;
  }
  var i = visibleNamespaces.length;
  while (i--) {
    var ns = visibleNamespaces[i];
    if (ns.prefix === prefix) {
      return ns.namespace !== uri;
    }
  }
  return true;
}
function addSerializedAttribute(buf, qualifiedName, value) {
  buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
}
function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
  if (!visibleNamespaces) {
    visibleNamespaces = [];
  }
  if (nodeFilter) {
    node = nodeFilter(node);
    if (node) {
      if (typeof node == "string") {
        buf.push(node);
        return;
      }
    } else {
      return;
    }
  }
  switch (node.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes;
      var len = attrs.length;
      var child = node.firstChild;
      var nodeName = node.tagName;
      isHTML = NAMESPACE$2.isHTML(node.namespaceURI) || isHTML;
      var prefixedNodeName = nodeName;
      if (!isHTML && !node.prefix && node.namespaceURI) {
        var defaultNS;
        for (var ai = 0; ai < attrs.length; ai++) {
          if (attrs.item(ai).name === "xmlns") {
            defaultNS = attrs.item(ai).value;
            break;
          }
        }
        if (!defaultNS) {
          for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
            var namespace = visibleNamespaces[nsi];
            if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
              defaultNS = namespace.namespace;
              break;
            }
          }
        }
        if (defaultNS !== node.namespaceURI) {
          for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
            var namespace = visibleNamespaces[nsi];
            if (namespace.namespace === node.namespaceURI) {
              if (namespace.prefix) {
                prefixedNodeName = namespace.prefix + ":" + nodeName;
              }
              break;
            }
          }
        }
      }
      buf.push("<", prefixedNodeName);
      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i);
        if (attr.prefix == "xmlns") {
          visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
        } else if (attr.nodeName == "xmlns") {
          visibleNamespaces.push({ prefix: "", namespace: attr.value });
        }
      }
      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i);
        if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
          var prefix = attr.prefix || "";
          var uri = attr.namespaceURI;
          addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
          visibleNamespaces.push({ prefix, namespace: uri });
        }
        serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
      }
      if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
        var prefix = node.prefix || "";
        var uri = node.namespaceURI;
        addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
        visibleNamespaces.push({ prefix, namespace: uri });
      }
      if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
        buf.push(">");
        if (isHTML && /^script$/i.test(nodeName)) {
          while (child) {
            if (child.data) {
              buf.push(child.data);
            } else {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
            }
            child = child.nextSibling;
          }
        } else {
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
            child = child.nextSibling;
          }
        }
        buf.push("</", prefixedNodeName, ">");
      } else {
        buf.push("/>");
      }
      return;
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = node.firstChild;
      while (child) {
        serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
        child = child.nextSibling;
      }
      return;
    case ATTRIBUTE_NODE:
      return addSerializedAttribute(buf, node.name, node.value);
    case TEXT_NODE:
      return buf.push(
        node.data.replace(/[<&>]/g, _xmlEncoder)
      );
    case CDATA_SECTION_NODE:
      return buf.push("<![CDATA[", node.data, "]]>");
    case COMMENT_NODE:
      return buf.push("<!--", node.data, "-->");
    case DOCUMENT_TYPE_NODE:
      var pubid = node.publicId;
      var sysid = node.systemId;
      buf.push("<!DOCTYPE ", node.name);
      if (pubid) {
        buf.push(" PUBLIC ", pubid);
        if (sysid && sysid != ".") {
          buf.push(" ", sysid);
        }
        buf.push(">");
      } else if (sysid && sysid != ".") {
        buf.push(" SYSTEM ", sysid, ">");
      } else {
        var sub = node.internalSubset;
        if (sub) {
          buf.push(" [", sub, "]");
        }
        buf.push(">");
      }
      return;
    case PROCESSING_INSTRUCTION_NODE:
      return buf.push("<?", node.target, " ", node.data, "?>");
    case ENTITY_REFERENCE_NODE:
      return buf.push("&", node.nodeName, ";");
    default:
      buf.push("??", node.nodeName);
  }
}
function importNode(doc, node, deep) {
  var node2;
  switch (node.nodeType) {
    case ELEMENT_NODE:
      node2 = node.cloneNode(false);
      node2.ownerDocument = doc;
    case DOCUMENT_FRAGMENT_NODE:
      break;
    case ATTRIBUTE_NODE:
      deep = true;
      break;
  }
  if (!node2) {
    node2 = node.cloneNode(false);
  }
  node2.ownerDocument = doc;
  node2.parentNode = null;
  if (deep) {
    var child = node.firstChild;
    while (child) {
      node2.appendChild(importNode(doc, child, deep));
      child = child.nextSibling;
    }
  }
  return node2;
}
function cloneNode(doc, node, deep) {
  var node2 = new node.constructor();
  for (var n in node) {
    if (Object.prototype.hasOwnProperty.call(node, n)) {
      var v = node[n];
      if (typeof v != "object") {
        if (v != node2[n]) {
          node2[n] = v;
        }
      }
    }
  }
  if (node.childNodes) {
    node2.childNodes = new NodeList();
  }
  node2.ownerDocument = doc;
  switch (node2.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes;
      var attrs2 = node2.attributes = new NamedNodeMap();
      var len = attrs.length;
      attrs2._ownerElement = node2;
      for (var i = 0; i < len; i++) {
        node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
      }
      break;
    case ATTRIBUTE_NODE:
      deep = true;
  }
  if (deep) {
    var child = node.firstChild;
    while (child) {
      node2.appendChild(cloneNode(doc, child, deep));
      child = child.nextSibling;
    }
  }
  return node2;
}
function __set__(object2, key, value) {
  object2[key] = value;
}
try {
  if (Object.defineProperty) {
    let getTextContent = function(node) {
      switch (node.nodeType) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var buf = [];
          node = node.firstChild;
          while (node) {
            if (node.nodeType !== 7 && node.nodeType !== 8) {
              buf.push(getTextContent(node));
            }
            node = node.nextSibling;
          }
          return buf.join("");
        default:
          return node.nodeValue;
      }
    };
    Object.defineProperty(LiveNodeList.prototype, "length", {
      get: function() {
        _updateLiveList(this);
        return this.$$length;
      }
    });
    Object.defineProperty(Node$1.prototype, "textContent", {
      get: function() {
        return getTextContent(this);
      },
      set: function(data) {
        switch (this.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            while (this.firstChild) {
              this.removeChild(this.firstChild);
            }
            if (data || String(data)) {
              this.appendChild(this.ownerDocument.createTextNode(data));
            }
            break;
          default:
            this.data = data;
            this.value = data;
            this.nodeValue = data;
        }
      }
    });
    __set__ = function(object2, key, value) {
      object2["$$" + key] = value;
    };
  }
} catch (e) {
}
dom$3.DocumentType = DocumentType;
dom$3.DOMException = DOMException;
dom$3.DOMImplementation = DOMImplementation$1;
dom$3.Element = Element$1;
dom$3.Node = Node$1;
dom$3.NodeList = NodeList;
dom$3.XMLSerializer = XMLSerializer;
var domParser = {};
var entities$1 = {};
(function(exports) {
  var freeze2 = conventions$2.freeze;
  exports.XML_ENTITIES = freeze2({
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  });
  exports.HTML_ENTITIES = freeze2({
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "⁡",
    Afr: "𝔄",
    afr: "𝔞",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    AMP: "&",
    amp: "&",
    And: "⩓",
    and: "∧",
    andand: "⩕",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsd: "∡",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "𝔸",
    aopf: "𝕒",
    ap: "≈",
    apacir: "⩯",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "⁡",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "𝒜",
    ascr: "𝒶",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    Barwed: "⌆",
    barwed: "⌅",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    Because: "∵",
    because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "𝔅",
    bfr: "𝔟",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "𝔹",
    bopf: "𝕓",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxDL: "╗",
    boxDl: "╖",
    boxdL: "╕",
    boxdl: "┐",
    boxDR: "╔",
    boxDr: "╓",
    boxdR: "╒",
    boxdr: "┌",
    boxH: "═",
    boxh: "─",
    boxHD: "╦",
    boxHd: "╤",
    boxhD: "╥",
    boxhd: "┬",
    boxHU: "╩",
    boxHu: "╧",
    boxhU: "╨",
    boxhu: "┴",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxUL: "╝",
    boxUl: "╜",
    boxuL: "╛",
    boxul: "┘",
    boxUR: "╚",
    boxUr: "╙",
    boxuR: "╘",
    boxur: "└",
    boxV: "║",
    boxv: "│",
    boxVH: "╬",
    boxVh: "╫",
    boxvH: "╪",
    boxvh: "┼",
    boxVL: "╣",
    boxVl: "╢",
    boxvL: "╡",
    boxvl: "┤",
    boxVR: "╠",
    boxVr: "╟",
    boxvR: "╞",
    boxvr: "├",
    bprime: "‵",
    Breve: "˘",
    breve: "˘",
    brvbar: "¦",
    Bscr: "ℬ",
    bscr: "𝒷",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsol: "\\",
    bsolb: "⧅",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    Cap: "⋒",
    cap: "∩",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    CenterDot: "·",
    centerdot: "·",
    Cfr: "ℭ",
    cfr: "𝔠",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    cir: "○",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    Colon: "∷",
    colon: ":",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    Conint: "∯",
    conint: "∮",
    ContourIntegral: "∮",
    Copf: "ℂ",
    copf: "𝕔",
    coprod: "∐",
    Coproduct: "∐",
    COPY: "©",
    copy: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    Cross: "⨯",
    cross: "✗",
    Cscr: "𝒞",
    cscr: "𝒸",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    Cup: "⋓",
    cup: "∪",
    cupbrcap: "⩈",
    CupCap: "≍",
    cupcap: "⩆",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    Dagger: "‡",
    dagger: "†",
    daleth: "ℸ",
    Darr: "↡",
    dArr: "⇓",
    darr: "↓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    DD: "ⅅ",
    dd: "ⅆ",
    ddagger: "‡",
    ddarr: "⇊",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "𝔇",
    dfr: "𝔡",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    Diamond: "⋄",
    diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "𝔻",
    dopf: "𝕕",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrow: "↓",
    Downarrow: "⇓",
    downarrow: "↓",
    DownArrowBar: "⤓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVector: "↽",
    DownLeftVectorBar: "⥖",
    DownRightTeeVector: "⥟",
    DownRightVector: "⇁",
    DownRightVectorBar: "⥗",
    DownTee: "⊤",
    DownTeeArrow: "↧",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "𝒟",
    dscr: "𝒹",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    ecir: "≖",
    Ecirc: "Ê",
    ecirc: "ê",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    eDot: "≑",
    edot: "ė",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "𝔈",
    efr: "𝔢",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp: " ",
    emsp13: " ",
    emsp14: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "𝔼",
    eopf: "𝕖",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    Escr: "ℰ",
    escr: "ℯ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    ExponentialE: "ⅇ",
    exponentiale: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "𝔉",
    ffr: "𝔣",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "𝔽",
    fopf: "𝕗",
    ForAll: "∀",
    forall: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    Fscr: "ℱ",
    fscr: "𝒻",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    gE: "≧",
    ge: "≥",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    ges: "⩾",
    gescc: "⪩",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "𝔊",
    gfr: "𝔤",
    Gg: "⋙",
    gg: "≫",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gl: "≷",
    gla: "⪥",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gnE: "≩",
    gne: "⪈",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "𝔾",
    gopf: "𝕘",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "𝒢",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    Gt: "≫",
    GT: ">",
    gt: ">",
    gtcc: "⪧",
    gtcir: "⩺",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    hArr: "⇔",
    harr: "↔",
    harrcir: "⥈",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    Hfr: "ℌ",
    hfr: "𝔥",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    Hopf: "ℍ",
    hopf: "𝕙",
    horbar: "―",
    HorizontalLine: "─",
    Hscr: "ℋ",
    hscr: "𝒽",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "⁣",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    Ifr: "ℑ",
    ifr: "𝔦",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Im: "ℑ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    in: "∈",
    incare: "℅",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    Int: "∬",
    int: "∫",
    intcal: "⊺",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "⁣",
    InvisibleTimes: "⁢",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "𝕀",
    iopf: "𝕚",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    Iscr: "ℐ",
    iscr: "𝒾",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "⁢",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "𝔍",
    jfr: "𝔧",
    jmath: "ȷ",
    Jopf: "𝕁",
    jopf: "𝕛",
    Jscr: "𝒥",
    jscr: "𝒿",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "𝔎",
    kfr: "𝔨",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "𝕂",
    kopf: "𝕜",
    Kscr: "𝒦",
    kscr: "𝓀",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    Lang: "⟪",
    lang: "⟨",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    Larr: "↞",
    lArr: "⇐",
    larr: "←",
    larrb: "⇤",
    larrbfs: "⤟",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    lat: "⪫",
    lAtail: "⤛",
    latail: "⤙",
    late: "⪭",
    lates: "⪭︀",
    lBarr: "⤎",
    lbarr: "⤌",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    lE: "≦",
    le: "≤",
    LeftAngleBracket: "⟨",
    LeftArrow: "←",
    Leftarrow: "⇐",
    leftarrow: "←",
    LeftArrowBar: "⇤",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVector: "⇃",
    LeftDownVectorBar: "⥙",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrow: "↔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTee: "⊣",
    LeftTeeArrow: "↤",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangle: "⊲",
    LeftTriangleBar: "⧏",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVector: "↿",
    LeftUpVectorBar: "⥘",
    LeftVector: "↼",
    LeftVectorBar: "⥒",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    les: "⩽",
    lescc: "⪨",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "𝔏",
    lfr: "𝔩",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    Ll: "⋘",
    ll: "≪",
    llarr: "⇇",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoust: "⎰",
    lmoustache: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lnE: "≨",
    lne: "⪇",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftarrow: "⟵",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longleftrightarrow: "⟷",
    longmapsto: "⟼",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    longrightarrow: "⟶",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "𝕃",
    lopf: "𝕝",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "‎",
    lrtri: "⊿",
    lsaquo: "‹",
    Lscr: "ℒ",
    lscr: "𝓁",
    Lsh: "↰",
    lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    Lt: "≪",
    LT: "<",
    lt: "<",
    ltcc: "⪦",
    ltcir: "⩹",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "𝔐",
    mfr: "𝔪",
    mho: "℧",
    micro: "µ",
    mid: "∣",
    midast: "*",
    midcir: "⫰",
    middot: "·",
    minus: "−",
    minusb: "⊟",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "𝕄",
    mopf: "𝕞",
    mp: "∓",
    Mscr: "ℳ",
    mscr: "𝓂",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natur: "♮",
    natural: "♮",
    naturals: "ℕ",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    ne: "≠",
    nearhk: "⤤",
    neArr: "⇗",
    nearr: "↗",
    nearrow: "↗",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: "\n",
    nexist: "∄",
    nexists: "∄",
    Nfr: "𝔑",
    nfr: "𝔫",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nhArr: "⇎",
    nharr: "↮",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlArr: "⇍",
    nlarr: "↚",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nLeftarrow: "⇍",
    nleftarrow: "↚",
    nLeftrightarrow: "⇎",
    nleftrightarrow: "↮",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "⁠",
    NonBreakingSpace: " ",
    Nopf: "ℕ",
    nopf: "𝕟",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangle: "⋪",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangle: "⋫",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    npar: "∦",
    nparallel: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    npre: "⪯̸",
    nprec: "⊀",
    npreceq: "⪯̸",
    nrArr: "⇏",
    nrarr: "↛",
    nrarrc: "⤳̸",
    nrarrw: "↝̸",
    nRightarrow: "⇏",
    nrightarrow: "↛",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "𝒩",
    nscr: "𝓃",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nVDash: "⊯",
    nVdash: "⊮",
    nvDash: "⊭",
    nvdash: "⊬",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwArr: "⇖",
    nwarr: "↖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    ocir: "⊚",
    Ocirc: "Ô",
    ocirc: "ô",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "𝔒",
    ofr: "𝔬",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "𝕆",
    oopf: "𝕠",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    Or: "⩔",
    or: "∨",
    orarr: "↻",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "𝒪",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    Otimes: "⨷",
    otimes: "⊗",
    otimesas: "⨶",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    par: "∥",
    para: "¶",
    parallel: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "𝔓",
    pfr: "𝔭",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plus: "+",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    Popf: "ℙ",
    popf: "𝕡",
    pound: "£",
    Pr: "⪻",
    pr: "≺",
    prap: "⪷",
    prcue: "≼",
    prE: "⪳",
    pre: "⪯",
    prec: "≺",
    precapprox: "⪷",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    precsim: "≾",
    Prime: "″",
    prime: "′",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportion: "∷",
    Proportional: "∝",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "𝒫",
    pscr: "𝓅",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "𝔔",
    qfr: "𝔮",
    qint: "⨌",
    Qopf: "ℚ",
    qopf: "𝕢",
    qprime: "⁗",
    Qscr: "𝒬",
    qscr: "𝓆",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    QUOT: '"',
    quot: '"',
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    Rang: "⟫",
    rang: "⟩",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    Rarr: "↠",
    rArr: "⇒",
    rarr: "→",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    rAtail: "⤜",
    ratail: "⤚",
    ratio: "∶",
    rationals: "ℚ",
    RBarr: "⤐",
    rBarr: "⤏",
    rbarr: "⤍",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    Re: "ℜ",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    rect: "▭",
    REG: "®",
    reg: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    Rfr: "ℜ",
    rfr: "𝔯",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrow: "→",
    Rightarrow: "⇒",
    rightarrow: "→",
    RightArrowBar: "⇥",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVector: "⇂",
    RightDownVectorBar: "⥕",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTee: "⊢",
    RightTeeArrow: "↦",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangle: "⊳",
    RightTriangleBar: "⧐",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVector: "↾",
    RightUpVectorBar: "⥔",
    RightVector: "⇀",
    RightVectorBar: "⥓",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "‏",
    rmoust: "⎱",
    rmoustache: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    Ropf: "ℝ",
    ropf: "𝕣",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    Rscr: "ℛ",
    rscr: "𝓇",
    Rsh: "↱",
    rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    Sc: "⪼",
    sc: "≻",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    sccue: "≽",
    scE: "⪴",
    sce: "⪰",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdot: "⋅",
    sdotb: "⊡",
    sdote: "⩦",
    searhk: "⤥",
    seArr: "⇘",
    searr: "↘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "𝔖",
    sfr: "𝔰",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "­",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    sol: "/",
    solb: "⧄",
    solbar: "⌿",
    Sopf: "𝕊",
    sopf: "𝕤",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    squ: "□",
    Square: "□",
    square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squf: "▪",
    srarr: "→",
    Sscr: "𝒮",
    sscr: "𝓈",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    Sub: "⋐",
    sub: "⊂",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    Subset: "⋐",
    subset: "⊂",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succ: "≻",
    succapprox: "⪸",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    Sum: "∑",
    sum: "∑",
    sung: "♪",
    Sup: "⋑",
    sup: "⊃",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    Supset: "⋑",
    supset: "⊃",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swArr: "⇙",
    swarr: "↙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "	",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "𝔗",
    tfr: "𝔱",
    there4: "∴",
    Therefore: "∴",
    therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    thinsp: " ",
    ThinSpace: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    Tilde: "∼",
    tilde: "˜",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    times: "×",
    timesb: "⊠",
    timesbar: "⨱",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    top: "⊤",
    topbot: "⌶",
    topcir: "⫱",
    Topf: "𝕋",
    topf: "𝕥",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    TRADE: "™",
    trade: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "𝒯",
    tscr: "𝓉",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    Uarr: "↟",
    uArr: "⇑",
    uarr: "↑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "𝔘",
    ufr: "𝔲",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "𝕌",
    uopf: "𝕦",
    UpArrow: "↑",
    Uparrow: "⇑",
    uparrow: "↑",
    UpArrowBar: "⤒",
    UpArrowDownArrow: "⇅",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    updownarrow: "↕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    Upsi: "ϒ",
    upsi: "υ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTee: "⊥",
    UpTeeArrow: "↥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "𝒰",
    uscr: "𝓊",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    vArr: "⇕",
    varr: "↕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    Vbar: "⫫",
    vBar: "⫨",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    VDash: "⊫",
    Vdash: "⊩",
    vDash: "⊨",
    vdash: "⊢",
    Vdashl: "⫦",
    Vee: "⋁",
    vee: "∨",
    veebar: "⊻",
    veeeq: "≚",
    vellip: "⋮",
    Verbar: "‖",
    verbar: "|",
    Vert: "‖",
    vert: "|",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "𝔙",
    vfr: "𝔳",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "𝕍",
    vopf: "𝕧",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "𝒱",
    vscr: "𝓋",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    Wedge: "⋀",
    wedge: "∧",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "𝔚",
    wfr: "𝔴",
    Wopf: "𝕎",
    wopf: "𝕨",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "𝒲",
    wscr: "𝓌",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "𝔛",
    xfr: "𝔵",
    xhArr: "⟺",
    xharr: "⟷",
    Xi: "Ξ",
    xi: "ξ",
    xlArr: "⟸",
    xlarr: "⟵",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "𝕏",
    xopf: "𝕩",
    xoplus: "⨁",
    xotime: "⨂",
    xrArr: "⟹",
    xrarr: "⟶",
    Xscr: "𝒳",
    xscr: "𝓍",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "𝔜",
    yfr: "𝔶",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "𝕐",
    yopf: "𝕪",
    Yscr: "𝒴",
    yscr: "𝓎",
    YUcy: "Ю",
    yucy: "ю",
    Yuml: "Ÿ",
    yuml: "ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    Zfr: "ℨ",
    zfr: "𝔷",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    Zopf: "ℤ",
    zopf: "𝕫",
    Zscr: "𝒵",
    zscr: "𝓏",
    zwj: "‍",
    zwnj: "‌"
  });
  exports.entityMap = exports.HTML_ENTITIES;
})(entities$1);
var sax$1 = {};
var NAMESPACE$1 = conventions$2.NAMESPACE;
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
var S_TAG = 0;
var S_ATTR = 1;
var S_ATTR_SPACE = 2;
var S_EQ = 3;
var S_ATTR_NOQUOT_VALUE = 4;
var S_ATTR_END = 5;
var S_TAG_SPACE = 6;
var S_TAG_CLOSE = 7;
function ParseError$1(message, locator) {
  this.message = message;
  this.locator = locator;
  if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError$1);
}
ParseError$1.prototype = new Error();
ParseError$1.prototype.name = ParseError$1.name;
function XMLReader$1() {
}
XMLReader$1.prototype = {
  parse: function(source, defaultNSMap, entityMap) {
    var domBuilder = this.domBuilder;
    domBuilder.startDocument();
    _copy(defaultNSMap, defaultNSMap = {});
    parse(
      source,
      defaultNSMap,
      entityMap,
      domBuilder,
      this.errorHandler
    );
    domBuilder.endDocument();
  }
};
function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
  function fixedFromCharCode(code2) {
    if (code2 > 65535) {
      code2 -= 65536;
      var surrogate1 = 55296 + (code2 >> 10), surrogate2 = 56320 + (code2 & 1023);
      return String.fromCharCode(surrogate1, surrogate2);
    } else {
      return String.fromCharCode(code2);
    }
  }
  function entityReplacer(a2) {
    var k = a2.slice(1, -1);
    if (Object.hasOwnProperty.call(entityMap, k)) {
      return entityMap[k];
    } else if (k.charAt(0) === "#") {
      return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
    } else {
      errorHandler.error("entity not found:" + a2);
      return a2;
    }
  }
  function appendText(end2) {
    if (end2 > start) {
      var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
      locator && position2(start);
      domBuilder.characters(xt, 0, end2 - start);
      start = end2;
    }
  }
  function position2(p, m) {
    while (p >= lineEnd && (m = linePattern.exec(source))) {
      lineStart = m.index;
      lineEnd = lineStart + m[0].length;
      locator.lineNumber++;
    }
    locator.columnNumber = p - lineStart + 1;
  }
  var lineStart = 0;
  var lineEnd = 0;
  var linePattern = /.*(?:\r\n?|\n)|.*$/g;
  var locator = domBuilder.locator;
  var parseStack = [{ currentNSMap: defaultNSMapCopy }];
  var closeMap = {};
  var start = 0;
  while (true) {
    try {
      var tagStart = source.indexOf("<", start);
      if (tagStart < 0) {
        if (!source.substr(start).match(/^\s*$/)) {
          var doc = domBuilder.doc;
          var text = doc.createTextNode(source.substr(start));
          doc.appendChild(text);
          domBuilder.currentElement = text;
        }
        return;
      }
      if (tagStart > start) {
        appendText(tagStart);
      }
      switch (source.charAt(tagStart + 1)) {
        case "/":
          var end = source.indexOf(">", tagStart + 3);
          var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
          var config = parseStack.pop();
          if (end < 0) {
            tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
            errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
            end = tagStart + 1 + tagName.length;
          } else if (tagName.match(/\s</)) {
            tagName = tagName.replace(/[\s<].*/, "");
            errorHandler.error("end tag name: " + tagName + " maybe not complete");
            end = tagStart + 1 + tagName.length;
          }
          var localNSMap = config.localNSMap;
          var endMatch = config.tagName == tagName;
          var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
          if (endIgnoreCaseMach) {
            domBuilder.endElement(config.uri, config.localName, tagName);
            if (localNSMap) {
              for (var prefix in localNSMap) {
                if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                  domBuilder.endPrefixMapping(prefix);
                }
              }
            }
            if (!endMatch) {
              errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
            }
          } else {
            parseStack.push(config);
          }
          end++;
          break;
        case "?":
          locator && position2(tagStart);
          end = parseInstruction(source, tagStart, domBuilder);
          break;
        case "!":
          locator && position2(tagStart);
          end = parseDCC(source, tagStart, domBuilder, errorHandler);
          break;
        default:
          locator && position2(tagStart);
          var el = new ElementAttributes();
          var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
          var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
          var len = el.length;
          if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
            el.closed = true;
            if (!entityMap.nbsp) {
              errorHandler.warning("unclosed xml attribute");
            }
          }
          if (locator && len) {
            var locator2 = copyLocator(locator, {});
            for (var i = 0; i < len; i++) {
              var a = el[i];
              position2(a.offset);
              a.locator = copyLocator(locator, {});
            }
            domBuilder.locator = locator2;
            if (appendElement$1(el, domBuilder, currentNSMap)) {
              parseStack.push(el);
            }
            domBuilder.locator = locator;
          } else {
            if (appendElement$1(el, domBuilder, currentNSMap)) {
              parseStack.push(el);
            }
          }
          if (NAMESPACE$1.isHTML(el.uri) && !el.closed) {
            end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
          } else {
            end++;
          }
      }
    } catch (e) {
      if (e instanceof ParseError$1) {
        throw e;
      }
      errorHandler.error("element parse error: " + e);
      end = -1;
    }
    if (end > start) {
      start = end;
    } else {
      appendText(Math.max(tagStart, start) + 1);
    }
  }
}
function copyLocator(f, t) {
  t.lineNumber = f.lineNumber;
  t.columnNumber = f.columnNumber;
  return t;
}
function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
  function addAttribute(qname, value2, startIndex) {
    if (el.attributeNames.hasOwnProperty(qname)) {
      errorHandler.fatalError("Attribute " + qname + " redefined");
    }
    el.addValue(
      qname,
      // @see https://www.w3.org/TR/xml/#AVNormalize
      // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
      // - recursive replacement of (DTD) entity references
      // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
      value2.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer),
      startIndex
    );
  }
  var attrName;
  var value;
  var p = ++start;
  var s = S_TAG;
  while (true) {
    var c = source.charAt(p);
    switch (c) {
      case "=":
        if (s === S_ATTR) {
          attrName = source.slice(start, p);
          s = S_EQ;
        } else if (s === S_ATTR_SPACE) {
          s = S_EQ;
        } else {
          throw new Error("attribute equal must after attrName");
        }
        break;
      case "'":
      case '"':
        if (s === S_EQ || s === S_ATTR) {
          if (s === S_ATTR) {
            errorHandler.warning('attribute value must after "="');
            attrName = source.slice(start, p);
          }
          start = p + 1;
          p = source.indexOf(c, start);
          if (p > 0) {
            value = source.slice(start, p);
            addAttribute(attrName, value, start - 1);
            s = S_ATTR_END;
          } else {
            throw new Error("attribute value no end '" + c + "' match");
          }
        } else if (s == S_ATTR_NOQUOT_VALUE) {
          value = source.slice(start, p);
          addAttribute(attrName, value, start);
          errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
          start = p + 1;
          s = S_ATTR_END;
        } else {
          throw new Error('attribute value must after "="');
        }
        break;
      case "/":
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p));
          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            s = S_TAG_CLOSE;
            el.closed = true;
          case S_ATTR_NOQUOT_VALUE:
          case S_ATTR:
            break;
          case S_ATTR_SPACE:
            el.closed = true;
            break;
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case "":
        errorHandler.error("unexpected end of input");
        if (s == S_TAG) {
          el.setTagName(source.slice(start, p));
        }
        return p;
      case ">":
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p));
          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            break;
          case S_ATTR_NOQUOT_VALUE:
          case S_ATTR:
            value = source.slice(start, p);
            if (value.slice(-1) === "/") {
              el.closed = true;
              value = value.slice(0, -1);
            }
          case S_ATTR_SPACE:
            if (s === S_ATTR_SPACE) {
              value = attrName;
            }
            if (s == S_ATTR_NOQUOT_VALUE) {
              errorHandler.warning('attribute "' + value + '" missed quot(")!');
              addAttribute(attrName, value, start);
            } else {
              if (!NAMESPACE$1.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
              }
              addAttribute(value, value, start);
            }
            break;
          case S_EQ:
            throw new Error("attribute value missed!!");
        }
        return p;
      case "":
        c = " ";
      default:
        if (c <= " ") {
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));
              s = S_TAG_SPACE;
              break;
            case S_ATTR:
              attrName = source.slice(start, p);
              s = S_ATTR_SPACE;
              break;
            case S_ATTR_NOQUOT_VALUE:
              var value = source.slice(start, p);
              errorHandler.warning('attribute "' + value + '" missed quot(")!!');
              addAttribute(attrName, value, start);
            case S_ATTR_END:
              s = S_TAG_SPACE;
              break;
          }
        } else {
          switch (s) {
            case S_ATTR_SPACE:
              el.tagName;
              if (!NAMESPACE$1.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
              }
              addAttribute(attrName, attrName, start);
              start = p;
              s = S_ATTR;
              break;
            case S_ATTR_END:
              errorHandler.warning('attribute space is required"' + attrName + '"!!');
            case S_TAG_SPACE:
              s = S_ATTR;
              start = p;
              break;
            case S_EQ:
              s = S_ATTR_NOQUOT_VALUE;
              start = p;
              break;
            case S_TAG_CLOSE:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
        }
    }
    p++;
  }
}
function appendElement$1(el, domBuilder, currentNSMap) {
  var tagName = el.tagName;
  var localNSMap = null;
  var i = el.length;
  while (i--) {
    var a = el[i];
    var qName = a.qName;
    var value = a.value;
    var nsp = qName.indexOf(":");
    if (nsp > 0) {
      var prefix = a.prefix = qName.slice(0, nsp);
      var localName = qName.slice(nsp + 1);
      var nsPrefix = prefix === "xmlns" && localName;
    } else {
      localName = qName;
      prefix = null;
      nsPrefix = qName === "xmlns" && "";
    }
    a.localName = localName;
    if (nsPrefix !== false) {
      if (localNSMap == null) {
        localNSMap = {};
        _copy(currentNSMap, currentNSMap = {});
      }
      currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
      a.uri = NAMESPACE$1.XMLNS;
      domBuilder.startPrefixMapping(nsPrefix, value);
    }
  }
  var i = el.length;
  while (i--) {
    a = el[i];
    var prefix = a.prefix;
    if (prefix) {
      if (prefix === "xml") {
        a.uri = NAMESPACE$1.XML;
      }
      if (prefix !== "xmlns") {
        a.uri = currentNSMap[prefix || ""];
      }
    }
  }
  var nsp = tagName.indexOf(":");
  if (nsp > 0) {
    prefix = el.prefix = tagName.slice(0, nsp);
    localName = el.localName = tagName.slice(nsp + 1);
  } else {
    prefix = null;
    localName = el.localName = tagName;
  }
  var ns = el.uri = currentNSMap[prefix || ""];
  domBuilder.startElement(ns, localName, tagName, el);
  if (el.closed) {
    domBuilder.endElement(ns, localName, tagName);
    if (localNSMap) {
      for (prefix in localNSMap) {
        if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
          domBuilder.endPrefixMapping(prefix);
        }
      }
    }
  } else {
    el.currentNSMap = currentNSMap;
    el.localNSMap = localNSMap;
    return true;
  }
}
function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
  if (/^(?:script|textarea)$/i.test(tagName)) {
    var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
    var text = source.substring(elStartEnd + 1, elEndStart);
    if (/[&<]/.test(text)) {
      if (/^script$/i.test(tagName)) {
        domBuilder.characters(text, 0, text.length);
        return elEndStart;
      }
      text = text.replace(/&#?\w+;/g, entityReplacer);
      domBuilder.characters(text, 0, text.length);
      return elEndStart;
    }
  }
  return elStartEnd + 1;
}
function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
  var pos = closeMap[tagName];
  if (pos == null) {
    pos = source.lastIndexOf("</" + tagName + ">");
    if (pos < elStartEnd) {
      pos = source.lastIndexOf("</" + tagName);
    }
    closeMap[tagName] = pos;
  }
  return pos < elStartEnd;
}
function _copy(source, target) {
  for (var n in source) {
    if (Object.prototype.hasOwnProperty.call(source, n)) {
      target[n] = source[n];
    }
  }
}
function parseDCC(source, start, domBuilder, errorHandler) {
  var next = source.charAt(start + 2);
  switch (next) {
    case "-":
      if (source.charAt(start + 3) === "-") {
        var end = source.indexOf("-->", start + 4);
        if (end > start) {
          domBuilder.comment(source, start + 4, end - start - 4);
          return end + 3;
        } else {
          errorHandler.error("Unclosed comment");
          return -1;
        }
      } else {
        return -1;
      }
    default:
      if (source.substr(start + 3, 6) == "CDATA[") {
        var end = source.indexOf("]]>", start + 9);
        domBuilder.startCDATA();
        domBuilder.characters(source, start + 9, end - start - 9);
        domBuilder.endCDATA();
        return end + 3;
      }
      var matchs = split(source, start);
      var len = matchs.length;
      if (len > 1 && /!doctype/i.test(matchs[0][0])) {
        var name = matchs[1][0];
        var pubid = false;
        var sysid = false;
        if (len > 3) {
          if (/^public$/i.test(matchs[2][0])) {
            pubid = matchs[3][0];
            sysid = len > 4 && matchs[4][0];
          } else if (/^system$/i.test(matchs[2][0])) {
            sysid = matchs[3][0];
          }
        }
        var lastMatch = matchs[len - 1];
        domBuilder.startDTD(name, pubid, sysid);
        domBuilder.endDTD();
        return lastMatch.index + lastMatch[0].length;
      }
  }
  return -1;
}
function parseInstruction(source, start, domBuilder) {
  var end = source.indexOf("?>", start);
  if (end) {
    var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    if (match) {
      match[0].length;
      domBuilder.processingInstruction(match[1], match[2]);
      return end + 2;
    } else {
      return -1;
    }
  }
  return -1;
}
function ElementAttributes() {
  this.attributeNames = {};
}
ElementAttributes.prototype = {
  setTagName: function(tagName) {
    if (!tagNamePattern.test(tagName)) {
      throw new Error("invalid tagName:" + tagName);
    }
    this.tagName = tagName;
  },
  addValue: function(qName, value, offset) {
    if (!tagNamePattern.test(qName)) {
      throw new Error("invalid attribute:" + qName);
    }
    this.attributeNames[qName] = this.length;
    this[this.length++] = { qName, value, offset };
  },
  length: 0,
  getLocalName: function(i) {
    return this[i].localName;
  },
  getLocator: function(i) {
    return this[i].locator;
  },
  getQName: function(i) {
    return this[i].qName;
  },
  getURI: function(i) {
    return this[i].uri;
  },
  getValue: function(i) {
    return this[i].value;
  }
  //	,getIndex:function(uri, localName)){
  //		if(localName){
  //
  //		}else{
  //			var qName = uri
  //		}
  //	},
  //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
  //	getType:function(uri,localName){}
  //	getType:function(i){},
};
function split(source, start) {
  var match;
  var buf = [];
  var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  reg.lastIndex = start;
  reg.exec(source);
  while (match = reg.exec(source)) {
    buf.push(match);
    if (match[1]) return buf;
  }
}
sax$1.XMLReader = XMLReader$1;
sax$1.ParseError = ParseError$1;
var conventions = conventions$2;
var dom$2 = dom$3;
var entities = entities$1;
var sax = sax$1;
var DOMImplementation = dom$2.DOMImplementation;
var NAMESPACE = conventions.NAMESPACE;
var ParseError = sax.ParseError;
var XMLReader = sax.XMLReader;
function normalizeLineEndings(input) {
  return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
}
function DOMParser(options) {
  this.options = options || { locator: {} };
}
DOMParser.prototype.parseFromString = function(source, mimeType) {
  var options = this.options;
  var sax2 = new XMLReader();
  var domBuilder = options.domBuilder || new DOMHandler();
  var errorHandler = options.errorHandler;
  var locator = options.locator;
  var defaultNSMap = options.xmlns || {};
  var isHTML = /\/x?html?$/.test(mimeType);
  var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
  if (locator) {
    domBuilder.setDocumentLocator(locator);
  }
  sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
  sax2.domBuilder = options.domBuilder || domBuilder;
  if (isHTML) {
    defaultNSMap[""] = NAMESPACE.HTML;
  }
  defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
  var normalize = options.normalizeLineEndings || normalizeLineEndings;
  if (source && typeof source === "string") {
    sax2.parse(
      normalize(source),
      defaultNSMap,
      entityMap
    );
  } else {
    sax2.errorHandler.error("invalid doc source");
  }
  return domBuilder.doc;
};
function buildErrorHandler(errorImpl, domBuilder, locator) {
  if (!errorImpl) {
    if (domBuilder instanceof DOMHandler) {
      return domBuilder;
    }
    errorImpl = domBuilder;
  }
  var errorHandler = {};
  var isCallback = errorImpl instanceof Function;
  locator = locator || {};
  function build(key) {
    var fn = errorImpl[key];
    if (!fn && isCallback) {
      fn = errorImpl.length == 2 ? function(msg) {
        errorImpl(key, msg);
      } : errorImpl;
    }
    errorHandler[key] = fn && function(msg) {
      fn("[xmldom " + key + "]	" + msg + _locator(locator));
    } || function() {
    };
  }
  build("warning");
  build("error");
  build("fatalError");
  return errorHandler;
}
function DOMHandler() {
  this.cdata = false;
}
function position(locator, node) {
  node.lineNumber = locator.lineNumber;
  node.columnNumber = locator.columnNumber;
}
DOMHandler.prototype = {
  startDocument: function() {
    this.doc = new DOMImplementation().createDocument(null, null, null);
    if (this.locator) {
      this.doc.documentURI = this.locator.systemId;
    }
  },
  startElement: function(namespaceURI, localName, qName, attrs) {
    var doc = this.doc;
    var el = doc.createElementNS(namespaceURI, qName || localName);
    var len = attrs.length;
    appendElement(this, el);
    this.currentElement = el;
    this.locator && position(this.locator, el);
    for (var i = 0; i < len; i++) {
      var namespaceURI = attrs.getURI(i);
      var value = attrs.getValue(i);
      var qName = attrs.getQName(i);
      var attr = doc.createAttributeNS(namespaceURI, qName);
      this.locator && position(attrs.getLocator(i), attr);
      attr.value = attr.nodeValue = value;
      el.setAttributeNode(attr);
    }
  },
  endElement: function(namespaceURI, localName, qName) {
    var current = this.currentElement;
    current.tagName;
    this.currentElement = current.parentNode;
  },
  startPrefixMapping: function(prefix, uri) {
  },
  endPrefixMapping: function(prefix) {
  },
  processingInstruction: function(target, data) {
    var ins = this.doc.createProcessingInstruction(target, data);
    this.locator && position(this.locator, ins);
    appendElement(this, ins);
  },
  ignorableWhitespace: function(ch, start, length) {
  },
  characters: function(chars, start, length) {
    chars = _toString.apply(this, arguments);
    if (chars) {
      if (this.cdata) {
        var charNode = this.doc.createCDATASection(chars);
      } else {
        var charNode = this.doc.createTextNode(chars);
      }
      if (this.currentElement) {
        this.currentElement.appendChild(charNode);
      } else if (/^\s*$/.test(chars)) {
        this.doc.appendChild(charNode);
      }
      this.locator && position(this.locator, charNode);
    }
  },
  skippedEntity: function(name) {
  },
  endDocument: function() {
    this.doc.normalize();
  },
  setDocumentLocator: function(locator) {
    if (this.locator = locator) {
      locator.lineNumber = 0;
    }
  },
  //LexicalHandler
  comment: function(chars, start, length) {
    chars = _toString.apply(this, arguments);
    var comm = this.doc.createComment(chars);
    this.locator && position(this.locator, comm);
    appendElement(this, comm);
  },
  startCDATA: function() {
    this.cdata = true;
  },
  endCDATA: function() {
    this.cdata = false;
  },
  startDTD: function(name, publicId, systemId) {
    var impl = this.doc.implementation;
    if (impl && impl.createDocumentType) {
      var dt = impl.createDocumentType(name, publicId, systemId);
      this.locator && position(this.locator, dt);
      appendElement(this, dt);
      this.doc.doctype = dt;
    }
  },
  /**
   * @see org.xml.sax.ErrorHandler
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
  warning: function(error2) {
    console.warn("[xmldom warning]	" + error2, _locator(this.locator));
  },
  error: function(error2) {
    console.error("[xmldom error]	" + error2, _locator(this.locator));
  },
  fatalError: function(error2) {
    throw new ParseError(error2, this.locator);
  }
};
function _locator(l) {
  if (l) {
    return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
  }
}
function _toString(chars, start, length) {
  if (typeof chars == "string") {
    return chars.substr(start, length);
  } else {
    if (chars.length >= start + length || start) {
      return new java.lang.String(chars, start, length) + "";
    }
    return chars;
  }
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
  DOMHandler.prototype[key] = function() {
    return null;
  };
});
function appendElement(hander, node) {
  if (!hander.currentElement) {
    hander.doc.appendChild(node);
  } else {
    hander.currentElement.appendChild(node);
  }
}
domParser.__DOMHandler = DOMHandler;
domParser.normalizeLineEndings = normalizeLineEndings;
domParser.DOMParser = DOMParser;
var dom$1 = dom$3;
lib$1.DOMImplementation = dom$1.DOMImplementation;
lib$1.XMLSerializer = dom$1.XMLSerializer;
lib$1.DOMParser = domParser.DOMParser;
var xmldom$1 = lib$1;
var dom = dom$3;
function parseFromString(string) {
  var error2 = null;
  var domParser2 = new xmldom$1.DOMParser({
    errorHandler: function(level, message) {
      error2 = { level, message };
    }
  });
  var document2 = domParser2.parseFromString(string);
  if (error2 === null) {
    return document2;
  } else {
    throw new Error(error2.level + ": " + error2.message);
  }
}
xmldom$2.parseFromString = parseFromString;
xmldom$2.Node = dom.Node;
var promises$6 = promises$7;
var _$c = require$$0;
var xmldom = xmldom$2;
var nodes$1 = nodes$2;
var Element = nodes$1.Element;
reader.readString = readString;
var Node = xmldom.Node;
function readString(xmlString, namespaceMap) {
  namespaceMap = namespaceMap || {};
  try {
    var document2 = xmldom.parseFromString(xmlString, "text/xml");
  } catch (error2) {
    return promises$6.reject(error2);
  }
  if (document2.documentElement.tagName === "parsererror") {
    return promises$6.resolve(new Error(document2.documentElement.textContent));
  }
  function convertNode(node) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        return convertElement(node);
      case Node.TEXT_NODE:
        return nodes$1.text(node.nodeValue);
    }
  }
  function convertElement(element2) {
    var convertedName = convertName(element2);
    var convertedChildren = [];
    _$c.forEach(element2.childNodes, function(childNode) {
      var convertedNode = convertNode(childNode);
      if (convertedNode) {
        convertedChildren.push(convertedNode);
      }
    });
    var convertedAttributes = {};
    _$c.forEach(element2.attributes, function(attribute) {
      convertedAttributes[convertName(attribute)] = attribute.value;
    });
    return new Element(convertedName, convertedAttributes, convertedChildren);
  }
  function convertName(node) {
    if (node.namespaceURI) {
      var mappedPrefix = namespaceMap[node.namespaceURI];
      var prefix;
      if (mappedPrefix) {
        prefix = mappedPrefix + ":";
      } else {
        prefix = "{" + node.namespaceURI + "}";
      }
      return prefix + node.localName;
    } else {
      return node.localName;
    }
  }
  return promises$6.resolve(convertNode(document2.documentElement));
}
var writer$2 = {};
var lib = {};
var Utility = {};
var hasRequiredUtility;
function requireUtility() {
  if (hasRequiredUtility) return Utility;
  hasRequiredUtility = 1;
  (function() {
    var assign2, getValue, isArray2, isEmpty2, isFunction2, isObject2, isPlainObject, slice2 = [].slice, hasProp = {}.hasOwnProperty;
    assign2 = function() {
      var i, key, len, source, sources, target;
      target = arguments[0], sources = 2 <= arguments.length ? slice2.call(arguments, 1) : [];
      if (isFunction2(Object.assign)) {
        Object.assign.apply(null, arguments);
      } else {
        for (i = 0, len = sources.length; i < len; i++) {
          source = sources[i];
          if (source != null) {
            for (key in source) {
              if (!hasProp.call(source, key)) continue;
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
    isFunction2 = function(val) {
      return !!val && Object.prototype.toString.call(val) === "[object Function]";
    };
    isObject2 = function(val) {
      var ref;
      return !!val && ((ref = typeof val) === "function" || ref === "object");
    };
    isArray2 = function(val) {
      if (isFunction2(Array.isArray)) {
        return Array.isArray(val);
      } else {
        return Object.prototype.toString.call(val) === "[object Array]";
      }
    };
    isEmpty2 = function(val) {
      var key;
      if (isArray2(val)) {
        return !val.length;
      } else {
        for (key in val) {
          if (!hasProp.call(val, key)) continue;
          return false;
        }
        return true;
      }
    };
    isPlainObject = function(val) {
      var ctor2, proto;
      return isObject2(val) && (proto = Object.getPrototypeOf(val)) && (ctor2 = proto.constructor) && typeof ctor2 === "function" && ctor2 instanceof ctor2 && Function.prototype.toString.call(ctor2) === Function.prototype.toString.call(Object);
    };
    getValue = function(obj) {
      if (isFunction2(obj.valueOf)) {
        return obj.valueOf();
      } else {
        return obj;
      }
    };
    Utility.assign = assign2;
    Utility.isFunction = isFunction2;
    Utility.isObject = isObject2;
    Utility.isArray = isArray2;
    Utility.isEmpty = isEmpty2;
    Utility.isPlainObject = isPlainObject;
    Utility.getValue = getValue;
  }).call(commonjsGlobal);
  return Utility;
}
var XMLDocument = { exports: {} };
var XMLNode = { exports: {} };
var XMLElement = { exports: {} };
var XMLAttribute = { exports: {} };
var hasRequiredXMLAttribute;
function requireXMLAttribute() {
  if (hasRequiredXMLAttribute) return XMLAttribute.exports;
  hasRequiredXMLAttribute = 1;
  (function() {
    XMLAttribute.exports = function() {
      function XMLAttribute2(parent, name, value) {
        this.options = parent.options;
        this.stringify = parent.stringify;
        this.parent = parent;
        if (name == null) {
          throw new Error("Missing attribute name. " + this.debugInfo(name));
        }
        if (value == null) {
          throw new Error("Missing attribute value. " + this.debugInfo(name));
        }
        this.name = this.stringify.attName(name);
        this.value = this.stringify.attValue(value);
      }
      XMLAttribute2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLAttribute2.prototype.toString = function(options) {
        return this.options.writer.set(options).attribute(this);
      };
      XMLAttribute2.prototype.debugInfo = function(name) {
        name = name || this.name;
        if (name == null) {
          return "parent: <" + this.parent.name + ">";
        } else {
          return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
        }
      };
      return XMLAttribute2;
    }();
  }).call(commonjsGlobal);
  return XMLAttribute.exports;
}
var hasRequiredXMLElement;
function requireXMLElement() {
  if (hasRequiredXMLElement) return XMLElement.exports;
  hasRequiredXMLElement = 1;
  (function() {
    var XMLAttribute2, XMLNode2, getValue, isFunction2, isObject2, ref, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    ref = requireUtility(), isObject2 = ref.isObject, isFunction2 = ref.isFunction, getValue = ref.getValue;
    XMLNode2 = requireXMLNode();
    XMLAttribute2 = requireXMLAttribute();
    XMLElement.exports = function(superClass) {
      extend2(XMLElement2, superClass);
      function XMLElement2(parent, name, attributes) {
        XMLElement2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing element name. " + this.debugInfo());
        }
        this.name = this.stringify.eleName(name);
        this.attributes = {};
        if (attributes != null) {
          this.attribute(attributes);
        }
        if (parent.isDocument) {
          this.isRoot = true;
          this.documentObject = parent;
          parent.rootObject = this;
        }
      }
      XMLElement2.prototype.clone = function() {
        var att, attName, clonedSelf, ref1;
        clonedSelf = Object.create(this);
        if (clonedSelf.isRoot) {
          clonedSelf.documentObject = null;
        }
        clonedSelf.attributes = {};
        ref1 = this.attributes;
        for (attName in ref1) {
          if (!hasProp.call(ref1, attName)) continue;
          att = ref1[attName];
          clonedSelf.attributes[attName] = att.clone();
        }
        clonedSelf.children = [];
        this.children.forEach(function(child) {
          var clonedChild;
          clonedChild = child.clone();
          clonedChild.parent = clonedSelf;
          return clonedSelf.children.push(clonedChild);
        });
        return clonedSelf;
      };
      XMLElement2.prototype.attribute = function(name, value) {
        var attName, attValue;
        if (name != null) {
          name = getValue(name);
        }
        if (isObject2(name)) {
          for (attName in name) {
            if (!hasProp.call(name, attName)) continue;
            attValue = name[attName];
            this.attribute(attName, attValue);
          }
        } else {
          if (isFunction2(value)) {
            value = value.apply();
          }
          if (!this.options.skipNullAttributes || value != null) {
            this.attributes[name] = new XMLAttribute2(this, name, value);
          }
        }
        return this;
      };
      XMLElement2.prototype.removeAttribute = function(name) {
        var attName, i, len;
        if (name == null) {
          throw new Error("Missing attribute name. " + this.debugInfo());
        }
        name = getValue(name);
        if (Array.isArray(name)) {
          for (i = 0, len = name.length; i < len; i++) {
            attName = name[i];
            delete this.attributes[attName];
          }
        } else {
          delete this.attributes[name];
        }
        return this;
      };
      XMLElement2.prototype.toString = function(options) {
        return this.options.writer.set(options).element(this);
      };
      XMLElement2.prototype.att = function(name, value) {
        return this.attribute(name, value);
      };
      XMLElement2.prototype.a = function(name, value) {
        return this.attribute(name, value);
      };
      return XMLElement2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLElement.exports;
}
var XMLCData = { exports: {} };
var hasRequiredXMLCData;
function requireXMLCData() {
  if (hasRequiredXMLCData) return XMLCData.exports;
  hasRequiredXMLCData = 1;
  (function() {
    var XMLNode2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLCData.exports = function(superClass) {
      extend2(XMLCData2, superClass);
      function XMLCData2(parent, text) {
        XMLCData2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing CDATA text. " + this.debugInfo());
        }
        this.text = this.stringify.cdata(text);
      }
      XMLCData2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLCData2.prototype.toString = function(options) {
        return this.options.writer.set(options).cdata(this);
      };
      return XMLCData2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLCData.exports;
}
var XMLComment = { exports: {} };
var hasRequiredXMLComment;
function requireXMLComment() {
  if (hasRequiredXMLComment) return XMLComment.exports;
  hasRequiredXMLComment = 1;
  (function() {
    var XMLNode2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLComment.exports = function(superClass) {
      extend2(XMLComment2, superClass);
      function XMLComment2(parent, text) {
        XMLComment2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing comment text. " + this.debugInfo());
        }
        this.text = this.stringify.comment(text);
      }
      XMLComment2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLComment2.prototype.toString = function(options) {
        return this.options.writer.set(options).comment(this);
      };
      return XMLComment2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLComment.exports;
}
var XMLDeclaration = { exports: {} };
var hasRequiredXMLDeclaration;
function requireXMLDeclaration() {
  if (hasRequiredXMLDeclaration) return XMLDeclaration.exports;
  hasRequiredXMLDeclaration = 1;
  (function() {
    var XMLNode2, isObject2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isObject2 = requireUtility().isObject;
    XMLNode2 = requireXMLNode();
    XMLDeclaration.exports = function(superClass) {
      extend2(XMLDeclaration2, superClass);
      function XMLDeclaration2(parent, version, encoding, standalone) {
        var ref;
        XMLDeclaration2.__super__.constructor.call(this, parent);
        if (isObject2(version)) {
          ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
        }
        if (!version) {
          version = "1.0";
        }
        this.version = this.stringify.xmlVersion(version);
        if (encoding != null) {
          this.encoding = this.stringify.xmlEncoding(encoding);
        }
        if (standalone != null) {
          this.standalone = this.stringify.xmlStandalone(standalone);
        }
      }
      XMLDeclaration2.prototype.toString = function(options) {
        return this.options.writer.set(options).declaration(this);
      };
      return XMLDeclaration2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDeclaration.exports;
}
var XMLDocType = { exports: {} };
var XMLDTDAttList = { exports: {} };
var hasRequiredXMLDTDAttList;
function requireXMLDTDAttList() {
  if (hasRequiredXMLDTDAttList) return XMLDTDAttList.exports;
  hasRequiredXMLDTDAttList = 1;
  (function() {
    var XMLNode2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLDTDAttList.exports = function(superClass) {
      extend2(XMLDTDAttList2, superClass);
      function XMLDTDAttList2(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        XMLDTDAttList2.__super__.constructor.call(this, parent);
        if (elementName == null) {
          throw new Error("Missing DTD element name. " + this.debugInfo());
        }
        if (attributeName == null) {
          throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
        }
        if (!attributeType) {
          throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
        }
        if (!defaultValueType) {
          throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
        }
        if (defaultValueType.indexOf("#") !== 0) {
          defaultValueType = "#" + defaultValueType;
        }
        if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
          throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
        }
        if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
          throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
        }
        this.elementName = this.stringify.eleName(elementName);
        this.attributeName = this.stringify.attName(attributeName);
        this.attributeType = this.stringify.dtdAttType(attributeType);
        this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
        this.defaultValueType = defaultValueType;
      }
      XMLDTDAttList2.prototype.toString = function(options) {
        return this.options.writer.set(options).dtdAttList(this);
      };
      return XMLDTDAttList2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDAttList.exports;
}
var XMLDTDEntity = { exports: {} };
var hasRequiredXMLDTDEntity;
function requireXMLDTDEntity() {
  if (hasRequiredXMLDTDEntity) return XMLDTDEntity.exports;
  hasRequiredXMLDTDEntity = 1;
  (function() {
    var XMLNode2, isObject2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isObject2 = requireUtility().isObject;
    XMLNode2 = requireXMLNode();
    XMLDTDEntity.exports = function(superClass) {
      extend2(XMLDTDEntity2, superClass);
      function XMLDTDEntity2(parent, pe, name, value) {
        XMLDTDEntity2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing DTD entity name. " + this.debugInfo(name));
        }
        if (value == null) {
          throw new Error("Missing DTD entity value. " + this.debugInfo(name));
        }
        this.pe = !!pe;
        this.name = this.stringify.eleName(name);
        if (!isObject2(value)) {
          this.value = this.stringify.dtdEntityValue(value);
        } else {
          if (!value.pubID && !value.sysID) {
            throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
          }
          if (value.pubID && !value.sysID) {
            throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
          }
          if (value.pubID != null) {
            this.pubID = this.stringify.dtdPubID(value.pubID);
          }
          if (value.sysID != null) {
            this.sysID = this.stringify.dtdSysID(value.sysID);
          }
          if (value.nData != null) {
            this.nData = this.stringify.dtdNData(value.nData);
          }
          if (this.pe && this.nData) {
            throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
          }
        }
      }
      XMLDTDEntity2.prototype.toString = function(options) {
        return this.options.writer.set(options).dtdEntity(this);
      };
      return XMLDTDEntity2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDEntity.exports;
}
var XMLDTDElement = { exports: {} };
var hasRequiredXMLDTDElement;
function requireXMLDTDElement() {
  if (hasRequiredXMLDTDElement) return XMLDTDElement.exports;
  hasRequiredXMLDTDElement = 1;
  (function() {
    var XMLNode2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLDTDElement.exports = function(superClass) {
      extend2(XMLDTDElement2, superClass);
      function XMLDTDElement2(parent, name, value) {
        XMLDTDElement2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing DTD element name. " + this.debugInfo());
        }
        if (!value) {
          value = "(#PCDATA)";
        }
        if (Array.isArray(value)) {
          value = "(" + value.join(",") + ")";
        }
        this.name = this.stringify.eleName(name);
        this.value = this.stringify.dtdElementValue(value);
      }
      XMLDTDElement2.prototype.toString = function(options) {
        return this.options.writer.set(options).dtdElement(this);
      };
      return XMLDTDElement2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDElement.exports;
}
var XMLDTDNotation = { exports: {} };
var hasRequiredXMLDTDNotation;
function requireXMLDTDNotation() {
  if (hasRequiredXMLDTDNotation) return XMLDTDNotation.exports;
  hasRequiredXMLDTDNotation = 1;
  (function() {
    var XMLNode2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLDTDNotation.exports = function(superClass) {
      extend2(XMLDTDNotation2, superClass);
      function XMLDTDNotation2(parent, name, value) {
        XMLDTDNotation2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing DTD notation name. " + this.debugInfo(name));
        }
        if (!value.pubID && !value.sysID) {
          throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
        }
        this.name = this.stringify.eleName(name);
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
      }
      XMLDTDNotation2.prototype.toString = function(options) {
        return this.options.writer.set(options).dtdNotation(this);
      };
      return XMLDTDNotation2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDNotation.exports;
}
var hasRequiredXMLDocType;
function requireXMLDocType() {
  if (hasRequiredXMLDocType) return XMLDocType.exports;
  hasRequiredXMLDocType = 1;
  (function() {
    var XMLDTDAttList2, XMLDTDElement2, XMLDTDEntity2, XMLDTDNotation2, XMLNode2, isObject2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isObject2 = requireUtility().isObject;
    XMLNode2 = requireXMLNode();
    XMLDTDAttList2 = requireXMLDTDAttList();
    XMLDTDEntity2 = requireXMLDTDEntity();
    XMLDTDElement2 = requireXMLDTDElement();
    XMLDTDNotation2 = requireXMLDTDNotation();
    XMLDocType.exports = function(superClass) {
      extend2(XMLDocType2, superClass);
      function XMLDocType2(parent, pubID, sysID) {
        var ref, ref1;
        XMLDocType2.__super__.constructor.call(this, parent);
        this.name = "!DOCTYPE";
        this.documentObject = parent;
        if (isObject2(pubID)) {
          ref = pubID, pubID = ref.pubID, sysID = ref.sysID;
        }
        if (sysID == null) {
          ref1 = [pubID, sysID], sysID = ref1[0], pubID = ref1[1];
        }
        if (pubID != null) {
          this.pubID = this.stringify.dtdPubID(pubID);
        }
        if (sysID != null) {
          this.sysID = this.stringify.dtdSysID(sysID);
        }
      }
      XMLDocType2.prototype.element = function(name, value) {
        var child;
        child = new XMLDTDElement2(this, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        var child;
        child = new XMLDTDAttList2(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.entity = function(name, value) {
        var child;
        child = new XMLDTDEntity2(this, false, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.pEntity = function(name, value) {
        var child;
        child = new XMLDTDEntity2(this, true, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.notation = function(name, value) {
        var child;
        child = new XMLDTDNotation2(this, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.toString = function(options) {
        return this.options.writer.set(options).docType(this);
      };
      XMLDocType2.prototype.ele = function(name, value) {
        return this.element(name, value);
      };
      XMLDocType2.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
      };
      XMLDocType2.prototype.ent = function(name, value) {
        return this.entity(name, value);
      };
      XMLDocType2.prototype.pent = function(name, value) {
        return this.pEntity(name, value);
      };
      XMLDocType2.prototype.not = function(name, value) {
        return this.notation(name, value);
      };
      XMLDocType2.prototype.up = function() {
        return this.root() || this.documentObject;
      };
      return XMLDocType2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDocType.exports;
}
var XMLRaw = { exports: {} };
var hasRequiredXMLRaw;
function requireXMLRaw() {
  if (hasRequiredXMLRaw) return XMLRaw.exports;
  hasRequiredXMLRaw = 1;
  (function() {
    var XMLNode2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLRaw.exports = function(superClass) {
      extend2(XMLRaw2, superClass);
      function XMLRaw2(parent, text) {
        XMLRaw2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing raw text. " + this.debugInfo());
        }
        this.value = this.stringify.raw(text);
      }
      XMLRaw2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLRaw2.prototype.toString = function(options) {
        return this.options.writer.set(options).raw(this);
      };
      return XMLRaw2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLRaw.exports;
}
var XMLText = { exports: {} };
var hasRequiredXMLText;
function requireXMLText() {
  if (hasRequiredXMLText) return XMLText.exports;
  hasRequiredXMLText = 1;
  (function() {
    var XMLNode2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLText.exports = function(superClass) {
      extend2(XMLText2, superClass);
      function XMLText2(parent, text) {
        XMLText2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing element text. " + this.debugInfo());
        }
        this.value = this.stringify.eleText(text);
      }
      XMLText2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLText2.prototype.toString = function(options) {
        return this.options.writer.set(options).text(this);
      };
      return XMLText2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLText.exports;
}
var XMLProcessingInstruction = { exports: {} };
var hasRequiredXMLProcessingInstruction;
function requireXMLProcessingInstruction() {
  if (hasRequiredXMLProcessingInstruction) return XMLProcessingInstruction.exports;
  hasRequiredXMLProcessingInstruction = 1;
  (function() {
    var XMLNode2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLProcessingInstruction.exports = function(superClass) {
      extend2(XMLProcessingInstruction2, superClass);
      function XMLProcessingInstruction2(parent, target, value) {
        XMLProcessingInstruction2.__super__.constructor.call(this, parent);
        if (target == null) {
          throw new Error("Missing instruction target. " + this.debugInfo());
        }
        this.target = this.stringify.insTarget(target);
        if (value) {
          this.value = this.stringify.insValue(value);
        }
      }
      XMLProcessingInstruction2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLProcessingInstruction2.prototype.toString = function(options) {
        return this.options.writer.set(options).processingInstruction(this);
      };
      return XMLProcessingInstruction2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLProcessingInstruction.exports;
}
var XMLDummy = { exports: {} };
var hasRequiredXMLDummy;
function requireXMLDummy() {
  if (hasRequiredXMLDummy) return XMLDummy.exports;
  hasRequiredXMLDummy = 1;
  (function() {
    var XMLNode2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLDummy.exports = function(superClass) {
      extend2(XMLDummy2, superClass);
      function XMLDummy2(parent) {
        XMLDummy2.__super__.constructor.call(this, parent);
        this.isDummy = true;
      }
      XMLDummy2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLDummy2.prototype.toString = function(options) {
        return "";
      };
      return XMLDummy2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDummy.exports;
}
var hasRequiredXMLNode;
function requireXMLNode() {
  if (hasRequiredXMLNode) return XMLNode.exports;
  hasRequiredXMLNode = 1;
  (function() {
    var XMLCData2, XMLComment2, XMLDeclaration2, XMLDocType2, XMLDummy2, XMLElement2, XMLProcessingInstruction2, XMLRaw2, XMLText2, getValue, isEmpty2, isFunction2, isObject2, ref, hasProp = {}.hasOwnProperty;
    ref = requireUtility(), isObject2 = ref.isObject, isFunction2 = ref.isFunction, isEmpty2 = ref.isEmpty, getValue = ref.getValue;
    XMLElement2 = null;
    XMLCData2 = null;
    XMLComment2 = null;
    XMLDeclaration2 = null;
    XMLDocType2 = null;
    XMLRaw2 = null;
    XMLText2 = null;
    XMLProcessingInstruction2 = null;
    XMLDummy2 = null;
    XMLNode.exports = function() {
      function XMLNode2(parent) {
        this.parent = parent;
        if (this.parent) {
          this.options = this.parent.options;
          this.stringify = this.parent.stringify;
        }
        this.children = [];
        if (!XMLElement2) {
          XMLElement2 = requireXMLElement();
          XMLCData2 = requireXMLCData();
          XMLComment2 = requireXMLComment();
          XMLDeclaration2 = requireXMLDeclaration();
          XMLDocType2 = requireXMLDocType();
          XMLRaw2 = requireXMLRaw();
          XMLText2 = requireXMLText();
          XMLProcessingInstruction2 = requireXMLProcessingInstruction();
          XMLDummy2 = requireXMLDummy();
        }
      }
      XMLNode2.prototype.element = function(name, attributes, text) {
        var childNode, item, j, k, key, lastChild, len, len1, ref1, ref2, val;
        lastChild = null;
        if (attributes === null && text == null) {
          ref1 = [{}, null], attributes = ref1[0], text = ref1[1];
        }
        if (attributes == null) {
          attributes = {};
        }
        attributes = getValue(attributes);
        if (!isObject2(attributes)) {
          ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
        }
        if (name != null) {
          name = getValue(name);
        }
        if (Array.isArray(name)) {
          for (j = 0, len = name.length; j < len; j++) {
            item = name[j];
            lastChild = this.element(item);
          }
        } else if (isFunction2(name)) {
          lastChild = this.element(name.apply());
        } else if (isObject2(name)) {
          for (key in name) {
            if (!hasProp.call(name, key)) continue;
            val = name[key];
            if (isFunction2(val)) {
              val = val.apply();
            }
            if (isObject2(val) && isEmpty2(val)) {
              val = null;
            }
            if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
              lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
            } else if (!this.options.separateArrayItems && Array.isArray(val)) {
              for (k = 0, len1 = val.length; k < len1; k++) {
                item = val[k];
                childNode = {};
                childNode[key] = item;
                lastChild = this.element(childNode);
              }
            } else if (isObject2(val)) {
              lastChild = this.element(key);
              lastChild.element(val);
            } else {
              lastChild = this.element(key, val);
            }
          }
        } else if (this.options.skipNullNodes && text === null) {
          lastChild = this.dummy();
        } else {
          if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
            lastChild = this.text(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
            lastChild = this.cdata(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
            lastChild = this.comment(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
            lastChild = this.raw(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
            lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
          } else {
            lastChild = this.node(name, attributes, text);
          }
        }
        if (lastChild == null) {
          throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
        }
        return lastChild;
      };
      XMLNode2.prototype.insertBefore = function(name, attributes, text) {
        var child, i, removed;
        if (this.isRoot) {
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
        }
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i);
        child = this.parent.element(name, attributes, text);
        Array.prototype.push.apply(this.parent.children, removed);
        return child;
      };
      XMLNode2.prototype.insertAfter = function(name, attributes, text) {
        var child, i, removed;
        if (this.isRoot) {
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
        }
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i + 1);
        child = this.parent.element(name, attributes, text);
        Array.prototype.push.apply(this.parent.children, removed);
        return child;
      };
      XMLNode2.prototype.remove = function() {
        var i;
        if (this.isRoot) {
          throw new Error("Cannot remove the root element. " + this.debugInfo());
        }
        i = this.parent.children.indexOf(this);
        [].splice.apply(this.parent.children, [i, i - i + 1].concat([]));
        return this.parent;
      };
      XMLNode2.prototype.node = function(name, attributes, text) {
        var child, ref1;
        if (name != null) {
          name = getValue(name);
        }
        attributes || (attributes = {});
        attributes = getValue(attributes);
        if (!isObject2(attributes)) {
          ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
        }
        child = new XMLElement2(this, name, attributes);
        if (text != null) {
          child.text(text);
        }
        this.children.push(child);
        return child;
      };
      XMLNode2.prototype.text = function(value) {
        var child;
        child = new XMLText2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.cdata = function(value) {
        var child;
        child = new XMLCData2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.comment = function(value) {
        var child;
        child = new XMLComment2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.commentBefore = function(value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i);
        this.parent.comment(value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.commentAfter = function(value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i + 1);
        this.parent.comment(value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.raw = function(value) {
        var child;
        child = new XMLRaw2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.dummy = function() {
        var child;
        child = new XMLDummy2(this);
        this.children.push(child);
        return child;
      };
      XMLNode2.prototype.instruction = function(target, value) {
        var insTarget, insValue, instruction, j, len;
        if (target != null) {
          target = getValue(target);
        }
        if (value != null) {
          value = getValue(value);
        }
        if (Array.isArray(target)) {
          for (j = 0, len = target.length; j < len; j++) {
            insTarget = target[j];
            this.instruction(insTarget);
          }
        } else if (isObject2(target)) {
          for (insTarget in target) {
            if (!hasProp.call(target, insTarget)) continue;
            insValue = target[insTarget];
            this.instruction(insTarget, insValue);
          }
        } else {
          if (isFunction2(value)) {
            value = value.apply();
          }
          instruction = new XMLProcessingInstruction2(this, target, value);
          this.children.push(instruction);
        }
        return this;
      };
      XMLNode2.prototype.instructionBefore = function(target, value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i);
        this.parent.instruction(target, value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.instructionAfter = function(target, value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i + 1);
        this.parent.instruction(target, value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.declaration = function(version, encoding, standalone) {
        var doc, xmldec;
        doc = this.document();
        xmldec = new XMLDeclaration2(doc, version, encoding, standalone);
        if (doc.children[0] instanceof XMLDeclaration2) {
          doc.children[0] = xmldec;
        } else {
          doc.children.unshift(xmldec);
        }
        return doc.root() || doc;
      };
      XMLNode2.prototype.doctype = function(pubID, sysID) {
        var child, doc, doctype, i, j, k, len, len1, ref1, ref2;
        doc = this.document();
        doctype = new XMLDocType2(doc, pubID, sysID);
        ref1 = doc.children;
        for (i = j = 0, len = ref1.length; j < len; i = ++j) {
          child = ref1[i];
          if (child instanceof XMLDocType2) {
            doc.children[i] = doctype;
            return doctype;
          }
        }
        ref2 = doc.children;
        for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
          child = ref2[i];
          if (child.isRoot) {
            doc.children.splice(i, 0, doctype);
            return doctype;
          }
        }
        doc.children.push(doctype);
        return doctype;
      };
      XMLNode2.prototype.up = function() {
        if (this.isRoot) {
          throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
        }
        return this.parent;
      };
      XMLNode2.prototype.root = function() {
        var node;
        node = this;
        while (node) {
          if (node.isDocument) {
            return node.rootObject;
          } else if (node.isRoot) {
            return node;
          } else {
            node = node.parent;
          }
        }
      };
      XMLNode2.prototype.document = function() {
        var node;
        node = this;
        while (node) {
          if (node.isDocument) {
            return node;
          } else {
            node = node.parent;
          }
        }
      };
      XMLNode2.prototype.end = function(options) {
        return this.document().end(options);
      };
      XMLNode2.prototype.prev = function() {
        var i;
        i = this.parent.children.indexOf(this);
        while (i > 0 && this.parent.children[i - 1].isDummy) {
          i = i - 1;
        }
        if (i < 1) {
          throw new Error("Already at the first node. " + this.debugInfo());
        }
        return this.parent.children[i - 1];
      };
      XMLNode2.prototype.next = function() {
        var i;
        i = this.parent.children.indexOf(this);
        while (i < this.parent.children.length - 1 && this.parent.children[i + 1].isDummy) {
          i = i + 1;
        }
        if (i === -1 || i === this.parent.children.length - 1) {
          throw new Error("Already at the last node. " + this.debugInfo());
        }
        return this.parent.children[i + 1];
      };
      XMLNode2.prototype.importDocument = function(doc) {
        var clonedRoot;
        clonedRoot = doc.root().clone();
        clonedRoot.parent = this;
        clonedRoot.isRoot = false;
        this.children.push(clonedRoot);
        return this;
      };
      XMLNode2.prototype.debugInfo = function(name) {
        var ref1, ref2;
        name = name || this.name;
        if (name == null && !((ref1 = this.parent) != null ? ref1.name : void 0)) {
          return "";
        } else if (name == null) {
          return "parent: <" + this.parent.name + ">";
        } else if (!((ref2 = this.parent) != null ? ref2.name : void 0)) {
          return "node: <" + name + ">";
        } else {
          return "node: <" + name + ">, parent: <" + this.parent.name + ">";
        }
      };
      XMLNode2.prototype.ele = function(name, attributes, text) {
        return this.element(name, attributes, text);
      };
      XMLNode2.prototype.nod = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLNode2.prototype.txt = function(value) {
        return this.text(value);
      };
      XMLNode2.prototype.dat = function(value) {
        return this.cdata(value);
      };
      XMLNode2.prototype.com = function(value) {
        return this.comment(value);
      };
      XMLNode2.prototype.ins = function(target, value) {
        return this.instruction(target, value);
      };
      XMLNode2.prototype.doc = function() {
        return this.document();
      };
      XMLNode2.prototype.dec = function(version, encoding, standalone) {
        return this.declaration(version, encoding, standalone);
      };
      XMLNode2.prototype.dtd = function(pubID, sysID) {
        return this.doctype(pubID, sysID);
      };
      XMLNode2.prototype.e = function(name, attributes, text) {
        return this.element(name, attributes, text);
      };
      XMLNode2.prototype.n = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLNode2.prototype.t = function(value) {
        return this.text(value);
      };
      XMLNode2.prototype.d = function(value) {
        return this.cdata(value);
      };
      XMLNode2.prototype.c = function(value) {
        return this.comment(value);
      };
      XMLNode2.prototype.r = function(value) {
        return this.raw(value);
      };
      XMLNode2.prototype.i = function(target, value) {
        return this.instruction(target, value);
      };
      XMLNode2.prototype.u = function() {
        return this.up();
      };
      XMLNode2.prototype.importXMLBuilder = function(doc) {
        return this.importDocument(doc);
      };
      return XMLNode2;
    }();
  }).call(commonjsGlobal);
  return XMLNode.exports;
}
var XMLStringifier = { exports: {} };
var hasRequiredXMLStringifier;
function requireXMLStringifier() {
  if (hasRequiredXMLStringifier) return XMLStringifier.exports;
  hasRequiredXMLStringifier = 1;
  (function() {
    var bind2 = function(fn, me) {
      return function() {
        return fn.apply(me, arguments);
      };
    }, hasProp = {}.hasOwnProperty;
    XMLStringifier.exports = function() {
      function XMLStringifier2(options) {
        this.assertLegalChar = bind2(this.assertLegalChar, this);
        var key, ref, value;
        options || (options = {});
        this.noDoubleEncoding = options.noDoubleEncoding;
        ref = options.stringify || {};
        for (key in ref) {
          if (!hasProp.call(ref, key)) continue;
          value = ref[key];
          this[key] = value;
        }
      }
      XMLStringifier2.prototype.eleName = function(val) {
        val = "" + val || "";
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.eleText = function(val) {
        val = "" + val || "";
        return this.assertLegalChar(this.elEscape(val));
      };
      XMLStringifier2.prototype.cdata = function(val) {
        val = "" + val || "";
        val = val.replace("]]>", "]]]]><![CDATA[>");
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.comment = function(val) {
        val = "" + val || "";
        if (val.match(/--/)) {
          throw new Error("Comment text cannot contain double-hypen: " + val);
        }
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.raw = function(val) {
        return "" + val || "";
      };
      XMLStringifier2.prototype.attName = function(val) {
        return val = "" + val || "";
      };
      XMLStringifier2.prototype.attValue = function(val) {
        val = "" + val || "";
        return this.attEscape(val);
      };
      XMLStringifier2.prototype.insTarget = function(val) {
        return "" + val || "";
      };
      XMLStringifier2.prototype.insValue = function(val) {
        val = "" + val || "";
        if (val.match(/\?>/)) {
          throw new Error("Invalid processing instruction value: " + val);
        }
        return val;
      };
      XMLStringifier2.prototype.xmlVersion = function(val) {
        val = "" + val || "";
        if (!val.match(/1\.[0-9]+/)) {
          throw new Error("Invalid version number: " + val);
        }
        return val;
      };
      XMLStringifier2.prototype.xmlEncoding = function(val) {
        val = "" + val || "";
        if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
          throw new Error("Invalid encoding: " + val);
        }
        return val;
      };
      XMLStringifier2.prototype.xmlStandalone = function(val) {
        if (val) {
          return "yes";
        } else {
          return "no";
        }
      };
      XMLStringifier2.prototype.dtdPubID = function(val) {
        return "" + val || "";
      };
      XMLStringifier2.prototype.dtdSysID = function(val) {
        return "" + val || "";
      };
      XMLStringifier2.prototype.dtdElementValue = function(val) {
        return "" + val || "";
      };
      XMLStringifier2.prototype.dtdAttType = function(val) {
        return "" + val || "";
      };
      XMLStringifier2.prototype.dtdAttDefault = function(val) {
        if (val != null) {
          return "" + val || "";
        } else {
          return val;
        }
      };
      XMLStringifier2.prototype.dtdEntityValue = function(val) {
        return "" + val || "";
      };
      XMLStringifier2.prototype.dtdNData = function(val) {
        return "" + val || "";
      };
      XMLStringifier2.prototype.convertAttKey = "@";
      XMLStringifier2.prototype.convertPIKey = "?";
      XMLStringifier2.prototype.convertTextKey = "#text";
      XMLStringifier2.prototype.convertCDataKey = "#cdata";
      XMLStringifier2.prototype.convertCommentKey = "#comment";
      XMLStringifier2.prototype.convertRawKey = "#raw";
      XMLStringifier2.prototype.assertLegalChar = function(str) {
        var res;
        res = str.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/);
        if (res) {
          throw new Error("Invalid character in string: " + str + " at index " + res.index);
        }
        return str;
      };
      XMLStringifier2.prototype.elEscape = function(str) {
        var ampregex;
        ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
        return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
      };
      XMLStringifier2.prototype.attEscape = function(str) {
        var ampregex;
        ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
        return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
      };
      return XMLStringifier2;
    }();
  }).call(commonjsGlobal);
  return XMLStringifier.exports;
}
var XMLStringWriter = { exports: {} };
var XMLWriterBase = { exports: {} };
var hasRequiredXMLWriterBase;
function requireXMLWriterBase() {
  if (hasRequiredXMLWriterBase) return XMLWriterBase.exports;
  hasRequiredXMLWriterBase = 1;
  (function() {
    var hasProp = {}.hasOwnProperty;
    XMLWriterBase.exports = function() {
      function XMLWriterBase2(options) {
        var key, ref, ref1, ref2, ref3, ref4, ref5, ref6, value;
        options || (options = {});
        this.pretty = options.pretty || false;
        this.allowEmpty = (ref = options.allowEmpty) != null ? ref : false;
        if (this.pretty) {
          this.indent = (ref1 = options.indent) != null ? ref1 : "  ";
          this.newline = (ref2 = options.newline) != null ? ref2 : "\n";
          this.offset = (ref3 = options.offset) != null ? ref3 : 0;
          this.dontprettytextnodes = (ref4 = options.dontprettytextnodes) != null ? ref4 : 0;
        } else {
          this.indent = "";
          this.newline = "";
          this.offset = 0;
          this.dontprettytextnodes = 0;
        }
        this.spacebeforeslash = (ref5 = options.spacebeforeslash) != null ? ref5 : "";
        if (this.spacebeforeslash === true) {
          this.spacebeforeslash = " ";
        }
        this.newlinedefault = this.newline;
        this.prettydefault = this.pretty;
        ref6 = options.writer || {};
        for (key in ref6) {
          if (!hasProp.call(ref6, key)) continue;
          value = ref6[key];
          this[key] = value;
        }
      }
      XMLWriterBase2.prototype.set = function(options) {
        var key, ref, value;
        options || (options = {});
        if ("pretty" in options) {
          this.pretty = options.pretty;
        }
        if ("allowEmpty" in options) {
          this.allowEmpty = options.allowEmpty;
        }
        if (this.pretty) {
          this.indent = "indent" in options ? options.indent : "  ";
          this.newline = "newline" in options ? options.newline : "\n";
          this.offset = "offset" in options ? options.offset : 0;
          this.dontprettytextnodes = "dontprettytextnodes" in options ? options.dontprettytextnodes : 0;
        } else {
          this.indent = "";
          this.newline = "";
          this.offset = 0;
          this.dontprettytextnodes = 0;
        }
        this.spacebeforeslash = "spacebeforeslash" in options ? options.spacebeforeslash : "";
        if (this.spacebeforeslash === true) {
          this.spacebeforeslash = " ";
        }
        this.newlinedefault = this.newline;
        this.prettydefault = this.pretty;
        ref = options.writer || {};
        for (key in ref) {
          if (!hasProp.call(ref, key)) continue;
          value = ref[key];
          this[key] = value;
        }
        return this;
      };
      XMLWriterBase2.prototype.space = function(level) {
        var indent;
        if (this.pretty) {
          indent = (level || 0) + this.offset + 1;
          if (indent > 0) {
            return new Array(indent).join(this.indent);
          } else {
            return "";
          }
        } else {
          return "";
        }
      };
      return XMLWriterBase2;
    }();
  }).call(commonjsGlobal);
  return XMLWriterBase.exports;
}
var hasRequiredXMLStringWriter;
function requireXMLStringWriter() {
  if (hasRequiredXMLStringWriter) return XMLStringWriter.exports;
  hasRequiredXMLStringWriter = 1;
  (function() {
    var XMLCData2, XMLComment2, XMLDTDAttList2, XMLDTDElement2, XMLDTDEntity2, XMLDTDNotation2, XMLDeclaration2, XMLDocType2, XMLDummy2, XMLElement2, XMLProcessingInstruction2, XMLRaw2, XMLText2, XMLWriterBase2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLDeclaration2 = requireXMLDeclaration();
    XMLDocType2 = requireXMLDocType();
    XMLCData2 = requireXMLCData();
    XMLComment2 = requireXMLComment();
    XMLElement2 = requireXMLElement();
    XMLRaw2 = requireXMLRaw();
    XMLText2 = requireXMLText();
    XMLProcessingInstruction2 = requireXMLProcessingInstruction();
    XMLDummy2 = requireXMLDummy();
    XMLDTDAttList2 = requireXMLDTDAttList();
    XMLDTDElement2 = requireXMLDTDElement();
    XMLDTDEntity2 = requireXMLDTDEntity();
    XMLDTDNotation2 = requireXMLDTDNotation();
    XMLWriterBase2 = requireXMLWriterBase();
    XMLStringWriter.exports = function(superClass) {
      extend2(XMLStringWriter2, superClass);
      function XMLStringWriter2(options) {
        XMLStringWriter2.__super__.constructor.call(this, options);
      }
      XMLStringWriter2.prototype.document = function(doc) {
        var child, i, len, r, ref;
        this.textispresent = false;
        r = "";
        ref = doc.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          if (child instanceof XMLDummy2) {
            continue;
          }
          r += function() {
            switch (false) {
              case !(child instanceof XMLDeclaration2):
                return this.declaration(child);
              case !(child instanceof XMLDocType2):
                return this.docType(child);
              case !(child instanceof XMLComment2):
                return this.comment(child);
              case !(child instanceof XMLProcessingInstruction2):
                return this.processingInstruction(child);
              default:
                return this.element(child, 0);
            }
          }.call(this);
        }
        if (this.pretty && r.slice(-this.newline.length) === this.newline) {
          r = r.slice(0, -this.newline.length);
        }
        return r;
      };
      XMLStringWriter2.prototype.attribute = function(att) {
        return " " + att.name + '="' + att.value + '"';
      };
      XMLStringWriter2.prototype.cdata = function(node, level) {
        return this.space(level) + "<![CDATA[" + node.text + "]]>" + this.newline;
      };
      XMLStringWriter2.prototype.comment = function(node, level) {
        return this.space(level) + "<!-- " + node.text + " -->" + this.newline;
      };
      XMLStringWriter2.prototype.declaration = function(node, level) {
        var r;
        r = this.space(level);
        r += '<?xml version="' + node.version + '"';
        if (node.encoding != null) {
          r += ' encoding="' + node.encoding + '"';
        }
        if (node.standalone != null) {
          r += ' standalone="' + node.standalone + '"';
        }
        r += this.spacebeforeslash + "?>";
        r += this.newline;
        return r;
      };
      XMLStringWriter2.prototype.docType = function(node, level) {
        var child, i, len, r, ref;
        level || (level = 0);
        r = this.space(level);
        r += "<!DOCTYPE " + node.root().name;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        if (node.children.length > 0) {
          r += " [";
          r += this.newline;
          ref = node.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            r += function() {
              switch (false) {
                case !(child instanceof XMLDTDAttList2):
                  return this.dtdAttList(child, level + 1);
                case !(child instanceof XMLDTDElement2):
                  return this.dtdElement(child, level + 1);
                case !(child instanceof XMLDTDEntity2):
                  return this.dtdEntity(child, level + 1);
                case !(child instanceof XMLDTDNotation2):
                  return this.dtdNotation(child, level + 1);
                case !(child instanceof XMLCData2):
                  return this.cdata(child, level + 1);
                case !(child instanceof XMLComment2):
                  return this.comment(child, level + 1);
                case !(child instanceof XMLProcessingInstruction2):
                  return this.processingInstruction(child, level + 1);
                default:
                  throw new Error("Unknown DTD node type: " + child.constructor.name);
              }
            }.call(this);
          }
          r += "]";
        }
        r += this.spacebeforeslash + ">";
        r += this.newline;
        return r;
      };
      XMLStringWriter2.prototype.element = function(node, level) {
        var att, child, i, j, len, len1, name, r, ref, ref1, ref2, space, textispresentwasset;
        level || (level = 0);
        textispresentwasset = false;
        if (this.textispresent) {
          this.newline = "";
          this.pretty = false;
        } else {
          this.newline = this.newlinedefault;
          this.pretty = this.prettydefault;
        }
        space = this.space(level);
        r = "";
        r += space + "<" + node.name;
        ref = node.attributes;
        for (name in ref) {
          if (!hasProp.call(ref, name)) continue;
          att = ref[name];
          r += this.attribute(att);
        }
        if (node.children.length === 0 || node.children.every(function(e) {
          return e.value === "";
        })) {
          if (this.allowEmpty) {
            r += "></" + node.name + ">" + this.newline;
          } else {
            r += this.spacebeforeslash + "/>" + this.newline;
          }
        } else if (this.pretty && node.children.length === 1 && node.children[0].value != null) {
          r += ">";
          r += node.children[0].value;
          r += "</" + node.name + ">" + this.newline;
        } else {
          if (this.dontprettytextnodes) {
            ref1 = node.children;
            for (i = 0, len = ref1.length; i < len; i++) {
              child = ref1[i];
              if (child.value != null) {
                this.textispresent++;
                textispresentwasset = true;
                break;
              }
            }
          }
          if (this.textispresent) {
            this.newline = "";
            this.pretty = false;
            space = this.space(level);
          }
          r += ">" + this.newline;
          ref2 = node.children;
          for (j = 0, len1 = ref2.length; j < len1; j++) {
            child = ref2[j];
            r += function() {
              switch (false) {
                case !(child instanceof XMLCData2):
                  return this.cdata(child, level + 1);
                case !(child instanceof XMLComment2):
                  return this.comment(child, level + 1);
                case !(child instanceof XMLElement2):
                  return this.element(child, level + 1);
                case !(child instanceof XMLRaw2):
                  return this.raw(child, level + 1);
                case !(child instanceof XMLText2):
                  return this.text(child, level + 1);
                case !(child instanceof XMLProcessingInstruction2):
                  return this.processingInstruction(child, level + 1);
                case !(child instanceof XMLDummy2):
                  return "";
                default:
                  throw new Error("Unknown XML node type: " + child.constructor.name);
              }
            }.call(this);
          }
          if (textispresentwasset) {
            this.textispresent--;
          }
          if (!this.textispresent) {
            this.newline = this.newlinedefault;
            this.pretty = this.prettydefault;
          }
          r += space + "</" + node.name + ">" + this.newline;
        }
        return r;
      };
      XMLStringWriter2.prototype.processingInstruction = function(node, level) {
        var r;
        r = this.space(level) + "<?" + node.target;
        if (node.value) {
          r += " " + node.value;
        }
        r += this.spacebeforeslash + "?>" + this.newline;
        return r;
      };
      XMLStringWriter2.prototype.raw = function(node, level) {
        return this.space(level) + node.value + this.newline;
      };
      XMLStringWriter2.prototype.text = function(node, level) {
        return this.space(level) + node.value + this.newline;
      };
      XMLStringWriter2.prototype.dtdAttList = function(node, level) {
        var r;
        r = this.space(level) + "<!ATTLIST " + node.elementName + " " + node.attributeName + " " + node.attributeType;
        if (node.defaultValueType !== "#DEFAULT") {
          r += " " + node.defaultValueType;
        }
        if (node.defaultValue) {
          r += ' "' + node.defaultValue + '"';
        }
        r += this.spacebeforeslash + ">" + this.newline;
        return r;
      };
      XMLStringWriter2.prototype.dtdElement = function(node, level) {
        return this.space(level) + "<!ELEMENT " + node.name + " " + node.value + this.spacebeforeslash + ">" + this.newline;
      };
      XMLStringWriter2.prototype.dtdEntity = function(node, level) {
        var r;
        r = this.space(level) + "<!ENTITY";
        if (node.pe) {
          r += " %";
        }
        r += " " + node.name;
        if (node.value) {
          r += ' "' + node.value + '"';
        } else {
          if (node.pubID && node.sysID) {
            r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.sysID) {
            r += ' SYSTEM "' + node.sysID + '"';
          }
          if (node.nData) {
            r += " NDATA " + node.nData;
          }
        }
        r += this.spacebeforeslash + ">" + this.newline;
        return r;
      };
      XMLStringWriter2.prototype.dtdNotation = function(node, level) {
        var r;
        r = this.space(level) + "<!NOTATION " + node.name;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.pubID) {
          r += ' PUBLIC "' + node.pubID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        r += this.spacebeforeslash + ">" + this.newline;
        return r;
      };
      XMLStringWriter2.prototype.openNode = function(node, level) {
        var att, name, r, ref;
        level || (level = 0);
        if (node instanceof XMLElement2) {
          r = this.space(level) + "<" + node.name;
          ref = node.attributes;
          for (name in ref) {
            if (!hasProp.call(ref, name)) continue;
            att = ref[name];
            r += this.attribute(att);
          }
          r += (node.children ? ">" : "/>") + this.newline;
          return r;
        } else {
          r = this.space(level) + "<!DOCTYPE " + node.rootNodeName;
          if (node.pubID && node.sysID) {
            r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.sysID) {
            r += ' SYSTEM "' + node.sysID + '"';
          }
          r += (node.children ? " [" : ">") + this.newline;
          return r;
        }
      };
      XMLStringWriter2.prototype.closeNode = function(node, level) {
        level || (level = 0);
        switch (false) {
          case !(node instanceof XMLElement2):
            return this.space(level) + "</" + node.name + ">" + this.newline;
          case !(node instanceof XMLDocType2):
            return this.space(level) + "]>" + this.newline;
        }
      };
      return XMLStringWriter2;
    }(XMLWriterBase2);
  }).call(commonjsGlobal);
  return XMLStringWriter.exports;
}
var hasRequiredXMLDocument;
function requireXMLDocument() {
  if (hasRequiredXMLDocument) return XMLDocument.exports;
  hasRequiredXMLDocument = 1;
  (function() {
    var XMLNode2, XMLStringWriter2, XMLStringifier2, isPlainObject, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isPlainObject = requireUtility().isPlainObject;
    XMLNode2 = requireXMLNode();
    XMLStringifier2 = requireXMLStringifier();
    XMLStringWriter2 = requireXMLStringWriter();
    XMLDocument.exports = function(superClass) {
      extend2(XMLDocument2, superClass);
      function XMLDocument2(options) {
        XMLDocument2.__super__.constructor.call(this, null);
        this.name = "?xml";
        options || (options = {});
        if (!options.writer) {
          options.writer = new XMLStringWriter2();
        }
        this.options = options;
        this.stringify = new XMLStringifier2(options);
        this.isDocument = true;
      }
      XMLDocument2.prototype.end = function(writer2) {
        var writerOptions;
        if (!writer2) {
          writer2 = this.options.writer;
        } else if (isPlainObject(writer2)) {
          writerOptions = writer2;
          writer2 = this.options.writer.set(writerOptions);
        }
        return writer2.document(this);
      };
      XMLDocument2.prototype.toString = function(options) {
        return this.options.writer.set(options).document(this);
      };
      return XMLDocument2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDocument.exports;
}
var XMLDocumentCB = { exports: {} };
var hasRequiredXMLDocumentCB;
function requireXMLDocumentCB() {
  if (hasRequiredXMLDocumentCB) return XMLDocumentCB.exports;
  hasRequiredXMLDocumentCB = 1;
  (function() {
    var XMLAttribute2, XMLCData2, XMLComment2, XMLDTDAttList2, XMLDTDElement2, XMLDTDEntity2, XMLDTDNotation2, XMLDeclaration2, XMLDocType2, XMLElement2, XMLProcessingInstruction2, XMLRaw2, XMLStringWriter2, XMLStringifier2, XMLText2, getValue, isFunction2, isObject2, isPlainObject, ref, hasProp = {}.hasOwnProperty;
    ref = requireUtility(), isObject2 = ref.isObject, isFunction2 = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;
    XMLElement2 = requireXMLElement();
    XMLCData2 = requireXMLCData();
    XMLComment2 = requireXMLComment();
    XMLRaw2 = requireXMLRaw();
    XMLText2 = requireXMLText();
    XMLProcessingInstruction2 = requireXMLProcessingInstruction();
    XMLDeclaration2 = requireXMLDeclaration();
    XMLDocType2 = requireXMLDocType();
    XMLDTDAttList2 = requireXMLDTDAttList();
    XMLDTDEntity2 = requireXMLDTDEntity();
    XMLDTDElement2 = requireXMLDTDElement();
    XMLDTDNotation2 = requireXMLDTDNotation();
    XMLAttribute2 = requireXMLAttribute();
    XMLStringifier2 = requireXMLStringifier();
    XMLStringWriter2 = requireXMLStringWriter();
    XMLDocumentCB.exports = function() {
      function XMLDocumentCB2(options, onData, onEnd) {
        var writerOptions;
        this.name = "?xml";
        options || (options = {});
        if (!options.writer) {
          options.writer = new XMLStringWriter2(options);
        } else if (isPlainObject(options.writer)) {
          writerOptions = options.writer;
          options.writer = new XMLStringWriter2(writerOptions);
        }
        this.options = options;
        this.writer = options.writer;
        this.stringify = new XMLStringifier2(options);
        this.onDataCallback = onData || function() {
        };
        this.onEndCallback = onEnd || function() {
        };
        this.currentNode = null;
        this.currentLevel = -1;
        this.openTags = {};
        this.documentStarted = false;
        this.documentCompleted = false;
        this.root = null;
      }
      XMLDocumentCB2.prototype.node = function(name, attributes, text) {
        var ref1, ref2;
        if (name == null) {
          throw new Error("Missing node name.");
        }
        if (this.root && this.currentLevel === -1) {
          throw new Error("Document can only have one root node. " + this.debugInfo(name));
        }
        this.openCurrent();
        name = getValue(name);
        if (attributes === null && text == null) {
          ref1 = [{}, null], attributes = ref1[0], text = ref1[1];
        }
        if (attributes == null) {
          attributes = {};
        }
        attributes = getValue(attributes);
        if (!isObject2(attributes)) {
          ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
        }
        this.currentNode = new XMLElement2(this, name, attributes);
        this.currentNode.children = false;
        this.currentLevel++;
        this.openTags[this.currentLevel] = this.currentNode;
        if (text != null) {
          this.text(text);
        }
        return this;
      };
      XMLDocumentCB2.prototype.element = function(name, attributes, text) {
        if (this.currentNode && this.currentNode instanceof XMLDocType2) {
          return this.dtdElement.apply(this, arguments);
        } else {
          return this.node(name, attributes, text);
        }
      };
      XMLDocumentCB2.prototype.attribute = function(name, value) {
        var attName, attValue;
        if (!this.currentNode || this.currentNode.children) {
          throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
        }
        if (name != null) {
          name = getValue(name);
        }
        if (isObject2(name)) {
          for (attName in name) {
            if (!hasProp.call(name, attName)) continue;
            attValue = name[attName];
            this.attribute(attName, attValue);
          }
        } else {
          if (isFunction2(value)) {
            value = value.apply();
          }
          if (!this.options.skipNullAttributes || value != null) {
            this.currentNode.attributes[name] = new XMLAttribute2(this, name, value);
          }
        }
        return this;
      };
      XMLDocumentCB2.prototype.text = function(value) {
        var node;
        this.openCurrent();
        node = new XMLText2(this, value);
        this.onData(this.writer.text(node, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.cdata = function(value) {
        var node;
        this.openCurrent();
        node = new XMLCData2(this, value);
        this.onData(this.writer.cdata(node, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.comment = function(value) {
        var node;
        this.openCurrent();
        node = new XMLComment2(this, value);
        this.onData(this.writer.comment(node, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.raw = function(value) {
        var node;
        this.openCurrent();
        node = new XMLRaw2(this, value);
        this.onData(this.writer.raw(node, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.instruction = function(target, value) {
        var i, insTarget, insValue, len, node;
        this.openCurrent();
        if (target != null) {
          target = getValue(target);
        }
        if (value != null) {
          value = getValue(value);
        }
        if (Array.isArray(target)) {
          for (i = 0, len = target.length; i < len; i++) {
            insTarget = target[i];
            this.instruction(insTarget);
          }
        } else if (isObject2(target)) {
          for (insTarget in target) {
            if (!hasProp.call(target, insTarget)) continue;
            insValue = target[insTarget];
            this.instruction(insTarget, insValue);
          }
        } else {
          if (isFunction2(value)) {
            value = value.apply();
          }
          node = new XMLProcessingInstruction2(this, target, value);
          this.onData(this.writer.processingInstruction(node, this.currentLevel + 1), this.currentLevel + 1);
        }
        return this;
      };
      XMLDocumentCB2.prototype.declaration = function(version, encoding, standalone) {
        var node;
        this.openCurrent();
        if (this.documentStarted) {
          throw new Error("declaration() must be the first node.");
        }
        node = new XMLDeclaration2(this, version, encoding, standalone);
        this.onData(this.writer.declaration(node, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.doctype = function(root2, pubID, sysID) {
        this.openCurrent();
        if (root2 == null) {
          throw new Error("Missing root node name.");
        }
        if (this.root) {
          throw new Error("dtd() must come before the root node.");
        }
        this.currentNode = new XMLDocType2(this, pubID, sysID);
        this.currentNode.rootNodeName = root2;
        this.currentNode.children = false;
        this.currentLevel++;
        this.openTags[this.currentLevel] = this.currentNode;
        return this;
      };
      XMLDocumentCB2.prototype.dtdElement = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDElement2(this, name, value);
        this.onData(this.writer.dtdElement(node, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        var node;
        this.openCurrent();
        node = new XMLDTDAttList2(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
        this.onData(this.writer.dtdAttList(node, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.entity = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDEntity2(this, false, name, value);
        this.onData(this.writer.dtdEntity(node, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.pEntity = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDEntity2(this, true, name, value);
        this.onData(this.writer.dtdEntity(node, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.notation = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDNotation2(this, name, value);
        this.onData(this.writer.dtdNotation(node, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.up = function() {
        if (this.currentLevel < 0) {
          throw new Error("The document node has no parent.");
        }
        if (this.currentNode) {
          if (this.currentNode.children) {
            this.closeNode(this.currentNode);
          } else {
            this.openNode(this.currentNode);
          }
          this.currentNode = null;
        } else {
          this.closeNode(this.openTags[this.currentLevel]);
        }
        delete this.openTags[this.currentLevel];
        this.currentLevel--;
        return this;
      };
      XMLDocumentCB2.prototype.end = function() {
        while (this.currentLevel >= 0) {
          this.up();
        }
        return this.onEnd();
      };
      XMLDocumentCB2.prototype.openCurrent = function() {
        if (this.currentNode) {
          this.currentNode.children = true;
          return this.openNode(this.currentNode);
        }
      };
      XMLDocumentCB2.prototype.openNode = function(node) {
        if (!node.isOpen) {
          if (!this.root && this.currentLevel === 0 && node instanceof XMLElement2) {
            this.root = node;
          }
          this.onData(this.writer.openNode(node, this.currentLevel), this.currentLevel);
          return node.isOpen = true;
        }
      };
      XMLDocumentCB2.prototype.closeNode = function(node) {
        if (!node.isClosed) {
          this.onData(this.writer.closeNode(node, this.currentLevel), this.currentLevel);
          return node.isClosed = true;
        }
      };
      XMLDocumentCB2.prototype.onData = function(chunk2, level) {
        this.documentStarted = true;
        return this.onDataCallback(chunk2, level + 1);
      };
      XMLDocumentCB2.prototype.onEnd = function() {
        this.documentCompleted = true;
        return this.onEndCallback();
      };
      XMLDocumentCB2.prototype.debugInfo = function(name) {
        if (name == null) {
          return "";
        } else {
          return "node: <" + name + ">";
        }
      };
      XMLDocumentCB2.prototype.ele = function() {
        return this.element.apply(this, arguments);
      };
      XMLDocumentCB2.prototype.nod = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLDocumentCB2.prototype.txt = function(value) {
        return this.text(value);
      };
      XMLDocumentCB2.prototype.dat = function(value) {
        return this.cdata(value);
      };
      XMLDocumentCB2.prototype.com = function(value) {
        return this.comment(value);
      };
      XMLDocumentCB2.prototype.ins = function(target, value) {
        return this.instruction(target, value);
      };
      XMLDocumentCB2.prototype.dec = function(version, encoding, standalone) {
        return this.declaration(version, encoding, standalone);
      };
      XMLDocumentCB2.prototype.dtd = function(root2, pubID, sysID) {
        return this.doctype(root2, pubID, sysID);
      };
      XMLDocumentCB2.prototype.e = function(name, attributes, text) {
        return this.element(name, attributes, text);
      };
      XMLDocumentCB2.prototype.n = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLDocumentCB2.prototype.t = function(value) {
        return this.text(value);
      };
      XMLDocumentCB2.prototype.d = function(value) {
        return this.cdata(value);
      };
      XMLDocumentCB2.prototype.c = function(value) {
        return this.comment(value);
      };
      XMLDocumentCB2.prototype.r = function(value) {
        return this.raw(value);
      };
      XMLDocumentCB2.prototype.i = function(target, value) {
        return this.instruction(target, value);
      };
      XMLDocumentCB2.prototype.att = function() {
        if (this.currentNode && this.currentNode instanceof XMLDocType2) {
          return this.attList.apply(this, arguments);
        } else {
          return this.attribute.apply(this, arguments);
        }
      };
      XMLDocumentCB2.prototype.a = function() {
        if (this.currentNode && this.currentNode instanceof XMLDocType2) {
          return this.attList.apply(this, arguments);
        } else {
          return this.attribute.apply(this, arguments);
        }
      };
      XMLDocumentCB2.prototype.ent = function(name, value) {
        return this.entity(name, value);
      };
      XMLDocumentCB2.prototype.pent = function(name, value) {
        return this.pEntity(name, value);
      };
      XMLDocumentCB2.prototype.not = function(name, value) {
        return this.notation(name, value);
      };
      return XMLDocumentCB2;
    }();
  }).call(commonjsGlobal);
  return XMLDocumentCB.exports;
}
var XMLStreamWriter = { exports: {} };
var hasRequiredXMLStreamWriter;
function requireXMLStreamWriter() {
  if (hasRequiredXMLStreamWriter) return XMLStreamWriter.exports;
  hasRequiredXMLStreamWriter = 1;
  (function() {
    var XMLCData2, XMLComment2, XMLDTDAttList2, XMLDTDElement2, XMLDTDEntity2, XMLDTDNotation2, XMLDeclaration2, XMLDocType2, XMLDummy2, XMLElement2, XMLProcessingInstruction2, XMLRaw2, XMLText2, XMLWriterBase2, extend2 = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor2() {
        this.constructor = child;
      }
      ctor2.prototype = parent.prototype;
      child.prototype = new ctor2();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLDeclaration2 = requireXMLDeclaration();
    XMLDocType2 = requireXMLDocType();
    XMLCData2 = requireXMLCData();
    XMLComment2 = requireXMLComment();
    XMLElement2 = requireXMLElement();
    XMLRaw2 = requireXMLRaw();
    XMLText2 = requireXMLText();
    XMLProcessingInstruction2 = requireXMLProcessingInstruction();
    XMLDummy2 = requireXMLDummy();
    XMLDTDAttList2 = requireXMLDTDAttList();
    XMLDTDElement2 = requireXMLDTDElement();
    XMLDTDEntity2 = requireXMLDTDEntity();
    XMLDTDNotation2 = requireXMLDTDNotation();
    XMLWriterBase2 = requireXMLWriterBase();
    XMLStreamWriter.exports = function(superClass) {
      extend2(XMLStreamWriter2, superClass);
      function XMLStreamWriter2(stream, options) {
        XMLStreamWriter2.__super__.constructor.call(this, options);
        this.stream = stream;
      }
      XMLStreamWriter2.prototype.document = function(doc) {
        var child, i, j, len, len1, ref, ref1, results2;
        ref = doc.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          child.isLastRootNode = false;
        }
        doc.children[doc.children.length - 1].isLastRootNode = true;
        ref1 = doc.children;
        results2 = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          child = ref1[j];
          if (child instanceof XMLDummy2) {
            continue;
          }
          switch (false) {
            case !(child instanceof XMLDeclaration2):
              results2.push(this.declaration(child));
              break;
            case !(child instanceof XMLDocType2):
              results2.push(this.docType(child));
              break;
            case !(child instanceof XMLComment2):
              results2.push(this.comment(child));
              break;
            case !(child instanceof XMLProcessingInstruction2):
              results2.push(this.processingInstruction(child));
              break;
            default:
              results2.push(this.element(child));
          }
        }
        return results2;
      };
      XMLStreamWriter2.prototype.attribute = function(att) {
        return this.stream.write(" " + att.name + '="' + att.value + '"');
      };
      XMLStreamWriter2.prototype.cdata = function(node, level) {
        return this.stream.write(this.space(level) + "<![CDATA[" + node.text + "]]>" + this.endline(node));
      };
      XMLStreamWriter2.prototype.comment = function(node, level) {
        return this.stream.write(this.space(level) + "<!-- " + node.text + " -->" + this.endline(node));
      };
      XMLStreamWriter2.prototype.declaration = function(node, level) {
        this.stream.write(this.space(level));
        this.stream.write('<?xml version="' + node.version + '"');
        if (node.encoding != null) {
          this.stream.write(' encoding="' + node.encoding + '"');
        }
        if (node.standalone != null) {
          this.stream.write(' standalone="' + node.standalone + '"');
        }
        this.stream.write(this.spacebeforeslash + "?>");
        return this.stream.write(this.endline(node));
      };
      XMLStreamWriter2.prototype.docType = function(node, level) {
        var child, i, len, ref;
        level || (level = 0);
        this.stream.write(this.space(level));
        this.stream.write("<!DOCTYPE " + node.root().name);
        if (node.pubID && node.sysID) {
          this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
        } else if (node.sysID) {
          this.stream.write(' SYSTEM "' + node.sysID + '"');
        }
        if (node.children.length > 0) {
          this.stream.write(" [");
          this.stream.write(this.endline(node));
          ref = node.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            switch (false) {
              case !(child instanceof XMLDTDAttList2):
                this.dtdAttList(child, level + 1);
                break;
              case !(child instanceof XMLDTDElement2):
                this.dtdElement(child, level + 1);
                break;
              case !(child instanceof XMLDTDEntity2):
                this.dtdEntity(child, level + 1);
                break;
              case !(child instanceof XMLDTDNotation2):
                this.dtdNotation(child, level + 1);
                break;
              case !(child instanceof XMLCData2):
                this.cdata(child, level + 1);
                break;
              case !(child instanceof XMLComment2):
                this.comment(child, level + 1);
                break;
              case !(child instanceof XMLProcessingInstruction2):
                this.processingInstruction(child, level + 1);
                break;
              default:
                throw new Error("Unknown DTD node type: " + child.constructor.name);
            }
          }
          this.stream.write("]");
        }
        this.stream.write(this.spacebeforeslash + ">");
        return this.stream.write(this.endline(node));
      };
      XMLStreamWriter2.prototype.element = function(node, level) {
        var att, child, i, len, name, ref, ref1, space;
        level || (level = 0);
        space = this.space(level);
        this.stream.write(space + "<" + node.name);
        ref = node.attributes;
        for (name in ref) {
          if (!hasProp.call(ref, name)) continue;
          att = ref[name];
          this.attribute(att);
        }
        if (node.children.length === 0 || node.children.every(function(e) {
          return e.value === "";
        })) {
          if (this.allowEmpty) {
            this.stream.write("></" + node.name + ">");
          } else {
            this.stream.write(this.spacebeforeslash + "/>");
          }
        } else if (this.pretty && node.children.length === 1 && node.children[0].value != null) {
          this.stream.write(">");
          this.stream.write(node.children[0].value);
          this.stream.write("</" + node.name + ">");
        } else {
          this.stream.write(">" + this.newline);
          ref1 = node.children;
          for (i = 0, len = ref1.length; i < len; i++) {
            child = ref1[i];
            switch (false) {
              case !(child instanceof XMLCData2):
                this.cdata(child, level + 1);
                break;
              case !(child instanceof XMLComment2):
                this.comment(child, level + 1);
                break;
              case !(child instanceof XMLElement2):
                this.element(child, level + 1);
                break;
              case !(child instanceof XMLRaw2):
                this.raw(child, level + 1);
                break;
              case !(child instanceof XMLText2):
                this.text(child, level + 1);
                break;
              case !(child instanceof XMLProcessingInstruction2):
                this.processingInstruction(child, level + 1);
                break;
              case !(child instanceof XMLDummy2):
                break;
              default:
                throw new Error("Unknown XML node type: " + child.constructor.name);
            }
          }
          this.stream.write(space + "</" + node.name + ">");
        }
        return this.stream.write(this.endline(node));
      };
      XMLStreamWriter2.prototype.processingInstruction = function(node, level) {
        this.stream.write(this.space(level) + "<?" + node.target);
        if (node.value) {
          this.stream.write(" " + node.value);
        }
        return this.stream.write(this.spacebeforeslash + "?>" + this.endline(node));
      };
      XMLStreamWriter2.prototype.raw = function(node, level) {
        return this.stream.write(this.space(level) + node.value + this.endline(node));
      };
      XMLStreamWriter2.prototype.text = function(node, level) {
        return this.stream.write(this.space(level) + node.value + this.endline(node));
      };
      XMLStreamWriter2.prototype.dtdAttList = function(node, level) {
        this.stream.write(this.space(level) + "<!ATTLIST " + node.elementName + " " + node.attributeName + " " + node.attributeType);
        if (node.defaultValueType !== "#DEFAULT") {
          this.stream.write(" " + node.defaultValueType);
        }
        if (node.defaultValue) {
          this.stream.write(' "' + node.defaultValue + '"');
        }
        return this.stream.write(this.spacebeforeslash + ">" + this.endline(node));
      };
      XMLStreamWriter2.prototype.dtdElement = function(node, level) {
        this.stream.write(this.space(level) + "<!ELEMENT " + node.name + " " + node.value);
        return this.stream.write(this.spacebeforeslash + ">" + this.endline(node));
      };
      XMLStreamWriter2.prototype.dtdEntity = function(node, level) {
        this.stream.write(this.space(level) + "<!ENTITY");
        if (node.pe) {
          this.stream.write(" %");
        }
        this.stream.write(" " + node.name);
        if (node.value) {
          this.stream.write(' "' + node.value + '"');
        } else {
          if (node.pubID && node.sysID) {
            this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
          } else if (node.sysID) {
            this.stream.write(' SYSTEM "' + node.sysID + '"');
          }
          if (node.nData) {
            this.stream.write(" NDATA " + node.nData);
          }
        }
        return this.stream.write(this.spacebeforeslash + ">" + this.endline(node));
      };
      XMLStreamWriter2.prototype.dtdNotation = function(node, level) {
        this.stream.write(this.space(level) + "<!NOTATION " + node.name);
        if (node.pubID && node.sysID) {
          this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
        } else if (node.pubID) {
          this.stream.write(' PUBLIC "' + node.pubID + '"');
        } else if (node.sysID) {
          this.stream.write(' SYSTEM "' + node.sysID + '"');
        }
        return this.stream.write(this.spacebeforeslash + ">" + this.endline(node));
      };
      XMLStreamWriter2.prototype.endline = function(node) {
        if (!node.isLastRootNode) {
          return this.newline;
        } else {
          return "";
        }
      };
      return XMLStreamWriter2;
    }(XMLWriterBase2);
  }).call(commonjsGlobal);
  return XMLStreamWriter.exports;
}
(function() {
  var XMLDocument2, XMLDocumentCB2, XMLStreamWriter2, XMLStringWriter2, assign2, isFunction2, ref;
  ref = requireUtility(), assign2 = ref.assign, isFunction2 = ref.isFunction;
  XMLDocument2 = requireXMLDocument();
  XMLDocumentCB2 = requireXMLDocumentCB();
  XMLStringWriter2 = requireXMLStringWriter();
  XMLStreamWriter2 = requireXMLStreamWriter();
  lib.create = function(name, xmldec, doctype, options) {
    var doc, root2;
    if (name == null) {
      throw new Error("Root element needs a name.");
    }
    options = assign2({}, xmldec, doctype, options);
    doc = new XMLDocument2(options);
    root2 = doc.element(name);
    if (!options.headless) {
      doc.declaration(options);
      if (options.pubID != null || options.sysID != null) {
        doc.doctype(options);
      }
    }
    return root2;
  };
  lib.begin = function(options, onData, onEnd) {
    var ref1;
    if (isFunction2(options)) {
      ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
      options = {};
    }
    if (onData) {
      return new XMLDocumentCB2(options, onData, onEnd);
    } else {
      return new XMLDocument2(options);
    }
  };
  lib.stringWriter = function(options) {
    return new XMLStringWriter2(options);
  };
  lib.streamWriter = function(stream, options) {
    return new XMLStreamWriter2(stream, options);
  };
}).call(commonjsGlobal);
var _$b = require$$0;
var xmlbuilder = lib;
writer$2.writeString = writeString;
function writeString(root2, namespaces) {
  var uriToPrefix = _$b.invert(namespaces);
  var nodeWriters = {
    element: writeElement,
    text: writeTextNode
  };
  function writeNode(builder, node) {
    return nodeWriters[node.type](builder, node);
  }
  function writeElement(builder, element2) {
    var elementBuilder = builder.element(mapElementName(element2.name), element2.attributes);
    element2.children.forEach(function(child) {
      writeNode(elementBuilder, child);
    });
  }
  function mapElementName(name) {
    var longFormMatch = /^\{(.*)\}(.*)$/.exec(name);
    if (longFormMatch) {
      var prefix = uriToPrefix[longFormMatch[1]];
      return prefix + (prefix === "" ? "" : ":") + longFormMatch[2];
    } else {
      return name;
    }
  }
  function writeDocument(root3) {
    var builder = xmlbuilder.create(mapElementName(root3.name), {
      version: "1.0",
      encoding: "UTF-8",
      standalone: true
    });
    _$b.forEach(namespaces, function(uri, prefix) {
      var key = "xmlns" + (prefix === "" ? "" : ":" + prefix);
      builder.attribute(key, uri);
    });
    root3.children.forEach(function(child) {
      writeNode(builder, child);
    });
    return builder.end();
  }
  return writeDocument(root2);
}
function writeTextNode(builder, node) {
  builder.text(node.value);
}
var nodes = nodes$2;
xml$3.Element = nodes.Element;
xml$3.element = nodes.element;
xml$3.emptyElement = nodes.emptyElement;
xml$3.text = nodes.text;
xml$3.readString = reader.readString;
xml$3.writeString = writer$2.writeString;
var _$a = require$$0;
var promises$5 = promises$7;
var xml$2 = xml$3;
officeXmlReader.read = read$1;
officeXmlReader.readXmlFromZipFile = readXmlFromZipFile$1;
var xmlNamespaceMap = {
  // Transitional format
  "http://schemas.openxmlformats.org/wordprocessingml/2006/main": "w",
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships": "r",
  "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing": "wp",
  "http://schemas.openxmlformats.org/drawingml/2006/main": "a",
  "http://schemas.openxmlformats.org/drawingml/2006/picture": "pic",
  // Strict format
  "http://purl.oclc.org/ooxml/wordprocessingml/main": "w",
  "http://purl.oclc.org/ooxml/officeDocument/relationships": "r",
  "http://purl.oclc.org/ooxml/drawingml/wordprocessingDrawing": "wp",
  "http://purl.oclc.org/ooxml/drawingml/main": "a",
  "http://purl.oclc.org/ooxml/drawingml/picture": "pic",
  // Common
  "http://schemas.openxmlformats.org/package/2006/content-types": "content-types",
  "http://schemas.openxmlformats.org/package/2006/relationships": "relationships",
  "http://schemas.openxmlformats.org/markup-compatibility/2006": "mc",
  "urn:schemas-microsoft-com:vml": "v",
  "urn:schemas-microsoft-com:office:word": "office-word",
  // [MS-DOCX]: Word Extensions to the Office Open XML (.docx) File Format
  // https://learn.microsoft.com/en-us/openspecs/office_standards/ms-docx/b839fe1f-e1ca-4fa6-8c26-5954d0abbccd
  "http://schemas.microsoft.com/office/word/2010/wordml": "wordml"
};
function read$1(xmlString) {
  return xml$2.readString(xmlString, xmlNamespaceMap).then(function(document2) {
    return collapseAlternateContent(document2)[0];
  });
}
function readXmlFromZipFile$1(docxFile, path) {
  if (docxFile.exists(path)) {
    return docxFile.read(path, "utf-8").then(stripUtf8Bom).then(read$1);
  } else {
    return promises$5.resolve(null);
  }
}
function stripUtf8Bom(xmlString) {
  return xmlString.replace(/^\uFEFF/g, "");
}
function collapseAlternateContent(node) {
  if (node.type === "element") {
    if (node.name === "mc:AlternateContent") {
      return node.firstOrEmpty("mc:Fallback").children;
    } else {
      node.children = _$a.flatten(node.children.map(collapseAlternateContent, true));
      return [node];
    }
  } else {
    return [node];
  }
}
var bodyReader = {};
var dist = {};
var dingbats$1 = {};
Object.defineProperty(dingbats$1, "__esModule", { value: true });
var dingbats = [
  { "Typeface name": "Symbol", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Symbol", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "33", "Unicode hex": "21" },
  { "Typeface name": "Symbol", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "8704", "Unicode hex": "2200" },
  { "Typeface name": "Symbol", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "35", "Unicode hex": "23" },
  { "Typeface name": "Symbol", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "8707", "Unicode hex": "2203" },
  { "Typeface name": "Symbol", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "37", "Unicode hex": "25" },
  { "Typeface name": "Symbol", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "38", "Unicode hex": "26" },
  { "Typeface name": "Symbol", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "8717", "Unicode hex": "220D" },
  { "Typeface name": "Symbol", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "40", "Unicode hex": "28" },
  { "Typeface name": "Symbol", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "41", "Unicode hex": "29" },
  { "Typeface name": "Symbol", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "42", "Unicode hex": "2A" },
  { "Typeface name": "Symbol", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "43", "Unicode hex": "2B" },
  { "Typeface name": "Symbol", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "44", "Unicode hex": "2C" },
  { "Typeface name": "Symbol", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "8722", "Unicode hex": "2212" },
  { "Typeface name": "Symbol", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "46", "Unicode hex": "2E" },
  { "Typeface name": "Symbol", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "47", "Unicode hex": "2F" },
  { "Typeface name": "Symbol", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "48", "Unicode hex": "30" },
  { "Typeface name": "Symbol", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "49", "Unicode hex": "31" },
  { "Typeface name": "Symbol", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "50", "Unicode hex": "32" },
  { "Typeface name": "Symbol", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "51", "Unicode hex": "33" },
  { "Typeface name": "Symbol", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "52", "Unicode hex": "34" },
  { "Typeface name": "Symbol", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "53", "Unicode hex": "35" },
  { "Typeface name": "Symbol", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "54", "Unicode hex": "36" },
  { "Typeface name": "Symbol", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "55", "Unicode hex": "37" },
  { "Typeface name": "Symbol", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "56", "Unicode hex": "38" },
  { "Typeface name": "Symbol", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "57", "Unicode hex": "39" },
  { "Typeface name": "Symbol", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "58", "Unicode hex": "3A" },
  { "Typeface name": "Symbol", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "59", "Unicode hex": "3B" },
  { "Typeface name": "Symbol", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "60", "Unicode hex": "3C" },
  { "Typeface name": "Symbol", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "61", "Unicode hex": "3D" },
  { "Typeface name": "Symbol", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "62", "Unicode hex": "3E" },
  { "Typeface name": "Symbol", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "63", "Unicode hex": "3F" },
  { "Typeface name": "Symbol", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "8773", "Unicode hex": "2245" },
  { "Typeface name": "Symbol", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "913", "Unicode hex": "391" },
  { "Typeface name": "Symbol", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "914", "Unicode hex": "392" },
  { "Typeface name": "Symbol", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "935", "Unicode hex": "3A7" },
  { "Typeface name": "Symbol", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "916", "Unicode hex": "394" },
  { "Typeface name": "Symbol", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "917", "Unicode hex": "395" },
  { "Typeface name": "Symbol", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "934", "Unicode hex": "3A6" },
  { "Typeface name": "Symbol", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "915", "Unicode hex": "393" },
  { "Typeface name": "Symbol", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "919", "Unicode hex": "397" },
  { "Typeface name": "Symbol", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "921", "Unicode hex": "399" },
  { "Typeface name": "Symbol", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "977", "Unicode hex": "3D1" },
  { "Typeface name": "Symbol", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "922", "Unicode hex": "39A" },
  { "Typeface name": "Symbol", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "923", "Unicode hex": "39B" },
  { "Typeface name": "Symbol", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "924", "Unicode hex": "39C" },
  { "Typeface name": "Symbol", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "925", "Unicode hex": "39D" },
  { "Typeface name": "Symbol", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "927", "Unicode hex": "39F" },
  { "Typeface name": "Symbol", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "928", "Unicode hex": "3A0" },
  { "Typeface name": "Symbol", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "920", "Unicode hex": "398" },
  { "Typeface name": "Symbol", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "929", "Unicode hex": "3A1" },
  { "Typeface name": "Symbol", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "931", "Unicode hex": "3A3" },
  { "Typeface name": "Symbol", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "932", "Unicode hex": "3A4" },
  { "Typeface name": "Symbol", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "933", "Unicode hex": "3A5" },
  { "Typeface name": "Symbol", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "962", "Unicode hex": "3C2" },
  { "Typeface name": "Symbol", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "937", "Unicode hex": "3A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "926", "Unicode hex": "39E" },
  { "Typeface name": "Symbol", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "936", "Unicode hex": "3A8" },
  { "Typeface name": "Symbol", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "918", "Unicode hex": "396" },
  { "Typeface name": "Symbol", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "91", "Unicode hex": "5B" },
  { "Typeface name": "Symbol", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "8756", "Unicode hex": "2234" },
  { "Typeface name": "Symbol", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "93", "Unicode hex": "5D" },
  { "Typeface name": "Symbol", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "8869", "Unicode hex": "22A5" },
  { "Typeface name": "Symbol", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "95", "Unicode hex": "5F" },
  { "Typeface name": "Symbol", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "8254", "Unicode hex": "203E" },
  { "Typeface name": "Symbol", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "945", "Unicode hex": "3B1" },
  { "Typeface name": "Symbol", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "946", "Unicode hex": "3B2" },
  { "Typeface name": "Symbol", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "967", "Unicode hex": "3C7" },
  { "Typeface name": "Symbol", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "948", "Unicode hex": "3B4" },
  { "Typeface name": "Symbol", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "949", "Unicode hex": "3B5" },
  { "Typeface name": "Symbol", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "966", "Unicode hex": "3C6" },
  { "Typeface name": "Symbol", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "947", "Unicode hex": "3B3" },
  { "Typeface name": "Symbol", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "951", "Unicode hex": "3B7" },
  { "Typeface name": "Symbol", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "953", "Unicode hex": "3B9" },
  { "Typeface name": "Symbol", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "981", "Unicode hex": "3D5" },
  { "Typeface name": "Symbol", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "954", "Unicode hex": "3BA" },
  { "Typeface name": "Symbol", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "955", "Unicode hex": "3BB" },
  { "Typeface name": "Symbol", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "956", "Unicode hex": "3BC" },
  { "Typeface name": "Symbol", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "957", "Unicode hex": "3BD" },
  { "Typeface name": "Symbol", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "959", "Unicode hex": "3BF" },
  { "Typeface name": "Symbol", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "960", "Unicode hex": "3C0" },
  { "Typeface name": "Symbol", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "952", "Unicode hex": "3B8" },
  { "Typeface name": "Symbol", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "961", "Unicode hex": "3C1" },
  { "Typeface name": "Symbol", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "963", "Unicode hex": "3C3" },
  { "Typeface name": "Symbol", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "964", "Unicode hex": "3C4" },
  { "Typeface name": "Symbol", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "965", "Unicode hex": "3C5" },
  { "Typeface name": "Symbol", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "982", "Unicode hex": "3D6" },
  { "Typeface name": "Symbol", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "969", "Unicode hex": "3C9" },
  { "Typeface name": "Symbol", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "958", "Unicode hex": "3BE" },
  { "Typeface name": "Symbol", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "968", "Unicode hex": "3C8" },
  { "Typeface name": "Symbol", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "950", "Unicode hex": "3B6" },
  { "Typeface name": "Symbol", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "123", "Unicode hex": "7B" },
  { "Typeface name": "Symbol", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "124", "Unicode hex": "7C" },
  { "Typeface name": "Symbol", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "125", "Unicode hex": "7D" },
  { "Typeface name": "Symbol", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "126", "Unicode hex": "7E" },
  { "Typeface name": "Symbol", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "8364", "Unicode hex": "20AC" },
  { "Typeface name": "Symbol", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "978", "Unicode hex": "3D2" },
  { "Typeface name": "Symbol", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "8242", "Unicode hex": "2032" },
  { "Typeface name": "Symbol", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "8804", "Unicode hex": "2264" },
  { "Typeface name": "Symbol", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "8260", "Unicode hex": "2044" },
  { "Typeface name": "Symbol", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "8734", "Unicode hex": "221E" },
  { "Typeface name": "Symbol", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "402", "Unicode hex": "192" },
  { "Typeface name": "Symbol", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "9827", "Unicode hex": "2663" },
  { "Typeface name": "Symbol", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "9830", "Unicode hex": "2666" },
  { "Typeface name": "Symbol", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "9829", "Unicode hex": "2665" },
  { "Typeface name": "Symbol", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "9824", "Unicode hex": "2660" },
  { "Typeface name": "Symbol", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "8596", "Unicode hex": "2194" },
  { "Typeface name": "Symbol", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "8592", "Unicode hex": "2190" },
  { "Typeface name": "Symbol", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "8593", "Unicode hex": "2191" },
  { "Typeface name": "Symbol", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "8594", "Unicode hex": "2192" },
  { "Typeface name": "Symbol", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "8595", "Unicode hex": "2193" },
  { "Typeface name": "Symbol", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "176", "Unicode hex": "B0" },
  { "Typeface name": "Symbol", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "177", "Unicode hex": "B1" },
  { "Typeface name": "Symbol", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "8243", "Unicode hex": "2033" },
  { "Typeface name": "Symbol", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "8805", "Unicode hex": "2265" },
  { "Typeface name": "Symbol", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "215", "Unicode hex": "D7" },
  { "Typeface name": "Symbol", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "8733", "Unicode hex": "221D" },
  { "Typeface name": "Symbol", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "8706", "Unicode hex": "2202" },
  { "Typeface name": "Symbol", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "8226", "Unicode hex": "2022" },
  { "Typeface name": "Symbol", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "247", "Unicode hex": "F7" },
  { "Typeface name": "Symbol", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "8800", "Unicode hex": "2260" },
  { "Typeface name": "Symbol", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "8801", "Unicode hex": "2261" },
  { "Typeface name": "Symbol", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "8776", "Unicode hex": "2248" },
  { "Typeface name": "Symbol", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "8230", "Unicode hex": "2026" },
  { "Typeface name": "Symbol", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "9168", "Unicode hex": "23D0" },
  { "Typeface name": "Symbol", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "9135", "Unicode hex": "23AF" },
  { "Typeface name": "Symbol", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "8629", "Unicode hex": "21B5" },
  { "Typeface name": "Symbol", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "8501", "Unicode hex": "2135" },
  { "Typeface name": "Symbol", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "8465", "Unicode hex": "2111" },
  { "Typeface name": "Symbol", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "8476", "Unicode hex": "211C" },
  { "Typeface name": "Symbol", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "8472", "Unicode hex": "2118" },
  { "Typeface name": "Symbol", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "8855", "Unicode hex": "2297" },
  { "Typeface name": "Symbol", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "8853", "Unicode hex": "2295" },
  { "Typeface name": "Symbol", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "8709", "Unicode hex": "2205" },
  { "Typeface name": "Symbol", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "8745", "Unicode hex": "2229" },
  { "Typeface name": "Symbol", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "8746", "Unicode hex": "222A" },
  { "Typeface name": "Symbol", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "8835", "Unicode hex": "2283" },
  { "Typeface name": "Symbol", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "8839", "Unicode hex": "2287" },
  { "Typeface name": "Symbol", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "8836", "Unicode hex": "2284" },
  { "Typeface name": "Symbol", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "8834", "Unicode hex": "2282" },
  { "Typeface name": "Symbol", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "8838", "Unicode hex": "2286" },
  { "Typeface name": "Symbol", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "8712", "Unicode hex": "2208" },
  { "Typeface name": "Symbol", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "8713", "Unicode hex": "2209" },
  { "Typeface name": "Symbol", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "8736", "Unicode hex": "2220" },
  { "Typeface name": "Symbol", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "8711", "Unicode hex": "2207" },
  { "Typeface name": "Symbol", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "174", "Unicode hex": "AE" },
  { "Typeface name": "Symbol", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "169", "Unicode hex": "A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "8482", "Unicode hex": "2122" },
  { "Typeface name": "Symbol", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "8719", "Unicode hex": "220F" },
  { "Typeface name": "Symbol", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "8730", "Unicode hex": "221A" },
  { "Typeface name": "Symbol", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "8901", "Unicode hex": "22C5" },
  { "Typeface name": "Symbol", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "172", "Unicode hex": "AC" },
  { "Typeface name": "Symbol", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "8743", "Unicode hex": "2227" },
  { "Typeface name": "Symbol", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "8744", "Unicode hex": "2228" },
  { "Typeface name": "Symbol", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "8660", "Unicode hex": "21D4" },
  { "Typeface name": "Symbol", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "8656", "Unicode hex": "21D0" },
  { "Typeface name": "Symbol", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "8657", "Unicode hex": "21D1" },
  { "Typeface name": "Symbol", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "8658", "Unicode hex": "21D2" },
  { "Typeface name": "Symbol", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "8659", "Unicode hex": "21D3" },
  { "Typeface name": "Symbol", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "9674", "Unicode hex": "25CA" },
  { "Typeface name": "Symbol", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "12296", "Unicode hex": "3008" },
  { "Typeface name": "Symbol", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "174", "Unicode hex": "AE" },
  { "Typeface name": "Symbol", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "169", "Unicode hex": "A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "8482", "Unicode hex": "2122" },
  { "Typeface name": "Symbol", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "8721", "Unicode hex": "2211" },
  { "Typeface name": "Symbol", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "9115", "Unicode hex": "239B" },
  { "Typeface name": "Symbol", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "9116", "Unicode hex": "239C" },
  { "Typeface name": "Symbol", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "9117", "Unicode hex": "239D" },
  { "Typeface name": "Symbol", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "9121", "Unicode hex": "23A1" },
  { "Typeface name": "Symbol", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "9122", "Unicode hex": "23A2" },
  { "Typeface name": "Symbol", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "9123", "Unicode hex": "23A3" },
  { "Typeface name": "Symbol", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "9127", "Unicode hex": "23A7" },
  { "Typeface name": "Symbol", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "9128", "Unicode hex": "23A8" },
  { "Typeface name": "Symbol", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "9129", "Unicode hex": "23A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "9130", "Unicode hex": "23AA" },
  { "Typeface name": "Symbol", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "63743", "Unicode hex": "F8FF" },
  { "Typeface name": "Symbol", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "12297", "Unicode hex": "3009" },
  { "Typeface name": "Symbol", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "8747", "Unicode hex": "222B" },
  { "Typeface name": "Symbol", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "8992", "Unicode hex": "2320" },
  { "Typeface name": "Symbol", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "9134", "Unicode hex": "23AE" },
  { "Typeface name": "Symbol", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "8993", "Unicode hex": "2321" },
  { "Typeface name": "Symbol", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "9118", "Unicode hex": "239E" },
  { "Typeface name": "Symbol", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "9119", "Unicode hex": "239F" },
  { "Typeface name": "Symbol", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "9120", "Unicode hex": "23A0" },
  { "Typeface name": "Symbol", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "9124", "Unicode hex": "23A4" },
  { "Typeface name": "Symbol", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "9125", "Unicode hex": "23A5" },
  { "Typeface name": "Symbol", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "9126", "Unicode hex": "23A6" },
  { "Typeface name": "Symbol", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "9131", "Unicode hex": "23AB" },
  { "Typeface name": "Symbol", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "9132", "Unicode hex": "23AC" },
  { "Typeface name": "Symbol", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "9133", "Unicode hex": "23AD" },
  { "Typeface name": "Webdings", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Webdings", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128375", "Unicode hex": "1F577" },
  { "Typeface name": "Webdings", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "128376", "Unicode hex": "1F578" },
  { "Typeface name": "Webdings", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "128370", "Unicode hex": "1F572" },
  { "Typeface name": "Webdings", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128374", "Unicode hex": "1F576" },
  { "Typeface name": "Webdings", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "127942", "Unicode hex": "1F3C6" },
  { "Typeface name": "Webdings", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "127894", "Unicode hex": "1F396" },
  { "Typeface name": "Webdings", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128391", "Unicode hex": "1F587" },
  { "Typeface name": "Webdings", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128488", "Unicode hex": "1F5E8" },
  { "Typeface name": "Webdings", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "128489", "Unicode hex": "1F5E9" },
  { "Typeface name": "Webdings", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128496", "Unicode hex": "1F5F0" },
  { "Typeface name": "Webdings", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128497", "Unicode hex": "1F5F1" },
  { "Typeface name": "Webdings", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "127798", "Unicode hex": "1F336" },
  { "Typeface name": "Webdings", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "127895", "Unicode hex": "1F397" },
  { "Typeface name": "Webdings", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128638", "Unicode hex": "1F67E" },
  { "Typeface name": "Webdings", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128636", "Unicode hex": "1F67C" },
  { "Typeface name": "Webdings", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128469", "Unicode hex": "1F5D5" },
  { "Typeface name": "Webdings", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128470", "Unicode hex": "1F5D6" },
  { "Typeface name": "Webdings", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128471", "Unicode hex": "1F5D7" },
  { "Typeface name": "Webdings", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "9204", "Unicode hex": "23F4" },
  { "Typeface name": "Webdings", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "9205", "Unicode hex": "23F5" },
  { "Typeface name": "Webdings", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "9206", "Unicode hex": "23F6" },
  { "Typeface name": "Webdings", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "9207", "Unicode hex": "23F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "9194", "Unicode hex": "23EA" },
  { "Typeface name": "Webdings", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "9193", "Unicode hex": "23E9" },
  { "Typeface name": "Webdings", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "9198", "Unicode hex": "23EE" },
  { "Typeface name": "Webdings", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "9197", "Unicode hex": "23ED" },
  { "Typeface name": "Webdings", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "9208", "Unicode hex": "23F8" },
  { "Typeface name": "Webdings", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "9209", "Unicode hex": "23F9" },
  { "Typeface name": "Webdings", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "9210", "Unicode hex": "23FA" },
  { "Typeface name": "Webdings", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "128474", "Unicode hex": "1F5DA" },
  { "Typeface name": "Webdings", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "128499", "Unicode hex": "1F5F3" },
  { "Typeface name": "Webdings", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128736", "Unicode hex": "1F6E0" },
  { "Typeface name": "Webdings", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "127959", "Unicode hex": "1F3D7" },
  { "Typeface name": "Webdings", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "127960", "Unicode hex": "1F3D8" },
  { "Typeface name": "Webdings", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "127961", "Unicode hex": "1F3D9" },
  { "Typeface name": "Webdings", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "127962", "Unicode hex": "1F3DA" },
  { "Typeface name": "Webdings", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "127964", "Unicode hex": "1F3DC" },
  { "Typeface name": "Webdings", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "127981", "Unicode hex": "1F3ED" },
  { "Typeface name": "Webdings", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "127963", "Unicode hex": "1F3DB" },
  { "Typeface name": "Webdings", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "127968", "Unicode hex": "1F3E0" },
  { "Typeface name": "Webdings", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "127958", "Unicode hex": "1F3D6" },
  { "Typeface name": "Webdings", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "127965", "Unicode hex": "1F3DD" },
  { "Typeface name": "Webdings", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128739", "Unicode hex": "1F6E3" },
  { "Typeface name": "Webdings", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "128269", "Unicode hex": "1F50D" },
  { "Typeface name": "Webdings", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "127956", "Unicode hex": "1F3D4" },
  { "Typeface name": "Webdings", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128065", "Unicode hex": "1F441" },
  { "Typeface name": "Webdings", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "128066", "Unicode hex": "1F442" },
  { "Typeface name": "Webdings", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "127966", "Unicode hex": "1F3DE" },
  { "Typeface name": "Webdings", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "127957", "Unicode hex": "1F3D5" },
  { "Typeface name": "Webdings", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "128740", "Unicode hex": "1F6E4" },
  { "Typeface name": "Webdings", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "127967", "Unicode hex": "1F3DF" },
  { "Typeface name": "Webdings", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "128755", "Unicode hex": "1F6F3" },
  { "Typeface name": "Webdings", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "128364", "Unicode hex": "1F56C" },
  { "Typeface name": "Webdings", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "128363", "Unicode hex": "1F56B" },
  { "Typeface name": "Webdings", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128360", "Unicode hex": "1F568" },
  { "Typeface name": "Webdings", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "128264", "Unicode hex": "1F508" },
  { "Typeface name": "Webdings", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "127892", "Unicode hex": "1F394" },
  { "Typeface name": "Webdings", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "127893", "Unicode hex": "1F395" },
  { "Typeface name": "Webdings", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "128492", "Unicode hex": "1F5EC" },
  { "Typeface name": "Webdings", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128637", "Unicode hex": "1F67D" },
  { "Typeface name": "Webdings", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "128493", "Unicode hex": "1F5ED" },
  { "Typeface name": "Webdings", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "128490", "Unicode hex": "1F5EA" },
  { "Typeface name": "Webdings", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "128491", "Unicode hex": "1F5EB" },
  { "Typeface name": "Webdings", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "11156", "Unicode hex": "2B94" },
  { "Typeface name": "Webdings", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "10004", "Unicode hex": "2714" },
  { "Typeface name": "Webdings", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "128690", "Unicode hex": "1F6B2" },
  { "Typeface name": "Webdings", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "11036", "Unicode hex": "2B1C" },
  { "Typeface name": "Webdings", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "128737", "Unicode hex": "1F6E1" },
  { "Typeface name": "Webdings", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "128230", "Unicode hex": "1F4E6" },
  { "Typeface name": "Webdings", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "128753", "Unicode hex": "1F6F1" },
  { "Typeface name": "Webdings", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "11035", "Unicode hex": "2B1B" },
  { "Typeface name": "Webdings", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "128657", "Unicode hex": "1F691" },
  { "Typeface name": "Webdings", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "128712", "Unicode hex": "1F6C8" },
  { "Typeface name": "Webdings", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "128745", "Unicode hex": "1F6E9" },
  { "Typeface name": "Webdings", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "128752", "Unicode hex": "1F6F0" },
  { "Typeface name": "Webdings", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "128968", "Unicode hex": "1F7C8" },
  { "Typeface name": "Webdings", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "128372", "Unicode hex": "1F574" },
  { "Typeface name": "Webdings", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "11044", "Unicode hex": "2B24" },
  { "Typeface name": "Webdings", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "128741", "Unicode hex": "1F6E5" },
  { "Typeface name": "Webdings", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "128660", "Unicode hex": "1F694" },
  { "Typeface name": "Webdings", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "128472", "Unicode hex": "1F5D8" },
  { "Typeface name": "Webdings", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "128473", "Unicode hex": "1F5D9" },
  { "Typeface name": "Webdings", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "10067", "Unicode hex": "2753" },
  { "Typeface name": "Webdings", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "128754", "Unicode hex": "1F6F2" },
  { "Typeface name": "Webdings", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "128647", "Unicode hex": "1F687" },
  { "Typeface name": "Webdings", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "128653", "Unicode hex": "1F68D" },
  { "Typeface name": "Webdings", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "9971", "Unicode hex": "26F3" },
  { "Typeface name": "Webdings", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "10680", "Unicode hex": "29B8" },
  { "Typeface name": "Webdings", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "8854", "Unicode hex": "2296" },
  { "Typeface name": "Webdings", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "128685", "Unicode hex": "1F6AD" },
  { "Typeface name": "Webdings", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "128494", "Unicode hex": "1F5EE" },
  { "Typeface name": "Webdings", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "9168", "Unicode hex": "23D0" },
  { "Typeface name": "Webdings", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128495", "Unicode hex": "1F5EF" },
  { "Typeface name": "Webdings", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128498", "Unicode hex": "1F5F2" },
  { "Typeface name": "Webdings", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "128697", "Unicode hex": "1F6B9" },
  { "Typeface name": "Webdings", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "128698", "Unicode hex": "1F6BA" },
  { "Typeface name": "Webdings", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "128713", "Unicode hex": "1F6C9" },
  { "Typeface name": "Webdings", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "128714", "Unicode hex": "1F6CA" },
  { "Typeface name": "Webdings", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "128700", "Unicode hex": "1F6BC" },
  { "Typeface name": "Webdings", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "128125", "Unicode hex": "1F47D" },
  { "Typeface name": "Webdings", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "127947", "Unicode hex": "1F3CB" },
  { "Typeface name": "Webdings", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "9975", "Unicode hex": "26F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "127938", "Unicode hex": "1F3C2" },
  { "Typeface name": "Webdings", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "127948", "Unicode hex": "1F3CC" },
  { "Typeface name": "Webdings", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "127946", "Unicode hex": "1F3CA" },
  { "Typeface name": "Webdings", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "127940", "Unicode hex": "1F3C4" },
  { "Typeface name": "Webdings", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "127949", "Unicode hex": "1F3CD" },
  { "Typeface name": "Webdings", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "127950", "Unicode hex": "1F3CE" },
  { "Typeface name": "Webdings", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "128664", "Unicode hex": "1F698" },
  { "Typeface name": "Webdings", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "128480", "Unicode hex": "1F5E0" },
  { "Typeface name": "Webdings", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "128738", "Unicode hex": "1F6E2" },
  { "Typeface name": "Webdings", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "128176", "Unicode hex": "1F4B0" },
  { "Typeface name": "Webdings", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "127991", "Unicode hex": "1F3F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "128179", "Unicode hex": "1F4B3" },
  { "Typeface name": "Webdings", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "128106", "Unicode hex": "1F46A" },
  { "Typeface name": "Webdings", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "128481", "Unicode hex": "1F5E1" },
  { "Typeface name": "Webdings", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128482", "Unicode hex": "1F5E2" },
  { "Typeface name": "Webdings", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "128483", "Unicode hex": "1F5E3" },
  { "Typeface name": "Webdings", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "10031", "Unicode hex": "272F" },
  { "Typeface name": "Webdings", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "128388", "Unicode hex": "1F584" },
  { "Typeface name": "Webdings", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128389", "Unicode hex": "1F585" },
  { "Typeface name": "Webdings", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128387", "Unicode hex": "1F583" },
  { "Typeface name": "Webdings", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128390", "Unicode hex": "1F586" },
  { "Typeface name": "Webdings", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "128441", "Unicode hex": "1F5B9" },
  { "Typeface name": "Webdings", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "128442", "Unicode hex": "1F5BA" },
  { "Typeface name": "Webdings", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "128443", "Unicode hex": "1F5BB" },
  { "Typeface name": "Webdings", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "128373", "Unicode hex": "1F575" },
  { "Typeface name": "Webdings", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "128368", "Unicode hex": "1F570" },
  { "Typeface name": "Webdings", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "128445", "Unicode hex": "1F5BD" },
  { "Typeface name": "Webdings", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "128446", "Unicode hex": "1F5BE" },
  { "Typeface name": "Webdings", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128203", "Unicode hex": "1F4CB" },
  { "Typeface name": "Webdings", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128466", "Unicode hex": "1F5D2" },
  { "Typeface name": "Webdings", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128467", "Unicode hex": "1F5D3" },
  { "Typeface name": "Webdings", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "128366", "Unicode hex": "1F56E" },
  { "Typeface name": "Webdings", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "128218", "Unicode hex": "1F4DA" },
  { "Typeface name": "Webdings", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128478", "Unicode hex": "1F5DE" },
  { "Typeface name": "Webdings", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128479", "Unicode hex": "1F5DF" },
  { "Typeface name": "Webdings", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "128451", "Unicode hex": "1F5C3" },
  { "Typeface name": "Webdings", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128450", "Unicode hex": "1F5C2" },
  { "Typeface name": "Webdings", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "128444", "Unicode hex": "1F5BC" },
  { "Typeface name": "Webdings", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "127917", "Unicode hex": "1F3AD" },
  { "Typeface name": "Webdings", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "127900", "Unicode hex": "1F39C" },
  { "Typeface name": "Webdings", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "127896", "Unicode hex": "1F398" },
  { "Typeface name": "Webdings", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "127897", "Unicode hex": "1F399" },
  { "Typeface name": "Webdings", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "127911", "Unicode hex": "1F3A7" },
  { "Typeface name": "Webdings", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "128191", "Unicode hex": "1F4BF" },
  { "Typeface name": "Webdings", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "127902", "Unicode hex": "1F39E" },
  { "Typeface name": "Webdings", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "128247", "Unicode hex": "1F4F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "127903", "Unicode hex": "1F39F" },
  { "Typeface name": "Webdings", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "127916", "Unicode hex": "1F3AC" },
  { "Typeface name": "Webdings", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "128253", "Unicode hex": "1F4FD" },
  { "Typeface name": "Webdings", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128249", "Unicode hex": "1F4F9" },
  { "Typeface name": "Webdings", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "128254", "Unicode hex": "1F4FE" },
  { "Typeface name": "Webdings", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "128251", "Unicode hex": "1F4FB" },
  { "Typeface name": "Webdings", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "127898", "Unicode hex": "1F39A" },
  { "Typeface name": "Webdings", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "127899", "Unicode hex": "1F39B" },
  { "Typeface name": "Webdings", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "128250", "Unicode hex": "1F4FA" },
  { "Typeface name": "Webdings", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "128187", "Unicode hex": "1F4BB" },
  { "Typeface name": "Webdings", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "128421", "Unicode hex": "1F5A5" },
  { "Typeface name": "Webdings", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "128422", "Unicode hex": "1F5A6" },
  { "Typeface name": "Webdings", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "128423", "Unicode hex": "1F5A7" },
  { "Typeface name": "Webdings", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "128377", "Unicode hex": "1F579" },
  { "Typeface name": "Webdings", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "127918", "Unicode hex": "1F3AE" },
  { "Typeface name": "Webdings", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "128379", "Unicode hex": "1F57B" },
  { "Typeface name": "Webdings", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "128380", "Unicode hex": "1F57C" },
  { "Typeface name": "Webdings", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "128223", "Unicode hex": "1F4DF" },
  { "Typeface name": "Webdings", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "128385", "Unicode hex": "1F581" },
  { "Typeface name": "Webdings", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "128384", "Unicode hex": "1F580" },
  { "Typeface name": "Webdings", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "128424", "Unicode hex": "1F5A8" },
  { "Typeface name": "Webdings", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128425", "Unicode hex": "1F5A9" },
  { "Typeface name": "Webdings", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128447", "Unicode hex": "1F5BF" },
  { "Typeface name": "Webdings", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128426", "Unicode hex": "1F5AA" },
  { "Typeface name": "Webdings", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128476", "Unicode hex": "1F5DC" },
  { "Typeface name": "Webdings", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128274", "Unicode hex": "1F512" },
  { "Typeface name": "Webdings", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128275", "Unicode hex": "1F513" },
  { "Typeface name": "Webdings", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128477", "Unicode hex": "1F5DD" },
  { "Typeface name": "Webdings", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128229", "Unicode hex": "1F4E5" },
  { "Typeface name": "Webdings", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128228", "Unicode hex": "1F4E4" },
  { "Typeface name": "Webdings", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128371", "Unicode hex": "1F573" },
  { "Typeface name": "Webdings", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "127779", "Unicode hex": "1F323" },
  { "Typeface name": "Webdings", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "127780", "Unicode hex": "1F324" },
  { "Typeface name": "Webdings", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "127781", "Unicode hex": "1F325" },
  { "Typeface name": "Webdings", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "127782", "Unicode hex": "1F326" },
  { "Typeface name": "Webdings", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "9729", "Unicode hex": "2601" },
  { "Typeface name": "Webdings", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "127784", "Unicode hex": "1F328" },
  { "Typeface name": "Webdings", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "127783", "Unicode hex": "1F327" },
  { "Typeface name": "Webdings", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "127785", "Unicode hex": "1F329" },
  { "Typeface name": "Webdings", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "127786", "Unicode hex": "1F32A" },
  { "Typeface name": "Webdings", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "127788", "Unicode hex": "1F32C" },
  { "Typeface name": "Webdings", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "127787", "Unicode hex": "1F32B" },
  { "Typeface name": "Webdings", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "127772", "Unicode hex": "1F31C" },
  { "Typeface name": "Webdings", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "127777", "Unicode hex": "1F321" },
  { "Typeface name": "Webdings", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "128715", "Unicode hex": "1F6CB" },
  { "Typeface name": "Webdings", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "128719", "Unicode hex": "1F6CF" },
  { "Typeface name": "Webdings", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "127869", "Unicode hex": "1F37D" },
  { "Typeface name": "Webdings", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "127864", "Unicode hex": "1F378" },
  { "Typeface name": "Webdings", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "128718", "Unicode hex": "1F6CE" },
  { "Typeface name": "Webdings", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "128717", "Unicode hex": "1F6CD" },
  { "Typeface name": "Webdings", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "9413", "Unicode hex": "24C5" },
  { "Typeface name": "Webdings", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "9855", "Unicode hex": "267F" },
  { "Typeface name": "Webdings", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "128710", "Unicode hex": "1F6C6" },
  { "Typeface name": "Webdings", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "128392", "Unicode hex": "1F588" },
  { "Typeface name": "Webdings", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "127891", "Unicode hex": "1F393" },
  { "Typeface name": "Webdings", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "128484", "Unicode hex": "1F5E4" },
  { "Typeface name": "Webdings", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "128485", "Unicode hex": "1F5E5" },
  { "Typeface name": "Webdings", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "128486", "Unicode hex": "1F5E6" },
  { "Typeface name": "Webdings", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "128487", "Unicode hex": "1F5E7" },
  { "Typeface name": "Webdings", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "128746", "Unicode hex": "1F6EA" },
  { "Typeface name": "Webdings", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "128063", "Unicode hex": "1F43F" },
  { "Typeface name": "Webdings", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "128038", "Unicode hex": "1F426" },
  { "Typeface name": "Webdings", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "128031", "Unicode hex": "1F41F" },
  { "Typeface name": "Webdings", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "128021", "Unicode hex": "1F415" },
  { "Typeface name": "Webdings", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "128008", "Unicode hex": "1F408" },
  { "Typeface name": "Webdings", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "128620", "Unicode hex": "1F66C" },
  { "Typeface name": "Webdings", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "128622", "Unicode hex": "1F66E" },
  { "Typeface name": "Webdings", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "128621", "Unicode hex": "1F66D" },
  { "Typeface name": "Webdings", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "128623", "Unicode hex": "1F66F" },
  { "Typeface name": "Webdings", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "128506", "Unicode hex": "1F5FA" },
  { "Typeface name": "Webdings", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "127757", "Unicode hex": "1F30D" },
  { "Typeface name": "Webdings", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "127759", "Unicode hex": "1F30F" },
  { "Typeface name": "Webdings", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "127758", "Unicode hex": "1F30E" },
  { "Typeface name": "Webdings", "Dingbat dec": "255", "Dingbat hex": "FF", "Unicode dec": "128330", "Unicode hex": "1F54A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Wingdings", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128393", "Unicode hex": "1F589" },
  { "Typeface name": "Wingdings", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "9986", "Unicode hex": "2702" },
  { "Typeface name": "Wingdings", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "9985", "Unicode hex": "2701" },
  { "Typeface name": "Wingdings", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128083", "Unicode hex": "1F453" },
  { "Typeface name": "Wingdings", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "128365", "Unicode hex": "1F56D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "128366", "Unicode hex": "1F56E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128367", "Unicode hex": "1F56F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128383", "Unicode hex": "1F57F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "9990", "Unicode hex": "2706" },
  { "Typeface name": "Wingdings", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128386", "Unicode hex": "1F582" },
  { "Typeface name": "Wingdings", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128387", "Unicode hex": "1F583" },
  { "Typeface name": "Wingdings", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "128234", "Unicode hex": "1F4EA" },
  { "Typeface name": "Wingdings", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "128235", "Unicode hex": "1F4EB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128236", "Unicode hex": "1F4EC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128237", "Unicode hex": "1F4ED" },
  { "Typeface name": "Wingdings", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128448", "Unicode hex": "1F5C0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128449", "Unicode hex": "1F5C1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128462", "Unicode hex": "1F5CE" },
  { "Typeface name": "Wingdings", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "128463", "Unicode hex": "1F5CF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "128464", "Unicode hex": "1F5D0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "128452", "Unicode hex": "1F5C4" },
  { "Typeface name": "Wingdings", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "8987", "Unicode hex": "231B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "128430", "Unicode hex": "1F5AE" },
  { "Typeface name": "Wingdings", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "128432", "Unicode hex": "1F5B0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "128434", "Unicode hex": "1F5B2" },
  { "Typeface name": "Wingdings", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "128435", "Unicode hex": "1F5B3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "128436", "Unicode hex": "1F5B4" },
  { "Typeface name": "Wingdings", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "128427", "Unicode hex": "1F5AB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "128428", "Unicode hex": "1F5AC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "9991", "Unicode hex": "2707" },
  { "Typeface name": "Wingdings", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "9997", "Unicode hex": "270D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128398", "Unicode hex": "1F58E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "9996", "Unicode hex": "270C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "128399", "Unicode hex": "1F58F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "128077", "Unicode hex": "1F44D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "128078", "Unicode hex": "1F44E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "9756", "Unicode hex": "261C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "9758", "Unicode hex": "261E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "9757", "Unicode hex": "261D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "9759", "Unicode hex": "261F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "128400", "Unicode hex": "1F590" },
  { "Typeface name": "Wingdings", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "9786", "Unicode hex": "263A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128528", "Unicode hex": "1F610" },
  { "Typeface name": "Wingdings", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "9785", "Unicode hex": "2639" },
  { "Typeface name": "Wingdings", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "128163", "Unicode hex": "1F4A3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128369", "Unicode hex": "1F571" },
  { "Typeface name": "Wingdings", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "127987", "Unicode hex": "1F3F3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "127985", "Unicode hex": "1F3F1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "9992", "Unicode hex": "2708" },
  { "Typeface name": "Wingdings", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9788", "Unicode hex": "263C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "127778", "Unicode hex": "1F322" },
  { "Typeface name": "Wingdings", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "10052", "Unicode hex": "2744" },
  { "Typeface name": "Wingdings", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "128326", "Unicode hex": "1F546" },
  { "Typeface name": "Wingdings", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "10014", "Unicode hex": "271E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128328", "Unicode hex": "1F548" },
  { "Typeface name": "Wingdings", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "10016", "Unicode hex": "2720" },
  { "Typeface name": "Wingdings", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "10017", "Unicode hex": "2721" },
  { "Typeface name": "Wingdings", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "9770", "Unicode hex": "262A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "9775", "Unicode hex": "262F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128329", "Unicode hex": "1F549" },
  { "Typeface name": "Wingdings", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "9784", "Unicode hex": "2638" },
  { "Typeface name": "Wingdings", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "9800", "Unicode hex": "2648" },
  { "Typeface name": "Wingdings", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "9801", "Unicode hex": "2649" },
  { "Typeface name": "Wingdings", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "9802", "Unicode hex": "264A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "9803", "Unicode hex": "264B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "9804", "Unicode hex": "264C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "9805", "Unicode hex": "264D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "9806", "Unicode hex": "264E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "9807", "Unicode hex": "264F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "9808", "Unicode hex": "2650" },
  { "Typeface name": "Wingdings", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "9809", "Unicode hex": "2651" },
  { "Typeface name": "Wingdings", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "9810", "Unicode hex": "2652" },
  { "Typeface name": "Wingdings", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "9811", "Unicode hex": "2653" },
  { "Typeface name": "Wingdings", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "128624", "Unicode hex": "1F670" },
  { "Typeface name": "Wingdings", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "128629", "Unicode hex": "1F675" },
  { "Typeface name": "Wingdings", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "9899", "Unicode hex": "26AB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "128318", "Unicode hex": "1F53E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "9724", "Unicode hex": "25FC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "128911", "Unicode hex": "1F78F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "128912", "Unicode hex": "1F790" },
  { "Typeface name": "Wingdings", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "10065", "Unicode hex": "2751" },
  { "Typeface name": "Wingdings", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "10066", "Unicode hex": "2752" },
  { "Typeface name": "Wingdings", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "128927", "Unicode hex": "1F79F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "10731", "Unicode hex": "29EB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "9670", "Unicode hex": "25C6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "10070", "Unicode hex": "2756" },
  { "Typeface name": "Wingdings", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "11049", "Unicode hex": "2B29" },
  { "Typeface name": "Wingdings", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "8999", "Unicode hex": "2327" },
  { "Typeface name": "Wingdings", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "11193", "Unicode hex": "2BB9" },
  { "Typeface name": "Wingdings", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "8984", "Unicode hex": "2318" },
  { "Typeface name": "Wingdings", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "127989", "Unicode hex": "1F3F5" },
  { "Typeface name": "Wingdings", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "127990", "Unicode hex": "1F3F6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128630", "Unicode hex": "1F676" },
  { "Typeface name": "Wingdings", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128631", "Unicode hex": "1F677" },
  { "Typeface name": "Wingdings", "Dingbat dec": "127", "Dingbat hex": "7F", "Unicode dec": "9647", "Unicode hex": "25AF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "127243", "Unicode hex": "1F10B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "10112", "Unicode hex": "2780" },
  { "Typeface name": "Wingdings", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "10113", "Unicode hex": "2781" },
  { "Typeface name": "Wingdings", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "10114", "Unicode hex": "2782" },
  { "Typeface name": "Wingdings", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "10115", "Unicode hex": "2783" },
  { "Typeface name": "Wingdings", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "10116", "Unicode hex": "2784" },
  { "Typeface name": "Wingdings", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "10117", "Unicode hex": "2785" },
  { "Typeface name": "Wingdings", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "10118", "Unicode hex": "2786" },
  { "Typeface name": "Wingdings", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "10119", "Unicode hex": "2787" },
  { "Typeface name": "Wingdings", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "10120", "Unicode hex": "2788" },
  { "Typeface name": "Wingdings", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "10121", "Unicode hex": "2789" },
  { "Typeface name": "Wingdings", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "127244", "Unicode hex": "1F10C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "10122", "Unicode hex": "278A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "10123", "Unicode hex": "278B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "10124", "Unicode hex": "278C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "10125", "Unicode hex": "278D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "10126", "Unicode hex": "278E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "10127", "Unicode hex": "278F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "10128", "Unicode hex": "2790" },
  { "Typeface name": "Wingdings", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "10129", "Unicode hex": "2791" },
  { "Typeface name": "Wingdings", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "10130", "Unicode hex": "2792" },
  { "Typeface name": "Wingdings", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "10131", "Unicode hex": "2793" },
  { "Typeface name": "Wingdings", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128610", "Unicode hex": "1F662" },
  { "Typeface name": "Wingdings", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "128608", "Unicode hex": "1F660" },
  { "Typeface name": "Wingdings", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "128609", "Unicode hex": "1F661" },
  { "Typeface name": "Wingdings", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "128611", "Unicode hex": "1F663" },
  { "Typeface name": "Wingdings", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128606", "Unicode hex": "1F65E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128604", "Unicode hex": "1F65C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128605", "Unicode hex": "1F65D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "128607", "Unicode hex": "1F65F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "8729", "Unicode hex": "2219" },
  { "Typeface name": "Wingdings", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "8226", "Unicode hex": "2022" },
  { "Typeface name": "Wingdings", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "11037", "Unicode hex": "2B1D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "11096", "Unicode hex": "2B58" },
  { "Typeface name": "Wingdings", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "128902", "Unicode hex": "1F786" },
  { "Typeface name": "Wingdings", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "128904", "Unicode hex": "1F788" },
  { "Typeface name": "Wingdings", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128906", "Unicode hex": "1F78A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128907", "Unicode hex": "1F78B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128319", "Unicode hex": "1F53F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "9642", "Unicode hex": "25AA" },
  { "Typeface name": "Wingdings", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "128910", "Unicode hex": "1F78E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128961", "Unicode hex": "1F7C1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128965", "Unicode hex": "1F7C5" },
  { "Typeface name": "Wingdings", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "9733", "Unicode hex": "2605" },
  { "Typeface name": "Wingdings", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128971", "Unicode hex": "1F7CB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "128975", "Unicode hex": "1F7CF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "128979", "Unicode hex": "1F7D3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "128977", "Unicode hex": "1F7D1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "11216", "Unicode hex": "2BD0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "8982", "Unicode hex": "2316" },
  { "Typeface name": "Wingdings", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "11214", "Unicode hex": "2BCE" },
  { "Typeface name": "Wingdings", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "11215", "Unicode hex": "2BCF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "11217", "Unicode hex": "2BD1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "10026", "Unicode hex": "272A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "10032", "Unicode hex": "2730" },
  { "Typeface name": "Wingdings", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "128336", "Unicode hex": "1F550" },
  { "Typeface name": "Wingdings", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "128337", "Unicode hex": "1F551" },
  { "Typeface name": "Wingdings", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128338", "Unicode hex": "1F552" },
  { "Typeface name": "Wingdings", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "128339", "Unicode hex": "1F553" },
  { "Typeface name": "Wingdings", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "128340", "Unicode hex": "1F554" },
  { "Typeface name": "Wingdings", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "128341", "Unicode hex": "1F555" },
  { "Typeface name": "Wingdings", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "128342", "Unicode hex": "1F556" },
  { "Typeface name": "Wingdings", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "128343", "Unicode hex": "1F557" },
  { "Typeface name": "Wingdings", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "128344", "Unicode hex": "1F558" },
  { "Typeface name": "Wingdings", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "128345", "Unicode hex": "1F559" },
  { "Typeface name": "Wingdings", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "128346", "Unicode hex": "1F55A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "128347", "Unicode hex": "1F55B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "11184", "Unicode hex": "2BB0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "11185", "Unicode hex": "2BB1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "11186", "Unicode hex": "2BB2" },
  { "Typeface name": "Wingdings", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "11187", "Unicode hex": "2BB3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "11188", "Unicode hex": "2BB4" },
  { "Typeface name": "Wingdings", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "11189", "Unicode hex": "2BB5" },
  { "Typeface name": "Wingdings", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "11190", "Unicode hex": "2BB6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "11191", "Unicode hex": "2BB7" },
  { "Typeface name": "Wingdings", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128618", "Unicode hex": "1F66A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128619", "Unicode hex": "1F66B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128597", "Unicode hex": "1F655" },
  { "Typeface name": "Wingdings", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128596", "Unicode hex": "1F654" },
  { "Typeface name": "Wingdings", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128599", "Unicode hex": "1F657" },
  { "Typeface name": "Wingdings", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128598", "Unicode hex": "1F656" },
  { "Typeface name": "Wingdings", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128592", "Unicode hex": "1F650" },
  { "Typeface name": "Wingdings", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128593", "Unicode hex": "1F651" },
  { "Typeface name": "Wingdings", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128594", "Unicode hex": "1F652" },
  { "Typeface name": "Wingdings", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128595", "Unicode hex": "1F653" },
  { "Typeface name": "Wingdings", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "9003", "Unicode hex": "232B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "8998", "Unicode hex": "2326" },
  { "Typeface name": "Wingdings", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "11160", "Unicode hex": "2B98" },
  { "Typeface name": "Wingdings", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "11162", "Unicode hex": "2B9A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "11161", "Unicode hex": "2B99" },
  { "Typeface name": "Wingdings", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "11163", "Unicode hex": "2B9B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "11144", "Unicode hex": "2B88" },
  { "Typeface name": "Wingdings", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "11146", "Unicode hex": "2B8A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "11145", "Unicode hex": "2B89" },
  { "Typeface name": "Wingdings", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "11147", "Unicode hex": "2B8B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "129128", "Unicode hex": "1F868" },
  { "Typeface name": "Wingdings", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "129130", "Unicode hex": "1F86A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "129129", "Unicode hex": "1F869" },
  { "Typeface name": "Wingdings", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "129131", "Unicode hex": "1F86B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "129132", "Unicode hex": "1F86C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "129133", "Unicode hex": "1F86D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "129135", "Unicode hex": "1F86F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "129134", "Unicode hex": "1F86E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "129144", "Unicode hex": "1F878" },
  { "Typeface name": "Wingdings", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "129146", "Unicode hex": "1F87A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "129145", "Unicode hex": "1F879" },
  { "Typeface name": "Wingdings", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "129147", "Unicode hex": "1F87B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "129148", "Unicode hex": "1F87C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "129149", "Unicode hex": "1F87D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "129151", "Unicode hex": "1F87F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "129150", "Unicode hex": "1F87E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "8678", "Unicode hex": "21E6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "8680", "Unicode hex": "21E8" },
  { "Typeface name": "Wingdings", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "8679", "Unicode hex": "21E7" },
  { "Typeface name": "Wingdings", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "8681", "Unicode hex": "21E9" },
  { "Typeface name": "Wingdings", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "11012", "Unicode hex": "2B04" },
  { "Typeface name": "Wingdings", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "8691", "Unicode hex": "21F3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "11009", "Unicode hex": "2B01" },
  { "Typeface name": "Wingdings", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "11008", "Unicode hex": "2B00" },
  { "Typeface name": "Wingdings", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "11011", "Unicode hex": "2B03" },
  { "Typeface name": "Wingdings", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "11010", "Unicode hex": "2B02" },
  { "Typeface name": "Wingdings", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "129196", "Unicode hex": "1F8AC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "129197", "Unicode hex": "1F8AD" },
  { "Typeface name": "Wingdings", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "128502", "Unicode hex": "1F5F6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "10003", "Unicode hex": "2713" },
  { "Typeface name": "Wingdings", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "128503", "Unicode hex": "1F5F7" },
  { "Typeface name": "Wingdings", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "128505", "Unicode hex": "1F5F9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128394", "Unicode hex": "1F58A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "128395", "Unicode hex": "1F58B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "128396", "Unicode hex": "1F58C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128397", "Unicode hex": "1F58D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "9988", "Unicode hex": "2704" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "9984", "Unicode hex": "2700" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128382", "Unicode hex": "1F57E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128381", "Unicode hex": "1F57D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "128453", "Unicode hex": "1F5C5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128454", "Unicode hex": "1F5C6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128455", "Unicode hex": "1F5C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "128456", "Unicode hex": "1F5C8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "128457", "Unicode hex": "1F5C9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128458", "Unicode hex": "1F5CA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128459", "Unicode hex": "1F5CB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128460", "Unicode hex": "1F5CC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128461", "Unicode hex": "1F5CD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128203", "Unicode hex": "1F4CB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "128465", "Unicode hex": "1F5D1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "128468", "Unicode hex": "1F5D4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "128437", "Unicode hex": "1F5B5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "128438", "Unicode hex": "1F5B6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "128439", "Unicode hex": "1F5B7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "128440", "Unicode hex": "1F5B8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "128429", "Unicode hex": "1F5AD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "128431", "Unicode hex": "1F5AF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "128433", "Unicode hex": "1F5B1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "128402", "Unicode hex": "1F592" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "128403", "Unicode hex": "1F593" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "128408", "Unicode hex": "1F598" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "128409", "Unicode hex": "1F599" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128410", "Unicode hex": "1F59A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "128411", "Unicode hex": "1F59B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "128072", "Unicode hex": "1F448" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "128073", "Unicode hex": "1F449" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "128412", "Unicode hex": "1F59C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "128413", "Unicode hex": "1F59D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "128414", "Unicode hex": "1F59E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "128415", "Unicode hex": "1F59F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "128416", "Unicode hex": "1F5A0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "128417", "Unicode hex": "1F5A1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "128070", "Unicode hex": "1F446" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128071", "Unicode hex": "1F447" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "128418", "Unicode hex": "1F5A2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "128419", "Unicode hex": "1F5A3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128401", "Unicode hex": "1F591" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "128500", "Unicode hex": "1F5F4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "128504", "Unicode hex": "1F5F8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "128501", "Unicode hex": "1F5F5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9745", "Unicode hex": "2611" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "11197", "Unicode hex": "2BBD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "9746", "Unicode hex": "2612" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "11198", "Unicode hex": "2BBE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "11199", "Unicode hex": "2BBF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128711", "Unicode hex": "1F6C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "10680", "Unicode hex": "29B8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "128625", "Unicode hex": "1F671" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "128628", "Unicode hex": "1F674" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "128626", "Unicode hex": "1F672" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128627", "Unicode hex": "1F673" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "8253", "Unicode hex": "203D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "128633", "Unicode hex": "1F679" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "128634", "Unicode hex": "1F67A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "128635", "Unicode hex": "1F67B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "128614", "Unicode hex": "1F666" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "128612", "Unicode hex": "1F664" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "128613", "Unicode hex": "1F665" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "128615", "Unicode hex": "1F667" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "128602", "Unicode hex": "1F65A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "128600", "Unicode hex": "1F658" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "128601", "Unicode hex": "1F659" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "128603", "Unicode hex": "1F65B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "9450", "Unicode hex": "24EA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "9312", "Unicode hex": "2460" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "9313", "Unicode hex": "2461" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "9314", "Unicode hex": "2462" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "9315", "Unicode hex": "2463" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "9316", "Unicode hex": "2464" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "9317", "Unicode hex": "2465" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "9318", "Unicode hex": "2466" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "9319", "Unicode hex": "2467" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "9320", "Unicode hex": "2468" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "9321", "Unicode hex": "2469" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "9471", "Unicode hex": "24FF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "10102", "Unicode hex": "2776" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "10103", "Unicode hex": "2777" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "10104", "Unicode hex": "2778" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "10105", "Unicode hex": "2779" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "10106", "Unicode hex": "277A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "10107", "Unicode hex": "277B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "10108", "Unicode hex": "277C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "10109", "Unicode hex": "277D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "10110", "Unicode hex": "277E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "10111", "Unicode hex": "277F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "9737", "Unicode hex": "2609" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "127765", "Unicode hex": "1F315" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "9789", "Unicode hex": "263D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "9790", "Unicode hex": "263E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "11839", "Unicode hex": "2E3F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "10013", "Unicode hex": "271D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "128327", "Unicode hex": "1F547" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "128348", "Unicode hex": "1F55C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "128349", "Unicode hex": "1F55D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "128350", "Unicode hex": "1F55E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "128351", "Unicode hex": "1F55F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "128352", "Unicode hex": "1F560" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "128353", "Unicode hex": "1F561" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "128354", "Unicode hex": "1F562" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "128355", "Unicode hex": "1F563" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "128356", "Unicode hex": "1F564" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "128357", "Unicode hex": "1F565" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "128358", "Unicode hex": "1F566" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "128359", "Unicode hex": "1F567" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "128616", "Unicode hex": "1F668" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "128617", "Unicode hex": "1F669" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "8901", "Unicode hex": "22C5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128900", "Unicode hex": "1F784" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "10625", "Unicode hex": "2981" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "9679", "Unicode hex": "25CF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "9675", "Unicode hex": "25CB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128901", "Unicode hex": "1F785" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128903", "Unicode hex": "1F787" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128905", "Unicode hex": "1F789" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "8857", "Unicode hex": "2299" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "10687", "Unicode hex": "29BF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "128908", "Unicode hex": "1F78C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "128909", "Unicode hex": "1F78D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "9726", "Unicode hex": "25FE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "9632", "Unicode hex": "25A0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "9633", "Unicode hex": "25A1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128913", "Unicode hex": "1F791" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128914", "Unicode hex": "1F792" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128915", "Unicode hex": "1F793" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "128916", "Unicode hex": "1F794" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "9635", "Unicode hex": "25A3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128917", "Unicode hex": "1F795" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128918", "Unicode hex": "1F796" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "128919", "Unicode hex": "1F797" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128920", "Unicode hex": "1F798" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "11049", "Unicode hex": "2B29" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "11045", "Unicode hex": "2B25" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "9671", "Unicode hex": "25C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "128922", "Unicode hex": "1F79A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "9672", "Unicode hex": "25C8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "128923", "Unicode hex": "1F79B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "128924", "Unicode hex": "1F79C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "128925", "Unicode hex": "1F79D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "128926", "Unicode hex": "1F79E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "11050", "Unicode hex": "2B2A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "11047", "Unicode hex": "2B27" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "9674", "Unicode hex": "25CA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128928", "Unicode hex": "1F7A0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "9686", "Unicode hex": "25D6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "9687", "Unicode hex": "25D7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "11210", "Unicode hex": "2BCA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "11211", "Unicode hex": "2BCB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "11200", "Unicode hex": "2BC0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "11201", "Unicode hex": "2BC1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "11039", "Unicode hex": "2B1F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "11202", "Unicode hex": "2BC2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "11043", "Unicode hex": "2B23" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "11042", "Unicode hex": "2B22" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "11203", "Unicode hex": "2BC3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "11204", "Unicode hex": "2BC4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "128929", "Unicode hex": "1F7A1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "128930", "Unicode hex": "1F7A2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "128931", "Unicode hex": "1F7A3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "128932", "Unicode hex": "1F7A4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "128933", "Unicode hex": "1F7A5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128934", "Unicode hex": "1F7A6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128935", "Unicode hex": "1F7A7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128936", "Unicode hex": "1F7A8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128937", "Unicode hex": "1F7A9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128938", "Unicode hex": "1F7AA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128939", "Unicode hex": "1F7AB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128940", "Unicode hex": "1F7AC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128941", "Unicode hex": "1F7AD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128942", "Unicode hex": "1F7AE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128943", "Unicode hex": "1F7AF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "128944", "Unicode hex": "1F7B0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "128945", "Unicode hex": "1F7B1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "128946", "Unicode hex": "1F7B2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "128947", "Unicode hex": "1F7B3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "128948", "Unicode hex": "1F7B4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "128949", "Unicode hex": "1F7B5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "128950", "Unicode hex": "1F7B6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "128951", "Unicode hex": "1F7B7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "128952", "Unicode hex": "1F7B8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "128953", "Unicode hex": "1F7B9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "128954", "Unicode hex": "1F7BA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "128955", "Unicode hex": "1F7BB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "128956", "Unicode hex": "1F7BC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "128957", "Unicode hex": "1F7BD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "128958", "Unicode hex": "1F7BE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "128959", "Unicode hex": "1F7BF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "128960", "Unicode hex": "1F7C0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "128962", "Unicode hex": "1F7C2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "128964", "Unicode hex": "1F7C4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "128966", "Unicode hex": "1F7C6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "128969", "Unicode hex": "1F7C9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "128970", "Unicode hex": "1F7CA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "10038", "Unicode hex": "2736" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "128972", "Unicode hex": "1F7CC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "128974", "Unicode hex": "1F7CE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "128976", "Unicode hex": "1F7D0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "128978", "Unicode hex": "1F7D2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "10041", "Unicode hex": "2739" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "128963", "Unicode hex": "1F7C3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "128967", "Unicode hex": "1F7C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "10031", "Unicode hex": "272F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "128973", "Unicode hex": "1F7CD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "128980", "Unicode hex": "1F7D4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "11212", "Unicode hex": "2BCC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "11213", "Unicode hex": "2BCD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "8251", "Unicode hex": "203B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "8258", "Unicode hex": "2042" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "11104", "Unicode hex": "2B60" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "11106", "Unicode hex": "2B62" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "11105", "Unicode hex": "2B61" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "11107", "Unicode hex": "2B63" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "11110", "Unicode hex": "2B66" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "11111", "Unicode hex": "2B67" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "11113", "Unicode hex": "2B69" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "11112", "Unicode hex": "2B68" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "11120", "Unicode hex": "2B70" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "11122", "Unicode hex": "2B72" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "11121", "Unicode hex": "2B71" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "11123", "Unicode hex": "2B73" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "11126", "Unicode hex": "2B76" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "11128", "Unicode hex": "2B78" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "11131", "Unicode hex": "2B7B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "11133", "Unicode hex": "2B7D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "11108", "Unicode hex": "2B64" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "11109", "Unicode hex": "2B65" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "11114", "Unicode hex": "2B6A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "11116", "Unicode hex": "2B6C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "11115", "Unicode hex": "2B6B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "11117", "Unicode hex": "2B6D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "11085", "Unicode hex": "2B4D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "11168", "Unicode hex": "2BA0" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "11169", "Unicode hex": "2BA1" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "11170", "Unicode hex": "2BA2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "11171", "Unicode hex": "2BA3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "11172", "Unicode hex": "2BA4" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "11173", "Unicode hex": "2BA5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "11174", "Unicode hex": "2BA6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "11175", "Unicode hex": "2BA7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "11152", "Unicode hex": "2B90" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "11153", "Unicode hex": "2B91" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "11154", "Unicode hex": "2B92" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "11155", "Unicode hex": "2B93" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "11136", "Unicode hex": "2B80" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "11139", "Unicode hex": "2B83" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "11134", "Unicode hex": "2B7E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "11135", "Unicode hex": "2B7F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "11140", "Unicode hex": "2B84" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "11142", "Unicode hex": "2B86" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "11141", "Unicode hex": "2B85" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "11143", "Unicode hex": "2B87" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "11151", "Unicode hex": "2B8F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "11149", "Unicode hex": "2B8D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "11150", "Unicode hex": "2B8E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "11148", "Unicode hex": "2B8C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "11118", "Unicode hex": "2B6E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "11119", "Unicode hex": "2B6F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9099", "Unicode hex": "238B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "8996", "Unicode hex": "2324" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "8963", "Unicode hex": "2303" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "8997", "Unicode hex": "2325" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "9251", "Unicode hex": "2423" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "9085", "Unicode hex": "237D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "8682", "Unicode hex": "21EA" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "11192", "Unicode hex": "2BB8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "129184", "Unicode hex": "1F8A0" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "129185", "Unicode hex": "1F8A1" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "129186", "Unicode hex": "1F8A2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "129187", "Unicode hex": "1F8A3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "129188", "Unicode hex": "1F8A4" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "129189", "Unicode hex": "1F8A5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "129190", "Unicode hex": "1F8A6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "129191", "Unicode hex": "1F8A7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "129192", "Unicode hex": "1F8A8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "129193", "Unicode hex": "1F8A9" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "129194", "Unicode hex": "1F8AA" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "129195", "Unicode hex": "1F8AB" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "129104", "Unicode hex": "1F850" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "129106", "Unicode hex": "1F852" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "129105", "Unicode hex": "1F851" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "129107", "Unicode hex": "1F853" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "129108", "Unicode hex": "1F854" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "129109", "Unicode hex": "1F855" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "129111", "Unicode hex": "1F857" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "129110", "Unicode hex": "1F856" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "129112", "Unicode hex": "1F858" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "129113", "Unicode hex": "1F859" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "9650", "Unicode hex": "25B2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "9660", "Unicode hex": "25BC" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "9651", "Unicode hex": "25B3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "9661", "Unicode hex": "25BD" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "9664", "Unicode hex": "25C0" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "9654", "Unicode hex": "25B6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "9665", "Unicode hex": "25C1" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "9655", "Unicode hex": "25B7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "9699", "Unicode hex": "25E3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "9698", "Unicode hex": "25E2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "9700", "Unicode hex": "25E4" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "9701", "Unicode hex": "25E5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "128896", "Unicode hex": "1F780" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128898", "Unicode hex": "1F782" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128897", "Unicode hex": "1F781" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "128899", "Unicode hex": "1F783" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "11205", "Unicode hex": "2BC5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "11206", "Unicode hex": "2BC6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "11207", "Unicode hex": "2BC7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "11208", "Unicode hex": "2BC8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "11164", "Unicode hex": "2B9C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "11166", "Unicode hex": "2B9E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "11165", "Unicode hex": "2B9D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "11167", "Unicode hex": "2B9F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "129040", "Unicode hex": "1F810" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "129042", "Unicode hex": "1F812" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "129041", "Unicode hex": "1F811" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "129043", "Unicode hex": "1F813" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "129044", "Unicode hex": "1F814" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "129046", "Unicode hex": "1F816" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "129045", "Unicode hex": "1F815" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "129047", "Unicode hex": "1F817" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "129048", "Unicode hex": "1F818" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "129050", "Unicode hex": "1F81A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "129049", "Unicode hex": "1F819" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "129051", "Unicode hex": "1F81B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "129052", "Unicode hex": "1F81C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "129054", "Unicode hex": "1F81E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "129053", "Unicode hex": "1F81D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "129055", "Unicode hex": "1F81F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "129024", "Unicode hex": "1F800" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "129026", "Unicode hex": "1F802" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "129025", "Unicode hex": "1F801" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "129027", "Unicode hex": "1F803" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "129028", "Unicode hex": "1F804" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "129030", "Unicode hex": "1F806" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "129029", "Unicode hex": "1F805" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "129031", "Unicode hex": "1F807" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "129032", "Unicode hex": "1F808" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "129034", "Unicode hex": "1F80A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "129033", "Unicode hex": "1F809" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "129035", "Unicode hex": "1F80B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "129056", "Unicode hex": "1F820" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "129058", "Unicode hex": "1F822" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "129060", "Unicode hex": "1F824" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "129062", "Unicode hex": "1F826" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "129064", "Unicode hex": "1F828" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "129066", "Unicode hex": "1F82A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "129068", "Unicode hex": "1F82C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "129180", "Unicode hex": "1F89C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "129181", "Unicode hex": "1F89D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "129182", "Unicode hex": "1F89E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "129183", "Unicode hex": "1F89F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "129070", "Unicode hex": "1F82E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "129072", "Unicode hex": "1F830" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "129074", "Unicode hex": "1F832" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "129076", "Unicode hex": "1F834" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "129078", "Unicode hex": "1F836" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "129080", "Unicode hex": "1F838" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "129082", "Unicode hex": "1F83A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "129081", "Unicode hex": "1F839" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "129083", "Unicode hex": "1F83B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "129176", "Unicode hex": "1F898" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "129178", "Unicode hex": "1F89A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "129177", "Unicode hex": "1F899" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "129179", "Unicode hex": "1F89B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "129084", "Unicode hex": "1F83C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "129086", "Unicode hex": "1F83E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "129085", "Unicode hex": "1F83D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "129087", "Unicode hex": "1F83F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "129088", "Unicode hex": "1F840" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "129090", "Unicode hex": "1F842" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "129089", "Unicode hex": "1F841" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "129091", "Unicode hex": "1F843" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "129092", "Unicode hex": "1F844" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "129094", "Unicode hex": "1F846" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "129093", "Unicode hex": "1F845" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "129095", "Unicode hex": "1F847" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "11176", "Unicode hex": "2BA8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "11177", "Unicode hex": "2BA9" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "11178", "Unicode hex": "2BAA" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "11179", "Unicode hex": "2BAB" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "11180", "Unicode hex": "2BAC" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "11181", "Unicode hex": "2BAD" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "11182", "Unicode hex": "2BAE" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "11183", "Unicode hex": "2BAF" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "129120", "Unicode hex": "1F860" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "129122", "Unicode hex": "1F862" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "129121", "Unicode hex": "1F861" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "129123", "Unicode hex": "1F863" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "129124", "Unicode hex": "1F864" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "129125", "Unicode hex": "1F865" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "129127", "Unicode hex": "1F867" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "129126", "Unicode hex": "1F866" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "129136", "Unicode hex": "1F870" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "129138", "Unicode hex": "1F872" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "129137", "Unicode hex": "1F871" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "129139", "Unicode hex": "1F873" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "129140", "Unicode hex": "1F874" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "129141", "Unicode hex": "1F875" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "129143", "Unicode hex": "1F877" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "129142", "Unicode hex": "1F876" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "129152", "Unicode hex": "1F880" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "129154", "Unicode hex": "1F882" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "129153", "Unicode hex": "1F881" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "129155", "Unicode hex": "1F883" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "129156", "Unicode hex": "1F884" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "129157", "Unicode hex": "1F885" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "129159", "Unicode hex": "1F887" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "129158", "Unicode hex": "1F886" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "129168", "Unicode hex": "1F890" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "129170", "Unicode hex": "1F892" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "129169", "Unicode hex": "1F891" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "129171", "Unicode hex": "1F893" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "129172", "Unicode hex": "1F894" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "129174", "Unicode hex": "1F896" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "129173", "Unicode hex": "1F895" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "129175", "Unicode hex": "1F897" }
];
dingbats$1.default = dingbats;
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(dist, "__esModule", { value: true });
dist.hex = dist.dec = dist.codePoint = void 0;
var dingbats_1 = __importDefault(dingbats$1);
var dingbatsByCodePoint = {};
var fromCodePoint = String.fromCodePoint ? String.fromCodePoint : fromCodePointPolyfill;
for (var _i = 0, dingbats_2 = dingbats_1.default; _i < dingbats_2.length; _i++) {
  var dingbat = dingbats_2[_i];
  var codePoint_1 = parseInt(dingbat["Unicode dec"], 10);
  var scalarValue = {
    codePoint: codePoint_1,
    string: fromCodePoint(codePoint_1)
  };
  dingbatsByCodePoint[dingbat["Typeface name"].toUpperCase() + "_" + dingbat["Dingbat dec"]] = scalarValue;
}
function codePoint(typeface, codePoint2) {
  return dingbatsByCodePoint[typeface.toUpperCase() + "_" + codePoint2];
}
dist.codePoint = codePoint;
function dec(typeface, dec2) {
  return codePoint(typeface, parseInt(dec2, 10));
}
dist.dec = dec;
function hex(typeface, hex2) {
  return codePoint(typeface, parseInt(hex2, 16));
}
dist.hex = hex;
function fromCodePointPolyfill(codePoint2) {
  if (codePoint2 <= 65535) {
    return String.fromCharCode(codePoint2);
  } else {
    var highSurrogate = Math.floor((codePoint2 - 65536) / 1024) + 55296;
    var lowSurrogate = (codePoint2 - 65536) % 1024 + 56320;
    return String.fromCharCode(highSurrogate, lowSurrogate);
  }
}
var transforms$2 = {};
var _$9 = require$$0;
transforms$2.paragraph = paragraph$1;
transforms$2.run = run$1;
transforms$2._elements = elements;
transforms$2._elementsOfType = elementsOfType;
transforms$2.getDescendantsOfType = getDescendantsOfType;
transforms$2.getDescendants = getDescendants;
function paragraph$1(transform) {
  return elementsOfType("paragraph", transform);
}
function run$1(transform) {
  return elementsOfType("run", transform);
}
function elementsOfType(elementType, transform) {
  return elements(function(element2) {
    if (element2.type === elementType) {
      return transform(element2);
    } else {
      return element2;
    }
  });
}
function elements(transform) {
  return function transformElement(element2) {
    if (element2.children) {
      var children = _$9.map(element2.children, transformElement);
      element2 = _$9.extend(element2, { children });
    }
    return transform(element2);
  };
}
function getDescendantsOfType(element2, type) {
  return getDescendants(element2).filter(function(descendant) {
    return descendant.type === type;
  });
}
function getDescendants(element2) {
  var descendants = [];
  visitDescendants(element2, function(descendant) {
    descendants.push(descendant);
  });
  return descendants;
}
function visitDescendants(element2, visit) {
  if (element2.children) {
    element2.children.forEach(function(child) {
      visitDescendants(child, visit);
      visit(child);
    });
  }
}
var uris$1 = {};
uris$1.uriToZipEntryName = uriToZipEntryName;
uris$1.replaceFragment = replaceFragment;
function uriToZipEntryName(base, uri) {
  if (uri.charAt(0) === "/") {
    return uri.substr(1);
  } else {
    return base + "/" + uri;
  }
}
function replaceFragment(uri, fragment) {
  var hashIndex = uri.indexOf("#");
  if (hashIndex !== -1) {
    uri = uri.substring(0, hashIndex);
  }
  return uri + "#" + fragment;
}
bodyReader.createBodyReader = createBodyReader$1;
bodyReader._readNumberingProperties = readNumberingProperties;
var dingbatToUnicode = dist;
var _$8 = require$$0;
var documents$6 = documents$7;
var Result$6 = results$2.Result;
var warning = results$2.warning;
var xml$1 = xml$3;
var transforms$1 = transforms$2;
var uris = uris$1;
function createBodyReader$1(options) {
  return {
    readXmlElement: function(element2) {
      return new BodyReader(options).readXmlElement(element2);
    },
    readXmlElements: function(elements2) {
      return new BodyReader(options).readXmlElements(elements2);
    }
  };
}
function BodyReader(options) {
  var complexFieldStack = [];
  var currentInstrText = [];
  var deletedParagraphContents = [];
  var relationships = options.relationships;
  var contentTypes2 = options.contentTypes;
  var docxFile = options.docxFile;
  var files2 = options.files;
  var numbering = options.numbering;
  var styles = options.styles;
  function readXmlElements(elements2) {
    var results2 = elements2.map(readXmlElement);
    return combineResults(results2);
  }
  function readXmlElement(element2) {
    if (element2.type === "element") {
      var handler = xmlElementReaders[element2.name];
      if (handler) {
        return handler(element2);
      } else if (!Object.prototype.hasOwnProperty.call(ignoreElements, element2.name)) {
        var message = warning("An unrecognised element was ignored: " + element2.name);
        return emptyResultWithMessages([message]);
      }
    }
    return emptyResult();
  }
  function readParagraphProperties(element2) {
    return readParagraphStyle(element2).map(function(style) {
      return {
        type: "paragraphProperties",
        styleId: style.styleId,
        styleName: style.name,
        alignment: element2.firstOrEmpty("w:jc").attributes["w:val"],
        numbering: readNumberingProperties(style.styleId, element2.firstOrEmpty("w:numPr"), numbering),
        indent: readParagraphIndent(element2.firstOrEmpty("w:ind"))
      };
    });
  }
  function readParagraphIndent(element2) {
    return {
      start: element2.attributes["w:start"] || element2.attributes["w:left"],
      end: element2.attributes["w:end"] || element2.attributes["w:right"],
      firstLine: element2.attributes["w:firstLine"],
      hanging: element2.attributes["w:hanging"]
    };
  }
  function readRunProperties(element2) {
    return readRunStyle(element2).map(function(style) {
      var fontSizeString = element2.firstOrEmpty("w:sz").attributes["w:val"];
      var fontSize = /^[0-9]+$/.test(fontSizeString) ? parseInt(fontSizeString, 10) / 2 : null;
      return {
        type: "runProperties",
        styleId: style.styleId,
        styleName: style.name,
        verticalAlignment: element2.firstOrEmpty("w:vertAlign").attributes["w:val"],
        font: element2.firstOrEmpty("w:rFonts").attributes["w:ascii"],
        fontSize,
        isBold: readBooleanElement(element2.first("w:b")),
        isUnderline: readUnderline(element2.first("w:u")),
        isItalic: readBooleanElement(element2.first("w:i")),
        isStrikethrough: readBooleanElement(element2.first("w:strike")),
        isAllCaps: readBooleanElement(element2.first("w:caps")),
        isSmallCaps: readBooleanElement(element2.first("w:smallCaps")),
        highlight: readHighlightValue(element2.firstOrEmpty("w:highlight").attributes["w:val"])
      };
    });
  }
  function readUnderline(element2) {
    if (element2) {
      var value = element2.attributes["w:val"];
      return value !== void 0 && value !== "false" && value !== "0" && value !== "none";
    } else {
      return false;
    }
  }
  function readBooleanElement(element2) {
    if (element2) {
      var value = element2.attributes["w:val"];
      return value !== "false" && value !== "0";
    } else {
      return false;
    }
  }
  function readBooleanAttributeValue(value) {
    return value !== "false" && value !== "0";
  }
  function readHighlightValue(value) {
    if (!value || value === "none") {
      return null;
    } else {
      return value;
    }
  }
  function readParagraphStyle(element2) {
    return readStyle2(element2, "w:pStyle", "Paragraph", styles.findParagraphStyleById);
  }
  function readRunStyle(element2) {
    return readStyle2(element2, "w:rStyle", "Run", styles.findCharacterStyleById);
  }
  function readTableStyle(element2) {
    return readStyle2(element2, "w:tblStyle", "Table", styles.findTableStyleById);
  }
  function readStyle2(element2, styleTagName, styleType, findStyleById) {
    var messages = [];
    var styleElement = element2.first(styleTagName);
    var styleId = null;
    var name = null;
    if (styleElement) {
      styleId = styleElement.attributes["w:val"];
      if (styleId) {
        var style = findStyleById(styleId);
        if (style) {
          name = style.name;
        } else {
          messages.push(undefinedStyleWarning(styleType, styleId));
        }
      }
    }
    return elementResultWithMessages({ styleId, name }, messages);
  }
  function readFldChar(element2) {
    var type = element2.attributes["w:fldCharType"];
    if (type === "begin") {
      complexFieldStack.push({ type: "begin", fldChar: element2 });
      currentInstrText = [];
    } else if (type === "end") {
      var complexFieldEnd = complexFieldStack.pop();
      if (complexFieldEnd.type === "begin") {
        complexFieldEnd = parseCurrentInstrText(complexFieldEnd);
      }
      if (complexFieldEnd.type === "checkbox") {
        return elementResult(documents$6.checkbox({
          checked: complexFieldEnd.checked
        }));
      }
    } else if (type === "separate") {
      var complexFieldSeparate = complexFieldStack.pop();
      var complexField = parseCurrentInstrText(complexFieldSeparate);
      complexFieldStack.push(complexField);
    }
    return emptyResult();
  }
  function currentHyperlinkOptions() {
    var topHyperlink = _$8.last(complexFieldStack.filter(function(complexField) {
      return complexField.type === "hyperlink";
    }));
    return topHyperlink ? topHyperlink.options : null;
  }
  function parseCurrentInstrText(complexField) {
    return parseInstrText(
      currentInstrText.join(""),
      complexField.type === "begin" ? complexField.fldChar : xml$1.emptyElement
    );
  }
  function parseInstrText(instrText, fldChar) {
    var externalLinkResult = /\s*HYPERLINK "(.*)"/.exec(instrText);
    if (externalLinkResult) {
      return { type: "hyperlink", options: { href: externalLinkResult[1] } };
    }
    var internalLinkResult = /\s*HYPERLINK\s+\\l\s+"(.*)"/.exec(instrText);
    if (internalLinkResult) {
      return { type: "hyperlink", options: { anchor: internalLinkResult[1] } };
    }
    var checkboxResult = /\s*FORMCHECKBOX\s*/.exec(instrText);
    if (checkboxResult) {
      var checkboxElement = fldChar.firstOrEmpty("w:ffData").firstOrEmpty("w:checkBox");
      var checkedElement = checkboxElement.first("w:checked");
      var checked = checkedElement == null ? readBooleanElement(checkboxElement.first("w:default")) : readBooleanElement(checkedElement);
      return { type: "checkbox", checked };
    }
    return { type: "unknown" };
  }
  function readInstrText(element2) {
    currentInstrText.push(element2.text());
    return emptyResult();
  }
  function readSymbol(element2) {
    var font = element2.attributes["w:font"];
    var char = element2.attributes["w:char"];
    var unicodeCharacter = dingbatToUnicode.hex(font, char);
    if (unicodeCharacter == null && /^F0..$/.test(char)) {
      unicodeCharacter = dingbatToUnicode.hex(font, char.substring(2));
    }
    if (unicodeCharacter == null) {
      return emptyResultWithMessages([warning(
        "A w:sym element with an unsupported character was ignored: char " + char + " in font " + font
      )]);
    } else {
      return elementResult(new documents$6.Text(unicodeCharacter.string));
    }
  }
  function noteReferenceReader(noteType) {
    return function(element2) {
      var noteId = element2.attributes["w:id"];
      return elementResult(new documents$6.NoteReference({
        noteType,
        noteId
      }));
    };
  }
  function readCommentReference(element2) {
    return elementResult(documents$6.commentReference({
      commentId: element2.attributes["w:id"]
    }));
  }
  function readChildElements(element2) {
    return readXmlElements(element2.children);
  }
  var xmlElementReaders = {
    "w:p": function(element2) {
      var paragraphPropertiesElement = element2.firstOrEmpty("w:pPr");
      var isDeleted = !!paragraphPropertiesElement.firstOrEmpty("w:rPr").first("w:del");
      if (isDeleted) {
        element2.children.forEach(function(child) {
          deletedParagraphContents.push(child);
        });
        return emptyResult();
      } else {
        var childrenXml = element2.children;
        if (deletedParagraphContents.length > 0) {
          childrenXml = deletedParagraphContents.concat(childrenXml);
          deletedParagraphContents = [];
        }
        return ReadResult.map(
          readParagraphProperties(paragraphPropertiesElement),
          readXmlElements(childrenXml),
          function(properties, children) {
            return new documents$6.Paragraph(children, properties);
          }
        ).insertExtra();
      }
    },
    "w:r": function(element2) {
      return ReadResult.map(
        readRunProperties(element2.firstOrEmpty("w:rPr")),
        readXmlElements(element2.children),
        function(properties, children) {
          var hyperlinkOptions = currentHyperlinkOptions();
          if (hyperlinkOptions !== null) {
            children = [new documents$6.Hyperlink(children, hyperlinkOptions)];
          }
          return new documents$6.Run(children, properties);
        }
      );
    },
    "w:fldChar": readFldChar,
    "w:instrText": readInstrText,
    "w:t": function(element2) {
      return elementResult(new documents$6.Text(element2.text()));
    },
    "w:tab": function(element2) {
      return elementResult(new documents$6.Tab());
    },
    "w:noBreakHyphen": function() {
      return elementResult(new documents$6.Text("‑"));
    },
    "w:softHyphen": function(element2) {
      return elementResult(new documents$6.Text("­"));
    },
    "w:sym": readSymbol,
    "w:hyperlink": function(element2) {
      var relationshipId = element2.attributes["r:id"];
      var anchor = element2.attributes["w:anchor"];
      return readXmlElements(element2.children).map(function(children) {
        function create2(options2) {
          var targetFrame = element2.attributes["w:tgtFrame"] || null;
          return new documents$6.Hyperlink(
            children,
            _$8.extend({ targetFrame }, options2)
          );
        }
        if (relationshipId) {
          var href = relationships.findTargetByRelationshipId(relationshipId);
          if (anchor) {
            href = uris.replaceFragment(href, anchor);
          }
          return create2({ href });
        } else if (anchor) {
          return create2({ anchor });
        } else {
          return children;
        }
      });
    },
    "w:tbl": readTable,
    "w:tr": readTableRow,
    "w:tc": readTableCell,
    "w:footnoteReference": noteReferenceReader("footnote"),
    "w:endnoteReference": noteReferenceReader("endnote"),
    "w:commentReference": readCommentReference,
    "w:br": function(element2) {
      var breakType = element2.attributes["w:type"];
      if (breakType == null || breakType === "textWrapping") {
        return elementResult(documents$6.lineBreak);
      } else if (breakType === "page") {
        return elementResult(documents$6.pageBreak);
      } else if (breakType === "column") {
        return elementResult(documents$6.columnBreak);
      } else {
        return emptyResultWithMessages([warning("Unsupported break type: " + breakType)]);
      }
    },
    "w:bookmarkStart": function(element2) {
      var name = element2.attributes["w:name"];
      if (name === "_GoBack") {
        return emptyResult();
      } else {
        return elementResult(new documents$6.BookmarkStart({ name }));
      }
    },
    "mc:AlternateContent": function(element2) {
      return readChildElements(element2.firstOrEmpty("mc:Fallback"));
    },
    "w:sdt": function(element2) {
      var contentResult = readXmlElements(element2.firstOrEmpty("w:sdtContent").children);
      return contentResult.map(function(content) {
        var checkbox = element2.firstOrEmpty("w:sdtPr").first("wordml:checkbox");
        if (checkbox) {
          var checkedElement = checkbox.first("wordml:checked");
          var isChecked = !!checkedElement && readBooleanAttributeValue(
            checkedElement.attributes["wordml:val"]
          );
          var documentCheckbox = documents$6.checkbox({
            checked: isChecked
          });
          var hasCheckbox = false;
          var replacedContent = content.map(transforms$1._elementsOfType(
            documents$6.types.text,
            function(text) {
              if (text.value.length > 0 && !hasCheckbox) {
                hasCheckbox = true;
                return documentCheckbox;
              } else {
                return text;
              }
            }
          ));
          if (hasCheckbox) {
            return replacedContent;
          } else {
            return documentCheckbox;
          }
        } else {
          return content;
        }
      });
    },
    "w:ins": readChildElements,
    "w:object": readChildElements,
    "w:smartTag": readChildElements,
    "w:drawing": readChildElements,
    "w:pict": function(element2) {
      return readChildElements(element2).toExtra();
    },
    "v:roundrect": readChildElements,
    "v:shape": readChildElements,
    "v:textbox": readChildElements,
    "w:txbxContent": readChildElements,
    "wp:inline": readDrawingElement,
    "wp:anchor": readDrawingElement,
    "v:imagedata": readImageData,
    "v:group": readChildElements,
    "v:rect": readChildElements
  };
  return {
    readXmlElement,
    readXmlElements
  };
  function readTable(element2) {
    var propertiesResult = readTableProperties(element2.firstOrEmpty("w:tblPr"));
    return readXmlElements(element2.children).flatMap(calculateRowSpans).flatMap(function(children) {
      return propertiesResult.map(function(properties) {
        return documents$6.Table(children, properties);
      });
    });
  }
  function readTableProperties(element2) {
    return readTableStyle(element2).map(function(style) {
      return {
        styleId: style.styleId,
        styleName: style.name
      };
    });
  }
  function readTableRow(element2) {
    var properties = element2.firstOrEmpty("w:trPr");
    var isDeleted = !!properties.first("w:del");
    if (isDeleted) {
      return emptyResult();
    }
    var isHeader = !!properties.first("w:tblHeader");
    return readXmlElements(element2.children).map(function(children) {
      return documents$6.TableRow(children, { isHeader });
    });
  }
  function readTableCell(element2) {
    return readXmlElements(element2.children).map(function(children) {
      var properties = element2.firstOrEmpty("w:tcPr");
      var gridSpan = properties.firstOrEmpty("w:gridSpan").attributes["w:val"];
      var colSpan = gridSpan ? parseInt(gridSpan, 10) : 1;
      var cell = documents$6.TableCell(children, { colSpan });
      cell._vMerge = readVMerge(properties);
      return cell;
    });
  }
  function readVMerge(properties) {
    var element2 = properties.first("w:vMerge");
    if (element2) {
      var val = element2.attributes["w:val"];
      return val === "continue" || !val;
    } else {
      return null;
    }
  }
  function calculateRowSpans(rows) {
    var unexpectedNonRows = _$8.any(rows, function(row) {
      return row.type !== documents$6.types.tableRow;
    });
    if (unexpectedNonRows) {
      removeVMergeProperties(rows);
      return elementResultWithMessages(rows, [warning(
        "unexpected non-row element in table, cell merging may be incorrect"
      )]);
    }
    var unexpectedNonCells = _$8.any(rows, function(row) {
      return _$8.any(row.children, function(cell) {
        return cell.type !== documents$6.types.tableCell;
      });
    });
    if (unexpectedNonCells) {
      removeVMergeProperties(rows);
      return elementResultWithMessages(rows, [warning(
        "unexpected non-cell element in table row, cell merging may be incorrect"
      )]);
    }
    var columns = {};
    rows.forEach(function(row) {
      var cellIndex = 0;
      row.children.forEach(function(cell) {
        if (cell._vMerge && columns[cellIndex]) {
          columns[cellIndex].rowSpan++;
        } else {
          columns[cellIndex] = cell;
          cell._vMerge = false;
        }
        cellIndex += cell.colSpan;
      });
    });
    rows.forEach(function(row) {
      row.children = row.children.filter(function(cell) {
        return !cell._vMerge;
      });
      row.children.forEach(function(cell) {
        delete cell._vMerge;
      });
    });
    return elementResult(rows);
  }
  function removeVMergeProperties(rows) {
    rows.forEach(function(row) {
      var cells = transforms$1.getDescendantsOfType(row, documents$6.types.tableCell);
      cells.forEach(function(cell) {
        delete cell._vMerge;
      });
    });
  }
  function readDrawingElement(element2) {
    var blips = element2.getElementsByTagName("a:graphic").getElementsByTagName("a:graphicData").getElementsByTagName("pic:pic").getElementsByTagName("pic:blipFill").getElementsByTagName("a:blip");
    return combineResults(blips.map(readBlip.bind(null, element2)));
  }
  function readBlip(element2, blip) {
    var properties = element2.first("wp:docPr").attributes;
    var altText = isBlank(properties.descr) ? properties.title : properties.descr;
    var blipImageFile = findBlipImageFile(blip);
    if (blipImageFile === null) {
      return emptyResultWithMessages([warning("Could not find image file for a:blip element")]);
    } else {
      return readImage(blipImageFile, altText);
    }
  }
  function isBlank(value) {
    return value == null || /^\s*$/.test(value);
  }
  function findBlipImageFile(blip) {
    var embedRelationshipId = blip.attributes["r:embed"];
    var linkRelationshipId = blip.attributes["r:link"];
    if (embedRelationshipId) {
      return findEmbeddedImageFile(embedRelationshipId);
    } else if (linkRelationshipId) {
      var imagePath = relationships.findTargetByRelationshipId(linkRelationshipId);
      return {
        path: imagePath,
        read: files2.read.bind(files2, imagePath)
      };
    } else {
      return null;
    }
  }
  function readImageData(element2) {
    var relationshipId = element2.attributes["r:id"];
    if (relationshipId) {
      return readImage(
        findEmbeddedImageFile(relationshipId),
        element2.attributes["o:title"]
      );
    } else {
      return emptyResultWithMessages([warning("A v:imagedata element without a relationship ID was ignored")]);
    }
  }
  function findEmbeddedImageFile(relationshipId) {
    var path = uris.uriToZipEntryName("word", relationships.findTargetByRelationshipId(relationshipId));
    return {
      path,
      read: docxFile.read.bind(docxFile, path)
    };
  }
  function readImage(imageFile, altText) {
    var contentType = contentTypes2.findContentType(imageFile.path);
    var image = documents$6.Image({
      readImage: imageFile.read,
      altText,
      contentType
    });
    var warnings = supportedImageTypes[contentType] ? [] : warning("Image of type " + contentType + " is unlikely to display in web browsers");
    return elementResultWithMessages(image, warnings);
  }
  function undefinedStyleWarning(type, styleId) {
    return warning(
      type + " style with ID " + styleId + " was referenced but not defined in the document"
    );
  }
}
function readNumberingProperties(styleId, element2, numbering) {
  var level = element2.firstOrEmpty("w:ilvl").attributes["w:val"];
  var numId = element2.firstOrEmpty("w:numId").attributes["w:val"];
  if (level !== void 0 && numId !== void 0) {
    return numbering.findLevel(numId, level);
  }
  if (styleId != null) {
    var levelByStyleId = numbering.findLevelByParagraphStyleId(styleId);
    if (levelByStyleId != null) {
      return levelByStyleId;
    }
  }
  if (numId !== void 0) {
    return numbering.findLevel(numId, "0");
  }
  return null;
}
var supportedImageTypes = {
  "image/png": true,
  "image/gif": true,
  "image/jpeg": true,
  "image/svg+xml": true,
  "image/tiff": true
};
var ignoreElements = {
  "office-word:wrap": true,
  "v:shadow": true,
  "v:shapetype": true,
  "w:annotationRef": true,
  "w:bookmarkEnd": true,
  "w:sectPr": true,
  "w:proofErr": true,
  "w:lastRenderedPageBreak": true,
  "w:commentRangeStart": true,
  "w:commentRangeEnd": true,
  "w:del": true,
  "w:footnoteRef": true,
  "w:endnoteRef": true,
  "w:pPr": true,
  "w:rPr": true,
  "w:tblPr": true,
  "w:tblGrid": true,
  "w:trPr": true,
  "w:tcPr": true
};
function emptyResultWithMessages(messages) {
  return new ReadResult(null, null, messages);
}
function emptyResult() {
  return new ReadResult(null);
}
function elementResult(element2) {
  return new ReadResult(element2);
}
function elementResultWithMessages(element2, messages) {
  return new ReadResult(element2, null, messages);
}
function ReadResult(element2, extra, messages) {
  this.value = element2 || [];
  this.extra = extra || [];
  this._result = new Result$6({
    element: this.value,
    extra
  }, messages);
  this.messages = this._result.messages;
}
ReadResult.prototype.toExtra = function() {
  return new ReadResult(null, joinElements(this.extra, this.value), this.messages);
};
ReadResult.prototype.insertExtra = function() {
  var extra = this.extra;
  if (extra && extra.length) {
    return new ReadResult(joinElements(this.value, extra), null, this.messages);
  } else {
    return this;
  }
};
ReadResult.prototype.map = function(func) {
  var result2 = this._result.map(function(value) {
    return func(value.element);
  });
  return new ReadResult(result2.value, this.extra, result2.messages);
};
ReadResult.prototype.flatMap = function(func) {
  var result2 = this._result.flatMap(function(value) {
    return func(value.element)._result;
  });
  return new ReadResult(result2.value.element, joinElements(this.extra, result2.value.extra), result2.messages);
};
ReadResult.map = function(first2, second, func) {
  return new ReadResult(
    func(first2.value, second.value),
    joinElements(first2.extra, second.extra),
    first2.messages.concat(second.messages)
  );
};
function combineResults(results2) {
  var result2 = Result$6.combine(_$8.pluck(results2, "_result"));
  return new ReadResult(
    _$8.flatten(_$8.pluck(result2.value, "element")),
    _$8.filter(_$8.flatten(_$8.pluck(result2.value, "extra")), identity$1),
    result2.messages
  );
}
function joinElements(first2, second) {
  return _$8.flatten([first2, second]);
}
function identity$1(value) {
  return value;
}
var documentXmlReader = {};
documentXmlReader.DocumentXmlReader = DocumentXmlReader$1;
var documents$5 = documents$7;
var Result$5 = results$2.Result;
function DocumentXmlReader$1(options) {
  var bodyReader2 = options.bodyReader;
  function convertXmlToDocument(element2) {
    var body = element2.first("w:body");
    if (body == null) {
      throw new Error("Could not find the body element: are you sure this is a docx file?");
    }
    var result2 = bodyReader2.readXmlElements(body.children).map(function(children) {
      return new documents$5.Document(children, {
        notes: options.notes,
        comments: options.comments
      });
    });
    return new Result$5(result2.value, result2.messages);
  }
  return {
    convertXmlToDocument
  };
}
var relationshipsReader$1 = {};
relationshipsReader$1.readRelationships = readRelationships;
relationshipsReader$1.defaultValue = new Relationships([]);
relationshipsReader$1.Relationships = Relationships;
function readRelationships(element2) {
  var relationships = [];
  element2.children.forEach(function(child) {
    if (child.name === "relationships:Relationship") {
      var relationship = {
        relationshipId: child.attributes.Id,
        target: child.attributes.Target,
        type: child.attributes.Type
      };
      relationships.push(relationship);
    }
  });
  return new Relationships(relationships);
}
function Relationships(relationships) {
  var targetsByRelationshipId = {};
  relationships.forEach(function(relationship) {
    targetsByRelationshipId[relationship.relationshipId] = relationship.target;
  });
  var targetsByType = {};
  relationships.forEach(function(relationship) {
    if (!targetsByType[relationship.type]) {
      targetsByType[relationship.type] = [];
    }
    targetsByType[relationship.type].push(relationship.target);
  });
  return {
    findTargetByRelationshipId: function(relationshipId) {
      return targetsByRelationshipId[relationshipId];
    },
    findTargetsByType: function(type) {
      return targetsByType[type] || [];
    }
  };
}
var contentTypesReader$1 = {};
contentTypesReader$1.readContentTypesFromXml = readContentTypesFromXml;
var fallbackContentTypes = {
  "png": "png",
  "gif": "gif",
  "jpeg": "jpeg",
  "jpg": "jpeg",
  "tif": "tiff",
  "tiff": "tiff",
  "bmp": "bmp"
};
contentTypesReader$1.defaultContentTypes = contentTypes({}, {});
function readContentTypesFromXml(element2) {
  var extensionDefaults = {};
  var overrides = {};
  element2.children.forEach(function(child) {
    if (child.name === "content-types:Default") {
      extensionDefaults[child.attributes.Extension] = child.attributes.ContentType;
    }
    if (child.name === "content-types:Override") {
      var name = child.attributes.PartName;
      if (name.charAt(0) === "/") {
        name = name.substring(1);
      }
      overrides[name] = child.attributes.ContentType;
    }
  });
  return contentTypes(overrides, extensionDefaults);
}
function contentTypes(overrides, extensionDefaults) {
  return {
    findContentType: function(path) {
      var overrideContentType = overrides[path];
      if (overrideContentType) {
        return overrideContentType;
      } else {
        var pathParts = path.split(".");
        var extension = pathParts[pathParts.length - 1];
        if (extensionDefaults.hasOwnProperty(extension)) {
          return extensionDefaults[extension];
        } else {
          var fallback = fallbackContentTypes[extension.toLowerCase()];
          if (fallback) {
            return "image/" + fallback;
          } else {
            return null;
          }
        }
      }
    }
  };
}
var numberingXml$1 = {};
var _$7 = require$$0;
numberingXml$1.readNumberingXml = readNumberingXml;
numberingXml$1.Numbering = Numbering;
numberingXml$1.defaultNumbering = new Numbering({}, {});
function Numbering(nums, abstractNums, styles) {
  var allLevels = _$7.flatten(_$7.values(abstractNums).map(function(abstractNum) {
    return _$7.values(abstractNum.levels);
  }));
  var levelsByParagraphStyleId = _$7.indexBy(
    allLevels.filter(function(level) {
      return level.paragraphStyleId != null;
    }),
    "paragraphStyleId"
  );
  function findLevel(numId, level) {
    var num = nums[numId];
    if (num) {
      var abstractNum = abstractNums[num.abstractNumId];
      if (!abstractNum) {
        return null;
      } else if (abstractNum.numStyleLink == null) {
        return abstractNums[num.abstractNumId].levels[level];
      } else {
        var style = styles.findNumberingStyleById(abstractNum.numStyleLink);
        return findLevel(style.numId, level);
      }
    } else {
      return null;
    }
  }
  function findLevelByParagraphStyleId(styleId) {
    return levelsByParagraphStyleId[styleId] || null;
  }
  return {
    findLevel,
    findLevelByParagraphStyleId
  };
}
function readNumberingXml(root2, options) {
  if (!options || !options.styles) {
    throw new Error("styles is missing");
  }
  var abstractNums = readAbstractNums(root2);
  var nums = readNums(root2);
  return new Numbering(nums, abstractNums, options.styles);
}
function readAbstractNums(root2) {
  var abstractNums = {};
  root2.getElementsByTagName("w:abstractNum").forEach(function(element2) {
    var id = element2.attributes["w:abstractNumId"];
    abstractNums[id] = readAbstractNum(element2);
  });
  return abstractNums;
}
function readAbstractNum(element2) {
  var levels = {};
  var levelWithoutIndex = null;
  element2.getElementsByTagName("w:lvl").forEach(function(levelElement) {
    var levelIndex = levelElement.attributes["w:ilvl"];
    var numFmt = levelElement.firstOrEmpty("w:numFmt").attributes["w:val"];
    var isOrdered = numFmt !== "bullet";
    var paragraphStyleId = levelElement.firstOrEmpty("w:pStyle").attributes["w:val"];
    if (levelIndex === void 0) {
      levelWithoutIndex = {
        isOrdered,
        level: "0",
        paragraphStyleId
      };
    } else {
      levels[levelIndex] = {
        isOrdered,
        level: levelIndex,
        paragraphStyleId
      };
    }
  });
  if (levelWithoutIndex !== null && levels[levelWithoutIndex.level] === void 0) {
    levels[levelWithoutIndex.level] = levelWithoutIndex;
  }
  var numStyleLink = element2.firstOrEmpty("w:numStyleLink").attributes["w:val"];
  return { levels, numStyleLink };
}
function readNums(root2) {
  var nums = {};
  root2.getElementsByTagName("w:num").forEach(function(element2) {
    var numId = element2.attributes["w:numId"];
    var abstractNumId = element2.first("w:abstractNumId").attributes["w:val"];
    nums[numId] = { abstractNumId };
  });
  return nums;
}
var stylesReader$1 = {};
stylesReader$1.readStylesXml = readStylesXml;
stylesReader$1.Styles = Styles;
stylesReader$1.defaultStyles = new Styles({}, {});
function Styles(paragraphStyles, characterStyles, tableStyles, numberingStyles) {
  return {
    findParagraphStyleById: function(styleId) {
      return paragraphStyles[styleId];
    },
    findCharacterStyleById: function(styleId) {
      return characterStyles[styleId];
    },
    findTableStyleById: function(styleId) {
      return tableStyles[styleId];
    },
    findNumberingStyleById: function(styleId) {
      return numberingStyles[styleId];
    }
  };
}
Styles.EMPTY = new Styles({}, {}, {}, {});
function readStylesXml(root2) {
  var paragraphStyles = {};
  var characterStyles = {};
  var tableStyles = {};
  var numberingStyles = {};
  var styles = {
    "paragraph": paragraphStyles,
    "character": characterStyles,
    "table": tableStyles,
    "numbering": numberingStyles
  };
  root2.getElementsByTagName("w:style").forEach(function(styleElement) {
    var style = readStyleElement(styleElement);
    var styleSet = styles[style.type];
    if (styleSet && styleSet[style.styleId] === void 0) {
      styleSet[style.styleId] = style;
    }
  });
  return new Styles(paragraphStyles, characterStyles, tableStyles, numberingStyles);
}
function readStyleElement(styleElement) {
  var type = styleElement.attributes["w:type"];
  if (type === "numbering") {
    return readNumberingStyleElement(type, styleElement);
  } else {
    var styleId = readStyleId(styleElement);
    var name = styleName(styleElement);
    return { type, styleId, name };
  }
}
function styleName(styleElement) {
  var nameElement = styleElement.first("w:name");
  return nameElement ? nameElement.attributes["w:val"] : null;
}
function readNumberingStyleElement(type, styleElement) {
  var styleId = readStyleId(styleElement);
  var numId = styleElement.firstOrEmpty("w:pPr").firstOrEmpty("w:numPr").firstOrEmpty("w:numId").attributes["w:val"];
  return { type, numId, styleId };
}
function readStyleId(styleElement) {
  return styleElement.attributes["w:styleId"];
}
var notesReader$1 = {};
var documents$4 = documents$7;
var Result$4 = results$2.Result;
notesReader$1.createFootnotesReader = createReader.bind(commonjsGlobal, "footnote");
notesReader$1.createEndnotesReader = createReader.bind(commonjsGlobal, "endnote");
function createReader(noteType, bodyReader2) {
  function readNotesXml(element2) {
    return Result$4.combine(element2.getElementsByTagName("w:" + noteType).filter(isFootnoteElement).map(readFootnoteElement));
  }
  function isFootnoteElement(element2) {
    var type = element2.attributes["w:type"];
    return type !== "continuationSeparator" && type !== "separator";
  }
  function readFootnoteElement(footnoteElement) {
    var id = footnoteElement.attributes["w:id"];
    return bodyReader2.readXmlElements(footnoteElement.children).map(function(body) {
      return documents$4.Note({ noteType, noteId: id, body });
    });
  }
  return readNotesXml;
}
var commentsReader$1 = {};
var documents$3 = documents$7;
var Result$3 = results$2.Result;
function createCommentsReader(bodyReader2) {
  function readCommentsXml(element2) {
    return Result$3.combine(element2.getElementsByTagName("w:comment").map(readCommentElement));
  }
  function readCommentElement(element2) {
    var id = element2.attributes["w:id"];
    function readOptionalAttribute(name) {
      return (element2.attributes[name] || "").trim() || null;
    }
    return bodyReader2.readXmlElements(element2.children).map(function(body) {
      return documents$3.comment({
        commentId: id,
        body,
        authorName: readOptionalAttribute("w:author"),
        authorInitials: readOptionalAttribute("w:initials")
      });
    });
  }
  return readCommentsXml;
}
commentsReader$1.createCommentsReader = createCommentsReader;
var files = {};
var promises$4 = promises$7;
files.Files = Files$1;
function Files$1() {
  function read2(uri) {
    return promises$4.reject(new Error("could not open external image: '" + uri + "'\ncannot open linked files from a web browser"));
  }
  return {
    read: read2
  };
}
docxReader$1.read = read;
docxReader$1._findPartPaths = findPartPaths;
var promises$3 = promises$7;
var documents$2 = documents$7;
var Result$2 = results$2.Result;
var zipfile$1 = zipfile$2;
var readXmlFromZipFile = officeXmlReader.readXmlFromZipFile;
var createBodyReader = bodyReader.createBodyReader;
var DocumentXmlReader = documentXmlReader.DocumentXmlReader;
var relationshipsReader = relationshipsReader$1;
var contentTypesReader = contentTypesReader$1;
var numberingXml = numberingXml$1;
var stylesReader = stylesReader$1;
var notesReader = notesReader$1;
var commentsReader = commentsReader$1;
var Files = files.Files;
function read(docxFile, input, options) {
  input = input || {};
  options = options || {};
  var files2 = new Files({
    externalFileAccess: options.externalFileAccess,
    relativeToFile: input.path
  });
  return promises$3.props({
    contentTypes: readContentTypesFromZipFile(docxFile),
    partPaths: findPartPaths(docxFile),
    docxFile,
    files: files2
  }).also(function(result2) {
    return {
      styles: readStylesFromZipFile(docxFile, result2.partPaths.styles)
    };
  }).also(function(result2) {
    return {
      numbering: readNumberingFromZipFile(docxFile, result2.partPaths.numbering, result2.styles)
    };
  }).also(function(result2) {
    return {
      footnotes: readXmlFileWithBody(result2.partPaths.footnotes, result2, function(bodyReader2, xml2) {
        if (xml2) {
          return notesReader.createFootnotesReader(bodyReader2)(xml2);
        } else {
          return new Result$2([]);
        }
      }),
      endnotes: readXmlFileWithBody(result2.partPaths.endnotes, result2, function(bodyReader2, xml2) {
        if (xml2) {
          return notesReader.createEndnotesReader(bodyReader2)(xml2);
        } else {
          return new Result$2([]);
        }
      }),
      comments: readXmlFileWithBody(result2.partPaths.comments, result2, function(bodyReader2, xml2) {
        if (xml2) {
          return commentsReader.createCommentsReader(bodyReader2)(xml2);
        } else {
          return new Result$2([]);
        }
      })
    };
  }).also(function(result2) {
    return {
      notes: result2.footnotes.flatMap(function(footnotes) {
        return result2.endnotes.map(function(endnotes) {
          return new documents$2.Notes(footnotes.concat(endnotes));
        });
      })
    };
  }).then(function(result2) {
    return readXmlFileWithBody(result2.partPaths.mainDocument, result2, function(bodyReader2, xml2) {
      return result2.notes.flatMap(function(notes) {
        return result2.comments.flatMap(function(comments) {
          var reader2 = new DocumentXmlReader({
            bodyReader: bodyReader2,
            notes,
            comments
          });
          return reader2.convertXmlToDocument(xml2);
        });
      });
    });
  });
}
function findPartPaths(docxFile) {
  return readPackageRelationships(docxFile).then(function(packageRelationships) {
    var mainDocumentPath = findPartPath({
      docxFile,
      relationships: packageRelationships,
      relationshipType: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      basePath: "",
      fallbackPath: "word/document.xml"
    });
    if (!docxFile.exists(mainDocumentPath)) {
      throw new Error("Could not find main document part. Are you sure this is a valid .docx file?");
    }
    return xmlFileReader({
      filename: relationshipsFilename(mainDocumentPath),
      readElement: relationshipsReader.readRelationships,
      defaultValue: relationshipsReader.defaultValue
    })(docxFile).then(function(documentRelationships) {
      function findPartRelatedToMainDocument(name) {
        return findPartPath({
          docxFile,
          relationships: documentRelationships,
          relationshipType: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/" + name,
          basePath: zipfile$1.splitPath(mainDocumentPath).dirname,
          fallbackPath: "word/" + name + ".xml"
        });
      }
      return {
        mainDocument: mainDocumentPath,
        comments: findPartRelatedToMainDocument("comments"),
        endnotes: findPartRelatedToMainDocument("endnotes"),
        footnotes: findPartRelatedToMainDocument("footnotes"),
        numbering: findPartRelatedToMainDocument("numbering"),
        styles: findPartRelatedToMainDocument("styles")
      };
    });
  });
}
function findPartPath(options) {
  var docxFile = options.docxFile;
  var relationships = options.relationships;
  var relationshipType = options.relationshipType;
  var basePath = options.basePath;
  var fallbackPath = options.fallbackPath;
  var targets = relationships.findTargetsByType(relationshipType);
  var normalisedTargets = targets.map(function(target) {
    return stripPrefix(zipfile$1.joinPath(basePath, target), "/");
  });
  var validTargets = normalisedTargets.filter(function(target) {
    return docxFile.exists(target);
  });
  if (validTargets.length === 0) {
    return fallbackPath;
  } else {
    return validTargets[0];
  }
}
function stripPrefix(value, prefix) {
  if (value.substring(0, prefix.length) === prefix) {
    return value.substring(prefix.length);
  } else {
    return value;
  }
}
function xmlFileReader(options) {
  return function(zipFile) {
    return readXmlFromZipFile(zipFile, options.filename).then(function(element2) {
      return element2 ? options.readElement(element2) : options.defaultValue;
    });
  };
}
function readXmlFileWithBody(filename, options, func) {
  var readRelationshipsFromZipFile = xmlFileReader({
    filename: relationshipsFilename(filename),
    readElement: relationshipsReader.readRelationships,
    defaultValue: relationshipsReader.defaultValue
  });
  return readRelationshipsFromZipFile(options.docxFile).then(function(relationships) {
    var bodyReader2 = new createBodyReader({
      relationships,
      contentTypes: options.contentTypes,
      docxFile: options.docxFile,
      numbering: options.numbering,
      styles: options.styles,
      files: options.files
    });
    return readXmlFromZipFile(options.docxFile, filename).then(function(xml2) {
      return func(bodyReader2, xml2);
    });
  });
}
function relationshipsFilename(filename) {
  var split2 = zipfile$1.splitPath(filename);
  return zipfile$1.joinPath(split2.dirname, "_rels", split2.basename + ".rels");
}
var readContentTypesFromZipFile = xmlFileReader({
  filename: "[Content_Types].xml",
  readElement: contentTypesReader.readContentTypesFromXml,
  defaultValue: contentTypesReader.defaultContentTypes
});
function readNumberingFromZipFile(zipFile, path, styles) {
  return xmlFileReader({
    filename: path,
    readElement: function(element2) {
      return numberingXml.readNumberingXml(element2, { styles });
    },
    defaultValue: numberingXml.defaultNumbering
  })(zipFile);
}
function readStylesFromZipFile(zipFile, path) {
  return xmlFileReader({
    filename: path,
    readElement: stylesReader.readStylesXml,
    defaultValue: stylesReader.defaultStyles
  })(zipFile);
}
var readPackageRelationships = xmlFileReader({
  filename: "_rels/.rels",
  readElement: relationshipsReader.readRelationships,
  defaultValue: relationshipsReader.defaultValue
});
var styleMap = {};
var _$6 = require$$0;
var promises$2 = promises$7;
var xml = xml$3;
styleMap.writeStyleMap = writeStyleMap;
styleMap.readStyleMap = readStyleMap$1;
var schema = "http://schemas.zwobble.org/mammoth/style-map";
var styleMapPath = "mammoth/style-map";
var styleMapAbsolutePath = "/" + styleMapPath;
function writeStyleMap(docxFile, styleMap2) {
  docxFile.write(styleMapPath, styleMap2);
  return updateRelationships(docxFile).then(function() {
    return updateContentTypes(docxFile);
  });
}
function updateRelationships(docxFile) {
  var path = "word/_rels/document.xml.rels";
  var relationshipsUri = "http://schemas.openxmlformats.org/package/2006/relationships";
  var relationshipElementName = "{" + relationshipsUri + "}Relationship";
  return docxFile.read(path, "utf8").then(xml.readString).then(function(relationshipsContainer) {
    var relationships = relationshipsContainer.children;
    addOrUpdateElement(relationships, relationshipElementName, "Id", {
      "Id": "rMammothStyleMap",
      "Type": schema,
      "Target": styleMapAbsolutePath
    });
    var namespaces = { "": relationshipsUri };
    return docxFile.write(path, xml.writeString(relationshipsContainer, namespaces));
  });
}
function updateContentTypes(docxFile) {
  var path = "[Content_Types].xml";
  var contentTypesUri = "http://schemas.openxmlformats.org/package/2006/content-types";
  var overrideName = "{" + contentTypesUri + "}Override";
  return docxFile.read(path, "utf8").then(xml.readString).then(function(typesElement) {
    var children = typesElement.children;
    addOrUpdateElement(children, overrideName, "PartName", {
      "PartName": styleMapAbsolutePath,
      "ContentType": "text/prs.mammoth.style-map"
    });
    var namespaces = { "": contentTypesUri };
    return docxFile.write(path, xml.writeString(typesElement, namespaces));
  });
}
function addOrUpdateElement(elements2, name, identifyingAttribute, attributes) {
  var existingElement = _$6.find(elements2, function(element2) {
    return element2.name === name && element2.attributes[identifyingAttribute] === attributes[identifyingAttribute];
  });
  if (existingElement) {
    existingElement.attributes = attributes;
  } else {
    elements2.push(xml.element(name, attributes));
  }
}
function readStyleMap$1(docxFile) {
  if (docxFile.exists(styleMapPath)) {
    return docxFile.read(styleMapPath, "utf8");
  } else {
    return promises$2.resolve(null);
  }
}
var documentToHtml = {};
var htmlPaths$3 = {};
var html = {};
var ast = {};
var hasRequiredAst;
function requireAst() {
  if (hasRequiredAst) return ast;
  hasRequiredAst = 1;
  var htmlPaths2 = requireHtmlPaths();
  function nonFreshElement(tagName, attributes, children) {
    return elementWithTag(
      htmlPaths2.element(tagName, attributes, { fresh: false }),
      children
    );
  }
  function freshElement(tagName, attributes, children) {
    var tag = htmlPaths2.element(tagName, attributes, { fresh: true });
    return elementWithTag(tag, children);
  }
  function elementWithTag(tag, children) {
    return {
      type: "element",
      tag,
      children: children || []
    };
  }
  function text(value) {
    return {
      type: "text",
      value
    };
  }
  var forceWrite = {
    type: "forceWrite"
  };
  ast.freshElement = freshElement;
  ast.nonFreshElement = nonFreshElement;
  ast.elementWithTag = elementWithTag;
  ast.text = text;
  ast.forceWrite = forceWrite;
  var voidTagNames = {
    "br": true,
    "hr": true,
    "img": true,
    "input": true
  };
  function isVoidElement(node) {
    return node.children.length === 0 && voidTagNames[node.tag.tagName];
  }
  ast.isVoidElement = isVoidElement;
  return ast;
}
var simplify_1;
var hasRequiredSimplify;
function requireSimplify() {
  if (hasRequiredSimplify) return simplify_1;
  hasRequiredSimplify = 1;
  var _2 = require$$0;
  var ast2 = requireAst();
  function simplify(nodes2) {
    return collapse(removeEmpty(nodes2));
  }
  function collapse(nodes2) {
    var children = [];
    nodes2.map(collapseNode).forEach(function(child) {
      appendChild(children, child);
    });
    return children;
  }
  function collapseNode(node) {
    return collapsers[node.type](node);
  }
  var collapsers = {
    element: collapseElement,
    text: identity2,
    forceWrite: identity2
  };
  function collapseElement(node) {
    return ast2.elementWithTag(node.tag, collapse(node.children));
  }
  function identity2(value) {
    return value;
  }
  function appendChild(children, child) {
    var lastChild = children[children.length - 1];
    if (child.type === "element" && !child.tag.fresh && lastChild && lastChild.type === "element" && child.tag.matchesElement(lastChild.tag)) {
      if (child.tag.separator) {
        appendChild(lastChild.children, ast2.text(child.tag.separator));
      }
      child.children.forEach(function(grandChild) {
        appendChild(lastChild.children, grandChild);
      });
    } else {
      children.push(child);
    }
  }
  function removeEmpty(nodes2) {
    return flatMap2(nodes2, function(node) {
      return emptiers[node.type](node);
    });
  }
  function flatMap2(values2, func) {
    return _2.flatten(_2.map(values2, func), true);
  }
  var emptiers = {
    element: elementEmptier,
    text: textEmptier,
    forceWrite: neverEmpty
  };
  function neverEmpty(node) {
    return [node];
  }
  function elementEmptier(element2) {
    var children = removeEmpty(element2.children);
    if (children.length === 0 && !ast2.isVoidElement(element2)) {
      return [];
    } else {
      return [ast2.elementWithTag(element2.tag, children)];
    }
  }
  function textEmptier(node) {
    if (node.value.length === 0) {
      return [];
    } else {
      return [node];
    }
  }
  simplify_1 = simplify;
  return simplify_1;
}
var hasRequiredHtml;
function requireHtml() {
  if (hasRequiredHtml) return html;
  hasRequiredHtml = 1;
  var ast2 = requireAst();
  html.freshElement = ast2.freshElement;
  html.nonFreshElement = ast2.nonFreshElement;
  html.elementWithTag = ast2.elementWithTag;
  html.text = ast2.text;
  html.forceWrite = ast2.forceWrite;
  html.simplify = requireSimplify();
  function write(writer2, nodes2) {
    nodes2.forEach(function(node) {
      writeNode(writer2, node);
    });
  }
  function writeNode(writer2, node) {
    toStrings[node.type](writer2, node);
  }
  var toStrings = {
    element: generateElementString,
    text: generateTextString,
    forceWrite: function() {
    }
  };
  function generateElementString(writer2, node) {
    if (ast2.isVoidElement(node)) {
      writer2.selfClosing(node.tag.tagName, node.tag.attributes);
    } else {
      writer2.open(node.tag.tagName, node.tag.attributes);
      write(writer2, node.children);
      writer2.close(node.tag.tagName);
    }
  }
  function generateTextString(writer2, node) {
    writer2.text(node.value);
  }
  html.write = write;
  return html;
}
var hasRequiredHtmlPaths;
function requireHtmlPaths() {
  if (hasRequiredHtmlPaths) return htmlPaths$3;
  hasRequiredHtmlPaths = 1;
  var _2 = require$$0;
  var html2 = requireHtml();
  htmlPaths$3.topLevelElement = topLevelElement;
  htmlPaths$3.elements = elements2;
  htmlPaths$3.element = element2;
  function topLevelElement(tagName, attributes) {
    return elements2([element2(tagName, attributes, { fresh: true })]);
  }
  function elements2(elementStyles) {
    return new HtmlPath(elementStyles.map(function(elementStyle) {
      if (_2.isString(elementStyle)) {
        return element2(elementStyle);
      } else {
        return elementStyle;
      }
    }));
  }
  function HtmlPath(elements3) {
    this._elements = elements3;
  }
  HtmlPath.prototype.wrap = function wrap2(children) {
    var result2 = children();
    for (var index2 = this._elements.length - 1; index2 >= 0; index2--) {
      result2 = this._elements[index2].wrapNodes(result2);
    }
    return result2;
  };
  function element2(tagName, attributes, options) {
    options = options || {};
    return new Element2(tagName, attributes, options);
  }
  function Element2(tagName, attributes, options) {
    var tagNames = {};
    if (_2.isArray(tagName)) {
      tagName.forEach(function(tagName2) {
        tagNames[tagName2] = true;
      });
      tagName = tagName[0];
    } else {
      tagNames[tagName] = true;
    }
    this.tagName = tagName;
    this.tagNames = tagNames;
    this.attributes = attributes || {};
    this.fresh = options.fresh;
    this.separator = options.separator;
  }
  Element2.prototype.matchesElement = function(element3) {
    return this.tagNames[element3.tagName] && _2.isEqual(this.attributes || {}, element3.attributes || {});
  };
  Element2.prototype.wrap = function wrap2(generateNodes) {
    return this.wrapNodes(generateNodes());
  };
  Element2.prototype.wrapNodes = function wrapNodes(nodes2) {
    return [html2.elementWithTag(this, nodes2)];
  };
  htmlPaths$3.empty = elements2([]);
  htmlPaths$3.ignore = {
    wrap: function() {
      return [];
    }
  };
  return htmlPaths$3;
}
var images$2 = {};
(function(exports) {
  var _2 = require$$0;
  var promises2 = promises$7;
  var Html2 = requireHtml();
  exports.imgElement = imgElement;
  function imgElement(func) {
    return function(element2, messages) {
      return promises2.when(func(element2)).then(function(result2) {
        var attributes = {};
        if (element2.altText) {
          attributes.alt = element2.altText;
        }
        _2.extend(attributes, result2);
        return [Html2.freshElement("img", attributes)];
      });
    };
  }
  exports.inline = exports.imgElement;
  exports.dataUri = imgElement(function(element2) {
    return element2.readAsBase64String().then(function(imageBuffer) {
      return {
        src: "data:" + element2.contentType + ";base64," + imageBuffer
      };
    });
  });
})(images$2);
var writers$1 = {};
var htmlWriter$1 = {};
var _$5 = require$$0;
htmlWriter$1.writer = writer$1;
function writer$1(options) {
  options = options || {};
  if (options.prettyPrint) {
    return prettyWriter();
  } else {
    return simpleWriter();
  }
}
var indentedElements = {
  div: true,
  p: true,
  ul: true,
  li: true
};
function prettyWriter() {
  var indentationLevel = 0;
  var indentation = "  ";
  var stack = [];
  var start = true;
  var inText = false;
  var writer2 = simpleWriter();
  function open(tagName, attributes) {
    if (indentedElements[tagName]) {
      indent();
    }
    stack.push(tagName);
    writer2.open(tagName, attributes);
    if (indentedElements[tagName]) {
      indentationLevel++;
    }
    start = false;
  }
  function close(tagName) {
    if (indentedElements[tagName]) {
      indentationLevel--;
      indent();
    }
    stack.pop();
    writer2.close(tagName);
  }
  function text(value) {
    startText();
    var text2 = isInPre() ? value : value.replace("\n", "\n" + indentation);
    writer2.text(text2);
  }
  function selfClosing(tagName, attributes) {
    indent();
    writer2.selfClosing(tagName, attributes);
  }
  function insideIndentedElement() {
    return stack.length === 0 || indentedElements[stack[stack.length - 1]];
  }
  function startText() {
    if (!inText) {
      indent();
      inText = true;
    }
  }
  function indent() {
    inText = false;
    if (!start && insideIndentedElement() && !isInPre()) {
      writer2._append("\n");
      for (var i = 0; i < indentationLevel; i++) {
        writer2._append(indentation);
      }
    }
  }
  function isInPre() {
    return _$5.some(stack, function(tagName) {
      return tagName === "pre";
    });
  }
  return {
    asString: writer2.asString,
    open,
    close,
    text,
    selfClosing
  };
}
function simpleWriter() {
  var fragments = [];
  function open(tagName, attributes) {
    var attributeString = generateAttributeString(attributes);
    fragments.push("<" + tagName + attributeString + ">");
  }
  function close(tagName) {
    fragments.push("</" + tagName + ">");
  }
  function selfClosing(tagName, attributes) {
    var attributeString = generateAttributeString(attributes);
    fragments.push("<" + tagName + attributeString + " />");
  }
  function generateAttributeString(attributes) {
    return _$5.map(attributes, function(value, key) {
      return " " + key + '="' + escapeHtmlAttribute(value) + '"';
    }).join("");
  }
  function text(value) {
    fragments.push(escapeHtmlText(value));
  }
  function append(html2) {
    fragments.push(html2);
  }
  function asString() {
    return fragments.join("");
  }
  return {
    asString,
    open,
    close,
    text,
    selfClosing,
    _append: append
  };
}
function escapeHtmlText(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeHtmlAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var markdownWriter$2 = {};
var _$4 = require$$0;
function symmetricMarkdownElement(end) {
  return markdownElement(end, end);
}
function markdownElement(start, end) {
  return function() {
    return { start, end };
  };
}
function markdownLink(attributes) {
  var href = attributes.href || "";
  if (href) {
    return {
      start: "[",
      end: "](" + href + ")",
      anchorPosition: "before"
    };
  } else {
    return {};
  }
}
function markdownImage(attributes) {
  var src = attributes.src || "";
  var altText = attributes.alt || "";
  if (src || altText) {
    return { start: "![" + altText + "](" + src + ")" };
  } else {
    return {};
  }
}
function markdownList(options) {
  return function(attributes, list) {
    return {
      start: list ? "\n" : "",
      end: list ? "" : "\n",
      list: {
        isOrdered: options.isOrdered,
        indent: list ? list.indent + 1 : 0,
        count: 0
      }
    };
  };
}
function markdownListItem(attributes, list, listItem) {
  list = list || { indent: 0, isOrdered: false, count: 0 };
  list.count++;
  listItem.hasClosed = false;
  var bullet = list.isOrdered ? list.count + "." : "-";
  var start = repeatString("	", list.indent) + bullet + " ";
  return {
    start,
    end: function() {
      if (!listItem.hasClosed) {
        listItem.hasClosed = true;
        return "\n";
      }
    }
  };
}
var htmlToMarkdown = {
  "p": markdownElement("", "\n\n"),
  "br": markdownElement("", "  \n"),
  "ul": markdownList({ isOrdered: false }),
  "ol": markdownList({ isOrdered: true }),
  "li": markdownListItem,
  "strong": symmetricMarkdownElement("__"),
  "em": symmetricMarkdownElement("*"),
  "a": markdownLink,
  "img": markdownImage
};
(function() {
  for (var i = 1; i <= 6; i++) {
    htmlToMarkdown["h" + i] = markdownElement(repeatString("#", i) + " ", "\n\n");
  }
})();
function repeatString(value, count) {
  return new Array(count + 1).join(value);
}
function markdownWriter$1() {
  var fragments = [];
  var elementStack = [];
  var list = null;
  var listItem = {};
  function open(tagName, attributes) {
    attributes = attributes || {};
    var createElement = htmlToMarkdown[tagName] || function() {
      return {};
    };
    var element2 = createElement(attributes, list, listItem);
    elementStack.push({ end: element2.end, list });
    if (element2.list) {
      list = element2.list;
    }
    var anchorBeforeStart = element2.anchorPosition === "before";
    if (anchorBeforeStart) {
      writeAnchor(attributes);
    }
    fragments.push(element2.start || "");
    if (!anchorBeforeStart) {
      writeAnchor(attributes);
    }
  }
  function writeAnchor(attributes) {
    if (attributes.id) {
      fragments.push('<a id="' + attributes.id + '"></a>');
    }
  }
  function close(tagName) {
    var element2 = elementStack.pop();
    list = element2.list;
    var end = _$4.isFunction(element2.end) ? element2.end() : element2.end;
    fragments.push(end || "");
  }
  function selfClosing(tagName, attributes) {
    open(tagName, attributes);
    close();
  }
  function text(value) {
    fragments.push(escapeMarkdown(value));
  }
  function asString() {
    return fragments.join("");
  }
  return {
    asString,
    open,
    close,
    text,
    selfClosing
  };
}
markdownWriter$2.writer = markdownWriter$1;
function escapeMarkdown(value) {
  return value.replace(/\\/g, "\\\\").replace(/([\`\*_\{\}\[\]\(\)\#\+\-\.\!])/g, "\\$1");
}
var htmlWriter = htmlWriter$1;
var markdownWriter = markdownWriter$2;
writers$1.writer = writer;
function writer(options) {
  options = options || {};
  if (options.outputFormat === "markdown") {
    return markdownWriter.writer();
  } else {
    return htmlWriter.writer(options);
  }
}
var _$3 = require$$0;
var promises$1 = promises$7;
var documents$1 = documents$7;
var htmlPaths$2 = requireHtmlPaths();
var results$1 = results$2;
var images$1 = images$2;
var Html$1 = requireHtml();
var writers = writers$1;
documentToHtml.DocumentConverter = DocumentConverter$1;
function DocumentConverter$1(options) {
  return {
    convertToHtml: function(element2) {
      var comments = _$3.indexBy(
        element2.type === documents$1.types.document ? element2.comments : [],
        "commentId"
      );
      var conversion = new DocumentConversion(options, comments);
      return conversion.convertToHtml(element2);
    }
  };
}
function DocumentConversion(options, comments) {
  var noteNumber = 1;
  var noteReferences = [];
  var referencedComments = [];
  options = _$3.extend({ ignoreEmptyParagraphs: true }, options);
  var idPrefix = options.idPrefix === void 0 ? "" : options.idPrefix;
  var ignoreEmptyParagraphs = options.ignoreEmptyParagraphs;
  var defaultParagraphStyle = htmlPaths$2.topLevelElement("p");
  var styleMap2 = options.styleMap || [];
  function convertToHtml2(document2) {
    var messages = [];
    var html2 = elementToHtml(document2, messages, {});
    var deferredNodes = [];
    walkHtml(html2, function(node) {
      if (node.type === "deferred") {
        deferredNodes.push(node);
      }
    });
    var deferredValues = {};
    return promises$1.mapSeries(deferredNodes, function(deferred) {
      return deferred.value().then(function(value) {
        deferredValues[deferred.id] = value;
      });
    }).then(function() {
      function replaceDeferred(nodes2) {
        return flatMap(nodes2, function(node) {
          if (node.type === "deferred") {
            return deferredValues[node.id];
          } else if (node.children) {
            return [
              _$3.extend({}, node, {
                children: replaceDeferred(node.children)
              })
            ];
          } else {
            return [node];
          }
        });
      }
      var writer2 = writers.writer({
        prettyPrint: options.prettyPrint,
        outputFormat: options.outputFormat
      });
      Html$1.write(writer2, Html$1.simplify(replaceDeferred(html2)));
      return new results$1.Result(writer2.asString(), messages);
    });
  }
  function convertElements(elements2, messages, options2) {
    return flatMap(elements2, function(element2) {
      return elementToHtml(element2, messages, options2);
    });
  }
  function elementToHtml(element2, messages, options2) {
    if (!options2) {
      throw new Error("options not set");
    }
    var handler = elementConverters[element2.type];
    if (handler) {
      return handler(element2, messages, options2);
    } else {
      return [];
    }
  }
  function convertParagraph(element2, messages, options2) {
    return htmlPathForParagraph(element2, messages).wrap(function() {
      var content = convertElements(element2.children, messages, options2);
      if (ignoreEmptyParagraphs) {
        return content;
      } else {
        return [Html$1.forceWrite].concat(content);
      }
    });
  }
  function htmlPathForParagraph(element2, messages) {
    var style = findStyle(element2);
    if (style) {
      return style.to;
    } else {
      if (element2.styleId) {
        messages.push(unrecognisedStyleWarning("paragraph", element2));
      }
      return defaultParagraphStyle;
    }
  }
  function convertRun(run2, messages, options2) {
    var nodes2 = function() {
      return convertElements(run2.children, messages, options2);
    };
    var paths = [];
    if (run2.highlight !== null) {
      var path = findHtmlPath({ type: "highlight", color: run2.highlight });
      if (path) {
        paths.push(path);
      }
    }
    if (run2.isSmallCaps) {
      paths.push(findHtmlPathForRunProperty("smallCaps"));
    }
    if (run2.isAllCaps) {
      paths.push(findHtmlPathForRunProperty("allCaps"));
    }
    if (run2.isStrikethrough) {
      paths.push(findHtmlPathForRunProperty("strikethrough", "s"));
    }
    if (run2.isUnderline) {
      paths.push(findHtmlPathForRunProperty("underline"));
    }
    if (run2.verticalAlignment === documents$1.verticalAlignment.subscript) {
      paths.push(htmlPaths$2.element("sub", {}, { fresh: false }));
    }
    if (run2.verticalAlignment === documents$1.verticalAlignment.superscript) {
      paths.push(htmlPaths$2.element("sup", {}, { fresh: false }));
    }
    if (run2.isItalic) {
      paths.push(findHtmlPathForRunProperty("italic", "em"));
    }
    if (run2.isBold) {
      paths.push(findHtmlPathForRunProperty("bold", "strong"));
    }
    var stylePath = htmlPaths$2.empty;
    var style = findStyle(run2);
    if (style) {
      stylePath = style.to;
    } else if (run2.styleId) {
      messages.push(unrecognisedStyleWarning("run", run2));
    }
    paths.push(stylePath);
    paths.forEach(function(path2) {
      nodes2 = path2.wrap.bind(path2, nodes2);
    });
    return nodes2();
  }
  function findHtmlPathForRunProperty(elementType, defaultTagName) {
    var path = findHtmlPath({ type: elementType });
    if (path) {
      return path;
    } else if (defaultTagName) {
      return htmlPaths$2.element(defaultTagName, {}, { fresh: false });
    } else {
      return htmlPaths$2.empty;
    }
  }
  function findHtmlPath(element2, defaultPath) {
    var style = findStyle(element2);
    return style ? style.to : defaultPath;
  }
  function findStyle(element2) {
    for (var i = 0; i < styleMap2.length; i++) {
      if (styleMap2[i].from.matches(element2)) {
        return styleMap2[i];
      }
    }
  }
  function recoveringConvertImage(convertImage) {
    return function(image, messages) {
      return promises$1.attempt(function() {
        return convertImage(image, messages);
      }).caught(function(error2) {
        messages.push(results$1.error(error2));
        return [];
      });
    };
  }
  function noteHtmlId(note) {
    return referentHtmlId(note.noteType, note.noteId);
  }
  function noteRefHtmlId(note) {
    return referenceHtmlId(note.noteType, note.noteId);
  }
  function referentHtmlId(referenceType, referenceId) {
    return htmlId(referenceType + "-" + referenceId);
  }
  function referenceHtmlId(referenceType, referenceId) {
    return htmlId(referenceType + "-ref-" + referenceId);
  }
  function htmlId(suffix) {
    return idPrefix + suffix;
  }
  var defaultTablePath = htmlPaths$2.elements([
    htmlPaths$2.element("table", {}, { fresh: true })
  ]);
  function convertTable(element2, messages, options2) {
    return findHtmlPath(element2, defaultTablePath).wrap(function() {
      return convertTableChildren(element2, messages, options2);
    });
  }
  function convertTableChildren(element2, messages, options2) {
    var bodyIndex = _$3.findIndex(element2.children, function(child) {
      return !child.type === documents$1.types.tableRow || !child.isHeader;
    });
    if (bodyIndex === -1) {
      bodyIndex = element2.children.length;
    }
    var children;
    if (bodyIndex === 0) {
      children = convertElements(
        element2.children,
        messages,
        _$3.extend({}, options2, { isTableHeader: false })
      );
    } else {
      var headRows = convertElements(
        element2.children.slice(0, bodyIndex),
        messages,
        _$3.extend({}, options2, { isTableHeader: true })
      );
      var bodyRows = convertElements(
        element2.children.slice(bodyIndex),
        messages,
        _$3.extend({}, options2, { isTableHeader: false })
      );
      children = [
        Html$1.freshElement("thead", {}, headRows),
        Html$1.freshElement("tbody", {}, bodyRows)
      ];
    }
    return [Html$1.forceWrite].concat(children);
  }
  function convertTableRow(element2, messages, options2) {
    var children = convertElements(element2.children, messages, options2);
    return [
      Html$1.freshElement("tr", {}, [Html$1.forceWrite].concat(children))
    ];
  }
  function convertTableCell(element2, messages, options2) {
    var tagName = options2.isTableHeader ? "th" : "td";
    var children = convertElements(element2.children, messages, options2);
    var attributes = {};
    if (element2.colSpan !== 1) {
      attributes.colspan = element2.colSpan.toString();
    }
    if (element2.rowSpan !== 1) {
      attributes.rowspan = element2.rowSpan.toString();
    }
    return [
      Html$1.freshElement(tagName, attributes, [Html$1.forceWrite].concat(children))
    ];
  }
  function convertCommentReference(reference, messages, options2) {
    return findHtmlPath(reference, htmlPaths$2.ignore).wrap(function() {
      var comment2 = comments[reference.commentId];
      var count = referencedComments.length + 1;
      var label = "[" + commentAuthorLabel(comment2) + count + "]";
      referencedComments.push({ label, comment: comment2 });
      return [
        Html$1.freshElement("a", {
          href: "#" + referentHtmlId("comment", reference.commentId),
          id: referenceHtmlId("comment", reference.commentId)
        }, [Html$1.text(label)])
      ];
    });
  }
  function convertComment(referencedComment, messages, options2) {
    var label = referencedComment.label;
    var comment2 = referencedComment.comment;
    var body = convertElements(comment2.body, messages, options2).concat([
      Html$1.nonFreshElement("p", {}, [
        Html$1.text(" "),
        Html$1.freshElement("a", { "href": "#" + referenceHtmlId("comment", comment2.commentId) }, [
          Html$1.text("↑")
        ])
      ])
    ]);
    return [
      Html$1.freshElement(
        "dt",
        { "id": referentHtmlId("comment", comment2.commentId) },
        [Html$1.text("Comment " + label)]
      ),
      Html$1.freshElement("dd", {}, body)
    ];
  }
  function convertBreak(element2, messages, options2) {
    return htmlPathForBreak(element2).wrap(function() {
      return [];
    });
  }
  function htmlPathForBreak(element2) {
    var style = findStyle(element2);
    if (style) {
      return style.to;
    } else if (element2.breakType === "line") {
      return htmlPaths$2.topLevelElement("br");
    } else {
      return htmlPaths$2.empty;
    }
  }
  var elementConverters = {
    "document": function(document2, messages, options2) {
      var children = convertElements(document2.children, messages, options2);
      var notes = noteReferences.map(function(noteReference) {
        return document2.notes.resolve(noteReference);
      });
      var notesNodes = convertElements(notes, messages, options2);
      return children.concat([
        Html$1.freshElement("ol", {}, notesNodes),
        Html$1.freshElement("dl", {}, flatMap(referencedComments, function(referencedComment) {
          return convertComment(referencedComment, messages, options2);
        }))
      ]);
    },
    "paragraph": convertParagraph,
    "run": convertRun,
    "text": function(element2, messages, options2) {
      return [Html$1.text(element2.value)];
    },
    "tab": function(element2, messages, options2) {
      return [Html$1.text("	")];
    },
    "hyperlink": function(element2, messages, options2) {
      var href = element2.anchor ? "#" + htmlId(element2.anchor) : element2.href;
      var attributes = { href };
      if (element2.targetFrame != null) {
        attributes.target = element2.targetFrame;
      }
      var children = convertElements(element2.children, messages, options2);
      return [Html$1.nonFreshElement("a", attributes, children)];
    },
    "checkbox": function(element2) {
      var attributes = { type: "checkbox" };
      if (element2.checked) {
        attributes["checked"] = "checked";
      }
      return [Html$1.freshElement("input", attributes)];
    },
    "bookmarkStart": function(element2, messages, options2) {
      var anchor = Html$1.freshElement("a", {
        id: htmlId(element2.name)
      }, [Html$1.forceWrite]);
      return [anchor];
    },
    "noteReference": function(element2, messages, options2) {
      noteReferences.push(element2);
      var anchor = Html$1.freshElement("a", {
        href: "#" + noteHtmlId(element2),
        id: noteRefHtmlId(element2)
      }, [Html$1.text("[" + noteNumber++ + "]")]);
      return [Html$1.freshElement("sup", {}, [anchor])];
    },
    "note": function(element2, messages, options2) {
      var children = convertElements(element2.body, messages, options2);
      var backLink = Html$1.elementWithTag(htmlPaths$2.element("p", {}, { fresh: false }), [
        Html$1.text(" "),
        Html$1.freshElement("a", { href: "#" + noteRefHtmlId(element2) }, [Html$1.text("↑")])
      ]);
      var body = children.concat([backLink]);
      return Html$1.freshElement("li", { id: noteHtmlId(element2) }, body);
    },
    "commentReference": convertCommentReference,
    "comment": convertComment,
    "image": deferredConversion(recoveringConvertImage(options.convertImage || images$1.dataUri)),
    "table": convertTable,
    "tableRow": convertTableRow,
    "tableCell": convertTableCell,
    "break": convertBreak
  };
  return {
    convertToHtml: convertToHtml2
  };
}
var deferredId = 1;
function deferredConversion(func) {
  return function(element2, messages, options) {
    return [
      {
        type: "deferred",
        id: deferredId++,
        value: function() {
          return func(element2, messages, options);
        }
      }
    ];
  };
}
function unrecognisedStyleWarning(type, element2) {
  return results$1.warning(
    "Unrecognised " + type + " style: '" + element2.styleName + "' (Style ID: " + element2.styleId + ")"
  );
}
function flatMap(values2, func) {
  return _$3.flatten(values2.map(func), true);
}
function walkHtml(nodes2, callback) {
  nodes2.forEach(function(node) {
    callback(node);
    if (node.children) {
      walkHtml(node.children, callback);
    }
  });
}
var commentAuthorLabel = documentToHtml.commentAuthorLabel = function commentAuthorLabel2(comment2) {
  return comment2.authorInitials || "";
};
var rawText = {};
var documents = documents$7;
function convertElementToRawText$1(element2) {
  if (element2.type === "text") {
    return element2.value;
  } else if (element2.type === documents.types.tab) {
    return "	";
  } else {
    var tail = element2.type === "paragraph" ? "\n\n" : "";
    return (element2.children || []).map(convertElementToRawText$1).join("") + tail;
  }
}
rawText.convertElementToRawText = convertElementToRawText$1;
var styleReader = {};
var lop$2 = {};
var parser = {};
var TokenIterator$2 = { exports: {} };
var TokenIterator$1 = TokenIterator$2.exports = function(tokens, startIndex) {
  this._tokens = tokens;
  this._startIndex = startIndex || 0;
};
TokenIterator$1.prototype.head = function() {
  return this._tokens[this._startIndex];
};
TokenIterator$1.prototype.tail = function(startIndex) {
  return new TokenIterator$1(this._tokens, this._startIndex + 1);
};
TokenIterator$1.prototype.toArray = function() {
  return this._tokens.slice(this._startIndex);
};
TokenIterator$1.prototype.end = function() {
  return this._tokens[this._tokens.length - 1];
};
TokenIterator$1.prototype.to = function(end) {
  var start = this.head().source;
  var endToken = end.head() || end.end();
  return start.to(endToken.source);
};
var TokenIteratorExports = TokenIterator$2.exports;
var TokenIterator = TokenIteratorExports;
parser.Parser = function(options) {
  var parseTokens = function(parser2, tokens) {
    return parser2(new TokenIterator(tokens));
  };
  return {
    parseTokens
  };
};
var rules = {};
var option = {};
(function(exports) {
  exports.none = /* @__PURE__ */ Object.create({
    value: function() {
      throw new Error("Called value on none");
    },
    isNone: function() {
      return true;
    },
    isSome: function() {
      return false;
    },
    map: function() {
      return exports.none;
    },
    flatMap: function() {
      return exports.none;
    },
    filter: function() {
      return exports.none;
    },
    toArray: function() {
      return [];
    },
    orElse: callOrReturn,
    valueOrElse: callOrReturn
  });
  function callOrReturn(value) {
    if (typeof value == "function") {
      return value();
    } else {
      return value;
    }
  }
  exports.some = function(value) {
    return new Some(value);
  };
  var Some = function(value) {
    this._value = value;
  };
  Some.prototype.value = function() {
    return this._value;
  };
  Some.prototype.isNone = function() {
    return false;
  };
  Some.prototype.isSome = function() {
    return true;
  };
  Some.prototype.map = function(func) {
    return new Some(func(this._value));
  };
  Some.prototype.flatMap = function(func) {
    return func(this._value);
  };
  Some.prototype.filter = function(predicate) {
    return predicate(this._value) ? this : exports.none;
  };
  Some.prototype.toArray = function() {
    return [this._value];
  };
  Some.prototype.orElse = function(value) {
    return this;
  };
  Some.prototype.valueOrElse = function(value) {
    return this._value;
  };
  exports.isOption = function(value) {
    return value === exports.none || value instanceof Some;
  };
  exports.fromNullable = function(value) {
    if (value == null) {
      return exports.none;
    }
    return new Some(value);
  };
})(option);
var parsingResults = {
  failure: function(errors2, remaining) {
    if (errors2.length < 1) {
      throw new Error("Failure must have errors");
    }
    return new Result$1({
      status: "failure",
      remaining,
      errors: errors2
    });
  },
  error: function(errors2, remaining) {
    if (errors2.length < 1) {
      throw new Error("Failure must have errors");
    }
    return new Result$1({
      status: "error",
      remaining,
      errors: errors2
    });
  },
  success: function(value, remaining, source) {
    return new Result$1({
      status: "success",
      value,
      source,
      remaining,
      errors: []
    });
  },
  cut: function(remaining) {
    return new Result$1({
      status: "cut",
      remaining,
      errors: []
    });
  }
};
var Result$1 = function(options) {
  this._value = options.value;
  this._status = options.status;
  this._hasValue = options.value !== void 0;
  this._remaining = options.remaining;
  this._source = options.source;
  this._errors = options.errors;
};
Result$1.prototype.map = function(func) {
  if (this._hasValue) {
    return new Result$1({
      value: func(this._value, this._source),
      status: this._status,
      remaining: this._remaining,
      source: this._source,
      errors: this._errors
    });
  } else {
    return this;
  }
};
Result$1.prototype.changeRemaining = function(remaining) {
  return new Result$1({
    value: this._value,
    status: this._status,
    remaining,
    source: this._source,
    errors: this._errors
  });
};
Result$1.prototype.isSuccess = function() {
  return this._status === "success" || this._status === "cut";
};
Result$1.prototype.isFailure = function() {
  return this._status === "failure";
};
Result$1.prototype.isError = function() {
  return this._status === "error";
};
Result$1.prototype.isCut = function() {
  return this._status === "cut";
};
Result$1.prototype.value = function() {
  return this._value;
};
Result$1.prototype.remaining = function() {
  return this._remaining;
};
Result$1.prototype.source = function() {
  return this._source;
};
Result$1.prototype.errors = function() {
  return this._errors;
};
var errors = {};
errors.error = function(options) {
  return new Error$1(options);
};
var Error$1 = function(options) {
  this.expected = options.expected;
  this.actual = options.actual;
  this._location = options.location;
};
Error$1.prototype.describe = function() {
  var locationDescription = this._location ? this._location.describe() + ":\n" : "";
  return locationDescription + "Expected " + this.expected + "\nbut got " + this.actual;
};
Error$1.prototype.lineNumber = function() {
  return this._location.lineNumber();
};
Error$1.prototype.characterNumber = function() {
  return this._location.characterNumber();
};
var lazyIterators = {};
lazyIterators.fromArray = function(array) {
  var index2 = 0;
  var hasNext = function() {
    return index2 < array.length;
  };
  return new LazyIterator({
    hasNext,
    next: function() {
      if (!hasNext()) {
        throw new Error("No more elements");
      } else {
        return array[index2++];
      }
    }
  });
};
var LazyIterator = function(iterator) {
  this._iterator = iterator;
};
LazyIterator.prototype.map = function(func) {
  var iterator = this._iterator;
  return new LazyIterator({
    hasNext: function() {
      return iterator.hasNext();
    },
    next: function() {
      return func(iterator.next());
    }
  });
};
LazyIterator.prototype.filter = function(condition) {
  var iterator = this._iterator;
  var moved = false;
  var hasNext = false;
  var next;
  var moveIfNecessary = function() {
    if (moved) {
      return;
    }
    moved = true;
    hasNext = false;
    while (iterator.hasNext() && !hasNext) {
      next = iterator.next();
      hasNext = condition(next);
    }
  };
  return new LazyIterator({
    hasNext: function() {
      moveIfNecessary();
      return hasNext;
    },
    next: function() {
      moveIfNecessary();
      var toReturn = next;
      moved = false;
      return toReturn;
    }
  });
};
LazyIterator.prototype.first = function() {
  var iterator = this._iterator;
  if (this._iterator.hasNext()) {
    return iterator.next();
  } else {
    return null;
  }
};
LazyIterator.prototype.toArray = function() {
  var result2 = [];
  while (this._iterator.hasNext()) {
    result2.push(this._iterator.next());
  }
  return result2;
};
(function(exports) {
  var _2 = require$$0;
  var options = option;
  var results2 = parsingResults;
  var errors$12 = errors;
  var lazyIterators$1 = lazyIterators;
  exports.token = function(tokenType, value) {
    var matchValue = value !== void 0;
    return function(input) {
      var token = input.head();
      if (token && token.name === tokenType && (!matchValue || token.value === value)) {
        return results2.success(token.value, input.tail(), token.source);
      } else {
        var expected = describeToken({ name: tokenType, value });
        return describeTokenMismatch(input, expected);
      }
    };
  };
  exports.tokenOfType = function(tokenType) {
    return exports.token(tokenType);
  };
  exports.firstOf = function(name, parsers) {
    if (!_2.isArray(parsers)) {
      parsers = Array.prototype.slice.call(arguments, 1);
    }
    return function(input) {
      return lazyIterators$1.fromArray(parsers).map(function(parser2) {
        return parser2(input);
      }).filter(function(result2) {
        return result2.isSuccess() || result2.isError();
      }).first() || describeTokenMismatch(input, name);
    };
  };
  exports.then = function(parser2, func) {
    return function(input) {
      var result2 = parser2(input);
      if (!result2.map) {
        console.log(result2);
      }
      return result2.map(func);
    };
  };
  exports.sequence = function() {
    var parsers = Array.prototype.slice.call(arguments, 0);
    var rule = function(input) {
      var result2 = _2.foldl(parsers, function(memo, parser2) {
        var result3 = memo.result;
        var hasCut = memo.hasCut;
        if (!result3.isSuccess()) {
          return { result: result3, hasCut };
        }
        var subResult = parser2(result3.remaining());
        if (subResult.isCut()) {
          return { result: result3, hasCut: true };
        } else if (subResult.isSuccess()) {
          var values2;
          if (parser2.isCaptured) {
            values2 = result3.value().withValue(parser2, subResult.value());
          } else {
            values2 = result3.value();
          }
          var remaining = subResult.remaining();
          var source2 = input.to(remaining);
          return {
            result: results2.success(values2, remaining, source2),
            hasCut
          };
        } else if (hasCut) {
          return { result: results2.error(subResult.errors(), subResult.remaining()), hasCut };
        } else {
          return { result: subResult, hasCut };
        }
      }, { result: results2.success(new SequenceValues(), input), hasCut: false }).result;
      var source = input.to(result2.remaining());
      return result2.map(function(values2) {
        return values2.withValue(exports.sequence.source, source);
      });
    };
    rule.head = function() {
      var firstCapture = _2.find(parsers, isCapturedRule);
      return exports.then(
        rule,
        exports.sequence.extract(firstCapture)
      );
    };
    rule.map = function(func) {
      return exports.then(
        rule,
        function(result2) {
          return func.apply(this, result2.toArray());
        }
      );
    };
    function isCapturedRule(subRule) {
      return subRule.isCaptured;
    }
    return rule;
  };
  var SequenceValues = function(values2, valuesArray) {
    this._values = values2 || {};
    this._valuesArray = valuesArray || [];
  };
  SequenceValues.prototype.withValue = function(rule, value) {
    if (rule.captureName && rule.captureName in this._values) {
      throw new Error('Cannot add second value for capture "' + rule.captureName + '"');
    } else {
      var newValues = _2.clone(this._values);
      newValues[rule.captureName] = value;
      var newValuesArray = this._valuesArray.concat([value]);
      return new SequenceValues(newValues, newValuesArray);
    }
  };
  SequenceValues.prototype.get = function(rule) {
    if (rule.captureName in this._values) {
      return this._values[rule.captureName];
    } else {
      throw new Error('No value for capture "' + rule.captureName + '"');
    }
  };
  SequenceValues.prototype.toArray = function() {
    return this._valuesArray;
  };
  exports.sequence.capture = function(rule, name) {
    var captureRule = function() {
      return rule.apply(this, arguments);
    };
    captureRule.captureName = name;
    captureRule.isCaptured = true;
    return captureRule;
  };
  exports.sequence.extract = function(rule) {
    return function(result2) {
      return result2.get(rule);
    };
  };
  exports.sequence.applyValues = function(func) {
    var rules2 = Array.prototype.slice.call(arguments, 1);
    return function(result2) {
      var values2 = rules2.map(function(rule) {
        return result2.get(rule);
      });
      return func.apply(this, values2);
    };
  };
  exports.sequence.source = {
    captureName: "☃source☃"
  };
  exports.sequence.cut = function() {
    return function(input) {
      return results2.cut(input);
    };
  };
  exports.optional = function(rule) {
    return function(input) {
      var result2 = rule(input);
      if (result2.isSuccess()) {
        return result2.map(options.some);
      } else if (result2.isFailure()) {
        return results2.success(options.none, input);
      } else {
        return result2;
      }
    };
  };
  exports.zeroOrMoreWithSeparator = function(rule, separator) {
    return repeatedWithSeparator(rule, separator, false);
  };
  exports.oneOrMoreWithSeparator = function(rule, separator) {
    return repeatedWithSeparator(rule, separator, true);
  };
  var zeroOrMore = exports.zeroOrMore = function(rule) {
    return function(input) {
      var values2 = [];
      var result2;
      while ((result2 = rule(input)) && result2.isSuccess()) {
        input = result2.remaining();
        values2.push(result2.value());
      }
      if (result2.isError()) {
        return result2;
      } else {
        return results2.success(values2, input);
      }
    };
  };
  exports.oneOrMore = function(rule) {
    return exports.oneOrMoreWithSeparator(rule, noOpRule);
  };
  function noOpRule(input) {
    return results2.success(null, input);
  }
  var repeatedWithSeparator = function(rule, separator, isOneOrMore) {
    return function(input) {
      var result2 = rule(input);
      if (result2.isSuccess()) {
        var mainRule = exports.sequence.capture(rule, "main");
        var remainingRule = zeroOrMore(exports.then(
          exports.sequence(separator, mainRule),
          exports.sequence.extract(mainRule)
        ));
        var remainingResult = remainingRule(result2.remaining());
        return results2.success([result2.value()].concat(remainingResult.value()), remainingResult.remaining());
      } else if (isOneOrMore || result2.isError()) {
        return result2;
      } else {
        return results2.success([], input);
      }
    };
  };
  exports.leftAssociative = function(leftRule, rightRule, func) {
    var rights;
    if (func) {
      rights = [{ func, rule: rightRule }];
    } else {
      rights = rightRule;
    }
    rights = rights.map(function(right) {
      return exports.then(right.rule, function(rightValue) {
        return function(leftValue, source) {
          return right.func(leftValue, rightValue, source);
        };
      });
    });
    var repeatedRule = exports.firstOf.apply(null, ["rules"].concat(rights));
    return function(input) {
      var start = input;
      var leftResult = leftRule(input);
      if (!leftResult.isSuccess()) {
        return leftResult;
      }
      var repeatedResult = repeatedRule(leftResult.remaining());
      while (repeatedResult.isSuccess()) {
        var remaining = repeatedResult.remaining();
        var source = start.to(repeatedResult.remaining());
        var right = repeatedResult.value();
        leftResult = results2.success(
          right(leftResult.value(), source),
          remaining,
          source
        );
        repeatedResult = repeatedRule(leftResult.remaining());
      }
      if (repeatedResult.isError()) {
        return repeatedResult;
      }
      return leftResult;
    };
  };
  exports.leftAssociative.firstOf = function() {
    return Array.prototype.slice.call(arguments, 0);
  };
  exports.nonConsuming = function(rule) {
    return function(input) {
      return rule(input).changeRemaining(input);
    };
  };
  var describeToken = function(token) {
    if (token.value) {
      return token.name + ' "' + token.value + '"';
    } else {
      return token.name;
    }
  };
  function describeTokenMismatch(input, expected) {
    var error2;
    var token = input.head();
    if (token) {
      error2 = errors$12.error({
        expected,
        actual: describeToken(token),
        location: token.source
      });
    } else {
      error2 = errors$12.error({
        expected,
        actual: "end of tokens"
      });
    }
    return results2.failure([error2], input);
  }
})(rules);
var StringSource$1 = { exports: {} };
StringSource$1.exports = function(string, description) {
  var self2 = {
    asString: function() {
      return string;
    },
    range: function(startIndex, endIndex) {
      return new StringSourceRange(string, description, startIndex, endIndex);
    }
  };
  return self2;
};
var StringSourceRange = function(string, description, startIndex, endIndex) {
  this._string = string;
  this._description = description;
  this._startIndex = startIndex;
  this._endIndex = endIndex;
};
StringSourceRange.prototype.to = function(otherRange) {
  return new StringSourceRange(this._string, this._description, this._startIndex, otherRange._endIndex);
};
StringSourceRange.prototype.describe = function() {
  var position2 = this._position();
  var description = this._description ? this._description + "\n" : "";
  return description + "Line number: " + position2.lineNumber + "\nCharacter number: " + position2.characterNumber;
};
StringSourceRange.prototype.lineNumber = function() {
  return this._position().lineNumber;
};
StringSourceRange.prototype.characterNumber = function() {
  return this._position().characterNumber;
};
StringSourceRange.prototype._position = function() {
  var self2 = this;
  var index2 = 0;
  var nextNewLine = function() {
    return self2._string.indexOf("\n", index2);
  };
  var lineNumber = 1;
  while (nextNewLine() !== -1 && nextNewLine() < this._startIndex) {
    index2 = nextNewLine() + 1;
    lineNumber += 1;
  }
  var characterNumber = this._startIndex - index2 + 1;
  return { lineNumber, characterNumber };
};
var StringSourceExports = StringSource$1.exports;
var Token$1 = function(name, value, source) {
  this.name = name;
  this.value = value;
  if (source) {
    this.source = source;
  }
};
var bottomUp = {};
(function(exports) {
  var rules$1 = rules;
  var results2 = parsingResults;
  exports.parser = function(name, prefixRules, infixRuleBuilders) {
    var self2 = {
      rule,
      leftAssociative,
      rightAssociative
    };
    var infixRules = new InfixRules(infixRuleBuilders.map(createInfixRule));
    var prefixRule = rules$1.firstOf(name, prefixRules);
    function createInfixRule(infixRuleBuilder) {
      return {
        name: infixRuleBuilder.name,
        rule: lazyRule(infixRuleBuilder.ruleBuilder.bind(null, self2))
      };
    }
    function rule() {
      return createRule(infixRules);
    }
    function leftAssociative(name2) {
      return createRule(infixRules.untilExclusive(name2));
    }
    function rightAssociative(name2) {
      return createRule(infixRules.untilInclusive(name2));
    }
    function createRule(infixRules2) {
      return apply.bind(null, infixRules2);
    }
    function apply(infixRules2, tokens) {
      var leftResult = prefixRule(tokens);
      if (leftResult.isSuccess()) {
        return infixRules2.apply(leftResult);
      } else {
        return leftResult;
      }
    }
    return self2;
  };
  function InfixRules(infixRules) {
    function untilExclusive(name) {
      return new InfixRules(infixRules.slice(0, ruleNames().indexOf(name)));
    }
    function untilInclusive(name) {
      return new InfixRules(infixRules.slice(0, ruleNames().indexOf(name) + 1));
    }
    function ruleNames() {
      return infixRules.map(function(rule) {
        return rule.name;
      });
    }
    function apply(leftResult) {
      var currentResult;
      var source;
      while (true) {
        currentResult = applyToTokens(leftResult.remaining());
        if (currentResult.isSuccess()) {
          source = leftResult.source().to(currentResult.source());
          leftResult = results2.success(
            currentResult.value()(leftResult.value(), source),
            currentResult.remaining(),
            source
          );
        } else if (currentResult.isFailure()) {
          return leftResult;
        } else {
          return currentResult;
        }
      }
    }
    function applyToTokens(tokens) {
      return rules$1.firstOf("infix", infixRules.map(function(infix) {
        return infix.rule;
      }))(tokens);
    }
    return {
      apply,
      untilExclusive,
      untilInclusive
    };
  }
  exports.infix = function(name, ruleBuilder) {
    function map2(func) {
      return exports.infix(name, function(parser2) {
        var rule = ruleBuilder(parser2);
        return function(tokens) {
          var result2 = rule(tokens);
          return result2.map(function(right) {
            return function(left, source) {
              return func(left, right, source);
            };
          });
        };
      });
    }
    return {
      name,
      ruleBuilder,
      map: map2
    };
  };
  var lazyRule = function(ruleBuilder) {
    var rule;
    return function(input) {
      if (!rule) {
        rule = ruleBuilder();
      }
      return rule(input);
    };
  };
})(bottomUp);
var regexTokeniser = {};
var Token = Token$1;
var StringSource = StringSourceExports;
regexTokeniser.RegexTokeniser = RegexTokeniser$1;
function RegexTokeniser$1(rules2) {
  rules2 = rules2.map(function(rule) {
    return {
      name: rule.name,
      regex: new RegExp(rule.regex.source, "g")
    };
  });
  function tokenise2(input, description) {
    var source = new StringSource(input, description);
    var index2 = 0;
    var tokens = [];
    while (index2 < input.length) {
      var result2 = readNextToken(input, index2, source);
      index2 = result2.endIndex;
      tokens.push(result2.token);
    }
    tokens.push(endToken(input, source));
    return tokens;
  }
  function readNextToken(string, startIndex, source) {
    for (var i = 0; i < rules2.length; i++) {
      var regex = rules2[i].regex;
      regex.lastIndex = startIndex;
      var result2 = regex.exec(string);
      if (result2) {
        var endIndex = startIndex + result2[0].length;
        if (result2.index === startIndex && endIndex > startIndex) {
          var value = result2[1];
          var token = new Token(
            rules2[i].name,
            value,
            source.range(startIndex, endIndex)
          );
          return { token, endIndex };
        }
      }
    }
    var endIndex = startIndex + 1;
    var token = new Token(
      "unrecognisedCharacter",
      string.substring(startIndex, endIndex),
      source.range(startIndex, endIndex)
    );
    return { token, endIndex };
  }
  function endToken(input, source) {
    return new Token(
      "end",
      null,
      source.range(input.length, input.length)
    );
  }
  return {
    tokenise: tokenise2
  };
}
lop$2.Parser = parser.Parser;
lop$2.rules = rules;
lop$2.errors = errors;
lop$2.results = parsingResults;
lop$2.StringSource = StringSourceExports;
lop$2.Token = Token$1;
lop$2.bottomUp = bottomUp;
lop$2.RegexTokeniser = regexTokeniser.RegexTokeniser;
lop$2.rule = function(ruleBuilder) {
  var rule;
  return function(input) {
    if (!rule) {
      rule = ruleBuilder();
    }
    return rule(input);
  };
};
var documentMatchers$1 = {};
documentMatchers$1.paragraph = paragraph;
documentMatchers$1.run = run;
documentMatchers$1.table = table;
documentMatchers$1.bold = new Matcher("bold");
documentMatchers$1.italic = new Matcher("italic");
documentMatchers$1.underline = new Matcher("underline");
documentMatchers$1.strikethrough = new Matcher("strikethrough");
documentMatchers$1.allCaps = new Matcher("allCaps");
documentMatchers$1.smallCaps = new Matcher("smallCaps");
documentMatchers$1.highlight = highlight;
documentMatchers$1.commentReference = new Matcher("commentReference");
documentMatchers$1.lineBreak = new BreakMatcher({ breakType: "line" });
documentMatchers$1.pageBreak = new BreakMatcher({ breakType: "page" });
documentMatchers$1.columnBreak = new BreakMatcher({ breakType: "column" });
documentMatchers$1.equalTo = equalTo;
documentMatchers$1.startsWith = startsWith;
function paragraph(options) {
  return new Matcher("paragraph", options);
}
function run(options) {
  return new Matcher("run", options);
}
function table(options) {
  return new Matcher("table", options);
}
function highlight(options) {
  return new HighlightMatcher(options);
}
function Matcher(elementType, options) {
  options = options || {};
  this._elementType = elementType;
  this._styleId = options.styleId;
  this._styleName = options.styleName;
  if (options.list) {
    this._listIndex = options.list.levelIndex;
    this._listIsOrdered = options.list.isOrdered;
  }
}
Matcher.prototype.matches = function(element2) {
  return element2.type === this._elementType && (this._styleId === void 0 || element2.styleId === this._styleId) && (this._styleName === void 0 || element2.styleName && this._styleName.operator(this._styleName.operand, element2.styleName)) && (this._listIndex === void 0 || isList(element2, this._listIndex, this._listIsOrdered)) && (this._breakType === void 0 || this._breakType === element2.breakType);
};
function HighlightMatcher(options) {
  options = options || {};
  this._color = options.color;
}
HighlightMatcher.prototype.matches = function(element2) {
  return element2.type === "highlight" && (this._color === void 0 || element2.color === this._color);
};
function BreakMatcher(options) {
  options = options || {};
  this._breakType = options.breakType;
}
BreakMatcher.prototype.matches = function(element2) {
  return element2.type === "break" && (this._breakType === void 0 || element2.breakType === this._breakType);
};
function isList(element2, levelIndex, isOrdered) {
  return element2.numbering && element2.numbering.level == levelIndex && element2.numbering.isOrdered == isOrdered;
}
function equalTo(value) {
  return {
    operator: operatorEqualTo,
    operand: value
  };
}
function startsWith(value) {
  return {
    operator: operatorStartsWith,
    operand: value
  };
}
function operatorEqualTo(first2, second) {
  return first2.toUpperCase() === second.toUpperCase();
}
function operatorStartsWith(first2, second) {
  return second.toUpperCase().indexOf(first2.toUpperCase()) === 0;
}
var tokeniser = {};
var lop$1 = lop$2;
var RegexTokeniser = lop$1.RegexTokeniser;
tokeniser.tokenise = tokenise$1;
var stringPrefix = "'((?:\\\\.|[^'])*)";
function tokenise$1(string) {
  var identifierCharacter = "(?:[a-zA-Z\\-_]|\\\\.)";
  var tokeniser2 = new RegexTokeniser([
    { name: "identifier", regex: new RegExp("(" + identifierCharacter + "(?:" + identifierCharacter + "|[0-9])*)") },
    { name: "dot", regex: /\./ },
    { name: "colon", regex: /:/ },
    { name: "gt", regex: />/ },
    { name: "whitespace", regex: /\s+/ },
    { name: "arrow", regex: /=>/ },
    { name: "equals", regex: /=/ },
    { name: "startsWith", regex: /\^=/ },
    { name: "open-paren", regex: /\(/ },
    { name: "close-paren", regex: /\)/ },
    { name: "open-square-bracket", regex: /\[/ },
    { name: "close-square-bracket", regex: /\]/ },
    { name: "string", regex: new RegExp(stringPrefix + "'") },
    { name: "unterminated-string", regex: new RegExp(stringPrefix) },
    { name: "integer", regex: /([0-9]+)/ },
    { name: "choice", regex: /\|/ },
    { name: "bang", regex: /(!)/ }
  ]);
  return tokeniser2.tokenise(string);
}
var _$2 = require$$0;
var lop = lop$2;
var documentMatchers = documentMatchers$1;
var htmlPaths$1 = requireHtmlPaths();
var tokenise = tokeniser.tokenise;
var results = results$2;
styleReader.readHtmlPath = readHtmlPath;
styleReader.readDocumentMatcher = readDocumentMatcher;
styleReader.readStyle = readStyle$1;
function readStyle$1(string) {
  return parseString(styleRule, string);
}
function createStyleRule() {
  return lop.rules.sequence(
    lop.rules.sequence.capture(documentMatcherRule()),
    lop.rules.tokenOfType("whitespace"),
    lop.rules.tokenOfType("arrow"),
    lop.rules.sequence.capture(lop.rules.optional(lop.rules.sequence(
      lop.rules.tokenOfType("whitespace"),
      lop.rules.sequence.capture(htmlPathRule())
    ).head())),
    lop.rules.tokenOfType("end")
  ).map(function(documentMatcher, htmlPath) {
    return {
      from: documentMatcher,
      to: htmlPath.valueOrElse(htmlPaths$1.empty)
    };
  });
}
function readDocumentMatcher(string) {
  return parseString(documentMatcherRule(), string);
}
function documentMatcherRule() {
  var sequence = lop.rules.sequence;
  var identifierToConstant = function(identifier, constant2) {
    return lop.rules.then(
      lop.rules.token("identifier", identifier),
      function() {
        return constant2;
      }
    );
  };
  var paragraphRule = identifierToConstant("p", documentMatchers.paragraph);
  var runRule = identifierToConstant("r", documentMatchers.run);
  var elementTypeRule = lop.rules.firstOf(
    "p or r or table",
    paragraphRule,
    runRule
  );
  var styleIdRule = lop.rules.sequence(
    lop.rules.tokenOfType("dot"),
    lop.rules.sequence.cut(),
    lop.rules.sequence.capture(identifierRule)
  ).map(function(styleId) {
    return { styleId };
  });
  var styleNameMatcherRule = lop.rules.firstOf(
    "style name matcher",
    lop.rules.then(
      lop.rules.sequence(
        lop.rules.tokenOfType("equals"),
        lop.rules.sequence.cut(),
        lop.rules.sequence.capture(stringRule)
      ).head(),
      function(styleName2) {
        return { styleName: documentMatchers.equalTo(styleName2) };
      }
    ),
    lop.rules.then(
      lop.rules.sequence(
        lop.rules.tokenOfType("startsWith"),
        lop.rules.sequence.cut(),
        lop.rules.sequence.capture(stringRule)
      ).head(),
      function(styleName2) {
        return { styleName: documentMatchers.startsWith(styleName2) };
      }
    )
  );
  var styleNameRule = lop.rules.sequence(
    lop.rules.tokenOfType("open-square-bracket"),
    lop.rules.sequence.cut(),
    lop.rules.token("identifier", "style-name"),
    lop.rules.sequence.capture(styleNameMatcherRule),
    lop.rules.tokenOfType("close-square-bracket")
  ).head();
  var listTypeRule = lop.rules.firstOf(
    "list type",
    identifierToConstant("ordered-list", { isOrdered: true }),
    identifierToConstant("unordered-list", { isOrdered: false })
  );
  var listRule = sequence(
    lop.rules.tokenOfType("colon"),
    sequence.capture(listTypeRule),
    sequence.cut(),
    lop.rules.tokenOfType("open-paren"),
    sequence.capture(integerRule),
    lop.rules.tokenOfType("close-paren")
  ).map(function(listType, levelNumber) {
    return {
      list: {
        isOrdered: listType.isOrdered,
        levelIndex: levelNumber - 1
      }
    };
  });
  function createMatcherSuffixesRule(rules2) {
    var matcherSuffix = lop.rules.firstOf.apply(
      lop.rules.firstOf,
      ["matcher suffix"].concat(rules2)
    );
    var matcherSuffixes = lop.rules.zeroOrMore(matcherSuffix);
    return lop.rules.then(matcherSuffixes, function(suffixes) {
      var matcherOptions = {};
      suffixes.forEach(function(suffix) {
        _$2.extend(matcherOptions, suffix);
      });
      return matcherOptions;
    });
  }
  var paragraphOrRun = sequence(
    sequence.capture(elementTypeRule),
    sequence.capture(createMatcherSuffixesRule([
      styleIdRule,
      styleNameRule,
      listRule
    ]))
  ).map(function(createMatcher, matcherOptions) {
    return createMatcher(matcherOptions);
  });
  var table2 = sequence(
    lop.rules.token("identifier", "table"),
    sequence.capture(createMatcherSuffixesRule([
      styleIdRule,
      styleNameRule
    ]))
  ).map(function(options) {
    return documentMatchers.table(options);
  });
  var bold = identifierToConstant("b", documentMatchers.bold);
  var italic = identifierToConstant("i", documentMatchers.italic);
  var underline2 = identifierToConstant("u", documentMatchers.underline);
  var strikethrough = identifierToConstant("strike", documentMatchers.strikethrough);
  var allCaps = identifierToConstant("all-caps", documentMatchers.allCaps);
  var smallCaps = identifierToConstant("small-caps", documentMatchers.smallCaps);
  var highlight2 = sequence(
    lop.rules.token("identifier", "highlight"),
    lop.rules.sequence.capture(lop.rules.optional(lop.rules.sequence(
      lop.rules.tokenOfType("open-square-bracket"),
      lop.rules.sequence.cut(),
      lop.rules.token("identifier", "color"),
      lop.rules.tokenOfType("equals"),
      lop.rules.sequence.capture(stringRule),
      lop.rules.tokenOfType("close-square-bracket")
    ).head()))
  ).map(function(color) {
    return documentMatchers.highlight({
      color: color.valueOrElse(void 0)
    });
  });
  var commentReference2 = identifierToConstant("comment-reference", documentMatchers.commentReference);
  var breakMatcher = sequence(
    lop.rules.token("identifier", "br"),
    sequence.cut(),
    lop.rules.tokenOfType("open-square-bracket"),
    lop.rules.token("identifier", "type"),
    lop.rules.tokenOfType("equals"),
    sequence.capture(stringRule),
    lop.rules.tokenOfType("close-square-bracket")
  ).map(function(breakType) {
    switch (breakType) {
      case "line":
        return documentMatchers.lineBreak;
      case "page":
        return documentMatchers.pageBreak;
      case "column":
        return documentMatchers.columnBreak;
    }
  });
  return lop.rules.firstOf(
    "element type",
    paragraphOrRun,
    table2,
    bold,
    italic,
    underline2,
    strikethrough,
    allCaps,
    smallCaps,
    highlight2,
    commentReference2,
    breakMatcher
  );
}
function readHtmlPath(string) {
  return parseString(htmlPathRule(), string);
}
function htmlPathRule() {
  var capture = lop.rules.sequence.capture;
  var whitespaceRule = lop.rules.tokenOfType("whitespace");
  var freshRule = lop.rules.then(
    lop.rules.optional(lop.rules.sequence(
      lop.rules.tokenOfType("colon"),
      lop.rules.token("identifier", "fresh")
    )),
    function(option2) {
      return option2.map(function() {
        return true;
      }).valueOrElse(false);
    }
  );
  var separatorRule = lop.rules.then(
    lop.rules.optional(lop.rules.sequence(
      lop.rules.tokenOfType("colon"),
      lop.rules.token("identifier", "separator"),
      lop.rules.tokenOfType("open-paren"),
      capture(stringRule),
      lop.rules.tokenOfType("close-paren")
    ).head()),
    function(option2) {
      return option2.valueOrElse("");
    }
  );
  var tagNamesRule = lop.rules.oneOrMoreWithSeparator(
    identifierRule,
    lop.rules.tokenOfType("choice")
  );
  var styleElementRule = lop.rules.sequence(
    capture(tagNamesRule),
    capture(lop.rules.zeroOrMore(attributeOrClassRule)),
    capture(freshRule),
    capture(separatorRule)
  ).map(function(tagName, attributesList, fresh, separator) {
    var attributes = {};
    var options = {};
    attributesList.forEach(function(attribute) {
      if (attribute.append && attributes[attribute.name]) {
        attributes[attribute.name] += " " + attribute.value;
      } else {
        attributes[attribute.name] = attribute.value;
      }
    });
    if (fresh) {
      options.fresh = true;
    }
    if (separator) {
      options.separator = separator;
    }
    return htmlPaths$1.element(tagName, attributes, options);
  });
  return lop.rules.firstOf(
    "html path",
    lop.rules.then(lop.rules.tokenOfType("bang"), function() {
      return htmlPaths$1.ignore;
    }),
    lop.rules.then(
      lop.rules.zeroOrMoreWithSeparator(
        styleElementRule,
        lop.rules.sequence(
          whitespaceRule,
          lop.rules.tokenOfType("gt"),
          whitespaceRule
        )
      ),
      htmlPaths$1.elements
    )
  );
}
var identifierRule = lop.rules.then(
  lop.rules.tokenOfType("identifier"),
  decodeEscapeSequences
);
var integerRule = lop.rules.tokenOfType("integer");
var stringRule = lop.rules.then(
  lop.rules.tokenOfType("string"),
  decodeEscapeSequences
);
var escapeSequences = {
  "n": "\n",
  "r": "\r",
  "t": "	"
};
function decodeEscapeSequences(value) {
  return value.replace(/\\(.)/g, function(match, code2) {
    return escapeSequences[code2] || code2;
  });
}
var attributeRule = lop.rules.sequence(
  lop.rules.tokenOfType("open-square-bracket"),
  lop.rules.sequence.cut(),
  lop.rules.sequence.capture(identifierRule),
  lop.rules.tokenOfType("equals"),
  lop.rules.sequence.capture(stringRule),
  lop.rules.tokenOfType("close-square-bracket")
).map(function(name, value) {
  return { name, value, append: false };
});
var classRule = lop.rules.sequence(
  lop.rules.tokenOfType("dot"),
  lop.rules.sequence.cut(),
  lop.rules.sequence.capture(identifierRule)
).map(function(className) {
  return { name: "class", value: className, append: true };
});
var attributeOrClassRule = lop.rules.firstOf(
  "attribute or class",
  attributeRule,
  classRule
);
function parseString(rule, string) {
  var tokens = tokenise(string);
  var parser2 = lop.Parser();
  var parseResult = parser2.parseTokens(rule, tokens);
  if (parseResult.isSuccess()) {
    return results.success(parseResult.value());
  } else {
    return new results.Result(null, [results.warning(describeFailure(string, parseResult))]);
  }
}
function describeFailure(input, parseResult) {
  return "Did not understand this style mapping, so ignored it: " + input + "\n" + parseResult.errors().map(describeError).join("\n");
}
function describeError(error2) {
  return "Error was at character number " + error2.characterNumber() + ": Expected " + error2.expected + " but got " + error2.actual;
}
var styleRule = createStyleRule();
var optionsReader = {};
optionsReader.readOptions = readOptions$1;
var _$1 = require$$0;
var defaultStyleMap = optionsReader._defaultStyleMap = [
  "p.Heading1 => h1:fresh",
  "p.Heading2 => h2:fresh",
  "p.Heading3 => h3:fresh",
  "p.Heading4 => h4:fresh",
  "p.Heading5 => h5:fresh",
  "p.Heading6 => h6:fresh",
  "p[style-name='Heading 1'] => h1:fresh",
  "p[style-name='Heading 2'] => h2:fresh",
  "p[style-name='Heading 3'] => h3:fresh",
  "p[style-name='Heading 4'] => h4:fresh",
  "p[style-name='Heading 5'] => h5:fresh",
  "p[style-name='Heading 6'] => h6:fresh",
  "p[style-name='heading 1'] => h1:fresh",
  "p[style-name='heading 2'] => h2:fresh",
  "p[style-name='heading 3'] => h3:fresh",
  "p[style-name='heading 4'] => h4:fresh",
  "p[style-name='heading 5'] => h5:fresh",
  "p[style-name='heading 6'] => h6:fresh",
  // Apple Pages
  "p.Heading => h1:fresh",
  "p[style-name='Heading'] => h1:fresh",
  "r[style-name='Strong'] => strong",
  "p[style-name='footnote text'] => p:fresh",
  "r[style-name='footnote reference'] =>",
  "p[style-name='endnote text'] => p:fresh",
  "r[style-name='endnote reference'] =>",
  "p[style-name='annotation text'] => p:fresh",
  "r[style-name='annotation reference'] =>",
  // LibreOffice
  "p[style-name='Footnote'] => p:fresh",
  "r[style-name='Footnote anchor'] =>",
  "p[style-name='Endnote'] => p:fresh",
  "r[style-name='Endnote anchor'] =>",
  "p:unordered-list(1) => ul > li:fresh",
  "p:unordered-list(2) => ul|ol > li > ul > li:fresh",
  "p:unordered-list(3) => ul|ol > li > ul|ol > li > ul > li:fresh",
  "p:unordered-list(4) => ul|ol > li > ul|ol > li > ul|ol > li > ul > li:fresh",
  "p:unordered-list(5) => ul|ol > li > ul|ol > li > ul|ol > li > ul|ol > li > ul > li:fresh",
  "p:ordered-list(1) => ol > li:fresh",
  "p:ordered-list(2) => ul|ol > li > ol > li:fresh",
  "p:ordered-list(3) => ul|ol > li > ul|ol > li > ol > li:fresh",
  "p:ordered-list(4) => ul|ol > li > ul|ol > li > ul|ol > li > ol > li:fresh",
  "p:ordered-list(5) => ul|ol > li > ul|ol > li > ul|ol > li > ul|ol > li > ol > li:fresh",
  "r[style-name='Hyperlink'] =>",
  "p[style-name='Normal'] => p:fresh",
  // Apple Pages
  "p.Body => p:fresh",
  "p[style-name='Body'] => p:fresh"
];
var standardOptions = optionsReader._standardOptions = {
  externalFileAccess: false,
  transformDocument: identity,
  includeDefaultStyleMap: true,
  includeEmbeddedStyleMap: true
};
function readOptions$1(options) {
  options = options || {};
  return _$1.extend({}, standardOptions, options, {
    customStyleMap: readStyleMap(options.styleMap),
    readStyleMap: function() {
      var styleMap2 = this.customStyleMap;
      if (this.includeEmbeddedStyleMap) {
        styleMap2 = styleMap2.concat(readStyleMap(this.embeddedStyleMap));
      }
      if (this.includeDefaultStyleMap) {
        styleMap2 = styleMap2.concat(defaultStyleMap);
      }
      return styleMap2;
    }
  });
}
function readStyleMap(styleMap2) {
  if (!styleMap2) {
    return [];
  } else if (_$1.isString(styleMap2)) {
    return styleMap2.split("\n").map(function(line) {
      return line.trim();
    }).filter(function(line) {
      return line !== "" && line.charAt(0) !== "#";
    });
  } else {
    return styleMap2;
  }
}
function identity(value) {
  return value;
}
var unzip$1 = {};
var promises = promises$7;
var zipfile = zipfile$2;
unzip$1.openZip = openZip;
function openZip(options) {
  if (options.arrayBuffer) {
    return promises.resolve(zipfile.openArrayBuffer(options.arrayBuffer));
  } else {
    return promises.reject(new Error("Could not find file in options"));
  }
}
var underline$1 = {};
var htmlPaths = requireHtmlPaths();
var Html = requireHtml();
underline$1.element = element;
function element(name) {
  return function(html2) {
    return Html.elementWithTag(htmlPaths.element(name), [html2]);
  };
}
var _ = require$$0;
var docxReader = docxReader$1;
var docxStyleMap = styleMap;
var DocumentConverter = documentToHtml.DocumentConverter;
var convertElementToRawText = rawText.convertElementToRawText;
var readStyle = styleReader.readStyle;
var readOptions = optionsReader.readOptions;
var unzip = unzip$1;
var Result = results$2.Result;
var convertToHtml_1 = lib$2.convertToHtml = convertToHtml;
var convertToMarkdown_1 = lib$2.convertToMarkdown = convertToMarkdown;
var convert_1 = lib$2.convert = convert;
var extractRawText_1 = lib$2.extractRawText = extractRawText;
var images = lib$2.images = images$2;
var transforms = lib$2.transforms = transforms$2;
var underline = lib$2.underline = underline$1;
var embedStyleMap_1 = lib$2.embedStyleMap = embedStyleMap;
var readEmbeddedStyleMap_1 = lib$2.readEmbeddedStyleMap = readEmbeddedStyleMap;
function convertToHtml(input, options) {
  return convert(input, options);
}
function convertToMarkdown(input, options) {
  var markdownOptions = Object.create(options || {});
  markdownOptions.outputFormat = "markdown";
  return convert(input, markdownOptions);
}
function convert(input, options) {
  options = readOptions(options);
  return unzip.openZip(input).tap(function(docxFile) {
    return docxStyleMap.readStyleMap(docxFile).then(function(styleMap2) {
      options.embeddedStyleMap = styleMap2;
    });
  }).then(function(docxFile) {
    return docxReader.read(docxFile, input, options).then(function(documentResult) {
      return documentResult.map(options.transformDocument);
    }).then(function(documentResult) {
      return convertDocumentToHtml(documentResult, options);
    });
  });
}
function readEmbeddedStyleMap(input) {
  return unzip.openZip(input).then(docxStyleMap.readStyleMap);
}
function convertDocumentToHtml(documentResult, options) {
  var styleMapResult = parseStyleMap(options.readStyleMap());
  var parsedOptions = _.extend({}, options, {
    styleMap: styleMapResult.value
  });
  var documentConverter = new DocumentConverter(parsedOptions);
  return documentResult.flatMapThen(function(document2) {
    return styleMapResult.flatMapThen(function(styleMap2) {
      return documentConverter.convertToHtml(document2);
    });
  });
}
function parseStyleMap(styleMap2) {
  return Result.combine((styleMap2 || []).map(readStyle)).map(function(styleMap3) {
    return styleMap3.filter(function(styleMapping2) {
      return !!styleMapping2;
    });
  });
}
function extractRawText(input) {
  return unzip.openZip(input).then(docxReader.read).then(function(documentResult) {
    return documentResult.map(convertElementToRawText);
  });
}
function embedStyleMap(input, styleMap2) {
  return unzip.openZip(input).tap(function(docxFile) {
    return docxStyleMap.writeStyleMap(docxFile, styleMap2);
  }).then(function(docxFile) {
    return docxFile.toArrayBuffer();
  }).then(function(arrayBuffer) {
    return {
      toArrayBuffer: function() {
        return arrayBuffer;
      },
      toBuffer: function() {
        return Buffer.from(arrayBuffer);
      }
    };
  });
}
var styleMapping = lib$2.styleMapping = function() {
  throw new Error(`Use a raw string instead of mammoth.styleMapping e.g. "p[style-name='Title'] => h1" instead of mammoth.styleMapping("p[style-name='Title'] => h1")`);
};
const index = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  convert: convert_1,
  convertToHtml: convertToHtml_1,
  convertToMarkdown: convertToMarkdown_1,
  default: lib$2,
  embedStyleMap: embedStyleMap_1,
  extractRawText: extractRawText_1,
  images,
  readEmbeddedStyleMap: readEmbeddedStyleMap_1,
  styleMapping,
  transforms,
  underline
}, [lib$2]);
export {
  index as i
};
