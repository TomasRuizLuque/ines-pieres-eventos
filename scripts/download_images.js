require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Helper para descargar imagen desde una URL con Fetch (pasando cookies si es necesario)
// Aunque las imagenes de Galpon Pueyrredon suelen ser publicas
async function downloadImage(url, filepath, page) {
  try {
    const viewSource = await page.goto(url);
    const buffer = await viewSource.buffer();
    fs.writeFileSync(filepath, buffer);
    return true;
  } catch (error) {
    console.error(`Error descargando ${url}: ${error.message}`);
    return false;
  }
}

async function run() {
  console.log('Iniciando Puppeteer en modo visual para evadir el antibot/406...');
  // Lanzamos modo visual para que pase como humano!
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();
  
  // Anti-bot evasions basicas
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  // 1. Loguearnos
  console.log('Navegando al login...');
  await page.goto('https://admin.galponpueyrredon.com.ar/login', { waitUntil: 'networkidle2' });
  
  // Buscar inputs. 
  const passInputs = await page.$$('input[type="password"]');
  const textInputs = await page.$$('input[type="text"], input[type="email"], input:not([type="hidden"]):not([type="submit"]):not([type="button"])');

  const btn = await page.$('button[type="submit"], input[type="submit"]');

  if (textInputs.length > 0 && passInputs.length > 0) {
    await textInputs[0].type('catalogo', { delay: 100 });
    await passInputs[0].type('catalogo', { delay: 100 });
    if (btn) await btn.click();
    await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
  } else {
    console.log("No pude encontrar el formulario clásico, sigo por si ya hay sesion o no la pide.");
  }

  // Crear directorio destino
  const imgDir = path.join(__dirname, '..', 'public', 'images', 'catalogo');
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
  }

  const data = [
  { "name": "Alfombra simil Persas - ALFP", "image_url": "https://admin.galponpueyrredon.com.ar/productos/246" },
  { "name": "Alfombra Yute - ALFY", "image_url": "https://admin.galponpueyrredon.com.ar/productos/247" },
  { "name": "Arco de Ceremonia - OARCO", "image_url": "https://admin.galponpueyrredon.com.ar/productos/250" },
  { "name": "Banco Campo 2mts - CB4", "image_url": "https://admin.galponpueyrredon.com.ar/productos/265" },
  { "name": "Banco PicNic - PB4", "image_url": "https://admin.galponpueyrredon.com.ar/productos/266" },
  { "name": "Banco Rattán Cinchas - RB3C", "image_url": "https://admin.galponpueyrredon.com.ar/productos/267" },
  { "name": "Banq. Alta Kraft - KBA", "image_url": "https://admin.galponpueyrredon.com.ar/productos/270" },
  { "name": "Banq. Alta Kraft Blanca - KBAB", "image_url": "https://admin.galponpueyrredon.com.ar/productos/271" },
  { "name": "Banq. Alta Nogal Blanca - NBAB", "image_url": "https://admin.galponpueyrredon.com.ar/productos/276" },
  { "name": "Banq. Alta Nogal Negra - NBAN", "image_url": "https://admin.galponpueyrredon.com.ar/productos/277" }
  ];

  console.log(`Procesando ${data.length} items forzados...`);

  for (let item of data) {
    if (item.image_url) {
      console.log(`Navegando al item: ${item.name}`);
      await page.goto(item.image_url, { waitUntil: 'networkidle2' });
      
      const html = await page.content();
      // Buscamos cualquier URL que termine en jpg/png dentro de la pagina
      let imgUrl = null;
      const match = html.match(/(https?:\/\/[^\s"'<>]+?(?:\.jpg|\.png|\.jpeg|\.webp))/i);
      if (match && match[1]) {
         imgUrl = match[1];
      }
      
      // Filtros de limpieza si hay varios matches o cgi-sys
      if (imgUrl && imgUrl.includes('x.png')) {
         const allMatches = html.match(/(https?:\/\/[^\s"'<>]+?(?:\.jpg|\.png|\.jpeg|\.webp))/gi) || [];
         const goodImg = allMatches.find(u => !u.includes('logo') && !u.includes('x.png') && !u.includes('icon'));
         if (goodImg) imgUrl = goodImg;
      }


      if (imgUrl) {
        const safeName = item.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
        const fp = path.join(imgDir, safeName);
        console.log(`-> Descargando imagen real para ${item.name} de: ${imgUrl}`);
        
        await downloadImage(imgUrl, fp, page);

        const dbUrl = `/images/catalogo/${safeName}`;
        await supabase.from('items').update({ url_imagen: dbUrl }).eq('nombre', item.name);
        console.log(`✓ DB Actualizada a ${dbUrl}`);
      } else {
        console.log(`! No encontre imagen util en ${item.name}`);
      }
    }
  }

  await browser.close();
  console.log('Finalizado!');
}

run();
