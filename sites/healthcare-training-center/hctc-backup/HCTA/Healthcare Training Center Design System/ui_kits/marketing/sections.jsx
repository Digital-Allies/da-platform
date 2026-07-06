// sections.jsx — Marketing site sections. Exports to window.
// Reuses the 5-room concept. Loaded after React/Babel.

const { useState } = React;

const TRACKS = [
  { n: 1, name: 'Customer Service', icon: 'ph-users', color: '#3B7DD8',
    blurb: 'Communication, empathy, and de-escalation for every patient interaction.' },
  { n: 2, name: 'HIPAA, Privacy & Security', icon: 'ph-shield-check', color: '#2BA89A',
    blurb: 'Protect patient information, maintain privacy, and prevent data breaches.' },
  { n: 3, name: 'Compliance', icon: 'ph-clipboard-text', color: '#2EAA6E',
    blurb: 'Meet legal and ethical standards and build a culture of integrity.' },
  { n: 4, name: 'Medical Records', icon: 'ph-folder-open', color: '#7B5EA7',
    blurb: 'Keep records accurate, complete, and secure — every single time.' },
  { n: 5, name: 'Finance', icon: 'ph-currency-dollar', color: '#D4A017',
    blurb: 'Understand the revenue cycle and support accurate reimbursement.' },
];

/* ---------- Nav ---------- */
function SiteNav() {
  return (
    <header className="mk-nav">
      <div className="mk-nav-inner">
        <a className="mk-logo" href="#top">
          <span className="mk-logo-mark"><i className="ph-fill ph-first-aid"></i></span>
          <span className="mk-logo-word">Healthcare Training Center</span>
        </a>
        <nav className="mk-nav-links">
          <a href="#tracks">Training Rooms</a>
          <a href="#story">Our Story</a>
          <a href="#audience">Who It's For</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="mk-nav-cta">
          <a className="mk-btn mk-btn-ghost" href="#">Log In</a>
          <a className="mk-btn mk-btn-primary" href="#">Start Free Trial</a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="mk-hero" id="top">
      <div className="mk-hero-inner">
        <span className="mk-eyebrow mk-eyebrow-light">A New Innovative Way to Learn</span>
        <h1 className="mk-hero-title">Step Inside.<br/>Step Up.</h1>
        <p className="mk-hero-sub">
          A people-first training platform for healthcare professionals. Five training
          rooms. One mission: better care. Learn virtually — anytime, anywhere.
        </p>
        <div className="mk-hero-actions">
          <a className="mk-btn mk-btn-track mk-btn-lg" href="#tracks">Choose Your Training Path <i className="ph-bold ph-arrow-right"></i></a>
          <a className="mk-btn mk-btn-outline-light mk-btn-lg" href="#story">Why We Exist</a>
        </div>
        <div className="mk-hero-stats">
          <div><strong>5</strong><span>Training rooms</span></div>
          <div><strong>75+</strong><span>On-demand courses</span></div>
          <div><strong>WCAG AA</strong><span>Accessible by design</span></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Training tracks ---------- */
function TracksRow() {
  return (
    <section className="mk-section" id="tracks">
      <div className="mk-section-head">
        <span className="mk-eyebrow">Choose Your Training Path</span>
        <h2 className="mk-h2">Five rooms. One mission. Better healthcare.</h2>
        <p className="mk-lead">Each room is a focused world of its own — enter and the
          whole experience takes on its subject and color.</p>
      </div>
      <div className="mk-tracks">
        {TRACKS.map(t => (
          <article className="mk-track" key={t.n} style={{ '--c': t.color }}>
            <div className="mk-track-icon" style={{ background: t.color }}>
              <i className={'ph-fill ' + t.icon}></i>
            </div>
            <span className="mk-track-num">Room {t.n}</span>
            <h3 className="mk-track-name">{t.name}</h3>
            <p className="mk-track-blurb">{t.blurb}</p>
            <a className="mk-track-link" href="#" style={{ color: t.color }}>Explore room →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Founder story ---------- */
function StorySection() {
  return (
    <section className="mk-story" id="story">
      <div className="mk-story-inner">
        <div className="mk-story-quote">
          <span className="mk-quote-mark"><i className="ph-fill ph-quotes"></i></span>
          <p className="mk-quote">This system is broken — but <em>you</em> can be the
            change in it. Healthcare workers who understand <em>why</em> care matters
            don't just follow the rules. They treat people better.</p>
          <div className="mk-quote-by">
            <span className="mk-quote-name">Our Founder</span>
            <span className="mk-quote-role">Attorney &amp; patient advocate</span>
          </div>
        </div>
        <div className="mk-story-body">
          <span className="mk-eyebrow">Why This Exists</span>
          <h2 className="mk-h2">Built by a lawyer. Designed for people.</h2>
          <p>Our founder watched a family member receive care from people who knew the
            procedures but had never been taught the <em>why</em> behind them. The
            training existed to satisfy a regulation — not to serve a patient.</p>
          <p>Healthcare Training Center exists to close that gap: legally sound,
            patient-first training that leaves every learner more capable — and more
            humane — than when they arrived.</p>
          <a className="mk-btn mk-btn-secondary" href="#">Read our full story</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Who it's for ---------- */
function AudienceSplit() {
  return (
    <section className="mk-section" id="audience">
      <div className="mk-section-head">
        <span className="mk-eyebrow">Who It's For</span>
        <h2 className="mk-h2">Two paths into the same building.</h2>
      </div>
      <div className="mk-audience">
        <article className="mk-aud-card">
          <span className="mk-aud-icon" style={{ background: 'var(--color-navy)' }}><i className="ph-fill ph-buildings"></i></span>
          <h3 className="mk-h3">For Organizations</h3>
          <p>Train your whole team, assign required paths, set deadlines, and pull
            audit-ready compliance reports. Manage seats and billing in one portal.</p>
          <ul className="mk-checklist">
            <li><i className="ph-bold ph-check"></i> Team roster &amp; progress tracking</li>
            <li><i className="ph-bold ph-check"></i> Downloadable compliance reports</li>
            <li><i className="ph-bold ph-check"></i> Deadlines &amp; automated reminders</li>
          </ul>
          <a className="mk-btn mk-btn-primary mk-btn-full" href="#pricing">See org plans</a>
        </article>
        <article className="mk-aud-card">
          <span className="mk-aud-icon" style={{ background: 'var(--color-teal)' }}><i className="ph-fill ph-user"></i></span>
          <h3 className="mk-h3">For Individuals</h3>
          <p>Advance your career on your own schedule. Earn certificates and digital
            badges that prove your skills to current and future employers.</p>
          <ul className="mk-checklist">
            <li><i className="ph-bold ph-check"></i> Learn at your own pace</li>
            <li><i className="ph-bold ph-check"></i> Certificates of completion</li>
            <li><i className="ph-bold ph-check"></i> Mobile-friendly, learn anywhere</li>
          </ul>
          <a className="mk-btn mk-btn-secondary mk-btn-full" href="#pricing">See individual plan</a>
        </article>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function FeatureGrid() {
  const feats = [
    { icon: 'ph-monitor-play', t: 'Live & On-Demand', d: 'Instructor-led sessions plus a full on-demand library you can take anytime.' },
    { icon: 'ph-cube', t: 'Interactive Simulations', d: 'Real-world scenarios let you practice safely before it counts.' },
    { icon: 'ph-certificate', t: 'Certificates & Badges', d: 'Prove your skills and advance your career with shareable credentials.' },
    { icon: 'ph-device-mobile', t: 'Mobile Friendly', d: 'Train between shifts on any device — your progress follows you.' },
    { icon: 'ph-chart-line-up', t: 'Track Your Progress', d: 'A clear dashboard shows exactly how far you’ve come, room by room.' },
    { icon: 'ph-headset', t: 'Support When You Need It', d: 'A real help desk — live chat, FAQs, and people who want you to succeed.' },
  ];
  return (
    <section className="mk-features">
      <div className="mk-section-head mk-section-head-light">
        <span className="mk-eyebrow mk-eyebrow-light">A Better Way to Learn Virtually</span>
        <h2 className="mk-h2" style={{ color: '#fff' }}>Everything you need to get it right.</h2>
      </div>
      <div className="mk-feature-grid">
        {feats.map(f => (
          <article className="mk-feature" key={f.t}>
            <span className="mk-feature-icon"><i className={'ph ' + f.icon}></i></span>
            <h4 className="mk-feature-t">{f.t}</h4>
            <p className="mk-feature-d">{f.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  return (
    <section className="mk-section" id="pricing">
      <div className="mk-section-head">
        <span className="mk-eyebrow">Pricing</span>
        <h2 className="mk-h2">Simple plans for teams and individuals.</h2>
      </div>
      <div className="mk-pricing">
        <article className="mk-price">
          <h3 className="mk-price-name">Individual</h3>
          <div className="mk-price-amt"><span className="mk-price-cur">$</span>29<span className="mk-price-per">/mo</span></div>
          <p className="mk-price-sub">For one learner advancing their career.</p>
          <ul className="mk-checklist">
            <li><i className="ph-bold ph-check"></i> All 5 training rooms</li>
            <li><i className="ph-bold ph-check"></i> Certificates &amp; badges</li>
            <li><i className="ph-bold ph-check"></i> Live class access</li>
          </ul>
          <a className="mk-btn mk-btn-outline mk-btn-full" href="#">Start free trial</a>
        </article>
        <article className="mk-price mk-price-featured">
          <span className="mk-price-flag">Most popular</span>
          <h3 className="mk-price-name">Organization</h3>
          <div className="mk-price-amt"><span className="mk-price-cur">$</span>19<span className="mk-price-per">/seat/mo</span></div>
          <p className="mk-price-sub">For teams that need audit-ready compliance.</p>
          <ul className="mk-checklist">
            <li><i className="ph-bold ph-check"></i> Everything in Individual</li>
            <li><i className="ph-bold ph-check"></i> Admin portal &amp; roster</li>
            <li><i className="ph-bold ph-check"></i> Compliance reports &amp; deadlines</li>
            <li><i className="ph-bold ph-check"></i> Priority help desk</li>
          </ul>
          <a className="mk-btn mk-btn-primary mk-btn-full" href="#">Talk to sales</a>
        </article>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function SiteFooter() {
  return (
    <footer className="mk-footer">
      <div className="mk-footer-inner">
        <div className="mk-footer-brand">
          <a className="mk-logo" href="#top">
            <span className="mk-logo-mark"><i className="ph-fill ph-first-aid"></i></span>
            <span className="mk-logo-word">Healthcare Training Center</span>
          </a>
          <p className="mk-footer-tag">Empowering Knowledge. Enhancing Care.<br/>Building a Better Future.</p>
        </div>
        <div className="mk-footer-cols">
          <div><h5>Platform</h5><a href="#tracks">Training Rooms</a><a href="#">Live Classes</a><a href="#">Study Lounge</a><a href="#">Resources</a></div>
          <div><h5>Company</h5><a href="#story">Our Story</a><a href="#pricing">Pricing</a><a href="#">Contact</a><a href="#">Careers</a></div>
          <div><h5>Account</h5><a href="#">Log In</a><a href="#">Start Free Trial</a><a href="#">For Organizations</a></div>
        </div>
      </div>
      <div className="mk-footer-legal">
        <span>© 2026 Healthcare Training Center. All rights reserved.</span>
        <span>Learn. Grow. Make a Difference.</span>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteNav, Hero, TracksRow, StorySection, AudienceSplit, FeatureGrid, Pricing, SiteFooter });
