/* ============================================================
   PROJECTS MODULE — drag kanban with inline edit.
   window.ProjectsModule({ client, actions })
   actions: moveTask, addTask, updateTask, deleteTask, addProject
   ============================================================ */
(function () {
  const { useState, useEffect } = React;
  const Icon = window.Icon;
  const InlineText = window.InlineText;
  const PRIOS = ['Low', 'Medium', 'High'];

  function Card({ task, projectId, actions, onDrag, dragId }) {
    const [open, setOpen] = useState(false);
    return (
      <div className={'ws-card' + (dragId === task.id ? ' is-drag' : '')}
        draggable onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; onDrag(task.id); }} onDragEnd={() => onDrag(null)}>
        <div className="ws-card__title">
          <InlineText tag="span" value={task.title} onCommit={(v) => v.trim() && actions.updateTask(projectId, task.id, { title: v })} />
        </div>
        <div className="ws-card__meta">
          <button className={'ws-prio ws-prio--' + task.priority.toLowerCase()} title="Cycle priority"
            onClick={() => { const n = PRIOS[(PRIOS.indexOf(task.priority) + 1) % 3]; actions.updateTask(projectId, task.id, { priority: n }); }}>
            {task.priority}
          </button>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="ws-card__due"><Icon name="calendar" size={10} style={{ verticalAlign: 'middle', marginRight: 3 }} />{task.due ? task.due.slice(5) : '—'}</span>
            <button className="ws-block__del" onClick={() => actions.deleteTask(projectId, task.id)} title="Delete"><Icon name="trash" size={12} /></button>
          </span>
        </div>
      </div>
    );
  }

  function Column({ col, tasks, projectId, actions, dragId, setDragId }) {
    const [over, setOver] = useState(false);
    const [adding, setAdding] = useState(false);
    const [val, setVal] = useState('');
    function commitAdd() { if (val.trim()) actions.addTask(projectId, col, val.trim()); setVal(''); setAdding(false); }
    return (
      <div className="ws-col">
        <div className="ws-col__head"><span className="ws-col__title">{col}</span><span className="ws-col__count">{tasks.length}</span></div>
        <div className={'ws-col__body' + (over ? ' is-over' : '')}
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={() => { setOver(false); if (dragId) actions.moveTask(projectId, dragId, col); setDragId(null); }}>
          {tasks.map((t) => <Card key={t.id} task={t} projectId={projectId} actions={actions} onDrag={setDragId} dragId={dragId} />)}
          {!tasks.length && !over && <div style={{ fontSize: 11, color: 'var(--fg-soft)', textAlign: 'center', padding: '10px 0' }}>Drop here</div>}
        </div>
        {adding ? (
          <div style={{ padding: 8, borderTop: 'var(--border-hairline)' }}>
            <textarea autoFocus className="ws-input" rows={2} value={val} placeholder="Task title…"
              onChange={(e) => setVal(e.target.value)} onBlur={commitAdd}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); commitAdd(); } if (e.key === 'Escape') { setVal(''); setAdding(false); } }} />
          </div>
        ) : <button className="ws-col__add" onClick={() => setAdding(true)}><Icon name="plus" size={13} /> Add task</button>}
      </div>
    );
  }

  function ProjectsModule({ client, actions }) {
    const projects = client.site.projects || [];
    const [pid, setPid] = useState(projects[0]?.id ?? null);
    const [dragId, setDragId] = useState(null);
    useEffect(() => { setPid((client.site.projects || [])[0]?.id ?? null); }, [client.id]);
    const project = projects.find((p) => p.id === pid) || projects[0];

    return (
      <div className="ws-page ws-page--full">
        <div className="ws-head">
          <div>
            <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Projects</div>
            <h1>Project boards</h1>
            <div className="ws-head__sub">Track builds for {client.name}. Drag cards between columns.</div>
          </div>
          <div className="ws-head__actions">
            <button className="ws-btn ws-btn--primary" onClick={() => { const id = actions.addProject(); if (id) setPid(id); }}><Icon name="plus" size={13} /> New board</button>
          </div>
        </div>

        {!projects.length ? (
          <div className="ws-empty" style={{ border: 'var(--border-1)' }}>No boards yet. Create the first one.</div>
        ) : (
          <>
            <div className="ws-proj-bar">
              <select className="ws-input ws-input--select" style={{ width: 'auto', minWidth: 240 }} value={pid || ''} onChange={(e) => setPid(e.target.value)}>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <span className="da-small">{project.description}</span>
            </div>
            <div className="ws-kanban">
              {project.columns.map((col) => (
                <Column key={col} col={col} tasks={project.tasks.filter((t) => t.column === col)}
                  projectId={project.id} actions={actions} dragId={dragId} setDragId={setDragId} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
  window.ProjectsModule = ProjectsModule;
})();
