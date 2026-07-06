// components.jsx — shared presentational components for the Learner App kit.
// Relies on rooms.jsx being loaded first. Exports to window at the end.

const { useState } = React;

/* ---------- Top Navigation ---------- */
function TopNav({ accent, onLogo, room }) {
  const links = ['Lobby', 'My Progress', 'Live Classes', 'Study Lounge', 'Resources'];
  const [active] = useState('Lobby');
  return (
    <header className="ln-nav" style={{ '--accent': accent || 'var(--color-teal)' }}>
      <div className="ln-nav-bar">
        <div className="ln-logo" onClick={onLogo} role="button" tabIndex={0}>
          <span className="ln-logo-mark"><i className="ph-fill ph-first-aid"></i></span>
          <span className="ln-logo-word">Healthcare Training Center</span>
        </div>
        <nav className="ln-links">
          {links.map(l => (
            <span key={l} className={'ln-link' + (l === active ? ' is-active' : '')}>{l}</span>
          ))}
        </nav>
        <div className="ln-nav-right">
          <button className="ln-iconbtn" aria-label="Notifications"><i className="ph-fill ph-bell"></i><span className="ln-dot"></span></button>
          <div className="ln-avatar">MD</div>
          <span className="ln-username">Maria D.</span>
        </div>
      </div>
      <div className="ln-accentbar"></div>
    </header>
  );
}

/* ---------- Button ---------- */
function Button({ variant = 'primary', size = 'md', accent, children, onClick, full }) {
  const style = {};
  if (variant === 'track' && accent) style.background = accent;
  return (
    <button
      className={`ln-btn ln-btn-${variant} ln-btn-${size}${full ? ' ln-btn-full' : ''}`}
      style={style} onClick={onClick}>
      {children}
    </button>
  );
}

/* ---------- Progress bar ---------- */
function ProgressBar({ pct, color }) {
  return (
    <div className="ln-track">
      <div className="ln-fill" style={{ width: pct + '%', background: color || 'var(--color-teal)' }}></div>
    </div>
  );
}

/* ---------- Progress ring ---------- */
function ProgressRing({ pct, size = 40, stroke = 5, color, label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="ln-ring">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color || 'var(--color-teal)'} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition: 'stroke-dashoffset .4s' }} />
      {label && <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
        fontFamily="Montserrat" fontWeight="800" fontSize={size*0.26} fill="var(--color-navy)">{label}</text>}
    </svg>
  );
}

/* ---------- Status pill ---------- */
function StatusPill({ status }) {
  const map = {
    'complete':    { t: 'Completed', cls: 'is-success', icon: 'ph-check-circle' },
    'in-progress': { t: 'In Progress', cls: 'is-warning', icon: null },
    'not-started': { t: 'Not Started', cls: 'is-muted', icon: null },
  };
  const s = map[status] || map['not-started'];
  return <span className={'ln-pill ' + s.cls}>{s.icon && <i className={'ph ' + s.icon}></i>}{s.t}</span>;
}

/* ---------- Room Entry Card (the "door") ---------- */
function RoomCard({ room, onEnter }) {
  const status = roomStatus(room);
  const pct = Math.round((room.done / room.total) * 100);
  const cta = roomCta(room);
  return (
    <article className={'ln-roomcard ln-status-' + status} onClick={() => onEnter(room)} role="button" tabIndex={0}>
      <div className="ln-roomcard-band" style={{ background: room.color }}>
        <span className="ln-roomnum">ROOM {room.n}</span>
        {status === 'complete' && <span className="ln-roomcheck"><i className="ph-bold ph-check"></i></span>}
        <i className={'ph-fill ' + room.icon}></i>
      </div>
      <div className="ln-roomcard-body">
        <h3 className="ln-roomname">{room.name}</h3>
        <p className="ln-roomdesc">{room.desc}</p>
        {status !== 'not-started' && (
          <div className="ln-roomprog">
            <ProgressBar pct={pct} color={status === 'complete' ? 'var(--color-success)' : room.color} />
            <span className="ln-roomprog-lbl">{room.done} of {room.total} courses</span>
          </div>
        )}
        <Button variant="track" accent={room.color} full>{cta} <i className="ph-bold ph-arrow-right"></i></Button>
      </div>
    </article>
  );
}

/* ---------- Course Card ---------- */
function CourseCard({ course, room }) {
  let action = 'Start', icon = 'ph-circle-dashed', label = 'Not started';
  if (course.pct === 100) { action = 'Review'; icon = 'ph-check-circle'; label = 'Completed'; }
  else if (course.pct > 0) { action = 'Continue'; label = course.pct + '% done'; }
  return (
    <article className="ln-course">
      <div className="ln-course-thumb" style={{ background: room.color }}>
        <i className={'ph ' + room.icon}></i>
      </div>
      <div className="ln-course-body">
        <div className="ln-course-meta">
          <span className="ln-tag">{course.min} MIN</span>
          <span className="ln-tag">{course.lvl.toUpperCase()}</span>
        </div>
        <h4 className="ln-course-title">{course.t}</h4>
        <div className="ln-course-foot">
          <span className="ln-course-status"><i className={'ph ' + icon}></i> {label}</span>
          <span className="ln-course-go" style={{ color: room.color }}>{action} →</span>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { TopNav, Button, ProgressBar, ProgressRing, StatusPill, RoomCard, CourseCard });
