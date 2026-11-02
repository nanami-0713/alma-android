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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "6464215c-e33f-4f30-929b-74e3fa4fbb2b", e._sentryDebugIdIdentifier = "sentry-dbid-6464215c-e33f-4f30-929b-74e3fa4fbb2b");
    })();
  } catch (e) {
  }
}
;
import { c as createLucideIcon } from "./createLucideIcon-sFEqYeet.js";
import { r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { X } from "./x-BzMxEGBY.js";
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
      key: "edeuup"
    }
  ]
];
const MousePointer2 = createLucideIcon("mouse-pointer-2", __iconNode$2);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
  ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13", key: "6uklza" }]
];
const Redo2 = createLucideIcon("redo-2", __iconNode$1);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
];
const Undo2 = createLucideIcon("undo-2", __iconNode);
const CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳";
const circled = (n) => n >= 1 && n <= 20 ? CIRCLED[n - 1] : `${n}.`;
function annotationDraft(header, marks, note) {
  const lines = marks.flatMap((m) => m.label.trim() ? [`${circled(m.index)} ${m.label.trim()}`] : []);
  const parts = [];
  if (lines.length) parts.push([header, ...lines].join("\n"));
  if (note.trim()) parts.push(note.trim());
  return parts.join("\n\n");
}
const AnnotateContext = reactExports.createContext(null);
const MAX_CANVAS_SIDE = 2200;
const isLightColor = (hex) => {
  const c = hex.replace("#", "");
  if (c.length < 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 160;
};
const bboxOf = (r) => {
  if (r.type === "brush") {
    const xs = r.points.map((p) => p.x);
    const ys = r.points.map((p) => p.y);
    return { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) };
  }
  return { minX: Math.min(r.a.x, r.b.x), minY: Math.min(r.a.y, r.b.y), maxX: Math.max(r.a.x, r.b.x), maxY: Math.max(r.a.y, r.b.y) };
};
const badgeAnchorOf = (r) => {
  if (r.type === "brush") return r.points[0] ?? { x: 0, y: 0 };
  if (r.type === "arrow") return r.a;
  return { x: Math.min(r.a.x, r.b.x), y: Math.min(r.a.y, r.b.y) };
};
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const fitContain = (boxW, boxH, aspect) => {
  if (boxW <= 0 || boxH <= 0 || !isFinite(aspect) || aspect <= 0) return { ox: 0, oy: 0, rw: boxW, rh: boxH };
  if (aspect > boxW / boxH) {
    const rh = boxW / aspect;
    return { ox: 0, oy: (boxH - rh) / 2, rw: boxW, rh };
  }
  const rw = boxH * aspect;
  return { ox: (boxW - rw) / 2, oy: 0, rw, rh: boxH };
};
const HIT_PAD = 0.015;
const hitTestRegions = (regions, p) => {
  for (let i = regions.length - 1; i >= 0; i--) {
    const b = bboxOf(regions[i]);
    if (p.x >= b.minX - HIT_PAD && p.x <= b.maxX + HIT_PAD && p.y >= b.minY - HIT_PAD && p.y <= b.maxY + HIT_PAD) {
      return regions[i].id;
    }
  }
  return null;
};
const cloneGeometry = (g) => g.type === "brush" ? { type: "brush", points: g.points.map((p) => ({ ...p })) } : { type: g.type, a: { ...g.a }, b: { ...g.b } };
const applyTranslate = (r, orig, dx, dy) => {
  if (r.type === "brush" && orig.type === "brush") {
    r.points = orig.points.map((p) => ({ x: clamp01(p.x + dx), y: clamp01(p.y + dy) }));
  } else if (r.type !== "brush" && orig.type !== "brush") {
    r.a = { x: clamp01(orig.a.x + dx), y: clamp01(orig.a.y + dy) };
    r.b = { x: clamp01(orig.b.x + dx), y: clamp01(orig.b.y + dy) };
  }
};
function drawRegion(ctx, region, w, h, badgeR) {
  const px = (p) => ({ x: p.x * w, y: p.y * h });
  ctx.strokeStyle = region.color;
  ctx.fillStyle = region.color;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = region.width;
  if (region.type === "brush") {
    if (region.points.length) {
      ctx.beginPath();
      region.points.forEach((p, i) => {
        const { x, y } = px(p);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
  } else if (region.type === "rect") {
    const a = px(region.a);
    const b = px(region.b);
    ctx.strokeRect(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.abs(b.x - a.x), Math.abs(b.y - a.y));
  } else if (region.type === "ellipse") {
    const a = px(region.a);
    const b = px(region.b);
    ctx.beginPath();
    ctx.ellipse((a.x + b.x) / 2, (a.y + b.y) / 2, Math.abs(b.x - a.x) / 2, Math.abs(b.y - a.y) / 2, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else if (region.type === "arrow") {
    const a = px(region.a);
    const b = px(region.b);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    const angle = Math.atan2(b.y - a.y, b.x - a.x);
    const head = Math.max(region.width * 3.5, 10);
    ctx.beginPath();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(b.x - head * Math.cos(angle - Math.PI / 6), b.y - head * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(b.x - head * Math.cos(angle + Math.PI / 6), b.y - head * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }
  const anchor = px(badgeAnchorOf(region));
  const cx = Math.max(badgeR, Math.min(w - badgeR, anchor.x));
  const cy = Math.max(badgeR, Math.min(h - badgeR, anchor.y));
  ctx.beginPath();
  ctx.arc(cx, cy, badgeR, 0, Math.PI * 2);
  ctx.fillStyle = region.color;
  ctx.fill();
  ctx.lineWidth = Math.max(2, badgeR * 0.12);
  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.stroke();
  ctx.fillStyle = isLightColor(region.color) ? "#111111" : "#ffffff";
  ctx.font = `700 ${Math.round(badgeR * 1.25)}px ui-sans-serif, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(region.index), cx, cy + badgeR * 0.05);
  ctx.textAlign = "start";
}
const ImageAnnotator = reactExports.forwardRef(function ImageAnnotator2({ imageUrl, tool, color, strokeScale = 6e-3, onChange, className, regionPlaceholder, removeRegionLabel }, ref) {
  const canvasRef = reactExports.useRef(null);
  const imgRef = reactExports.useRef(null);
  const [natural, setNatural] = reactExports.useState(null);
  const regionsRef = reactExports.useRef([]);
  const redoRef = reactExports.useRef([]);
  const draftRef = reactExports.useRef(null);
  const drawingRef = reactExports.useRef(false);
  const idRef = reactExports.useRef(0);
  const [regionList, setRegionList] = reactExports.useState([]);
  const [canvasBox, setCanvasBox] = reactExports.useState({ w: 0, h: 0 });
  const [focusId, setFocusId] = reactExports.useState(null);
  const inputRefs = reactExports.useRef(/* @__PURE__ */ new Map());
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const moveDragRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!focusId) return;
    inputRefs.current.get(focusId)?.focus({ preventScroll: true });
    setFocusId(null);
  }, [focusId, regionList]);
  const sync = reactExports.useCallback(() => {
    setRegionList([...regionsRef.current]);
    onChange?.({
      canUndo: regionsRef.current.length > 0,
      canRedo: redoRef.current.length > 0,
      regions: regionsRef.current.map((r) => ({ id: r.id, index: r.index, color: r.color, label: r.label }))
    });
  }, [onChange]);
  const badgeRadius = natural ? Math.max(10, Math.round(Math.min(natural.w, natural.h) * 0.022)) : 14;
  const repaint = reactExports.useCallback(
    (forExport = false) => {
      const canvas = canvasRef.current;
      const img = imgRef.current;
      if (!canvas || !img || !natural) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      for (const r of regionsRef.current) drawRegion(ctx, r, canvas.width, canvas.height, badgeRadius);
      const d = draftRef.current;
      if (d) drawRegion(ctx, { ...d, index: regionsRef.current.length + 1 }, canvas.width, canvas.height, badgeRadius);
      if (!forExport && selectedId) {
        const sel = regionsRef.current.find((r) => r.id === selectedId);
        if (sel) {
          const b = bboxOf(sel);
          const pad = Math.max(6, badgeRadius * 0.5);
          ctx.save();
          ctx.setLineDash([7, 4]);
          ctx.lineWidth = Math.max(2, badgeRadius * 0.18);
          ctx.strokeStyle = "rgba(255,255,255,0.95)";
          ctx.strokeRect(
            b.minX * canvas.width - pad,
            b.minY * canvas.height - pad,
            (b.maxX - b.minX) * canvas.width + pad * 2,
            (b.maxY - b.minY) * canvas.height + pad * 2
          );
          ctx.restore();
        }
      }
    },
    [natural, badgeRadius, selectedId]
  );
  reactExports.useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      imgRef.current = img;
      const ratio = Math.min(1, MAX_CANVAS_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
      setNatural({ w: Math.round(img.naturalWidth * ratio), h: Math.round(img.naturalHeight * ratio) });
      regionsRef.current = [];
      redoRef.current = [];
      draftRef.current = null;
      idRef.current = 0;
      setFocusId(null);
      setSelectedId(null);
      moveDragRef.current = null;
      sync();
    };
    img.src = imageUrl;
    return () => {
      cancelled = true;
    };
  }, [imageUrl, sync]);
  reactExports.useEffect(() => {
    if (natural) repaint();
  }, [natural, repaint]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const update = () => setCanvasBox({ w: canvas.clientWidth, h: canvas.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [natural]);
  const strokeWidth = natural ? Math.max(2, Math.round(Math.min(natural.w, natural.h) * strokeScale)) : 3;
  const toNorm = reactExports.useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas || !natural) return null;
      const rect = canvas.getBoundingClientRect();
      const { ox, oy, rw, rh } = fitContain(rect.width, rect.height, natural.w / natural.h);
      return { x: clamp01((e.clientX - rect.left - ox) / rw), y: clamp01((e.clientY - rect.top - oy) / rh) };
    },
    [natural]
  );
  const handlePointerDown = reactExports.useCallback(
    (e) => {
      const p = toNorm(e);
      if (!p) return;
      if (tool === "select") {
        const hitId = hitTestRegions(regionsRef.current, p);
        setSelectedId(hitId);
        if (hitId) {
          const r = regionsRef.current.find((x) => x.id === hitId);
          if (r) {
            moveDragRef.current = { id: hitId, start: p, orig: cloneGeometry(r) };
            e.currentTarget.setPointerCapture(e.pointerId);
          }
        }
        return;
      }
      e.currentTarget.setPointerCapture(e.pointerId);
      drawingRef.current = true;
      if (tool === "brush") draftRef.current = { type: "brush", color, width: strokeWidth, points: [p] };
      else draftRef.current = { type: tool, color, width: strokeWidth, a: p, b: p };
      repaint();
    },
    [tool, color, strokeWidth, toNorm, repaint]
  );
  const handlePointerMove = reactExports.useCallback(
    (e) => {
      if (moveDragRef.current) {
        const p2 = toNorm(e);
        if (!p2) return;
        const { id, start, orig } = moveDragRef.current;
        const r = regionsRef.current.find((x) => x.id === id);
        if (r) {
          applyTranslate(r, orig, p2.x - start.x, p2.y - start.y);
          repaint();
          setRegionList([...regionsRef.current]);
        }
        return;
      }
      if (!drawingRef.current || !draftRef.current) return;
      const p = toNorm(e);
      if (!p) return;
      const d = draftRef.current;
      if (d.type === "brush") d.points.push(p);
      else d.b = p;
      repaint();
    },
    [toNorm, repaint]
  );
  const handlePointerUp = reactExports.useCallback(
    (e) => {
      if (moveDragRef.current) {
        moveDragRef.current = null;
        sync();
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
        }
        return;
      }
      if (!drawingRef.current || !draftRef.current) return;
      drawingRef.current = false;
      const d = draftRef.current;
      draftRef.current = null;
      const tiny = d.type !== "brush" && Math.abs(d.a.x - d.b.x) < 0.01 && Math.abs(d.a.y - d.b.y) < 0.01;
      const emptyBrush = d.type === "brush" && d.points.length < 2;
      if (tiny || emptyBrush) {
        repaint();
        return;
      }
      const id = `r${++idRef.current}`;
      const region = { ...d, id, index: regionsRef.current.length + 1, label: "" };
      regionsRef.current = [...regionsRef.current, region];
      redoRef.current = [];
      setFocusId(id);
      repaint();
      sync();
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
      }
    },
    [repaint, sync]
  );
  const setLabel = reactExports.useCallback(
    (id, label) => {
      const r = regionsRef.current.find((x) => x.id === id);
      if (!r) return;
      r.label = label;
      sync();
    },
    [sync]
  );
  const renumber = reactExports.useCallback(() => {
    regionsRef.current.forEach((r, i) => {
      r.index = i + 1;
    });
  }, []);
  const removeRegion = reactExports.useCallback(
    (id) => {
      if (!regionsRef.current.some((r) => r.id === id)) return;
      regionsRef.current = regionsRef.current.filter((r) => r.id !== id);
      setSelectedId((prev) => prev === id ? null : prev);
      renumber();
      repaint();
      sync();
    },
    [renumber, repaint, sync]
  );
  reactExports.useEffect(() => {
    if (!selectedId) return;
    const onKey = (e) => {
      if (e.key !== "Delete" && e.key !== "Backspace") return;
      const ae = document.activeElement;
      if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable)) return;
      e.preventDefault();
      removeRegion(selectedId);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, removeRegion]);
  reactExports.useEffect(() => {
    if (tool !== "select") setSelectedId(null);
  }, [tool]);
  reactExports.useEffect(() => {
    if (!selectedId) return;
    const onDocPointerDown = (e) => {
      const canvas = canvasRef.current;
      if (canvas && e.target instanceof Node && canvas.contains(e.target)) return;
      setSelectedId(null);
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [selectedId]);
  reactExports.useImperativeHandle(
    ref,
    () => ({
      flatten: () => {
        const canvas = canvasRef.current;
        if (!canvas || !natural) return null;
        repaint(true);
        let url = null;
        try {
          url = canvas.toDataURL("image/png");
        } catch {
          url = null;
        }
        repaint();
        return url;
      },
      undo: () => {
        const last = regionsRef.current[regionsRef.current.length - 1];
        if (!last) return;
        regionsRef.current = regionsRef.current.slice(0, -1);
        redoRef.current = [...redoRef.current, last];
        renumber();
        repaint();
        sync();
      },
      redo: () => {
        const next = redoRef.current[redoRef.current.length - 1];
        if (!next) return;
        redoRef.current = redoRef.current.slice(0, -1);
        regionsRef.current = [...regionsRef.current, next];
        renumber();
        repaint();
        sync();
      },
      clear: () => {
        if (regionsRef.current.length === 0) return;
        redoRef.current = [...regionsRef.current.slice().reverse(), ...redoRef.current];
        regionsRef.current = [];
        draftRef.current = null;
        setSelectedId(null);
        repaint();
        sync();
      }
    }),
    [natural, repaint, sync, renumber]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, style: { position: "relative", display: "inline-flex", maxWidth: "100%", maxHeight: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        width: natural?.w || 1,
        height: natural?.h || 1,
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        style: {
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          borderRadius: 8,
          touchAction: "none",
          cursor: tool === "select" ? "default" : "crosshair",
          display: natural ? "block" : "none"
        }
      }
    ),
    (() => {
      const fit = fitContain(canvasBox.w, canvasBox.h, natural ? natural.w / natural.h : 1);
      return regionList.map((r) => {
        const box = bboxOf(r);
        const below = box.maxY < 0.84;
        const left = fit.ox + box.minX * fit.rw;
        const top = fit.oy + (below ? box.maxY : box.minY) * fit.rh;
        const light = isLightColor(r.color);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "group/chip",
            style: {
              position: "absolute",
              left: Math.max(0, Math.min(left, Math.max(0, canvasBox.w - 60))),
              top,
              transform: below ? "translateY(8px)" : "translateY(calc(-100% - 8px))",
              zIndex: 20,
              maxWidth: Math.max(140, canvasBox.w * 0.6)
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 rounded-full py-1 pl-1 pr-1.5 shadow-lg backdrop-blur-md",
                style: { background: "rgba(10,10,12,0.72)", border: `1px solid ${r.color}` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "flex items-center justify-center w-5 h-5 shrink-0 rounded-full text-[11px] font-bold",
                      style: { background: r.color, color: light ? "#111" : "#fff" },
                      children: r.index
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      value: r.label,
                      ref: (el) => {
                        if (el) inputRefs.current.set(r.id, el);
                        else inputRefs.current.delete(r.id);
                      },
                      onChange: (e) => setLabel(r.id, e.target.value),
                      onPointerDown: (e) => e.stopPropagation(),
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === "Escape") e.target.blur();
                      },
                      placeholder: regionPlaceholder,
                      className: "w-44 max-w-[40vw] bg-transparent text-white placeholder:text-white/40 text-[13px] outline-none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onPointerDown: (e) => e.stopPropagation(),
                      onClick: () => removeRegion(r.id),
                      title: removeRegionLabel,
                      className: "flex items-center justify-center w-5 h-5 shrink-0 rounded-full text-white/45 hover:text-white hover:bg-white/15 opacity-0 transition-opacity group-hover/chip:opacity-100",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ]
              }
            )
          },
          r.id
        );
      });
    })()
  ] });
});
export {
  AnnotateContext as A,
  ImageAnnotator as I,
  MousePointer2 as M,
  Redo2 as R,
  Undo2 as U,
  annotationDraft as a
};
