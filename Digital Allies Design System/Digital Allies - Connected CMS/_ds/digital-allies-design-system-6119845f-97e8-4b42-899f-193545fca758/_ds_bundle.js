/* @ds-bundle: {"format":3,"namespace":"DigitalAlliesDesignSystem_611984","components":[],"sourceHashes":{"export/src/AEO.jsx":"2cbf598790c0","export/src/Atoms.jsx":"39e18fb81884","export/src/Kingman.jsx":"55687765c9df","export/src/Strategy.jsx":"f988978d78dc","export/src/design-canvas.jsx":"3b0e985041dd","social/AEO.jsx":"2cbf598790c0","social/Atoms.jsx":"39e18fb81884","social/Kingman.jsx":"55687765c9df","social/Strategy.jsx":"f988978d78dc","social/design-canvas.jsx":"3b0e985041dd","ui_kits/website/Departments.jsx":"5a1fb1b1de39","ui_kits/website/Diagrams.jsx":"2ef376b61dec","ui_kits/website/FieldNotes.jsx":"b6568defa0ec","ui_kits/website/Footer.jsx":"29f8851f9d16","ui_kits/website/Hero.jsx":"c14118abc65d","ui_kits/website/JargonJar.jsx":"0bb1011651dd","ui_kits/website/Nav.jsx":"dde49a8d0d79","ui_kits/website/Pricing.jsx":"0c8fab87e151","ui_kits/website/Primitives.jsx":"9b64780c9f2a","ui_kits/website/Reliability.jsx":"cd10d47b9ca3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DigitalAlliesDesignSystem_611984 = window.DigitalAlliesDesignSystem_611984 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// export/src/AEO.jsx
try { (() => {
/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 2 — AEO vs SEO
// ============================================================

const AEO_TAG = "AEO vs SEO";
const AEO_TOTAL = 9;
function A1() {
  // Title slide — big VS
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 1,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 24
    }
  }, "For Kingman businesses \xB7 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 36
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 170,
    style: {
      lineHeight: 0.95
    }
  }, "SEO"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: "0.2em",
      color: VARS.red,
      textTransform: "uppercase"
    }
  }, "vs")), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 170,
    style: {
      lineHeight: 0.95,
      color: VARS.blue
    }
  }, "AEO")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 48,
      maxWidth: 880,
      opacity: 0.78
    }
  }, "The difference matters for your business. Here's what changes when AI answers the question instead of a search bar.")));
}
function A2() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 2,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 150,
    style: {
      color: VARS.char
    }
  }, "SEO"), /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginTop: 24
    }
  }, "Search Engine Optimization"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      padding: "40px 48px",
      background: VARS.bone,
      border: `1px solid ${VARS.char}`,
      borderLeft: `6px solid ${VARS.char}`,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 52,
    style: {
      color: VARS.char,
      lineHeight: 1.15
    }
  }, "Gets you ranked in Google search results.")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 50,
      color: "rgba(45,45,45,0.65)",
      maxWidth: 800
    }
  }, "The job is the same as it's been for 20 years: be the link someone clicks first.")));
}
function A3() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 3,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 150,
    style: {
      color: VARS.blue
    }
  }, "AEO"), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginTop: 24
    }
  }, "Answer Engine Optimization"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      padding: "40px 48px",
      background: "rgba(58,123,213,0.08)",
      border: `1.5px solid ${VARS.blue}`,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 52,
    style: {
      color: VARS.bone,
      lineHeight: 1.15
    }
  }, "Gets you featured when AI assistants answer questions.")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 50,
      opacity: 0.7,
      maxWidth: 800
    }
  }, "The new job: be the answer ChatGPT, Siri, or Gemini gives \u2014 before anyone clicks a link at all.")));
}
function A4() {
  // The Siri/AI answer example — search-result-styled card, branded
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 4,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "The new search"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 60,
    style: {
      marginTop: 18,
      color: VARS.char,
      maxWidth: 940
    }
  }, "When someone asks the question, your business should be the answer."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      alignItems: "center",
      gap: 16,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: VARS.red,
      border: `1px solid ${VARS.red}`,
      padding: "4px 10px"
    }
  }, "Asked"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontStyle: "italic",
      fontSize: 30,
      color: VARS.char,
      fontWeight: 500
    }
  }, "\"Best Mexican restaurant near me?\"")), /*#__PURE__*/React.createElement(SerpCard, null)));
}
function SerpCard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      background: VARS.bone,
      border: `1.5px solid ${VARS.char}`,
      maxWidth: 880,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 22px",
      borderBottom: `1px solid ${VARS.char}`,
      background: VARS.pinned
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: VARS.blue,
      border: `1.5px solid ${VARS.char}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: VARS.blue
    }
  }, "AI Overview \xB7 Top Answer"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-details)",
      fontSize: 13,
      opacity: 0.55,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, "via AEO")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 28px 26px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      color: "rgba(45,45,45,0.65)",
      letterSpacing: "0.02em",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: `1px solid ${VARS.char}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700,
      color: VARS.red
    }
  }, "EP"), /*#__PURE__*/React.createElement("span", null, "elpalaciokingman.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\u203A"), /*#__PURE__*/React.createElement("span", null, "menu")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 52,
      lineHeight: 1.05,
      color: VARS.blue,
      marginTop: 10,
      letterSpacing: "-0.015em"
    }
  }, "El Palacio \u2014 Authentic Mexican in Kingman"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 22,
      lineHeight: 1.45,
      color: VARS.char,
      marginTop: 14,
      maxWidth: 760
    }
  }, "Family-owned restaurant serving Sonoran-style Mexican on Stockton Hill Rd. Highly rated for street tacos, carne asada, and Saturday-night live music. Open until 9 PM tonight."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18,
      marginTop: 20,
      paddingTop: 16,
      borderTop: `1px dashed ${VARS.char}`,
      fontFamily: "var(--font-details)",
      fontSize: 16,
      color: VARS.char
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red,
      fontSize: 18
    }
  }, "\u2605"), /*#__PURE__*/React.createElement("b", null, "4.8"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.55
    }
  }, "(312 reviews)")), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: VARS.red
    }
  }, "Open"), " until 9 PM"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Mexican \xB7 $$"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Stockton Hill Rd"))));
}
function TipSlide({
  idx,
  no,
  label,
  title,
  body,
  theme = "dark"
}) {
  const isDark = theme === "dark";
  return /*#__PURE__*/React.createElement(Slide, {
    theme: theme,
    idx: idx,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: isDark ? "blue" : "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 200,
      lineHeight: 0.85,
      color: isDark ? VARS.blue : VARS.red,
      letterSpacing: "-0.025em",
      flexShrink: 0
    }
  }, no), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 30
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: isDark ? VARS.bone : VARS.char,
    style: {
      opacity: 0.7
    }
  }, "Tip ", no, " of 04"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: isDark ? VARS.blue : VARS.red,
      marginTop: 20
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 66,
    style: {
      lineHeight: 1.05
    }
  }, title)), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 36,
      maxWidth: 880,
      opacity: isDark ? 0.85 : 1,
      color: isDark ? "rgba(249,246,240,0.85)" : "rgba(45,45,45,0.75)"
    }
  }, body)));
}
function A5() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 5,
    no: "01",
    theme: "dark",
    label: "Structured Data",
    title: "Add schema markup to your site.",
    body: "Schema tells search engines and AI exactly what your business offers \u2014 your hours, your location, your menu, your prices. It's the difference between being read and being understood."
  });
}
function A6() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 6,
    no: "02",
    theme: "light",
    label: "Clear Answer Formatting",
    title: "Structure your content to answer questions directly.",
    body: "Not buried in paragraphs. Not vague. Direct answers an AI can parse and serve. If a sentence doesn't answer something a customer would ask, it doesn't belong on the page."
  });
}
function A7() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 7,
    no: "03",
    theme: "dark",
    label: "Local Business Verification",
    title: "Make your name, address, and hours match everywhere.",
    body: "Google Business Profile. Apple Maps. Yelp. The local directories you signed up for in 2019 and forgot about. Consistent info across platforms is what builds AI confidence in your data."
  });
}
function A8() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 8,
    no: "04",
    theme: "light",
    label: "Real Case Studies",
    title: "Post the real results you've delivered.",
    body: "Sharing real outcomes from real clients is the strongest signal you can send \u2014 to customers, search engines, and AI. Vague testimonials don't cut it anymore. Specifics do."
  });
}
function A9() {
  // CTA
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: AEO_TOTAL,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 32
    }
  }, "The Reciprocity Loop"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 94
  }, "Want to know if your site is ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "AEO-ready?")), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 36,
      opacity: 0.85,
      maxWidth: 840
    }
  }, "Find out where you stand with a free discovery meeting. Strategy is free. Execution is paid. Always quoted before any work starts."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 70,
      padding: "32px 40px",
      border: `1.5px solid ${VARS.red}`,
      background: "rgba(197,48,26,0.08)",
      display: "inline-flex",
      alignItems: "center",
      gap: 30,
      alignSelf: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      background: VARS.red,
      borderRadius: "50%",
      border: `1px solid ${VARS.bone}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 36
    }
  }, "[ Book a Free Discovery \u2192 ]")), /*#__PURE__*/React.createElement(Body, {
    size: 22,
    style: {
      marginTop: 40,
      opacity: 0.6,
      fontFamily: "var(--font-details)"
    }
  }, "digitalallies.net \xB7 (928) 228-5769 \xB7 contact@digitalallies.net")));
}
const AEO_SLIDES = [A1, A2, A3, A4, A5, A6, A7, A8, A9];
Object.assign(window, {
  AEO_SLIDES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/src/AEO.jsx", error: String((e && e.message) || e) }); }

// export/src/Atoms.jsx
try { (() => {
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
  pinned: "#FCFAED"
};
function PulseDot({
  size = 28,
  color = VARS.blue,
  borderColor
}) {
  const bc = borderColor || (color === VARS.blue ? "currentColor" : VARS.bone);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      width: size * 0.85,
      height: size * 0.85,
      background: color,
      borderRadius: "50%",
      opacity: 0.22,
      animation: "da-fab-ring 2.2s ease-out infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: size * 0.55,
      height: size * 0.55,
      background: color,
      borderRadius: "50%",
      border: `1.5px solid ${bc}`,
      animation: "da-brand-pulse 3s ease-in-out infinite"
    }
  }));
}

// Slide chrome — top brand lockup + bottom counter + outer 1080x1080 frame.
// Theme: "dark" (charcoal) or "light" (bone). Pass `noChrome` to suppress.
function Slide({
  theme = "dark",
  children,
  idx,
  total,
  hashtag,
  noChrome = false,
  padding = 56,
  accent = "blue"
}) {
  const isDark = theme === "dark";
  const fg = isDark ? VARS.bone : VARS.char;
  const bg = isDark ? VARS.char : VARS.bone;
  const subtle = isDark ? "rgba(249,246,240,0.10)" : "rgba(45,45,45,0.10)";
  const grid = isDark ? "rgba(249,246,240,0.05)" : "rgba(45,45,45,0.06)";
  const accentColor = accent === "red" ? VARS.red : VARS.blue;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1080,
      background: bg,
      color: fg,
      position: "relative",
      overflow: "hidden",
      backgroundImage: `
        linear-gradient(${grid} 0.5px, transparent 0.5px),
        linear-gradient(90deg, ${grid} 0.5px, transparent 0.5px)
      `,
      backgroundSize: "30px 30px",
      fontFamily: "var(--font-body)"
    }
  }, !noChrome && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: padding,
      left: padding,
      right: padding,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(PulseDot, {
    size: 28,
    color: accentColor,
    borderColor: fg
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: "0.01em"
    }
  }, "Digital Allies")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: fg,
      opacity: 0.7
    }
  }, hashtag)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: noChrome ? 0 : padding + 52,
      left: noChrome ? 0 : padding,
      right: noChrome ? 0 : padding,
      bottom: noChrome ? 0 : padding + 44
    }
  }, children), !noChrome && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: padding,
      left: padding,
      right: padding,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.05em",
      color: fg
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      border: `1.5px solid ${accentColor}`,
      color: accentColor,
      padding: "4px 14px",
      letterSpacing: "0.15em",
      fontSize: 15
    }
  }, String(idx).padStart(2, "0"), " / ", String(total).padStart(2, "0"))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 24,
      border: `1px solid ${subtle}`,
      pointerEvents: "none"
    }
  }));
}
function Eyebrow({
  children,
  color,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: color || VARS.red,
      ...style
    }
  }, children);
}
function BigDisplay({
  children,
  size = 110,
  color = "inherit",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.02,
      letterSpacing: "-0.018em",
      margin: 0,
      textWrap: "balance",
      color,
      ...style
    }
  }, children);
}
function Body({
  children,
  size = 30,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: size,
      lineHeight: 1.45,
      margin: 0,
      textWrap: "pretty",
      ...style
    }
  }, children);
}
Object.assign(window, {
  Slide,
  PulseDot,
  Eyebrow,
  BigDisplay,
  Body,
  VARS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/src/Atoms.jsx", error: String((e && e.message) || e) }); }

// export/src/Kingman.jsx
try { (() => {
/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 1 — One Year Of Real Kingman Web Traffic
// Source: GA4, May 22 2025 – May 21 2026 · single local client (anonymized)
// 17K active users · 12 months
// ============================================================

const KINGMAN_HASHTAG = "Real Kingman Data";
const SOURCE_LINE = "GA4 · 17K users · May ’25 → May ’26 · local Kingman client";
function K1() {
  // Hook
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 1,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 36
    }
  }, "One Year Of Real Data \xB7 01"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 102
  }, "I just spent 12 months watching"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 102,
    style: {
      color: VARS.blue,
      marginTop: 6
    }
  }, "one Kingman website."), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 44,
      maxWidth: 820,
      opacity: 0.82
    }
  }, "One local client. Twelve months of Google Analytics. No guesses, no industry averages \u2014 just what actually happened on the screens of real Kingman visitors. Here's what surprised me."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64,
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      opacity: 0.55
    }
  }, "Source \xB7 GA4 \xB7 17,000 active users \xB7 12 months")));
}
function K2() {
  // The big number — 87.4% mobile
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 2,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "The Headline"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 64,
    style: {
      opacity: 0.85
    }
  }, "Visits that happened on a phone:")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      fontFamily: "var(--font-headers)",
      fontSize: 360,
      lineHeight: 0.92,
      fontWeight: 700,
      letterSpacing: "-0.04em",
      color: VARS.red
    }
  }, "87.4", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 180,
      verticalAlign: "top"
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: "flex",
      gap: 0,
      border: `1px solid ${VARS.char}`,
      background: VARS.pinned
    }
  }, /*#__PURE__*/React.createElement(DeviceRow, {
    label: "Mobile",
    pct: 87.4,
    accent: VARS.red
  }), /*#__PURE__*/React.createElement(DeviceRow, {
    label: "Desktop",
    pct: 9.0,
    accent: VARS.char
  }), /*#__PURE__*/React.createElement(DeviceRow, {
    label: "Tablet",
    pct: 3.6,
    accent: VARS.char
  })), /*#__PURE__*/React.createElement(Body, {
    size: 24,
    style: {
      marginTop: 26,
      color: "rgba(45,45,45,0.75)",
      maxWidth: 880
    }
  }, "Not 60/40. Not 70/30. ", /*#__PURE__*/React.createElement("b", null, "Nine out of ten visits."), " This is what \"mobile-first\" actually looks like in our market \u2014 and it's not an opinion, it's a measurement."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(45,45,45,0.5)"
    }
  }, SOURCE_LINE)));
}
function DeviceRow({
  label,
  pct,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: pct,
      padding: "18px 22px",
      borderRight: `1px solid ${VARS.char}`,
      display: "flex",
      flexDirection: "column",
      gap: 4,
      background: accent === VARS.red ? "rgba(197,48,26,0.06)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: accent,
      opacity: 0.85
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontSize: 38,
      fontWeight: 700,
      color: VARS.char
    }
  }, pct, "%"));
}
function K3() {
  // iOS vs Android
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 3,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 20
    }
  }, "Of Those Phones"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 78
  }, "iPhone outweighed Android ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "nearly 3 to 1.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22,
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement(OSCard, {
    label: "iOS",
    count: "11,000",
    share: "71%",
    color: VARS.blue,
    dark: true
  }), /*#__PURE__*/React.createElement(OSCard, {
    label: "Android",
    count: "4,400",
    share: "29%",
    color: VARS.bone,
    dark: true,
    muted: true
  })), /*#__PURE__*/React.createElement(Body, {
    size: 24,
    style: {
      marginTop: 30,
      maxWidth: 880,
      opacity: 0.82
    }
  }, "Design for Safari first. If your site breaks on a 6.1-inch iPhone, you've lost the majority of your audience before they read a single sentence."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      padding: "14px 22px",
      border: `1px solid rgba(249,246,240,0.25)`,
      maxWidth: 760,
      display: "flex",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: VARS.blue
    }
  }, "The phone they're holding"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 18,
      opacity: 0.9
    }
  }, "390 \xD7 844 px \u2014 standard iPhone 13/14/15 screen"))));
}
function OSCard({
  label,
  count,
  share,
  color,
  dark = false,
  muted = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "22px 26px 20px",
      border: `1px solid ${dark ? "rgba(249,246,240,0.25)" : VARS.char}`,
      background: muted ? "transparent" : dark ? "rgba(58,123,213,0.10)" : VARS.pinned,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontSize: 78,
      fontWeight: 700,
      lineHeight: 1,
      color: dark ? VARS.bone : VARS.char
    }
  }, share), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      opacity: 0.7,
      color: dark ? VARS.bone : VARS.char
    }
  }, count, " active users"));
}
function K4() {
  // Channel mix — where they came from
  const channels = [{
    label: "Paid Social",
    pct: 39.4,
    count: "9.1K",
    color: VARS.red
  }, {
    label: "Organic Social",
    pct: 22.1,
    count: "5.1K",
    color: VARS.red
  }, {
    label: "Direct",
    pct: 19.0,
    count: "4.4K",
    color: VARS.char
  }, {
    label: "Organic Search",
    pct: 13.0,
    count: "3.0K",
    color: VARS.blue
  }, {
    label: "Referral",
    pct: 5.6,
    count: "1.3K",
    color: VARS.char
  }];
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 4,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "Where They Came From"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72,
    style: {
      marginTop: 18
    }
  }, "Social moved more traffic than Google. By a lot."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, channels.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 240,
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: VARS.char
    }
  }, c.label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 36,
      background: VARS.pinned,
      border: `1px solid ${VARS.char}`,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${c.pct / 40 * 100}%`,
      height: "100%",
      background: c.color,
      opacity: c.color === VARS.char ? 0.85 : 1
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 100,
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 32,
      color: VARS.char,
      textAlign: "right"
    }
  }, c.pct, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 70,
      fontFamily: "var(--font-details)",
      fontSize: 16,
      color: "rgba(45,45,45,0.6)",
      textAlign: "right"
    }
  }, c.count)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      padding: "20px 26px",
      background: VARS.char,
      color: VARS.bone,
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: VARS.red
    }
  }, "The combined truth"), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("b", null, "61% of all visits came from social."), " Organic search drove just 13%. The story we tell about \"SEO first\" might be a smaller piece of the picture than we think.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(45,45,45,0.5)"
    }
  }, SOURCE_LINE)));
}
function K5() {
  // City split — Local vs Visitor (split-screen card)
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 5,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "Same Website \xB7 Two Audiences"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 62,
    style: {
      marginTop: 18,
      lineHeight: 1.04
    }
  }, "Split the traffic by city, and the visitors split ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "into two jobs.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: "flex",
      flex: 1,
      border: `1.5px solid ${VARS.char}`
    }
  }, /*#__PURE__*/React.createElement(CityPanel, {
    light: true,
    num: "01",
    label: "The Local Planner",
    heading: "Kingman",
    tag: "Studies before they decide.",
    stats: [["24%", "return rate — the highest of any city"], ["Desktop", "the only city with serious desktop use (~741 sessions)"], ["Wed–Thu", "active mostly during business hours"], ["Homepage", "lands on the home + 'what's on' page to browse"]]
  }), /*#__PURE__*/React.createElement(CityPanel, {
    num: "02",
    label: "The Visitor",
    heading: "Phoenix \xB7 Vegas \xB7 LA",
    tag: "Decides in one scroll.",
    stats: [["~100%", "mobile — basically no desktop visits at all"], ["New users", "finding the business for the first time"], ["Thu–Fri 6–10 PM", "peak hour Fri 6 PM = 320 mobile sessions"], ["Event page", "lands straight on a specific show or product page"]]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 22,
      color: VARS.char
    }
  }, "Same site. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "Two jobs.")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(45,45,45,0.5)"
    }
  }, SOURCE_LINE))));
}
function CityPanel({
  light = false,
  num,
  label,
  heading,
  tag,
  stats
}) {
  const bg = light ? VARS.pinned : VARS.char;
  const fg = light ? VARS.char : VARS.bone;
  const accentColor = light ? VARS.blue : VARS.red;
  const subtle = light ? "rgba(45,45,45,0.65)" : "rgba(249,246,240,0.65)";
  const lineColor = light ? "rgba(45,45,45,0.2)" : "rgba(249,246,240,0.18)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: bg,
      color: fg,
      padding: "24px 28px 22px",
      display: "flex",
      flexDirection: "column",
      borderRight: light ? `1.5px solid ${VARS.char}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.22em",
      color: accentColor
    }
  }, num), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: accentColor
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: fg,
      opacity: 0.85
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 48,
      lineHeight: 1.02,
      color: fg,
      marginTop: 12,
      letterSpacing: "-0.015em"
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontStyle: "italic",
      fontWeight: 500,
      fontSize: 20,
      color: accentColor,
      marginTop: 4
    }
  }, tag), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: "flex",
      flexDirection: "column"
    }
  }, stats.map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      paddingTop: 10,
      paddingBottom: 10,
      borderTop: `1px solid ${lineColor}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 22,
      color: fg,
      letterSpacing: "-0.01em",
      lineHeight: 1.1
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: subtle,
      lineHeight: 1.35
    }
  }, v)))));
}
function K6() {
  // FB vs IG in Kingman
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 6,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 20
    }
  }, "And On Social\u2026"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72
  }, "Facebook still outweighed Instagram. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "About 3 to 1.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 0,
      marginTop: 36,
      border: `1px solid rgba(249,246,240,0.25)`
    }
  }, /*#__PURE__*/React.createElement(PlatformPanel, {
    label: "Facebook",
    sub: "(fb + facebook.com + m.facebook.com + l.facebook.com)",
    value: "~10,000",
    unit: "sessions",
    color: VARS.red,
    fill: "rgba(197,48,26,0.18)",
    flex: 10
  }), /*#__PURE__*/React.createElement(PlatformPanel, {
    label: "Instagram",
    sub: "(ig)",
    value: "3,100",
    unit: "sessions",
    color: VARS.bone,
    fill: "transparent",
    flex: 3.1
  })), /*#__PURE__*/React.createElement(Body, {
    size: 24,
    style: {
      marginTop: 32,
      maxWidth: 880,
      opacity: 0.85
    }
  }, "In Kingman, Facebook is still the front door. Instagram is the window. Both matter \u2014 but where you spend your time should match where your audience actually is."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      fontFamily: "var(--font-details)",
      fontSize: 14,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      opacity: 0.5
    }
  }, SOURCE_LINE)));
}
function PlatformPanel({
  label,
  sub,
  value,
  unit,
  color,
  fill,
  flex
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex,
      padding: "22px 24px 20px",
      borderRight: `1px solid rgba(249,246,240,0.25)`,
      background: fill,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1,
      color: VARS.bone
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      opacity: 0.65,
      color: VARS.bone
    }
  }, unit), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 6,
      fontFamily: "var(--font-details)",
      fontSize: 12,
      opacity: 0.5,
      color: VARS.bone,
      fontStyle: "italic"
    }
  }, sub));
}
function K7() {
  // Takeaway + CTA
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 7,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "The Takeaway"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72,
    style: {
      marginTop: 20,
      maxWidth: 920
    }
  }, "Build for the phone in their hand. The one that's ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "open right now.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: "var(--font-headers)",
      fontSize: 30,
      fontWeight: 600,
      color: VARS.char
    }
  }, /*#__PURE__*/React.createElement(Pillar, {
    n: "01",
    text: "Mobile-first."
  }), /*#__PURE__*/React.createElement(Pillar, {
    n: "02",
    text: "Safari-first."
  }), /*#__PURE__*/React.createElement(Pillar, {
    n: "03",
    text: "Social-driven."
  }), /*#__PURE__*/React.createElement(Pillar, {
    n: "04",
    text: "Local-fluent."
  })), /*#__PURE__*/React.createElement(Body, {
    size: 22,
    style: {
      marginTop: 28,
      color: "rgba(45,45,45,0.75)",
      maxWidth: 820
    }
  }, "That's where Kingman actually lives in 2026 \u2014 not in best-practice articles, but in a real local GA dashboard."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Body, {
    size: 20,
    style: {
      color: VARS.char,
      fontWeight: 700
    }
  }, "What surprised you most? Tell me in the comments. \u2193"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "#KingmanBusiness"), /*#__PURE__*/React.createElement(Tag, null, "#MobileWeb"), /*#__PURE__*/React.createElement(Tag, null, "#DigitalAllies")))));
}
function Pillar({
  n,
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: "0.2em",
      color: VARS.red
    }
  }, n), /*#__PURE__*/React.createElement("span", null, text));
}
function K8() {
  // Final CTA — the question card
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 8,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 28
    }
  }, "Your Turn"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 96,
    style: {
      maxWidth: 920
    }
  }, "What device are you ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "using right now?")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 36,
      opacity: 0.82,
      maxWidth: 760
    }
  }, "Tell me in the comments. I'm building for both \u2014 and the more I hear from real Kingman businesses, the sharper the next site gets."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "#KingmanBusiness"), /*#__PURE__*/React.createElement(Tag, null, "#MobileWeb"), /*#__PURE__*/React.createElement(Tag, null, "#DigitalAllies"))));
}
function Tag({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      border: `1px solid ${VARS.char}`,
      background: VARS.pinned,
      padding: "8px 18px",
      fontSize: 22,
      letterSpacing: "0.02em",
      fontFamily: "var(--font-details)",
      fontWeight: 700
    }
  }, children);
}
const KINGMAN_SLIDES = [K1, K2, K3, K4, K5, K6, K7, K8];
Object.assign(window, {
  KINGMAN_SLIDES,
  Tag
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/src/Kingman.jsx", error: String((e && e.message) || e) }); }

// export/src/Strategy.jsx
try { (() => {
/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 3 — Digital Strategy Without Jargon
// ============================================================

const STRAT_TAG = "Plain Talk";
const STRAT_TOTAL = 6;
function S1() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 1,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 36
    }
  }, "Digital strategy \xB7 no jargon"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 140
  }, "Stop guessing."), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 140,
    style: {
      color: VARS.red,
      marginTop: 8
    }
  }, "Clarity is a choice."), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 48,
      maxWidth: 800,
      opacity: 0.78
    }
  }, "Most businesses struggle online and honestly don't know why. Spoiler: it's almost always simpler than they think.")));
}
function S2() {
  // Pull quote — the anxiety of jargon proposals
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 2,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginBottom: 30
    }
  }, "The feeling"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 64,
    style: {
      color: VARS.char,
      lineHeight: 1.15
    }
  }, "You know that feeling when you look at a proposal full of words you don't actually use?"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      background: VARS.pinned,
      border: `1px solid ${VARS.char}`,
      borderLeft: `6px solid ${VARS.red}`,
      padding: "44px 48px",
      position: "relative",
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -10,
      left: "50%",
      transform: "translateX(-50%)",
      width: 20,
      height: 20,
      background: VARS.red,
      border: `1.5px solid ${VARS.char}`,
      borderRadius: "50%",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
    }
  }), /*#__PURE__*/React.createElement(Body, {
    size: 30,
    style: {
      color: VARS.char,
      fontStyle: "italic",
      lineHeight: 1.5
    }
  }, "That small knot of anxiety in your stomach. The one that says ", /*#__PURE__*/React.createElement("b", null, "\"I hope this works\""), " instead of ", /*#__PURE__*/React.createElement("b", null, "\"I know this will work.\"")))));
}
function S3() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 3,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 40
    }
  }, "Why I built this"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 108
  }, "I built ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "Digital Allies"), " to fix exactly that."), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 50,
      maxWidth: 820,
      opacity: 0.82
    }
  }, "I translate what matters in your world into digital tools that actually serve it. No jargon. No fluff. Just the stuff that moves the needle for mission-driven folks.")));
}
function S4() {
  // What you'll find here — 3 bullets
  const items = [{
    eb: "01",
    title: "Clear breakdowns of online strategy",
    body: "How websites, search, and AI actually fit together — explained without the buzzwords."
  }, {
    eb: "02",
    title: "Swipeable tips you can use instantly",
    body: "Real, applicable changes you can make this week. No theory, no fluff."
  }, {
    eb: "03",
    title: "Real examples from the trenches",
    body: "What worked for actual Kingman businesses. What didn't. Why."
  }];
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 4,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginBottom: 24
    }
  }, "On this account"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72,
    style: {
      color: VARS.char,
      marginBottom: 48
    }
  }, "What you'll find here."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 28,
      alignItems: "flex-start",
      padding: "22px 28px",
      border: `1px solid ${VARS.char}`,
      background: VARS.bone
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 54,
      lineHeight: 1,
      color: VARS.red,
      flexShrink: 0,
      minWidth: 80
    }
  }, it.eb), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 30,
      color: VARS.char,
      lineHeight: 1.2
    }
  }, it.title), /*#__PURE__*/React.createElement(Body, {
    size: 22,
    style: {
      marginTop: 8,
      color: "rgba(45,45,45,0.65)"
    }
  }, it.body)))))));
}
function S5() {
  // Follow CTA
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 5,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 36
    }
  }, "If this sounds like you"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 86
  }, "Hit follow if you're ready to ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "stop stressing"), " about your website"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 86,
    style: {
      marginTop: 12
    }
  }, "and start ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "using it.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 80,
      display: "flex",
      gap: 24,
      alignItems: "center",
      alignSelf: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 36px",
      background: VARS.red,
      color: VARS.bone,
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 32,
      border: `1.5px solid ${VARS.bone}`
    }
  }, "+ Follow @digitalallies"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 22,
      opacity: 0.6
    }
  }, "One ally. Real answers."))));
}
function S6() {
  // Engagement prompt — pinned-note style
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 6,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginBottom: 24
    }
  }, "Your turn"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 88,
    style: {
      color: VARS.char
    }
  }, "What tech word always confuses you?"), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 32,
      color: "rgba(45,45,45,0.7)",
      maxWidth: 820
    }
  }, "Drop it in the comments. We'll add it to The Jargon Jar and translate it into plain English."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 70,
      padding: "28px 32px",
      background: VARS.pinned,
      border: `1px solid ${VARS.char}`,
      maxWidth: 720,
      fontFamily: "var(--font-details)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: VARS.red,
      marginBottom: 14
    }
  }, "The Jargon Jar \u2014 Now Open \u2193"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      fontSize: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "line-through",
      opacity: 0.5
    }
  }, "\"Synergy\""), /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.char,
      fontWeight: 600
    }
  }, "\u2192 Working together."), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "line-through",
      opacity: 0.5
    }
  }, "\"Bandwidth\""), /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.char,
      fontWeight: 600
    }
  }, "\u2192 Time. Just time."), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "line-through",
      opacity: 0.5
    }
  }, "\"Leverage\""), /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.char,
      fontWeight: 600
    }
  }, "\u2192 To use.")))));
}
const STRAT_SLIDES = [S1, S2, S3, S4, S5, S6];
Object.assign(window, {
  STRAT_SLIDES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/src/Strategy.jsx", error: String((e && e.message) || e) }); }

// export/src/design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/src/design-canvas.jsx", error: String((e && e.message) || e) }); }

// social/AEO.jsx
try { (() => {
/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 2 — AEO vs SEO
// ============================================================

const AEO_TAG = "AEO vs SEO";
const AEO_TOTAL = 9;
function A1() {
  // Title slide — big VS
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 1,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 24
    }
  }, "For Kingman businesses \xB7 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 36
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 170,
    style: {
      lineHeight: 0.95
    }
  }, "SEO"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: "0.2em",
      color: VARS.red,
      textTransform: "uppercase"
    }
  }, "vs")), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 170,
    style: {
      lineHeight: 0.95,
      color: VARS.blue
    }
  }, "AEO")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 48,
      maxWidth: 880,
      opacity: 0.78
    }
  }, "The difference matters for your business. Here's what changes when AI answers the question instead of a search bar.")));
}
function A2() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 2,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 150,
    style: {
      color: VARS.char
    }
  }, "SEO"), /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginTop: 24
    }
  }, "Search Engine Optimization"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      padding: "40px 48px",
      background: VARS.bone,
      border: `1px solid ${VARS.char}`,
      borderLeft: `6px solid ${VARS.char}`,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 52,
    style: {
      color: VARS.char,
      lineHeight: 1.15
    }
  }, "Gets you ranked in Google search results.")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 50,
      color: "rgba(45,45,45,0.65)",
      maxWidth: 800
    }
  }, "The job is the same as it's been for 20 years: be the link someone clicks first.")));
}
function A3() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 3,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 150,
    style: {
      color: VARS.blue
    }
  }, "AEO"), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginTop: 24
    }
  }, "Answer Engine Optimization"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      padding: "40px 48px",
      background: "rgba(58,123,213,0.08)",
      border: `1.5px solid ${VARS.blue}`,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 52,
    style: {
      color: VARS.bone,
      lineHeight: 1.15
    }
  }, "Gets you featured when AI assistants answer questions.")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 50,
      opacity: 0.7,
      maxWidth: 800
    }
  }, "The new job: be the answer ChatGPT, Siri, or Gemini gives \u2014 before anyone clicks a link at all.")));
}
function A4() {
  // The Siri/AI answer example — search-result-styled card, branded
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 4,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "The new search"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 60,
    style: {
      marginTop: 18,
      color: VARS.char,
      maxWidth: 940
    }
  }, "When someone asks the question, your business should be the answer."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      alignItems: "center",
      gap: 16,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: VARS.red,
      border: `1px solid ${VARS.red}`,
      padding: "4px 10px"
    }
  }, "Asked"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontStyle: "italic",
      fontSize: 30,
      color: VARS.char,
      fontWeight: 500
    }
  }, "\"Best Mexican restaurant near me?\"")), /*#__PURE__*/React.createElement(SerpCard, null)));
}
function SerpCard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      background: VARS.bone,
      border: `1.5px solid ${VARS.char}`,
      maxWidth: 880,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 22px",
      borderBottom: `1px solid ${VARS.char}`,
      background: VARS.pinned
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: VARS.blue,
      border: `1.5px solid ${VARS.char}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: VARS.blue
    }
  }, "AI Overview \xB7 Top Answer"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-details)",
      fontSize: 13,
      opacity: 0.55,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, "via AEO")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 28px 26px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      color: "rgba(45,45,45,0.65)",
      letterSpacing: "0.02em",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: `1px solid ${VARS.char}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700,
      color: VARS.red
    }
  }, "EP"), /*#__PURE__*/React.createElement("span", null, "elpalaciokingman.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\u203A"), /*#__PURE__*/React.createElement("span", null, "menu")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 52,
      lineHeight: 1.05,
      color: VARS.blue,
      marginTop: 10,
      letterSpacing: "-0.015em"
    }
  }, "El Palacio \u2014 Authentic Mexican in Kingman"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 22,
      lineHeight: 1.45,
      color: VARS.char,
      marginTop: 14,
      maxWidth: 760
    }
  }, "Family-owned restaurant serving Sonoran-style Mexican on Stockton Hill Rd. Highly rated for street tacos, carne asada, and Saturday-night live music. Open until 9 PM tonight."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18,
      marginTop: 20,
      paddingTop: 16,
      borderTop: `1px dashed ${VARS.char}`,
      fontFamily: "var(--font-details)",
      fontSize: 16,
      color: VARS.char
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red,
      fontSize: 18
    }
  }, "\u2605"), /*#__PURE__*/React.createElement("b", null, "4.8"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.55
    }
  }, "(312 reviews)")), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: VARS.red
    }
  }, "Open"), " until 9 PM"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Mexican \xB7 $$"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Stockton Hill Rd"))));
}
function TipSlide({
  idx,
  no,
  label,
  title,
  body,
  theme = "dark"
}) {
  const isDark = theme === "dark";
  return /*#__PURE__*/React.createElement(Slide, {
    theme: theme,
    idx: idx,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: isDark ? "blue" : "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 200,
      lineHeight: 0.85,
      color: isDark ? VARS.blue : VARS.red,
      letterSpacing: "-0.025em",
      flexShrink: 0
    }
  }, no), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 30
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: isDark ? VARS.bone : VARS.char,
    style: {
      opacity: 0.7
    }
  }, "Tip ", no, " of 04"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: isDark ? VARS.blue : VARS.red,
      marginTop: 20
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 66,
    style: {
      lineHeight: 1.05
    }
  }, title)), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 36,
      maxWidth: 880,
      opacity: isDark ? 0.85 : 1,
      color: isDark ? "rgba(249,246,240,0.85)" : "rgba(45,45,45,0.75)"
    }
  }, body)));
}
function A5() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 5,
    no: "01",
    theme: "dark",
    label: "Structured Data",
    title: "Add schema markup to your site.",
    body: "Schema tells search engines and AI exactly what your business offers \u2014 your hours, your location, your menu, your prices. It's the difference between being read and being understood."
  });
}
function A6() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 6,
    no: "02",
    theme: "light",
    label: "Clear Answer Formatting",
    title: "Structure your content to answer questions directly.",
    body: "Not buried in paragraphs. Not vague. Direct answers an AI can parse and serve. If a sentence doesn't answer something a customer would ask, it doesn't belong on the page."
  });
}
function A7() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 7,
    no: "03",
    theme: "dark",
    label: "Local Business Verification",
    title: "Make your name, address, and hours match everywhere.",
    body: "Google Business Profile. Apple Maps. Yelp. The local directories you signed up for in 2019 and forgot about. Consistent info across platforms is what builds AI confidence in your data."
  });
}
function A8() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 8,
    no: "04",
    theme: "light",
    label: "Real Case Studies",
    title: "Post the real results you've delivered.",
    body: "Sharing real outcomes from real clients is the strongest signal you can send \u2014 to customers, search engines, and AI. Vague testimonials don't cut it anymore. Specifics do."
  });
}
function A9() {
  // CTA
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: AEO_TOTAL,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 32
    }
  }, "The Reciprocity Loop"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 94
  }, "Want to know if your site is ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "AEO-ready?")), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 36,
      opacity: 0.85,
      maxWidth: 840
    }
  }, "Find out where you stand with a free discovery meeting. Strategy is free. Execution is paid. Always quoted before any work starts."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 70,
      padding: "32px 40px",
      border: `1.5px solid ${VARS.red}`,
      background: "rgba(197,48,26,0.08)",
      display: "inline-flex",
      alignItems: "center",
      gap: 30,
      alignSelf: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      background: VARS.red,
      borderRadius: "50%",
      border: `1px solid ${VARS.bone}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 36
    }
  }, "[ Book a Free Discovery \u2192 ]")), /*#__PURE__*/React.createElement(Body, {
    size: 22,
    style: {
      marginTop: 40,
      opacity: 0.6,
      fontFamily: "var(--font-details)"
    }
  }, "digitalallies.net \xB7 (928) 228-5769 \xB7 contact@digitalallies.net")));
}
const AEO_SLIDES = [A1, A2, A3, A4, A5, A6, A7, A8, A9];
Object.assign(window, {
  AEO_SLIDES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/AEO.jsx", error: String((e && e.message) || e) }); }

// social/Atoms.jsx
try { (() => {
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
  pinned: "#FCFAED"
};
function PulseDot({
  size = 28,
  color = VARS.blue,
  borderColor
}) {
  const bc = borderColor || (color === VARS.blue ? "currentColor" : VARS.bone);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      width: size * 0.85,
      height: size * 0.85,
      background: color,
      borderRadius: "50%",
      opacity: 0.22,
      animation: "da-fab-ring 2.2s ease-out infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: size * 0.55,
      height: size * 0.55,
      background: color,
      borderRadius: "50%",
      border: `1.5px solid ${bc}`,
      animation: "da-brand-pulse 3s ease-in-out infinite"
    }
  }));
}

// Slide chrome — top brand lockup + bottom counter + outer 1080x1080 frame.
// Theme: "dark" (charcoal) or "light" (bone). Pass `noChrome` to suppress.
function Slide({
  theme = "dark",
  children,
  idx,
  total,
  hashtag,
  noChrome = false,
  padding = 56,
  accent = "blue"
}) {
  const isDark = theme === "dark";
  const fg = isDark ? VARS.bone : VARS.char;
  const bg = isDark ? VARS.char : VARS.bone;
  const subtle = isDark ? "rgba(249,246,240,0.10)" : "rgba(45,45,45,0.10)";
  const grid = isDark ? "rgba(249,246,240,0.05)" : "rgba(45,45,45,0.06)";
  const accentColor = accent === "red" ? VARS.red : VARS.blue;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1080,
      background: bg,
      color: fg,
      position: "relative",
      overflow: "hidden",
      backgroundImage: `
        linear-gradient(${grid} 0.5px, transparent 0.5px),
        linear-gradient(90deg, ${grid} 0.5px, transparent 0.5px)
      `,
      backgroundSize: "30px 30px",
      fontFamily: "var(--font-body)"
    }
  }, !noChrome && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: padding,
      left: padding,
      right: padding,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(PulseDot, {
    size: 28,
    color: accentColor,
    borderColor: fg
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: "0.01em"
    }
  }, "Digital Allies")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: fg,
      opacity: 0.7
    }
  }, hashtag)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: noChrome ? 0 : padding + 52,
      left: noChrome ? 0 : padding,
      right: noChrome ? 0 : padding,
      bottom: noChrome ? 0 : padding + 44
    }
  }, children), !noChrome && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: padding,
      left: padding,
      right: padding,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.05em",
      color: fg
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      border: `1.5px solid ${accentColor}`,
      color: accentColor,
      padding: "4px 14px",
      letterSpacing: "0.15em",
      fontSize: 15
    }
  }, String(idx).padStart(2, "0"), " / ", String(total).padStart(2, "0"))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 24,
      border: `1px solid ${subtle}`,
      pointerEvents: "none"
    }
  }));
}
function Eyebrow({
  children,
  color,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: color || VARS.red,
      ...style
    }
  }, children);
}
function BigDisplay({
  children,
  size = 110,
  color = "inherit",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.02,
      letterSpacing: "-0.018em",
      margin: 0,
      textWrap: "balance",
      color,
      ...style
    }
  }, children);
}
function Body({
  children,
  size = 30,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: size,
      lineHeight: 1.45,
      margin: 0,
      textWrap: "pretty",
      ...style
    }
  }, children);
}
Object.assign(window, {
  Slide,
  PulseDot,
  Eyebrow,
  BigDisplay,
  Body,
  VARS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/Atoms.jsx", error: String((e && e.message) || e) }); }

// social/Kingman.jsx
try { (() => {
/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 1 — One Year Of Real Kingman Web Traffic
// Source: GA4, May 22 2025 – May 21 2026 · single local client (anonymized)
// 17K active users · 12 months
// ============================================================

const KINGMAN_HASHTAG = "Real Kingman Data";
const SOURCE_LINE = "GA4 · 17K users · May ’25 → May ’26 · local Kingman client";
function K1() {
  // Hook
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 1,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 36
    }
  }, "One Year Of Real Data \xB7 01"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 102
  }, "I just spent 12 months watching"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 102,
    style: {
      color: VARS.blue,
      marginTop: 6
    }
  }, "one Kingman website."), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 44,
      maxWidth: 820,
      opacity: 0.82
    }
  }, "One local client. Twelve months of Google Analytics. No guesses, no industry averages \u2014 just what actually happened on the screens of real Kingman visitors. Here's what surprised me."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64,
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      opacity: 0.55
    }
  }, "Source \xB7 GA4 \xB7 17,000 active users \xB7 12 months")));
}
function K2() {
  // The big number — 87.4% mobile
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 2,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "The Headline"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 64,
    style: {
      opacity: 0.85
    }
  }, "Visits that happened on a phone:")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      fontFamily: "var(--font-headers)",
      fontSize: 360,
      lineHeight: 0.92,
      fontWeight: 700,
      letterSpacing: "-0.04em",
      color: VARS.red
    }
  }, "87.4", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 180,
      verticalAlign: "top"
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: "flex",
      gap: 0,
      border: `1px solid ${VARS.char}`,
      background: VARS.pinned
    }
  }, /*#__PURE__*/React.createElement(DeviceRow, {
    label: "Mobile",
    pct: 87.4,
    accent: VARS.red
  }), /*#__PURE__*/React.createElement(DeviceRow, {
    label: "Desktop",
    pct: 9.0,
    accent: VARS.char
  }), /*#__PURE__*/React.createElement(DeviceRow, {
    label: "Tablet",
    pct: 3.6,
    accent: VARS.char
  })), /*#__PURE__*/React.createElement(Body, {
    size: 24,
    style: {
      marginTop: 26,
      color: "rgba(45,45,45,0.75)",
      maxWidth: 880
    }
  }, "Not 60/40. Not 70/30. ", /*#__PURE__*/React.createElement("b", null, "Nine out of ten visits."), " This is what \"mobile-first\" actually looks like in our market \u2014 and it's not an opinion, it's a measurement."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(45,45,45,0.5)"
    }
  }, SOURCE_LINE)));
}
function DeviceRow({
  label,
  pct,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: pct,
      padding: "18px 22px",
      borderRight: `1px solid ${VARS.char}`,
      display: "flex",
      flexDirection: "column",
      gap: 4,
      background: accent === VARS.red ? "rgba(197,48,26,0.06)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: accent,
      opacity: 0.85
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontSize: 38,
      fontWeight: 700,
      color: VARS.char
    }
  }, pct, "%"));
}
function K3() {
  // iOS vs Android
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 3,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 20
    }
  }, "Of Those Phones"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 78
  }, "iPhone outweighed Android ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "nearly 3 to 1.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22,
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement(OSCard, {
    label: "iOS",
    count: "11,000",
    share: "71%",
    color: VARS.blue,
    dark: true
  }), /*#__PURE__*/React.createElement(OSCard, {
    label: "Android",
    count: "4,400",
    share: "29%",
    color: VARS.bone,
    dark: true,
    muted: true
  })), /*#__PURE__*/React.createElement(Body, {
    size: 24,
    style: {
      marginTop: 30,
      maxWidth: 880,
      opacity: 0.82
    }
  }, "Design for Safari first. If your site breaks on a 6.1-inch iPhone, you've lost the majority of your audience before they read a single sentence."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      padding: "14px 22px",
      border: `1px solid rgba(249,246,240,0.25)`,
      maxWidth: 760,
      display: "flex",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: VARS.blue
    }
  }, "The phone they're holding"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 18,
      opacity: 0.9
    }
  }, "390 \xD7 844 px \u2014 standard iPhone 13/14/15 screen"))));
}
function OSCard({
  label,
  count,
  share,
  color,
  dark = false,
  muted = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "22px 26px 20px",
      border: `1px solid ${dark ? "rgba(249,246,240,0.25)" : VARS.char}`,
      background: muted ? "transparent" : dark ? "rgba(58,123,213,0.10)" : VARS.pinned,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontSize: 78,
      fontWeight: 700,
      lineHeight: 1,
      color: dark ? VARS.bone : VARS.char
    }
  }, share), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      opacity: 0.7,
      color: dark ? VARS.bone : VARS.char
    }
  }, count, " active users"));
}
function K4() {
  // Channel mix — where they came from
  const channels = [{
    label: "Paid Social",
    pct: 39.4,
    count: "9.1K",
    color: VARS.red
  }, {
    label: "Organic Social",
    pct: 22.1,
    count: "5.1K",
    color: VARS.red
  }, {
    label: "Direct",
    pct: 19.0,
    count: "4.4K",
    color: VARS.char
  }, {
    label: "Organic Search",
    pct: 13.0,
    count: "3.0K",
    color: VARS.blue
  }, {
    label: "Referral",
    pct: 5.6,
    count: "1.3K",
    color: VARS.char
  }];
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 4,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "Where They Came From"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72,
    style: {
      marginTop: 18
    }
  }, "Social moved more traffic than Google. By a lot."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, channels.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 240,
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: VARS.char
    }
  }, c.label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 36,
      background: VARS.pinned,
      border: `1px solid ${VARS.char}`,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${c.pct / 40 * 100}%`,
      height: "100%",
      background: c.color,
      opacity: c.color === VARS.char ? 0.85 : 1
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 100,
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 32,
      color: VARS.char,
      textAlign: "right"
    }
  }, c.pct, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 70,
      fontFamily: "var(--font-details)",
      fontSize: 16,
      color: "rgba(45,45,45,0.6)",
      textAlign: "right"
    }
  }, c.count)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      padding: "20px 26px",
      background: VARS.char,
      color: VARS.bone,
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: VARS.red
    }
  }, "The combined truth"), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("b", null, "61% of all visits came from social."), " Organic search drove just 13%. The story we tell about \"SEO first\" might be a smaller piece of the picture than we think.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(45,45,45,0.5)"
    }
  }, SOURCE_LINE)));
}
function K5() {
  // City split — Local vs Visitor (split-screen card)
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 5,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "Same Website \xB7 Two Audiences"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 62,
    style: {
      marginTop: 18,
      lineHeight: 1.04
    }
  }, "Split the traffic by city, and the visitors split ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "into two jobs.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: "flex",
      flex: 1,
      border: `1.5px solid ${VARS.char}`
    }
  }, /*#__PURE__*/React.createElement(CityPanel, {
    light: true,
    num: "01",
    label: "The Local Planner",
    heading: "Kingman",
    tag: "Studies before they decide.",
    stats: [["24%", "return rate — the highest of any city"], ["Desktop", "the only city with serious desktop use (~741 sessions)"], ["Wed–Thu", "active mostly during business hours"], ["Homepage", "lands on the home + 'what's on' page to browse"]]
  }), /*#__PURE__*/React.createElement(CityPanel, {
    num: "02",
    label: "The Visitor",
    heading: "Phoenix \xB7 Vegas \xB7 LA",
    tag: "Decides in one scroll.",
    stats: [["~100%", "mobile — basically no desktop visits at all"], ["New users", "finding the business for the first time"], ["Thu–Fri 6–10 PM", "peak hour Fri 6 PM = 320 mobile sessions"], ["Event page", "lands straight on a specific show or product page"]]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 22,
      color: VARS.char
    }
  }, "Same site. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "Two jobs.")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(45,45,45,0.5)"
    }
  }, SOURCE_LINE))));
}
function CityPanel({
  light = false,
  num,
  label,
  heading,
  tag,
  stats
}) {
  const bg = light ? VARS.pinned : VARS.char;
  const fg = light ? VARS.char : VARS.bone;
  const accentColor = light ? VARS.blue : VARS.red;
  const subtle = light ? "rgba(45,45,45,0.65)" : "rgba(249,246,240,0.65)";
  const lineColor = light ? "rgba(45,45,45,0.2)" : "rgba(249,246,240,0.18)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: bg,
      color: fg,
      padding: "24px 28px 22px",
      display: "flex",
      flexDirection: "column",
      borderRight: light ? `1.5px solid ${VARS.char}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.22em",
      color: accentColor
    }
  }, num), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: accentColor
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: fg,
      opacity: 0.85
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 48,
      lineHeight: 1.02,
      color: fg,
      marginTop: 12,
      letterSpacing: "-0.015em"
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontStyle: "italic",
      fontWeight: 500,
      fontSize: 20,
      color: accentColor,
      marginTop: 4
    }
  }, tag), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: "flex",
      flexDirection: "column"
    }
  }, stats.map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      paddingTop: 10,
      paddingBottom: 10,
      borderTop: `1px solid ${lineColor}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 22,
      color: fg,
      letterSpacing: "-0.01em",
      lineHeight: 1.1
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: subtle,
      lineHeight: 1.35
    }
  }, v)))));
}
function K6() {
  // FB vs IG in Kingman
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 6,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 20
    }
  }, "And On Social\u2026"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72
  }, "Facebook still outweighed Instagram. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "About 3 to 1.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 0,
      marginTop: 36,
      border: `1px solid rgba(249,246,240,0.25)`
    }
  }, /*#__PURE__*/React.createElement(PlatformPanel, {
    label: "Facebook",
    sub: "(fb + facebook.com + m.facebook.com + l.facebook.com)",
    value: "~10,000",
    unit: "sessions",
    color: VARS.red,
    fill: "rgba(197,48,26,0.18)",
    flex: 10
  }), /*#__PURE__*/React.createElement(PlatformPanel, {
    label: "Instagram",
    sub: "(ig)",
    value: "3,100",
    unit: "sessions",
    color: VARS.bone,
    fill: "transparent",
    flex: 3.1
  })), /*#__PURE__*/React.createElement(Body, {
    size: 24,
    style: {
      marginTop: 32,
      maxWidth: 880,
      opacity: 0.85
    }
  }, "In Kingman, Facebook is still the front door. Instagram is the window. Both matter \u2014 but where you spend your time should match where your audience actually is."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      fontFamily: "var(--font-details)",
      fontSize: 14,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      opacity: 0.5
    }
  }, SOURCE_LINE)));
}
function PlatformPanel({
  label,
  sub,
  value,
  unit,
  color,
  fill,
  flex
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex,
      padding: "22px 24px 20px",
      borderRight: `1px solid rgba(249,246,240,0.25)`,
      background: fill,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1,
      color: VARS.bone
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      opacity: 0.65,
      color: VARS.bone
    }
  }, unit), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 6,
      fontFamily: "var(--font-details)",
      fontSize: 12,
      opacity: 0.5,
      color: VARS.bone,
      fontStyle: "italic"
    }
  }, sub));
}
function K7() {
  // Takeaway + CTA
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 7,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "The Takeaway"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72,
    style: {
      marginTop: 20,
      maxWidth: 920
    }
  }, "Build for the phone in their hand. The one that's ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "open right now.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: "var(--font-headers)",
      fontSize: 30,
      fontWeight: 600,
      color: VARS.char
    }
  }, /*#__PURE__*/React.createElement(Pillar, {
    n: "01",
    text: "Mobile-first."
  }), /*#__PURE__*/React.createElement(Pillar, {
    n: "02",
    text: "Safari-first."
  }), /*#__PURE__*/React.createElement(Pillar, {
    n: "03",
    text: "Social-driven."
  }), /*#__PURE__*/React.createElement(Pillar, {
    n: "04",
    text: "Local-fluent."
  })), /*#__PURE__*/React.createElement(Body, {
    size: 22,
    style: {
      marginTop: 28,
      color: "rgba(45,45,45,0.75)",
      maxWidth: 820
    }
  }, "That's where Kingman actually lives in 2026 \u2014 not in best-practice articles, but in a real local GA dashboard."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Body, {
    size: 20,
    style: {
      color: VARS.char,
      fontWeight: 700
    }
  }, "What surprised you most? Tell me in the comments. \u2193"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "#KingmanBusiness"), /*#__PURE__*/React.createElement(Tag, null, "#MobileWeb"), /*#__PURE__*/React.createElement(Tag, null, "#DigitalAllies")))));
}
function Pillar({
  n,
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: "0.2em",
      color: VARS.red
    }
  }, n), /*#__PURE__*/React.createElement("span", null, text));
}
function K8() {
  // Final CTA — the question card
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 8,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 28
    }
  }, "Your Turn"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 96,
    style: {
      maxWidth: 920
    }
  }, "What device are you ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "using right now?")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 36,
      opacity: 0.82,
      maxWidth: 760
    }
  }, "Tell me in the comments. I'm building for both \u2014 and the more I hear from real Kingman businesses, the sharper the next site gets."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "#KingmanBusiness"), /*#__PURE__*/React.createElement(Tag, null, "#MobileWeb"), /*#__PURE__*/React.createElement(Tag, null, "#DigitalAllies"))));
}
function Tag({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      border: `1px solid ${VARS.char}`,
      background: VARS.pinned,
      padding: "8px 18px",
      fontSize: 22,
      letterSpacing: "0.02em",
      fontFamily: "var(--font-details)",
      fontWeight: 700
    }
  }, children);
}
const KINGMAN_SLIDES = [K1, K2, K3, K4, K5, K6, K7, K8];
Object.assign(window, {
  KINGMAN_SLIDES,
  Tag
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/Kingman.jsx", error: String((e && e.message) || e) }); }

// social/Strategy.jsx
try { (() => {
/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 3 — Digital Strategy Without Jargon
// ============================================================

const STRAT_TAG = "Plain Talk";
const STRAT_TOTAL = 6;
function S1() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 1,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 36
    }
  }, "Digital strategy \xB7 no jargon"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 140
  }, "Stop guessing."), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 140,
    style: {
      color: VARS.red,
      marginTop: 8
    }
  }, "Clarity is a choice."), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 48,
      maxWidth: 800,
      opacity: 0.78
    }
  }, "Most businesses struggle online and honestly don't know why. Spoiler: it's almost always simpler than they think.")));
}
function S2() {
  // Pull quote — the anxiety of jargon proposals
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 2,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginBottom: 30
    }
  }, "The feeling"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 64,
    style: {
      color: VARS.char,
      lineHeight: 1.15
    }
  }, "You know that feeling when you look at a proposal full of words you don't actually use?"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      background: VARS.pinned,
      border: `1px solid ${VARS.char}`,
      borderLeft: `6px solid ${VARS.red}`,
      padding: "44px 48px",
      position: "relative",
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -10,
      left: "50%",
      transform: "translateX(-50%)",
      width: 20,
      height: 20,
      background: VARS.red,
      border: `1.5px solid ${VARS.char}`,
      borderRadius: "50%",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
    }
  }), /*#__PURE__*/React.createElement(Body, {
    size: 30,
    style: {
      color: VARS.char,
      fontStyle: "italic",
      lineHeight: 1.5
    }
  }, "That small knot of anxiety in your stomach. The one that says ", /*#__PURE__*/React.createElement("b", null, "\"I hope this works\""), " instead of ", /*#__PURE__*/React.createElement("b", null, "\"I know this will work.\"")))));
}
function S3() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 3,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 40
    }
  }, "Why I built this"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 108
  }, "I built ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "Digital Allies"), " to fix exactly that."), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 50,
      maxWidth: 820,
      opacity: 0.82
    }
  }, "I translate what matters in your world into digital tools that actually serve it. No jargon. No fluff. Just the stuff that moves the needle for mission-driven folks.")));
}
function S4() {
  // What you'll find here — 3 bullets
  const items = [{
    eb: "01",
    title: "Clear breakdowns of online strategy",
    body: "How websites, search, and AI actually fit together — explained without the buzzwords."
  }, {
    eb: "02",
    title: "Swipeable tips you can use instantly",
    body: "Real, applicable changes you can make this week. No theory, no fluff."
  }, {
    eb: "03",
    title: "Real examples from the trenches",
    body: "What worked for actual Kingman businesses. What didn't. Why."
  }];
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 4,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginBottom: 24
    }
  }, "On this account"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72,
    style: {
      color: VARS.char,
      marginBottom: 48
    }
  }, "What you'll find here."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 28,
      alignItems: "flex-start",
      padding: "22px 28px",
      border: `1px solid ${VARS.char}`,
      background: VARS.bone
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 54,
      lineHeight: 1,
      color: VARS.red,
      flexShrink: 0,
      minWidth: 80
    }
  }, it.eb), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 30,
      color: VARS.char,
      lineHeight: 1.2
    }
  }, it.title), /*#__PURE__*/React.createElement(Body, {
    size: 22,
    style: {
      marginTop: 8,
      color: "rgba(45,45,45,0.65)"
    }
  }, it.body)))))));
}
function S5() {
  // Follow CTA
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 5,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 36
    }
  }, "If this sounds like you"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 86
  }, "Hit follow if you're ready to ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "stop stressing"), " about your website"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 86,
    style: {
      marginTop: 12
    }
  }, "and start ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "using it.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 80,
      display: "flex",
      gap: 24,
      alignItems: "center",
      alignSelf: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 36px",
      background: VARS.red,
      color: VARS.bone,
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 32,
      border: `1.5px solid ${VARS.bone}`
    }
  }, "+ Follow @digitalallies"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 22,
      opacity: 0.6
    }
  }, "One ally. Real answers."))));
}
function S6() {
  // Engagement prompt — pinned-note style
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 6,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginBottom: 24
    }
  }, "Your turn"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 88,
    style: {
      color: VARS.char
    }
  }, "What tech word always confuses you?"), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 32,
      color: "rgba(45,45,45,0.7)",
      maxWidth: 820
    }
  }, "Drop it in the comments. We'll add it to The Jargon Jar and translate it into plain English."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 70,
      padding: "28px 32px",
      background: VARS.pinned,
      border: `1px solid ${VARS.char}`,
      maxWidth: 720,
      fontFamily: "var(--font-details)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: VARS.red,
      marginBottom: 14
    }
  }, "The Jargon Jar \u2014 Now Open \u2193"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      fontSize: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "line-through",
      opacity: 0.5
    }
  }, "\"Synergy\""), /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.char,
      fontWeight: 600
    }
  }, "\u2192 Working together."), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "line-through",
      opacity: 0.5
    }
  }, "\"Bandwidth\""), /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.char,
      fontWeight: 600
    }
  }, "\u2192 Time. Just time."), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "line-through",
      opacity: 0.5
    }
  }, "\"Leverage\""), /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.char,
      fontWeight: 600
    }
  }, "\u2192 To use.")))));
}
const STRAT_SLIDES = [S1, S2, S3, S4, S5, S6];
Object.assign(window, {
  STRAT_SLIDES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/Strategy.jsx", error: String((e && e.message) || e) }); }

// social/design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Departments.jsx
try { (() => {
/* global React, Container, SectionHeading */
const {
  useState: useDeptState
} = React;
const DEPTS = [{
  icon: "../../assets/design-icon.png",
  name: "The Design Bureau",
  nameEs: "El Buró de Diseño",
  cat: "Design & Brand",
  catEs: "Diseño y Marca",
  body: "I design before I develop. Websites, graphic design, menus, signage, pitch decks — polished visuals that look like you meant it. Brand discovery included.",
  bodyEs: "Diseño antes de desarrollar. Sitios web, diseño gráfico, menús, señalización, presentaciones — visuales pulidos que parecen intencionales.",
  hover: "signal"
}, {
  icon: "../../assets/integrations-icon.png",
  name: "Dept. of Cooperation",
  nameEs: "Depto. de Cooperación",
  cat: "Integrations",
  catEs: "Integraciones",
  body: "Your apps talk to each other without arguing. Clean handoffs so you stop copying and pasting between platforms.",
  bodyEs: "Tus aplicaciones se comunican sin discutir. Entregas limpias para que dejes de copiar y pegar.",
  hover: "blue"
}, {
  icon: "../../assets/automation-icon.png",
  name: "The Self-Governing Bureau",
  nameEs: "El Buró de Autogobierno",
  cat: "Automation",
  catEs: "Automatización",
  body: "The boring, repetitive stuff runs automatically. You've got better things to do.",
  bodyEs: "Las cosas aburridas y repetitivas se ejecutan automáticamente. Tienes cosas mejores que hacer.",
  hover: "signal"
}, {
  icon: "../../assets/support-icon.png",
  name: "The Permanent Observation Post",
  nameEs: "El Puesto de Observación Permanente",
  cat: "Support",
  catEs: "Soporte",
  body: "Monitoring runs 24/7. If something breaks at 2am, that's my problem — not yours.",
  bodyEs: "El monitoreo funciona 24/7. Si algo se rompe a las 2 a.m., ese es mi problema, no el tuyo.",
  hover: "blue"
}];
function DeptCard({
  dept,
  lang,
  isLast
}) {
  const [hover, setHover] = useDeptState(false);
  const accent = dept.hover === "signal" ? "var(--signal)" : "var(--accent)";
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? "rgba(250,222,235,0.2)" : "var(--bg)",
      padding: "40px 22px",
      textAlign: "center",
      borderTop: `4px solid ${hover ? accent : "transparent"}`,
      borderRight: isLast ? "none" : "1px solid var(--charcoal)",
      transition: "all 0.4s var(--ease-out)",
      transform: hover ? "translateY(-4px)" : "none",
      boxShadow: hover ? "var(--shadow-lg)" : "none",
      position: "relative",
      zIndex: hover ? 2 : 1
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: dept.icon,
    alt: "",
    style: {
      width: 92,
      height: 92,
      objectFit: "contain",
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 17,
      margin: "0 0 4px",
      letterSpacing: "-0.005em"
    }
  }, lang === "es" ? dept.nameEs : dept.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-details)",
      fontSize: 10,
      color: "var(--signal)",
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      marginBottom: 18
    }
  }, lang === "es" ? dept.catEs : dept.cat), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.6,
      color: "var(--fg)"
    }
  }, lang === "es" ? dept.bodyEs : dept.body));
}
function Departments({
  lang
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "departments",
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1280
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: lang === "es" ? "Los Departamentos" : "The Departments",
    caption: lang === "es" ? "Cuatro operaciones distintas. Un punto de contacto." : "Four distinct operations. One point of contact."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      border: "1px solid var(--charcoal)",
      background: "var(--bg)"
    }
  }, DEPTS.map((d, i) => /*#__PURE__*/React.createElement(DeptCard, {
    key: i,
    dept: d,
    lang: lang,
    isLast: i === DEPTS.length - 1
  })))));
}
Object.assign(window, {
  Departments
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Departments.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Diagrams.jsx
try { (() => {
/* global React, Container, SectionHeading */
const {
  useState: useDiagState
} = React;
const DIAGRAMS = [{
  title: "AEO & SEO Architecture",
  body: "Getting found by search engines is a structural problem. I review your site's foundation and fix the parts that keep you invisible.",
  img: "../../assets/aeo-seo-overview.png"
}, {
  title: "The Four-Step Process",
  body: "Discover → Design → Build → Maintain. Each step has a clear entry point and a clear exit. No ambiguity. No surprise invoices.",
  img: "../../assets/process.png"
}, {
  title: "Language & Accessibility Architecture",
  body: "Bilingual and accessible by design, not as an afterthought. Every element keyboard-navigable. Every toggle screen-reader friendly.",
  img: "../../assets/language-overview.png"
}];
function Diagram({
  d,
  open,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--charcoal)",
      background: "var(--bg)",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    style: {
      width: "100%",
      padding: "20px 28px",
      background: open ? "var(--accent-soft)" : "var(--bg)",
      border: "none",
      borderBottom: open ? "1px solid var(--hairline)" : "none",
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 18,
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "left",
      color: "var(--fg)",
      transition: "background 0.2s"
    }
  }, /*#__PURE__*/React.createElement("span", null, d.title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)",
      fontSize: 22,
      fontFamily: "var(--font-details)",
      transform: open ? "rotate(45deg)" : "none",
      transition: "transform 0.3s var(--ease-out)",
      display: "inline-block"
    }
  }, "+")), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 32px 32px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 18px",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.7,
      color: "var(--fg-muted)",
      maxWidth: 640
    }
  }, d.body), d.img && /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--hairline)",
      background: "var(--bg-alt)",
      padding: 12,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: d.img,
    alt: "",
    style: {
      width: "100%",
      display: "block"
    }
  }))));
}
function Diagrams() {
  const [open, setOpen] = useDiagState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "diagrams",
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1280
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "The Diagrams",
    caption: "Architecture explained without the alphabet soup."
  }), DIAGRAMS.map((d, i) => /*#__PURE__*/React.createElement(Diagram, {
    key: i,
    d: d,
    open: open === i,
    onToggle: () => setOpen(open === i ? -1 : i)
  }))));
}
Object.assign(window, {
  Diagrams
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Diagrams.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FieldNotes.jsx
try { (() => {
/* global React, Container, SectionHeading, PinnedNote */

const NOTES = [{
  quote: "Anthony has a rare natural ability to step into the world of his client and tune into what is important to them. His guidance is a safe pathway through.",
  who: "Sasha Esposito",
  where: "Marriage and Family Therapy, Inc."
}, {
  quote: "Digital Allies has truly been a beacon of expertise and reliability. I wholeheartedly recommend them to any organization seeking a dependable tech partner.",
  who: "Victoria Buckholz",
  where: "Journey to the Center of Hope"
}, {
  quote: "Working with Digital Allies is not just about achieving results. It is about experiencing the clarity of real collaboration — where questions get answered and decisions get made.",
  who: "Tao Wei",
  where: "Tao Wei Designs"
}];
function FieldNotes() {
  return /*#__PURE__*/React.createElement("section", {
    id: "field-notes",
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1280
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The Archive \xB7 Field Notes",
    title: "Notes from real people.",
    caption: "I keep them pinned."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 18
    }
  }, NOTES.map((n, i) => /*#__PURE__*/React.createElement(PinnedNote, {
    key: i,
    leftBorder: false
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 18px",
      fontFamily: "var(--font-body)",
      fontStyle: "italic",
      fontSize: 13,
      lineHeight: 1.65,
      color: "var(--fg)"
    }
  }, "\"", n.quote, "\""), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--hairline)",
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 13
    }
  }, n.who), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 11,
      color: "var(--fg-muted)"
    }
  }, n.where)))))));
}
Object.assign(window, {
  FieldNotes
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FieldNotes.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* global React, Container, Button */
const {
  useState: useFooterState
} = React;
function Field({
  label,
  type = "text",
  placeholder,
  multiline,
  value,
  onChange
}) {
  const [focus, setFocus] = useFooterState(false);
  const common = {
    fontFamily: "var(--font-details)",
    fontSize: 13,
    padding: "12px 14px",
    border: focus ? "1px solid var(--accent)" : "1px solid var(--charcoal)",
    boxShadow: focus ? "0 0 0 2px rgba(58,123,213,0.15)" : "none",
    background: "var(--bg)",
    color: "var(--fg)",
    borderRadius: 2,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    resize: multiline ? "vertical" : "none",
    minHeight: multiline ? 100 : "auto",
    transition: "border 0.15s, box-shadow 0.15s"
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-details)",
      fontSize: 10,
      fontWeight: 700,
      color: "var(--fg)",
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      marginBottom: 8
    }
  }, label), multiline ? /*#__PURE__*/React.createElement("textarea", {
    placeholder: placeholder,
    value: value,
    onChange: e => onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: common
  }) : /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: e => onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: common
  }));
}
function Footer({
  onSubmit
}) {
  const [name, setName] = useFooterState("");
  const [email, setEmail] = useFooterState("");
  const [msg, setMsg] = useFooterState("");
  const [sent, setSent] = useFooterState(false);
  const submit = () => {
    setSent(true);
    if (onSubmit) onSubmit({
      name,
      email,
      msg
    });
  };
  return /*#__PURE__*/React.createElement("footer", {
    id: "contact",
    style: {
      background: "var(--charcoal)",
      color: "var(--bone-white)",
      padding: "80px 0 40px"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1280
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid rgba(249,246,240,0.18)",
      paddingBottom: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--accent-soft)"
    }
  }, "The Command Center"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1.15,
      margin: "12px 0 18px"
    }
  }, "Tell me what you are trying to do."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 26px",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.7,
      color: "rgba(249,246,240,0.7)",
      maxWidth: 360
    }
  }, "I will reply with next steps, a cost range, or a quick question. Usually all three."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 12,
      lineHeight: 2.2
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-soft)"
    }
  }, "LOCATION \xB7"), " Kingman, Arizona"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-soft)"
    }
  }, "DIRECT LINE \xB7"), " (928) 228-5769"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-soft)"
    }
  }, "EMAIL \xB7"), " contact@digitalallies.net"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      color: "var(--fg)",
      border: "1px solid var(--bone-white)",
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 16,
      margin: "0 0 22px"
    }
  }, "Send a Transmission"), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 11,
      fontWeight: 700,
      color: "var(--signal)",
      letterSpacing: "0.18em",
      textTransform: "uppercase"
    }
  }, "Transmission received"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.7,
      margin: "12px 0 0"
    }
  }, "Thanks, ", name || "friend", ". I'll get back to you with next steps \u2014 usually within a working day.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Name",
    value: name,
    onChange: setName,
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    type: "email",
    value: email,
    onChange: setEmail,
    placeholder: "your@email.com"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "What are you trying to do?",
    multiline: true,
    value: msg,
    onChange: setMsg,
    placeholder: "Give me the short version. We can fill in details later."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: submit,
    style: {
      width: "100%",
      marginTop: 4
    }
  }, "[ Submit Transmission ]"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      fontFamily: "var(--font-details)",
      fontSize: 10,
      color: "var(--fg-soft)",
      lineHeight: 1.5
    }
  }, "I do not share your details. I use your message to reply. That is it."))))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 28,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "var(--font-details)",
      fontSize: 11,
      color: "rgba(249,246,240,0.6)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Digital Allies. Based in Kingman, AZ."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Cookies"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Sitemap")))));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* global React, Container, Eyebrow, Button, PinnedNote */

function Hero({
  lang
}) {
  const t = lang === "es" ? {
    eyebrow: "Con base en Kingman, AZ · Al servicio de todo lo demás",
    title: "Soluciones Tecnológicas para Personas con Cosas Mejores que Hacer.",
    sub: "Yo construyo sistemas que no requieren una maestría para usarlos.",
    quote: "\"Ingeniería limpia, comunicación clara y un seguimiento que no requerirá seguimiento.\"",
    cta1: "[ Consultar Aquí ]",
    cta2: "[ Ver los Diagramas ]"
  } : {
    eyebrow: "Based in Kingman, AZ · Serving Everywhere Else",
    title: "Technological Solutions for People with Better Things to Do.",
    sub: "I build systems that don\u2019t require a master\u2019s degree to operate.",
    quote: "\u201CClean engineering, clear communication, and follow-through that won't require follow up.\u201D",
    cta1: "[ Inquire Within ]",
    cta2: "[ View the Diagrams ]"
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 0 112px"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 920
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 24
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: "clamp(40px, 5.5vw, 60px)",
      lineHeight: 1.08,
      letterSpacing: "-0.012em",
      margin: "0 0 32px",
      color: "var(--fg)",
      textWrap: "balance"
    }
  }, t.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 16,
      lineHeight: 1.6,
      maxWidth: 540,
      margin: "0 auto 28px",
      color: "var(--fg)"
    }
  }, t.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      margin: "0 auto 48px"
    }
  }, /*#__PURE__*/React.createElement(PinnedNote, {
    align: "center"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontStyle: "italic",
      fontSize: 13,
      lineHeight: 1.6,
      color: "var(--fg)"
    }
  }, t.quote))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: "#contact"
  }, t.cta1), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    href: "#diagrams"
  }, t.cta2)))));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/JargonJar.jsx
try { (() => {
/* global React, Container */
const {
  useState: useJarState
} = React;
const JARGON = [{
  from: "\"Leverage synergies across touchpoints\"",
  to: "\"Make the parts work together.\""
}, {
  from: "\"End-to-end digital transformation\"",
  to: "\"We fix what's broken and build what's missing.\""
}, {
  from: "\"Scalable solutions for your growth journey\"",
  to: "\"It works now and won't fall apart later.\""
}, {
  from: "\"SEO-optimized content ecosystems\"",
  to: "\"Your site shows up when people search. That's the goal.\""
}, {
  from: "\"Robust backend infrastructure\"",
  to: "\"Quiet stuff running so nothing crashes.\""
}, {
  from: "\"Holistic brand alignment\"",
  to: "\"Your logo, site, and words look like they know each other.\""
}, {
  from: "\"Onboarding workflow optimization\"",
  to: "\"Getting started without the runaround.\""
}];
function FlipCard({
  front,
  back
}) {
  const [flipped, setFlipped] = useJarState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => setFlipped(!flipped),
    style: {
      perspective: 1000,
      cursor: "pointer",
      height: 168
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      textAlign: "center",
      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      transformStyle: "preserve-3d",
      transform: flipped ? "rotateY(180deg)" : "none",
      border: "1px solid var(--charcoal)",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement(CardFace, {
    side: "front"
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 11,
      color: "var(--signal)",
      margin: "0 0 8px",
      letterSpacing: "0.05em"
    }
  }, "Corporate Speak"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 11,
      lineHeight: 1.5,
      margin: 0,
      fontWeight: 700
    }
  }, front)), /*#__PURE__*/React.createElement(CardFace, {
    side: "back"
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 11,
      color: "var(--accent)",
      margin: "0 0 8px",
      letterSpacing: "0.05em"
    }
  }, "DA Translation"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 11,
      lineHeight: 1.5,
      margin: 0,
      fontWeight: 700
    }
  }, back))));
}
function CardFace({
  side,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      WebkitBackfaceVisibility: "hidden",
      backfaceVisibility: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 22,
      background: side === "back" ? "var(--bg-alt)" : "var(--bg)",
      transform: side === "back" ? "rotateY(180deg)" : "none"
    }
  }, children);
}
function JargonJar() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1024
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--charcoal)",
      background: "var(--bg)",
      padding: "40px 44px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 32,
      margin: "0 0 12px",
      borderBottom: "1px solid var(--hairline)",
      paddingBottom: 18
    }
  }, "The Jargon Jar 2.0"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 11,
      fontWeight: 700,
      color: "var(--signal)",
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      margin: "0 0 24px"
    }
  }, "Click any card to translate corporate posture into straight talk."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, JARGON.map((j, i) => /*#__PURE__*/React.createElement(FlipCard, {
    key: i,
    front: j.from,
    back: j.to
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--bg-alt)",
      border: "1px solid var(--charcoal)",
      padding: "32px 16px 14px",
      textAlign: "center",
      boxShadow: "var(--shadow-sm)",
      height: 168,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      width: 14,
      height: 14,
      background: "var(--signal)",
      border: "1px solid var(--charcoal)",
      borderRadius: "50%",
      boxShadow: "var(--shadow-pin)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 9,
      fontWeight: 700,
      color: "var(--fg-soft)",
      textTransform: "uppercase",
      letterSpacing: "0.18em"
    }
  }, "Manual Registry"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-details)",
      fontSize: 10,
      fontStyle: "italic",
      color: "var(--fg-muted)",
      lineHeight: 1.5
    }
  }, "\"If you need a glossary to read your website, you've already lost them.\""), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 9,
      fontWeight: 700,
      textAlign: "right"
    }
  }, "\u2014 Jargon Protocol"))))));
}
Object.assign(window, {
  JargonJar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/JargonJar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
/* global React, PulseDot */
const {
  useState: useNavState
} = React;
function Nav({
  activeSection,
  lang,
  onLangChange,
  onNavClick
}) {
  const links = [{
    id: "departments",
    en: "Services",
    es: "Servicios"
  }, {
    id: "diagrams",
    en: "Diagrams",
    es: "Diagramas"
  }, {
    id: "pricing",
    en: "Pricing",
    es: "Precios"
  }, {
    id: "field-notes",
    en: "Reviews",
    es: "Reseñas"
  }, {
    id: "faq",
    en: "FAQ",
    es: "FAQ"
  }, {
    id: "contact",
    en: "Contact",
    es: "Contacto"
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      borderBottom: "1px solid var(--charcoal)",
      background: "var(--bg)",
      position: "sticky",
      top: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      textDecoration: "none",
      color: "var(--fg)"
    }
  }, /*#__PURE__*/React.createElement(PulseDot, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 19,
      letterSpacing: "0.01em"
    }
  }, "Digital Allies")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: `#${l.id}`,
    onClick: e => {
      e.preventDefault();
      onNavClick && onNavClick(l.id);
    },
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 11,
      color: activeSection === l.id ? "var(--accent)" : "var(--fg)",
      textDecoration: "none",
      letterSpacing: "0.04em",
      whiteSpace: "nowrap"
    }
  }, lang === "es" ? l.es : l.en))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      border: "1px solid var(--charcoal)"
    }
  }, ["en", "es"].map((code, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: code
  }, i === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: "var(--charcoal)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => onLangChange(code),
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 11,
      padding: "6px 11px",
      border: "none",
      background: lang === code ? "var(--charcoal)" : "var(--bg)",
      color: lang === code ? "var(--bone-white)" : "var(--fg)",
      cursor: "pointer",
      letterSpacing: "0.05em"
    }
  }, code.toUpperCase())))))));
}
Object.assign(window, {
  Nav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pricing.jsx
try { (() => {
/* global React, Container, SectionHeading */

const FREE = [["Tech Consulting", "Free"], ["AI Consulting", "Free"], ["Brand Discovery", "Free"], ["AEO & SEO Review", "Free"]];
const PAID = [["Website Design", "From $100"], ["Graphic Design", "From $75"], ["Building (Full Project)", "From $100"], ["Monthly Maintenance", "From $50"], ["Automation Setup", "Quoted"]];
function PriceCol({
  title,
  rows,
  foot,
  isFree
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "40px 36px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 19,
      margin: "0 0 22px",
      textAlign: "center"
    }
  }, title), rows.map(([label, price], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "12px 0",
      borderBottom: i === rows.length - 1 ? "none" : "1px dashed var(--grid-line-strong)",
      fontFamily: "var(--font-details)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      color: isFree ? "var(--accent)" : "var(--fg)"
    }
  }, price))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "22px 0 0",
      fontFamily: "var(--font-details)",
      fontStyle: "italic",
      fontSize: 11,
      color: "var(--fg-muted)",
      lineHeight: 1.6,
      paddingTop: 16,
      borderTop: "1px solid var(--hairline)"
    }
  }, foot));
}
function Pricing() {
  return /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1024
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "The Transparency Table",
    caption: "Strategy is Free. Execution is Paid."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--charcoal)",
      background: "var(--bg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--charcoal)"
    }
  }, /*#__PURE__*/React.createElement(PriceCol, {
    title: "The Reciprocity Loop",
    rows: FREE,
    foot: "I do not charge for conversations or clarity. Call it a professional courtesy.",
    isFree: true
  })), /*#__PURE__*/React.createElement(PriceCol, {
    title: "Tactical Deployments",
    rows: PAID,
    foot: "All quotes are given before work begins. No surprises. No silent scope creep."
  })))));
}
Object.assign(window, {
  Pricing
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pricing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Primitives.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

// ============================================================
// Eyebrow — tracked uppercase label, signal-red by default
// ============================================================
function Eyebrow({
  children,
  color = "signal",
  className = "",
  style = {}
}) {
  const palette = {
    signal: "var(--signal)",
    blue: "var(--accent)",
    muted: "var(--fg-soft)"
  };
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: palette[color] || color,
      display: "inline-block",
      ...style
    }
  }, children);
}

// ============================================================
// PulseDot — the blue dot + ring lockup
// ============================================================
function PulseDot({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "da-pulse-ring",
    style: {
      position: "absolute",
      width: size * 0.8,
      height: size * 0.8,
      background: "var(--accent)",
      borderRadius: "50%",
      opacity: 0.25,
      animation: "da-fab-ring 2.2s ease-out infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: size * 0.6,
      height: size * 0.6,
      background: "var(--accent)",
      border: "1px solid var(--charcoal)",
      borderRadius: "50%",
      animation: "da-brand-pulse 3s ease-in-out infinite"
    }
  }));
}

// ============================================================
// Button — bracketed CTA. Variants: primary (red), secondary (bone), dark.
// ============================================================
function Button({
  children,
  variant = "primary",
  onClick,
  href,
  small = false,
  style = {}
}) {
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
    ...style
  };
  const variants = {
    primary: {
      background: "var(--signal)",
      color: "#fff"
    },
    secondary: {
      background: "var(--bone-white)",
      color: "var(--fg)"
    },
    dark: {
      background: "var(--charcoal)",
      color: "var(--bone-white)"
    }
  };
  const [hover, setHover] = useState(false);
  const hoverStyle = hover ? variant === "primary" ? {
    background: "var(--charcoal)"
  } : variant === "secondary" ? {
    background: "var(--accent-soft)"
  } : {
    background: "var(--signal)"
  } : {};
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, {
    onClick: onClick,
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle
    }
  }, children);
}

// ============================================================
// PinnedNote — yellow card + red pin at top center. Pull quotes.
// ============================================================
function PinnedNote({
  children,
  leftBorder = true,
  align = "left",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--bg-alt)",
      border: "1px solid var(--charcoal)",
      borderLeft: leftBorder ? "4px solid var(--signal)" : "1px solid var(--charcoal)",
      padding: "40px 24px 20px",
      textAlign: align,
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      left: "50%",
      transform: "translateX(-50%)",
      width: 14,
      height: 14,
      background: "var(--signal)",
      border: "1px solid var(--charcoal)",
      borderRadius: "50%",
      boxShadow: "var(--shadow-pin)"
    }
  }), children);
}

// ============================================================
// Container — repeating max-w wrapper
// ============================================================
function Container({
  children,
  max = 1024,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: max,
      margin: "0 auto",
      padding: "0 24px",
      ...style
    }
  }, children);
}

// ============================================================
// SectionHeading — centered eyebrow + h2 + caption
// ============================================================
function SectionHeading({
  eyebrow,
  title,
  caption,
  align = "center"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      marginBottom: 48
    }
  }, eyebrow && /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 8px",
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 36,
      lineHeight: 1.1
    }
  }, title), caption && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-details)",
      fontSize: 13,
      color: "var(--fg-muted)"
    }
  }, caption));
}
Object.assign(window, {
  Eyebrow,
  PulseDot,
  Button,
  PinnedNote,
  Container,
  SectionHeading
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Reliability.jsx
try { (() => {
/* global React, Container, SectionHeading */

const MOATS = [{
  eyebrow: "Local Roots",
  title: "I Am Local",
  body: "Based in Kingman, Arizona. Not offshore. Not a chatbot. A real person with a local area code who picks up the phone.",
  icon: "../../assets/icon-route66.png"
}, {
  eyebrow: "Written Commitment",
  title: "No-Ghosting Guarantee",
  body: "If I take your project, I finish it. If something changes, I tell you. Going quiet is not part of my service model.",
  icon: "../../assets/icon-topo.png"
}, {
  eyebrow: "Direct Contact",
  title: "Direct Line",
  body: "(928) 228-5769. Call or text. No call center. No ticket queue. Just a real number that goes to one real person.",
  icon: "../../assets/icon-phone.png"
}];
function MoatCard({
  m
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      border: "1px solid var(--charcoal)",
      padding: "32px 28px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: m.icon,
    alt: "",
    style: {
      width: 68,
      height: 68,
      objectFit: "contain",
      marginBottom: 6
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 10,
      fontWeight: 700,
      color: "var(--signal)",
      letterSpacing: "0.18em",
      textTransform: "uppercase"
    }
  }, m.eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 18,
      margin: 0
    }
  }, m.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.65,
      color: "var(--fg)"
    }
  }, m.body));
}
function Reliability() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px 0",
      background: "var(--bg-alt)",
      borderTop: "1px solid var(--charcoal)",
      borderBottom: "1px solid var(--charcoal)"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1280
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The Reliability Moat",
    title: "The No-Ghosting Guarantee. In Writing.",
    caption: "Three commitments. Stamped before you sign."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16
    }
  }, MOATS.map((m, i) => /*#__PURE__*/React.createElement(MoatCard, {
    key: i,
    m: m
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "40px auto 0",
      textAlign: "center",
      fontFamily: "var(--font-details)",
      fontStyle: "italic",
      fontSize: 12,
      color: "var(--fg-muted)",
      maxWidth: 640,
      lineHeight: 1.6
    }
  }, "\"I am historically easy to reach. I live in Kingman. If you call, I answer. It is a very avant-garde concept called 'Doing My Job.'\"")));
}
Object.assign(window, {
  Reliability
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Reliability.jsx", error: String((e && e.message) || e) }); }

})();
