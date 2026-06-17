/* global React */
const { useState } = React;

// ============================================================
// Eyebrow — tracked uppercase label, signal-red by default
// ============================================================
function Eyebrow({ children, color = "signal", className = "", style = {} }) {
  const palette = { signal: "var(--signal)", blue: "var(--accent)", muted: "var(--fg-soft)" };
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-details)",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: palette[color] || color,
        display: "inline-block",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ============================================================
// PulseDot — the blue dot + ring lockup
// ============================================================
function PulseDot({ size = 20 }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
      }}
    >
      <span className="da-pulse-ring" style={{
        position: "absolute",
        width: size * 0.8,
        height: size * 0.8,
        background: "var(--accent)",
        borderRadius: "50%",
        opacity: 0.25,
        animation: "da-fab-ring 2.2s ease-out infinite",
      }} />
      <span style={{
        position: "relative",
        width: size * 0.6,
        height: size * 0.6,
        background: "var(--accent)",
        border: "1px solid var(--charcoal)",
        borderRadius: "50%",
        animation: "da-brand-pulse 3s ease-in-out infinite",
      }} />
    </span>
  );
}

// ============================================================
// Button — bracketed CTA. Variants: primary (red), secondary (bone), dark.
// ============================================================
function Button({ children, variant = "primary", onClick, href, small = false, style = {} }) {
  const base = {
    fontFamily: "var(--font-headers)",
    fontWeight: 700,
    fontSize: small ? 12 : 14,
    padding: small ? "8px 18px" : "12px 28px",
    border: "1px solid var(--charcoal)",
    cursor: "pointer",
    display: "inline-block",
    textAlign: "center",
    textDecoration: "none",
    transition: "all 0.2s var(--ease-snap)",
    letterSpacing: "0.01em",
    ...style,
  };
  const variants = {
    primary: { background: "var(--signal)", color: "#fff" },
    secondary: { background: "var(--bone-white)", color: "var(--fg)" },
    dark: { background: "var(--charcoal)", color: "var(--bone-white)" },
  };
  const [hover, setHover] = useState(false);
  const hoverStyle = hover
    ? variant === "primary"
      ? { background: "var(--charcoal)" }
      : variant === "secondary"
      ? { background: "var(--accent-soft)" }
      : { background: "var(--signal)" }
    : {};
  const Tag = href ? "a" : "button";
  return (
    <Tag
      onClick={onClick}
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle }}
    >
      {children}
    </Tag>
  );
}

// ============================================================
// PinnedNote — yellow card + red pin at top center. Pull quotes.
// ============================================================
function PinnedNote({ children, leftBorder = true, align = "left", style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        background: "var(--bg-alt)",
        border: "1px solid var(--charcoal)",
        borderLeft: leftBorder ? "4px solid var(--signal)" : "1px solid var(--charcoal)",
        padding: "40px 24px 20px",
        textAlign: align,
        boxShadow: "var(--shadow-sm)",
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 14,
          height: 14,
          background: "var(--signal)",
          border: "1px solid var(--charcoal)",
          borderRadius: "50%",
          boxShadow: "var(--shadow-pin)",
        }}
      />
      {children}
    </div>
  );
}

// ============================================================
// Container — repeating max-w wrapper
// ============================================================
function Container({ children, max = 1024, style = {} }) {
  return (
    <div style={{ maxWidth: max, margin: "0 auto", padding: "0 24px", ...style }}>{children}</div>
  );
}

// ============================================================
// SectionHeading — centered eyebrow + h2 + caption
// ============================================================
function SectionHeading({ eyebrow, title, caption, align = "center" }) {
  return (
    <div style={{ textAlign: align, marginBottom: 48 }}>
      {eyebrow && <Eyebrow style={{ marginBottom: 14 }}>{eyebrow}</Eyebrow>}
      <h2 style={{ margin: "0 0 8px", fontFamily: "var(--font-headers)", fontWeight: 700, fontSize: 36, lineHeight: 1.1 }}>{title}</h2>
      {caption && (
        <p style={{ margin: 0, fontFamily: "var(--font-details)", fontSize: 13, color: "var(--fg-muted)" }}>{caption}</p>
      )}
    </div>
  );
}

Object.assign(window, { Eyebrow, PulseDot, Button, PinnedNote, Container, SectionHeading });
