'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Plus, Trash, Edit, Calendar, CheckSquare } from 'lucide-react';

interface DevTask {
  id: string;
  title: string;
  description: string;
  type: 'feature' | 'bug' | 'milestone';
  status: 'open' | 'testing' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

export default function DevelopmentClient({ initialTasks }: { initialTasks: DevTask[] }) {
  const [tasks, setTasks] = useState<DevTask[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<'feature' | 'bug' | 'milestone'>('feature');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  
  // Modal states
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<DevTask | null>(null);

  // Form states
  const [taskForm, setTaskForm] = useState({
    id: '',
    title: '',
    description: '',
    type: 'feature' as 'feature' | 'bug' | 'milestone',
    status: 'open' as 'open' | 'testing' | 'resolved' | 'closed',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const supabase = createClient();
  const router = useRouter();

  const handleOpenCreateModal = () => {
    setTaskForm({
      id: '',
      title: '',
      description: '',
      type: activeTab,
      status: 'open',
      priority: 'medium'
    });
    setEditingTask(null);
    setTaskModalOpen(true);
  };

  const handleOpenEditModal = (task: DevTask) => {
    setTaskForm({
      id: task.id,
      title: task.title,
      description: task.description || '',
      type: task.type,
      status: task.status,
      priority: task.priority
    });
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const payload = {
      client_id: clientId,
      title: taskForm.title,
      description: taskForm.description,
      type: taskForm.type,
      status: taskForm.status,
      priority: taskForm.priority,
      updated_at: new Date().toISOString()
    };

    if (taskForm.id) {
      // Update
      const { data, error } = await supabase.from('dev_tasks').update(payload).eq('id', taskForm.id).select().single();
      if (!error && data) {
        setTasks(tasks.map(t => t.id === taskForm.id ? data : t));
        setTaskModalOpen(false);
      } else {
        alert('Error updating dev task: ' + (error?.message || 'unknown error'));
      }
    } else {
      // Insert
      const { data, error } = await supabase.from('dev_tasks').insert([payload]).select().single();
      if (!error && data) {
        setTasks([...tasks, data]);
        setTaskModalOpen(false);
      } else {
        alert('Error creating dev task: ' + (error?.message || 'unknown error'));
      }
    }
    router.refresh();
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this dev task?')) return;
    const { error } = await supabase.from('dev_tasks').delete().eq('id', taskId);
    if (!error) {
      setTasks(tasks.filter(t => t.id !== taskId));
      setTaskModalOpen(false);
      setEditingTask(null);
      router.refresh();
    } else {
      alert('Error deleting task');
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesTab = task.type === activeTab;
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
    return matchesTab && matchesStatus && matchesPriority;
  });

  return (
    <section className="section active" id="development-section">
      <div className="ws-head">
        <div>
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Development Tracker</div>
          <h2>The Workshop</h2>
        </div>
        <button className="btn btn--primary" onClick={handleOpenCreateModal}>+ New Task</button>
      </div>

      <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
        <strong>Dev Tracker</strong> — Track website bugs, feature rollouts, and milestones dynamically connected to the Supabase client footprint.
      </div>

      <div className="dev-tabs">
        <button 
          className={`tab-btn ${activeTab === 'feature' ? 'active' : ''}`} 
          onClick={() => setActiveTab('feature')}
        >
          Features
        </button>
        <button 
          className={`tab-btn ${activeTab === 'bug' ? 'active' : ''}`} 
          onClick={() => setActiveTab('bug')}
        >
          Bugs
        </button>
        <button 
          className={`tab-btn ${activeTab === 'milestone' ? 'active' : ''}`} 
          onClick={() => setActiveTab('milestone')}
        >
          Milestones
        </button>
      </div>

      <div className="tab-content active" id="dev-tab-content">
        <div className="dev-filters">
          <select 
            className="form-control" 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            style={{ maxWidth: '180px' }}
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="testing">Testing</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select 
            className="form-control" 
            value={priorityFilter} 
            onChange={e => setPriorityFilter(e.target.value)}
            style={{ maxWidth: '180px' }}
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="dev-tasks-grid">
          {filteredTasks.map(task => {
            const isHigh = task.priority === 'high';
            const isMedium = task.priority === 'medium';
            return (
              <div 
                key={task.id} 
                className="dev-task-item" 
                onClick={() => handleOpenEditModal(task)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s', border: 'var(--border-1)', background: 'var(--bg)', display: 'flex', justifyContent: 'space-between', padding: '20px', marginBottom: '12px' }}
              >
                <div>
                  <h4 className="dev-task-item__title" style={{ margin: '0 0 6px 0', fontSize: '15px' }}>{task.title}</h4>
                  <div className="dev-task-item__description" style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>
                    {task.description || 'No description provided.'}
                  </div>
                </div>
                <div className="dev-task-item__actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={`status status--${task.status === 'resolved' ? 'done' : task.status === 'testing' ? 'review' : 'draft'}`}>
                    {task.status}
                  </span>
                  <span className={`status status--${isHigh ? 'error' : isMedium ? 'warning' : 'draft'}`} style={{ fontSize: '9px' }}>
                    {task.priority}
                  </span>
                </div>
              </div>
            );
          })}
          {filteredTasks.length === 0 && (
            <p style={{ color: 'var(--text-soft)', fontStyle: 'italic', padding: '20px 0' }}>No dev tasks found matching these filters.</p>
          )}
        </div>
      </div>

      {/* Dev Task Create/Edit Modal */}
      {taskModalOpen && (
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: '9999' }}>
          <div style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px', width: '90%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '16px' }}>{editingTask ? 'Edit Workshop Task' : 'Add Dev Task'}</h3>
            <form onSubmit={handleSaveTask}>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input type="text" className="form-control" required value={taskForm.title} onChange={e => setTaskForm({...taskForm, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={4} value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Task Type</label>
                <select className="form-control" value={taskForm.type} onChange={e => setTaskForm({...taskForm, type: e.target.value as any})}>
                  <option value="feature">Feature</option>
                  <option value="bug">Bug</option>
                  <option value="milestone">Milestone</option>
                </select>
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
                    <option value="open">Open</option>
                    <option value="testing">Testing</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="form-actions" style={{ justifyContent: 'space-between', marginTop: '20px' }}>
                <div>
                  {editingTask && (
                    <button type="button" className="btn btn--secondary" onClick={() => handleDeleteTask(editingTask.id)} style={{ color: 'var(--signal)', borderColor: 'var(--signal)' }}>
                      Delete Task
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="btn btn--secondary" onClick={() => setTaskModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn--primary">Save Task</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
