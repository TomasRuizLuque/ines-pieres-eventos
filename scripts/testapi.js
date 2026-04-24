const url = 'https://api-prod.galponpueyrredon.com.ar/api/products';
fetch(url).then(r=>r.json()).then(d=>{
   let item = d.data.find(x => x.main_image);
   console.log("Prices:", item.prices);
   console.log("Image:", item.main_image);
}).catch(e=>console.log(e.message));
