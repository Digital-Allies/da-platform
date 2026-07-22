/* ============================================================
   Command palette — ⌘K / Ctrl-K. Receives a flat list of
   commands; filters, keyboard-navigates, runs.
   window.CmdPalette({ open, onClose, commands })
   command: { id, label, sub, icon, group, run() }
   ============================================================ */
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const Icon = window.Icon;

  function CmdPalette({ open, onClose, commands }) {
    const [q, setQ] = useState('');
    const [active, setActive] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => { if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current && inputRef.current.focus(), 20); } }, [open]);

    const filtered = useMemo(() => {
      const s = q.trim().toLowerCase();
      if (!s) return commands;
      return commands.filter((c) => (c.label + ' ' + (c.sub || '') + ' ' + (c.group || '')).toLowerCase().includes(s));
    }, [q, commands]);

    useEffect(() => { setActive(0); }, [q]);

    // group while preserving order
    const grouped = useMemo(() => {
      const out = []; const idx = {};
      filtered.forEach((c) => {
        const g = c.group || 'Actions';
        if (!(g in idx)) { idx[g] = out.length; out.push({ label: g, items: [] }); }
        out[idx[g]].items.push(c);
      });
      return out;
    }, [filtered]);

    function run(c) { onClose(); setTimeout(() => c.run && c.run(), 0); }

    function onKey(e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      else if (e.key === 'Enter') { e.preventDefault(); if (filtered[active]) run(filtered[active]); }
      else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    }

    useEffect(() => {
      if (!listRef.current) return;
      const el = listRef.current.querySelector('.is-active');
      if (el) el.scrollIntoView({ block: 'nearest' });
    }, [active]);

    if (!open) return null;
    let counter = -1;
    return (
      <div className="ws-cmdk" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="ws-cmdk__box" onKeyDown={onKey}>
          <div className="ws-cmdk__input-row">
            <Icon name="search" size={17} color="var(--fg-muted)" />
            <input ref={inputRef} className="ws-cmdk__input" placeholder="Search actions, clients, content…"
              value={q} onChange={(e) => setQ(e.target.value)} />
            <kbd style={{ fontFamily: 'var(--font-details)', fontSize: 10, color: 'var(--fg-soft)', border: '1px solid var(--field-border)', padding: '1px 6px' }}>esc</kbd>
          </div>
          <div className="ws-cmdk__list" ref={listRef}>
            {grouped.map((g) => (
              <div key={g.label}>
                <div className="ws-cmdk__group">{g.label}</div>
                {g.items.map((c) => {
                  counter += 1; const i = counter;
                  return (
                    <button key={c.id} className={'ws-cmdk__item' + (i === active ? ' is-active' : '')}
                      onMouseEnter={() => setActive(i)} onClick={() => run(c)}>
                      <Icon name={c.icon || 'arrowRight'} size={15} color="var(--fg-muted)" />
                      <span>{c.label}</span>
                      {c.sub && <span className="ws-cmdk__item-sub">{c.sub}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
            {!filtered.length && <div className="ws-cmdk__empty">No matches for &ldquo;{q}&rdquo;</div>}
          </div>
        </div>
      </div>
    );
  }
  window.CmdPalette = CmdPalette;
})();
