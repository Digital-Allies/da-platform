import React from 'react';
import { createClient } from '@/lib/supabase-server';
import ProjectsClient from './ProjectsClient';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const supabase = await createClient();
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;

  // 1. Fetch all projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: false });

  // 2. Fetch all project tasks
  const { data: tasks } = await supabase
    .from('project_tasks')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: true });

  return (
    <div className="ws-page">
      <ProjectsClient 
        initialProjects={projects || []} 
        initialTasks={tasks || []} 
      />
    </div>
  );
}
