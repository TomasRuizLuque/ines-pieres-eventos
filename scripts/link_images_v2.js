/**
 * Vincula las imágenes descargadas en public/images/catalogo/
 * con sus respectivos ítems en Supabase.
 * 
 * Matching: El nombre del archivo contiene el código del producto (ej: KBA, ALFP)
 * que coincide con el nombre del item en la DB (ej: "Banq. Alta Kraft - KBA")
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CATALOGO_DIR = path.join(__dirname, '..', 'public', 'images', 'catalogo');

async function run() {
  // 1. Listar todas las imágenes descargadas
  const files = fs.readdirSync(CATALOGO_DIR).filter(f => /\.(jpg|jpeg|png|webp|JPG|JPEG|PNG)$/i.test(f));
  console.log(`📁 ${files.length} imágenes encontradas en catalogo/`);

  // 2. Obtener todos los items de la DB
  const { data: items, error } = await supabase.from('items').select('id, nombre');
  if (error) { console.error(error); return; }
  console.log(`📦 ${items.length} ítems en Supabase`);

  // 3. Para cada item, buscar una imagen que coincida
  let matched = 0;
  let notMatched = 0;

  for (const item of items) {
    // Extraer el código del item (parte después del " - ")
    const parts = item.nombre.split(' - ');
    const code = parts.length > 1 ? parts[parts.length - 1].trim() : null;
    const nameClean = parts[0].trim();

    // Buscar archivo que contenga el código o el nombre
    let matchedFile = null;

    if (code) {
      // Primero buscar por código exacto al final del nombre de archivo
      matchedFile = files.find(f => {
        const fNoExt = path.parse(f).name;
        // El archivo tiene formato: Nombre_del_Producto_-_CODIGO
        return fNoExt.endsWith(`_-_${code}`) || fNoExt.endsWith(`-_${code}`);
      });
    }

    if (!matchedFile) {
      // Buscar por nombre normalizado
      const nameNorm = nameClean
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar acentos
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_+/g, '_')
        .toLowerCase();
      
      matchedFile = files.find(f => {
        const fNorm = path.parse(f).name
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9]/g, '_')
          .replace(/_+/g, '_')
          .toLowerCase();
        return fNorm.includes(nameNorm) || nameNorm.includes(fNorm);
      });
    }

    if (matchedFile) {
      const imgPath = `/images/catalogo/${matchedFile}`;
      const { error: updateErr } = await supabase
        .from('items')
        .update({ url_imagen: imgPath })
        .eq('id', item.id);
      
      if (!updateErr) {
        matched++;
      } else {
        console.log(`  ❌ Error actualizando ${item.nombre}: ${updateErr.message}`);
      }
    } else {
      notMatched++;
      if (code) {
        // Último intento: buscar archivos que contengan el código en cualquier parte
        const lastChance = files.find(f => {
          const fNoExt = path.parse(f).name.toUpperCase();
          return fNoExt.includes(code.toUpperCase());
        });
        if (lastChance) {
          const imgPath = `/images/catalogo/${lastChance}`;
          await supabase.from('items').update({ url_imagen: imgPath }).eq('id', item.id);
          matched++;
          notMatched--;
        }
      }
    }
  }

  console.log(`\n✅ ${matched} ítems vinculados con imagen`);
  console.log(`⚠️ ${notMatched} ítems sin imagen`);

  // Listar los que quedaron sin imagen
  const { data: noImg } = await supabase.from('items').select('nombre').is('url_imagen', null);
  if (noImg && noImg.length > 0) {
    console.log(`\n📋 Items sin imagen (${noImg.length}):`);
    noImg.forEach(i => console.log(`  - ${i.nombre}`));
  }
}

run();
