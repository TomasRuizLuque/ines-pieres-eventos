require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const images = [
    { name: 'alfombra_yute', file: 'alfombra_yute_1776447448814.png' },
    { name: 'banco_campo', file: 'banco_campo_1776447468622.png' },
    { name: 'banqueta_kraft', file: 'banqueta_kraft_1776447484866.png' },
    { name: 'arco_ceremonia', file: 'arco_ceremonia_1776447499856.png' }
  ];

  const sourceDir = 'C:\\Users\\tomyr\\.gemini\\antigravity\\brain\\4b8016ae-dc67-4d3b-a2da-f41dccf98bb6';
  const targetDir = 'c:\\Users\\tomyr\\Desktop\\Proyecto Ines Pieres Eventos\\public\\images\\catalogo';
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy files
  images.forEach(img => {
    fs.copyFileSync(path.join(sourceDir, img.file), path.join(targetDir, img.name + '.png'));
  });

  // Mapping array
  const mapping = [
    { matcher: 'Alfombra', file: 'alfombra_yute.png' },
    { matcher: 'Arco', file: 'arco_ceremonia.png' },
    { matcher: 'Banco', file: 'banco_campo.png' },
    { matcher: 'Banq', file: 'banqueta_kraft.png' }
  ];

  const { data: items } = await supabase.from('items').select('*');
  
  for (let item of items) {
    let file = mapping.find(m => item.nombre.includes(m.matcher))?.file;
    if (file) {
      await supabase.from('items').update({ url_imagen: '/images/catalogo/' + file }).eq('id', item.id);
      console.log(`Updated ${item.nombre} -> ${file}`);
    }
  }

  console.log('All linked successfully!');
}

run();
