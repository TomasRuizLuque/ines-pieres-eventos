/**
 * Sube fotos de Grupo DRG a Supabase Storage y actualiza url_imagen
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PROVEEDOR_ID = '6bea0ae4-7ad4-430f-b1d5-37de8db4b35e';
const BUCKET = 'catalogo';
const PAGES_DIR = 'C:/Users/tomyr/Downloads/Catalogo Grupo DRG 3 (3)_scrapped/paginas_rasterizadas';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

// page number → item name (as inserted in DB)
const MAPEO = [
  // LIVINGS
  [3,  'Living en Madera con Sillón Gervasoni'],
  [4,  'Living en Madera con Funda de Gabardina'],
  [5,  'Living en Madera Recto'],
  [6,  'Living en Hierro'],
  [7,  'Living de Caña'],
  [8,  'Living de Pana'],
  // SILLAS
  [10, 'Sillas Cross'],
  [11, 'Sillas de Madera'],
  [12, 'Sillas Mar del Plata'],
  [13, 'Sillas Jesuitas'],
  [14, 'Sillas Tiffany Negras'],
  // MESAS ALTAS
  [16, 'Mesa Alta con Banquetas en Hierro y Madera'],
  [17, 'Mesa Alta en Madera con Taburetes Chiavari'],
  [18, 'Mesa Alta con Taburetes Chiavari Negras'],
  [19, 'Mesa Alta con Taburetes MDQ'],
  [20, 'Mesa Alta con Banqueta Cross'],
  // MESAS
  [22, 'Mesa Comunal Caballete'],
  [23, 'Mesón Pata Torneada'],
  [24, 'Mesa Madera XL'],
  [25, 'Mesas Cafetín DRG'],
  [26, 'Mesas Redondas Gervasoni'],
  [27, 'Mesa Corteza'],
  [28, 'Mesa Ceremonia DRG'],
  [29, 'Mesas Espejadas'],
  // COMPLEMENTOS
  [31, 'Pérgola con Techo Blanco'],
  [32, 'Pérgola con Tela en Techo y Patas'],
  [33, 'Sombrillas DRG'],
  [34, 'Módulos de Barra'],
  [35, 'Pedestales de Madera'],
  [36, 'Estanterías DRG'],
  [37, 'Fanales de Bambú'],
  [38, 'Individuales Seagrass'],
  [39, 'Alfombras de Yute DRG'],
  [40, 'Alfombras Persas DRG'],
  [41, 'Arco de Ceremonia Redondo'],
  [42, 'Arco de Ceremonia Rectangular'],
  [43, 'Carpas Tipi DRG'],
  [44, 'Bancos de Madera DRG'],
  [45, 'Fogoneros DRG'],
  [46, 'Calefactores Honguitos'],
  [47, 'Calefactores Pirámides'],
  [48, 'Photo Opportunity'],
  [49, 'Escenografía Café de París'],
  [50, 'Pared Donera'],
  [51, 'Cartelería de Neón DRG'],
  [52, 'Sillón Princesa'],
  [53, 'Paneles Verticales de Madera'],
  [54, 'Deco Circense'],
  [55, 'Sector Infantil'],
  [57, 'Arañas Imperial'],
  [58, 'Arañas Brooklyn'],
  [59, 'Arañas Boho'],
  [61, 'Guirnaldas Flotantes'],
  [62, 'Instalaciones Lucesitas de Arroz'],
  [63, 'Guirnaldas Kermes'],
  [65, 'Pista con Lluvia de Lucesitas de Arroz'],
  [66, 'Árboles Encantados'],
  [67, 'Paneles Espejados'],
  [68, 'Estructuras Doradas de Piso'],
  [69, 'Luces Aéreas'],
  [70, 'Aros de Neón'],
  [71, 'Velador Fotógrafo'],
];

function pageFile(n) {
  return path.join(PAGES_DIR, `pagina_${String(n).padStart(4, '0')}.jpg`);
}

function publicUrl(storagePath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
}

async function uploadAndUpdate(pageNum, nombre) {
  const filePath = pageFile(pageNum);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  Archivo no encontrado: pagina_${String(pageNum).padStart(4, '0')}.jpg — saltando`);
    return;
  }

  const fileData = fs.readFileSync(filePath);
  const storagePath = `grupo_drg/pagina_${String(pageNum).padStart(4, '0')}.jpg`;

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
  console.log('=== UPLOAD FOTOS GRUPO DRG ===\n');
  console.log(`Subiendo ${MAPEO.length} items...\n`);

  for (const [pageNum, nombre] of MAPEO) {
    await uploadAndUpdate(pageNum, nombre);
  }

  console.log('\n🎉 ¡Fotos subidas y url_imagen actualizadas!');
}

run();
