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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "a84f62f6-b31d-4667-b074-19aaa43d1d72", e._sentryDebugIdIdentifier = "sentry-dbid-a84f62f6-b31d-4667-b074-19aaa43d1d72");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports } from "./index-B0zE39VE.js";
import { _ as __vitePreload } from "./preload-helper-D_8ag_Pp.js";
import "./ThemeContext-Ac9lDiNd.js";
let engine = {
  audioContext: null,
  isInitialized: false,
  cycleTime: 0
};
let initPromise = null;
let stopPlayback = null;
let strudelRepl = null;
const ANALYSER_ID = 1;
async function initStrudelEngine() {
  if (engine.isInitialized) {
    return engine;
  }
  if (initPromise) {
    await initPromise;
    return engine;
  }
  initPromise = (async () => {
    try {
      const { initStrudel } = await __vitePreload(async () => {
        const { initStrudel: initStrudel2 } = await import("./index-Douqa6zz.js");
        return { initStrudel: initStrudel2 };
      }, true ? [] : void 0, import.meta.url);
      const repl = await initStrudel();
      strudelRepl = repl;
      const audioContext = getAudioContext();
      engine = {
        audioContext,
        isInitialized: true,
        cycleTime: 0
      };
      const strudelWeb2 = await __vitePreload(() => import("./index-Douqa6zz.js"), true ? [] : void 0, import.meta.url);
      if (typeof strudelWeb2.getAnalyzerData === "function") {
        cachedGetAnalyzerData = strudelWeb2.getAnalyzerData;
      }
      console.log("[Strudel] Engine initialized with repl:", !!strudelRepl);
    } catch (error) {
      console.error("Failed to initialize Strudel engine:", error);
      throw error;
    }
  })();
  await initPromise;
  return engine;
}
let strudelWeb = null;
async function getStrudelWeb() {
  if (!strudelWeb) {
    strudelWeb = await __vitePreload(() => import("./index-Douqa6zz.js"), true ? [] : void 0, import.meta.url);
  }
  return strudelWeb;
}
async function evaluateCode(code) {
  try {
    if (!engine.isInitialized) {
      await initStrudelEngine();
    }
    console.log("[Strudel] Evaluating code:", code);
    const { evaluate: strudelEvaluate } = await getStrudelWeb();
    const evalResult = await strudelEvaluate(code);
    console.log("[Strudel] evaluate result:", evalResult);
    const result = evalResult?.pattern || evalResult;
    if (!result || !result._Pattern && typeof result.query !== "function") {
      console.error("[Strudel] No valid pattern in result:", result);
      throw new Error("Code did not produce a valid pattern");
    }
    console.log("[Strudel] pattern has play:", typeof result.play === "function");
    console.log("[Strudel] pattern has analyze:", typeof result.analyze === "function");
    let patternWithAnalyzer = result;
    if (typeof result.analyze === "function") {
      patternWithAnalyzer = result.analyze(ANALYSER_ID);
      console.log("[Strudel] Added analyzer with ID:", ANALYSER_ID);
    }
    const miniLocations = strudelRepl?.state?.miniLocations || [];
    console.log("[Strudel] miniLocations:", miniLocations.length, miniLocations);
    return { pattern: patternWithAnalyzer, error: null, miniLocations };
  } catch (error) {
    console.error("[Strudel] Evaluation error:", error);
    return { pattern: null, error, miniLocations: [] };
  }
}
const playbackState = {
  isPlaying: false,
  cycleTime: 0,
  bpm: 120
};
function getPlaybackState() {
  return { ...playbackState };
}
function setBpm(bpm) {
  playbackState.bpm = Math.max(20, Math.min(300, bpm));
}
async function play(pattern) {
  if (!engine.isInitialized) {
    await initStrudelEngine();
  }
  await stop();
  const audioContext = engine.audioContext;
  if (!audioContext) {
    throw new Error("Audio context not available");
  }
  if (audioContext.state !== "running") {
    await audioContext.resume();
  }
  if (typeof pattern.play === "function") {
    const result = pattern.play();
    if (typeof result === "function") {
      stopPlayback = result;
    }
    playbackState.isPlaying = true;
    console.log("[Strudel] Playing with pattern.play()");
  } else {
    throw new Error("Pattern does not have a play method");
  }
}
async function stop() {
  if (!engine.isInitialized && !initPromise) {
    playbackState.isPlaying = false;
    playbackState.cycleTime = 0;
    return;
  }
  if (stopPlayback) {
    try {
      stopPlayback();
      console.log("[Strudel] Stopped with stopPlayback()");
    } catch (e) {
      console.warn("[Strudel] stopPlayback() error:", e);
    }
    stopPlayback = null;
  }
  try {
    const { hush: strudelHush } = await getStrudelWeb();
    strudelHush();
    console.log("[Strudel] Called hush()");
  } catch (e) {
    console.warn("[Strudel] hush() error:", e);
  }
  playbackState.isPlaying = false;
  playbackState.cycleTime = 0;
}
let cachedGetAnalyzerData = null;
function getAudioDataSync() {
  if (cachedGetAnalyzerData) {
    try {
      const data = cachedGetAnalyzerData("frequency", ANALYSER_ID);
      if (data && data.length > 0) {
        return data;
      }
    } catch (e) {
    }
  }
  return new Float32Array(512);
}
function getActiveHaps(lookbehind = 0.1, lookahead = 0.05) {
  if (!strudelRepl?.scheduler?.pattern) return [];
  try {
    const now = strudelRepl.scheduler.now();
    const begin = now - lookbehind;
    const end = now + lookahead;
    const haps = strudelRepl.scheduler.pattern.queryArc(begin, end);
    return haps.filter((hap) => {
      if (typeof hap.isActive === "function") {
        return hap.isActive(now);
      }
      if (hap.whole) {
        const hapBegin = hap.whole.begin.valueOf();
        const hapEnd = hap.whole.end.valueOf();
        return now >= hapBegin && now < hapEnd;
      }
      return false;
    });
  } catch (e) {
    console.warn("[Strudel] getActiveHaps error:", e);
    return [];
  }
}
function getActiveLocationIds() {
  const activeHaps = getActiveHaps();
  const ids = /* @__PURE__ */ new Set();
  for (const hap of activeHaps) {
    if (!hap.context?.locations) continue;
    for (const loc of hap.context.locations) {
      ids.add(`${loc.start}:${loc.end}`);
    }
  }
  return ids;
}
function useLiveCoding(options = {}) {
  const { initialCode = "", autoPlay = false, bpm: initialBpm = 120 } = options;
  const [isReady, setIsReady] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [code, setCode] = reactExports.useState(initialCode);
  const [bpm, setBpmState] = reactExports.useState(initialBpm);
  const [cycleTime, setCycleTime] = reactExports.useState(0);
  const [audioData, setAudioData] = reactExports.useState(new Float32Array(512));
  const [miniLocations, setMiniLocations] = reactExports.useState([]);
  const [activeLocationIds, setActiveLocationIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const patternRef = reactExports.useRef(null);
  const animationFrameRef = reactExports.useRef(null);
  const isInitializingRef = reactExports.useRef(false);
  const ensureEngine = reactExports.useCallback(async () => {
    if (isReady) return;
    if (isInitializingRef.current) return;
    isInitializingRef.current = true;
    try {
      setIsLoading(true);
      await initStrudelEngine();
      setIsReady(true);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Failed to initialize Strudel engine:", err);
      throw err;
    } finally {
      setIsLoading(false);
      isInitializingRef.current = false;
    }
  }, [isReady]);
  reactExports.useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stop().catch(console.error);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setActiveLocationIds(/* @__PURE__ */ new Set());
      return;
    }
    const updateLoop = () => {
      const state = getPlaybackState();
      setCycleTime(state.cycleTime);
      setAudioData(getAudioDataSync());
      setActiveLocationIds(getActiveLocationIds());
      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };
    animationFrameRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPlaying]);
  reactExports.useEffect(() => {
    if (autoPlay && initialCode) {
      evaluateAndPlay(initialCode);
    }
  }, [autoPlay]);
  const evaluateCode_ = reactExports.useCallback(async () => {
    try {
      await ensureEngine();
    } catch {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await evaluateCode(code);
      if (result.error) {
        setError(result.error);
        return;
      }
      patternRef.current = result.pattern;
      setMiniLocations(result.miniLocations);
      if (isPlaying && result.pattern) {
        await play(result.pattern);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [code, ensureEngine, isPlaying]);
  const evaluateAndPlay = reactExports.useCallback(
    async (codeToPlay) => {
      try {
        await ensureEngine();
      } catch {
        return;
      }
      const targetCode = codeToPlay ?? code;
      setIsLoading(true);
      setError(null);
      try {
        const result = await evaluateCode(targetCode);
        if (result.error) {
          setError(result.error);
          return;
        }
        patternRef.current = result.pattern;
        setMiniLocations(result.miniLocations);
        if (result.pattern) {
          await play(result.pattern);
          setIsPlaying(true);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [code, ensureEngine]
  );
  const playPattern = reactExports.useCallback(async () => {
    try {
      await ensureEngine();
    } catch {
      return;
    }
    if (!patternRef.current) {
      await evaluateAndPlay();
      return;
    }
    try {
      await play(patternRef.current);
      setIsPlaying(true);
      setError(null);
    } catch (err) {
      setError(err);
    }
  }, [ensureEngine, evaluateAndPlay]);
  const stopPattern = reactExports.useCallback(async () => {
    await stop();
    setIsPlaying(false);
    setCycleTime(0);
  }, []);
  const togglePlayback = reactExports.useCallback(async () => {
    if (isPlaying) {
      await stopPattern();
    } else {
      await playPattern();
    }
  }, [isPlaying, playPattern, stopPattern]);
  const setBpm$1 = reactExports.useCallback((newBpm) => {
    setBpm(newBpm);
    setBpmState(newBpm);
  }, []);
  const updateAudioData = reactExports.useCallback(() => {
    setAudioData(getAudioDataSync());
  }, []);
  const setCodeCallback = reactExports.useCallback((newCode) => {
    setCode(newCode);
    setError(null);
  }, []);
  return {
    // State
    isPlaying,
    isReady,
    isLoading,
    error,
    code,
    bpm,
    cycleTime,
    audioData,
    miniLocations,
    activeLocationIds,
    // Operations
    setCode: setCodeCallback,
    evaluate: evaluateCode_,
    play: playPattern,
    stop: stopPattern,
    toggle: togglePlayback,
    setBpm: setBpm$1,
    // Utilities
    updateAudioData
  };
}
let activeInstanceId = null;
const instanceCallbacks = /* @__PURE__ */ new Map();
function registerLiveCodingInstance(id, onStop) {
  instanceCallbacks.set(id, onStop);
}
function unregisterLiveCodingInstance(id) {
  instanceCallbacks.delete(id);
  if (activeInstanceId === id) {
    activeInstanceId = null;
  }
}
function setActiveLiveCodingInstance(id) {
  if (activeInstanceId && activeInstanceId !== id) {
    const callback = instanceCallbacks.get(activeInstanceId);
    if (callback) {
      callback();
    }
  }
  activeInstanceId = id;
}
export {
  unregisterLiveCodingInstance as a,
  getActiveLocationIds as g,
  registerLiveCodingInstance as r,
  setActiveLiveCodingInstance as s,
  useLiveCoding as u
};
