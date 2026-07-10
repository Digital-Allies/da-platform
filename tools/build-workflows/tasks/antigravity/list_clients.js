const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://auwhvicpyiwsubucanpb.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1d2h2aWNweWl3c3VidWNhbnBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTUxNzc4OCwiZXhwIjoyMDk3MTAzNzg4fQ.w9yuBbKr661JxPhNT6O1g38p3HnZY8zGbwC-phCRg8Q';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: clients, error } = await supabase.from('clients').select('*');
  if (error) {
    console.error('Error fetching clients:', error);
  } else {
    console.log('Current clients in database:');
    console.log(JSON.stringify(clients, null, 2));
  }
}

run();
