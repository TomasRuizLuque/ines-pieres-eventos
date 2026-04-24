require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const data = [
  {
    "name": "Alfombra simil Persas - ALFP",
    "category": "Objeto deco",
    "price": 28000.00,
    "image_url": "https://admin.galponpueyrredon.com.ar/productos/246"
  },
  {
    "name": "Alfombra Yute - ALFY",
    "category": "Objeto deco",
    "price": 28000.00,
    "image_url": "https://admin.galponpueyrredon.com.ar/productos/247"
  },
  {
    "name": "Arco de Ceremonia - OARCO",
    "category": "Objeto deco",
    "price": 45349.00,
    "image_url": "https://admin.galponpueyrredon.com.ar/productos/250"
  },
  {
    "name": "Banco Campo 2mts - CB4",
    "category": "Bancos",
    "price": 10290.00,
    "image_url": "https://admin.galponpueyrredon.com.ar/productos/265"
  },
  {
    "name": "Banco PicNic - PB4",
    "category": "Bancos",
    "price": 10290.00,
    "image_url": "https://admin.galponpueyrredon.com.ar/productos/266"
  },
  {
    "name": "Banco Rattán Cinchas - RB3C",
    "category": "Bancos",
    "price": 13604.00,
    "image_url": "https://admin.galponpueyrredon.com.ar/productos/267"
  },
  {
    "name": "Banq. Alta Kraft - KBA",
    "category": "Banquetas",
    "price": 9069.00,
    "image_url": "https://admin.galponpueyrredon.com.ar/productos/270"
  },
  {
    "name": "Banq. Alta Kraft Blanca - KBAB",
    "category": "Banquetas",
    "price": 9069.00,
    "image_url": "https://admin.galponpueyrredon.com.ar/productos/271"
  },
  {
    "name": "Banq. Alta Nogal Blanca - NBAB",
    "category": "Banquetas",
    "price": 9069.00,
    "image_url": "https://admin.galponpueyrredon.com.ar/productos/276"
  },
  {
    "name": "Banq. Alta Nogal Negra - NBAN",
    "category": "Banquetas",
    "price": 9069.00,
    "image_url": "https://admin.galponpueyrredon.com.ar/productos/277"
  }
];

async function seed() {
  console.log('Iniciando carga de proveedor Galpón Pueyrredón...');
  
  // 1. Crear el proveedor
  let providerId;
  const { data: provData, error: provErr } = await supabase
    .from('proveedores')
    .insert([{ nombre: 'Galpón Pueyrredón', notas: 'admin.galponpueyrredon.com.ar' }])
    .select('id')
    .single();
    
  if (provErr) {
    // Si ya existe u otro error, lo buscamos
    const { data: existing } = await supabase.from('proveedores').select('id').eq('nombre', 'Galpón Pueyrredón').single();
    if (existing) providerId = existing.id;
    else return console.error('Error proveedor:', provErr);
  } else {
    providerId = provData.id;
  }

  console.log('Proveedor ID:', providerId);

  // 2. Insertar Categorias e Items
  for (const item of data) {
    let categoryId;
    const { data: catData } = await supabase.from('categorias').select('id').eq('nombre', item.category).single();
    if (!catData) {
      const { data: newCat } = await supabase.from('categorias').insert([{ nombre: item.category }]).select('id').single();
      categoryId = newCat.id;
    } else {
      categoryId = catData.id;
    }

    const { error: itemErr } = await supabase.from('items').insert([{
      nombre: item.name,
      id_categoria: categoryId,
      id_proveedor: providerId,
      precio_costo: item.price,
      url_imagen: item.image_url
    }]);

    if (itemErr) {
      console.log(`Error insertando ${item.name}:`, itemErr.message);
    } else {
      console.log(`✓ Insertado: ${item.name}`);
    }
  }

  console.log('¡Catálogo cargado con éxito!');
}

seed();
