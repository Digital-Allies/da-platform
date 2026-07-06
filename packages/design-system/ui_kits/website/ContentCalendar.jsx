/**
 * ContentCalendar.jsx
 * 
 * Reusable 30-day content calendar component for Digital Allies marketing.
 * Displays schedule, topics, copy, and asset prompts.
 * CMS-driven: pass data via props, component re-renders on update.
 * 
 * Usage:
 *   <x-import component="ContentCalendar" from="./ContentCalendar.jsx" data="{{ cms.calendar }}" />
 */

export const ContentCalendar = ({ data = [], sortBy = 'day', showStatus = true, showPromptRef = true, onEntryClick = null }) => {
  const [sortMode, setSortMode] = React.useState(sortBy);
  const [filterCategory, setFilterCategory] = React.useState('all');

  // Sort entries
  const sorted = React.useMemo(() => {
    let arr = [...(Array.isArray(data) ? data : [])];
    
    if (filterCategory !== 'all') {
      arr = arr.filter(e => e.category === filterCategory);
    }

    arr.sort((a, b) => {
      if (sortMode === 'day') return a.day - b.day;
      if (sortMode === 'category') return (a.category || '').localeCompare(b.category || '');
      if (sortMode === 'status') return (a.status || '').localeCompare(b.status || '');
      return 0;
    });

    return arr;
  }, [data, sortMode, filterCategory]);

  // Extract unique categories
  const categories = React.useMemo(() => {
    const set = new Set(data.map(e => e.category).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [data]);

  // Status badge color
  const statusColor = (status) => {
    const colors = {
      draft: '#999',
      approved: '#2A6FDB',
      scheduled: '#3A7BD5',
      posted: '#1F8A5B',
      archived: '#666'
    };
    return colors[status] || '#999';
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--fg)', padding: '20px 0' }}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '8px' }}>
            Sort by:
          </label>
          <select 
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            style={{
              fontFamily: 'var(--font-body)',
              padding: '6px 12px',
              border: '1px solid var(--charcoal)',
              background: 'var(--bg)',
              color: 'var(--fg)',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            <option value="day">Day</option>
            <option value="category">Category</option>
            <option value="status">Status</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '8px' }}>
            Filter:
          </label>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              fontFamily: 'var(--font-body)',
              padding: '6px 12px',
              border: '1px solid var(--charcoal)',
              background: 'var(--bg)',
              color: 'var(--fg)',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All categories' : cat}
              </option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--fg-muted)' }}>
          Showing {sorted.length} of {data.length} entries
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '12px',
          lineHeight: '1.6'
        }}>
          <thead>
            <tr style={{ background: 'var(--bg-alt)', borderBottom: '2px solid var(--charcoal)' }}>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '700', color: 'var(--signal)' }}>Day</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '700', color: 'var(--signal)' }}>Week</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '700', color: 'var(--signal)' }}>Category</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '700', color: 'var(--signal)' }}>Topic</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '700', color: 'var(--signal)' }}>Copy (Hook)</th>
              {showPromptRef && <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '700', color: 'var(--signal)' }}>Asset Prompt</th>}
              {showStatus && <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '700', color: 'var(--signal)' }}>Status</th>}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={showStatus && showPromptRef ? 8 : 6} style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--fg-muted)', fontStyle: 'italic' }}>
                  No entries to display
                </td>
              </tr>
            ) : (
              sorted.map((entry, i) => (
                <tr 
                  key={i}
                  onClick={() => onEntryClick && onEntryClick(entry)}
                  style={{
                    borderBottom: '1px dashed var(--hairline)',
                    background: i % 2 === 0 ? 'transparent' : 'var(--bg-alt)',
                    cursor: onEntryClick ? 'pointer' : 'default',
                    transition: 'background 200ms ease'
                  }}
                  onMouseEnter={(e) => onEntryClick && (e.currentTarget.style.background = 'var(--bg-alt)')}
                  onMouseLeave={(e) => onEntryClick && (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'var(--bg-alt)')}
                >
                  <td style={{ padding: '12px 8px', fontWeight: '600', color: 'var(--signal)' }}>{entry.day}</td>
                  <td style={{ padding: '12px 8px' }}>{entry.week}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 6px',
                      background: 'var(--charcoal)',
                      color: 'var(--fg-on-dark)',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      borderRadius: '2px'
                    }}>
                      {entry.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', fontWeight: '600' }}>{entry.topic}</td>
                  <td style={{ padding: '12px 8px', maxWidth: '300px', color: 'var(--fg)' }}>
                    <span style={{ fontStyle: 'italic', color: 'var(--fg-muted)' }}>"{entry.hook || entry.caption || '—'}"</span>
                  </td>
                  {showPromptRef && (
                    <td style={{ padding: '12px 8px', fontSize: '11px', color: 'var(--fg-muted)' }}>
                      {entry.promptRef || entry.prompt || '—'}
                    </td>
                  )}
                  {showStatus && (
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '3px 8px',
                        background: statusColor(entry.status),
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        borderRadius: '2px'
                      }}>
                        {entry.status || 'draft'}
                      </span>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-alt)', border: '1px dashed var(--hairline)', fontSize: '11px', color: 'var(--fg-muted)' }}>
        <strong>Tips:</strong> Click any row to open the editor (if onEntryClick is wired). Use filters to focus on specific weeks or categories. Export this table to CSV anytime to share with designers or social schedulers.
      </div>
    </div>
  );
};

// Also expose on window so older <x-import>/script consumers keep working
if (typeof window !== 'undefined') { window.ContentCalendar = ContentCalendar; }
