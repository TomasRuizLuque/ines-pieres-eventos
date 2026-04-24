const https = require('https');

const paths = [
  'products/ALFP-0.jpg',
  'api/products/ALFP-0.jpg',
  'images/ALFP-0.jpg',
  'images/products/ALFP-0.jpg',
  'public/products/ALFP-0.jpg',
  'product_images/ALFP-0.jpg',
  'uploads/ALFP-0.jpg'
];

async function check() {
  for (let p of paths) {
    const url = 'https://api-prod.galponpueyrredon.com.ar/storage/' + p;
    await new Promise(r => {
      https.get(url, (res) => {
        console.log(`${res.statusCode} -> ${url}`);
        res.on('data', ()=>{});
        r();
      }).on('error', r);
    });
  }
}

check();
