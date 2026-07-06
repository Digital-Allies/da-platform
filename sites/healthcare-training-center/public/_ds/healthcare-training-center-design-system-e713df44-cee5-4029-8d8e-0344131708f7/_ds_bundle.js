/* @ds-bundle: {"format":3,"namespace":"HealthcareTrainingCenterDesignSystem_e713df","components":[],"sourceHashes":{"ui_kits/learner-app/components.jsx":"e0e676044175","ui_kits/learner-app/rooms.jsx":"9d0f1fea21b6","ui_kits/learner-app/screens.jsx":"4a7dc5146ec5","ui_kits/marketing/sections.jsx":"666d5ab9ef26"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HealthcareTrainingCenterDesignSystem_e713df = window.HealthcareTrainingCenterDesignSystem_e713df || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/learner-app/components.jsx
try { (() => {
// components.jsx — shared presentational components for the Learner App kit.
// Relies on rooms.jsx being loaded first. Exports to window at the end.

const {
  useState
} = React;

/* ---------- Top Navigation ---------- */
function TopNav({
  accent,
  onLogo,
  room
}) {
  const links = ['Lobby', 'My Progress', 'Live Classes', 'Study Lounge', 'Resources'];
  const [active] = useState('Lobby');
  return /*#__PURE__*/React.createElement("header", {
    className: "ln-nav",
    style: {
      '--accent': accent || 'var(--color-teal)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-nav-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-logo",
    onClick: onLogo,
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("span", {
    className: "ln-logo-mark"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-first-aid"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ln-logo-word"
  }, "Healthcare Training Center")), /*#__PURE__*/React.createElement("nav", {
    className: "ln-links"
  }, links.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    className: 'ln-link' + (l === active ? ' is-active' : '')
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "ln-nav-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ln-iconbtn",
    "aria-label": "Notifications"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-bell"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ln-dot"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ln-avatar"
  }, "MD"), /*#__PURE__*/React.createElement("span", {
    className: "ln-username"
  }, "Maria D."))), /*#__PURE__*/React.createElement("div", {
    className: "ln-accentbar"
  }));
}

/* ---------- Button ---------- */
function Button({
  variant = 'primary',
  size = 'md',
  accent,
  children,
  onClick,
  full
}) {
  const style = {};
  if (variant === 'track' && accent) style.background = accent;
  return /*#__PURE__*/React.createElement("button", {
    className: `ln-btn ln-btn-${variant} ln-btn-${size}${full ? ' ln-btn-full' : ''}`,
    style: style,
    onClick: onClick
  }, children);
}

/* ---------- Progress bar ---------- */
function ProgressBar({
  pct,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ln-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-fill",
    style: {
      width: pct + '%',
      background: color || 'var(--color-teal)'
    }
  }));
}

/* ---------- Progress ring ---------- */
function ProgressRing({
  pct,
  size = 40,
  stroke = 5,
  color,
  label
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    className: "ln-ring"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--color-border)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color || 'var(--color-teal)',
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: off,
    transform: `rotate(-90 ${size / 2} ${size / 2})`,
    style: {
      transition: 'stroke-dashoffset .4s'
    }
  }), label && /*#__PURE__*/React.createElement("text", {
    x: "50%",
    y: "52%",
    textAnchor: "middle",
    dominantBaseline: "middle",
    fontFamily: "Montserrat",
    fontWeight: "800",
    fontSize: size * 0.26,
    fill: "var(--color-navy)"
  }, label));
}

/* ---------- Status pill ---------- */
function StatusPill({
  status
}) {
  const map = {
    'complete': {
      t: 'Completed',
      cls: 'is-success',
      icon: 'ph-check-circle'
    },
    'in-progress': {
      t: 'In Progress',
      cls: 'is-warning',
      icon: null
    },
    'not-started': {
      t: 'Not Started',
      cls: 'is-muted',
      icon: null
    }
  };
  const s = map[status] || map['not-started'];
  return /*#__PURE__*/React.createElement("span", {
    className: 'ln-pill ' + s.cls
  }, s.icon && /*#__PURE__*/React.createElement("i", {
    className: 'ph ' + s.icon
  }), s.t);
}

/* ---------- Room Entry Card (the "door") ---------- */
function RoomCard({
  room,
  onEnter
}) {
  const status = roomStatus(room);
  const pct = Math.round(room.done / room.total * 100);
  const cta = roomCta(room);
  return /*#__PURE__*/React.createElement("article", {
    className: 'ln-roomcard ln-status-' + status,
    onClick: () => onEnter(room),
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-roomcard-band",
    style: {
      background: room.color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ln-roomnum"
  }, "ROOM ", room.n), status === 'complete' && /*#__PURE__*/React.createElement("span", {
    className: "ln-roomcheck"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  })), /*#__PURE__*/React.createElement("i", {
    className: 'ph-fill ' + room.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "ln-roomcard-body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "ln-roomname"
  }, room.name), /*#__PURE__*/React.createElement("p", {
    className: "ln-roomdesc"
  }, room.desc), status !== 'not-started' && /*#__PURE__*/React.createElement("div", {
    className: "ln-roomprog"
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    pct: pct,
    color: status === 'complete' ? 'var(--color-success)' : room.color
  }), /*#__PURE__*/React.createElement("span", {
    className: "ln-roomprog-lbl"
  }, room.done, " of ", room.total, " courses")), /*#__PURE__*/React.createElement(Button, {
    variant: "track",
    accent: room.color,
    full: true
  }, cta, " ", /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-arrow-right"
  }))));
}

/* ---------- Course Card ---------- */
function CourseCard({
  course,
  room
}) {
  let action = 'Start',
    icon = 'ph-circle-dashed',
    label = 'Not started';
  if (course.pct === 100) {
    action = 'Review';
    icon = 'ph-check-circle';
    label = 'Completed';
  } else if (course.pct > 0) {
    action = 'Continue';
    label = course.pct + '% done';
  }
  return /*#__PURE__*/React.createElement("article", {
    className: "ln-course"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-course-thumb",
    style: {
      background: room.color
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: 'ph ' + room.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "ln-course-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-course-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ln-tag"
  }, course.min, " MIN"), /*#__PURE__*/React.createElement("span", {
    className: "ln-tag"
  }, course.lvl.toUpperCase())), /*#__PURE__*/React.createElement("h4", {
    className: "ln-course-title"
  }, course.t), /*#__PURE__*/React.createElement("div", {
    className: "ln-course-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ln-course-status"
  }, /*#__PURE__*/React.createElement("i", {
    className: 'ph ' + icon
  }), " ", label), /*#__PURE__*/React.createElement("span", {
    className: "ln-course-go",
    style: {
      color: room.color
    }
  }, action, " \u2192"))));
}
Object.assign(window, {
  TopNav,
  Button,
  ProgressBar,
  ProgressRing,
  StatusPill,
  RoomCard,
  CourseCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/learner-app/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/learner-app/rooms.jsx
try { (() => {
// rooms.jsx — shared room data + small helpers for the Learner App kit
// Exposed on window for the other babel scripts.

const ROOMS = [{
  id: 'cs',
  n: 1,
  name: 'Customer Service',
  icon: 'ph-users',
  color: '#3B7DD8',
  tint: '#ECF3FC',
  desc: 'Communication, empathy, and de-escalation for every patient interaction.',
  why: 'Patients remember how they were treated long after they forget a diagnosis. The first voice they hear sets the tone for their entire experience of care.',
  done: 18,
  total: 24,
  courses: [{
    t: 'The Importance of Customer Service in Healthcare',
    min: 30,
    lvl: 'Beginner',
    pct: 100
  }, {
    t: 'Communication Skills: Phone, Email & In-Person',
    min: 45,
    lvl: 'Beginner',
    pct: 100
  }, {
    t: 'Active Listening & Empathy',
    min: 35,
    lvl: 'Core',
    pct: 80
  }, {
    t: 'Handling Difficult Situations',
    min: 40,
    lvl: 'Core',
    pct: 40
  }, {
    t: 'Cultural Competency',
    min: 30,
    lvl: 'Core',
    pct: 0
  }, {
    t: 'Service Recovery & Best Practices',
    min: 25,
    lvl: 'Advanced',
    pct: 0
  }]
}, {
  id: 'hipaa',
  n: 2,
  name: 'HIPAA, Privacy & Security',
  icon: 'ph-shield-check',
  color: '#2BA89A',
  tint: '#E7F6F4',
  desc: 'PHI, the privacy rule, and the habits that keep patient data safe.',
  why: 'A single careless click can expose thousands of patients. Protecting privacy is not paperwork — it is the trust that makes honest care possible.',
  done: 6,
  total: 12,
  courses: [{
    t: 'Introduction to HIPAA',
    min: 30,
    lvl: 'Beginner',
    pct: 100
  }, {
    t: 'Protected Health Information (PHI)',
    min: 45,
    lvl: 'Beginner',
    pct: 100
  }, {
    t: 'The Privacy Rule & Patient Rights',
    min: 40,
    lvl: 'Core',
    pct: 60
  }, {
    t: 'Minimum Necessary Standard',
    min: 25,
    lvl: 'Core',
    pct: 0
  }, {
    t: 'Data Breach Prevention & Reporting',
    min: 35,
    lvl: 'Core',
    pct: 0
  }, {
    t: 'Consequences of HIPAA Violations',
    min: 30,
    lvl: 'Advanced',
    pct: 0
  }]
}, {
  id: 'compliance',
  n: 3,
  name: 'Compliance',
  icon: 'ph-clipboard-text',
  color: '#2EAA6E',
  tint: '#E8F7EF',
  desc: 'Laws, fraud/waste/abuse, and the ethics that keep care honest.',
  why: 'Compliance is how an organization proves — to patients and regulators alike — that it does the right thing even when no one is watching.',
  done: 12,
  total: 12,
  courses: [{
    t: 'Introduction to Healthcare Compliance',
    min: 30,
    lvl: 'Beginner',
    pct: 100
  }, {
    t: 'Laws & Regulations Overview',
    min: 45,
    lvl: 'Beginner',
    pct: 100
  }, {
    t: 'Fraud, Waste & Abuse (FWA)',
    min: 40,
    lvl: 'Core',
    pct: 100
  }, {
    t: 'The Anti-Kickback Statute & Stark Law',
    min: 50,
    lvl: 'Advanced',
    pct: 100
  }, {
    t: 'Reporting Concerns (Whistleblowing)',
    min: 30,
    lvl: 'Core',
    pct: 100
  }, {
    t: 'Internal Audits & Monitoring',
    min: 35,
    lvl: 'Advanced',
    pct: 100
  }]
}, {
  id: 'records',
  n: 4,
  name: 'Medical Records',
  icon: 'ph-folder-open',
  color: '#7B5EA7',
  tint: '#F1ECF7',
  desc: 'EHR, documentation standards, and reading a record with confidence.',
  why: 'The record is the patient’s story in clinical form. Accurate documentation is what lets the next caregiver pick up exactly where the last one left off.',
  done: 3,
  total: 14,
  courses: [{
    t: 'Introduction to Medical Records',
    min: 30,
    lvl: 'Beginner',
    pct: 100
  }, {
    t: 'Electronic Health Records (EHR)',
    min: 45,
    lvl: 'Beginner',
    pct: 60
  }, {
    t: 'Documenting Patient Information',
    min: 40,
    lvl: 'Core',
    pct: 0
  }, {
    t: 'How to Read a Medical Record',
    min: 35,
    lvl: 'Core',
    pct: 0
  }, {
    t: 'Retention & Destruction Policies',
    min: 30,
    lvl: 'Advanced',
    pct: 0
  }, {
    t: 'Release of Information (ROI)',
    min: 35,
    lvl: 'Advanced',
    pct: 0
  }]
}, {
  id: 'finance',
  n: 5,
  name: 'Finance',
  icon: 'ph-currency-dollar',
  color: '#D4A017',
  tint: '#FBF3DD',
  desc: 'Revenue cycle, billing, and collections done accurately and fairly.',
  why: 'Billing errors cost patients real money and erode their trust. Getting finance right is part of treating people with dignity.',
  done: 0,
  total: 13,
  courses: [{
    t: 'Introduction to Healthcare Finance',
    min: 30,
    lvl: 'Beginner',
    pct: 0
  }, {
    t: 'Revenue Cycle Overview',
    min: 45,
    lvl: 'Beginner',
    pct: 0
  }, {
    t: 'Coding & Charge Capture (CPT/ICD-10)',
    min: 50,
    lvl: 'Core',
    pct: 0
  }, {
    t: 'Claims Submission & Denials',
    min: 40,
    lvl: 'Core',
    pct: 0
  }, {
    t: 'Patient Statements & Collections',
    min: 35,
    lvl: 'Advanced',
    pct: 0
  }, {
    t: 'Fraud & Abuse in Billing',
    min: 30,
    lvl: 'Advanced',
    pct: 0
  }]
}];
function roomStatus(r) {
  if (r.done === 0) return 'not-started';
  if (r.done >= r.total) return 'complete';
  return 'in-progress';
}
function roomCta(r) {
  const s = roomStatus(r);
  if (s === 'complete') return 'Review';
  if (s === 'in-progress') return 'Continue';
  return 'Enter Room';
}
Object.assign(window, {
  ROOMS,
  roomStatus,
  roomCta
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/learner-app/rooms.jsx", error: String((e && e.message) || e) }); }

// ui_kits/learner-app/screens.jsx
try { (() => {
// screens.jsx — Lobby + Room screens and the App shell.
// Relies on rooms.jsx + components.jsx. Exports App to window.

const {
  useState,
  useEffect
} = React;

/* ---------- Lobby (Reception) ---------- */
function LobbyScreen({
  onEnter
}) {
  const overall = Math.round(100 * ROOMS.reduce((a, r) => a + r.done, 0) / ROOMS.reduce((a, r) => a + r.total, 0));
  return /*#__PURE__*/React.createElement("div", {
    className: "ln-lobby"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-lobby-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "ln-eyebrow"
  }, "Welcome back"), /*#__PURE__*/React.createElement("h1", {
    className: "ln-lobby-title"
  }, "Hello, Maria"), /*#__PURE__*/React.createElement("p", {
    className: "ln-lobby-sub"
  }, "Choose your training path \u2014 step into any room to pick up where you left off.")), /*#__PURE__*/React.createElement("div", {
    className: "ln-overall"
  }, /*#__PURE__*/React.createElement(ProgressRing, {
    pct: overall,
    size: 108,
    stroke: 12,
    color: "var(--color-teal)",
    label: overall + '%'
  }), /*#__PURE__*/React.createElement("div", {
    className: "ln-overall-meta"
  }, /*#__PURE__*/React.createElement("strong", null, "Overall progress"), /*#__PURE__*/React.createElement("span", null, "39 of 75 courses complete")))), /*#__PURE__*/React.createElement("div", {
    className: "ln-lobby-grid-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-section-label"
  }, /*#__PURE__*/React.createElement("span", null, "Choose Your Training Path")), /*#__PURE__*/React.createElement("div", {
    className: "ln-roomgrid"
  }, ROOMS.map(r => /*#__PURE__*/React.createElement(RoomCard, {
    key: r.id,
    room: r,
    onEnter: onEnter
  })), /*#__PURE__*/React.createElement("aside", {
    className: "ln-lobby-aside"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-aside-card ln-aside-live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ln-live-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ln-live-dot"
  }), " LIVE NOW"), /*#__PURE__*/React.createElement("h4", null, "HIPAA Basics \u2014 Live Class"), /*#__PURE__*/React.createElement("p", null, "With instructor Dr. Alan Reyes"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Join Live Class")), /*#__PURE__*/React.createElement("div", {
    className: "ln-aside-card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ln-eyebrow"
  }, "Upcoming"), /*#__PURE__*/React.createElement("h4", {
    className: "ln-aside-h"
  }, "Study Group Session"), /*#__PURE__*/React.createElement("p", {
    className: "ln-aside-p"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-calendar-blank"
  }), " May 22, 2026 \xB7 6:00 PM EST"), /*#__PURE__*/React.createElement("a", {
    className: "ln-aside-link"
  }, "View calendar \u2192"))))));
}

/* ---------- Room (immersive) ---------- */
function RoomScreen({
  room,
  onBack
}) {
  const pct = Math.round(room.done / room.total * 100);
  return /*#__PURE__*/React.createElement("div", {
    className: "ln-room",
    style: {
      '--accent': room.color,
      '--tint': room.tint,
      background: room.tint
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-room-banner",
    style: {
      background: room.color
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-room-banner-inner"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ln-back",
    onClick: onBack
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-arrow-left"
  }), " Back to Lobby"), /*#__PURE__*/React.createElement("div", {
    className: "ln-room-banner-main"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ln-room-banner-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: 'ph-fill ' + room.icon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ln-room-banner-num"
  }, "ROOM ", room.n), /*#__PURE__*/React.createElement("h1", {
    className: "ln-room-banner-name"
  }, room.name), /*#__PURE__*/React.createElement("p", {
    className: "ln-room-banner-tag"
  }, room.desc)), /*#__PURE__*/React.createElement("div", {
    className: "ln-room-banner-prog"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ln-room-banner-pct"
  }, room.done, " of ", room.total, " complete"), /*#__PURE__*/React.createElement("div", {
    className: "ln-track ln-track-oncolor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-fill",
    style: {
      width: pct + '%',
      background: '#fff'
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "ln-room-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-breadcrumb"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: onBack
  }, "Lobby"), " ", /*#__PURE__*/React.createElement("i", {
    className: "ph ph-caret-right"
  }), " ", /*#__PURE__*/React.createElement("strong", null, room.name)), /*#__PURE__*/React.createElement("div", {
    className: "ln-room-cols"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-coursegrid"
  }, room.courses.map((c, i) => /*#__PURE__*/React.createElement(CourseCard, {
    key: i,
    course: c,
    room: room
  }))), /*#__PURE__*/React.createElement("aside", {
    className: "ln-room-aside"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ln-why",
    style: {
      borderTopColor: room.color
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ln-eyebrow",
    style: {
      color: room.color
    }
  }, "Why This Room Matters"), /*#__PURE__*/React.createElement("p", {
    className: "ln-why-text"
  }, room.why)), /*#__PURE__*/React.createElement("div", {
    className: "ln-forum",
    style: {
      background: room.tint
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: 'ph-fill ' + room.icon,
    style: {
      color: room.color
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Got questions?"), /*#__PURE__*/React.createElement("span", null, "Ask in the ", room.name, " forum \u2192")))))), /*#__PURE__*/React.createElement("button", {
    className: "ln-ask",
    style: {
      background: room.color
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-chat-circle-dots"
  }), " Ask a Question"));
}

/* ---------- App shell with room-entry transition ---------- */
function App() {
  const [room, setRoom] = useState(null);
  const [entering, setEntering] = useState(false);
  const enter = r => {
    setEntering(true);
    setTimeout(() => {
      setRoom(r);
      setEntering(false);
      window.scrollTo(0, 0);
    }, 180);
  };
  const back = () => {
    setEntering(true);
    setTimeout(() => {
      setRoom(null);
      setEntering(false);
      window.scrollTo(0, 0);
    }, 150);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "ln-app"
  }, /*#__PURE__*/React.createElement(TopNav, {
    accent: room ? room.color : null,
    onLogo: back,
    room: room
  }), /*#__PURE__*/React.createElement("main", {
    className: 'ln-main' + (entering ? ' is-entering' : '')
  }, room ? /*#__PURE__*/React.createElement(RoomScreen, {
    room: room,
    onBack: back
  }) : /*#__PURE__*/React.createElement(LobbyScreen, {
    onEnter: enter
  })), /*#__PURE__*/React.createElement("div", {
    className: "ln-help"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-headset"
  })));
}
window.App = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/learner-app/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/sections.jsx
try { (() => {
// sections.jsx — Marketing site sections. Exports to window.
// Reuses the 5-room concept. Loaded after React/Babel.

const {
  useState
} = React;
const TRACKS = [{
  n: 1,
  name: 'Customer Service',
  icon: 'ph-users',
  color: '#3B7DD8',
  blurb: 'Communication, empathy, and de-escalation for every patient interaction.'
}, {
  n: 2,
  name: 'HIPAA, Privacy & Security',
  icon: 'ph-shield-check',
  color: '#2BA89A',
  blurb: 'Protect patient information, maintain privacy, and prevent data breaches.'
}, {
  n: 3,
  name: 'Compliance',
  icon: 'ph-clipboard-text',
  color: '#2EAA6E',
  blurb: 'Meet legal and ethical standards and build a culture of integrity.'
}, {
  n: 4,
  name: 'Medical Records',
  icon: 'ph-folder-open',
  color: '#7B5EA7',
  blurb: 'Keep records accurate, complete, and secure — every single time.'
}, {
  n: 5,
  name: 'Finance',
  icon: 'ph-currency-dollar',
  color: '#D4A017',
  blurb: 'Understand the revenue cycle and support accurate reimbursement.'
}];

/* ---------- Nav ---------- */
function SiteNav() {
  return /*#__PURE__*/React.createElement("header", {
    className: "mk-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-nav-inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mk-logo",
    href: "#top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-logo-mark"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-first-aid"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mk-logo-word"
  }, "Healthcare Training Center")), /*#__PURE__*/React.createElement("nav", {
    className: "mk-nav-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#tracks"
  }, "Training Rooms"), /*#__PURE__*/React.createElement("a", {
    href: "#story"
  }, "Our Story"), /*#__PURE__*/React.createElement("a", {
    href: "#audience"
  }, "Who It's For"), /*#__PURE__*/React.createElement("a", {
    href: "#pricing"
  }, "Pricing")), /*#__PURE__*/React.createElement("div", {
    className: "mk-nav-cta"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mk-btn mk-btn-ghost",
    href: "#"
  }, "Log In"), /*#__PURE__*/React.createElement("a", {
    className: "mk-btn mk-btn-primary",
    href: "#"
  }, "Start Free Trial"))));
}

/* ---------- Hero ---------- */
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-hero",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-hero-inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-eyebrow mk-eyebrow-light"
  }, "A New Innovative Way to Learn"), /*#__PURE__*/React.createElement("h1", {
    className: "mk-hero-title"
  }, "Step Inside.", /*#__PURE__*/React.createElement("br", null), "Step Up."), /*#__PURE__*/React.createElement("p", {
    className: "mk-hero-sub"
  }, "A people-first training platform for healthcare professionals. Five training rooms. One mission: better care. Learn virtually \u2014 anytime, anywhere."), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mk-btn mk-btn-track mk-btn-lg",
    href: "#tracks"
  }, "Choose Your Training Path ", /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-arrow-right"
  })), /*#__PURE__*/React.createElement("a", {
    className: "mk-btn mk-btn-outline-light mk-btn-lg",
    href: "#story"
  }, "Why We Exist")), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero-stats"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "5"), /*#__PURE__*/React.createElement("span", null, "Training rooms")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "75+"), /*#__PURE__*/React.createElement("span", null, "On-demand courses")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "WCAG AA"), /*#__PURE__*/React.createElement("span", null, "Accessible by design")))));
}

/* ---------- Training tracks ---------- */
function TracksRow() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-section",
    id: "tracks"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-eyebrow"
  }, "Choose Your Training Path"), /*#__PURE__*/React.createElement("h2", {
    className: "mk-h2"
  }, "Five rooms. One mission. Better healthcare."), /*#__PURE__*/React.createElement("p", {
    className: "mk-lead"
  }, "Each room is a focused world of its own \u2014 enter and the whole experience takes on its subject and color.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-tracks"
  }, TRACKS.map(t => /*#__PURE__*/React.createElement("article", {
    className: "mk-track",
    key: t.n,
    style: {
      '--c': t.color
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-track-icon",
    style: {
      background: t.color
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: 'ph-fill ' + t.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "mk-track-num"
  }, "Room ", t.n), /*#__PURE__*/React.createElement("h3", {
    className: "mk-track-name"
  }, t.name), /*#__PURE__*/React.createElement("p", {
    className: "mk-track-blurb"
  }, t.blurb), /*#__PURE__*/React.createElement("a", {
    className: "mk-track-link",
    href: "#",
    style: {
      color: t.color
    }
  }, "Explore room \u2192")))));
}

/* ---------- Founder story ---------- */
function StorySection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-story",
    id: "story"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-story-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-story-quote"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-quote-mark"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-quotes"
  })), /*#__PURE__*/React.createElement("p", {
    className: "mk-quote"
  }, "This system is broken \u2014 but ", /*#__PURE__*/React.createElement("em", null, "you"), " can be the change in it. Healthcare workers who understand ", /*#__PURE__*/React.createElement("em", null, "why"), " care matters don't just follow the rules. They treat people better."), /*#__PURE__*/React.createElement("div", {
    className: "mk-quote-by"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-quote-name"
  }, "Our Founder"), /*#__PURE__*/React.createElement("span", {
    className: "mk-quote-role"
  }, "Attorney & patient advocate"))), /*#__PURE__*/React.createElement("div", {
    className: "mk-story-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-eyebrow"
  }, "Why This Exists"), /*#__PURE__*/React.createElement("h2", {
    className: "mk-h2"
  }, "Built by a lawyer. Designed for people."), /*#__PURE__*/React.createElement("p", null, "Our founder watched a family member receive care from people who knew the procedures but had never been taught the ", /*#__PURE__*/React.createElement("em", null, "why"), " behind them. The training existed to satisfy a regulation \u2014 not to serve a patient."), /*#__PURE__*/React.createElement("p", null, "Healthcare Training Center exists to close that gap: legally sound, patient-first training that leaves every learner more capable \u2014 and more humane \u2014 than when they arrived."), /*#__PURE__*/React.createElement("a", {
    className: "mk-btn mk-btn-secondary",
    href: "#"
  }, "Read our full story"))));
}

/* ---------- Who it's for ---------- */
function AudienceSplit() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-section",
    id: "audience"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-eyebrow"
  }, "Who It's For"), /*#__PURE__*/React.createElement("h2", {
    className: "mk-h2"
  }, "Two paths into the same building.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-audience"
  }, /*#__PURE__*/React.createElement("article", {
    className: "mk-aud-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-aud-icon",
    style: {
      background: 'var(--color-navy)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-buildings"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "mk-h3"
  }, "For Organizations"), /*#__PURE__*/React.createElement("p", null, "Train your whole team, assign required paths, set deadlines, and pull audit-ready compliance reports. Manage seats and billing in one portal."), /*#__PURE__*/React.createElement("ul", {
    className: "mk-checklist"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Team roster & progress tracking"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Downloadable compliance reports"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Deadlines & automated reminders")), /*#__PURE__*/React.createElement("a", {
    className: "mk-btn mk-btn-primary mk-btn-full",
    href: "#pricing"
  }, "See org plans")), /*#__PURE__*/React.createElement("article", {
    className: "mk-aud-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-aud-icon",
    style: {
      background: 'var(--color-teal)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-user"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "mk-h3"
  }, "For Individuals"), /*#__PURE__*/React.createElement("p", null, "Advance your career on your own schedule. Earn certificates and digital badges that prove your skills to current and future employers."), /*#__PURE__*/React.createElement("ul", {
    className: "mk-checklist"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Learn at your own pace"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Certificates of completion"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Mobile-friendly, learn anywhere")), /*#__PURE__*/React.createElement("a", {
    className: "mk-btn mk-btn-secondary mk-btn-full",
    href: "#pricing"
  }, "See individual plan"))));
}

/* ---------- Features ---------- */
function FeatureGrid() {
  const feats = [{
    icon: 'ph-monitor-play',
    t: 'Live & On-Demand',
    d: 'Instructor-led sessions plus a full on-demand library you can take anytime.'
  }, {
    icon: 'ph-cube',
    t: 'Interactive Simulations',
    d: 'Real-world scenarios let you practice safely before it counts.'
  }, {
    icon: 'ph-certificate',
    t: 'Certificates & Badges',
    d: 'Prove your skills and advance your career with shareable credentials.'
  }, {
    icon: 'ph-device-mobile',
    t: 'Mobile Friendly',
    d: 'Train between shifts on any device — your progress follows you.'
  }, {
    icon: 'ph-chart-line-up',
    t: 'Track Your Progress',
    d: 'A clear dashboard shows exactly how far you’ve come, room by room.'
  }, {
    icon: 'ph-headset',
    t: 'Support When You Need It',
    d: 'A real help desk — live chat, FAQs, and people who want you to succeed.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-features"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-section-head mk-section-head-light"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-eyebrow mk-eyebrow-light"
  }, "A Better Way to Learn Virtually"), /*#__PURE__*/React.createElement("h2", {
    className: "mk-h2",
    style: {
      color: '#fff'
    }
  }, "Everything you need to get it right.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-feature-grid"
  }, feats.map(f => /*#__PURE__*/React.createElement("article", {
    className: "mk-feature",
    key: f.t
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-feature-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: 'ph ' + f.icon
  })), /*#__PURE__*/React.createElement("h4", {
    className: "mk-feature-t"
  }, f.t), /*#__PURE__*/React.createElement("p", {
    className: "mk-feature-d"
  }, f.d)))));
}

/* ---------- Pricing ---------- */
function Pricing() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-section",
    id: "pricing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-eyebrow"
  }, "Pricing"), /*#__PURE__*/React.createElement("h2", {
    className: "mk-h2"
  }, "Simple plans for teams and individuals.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-pricing"
  }, /*#__PURE__*/React.createElement("article", {
    className: "mk-price"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mk-price-name"
  }, "Individual"), /*#__PURE__*/React.createElement("div", {
    className: "mk-price-amt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-price-cur"
  }, "$"), "29", /*#__PURE__*/React.createElement("span", {
    className: "mk-price-per"
  }, "/mo")), /*#__PURE__*/React.createElement("p", {
    className: "mk-price-sub"
  }, "For one learner advancing their career."), /*#__PURE__*/React.createElement("ul", {
    className: "mk-checklist"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " All 5 training rooms"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Certificates & badges"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Live class access")), /*#__PURE__*/React.createElement("a", {
    className: "mk-btn mk-btn-outline mk-btn-full",
    href: "#"
  }, "Start free trial")), /*#__PURE__*/React.createElement("article", {
    className: "mk-price mk-price-featured"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-price-flag"
  }, "Most popular"), /*#__PURE__*/React.createElement("h3", {
    className: "mk-price-name"
  }, "Organization"), /*#__PURE__*/React.createElement("div", {
    className: "mk-price-amt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-price-cur"
  }, "$"), "19", /*#__PURE__*/React.createElement("span", {
    className: "mk-price-per"
  }, "/seat/mo")), /*#__PURE__*/React.createElement("p", {
    className: "mk-price-sub"
  }, "For teams that need audit-ready compliance."), /*#__PURE__*/React.createElement("ul", {
    className: "mk-checklist"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Everything in Individual"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Admin portal & roster"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Compliance reports & deadlines"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }), " Priority help desk")), /*#__PURE__*/React.createElement("a", {
    className: "mk-btn mk-btn-primary mk-btn-full",
    href: "#"
  }, "Talk to sales"))));
}

/* ---------- Footer ---------- */
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "mk-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-footer-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-footer-brand"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mk-logo",
    href: "#top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-logo-mark"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-first-aid"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mk-logo-word"
  }, "Healthcare Training Center")), /*#__PURE__*/React.createElement("p", {
    className: "mk-footer-tag"
  }, "Empowering Knowledge. Enhancing Care.", /*#__PURE__*/React.createElement("br", null), "Building a Better Future.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-footer-cols"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Platform"), /*#__PURE__*/React.createElement("a", {
    href: "#tracks"
  }, "Training Rooms"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Live Classes"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Study Lounge"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Resources")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Company"), /*#__PURE__*/React.createElement("a", {
    href: "#story"
  }, "Our Story"), /*#__PURE__*/React.createElement("a", {
    href: "#pricing"
  }, "Pricing"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Careers")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Account"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Log In"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Start Free Trial"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "For Organizations")))), /*#__PURE__*/React.createElement("div", {
    className: "mk-footer-legal"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Healthcare Training Center. All rights reserved."), /*#__PURE__*/React.createElement("span", null, "Learn. Grow. Make a Difference.")));
}
Object.assign(window, {
  SiteNav,
  Hero,
  TracksRow,
  StorySection,
  AudienceSplit,
  FeatureGrid,
  Pricing,
  SiteFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/sections.jsx", error: String((e && e.message) || e) }); }

})();
