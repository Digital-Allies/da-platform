'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useClientId } from '@/lib/client-context';
import { Upload, X, Image as ImageIcon, Loader2, Link as LinkIcon } from 'lucide-react';

interface MediaUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  bucket?: string;
  accept?: string;
}

export function MediaUploader({
  value,
  onChange,
  label,
  hint,
  bucket = 'client-assets',
  accept = 'image/*',
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const clientId = useClientId();
  const supabase = createClient();

  const handleUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop() || 'png';
      const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const fileName = `${Date.now()}_${cleanName}.${fileExt}`;
      const filePath = `${clientId || 'default'}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { upsert: true });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          onChange(publicUrlData.publicUrl);
          setUploading(false);
          return;
        }
      }

      // Fallback: Read file as Data URL if bucket storage returns error or is unprovisioned
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) onChange(result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      // FileReader fallback
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) onChange(result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="form-group mb-4">
      {label && <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">{label}</label>}
      {hint && <p className="text-xs text-neutral-500 mb-2">{hint}</p>}

      {value ? (
        <div style={{ border: 'var(--border-1, 1px solid #ccc)', padding: '12px', background: 'var(--bg-alt, #f9f9f9)', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '4px', overflow: 'hidden', background: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLElement).style.display = 'none' }} />
              <ImageIcon size={24} style={{ color: '#888' }} />
            </div>
            <div style={{ flex: '1', minWidth: '0' }}>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-soft, #666)', wordBreak: 'break-all', marginBottom: '6px' }}>
                {value}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={value} target="_blank" rel="noopener noreferrer" className="btn btn--secondary" style={{ padding: '2px 8px', fontSize: '10px' }}>
                  Open Link
                </a>
                <button type="button" className="btn btn--secondary" onClick={() => onChange('')} style={{ padding: '2px 8px', fontSize: '10px', color: 'var(--signal, #C5301A)' }}>
                  Remove Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              border: dragOver ? '2px dashed var(--tok-primary, #B7791F)' : '2px dashed var(--border-color, #ccc)',
              background: dragOver ? 'rgba(183,121,31,0.05)' : 'var(--bg-alt, #fafafa)',
              padding: '24px 16px',
              textAlign: 'center',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {uploading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--tok-primary, #B7791F)' }}>
                <Loader2 className="animate-spin" size={24} />
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Uploading file to Storage...</span>
              </div>
            ) : (
              <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Upload size={24} style={{ color: 'var(--tok-primary, #B7791F)' }} />
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-main, #2D2D2D)' }}>
                    Click or drag file here to upload
                  </span>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-soft, #888)', marginTop: '2px' }}>
                    Uploaded directly to client storage bucket
                  </span>
                </div>
                <input
                  type="file"
                  accept={accept}
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                />
              </label>
            )}
          </div>

          {!showUrlInput ? (
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              style={{ fontSize: '11px', color: 'var(--text-soft, #888)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', marginTop: '6px' }}
            >
              Or paste an external URL manually
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="https://..."
                onChange={(e) => onChange(e.target.value)}
                style={{ fontSize: '12px' }}
              />
              <button type="button" className="btn btn--secondary" onClick={() => setShowUrlInput(false)} style={{ padding: '4px 8px', fontSize: '11px' }}>
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MediaUploader;
