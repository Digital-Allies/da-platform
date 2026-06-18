/* ============================================================
   CONTENT SUB-TABS — Articles · Departments · Field Notes ·
   Command Center · Settings. Client-scoped. Exported on window.
   ============================================================ */
(function () {
  const { useState } = React;
  const Icon = window.Icon;
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
  const fmtAgo = (d) => { if (!d) return ''; const s = (Date.now() - new Date(d).getTime()) / 1000; if (s < 3600) return Math.max(1, Math.floor(s / 60)) + 'm'; if (s < 86400) return Math.floor(s / 3600) + 'h'; return Math.floor(s / 86400) + 'd'; };
  const slugify = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

  function Field({ label, hint, children }) {
    return <label className="ws-field"><span className="ws-field__label">{label}{hint && <em className="ws-field__hint">{hint}</em>}</span>{children}</label>;
  }

  // ── Articles (The Journal) ──────────────────────────────────
  function ContentArticles({ client, actions }) {
    const [editing, setEditing] = useState(null);
    const list = [...(client.site.articles || [])].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    if (editing) return <ArticleEditor article={editing === 'new' ? null : editing} actions={actions} onDone={() => setEditing(null)} />;
    return (
      <div>
        <div className="ws-head" style={{ border: 0, marginBottom: 16, paddingBottom: 0 }}>
          <div><h2 style={{ fontFamily: 'var(--font-headers)', fontSize: 17 }}>Articles</h2><div className="ws-head__sub">The Journal — long-form notes.</div></div>
          <button className="ws-btn ws-btn--primary ws-btn--sm" onClick={() => setEditing('new')}><Icon name="plus" size={13} /> New article</button>
        </div>
        <div className="ws-list">
          {list.map((p) => (
            <button className="ws-row" key={p.id} onClick={() => setEditing(p)}>
              <span className={'ws-pill ws-pill--' + (p.status === 'published' ? 'live' : 'draft')}>{p.status}</span>
              <span className="ws-row__main"><span className="ws-row__title">{p.title}</span><span className="ws-row__meta">/{p.slug} · updated {fmtDate(p.updated_at)}</span></span>
              <Icon name="edit" size={15} className="ws-row__go" />
            </button>
          ))}
          {!list.length && <div className="ws-empty">No articles yet.</div>}
        </div>
      </div>
    );
  }
  function ArticleEditor({ article, actions, onDone }) {
    const isNew = !article;
    const [f, setF] = useState(article || { title: '', slug: '', excerpt: '', content: '', status: 'draft' });
    const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value, ...(k === 'title' && isNew ? { slug: slugify(e.target.value) } : {}) }));
    function save() { actions.saveArticle({ ...f, id: article?.id, slug: f.slug || slugify(f.title) }); onDone(); }
    return (
      <div style={{ maxWidth: 720 }}>
        <div className="ws-head"><div><h2 style={{ fontFamily: 'var(--font-headers)', fontSize: 18 }}>{isNew ? 'New article' : 'Edit article'}</h2></div>
          <div className="ws-head__actions">
            {!isNew && <button className="ws-btn ws-btn--danger ws-btn--sm" onClick={() => { if (confirm('Delete this article?')) { actions.deleteArticle(article.id); onDone(); } }}><Icon name="trash" size={13} /></button>}
            <button className="ws-btn ws-btn--ghost ws-btn--sm" onClick={onDone}>Cancel</button>
            <select className="ws-input ws-input--select" style={{ width: 'auto' }} value={f.status} onChange={set('status')}><option value="draft">Draft</option><option value="published">Published</option></select>
            <button className="ws-btn ws-btn--primary ws-btn--sm" onClick={save} disabled={!f.title.trim()}><Icon name="save" size={13} /> Save</button>
          </div>
        </div>
        <Field label="Title"><input className="ws-input ws-input--lg" value={f.title} onChange={set('title')} placeholder="Article title" /></Field>
        <Field label="Slug"><input className="ws-input" style={{ fontFamily: 'var(--font-details)' }} value={f.slug} onChange={set('slug')} /></Field>
        <Field label="Excerpt" hint="(blog list)"><textarea className="ws-input" rows={2} value={f.excerpt} onChange={set('excerpt')} /></Field>
        <Field label="Body" hint="(plain text / HTML)"><textarea className="ws-input" rows={9} value={f.content} onChange={set('content')} /></Field>
      </div>
    );
  }

  // ── Departments ─────────────────────────────────────────────
  const DEPT_ICONS = ['compass', 'cog', 'timer', 'radar'];
  function ContentDepartments({ client, actions }) {
    const [editing, setEditing] = useState(null);
    const list = [...(client.site.departments || [])].sort((a, b) => a.display_order - b.display_order);
    if (editing) return <DeptEditor svc={editing === 'new' ? null : editing} count={list.length} actions={actions} onDone={() => setEditing(null)} />;
    return (
      <div>
        <div className="ws-head" style={{ border: 0, marginBottom: 16, paddingBottom: 0 }}>
          <div><h2 style={{ fontFamily: 'var(--font-headers)', fontSize: 17 }}>The Departments</h2><div className="ws-head__sub">Service offerings shown on the site.</div></div>
          <button className="ws-btn ws-btn--primary ws-btn--sm" onClick={() => setEditing('new')}><Icon name="plus" size={13} /> Add department</button>
        </div>
        <div className="ws-list">
          {list.map((svc, i) => (
            <div className="ws-row" key={svc.id} style={{ cursor: 'default' }}>
              <span style={{ flex: '0 0 auto', display: 'grid', placeItems: 'center', width: 38, height: 38, border: 'var(--border-1)' }}><Icon name={svc.icon} size={20} stroke={1.4} /></span>
              <span className="ws-row__main"><span className="ws-row__title">{svc.title} <span style={{ fontFamily: 'var(--font-details)', fontSize: 11, color: 'var(--accent)', fontWeight: 400 }}>{svc.price}</span></span><span className="ws-row__meta">{svc.description.slice(0, 80)}…</span></span>
              <span style={{ display: 'flex', gap: 6 }}>
                <button className="ws-icon-btn" disabled={i === 0} onClick={() => actions.moveDepartment(svc.id, -1)}><Icon name="chevronDown" size={14} style={{ transform: 'rotate(180deg)' }} /></button>
                <button className="ws-icon-btn" disabled={i === list.length - 1} onClick={() => actions.moveDepartment(svc.id, 1)}><Icon name="chevronDown" size={14} /></button>
                <button className="ws-icon-btn" onClick={() => setEditing(svc)}><Icon name="edit" size={14} /></button>
              </span>
            </div>
          ))}
          {!list.length && <div className="ws-empty">No departments. Add one to show a services grid on the site.</div>}
        </div>
      </div>
    );
  }
  function DeptEditor({ svc, count, actions, onDone }) {
    const isNew = !svc;
    const [f, setF] = useState(svc || { title: '', description: '', price: 'From $', icon: 'compass' });
    const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
    function save() { actions.saveDepartment({ ...f, id: svc?.id, display_order: svc?.display_order ?? count }); onDone(); }
    return (
      <div style={{ maxWidth: 620 }}>
        <div className="ws-head"><div><h2 style={{ fontFamily: 'var(--font-headers)', fontSize: 18 }}>{isNew ? 'New department' : 'Edit department'}</h2></div>
          <div className="ws-head__actions">
            {!isNew && <button className="ws-btn ws-btn--danger ws-btn--sm" onClick={() => { if (confirm('Delete?')) { actions.deleteDepartment(svc.id); onDone(); } }}><Icon name="trash" size={13} /></button>}
            <button className="ws-btn ws-btn--ghost ws-btn--sm" onClick={onDone}>Cancel</button>
            <button className="ws-btn ws-btn--primary ws-btn--sm" onClick={save} disabled={!f.title.trim()}><Icon name="save" size={13} /> Save</button>
          </div>
        </div>
        <Field label="Department name"><input className="ws-input ws-input--lg" value={f.title} onChange={set('title')} placeholder="The Design Bureau" /></Field>
        <Field label="Icon">
          <div style={{ display: 'flex', gap: 8 }}>
            {DEPT_ICONS.map((ic) => <button key={ic} type="button" className="ws-icon-btn" style={{ width: 44, height: 44, background: f.icon === ic ? 'var(--accent-soft)' : 'var(--bg)' }} onClick={() => setF((p) => ({ ...p, icon: ic }))}><Icon name={ic} size={22} stroke={1.4} /></button>)}
          </div>
        </Field>
        <Field label="Description"><textarea className="ws-input" rows={3} value={f.description} onChange={set('description')} /></Field>
        <Field label="Price" hint="(From $X)"><input className="ws-input" style={{ fontFamily: 'var(--font-details)' }} value={f.price} onChange={set('price')} /></Field>
      </div>
    );
  }

  // ── Field Notes ─────────────────────────────────────────────
  function ContentNotes({ client, actions }) {
    const [editing, setEditing] = useState(null);
    const list = [...(client.site.fieldNotes || [])].sort((a, b) => a.display_order - b.display_order);
    if (editing) return <NoteEditor note={editing === 'new' ? null : editing} count={list.length} actions={actions} onDone={() => setEditing(null)} />;
    return (
      <div>
        <div className="ws-head" style={{ border: 0, marginBottom: 16, paddingBottom: 0 }}>
          <div><h2 style={{ fontFamily: 'var(--font-headers)', fontSize: 17 }}>Field Notes</h2><div className="ws-head__sub">Testimonials from people you have helped.</div></div>
          <button className="ws-btn ws-btn--primary ws-btn--sm" onClick={() => setEditing('new')}><Icon name="plus" size={13} /> Add note</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {list.map((t) => (
            <button key={t.id} onClick={() => setEditing(t)} className="da-pinned" style={{ textAlign: 'left', cursor: 'pointer', padding: '30px 18px 16px', background: 'var(--bg-alt)' }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>{Array.from({ length: t.rating || 5 }).map((_, i) => <Icon key={i} name="star" size={12} color="var(--signal)" style={{ fill: 'var(--signal)' }} />)}</div>
              <p style={{ fontStyle: 'italic', fontSize: 13, lineHeight: 1.6 }}>&ldquo;{t.content}&rdquo;</p>
              <div style={{ marginTop: 10, fontSize: 12 }}><strong>{t.author_name}</strong> · <span style={{ color: 'var(--fg-muted)' }}>{t.author_role}</span></div>
            </button>
          ))}
          {!list.length && <div className="ws-empty" style={{ gridColumn: '1 / -1' }}>No field notes yet.</div>}
        </div>
      </div>
    );
  }
  function NoteEditor({ note, count, actions, onDone }) {
    const isNew = !note;
    const [f, setF] = useState(note || { author_name: '', author_role: '', content: '', rating: 5 });
    const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
    function save() { actions.saveNote({ ...f, id: note?.id, rating: Number(f.rating), display_order: note?.display_order ?? count }); onDone(); }
    return (
      <div style={{ maxWidth: 620 }}>
        <div className="ws-head"><div><h2 style={{ fontFamily: 'var(--font-headers)', fontSize: 18 }}>{isNew ? 'New field note' : 'Edit field note'}</h2></div>
          <div className="ws-head__actions">
            {!isNew && <button className="ws-btn ws-btn--danger ws-btn--sm" onClick={() => { if (confirm('Delete?')) { actions.deleteNote(note.id); onDone(); } }}><Icon name="trash" size={13} /></button>}
            <button className="ws-btn ws-btn--ghost ws-btn--sm" onClick={onDone}>Cancel</button>
            <button className="ws-btn ws-btn--primary ws-btn--sm" onClick={save} disabled={!f.content.trim()}><Icon name="save" size={13} /> Save</button>
          </div>
        </div>
        <Field label="Quote"><textarea className="ws-input" rows={4} value={f.content} onChange={set('content')} /></Field>
        <div className="ws-field-row">
          <Field label="Author name"><input className="ws-input" value={f.author_name} onChange={set('author_name')} /></Field>
          <Field label="Rating"><select className="ws-input ws-input--select" value={f.rating} onChange={set('rating')}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}</select></Field>
        </div>
        <Field label="Role / business"><input className="ws-input" value={f.author_role} onChange={set('author_role')} placeholder="Vance & Daughters Hardware · Kingman" /></Field>
      </div>
    );
  }

  // ── Command Center (messages) ───────────────────────────────
  function ContentMessages({ client, actions }) {
    const list = [...(client.site.messages || [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const [open, setOpen] = useState(list[0]?.id ?? null);
    const active = list.find((m) => m.id === open);
    return (
      <div>
        <div className="ws-head" style={{ border: 0, marginBottom: 16, paddingBottom: 0 }}>
          <div><h2 style={{ fontFamily: 'var(--font-headers)', fontSize: 17 }}>The Command Center</h2><div className="ws-head__sub">Transmissions from the contact form.</div></div>
        </div>
        <div className="ws-cc">
          <div className="ws-cc__list">
            {list.map((m) => (
              <button key={m.id} className={'ws-cc__item' + (m.id === open ? ' is-open' : '')} onClick={() => { setOpen(m.id); if (!m.read) actions.markRead(m.id, true); }}>
                <div className="ws-cc__top"><span className="ws-cc__from">{!m.read && <span className="da-signal-dot" />}{m.name}</span><span className="ws-cc__time">{fmtAgo(m.created_at)}</span></div>
                <span className="ws-cc__subj">{m.subject || '(no subject)'}</span>
                <span className="ws-cc__snip">{m.message}</span>
              </button>
            ))}
            {!list.length && <div className="ws-empty">No transmissions yet.</div>}
          </div>
          {active ? (
            <div className="ws-cc__detail">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div><h3>{active.subject || '(no subject)'}</h3><p className="ws-cc__detail-from">{active.name} · <a href={'mailto:' + active.email} style={{ color: 'var(--accent)' }}>{active.email}</a>{active.phone && ' · ' + active.phone}</p></div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="ws-icon-btn" title={active.read ? 'Mark unread' : 'Mark read'} onClick={() => actions.markRead(active.id, !active.read)}><Icon name="eye" size={15} /></button>
                  <button className="ws-icon-btn" title="Delete" onClick={() => { if (confirm('Delete?')) { actions.deleteMessage(active.id); setOpen(null); } }}><Icon name="trash" size={15} /></button>
                </div>
              </div>
              <p className="ws-cc__body">{active.message}</p>
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
                <a className="ws-btn ws-btn--primary ws-btn--sm" href={'mailto:' + active.email}><Icon name="mail" size={13} /> Reply by email</a>
                <span className="da-small">Received {fmtDate(active.created_at)}</span>
              </div>
            </div>
          ) : <div className="ws-cc__detail ws-cc__detail--empty">Select a transmission.</div>}
        </div>
      </div>
    );
  }

  // ── Settings ────────────────────────────────────────────────
  const GROUPS = [
    { title: 'Identity', fields: [{ key: 'site_title', label: 'Business name' }, { key: 'tagline', label: 'Tagline', type: 'textarea' }] },
    { title: 'The Lobby (hero)', fields: [{ key: 'hero_title', label: 'Hero headline', type: 'textarea' }, { key: 'hero_subtitle', label: 'Hero subheading', type: 'textarea' }, { key: 'hero_cta_text', label: 'Hero button' }] },
    { title: 'About', fields: [{ key: 'about_title', label: 'About title' }, { key: 'about_body', label: 'About text', type: 'textarea', rows: 5 }] },
    { title: 'Contact', fields: [{ key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' }, { key: 'address', label: 'Location' }, { key: 'business_hours', label: 'Hours' }] },
  ];
  function ContentSettings({ client, actions, onToast }) {
    const [v, setV] = useState(client.site.settings || {});
    const [dirty, setDirty] = useState(false);
    const set = (k) => (e) => { setV((p) => ({ ...p, [k]: e.target.value })); setDirty(true); };
    function save() { actions.saveSettings(v); setDirty(false); onToast && onToast('Settings saved · Live site updated'); }
    return (
      <div style={{ maxWidth: 680 }}>
        <div className="ws-head" style={{ border: 0, marginBottom: 16, paddingBottom: 0 }}>
          <div><h2 style={{ fontFamily: 'var(--font-headers)', fontSize: 17 }}>Site settings</h2><div className="ws-head__sub">The words and identity of {client.domain}.</div></div>
          <div className="ws-head__actions">{dirty && <span className="ws-dirty"><span className="da-signal-dot" style={{ width: 8, height: 8 }} /> Unsaved</span>}<button className="ws-btn ws-btn--primary ws-btn--sm" onClick={save} disabled={!dirty}><Icon name="save" size={13} /> Save changes</button></div>
        </div>
        {GROUPS.map((g) => (
          <section key={g.title} style={{ marginBottom: 24 }}>
            <div className="ws-subhead" style={{ margin: '0 0 12px' }}>{g.title}</div>
            <div style={{ border: 'var(--border-1)', background: 'var(--bg)', padding: 20 }}>
              {g.fields.map((fld) => (
                <Field key={fld.key} label={fld.label}>
                  {fld.type === 'textarea'
                    ? <textarea className="ws-input" rows={fld.rows || 2} value={v[fld.key] || ''} onChange={set(fld.key)} />
                    : <input className="ws-input" value={v[fld.key] || ''} onChange={set(fld.key)} />}
                </Field>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  Object.assign(window, { ContentArticles, ContentDepartments, ContentNotes, ContentMessages, ContentSettings });
})();
