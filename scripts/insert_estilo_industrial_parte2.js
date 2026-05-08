/**
 * Insertar catálogo Estilo Industrial - Parte 2 (pp.4-37)
 * Series: Chester, Bali, Gervasoni, Caña, Creta
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PROVEEDOR_ID = '95ebc9d4-6339-4a1c-83f9-5279220969f9'; // Estilo Industrial (ya creado)

const CAT_IDS = {
  MOBILIARIO_LIVING: '17b46318-7c32-4364-9128-d41ed0222fe2',
  MESAS_SILLAS: 'a65ae374-d562-4860-a215-fdc11cf34b1b',
  GENERAL: '24830643-89a5-42e3-a122-c80953e69996',
  OBJETO_DECO: '3a961f2d-ec1a-4d81-ba50-45a34cb66ab1',
  BANCOS: '003472f4-1521-465d-984c-7c191cdbf573',
};

const d = (text, stock) => JSON.stringify({ text, stock, proveedor: 'Estilo Industrial' });

const productos = [
  // --- CHESTER ---
  {
    nombre: 'Living Chester con Poltronas',
    descripcion: d('1 sillón chester restoration 1.80x0.80mt + dúo mesas gervasoni 60 y 45cm diám + butacón 1.50x0.60mt + 2 poltronas kraft', '16 unidades'),
    precio_costo: 99000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Chester con Poltronas XL',
    descripcion: d('1 sillón chester restoration 1.80x0.80mt + dúo mesas gervasoni 60 y 45cm diám + butacón 1.50x0.60mt + 4 poltronas kraft', '8 unidades'),
    precio_costo: 133500,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Chester con Poltronas Indonesia',
    descripcion: d('1 sillón chester restoration 1.80x0.80mt + mesa indonesia 80cm diám y rodaja de guayubira + butacón 1.50x0.60mt + 2 poltronas kraft', '6 unidades'),
    precio_costo: 122000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Chester con Poltronas Indonesia XL',
    descripcion: d('1 sillón chester restoration 1.80x0.80mt + mesa indonesia 80cm diám y rodaja de guayubira + butacón 1.50x0.60mt + 4 poltronas kraft', '6 unidades'),
    precio_costo: 156500,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Chester con Gervasoni',
    descripcion: d('1 sillón chester restoration 1.80x0.80mt + dúo mesas gervasoni 60 y 45cm diám + butacón 1.50x0.60mt + 2 sillones gervasoni individual', '20 unidades'),
    precio_costo: 99000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Chester con Gervasoni XL',
    descripcion: d('1 sillón chester restoration 1.80x0.80mt + dúo mesas gervasoni 60 y 45cm diám + butacón 1.50x0.60mt + 4 sillones gervasoni individual', '10 unidades'),
    precio_costo: 133500,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Chester con Gervasoni XXL',
    descripcion: d('2 sillones chester restoration 1.80x0.80mt + dúo mesas gervasoni 60 y 45cm diám + butacón 1.50x0.60mt + 4 sillones gervasoni individual', '10 unidades'),
    precio_costo: 189900,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Chester con Bertoia',
    descripcion: d('1 sillón chester restoration 1.80x0.80mt + dúo mesas gervasoni 60 y 45cm diám + butacón 1.50x0.60mt + 4 sillas bertoia', '8 unidades'),
    precio_costo: 99000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Chester con Bertoia XL',
    descripcion: d('2 sillones chester restoration 1.80x0.80mt + dúo mesas gervasoni 60 y 45cm diám + 4 sillas bertoia', '8 unidades'),
    precio_costo: 155000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Chester Restoration',
    descripcion: d('2 sillones chester restoration 1.80x0.80mt + 4 sillas Tolix + dúo mesas gervasoni 60 y 45cm diám', '10 unidades'),
    precio_costo: 155000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },

  // --- BALI ---
  {
    nombre: 'Living Bali',
    descripcion: d('1 sillón bali 180x80 + dúo mesas chapa y corteza guayubira + 1 butacón 150x60 + 4 sillas bali', '6 unidades'),
    precio_costo: 99000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Bali con Bertoia',
    descripcion: d('1 sillón bali 180x80 + dúo mesas chapa y corteza guayubira + 1 butacón 150x60 + 4 sillas bertoia', '8 unidades'),
    precio_costo: 99000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Bali con Bertoia XL',
    descripcion: d('2 sillones bali 180x80 + dúo mesas chapa y corteza guayubira + 4 sillas bertoia', '7 unidades'),
    precio_costo: 156500,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Bali con Gervasoni',
    descripcion: d('1 sillón bali 180x80 + dúo mesas chapa y corteza guayubira + 1 butacón 150x60 + 2 sillones gervasoni individual', '14 unidades'),
    precio_costo: 99000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Bali con Gervasoni XL',
    descripcion: d('1 sillón bali 180x80 + dúo mesas chapa y corteza guayubira + 1 butacón 150x60 + 4 sillones gervasoni individual', '10 unidades'),
    precio_costo: 133500,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Bali con Gervasoni XXL',
    descripcion: d('2 sillones bali 180x80 + dúo mesas chapa y corteza guayubira + 4 sillones gervasoni individual', '7 unidades'),
    precio_costo: 190000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Bali con Poltronas',
    descripcion: d('1 sillón bali 180x80 + dúo mesas chapa y corteza guayubira + 1 butacón 150x60 + 2 poltronas kraft', '14 unidades'),
    precio_costo: 99000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Bali con Poltronas XL',
    descripcion: d('1 sillón bali 180x80 + dúo mesas chapa y corteza guayubira + 1 butacón 150x60 + 4 poltronas kraft', '6 unidades'),
    precio_costo: 133500,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Bali con Poltronas XXL',
    descripcion: d('2 sillones bali 180x80 + dúo mesas chapa y corteza guayubira + 4 poltronas kraft', '7 unidades'),
    precio_costo: 190000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },

  // --- GERVASONI ---
  {
    nombre: 'Living Gervasoni + Indonesia',
    descripcion: d('1 sillón gervasoni doble 1.30mt + mesa indonesia 80cm diám y rodaja de guayubira + 2 sillones gervasoni individual', '6 unidades'),
    precio_costo: 99000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Gervasoni con Cross',
    descripcion: d('1 sillón gervasoni doble 1.30mt + 1 mesa ratona hierro y madera 90x60cm + 4 sillas cross + 2 sillones gervasoni individual', '6 unidades'),
    precio_costo: 85000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Gervasoni XL',
    descripcion: d('1 sillón gervasoni doble 1.30mt + 1 mesa ratona hierro y madera 90x60cm + 4 sillones gervasoni individual', '6 unidades'),
    precio_costo: 120000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },

  // --- CAÑA ---
  {
    nombre: 'Living de Caña + Gervasoni',
    descripcion: d('1 sillón caña 190x80 + mesa indonesia 80cm diám y rodaja de guayubira + 2 sillones gervasoni individual', '6 unidades'),
    precio_costo: 128000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living de Caña',
    descripcion: d('1 sillón caña 190x80 + 2 sillones mdq individual + dúo mesa de hierro + 1 butacón 180x80', '16 unidades'),
    precio_costo: 99000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living de Caña XL',
    descripcion: d('1 sillón caña 190x80 + 4 sillones mdq individual + dúo mesa de hierro + 1 butacón 180x80', '8 unidades'),
    precio_costo: 133500,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living de Caña XXL',
    descripcion: d('2 sillones caña 190x80 + 4 sillones mdq individual + dúo mesa de hierro', '8 unidades'),
    precio_costo: 185000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },

  // --- CRETA ---
  {
    nombre: 'Living Creta',
    descripcion: d('1 sillón de pana 180x80 + 2 sillones creta individual + trío de mesas de rattán', '10 unidades'),
    precio_costo: 118000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Creta + Cross',
    descripcion: d('1 sillón de pana 180x80 + 2 sillones creta individual + trío de mesas de rattán + 4 sillas Cross', '10 unidades'),
    precio_costo: 132000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Creta XL',
    descripcion: d('2 sillones de pana 180x80 + 4 sillones creta individual + trío de mesas de rattán', '5 unidades'),
    precio_costo: 204000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Creta XL con Indonesia',
    descripcion: d('2 sillones de pana 180x80 + 4 sillones creta individual + dúo mesa indonesia y rodaja de guayubira', '5 unidades'),
    precio_costo: 218500,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Creta Green + Sillas Bali',
    descripcion: d('1 sillón de pana 180x80 + 4 sillas bali + trío de mesas de rattán o dúo indonesia y rodaja de guayubira', '6 unidades'),
    precio_costo: 204000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Creta Green con Sillas Bertoia',
    descripcion: d('1 sillón de pana 180x80 + 4 sillas bertoia + trío de mesas de rattán o dúo indonesia y rodaja de guayubira', '6 unidades'),
    precio_costo: 204000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Creta Green + Silloncitos MDQ',
    descripcion: d('1 sillón de pana 180x80 + 4 sillas mdq + trío de mesas de rattán o dúo indonesia y rodaja de guayubira', '6 unidades'),
    precio_costo: 239000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Creta Green + Sillas Cross',
    descripcion: d('1 sillón de pana 180x80 + 4 sillas cross + trío de mesas de rattán o dúo indonesia y rodaja de guayubira', '6 unidades'),
    precio_costo: 204000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
];

async function run() {
  console.log('=== INSERCIÓN ESTILO INDUSTRIAL - PARTE 2 ===\n');
  console.log(`Proveedor ID: ${PROVEEDOR_ID}`);
  console.log(`Insertando ${productos.length} productos...\n`);

  const itemsToInsert = productos.map(p => ({
    ...p,
    id_proveedor: PROVEEDOR_ID,
  }));

  const { data: insertedItems, error: insertErr } = await supabase
    .from('items')
    .insert(itemsToInsert)
    .select();

  if (insertErr) {
    console.error('Error insertando items:', insertErr.message);
    return;
  }

  console.log(`✅ ${insertedItems.length} productos insertados!\n`);
  insertedItems.forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.nombre} - $${item.precio_costo?.toLocaleString('es-AR')}`);
  });

  console.log('\n🎉 ¡Parte 2 completada!');
}

run();
