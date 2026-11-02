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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "0e9d70f9-db9b-4493-97c8-42e81ce1049d", e._sentryDebugIdIdentifier = "sentry-dbid-0e9d70f9-db9b-4493-97c8-42e81ce1049d");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { B as Button } from "./ThemeContext-Ac9lDiNd.js";
import { S as Slider } from "./slider-CpZgBHCs.js";
import "./x-BzMxEGBY.js";
import "./createLucideIcon-sFEqYeet.js";
import { u as useTheme, P as Play } from "./overflow-container-CXkfjaRd.js";
import "./preload-helper-D_8ag_Pp.js";
import { P as Pause, V as VolumeX } from "./App-CJD1Pyfa.js";
import { V as Volume2 } from "./PluginNotificationListener-DQz_TGb2.js";
import "./index-CZUfqr00.js";
import "./index-pfi9S7gc.js";
import "./label-CF1Fh03r.js";
import "./wand-sparkles-D4aHx43i.js";
import "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
import "./image-C_h5oH_f.js";
import "./useLiveCoding-DqcVzuV6.js";
import "./loader-circle-BsCo_wlW.js";
import "./artifactWorkspaceContextDef-Y91jRAgg.js";
import "./pencil-BtEsZPL8.js";
import "./trash-2-DTP27QMN.js";
import "./TwemojiIcon-qeDCXH7q.js";
import "./ExecutionHistory-CJxOXAbK.js";
import "./alma-icon-BzHspoaH.js";
import "./apiClient-DmP45vUN.js";
import "./generative-ui-block-1Rj38gNW.js";
import "./en-US-CZvvliM3.js";
import "./addLeadingZeros-DCGuLiwe.js";
import "./PlatformContext-BWz3dz-T.js";
/* empty css                   */
import "./ImageAnnotator-CcNrU1f9.js";
import "./v4-D_ZMSocT.js";
import "./ConditionalPostHogProvider-Cgb2BAQg.js";
const AudioPreview = reactExports.memo(function AudioPreview2({ src, mimeType }) {
  const audioRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const analyserRef = reactExports.useRef(null);
  const audioContextRef = reactExports.useRef(null);
  const sourceRef = reactExports.useRef(null);
  const animationRef = reactExports.useRef(null);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  const [error, setError] = reactExports.useState(null);
  const [isAudioContextReady, setIsAudioContextReady] = reactExports.useState(false);
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";
  const initAudioContext = reactExports.useCallback(() => {
    if (audioContextRef.current || !audioRef.current) return;
    try {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
      setIsAudioContextReady(true);
    } catch (e) {
      console.error("Failed to initialize audio context:", e);
    }
  }, []);
  const drawVisualization = reactExports.useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const container = containerRef.current;
    if (!canvas || !analyser || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = container.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barCount = 64;
    const barWidth = canvas.width / barCount - 2;
    const barGap = 2;
    const maxBarHeight = canvas.height * 0.8;
    const primaryColor = isDark ? "rgba(152, 195, 121, 0.8)" : "rgba(80, 161, 79, 0.8)";
    const primaryColorDim = isDark ? "rgba(152, 195, 121, 0.3)" : "rgba(80, 161, 79, 0.3)";
    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor(i / barCount * bufferLength);
      const value = dataArray[dataIndex] / 255;
      const minHeight = 4;
      const barHeight = Math.max(minHeight, value * maxBarHeight);
      const x = i * (barWidth + barGap) + barGap;
      const y = (canvas.height - barHeight) / 2;
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(0.5, primaryColor);
      gradient.addColorStop(1, primaryColorDim);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 2);
      ctx.fill();
    }
    animationRef.current = requestAnimationFrame(drawVisualization);
  }, [isDark]);
  const drawIdleVisualization = reactExports.useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = container.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barCount = 64;
    const barWidth = canvas.width / barCount - 2;
    const barGap = 2;
    const primaryColorDim = isDark ? "rgba(152, 195, 121, 0.2)" : "rgba(80, 161, 79, 0.2)";
    for (let i = 0; i < barCount; i++) {
      const wave = Math.sin(i / barCount * Math.PI * 4) * 0.5 + 0.5;
      const barHeight = 4 + wave * 20;
      const x = i * (barWidth + barGap) + barGap;
      const y = (canvas.height - barHeight) / 2;
      ctx.fillStyle = primaryColorDim;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 2);
      ctx.fill();
    }
  }, [isDark]);
  reactExports.useEffect(() => {
    if (isPlaying && isAudioContextReady) {
      if (audioContextRef.current?.state === "suspended") {
        audioContextRef.current.resume();
      }
      drawVisualization();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      drawIdleVisualization();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isAudioContextReady, drawVisualization, drawIdleVisualization]);
  reactExports.useEffect(() => {
    drawIdleVisualization();
    const handleResize = () => {
      if (!isPlaying) {
        drawIdleVisualization();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawIdleVisualization, isPlaying]);
  reactExports.useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setError(null);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      analyserRef.current = null;
      sourceRef.current = null;
      setIsAudioContextReady(false);
    }
    if (audioRef.current) {
      audioRef.current.load();
    }
    setTimeout(drawIdleVisualization, 0);
  }, [src, drawIdleVisualization]);
  reactExports.useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  const togglePlay = () => {
    if (audioRef.current) {
      if (!isAudioContextReady) {
        initAudioContext();
      }
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  const handleSeek = (value) => {
    if (audioRef.current && value[0] !== void 0) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Failed to load audio: ",
      error
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "flex-1 flex items-center justify-center bg-muted/30 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          variant: "outline",
          className: "rounded-full w-16 h-16 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90",
          onClick: togglePlay,
          children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "size-7" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-7 ml-1" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "audio",
      {
        ref: audioRef,
        crossOrigin: "anonymous",
        onTimeUpdate: handleTimeUpdate,
        onLoadedMetadata: handleLoadedMetadata,
        onEnded: () => setIsPlaying(false),
        onError: () => setError("Could not load audio"),
        onPlay: () => setIsPlaying(true),
        onPause: () => setIsPlaying(false),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src, type: mimeType }),
          "Your browser does not support the audio tag."
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 bg-background/90 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8", onClick: togglePlay, children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground min-w-[40px]", children: formatTime(currentTime) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { className: "flex-1", value: [currentTime], max: duration || 100, step: 0.1, onValueChange: handleSeek }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground min-w-[40px]", children: formatTime(duration) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8", onClick: toggleMute, children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "size-4" }) })
    ] })
  ] });
});
export {
  AudioPreview
};
