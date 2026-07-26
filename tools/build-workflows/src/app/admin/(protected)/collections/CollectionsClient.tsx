'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useClientId } from '@/lib/client-context';
import { useRouter } from 'next/navigation';
import { Plus, Trash, CheckCircle, Package } from 'lucide-react';

interface ProductItem {
  id: string;
  title: string;
  category?: string;
  price?: number;
  image_url?: string;
}

interface Collection {
  id: string;
  client_id: string;
  title: string;
  slug: string;
  description?: string;
  item_ids?: string[];
  is_featured?: boolean;
  status: 'draft' | 'published';
  created_at?: string;
}

export default function CollectionsClient({
  initialCollections,
  availableProducts,
}: {
  initialCollections: Collection[];
  availableProducts: ProductItem[];
}) {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const supabase = createClient();
  const router = useRouter();
  const clientId = useClientId();

  const [formData, setFormData] = useState<Collection>({
    id: '',
    client_id: clientId || '',
    title: '',
    slug: '',
    description: '',
    item_ids: [],
    is_featured: false,
    status: 'draft',
  });

  const handleNewCollection = () => {
    setFormData({
      id: '',
      client_id: clientId || '',
      title: '',
      slug: '',
      description: '',
      item_ids: [],
      is_featured: false,
      status: 'draft',
    });
    setIsEditing(true);
  };

  const handleEditCollection = (collection: Collection) => {
    setFormData({
      ...collection,
      item_ids: collection.item_ids || [],
    });
    setIsEditing(true);
  };

  const handleToggleProduct = (productId: string) => {
    const currentIds = formData.item_ids || [];
    if (currentIds.includes(productId)) {
      setFormData({
        ...formData,
        item_ids: currentIds.filter(id => id !== productId),
      });
    } else {
      setFormData({
        ...formData,
        item_ids: [...currentIds, productId],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      client_id: clientId,
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      item_ids: formData.item_ids,
      is_featured: formData.is_featured,
      status: formData.status,
      updated_at: new Date().toISOString(),
    };

    if (formData.id) {
      const { data, error } = await supabase
        .from('collections')
        .update(payload)
        .eq('id', formData.id)
        .select()
        .single();

      if (!error && data) {
        setCollections(collections.map(c => (c.id === formData.id ? data : c)));
        setIsEditing(false);
      } else {
        alert('Error updating collection: ' + (error?.message || 'unknown error'));
      }
    } else {
      const { data, error } = await supabase
        .from('collections')
        .insert([payload])
        .select()
        .single();

      if (!error && data) {
        setCollections([...collections, data]);
        setIsEditing(false);
      } else {
        alert('Error creating collection: ' + (error?.message || 'unknown error'));
      }
    }
    router.refresh();
  };

  const handleDeleteCollection = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this collection?')) return;

    const { error } = await supabase.from('collections').delete().eq('id', id);
    if (!error) {
      setCollections(collections.filter(c => c.id !== id));
    } else {
      alert('Error deleting collection: ' + error.message);
    }
    router.refresh();
  };

  const filteredCollections = collections.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="section active" id="collections-section">
      <div className="ws-head">
        <div>
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Content & Products</div>
          <h2>Collections Manager</h2>
        </div>
        {!isEditing && (
          <button className="btn btn--primary" onClick={handleNewCollection}>
            <Plus size={14} style={{ marginRight: '6px' }} /> New Collection
          </button>
        )}
      </div>

      {!isEditing ? (
        <>
          <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Collections</strong> — Group products, articles, or services into curated collections (e.g. "Featured Chairs", "Summer Sale", "Mid-Century Classics").
          </div>

          <div className="content-filters">
            <input
              type="text"
              className="form-control"
              placeholder="Search collections..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="form-control"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="content-grid">
            {filteredCollections.map(col => (
              <div key={col.id} className="content-item" onClick={() => handleEditCollection(col)}>
                <div className="content-item__header">
                  <h3 className="content-item__title">{col.title}</h3>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {col.is_featured && (
                      <span className="status status--active" style={{ background: 'var(--tok-accent, #C5301A)', color: '#fff' }}>
                        Featured
                      </span>
                    )}
                    <span className={`status status--${col.status}`}>{col.status}</span>
                  </div>
                </div>
                <div className="content-item__meta">/{col.slug}</div>
                <div className="content-item__excerpt">
                  {col.description || 'No description provided.'}
                </div>
                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-soft)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Package size={14} /> {(col.item_ids || []).length} items
                  </span>
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={e => handleDeleteCollection(col.id, e)}
                    style={{ padding: '4px 8px', color: 'var(--signal, #C5301A)', fontSize: '11px' }}
                  >
                    <Trash size={12} />
                  </button>
                </div>
              </div>
            ))}
            {filteredCollections.length === 0 && (
              <p style={{ gridColumn: '1 / -1', color: 'var(--text-soft)' }}>No collections created yet.</p>
            )}
          </div>
        </>
      ) : (
        <div style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <div className="form-group">
                  <label className="form-label">Collection Title</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.title}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug: formData.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">URL Slug</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={formData.description || ''}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    Feature on homepage
                  </label>
                  <div>
                    <label className="form-label" style={{ display: 'inline', marginRight: '8px' }}>Status:</label>
                    <select
                      className="form-control"
                      style={{ display: 'inline-block', width: 'auto' }}
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product selector grid */}
              <div>
                <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>
                  Select Items for Collection ({formData.item_ids?.length || 0} selected)
                </h3>
                <div style={{ maxHeight: '340px', overflowY: 'auto', border: 'var(--border-1)', padding: '12px', background: 'var(--bg-alt)' }}>
                  {availableProducts.map(prod => {
                    const isSelected = (formData.item_ids || []).includes(prod.id);
                    return (
                      <div
                        key={prod.id}
                        onClick={() => handleToggleProduct(prod.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          marginBottom: '6px',
                          background: isSelected ? 'var(--tok-surface, #fff)' : 'transparent',
                          border: isSelected ? '1px solid var(--tok-primary, #B7791F)' : '1px solid transparent',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '13px', display: 'block' }}>{prod.title}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--text-soft)' }}>
                            {prod.category ? prod.category.toUpperCase() : 'GENERAL'}{' '}
                            {prod.price_usd ? `· $${prod.price_usd}` : ''}
                          </span>
                        </div>
                        {isSelected && <CheckCircle size={16} color="var(--tok-primary, #B7791F)" />}
                      </div>
                    );
                  })}
                  {availableProducts.length === 0 && (
                    <p style={{ fontSize: '12px', color: 'var(--text-soft)' }}>No products available to select.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn--primary">Save Collection</button>
              <button type="button" className="btn btn--secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
