/* global React */

// ============================================================
// Shared atoms for social slides
// ============================================================

const VARS = {
  bone: "#F9F6F0",
  char: "#2D2D2D",
  blue: "#3A7BD5",
  pink: "#FADEEB",
  red: "#C5301A",
  pinned: "#FCFAED",
};

function PulseDot({ size = 28, color = VARS.blue, borderColor }) {
  const bc = borderColor || (color === VARS.blue ? "currentColor" : VARS.bone);
  return (
    <span style={{
      position: "relative", display: "inline-flex",
      alignItems: "center", justifyContent: "center",
      width: size, height: size,
    }}>
      <span style={{
        position: "absolute", width: size * 0.85, height: size * 0.85,
        background: color, borderRadius: "50%", opacity: 0.22,
        animation: "da-fab-ring 2.2s ease-out infinite",
      }} />
      <span style={{
        position: "relative", width: size * 0.55, height: size * 0.55,
        background: color, borderRadius: "50%",
        border: `1.5px solid ${bc}`,
        animation: "da-brand-pulse 3s ease-in-out infinite",
      }} />
    </span>
  );
}

// Slide chrome — top brand lockup + bottom counter + outer 1080x1080 frame.
// Theme: "dark" (charcoal) or "light" (bone). Pass `noChrome` to suppress.
function Slide({ theme = "dark", children, idx, total, hashtag, noChrome = false, padding = 56, accent = "blue" }) {
  const isDark = theme === "dark";
  const fg = isDark ? VARS.bone : VARS.char;
  const bg = isDark ? VARS.char : VARS.bone;
  const subtle = isDark ? "rgba(249,246,240,0.10)" : "rgba(45,45,45,0.10)";
  const grid = isDark ? "rgba(249,246,240,0.05)" : "rgba(45,45,45,0.06)";
  const accentColor = accent === "red" ? VARS.red : VARS.blue;

  return (
    <div style={{
      width: 1080, height: 1080,
      background: bg,
      color: fg,
      position: "relative",
      overflow: "hidden",
      backgroundImage: `
        linear-gradient(${grid} 0.5px, transparent 0.5px),
        linear-gradient(90deg, ${grid} 0.5px, transparent 0.5px)
      `,
      backgroundSize: "30px 30px",
      fontFamily: "var(--font-body)",
    }}>
      {!noChrome && (
        <div style={{
          position: "absolute", top: padding, left: padding, right: padding,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          zIndex: 5,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <PulseDot size={28} color={accentColor} borderColor={fg} />
            <span style={{
              fontFamily: "var(--font-headers)",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "0.01em",
            }}>
              Digital Allies
            </span>
          </div>
          <div style={{
            fontFamily: "var(--font-details)",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: fg,
            opacity: 0.7,
          }}>
            {hashtag}
          </div>
        </div>
      )}

      <div style={{
        position: "absolute",
        top: noChrome ? 0 : padding + 52,
        left: noChrome ? 0 : padding,
        right: noChrome ? 0 : padding,
        bottom: noChrome ? 0 : padding + 44,
      }}>
        {children}
      </div>

      {!noChrome && (
        <div style={{
          position: "absolute", bottom: padding, left: padding, right: padding,
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          fontFamily: "var(--font-details)",
          fontSize: 16,
          letterSpacing: "0.05em",
          color: fg,
        }}>
          <span style={{
            fontFamily: "var(--font-details)",
            fontWeight: 700,
            border: `1.5px solid ${accentColor}`,
            color: accentColor,
            padding: "4px 14px",
            letterSpacing: "0.15em",
            fontSize: 15,
          }}>
            {String(idx).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      )}

      <span style={{
        position: "absolute", inset: 24,
        border: `1px solid ${subtle}`,
        pointerEvents: "none",
      }} />
    </div>
  );
}

function Eyebrow({ children, color, style = {} }) {
  return (
    <div style={{
      fontFamily: "var(--font-details)",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: color || VARS.red,
      ...style,
    }}>{children}</div>
  );
}

function BigDisplay({ children, size = 110, color = "inherit", style = {} }) {
  return (
    <h1 style={{
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.02,
      letterSpacing: "-0.018em",
      margin: 0,
      textWrap: "balance",
      color,
      ...style,
    }}>{children}</h1>
  );
}

function Body({ children, size = 30, style = {} }) {
  return (
    <p style={{
      fontFamily: "var(--font-body)",
      fontSize: size,
      lineHeight: 1.45,
      margin: 0,
      textWrap: "pretty",
      ...style,
    }}>{children}</p>
  );
}

Object.assign(window, { Slide, PulseDot, Eyebrow, BigDisplay, Body, VARS });
