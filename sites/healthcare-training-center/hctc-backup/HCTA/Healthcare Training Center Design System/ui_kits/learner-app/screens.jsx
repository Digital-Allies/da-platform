// screens.jsx — Lobby + Room screens and the App shell.
// Relies on rooms.jsx + components.jsx. Exports App to window.

const { useState, useEffect } = React;

/* ---------- Lobby (Reception) ---------- */
function LobbyScreen({ onEnter }) {
  const overall = Math.round(
    100 * ROOMS.reduce((a, r) => a + r.done, 0) / ROOMS.reduce((a, r) => a + r.total, 0)
  );
  return (
    <div className="ln-lobby">
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
            <span>39 of 75 courses complete</span>
          </div>
        </div>
      </div>

      <div className="ln-lobby-grid-wrap">
        <div className="ln-section-label"><span>Choose Your Training Path</span></div>
        <div className="ln-roomgrid">
          {ROOMS.map(r => <RoomCard key={r.id} room={r} onEnter={onEnter} />)}
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
function RoomScreen({ room, onBack }) {
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
            {room.courses.map((c, i) => <CourseCard key={i} course={c} room={room} />)}
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

      <button className="ln-ask" style={{ background: room.color }}><i className="ph-fill ph-chat-circle-dots"></i> Ask a Question</button>
    </div>
  );
}

/* ---------- App shell with room-entry transition ---------- */
function App() {
  const [room, setRoom] = useState(null);
  const [entering, setEntering] = useState(false);

  const enter = (r) => {
    setEntering(true);
    setTimeout(() => { setRoom(r); setEntering(false); window.scrollTo(0, 0); }, 180);
  };
  const back = () => {
    setEntering(true);
    setTimeout(() => { setRoom(null); setEntering(false); window.scrollTo(0, 0); }, 150);
  };

  return (
    <div className="ln-app">
      <TopNav accent={room ? room.color : null} onLogo={back} room={room} />
      <main className={'ln-main' + (entering ? ' is-entering' : '')}>
        {room ? <RoomScreen room={room} onBack={back} /> : <LobbyScreen onEnter={enter} />}
      </main>
      <div className="ln-help"><i className="ph-fill ph-headset"></i></div>
    </div>
  );
}

window.App = App;
