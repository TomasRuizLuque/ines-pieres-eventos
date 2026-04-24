const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.goto('https://admin.galponpueyrredon.com.ar/login');
  
  // En vez de tratar de loguear (que falla), pasamos directo a un item, 
  // asumiendo que tal vez chromium comparta estado o algo (poco probable).
  // Sino usamos el dom de download_images.js

  
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scratch/dashboard.png' });

  // Let's go to one specific product
  await page.goto('https://admin.galponpueyrredon.com.ar/productos/246');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'scratch/product.png' });

  const html = await page.content();
  fs.writeFileSync('scratch/product.html', html);
  await browser.close();
}
run();
