/* ============================================================
   PUBLIC SITE — digitalallies.net, rendered live from the store.
   Exports window.PublicSite({ data, device, onSubmitMessage })
   ============================================================ */
(function () {
  const { useState } = React;
  const Icon = window.Icon;

  const ICON_FOR = { compass: 'compass', cog: 'cog', timer: 'timer', radar: 'radar' };

  function Eyebrow({ children, tone }) {
    return <span className={'da-eyebrow' + (tone ? ' da-eyebrow--' + tone : '')}>{children}</span>;
  }

  function Bracket({ children, primary, href, onClick }) {
    return (
      <a className={'site-btn' + (primary ? ' site-btn--primary' : '')} href={href || '#'} onClick={onClick}>
        <span className="site-btn__bracket">[</span>
        <span>{children}</span>
        <span className="site-btn__bracket">]</span>
      </a>);

  }

  // ── Nav ─────────────────────────────────────────────────────
  function SiteNav({ s, compact, onNav }) {
    return (
      <header className="site-nav">
        <a className="site-brand" href="#top" onClick={(e) => {e.preventDefault();onNav('top');}}>
          <span className="da-pulse" />
          <span className="site-brand__word">{s.site_title}</span>
        </a>
        {!compact &&
        <nav className="site-nav__links">
            <a href="#departments" onClick={(e) => {e.preventDefault();onNav('departments');}}>The Departments</a>
            <a href="#fieldnotes" onClick={(e) => {e.preventDefault();onNav('fieldnotes');}}>Field Notes</a>
            <a href="#journal" onClick={(e) => {e.preventDefault();onNav('journal');}}>The Journal</a>
            <span className="site-nav__lang" style={{ color: "rgb(45, 45, 45)" }}>EN <span>|</span> ES</span>
          </nav>
        }
        <a className="site-btn site-btn--primary site-nav__cta" href="#contact" onClick={(e) => {e.preventDefault();onNav('contact');}}>
          <span className="site-btn__bracket">[</span><span>{s.hero_cta_text || 'Inquire Within'}</span><span className="site-btn__bracket">]</span>
        </a>
      </header>);

  }

  // ── Hero / The Lobby ────────────────────────────────────────
  function SiteHero({ s, onNav }) {
    return (
      <section className="site-hero" id="top">
        <Eyebrow>{s.address}</Eyebrow>
        <h1 className="site-hero__title da-display">{s.hero_title}</h1>
        <p className="site-hero__sub">{s.hero_subtitle}</p>
        <div className="site-hero__cta">
          <Bracket primary href="#contact" onClick={(e) => {e.preventDefault();onNav('contact');}}>{s.hero_cta_text || 'Inquire Within'}</Bracket>
          <Bracket href="#departments" onClick={(e) => {e.preventDefault();onNav('departments');}}>View the Departments</Bracket>
        </div>
        <div className="da-pinned site-hero__pin">
          Clean engineering, clear communication, and follow-through that won&rsquo;t require follow up.
        </div>
      </section>);

  }

  // ── The Departments ─────────────────────────────────────────
  function SiteDepartments({ services }) {
    if (!services.length) return null;
    return (
      <section className="site-section" id="departments">
        <div className="site-section__head">
          <Eyebrow tone="blue">The Departments</Eyebrow>
          <h2 className="site-section__title">Four distinct operations. One point of contact.</h2>
        </div>
        <div className="dept-grid">
          {services.map((svc) =>
          <article className="dept-card" key={svc.id}>
              <div className="dept-card__icon">
                <Icon name={ICON_FOR[svc.icon] || 'compass'} size={26} stroke={1.4} />
                <span className="dept-card__dot" />
              </div>
              <h3 className="dept-card__title">{svc.title}</h3>
              <p className="dept-card__desc">{svc.description}</p>
              <div className="dept-card__price">
                <span className="dept-card__price-label">Transparency Table</span>
                <span className="dept-card__price-val">{svc.price}</span>
              </div>
            </article>
          )}
        </div>
      </section>);

  }

  // ── About ───────────────────────────────────────────────────
  function SiteAbout({ s }) {
    if (!s.about_body) return null;
    return (
      <section className="site-section site-about" id="about">
        <div className="site-about__col">
          <Eyebrow>Field Manual · 01</Eyebrow>
          <h2 className="site-section__title">{s.about_title}</h2>
        </div>
        <div className="site-about__col">
          {s.about_body.split('\n\n').map((para, i) =>
          <p className="site-about__p" key={i}>{para}</p>
          )}
        </div>
      </section>);

  }

  // ── Field Notes (testimonials) ──────────────────────────────
  function SiteFieldNotes({ items }) {
    if (!items.length) return null;
    return (
      <section className="site-section" id="fieldnotes">
        <div className="site-section__head">
          <Eyebrow tone="blue">Archive: Field Notes</Eyebrow>
          <h2 className="site-section__title">What the neighbors say.</h2>
        </div>
        <div className="notes-grid">
          {items.map((t) =>
          <figure className="note-card" key={t.id}>
              <div className="note-card__stars">
                {Array.from({ length: t.rating || 5 }).map((_, i) =>
              <Icon key={i} name="star" size={13} stroke={0} color="var(--signal)" style={{ fill: 'var(--signal)' }} />
              )}
              </div>
              <blockquote className="note-card__quote">&ldquo;{t.content}&rdquo;</blockquote>
              <figcaption className="note-card__by">
                <span className="note-card__name">{t.author_name}</span>
                {t.author_role && <span className="note-card__role">{t.author_role}</span>}
              </figcaption>
            </figure>
          )}
        </div>
      </section>);

  }

  // ── The Journal (published posts) ───────────────────────────
  function SiteJournal({ posts }) {
    const live = posts.filter((p) => p.status === 'published');
    if (!live.length) return null;
    const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    return (
      <section className="site-section" id="journal">
        <div className="site-section__head">
          <Eyebrow tone="blue">The Journal</Eyebrow>
          <h2 className="site-section__title">Notes from the desk.</h2>
        </div>
        <div className="journal-list">
          {live.map((p) =>
          <article className="journal-row" key={p.id}>
              <div className="journal-row__meta">
                <span className="journal-row__date">{fmt(p.published_at)}</span>
              </div>
              <div className="journal-row__body">
                <h3 className="journal-row__title">{p.title}</h3>
                {p.excerpt && <p className="journal-row__excerpt">{p.excerpt}</p>}
                <span className="journal-row__more">Read the post <Icon name="arrowRight" size={13} /></span>
              </div>
            </article>
          )}
        </div>
      </section>);

  }

  // ── The Command Center (contact) ────────────────────────────
  function SiteContact({ s, onSubmitMessage }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
    function submit(e) {
      e.preventDefault();
      if (!form.name || !form.email || !form.message) return;
      onSubmitMessage(form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }
    return (
      <section className="site-section site-contact" id="contact">
        <div className="site-contact__intro">
          <Eyebrow tone="blue">The Command Center</Eyebrow>
          <h2 className="site-section__title">Send a Transmission.</h2>
          <p className="site-contact__lead" style={{ color: "rgb(249, 246, 240)" }}>
            I am historically easy to reach. I live in Kingman. If you call, I answer.
          </p>
          <ul className="site-contact__lines">
            <li><Icon name="phone" size={15} /> {s.phone}</li>
            <li><Icon name="mail" size={15} /> {s.email}</li>
            <li><Icon name="clock" size={15} /> {s.business_hours}</li>
          </ul>
        </div>
        <form className="transmission" onSubmit={submit}>
          <div className="transmission__row">
            <label className="field">
              <span className="field__label">Name</span>
              <input className="field__input" value={form.name} onChange={set('name')} required />
            </label>
            <label className="field">
              <span className="field__label">Email</span>
              <input className="field__input" type="email" value={form.email} onChange={set('email')} required />
            </label>
          </div>
          <div className="transmission__row">
            <label className="field">
              <span className="field__label">Phone <em>(optional)</em></span>
              <input className="field__input" value={form.phone} onChange={set('phone')} />
            </label>
            <label className="field">
              <span className="field__label">Subject</span>
              <input className="field__input" value={form.subject} onChange={set('subject')} />
            </label>
          </div>
          <label className="field">
            <span className="field__label">Message</span>
            <textarea className="field__input" rows={4} value={form.message} onChange={set('message')} required />
          </label>
          <div className="transmission__foot">
            <button className="site-btn site-btn--primary" type="submit">
              <span className="site-btn__bracket">[</span><span>Submit Transmission</span><span className="site-btn__bracket">]</span>
            </button>
            {sent && <span className="transmission__sent"><Icon name="check" size={14} /> Received. Anthony will reply in person.</span>}
          </div>
        </form>
      </section>);

  }

  // ── Footer ──────────────────────────────────────────────────
  function SiteFooter({ s }) {
    return (
      <footer className="site-footer">
        <div className="site-footer__main">
          <div>
            <p className="site-footer__big">Need a strategic ally?</p>
            <a className="site-btn site-btn--primary" href="#contact">
              <span className="site-btn__bracket">[</span><span>Inquire Within</span><span className="site-btn__bracket">]</span>
            </a>
          </div>
          <div className="site-footer__meta">
            <div className="site-brand"><span className="da-pulse" /><span className="site-brand__word">{s.site_title}</span></div>
            <p>{s.address}</p>
            <p>{s.phone} · {s.email}</p>
            <p className="site-footer__fine">High-end engineering delivered with the enthusiasm of a librarian on a Tuesday.</p>
          </div>
        </div>
      </footer>);

  }

  function PublicSite({ data, device, onSubmitMessage }) {
    const s = data.settings;
    const scrollRef = React.useRef(null);
    const compact = device === 'phone';
    function onNav(id) {
      const root = scrollRef.current;
      if (!root) return;
      const el = id === 'top' ? root : root.querySelector('#' + id);
      if (el) root.scrollTo({ top: id === 'top' ? 0 : el.offsetTop - 12, behavior: 'smooth' });
    }
    return (
      <div className={'site-root' + (compact ? ' site-root--phone' : '')}
      style={{ '--accent': s.brand_color, '--site-accent': s.brand_color }}>
        <div className="site-scroll da-lace" ref={scrollRef}>
          <SiteNav s={s} compact={compact} onNav={onNav} />
          <SiteHero s={s} onNav={onNav} />
          <SiteDepartments services={[...data.services].sort((a, b) => a.display_order - b.display_order)} />
          <SiteAbout s={s} />
          <SiteFieldNotes items={[...data.testimonials].sort((a, b) => a.display_order - b.display_order)} />
          <SiteJournal posts={data.posts} />
          <SiteContact s={s} onSubmitMessage={onSubmitMessage} />
          <SiteFooter s={s} />
        </div>
      </div>);

  }

  window.PublicSite = PublicSite;
})();