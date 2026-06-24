// scrolls.jsx — iframe-based animated portfolio scroll clips

const ALL_PROJECTS = [
  {
    id: "integration-studio",
    name: "AI Web Studio",
    src: "uploads/Webpage Integration Studio.html",
    category: "Web Tools",
    problem: "Dev cycles too slow — clients couldn't visualize changes before launch.",
    solution: "Live AI integration studio: edit, inspect, and preview in one view.",
  },
  {
    id: "lead-manager",
    name: "Lead Management System",
    src: "uploads/lead-generator.html",
    category: "CRM / Automation",
    problem: "Leads falling through the cracks of a shared spreadsheet.",
    solution: "Full CRM with pipeline stages, analytics dashboard, and CSV export.",
  },
  {
    id: "e17",
    name: "E17 Cooperative Intranet",
    src: "uploads/e17.html",
    category: "Community Platform",
    problem: "A 40-member co-op running entirely on group texts and email chains.",
    solution: "Private intranet: docs, announcements, and a member directory.",
  },
  {
    id: "chapter-vine",
    name: "Chapter & Vine Books",
    src: "uploads/bookstore.html",
    category: "Retail",
    problem: "A beloved indie bookstore with zero online presence.",
    solution: "Immersive catalog site with inventory, events, and direct orders.",
  },
  {
    id: "gourmet-bites",
    name: "Gourmet Bites",
    src: "uploads/gourmet-eats.html",
    category: "Food & Beverage",
    problem: "Phone-only ordering — staff spending hours per shift on calls.",
    solution: "Online ordering with live menu, cart, and checkout.",
  },
  {
    id: "publishing-suite",
    name: "Book Development Suite",
    src: "uploads/Book Development & Publishing Suite_generalized.html",
    category: "Publishing",
    problem: "A multi-title series tracked across scattered docs and inboxes.",
    solution: "Centralized suite with drafts, timelines, and contributor tools.",
  },
  {
    id: "accessibility",
    name: "ADA Accessibility Guide",
    src: "uploads/accessibility-guide.html",
    category: "Compliance",
    problem: "Clients with no idea whether their sites met ADA standards.",
    solution: "Interactive compliance guide with checklists, scoring, and fixes.",
  },
  {
    id: "seo-auditor",
    name: "SEO Audit Assistant",
    src: "uploads/SEO_auditor.html",
    category: "SEO",
    problem: "Sites buried in search results with no insight into why.",
    solution: "Automated audit tool with scores and step-by-step recommendations.",
  },
  {
    id: "main-street",
    name: "Main Street Market",
    src: "uploads/main_st_market.html",
    category: "Local Commerce",
    problem: "A local market with no digital presence for 20+ artisan vendors.",
    solution: "Vendor showcase with shop listings, artisan profiles, and online store.",
  },
];

// ── Core iframe scroll clip ───────────────────────────────────────────────
function IframeScrollClip({ clipWidth, clipHeight, src, srcDoc, project, speed = 55, iframeWidth = 1200, iframeScale = 1, loop = true, showCaption = true, startDelay = 900 }) {
  const iframeRef = React.useRef(null);
  const frameRef  = React.useRef(null);
  const posRef    = React.useRef(0);
  const readyRef  = React.useRef(false);
  const startRef  = React.useRef(null);
  const iframeH   = clipHeight / iframeScale;

  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    function onLoad() {
      readyRef.current = true;
      try {
        const s = iframe.contentDocument.createElement('style');
        // Hide scrollbars + un-hide any overflow:hidden that would block scrollTo
        s.textContent = [
          '::-webkit-scrollbar{display:none!important}',
          'html,body{scrollbar-width:none!important;-ms-overflow-style:none!important;}',
          // Some apps set overflow:hidden on body — override so scrollTo works
          'html{overflow-y:auto!important}',
          'body{overflow-y:auto!important;overflow-x:hidden!important}',
        ].join('');
        iframe.contentDocument.head.appendChild(s);
      } catch(e) {}
    }
    iframe.addEventListener('load', onLoad);

    let last = null;
    function tick(ts) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      if (readyRef.current && iframe.contentWindow && elapsed >= startDelay) {
        try {
          const sh  = iframe.contentDocument.documentElement.scrollHeight;
          const max = Math.max(0, sh - iframeH);
          if (last !== null && max > 0) {
            posRef.current += (speed * (ts - last)) / 1000;
            if (posRef.current >= max) posRef.current = loop ? 0 : max;
          }
          if (max > 0) iframe.contentWindow.scrollTo(0, posRef.current);
          last = ts;
        } catch(e) {}
      }
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      try { iframe.removeEventListener('load', onLoad); } catch(e) {}
    };
  }, [speed, iframeH, loop, startDelay]);

  const pad = (n) => clipWidth * n;

  return (
    <div style={{
      width: clipWidth, height: clipHeight,
      position: 'relative', overflow: 'hidden',
      fontFamily: "var(--font-body,'JetBrains Mono',monospace)",
      background: '#F9F6F0',
    }}>
      {/* Outer DA border */}
      <div style={{ position:'absolute', inset:0, border:'1px solid #2D2D2D', zIndex:10, pointerEvents:'none' }} />

      {/* Scrolling iframe */}
      <iframe
        ref={iframeRef}
        {...(srcDoc ? { srcDoc } : { src })}
        title={project.name}
        style={{
          width: iframeWidth,
          height: iframeH,
          border: 'none',
          display: 'block',
          transformOrigin: 'top left',
          transform: `scale(${iframeScale})`,
          pointerEvents: 'none',
        }}
      />

      {/* Caption gradient fade */}
      {showCaption && (
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(249,246,240,0.96) 30%)',
        padding: `${pad(0.06)}px ${pad(0.048)}px ${pad(0.035)}px`,
        zIndex: 8,
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: pad(0.016) }}>
          <div style={{ flex:1, minWidth:0 }}>
            <Eyebrow size={pad(0.011)} color="#7a6f5e">{`PAST PROJECT · ${project.category.toUpperCase()}`}</Eyebrow>
            <div style={{
              fontFamily: "var(--font-headers,'Lexend Deca',sans-serif)",
              fontSize: pad(0.026), fontWeight: 600, marginTop: pad(0.004),
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{project.name}</div>
            <div style={{ fontSize: pad(0.013), color:'#5a5347', marginTop: pad(0.006), lineHeight: 1.45 }}>
              <span style={{ color:'#C5301A', marginRight:4 }}>↑</span>{project.problem}<br/>
              <span style={{ color:'#3A7BD5', marginRight:4 }}>↓</span>{project.solution}
            </div>
          </div>
          <div style={{ textAlign:'right', flexShrink:0, paddingLeft: pad(0.016) }}>
            <SignalDot size={pad(0.011)} />
            <div style={{ fontSize: pad(0.011), marginTop:5, color:'#7a6f5e', letterSpacing:'0.04em' }}>digitalallies.net</div>
          </div>
        </div>
      </div>
      )}

      {/* Progress rail */}
      <ProgressRail posRef={posRef} iframeRef={iframeRef} iframeH={iframeH} />
    </div>
  );
}

function ProgressRail({ posRef, iframeRef, iframeH }) {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => {
      try {
        const sh  = iframeRef.current?.contentDocument?.documentElement?.scrollHeight ?? 0;
        const max = Math.max(1, sh - iframeH);
        setPct(Math.min((posRef.current / max) * 100, 100));
      } catch(e) {}
    }, 80);
    return () => clearInterval(t);
  }, [iframeH]);
  return (
    <div style={{ position:'absolute', top:0, left:0, right:0, height:2, zIndex:9, background:'rgba(45,45,45,0.08)' }}>
      <div style={{ height:'100%', width:`${pct}%`, background:'#C5301A', transition:'width 0.06s linear' }} />
    </div>
  );
}

// ── Live-site placeholder card (for Figma / external URLs) ───────────────
function ExternalSiteCard({ clipWidth, clipHeight, url, label, project }) {
  const pad = (n) => clipWidth * n;
  return (
    <div style={{
      width: clipWidth, height: clipHeight,
      position: 'relative', overflow: 'hidden',
      background: '#F9F6F0',
      backgroundImage: laceBg(20, 0.065),
      fontFamily: "var(--font-body,'JetBrains Mono',monospace)",
      color: '#2D2D2D',
    }}>
      <div style={{ position:'absolute', inset:0, border:'1px solid #2D2D2D', pointerEvents:'none' }} />
      {/* Corner ticks */}
      {[
        { top:36, left:36, borderTop:'1px solid', borderLeft:'1px solid', transform:'translate(-1px,-1px)' },
        { top:36, right:36, borderTop:'1px solid', borderRight:'1px solid', transform:'translate(1px,-1px)' },
        { bottom:36, left:36, borderBottom:'1px solid', borderLeft:'1px solid', transform:'translate(-1px,1px)' },
        { bottom:36, right:36, borderBottom:'1px solid', borderRight:'1px solid', transform:'translate(1px,1px)' },
      ].map((s,i) => (
        <div key={i} style={{ position:'absolute', width:24, height:24, borderColor:'#2D2D2D', ...s }} />
      ))}

      {/* Center content */}
      <div style={{
        position:'absolute', inset:0,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        gap: pad(0.025),
        padding: `0 ${pad(0.08)}px`,
      }}>
        {/* Radial burst — mini version of vibe cover motif */}
        <svg width={pad(0.22)} height={pad(0.22)} viewBox="0 0 200 200" style={{ opacity:0.15 }}>
          {Array.from({length:24},(_,i) => {
            const a = (i/24)*360*Math.PI/180;
            return <line key={i} x1={100+Math.cos(a)*28} y1={100+Math.sin(a)*28} x2={100+Math.cos(a)*90} y2={100+Math.sin(a)*90} stroke="#2D2D2D" strokeWidth="1"/>;
          })}
          <circle cx="100" cy="100" r="28" fill="none" stroke="#2D2D2D" strokeWidth="1"/>
          <circle cx="100" cy="100" r="12" fill="#C5301A"/>
        </svg>

        <div>
          <Eyebrow size={pad(0.012)} color="#7a6f5e" style={{ textAlign:'center', marginBottom: pad(0.012) }}>
            {project ? `PAST PROJECT · ${project.category.toUpperCase()}` : 'LIVE DEMO'}
          </Eyebrow>
          <div style={{
            fontFamily: "var(--font-headers,'Lexend Deca',sans-serif)",
            fontSize: pad(0.034), fontWeight: 700,
            lineHeight: 1.0, letterSpacing: '-0.02em',
            textAlign: 'center',
          }}>{label}</div>
          {project && (
            <div style={{ fontSize: pad(0.014), color:'#5a5347', marginTop: pad(0.014), lineHeight:1.55, textAlign:'center' }}>
              <span style={{ color:'#C5301A', marginRight:4 }}>↑</span>{project.problem}<br/>
              <span style={{ color:'#3A7BD5', marginRight:4 }}>↓</span>{project.solution}
            </div>
          )}
        </div>

        {/* URL box */}
        <div style={{
          marginTop: pad(0.02),
          border: '1px solid #2D2D2D',
          padding: `${pad(0.012)}px ${pad(0.024)}px`,
          display:'flex', alignItems:'center', gap: pad(0.012),
        }}>
          <SignalDot size={pad(0.01)} />
          <span style={{ fontSize: pad(0.013), letterSpacing:'0.04em', color:'#5a5347' }}>{url}</span>
        </div>
        <div style={{ fontSize: pad(0.012), color:'#7a6f5e', textAlign:'center', lineHeight:1.5 }}>
          Live site — can't iframe (external host).<br/>Click to open in browser.
        </div>
      </div>
    </div>
  );
}

// ── X / Twitter 16:9 wrapper ─────────────────────────────────────────────
function XScrollClip({ project, speed }) {
  return (
    <IframeScrollClip
      clipWidth={1200} clipHeight={675}
      src={project.src} project={project} speed={speed}
      iframeWidth={1200} iframeScale={1}
    />
  );
}

// ── IG Reel 9:16 wrapper ──────────────────────────────────────────────────
function ReelScrollClip({ project, speed }) {
  return (
    <IframeScrollClip
      clipWidth={1080} clipHeight={1920}
      src={project.src} project={project} speed={speed}
      iframeWidth={480} iframeScale={1080/480}
    />
  );
}

// ── IG Square 1:1 wrapper ────────────────────────────────────────────────
function SquareScrollClip({ project, speed }) {
  return (
    <IframeScrollClip
      clipWidth={1080} clipHeight={1080}
      src={project.src} project={project} speed={speed}
      iframeWidth={1080} iframeScale={1}
    />
  );
}

Object.assign(window, {
  ALL_PROJECTS,
  IframeScrollClip, ProgressRail,
  XScrollClip, ReelScrollClip, SquareScrollClip,
  ExternalSiteCard,
});
