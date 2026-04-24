const puppeteer = require('puppeteer');

async function discover() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://admin.galponpueyrredon.com.ar/login');

  const textInputs = await page.$$('input[type="text"], input[type="email"], input:not([type="hidden"]):not([type="submit"]):not([type="button"])');
  const passInputs = await page.$$('input[type="password"]');
  const btn = await page.$('button[type="submit"], input[type="submit"]');

  if (textInputs.length > 0 && passInputs.length > 0) {
    await textInputs[0].type('catalogo', { delay: 100 });
    await passInputs[0].type('catalogo', { delay: 100 });
    if (btn) await btn.click();
    await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
  }

  // Ahora debemos estar logueados. Veamos a dondir ir.
  const html = await page.content();
  
  // Imprimir enlaces encontrados para saber la estructura
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({ text: a.innerText.trim(), href: a.href }));
  });
  
  console.log(JSON.stringify(links, null, 2));

  await browser.close();
}

discover();
