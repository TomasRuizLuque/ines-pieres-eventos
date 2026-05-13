/**
 * Upload images from Lambaré e Ines Pieres Excel to Supabase Storage
 * and update the corresponding items with their image URLs.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const BUCKET = 'item-images';
const MEDIA_DIR = path.join(__dirname, '..', 'scratch', 'xlsx_extracted', 'xl', 'media');
const BASE_DIR = path.join(__dirname, '..', 'scratch', 'xlsx_extracted');

// ── Build the vm → image file mapping ──
function buildImageMap() {
  const relsFile = path.join(BASE_DIR, 'xl', 'richData', '_rels', 'richValueRel.xml.rels');
  const relsContent = fs.readFileSync(relsFile, 'utf-8');
  
  const relMap = {};
  const matches = [...relsContent.matchAll(/Relationship[^>]*Id="(rId\d+)"[^>]*Target="([^"]+)"/g)];
  for (const m of matches) {
    relMap[m[1]] = m[2].replace('../media/', '');
  }
  
  // vm index (1-based) → image filename
  const imageMap = {};
  for (let i = 0; i < 107; i++) {
    const rId = `rId${i + 1}`;
    if (relMap[rId]) imageMap[i + 1] = relMap[rId];
  }
  return imageMap;
}

// ── Parse worksheet XMLs to get cell → vm mappings ──
function parseCellVmMappings() {
  const result = { 'Lambaré': {}, 'Ines Pieres': {} };
  const sheetFiles = [
    { file: 'sheet1.xml', name: 'Lambaré' },
    { file: 'sheet2.xml', name: 'Ines Pieres' },
  ];
  
  for (const { file, name } of sheetFiles) {
    const content = fs.readFileSync(path.join(BASE_DIR, 'xl', 'worksheets', file), 'utf-8');
    const cellMatches = [...content.matchAll(/<c\s+r="C(\d+)"[^>]*vm="(\d+)"[^>]*>/g)];
    for (const m of cellMatches) {
      result[name][parseInt(m[1])] = parseInt(m[2]);
    }
  }
  return result;
}

async function run() {
  console.log('=== UPLOAD IMAGES: LAMBARÉ E INES PIERES ===\n');
  
  const imageMap = buildImageMap();
  const cellVmMap = parseCellVmMappings();
  
  // Read Excel for item names
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path.join(__dirname, '..', 'public', 'images', 'catalogos', 'Lambaré e Ines Pieres.xlsx'));
  
  // Build item name → image file mapping for both sheets
  const itemImagePairs = []; // { itemName, imageFile, proveedor }
  
  const sheets = [
    { name: 'Lambaré', provSuffix: 'Lambaré' },
    { name: 'Ines Pieres', provSuffix: 'Ines Pieres' },
  ];
  
  for (const { name: sheetName, provSuffix } of sheets) {
    const ws = workbook.getWorksheet(sheetName);
    const vmMap = cellVmMap[sheetName];
    
    for (const [rowStr, vmIdx] of Object.entries(vmMap)) {
      const rowNum = parseInt(rowStr);
      const imgFile = imageMap[vmIdx];
      if (!imgFile) continue;
      
      const nameCell = ws.getRow(rowNum).getCell(1);
      const rawName = (nameCell.value || '').toString().trim();
      if (!rawName || rawName.startsWith('CATALOGO')) continue;
      
      itemImagePairs.push({
        rawName,
        imageFile: imgFile,
        proveedor: provSuffix,
      });
    }
  }
  
  console.log(`Found ${itemImagePairs.length} item-image pairs\n`);
  
  // Get all items from DB for both proveedores
  const { data: allItems, error: fetchErr } = await supabase
    .from('items')
    .select('id, nombre, id_proveedor, url_imagen, proveedores(nombre)')
    .in('proveedores.nombre', ['Lambaré', 'Ines Pieres']);
  
  if (fetchErr) { console.error('Error fetching items:', fetchErr.message); return; }
  
  // Filter to only Lambaré and Ines Pieres items
  const relevantItems = (allItems || []).filter(i => 
    i.proveedores?.nombre === 'Lambaré' || i.proveedores?.nombre === 'Ines Pieres'
  );
  console.log(`Found ${relevantItems.length} items in DB for these proveedores\n`);

  // Map: search for matching items by name substring
  let uploaded = 0;
  let matched = 0;
  const alreadyUploaded = new Set(); // track image files already uploaded

  for (const pair of itemImagePairs) {
    // Find matching DB item
    const dbItem = relevantItems.find(i => {
      const dbName = i.nombre.toLowerCase();
      const excelName = pair.rawName.toLowerCase().trim();
      // Check if DB name contains Excel name or vice versa
      return dbName.includes(excelName) || excelName.includes(dbName.replace(` ${pair.proveedor.toLowerCase()}`, ''));
    });
    
    if (!dbItem) {
      console.log(`  ⚠ No DB match for "${pair.rawName}" (${pair.proveedor})`);
      continue;
    }
    
    matched++;
    
    // Upload image if not already done
    const imgPath = path.join(MEDIA_DIR, pair.imageFile);
    if (!fs.existsSync(imgPath)) {
      console.log(`  ⚠ Image file not found: ${pair.imageFile}`);
      continue;
    }
    
    const safeProv = pair.proveedor.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // strip accents
      .replace(/\s+/g, '-');
    const storagePath = `catalogos/${safeProv}/${pair.imageFile}`;
    
    if (!alreadyUploaded.has(storagePath)) {
      const fileBuffer = fs.readFileSync(imgPath);
      const { error: uploadErr } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, fileBuffer, {
          contentType: 'image/png',
          upsert: true,
        });
      
      if (uploadErr) {
        console.log(`  ❌ Upload failed for ${storagePath}: ${uploadErr.message}`);
        continue;
      }
      alreadyUploaded.add(storagePath);
      uploaded++;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    const publicUrl = urlData.publicUrl;
    
    // Update item in DB
    const { error: updateErr } = await supabase
      .from('items')
      .update({ url_imagen: publicUrl })
      .eq('id', dbItem.id);
    
    if (updateErr) {
      console.log(`  ❌ Update failed for "${dbItem.nombre}": ${updateErr.message}`);
    } else {
      console.log(`  ✅ ${dbItem.nombre} → ${pair.imageFile}`);
    }
  }
  
  console.log(`\n🎉 Done!`);
  console.log(`   Matched: ${matched} items`);
  console.log(`   Images uploaded: ${uploaded}`);
}

run();
