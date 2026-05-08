/**
 * Sube fotos de Godino Saenz a Supabase Storage y actualiza url_imagen
 * Mapeo directo: página del PDF → nombre del item
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PROVEEDOR_ID = '8b8a34a1-81e6-4384-9138-04ab12a06089';
const BUCKET = 'catalogo';
const PAGES_DIR = 'C:/Users/tomyr/Downloads/catalogomuebles (2)_scrapped/paginas_rasterizadas';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

// page number → item name (as inserted in DB)
const MAPEO = [
  // SILLAS (pp. 3-39)
  [3,  'Silla Malasia Negra'],
  [4,  'Silla Malasia Natural'],
  [5,  'Silla Thonet'],
  [6,  'Silla Nepal'],
  [7,  'Silla Viena Arena'],
  [8,  'Silla Viena Negra'],
  [9,  'Silla Viena Esterilla'],
  [10, 'Silla Bamboo Negra'],
  [11, 'Silla Bamboo Caramel'],
  [12, 'Silla Noruega'],
  [13, 'Silla Cross Caramelo'],
  [14, 'Silla Cross Natural'],
  [15, 'Silla Cross Negra'],
  [16, 'Silla Ghost Cristal'],
  [17, 'Silla Ghost Negra'],
  [18, 'Silla Ghost Cristal AP'],
  [19, 'Silla Ghost Blanca AP'],
  [20, 'Silla París Blanca'],
  [21, 'Silla París Negra'],
  [22, 'Silla París Blanca y Negra'],
  [23, 'Silla Tiffany Negra'],
  [24, 'Silla Tiffany Blanca'],
  [25, 'Silla Tiffany Dorada'],
  [26, 'Silla Tiffany Madera'],
  [27, 'Silla Tiffany Cristal'],
  [28, 'Silla Tiffany Verde'],
  [29, 'Silla Tiffany Violeta'],
  [30, 'Silla Tiffany Roja'],
  [31, 'Silla Tiffany Amarilla'],
  [32, 'Silla Imperio'],
  [33, 'Silla Napoleón'],
  [34, 'Silla Tulum Beige'],
  [35, 'Silla Tulum Negra'],
  [36, 'Silla Mar del Plata Natural'],
  [37, 'Silla Mar del Plata'],
  [38, 'Silla Estilo Esterilla Blanca'],
  [39, 'Silla Estilo Esterilla Negra'],
  // LIVINGS (pp. 41-71)
  [41, 'Living Grecia Rosa'],
  [42, 'Living Grecia Visón'],
  [43, 'Living Grecia Negro'],
  [44, 'Living Grecia Azul'],
  [45, 'Living Valencia Negro'],
  [46, 'Living Valencia Tiza'],
  [47, 'Living Valencia Verde'],
  [48, 'Living Buenos Aires'],
  [49, 'Living Malta'],
  [50, 'Living de Pana Verde'],
  [51, 'Living Negro Capitoné'],
  [52, 'Living Pana Visón'],
  [53, 'Living New York'],
  [54, 'Living Viena'],
  [55, 'Living Boston Chester'],
  [56, 'Living California'],
  [57, 'Living Boston'],
  [58, 'Living Bali'],
  [59, 'Living Cádiz'],
  [60, 'Living Ibiza'],
  [61, 'Living Ibiza Negro'],
  [62, 'Living Bagan'],
  [63, 'Living Yakarta'],
  [64, 'Living Singapur'],
  [65, 'Living Gervasoni'],
  [66, 'Living Tulum Negro'],
  [67, 'Living Tulum Arena'],
  [68, 'Living Jordania'],
  [69, 'Living Tiffany'],
  [70, 'Living de Estilo Blanco'],
  [71, 'Living de Estilo Negro'],
  // MESAS (pp. 73-81)
  [73, 'Mesa Viena'],
  [74, 'Mesa Viena Roble'],
  [75, 'Mesa Barcelona'],
  [76, 'Mesa Islandia'],
  [77, 'Mesa Amalfi'],
  [78, 'Mesa Amalfi Redonda'],
  [79, 'Mesa de Acero'],
  [80, 'Mesa de Campo'],
  [81, 'Mesa Pic-Nic Baja'],
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

async function uploadAndUpdate(pageNum, nombre) {
  const filePath = pageFile(pageNum);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  Archivo no encontrado: pagina_${String(pageNum).padStart(4, '0')}.jpg — saltando`);
    return;
  }

  const fileData = fs.readFileSync(filePath);
  const storagePath = `godino_saenz/pagina_${String(pageNum).padStart(4, '0')}.jpg`;

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
  console.log('=== UPLOAD FOTOS GODINO SAENZ ===\n');

  await ensureBucket();

  console.log(`\nSubiendo ${MAPEO.length} items...\n`);
  for (const [pageNum, nombre] of MAPEO) {
    await uploadAndUpdate(pageNum, nombre);
  }

  console.log('\n🎉 ¡Fotos subidas y url_imagen actualizadas!');
}

run();
