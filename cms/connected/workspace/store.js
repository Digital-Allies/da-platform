/* ============================================================
   Digital Allies — CMS Workspace store
   Multi-client, plan-aware. One observable store persisted to
   localStorage. Each CLIENT owns its own site content (pages,
   articles, departments, field notes, messages, projects).
   The admin edits a client; the "live site" reads the same data.
   ============================================================ */
(function () {
  const LS_KEY = 'da_cms_workspace_v1';

  // ── Plans ─────────────────────────────────────────────────────
  const PLANS = [
    {
      id: 'starter', name: 'Starter', price: '$0', tier: 0,
      blurb: 'One site. Pages, articles, settings.',
      modules: ['dashboard', 'content'],
    },
    {
      id: 'studio', name: 'Studio', price: 'From $49/mo', tier: 1,
      blurb: 'Add project boards and a research archive.',
      modules: ['dashboard', 'content', 'projects', 'research'],
    },
    {
      id: 'agency', name: 'Agency', price: 'From $149/mo', tier: 2,
      blurb: 'Everything, plus multi-client and the dev workshop.',
      modules: ['dashboard', 'content', 'projects', 'research', 'development'],
      perks: ['Manage unlimited client sites', 'White-label the admin', 'The Workshop (dev tracker)'],
    },
  ];

  const MODULES = [
    { id: 'dashboard',   label: 'Dashboard',   brand: 'Dashboard',          icon: 'dashboard', generic: true },
    { id: 'content',     label: 'Content',     brand: 'The Press Office',    icon: 'fileText',  generic: false },
    { id: 'projects',    label: 'Projects',    brand: 'Projects',           icon: 'grid',      generic: true },
    { id: 'research',    label: 'Research',    brand: 'Research',           icon: 'briefcase', generic: true },
    { id: 'development', label: 'Development', brand: 'The Workshop',       icon: 'plug',      generic: true },
  ];

  // ── Page-builder block factory ────────────────────────────────
  const uid = (p) => (p || 'id') + '-' + Math.random().toString(36).slice(2, 9);

  // ── Owner site (Digital Allies) — rich seed ───────────────────
  const DA_SETTINGS = {
    site_title: 'Digital Allies',
    tagline: 'Technological Solutions for People with Better Things to Do.',
    phone: '(928) 228-5769',
    email: 'contact@digitalallies.net',
    address: 'Based in Kingman, AZ · Serving Everywhere Else',
    business_hours: 'Mon–Fri · 8a–6p MST · I answer the phone.',
    hero_title: 'Technological Solutions for People with Better Things to Do.',
    hero_subtitle:
      "I build systems that don't require a master's degree to operate. Clean engineering, clear communication, and follow-through that won't require follow up.",
    hero_cta_text: 'Inquire Within',
    about_title: 'The Knowledgeable Neighbor',
    about_body:
      "I am historically easy to reach. I live in Kingman. If you call, I answer. It is a very avant-garde concept called \u201CDoing My Job.\u201D\n\nStrategy is free. Execution is paid. All quotes are given before work begins \u2014 no surprises, no silent scope creep.",
  };

  const DA_PAGES = [
    {
      id: 'pg-home', title: 'Home', slug: '/', status: 'published', updated_at: '2025-03-01T12:00:00Z',
      blocks: [
        { id: uid('blk'), type: 'hero', data: { eyebrow: 'BASED IN KINGMAN, AZ · SERVING EVERYWHERE ELSE', heading: DA_SETTINGS.hero_title, body: DA_SETTINGS.hero_subtitle, cta: 'Inquire Within' } },
        { id: uid('blk'), type: 'departments', data: { heading: 'The Departments', sub: 'Four distinct operations. One point of contact.' } },
        { id: uid('blk'), type: 'fieldNotes', data: { heading: 'Field Notes' } },
        { id: uid('blk'), type: 'cta', data: { heading: 'Need a strategic ally?', button: 'Send a Transmission' } },
      ],
    },
    {
      id: 'pg-about', title: 'About', slug: '/about', status: 'published', updated_at: '2025-02-20T12:00:00Z',
      blocks: [
        { id: uid('blk'), type: 'richtext', data: { heading: 'The Knowledgeable Neighbor', body: DA_SETTINGS.about_body } },
        { id: uid('blk'), type: 'cta', data: { heading: 'Have something to build?', button: 'Inquire Within' } },
      ],
    },
    {
      id: 'pg-services', title: 'Services', slug: '/services', status: 'draft', updated_at: '2025-03-04T09:00:00Z',
      blocks: [
        { id: uid('blk'), type: 'departments', data: { heading: 'The Departments', sub: 'Pick a bureau.' } },
      ],
    },
  ];

  const DA_DEPARTMENTS = [
    { id: 'svc-1', title: 'The Design Bureau', icon: 'compass', price: 'From $2,400', description: 'Your logo, site, and words look like they know each other. Brand, identity, and a website that earns its keep.', display_order: 0 },
    { id: 'svc-2', title: 'Dept. of Cooperation', icon: 'cog', price: 'From $1,800', description: 'Your apps talk to each other. You don\u2019t have to. Integrations that quietly move data where it needs to go.', display_order: 1 },
    { id: 'svc-3', title: 'The Self-Governing Bureau', icon: 'timer', price: 'From $1,200', description: 'Repetitive tasks are for machines. Go take a real lunch break. Automation that runs without you watching.', display_order: 2 },
    { id: 'svc-4', title: 'The Permanent Observation Post', icon: 'radar', price: 'From $300/mo', description: 'Monitoring runs 24/7. If something breaks at 2am, that\u2019s my problem \u2014 not yours.', display_order: 3 },
  ];

  const DA_NOTES = [
    { id: 'tst-1', author_name: 'Marguerite Vance', author_role: 'Vance & Daughters Hardware · Kingman', rating: 5, content: 'He picked up the phone on the first ring, every single time. The new ordering system saved my Saturdays.', display_order: 0 },
    { id: 'tst-2', author_name: 'Dr. Elias Knox', author_role: 'Knox Family Dental', rating: 5, content: 'No jargon, no runaround. He explained the whole thing in plain English, gave the quote before starting, and finished early. Rare.', display_order: 1 },
    { id: 'tst-3', author_name: 'Pilar Ortega', author_role: 'Ortega Route 66 Diner', rating: 5, content: 'The reservations and the website finally talk to each other. My host stand stopped double-booking tables.', display_order: 2 },
  ];

  const DA_ARTICLES = [
    { id: 'post-1', title: 'Why I answer the phone', slug: 'why-i-answer-the-phone', excerpt: 'A short defense of a radical business practice: being reachable.', content: '<p>There is a strange idea in this industry that being hard to reach makes you important. I disagree. If you call, I answer.</p>', status: 'published', published_at: '2025-02-18T15:00:00Z', updated_at: '2025-02-18T15:00:00Z' },
    { id: 'post-2', title: 'The Jargon Jar: a translation guide', slug: 'the-jargon-jar', excerpt: 'Corporate speak, translated into things a human being would actually say.', content: '<p>"Leverage synergies across touchpoints" means "make the parts work together." That is the whole jar.</p>', status: 'published', published_at: '2025-01-30T15:00:00Z', updated_at: '2025-01-30T15:00:00Z' },
    { id: 'post-3', title: 'On the Reciprocity Loop (draft)', slug: 'the-reciprocity-loop', excerpt: 'Strategy is free. Execution is paid. Here is why that works.', content: '<p>I do not charge for conversations or clarity. Call it a professional courtesy.</p>', status: 'draft', published_at: null, updated_at: '2025-03-02T18:30:00Z' },
  ];

  const DA_MESSAGES = [
    { id: 'msg-1', name: 'Theodore Brandt', email: 'theo@brandtmotors.com', phone: '(928) 555-0147', subject: 'Website + booking for the shop', message: 'Saw your site. My current one is held together with tape. Can we talk about a rebuild and an online booking thing for the garage?', read: false, created_at: '2025-03-04T17:42:00Z' },
    { id: 'msg-2', name: 'Ruth Calloway', email: 'ruth.calloway@gmail.com', phone: null, subject: 'Automating invoices', message: 'I spend every Friday typing invoices by hand. A friend said you might be able to make that stop happening. Please.', read: false, created_at: '2025-03-03T09:12:00Z' },
    { id: 'msg-3', name: 'Sam Whitfield', email: 'sam@whitfieldlaw.net', phone: '(602) 555-0190', subject: 'Quick question on monitoring', message: 'What does the Permanent Observation Post actually cover? Do you watch the site overnight?', read: true, created_at: '2025-02-28T20:05:00Z' },
  ];

  const DA_PROJECTS = [
    {
      id: 'prj-1', name: 'Brandt Motors — rebuild', description: 'Full site rebuild + online booking for the garage.',
      columns: ['Backlog', 'In Progress', 'Review', 'Done'],
      tasks: [
        { id: 't1', title: 'Sitemap + content inventory', column: 'Done', priority: 'High', due: '2025-03-08' },
        { id: 't2', title: 'Homepage layout in CMS', column: 'In Progress', priority: 'High', due: '2025-03-14' },
        { id: 't3', title: 'Booking integration (Calendly)', column: 'In Progress', priority: 'Medium', due: '2025-03-18' },
        { id: 't4', title: 'Migrate 6 service pages', column: 'Backlog', priority: 'Medium', due: '2025-03-22' },
        { id: 't5', title: 'Launch checklist + DNS', column: 'Backlog', priority: 'Low', due: '2025-03-28' },
      ],
    },
    {
      id: 'prj-2', name: 'Knox Dental — automation', description: 'Invoice + reminder automation.',
      columns: ['Backlog', 'In Progress', 'Review', 'Done'],
      tasks: [
        { id: 't6', title: 'Map current invoice flow', column: 'Done', priority: 'High', due: '2025-03-05' },
        { id: 't7', title: 'Zapier → QuickBooks bridge', column: 'Review', priority: 'High', due: '2025-03-12' },
        { id: 't8', title: 'SMS appointment reminders', column: 'Backlog', priority: 'Medium', due: '2025-03-20' },
      ],
    },
  ];

  // ── Client sites ──────────────────────────────────────────────
  function emptySite(over) {
    return Object.assign({
      settings: {}, pages: [], articles: [], departments: [], fieldNotes: [], messages: [], projects: [],
    }, over);
  }

  const SEED = {
    activeClient: 'da',
    clients: [
      {
        id: 'da', name: 'Digital Allies', domain: 'digitalallies.net', initials: 'DA',
        plan: 'agency', brand_color: '#3A7BD5', owner: true,
        live_url: 'https://digitalallies.net',
        admin_url: 'https://da-webwssite-build-workflows.vercel.app/',
        site: emptySite({
          settings: DA_SETTINGS, pages: DA_PAGES, articles: DA_ARTICLES,
          departments: DA_DEPARTMENTS, fieldNotes: DA_NOTES, messages: DA_MESSAGES, projects: DA_PROJECTS,
        }),
      },
      {
        id: 'brandt', name: 'Brandt Motors', domain: 'brandtmotors.com', initials: 'BM',
        plan: 'starter', brand_color: '#C5301A',
        live_url: 'https://digitalallies.net', admin_url: '',
        site: emptySite({
          settings: { site_title: 'Brandt Motors', tagline: 'Honest repair since 1986. Kingman, AZ.', phone: '(928) 555-0147', email: 'theo@brandtmotors.com', address: 'Andy Devine Ave · Kingman, AZ', hero_title: 'Your truck, back on the road by Friday.', hero_subtitle: 'Diagnostics, brakes, and the stuff that goes wrong on Route 66. Book online — we answer the phone too.', hero_cta_text: 'Book a service', about_title: 'Three bays. Two mechanics. No surprises.', about_body: 'We tell you what it needs and what it costs before we touch it.' },
          pages: [
            { id: 'bm-home', title: 'Home', slug: '/', status: 'published', updated_at: '2025-03-04T10:00:00Z', blocks: [
              { id: uid('blk'), type: 'hero', data: { eyebrow: 'KINGMAN, AZ · SINCE 1986', heading: 'Your truck, back on the road by Friday.', body: 'Diagnostics, brakes, and the stuff that goes wrong on Route 66.', cta: 'Book a service' } },
              { id: uid('blk'), type: 'cta', data: { heading: 'Need it looked at?', button: 'Book a service' } },
            ] },
            { id: 'bm-svc', title: 'Services', slug: '/services', status: 'draft', updated_at: '2025-03-04T10:30:00Z', blocks: [ { id: uid('blk'), type: 'richtext', data: { heading: 'What we do', body: 'Brakes. Diagnostics. A/C. Tires. Pre-trip inspections.' } } ] },
          ],
          articles: [],
          departments: [],
          fieldNotes: [ { id: 'bm-n1', author_name: 'Dale R.', author_role: 'Regular since 2009', rating: 5, content: 'Fixed in a day, charged what they quoted. Nobody does that anymore.', display_order: 0 } ],
          messages: [ { id: 'bm-m1', name: 'Cindy Ross', email: 'cindy@example.com', phone: null, subject: 'Brake noise', message: 'Grinding when I stop. Can I come in Thursday?', read: false, created_at: '2025-03-05T08:00:00Z' } ],
          projects: [],
        }),
      },
      {
        id: 'knox', name: 'Knox Family Dental', domain: 'knoxfamilydental.com', initials: 'KD',
        plan: 'studio', brand_color: '#1F8A5B',
        live_url: 'https://digitalallies.net', admin_url: '',
        site: emptySite({
          settings: { site_title: 'Knox Family Dental', tagline: 'Gentle dentistry for the whole family.', phone: '(928) 555-0202', email: 'front@knoxfamilydental.com', address: 'Stockton Hill Rd · Kingman, AZ', hero_title: 'A dentist your kids won\u2019t dread.', hero_subtitle: 'Cleanings, checkups, and same-week emergencies. New patients welcome.', hero_cta_text: 'Request appointment', about_title: 'Dr. Elias Knox, DDS', about_body: 'Twenty years keeping Kingman smiling.' },
          pages: [
            { id: 'kd-home', title: 'Home', slug: '/', status: 'published', updated_at: '2025-03-02T11:00:00Z', blocks: [
              { id: uid('blk'), type: 'hero', data: { eyebrow: 'KINGMAN, AZ · NEW PATIENTS WELCOME', heading: 'A dentist your kids won\u2019t dread.', body: 'Cleanings, checkups, and same-week emergencies.', cta: 'Request appointment' } },
              { id: uid('blk'), type: 'fieldNotes', data: { heading: 'What patients say' } },
            ] },
          ],
          articles: [ { id: 'kd-a1', title: 'When should kids see a dentist?', slug: 'kids-first-visit', excerpt: 'Sooner than you think.', content: '<p>By the first birthday, ideally.</p>', status: 'published', published_at: '2025-02-10T15:00:00Z', updated_at: '2025-02-10T15:00:00Z' } ],
          departments: [],
          fieldNotes: [ { id: 'kd-n1', author_name: 'The Ortega family', author_role: 'Patients since 2018', rating: 5, content: 'Three kids, zero meltdowns. The staff is unreasonably kind.', display_order: 0 } ],
          messages: [],
          projects: [ { id: 'kd-p1', name: 'Patient portal', description: 'Online forms + reminders.', columns: ['Backlog', 'In Progress', 'Review', 'Done'], tasks: [ { id: 'kt1', title: 'Intake form builder', column: 'In Progress', priority: 'High', due: '2025-03-15' }, { id: 'kt2', title: 'SMS reminders', column: 'Backlog', priority: 'Medium', due: '2025-03-22' } ] } ],
        }),
      },
    ],
  };

  // ── Persistence ───────────────────────────────────────────────
  function load() {
    try { const raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return JSON.parse(JSON.stringify(SEED));
  }
  let state = load();
  const listeners = new Set();
  function persist() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} }
  function emit() { listeners.forEach((fn) => fn(state)); }

  const Store = {
    PLANS, MODULES,
    get: () => state,
    plan: (id) => PLANS.find((p) => p.id === id),
    activeClient: () => state.clients.find((c) => c.id === state.activeClient),
    can(clientOrId, moduleId) {
      const c = typeof clientOrId === 'string' ? state.clients.find((x) => x.id === clientOrId) : clientOrId;
      if (!c) return false;
      const pl = PLANS.find((p) => p.id === c.plan);
      return !!pl && pl.modules.includes(moduleId);
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    update(mutator) {
      const draft = JSON.parse(JSON.stringify(state));
      state = mutator(draft) || draft;
      persist(); emit();
    },
    setActive(id) { Store.update((d) => { d.activeClient = id; }); },
    reset() { state = JSON.parse(JSON.stringify(SEED)); persist(); emit(); },
    uid,
  };
  window.CMSWorkspace = Store;
})();
