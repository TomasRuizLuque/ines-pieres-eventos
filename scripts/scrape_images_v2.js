/**
 * Descarga imágenes del catálogo de Galpón Pueyrredón
 * usando interceptación de red de Puppeteer + paginación completa.
 * 
 * Estrategia: Interceptar las respuestas HTTP de imágenes que el navegador
 * ya carga exitosamente y guardar los bytes directamente.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

const CATALOGO_DIR = path.join(__dirname, '..', 'public', 'images', 'catalogo');

// Download helper que usa los cookies del navegador
function downloadWithCookies(url, cookieHeader, dest) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        'Cookie': cookieHeader,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://admin.galponpueyrredon.com.ar/',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
      }
    };
    
    https.get(options, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(true);
        });
      } else if (res.statusCode === 302 || res.statusCode === 301) {
        // Follow redirect
        downloadWithCookies(res.headers.location, cookieHeader, dest).then(resolve).catch(reject);
      } else {
        res.resume();
        resolve(false);
      }
    }).on('error', (e) => {
      reject(e);
    });
  });
}

async function run() {
  if (!fs.existsSync(CATALOGO_DIR)) {
    fs.mkdirSync(CATALOGO_DIR, { recursive: true });
  }

  console.log('🚀 Abriendo navegador...');
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: { width: 1400, height: 900 }
  });
  const page = await browser.newPage();

  // Login
  console.log('🔐 Login...');
  await page.goto('https://admin.galponpueyrredon.com.ar/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.type('input#input-0', 'catalogo', { delay: 50 });
  await page.type('input#input-2', 'catalogo', { delay: 50 });
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 5000));
  console.log('✅ Login exitoso! URL:', page.url());

  // Obtener cookies
  const cookies = await page.cookies();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');
  console.log('🍪 Cookies obtenidas:', cookies.length);

  // También obtener el token de localStorage
  const token = await page.evaluate(() => {
    return localStorage.getItem('token') || localStorage.getItem('auth_token') || localStorage.getItem('access_token');
  });
  console.log('🔑 Token:', token ? token.substring(0, 30) + '...' : 'no encontrado');

  // Navegar al catálogo
  await page.goto('https://admin.galponpueyrredon.com.ar/productos', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  // Recolectar todas las URLs de imágenes y nombres de producto
  let allProducts = [];
  let pageNum = 1;
  let hasMore = true;

  while (hasMore) {
    console.log(`\n📄 Página ${pageNum}...`);
    await new Promise(r => setTimeout(r, 2000));

    const pageProducts = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.v-card'));
      return cards.filter(card => {
        const img = card.querySelector('img.image-full');
        return img && !img.src.includes('image-placeholder');
      }).map(card => {
        const img = card.querySelector('img.image-full');
        const name = card.querySelector('.v-card-text span')?.textContent?.trim() || '';
        const code = name.split(' - ')[1]?.split('$')[0]?.trim() || '';
        return {
          name: name.split('$')[0]?.trim() || name,
          code,
          imgSrc: img?.src || null
        };
      });
    });

    console.log(`  Encontrados ${pageProducts.length} productos con imagen`);
    allProducts.push(...pageProducts);

    // Intentar ir a la siguiente página
    const nextDisabled = await page.evaluate(() => {
      const nextBtn = document.querySelector('button[aria-label="Next page"]');
      return !nextBtn || nextBtn.disabled;
    });

    if (nextDisabled) {
      hasMore = false;
    } else {
      await page.click('button[aria-label="Next page"]');
      pageNum++;
    }
  }

  console.log(`\n🎯 Total productos con imagen: ${allProducts.length}`);

  // Descargar todas las imágenes usando cookies
  let downloaded = 0;
  let failed = 0;

  for (let i = 0; i < allProducts.length; i++) {
    const prod = allProducts[i];
    if (!prod.imgSrc) continue;

    const safeName = prod.name
      .replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s\-]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 60);
    const ext = path.extname(prod.imgSrc).split('?')[0] || '.jpg';
    const filename = `${safeName}${ext}`;
    const destPath = path.join(CATALOGO_DIR, filename);

    // Si ya existe, skip
    if (fs.existsSync(destPath)) {
      console.log(`  ⏭️ ${filename} ya existe`);
      downloaded++;
      continue;
    }

    // Descargar con cookies y token
    let fullCookie = cookieHeader;
    if (token) {
      fullCookie += `; token=${token}`;
    }

    try {
      const ok = await downloadWithCookies(prod.imgSrc, fullCookie, destPath);
      if (ok) {
        // Verificar que el archivo no sea muy chico (placeholder/error)
        const stats = fs.statSync(destPath);
        if (stats.size > 1000) {
          console.log(`  ✅ [${i+1}/${allProducts.length}] ${filename} (${(stats.size/1024).toFixed(0)}KB)`);
          downloaded++;
        } else {
          fs.unlinkSync(destPath);
          console.log(`  ⚠️ ${filename} era placeholder (${stats.size}B), eliminado`);
          failed++;
        }
      } else {
        console.log(`  ❌ ${filename} - HTTP error`);
        failed++;
      }
    } catch (err) {
      console.log(`  ❌ ${filename} - ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Resultado: ${downloaded} descargadas, ${failed} fallidas`);

  // Si las imágenes fallaron con cookies, intentar con token Bearer en header
  if (failed > 0 && token) {
    console.log('\n🔄 Reintentando las fallidas con Authorization Bearer...');
    for (let i = 0; i < allProducts.length; i++) {
      const prod = allProducts[i];
      if (!prod.imgSrc) continue;

      const safeName = prod.name
        .replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s\-]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 60);
      const ext = path.extname(prod.imgSrc).split('?')[0] || '.jpg';
      const filename = `${safeName}${ext}`;
      const destPath = path.join(CATALOGO_DIR, filename);

      if (fs.existsSync(destPath)) continue;

      try {
        const parsedUrl = new URL(prod.imgSrc);
        const result = await new Promise((resolve, reject) => {
          https.get({
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname,
            headers: {
              'Authorization': `Bearer ${token}`,
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
              'Referer': 'https://admin.galponpueyrredon.com.ar/',
            }
          }, (res) => {
            if (res.statusCode === 200) {
              const ws = fs.createWriteStream(destPath);
              res.pipe(ws);
              ws.on('finish', () => resolve(true));
            } else {
              res.resume();
              resolve(false);
            }
          }).on('error', reject);
        });

        if (result) {
          const stats = fs.statSync(destPath);
          if (stats.size > 1000) {
            console.log(`  ✅ [Bearer] ${filename} (${(stats.size/1024).toFixed(0)}KB)`);
          } else {
            fs.unlinkSync(destPath);
          }
        }
      } catch (err) {
        // silent
      }
    }
  }

  await browser.close();
  console.log('\n🎉 ¡Proceso finalizado!');
}

run().catch(console.error);
