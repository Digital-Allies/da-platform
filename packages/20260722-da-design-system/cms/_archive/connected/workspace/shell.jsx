/* ============================================================
   SHELL — orchestrates the CMS workspace.
   Top bar (brand · client switcher · ⌘K · sync), module nav with
   plan-gating, content/projects/dashboard routing, embed view,
   command palette, tweaks, toast. Mounts everything.
   ============================================================ */
(function () {
  const { useState, useEffect, useCallback, useRef } = React;
  const Icon = window.Icon;
  const Store = window.CMSWorkspace;

  function useStore() {
    const [s, setS] = useState(Store.get());
    useEffect(() => Store.subscribe((x) => setS({ ...x })), []);
    return s;
  }

  const BLOCK_DEFAULTS = {
    hero: { eyebrow: 'BASED IN KINGMAN, AZ', heading: 'A headline worth reading', body: 'One clear supporting sentence underneath.', cta: 'Inquire Within' },
    richtext: { heading: 'Section heading', body: 'Write something plain and useful here.' },
    departments: { heading: 'The Departments', sub: 'Four distinct operations. One point of contact.' },
    fieldNotes: { heading: 'Field Notes' },
    cta: { heading: 'Need a strategic ally?', button: 'Send a Transmission' },
  };

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    navLayout: 'sidebar',
    startClient: 'da',
  }/*EDITMODE-END*/;

  function App() {
    const data = useStore();
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
    const [moduleId, setModuleId] = useState('dashboard');
    const [contentTab, setContentTab] = useState('pages');
    const [embed, setEmbed] = useState(false);
    const [clientMenu, setClientMenu] = useState(false);
    const [cmdOpen, setCmdOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [syncing, setSyncing] = useState(false);

    const client = data.clients.find((c) => c.id === data.activeClient) || data.clients[0];

    useEffect(() => { if (t.startClient && t.startClient !== data.activeClient) Store.setActive(t.startClient); }, [t.startClient]);

    const fireToast = useCallback((text) => {
      setToast({ id: Date.now(), text }); setSyncing(true);
      setTimeout(() => setSyncing(false), 1000);
      setTimeout(() => setToast((c) => (c && Date.now() - c.id >= 2900 ? null : c)), 3000);
    }, []);

    // ── ⌘K listener ───────────────────────────────────────────
    useEffect(() => {
      const h = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmdOpen((o) => !o); }
      };
      window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
    }, []);

    // ── Store mutation helpers (scoped to active client) ──────
    const mut = (fn) => Store.update((d) => { const c = d.clients.find((x) => x.id === d.activeClient); fn(c.site, c, d); });
    const touch = (page) => { page.updated_at = new Date().toISOString(); };

    const actions = {
      // pages / builder
      savePage(page, publish) {
        mut((site) => {
          const i = site.pages.findIndex((p) => p.id === page.id);
          const next = { ...page, status: publish ? 'published' : page.status };
          touch(next);
          if (i >= 0) site.pages[i] = next; else site.pages.unshift(next);
        });
        if (publish) fireToast('Page published · Live on ' + client.domain);
      },
      deletePage(id) { mut((site) => { site.pages = site.pages.filter((p) => p.id !== id); }); fireToast('Page deleted'); },
      addPage(onOpen) {
        const id = Store.uid('pg');
        mut((site) => { site.pages.unshift({ id, title: 'Untitled page', slug: '/' + (site.pages.length + 1), status: 'draft', updated_at: new Date().toISOString(), blocks: [{ id: Store.uid('blk'), type: 'hero', data: { ...BLOCK_DEFAULTS.hero } }] }); });
        if (onOpen) setTimeout(() => onOpen(id), 0);
      },
      updateBlock(pageId, blockId, dataObj) { mut((site) => { const p = site.pages.find((x) => x.id === pageId); const b = p.blocks.find((x) => x.id === blockId); b.data = dataObj; touch(p); }); },
      addBlock(pageId, type) { mut((site) => { const p = site.pages.find((x) => x.id === pageId); p.blocks.push({ id: Store.uid('blk'), type, data: { ...BLOCK_DEFAULTS[type] } }); touch(p); }); },
      deleteBlock(pageId, blockId) { mut((site) => { const p = site.pages.find((x) => x.id === pageId); p.blocks = p.blocks.filter((b) => b.id !== blockId); touch(p); }); },
      moveBlock(pageId, from, to) { mut((site) => { const p = site.pages.find((x) => x.id === pageId); const a = p.blocks; const [m] = a.splice(from, 1); a.splice(to, 0, m); touch(p); }); },
      // articles
      saveArticle(a) { mut((site) => { const i = site.articles.findIndex((x) => x.id === a.id); const next = { ...a, updated_at: new Date().toISOString(), published_at: a.status === 'published' ? (a.published_at || new Date().toISOString()) : null }; if (i >= 0) site.articles[i] = { ...site.articles[i], ...next }; else site.articles.unshift({ ...next, id: Store.uid('post') }); }); fireToast(a.status === 'published' ? 'Article published' : 'Draft saved'); },
      deleteArticle(id) { mut((site) => { site.articles = site.articles.filter((x) => x.id !== id); }); fireToast('Article deleted'); },
      // departments
      saveDepartment(s) { mut((site) => { const i = site.departments.findIndex((x) => x.id === s.id); if (i >= 0) site.departments[i] = { ...site.departments[i], ...s }; else site.departments.push({ ...s, id: Store.uid('svc') }); }); fireToast('Department saved · Live site updated'); },
      deleteDepartment(id) { mut((site) => { site.departments = site.departments.filter((x) => x.id !== id); }); fireToast('Department removed'); },
      moveDepartment(id, dir) { mut((site) => { const arr = [...site.departments].sort((a, b) => a.display_order - b.display_order); const i = arr.findIndex((x) => x.id === id); const j = i + dir; if (j < 0 || j >= arr.length) return; [arr[i].display_order, arr[j].display_order] = [arr[j].display_order, arr[i].display_order]; }); },
      // notes
      saveNote(n) { mut((site) => { const i = site.fieldNotes.findIndex((x) => x.id === n.id); if (i >= 0) site.fieldNotes[i] = { ...site.fieldNotes[i], ...n }; else site.fieldNotes.push({ ...n, id: Store.uid('tst') }); }); fireToast('Field note saved · Live site updated'); },
      deleteNote(id) { mut((site) => { site.fieldNotes = site.fieldNotes.filter((x) => x.id !== id); }); fireToast('Field note removed'); },
      // messages
      markRead(id, read) { mut((site) => { const m = site.messages.find((x) => x.id === id); if (m) m.read = read; }); },
      deleteMessage(id) { mut((site) => { site.messages = site.messages.filter((x) => x.id !== id); }); fireToast('Transmission deleted'); },
      // settings
      saveSettings(next) { mut((site) => { site.settings = { ...site.settings, ...next }; }); },
      // projects
      moveTask(projectId, taskId, toCol) { mut((site) => { const p = site.projects.find((x) => x.id === projectId); const tk = p.tasks.find((x) => x.id === taskId); if (tk) tk.column = toCol; }); },
      addTask(projectId, column, title) { mut((site) => { const p = site.projects.find((x) => x.id === projectId); p.tasks.push({ id: Store.uid('t'), title, column, priority: 'Medium', due: '' }); }); },
      updateTask(projectId, taskId, patch) { mut((site) => { const p = site.projects.find((x) => x.id === projectId); const tk = p.tasks.find((x) => x.id === taskId); Object.assign(tk, patch); }); },
      deleteTask(projectId, taskId) { mut((site) => { const p = site.projects.find((x) => x.id === projectId); p.tasks = p.tasks.filter((x) => x.id !== taskId); }); },
      addProject() { const id = Store.uid('prj'); const name = prompt('Board name:'); if (!name) return null; mut((site) => { site.projects.push({ id, name, description: '', columns: ['Backlog', 'In Progress', 'Review', 'Done'], tasks: [] }); }); return id; },
      // plan / clients
      setPlan(planId) { mut((site, c) => { c.plan = planId; }); fireToast('Plan changed to ' + Store.plan(planId).name); },
    };

    function go(mod, tab) {
      setEmbed(false);
      if (!Store.can(client, mod)) { setModuleId(mod); return; } // locked → upsell renders
      setModuleId(mod);
      if (mod === 'content' && tab) setContentTab(tab);
    }
    function switchClient(id) { Store.setActive(id); setClientMenu(false); setModuleId('dashboard'); setEmbed(false); }

    // ── Command palette commands ──────────────────────────────
    const commands = [];
    Store.MODULES.forEach((m) => commands.push({ id: 'nav-' + m.id, group: 'Go to', icon: m.icon, label: m.brand, sub: Store.can(client, m.id) ? '' : 'locked', run: () => go(m.id) }));
    commands.push({ id: 'nav-site', group: 'Go to', icon: 'external', label: 'View live site', run: () => setEmbed(true) });
    commands.push({ id: 'new-page', group: 'Create', icon: 'layout', label: 'New page', run: () => { go('content', 'pages'); actions.addPage(); } });
    commands.push({ id: 'new-article', group: 'Create', icon: 'fileText', label: 'New article', run: () => go('content', 'articles') });
    data.clients.forEach((c) => { if (c.id !== client.id) commands.push({ id: 'cli-' + c.id, group: 'Switch client', icon: 'user', label: c.name, sub: c.domain, run: () => switchClient(c.id) }); });

    // ── Render main ───────────────────────────────────────────
    let main;
    if (embed) main = <window.WsEmbed client={client} onBack={() => setEmbed(false)} />;
    else if (moduleId === 'dashboard') main = <window.WsDashboard client={client} go={go} onViewSite={() => setEmbed(true)} />;
    else if (!Store.can(client, moduleId)) main = <window.WsUpsell client={client} moduleId={moduleId} onPlan={actions.setPlan} />;
    else if (moduleId === 'content') main = <window.ContentModule client={client} actions={actions} onToast={fireToast} initialTab={contentTab} />;
    else if (moduleId === 'projects') main = <window.ProjectsModule client={client} actions={actions} />;
    else if (moduleId === 'research') main = <ResearchPlaceholder client={client} />;
    else if (moduleId === 'development') main = <DevPlaceholder client={client} />;

    const layoutClass = t.navLayout === 'rail' ? 'ws-nav--rail' : 'ws-nav--sidebar';

    return (
      <div className="ws">
        {/* Top bar */}
        <div className="ws-top">
          <div className="ws-top__brand"><span className="da-pulse" style={{ borderColor: 'rgba(255,255,255,.4)' }} /><span className="ws-top__name">Digital Allies</span><span className="ws-top__tag">CMS</span></div>

          <div className="ws-client">
            <button className="ws-client__btn" onClick={() => setClientMenu((o) => !o)}>
              <span className="ws-avatar" style={{ background: client.brand_color }}>{client.initials}</span>
              <span className="ws-client__meta"><span className="ws-client__name">{client.name}</span><span className="ws-client__dom">{client.domain}</span></span>
              <Icon name="chevronDown" size={14} color="rgba(255,255,255,.6)" />
            </button>
            {clientMenu && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} onClick={() => setClientMenu(false)} />
                <div className="ws-client__menu">
                  <div className="ws-client__head"><span>Your sites</span><span style={{ fontFamily: 'var(--font-details)' }}>{data.clients.length}</span></div>
                  {data.clients.map((c) => (
                    <button key={c.id} className={'ws-client__opt' + (c.id === client.id ? ' is-on' : '')} onClick={() => switchClient(c.id)}>
                      <span className="ws-avatar" style={{ background: c.brand_color }}>{c.initials}</span>
                      <span className="ws-client__opt-meta"><span className="ws-client__opt-name">{c.name}{c.owner && ' ·'}{c.owner && <span style={{ color: 'var(--accent)', fontSize: 10 }}> you</span>}</span><span className="ws-client__opt-dom">{c.domain}</span></span>
                      <span className={'ws-plan-tag ws-plan-tag--' + c.plan}>{Store.plan(c.plan).name}</span>
                    </button>
                  ))}
                  <button className="ws-client__add" onClick={() => fireToast('Demo · client onboarding is an Agency feature')}><Icon name="plus" size={14} /> Add a client site</button>
                </div>
              </>
            )}
          </div>

          <div className="ws-top__spacer" />
          <button className="ws-cmd" onClick={() => setCmdOpen(true)}><Icon name="search" size={14} /> Search &amp; commands <kbd>⌘K</kbd></button>
          <span className={'ws-sync' + (syncing ? ' ws-sync--on' : '')}><span className="da-pulse" />{syncing ? 'Syncing…' : 'Connected'}</span>
        </div>

        {/* Body */}
        <div className="ws-body">
          <nav className={'ws-nav ' + layoutClass}>
            <div className="ws-nav__group">{t.navLayout === 'rail' ? '—' : 'Modules'}</div>
            {Store.MODULES.map((m) => {
              const locked = !Store.can(client, m.id);
              const active = moduleId === m.id && !embed;
              return (
                <button key={m.id} className={'ws-navitem' + (active ? ' is-active' : '') + (locked ? ' is-locked' : '')} onClick={() => go(m.id)} title={m.brand}>
                  <Icon name={m.icon} size={16} />
                  {t.navLayout !== 'rail' && <span className="ws-navitem__label">{m.brand}</span>}
                  {t.navLayout !== 'rail' && locked && <Icon name="lock" size={12} className="ws-navitem__lock" />}
                </button>
              );
            })}
            <div className="ws-nav__foot">
              <button className="ws-nav__viewsite" onClick={() => setEmbed(true)}><Icon name="external" size={14} /><span>View live site</span></button>
            </div>
          </nav>
          <div className="ws-main">{main}</div>
        </div>

        {toast && <div className="ws-toast" key={toast.id}><span className="da-pulse" />{toast.text}</div>}
        <window.CmdPalette open={cmdOpen} onClose={() => setCmdOpen(false)} commands={commands} />

        <window.TweaksPanel>
          <window.TweakSection label="Navigation" />
          <window.TweakRadio label="Nav layout" value={t.navLayout}
            options={[{ value: 'sidebar', label: 'Sidebar' }, { value: 'rail', label: 'Icon rail' }]}
            onChange={(v) => setTweak('navLayout', v)} />
          <window.TweakSection label="Demo" />
          <window.TweakRadio label="Start on client" value={t.startClient}
            options={data.clients.map((c) => ({ value: c.id, label: c.initials }))}
            onChange={(v) => { setTweak('startClient', v); switchClient(v); }} />
          <window.TweakButton label="Reset demo content" onClick={() => { Store.reset(); fireToast('Demo content reset'); }} />
        </window.TweaksPanel>
      </div>
    );
  }

  // ── Locked-module placeholders (Studio/Agency) — but if plan
  //    allows, show a tidy "coming together" stub so nav works. ─
  function ResearchPlaceholder({ client }) {
    return (
      <div className="ws-page">
        <div className="ws-head"><div><div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Research</div><h1>Research &amp; Notes</h1><div className="ws-head__sub">A notebook archive for {client.name}.</div></div></div>
        <div className="da-pinned" style={{ padding: '30px 20px 16px' }}><strong>Unlocked on {client.name}.</strong> Notebooks, tagged notes, and exportable research live here — wired the same connected way as Content. This module is mapped in the build plan and ready to flesh out next.</div>
      </div>
    );
  }
  function DevPlaceholder({ client }) {
    return (
      <div className="ws-page">
        <div className="ws-head"><div><div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Development</div><h1>The Workshop</h1><div className="ws-head__sub">Feature, bug &amp; milestone tracker for {client.name}.</div></div></div>
        <div className="da-pinned" style={{ padding: '30px 20px 16px' }}><strong>Agency module.</strong> The Workshop tracks features, bugs and launch milestones against each site — the dev counterpart to the Projects board. Mapped in the build plan.</div>
      </div>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
})();
