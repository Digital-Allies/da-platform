/* ============================================================
   VIEWS — Dashboard · Upsell (plan gate) · Embed (live site/admin)
   Exported on window.
   ============================================================ */
(function () {
  const { useState, useRef } = React;
  const Icon = window.Icon;
  const Store = window.CMSWorkspace;

  // ── Dashboard ───────────────────────────────────────────────
  function Dashboard({ client, go, onViewSite }) {
    const s = client.site;
    const unread = (s.messages || []).filter((m) => !m.read).length;
    const drafts = (s.pages || []).filter((p) => p.status === 'draft').length + (s.articles || []).filter((a) => a.status === 'draft').length;
    const tasks = (s.projects || []).reduce((n, p) => n + p.tasks.length, 0);
    const canProjects = Store.can(client, 'projects');
    const stats = [
      { label: 'Pages', value: (s.pages || []).length, sub: drafts + ' draft' + (drafts === 1 ? '' : 's'), icon: 'fileText', go: () => go('content', 'pages') },
      { label: 'Articles', value: (s.articles || []).length, sub: 'in the Journal', icon: 'book', go: () => go('content', 'articles') },
      { label: 'Open tasks', value: canProjects ? tasks : '—', sub: canProjects ? 'across boards' : 'Studio plan', icon: 'grid', go: () => go('projects') },
      { label: 'Unread', value: unread, sub: (s.messages || []).length + ' transmissions', icon: 'message', alert: unread > 0, go: () => go('content', 'messages') },
    ];
    return (
      <div className="ws-page">
        <div className="ws-head">
          <div>
            <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Dashboard</div>
            <h1>{client.name}</h1>
            <div className="ws-head__sub">{client.domain} · {Store.plan(client.plan).name} plan</div>
          </div>
          <div className="ws-head__actions"><button className="ws-btn" onClick={onViewSite}><Icon name="external" size={13} /> View live site</button></div>
        </div>
        <div className="ws-stat-grid">
          {stats.map((st) => (
            <button className="ws-stat" key={st.label} onClick={st.go}>
              <div className="ws-stat__top"><Icon name={st.icon} size={15} />{st.alert && <span className="da-signal-dot" style={{ width: 10, height: 10 }} />}</div>
              <span className="ws-stat__val">{st.value}</span>
              <span className="ws-stat__label">{st.label}</span>
              <span className="ws-stat__sub">{st.sub}</span>
            </button>
          ))}
        </div>

        <div className="ws-subhead">Quick actions</div>
        <div className="ws-quick-grid">
          <button className="ws-quick" onClick={() => go('content', 'pages')}><Icon name="layout" size={16} /><span>Build a page</span><Icon name="arrowRight" size={14} /></button>
          <button className="ws-quick" onClick={() => go('content', 'articles')}><Icon name="fileText" size={16} /><span>Write an article</span><Icon name="arrowRight" size={14} /></button>
          <button className="ws-quick" onClick={() => go('content', 'settings')}><Icon name="settings" size={16} /><span>Edit site settings</span><Icon name="arrowRight" size={14} /></button>
          <button className="ws-quick" onClick={() => go('content', 'messages')}><Icon name="message" size={16} /><span>Read transmissions</span><Icon name="arrowRight" size={14} /></button>
        </div>

        <div className="da-pinned" style={{ marginTop: 32, padding: '30px 20px 16px' }}>
          <strong>Connected, not copied.</strong> This workspace and {client.domain} read from the same source. Save a change, hit <em>View live site</em>, and it&rsquo;s already there.
        </div>
      </div>
    );
  }

  // ── Upsell (plan gate) ──────────────────────────────────────
  function Upsell({ client, moduleId, onPlan }) {
    const mod = Store.MODULES.find((m) => m.id === moduleId);
    const target = Store.PLANS.find((p) => p.modules.includes(moduleId));
    return (
      <div className="ws-page">
        <div className="ws-upsell">
          <div className="ws-upsell__lock"><Icon name="lock" size={22} /></div>
          <h1>{mod.brand} is a {target.name} feature</h1>
          <p>{client.name} is on the <strong>{Store.plan(client.plan).name}</strong> plan. Upgrade to <strong>{target.name}</strong> to unlock {mod.brand.toLowerCase()} — and everything below it.</p>
          <div className="ws-plans">
            {Store.PLANS.map((pl) => {
              const isCur = pl.id === client.plan;
              const isTarget = pl.id === target.id;
              return (
                <div key={pl.id} className={'ws-plan' + (isCur ? ' is-current' : '') + (isTarget && !isCur ? ' is-target' : '')}>
                  <div className="ws-plan__name">{pl.name}{isCur && <span className="ws-plan-tag ws-plan-tag--studio">Current</span>}</div>
                  <div className="ws-plan__price">{pl.price}</div>
                  <div className="ws-plan__blurb">{pl.blurb}</div>
                  <div className="ws-plan__mods">
                    {Store.MODULES.map((m) => {
                      const on = pl.modules.includes(m.id);
                      return <div key={m.id} className={'ws-plan__mod' + (on ? '' : ' is-off')}><Icon name={on ? 'check' : 'x'} size={13} color={on ? 'var(--accent)' : 'currentColor'} />{m.brand}</div>;
                    })}
                  </div>
                  <div className="ws-plan__cta">
                    {isCur ? <button className="ws-btn ws-btn--sm" disabled style={{ width: '100%' }}>You&rsquo;re here</button>
                      : <button className="ws-btn ws-btn--primary ws-btn--sm" style={{ width: '100%' }} onClick={() => onPlan(pl.id)}>Switch to {pl.name}</button>}
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ marginTop: 20, fontSize: 11 }}>Demo — switching plans is instant and reversible from the client switcher.</p>
        </div>
      </div>
    );
  }

  // ── Embed (live site / admin panel) ─────────────────────────
  function Embed({ client, onBack }) {
    const hasAdmin = !!client.admin_url;
    const [view, setView] = useState('live');
    const frameRef = useRef(null);
    const url = view === 'live' ? client.live_url : client.admin_url;
    return (
      <div className="ws-embed">
        <div className="ws-embed__bar">
          <button className="ws-btn ws-btn--ghost ws-btn--sm" onClick={onBack}><Icon name="chevronLeft" size={14} /> Back to workspace</button>
          <div className="ws-embed__seg">
            <button className={view === 'live' ? 'is-on' : ''} onClick={() => setView('live')}><Icon name="globe" size={13} /> Live site</button>
            <button className={view === 'admin' ? 'is-on' : ''} onClick={() => setView('admin')} disabled={!hasAdmin} title={hasAdmin ? '' : 'No admin panel linked'}><Icon name="lock" size={13} /> Admin panel</button>
          </div>
          <div className="ws-embed__url"><Icon name="lock" size={11} /><span>{url}</span></div>
          <button className="ws-icon-btn" title="Reload" onClick={() => { if (frameRef.current) frameRef.current.src = frameRef.current.src; }}><Icon name="refresh" size={14} /></button>
          <a className="ws-btn ws-btn--sm" href={url} target="_blank" rel="noopener"><Icon name="external" size={13} /> Open</a>
        </div>
        {view === 'admin' && !hasAdmin ? (
          <div className="ws-embed__frame" style={{ display: 'grid', placeItems: 'center', background: 'var(--bg-alt)' }}>
            <div style={{ textAlign: 'center', maxWidth: 360 }}><Icon name="plug" size={28} color="var(--fg-soft)" /><p className="da-small" style={{ marginTop: 12 }}>No external admin panel linked for {client.name}. This client is managed entirely inside the workspace.</p></div>
          </div>
        ) : (
          <iframe ref={frameRef} className="ws-embed__frame" src={url} title={view + ' view'} loading="lazy" referrerPolicy="no-referrer" />
        )}
      </div>
    );
  }

  Object.assign(window, { WsDashboard: Dashboard, WsUpsell: Upsell, WsEmbed: Embed });
})();
