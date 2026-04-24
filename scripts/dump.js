const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();
  
  await page.goto('https://admin.galponpueyrredon.com.ar/login');

  const textInputs = await page.$$('input[type="text"], input[type="email"], input:not([type="hidden"]):not([type="submit"]):not([type="button"])');
  const passInputs = await page.$$('input[type="password"]');
  const btn = await page.$('button[type="submit"], input[type="submit"]');

  if (textInputs.length > 0 && passInputs.length > 0) {
    await textInputs[0].type('catalogo', { delay: 100 });
    await passInputs[0].type('catalogo', { delay: 100 });
    if (btn) await btn.click();
  }

  await new Promise(r => setTimeout(r, 6000));
  if (!page.url().includes('/productos')) {
    await page.goto('https://admin.galponpueyrredon.com.ar/productos');
  }
  await new Promise(r => setTimeout(r, 8000));

  const htmldump = await page.content();
  fs.writeFileSync('scratch/galpon_dump.html', htmldump);
  await browser.close();
}

run();
