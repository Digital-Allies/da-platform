'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Search, FolderPlus, Download, Trash, Edit, Plus, X } from 'lucide-react';

interface ResearchNote {
  id: string;
  title: string;
  category: string;
  content: string;
  created_at: string;
}

export default function ResearchClient({ initialNotes }: { initialNotes: ResearchNote[] }) {
  const [notes, setNotes] = useState<ResearchNote[]>(initialNotes);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Notes');
  const [editingNote, setEditingNote] = useState<ResearchNote | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  // Default initial categories list
  const [categories, setCategories] = useState<string[]>(() => {
    const list = new Set(['Strategy', 'Discovery']);
    initialNotes.forEach(note => {
      if (note.category) list.add(note.category);
    });
    return Array.from(list);
  });

  const supabase = createClient();
  const router = useRouter();

  // Form states for note editor
  const [noteForm, setNoteForm] = useState({
    id: '',
    title: '',
    category: 'Strategy',
    content: ''
  });

  const handleEditNote = (note: ResearchNote) => {
    setNoteForm({
      id: note.id,
      title: note.title,
      category: note.category || 'Strategy',
      content: note.content || ''
    });
    setEditingNote(note);
    setIsCreating(false);
  };

  const handleNewNote = () => {
    setNoteForm({
      id: '',
      title: '',
      category: activeCategory !== 'All Notes' ? activeCategory : 'Strategy',
      content: ''
    });
    setEditingNote(null);
    setIsCreating(true);
  };

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const payload = {
      client_id: clientId,
      title: noteForm.title,
      category: noteForm.category,
      content: noteForm.content,
      updated_at: new Date().toISOString()
    };

    if (noteForm.id) {
      // Update
      const { data, error } = await supabase.from('research_notes').update(payload).eq('id', noteForm.id).select().single();
      if (!error && data) {
        setNotes(notes.map(n => n.id === noteForm.id ? data : n));
        setEditingNote(null);
        setIsCreating(false);
      } else {
        alert('Error updating note');
      }
    } else {
      // Insert
      const { data, error } = await supabase.from('research_notes').insert([payload]).select().single();
      if (!error && data) {
        setNotes([data, ...notes]);
        setEditingNote(null);
        setIsCreating(false);
      } else {
        alert('Error creating note');
      }
    }
    router.refresh();
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    const { error } = await supabase.from('research_notes').delete().eq('id', noteId);
    if (!error) {
      setNotes(notes.filter(n => n.id !== noteId));
      setEditingNote(null);
      setIsCreating(false);
      router.refresh();
    } else {
      alert('Error deleting note');
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
      setNoteForm(prev => ({ ...prev, category: newCategoryName }));
      setNewCategoryName('');
      setShowAddCategoryModal(false);
    }
  };

  // Export filtered notes as text file download
  const handleExportNotes = () => {
    const activeNotes = notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                            (note.content && note.content.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === 'All Notes' || note.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    if (activeNotes.length === 0) {
      alert('No notes found to export.');
      return;
    }

    let exportContent = `DIGITAL ALLIES RESEARCH NOTES — EXPORT\n`;
    exportContent += `Exported on: ${new Date().toLocaleDateString()}\n`;
    exportContent += `Category: ${activeCategory}\n`;
    exportContent += `====================================================\n\n`;

    activeNotes.forEach((note, idx) => {
      exportContent += `[Note ${idx + 1}] ${note.title}\n`;
      exportContent += `Category: ${note.category}\n`;
      exportContent += `Created: ${new Date(note.created_at).toLocaleDateString()}\n`;
      exportContent += `----------------------------------------------------\n`;
      exportContent += `${note.content || '(Empty)'}\n\n`;
      exportContent += `====================================================\n\n`;
    });

    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `digital_allies_research_${activeCategory.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                          (note.content && note.content.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All Notes' || note.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section active" id="research-section">
      <div className="ws-head">
        <div>
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Documentation</div>
          <h2>Research</h2>
        </div>
        {(!editingNote && !isCreating) && (
          <button className="btn btn--primary" onClick={handleNewNote}>+ New Note</button>
        )}
      </div>

      <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
        <strong>Research Library</strong> — Store and structure business positioning documents, digital strategies, and client discovery notes.
      </div>

      {(!editingNote && !isCreating) ? (
        <div className="research-layout">
          <div className="notebooks-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', margin: '0' }}>Notebooks</h3>
              <button onClick={() => setShowAddCategoryModal(true)} style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <FolderPlus size={14} style={{ color: 'var(--accent)' }}/>
              </button>
            </div>
            <div className="notebook-list">
              <div 
                className={`notebook-item ${activeCategory === 'All Notes' ? 'active' : ''}`}
                onClick={() => setActiveCategory('All Notes')}
              >
                All Notes ({notes.length})
              </div>
              {categories.map(cat => {
                const count = notes.filter(n => n.category === cat).length;
                return (
                  <div 
                    key={cat}
                    className={`notebook-item ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat} ({count})
                  </div>
                );
              })}
            </div>
          </div>

          <div className="notes-content">
            <div className="notes-header" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', flex: '1' }}>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search notes..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="btn btn--secondary" onClick={handleExportNotes} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Download size={14}/> Export Notes
              </button>
            </div>
            
            <div className="notes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {filteredNotes.map(note => (
                <div key={note.id} className="note-item" onClick={() => handleEditNote(note)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className="status status--review" style={{ fontSize: '8px', padding: '1px 3px' }}>{note.category}</span>
                    <span style={{ fontSize: '10px', color: 'var(--fg-soft)' }}>{new Date(note.created_at).toLocaleDateString()}</span>
                  </div>
                  <h4 className="note-item__title">{note.title}</h4>
                  <div className="note-item__preview" style={{ fontSize: '12px', color: 'var(--fg-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {note.content || 'No content provided.'}
                  </div>
                </div>
              ))}
              {filteredNotes.length === 0 && (
                <p style={{ gridColumn: '1 / -1', color: 'var(--text-soft)', fontStyle: 'italic' }}>No notes found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="dev-task-form" style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ marginBottom: '16px' }}>{isCreating ? 'Write Research Note' : 'Edit Note Content'}</h3>
          <form onSubmit={handleSaveNote}>
            <div className="form-group">
              <label className="form-label">Note Title</label>
              <input type="text" className="form-control" required value={noteForm.title} onChange={e => setNoteForm({...noteForm, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Notebook Category</label>
              <select className="form-control" value={noteForm.category} onChange={e => setNoteForm({...noteForm, category: e.target.value})}>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea className="form-control" rows={12} required value={noteForm.content} onChange={e => setNoteForm({...noteForm, content: e.target.value})} />
            </div>
            <div className="form-actions" style={{ justifyContent: 'space-between' }}>
              <div>
                {!isCreating && noteForm.id && (
                  <button type="button" className="btn btn--secondary" onClick={() => handleDeleteNote(noteForm.id)} style={{ color: 'var(--signal)', borderColor: 'var(--signal)' }}>
                    Delete Note
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="btn btn--secondary" onClick={() => { setEditingNote(null); setIsCreating(false); }}>Cancel</button>
                <button type="submit" className="btn btn--primary">Save Note</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: '9999' }}>
          <div style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px', width: '90%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '16px' }}>Add Notebook Category</h3>
            <form onSubmit={handleAddCategory}>
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <input type="text" className="form-control" required value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
              </div>
              <div className="form-actions" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn btn--secondary" onClick={() => { setNewCategoryName(''); setShowAddCategoryModal(false); }}>Cancel</button>
                <button type="submit" className="btn btn--primary">Add Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
