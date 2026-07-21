const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
  if (m) {
    let val = m[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    env[m[1]] = val;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const clientId = env.NEXT_PUBLIC_CLIENT_ID;

console.log('Testing connection to:', supabaseUrl);
console.log('Using Client ID:', clientId);

async function run() {
  const supabaseAnon = createClient(supabaseUrl, anonKey);
  console.log('\n--- QUERYING WITH ANON KEY ---');
  
  let { data: productsAnon, error: errProdAnon } = await supabaseAnon
    .from('products')
    .select('*')
    .eq('client_id', clientId);
  console.log('Products count (Anon):', productsAnon ? productsAnon.length : 'error', errProdAnon || '');
  if (productsAnon && productsAnon.length > 0) {
    console.log('First product (Anon):', productsAnon[0].title);
  }

  let { data: reviewsAnon, error: errRevAnon } = await supabaseAnon
    .from('reviews')
    .select('*')
    .eq('client_id', clientId);
  console.log('Reviews count (Anon):', reviewsAnon ? reviewsAnon.length : 'error', errRevAnon || '');

  const supabaseService = createClient(supabaseUrl, serviceKey);
  console.log('\n--- QUERYING WITH SERVICE ROLE KEY ---');

  let { data: productsSvc, error: errProdSvc } = await supabaseService
    .from('products')
    .select('*')
    .eq('client_id', clientId);
  console.log('Products count (Service):', productsSvc ? productsSvc.length : 'error', errProdSvc || '');
  if (productsSvc && productsSvc.length > 0) {
    console.log('First product (Service):', productsSvc[0].title);
  }

  let { data: reviewsSvc, error: errRevSvc } = await supabaseService
    .from('reviews')
    .select('*')
    .eq('client_id', clientId);
  console.log('Reviews count (Service):', reviewsSvc ? reviewsSvc.length : 'error', errRevSvc || '');
}

run().catch(console.error);
