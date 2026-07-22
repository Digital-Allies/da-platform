/* ============================================================
   ADMIN CMS — Site Admin for Digital Allies.
   Exports window.AdminApp({ data, actions, layout, chrome,
                             section, setSection, onViewSite })
   layout: 'topbar' | 'sidebar' | 'rail'
   chrome: 'dark' | 'light'
   ============================================================ */
(function () {
  const { useState, useEffect } = React;
  const Icon = window.Icon;

  const NAV = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'posts', label: 'Posts', icon: 'fileText' },
    { id: 'services', label: 'The Departments', icon: 'briefcase' },
    { id: 'testimonials', label: 'Field Notes', icon: 'star' },
    { id: 'messages', label: 'Command Center', icon: 'message' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
  const fmtAgo = (d) => {
    if (!d) return '';
    const diff = (Date.now() - new Date(d).getTime()) / 1000;
    if (diff < 3600) return Math.max(1, Math.floor(diff / 60)) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  };

  // ── Reusable field ──────────────────────────────────────────
  function Field({ label, hint, children }) {
    return (
      <label className="afield">
        <span className="afield__label">{label}{hint && <em className="afield__hint">{hint}</em>}</span>
        {children}
      </label>
    );
  }
  function PageHead({ title, sub, children }) {
    return (
      <div className="apage__head">
        <div>
          <h1 className="apage__title">{title}</h1>
          {sub && <p className="apage__sub">{sub}</p>}
        </div>
        <div className="apage__actions">{children}</div>
      </div>
    );
  }

  // ── Dashboard ───────────────────────────────────────────────
  function Dashboard({ data, setSection, onViewSite }) {
    const unread = data.messages.filter((m) => !m.read).length;
    const drafts = data.posts.filter((p) => p.status === 'draft').length;
    const stats = [
      { label: 'Blog Posts', value: data.posts.length, sub: drafts + ' draft' + (drafts === 1 ? '' : 's'), id: 'posts', icon: 'fileText' },
      { label: 'Departments', value: data.services.length, sub: 'live on site', id: 'services', icon: 'briefcase' },
      { label: 'Field Notes', value: data.testimonials.length, sub: 'published', id: 'testimonials', icon: 'star' },
      { label: 'Unread Transmissions', value: unread, sub: data.messages.length + ' total', id: 'messages', icon: 'message', alert: unread > 0 },
    ];
    return (
      <div className="apage">
        <PageHead title="Dashboard" sub="Everything you change here goes live on the site.">
          <button className="abtn abtn--ghost" onClick={onViewSite}><Icon name="external" size={13} /> View site</button>
        </PageHead>
        <div className="stat-grid">
          {stats.map((s) => (
            <button className={'stat-card' + (s.alert ? ' stat-card--alert' : '')} key={s.id} onClick={() => setSection(s.id)}>
              <div className="stat-card__top">
                <Icon name={s.icon} size={15} />
                {s.alert && <span className="da-signal-dot stat-card__dot" />}
              </div>
              <span className="stat-card__val">{s.value}</span>
              <span className="stat-card__label">{s.label}</span>
              <span className="stat-card__sub">{s.sub}</span>
            </button>
          ))}
        </div>

        <h2 className="asubhead">Quick actions</h2>
        <div className="quick-grid">
          <button className="quick-card" onClick={() => setSection('posts:new')}><Icon name="fileText" size={16} /><span>New blog post</span><Icon name="arrowRight" size={14} /></button>
          <button className="quick-card" onClick={() => setSection('services')}><Icon name="briefcase" size={16} /><span>Edit a Department</span><Icon name="arrowRight" size={14} /></button>
          <button className="quick-card" onClick={() => setSection('settings')}><Icon name="settings" size={16} /><span>Edit site settings</span><Icon name="arrowRight" size={14} /></button>
          <button className="quick-card" onClick={() => setSection('messages')}><Icon name="message" size={16} /><span>Read transmissions</span><Icon name="arrowRight" size={14} /></button>
        </div>

        <div className="da-pinned dash-pin">
          <strong>Connected, not copied.</strong> This admin and the public site read from the same source.
          Save a change here, switch to <em>Live Site</em>, and it&rsquo;s already there.
        </div>
      </div>
    );
  }

  // ── Posts ───────────────────────────────────────────────────
  function slugify(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80); }

  function PostsList({ data, setSection, onEdit }) {
    const posts = [...data.posts].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return (
      <div className="apage">
        <PageHead title="Posts" sub="The Journal — long-form notes from the desk.">
          <button className="abtn abtn--primary" onClick={() => setSection('posts:new')}><Icon name="plus" size={14} /> New post</button>
        </PageHead>
        <div className="alist">
          {posts.map((p) => (
            <button className="arow" key={p.id} onClick={() => onEdit(p)}>
              <span className={'pill ' + (p.status === 'published' ? 'pill--live' : 'pill--draft')}>{p.status}</span>
              <span className="arow__main">
                <span className="arow__title">{p.title}</span>
                <span className="arow__meta">/{p.slug} · updated {fmtDate(p.updated_at)}</span>
              </span>
              <Icon name="edit" size={15} className="arow__go" />
            </button>
          ))}
          {!posts.length && <p className="empty">No posts yet. Write the first one.</p>}
        </div>
      </div>
    );
  }

  function PostEditor({ post, actions, onDone }) {
    const isNew = !post;
    const [title, setTitle] = useState(post?.title ?? '');
    const [slug, setSlug] = useState(post?.slug ?? '');
    const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
    const [content, setContent] = useState(post?.content ?? '');
    const [status, setStatus] = useState(post?.status ?? 'draft');
    const editRef = React.useRef(null);

    useEffect(() => { if (editRef.current) editRef.current.innerHTML = post?.content ?? ''; }, []);

    function onTitle(e) { setTitle(e.target.value); if (isNew) setSlug(slugify(e.target.value)); }
    function exec(cmd, val) { document.execCommand(cmd, false, val); editRef.current.focus(); }
    function save() {
      const html = editRef.current ? editRef.current.innerHTML : content;
      actions.savePost({
        id: post?.id, title, slug: slug || slugify(title), excerpt, content: html, status,
        published_at: status === 'published' ? (post?.published_at ?? new Date().toISOString()) : null,
      });
      onDone();
    }
    const Tb = ({ cmd, val, icon, title }) => (
      <button type="button" className="tb-btn" title={title} onMouseDown={(e) => { e.preventDefault(); exec(cmd, val); }}><Icon name={icon} size={14} /></button>
    );
    return (
      <div className="apage apage--narrow">
        <PageHead title={isNew ? 'New post' : 'Edit post'}>
          {!isNew && <button className="abtn abtn--danger" onClick={() => { if (confirm('Delete this post?')) { actions.deletePost(post.id); onDone(); } }}><Icon name="trash" size={13} /> Delete</button>}
          <button className="abtn abtn--ghost" onClick={onDone}>Cancel</button>
          <select className="ainput ainput--select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button className="abtn abtn--primary" onClick={save} disabled={!title.trim()}><Icon name="save" size={13} /> Save</button>
        </PageHead>
        <div className="editor-stack">
          <Field label="Title"><input className="ainput ainput--lg" value={title} onChange={onTitle} placeholder="Post title" /></Field>
          <Field label="Slug"><input className="ainput mono" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-url-slug" /></Field>
          <Field label="Excerpt" hint="(shown in the blog list)"><textarea className="ainput" rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} /></Field>
          <Field label="Content">
            <div className="rte">
              <div className="rte__toolbar">
                <Tb cmd="bold" icon="bold" title="Bold" />
                <Tb cmd="italic" icon="italic" title="Italic" />
                <span className="rte__sep" />
                <Tb cmd="formatBlock" val="<h2>" icon="heading" title="Heading" />
                <Tb cmd="formatBlock" val="<blockquote>" icon="quote" title="Quote" />
                <Tb cmd="insertUnorderedList" icon="list" title="List" />
              </div>
              <div className="rte__area prose-da" contentEditable ref={editRef} suppressContentEditableWarning />
            </div>
          </Field>
        </div>
      </div>
    );
  }

  // ── Departments (services) ──────────────────────────────────
  const ICONS = ['compass', 'cog', 'timer', 'radar'];
  function Services({ data, actions, editing, setEditing }) {
    const list = [...data.services].sort((a, b) => a.display_order - b.display_order);
    if (editing) return <ServiceEditor svc={editing === 'new' ? null : editing} count={list.length} actions={actions} onDone={() => setEditing(null)} />;
    return (
      <div className="apage">
        <PageHead title="The Departments" sub="Four distinct operations. One point of contact.">
          <button className="abtn abtn--primary" onClick={() => setEditing('new')}><Icon name="plus" size={14} /> Add department</button>
        </PageHead>
        <div className="svc-list">
          {list.map((svc, i) => (
            <div className="svc-item" key={svc.id}>
              <div className="svc-item__icon"><Icon name={svc.icon} size={22} stroke={1.4} /></div>
              <div className="svc-item__body">
                <div className="svc-item__top"><h3>{svc.title}</h3><span className="svc-item__price">{svc.price}</span></div>
                <p>{svc.description}</p>
              </div>
              <div className="svc-item__ctrls">
                <button className="iconbtn" disabled={i === 0} onClick={() => actions.moveService(svc.id, -1)} title="Move up"><Icon name="chevronDown" size={15} style={{ transform: 'rotate(180deg)' }} /></button>
                <button className="iconbtn" disabled={i === list.length - 1} onClick={() => actions.moveService(svc.id, 1)} title="Move down"><Icon name="chevronDown" size={15} /></button>
                <button className="iconbtn" onClick={() => setEditing(svc)} title="Edit"><Icon name="edit" size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  function ServiceEditor({ svc, count, actions, onDone }) {
    const isNew = !svc;
    const [f, setF] = useState(svc || { title: '', description: '', price: 'From $', icon: 'compass' });
    const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
    function save() { actions.saveService({ ...f, id: svc?.id, display_order: svc?.display_order ?? count }); onDone(); }
    return (
      <div className="apage apage--narrow">
        <PageHead title={isNew ? 'New department' : 'Edit department'}>
          {!isNew && <button className="abtn abtn--danger" onClick={() => { if (confirm('Delete this department?')) { actions.deleteService(svc.id); onDone(); } }}><Icon name="trash" size={13} /> Delete</button>}
          <button className="abtn abtn--ghost" onClick={onDone}>Cancel</button>
          <button className="abtn abtn--primary" onClick={save} disabled={!f.title.trim()}><Icon name="save" size={13} /> Save</button>
        </PageHead>
        <div className="editor-stack">
          <Field label="Department name"><input className="ainput ainput--lg" value={f.title} onChange={set('title')} placeholder="The Design Bureau" /></Field>
          <Field label="Artifact icon">
            <div className="icon-picker">
              {ICONS.map((ic) => (
                <button key={ic} className={'icon-opt' + (f.icon === ic ? ' is-on' : '')} onClick={() => setF((p) => ({ ...p, icon: ic }))} type="button">
                  <Icon name={ic} size={22} stroke={1.4} />
                </button>
              ))}
            </div>
          </Field>
          <Field label="Description"><textarea className="ainput" rows={3} value={f.description} onChange={set('description')} /></Field>
          <Field label="Price" hint="(use the From $X convention)"><input className="ainput mono" value={f.price} onChange={set('price')} placeholder="From $2,400" /></Field>
        </div>
      </div>
    );
  }

  // ── Field Notes (testimonials) ──────────────────────────────
  function FieldNotes({ data, actions, editing, setEditing }) {
    const list = [...data.testimonials].sort((a, b) => a.display_order - b.display_order);
    if (editing) return <NoteEditor note={editing === 'new' ? null : editing} count={list.length} actions={actions} onDone={() => setEditing(null)} />;
    return (
      <div className="apage">
        <PageHead title="Field Notes" sub="Testimonials from the people you have helped.">
          <button className="abtn abtn--primary" onClick={() => setEditing('new')}><Icon name="plus" size={14} /> Add note</button>
        </PageHead>
        <div className="notes-admin">
          {list.map((t) => (
            <button className="note-admin" key={t.id} onClick={() => setEditing(t)}>
              <div className="note-admin__stars">{Array.from({ length: t.rating || 5 }).map((_, i) => <Icon key={i} name="star" size={12} color="var(--signal)" style={{ fill: 'var(--signal)' }} />)}</div>
              <p className="note-admin__quote">&ldquo;{t.content}&rdquo;</p>
              <div className="note-admin__by"><strong>{t.author_name}</strong><span>{t.author_role}</span></div>
              <Icon name="edit" size={14} className="note-admin__edit" />
            </button>
          ))}
        </div>
      </div>
    );
  }
  function NoteEditor({ note, count, actions, onDone }) {
    const isNew = !note;
    const [f, setF] = useState(note || { author_name: '', author_role: '', content: '', rating: 5 });
    const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
    function save() { actions.saveTestimonial({ ...f, id: note?.id, rating: Number(f.rating), display_order: note?.display_order ?? count }); onDone(); }
    return (
      <div className="apage apage--narrow">
        <PageHead title={isNew ? 'New field note' : 'Edit field note'}>
          {!isNew && <button className="abtn abtn--danger" onClick={() => { if (confirm('Delete this note?')) { actions.deleteTestimonial(note.id); onDone(); } }}><Icon name="trash" size={13} /> Delete</button>}
          <button className="abtn abtn--ghost" onClick={onDone}>Cancel</button>
          <button className="abtn abtn--primary" onClick={save} disabled={!f.content.trim()}><Icon name="save" size={13} /> Save</button>
        </PageHead>
        <div className="editor-stack">
          <Field label="Quote"><textarea className="ainput" rows={4} value={f.content} onChange={set('content')} placeholder="What did they say?" /></Field>
          <div className="afield-row">
            <Field label="Author name"><input className="ainput" value={f.author_name} onChange={set('author_name')} /></Field>
            <Field label="Rating">
              <select className="ainput ainput--select" value={f.rating} onChange={set('rating')}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}</select>
            </Field>
          </div>
          <Field label="Author role / business"><input className="ainput" value={f.author_role} onChange={set('author_role')} placeholder="Vance & Daughters Hardware · Kingman" /></Field>
        </div>
      </div>
    );
  }

  // ── Command Center (messages) ───────────────────────────────
  function Messages({ data, actions }) {
    const list = [...data.messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const [open, setOpen] = useState(list[0]?.id ?? null);
    const active = list.find((m) => m.id === open);
    return (
      <div className="apage">
        <PageHead title="The Command Center" sub="Transmissions from the contact form arrive here." />
        <div className="cc">
          <div className="cc__list">
            {list.map((m) => (
              <button className={'cc__item' + (m.id === open ? ' is-open' : '') + (!m.read ? ' is-unread' : '')} key={m.id}
                onClick={() => { setOpen(m.id); if (!m.read) actions.markRead(m.id, true); }}>
                <div className="cc__item-top">
                  <span className="cc__from">{!m.read && <span className="da-signal-dot cc__unread" />}{m.name}</span>
                  <span className="cc__time">{fmtAgo(m.created_at)}</span>
                </div>
                <span className="cc__subj">{m.subject || '(no subject)'}</span>
                <span className="cc__snip">{m.message}</span>
              </button>
            ))}
            {!list.length && <p className="empty">No transmissions yet.</p>}
          </div>
          {active ? (
            <div className="cc__detail">
              <div className="cc__detail-head">
                <div>
                  <h3>{active.subject || '(no subject)'}</h3>
                  <p className="cc__detail-from">{active.name} · <a href={'mailto:' + active.email}>{active.email}</a>{active.phone && ' · ' + active.phone}</p>
                </div>
                <div className="cc__detail-actions">
                  <button className="iconbtn" title={active.read ? 'Mark unread' : 'Mark read'} onClick={() => actions.markRead(active.id, !active.read)}><Icon name="eye" size={15} /></button>
                  <button className="iconbtn" title="Delete" onClick={() => { if (confirm('Delete this transmission?')) { actions.deleteMessage(active.id); setOpen(null); } }}><Icon name="trash" size={15} /></button>
                </div>
              </div>
              <p className="cc__body">{active.message}</p>
              <div className="cc__reply">
                <a className="abtn abtn--primary" href={'mailto:' + active.email}><Icon name="mail" size={13} /> Reply by email</a>
                <span className="cc__received">Received {fmtDate(active.created_at)}</span>
              </div>
            </div>
          ) : <div className="cc__detail cc__detail--empty">Select a transmission to read it.</div>}
        </div>
      </div>
    );
  }

  // ── Settings ────────────────────────────────────────────────
  const SETTING_GROUPS = [
    { title: 'Identity', fields: [
      { key: 'site_title', label: 'Business name' },
      { key: 'tagline', label: 'Tagline', type: 'textarea' },
      { key: 'brand_color', label: 'Brand color', type: 'color' },
    ]},
    { title: 'The Lobby (hero)', fields: [
      { key: 'hero_title', label: 'Hero headline', type: 'textarea' },
      { key: 'hero_subtitle', label: 'Hero subheading', type: 'textarea' },
      { key: 'hero_cta_text', label: 'Hero button text' },
    ]},
    { title: 'About', fields: [
      { key: 'about_title', label: 'About title' },
      { key: 'about_body', label: 'About text', type: 'textarea', rows: 5 },
    ]},
    { title: 'Contact', fields: [
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'address', label: 'Location line', type: 'textarea' },
      { key: 'business_hours', label: 'Business hours' },
    ]},
  ];
  const SWATCHES = ['#3A7BD5', '#C5301A', '#1F8A5B', '#7A5AE0', '#B7791F'];
  function Settings({ data, actions, onToast }) {
    const [v, setV] = useState(data.settings);
    const [dirty, setDirty] = useState(false);
    const set = (k) => (e) => { setV((p) => ({ ...p, [k]: e.target.value })); setDirty(true); };
    const setVal = (k, val) => { setV((p) => ({ ...p, [k]: val })); setDirty(true); };
    function save() { actions.saveSettings(v); setDirty(false); onToast && onToast('Settings saved · Live site updated'); }
    return (
      <div className="apage apage--narrow">
        <PageHead title="Site Settings" sub="The words and identity of the public site.">
          {dirty && <span className="dirty-dot">Unsaved</span>}
          <button className="abtn abtn--primary" onClick={save} disabled={!dirty}><Icon name="save" size={13} /> Save changes</button>
        </PageHead>
        {SETTING_GROUPS.map((g) => (
          <section className="settings-group" key={g.title}>
            <h2 className="asubhead">{g.title}</h2>
            <div className="settings-card">
              {g.fields.map((fld) => (
                <Field key={fld.key} label={fld.label}>
                  {fld.type === 'textarea' ? (
                    <textarea className="ainput" rows={fld.rows || 2} value={v[fld.key] || ''} onChange={set(fld.key)} />
                  ) : fld.type === 'color' ? (
                    <div className="color-row">
                      <span className="color-chip" style={{ background: v[fld.key] }} />
                      {SWATCHES.map((c) => (
                        <button key={c} type="button" className={'swatch' + (v[fld.key] === c ? ' is-on' : '')} style={{ background: c }} onClick={() => setVal(fld.key, c)} />
                      ))}
                      <input className="ainput mono color-hex" value={v[fld.key] || ''} onChange={set(fld.key)} />
                    </div>
                  ) : (
                    <input className="ainput" value={v[fld.key] || ''} onChange={set(fld.key)} />
                  )}
                </Field>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  // ── Nav chrome ──────────────────────────────────────────────
  function Brand({ collapsed }) {
    return <div className="admin-brand"><span className="da-pulse" />{!collapsed && <span>Site Admin</span>}</div>;
  }
  function NavItems({ section, go, collapsed }) {
    const cur = section.split(':')[0];
    return NAV.map((n) => (
      <button key={n.id} className={'navitem' + (cur === n.id ? ' is-active' : '')} onClick={() => go(n.id)} title={n.label}>
        <Icon name={n.icon} size={15} />{!collapsed && <span>{n.label}</span>}
      </button>
    ));
  }

  function AdminApp({ data, actions, layout = 'topbar', chrome = 'dark', section, setSection, onViewSite, onToast }) {
    const base = section.split(':')[0];
    const sub = section.split(':')[1];
    const [svcEditing, setSvcEditing] = useState(null);
    const [noteEditing, setNoteEditing] = useState(null);
    const go = (id) => { setSection(id); setSvcEditing(null); setNoteEditing(null); };

    // posts editor state derived from section ("posts:new" or "posts:edit")
    const [editingPost, setEditingPost] = useState(null);
    useEffect(() => {
      if (base !== 'posts') setEditingPost(null);
      if (section === 'posts:new') setEditingPost('new');
    }, [section]);

    let content;
    if (base === 'dashboard') content = <Dashboard data={data} setSection={go} onViewSite={onViewSite} />;
    else if (base === 'posts') {
      if (editingPost === 'new') content = <PostEditor actions={actions} onDone={() => { setEditingPost(null); setSection('posts'); }} />;
      else if (editingPost) content = <PostEditor post={editingPost} actions={actions} onDone={() => { setEditingPost(null); setSection('posts'); }} />;
      else content = <PostsList data={data} setSection={go} onEdit={(p) => setEditingPost(p)} />;
    }
    else if (base === 'services') content = <Services data={data} actions={actions} editing={svcEditing} setEditing={setSvcEditing} />;
    else if (base === 'testimonials') content = <FieldNotes data={data} actions={actions} editing={noteEditing} setEditing={setNoteEditing} />;
    else if (base === 'messages') content = <Messages data={data} actions={actions} />;
    else if (base === 'settings') content = <Settings data={data} actions={actions} onToast={onToast} />;

    const unread = data.messages.filter((m) => !m.read).length;

    return (
      <div className={'admin admin--' + layout + ' admin--' + chrome}>
        {layout === 'topbar' && (
          <header className="admin-topbar">
            <Brand />
            <nav className="admin-topbar__nav"><NavItems section={section} go={go} /></nav>
            <div className="admin-topbar__right">
              {unread > 0 && <span className="admin-badge">{unread}</span>}
              <button className="admin-user" onClick={onViewSite} title="View live site"><Icon name="external" size={13} /> View site</button>
            </div>
          </header>
        )}
        {(layout === 'sidebar' || layout === 'rail') && (
          <aside className={'admin-side' + (layout === 'rail' ? ' admin-side--rail' : '')}>
            <Brand collapsed={layout === 'rail'} />
            <nav className="admin-side__nav"><NavItems section={section} go={go} collapsed={layout === 'rail'} /></nav>
            <button className="navitem navitem--foot" onClick={onViewSite} title="View live site"><Icon name="external" size={15} />{layout !== 'rail' && <span>View live site</span>}</button>
          </aside>
        )}
        <main className="admin-main">{content}</main>
      </div>
    );
  }

  window.AdminApp = AdminApp;
})();
