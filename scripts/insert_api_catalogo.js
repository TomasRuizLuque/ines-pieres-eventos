require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  console.log('Obteniendo catálogo completo desde la API pública de Galpón Pueyrredón...');
  const res = await fetch('https://api-prod.galponpueyrredon.com.ar/api/products');
  const d = await res.json();
  const products = d.data;

  console.log(`¡Recibidos ${products.length} productos! Procesando...`);

  // Provider ID
  const { data: provData } = await supabase.from('proveedores').select('id').eq('nombre', 'Galpón Pueyrredón').single();
  let provId = provData?.id;

  // Categoria general
  const { data: catData } = await supabase.from('categorias').select('id').eq('nombre', 'General').single();
  let catId = catData?.id;

  // Items actuales (borramos para que quede purga limpia, o actualizamos)
  // Como el usuario quiere todo limpio y real, vamos a armar el payload.
  
  const { data: existing } = await supabase.from('items').select('nombre');
  const existingNames = new Set(existing.map(i => i.nombre));

  let nuevos = [];

  for (let prod of products) {
    if (!prod.show_catalog) continue; // Si esta oculto en catalogo, ignorarlo

    let precioBase = 0;
    if (prod.prices && prod.prices.length > 0) {
      // Agarrar el precio mas actual (ordenado por id o valid_date_from mayor)
      const currentPrice = prod.prices.sort((a,b) => b.id - a.id)[0];
      precioBase = parseFloat(currentPrice.price) || 0;
    }

    let url_imagen = null;
    if (prod.main_image && prod.main_image.image) {
      url_imagen = 'https://api-prod.galponpueyrredon.com.ar/storage/' + prod.main_image.image;
    }

    // Nombre limpio
    let name = prod.name.trim();
    if (prod.code) name += ` - ${prod.code}`;

    if (!existingNames.has(name)) {
      nuevos.push({
        nombre: name,
        precio_costo: precioBase,
        url_imagen: url_imagen,
        id_proveedor: provId,
        id_categoria: catId
      });
      existingNames.add(name);
    } else {
      // Update price and image for existing!
      await supabase.from('items').update({
        precio_costo: precioBase,
        url_imagen: url_imagen
      }).eq('nombre', name);
    }
  }

  if (nuevos.length > 0) {
    console.log(`Insertando ${nuevos.length} ítems nuevos...`);
    // Insert en batch de a 100
    for(let i=0; i<nuevos.length; i+=100){
      const batch = nuevos.slice(i, i+100);
      const { error } = await supabase.from('items').insert(batch);
      if (error) console.error("Error insertando batch:", error.message);
    }
    console.log(`¡Carga masiva finalizada!`);
  } else {
    console.log("No hay ítems nuevos, pero se actualizaron los existentes con precios e imagenes reales.");
  }
}

run();
