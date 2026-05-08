/**
 * Insertar catálogo Grupo DRG en Supabase
 * Fuente: Catalogo Grupo DRG 3 (3).pdf — Catálogo 2024
 * Sin precios (no figuran en el catálogo)
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CAT_IDS = {
  MOBILIARIO_LIVING: '17b46318-7c32-4364-9128-d41ed0222fe2',
  MESAS_SILLAS:      'a65ae374-d562-4860-a215-fdc11cf34b1b',
  GENERAL:           '24830643-89a5-42e3-a122-c80953e69996',
  OBJETO_DECO:       '3a961f2d-ec1a-4d81-ba50-45a34cb66ab1',
  BANCOS:            '003472f4-1521-465d-984c-7c191cdbf573',
};

const proveedor = 'Grupo DRG';
const PLACEHOLDER_PRICE = 1;

const productos = [
  // ── LIVINGS ──────────────────────────────────────────────────────────────────
  {
    nombre: 'Living en Madera con Sillón Gervasoni',
    descripcion: JSON.stringify({
      componentes: '1 sillón 3c + 1 camastro de madera + 2 sillones individuales Gervasoni + 1 mesa ratona 200x75cm',
      stock: '30 juegos',
      notas: 'Incluye almohadones en color crudo',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living en Madera con Funda de Gabardina',
    descripcion: JSON.stringify({
      componentes: '1 sillón 3c + 2 sillones individuales Gervasoni + 3 sillas materas + 1 mesa ratona 200x75cm',
      stock: '8 juegos',
      notas: 'Incluye almohadones en color crudo',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living en Madera Recto',
    descripcion: JSON.stringify({
      componentes: '1 sillón 3c + 1 camastro de madera + 2 sillones individuales rectos + 1 mesa ratona 200x75cm',
      stock: '6 juegos',
      notas: 'Incluye almohadones en color crudo',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living en Hierro',
    descripcion: JSON.stringify({
      componentes: '1 sillón 3c + 2 sillones individuales + 1 camastro + 2 mesas ratonas de hierro',
      stock: '12 juegos',
      notas: 'Incluye almohadones en color crudo o gris',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living de Caña',
    descripcion: JSON.stringify({
      componentes: '1 sillón 3c + 2 sillones individuales + 3 bancos de caña + 2 mesas de madera redondas (50 y 60cm diam)',
      stock: '30 juegos',
      notas: 'Incluye almohadones en color crudo',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living de Pana',
    descripcion: JSON.stringify({
      componentes: '1 sillón 3c + 2 sillones individuales + 3 puff de pana + 2 mesas redondas de vidrio (60 y 80cm diam)',
      stock: '4 juegos',
      color: 'Gris',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  // ── SILLAS ───────────────────────────────────────────────────────────────────
  {
    nombre: 'Sillas Cross',
    descripcion: JSON.stringify({
      stock: '420 unidades',
      notas: 'Incluye almohadón premium importado anti manchas en color crudo',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Sillas de Madera',
    descripcion: JSON.stringify({
      stock: '600 unidades',
      notas: 'Incluye almohadón en color crudo',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Sillas Mar del Plata',
    descripcion: JSON.stringify({ stock: '50 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Sillas Jesuitas',
    descripcion: JSON.stringify({ stock: '30 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Sillas Tiffany Negras',
    descripcion: JSON.stringify({
      stock: '180 unidades',
      notas: 'Incluye almohadón en color negro',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // ── MESAS ALTAS ──────────────────────────────────────────────────────────────
  {
    nombre: 'Mesa Alta con Banquetas en Hierro y Madera',
    descripcion: JSON.stringify({
      componentes: '1 mesa hierro y madera 120x60cm + 6 banquetas hierro y madera',
      stock: '20 mesas — 120 banquetas',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta en Madera con Taburetes Chiavari',
    descripcion: JSON.stringify({
      componentes: '1 mesa de madera 120x60cm + 4 sillas Chiavari',
      stock: '4 mesas — 16 banquetas',
      notas: 'Incluye almohadón en color crudo',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta con Taburetes Chiavari Negras',
    descripcion: JSON.stringify({
      componentes: '1 mesa de madera 120x60cm + 4 sillas Chiavari negras',
      stock: '6 mesas — 24 banquetas',
      notas: 'Incluye almohadón en color negro',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta con Taburetes MDQ',
    descripcion: JSON.stringify({
      componentes: '1 mesa redonda 120x60cm + 4 banquetas altas Mar del Plata',
      stock: '12 mesas — 48 banquetas',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta con Banqueta Cross',
    descripcion: JSON.stringify({
      componentes: '1 mesa de madera 120x60cm + 4 banquetas altas Cross',
      stock: '4 mesas — 16 banquetas',
      notas: 'Incluye almohadón en color crudo',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // ── MESAS ─────────────────────────────────────────────────────────────────────
  {
    nombre: 'Mesa Comunal Caballete',
    descripcion: JSON.stringify({ medidas: '75cm x 200cm', stock: '30 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesón Pata Torneada',
    descripcion: JSON.stringify({ medidas: '120cm x 200cm', stock: '30 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Madera XL',
    descripcion: JSON.stringify({ medidas: '200cm x 100cm', stock: '1 unidad', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesas Cafetín DRG',
    descripcion: JSON.stringify({
      medidas: '60cm diám x 75cm altura',
      stock: '30 unidades madera — 14 unidades negra',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesas Redondas Gervasoni',
    descripcion: JSON.stringify({
      medidas: '40cm y 50cm de diámetro',
      stock: '40 unidades',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Corteza',
    descripcion: JSON.stringify({ medidas: 'Varias, consultar', stock: '10 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Ceremonia DRG',
    descripcion: JSON.stringify({ proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesas Espejadas',
    descripcion: JSON.stringify({ medidas: '120cm x 200cm', stock: '6 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // ── COMPLEMENTOS ─────────────────────────────────────────────────────────────
  {
    nombre: 'Pérgola con Techo Blanco',
    descripcion: JSON.stringify({ medidas: '300cm x 300cm', stock: '12 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Pérgola con Tela en Techo y Patas',
    descripcion: JSON.stringify({ medidas: '300cm x 300cm', stock: '12 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Sombrillas DRG',
    descripcion: JSON.stringify({ stock: '6 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Módulos de Barra',
    descripcion: JSON.stringify({ medidas: '300cm x 120cm', stock: '2 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Pedestales de Madera',
    descripcion: JSON.stringify({ medidas: '40cm, 80cm y 120cm de alto', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Estanterías DRG',
    descripcion: JSON.stringify({ medidas: '190cm x 120cm x 25cm — 5 niveles', stock: '12 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Fanales de Bambú',
    descripcion: JSON.stringify({ medidas: 'Varias, consultar', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Individuales Seagrass',
    descripcion: JSON.stringify({ medidas: '40cm de diámetro', stock: '250 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Alfombras de Yute DRG',
    descripcion: JSON.stringify({ medidas: '200cm x 200cm', stock: '20 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Alfombras Persas DRG',
    descripcion: JSON.stringify({ medidas: 'Varias', stock: '5 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Arco de Ceremonia Redondo',
    descripcion: JSON.stringify({ medidas: '240cm x 220cm', stock: '2 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Arco de Ceremonia Rectangular',
    descripcion: JSON.stringify({ medidas: '220cm x 240cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Carpas Tipi DRG',
    descripcion: JSON.stringify({ stock: '4 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Bancos de Madera DRG',
    descripcion: JSON.stringify({ medidas: '150cm y 200cm', stock: '12 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.BANCOS,
  },
  {
    nombre: 'Fogoneros DRG',
    descripcion: JSON.stringify({ stock: '5 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Calefactores Honguitos',
    descripcion: JSON.stringify({ material: 'Acero inoxidable', stock: '12 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Calefactores Pirámides',
    descripcion: JSON.stringify({ material: 'Acero inoxidable', stock: '6 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Photo Opportunity',
    descripcion: JSON.stringify({ notas: 'Consultar disponibilidad y modelos', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Escenografía Café de París',
    descripcion: JSON.stringify({ medidas: '7,00m x 4,00m x 1,20m', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Pared Donera',
    descripcion: JSON.stringify({ medidas: '4,50m x 2,20m', stock: '1 unidad', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Cartelería de Neón DRG',
    descripcion: JSON.stringify({ medidas: 'Varias, consultar', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Sillón Princesa',
    descripcion: JSON.stringify({ notas: 'Consultar disponibilidad', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Paneles Verticales de Madera',
    descripcion: JSON.stringify({ medidas: '2,25m x 2,00m', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Deco Circense',
    descripcion: JSON.stringify({ notas: 'Varios modelos, consultar', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Sector Infantil',
    descripcion: JSON.stringify({ medidas: '75cm x 200cm x 20cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Arañas Imperial',
    descripcion: JSON.stringify({
      stock: '12 unidades 150x75cm diam + 12 unidades 100x50cm diam + 5 unidades pie autoportante 3,50m',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Arañas Brooklyn',
    descripcion: JSON.stringify({
      stock: '6u 140cm diam + 6u 120cm diam + 6u 100cm diam + 24u 100cm diam + 12u 60cm diam',
      proveedor,
    }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Arañas Boho',
    descripcion: JSON.stringify({ medidas: 'Varias, consultar', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Guirnaldas Flotantes',
    descripcion: JSON.stringify({ notas: 'Consultar disponibilidad', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Instalaciones Lucesitas de Arroz',
    descripcion: JSON.stringify({ notas: 'Consultar disponibilidad', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Guirnaldas Kermes',
    descripcion: JSON.stringify({ notas: 'Consultar disponibilidad', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Pista con Lluvia de Lucesitas de Arroz',
    descripcion: JSON.stringify({ notas: 'Consultar disponibilidad', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Árboles Encantados',
    descripcion: JSON.stringify({ notas: 'Consultar disponibilidad', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Paneles Espejados',
    descripcion: JSON.stringify({ medidas: '125cm x 245cm', stock: '15 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Estructuras Doradas de Piso',
    descripcion: JSON.stringify({ medidas: '150cm largo x varias alturas', stock: '20 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Luces Aéreas',
    descripcion: JSON.stringify({ notas: 'Consultar disponibilidad', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Aros de Neón',
    descripcion: JSON.stringify({ stock: '8 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Velador Fotógrafo',
    descripcion: JSON.stringify({ stock: '4 unidades', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.GENERAL,
  },
];

async function run() {
  console.log('=== INSERCIÓN CATÁLOGO GRUPO DRG ===\n');

  console.log('1️⃣  Buscando/creando proveedor "Grupo DRG"...');
  let proveedorId;

  const { data: existing } = await supabase
    .from('proveedores')
    .select('id')
    .eq('nombre', 'Grupo DRG')
    .single();

  if (existing) {
    proveedorId = existing.id;
    console.log(`   ♻️  Proveedor ya existe con ID: ${proveedorId}`);
  } else {
    const { data: provData, error: provErr } = await supabase
      .from('proveedores')
      .insert({ nombre: 'Grupo DRG', notas: 'Catálogo 2024 — livings, sillas, mesas y complementos. Sin precios en catálogo.' })
      .select()
      .single();

    if (provErr) {
      console.error('Error creando proveedor:', provErr.message);
      return;
    }
    proveedorId = provData.id;
    console.log(`   ✅ Proveedor creado con ID: ${proveedorId}`);
  }

  const todos = productos.map(p => ({
    ...p,
    precio_costo: p.precio_costo > 0 ? p.precio_costo : PLACEHOLDER_PRICE,
    id_proveedor: proveedorId,
  }));

  console.log(`\n2️⃣  Insertando ${todos.length} productos...`);

  const { data: insertedItems, error: insertErr } = await supabase
    .from('items')
    .insert(todos)
    .select();

  if (insertErr) {
    console.error('Error insertando items:', insertErr.message);
    return;
  }

  console.log(`   ✅ ${insertedItems.length} productos insertados correctamente!\n`);
  insertedItems.forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.nombre}`);
  });

  console.log(`\n🎉 ¡Catálogo Grupo DRG completamente integrado!`);
  console.log(`   Proveedor ID para upload_fotos: ${proveedorId}`);
}

run();
