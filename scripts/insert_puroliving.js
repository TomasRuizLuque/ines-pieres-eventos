/**
 * Insertar catálogo Puro Living en Supabase
 * Fuente: PDF "PUROLIVING 2da PARTE 2026.pdf"
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Mapeo de categorías existentes en Supabase
const CAT_IDS = {
  MOBILIARIO_LIVING: '17b46318-7c32-4364-9128-d41ed0222fe2',
  MESAS_SILLAS: 'a65ae374-d562-4860-a215-fdc11cf34b1b',
  GENERAL: '24830643-89a5-42e3-a122-c80953e69996',
  OBJETO_DECO: '3a961f2d-ec1a-4d81-ba50-45a34cb66ab1',
  BANCOS: '003472f4-1521-465d-984c-7c191cdbf573',
};

const productos = [
  {
    nombre: 'Living Hierro (Juego p/10)',
    descripcion: JSON.stringify({ text: 'Sillón hierro 3c + Camastro hierro 3c + 4 Banquetas hierro individuales + Mesa hierro y madera. Para 10 personas.', stock: '12 juegos', proveedor: 'Puro Living' }),
    precio_costo: 550000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Gervasoni (Juego p/6)',
    descripcion: JSON.stringify({ text: 'Sillón Gervasoni 2c + 2 Sillones Gervasoni 1c + Mesa banco 2c + Mesa redonda 60cm + Mesa redonda 50cm. Para 6 personas.', stock: '15 juegos', proveedor: 'Puro Living' }),
    precio_costo: 600000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Mesa Cervecera (Juego p/4)',
    descripcion: JSON.stringify({ text: 'Mesa alta hierro y madera + 4 Sillas altas hierro y madera. Para 4 personas.', stock: '12 juegos', proveedor: 'Puro Living' }),
    precio_costo: 350000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Living Gales Restoration (Juego p/7-8)',
    descripcion: JSON.stringify({ text: 'Sillón tapizado en lino 3c 180cm + Camastro tapizado en lino 2-3c 120cm + 2 Sillones materos 1c + Mesa madera 85x50cm. Para 7-8 personas. Sillón matero adicional $12.000.', stock: '4 juegos', proveedor: 'Puro Living' }),
    precio_costo: 1000000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Clásico c/ Gervasoni (Juego p/8)',
    descripcion: JSON.stringify({ text: 'Sillón 3c tapizado en tusor + 3 almohadones de respaldo + 2 Sillones Gervasoni 1c + Camastro puff 3c + Mesa rectangular. Para 8 personas.', stock: '6 juegos', proveedor: 'Puro Living' }),
    precio_costo: 950000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Caña (Juego p/8)',
    descripcion: JSON.stringify({ text: 'Sillón caña 3c con fundas en tusor + 3 almohadones de respaldo + 2 Sillones caña 1c + Camastro caña 3c + Mesa circular caña. Para 8 personas.', stock: '4 juegos', proveedor: 'Puro Living' }),
    precio_costo: 950000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Hierro Tony (Juego p/6)',
    descripcion: JSON.stringify({ text: 'Sillón hierro 2c + 2 Sillones hierro 1c + 2 Banquetas madera individuales + Mesa hierro y madera 65cm diám. Con fundas en tusor blanco. Para 6 personas. Banco madera adicional $1.600.', stock: '5 juegos', proveedor: 'Puro Living' }),
    precio_costo: 550000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Banco de Madera 3 cuerpos',
    descripcion: JSON.stringify({ text: 'Banco de madera 3 cuerpos. Para 3 personas.', stock: '3 unidades', proveedor: 'Puro Living' }),
    precio_costo: 220000,
    id_categoria: CAT_IDS.BANCOS,
  },
  {
    nombre: 'Living Gervasoni Yute (Juego p/6)',
    descripcion: JSON.stringify({ text: 'Sillón Gervasoni yute 2c + 2 Sillones Gervasoni yute 1c + 2 Banquitos madera 1c + Mesa redonda yute 50cm c/vidrio. Para 6 personas. Banco madera adicional $1.600.', stock: '5 juegos', proveedor: 'Puro Living' }),
    precio_costo: 500000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Mesón Paraíso (Juego p/10)',
    descripcion: JSON.stringify({ text: 'Mesón en paraíso natural 120x210cm + 10 Sillas cross paraíso c/placa asiento. Para 10 personas. Silla Cross adicional $3.000.', stock: '6 juegos', proveedor: 'Puro Living' }),
    precio_costo: 750000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Cafetín Paraíso (Juego p/4)',
    descripcion: JSON.stringify({ text: 'Mesa en paraíso natural 66x66cm + 4 Sillas cross paraíso c/placa asiento. Para 4 personas. Silla Cross adicional $3.000.', stock: '6 juegos', proveedor: 'Puro Living' }),
    precio_costo: 300000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Cross Madera Paraíso',
    descripcion: JSON.stringify({ text: 'Silla madera paraíso con almohadón en lino. Para 1 persona.', stock: '52 unidades', proveedor: 'Puro Living' }),
    precio_costo: 30000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Madera Ceremonia',
    descripcion: JSON.stringify({ text: 'Silla de madera tipo tijera color petribí. Para 1 persona.', stock: '50 unidades', proveedor: 'Puro Living' }),
    precio_costo: 16000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Estantería Hierro y Madera',
    descripcion: JSON.stringify({ text: 'Estantería de hierro y madera. Medidas: 200cm alto x 99cm ancho x 20cm prof.', stock: '4 unidades', proveedor: 'Puro Living' }),
    precio_costo: 320000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Back en Madera Natural',
    descripcion: JSON.stringify({ text: 'Back de madera natural. Medidas: 210cm alto x 200cm ancho. No incluye cartel ni deco.', stock: '1 unidad', proveedor: 'Puro Living' }),
    precio_costo: 250000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Arco de Ceremonia',
    descripcion: JSON.stringify({ text: 'Arco de ceremonia. Opciones: Madera punto 250x130cm / Hierro punto 250x130cm / Madera rectangular 240x240cm / Madera triangular 260x130cm / Hierro 200x200cm ($10.000).', stock: 'Disponible', proveedor: 'Puro Living' }),
    precio_costo: 200000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Pérgola de Madera',
    descripcion: JSON.stringify({ text: 'Pérgola de madera y hierro 2.8m x 2.8m x 2.6m. Con cobertura de lona color crudo.', stock: '2 unidades', proveedor: 'Puro Living' }),
    precio_costo: 400000,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Calefactor Hongo',
    descripcion: JSON.stringify({ text: 'Calefactor tipo hongo. Autonomía entre 6 a 8 hrs. Altura 2,2mts. Incluye garrafa.', stock: '2 unidades', proveedor: 'Puro Living' }),
    precio_costo: 600000,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Almohadones Deco (Par)',
    descripcion: JSON.stringify({ text: 'Par de almohadones 50cm x 50cm. Colores varios.', stock: 'Disponible', proveedor: 'Puro Living' }),
    precio_costo: 40000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Parrilla Enrejado',
    descripcion: JSON.stringify({ text: 'Malla cuadriculada 5x5cm. Medidas: 120cm x 240cm. Opción guirnaldas p/parrilla p/35 focos $35.000.', stock: '3 unidades', proveedor: 'Puro Living' }),
    precio_costo: 250000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
];

async function run() {
  console.log('=== INSERCIÓN CATÁLOGO PURO LIVING ===\n');

  // 1. Crear proveedor Puro Living
  console.log('1️⃣  Creando proveedor "Puro Living"...');
  const { data: provData, error: provErr } = await supabase
    .from('proveedores')
    .insert({ nombre: 'Puro Living', notas: 'Catálogo PDF 2da Parte 2026' })
    .select()
    .single();

  if (provErr) {
    console.error('Error creando proveedor:', provErr.message);
    return;
  }
  console.log(`   ✅ Proveedor creado con ID: ${provData.id}`);

  const proveedorId = provData.id;

  // 2. Insertar todos los productos
  console.log(`\n2️⃣  Insertando ${productos.length} productos...`);
  
  const itemsToInsert = productos.map(p => ({
    ...p,
    id_proveedor: proveedorId,
  }));

  const { data: insertedItems, error: insertErr } = await supabase
    .from('items')
    .insert(itemsToInsert)
    .select();

  if (insertErr) {
    console.error('Error insertando items:', insertErr.message);
    return;
  }

  console.log(`   ✅ ${insertedItems.length} productos insertados correctamente!\n`);
  
  insertedItems.forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.nombre} - $${item.precio_costo?.toLocaleString('es-AR')}`);
  });

  console.log(`\n🎉 ¡Catálogo Puro Living completamente integrado!`);
}

run();
