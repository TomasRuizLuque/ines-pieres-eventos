/**
 * Insertar catálogo Lambaré e Ines Pieres en Supabase
 * Fuente: Lambaré e Ines Pieres.xlsx
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Category IDs (from existing database)
const CAT_IDS = {
  MOBILIARIO_LIVING: '17b46318-7c32-4364-9128-d41ed0222fe2',
  MESAS_SILLAS:      'a65ae374-d562-4860-a215-fdc11cf34b1b',
  GENERAL:           '24830643-89a5-42e3-a122-c80953e69996',
  OBJETO_DECO:       '3a961f2d-ec1a-4d81-ba50-45a34cb66ab1',
  BANCOS:            '003472f4-1521-465d-984c-7c191cdbf573',
};

// ═══ LAMBARÉ ═══
const lambare = [
  // Alfombras → Objeto Deco
  { nombre: 'Alfombra Persa Blanca grande', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Alfombra Persa Bordo Grande', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Alfombra Persa bordo ch', precio_costo: 20000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Alfombra Bordo Oscuro', precio_costo: 20000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Alfombra Boho Lambaré', precio_costo: 20000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Alfombra Persa Azul', precio_costo: 20000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Alfombras redondas Lambaré', precio_costo: 7000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Alfombras Boho Lambaré Gr', precio_costo: 18000, id_categoria: CAT_IDS.OBJETO_DECO },
  // Accesorios → Objeto Deco
  { nombre: 'Almohadones Lambaré', precio_costo: 3000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Frascos Lambaré', precio_costo: 1000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Cilindros Lambaré', precio_costo: 3000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Caminos de gasa Lambaré', precio_costo: 3000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Individuales de Yute Lambaré', precio_costo: 2500, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Vasitos Velita Lambaré', precio_costo: 1000, id_categoria: CAT_IDS.OBJETO_DECO },
  // Manteles → General
  { nombre: 'Mantel Ceremonia Lambaré', precio_costo: 10000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Manteles redondos Lambaré', precio_costo: 12000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Mantel Cafetin Lambaré', precio_costo: 6000, id_categoria: CAT_IDS.GENERAL },
  // Carteles / Estructuras → Objeto Deco
  { nombre: 'Estructura Cartel madera tipo pintor', precio_costo: 10000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Estructura Cartel Madera doble', precio_costo: 10000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Estructura Cartel Dorada', precio_costo: 8000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Valija Lambaré', precio_costo: 8000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Cartel Bar Lambaré', precio_costo: 15000, id_categoria: CAT_IDS.OBJETO_DECO },
  // Lámparas → General
  { nombre: 'Lamparas Roma Lambaré', precio_costo: 8000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Lamparas Mimbre Lambaré', precio_costo: 8000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Pelotas Mimbre Lambaré', precio_costo: 8000, id_categoria: CAT_IDS.GENERAL },
  // Fanales → Objeto Deco
  { nombre: 'Fanal Dorado Piramide Lambaré', precio_costo: 7000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Fanal Dorado Cuadrado Lambaré', precio_costo: 5000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Fanales Mimbre Lambaré', precio_costo: 5000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Fanal Dorado Lambaré', precio_costo: 6000, id_categoria: CAT_IDS.OBJETO_DECO },
  // Floreros → Objeto Deco
  { nombre: 'Florero Lata Lambaré', precio_costo: 1000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Floreros Vicky Lambaré', precio_costo: 1500, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Floreros Panzones crudos Lambaré', precio_costo: 1000, id_categoria: CAT_IDS.OBJETO_DECO },
  // Objetos grandes → Objeto Deco / General
  { nombre: 'Pedestal Dorado Lambaré', precio_costo: 10000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arbol encantado Lambaré', precio_costo: 200000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Pedestal Negro Lambaré', precio_costo: 15000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Canastos Lambaré', precio_costo: 6000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Bandejas Lambaré', precio_costo: 10000, id_categoria: CAT_IDS.OBJETO_DECO },
  // Banco/Banquitos → Bancos
  { nombre: 'Banco Novios Lambaré', precio_costo: 10000, id_categoria: CAT_IDS.BANCOS },
  { nombre: 'Banquitos Caña Lambaré', precio_costo: 8000, id_categoria: CAT_IDS.BANCOS },
  { nombre: 'Canastas Lambaré', precio_costo: 5000, id_categoria: CAT_IDS.OBJETO_DECO },
];

// ═══ INES PIERES ═══
const inesPieres = [
  // Alfombras / Textiles → Objeto Deco
  { nombre: 'Alfombra Yute Ines Pieres', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Alfombra Mostaza Ines Pieres', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Almohadones Ines Pieres', precio_costo: 3000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Caminos de gasa Ines Pieres', precio_costo: 3000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Mantel Ceremonia Ines Pieres', precio_costo: 10000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Manteles redondos Ines Pieres', precio_costo: 12000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Mantel Cafetin Ines Pieres', precio_costo: 6000, id_categoria: CAT_IDS.GENERAL },
  // Aéreos / Paredes / Techos → General
  { nombre: 'Aereo sobre Pared x mts Secos 1', precio_costo: 40000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Aereo sobre Pared x mts Secos 2', precio_costo: 50000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Aereo sobre Pared x mts Secos y Verdes', precio_costo: 40000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Entelado de Techo', precio_costo: 1000000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Techo Verde con Fanales x mts', precio_costo: 35000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Techo Verde con lianas x mt', precio_costo: 40000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Pared Secos x mt', precio_costo: 30000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Pared Verde x mt', precio_costo: 40000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Parrillas con Luces', precio_costo: 40000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Columnas verdes mts', precio_costo: 40000, id_categoria: CAT_IDS.GENERAL },
  // DJ Frentes → General
  { nombre: 'Arreglos para Frente de DJ x mt', precio_costo: 45000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Frente DJ Cañas 1', precio_costo: 100000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Frente DJ Cañas 2', precio_costo: 100000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Frente DJ Cañas + Totems', precio_costo: 300000, id_categoria: CAT_IDS.GENERAL },
  // Arreglos Florales → Objeto Deco
  { nombre: 'Orquideas Ines Pieres', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Living Ines Pieres', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Arco Piso 3 mts (7 arreglos)', precio_costo: 240000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo esquinero y medio seco 1', precio_costo: 130000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglos esquinero y Piso seco', precio_costo: 90000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Completo Ines Pieres', precio_costo: 300000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arco 2 Postes Ines Pieres', precio_costo: 240000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Mesa Alta Ines Pieres', precio_costo: 20000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo mesa rectangular Ines Pieres', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo mesa Redonda Ines Pieres', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Isla de Catering', precio_costo: 40000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Piso Ines Pieres', precio_costo: 35000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Mesa Ceremonia Gr', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Mesa Ceremonia Normal', precio_costo: 25000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Nicho', precio_costo: 35000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Chimenea x mt', precio_costo: 40000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo ventanas', precio_costo: 35000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Camino verdes x mesa', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Botellita', precio_costo: 5000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Imperial x mt', precio_costo: 60000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Baño', precio_costo: 25000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Arbolito', precio_costo: 40000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Cilindros Ines Pieres', precio_costo: 30000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Copon Gr', precio_costo: 50000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Copon Ch', precio_costo: 35000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Arreglo Pedestal Ines Pieres', precio_costo: 50000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Aereo Pajaro simple', precio_costo: 120000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Aereo Pajaro doble cara', precio_costo: 240000, id_categoria: CAT_IDS.GENERAL },
  // Especiales / Grandes
  { nombre: 'Carpa Tipi Completa Ines Pieres', precio_costo: 190000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Navidad en Carpa 15 x 20', precio_costo: 800000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Navidad en carpa 20 x 30', precio_costo: 1200000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Araña Caireles Ines Pieres', precio_costo: 60000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Arbol encantado Ines Pieres', precio_costo: 200000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Mix Kermesse y Navidad 20 x 30', precio_costo: 600000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Mix Kermesse y Navidad 30 x 40', precio_costo: 900000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Kermesse 20 x 30', precio_costo: 400000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Kermesse 30 x 40', precio_costo: 600000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Mix en Galeria en L', precio_costo: 500000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Laterales Pista con Tramo', precio_costo: 2600000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Laterales Pista Sin Tramo', precio_costo: 1400000, id_categoria: CAT_IDS.GENERAL },
  // Velas / Accesorios
  { nombre: 'Velon alto Ines Pieres', precio_costo: 4000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Velon grodo Ines Pieres', precio_costo: 4000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Velita 5 x 7 Ines Pieres', precio_costo: 2600, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Camino mesa Alta o Living', precio_costo: 3000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Conos con Eucaliptus c/u', precio_costo: 2000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Cartel Genero Ines Pieres', precio_costo: 55000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Caminos Mesa Largos Ines Pieres', precio_costo: 8000, id_categoria: CAT_IDS.OBJETO_DECO },
  { nombre: 'Mesa de Ceremonia Ines Pieres', precio_costo: 40000, id_categoria: CAT_IDS.MESAS_SILLAS },
  // Estructuras Grandes
  { nombre: 'Alfombra Ale 16 mts x 1,6 y Tarima', precio_costo: 1500000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Entelado Santa Lucia Completo', precio_costo: 1600000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Entelado Completo Santa Elena', precio_costo: 2200000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Entelado Paredes Santa Elena', precio_costo: 1000000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Entelado Techo Santa Elena', precio_costo: 1300000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Tarima Ari 10 mts', precio_costo: 500000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Tarima Ari circular 3 x 3', precio_costo: 450000, id_categoria: CAT_IDS.GENERAL },
  { nombre: 'Neón Ines Pieres', precio_costo: 400000, id_categoria: CAT_IDS.GENERAL },
];

async function getOrCreateProveedor(nombre, notas) {
  const { data: existing } = await supabase
    .from('proveedores')
    .select('id')
    .eq('nombre', nombre)
    .single();

  if (existing) {
    console.log(`   ♻️  Proveedor "${nombre}" ya existe: ${existing.id}`);
    return existing.id;
  }

  const { data, error } = await supabase
    .from('proveedores')
    .insert({ nombre, notas })
    .select()
    .single();

  if (error) { console.error(`Error creando ${nombre}:`, error.message); return null; }
  console.log(`   ✅ Proveedor "${nombre}" creado: ${data.id}`);
  return data.id;
}

async function run() {
  console.log('=== INSERCIÓN CATÁLOGO LAMBARÉ E INES PIERES ===\n');

  // 1. Get/create proveedores
  console.log('1️⃣  Proveedores...');
  const lambareId = await getOrCreateProveedor('Lambaré', 'Alfombras, fanales, accesorios, lámparas y deco.');
  const inesId = await getOrCreateProveedor('Ines Pieres', 'Arreglos florales, aereos, entelados, tarimas y deco especial.');

  if (!lambareId || !inesId) { console.error('No se pudieron crear los proveedores.'); return; }

  // 2. Insert Lambaré items
  const lambareItems = lambare.map(p => ({
    nombre: p.nombre,
    precio_costo: p.precio_costo,
    id_proveedor: lambareId,
    id_categoria: p.id_categoria,
    descripcion: JSON.stringify({ proveedor: 'Lambaré' }),
  }));

  console.log(`\n2️⃣  Insertando ${lambareItems.length} items de Lambaré...`);
  const { data: inserted1, error: err1 } = await supabase
    .from('items')
    .insert(lambareItems)
    .select();

  if (err1) { console.error('Error Lambaré:', err1.message); }
  else { console.log(`   ✅ ${inserted1.length} items de Lambaré insertados!`); }

  // 3. Insert Ines Pieres items
  const inesItems = inesPieres.map(p => ({
    nombre: p.nombre,
    precio_costo: p.precio_costo,
    id_proveedor: inesId,
    id_categoria: p.id_categoria,
    descripcion: JSON.stringify({ proveedor: 'Ines Pieres' }),
  }));

  console.log(`\n3️⃣  Insertando ${inesItems.length} items de Ines Pieres...`);
  const { data: inserted2, error: err2 } = await supabase
    .from('items')
    .insert(inesItems)
    .select();

  if (err2) { console.error('Error Ines Pieres:', err2.message); }
  else { console.log(`   ✅ ${inserted2.length} items de Ines Pieres insertados!`); }

  console.log(`\n🎉 ¡Catálogos completamente integrados!`);
  console.log(`   Lambaré: ${lambareItems.length} items`);
  console.log(`   Ines Pieres: ${inesItems.length} items`);
  console.log(`\n   IDs de proveedor:`);
  console.log(`   Lambaré: ${lambareId}`);
  console.log(`   Ines Pieres: ${inesId}`);
}

run();
