// Shared helpers + brand constants for social media pieces

const PROJECTS = [
  {
    id: "affron",
    name: "Affron Books",
    url: "demo.digitalallies.net/affron-books",
    category: "Publishing",
    problem: "A regional publisher juggling 40+ titles in spreadsheets.",
    solution: "A catalog site with searchable inventory and direct-to-reader orders.",
    accent: "#B8482E",
    paper: "#F4ECD8",
    ink: "#2A2118",
  },
  {
    id: "transport",
    name: "Mr. Transportation LLC",
    url: "demo.digitalallies.net/mr-transportation",
    category: "Logistics",
    problem: "Drivers booking loads by text message and lost paperwork.",
    solution: "A booking portal with live dispatch board and BOL generation.",
    accent: "#C5301A",
    paper: "#F2EFE7",
    ink: "#1E2A3A",
  },
  {
    id: "gourmet",
    name: "Gourmet Bites",
    url: "demo.digitalallies.net/gourmet-bites",
    category: "Hospitality",
    problem: "A catering kitchen with no online menu, all calls.",
    solution: "Menu site with quote requests routed by event type.",
    accent: "#7C5A2E",
    paper: "#F7F1E4",
    ink: "#2D2418",
  },
];

const DEPARTMENTS = [
  {
    n: "01",
    code: "DSGN",
    name: "The Design Bureau",
    blurb: "Brand, web, identity — built so the parts know each other.",
    icon: "assets/design-icon.png",
    motif: "compass",
  },
  {
    n: "02",
    code: "COOP",
    name: "Dept. of Cooperation",
    blurb: "Your apps talk to each other. You don't have to.",
    icon: "assets/integrations-icon.png",
    motif: "engine",
  },
  {
    n: "03",
    code: "AUTO",
    name: "The Self-Governing Bureau",
    blurb: "Repetitive tasks are for machines. Go take a real lunch break.",
    icon: "assets/automation-icon.png",
    motif: "metronome",
  },
  {
    n: "04",
    code: "OBSV",
    name: "The Permanent Observation Post",
    blurb: "Monitoring runs 24/7. If something breaks at 2am, that's my problem.",
    icon: "assets/support-icon.png",
    motif: "topo",
  },
];

// Technical Lace ruled-paper grid background
function laceBg(step = 20, opacity = 0.07, color = "#2D2D2D") {
  const c = color.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  return `repeating-linear-gradient(0deg, rgba(${r},${g},${b},${opacity}) 0 0.5px, transparent 0.5px ${step}px), repeating-linear-gradient(90deg, rgba(${r},${g},${b},${opacity}) 0 0.5px, transparent 0.5px ${step}px)`;
}

// Tracked uppercase eyebrow
function Eyebrow({ children, color = "#2D2D2D", size = 11, style = {} }) {
  return (
    <div style={{
      fontFamily: "var(--font-details, 'JetBrains Mono', monospace)",
      fontSize: size,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color,
      fontWeight: 500,
      ...style,
    }}>{children}</div>
  );
}

// Red signal dot
function SignalDot({ size = 10, style = {} }) {
  return (
    <span style={{
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      background: "#C5301A",
      boxShadow: "0 1px 0 rgba(0,0,0,0.15)",
      ...style,
    }} />
  );
}

// Bracketed label like [ Inquire Within ]
function Bracket({ children, color = "#2D2D2D", size = 13, weight = 500 }) {
  return (
    <span style={{
      fontFamily: "var(--font-details, 'JetBrains Mono', monospace)",
      fontSize: size,
      letterSpacing: "0.05em",
      color,
      fontWeight: weight,
    }}>[ {children} ]</span>
  );
}

Object.assign(window, {
  PROJECTS, DEPARTMENTS, laceBg, Eyebrow, SignalDot, Bracket,
});
