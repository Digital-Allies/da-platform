import React from 'react';
import { createClient } from '@/lib/supabase-server';
import { getCurrentClientId } from '@/lib/get-current-client';
import ResearchClient from './ResearchClient';

export const dynamic = 'force-dynamic';

export default async function ResearchPage() {
  const supabase = await createClient();
  const CLIENT_ID = await getCurrentClientId();
  if (!CLIENT_ID) throw new Error('Client ID is required for research');

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
