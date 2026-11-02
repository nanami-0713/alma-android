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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "f91169d3-cdbc-4f01-8060-59b33fb2b955", e._sentryDebugIdIdentifier = "sentry-dbid-f91169d3-cdbc-4f01-8060-59b33fb2b955");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, R as React, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { a as client } from "./client-DCFZpNwr.js";
import { a as useI18n, B as Button, i as initObservability, S as SWRConfig, s as swrConfig, T as ThemeProvider } from "./ThemeContext-Ac9lDiNd.js";
import "./createLucideIcon-sFEqYeet.js";
import "./clipboard-polyfill-B3oH85Ao.js";
import { C as ConditionalPostHogProvider } from "./ConditionalPostHogProvider-Cgb2BAQg.js";
import { X } from "./x-BzMxEGBY.js";
import "./preload-helper-D_8ag_Pp.js";
import { u as usePlatformContext, W as WindowControls, P as PlatformProvider } from "./PlatformContext-BWz3dz-T.js";
import { I as Image } from "./image-C_h5oH_f.js";
import { L as LoaderCircle } from "./loader-circle-BsCo_wlW.js";
import "./index-CZUfqr00.js";
const RED = 0;
const BLACK = 1;
const NIL = 2;
const DELETE = 0;
const KEEP = 1;
function addInterval(treeNode, high, index) {
  let node = treeNode.list;
  let prevNode;
  while (node) {
    if (node.index === index) return false;
    if (high > node.high) break;
    prevNode = node;
    node = node.next;
  }
  if (!prevNode) treeNode.list = {
    index,
    high,
    next: node
  };
  if (prevNode) prevNode.next = {
    index,
    high,
    next: prevNode.next
  };
  return true;
}
function removeInterval(treeNode, index) {
  let node = treeNode.list;
  if (node.index === index) {
    if (node.next === null) return DELETE;
    treeNode.list = node.next;
    return KEEP;
  }
  let prevNode = node;
  node = node.next;
  while (node !== null) {
    if (node.index === index) {
      prevNode.next = node.next;
      return KEEP;
    }
    prevNode = node;
    node = node.next;
  }
}
const NULL_NODE = {
  low: 0,
  max: 0,
  high: 0,
  C: NIL,
  // @ts-expect-error
  P: void 0,
  // @ts-expect-error
  R: void 0,
  // @ts-expect-error
  L: void 0,
  // @ts-expect-error
  list: void 0
};
NULL_NODE.P = NULL_NODE;
NULL_NODE.L = NULL_NODE;
NULL_NODE.R = NULL_NODE;
function updateMax(node) {
  const max = node.high;
  if (node.L === NULL_NODE && node.R === NULL_NODE) node.max = max;
  else if (node.L === NULL_NODE) node.max = Math.max(node.R.max, max);
  else if (node.R === NULL_NODE) node.max = Math.max(node.L.max, max);
  else node.max = Math.max(Math.max(node.L.max, node.R.max), max);
}
function updateMaxUp(node) {
  let x = node;
  while (x.P !== NULL_NODE) {
    updateMax(x.P);
    x = x.P;
  }
}
function rotateLeft(tree, x) {
  if (x.R === NULL_NODE) return;
  const y = x.R;
  x.R = y.L;
  if (y.L !== NULL_NODE) y.L.P = x;
  y.P = x.P;
  if (x.P === NULL_NODE) tree.root = y;
  else if (x === x.P.L) x.P.L = y;
  else x.P.R = y;
  y.L = x;
  x.P = y;
  updateMax(x);
  updateMax(y);
}
function rotateRight(tree, x) {
  if (x.L === NULL_NODE) return;
  const y = x.L;
  x.L = y.R;
  if (y.R !== NULL_NODE) y.R.P = x;
  y.P = x.P;
  if (x.P === NULL_NODE) tree.root = y;
  else if (x === x.P.R) x.P.R = y;
  else x.P.L = y;
  y.R = x;
  x.P = y;
  updateMax(x);
  updateMax(y);
}
function replaceNode(tree, x, y) {
  if (x.P === NULL_NODE) tree.root = y;
  else if (x === x.P.L) x.P.L = y;
  else x.P.R = y;
  y.P = x.P;
}
function fixRemove(tree, x) {
  let w;
  while (x !== NULL_NODE && x.C === BLACK) {
    if (x === x.P.L) {
      w = x.P.R;
      if (w.C === RED) {
        w.C = BLACK;
        x.P.C = RED;
        rotateLeft(tree, x.P);
        w = x.P.R;
      }
      if (w.L.C === BLACK && w.R.C === BLACK) {
        w.C = RED;
        x = x.P;
      } else {
        if (w.R.C === BLACK) {
          w.L.C = BLACK;
          w.C = RED;
          rotateRight(tree, w);
          w = x.P.R;
        }
        w.C = x.P.C;
        x.P.C = BLACK;
        w.R.C = BLACK;
        rotateLeft(tree, x.P);
        x = tree.root;
      }
    } else {
      w = x.P.L;
      if (w.C === RED) {
        w.C = BLACK;
        x.P.C = RED;
        rotateRight(tree, x.P);
        w = x.P.L;
      }
      if (w.R.C === BLACK && w.L.C === BLACK) {
        w.C = RED;
        x = x.P;
      } else {
        if (w.L.C === BLACK) {
          w.R.C = BLACK;
          w.C = RED;
          rotateLeft(tree, w);
          w = x.P.L;
        }
        w.C = x.P.C;
        x.P.C = BLACK;
        w.L.C = BLACK;
        rotateRight(tree, x.P);
        x = tree.root;
      }
    }
  }
  x.C = BLACK;
}
function minimumTree(x) {
  while (x.L !== NULL_NODE) x = x.L;
  return x;
}
function fixInsert(tree, z) {
  let y;
  while (z.P.C === RED) {
    if (z.P === z.P.P.L) {
      y = z.P.P.R;
      if (y.C === RED) {
        z.P.C = BLACK;
        y.C = BLACK;
        z.P.P.C = RED;
        z = z.P.P;
      } else {
        if (z === z.P.R) {
          z = z.P;
          rotateLeft(tree, z);
        }
        z.P.C = BLACK;
        z.P.P.C = RED;
        rotateRight(tree, z.P.P);
      }
    } else {
      y = z.P.P.L;
      if (y.C === RED) {
        z.P.C = BLACK;
        y.C = BLACK;
        z.P.P.C = RED;
        z = z.P.P;
      } else {
        if (z === z.P.L) {
          z = z.P;
          rotateRight(tree, z);
        }
        z.P.C = BLACK;
        z.P.P.C = RED;
        rotateLeft(tree, z.P.P);
      }
    }
  }
  tree.root.C = BLACK;
}
function createIntervalTree() {
  const tree = {
    root: NULL_NODE,
    size: 0
  };
  const indexMap = {};
  return {
    insert(low, high, index) {
      let x = tree.root;
      let y = NULL_NODE;
      while (x !== NULL_NODE) {
        y = x;
        if (low === y.low) break;
        if (low < x.low) x = x.L;
        else x = x.R;
      }
      if (low === y.low && y !== NULL_NODE) {
        if (!addInterval(y, high, index)) return;
        y.high = Math.max(y.high, high);
        updateMax(y);
        updateMaxUp(y);
        indexMap[index] = y;
        tree.size++;
        return;
      }
      const z = {
        low,
        high,
        max: high,
        C: RED,
        P: y,
        L: NULL_NODE,
        R: NULL_NODE,
        list: {
          index,
          high,
          next: null
        }
      };
      if (y === NULL_NODE) {
        tree.root = z;
      } else {
        if (z.low < y.low) y.L = z;
        else y.R = z;
        updateMaxUp(z);
      }
      fixInsert(tree, z);
      indexMap[index] = z;
      tree.size++;
    },
    remove(index) {
      const z = indexMap[index];
      if (z === void 0) return;
      delete indexMap[index];
      const intervalResult = removeInterval(z, index);
      if (intervalResult === void 0) return;
      if (intervalResult === KEEP) {
        z.high = z.list.high;
        updateMax(z);
        updateMaxUp(z);
        tree.size--;
        return;
      }
      let y = z;
      let originalYColor = y.C;
      let x;
      if (z.L === NULL_NODE) {
        x = z.R;
        replaceNode(tree, z, z.R);
      } else if (z.R === NULL_NODE) {
        x = z.L;
        replaceNode(tree, z, z.L);
      } else {
        y = minimumTree(z.R);
        originalYColor = y.C;
        x = y.R;
        if (y.P === z) {
          x.P = y;
        } else {
          replaceNode(tree, y, y.R);
          y.R = z.R;
          y.R.P = y;
        }
        replaceNode(tree, z, y);
        y.L = z.L;
        y.L.P = y;
        y.C = z.C;
      }
      updateMax(x);
      updateMaxUp(x);
      if (originalYColor === BLACK) fixRemove(tree, x);
      tree.size--;
    },
    search(low, high, callback) {
      const stack = [tree.root];
      while (stack.length !== 0) {
        const node = stack.pop();
        if (node === NULL_NODE || low > node.max) continue;
        if (node.L !== NULL_NODE) stack.push(node.L);
        if (node.R !== NULL_NODE) stack.push(node.R);
        if (node.low <= high && node.high >= low) {
          let curr = node.list;
          while (curr !== null) {
            if (curr.high >= low) callback(curr.index, node.low);
            curr = curr.next;
          }
        }
      }
    },
    get size() {
      return tree.size;
    }
  };
}
const useLatest = (current) => {
  const storedValue = reactExports.useRef(current);
  reactExports.useEffect(() => {
    storedValue.current = current;
  });
  return storedValue;
};
const useDebounceCallback = (callback, wait = 100, leading = false) => {
  const storedCallback = useLatest(callback);
  const timeout = reactExports.useRef();
  const deps = [wait, leading, storedCallback];
  function _ref3() {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = void 0;
  }
  reactExports.useEffect(() => _ref3, deps);
  function _ref22() {
    timeout.current = void 0;
  }
  return reactExports.useCallback(function() {
    const args = arguments;
    const {
      current
    } = timeout;
    if (current === void 0 && leading) {
      timeout.current = setTimeout(_ref22, wait);
      return storedCallback.current.apply(null, args);
    }
    current && clearTimeout(current);
    timeout.current = setTimeout(() => {
      timeout.current = void 0;
      storedCallback.current.apply(null, args);
    }, wait);
  }, deps);
};
const useDebounce = (initialState, wait, leading) => {
  const state = reactExports.useState(initialState);
  return [state[0], useDebounceCallback(state[1], wait, leading)];
};
function useEvent(target, type, listener, cleanup) {
  const storedListener = reactExports.useRef(listener);
  const storedCleanup = reactExports.useRef(cleanup);
  reactExports.useEffect(() => {
    storedListener.current = listener;
    storedCleanup.current = cleanup;
  });
  reactExports.useEffect(() => {
    const targetEl = target && "current" in target ? target.current : target;
    if (!targetEl) return;
    let didUnsubscribe = 0;
    function listener2(...args) {
      if (didUnsubscribe) return;
      storedListener.current.apply(this, args);
    }
    targetEl.addEventListener(type, listener2);
    const cleanup2 = storedCleanup.current;
    return () => {
      didUnsubscribe = 1;
      targetEl.removeEventListener(type, listener2);
      cleanup2 && cleanup2();
    };
  }, [target, type]);
}
const emptyObj$1 = {};
const win$2 = typeof window === "undefined" ? null : window;
const wv = win$2 && typeof win$2.visualViewport !== "undefined" ? win$2.visualViewport : null;
const getSize = () => [document.documentElement.clientWidth, document.documentElement.clientHeight];
const useWindowSize = function(options) {
  if (options === void 0) {
    options = emptyObj$1;
  }
  const {
    wait,
    leading,
    initialWidth = 0,
    initialHeight = 0
  } = options;
  const [size, setDebouncedSize] = useDebounce(
    /* istanbul ignore next */
    typeof document === "undefined" ? [initialWidth, initialHeight] : getSize,
    wait,
    leading
  );
  const setSize = () => setDebouncedSize(getSize);
  useEvent(win$2, "resize", setSize);
  useEvent(wv, "resize", setSize);
  useEvent(win$2, "orientationchange", setSize);
  return size;
};
const memoOne = (fn, areEqual) => {
  const equal = areEqual || defaultAreEqual;
  let args, value;
  return function() {
    return !!args && equal(arguments, args) ? value : value = fn.apply(null, args = arguments);
  };
};
const defaultAreEqual = (current, prev) => current[0] === prev[0] && current[1] === prev[1] && current[2] === prev[2] && current[3] === prev[3];
class OneKeyMap {
  constructor() {
    this.set = void 0;
    this.get = void 0;
    let key, val;
    this.get = (k) => k === key ? val : void 0;
    this.set = (k, v) => {
      key = k;
      val = v;
    };
  }
}
const createCache = (obj) => {
  try {
    return new obj();
  } catch (e) {
    const cache = {};
    return {
      set(k, v) {
        cache[k] = v;
      },
      get(k) {
        return cache[k];
      }
    };
  }
};
const memo = (constructors) => {
  const depth = constructors.length, baseCache = createCache(constructors[0]);
  let base;
  let map;
  let i;
  let node;
  const one = depth === 1;
  const g1 = (args) => (base = baseCache.get(args[0])) === void 0 || one ? base : base.get(args[1]);
  const s1 = (args, value) => {
    if (one) baseCache.set(args[0], value);
    else {
      if ((base = baseCache.get(args[0])) === void 0) {
        map = createCache(constructors[1]);
        map.set(args[1], value);
        baseCache.set(args[0], map);
      } else {
        base.set(args[1], value);
      }
    }
    return value;
  };
  const g2 = (args) => {
    node = baseCache;
    for (i = 0; i < depth; i++) if ((node = node.get(args[i])) === void 0) return;
    return node;
  };
  const s2 = (args, value) => {
    node = baseCache;
    for (i = 0; i < depth - 1; i++) {
      if ((map = node.get(args[i])) === void 0) {
        map = createCache(constructors[i + 1]);
        node.set(args[i], map);
        node = map;
      } else {
        node = map;
      }
    }
    node.set(args[depth - 1], value);
    return value;
  };
  return depth < 3 ? {
    g: g1,
    s: s1
  } : {
    g: g2,
    s: s2
  };
};
const memoize = (mapConstructors, fn) => {
  let item;
  const {
    g,
    s
  } = memo(mapConstructors);
  return function() {
    return (item = g(arguments)) === void 0 ? s(arguments, fn.apply(null, arguments)) : item;
  };
};
const elementsCache = /* @__PURE__ */ new WeakMap();
function useForceUpdate() {
  const setState = reactExports.useState(emptyObj)[1];
  return reactExports.useRef(() => setState({})).current;
}
const emptyObj = {};
const __reactCreateElement__$1 = reactExports.createElement;
function useMasonry(_ref3) {
  let {
    // Measurement and layout
    positioner,
    resizeObserver,
    // Grid items
    items,
    // Container props
    as: ContainerComponent = "div",
    id,
    className,
    style,
    role = "grid",
    tabIndex = 0,
    containerRef,
    // Item props
    itemAs: ItemComponent = "div",
    itemStyle,
    itemHeightEstimate = 300,
    itemKey = defaultGetItemKey,
    // Rendering props
    overscanBy = 2,
    scrollTop,
    isScrolling,
    height,
    render: RenderComponent,
    onRender
  } = _ref3;
  let startIndex = 0;
  let stopIndex;
  const forceUpdate = useForceUpdate();
  const setItemRef = getRefSetter(positioner, resizeObserver);
  const itemCount = items.length;
  const {
    columnWidth,
    columnCount,
    range,
    estimateHeight,
    size,
    shortestColumn
  } = positioner;
  const measuredCount = size();
  const shortestColumnSize = shortestColumn();
  const children = [];
  const itemRole = role === "list" ? "listitem" : role === "grid" ? "gridcell" : void 0;
  const storedOnRender = useLatest(onRender);
  overscanBy = height * overscanBy;
  const rangeEnd = scrollTop + overscanBy;
  const needsFreshBatch = shortestColumnSize < rangeEnd && measuredCount < itemCount;
  range(
    // We overscan in both directions because users scroll both ways,
    // though one must admit scrolling down is more common and thus
    // we only overscan by half the downward overscan amount
    Math.max(0, scrollTop - overscanBy / 2),
    rangeEnd,
    (index, left, top) => {
      const data = items[index];
      const key = itemKey(data, index);
      const phaseTwoStyle = {
        top,
        left,
        width: columnWidth,
        writingMode: "horizontal-tb",
        position: "absolute"
      };
      children.push(/* @__PURE__ */ __reactCreateElement__$1(ItemComponent, {
        key,
        ref: setItemRef(index),
        role: itemRole,
        style: typeof itemStyle === "object" && itemStyle !== null ? Object.assign({}, phaseTwoStyle, itemStyle) : phaseTwoStyle
      }, createRenderElement(RenderComponent, index, data, columnWidth)));
      if (stopIndex === void 0) {
        startIndex = index;
        stopIndex = index;
      } else {
        startIndex = Math.min(startIndex, index);
        stopIndex = Math.max(stopIndex, index);
      }
    }
  );
  if (needsFreshBatch) {
    const batchSize = Math.min(itemCount - measuredCount, Math.ceil((scrollTop + overscanBy - shortestColumnSize) / itemHeightEstimate * columnCount));
    let index = measuredCount;
    const phaseOneStyle = getCachedSize(columnWidth);
    for (; index < measuredCount + batchSize; index++) {
      const data = items[index];
      const key = itemKey(data, index);
      children.push(/* @__PURE__ */ __reactCreateElement__$1(ItemComponent, {
        key,
        ref: setItemRef(index),
        role: itemRole,
        style: typeof itemStyle === "object" ? Object.assign({}, phaseOneStyle, itemStyle) : phaseOneStyle
      }, createRenderElement(RenderComponent, index, data, columnWidth)));
    }
  }
  reactExports.useEffect(() => {
    if (typeof storedOnRender.current === "function" && stopIndex !== void 0) storedOnRender.current(startIndex, stopIndex, items);
    didEverMount = "1";
  }, [startIndex, stopIndex, items, storedOnRender]);
  reactExports.useEffect(() => {
    if (needsFreshBatch) forceUpdate();
  }, [needsFreshBatch, positioner]);
  const containerStyle = getContainerStyle(isScrolling, estimateHeight(itemCount, itemHeightEstimate));
  return /* @__PURE__ */ __reactCreateElement__$1(ContainerComponent, {
    ref: containerRef,
    key: didEverMount,
    id,
    role,
    className,
    tabIndex,
    style: typeof style === "object" ? assignUserStyle(containerStyle, style) : containerStyle,
    children
  });
}
let didEverMount = "0";
const createRenderElement = /* @__PURE__ */ memoize([OneKeyMap, {}, WeakMap, OneKeyMap], (RenderComponent, index, data, columnWidth) => /* @__PURE__ */ __reactCreateElement__$1(RenderComponent, {
  index,
  data,
  width: columnWidth
}));
const getContainerStyle = /* @__PURE__ */ memoOne((isScrolling, estimateHeight) => ({
  position: "relative",
  width: "100%",
  maxWidth: "100%",
  height: Math.ceil(estimateHeight),
  maxHeight: Math.ceil(estimateHeight),
  willChange: isScrolling ? "contents" : void 0,
  pointerEvents: isScrolling ? "none" : void 0
}));
const cmp2 = (args, pargs) => args[0] === pargs[0] && args[1] === pargs[1];
const assignUserStyle = /* @__PURE__ */ memoOne(
  (containerStyle, userStyle) => Object.assign({}, containerStyle, userStyle),
  // @ts-expect-error
  cmp2
);
function defaultGetItemKey(_, i) {
  return i;
}
const getCachedSize = /* @__PURE__ */ memoOne((width) => ({
  width,
  zIndex: -1e3,
  visibility: "hidden",
  position: "absolute",
  writingMode: "horizontal-tb"
}), (args, pargs) => args[0] === pargs[0]);
const getRefSetter = /* @__PURE__ */ memoOne(
  (positioner, resizeObserver) => (index) => (el) => {
    if (el === null) return;
    if (resizeObserver) {
      resizeObserver.observe(el);
      elementsCache.set(el, index);
    }
    if (positioner.get(index) === void 0) positioner.set(index, el.offsetHeight);
  },
  // @ts-expect-error
  cmp2
);
let u = "undefined", win$1 = typeof window !== u ? window : {}, p = typeof performance !== u ? performance : Date, now$1 = () => p.now(), af = "AnimationFrame", Caf = "cancel" + af, Raf = "request" + af, raf = win$1[Raf] && /* @__PURE__ */ win$1[Raf].bind(win$1), caf = win$1[Caf] && /* @__PURE__ */ win$1[Caf].bind(win$1);
function _ref(h) {
  return clearTimeout(h);
}
if (!raf || !caf) {
  let lastTime = 0;
  raf = (callback) => {
    let curr = now$1(), next = Math.max(lastTime + 1e3 / 60, curr);
    return setTimeout(() => {
      callback(lastTime = next);
    }, next - curr);
  };
  caf = _ref;
}
const clearRequestTimeout = (handle) => {
  caf(handle.v || -1);
};
const requestTimeout = (fn, ms) => {
  const start = now$1(), handle = {};
  const loop = () => {
    now$1() - start >= ms ? fn.call(null) : handle.v = raf(loop);
  };
  handle.v = raf(loop);
  return handle;
};
const perf = typeof performance !== "undefined" ? performance : Date;
const now = () => perf.now();
function useThrottleCallback(callback, fps = 30, leading = false) {
  const storedCallback = useLatest(callback);
  const ms = 1e3 / fps;
  const prev = reactExports.useRef(0);
  const trailingTimeout = reactExports.useRef();
  const clearTrailing = () => trailingTimeout.current && clearTimeout(trailingTimeout.current);
  const deps = [fps, leading, storedCallback];
  function _ref3() {
    prev.current = 0;
    clearTrailing();
  }
  reactExports.useEffect(() => _ref3, deps);
  return reactExports.useCallback(function() {
    const args = arguments;
    const rightNow = now();
    const call = () => {
      prev.current = rightNow;
      clearTrailing();
      storedCallback.current.apply(null, args);
    };
    const current = prev.current;
    if (leading && current === 0) return call();
    if (rightNow - current > ms) {
      if (current > 0) return call();
      prev.current = rightNow;
    }
    clearTrailing();
    trailingTimeout.current = setTimeout(() => {
      call();
      prev.current = 0;
    }, ms);
  }, deps);
}
function useThrottle(initialState, fps, leading) {
  const state = reactExports.useState(initialState);
  return [state[0], useThrottleCallback(state[1], fps, leading)];
}
const win = typeof window === "undefined" ? null : window;
const getScrollY = () => win.scrollY !== void 0 ? win.scrollY : win.pageYOffset === void 0 ? 0 : win.pageYOffset;
const useWindowScroll = (fps = 30) => {
  const state = useThrottle(typeof window === "undefined" ? 0 : getScrollY, fps, true);
  useEvent(win, "scroll", () => state[1](getScrollY()));
  return state[0];
};
function useScroller(offset, fps) {
  if (offset === void 0) {
    offset = 0;
  }
  if (fps === void 0) {
    fps = 12;
  }
  const scrollTop = useWindowScroll(fps);
  const [isScrolling, setIsScrolling] = reactExports.useState(false);
  const didMount = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (didMount.current === 1) setIsScrolling(true);
    let didUnsubscribe = false;
    const to = requestTimeout(() => {
      if (didUnsubscribe) return;
      setIsScrolling(false);
    }, 40 + 1e3 / fps);
    didMount.current = 1;
    return () => {
      didUnsubscribe = true;
      clearRequestTimeout(to);
    };
  }, [fps, scrollTop]);
  return {
    scrollTop: Math.max(0, scrollTop - offset),
    isScrolling
  };
}
function MasonryScroller(props) {
  const {
    scrollTop,
    isScrolling
  } = useScroller(props.offset, props.scrollFps);
  return useMasonry({
    scrollTop,
    isScrolling,
    positioner: props.positioner,
    resizeObserver: props.resizeObserver,
    items: props.items,
    onRender: props.onRender,
    as: props.as,
    id: props.id,
    className: props.className,
    style: props.style,
    role: props.role,
    tabIndex: props.tabIndex,
    containerRef: props.containerRef,
    itemAs: props.itemAs,
    itemStyle: props.itemStyle,
    itemHeightEstimate: props.itemHeightEstimate,
    itemKey: props.itemKey,
    overscanBy: props.overscanBy,
    height: props.height,
    render: props.render
  });
}
const usePassiveLayoutEffect = React[typeof document !== "undefined" && document.createElement !== void 0 ? "useLayoutEffect" : "useEffect"];
function useContainerPosition(elementRef, deps) {
  if (deps === void 0) {
    deps = emptyArr$1;
  }
  const [containerPosition, setContainerPosition] = reactExports.useState({
    offset: 0,
    width: 0
  });
  usePassiveLayoutEffect(() => {
    const {
      current
    } = elementRef;
    if (current !== null) {
      let offset = 0;
      let el = current;
      do {
        offset += el.offsetTop || 0;
        el = el.offsetParent;
      } while (el);
      if (offset !== containerPosition.offset || current.offsetWidth !== containerPosition.width) {
        setContainerPosition({
          offset,
          width: current.offsetWidth
        });
      }
    }
  }, deps);
  return containerPosition;
}
const emptyArr$1 = [];
function usePositioner(_ref3, deps) {
  let {
    width,
    columnWidth = 200,
    columnGutter = 0,
    rowGutter,
    columnCount,
    maxColumnCount,
    maxColumnWidth
  } = _ref3;
  if (deps === void 0) {
    deps = emptyArr;
  }
  const initPositioner = () => {
    const [computedColumnWidth, computedColumnCount] = getColumns(width, columnWidth, columnGutter, columnCount, maxColumnCount, maxColumnWidth);
    return createPositioner(computedColumnCount, computedColumnWidth, columnGutter, rowGutter !== null && rowGutter !== void 0 ? rowGutter : columnGutter);
  };
  const positionerRef = reactExports.useRef();
  if (positionerRef.current === void 0) positionerRef.current = initPositioner();
  const prevDeps = reactExports.useRef(deps);
  const opts = [width, columnWidth, columnGutter, rowGutter, columnCount, maxColumnCount, maxColumnWidth];
  const prevOpts = reactExports.useRef(opts);
  const optsChanged = !opts.every((item, i) => prevOpts.current[i] === item);
  if (optsChanged || !deps.every((item, i) => prevDeps.current[i] === item)) {
    const prevPositioner = positionerRef.current;
    const positioner = initPositioner();
    prevDeps.current = deps;
    prevOpts.current = opts;
    if (optsChanged) {
      const cacheSize = prevPositioner.size();
      for (let index = 0; index < cacheSize; index++) {
        const pos = prevPositioner.get(index);
        positioner.set(index, pos !== void 0 ? pos.height : 0);
      }
    }
    positionerRef.current = positioner;
  }
  return positionerRef.current;
}
const createPositioner = function(columnCount, columnWidth, columnGutter, rowGutter) {
  if (columnGutter === void 0) {
    columnGutter = 0;
  }
  if (rowGutter === void 0) {
    rowGutter = columnGutter;
  }
  const intervalTree = createIntervalTree();
  const columnHeights = new Array(columnCount);
  const items = [];
  const columnItems = new Array(columnCount);
  for (let i = 0; i < columnCount; i++) {
    columnHeights[i] = 0;
    columnItems[i] = [];
  }
  return {
    columnCount,
    columnWidth,
    set: function(index, height) {
      if (height === void 0) {
        height = 0;
      }
      let column = 0;
      for (let i = 1; i < columnHeights.length; i++) {
        if (columnHeights[i] < columnHeights[column]) column = i;
      }
      const top = columnHeights[column] || 0;
      columnHeights[column] = top + height + rowGutter;
      columnItems[column].push(index);
      items[index] = {
        left: column * (columnWidth + columnGutter),
        top,
        height,
        column
      };
      intervalTree.insert(top, top + height, index);
    },
    get: (index) => items[index],
    // This only updates items in the specific columns that have changed, on and after the
    // specific items that have changed
    update: (updates) => {
      const columns = new Array(columnCount);
      let i = 0, j = 0;
      for (; i < updates.length - 1; i++) {
        const index = updates[i];
        const item = items[index];
        item.height = updates[++i];
        intervalTree.remove(index);
        intervalTree.insert(item.top, item.top + item.height, index);
        columns[item.column] = columns[item.column] === void 0 ? index : Math.min(index, columns[item.column]);
      }
      for (i = 0; i < columns.length; i++) {
        if (columns[i] === void 0) continue;
        const itemsInColumn = columnItems[i];
        const startIndex = binarySearch(itemsInColumn, columns[i]);
        const index = columnItems[i][startIndex];
        const startItem = items[index];
        columnHeights[i] = startItem.top + startItem.height + rowGutter;
        for (j = startIndex + 1; j < itemsInColumn.length; j++) {
          const index2 = itemsInColumn[j];
          const item = items[index2];
          item.top = columnHeights[i];
          columnHeights[i] = item.top + item.height + rowGutter;
          intervalTree.remove(index2);
          intervalTree.insert(item.top, item.top + item.height, index2);
        }
      }
    },
    // Render all cells visible within the viewport range defined.
    range: (lo, hi, renderCallback) => intervalTree.search(lo, hi, (index, top) => renderCallback(index, items[index].left, top)),
    estimateHeight: (itemCount, defaultItemHeight) => {
      const tallestColumn = Math.max(0, Math.max.apply(null, columnHeights));
      return itemCount === intervalTree.size ? tallestColumn : tallestColumn + Math.ceil((itemCount - intervalTree.size) / columnCount) * defaultItemHeight;
    },
    shortestColumn: () => {
      if (columnHeights.length > 1) return Math.min.apply(null, columnHeights);
      return columnHeights[0] || 0;
    },
    size() {
      return intervalTree.size;
    },
    all() {
      return items;
    }
  };
};
const binarySearch = (a, y) => {
  let l = 0;
  let h = a.length - 1;
  while (l <= h) {
    const m = l + h >>> 1;
    const x = a[m];
    if (x === y) return m;
    else if (x <= y) l = m + 1;
    else h = m - 1;
  }
  return -1;
};
const getColumns = function(width, minimumWidth, gutter, columnCount, maxColumnCount, maxColumnWidth) {
  if (width === void 0) {
    width = 0;
  }
  if (minimumWidth === void 0) {
    minimumWidth = 0;
  }
  if (gutter === void 0) {
    gutter = 8;
  }
  columnCount = columnCount || Math.min(Math.floor((width + gutter) / (minimumWidth + gutter)), maxColumnCount || Infinity) || 1;
  let columnWidth = Math.floor((width - gutter * (columnCount - 1)) / columnCount);
  if (maxColumnWidth !== void 0 && columnWidth > maxColumnWidth) {
    columnWidth = maxColumnWidth;
  }
  return [columnWidth, columnCount];
};
const emptyArr = [];
var rafSchd = function rafSchd2(fn) {
  var lastArgs = [];
  var frameId = null;
  var wrapperFn = function wrapperFn2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    lastArgs = args;
    if (frameId) {
      return;
    }
    frameId = requestAnimationFrame(function() {
      frameId = null;
      fn.apply(void 0, lastArgs);
    });
  };
  wrapperFn.cancel = function() {
    if (!frameId) {
      return;
    }
    cancelAnimationFrame(frameId);
    frameId = null;
  };
  return wrapperFn;
};
function useResizeObserver(positioner) {
  const forceUpdate = useForceUpdate();
  const resizeObserver = createResizeObserver(positioner, forceUpdate);
  function _ref3() {
    return resizeObserver.disconnect();
  }
  reactExports.useEffect(() => _ref3, [resizeObserver]);
  return resizeObserver;
}
function _ref2(handler) {
  handler.cancel();
}
const createResizeObserver = /* @__PURE__ */ memoize(
  [WeakMap],
  // TODO: figure out a way to test this
  /* istanbul ignore next */
  (positioner, updater) => {
    const updates = [];
    const update = rafSchd(() => {
      if (updates.length > 0) {
        positioner.update(updates);
        updater(updates);
      }
      updates.length = 0;
    });
    const commonHandler = (target) => {
      const height = target.offsetHeight;
      if (height > 0) {
        const index = elementsCache.get(target);
        if (index !== void 0) {
          const position = positioner.get(index);
          if (position !== void 0 && height !== position.height) updates.push(index, height);
        }
      }
      update();
    };
    const handlers = /* @__PURE__ */ new Map();
    const handleEntries = (entries) => {
      let i = 0;
      for (; i < entries.length; i++) {
        const entry = entries[i];
        const index = elementsCache.get(entry.target);
        if (index === void 0) continue;
        let handler = handlers.get(index);
        if (!handler) {
          handler = rafSchd(commonHandler);
          handlers.set(index, handler);
        }
        handler(entry.target);
      }
    };
    const ro = new ResizeObserver(handleEntries);
    const disconnect = ro.disconnect.bind(ro);
    ro.disconnect = () => {
      disconnect();
      handlers.forEach(_ref2);
    };
    return ro;
  }
);
function useScrollToIndex(positioner, options) {
  var _latestOptions$curren;
  const {
    align = "top",
    element = typeof window !== "undefined" && window,
    offset = 0,
    height = typeof window !== "undefined" ? window.innerHeight : 0
  } = options;
  const latestOptions = useLatest({
    positioner,
    element,
    align,
    offset,
    height
  });
  const getTarget = reactExports.useRef(() => {
    const latestElement = latestOptions.current.element;
    return latestElement && "current" in latestElement ? latestElement.current : latestElement;
  }).current;
  const [state, dispatch] = reactExports.useReducer((state2, action) => {
    const nextState = {
      position: state2.position,
      index: state2.index,
      prevTop: state2.prevTop
    };
    if (action.type === "scrollToIndex") {
      var _action$value;
      return {
        position: latestOptions.current.positioner.get((_action$value = action.value) !== null && _action$value !== void 0 ? _action$value : -1),
        index: action.value,
        prevTop: void 0
      };
    } else if (action.type === "setPosition") {
      nextState.position = action.value;
    } else if (action.type === "setPrevTop") {
      nextState.prevTop = action.value;
    } else if (action.type === "reset") {
      return defaultState;
    }
    return nextState;
  }, defaultState);
  const throttledDispatch = useThrottleCallback(dispatch, 15);
  useEvent(getTarget(), "scroll", () => {
    if (!state.position && state.index) {
      const position = latestOptions.current.positioner.get(state.index);
      if (position) {
        dispatch({
          type: "setPosition",
          value: position
        });
      }
    }
  });
  const currentTop = state.index !== void 0 && ((_latestOptions$curren = latestOptions.current.positioner.get(state.index)) === null || _latestOptions$curren === void 0 ? void 0 : _latestOptions$curren.top);
  reactExports.useEffect(() => {
    const target = getTarget();
    if (!target) return;
    const {
      height: height2,
      align: align2,
      offset: offset2,
      positioner: positioner2
    } = latestOptions.current;
    if (state.position) {
      let scrollTop = state.position.top;
      if (align2 === "bottom") {
        scrollTop = scrollTop - height2 + state.position.height;
      } else if (align2 === "center") {
        scrollTop -= (height2 - state.position.height) / 2;
      }
      target.scrollTo(0, Math.max(0, scrollTop += offset2));
      let didUnsubscribe = false;
      const timeout = setTimeout(() => !didUnsubscribe && dispatch({
        type: "reset"
      }), 400);
      return () => {
        didUnsubscribe = true;
        clearTimeout(timeout);
      };
    } else if (state.index !== void 0) {
      let estimatedTop = positioner2.shortestColumn() / positioner2.size() * state.index;
      if (state.prevTop) estimatedTop = Math.max(estimatedTop, state.prevTop + height2);
      target.scrollTo(0, estimatedTop);
      throttledDispatch({
        type: "setPrevTop",
        value: estimatedTop
      });
    }
  }, [currentTop, state, latestOptions, getTarget, throttledDispatch]);
  return reactExports.useRef((index) => {
    dispatch({
      type: "scrollToIndex",
      value: index
    });
  }).current;
}
const defaultState = {
  index: void 0,
  position: void 0,
  prevTop: void 0
};
const __reactCreateElement__ = reactExports.createElement;
function Masonry(props) {
  const containerRef = reactExports.useRef(null);
  const windowSize = useWindowSize({
    initialWidth: props.ssrWidth,
    initialHeight: props.ssrHeight
  });
  const containerPos = useContainerPosition(containerRef, windowSize);
  const nextProps = Object.assign({
    offset: containerPos.offset,
    width: containerPos.width || windowSize[0],
    height: windowSize[1],
    containerRef
  }, props);
  nextProps.positioner = usePositioner(nextProps);
  nextProps.resizeObserver = useResizeObserver(nextProps.positioner);
  const scrollToIndex = useScrollToIndex(nextProps.positioner, {
    height: nextProps.height,
    offset: containerPos.offset,
    align: typeof props.scrollToIndex === "object" ? props.scrollToIndex.align : void 0
  });
  const index = props.scrollToIndex && (typeof props.scrollToIndex === "number" ? props.scrollToIndex : props.scrollToIndex.index);
  reactExports.useEffect(() => {
    if (index !== void 0) scrollToIndex(index);
  }, [index, scrollToIndex]);
  return __reactCreateElement__(MasonryScroller, nextProps);
}
const PAGE_SIZE = 30;
const HEADER_HEIGHT = 73;
const LazyImage = ({
  imageId,
  baseURL,
  initialUrl,
  alt,
  className
}) => {
  const [hasError, setHasError] = reactExports.useState(false);
  const [imageUrl, setImageUrl] = reactExports.useState(initialUrl ?? null);
  reactExports.useEffect(() => {
    if (initialUrl) {
      setImageUrl(initialUrl);
      setHasError(false);
    }
  }, [initialUrl]);
  reactExports.useEffect(() => {
    if (imageUrl || initialUrl) return;
    let cancelled = false;
    const fetchUrl = async () => {
      try {
        const response = await fetch(`${baseURL}/api/gallery/images/${imageId}`);
        if (!response.ok || cancelled) return;
        const data = await response.json();
        if (!cancelled && data.url) {
          setImageUrl(data.url);
        }
      } catch {
      }
    };
    fetchUrl();
    return () => {
      cancelled = true;
    };
  }, [baseURL, imageId, imageUrl, initialUrl]);
  const showPlaceholder = !imageUrl || hasError;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    showPlaceholder && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-square bg-muted/50 animate-pulse rounded-lg" }),
    imageUrl && !hasError && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageUrl, alt, loading: "lazy", className, onError: () => setHasError(true) })
  ] });
};
function getAspectRatio(data) {
  if (data.width && data.height && data.width > 0 && data.height > 0) {
    return `${data.width} / ${data.height}`;
  }
  if (data.aspectRatio && data.aspectRatio > 0 && Number.isFinite(data.aspectRatio)) {
    return String(data.aspectRatio);
  }
  return "1";
}
function MasonryGrid({ images, baseURL, onImageClick }) {
  const renderCard = reactExports.useCallback(
    ({ data, index }) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative group cursor-pointer rounded-lg overflow-hidden bg-muted/30 hover:ring-2 hover:ring-primary/50 transition-all duration-200",
          style: { aspectRatio: getAspectRatio(data) },
          onClick: () => onImageClick(index),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              LazyImage,
              {
                imageId: data.id,
                baseURL,
                initialUrl: data.url,
                alt: data.filename || "Gallery image",
                className: "w-full h-full object-cover block"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate pointer-events-none", children: data.threadTitle })
          ]
        }
      );
    },
    [baseURL, onImageClick]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Masonry, { items: images, itemKey: (item) => item.id, columnGutter: 12, overscanBy: 5, render: renderCard, columnWidth: 220 }) });
}
function GalleryWindow() {
  const { t } = useI18n();
  const [images, setImages] = reactExports.useState([]);
  const [totalCount, setTotalCount] = reactExports.useState(0);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isLoadingMore, setIsLoadingMore] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [baseURL, setBaseURL] = reactExports.useState("");
  const [hasMore, setHasMore] = reactExports.useState(true);
  const isLoadingRef = reactExports.useRef(false);
  const contentRef = reactExports.useRef(null);
  const { isMac } = usePlatformContext();
  const fetchImages = reactExports.useCallback(async (url, offset, append) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      setError(null);
      const response = await fetch(`${url}/api/gallery/images?limit=${PAGE_SIZE}&offset=${offset}`);
      if (!response.ok) {
        throw new Error("Failed to fetch gallery images");
      }
      const data = await response.json();
      if (data.images) {
        if (append) {
          setImages((prev) => [...prev, ...data.images]);
        } else {
          setImages(data.images);
        }
        setHasMore(data.hasMore);
        if (typeof data.total === "number") {
          setTotalCount(data.total);
        }
      } else if (Array.isArray(data)) {
        setImages(data);
        setHasMore(false);
        setTotalCount(data.length);
      }
    } catch (err) {
      console.error("Error fetching gallery images:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      isLoadingRef.current = false;
    }
  }, []);
  reactExports.useEffect(() => {
    const init = async () => {
      try {
        const info = await window.apiServer.getInfo();
        if (!info.baseURL) {
          throw new Error("API server not available");
        }
        setBaseURL(info.baseURL);
        fetchImages(info.baseURL, 0, false);
      } catch (err) {
        console.error("Error initializing gallery:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsLoading(false);
      }
    };
    init();
  }, [fetchImages]);
  const loadMore = reactExports.useCallback(() => {
    if (baseURL && hasMore && !isLoadingRef.current) {
      fetchImages(baseURL, images.length, true);
    }
  }, [baseURL, hasMore, images.length, fetchImages]);
  reactExports.useEffect(() => {
    if (isLoading || !hasMore) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight - scrollTop - windowHeight < 300) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore, loadMore]);
  const handleImageClick = reactExports.useCallback(
    (index) => {
      if (window.lightboxWindow) {
        window.lightboxWindow.open({ images, currentIndex: index, totalCount, hasMore }).catch(console.error);
      }
    },
    [images, totalCount, hasMore]
  );
  const handleCloseWindow = reactExports.useCallback(() => {
    if (window.galleryWindow?.close) {
      window.galleryWindow.close();
    } else {
      window.close();
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `gallery-shell min-h-screen bg-transparent relative ${isMac ? "rounded-[var(--window-radius)] overflow-hidden" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-background ${isMac ? "rounded-[var(--window-radius)]" : ""}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 border-b border-border bg-background",
        style: { WebkitAppRegion: "drag" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold", children: t("gallery.title") }),
            !isLoading && totalCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "(",
              totalCount,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { WebkitAppRegion: "no-drag" }, children: isMac ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: handleCloseWindow, className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WindowControls, {}) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: contentRef, className: "relative z-10", style: { paddingTop: HEADER_HEIGHT }, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", style: { height: `calc(100vh - ${HEADER_HEIGHT}px)` }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t("common.loading") })
    ] }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", style: { height: `calc(100vh - ${HEADER_HEIGHT}px)` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: error }) }) }) : images.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", style: { height: `calc(100vh - ${HEADER_HEIGHT}px)` }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("gallery.empty") })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MasonryGrid, { images, baseURL, onImageClick: handleImageClick }),
      isLoadingMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: t("common.loading") })
      ] }) })
    ] }) })
  ] });
}
initObservability();
function GalleryApp() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SWRConfig, { value: swrConfig, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionalPostHogProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryWindow, {}) }) }) }) });
}
function Root() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryApp, {});
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root, {}) })
);
window.ipcRenderer?.on("main-process-message", (_event, message) => {
  console.log(message);
});
