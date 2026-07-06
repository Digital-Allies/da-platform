/* ============================================================
   Connected CMS — shared data store
   A tiny observable store, persisted to localStorage, that BOTH
   the admin CMS and the public site read from. Editing in admin
   mutates this store; the live site re-renders from it. That is
   the "connected" magic.
   ============================================================ */
(function () {
  const LS_KEY = 'da_connected_cms_v1';

  // ── Seed content — Digital Allies, the real brand ──────────────
  const SEED = {
    settings: {
      site_title: 'Digital Allies',
      tagline: 'Technological Solutions for People with Better Things to Do.',
      site_description:
        'A one-person technology shop in Kingman, AZ. I build systems that work and explain them in plain English.',
      phone: '(928) 228-5769',
      email: 'contact@digitalallies.net',
      address: 'Based in Kingman, AZ · Serving Everywhere Else',
      business_hours: 'Mon–Fri · 8a–6p MST · I answer the phone.',
      brand_color: '#3A7BD5',
      hero_title: 'Technological Solutions for People with Better Things to Do.',
      hero_subtitle:
        "I build systems that don't require a master's degree to operate. Clean engineering, clear communication, and follow-through that won't require follow up.",
      hero_cta_text: 'Inquire Within',
      hero_cta_link: '#contact',
      about_title: 'The Knowledgeable Neighbor',
      about_body:
        "I am historically easy to reach. I live in Kingman. If you call, I answer. It is a very avant-garde concept called \u201CDoing My Job.\u201D\n\nStrategy is free. Execution is paid. All quotes are given before work begins \u2014 no surprises, no silent scope creep.",
    },

    // The Departments
    services: [
      {
        id: 'svc-1',
        title: 'The Design Bureau',
        icon: 'compass',
        price: 'From $2,400',
        description:
          'Your logo, site, and words look like they know each other. Brand, identity, and a website that earns its keep.',
        display_order: 0,
      },
      {
        id: 'svc-2',
        title: 'Dept. of Cooperation',
        icon: 'cog',
        price: 'From $1,800',
        description:
          'Your apps talk to each other. You don\u2019t have to. Integrations that quietly move data where it needs to go.',
        display_order: 1,
      },
      {
        id: 'svc-3',
        title: 'The Self-Governing Bureau',
        icon: 'timer',
        price: 'From $1,200',
        description:
          'Repetitive tasks are for machines. Go take a real lunch break. Automation that runs without you watching.',
        display_order: 2,
      },
      {
        id: 'svc-4',
        title: 'The Permanent Observation Post',
        icon: 'radar',
        price: 'From $300/mo',
        description:
          'Monitoring runs 24/7. If something breaks at 2am, that\u2019s my problem \u2014 not yours.',
        display_order: 3,
      },
    ],

    // Field Notes
    testimonials: [
      {
        id: 'tst-1',
        author_name: 'Marguerite Vance',
        author_role: 'Vance & Daughters Hardware · Kingman',
        rating: 5,
        content:
          'He picked up the phone on the first ring, every single time. The new ordering system saved my Saturdays. I do not know what half of it does and I do not need to.',
        display_order: 0,
      },
      {
        id: 'tst-2',
        author_name: 'Dr. Elias Knox',
        author_role: 'Knox Family Dental',
        rating: 5,
        content:
          'No jargon, no runaround. He explained the whole thing in plain English, gave the quote before starting, and finished early. Rare.',
        display_order: 1,
      },
      {
        id: 'tst-3',
        author_name: 'Pilar Ortega',
        author_role: 'Ortega Route 66 Diner',
        rating: 5,
        content:
          'The reservations and the website finally talk to each other. My host stand stopped double-booking tables. Worth every dollar.',
        display_order: 2,
      },
    ],

    // Posts
    posts: [
      {
        id: 'post-1',
        title: 'Why I answer the phone',
        slug: 'why-i-answer-the-phone',
        excerpt:
          'A short defense of a radical business practice: being reachable.',
        content:
          '<p>There is a strange idea in this industry that being hard to reach makes you important. I disagree. If you call, I answer. If I am on a roof fixing an antenna, I will call you back before the end of the day.</p><h2>The whole pitch</h2><p>Going quiet is not part of my service model. If I take your project, I finish it. If something changes, I tell you.</p>',
        status: 'published',
        published_at: '2025-02-18T15:00:00Z',
        updated_at: '2025-02-18T15:00:00Z',
      },
      {
        id: 'post-2',
        title: 'The Jargon Jar: a translation guide',
        slug: 'the-jargon-jar',
        excerpt:
          'Corporate speak, translated into things a human being would actually say.',
        content:
          '<p>"Leverage synergies across touchpoints" means "make the parts work together." That is the whole jar.</p><p>If I ever reach for the left column, rewrite me using the right.</p>',
        status: 'published',
        published_at: '2025-01-30T15:00:00Z',
        updated_at: '2025-01-30T15:00:00Z',
      },
      {
        id: 'post-3',
        title: 'On the Reciprocity Loop (draft)',
        slug: 'the-reciprocity-loop',
        excerpt: 'Strategy is free. Execution is paid. Here is why that works.',
        content:
          '<p>I do not charge for conversations or clarity. Call it a professional courtesy.</p>',
        status: 'draft',
        published_at: null,
        updated_at: '2025-03-02T18:30:00Z',
      },
    ],

    // The Command Center — incoming transmissions
    messages: [
      {
        id: 'msg-1',
        name: 'Theodore Brandt',
        email: 'theo@brandtmotors.com',
        phone: '(928) 555-0147',
        subject: 'Website + booking for the shop',
        message:
          'Saw your site. My current one is held together with tape. Can we talk about a rebuild and an online booking thing for the garage?',
        read: false,
        created_at: '2025-03-04T17:42:00Z',
      },
      {
        id: 'msg-2',
        name: 'Ruth Calloway',
        email: 'ruth.calloway@gmail.com',
        phone: null,
        subject: 'Automating invoices',
        message:
          'I spend every Friday typing invoices by hand. A friend said you might be able to make that stop happening. Please.',
        read: false,
        created_at: '2025-03-03T09:12:00Z',
      },
      {
        id: 'msg-3',
        name: 'Sam Whitfield',
        email: 'sam@whitfieldlaw.net',
        phone: '(602) 555-0190',
        subject: 'Quick question on monitoring',
        message:
          'What does the Permanent Observation Post actually cover? Do you watch the site overnight?',
        read: true,
        created_at: '2025-02-28T20:05:00Z',
      },
    ],
  };

  // ── Persistence ───────────────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return JSON.parse(JSON.stringify(SEED));
  }

  let state = load();
  const listeners = new Set();

  function persist() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {}
  }
  function emit() {
    listeners.forEach((fn) => fn(state));
  }

  const Store = {
    get: () => state,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    // mutate with an updater fn that returns a (possibly new) state
    update(mutator) {
      const draft = JSON.parse(JSON.stringify(state));
      const next = mutator(draft) || draft;
      state = next;
      persist();
      emit();
    },
    reset() {
      state = JSON.parse(JSON.stringify(SEED));
      persist();
      emit();
    },
    uid(prefix) {
      return (prefix || 'id') + '-' + Math.random().toString(36).slice(2, 9);
    },
  };

  window.CMSStore = Store;
})();
