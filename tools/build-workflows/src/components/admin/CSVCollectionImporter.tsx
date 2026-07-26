'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useClientId } from '@/lib/client-context';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface CSVCollectionImporterProps {
  collectionId?: string;
  collectionTitle?: string;
  onImportComplete: () => void;
}

export function CSVCollectionImporter({
  collectionId,
  collectionTitle,
  onImportComplete,
}: CSVCollectionImporterProps) {
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [fileName, setFileName] = useState('');
  const [importing, setImporting] = useState(false);
  const [successCount, setSuccessCount] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const clientId = useClientId();
  const supabase = createClient();

  const handleFileChange = (file: File) => {
    if (!file) return;
    setFileName(file.name);
    setErrorMsg('');
    setSuccessCount(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r\n|\n/).filter(line => line.trim().length > 0);
      if (lines.length < 2) {
        setErrorMsg('CSV file must have a header row and at least 1 data row.');
        return;
      }

      // Parse headers
      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());
      
      const rows: any[] = [];
      for (let i = 1; i < lines.length; i++) {
        // Handle CSV comma splitting with quotes
        const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
        const cleanValues = values.map(v => v.trim().replace(/^["']|["']$/g, ''));
        
        const rowData: any = {};
        headers.forEach((header, idx) => {
          rowData[header] = cleanValues[idx] || '';
        });
        
        if (rowData.title || rowData.name || rowData.product) {
          rows.push({
            title: rowData.title || rowData.name || rowData.product || 'Untitled Item',
            price: rowData.price ? parseFloat(rowData.price.replace(/[^0-9.]/g, '')) || null : null,
            category: rowData.category || rowData.type || 'General',
            image_url: rowData.image_url || rowData.image || rowData.photo || '',
            description: rowData.description || rowData.desc || '',
            external_url: rowData.external_url || rowData.link || rowData.url || '',
            selling_state: rowData.selling_state || 'inquiry',
          });
        }
      }

      setParsedRows(rows);
    };

    reader.readAsText(file);
  };

  const handleExecuteImport = async () => {
    if (parsedRows.length === 0) return;
    setImporting(true);
    setErrorMsg('');

    try {
      // 1. Insert products into Supabase products table
      const productsToInsert = parsedRows.map((r, idx) => ({
        client_id: clientId,
        title: r.title,
        price: r.price,
        category: r.category,
        image_url: r.image_url,
        description: r.description,
        external_url: r.external_url,
        selling_state: r.selling_state,
        in_stock: true,
        display_order: idx,
      }));

      const { data: insertedProducts, error: prodError } = await supabase
        .from('products')
        .insert(productsToInsert)
        .select('id');

      if (prodError) throw prodError;

      // 2. If imported inside a specific collection, bind item_ids to collection
      if (collectionId && insertedProducts) {
        const newItemIds = insertedProducts.map(p => p.id);

        const { data: existingCol } = await supabase
          .from('collections')
          .select('item_ids')
          .eq('id', collectionId)
          .single();

        const currentItemIds = existingCol?.item_ids || [];
        const updatedItemIds = Array.from(new Set([...currentItemIds, ...newItemIds]));

        await supabase
          .from('collections')
          .update({ item_ids: updatedItemIds, updated_at: new Date().toISOString() })
          .eq('id', collectionId);
      }

      setSuccessCount(parsedRows.length);
      setParsedRows([]);
      onImportComplete();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to import spreadsheet collection');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-alt, #fafafa)', border: '1px solid var(--border-color, #ccc)', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FileSpreadsheet size={18} style={{ color: 'var(--tok-primary, #B7791F)' }} />
        Import Spreadsheet Collection (CSV)
      </h3>
      <p style={{ fontSize: '12px', color: 'var(--text-soft, #666)', marginBottom: '16px', lineHeight: 1.5 }}>
        Upload a <code>.csv</code> spreadsheet containing columns: <strong>Title, Price, Category, Image URL, Description</strong>. Items will be created in your catalog {collectionTitle ? `and automatically added to collection "${collectionTitle}"` : ''}.
      </p>

      {parsedRows.length === 0 ? (
        <label
          style={{
            border: '2px dashed var(--border-color, #ccc)',
            background: '#fff',
            padding: '24px',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <Upload size={24} style={{ color: 'var(--tok-primary, #B7791F)' }} />
          <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Click or drop CSV file here</span>
          <span style={{ fontSize: '11px', color: '#888' }}>Supports .csv files from Excel or Google Sheets</span>
          <input
            type="file"
            accept=".csv,text/csv"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
          />
        </label>
      ) : (
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--tok-primary, #B7791F)' }}>
            Parsed {parsedRows.length} items from {fileName}:
          </div>

          <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid #ddd', background: '#fff', borderRadius: '4px', marginBottom: '14px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
                  <th style={{ padding: '6px 10px' }}>Title</th>
                  <th style={{ padding: '6px 10px' }}>Price</th>
                  <th style={{ padding: '6px 10px' }}>Category</th>
                  <th style={{ padding: '6px 10px' }}>Photo</th>
                </tr>
              </thead>
              <tbody>
                {parsedRows.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '6px 10px', fontWeight: 'bold' }}>{r.title}</td>
                    <td style={{ padding: '6px 10px' }}>{r.price != null ? `$${r.price}` : 'Inquire'}</td>
                    <td style={{ padding: '6px 10px' }}>{r.category}</td>
                    <td style={{ padding: '6px 10px', fontFamily: 'monospace', color: '#888' }}>{r.image_url ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleExecuteImport}
              disabled={importing}
              style={{ fontSize: '12px' }}
            >
              {importing ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Loader2 className="animate-spin" size={14} /> Importing Items...
                </span>
              ) : (
                `Import ${parsedRows.length} Items to Catalog`
              )}
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setParsedRows([])}
              style={{ fontSize: '12px' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {successCount !== null && (
        <div style={{ marginTop: '12px', padding: '10px', background: '#D4EDDA', color: '#155724', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle size={16} /> Successfully imported {successCount} products into your collection catalog!
        </div>
      )}

      {errorMsg && (
        <div style={{ marginTop: '12px', padding: '10px', background: '#F8D7DA', color: '#721C24', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}
    </div>
  );
}

export default CSVCollectionImporter;
