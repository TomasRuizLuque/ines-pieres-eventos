/**
 * Script para descargar imágenes del catálogo de Galpón Pueyrredón
 * usando sesión autenticada de Puppeteer.
 * 
 * Estrategia: 
 * 1. Login con Puppeteer
 * 2. Navegar a la página de productos
 * 3. Extraer las URLs reales de las imágenes desde el DOM renderizado
 * 4. Descargar cada imagen usando page.evaluate + fetch (con cookies de sesión)
 * 5. Guardar localmente en public/images/catalogo/
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const CATALOGO_DIR = path.join(__dirname, '..', 'public', 'images', 'catalogo');

async function run() {
  // Asegurar directorio
  if (!fs.existsSync(CATALOGO_DIR)) {
    fs.mkdirSync(CATALOGO_DIR, { recursive: true });
  }

  console.log('🚀 Abriendo navegador...');
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: { width: 1400, height: 900 }
  });
  const page = await browser.newPage();

  // Step 1: Login
  console.log('🔐 Haciendo login...');
  await page.goto('https://admin.galponpueyrredon.com.ar/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Fill login form
  await page.type('input#input-0', 'catalogo', { delay: 50 });
  await page.type('input#input-2', 'catalogo', { delay: 50 });
  await page.click('button[type="submit"]');
  
  console.log('⏳ Esperando redirección post-login...');
  await new Promise(r => setTimeout(r, 5000));

  // Step 2: Navigate to productos
  const currentUrl = page.url();
  console.log('📍 URL actual:', currentUrl);
  
  if (!currentUrl.includes('/productos')) {
    await page.goto('https://admin.galponpueyrredon.com.ar/productos', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 3000));
  }

  // Step 3: Extraer info de las imágenes del DOM
  console.log('🔍 Extrayendo imágenes de la primera página...');
  
  // Primero, veamos qué estructura tiene el DOM
  const pageInfo = await page.evaluate(() => {
    // Buscar todas las imágenes en la página
    const allImgs = Array.from(document.querySelectorAll('img'));
    const imgData = allImgs.map(img => ({
      src: img.src,
      alt: img.alt,
      className: img.className,
      parentClass: img.parentElement?.className || '',
      width: img.naturalWidth,
      height: img.naturalHeight
    }));
    
    // Buscar background-images
    const allDivs = Array.from(document.querySelectorAll('[style*="background"]'));
    const bgData = allDivs.map(div => ({
      style: div.style.backgroundImage,
      className: div.className
    }));

    // Buscar v-img (Vuetify image component)
    const vImgs = Array.from(document.querySelectorAll('.v-img__img'));
    const vImgData = vImgs.map(img => ({
      src: img.src || img.style?.backgroundImage || '',
      tag: img.tagName,
      className: img.className
    }));

    return { imgData, bgData, vImgData, html: document.body.innerHTML.substring(0, 5000) };
  });

  console.log('\n📸 Imágenes <img> encontradas:', pageInfo.imgData.length);
  pageInfo.imgData.forEach((img, i) => {
    console.log(`  ${i}: src=${img.src?.substring(0, 100)} | alt=${img.alt} | class=${img.className}`);
  });

  console.log('\n🎨 Background images:', pageInfo.bgData.length);
  pageInfo.bgData.forEach((bg, i) => {
    console.log(`  ${i}: style=${bg.style} | class=${bg.className}`);
  });

  console.log('\n🖼️ Vuetify v-img:', pageInfo.vImgData.length);
  pageInfo.vImgData.forEach((img, i) => {
    console.log(`  ${i}: src=${img.src?.substring(0, 100)} | tag=${img.tag} | class=${img.className}`);
  });

  // Guardar el HTML para análisis
  fs.writeFileSync(path.join(__dirname, '..', 'scratch', 'products_page.html'), pageInfo.html);
  console.log('\n💾 HTML guardado en scratch/products_page.html');

  // Ahora obtener las product cards con sus nombres e imágenes
  const products = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.v-card'));
    return cards.map(card => {
      // Buscar imagen dentro de la card
      const img = card.querySelector('img');
      const vImg = card.querySelector('.v-img__img');
      
      // Buscar el nombre del producto
      const texts = Array.from(card.querySelectorAll('span, p, h2, h3, h4, .v-card-title, .v-card-text'));
      const name = texts.map(t => t.textContent?.trim()).filter(t => t && t.length > 2).join(' | ');
      
      return {
        name,
        imgSrc: img?.src || vImg?.src || null,
        imgStyle: vImg?.style?.backgroundImage || null,
        hasImage: !!(img || vImg)
      };
    });
  });

  console.log('\n📦 Product cards encontradas:', products.length);
  products.forEach((p, i) => {
    console.log(`  ${i}: name="${p.name?.substring(0, 60)}" | img=${p.imgSrc?.substring(0, 80) || p.imgStyle || 'NONE'}`);
  });

  // Si hay imágenes, intentar descargarlas
  const productsWithImages = products.filter(p => p.imgSrc || p.imgStyle);
  console.log(`\n✅ Productos con imagen: ${productsWithImages.length}`);

  if (productsWithImages.length > 0) {
    console.log('\n📥 Descargando imágenes...');
    for (let i = 0; i < productsWithImages.length; i++) {
      const prod = productsWithImages[i];
      const imgUrl = prod.imgSrc || prod.imgStyle?.replace(/url\(["']?/, '').replace(/["']?\)/, '');
      
      if (!imgUrl) continue;

      // Usar page.evaluate con fetch para descargar con cookies de sesión
      try {
        const imageData = await page.evaluate(async (url) => {
          const response = await fetch(url);
          if (!response.ok) return null;
          const blob = await response.blob();
          const reader = new FileReader();
          return new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        }, imgUrl);

        if (imageData) {
          // Extraer la data base64 y guardar
          const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
          const ext = imageData.match(/^data:image\/(\w+)/)?.[1] || 'jpg';
          const safeName = prod.name.split('|')[0].trim().replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s-]/g, '').replace(/\s+/g, '_').substring(0, 50);
          const filename = `${safeName}.${ext}`;
          
          fs.writeFileSync(path.join(CATALOGO_DIR, filename), base64Data, 'base64');
          console.log(`  ✅ ${filename} descargada`);
        } else {
          console.log(`  ❌ No se pudo descargar: ${imgUrl.substring(0, 60)}`);
        }
      } catch (err) {
        console.log(`  ❌ Error: ${err.message}`);
      }
    }
  }

  await browser.close();
  console.log('\n🎉 Proceso terminado!');
}

run().catch(console.error);
