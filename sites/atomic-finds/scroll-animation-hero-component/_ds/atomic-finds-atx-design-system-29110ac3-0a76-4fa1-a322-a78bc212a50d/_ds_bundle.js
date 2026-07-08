/* @ds-bundle: {"format":4,"namespace":"AtomicFindsDesignSystem_29110a","components":[{"name":"Badge","sourcePath":"components/Badge.jsx"},{"name":"Button","sourcePath":"components/Button.jsx"},{"name":"Card","sourcePath":"components/Card.jsx"},{"name":"GalaxyCard","sourcePath":"components/GalaxyCard.jsx"},{"name":"Icon","sourcePath":"components/Icon.jsx"}],"sourceHashes":{"animations.jsx":"a8d2a696abaa","components/Badge.jsx":"d0f3ae2676ad","components/Button.jsx":"806d1c2a88f2","components/Card.jsx":"ded877a56495","components/GalaxyCard.jsx":"b6e15c5260f2","components/Icon.jsx":"a2e761abc7ed","previews/galaxy-card-scene.jsx":"bff406a7a939"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AtomicFindsDesignSystem_29110a = window.AtomicFindsDesignSystem_29110a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// animations.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// animations.jsx — timeline engine. Exports (on window): Stage, Sprite,
//   TextSprite, ImageSprite, RectSprite, VideoSprite, PlaybackBar,
//   useTime, useTimeline, useSprite, Easing, interpolate, animate, clamp.
//
//   <Stage width={1280} height={720} duration={10} background="#f6f4ef">
//     <Sprite start={0} end={3}>
//       <TextSprite text="Hello" x={100} y={300} size={72} color="#111" />
//     </Sprite>
//     <Sprite start={2} end={8}>
//       <ImageSprite src="hero.png" x={200} y={120} width={640} height={360} kenBurns />
//     </Sprite>
//   </Stage>
//
// Stage({width,height,duration,background,fps,loop,autoplay}) — auto-scales to
//   viewport; scrubber + play/pause + ←/→ seek + space + 0-reset; persists
//   playhead. The canvas is an <svg><foreignObject>, export-ready: Share →
//   Export → Video (or the PlaybackBar's download button) renders it to .mp4.
//   Screenshot tools DOM-rerender (not pixel-capture) and unwrap this wrapper
//   so captures should work — but if one comes back black, that's a capture
//   artifact, not a render bug; trust the live preview.
// Sprite({start,end,keepMounted}) — mounts children only while playhead is in
//   [start,end]. Children read {localTime, progress, duration} via useSprite().
// useTime() → seconds; useTimeline() → {time,duration,playing,setTime,setPlaying}.
// TextSprite({text,x,y,size,color,font,weight,align,entryDur,exitDur}) — fades/scales in+out.
// ImageSprite({src,x,y,width,height,fit,radius,kenBurns,placeholder}) — same, with optional ken-burns.
// RectSprite({x,y,width,height,color,radius}) — solid box with entry/exit.
// VideoSprite({src,start,end,speed,style}) — looped <video> clip synced to the
//   timeline; its audio is mixed into the exported video.
// Easing.{linear,easeIn/Out/InOut Quad/Cubic/Quart/Quint/Expo/Back, …}
// interpolate([t0,t1,…],[v0,v1,…],ease?) → (t)=>v  — piecewise tween.
// animate({from,to,start,end,ease}) → (t)=>v  — single tween.
//
// Build scenes by composing Sprites inside Stage. Absolutely-position elements.
//
// In a .dc.html project, put your scene in a sibling my-scene.jsx (reading
// {Stage, Sprite, useTime, Easing, …} from window is safe) and mount BOTH:
//   <x-import component-from-global-scope="MyScene"
//             from="./animations.jsx ./my-scene.jsx"></x-import>
// The two files in from= load in order, so my-scene.jsx can use the globals
// animations.jsx set.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: t => t,
  // Quad
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  // Cubic
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // Quart
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // Expo
  easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },
  // Sine
  easeInSine: t => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: t => Math.sin(t * Math.PI / 2),
  easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  // Back (overshoot)
  easeOutBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: t => {
    const c1 = 1.70158,
      c2 = c1 * 1.525;
    return t < 0.5 ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  // Elastic
  easeOutElastic: t => {
    const c4 = 2 * Math.PI / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return t => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic
}) {
  return t => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({
  time: 0,
  duration: 10,
  playing: false
});
const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// ── Sprite ──────────────────────────────────────────────────────────────────
// Renders children only when the playhead is inside [start, end]. Provides
// a sub-context with `localTime` (seconds since start) and `progress` (0..1).
//
//   <Sprite start={2} end={5}>
//     {({ localTime, progress }) => <Thing x={progress * 100} />}
//   </Sprite>
//
// Or as a plain wrapper — children can call useSprite() themselves.

const SpriteContext = React.createContext({
  localTime: 0,
  progress: 0,
  duration: 0
});
const useSprite = () => React.useContext(SpriteContext);
function Sprite({
  start = 0,
  end = Infinity,
  children,
  keepMounted = false
}) {
  const {
    time
  } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;
  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  const value = {
    localTime,
    progress,
    duration,
    visible
  };
  return /*#__PURE__*/React.createElement(SpriteContext.Provider, {
    value: value
  }, typeof children === 'function' ? children(value) : children);
}

// ── Sample sprite components ────────────────────────────────────────────────

// TextSprite: fades/slides text in on entry, holds, then fades out on exit.
// Props: text, x, y, size, color, font, entryDur, exitDur, align
function TextSprite({
  text,
  x = 0,
  y = 0,
  size = 48,
  color = '#111',
  font = 'Inter, system-ui, sans-serif',
  weight = 600,
  entryDur = 0.45,
  exitDur = 0.35,
  entryEase = Easing.easeOutBack,
  exitEase = Easing.easeInCubic,
  align = 'left',
  letterSpacing = '-0.01em'
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let ty = 0;
  if (localTime < entryDur) {
    const t = entryEase(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * 16;
  } else if (localTime > exitStart) {
    const t = exitEase(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    ty = -t * 8;
  }
  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(${translateX}, ${ty}px)`,
      opacity,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      whiteSpace: 'pre',
      lineHeight: 1.1,
      willChange: 'transform, opacity'
    }
  }, text);
}

// ImageSprite: scales + fades in; optional Ken Burns drift during hold.
function ImageSprite({
  src,
  x = 0,
  y = 0,
  width = 400,
  height = 300,
  entryDur = 0.6,
  exitDur = 0.4,
  kenBurns = false,
  kenBurnsScale = 1.08,
  radius = 12,
  fit = 'cover',
  placeholder = null // {label: string} for striped placeholder
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    scale = 0.96 + 0.04 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = (kenBurns ? kenBurnsScale : 1) + 0.02 * t;
  } else if (kenBurns) {
    const holdSpan = exitStart - entryDur;
    const holdT = holdSpan > 0 ? (localTime - entryDur) / holdSpan : 0;
    scale = 1 + (kenBurnsScale - 1) * holdT;
  }
  const content = placeholder ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'repeating-linear-gradient(135deg, #e9e6df 0 10px, #dcd8cf 10px 20px)',
      color: '#6b6458',
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, placeholder.label || 'image') : /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: fit,
      display: 'block'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      borderRadius: radius,
      overflow: 'hidden',
      willChange: 'transform, opacity'
    }
  }, content);
}

// RectSprite: simple rectangle that animates position/size/color via props.
// Useful demo primitive — takes a `render` fn for per-frame customization.
function RectSprite({
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  color = '#111',
  radius = 8,
  entryDur = 0.4,
  exitDur = 0.3,
  render // optional: (ctx) => style overrides
}) {
  const spriteCtx = useSprite();
  const {
    localTime,
    duration
  } = spriteCtx;
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutBack(clamp(localTime / entryDur, 0, 1));
    opacity = clamp(localTime / entryDur, 0, 1);
    scale = 0.4 + 0.6 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInQuad(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = 1 - 0.15 * t;
  }
  const overrides = render ? render(spriteCtx) : {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      background: color,
      borderRadius: radius,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      willChange: 'transform, opacity',
      ...overrides
    }
  });
}

// ── Font inlining ───────────────────────────────────────────────────────────
// Copy every @font-face rule from the page into a <style> inside the svg's
// foreignObject, with font URLs rewritten to data: URLs. Makes the svg
// self-describing so serializing it alone (video export fast path) still
// renders with the right fonts. Sets data-om-fonts-inlined on the svg when
// done so the exporter can wait for it.

function useInlineFontsInto(svgRef) {
  React.useEffect(() => {
    const svg = svgRef.current;
    const host = svg && svg.querySelector('foreignObject > div');
    if (!svg || !host) return;
    let cancelled = false;
    (async () => {
      const rules = [];
      for (const ss of document.styleSheets) {
        let cssRules;
        try {
          cssRules = ss.cssRules;
        } catch {
          // Cross-origin sheet without crossorigin attr (e.g. the standard
          // fonts.googleapis.com <link>) — fetch the CSS text directly and
          // regex-extract the @font-face blocks.
          if (ss.href) {
            try {
              const txt = await fetch(ss.href).then(r => {
                if (!r.ok) throw 0;
                return r.text();
              });
              for (const ff of txt.match(/@font-face\s*{[^}]*}/g) || []) rules.push({
                css: ff,
                base: ss.href
              });
            } catch {}
          }
          continue;
        }
        if (!cssRules) continue;
        for (const r of cssRules) {
          if (r.type === CSSRule.FONT_FACE_RULE) {
            rules.push({
              css: r.cssText,
              base: ss.href || location.href
            });
          }
        }
      }
      const toDataURL = url => fetch(url).then(r => {
        if (!r.ok) throw 0;
        return r.blob();
      }).then(b => new Promise(res => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.onerror = () => res(url);
        fr.readAsDataURL(b);
      })).catch(() => url);
      const parts = await Promise.all(rules.map(async ({
        css,
        base
      }) => {
        const re = /url\((['"]?)([^'")]+)\1\)/g;
        let out = css,
          m;
        while (m = re.exec(css)) {
          const u = m[2];
          if (u.startsWith('data:')) continue;
          let abs;
          try {
            abs = new URL(u, base).href;
          } catch {
            continue;
          }
          out = out.split(m[0]).join(`url("${await toDataURL(abs)}")`);
        }
        return out;
      }));
      if (cancelled || !parts.length) {
        svg.setAttribute('data-om-fonts-inlined', 'true');
        return;
      }
      const style = document.createElement('style');
      style.textContent = parts.join('\n');
      host.insertBefore(style, host.firstChild);
      svg.setAttribute('data-om-fonts-inlined', 'true');
    })();
    return () => {
      cancelled = true;
    };
  }, []);
}
function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  persistKey = 'animstage',
  children
}) {
  // Props arrive as strings when Stage is mounted via <x-import> (DC
  // projects) — coerce so style={{width}} gets a number React can px-ify.
  width = +width || 1280;
  height = +height || 720;
  duration = +duration || 10;
  fps = +fps || 60;
  if (typeof loop === 'string') loop = loop !== 'false';
  if (typeof autoplay === 'string') autoplay = autoplay !== 'false';
  const [time, setTime] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0');
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch {
      return 0;
    }
  });
  const [playing, setPlaying] = React.useState(autoplay);
  const [hoverTime, setHoverTime] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Persist playhead
  React.useEffect(() => {
    try {
      localStorage.setItem(persistKey + ':t', String(time));
    } catch {}
  }, [time, persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(el.clientWidth / width, (el.clientHeight - barH) / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Animation loop
  React.useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    const step = ts => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime(t => {
        let next = t + dt;
        if (next >= duration) {
          if (loop) next = next % duration;else {
            next = duration;
            setPlaying(false);
          }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loop]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = e => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);

  // Video-export protocol: the exporter dispatches this event per frame;
  // pause + sync the playhead so the capture sees exactly that timestamp.
  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onSeek = e => {
      setPlaying(false);
      setTime(clamp(e.detail.time, 0, duration));
    };
    el.addEventListener('data-om-seek-to-time-frame', onSeek);
    return () => el.removeEventListener('data-om-seek-to-time-frame', onSeek);
  }, [duration]);

  // Inline @font-face rules into the svg's foreignObject so the svg is
  // self-describing — serializing it alone (for video export) then renders
  // with the right fonts. Sets data-om-fonts-inlined once done.
  useInlineFontsInto(canvasRef);
  const displayTime = hoverTime != null ? hoverTime : time;
  const ctxValue = React.useMemo(() => ({
    time: displayTime,
    duration,
    playing,
    setTime,
    setPlaying
  }), [displayTime, duration, playing]);
  return /*#__PURE__*/React.createElement("div", {
    ref: stageRef,
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#0a0a0a',
      fontFamily: 'Inter, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    ref: canvasRef,
    width: width,
    height: height,
    "data-om-exportable-video-with-duration-secs": duration,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      flexShrink: 0,
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("foreignObject", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("div", {
    xmlns: "http://www.w3.org/1999/xhtml",
    style: {
      width,
      height,
      background,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(TimelineContext.Provider, {
    value: ctxValue
  }, children))))), /*#__PURE__*/React.createElement(PlaybackBar, {
    time: displayTime,
    actualTime: time,
    duration: duration,
    playing: playing,
    onPlayPause: () => setPlaying(p => !p),
    onReset: () => {
      setTime(0);
    },
    onSeek: t => setTime(t),
    onHover: t => setHoverTime(t)
  }));
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({
  time,
  duration,
  playing,
  onPlayPause,
  onReset,
  onSeek,
  onHover
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const timeFromEvent = React.useCallback(e => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);
  const onTrackMove = e => {
    if (!trackRef.current) return;
    const t = timeFromEvent(e);
    if (dragging) {
      onSeek(t);
    } else {
      onHover(t);
    }
  };
  const onTrackLeave = () => {
    if (!dragging) onHover(null);
  };
  const onTrackDown = e => {
    setDragging(true);
    const t = timeFromEvent(e);
    onSeek(t);
    onHover(null);
  };
  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = e => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);
  const pct = duration > 0 ? time / duration * 100 : 0;
  const fmt = t => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor(total * 100 % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };
  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';
  return /*#__PURE__*/React.createElement("div", {
    "data-omelette-chrome": true,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 16px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',
      borderRadius: 8,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: onReset,
    title: "Return to start (0)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2v10M12 2L5 7l7 5V2z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement(IconButton, {
    onClick: onPlayPause,
    title: "Play/pause (space)"
  }, playing ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2l9 5-9 5V2z",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'right',
      color: '#f6f4ef'
    }
  }, fmt(time)), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onMouseMove: onTrackMove,
    onMouseLeave: onTrackLeave,
    onMouseDown: onTrackDown,
    style: {
      flex: 1,
      height: 22,
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 4,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `${pct}%`,
      height: 4,
      background: 'oklch(72% 0.12 250)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${pct}%`,
      top: '50%',
      width: 12,
      height: 12,
      marginLeft: -6,
      marginTop: -6,
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'left',
      color: 'rgba(246,244,239,0.55)'
    }
  }, fmt(duration)), typeof VideoEncoder !== 'undefined' && /*#__PURE__*/React.createElement(IconButton, {
    title: "Export video",
    onClick: () => window.parent.postMessage({
      type: 'omelette:request-video-export'
    }, '*')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 2v7m0 0L4 6m3 3l3-3M2 12h10",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
function IconButton({
  children,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 6,
      color: '#f6f4ef',
      cursor: 'pointer',
      padding: 0,
      transition: 'background 120ms'
    }
  }, children);
}

// ── VideoSprite ─────────────────────────────────────────────────────────────
// Renders a <video> that loops within [start,end] of its source at `speed`,
// kept in sync with the Stage's playhead. Carries the
// data-om-exportable-video-play-* attrs so video export can mix its audio.
//
//   <VideoSprite src="clip.mp4" start={2} end={5} speed={1}
//     style={{ width: 640, height: 360 }} />

function VideoSprite({
  src,
  start = 0,
  end,
  speed = 1,
  style,
  ...rest
}) {
  start = +start || 0;
  speed = +speed || 1;
  if (end != null) end = +end || undefined;
  const t = useTime();
  const ref = React.useRef(null);
  const span = Math.max(0.001, (end ?? start + 1) - start);
  React.useEffect(() => {
    const v = ref.current;
    if (!v || v.readyState < 1) return;
    const target = start + t * speed % span;
    if (Math.abs(v.currentTime - target) > 0.05) v.currentTime = target;
  }, [t, start, span, speed]);
  return /*#__PURE__*/React.createElement("video", _extends({
    ref: ref,
    src: src,
    muted: true,
    playsInline: true,
    preload: "auto",
    "data-om-exportable-video-play-start": start,
    "data-om-exportable-video-play-end": end ?? start + span,
    "data-om-exportable-video-play-speed": speed,
    style: {
      display: 'block',
      objectFit: 'cover',
      ...style
    }
  }, rest));
}
Object.assign(window, {
  Easing,
  interpolate,
  animate,
  clamp,
  TimelineContext,
  useTime,
  useTimeline,
  Sprite,
  SpriteContext,
  useSprite,
  TextSprite,
  ImageSprite,
  RectSprite,
  VideoSprite,
  Stage,
  PlaybackBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "animations.jsx", error: String((e && e.message) || e) }); }

// components/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — Status indicator pill
 * @kind component
 */
function Badge({
  children,
  variant = 'instock',
  ...props
}) {
  const variantStyles = {
    instock: {
      background: 'var(--celestial-yellow)',
      color: '#1E1E1E',
      boxShadow: 'var(--glow-sm)'
    },
    featured: {
      background: 'var(--amber-orange)',
      color: '#1E1E1E',
      boxShadow: 'var(--glow-amber)'
    },
    out: {
      background: 'transparent',
      color: 'var(--woven-moss)',
      border: '1px solid var(--woven-moss)',
      boxShadow: 'none'
    },
    eco: {
      background: 'var(--woven-moss)',
      color: 'var(--bone-white)',
      boxShadow: 'none'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({}, props, {
    style: {
      display: 'inline-block',
      padding: '6px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: '11px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...variantStyles[variant]
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Badge.jsx", error: String((e && e.message) || e) }); }

// components/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Primary interaction control
 * @kind component
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) {
  const baseStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fs-small)',
    fontWeight: 700,
    padding: size === 'sm' ? '10px 20px' : size === 'lg' ? '18px 40px' : '14px 30px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--dur-base) var(--ease-out)',
    letterSpacing: 'var(--tracking-wide)',
    borderRadius: 'var(--radius-pill)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    textDecoration: 'none',
    lineHeight: 1,
    border: 'none',
    opacity: disabled ? 0.45 : 1
  };
  const variantStyles = {
    solid: {
      background: 'var(--celestial-yellow)',
      color: '#1E1E1E',
      border: '2px solid var(--celestial-yellow)',
      boxShadow: '0 0 18px rgba(245,200,66,0.45)'
    },
    primary: {
      background: 'transparent',
      color: 'var(--celestial-yellow)',
      border: '2px solid var(--celestial-yellow)',
      boxShadow: '0 0 0 rgba(245,200,66,0)'
    },
    amber: {
      background: 'transparent',
      color: 'var(--amber-orange)',
      border: '2px solid var(--amber-orange)',
      boxShadow: '0 0 0 rgba(212,130,42,0)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({}, props, {
    disabled: disabled,
    style: {
      ...baseStyle,
      ...variantStyles[variant]
    },
    onMouseEnter: e => {
      if (!disabled) {
        if (variant === 'solid') {
          e.currentTarget.style.background = '#ffe07a';
          e.currentTarget.style.boxShadow = '0 0 28px rgba(245,200,66,0.75)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        } else if (variant === 'primary') {
          e.currentTarget.style.background = 'rgba(245,200,66,0.10)';
          e.currentTarget.style.boxShadow = 'var(--glow-md)';
        } else if (variant === 'amber') {
          e.currentTarget.style.background = 'rgba(212,130,42,0.12)';
          e.currentTarget.style.boxShadow = 'var(--glow-amber)';
        }
      }
    },
    onMouseLeave: e => {
      const style = variantStyles[variant];
      Object.assign(e.currentTarget.style, {
        ...style,
        transform: 'none'
      });
    }
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button.jsx", error: String((e && e.message) || e) }); }

// components/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — Feature or product card container
 * @kind component
 */
function Card({
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, props, {
    style: {
      background: 'var(--bg-card)',
      border: 'var(--border-1)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      transition: 'all var(--dur-base) var(--ease-out)',
      cursor: 'pointer',
      ...props.style
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.borderColor = 'rgba(245,200,66,0.5)';
      e.currentTarget.style.boxShadow = '0 0 28px rgba(245,200,66,0.28)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'rgba(245,200,66,0.15)';
      e.currentTarget.style.boxShadow = 'none';
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Card.jsx", error: String((e && e.message) || e) }); }

// components/GalaxyCard.jsx
try { (() => {
/**
 * GalaxyCard — Signature featured product card
 * @kind component
 *
 * A rounded product card wrapped by a tilted 3D Saturn-style ring that spins
 * continuously; a glowing planet orbits along the ring (in front at the bottom,
 * behind at the top). Hover lifts + scales the whole scene. Clicking opens a
 * product detail dialog. Faithful port of the Atomic Finds "Galaxy Card"
 * standard, rebuilt on our tokens (celestial-yellow / amber / display+script
 * fonts) with no external dependencies.
 */

function GalaxyCard({
  title = 'Piece',
  script = 'vintage find',
  desc = 'Curated vintage rattan, lovingly restored.',
  price = 0,
  image,
  imageBg = '#2D2D2D',
  bg,
  dimensions,
  origin,
  era
}) {
  const id = React.useRef('gc-' + Math.random().toString(36).slice(2, 8)).current;
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  const priceStr = typeof price === 'number' ? price.toLocaleString() : price;

  // Galaxy nebula wash behind the card; falls back to a cosmic radial gradient.
  const cardBg = bg ? `linear-gradient(160deg, rgba(20,17,12,0.32) 0%, rgba(12,11,8,0.74) 80%), url("${bg}") center/cover no-repeat` : 'radial-gradient(ellipse at 28% 16%, rgba(245,200,66,0.16) 0%, transparent 52%), radial-gradient(ellipse at 80% 84%, rgba(212,130,42,0.14) 0%, transparent 55%), #14120E';

  // Lucide "orbit" icon
  const OrbitIcon = ({
    size = 16,
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      opacity: 0.8
    },
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "5",
    r: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "19",
    r: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.4 21.9a10 10 0 0 0 9.941-15.416"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.5 2.1a10 10 0 0 0-9.841 15.416"
  }));
  const ProductImage = ({
    style,
    imgStyle
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '90%',
      height: '90%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 10,
      ...style
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      ...imgStyle
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.18) 0 8px, rgba(0,0,0,0.28) 8px 16px)',
      border: '1px dashed rgba(240,232,216,0.45)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: '11px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'rgba(240,232,216,0.8)'
    }
  }, "product shot")));
  const gold = 'rgba(245, 200, 66, 0.7)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @keyframes ${id}-spin { from { transform: rotateZ(0deg); } to { transform: rotateZ(360deg); } }
        @keyframes ${id}-rev  { from { transform: rotateZ(360deg); } to { transform: rotateZ(0deg); } }
        #${id}-scene { transition: transform 500ms cubic-bezier(0.16,1,0.3,1); }
        #${id}-group:hover #${id}-scene { transform: scale(1.03); }
        @media (prefers-reduced-motion: no-preference) {
          #${id}-ring   { animation: ${id}-spin 25s linear infinite; }
          #${id}-planet { animation: ${id}-rev  25s linear infinite; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    id: `${id}-group`,
    role: "button",
    tabIndex: 0,
    "aria-haspopup": "dialog",
    onClick: () => setOpen(true),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
    },
    style: {
      position: 'relative',
      cursor: 'pointer',
      width: '360px',
      height: '520px',
      flexShrink: 0,
      isolation: 'isolate',
      perspective: '1200px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: `${id}-scene`,
    style: {
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '700px',
      height: '700px',
      transform: 'translate(-50%, -50%)',
      transformStyle: 'preserve-3d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'rotateZ(-35deg) rotateX(75deg)',
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: `${id}-ring`,
    style: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: `4px solid ${gold}`,
      boxShadow: '0 0 30px rgba(245,200,66,0.6), inset 0 0 20px rgba(245,200,66,0.4)',
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '10px',
      borderRadius: '50%',
      border: '1px solid rgba(245,200,66,0.3)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translate(-50%, 50%)',
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: `${id}-planet`,
    style: {
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      boxShadow: '0 0 15px rgba(163,228,215,0.8), inset 0 0 8px rgba(0,0,0,0.5)',
      border: '1px solid rgba(207,255,245,0.5)',
      transform: 'rotateX(-75deg) rotateZ(35deg)',
      background: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #A3E4D7 20%, #2B8271 60%, #0A362E 100%)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '20%',
      left: '10%',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#F0E8D8',
      boxShadow: '0 0 15px #F0E8D8'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '20%',
      right: '10%',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: '#F5C842',
      boxShadow: '0 0 20px #F5C842'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '40%',
      right: '5%',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#F0E8D8',
      boxShadow: '0 0 10px #F0E8D8'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '24px',
      background: cardBg,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '2px solid rgba(245,200,66,0.4)',
      boxShadow: '0 0 40px rgba(0,0,0,0.8), inset 0 0 30px rgba(245,200,66,0.15)',
      transform: 'translateZ(0px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '260px',
      width: '94%',
      margin: '12px auto 0',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
      border: '2px solid rgba(245,200,66,0.4)',
      backgroundColor: imageBg
    }
  }, /*#__PURE__*/React.createElement(ProductImage, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '16px 24px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: 'var(--bone-white)',
      background: 'linear-gradient(180deg, rgba(14,12,9,0) 0%, rgba(14,12,9,0.42) 55%, rgba(14,12,9,0.72) 100%)',
      position: 'relative',
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '42px',
      letterSpacing: '0.01em',
      color: 'var(--celestial-yellow)',
      lineHeight: 1,
      margin: 0,
      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-script)',
      fontSize: '30px',
      color: 'var(--amber-orange)',
      margin: '0 0 12px 0',
      lineHeight: 1.1
    }
  }, script), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--fg-muted)',
      lineHeight: 1.55,
      margin: 0,
      opacity: 0.95,
      textShadow: '0 1px 6px rgba(0,0,0,0.9)',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      background: 'var(--celestial-yellow)',
      color: '#1E1E1E',
      padding: '2px 16px',
      borderRadius: '999px',
      fontFamily: 'var(--font-display)',
      fontSize: '20px',
      boxShadow: '0 0 15px rgba(245,200,66,0.3)'
    }
  }, "$", priceStr, /*#__PURE__*/React.createElement(OrbitIcon, {
    size: 16
  }))))))), open && /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(false),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    onClick: e => e.stopPropagation(),
    style: {
      position: 'relative',
      width: '90vw',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'auto',
      background: 'var(--bg-card-2)',
      borderRadius: '18px',
      border: '1px solid rgba(245,200,66,0.3)',
      boxShadow: '0 0 50px rgba(245,200,66,0.12)',
      display: 'flex',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": "Close",
    onClick: () => setOpen(false),
    style: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      zIndex: 10,
      width: '40px',
      height: '40px',
      borderRadius: '999px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(240,232,216,0.85)',
      background: 'rgba(0,0,0,0.25)',
      backdropFilter: 'blur(4px)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6 6 12 12"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 320px',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      backgroundColor: imageBg
    }
  }, /*#__PURE__*/React.createElement(ProductImage, {
    style: {
      width: '100%',
      height: '100%'
    },
    imgStyle: {
      filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 320px',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--bone-white)',
      background: 'linear-gradient(180deg, #242424 0%, #16140F 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '24px',
      marginTop: '8px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-script)',
      fontSize: '30px',
      color: 'var(--amber-orange)',
      margin: '0 0 8px 0',
      lineHeight: 1.1
    }
  }, script), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '48px',
      color: 'var(--celestial-yellow)',
      lineHeight: 1,
      margin: '0 0 20px 0'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      color: 'var(--fg-body)',
      lineHeight: 1.7,
      margin: 0
    }
  }, desc, (dimensions || origin || era) && /*#__PURE__*/React.createElement("br", null), (dimensions || origin || era) && /*#__PURE__*/React.createElement("br", null), dimensions && /*#__PURE__*/React.createElement(React.Fragment, null, "Dimensions: ", dimensions, /*#__PURE__*/React.createElement("br", null)), origin && /*#__PURE__*/React.createElement(React.Fragment, null, "Origin: ", origin, /*#__PURE__*/React.createElement("br", null)), era && /*#__PURE__*/React.createElement(React.Fragment, null, "Era: ", era))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '12px',
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '36px',
      color: 'var(--celestial-yellow)'
    }
  }, "$", priceStr), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--fg-muted)',
      marginBottom: '6px'
    }
  }, "Tax included.")), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      background: 'var(--celestial-yellow)',
      color: '#1E1E1E',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: '15px',
      letterSpacing: '0.04em',
      padding: '16px 24px',
      borderRadius: '999px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'background 300ms cubic-bezier(0.16,1,0.3,1)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = '#ffe58a';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'var(--celestial-yellow)';
    }
  }, /*#__PURE__*/React.createElement(OrbitIcon, {
    size: 18
  }), "Add to Cart"))))));
}
Object.assign(window, {
  GalaxyCard
});
Object.assign(__ds_scope, { GalaxyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/GalaxyCard.jsx", error: String((e && e.message) || e) }); }

// components/Icon.jsx
try { (() => {
// Icon component — custom Atomic Finds icon library (PNG only)
// Usage: <Icon name="leaf" size={48} />

function Icon({
  name = 'leaf',
  size = 48,
  className = '',
  style = {}
}) {
  // Support both .svg and .png — pass ext to override (default: svg for known vector icons, else png)
  const pngOnly = ['About', 'Cart', 'Contact', 'Filter', 'Home', 'Made in Austin', 'Search', 'Shop', 'Sustainability', 'Wishlist', 'bamboo-swing', 'bamboo-table', 'delivery', 'leaf-2', 'restoration', 'star-2', 'woven-pattern'];
  const ext = pngOnly.includes(name) ? 'png' : 'svg';
  const iconPath = `../../assets/icons/${name}.${ext}`;
  return /*#__PURE__*/React.createElement("img", {
    src: iconPath,
    alt: name,
    width: size,
    height: size,
    className: className,
    style: {
      display: 'inline-block',
      objectFit: 'contain',
      ...style
    }
  });
}
Object.assign(window, {
  Icon
});
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Icon.jsx", error: String((e && e.message) || e) }); }

// previews/galaxy-card-scene.jsx
try { (() => {
// Frame-accurate re-creation of GalaxyCard's ring/planet + dialog, driven by
// the animations.jsx timeline (t) instead of CSS @keyframes, so video export
// (which steps time frame-by-frame) renders correctly.

function GalaxyCardScene() {
  const t = useTime();
  const spinDeg = t * 14.4 % 360; // 360deg / 25s
  const revDeg = -t * 14.4 % 360; // counter-rotation

  const hoverScale = interpolate([2.4, 3.2, 10.6, 11.4], [1, 1.03, 1.03, 1], Easing.easeOutCubic)(t);
  const openProgress = interpolate([5.0, 5.4, 9.3, 9.7], [0, 1, 1, 0], [Easing.easeOutCubic, Easing.linear, Easing.easeInCubic])(t);
  const caption = interpolate([0, 0.3, 2.2, 2.6, 3.0, 4.6, 5.0, 5.4, 9.0, 9.4, 9.8, 10.2, 11.4, 11.8], [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0]);
  let captionText = '';
  if (t >= 0.3 && t < 2.6) captionText = 'Idle — ring orbits continuously';else if (t >= 3.0 && t < 4.6) captionText = 'Hover — scene lifts + scales';else if (t >= 5.4 && t < 9.4) captionText = 'Click — opens product detail';else if (t >= 9.8 && t < 11.4) captionText = 'Back to browse';
  const gold = 'rgba(245, 200, 66, 0.7)';
  const title = 'Peacock';
  const script = 'vintage find';
  const desc = '1970s rattan peacock chair, restored cane back. A dramatic seating option for sunrooms.';
  const price = '1,450';
  const image = '../assets/products/product-peacock-chair-02.png';
  const bg = '../assets/patterns/nebula-ochre.webp';
  const dimensions = 'H 58" x W 40" x D 32"';
  const origin = 'Philippines';
  const era = '1970s';
  const imageBg = '#2D2D2D';
  const cardBg = `linear-gradient(160deg, rgba(20,17,12,0.32) 0%, rgba(12,11,8,0.74) 80%), url("${bg}") center/cover no-repeat`;
  const OrbitIcon = ({
    size = 16
  }) => /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      opacity: 0.8
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "5",
    r: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "19",
    r: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.4 21.9a10 10 0 0 0 9.941-15.416"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.5 2.1a10 10 0 0 0-9.841 15.416"
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 25% 25%, rgba(245,200,66,0.10) 0%, transparent 45%),' + 'radial-gradient(ellipse at 78% 72%, rgba(212,130,42,0.10) 0%, transparent 45%),' + 'linear-gradient(160deg, #211C14 0%, #16140F 60%, #1A160F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '360px',
      height: '520px',
      transform: `scale(${hoverScale})`,
      transformOrigin: 'center',
      perspective: '1200px',
      isolation: 'isolate'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '700px',
      height: '700px',
      transform: 'translate(-50%, -50%)',
      transformStyle: 'preserve-3d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'rotateZ(-35deg) rotateX(75deg)',
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: `4px solid ${gold}`,
      boxShadow: '0 0 30px rgba(245,200,66,0.6), inset 0 0 20px rgba(245,200,66,0.4)',
      transformStyle: 'preserve-3d',
      transform: `rotateZ(${spinDeg}deg)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '10px',
      borderRadius: '50%',
      border: '1px solid rgba(245,200,66,0.3)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translate(-50%, 50%)',
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transformStyle: 'preserve-3d',
      transform: `rotateZ(${revDeg}deg)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      boxShadow: '0 0 15px rgba(163,228,215,0.8), inset 0 0 8px rgba(0,0,0,0.5)',
      border: '1px solid rgba(207,255,245,0.5)',
      transform: 'rotateX(-75deg) rotateZ(35deg)',
      background: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #A3E4D7 20%, #2B8271 60%, #0A362E 100%)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '20%',
      left: '10%',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#F0E8D8',
      boxShadow: '0 0 15px #F0E8D8'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '20%',
      right: '10%',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: '#F5C842',
      boxShadow: '0 0 20px #F5C842'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '40%',
      right: '5%',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#F0E8D8',
      boxShadow: '0 0 10px #F0E8D8'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '24px',
      background: cardBg,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '2px solid rgba(245,200,66,0.4)',
      boxShadow: '0 0 40px rgba(0,0,0,0.8), inset 0 0 30px rgba(245,200,66,0.15)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '260px',
      width: '94%',
      margin: '12px auto 0',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
      border: '2px solid rgba(245,200,66,0.4)',
      backgroundColor: imageBg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '90%',
      height: '90%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '16px 24px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: 'var(--bone-white)',
      background: 'linear-gradient(180deg, rgba(14,12,9,0) 0%, rgba(14,12,9,0.42) 55%, rgba(14,12,9,0.72) 100%)',
      position: 'relative',
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '42px',
      letterSpacing: '0.01em',
      color: 'var(--celestial-yellow)',
      lineHeight: 1,
      margin: 0,
      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-script)',
      fontSize: '30px',
      color: 'var(--amber-orange)',
      margin: '0 0 12px 0',
      lineHeight: 1.1
    }
  }, script), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--fg-muted)',
      lineHeight: 1.55,
      margin: 0,
      opacity: 0.95,
      textShadow: '0 1px 6px rgba(0,0,0,0.9)',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      background: 'var(--celestial-yellow)',
      color: '#1E1E1E',
      padding: '2px 16px',
      borderRadius: '999px',
      fontFamily: 'var(--font-display)',
      fontSize: '20px',
      boxShadow: '0 0 15px rgba(245,200,66,0.3)'
    }
  }, "$", price, /*#__PURE__*/React.createElement(OrbitIcon, {
    size: 16
  }))))))), openProgress > 0.001 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 1000,
      background: `rgba(0,0,0,${0.8 * openProgress})`,
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '900px',
      maxWidth: '90%',
      maxHeight: '90%',
      overflow: 'hidden',
      background: 'var(--bg-card-2)',
      borderRadius: '18px',
      border: '1px solid rgba(245,200,66,0.3)',
      boxShadow: '0 0 50px rgba(245,200,66,0.12)',
      display: 'flex',
      flexWrap: 'wrap',
      opacity: openProgress,
      transform: `scale(${0.94 + 0.06 * openProgress})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 320px',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      backgroundColor: imageBg
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 320px',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--bone-white)',
      background: 'linear-gradient(180deg, #242424 0%, #16140F 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '24px',
      marginTop: '8px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-script)',
      fontSize: '30px',
      color: 'var(--amber-orange)',
      margin: '0 0 8px 0',
      lineHeight: 1.1
    }
  }, script), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '48px',
      color: 'var(--celestial-yellow)',
      lineHeight: 1,
      margin: '0 0 20px 0'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      color: 'var(--fg-body)',
      lineHeight: 1.7,
      margin: 0
    }
  }, desc, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "Dimensions: ", dimensions, /*#__PURE__*/React.createElement("br", null), "Origin: ", origin, /*#__PURE__*/React.createElement("br", null), "Era: ", era)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '12px',
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '36px',
      color: 'var(--celestial-yellow)'
    }
  }, "$", price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--fg-muted)',
      marginBottom: '6px'
    }
  }, "Tax included.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      background: 'var(--celestial-yellow)',
      color: '#1E1E1E',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: '15px',
      letterSpacing: '0.04em',
      padding: '16px 24px',
      borderRadius: '999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement(OrbitIcon, {
    size: 18
  }), "Add to Cart"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '48px',
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
      fontSize: '20px',
      letterSpacing: '0.02em',
      color: 'rgba(240,232,216,0.9)',
      background: 'rgba(0,0,0,0.35)',
      padding: '10px 22px',
      borderRadius: '999px',
      opacity: caption(t),
      transition: 'none'
    }
  }, captionText)));
}
window.GalaxyCardScene = GalaxyCardScene;
})(); } catch (e) { __ds_ns.__errors.push({ path: "previews/galaxy-card-scene.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.GalaxyCard = __ds_scope.GalaxyCard;

__ds_ns.Icon = __ds_scope.Icon;

})();
