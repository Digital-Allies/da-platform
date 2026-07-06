// screens.jsx — Lobby + Room screens and the App shell (with lesson flow,
// live progress, mobile bottom-nav, and Tweaks). Loads after rooms, components,
// lessons, and tweaks-panel. Renders <App/>.

const { useState, useEffect, useMemo } = React;

/* =====================================================================
   PROGRESS MODEL — a mutable overlay on the static ROOMS data.
   Key: `${roomId}::${courseTitle}` -> pct (0..100). Seeded from ROOMS,
   persisted to localStorage, lifted to App so completing a lesson
   updates the lobby + room views live.
   ===================================================================== */
const PROG_KEY = 'htc-progress-v1';
function seedProgress() {
  const seed = {};
  ROOMS.forEach(r => r.courses.forEach(c => { seed[r.id + '::' + c.t] = c.pct; }));
  try {
    const saved = JSON.parse(localStorage.getItem(PROG_KEY) || '{}');
    Object.assign(seed, saved);
  } catch (e) {}
  return seed;
}

function useProgress() {
  const [prog, setProg] = useState(seedProgress);
  useEffect(() => { try { localStorage.setItem(PROG_KEY, JSON.stringify(prog)); } catch (e) {} }, [prog]);
  const setPct = (roomId, title, pct) => setProg(p => ({ ...p, [roomId + '::' + title]: pct }));
  const reset = () => { try { localStorage.removeItem(PROG_KEY); } catch (e) {} setProg(seedProgress()); };
  return [prog, setPct, reset];
}

// Build live room objects from the progress overlay.
function liveRoom(r, prog) {
  const courses = r.courses.map(c => ({ ...c, pct: prog[r.id + '::' + c.t] ?? c.pct }));
  const done = courses.filter(c => c.pct === 100).length;
  return { ...r, courses, done, total: courses.length };
}

/* ---------- Lobby (Reception) ---------- */
function LobbyScreen({ rooms, onEnter, embedded }) {
  const done = rooms.reduce((a, r) => a + r.done, 0);
  const total = rooms.reduce((a, r) => a + r.total, 0);
  const overall = Math.round(100 * done / total);
  return (
    <div className={'ln-lobby' + (embedded ? ' is-embedded' : '')}>
      {!embedded && (
      <div className="ln-lobby-head">
        <div>
          <p className="ln-eyebrow">Welcome back</p>
          <h1 className="ln-lobby-title">Hello, Maria</h1>
          <p className="ln-lobby-sub">Choose your training path — step into any room to pick up where you left off.</p>
        </div>
        <div className="ln-overall">
          <ProgressRing pct={overall} size={108} stroke={12} color="var(--color-teal)" label={overall + '%'} />
          <div className="ln-overall-meta">
            <strong>Overall progress</strong>
            <span>{done} of {total} courses complete</span>
          </div>
        </div>
      </div>
      )}

      <div className="ln-lobby-grid-wrap">
        {!embedded && <div className="ln-section-label"><span>Choose Your Training Path</span></div>}
        <div className="ln-roomgrid">
          {rooms.map(r => <RoomCard key={r.id} room={r} onEnter={onEnter} />)}
          <aside className="ln-lobby-aside">
            <div className="ln-aside-card ln-aside-live">
              <span className="ln-live-badge"><span className="ln-live-dot"></span> LIVE NOW</span>
              <h4>HIPAA Basics — Live Class</h4>
              <p>With instructor Dr. Alan Reyes</p>
              <Button variant="secondary" size="sm">Join Live Class</Button>
            </div>
            <div className="ln-aside-card">
              <p className="ln-eyebrow">Upcoming</p>
              <h4 className="ln-aside-h">Study Group Session</h4>
              <p className="ln-aside-p"><i className="ph ph-calendar-blank"></i> May 22, 2026 · 6:00 PM EST</p>
              <a className="ln-aside-link">View calendar →</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ---------- Room (immersive) ---------- */
function RoomScreen({ room, onBack, onOpenCourse }) {
  const pct = Math.round((room.done / room.total) * 100);
  return (
    <div className="ln-room" style={{ '--accent': room.color, '--tint': room.tint, background: room.tint }}>
      <div className="ln-room-banner" style={{ background: room.color }}>
        <div className="ln-room-banner-inner">
          <button className="ln-back" onClick={onBack}><i className="ph-bold ph-arrow-left"></i> Back to Lobby</button>
          <div className="ln-room-banner-main">
            <span className="ln-room-banner-icon"><i className={'ph-fill ' + room.icon}></i></span>
            <div>
              <span className="ln-room-banner-num">ROOM {room.n}</span>
              <h1 className="ln-room-banner-name">{room.name}</h1>
              <p className="ln-room-banner-tag">{room.desc}</p>
            </div>
            <div className="ln-room-banner-prog">
              <span className="ln-room-banner-pct">{room.done} of {room.total} complete</span>
              <div className="ln-track ln-track-oncolor"><div className="ln-fill" style={{ width: pct + '%', background: '#fff' }}></div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="ln-room-body">
        <div className="ln-breadcrumb"><span onClick={onBack}>Lobby</span> <i className="ph ph-caret-right"></i> <strong>{room.name}</strong></div>
        <div className="ln-room-cols">
          <div className="ln-coursegrid">
            {room.courses.map((c, i) => <CourseCard key={i} course={c} room={room} pct={c.pct} onOpen={() => onOpenCourse(c)} />)}
          </div>
          <aside className="ln-room-aside">
            <div className="ln-why" style={{ borderTopColor: room.color }}>
              <p className="ln-eyebrow" style={{ color: room.color }}>Why This Room Matters</p>
              <p className="ln-why-text">{room.why}</p>
            </div>
            <div className="ln-forum" style={{ background: room.tint }}>
              <i className={'ph-fill ' + room.icon} style={{ color: room.color }}></i>
              <div>
                <strong>Got questions?</strong>
                <span>Ask in the {room.name} forum →</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ---------- Completion toast ---------- */
function Toast({ room, course, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4200); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="htc-toast" role="status">
      <span className="htc-toast-mark" style={{ background: room.color }}><i className="ph-fill ph-seal-check"></i></span>
      <div className="htc-toast-copy">
        <strong>Course complete</strong>
        <span>{course.t} · progress updated</span>
      </div>
      <button className="htc-toast-x" onClick={onClose} aria-label="Dismiss"><i className="ph ph-x"></i></button>
    </div>
  );
}

/* ---------- Mobile bottom tab bar ---------- */
function BottomNav({ view, onHome }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'ph-house', active: view !== 'progress' },
    { id: 'progress', label: 'Progress', icon: 'ph-chart-bar', active: false },
    { id: 'classes', label: 'Classes', icon: 'ph-video-camera', active: false },
    { id: 'profile', label: 'Profile', icon: 'ph-user', active: false },
  ];
  return (
    <nav className="htc-bottomnav">
      {tabs.map(t => (
        <button key={t.id} className={'htc-tab' + (t.active ? ' is-active' : '')} onClick={t.id === 'home' ? onHome : undefined}>
          <i className={'ph' + (t.active ? '-fill' : '') + ' ' + t.icon}></i>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* =====================================================================
   APP SHELL — lobby → room → lesson, with the room-entry transition,
   live progress, completion toast, mobile nav, and Tweaks.
   ===================================================================== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "pageBg": "surface",
  "density": "comfortable",
  "reduceMotion": false
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [prog, setPct] = useProgress();
  const [view, setView] = useState('lobby');      // 'lobby' | 'room' | 'lesson'
  const [lobbyMode, setLobbyMode] = useState(() => {
    try { return localStorage.getItem('htc-lobby-mode') || 'store'; } catch (e) { return 'store'; }
  });
  const [roomId, setRoomId] = useState(null);
  const [course, setCourse] = useState(null);
  const [entering, setEntering] = useState(false);
  const [toast, setToast] = useState(null);

  const rooms = useMemo(() => ROOMS.map(r => liveRoom(r, prog)), [prog]);
  const room = roomId ? rooms.find(r => r.id === roomId) : null;

  // apply tweaks to the page
  useEffect(() => {
    document.body.style.background = t.pageBg === 'cream' ? 'var(--color-cream)' : 'var(--bg-page)';
  }, [t.pageBg]);

  const dur = t.reduceMotion ? 0 : 1;
  const transition = (fn, ms) => {
    if (!dur) { fn(); window.scrollTo(0, 0); return; }
    setEntering(true);
    setTimeout(() => { fn(); setEntering(false); window.scrollTo(0, 0); }, ms);
  };

  const enterRoom = (r) => transition(() => { setRoomId(r.id); setView('room'); }, 180);
  const backToLobby = () => transition(() => { setView('lobby'); setRoomId(null); setCourse(null); }, 150);
  const openCourse = (c) => transition(() => { setCourse(c); setView('lesson'); }, 180);
  const backToRoom = () => transition(() => { setView('room'); setCourse(null); }, 150);

  const completeCourse = () => {
    if (room && course) {
      setPct(room.id, course.t, 100);
      const completedCourse = course;
      transition(() => { setView('room'); setCourse(null); }, 180);
      setToast({ room, course: completedCourse });
    }
  };

  const accent = room ? room.color : null;
  const setMode = (m) => { setLobbyMode(m); try { localStorage.setItem('htc-lobby-mode', m); } catch (e) {} };

  return (
    <div className={'ln-app' + (t.density === 'compact' ? ' is-compact' : '')}>
      <TopNav accent={accent} onLogo={backToLobby} room={room} />
      <main className={'ln-main' + (entering ? ' is-entering' : '')}>
        {view === 'lobby' && <StoreLobby rooms={rooms} onEnter={enterRoom} mode={lobbyMode} onToggleMode={setMode} />}
        {view === 'room' && room && <RoomScreen room={room} onBack={backToLobby} onOpenCourse={openCourse} />}
        {view === 'lesson' && room && course && (
          <LessonScreen room={room} course={course} onBack={backToRoom} onComplete={completeCourse} />
        )}
      </main>

      {toast && <Toast room={toast.room} course={toast.course} onClose={() => setToast(null)} />}
      <BottomNav view={view} onHome={backToLobby} />
      <div className="ln-help" title="Help Desk"><i className="ph-fill ph-headset"></i></div>

      <TweaksPanel>
        <TweakSection label="Appearance" />
        <TweakRadio label="Page background" value={t.pageBg} options={['surface', 'cream']}
                    onChange={(v) => setTweak('pageBg', v)} />
        <TweakRadio label="Density" value={t.density} options={['comfortable', 'compact']}
                    onChange={(v) => setTweak('density', v)} />
        <TweakSection label="Motion" />
        <TweakToggle label="Reduce motion" value={t.reduceMotion}
                     onChange={(v) => setTweak('reduceMotion', v)} />
      </TweaksPanel>
    </div>
  );
}

window.App = App;
