/* ============================================================
   SHELL — browser chrome, Admin <-> Live Site, device toggle,
   connected-save feedback, Tweaks. Mounts the whole prototype.
   ============================================================ */
(function () {
  const { useState, useEffect, useCallback } = React;
  const Icon = window.Icon;
  const Store = window.CMSStore;

  function useStore() {
    const [data, setData] = useState(Store.get());
    useEffect(() => Store.subscribe((s) => setData({ ...s })), []);
    return data;
  }

  // ── Toast ───────────────────────────────────────────────────
  function Toast({ msg }) {
    if (!msg) return null;
    return (
      <div className="toast" key={msg.id}>
        <span className="da-pulse toast__dot" />
        <span>{msg.text}</span>
      </div>
    );
  }

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "adminLayout": "topbar",
    "adminChrome": "dark",
    "startMode": "admin"
  }/*EDITMODE-END*/;

  function App() {
    const data = useStore();
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
    const [mode, setMode] = useState(t.startMode === 'site' ? 'site' : 'admin');
    const [device, setDevice] = useState('desktop');
    const [section, setSection] = useState('dashboard');
    const [toast, setToast] = useState(null);
    const [syncing, setSyncing] = useState(false);

    const fireToast = useCallback((text) => {
      setToast({ id: Date.now(), text });
      setSyncing(true);
      setTimeout(() => setSyncing(false), 1100);
      setTimeout(() => setToast((cur) => (cur && Date.now() - cur.id >= 3200 ? null : cur)), 3300);
    }, []);

    // honor startMode tweak when changed in panel
    useEffect(() => { setMode(t.startMode === 'site' ? 'site' : 'admin'); }, [t.startMode]);

    // ── Store actions ─────────────────────────────────────────
    const actions = {
      saveSettings(next) { Store.update((d) => { d.settings = { ...d.settings, ...next }; }); },
      savePost(post) {
        Store.update((d) => {
          if (post.id) {
            const i = d.posts.findIndex((p) => p.id === post.id);
            d.posts[i] = { ...d.posts[i], ...post, updated_at: new Date().toISOString() };
          } else {
            d.posts.unshift({ ...post, id: Store.uid('post'), updated_at: new Date().toISOString() });
          }
        });
        fireToast(post.status === 'published' ? 'Post published · Live on the site' : 'Draft saved');
      },
      deletePost(id) { Store.update((d) => { d.posts = d.posts.filter((p) => p.id !== id); }); fireToast('Post deleted'); },
      saveService(svc) {
        Store.update((d) => {
          if (svc.id) { const i = d.services.findIndex((x) => x.id === svc.id); d.services[i] = { ...d.services[i], ...svc }; }
          else d.services.push({ ...svc, id: Store.uid('svc') });
        });
        fireToast('Department saved · Live site updated');
      },
      deleteService(id) { Store.update((d) => { d.services = d.services.filter((x) => x.id !== id); }); fireToast('Department removed'); },
      moveService(id, dir) {
        Store.update((d) => {
          const arr = [...d.services].sort((a, b) => a.display_order - b.display_order);
          const i = arr.findIndex((x) => x.id === id);
          const j = i + dir;
          if (j < 0 || j >= arr.length) return;
          [arr[i].display_order, arr[j].display_order] = [arr[j].display_order, arr[i].display_order];
        });
      },
      saveTestimonial(t2) {
        Store.update((d) => {
          if (t2.id) { const i = d.testimonials.findIndex((x) => x.id === t2.id); d.testimonials[i] = { ...d.testimonials[i], ...t2 }; }
          else d.testimonials.push({ ...t2, id: Store.uid('tst') });
        });
        fireToast('Field note saved · Live site updated');
      },
      deleteTestimonial(id) { Store.update((d) => { d.testimonials = d.testimonials.filter((x) => x.id !== id); }); fireToast('Field note removed'); },
      markRead(id, read) { Store.update((d) => { const m = d.messages.find((x) => x.id === id); if (m) m.read = read; }); },
      deleteMessage(id) { Store.update((d) => { d.messages = d.messages.filter((x) => x.id !== id); }); fireToast('Transmission deleted'); },
      addMessage(form) {
        Store.update((d) => { d.messages.unshift({ ...form, id: Store.uid('msg'), read: false, created_at: new Date().toISOString() }); });
        fireToast('Transmission received · Now in the Command Center');
      },
    };

    const url = mode === 'admin'
      ? 'digitalallies.net/admin/' + section.split(':')[0].replace('dashboard', '')
      : 'digitalallies.net';

    return (
      <div className="shell">
        {/* Demo control strip */}
        <div className="strip">
          <div className="strip__brand">
            <span className="da-pulse" />
            <span className="strip__name">Digital Allies</span>
            <span className="strip__tag">Connected CMS</span>
          </div>
          <div className="seg">
            <button className={mode === 'admin' ? 'is-on' : ''} onClick={() => setMode('admin')}><Icon name="lock" size={13} /> Admin</button>
            <button className={mode === 'site' ? 'is-on' : ''} onClick={() => setMode('site')}><Icon name="globe" size={13} /> Live Site</button>
          </div>
          <div className="strip__right">
            <span className={'sync' + (syncing ? ' sync--on' : '')}>
              <span className="da-pulse sync__dot" />
              {syncing ? 'Syncing…' : 'Connected'}
            </span>
            {mode === 'site' && (
              <div className="seg seg--device">
                <button className={device === 'desktop' ? 'is-on' : ''} onClick={() => setDevice('desktop')} title="Desktop"><Icon name="monitor" size={14} /></button>
                <button className={device === 'phone' ? 'is-on' : ''} onClick={() => setDevice('phone')} title="Phone"><Icon name="smartphone" size={14} /></button>
              </div>
            )}
          </div>
        </div>

        {/* Browser window */}
        <div className="bw">
          <div className="bw__bar">
            <div className="bw__lights"><span /><span /><span /></div>
            <div className="bw__url">
              <Icon name="lock" size={11} />
              <span>{url}</span>
            </div>
            <div className="bw__bar-right"><Icon name="refresh" size={13} /></div>
          </div>
          <div className={'bw__view' + (mode === 'site' && device === 'phone' ? ' bw__view--stage' : '')}>
            {mode === 'admin' ? (
              <AdminApp
                data={data} actions={actions}
                layout={t.adminLayout} chrome={t.adminChrome}
                section={section} setSection={setSection}
                onViewSite={() => setMode('site')} onToast={fireToast}
              />
            ) : device === 'phone' ? (
              <div className="phone">
                <div className="phone__notch" />
                <div className="phone__screen">
                  <PublicSite data={data} device="phone" onSubmitMessage={actions.addMessage} />
                </div>
              </div>
            ) : (
              <PublicSite data={data} device="desktop" onSubmitMessage={actions.addMessage} />
            )}
          </div>
        </div>

        <Toast msg={toast} />

        <window.TweaksPanel>
          <window.TweakSection label="Admin layout" />
          <window.TweakRadio label="Navigation" value={t.adminLayout}
            options={[{ value: 'topbar', label: 'Top bar' }, { value: 'sidebar', label: 'Sidebar' }, { value: 'rail', label: 'Rail' }]}
            onChange={(v) => { setTweak('adminLayout', v); setMode('admin'); }} />
          <window.TweakRadio label="Chrome" value={t.adminChrome}
            options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]}
            onChange={(v) => { setTweak('adminChrome', v); setMode('admin'); }} />

          <window.TweakSection label="Brand color" />
          <window.TweakColor label="Accent (re-themes the site)" value={data.settings.brand_color}
            options={['#3A7BD5', '#C5301A', '#1F8A5B', '#7A5AE0', '#B7791F']}
            onChange={(v) => { actions.saveSettings({ brand_color: v }); }} />

          <window.TweakSection label="Demo" />
          <window.TweakRadio label="Start on" value={t.startMode}
            options={[{ value: 'admin', label: 'Admin' }, { value: 'site', label: 'Live Site' }]}
            onChange={(v) => setTweak('startMode', v)} />
          <window.TweakButton label="Reset demo content" onClick={() => { Store.reset(); fireToast('Demo content reset'); }} />
        </window.TweaksPanel>
      </div>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
})();
