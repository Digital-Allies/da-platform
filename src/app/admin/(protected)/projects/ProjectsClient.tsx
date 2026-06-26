'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Plus, Trash, Edit, Calendar } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  due_date: string;
  priority: 'low' | 'medium' | 'high';
}

export default function ProjectsClient({ initialProjects, initialTasks }: { initialProjects: Project[], initialTasks: ProjectTask[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<ProjectTask[]>(initialTasks);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjects[0]?.id || '');
  
  const supabase = createClient();
  const router = useRouter();

  // Modals state
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<ProjectTask | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState({ name: '', description: '', template: '' });
  const [taskForm, setTaskForm] = useState({ id: '', title: '', description: '', status: 'todo', due_date: '', priority: 'medium' });

  // Filter tasks by active project
  const projectTasks = tasks.filter(t => t.project_id === selectedProjectId);

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Required to allow dropping
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: 'todo' | 'in_progress' | 'review' | 'done') => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    // 1. Update UI state instantly
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: targetStatus } : t));

    // 2. Persist in Database
    const { error } = await supabase
      .from('project_tasks')
      .update({ status: targetStatus, updated_at: new Date().toISOString() })
      .eq('id', taskId);

    if (error) {
      alert('Error updating task status: ' + error.message);
      // Revert if error
      setTasks(initialTasks);
    } else {
      router.refresh();
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    // 1. Insert Project
    const { data: project, error: projError } = await supabase
      .from('projects')
      .insert([{
        client_id: clientId,
        name: projectForm.name,
        description: projectForm.description,
        status: 'active'
      }])
      .select()
      .single();

    if (projError || !project) {
      alert('Error creating project: ' + projError?.message);
      return;
    }

    setProjects([...projects, project]);
    setSelectedProjectId(project.id);
    setProjectModalOpen(false);

    // 2. Add template tasks if selected
    if (projectForm.template) {
      let templateTasks: Partial<ProjectTask>[] = [];
      if (projectForm.template === 'software') {
        templateTasks = [
          { title: 'Requirements Gathering', description: 'Compile features and specifications list', priority: 'high', status: 'todo' },
          { title: 'Frontend UI Implementation', description: 'Create responsive client-side layout shell', priority: 'medium', status: 'todo' },
          { title: 'API & Supabase Integration', description: 'Connect forms and page loaders to database', priority: 'high', status: 'todo' },
          { title: 'Staging Build & Deployment', description: 'Deploy build target on Vercel for testing', priority: 'low', status: 'todo' }
        ];
      } else if (projectForm.template === 'marketing') {
        templateTasks = [
          { title: 'Market & Competitive Research', description: 'Analyze target audience metrics', priority: 'medium', status: 'todo' },
          { title: 'Social Copy & Media Assets', description: 'Create social graphic templates and captions', priority: 'low', status: 'todo' },
          { title: 'Paid Ad Campaign Launch', description: 'Launch search ads budget targeting key cities', priority: 'high', status: 'todo' }
        ];
      } else if (projectForm.template === 'seo') {
        templateTasks = [
          { title: 'Keyword Mapping Research', description: 'Identify volume and difficulty metrics', priority: 'high', status: 'todo' },
          { title: 'Metadata & On-page Optimization', description: 'Audit H1 structures and write descriptions', priority: 'medium', status: 'todo' },
          { title: 'LCP Core Web Vitals Audit', description: 'Analyze largest contentful paint speed in inspector', priority: 'high', status: 'todo' }
        ];
      }

      const tasksToInsert = templateTasks.map(t => ({
        client_id: clientId,
        project_id: project.id,
        title: t.title,
        description: t.description,
        priority: t.priority,
        status: t.status,
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week due date
      }));

      const { data: newTasks, error: taskError } = await supabase
        .from('project_tasks')
        .insert(tasksToInsert)
        .select();

      if (!taskError && newTasks) {
        setTasks([...tasks, ...newTasks]);
      }
    }

    setProjectForm({ name: '', description: '', template: '' });
    router.refresh();
  };

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    const payload = {
      client_id: clientId,
      project_id: selectedProjectId,
      title: taskForm.title,
      description: taskForm.description,
      status: taskForm.status,
      due_date: taskForm.due_date ? new Date(taskForm.due_date).toISOString() : null,
      priority: taskForm.priority,
      updated_at: new Date().toISOString()
    };

    if (taskForm.id) {
      // Update
      const { data, error } = await supabase.from('project_tasks').update(payload).eq('id', taskForm.id).select().single();
      if (!error && data) {
        setTasks(tasks.map(t => t.id === taskForm.id ? data : t));
        setTaskModalOpen(false);
        setActiveTask(null);
      } else {
        alert('Error updating task');
      }
    } else {
      // Insert
      const { data, error } = await supabase.from('project_tasks').insert([payload]).select().single();
      if (!error && data) {
        setTasks([...tasks, data]);
        setTaskModalOpen(false);
      } else {
        alert('Error creating task');
      }
    }
    router.refresh();
  };

  const handleEditTask = (task: ProjectTask) => {
    setTaskForm({
      id: task.id,
      title: task.title,
      description: task.description || '',
      status: task.status,
      due_date: task.due_date ? new Date(task.due_date).toISOString().slice(0, 16) : '',
      priority: task.priority
    });
    setActiveTask(task);
    setTaskModalOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    const { error } = await supabase.from('project_tasks').delete().eq('id', taskId);
    if (!error) {
      setTasks(tasks.filter(t => t.id !== taskId));
      setTaskModalOpen(false);
      setActiveTask(null);
      router.refresh();
    } else {
      alert('Error deleting task');
    }
  };

  const columns: { label: string; key: 'todo' | 'in_progress' | 'review' | 'done' }[] = [
    { label: 'To Do', key: 'todo' },
    { label: 'In Progress', key: 'in_progress' },
    { label: 'Review', key: 'review' },
    { label: 'Done', key: 'done' }
  ];

  return (
    <section className="section active" id="projects-section">
      <div className="ws-head">
        <div>
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Organization</div>
          <h2>Projects</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn--secondary" onClick={() => setProjectModalOpen(true)}>+ New Project</button>
          {selectedProjectId && (
            <button className="btn btn--primary" onClick={() => {
              setTaskForm({ id: '', title: '', description: '', status: 'todo', due_date: '', priority: 'medium' });
              setActiveTask(null);
              setTaskModalOpen(true);
            }}>+ New Task</button>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
        <strong>Projects Kanban</strong> — Track tasks. Drag and drop cards to change statuses dynamically.
      </div>

      <div className="project-selector" style={{ marginBottom: '24px' }}>
        <select 
          className="form-control" 
          value={selectedProjectId} 
          onChange={e => setSelectedProjectId(e.target.value)}
        >
          {projects.length === 0 ? (
            <option value="">No projects available</option>
          ) : (
            projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))
          )}
        </select>
      </div>

      {selectedProjectId ? (
        <div className="kanban-board">
          {columns.map(col => {
            const colTasks = projectTasks.filter(t => t.status === col.key);
            return (
              <div 
                key={col.key} 
                className="kanban-column"
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, col.key)}
              >
                <div className="kanban-column__header">
                  <h3 className="kanban-column__title">{col.label}</h3>
                  <span className="kanban-column__count">{colTasks.length}</span>
                </div>
                <div className="kanban-column__tasks">
                  {colTasks.map(task => {
                    const isHigh = task.priority === 'high';
                    const isMedium = task.priority === 'medium';
                    return (
                      <div 
                        key={task.id} 
                        className="task-card"
                        draggable
                        onDragStart={e => handleDragStart(e, task.id)}
                        onClick={() => handleEditTask(task)}
                      >
                        <div className="task-card__title">{task.title}</div>
                        {task.description && (
                          <div style={{ fontSize: '11px', color: 'var(--fg-soft)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {task.description}
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className={`status status--${isHigh ? 'error' : isMedium ? 'warning' : 'draft'}`} style={{ fontSize: '9px', padding: '1px 4px' }}>
                            {task.priority}
                          </span>
                          {task.due_date && (
                            <span className="task-card__due" style={{ fontSize: '9px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                              <Calendar size={10}/> {new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', border: 'var(--border-1)', background: 'var(--bg-alt)', color: 'var(--text-soft)' }}>
          Create a project to start managing tasks.
        </div>
      )}

      {/* Project Creation Modal */}
      {projectModalOpen && (
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: '9999' }}>
          <div style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px', width: '90%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '16px' }}>Create New Project</h3>
            <form onSubmit={handleCreateProject}>
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input type="text" className="form-control" required value={projectForm.name} onChange={e => setProjectForm({...projectForm, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Initialize Template</label>
                <select className="form-control" value={projectForm.template} onChange={e => setProjectForm({...projectForm, template: e.target.value})}>
                  <option value="">None (Empty Project)</option>
                  <option value="software">Software Launch Template</option>
                  <option value="marketing">Marketing Campaign Template</option>
                  <option value="seo">SEO Audit Template</option>
                </select>
              </div>
              <div className="form-actions" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn btn--secondary" onClick={() => setProjectModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Edit/Create Modal */}
      {taskModalOpen && (
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: '9999' }}>
          <div style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px', width: '90%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '16px' }}>{activeTask ? 'Edit Task Details' : 'Create Project Task'}</h3>
            <form onSubmit={handleTaskSubmit}>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input type="text" className="form-control" required value={taskForm.title} onChange={e => setTaskForm({...taskForm, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select className="form-control" value={taskForm.priority} onChange={e => setTaskForm({...taskForm, priority: e.target.value as any})}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-control" value={taskForm.status} onChange={e => setTaskForm({...taskForm, status: e.target.value as any})}>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input type="datetime-local" className="form-control" value={taskForm.due_date} onChange={e => setTaskForm({...taskForm, due_date: e.target.value})} />
              </div>
              <div className="form-actions" style={{ justifyContent: 'space-between', marginTop: '20px' }}>
                <div>
                  {activeTask && (
                    <button type="button" className="btn btn--secondary" onClick={() => handleDeleteTask(activeTask.id)} style={{ color: 'var(--signal)', borderColor: 'var(--signal)' }}>
                      Delete Task
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="btn btn--secondary" onClick={() => setTaskModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn--primary">Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
