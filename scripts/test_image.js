const https = require('https');

https.get('https://api-prod.galponpueyrredon.com.ar/storage/ALFP-0.jpg', (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', () => {});
}).on('error', (e) => {
  console.error(e);
});
