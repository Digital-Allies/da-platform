import React from 'react';
import { createClient } from '@/lib/supabase-server';
import ResearchClient from './ResearchClient';

export const dynamic = 'force-dynamic';

export default async function ResearchPage() {
  const supabase = await createClient();
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;

  // Fetch research notes
  const { data: notes } = await supabase
    .from('research_notes')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: false });

  return (
    <div className="ws-page">
      <ResearchClient initialNotes={notes || []} />
    </div>
  );
}
