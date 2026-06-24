/* ============================================================
   CONTENT MODULE — "The Press Office"
   Tabs: Pages (page builder) · Articles · Departments ·
         Field Notes · Command Center · Settings
   window.ContentModule({ client, actions, onToast })
   Sub-tab components live in content-tabs.jsx (window.*).
   ============================================================ */
(function () {
  const { useState, useRef, useEffect } = React;
  const Icon = window.Icon;

  // ── Inline-editable text (commits on blur) ──────────────────
  function InlineText({ value, onCommit, tag = 'div', className, placeholder, multiline }) {
    const ref = useRef(null);
    useEffect(() => { if (ref.current && ref.current.textContent !== (value || '')) ref.current.textContent = value || ''; }, [value]);
    return React.createElement(tag, {
      ref, className: 'ws-edit ' + (className || ''), contentEditable: true, suppressContentEditableWarning: true,
      'data-ph': placeholder,
      onBlur: (e) => onCommit(e.currentTarget.textContent),
      onKeyDown: (e) => { if (!multiline && e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); } },
    });
  }

  const BLOCK_TYPES = [
    { type: 'hero', label: 'Hero', icon: 'layout' },
    { type: 'richtext', label: 'Text', icon: 'fileText' },
    { type: 'departments', label: 'Departments', icon: 'briefcase' },
    { type: 'fieldNotes', label: 'Field Notes', icon: 'star' },
    { type: 'cta', label: 'Call to action', icon: 'send' },
  ];

  // ── Block preview (inline-editable) ─────────────────────────
  function BlockPreview({ block, client, onChange }) {
    const d = block.data || {};
    const set = (k) => (val) => onChange({ ...d, [k]: val });
    if (block.type === 'hero') {
      return (
        <div className="ws-pv-hero">
          <InlineText className="ws-pv-eyebrow" value={d.eyebrow} onCommit={set('eyebrow')} placeholder="EYEBROW" />
          <InlineText className="ws-pv-h" value={d.heading} onCommit={set('heading')} placeholder="Headline" multiline />
          <InlineText className="ws-pv-body" value={d.body} onCommit={set('body')} placeholder="Supporting line" multiline />
          {d.cta != null && <div className="ws-pv-cta"><InlineText tag="span" value={d.cta} onCommit={set('cta')} placeholder="Button" /></div>}
        </div>
      );
    }
    if (block.type === 'richtext') {
      return (
        <div>
          <InlineText className="ws-pv-h" style={{ fontSize: 20 }} value={d.heading} onCommit={set('heading')} placeholder="Section heading" />
          <InlineText className="ws-pv-body" value={d.body} onCommit={set('body')} placeholder="Body text…" multiline />
        </div>
      );
    }
    if (block.type === 'departments') {
      const list = [...(client.site.departments || [])].sort((a, b) => a.display_order - b.display_order).slice(0, 4);
      return (
        <div>
          <InlineText className="ws-pv-h" style={{ fontSize: 18 }} value={d.heading} onCommit={set('heading')} placeholder="The Departments" />
          <InlineText className="ws-pv-body" value={d.sub} onCommit={set('sub')} placeholder="Subhead" />
          {list.length ? (
            <div className="ws-pv-grid">
              {list.map((s) => (
                <div className="ws-pv-card" key={s.id}><h5>{s.title}</h5><span>{s.price}</span><p>{s.description.slice(0, 70)}…</p></div>
              ))}
            </div>
          ) : <p className="ws-pv-body" style={{ fontStyle: 'italic', marginTop: 8 }}>No departments yet — add them in the Departments tab.</p>}
        </div>
      );
    }
    if (block.type === 'fieldNotes') {
      const list = (client.site.fieldNotes || []).slice(0, 2);
      return (
        <div>
          <InlineText className="ws-pv-h" style={{ fontSize: 18 }} value={d.heading} onCommit={set('heading')} placeholder="Field Notes" />
          <div className="ws-pv-grid">
            {list.map((n) => <div className="ws-pv-card" key={n.id}><p style={{ fontStyle: 'italic' }}>&ldquo;{n.content.slice(0, 80)}…&rdquo;</p><h5 style={{ marginTop: 6 }}>{n.author_name}</h5></div>)}
            {!list.length && <p className="ws-pv-body" style={{ fontStyle: 'italic' }}>No field notes yet.</p>}
          </div>
        </div>
      );
    }
    if (block.type === 'cta') {
      return (
        <div className="ws-pv-cta-block">
          <InlineText className="ws-pv-h" style={{ fontSize: 20 }} value={d.heading} onCommit={set('heading')} placeholder="Call to action" />
          <div className="ws-pv-cta" style={{ marginTop: 10 }}><InlineText tag="span" value={d.button} onCommit={set('button')} placeholder="Button" /></div>
        </div>
      );
    }
    return null;
  }

  // ── Page builder ────────────────────────────────────────────
  function PageBuilder({ page, client, actions, onDone }) {
    const [sel, setSel] = useState(null);
    const [dragI, setDragI] = useState(null);
    const [overI, setOverI] = useState(null);
    const blocks = page.blocks || [];

    function onDrop(to) {
      if (dragI === null || dragI === to) { setDragI(null); setOverI(null); return; }
      actions.moveBlock(page.id, dragI, to);
      setDragI(null); setOverI(null);
    }

    return (
      <div className="ws-page ws-page--full" style={{ maxWidth: 1180 }}>
        <div className="ws-head">
          <div>
            <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">The Press Office · Page</div>
            <h1><InlineText tag="span" value={page.title} onCommit={(v) => actions.savePage({ ...page, title: v })} placeholder="Page title" /></h1>
            <div className="ws-head__sub">{client.domain}{page.slug}</div>
          </div>
          <div className="ws-head__actions">
            <button className="ws-btn ws-btn--ghost" onClick={onDone}><Icon name="chevronLeft" size={14} /> All pages</button>
            <select className="ws-input ws-input--select" style={{ width: 'auto' }} value={page.status} onChange={(e) => actions.savePage({ ...page, status: e.target.value })}>
              <option value="draft">Draft</option><option value="published">Published</option>
            </select>
            <button className="ws-btn ws-btn--primary" onClick={() => actions.savePage(page, true)}><Icon name="save" size={13} /> Save &amp; publish</button>
          </div>
        </div>

        <div className="ws-builder">
          <div className="ws-canvas">
            <div className="ws-canvas__bar">
              <span className="ws-canvas__url"><Icon name="lock" size={11} />{client.domain}{page.slug}</span>
              <span className="da-small">Drag <Icon name="grip" size={12} style={{ verticalAlign: 'middle' }} /> to reorder · click text to edit</span>
            </div>
            <div className="ws-blocks">
              {blocks.map((b, i) => (
                <div key={b.id}
                  className={'ws-block' + (sel === b.id ? ' is-sel' : '') + (dragI === i ? ' is-drag' : '') + (overI === i ? ' is-over' : '')}
                  onClick={() => setSel(b.id)}
                  onDragOver={(e) => { e.preventDefault(); setOverI(i); }}
                  onDrop={() => onDrop(i)}>
                  <div className="ws-block__bar">
                    <span className="ws-block__handle" draggable onDragStart={() => setDragI(i)} onDragEnd={() => { setDragI(null); setOverI(null); }}><Icon name="grip" size={14} /></span>
                    <span className="ws-block__type">{b.type}</span>
                    <button className="ws-block__del" title="Delete block" onClick={(e) => { e.stopPropagation(); actions.deleteBlock(page.id, b.id); }}><Icon name="trash" size={13} /></button>
                  </div>
                  <div className="ws-block__body">
                    <BlockPreview block={b} client={client} onChange={(data) => actions.updateBlock(page.id, b.id, data)} />
                  </div>
                </div>
              ))}
              <AddBlock onAdd={(type) => actions.addBlock(page.id, type)} />
            </div>
          </div>

          <div className="ws-insp">
            <div className="ws-insp__head">Add a section</div>
            <div className="ws-insp__body">
              <div className="ws-palette">
                {BLOCK_TYPES.map((bt) => (
                  <button key={bt.type} onClick={() => actions.addBlock(page.id, bt.type)}>
                    <Icon name={bt.icon} size={18} stroke={1.4} />{bt.label}
                  </button>
                ))}
              </div>
              <div className="da-pinned" style={{ marginTop: 20, padding: '24px 16px 14px', fontSize: 12 }}>
                <strong>Connected.</strong> Saving publishes straight to {client.domain}. Departments &amp; Field Notes blocks pull live from their tabs.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function AddBlock({ onAdd }) {
    const [open, setOpen] = useState(false);
    if (!open) return <button className="ws-block__add" onClick={() => setOpen(true)}><Icon name="plus" size={14} /> Add a section</button>;
    return (
      <div className="ws-block" style={{ borderStyle: 'dashed' }}>
        <div className="ws-block__bar"><span className="ws-block__type">Choose a block</span><button className="ws-block__del" onClick={() => setOpen(false)}><Icon name="x" size={13} /></button></div>
        <div className="ws-block__body"><div className="ws-palette">
          {BLOCK_TYPES.map((bt) => <button key={bt.type} onClick={() => { onAdd(bt.type); setOpen(false); }}><Icon name={bt.icon} size={18} stroke={1.4} />{bt.label}</button>)}
        </div></div>
      </div>
    );
  }

  // ── Pages list ──────────────────────────────────────────────
  function PagesTab({ client, actions, onOpen }) {
    const pages = client.site.pages || [];
    return (
      <div>
        <div className="ws-head" style={{ border: 0, marginBottom: 16, paddingBottom: 0 }}>
          <div><h2 style={{ fontFamily: 'var(--font-headers)', fontSize: 17 }}>Pages</h2></div>
          <button className="ws-btn ws-btn--primary ws-btn--sm" onClick={() => actions.addPage(onOpen)}><Icon name="plus" size={13} /> New page</button>
        </div>
        <div className="ws-list">
          {pages.map((p) => (
            <button className="ws-row" key={p.id} onClick={() => onOpen(p.id)}>
              <span className={'ws-pill ws-pill--' + (p.status === 'published' ? 'live' : 'draft')}>{p.status}</span>
              <span className="ws-row__main">
                <span className="ws-row__title">{p.title}</span>
                <span className="ws-row__meta">{client.domain}{p.slug} · {(p.blocks || []).length} blocks · updated {fmtDate(p.updated_at)}</span>
              </span>
              <Icon name="edit" size={15} className="ws-row__go" />
            </button>
          ))}
          {!pages.length && <div className="ws-empty">No pages yet. Build the first one.</div>}
        </div>
      </div>
    );
  }

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—';

  // ── Module shell ────────────────────────────────────────────
  const TABS = [
    { id: 'pages', label: 'Pages' },
    { id: 'articles', label: 'Articles' },
    { id: 'departments', label: 'Departments' },
    { id: 'notes', label: 'Field Notes' },
    { id: 'messages', label: 'Command Center' },
    { id: 'settings', label: 'Settings' },
  ];

  function ContentModule({ client, actions, onToast, initialTab }) {
    const [tab, setTab] = useState(initialTab || 'pages');
    const [openPage, setOpenPage] = useState(null);
    useEffect(() => { setOpenPage(null); }, [client.id]);
    useEffect(() => { if (initialTab) setTab(initialTab); }, [initialTab]);

    const page = openPage ? (client.site.pages || []).find((p) => p.id === openPage) : null;
    if (tab === 'pages' && page) return <PageBuilder page={page} client={client} actions={actions} onDone={() => setOpenPage(null)} />;

    const counts = {
      pages: (client.site.pages || []).length,
      articles: (client.site.articles || []).length,
      departments: (client.site.departments || []).length,
      notes: (client.site.fieldNotes || []).length,
      messages: (client.site.messages || []).filter((m) => !m.read).length,
    };

    return (
      <div className="ws-page">
        <div className="ws-head">
          <div>
            <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Content</div>
            <h1>The Press Office</h1>
            <div className="ws-head__sub">Everything that lives on {client.domain}. Edit here, it goes live.</div>
          </div>
        </div>
        <div className="ws-tabs">
          {TABS.map((t) => (
            <button key={t.id} className={'ws-tab' + (tab === t.id ? ' is-on' : '')} onClick={() => setTab(t.id)}>
              {t.label}{counts[t.id] != null && counts[t.id] > 0 && <span className="ws-tab__count">{counts[t.id]}</span>}
            </button>
          ))}
        </div>
        {tab === 'pages' && <PagesTab client={client} actions={actions} onOpen={setOpenPage} />}
        {tab === 'articles' && <window.ContentArticles client={client} actions={actions} />}
        {tab === 'departments' && <window.ContentDepartments client={client} actions={actions} />}
        {tab === 'notes' && <window.ContentNotes client={client} actions={actions} />}
        {tab === 'messages' && <window.ContentMessages client={client} actions={actions} />}
        {tab === 'settings' && <window.ContentSettings client={client} actions={actions} onToast={onToast} />}
      </div>
    );
  }

  window.ContentModule = ContentModule;
  window.InlineText = InlineText;
})();
