require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { error } = await supabase
    .from('items')
    .update({ url_imagen: null })
    .like('url_imagen', '%api-prod%');
  
  if(error) console.log(error);
  console.log("URLs rotas limpiadas.");

  // Also relink the AI generated images we did have.
  const ai_links = {
    'Alfombra simil Persas - ALFP': '/images/catalogo/alfombra_yute.png',
    'Alfombra Yute - ALFY': '/images/catalogo/alfombra_yute.png',
    'Arco de Ceremonia - OARCO': '/images/catalogo/arco_ceremonia.png',
    'Banco Campo 2mts - CB4': '/images/catalogo/banco_campo.png',
    'Banco PicNic - PB4': '/images/catalogo/banco_campo.png',
    'Banco Rattán Cinchas - RB3C': '/images/catalogo/banco_campo.png',
    'Banq. Alta Kraft - KBA': '/images/catalogo/banqueta_kraft.png',
    'Banq. Alta Kraft Blanca - KBAB': '/images/catalogo/banqueta_kraft.png',
    'Banq. Alta Nogal Blanca - NBAB': '/images/catalogo/banqueta_kraft.png'
  };

  for (const [name, url] of Object.entries(ai_links)) {
    await supabase.from('items').update({ url_imagen: url }).eq('nombre', name);
  }
}
run();
