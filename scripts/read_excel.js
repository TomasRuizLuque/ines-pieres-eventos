require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  // List existing buckets
  const { data: buckets, error } = await supabase.storage.listBuckets();
  console.log('Existing buckets:');
  if (buckets) buckets.forEach(b => console.log(`  - ${b.name} (public: ${b.public})`));
  if (error) console.log('Error:', error.message);

  // Create the bucket if it doesn't exist
  const { data, error: createErr } = await supabase.storage.createBucket('item-images', {
    public: true,
    fileSizeLimit: 10485760, // 10MB
  });
  
  if (createErr) {
    console.log('Create bucket error:', createErr.message);
  } else {
    console.log('Bucket created:', data);
  }
}

run();
