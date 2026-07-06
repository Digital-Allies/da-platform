// store.jsx — Image-based Virtual Store lobby.
// Uses hero-lobby-2.png as the background plate with invisible clickable
// hotspots over each of the 5 stores. On select: the individual store tile
// pops forward and an info card slides in from the left.

const { useState: useStoreState, useEffect: useStoreEffect } = React;

/* ------------------------------------------------------------------ */
/*  HOTSPOT MAP — positions in hero-lobby-2.png as % of image size     */
/*  Each entry: cx/cy = center, rw/rh = half-width / half-height       */
/* ------------------------------------------------------------------ */
const HOTSPOTS = {
  cs:         { cx: 10,  cy: 58, rw: 11, rh: 24 },
  hipaa:      { cx: 27,  cy: 52, rw: 13, rh: 28 },
  compliance: { cx: 50,  cy: 46, rw: 13, rh: 30 },
  records:    { cx: 73,  cy: 52, rw: 13, rh: 28 },
  finance:    { cx: 90,  cy: 58, rw: 11, rh: 24 },
};

const STORE_IMG = {
  cs:         'assets/iso/store-cs.png',
  hipaa:      'assets/iso/store-hipaa.png',
  compliance: 'assets/iso/store-compliance.png',
  records:    'assets/iso/store-records.png',
  finance:    'assets/iso/store-finance.png',
};

const SUPPORT_SPACES = [
  { icon: 'ph-books',       label: 'Study Lounge',   sub: 'Study with peers'     },
  { icon: 'ph-archive',     label: 'Resource Center', sub: 'Tools & templates'    },
  { icon: 'ph-video-camera',label: 'Live Classrooms', sub: 'Join a live session'  },
  { icon: 'ph-headset',     label: 'Help Desk',       sub: "We're here for you"   },
];

/* ------------------------------------------------------------------ */
/*  STORE LOBBY                                                         */
/* ------------------------------------------------------------------ */
function StoreLobby({ rooms, onEnter, mode, onToggleMode }) {
  const [hovered,  setHovered]  = useStoreState(null);
  const [selected, setSelected] = useStoreState(null);

  const done    = rooms.reduce((a, r) => a + r.done,  0);
  const total   = rooms.reduce((a, r) => a + r.total, 0);
  const overall = Math.round(100 * done / total);

  // close popout with Escape
  useStoreEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const selRoom = selected ? rooms.find(r => r.id === selected) : null;
  const pct     = selRoom  ? Math.round((selRoom.done / selRoom.total) * 100) : 0;

  if (mode === 'list') {
    return (
      <div className="store-wrap">
        <StoreHeader overall={overall} done={done} total={total} mode={mode} onToggleMode={onToggleMode} />
        <LobbyScreen rooms={rooms} onEnter={onEnter} embedded />
      </div>
    );
  }

  return (
    <div className="store-wrap">
      <StoreHeader overall={overall} done={done} total={total} mode={mode} onToggleMode={onToggleMode} />

      {/* ---- scene ---- */}
      <div className="iso-scene-wrap">
      <div className={'iso-stage' + (selected ? ' has-selection' : '')}>

        {/* hero background */}
        <img src="assets/iso/hero-lobby-2.png" className="iso-bg-img" alt="Healthcare Training Center lobby" draggable="false" />

        {/* hotspot buttons */}
        {rooms.map(room => {
          const h = HOTSPOTS[room.id];
          if (!h) return null;
          const isHov = hovered  === room.id;
          const isSel = selected === room.id;
          const isOth = selected && !isSel;
          return (
            <button
              key={room.id}
              className={['iso-hotspot', isHov ? 'is-hover' : '', isSel ? 'is-sel' : '', isOth ? 'is-other' : ''].join(' ')}
              style={{ left: (h.cx - h.rw) + '%', top: (h.cy - h.rh) + '%', width: (h.rw * 2) + '%', height: (h.rh * 2) + '%', '--spot-color': room.color + '55' }}
              onMouseEnter={() => { if (!selected) setHovered(room.id); }}
              onMouseLeave={() => setHovered(null)}
              onClick={() => { setHovered(null); setSelected(isSel ? null : room.id); }}
              aria-label={'Open ' + room.name}
            >
              {/* glow ring on hover */}
              <span className="iso-glow-ring" style={{ '--c': room.color }} />
              {/* tiny pill label */}
              {!selected && (
                <span className="iso-pill" style={{ background: room.color }}>
                  <i className={'ph-fill ' + room.icon}></i>
                  <span>{room.name}</span>
                </span>
              )}
            </button>
          );
        })}

      </div>

        {/* dim overlay — outside stage */}
        {selected && <div className="iso-dim" onClick={() => setSelected(null)} />}

        {/* pop-out panel — outside stage */}
        {selRoom && (
          <div className="iso-popout" key={selRoom.id}>
            {/* info card — slides in from left */}
            <div className="iso-card" style={{ '--accent': selRoom.color, '--tint': selRoom.tint }}>
              <button className="iso-card-close" onClick={() => setSelected(null)} aria-label="Close">
                <i className="ph ph-x"></i>
              </button>
              <span className="iso-card-badge" style={{ background: selRoom.color }}>
                <i className={'ph-fill ' + selRoom.icon}></i>
              </span>
              <span className="iso-card-room">ROOM {selRoom.n}</span>
              <h2 className="iso-card-title">{selRoom.name}</h2>
              <p className="iso-card-why">{selRoom.why}</p>

              {pct > 0 && (
                <div className="iso-card-prog">
                  <div className="iso-card-track">
                    <div className="iso-card-fill" style={{ width: pct + '%', background: selRoom.color }} />
                  </div>
                  <span>{pct}% complete · {selRoom.done} of {selRoom.total} courses</span>
                </div>
              )}

              <button className="iso-card-cta" style={{ background: selRoom.color }}
                onClick={() => { setSelected(null); onEnter(selRoom); }}>
                Enter Room <i className="ph-bold ph-arrow-right"></i>
              </button>

              <p className="iso-card-courses">{selRoom.total} courses · All skill levels</p>
            </div>

            {/* store tile — pops out */}
            <div className="iso-tile">
              <img src={STORE_IMG[selRoom.id]} alt={selRoom.name + ' store'} />
            </div>
          </div>
        )}
      </div> {/* /iso-scene-wrap */}

      {/* support spaces strip */}
      <div className="store-spaces">
        <span className="store-spaces-lead">Also in the building</span>
        <div className="store-spaces-row">
          {SUPPORT_SPACES.map(s => (
            <button key={s.label} className="store-space">
              <span className="store-space-icon"><i className={'ph-fill ' + s.icon}></i></span>
              <span className="store-space-copy"><strong>{s.label}</strong><span>{s.sub}</span></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HEADER                                                              */
/* ------------------------------------------------------------------ */
function StoreHeader({ overall, done, total, mode, onToggleMode }) {
  return (
    <div className="store-head">
      <div className="store-head-copy">
        <p className="ln-eyebrow">Welcome to your learning journey</p>
        <h1 className="store-head-title">Choose Your Training Path</h1>
        <p className="store-head-sub">Step into any store to start a course. Everything you need is right here in the building.</p>
      </div>
      <div className="store-head-right">
        <div className="store-overall">
          <ProgressRing pct={overall} size={64} stroke={8} color="var(--color-teal)" label={overall + '%'} />
          <div className="store-overall-meta"><strong>Your progress</strong><span>{done} of {total} courses</span></div>
        </div>
        <div className="store-toggle" role="tablist" aria-label="Lobby view">
          <button className={'store-toggle-btn' + (mode === 'store' ? ' is-on' : '')} onClick={() => onToggleMode('store')} aria-selected={mode === 'store'}>
            <i className="ph-fill ph-storefront"></i> Store
          </button>
          <button className={'store-toggle-btn' + (mode === 'list'  ? ' is-on' : '')} onClick={() => onToggleMode('list')}  aria-selected={mode === 'list'}>
            <i className="ph ph-list"></i> List
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StoreLobby });
