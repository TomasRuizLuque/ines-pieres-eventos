require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const puppeteer = require('puppeteer');
const fs = require('fs');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  console.log('Abriendo Navegador (No lo cierres!)...');
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();
  
  await page.goto('https://admin.galponpueyrredon.com.ar/login', { waitUntil: 'networkidle2' });
  
  // Buscar inputs
  const passInputs = await page.$$('input[type="password"]');
  const textInputs = await page.$$('input[type="text"], input[type="email"], input:not([type="hidden"]):not([type="submit"]):not([type="button"])');
  const btn = await page.$('button[type="submit"], input[type="submit"]');

  if (textInputs.length > 0 && passInputs.length > 0) {
    await textInputs[0].type('catalogo', { delay: 100 });
    await passInputs[0].type('catalogo', { delay: 100 });
    if (btn) await btn.click();
  }

  console.log('Esperando carga del catalogo...');
  // Vuetify v-card
  await page.waitForSelector('div.v-card', { timeout: 15000 }).catch(() => console.log("Timeout esperando v-card"));
  
  // Asegurarnos de ir a /productos si el login no redunda ahi
  if (!page.url().includes('/productos')) {
    await page.goto('https://admin.galponpueyrredon.com.ar/productos');
  }

  // Esperar a que exista al menos un precio en el DOM (indicador de que los items cargaron)
  await page.waitForSelector('.v-card-text p span', { timeout: 20000 }).catch(() => console.log("Timeout"));
  
  let allItems = [];
  let hasNext = true;
  let pageNum = 1;

  console.log(`Scrapeando página ${pageNum}...`);
  // Esperar a la red
  await new Promise(r => setTimeout(r, 6000));
  
  const htmldump = await page.content();
  fs.writeFileSync('scratch/galpon_dump.html', htmldump);
  console.log("HTML dumpeado. Analisis manual...");

    // Intentar ir a la sgte
    const nextBtn = await page.$('button[aria-label="Next page"]');
    if (nextBtn) {
      const disabledProp = await nextBtn.getProperty('disabled');
      const isDisabled = await disabledProp.jsonValue();
      if (!isDisabled) {
        await nextBtn.click();
        pageNum++;
      } else {
        hasNext = false;
      }
    } else {
      hasNext = false;
    }
  }

  console.log(`Extracción completa!! ${allItems.length} muebles en total.`);
  await browser.close();

  // Guardar por backup
  fs.writeFileSync('scratch/galpon_full.json', JSON.stringify(allItems, null, 2));

  // Omitir duplicados e insertar
  console.log('Guardando en Supabase Base de Datos...');
  
  // Provider ID
  const { data: provData } = await supabase.from('proveedores').select('id').eq('nombre', 'Galpón Pueyrredón').single();
  let provId = provData?.id;

  // Cat General
  const { data: catData } = await supabase.from('categorias').select('id').eq('nombre', 'General').single();
  let catId = catData?.id;
  if (!catId) {
     const resCat = await supabase.from('categorias').insert([{ nombre: 'General' }]).select('id').single();
     catId = resCat.data.id;
  }

  // Traemos los nombres actuales para no duplicar los aprox 10 q ya tenes
  const { data: existing } = await supabase.from('items').select('nombre');
  const existingNames = new Set(existing.map(i => i.nombre));

  let nuevos = [];
  for (let item of allItems) {
    if (!existingNames.has(item.name)) {
      nuevos.push({
        nombre: item.name,
        precio_costo: item.price,
        id_proveedor: provId,
        id_categoria: catId
      });
      existingNames.add(item.name); // evitar dup en la misma corrida
    }
  }

  if (nuevos.length > 0) {
    // Insert en batch de a 100
    for(let i=0; i<nuevos.length; i+=100){
      const batch = nuevos.slice(i, i+100);
      const { error } = await supabase.from('items').insert(batch);
      if (error) console.error("Error insertando batch:", error.message);
    }
    console.log(`¡Insertados ${nuevos.length} ítems exitosamente a tu base de datos!`);
  } else {
    console.log("No hay ítems nuevos que agregar.");
  }
}

run();
