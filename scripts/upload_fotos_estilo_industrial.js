/**
 * Sube fotos de Estilo Industrial a Supabase Storage y actualiza url_imagen
 * Mapeo: pagina_0004 → item 0 de parte2, ..., pagina_0037 → item 33 de parte2
 *        pagina_0038 → item 0 de parte1, ..., pagina_0114 → item 76 de parte1
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PROVEEDOR_ID = '95ebc9d4-6339-4a1c-83f9-5279220969f9';
const BUCKET = 'catalogo';
const PAGES_DIR = 'C:/Users/tomyr/Downloads/Catálogo ESTILO  INDUSTRIAL - 2026 (1)_scrapped/paginas_rasterizadas';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Nombres de items en el MISMO ORDEN que fueron insertados
// Parte 1: pp.38-114 (insert_estilo_industrial.js)
const NOMBRES_PARTE1 = [
  'Living Creta Blue c/Sillas Bali',
  'Living Creta Blue c/Sillas Bertoia',
  'Living Creta Blue c/Silloncitos MDQ',
  'Living Creta Blue c/Sillas Cross',
  'Living Antonia c/Sillas Tolix',
  'Living Antonia',
  'Living Antonia c/Sillas Bertoia',
  'Living Antonia c/Sillas Cross',
  'Living Antonia c/Gervasoni',
  'Living Antonia c/Poltronas Kraft',
  'Living Antonia c/Silloncitos MDQ',
  'Living Antonia c/Silloncitos MDQ XL',
  'Living de Hierro Clásico',
  'Living de Hierro Clásico c/Sillas Tolix',
  'Living Rústico de Madera',
  'Mesa Alta Bar p/4ps c/Banquetas Hierro-Madera',
  'Mesa Alta Bar p/6ps c/Banquetas Hierro-Madera',
  'Mesa Alta Bar p/8ps c/Banquetas Hierro-Madera',
  'Mesa Alta Bar p/4ps c/Taburete Tolix',
  'Mesa Alta Bar p/6ps c/Taburete Tolix',
  'Mesa Alta Bar p/8ps c/Taburete Tolix',
  'Mesa Alta Bar p/4ps c/Banqueta Tulum (70x70)',
  'Mesa Alta Bar p/4ps c/Banqueta Tulum (120x35)',
  'Mesa Alta Bar p/8ps c/Banqueta Tulum',
  'Mesa Alta Bar p/4ps c/Banqueta MDQ (70x70)',
  'Mesa Alta Bar p/4ps c/Banqueta MDQ (120x35)',
  'Mesa Alta Bar p/8ps c/Banqueta MDQ',
  'Mesa Alta Toscana p/4ps c/Banqueta MDQ',
  'Mesa Alta Creta p/4ps c/Banqueta Creta',
  'Mesa Alta Toscana p/4ps c/Banqueta Tulum',
  'Mesón Toscana p/10ps c/Sillas Cross',
  'Mesón Toscana p/8ps c/Silloncito Creta',
  'Mesa Toscana p/8ps c/Sillas Luis XV',
  'Mesa Serpentina p/7ps c/Sillas Cross',
  'Mesa Community p/10ps c/Sillas Tolix',
  'Mesa Community p/8ps c/Sillas Cross',
  'Mesa Rústica p/10ps c/Sillas Tijera',
  'Mesa Cafetín p/4ps c/Sillas Cross',
  'Mesa Cafetín p/4ps c/Sillas Bertoia',
  'Mesa Cafetín p/3ps c/Sillas Cafetín',
  'Mesa Cafetín p/4ps c/Sillas Tolix',
  'Mesa Cafetín p/3ps c/Silloncito MDQ',
  'Mesa Cafetín Paraíso p/4ps c/Sillas Luis XV',
  'Mesas Feria c/Bancos',
  'Mesa Pic Nic',
  'Sillas Plegables c/Almohadón',
  'Sillas Cross',
  'Sillas Luis XV',
  'Sillas Tijera',
  'Mesa Antique',
  'Mesa Toscana Individual',
  'Mesa Cafetín Paraíso Individual',
  'Bancos de Madera',
  'Pérgola de Madera',
  'Barra de Madera',
  'Barra de Chapa',
  'Spot DJ (Tipi + Caña)',
  'Carpa Tipi',
  'Honguito Calefactor',
  'Fogonero',
  'Arco de Ceremonia Madera',
  'Mesa de Ceremonia Rústica',
  'Sombrilla Boho',
  'Estantería de Hierro',
  'Biombo Industrial',
  'Hamaca de Hierro',
  'Corpórea LOVE (madera)',
  'Pedestal de Hierro',
  'Corpórea BAR (chapa)',
  'Alfombra de Yute',
  'Alfombra Persa',
  'Alfombra de Arroz',
  "Cartel Neón 'Let's get this party started'",
  "Cartel Neón 'Let's party'",
  "Cartel Neón 'Let's celebrate'",
  "Cartel Neón 'Crazy in love'",
  "Cartel Neón 'Better together'",
];

// Parte 2: pp.4-37 (insert_estilo_industrial_parte2.js)
const NOMBRES_PARTE2 = [
  'Living Chester con Poltronas',
  'Living Chester con Poltronas XL',
  'Living Chester con Poltronas Indonesia',
  'Living Chester con Poltronas Indonesia XL',
  'Living Chester con Gervasoni',
  'Living Chester con Gervasoni XL',
  'Living Chester con Gervasoni XXL',
  'Living Chester con Bertoia',
  'Living Chester con Bertoia XL',
  'Living Chester Restoration',
  'Living Bali',
  'Living Bali con Bertoia',
  'Living Bali con Bertoia XL',
  'Living Bali con Gervasoni',
  'Living Bali con Gervasoni XL',
  'Living Bali con Gervasoni XXL',
  'Living Bali con Poltronas',
  'Living Bali con Poltronas XL',
  'Living Bali con Poltronas XXL',
  'Living Gervasoni + Indonesia',
  'Living Gervasoni con Cross',
  'Living Gervasoni XL',
  'Living de Caña + Gervasoni',
  'Living de Caña',
  'Living de Caña XL',
  'Living de Caña XXL',
  'Living Creta',
  'Living Creta + Cross',
  'Living Creta XL',
  'Living Creta XL con Indonesia',
  'Living Creta Green + Sillas Bali',
  'Living Creta Green con Sillas Bertoia',
  'Living Creta Green + Silloncitos MDQ',
  'Living Creta Green + Sillas Cross',
];

function pageFile(n) {
  return path.join(PAGES_DIR, `pagina_${String(n).padStart(4, '0')}.jpg`);
}

function publicUrl(storagePath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
    if (error) throw new Error(`No se pudo crear bucket: ${error.message}`);
    console.log(`  ✅ Bucket '${BUCKET}' creado`);
  } else {
    console.log(`  ℹ️  Bucket '${BUCKET}' ya existe`);
  }
}

async function uploadAndUpdate(nombre, pageNum) {
  const filePath = pageFile(pageNum);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  Archivo no encontrado: pagina_${String(pageNum).padStart(4, '0')}.jpg — saltando`);
    return;
  }

  const fileData = fs.readFileSync(filePath);
  const storagePath = `estilo_industrial/pagina_${String(pageNum).padStart(4, '0')}.jpg`;

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileData, { contentType: 'image/jpeg', upsert: true });

  if (uploadErr) {
    console.log(`  ❌ Upload error p${pageNum} (${nombre}): ${uploadErr.message}`);
    return;
  }

  const url = publicUrl(storagePath);

  const { error: updateErr } = await supabase
    .from('items')
    .update({ url_imagen: url })
    .eq('nombre', nombre)
    .eq('id_proveedor', PROVEEDOR_ID);

  if (updateErr) {
    console.log(`  ❌ Update error (${nombre}): ${updateErr.message}`);
  } else {
    console.log(`  ✅ p${pageNum} → ${nombre}`);
  }
}

async function run() {
  console.log('=== UPLOAD FOTOS ESTILO INDUSTRIAL ===\n');

  await ensureBucket();

  console.log('\n[1/2] Parte 2 (pp.4-37) — 34 items...');
  for (let i = 0; i < NOMBRES_PARTE2.length; i++) {
    await uploadAndUpdate(NOMBRES_PARTE2[i], i + 4);
  }

  console.log('\n[2/2] Parte 1 (pp.38-114) — 77 items...');
  for (let i = 0; i < NOMBRES_PARTE1.length; i++) {
    await uploadAndUpdate(NOMBRES_PARTE1[i], i + 38);
  }

  console.log('\n🎉 ¡Fotos subidas y url_imagen actualizadas!');
}

run();
