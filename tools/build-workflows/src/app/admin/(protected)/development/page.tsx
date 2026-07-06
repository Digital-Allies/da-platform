import React from 'react';
import { createClient } from '@/lib/supabase-server';
import DevelopmentClient from './DevelopmentClient';

export const dynamic = 'force-dynamic';

export default async function WorkshopPage() {
  const supabase = await createClient();
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;

  // Fetch all dev tasks
  const { data: devTasks } = await supabase
    .from('dev_tasks')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: false });

  return (
    <div className="ws-page">
      <DevelopmentClient initialTasks={devTasks || []} />
    </div>
  );
}
