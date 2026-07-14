const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
const clientId = env.NEXT_PUBLIC_CLIENT_ID || '3d76b896-e1fb-49f0-a8db-f62fdd5bc258';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE env vars in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Fetching client:", clientId);

  const { data: clients, error: errClient } = await supabase.from('clients').select('*');
  console.log("Clients:", clients, "Error:", errClient);

  const { data: pages, error: errPages } = await supabase.from('pages').select('*').eq('client_id', clientId);
  console.log("Pages:", pages, "Error:", errPages);

  const { data: services, error: errServices } = await supabase.from('services').select('*').eq('client_id', clientId);
  console.log("Services:", services, "Error:", errServices);

  const { data: testimonials, error: errTestimonials } = await supabase.from('testimonials').select('*').eq('client_id', clientId);
  console.log("Testimonials:", testimonials, "Error:", errTestimonials);

  const { data: settings, error: errSettings } = await supabase.from('settings').select('*').eq('client_id', clientId);
  console.log("Settings:", settings, "Error:", errSettings);
}

run().catch(console.error);
