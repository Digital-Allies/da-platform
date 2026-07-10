const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment before running this script.');
}

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
