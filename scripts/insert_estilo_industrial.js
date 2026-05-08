/**
 * Insertar catálogo Estilo Industrial 2026 en Supabase
 * Fuente: PDF "Catálogo ESTILO INDUSTRIAL - 2026 (1).pdf"
 *
 * NOTA: Series NO incluidas (datos insuficientes, ver pp.4-37 del catálogo):
 *   - Living Chester (9 variantes)
 *   - Living Bali (9 variantes)
 *   - Living Gervasoni (3 variantes)
 *   - Living de Caña (4 variantes)
 *   - Living Creta base (8 variantes)
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CAT_IDS = {
  MOBILIARIO_LIVING: '17b46318-7c32-4364-9128-d41ed0222fe2',
  MESAS_SILLAS: 'a65ae374-d562-4860-a215-fdc11cf34b1b',
  GENERAL: '24830643-89a5-42e3-a122-c80953e69996',
  OBJETO_DECO: '3a961f2d-ec1a-4d81-ba50-45a34cb66ab1',
  BANCOS: '003472f4-1521-465d-984c-7c191cdbf573',
};

const d = (text, stock) =>
  JSON.stringify({ text, stock, proveedor: 'Estilo Industrial' });

const productos = [
  // ── LIVINGS ─────────────────────────────────────────────────────
  {
    nombre: 'Living Creta Blue c/Sillas Bali',
    descripcion: d('Sillón de pana 180x80 + 4 sillones Bali + trío de mesas de rattán o dúo indonesia y rodaja de guayubira.', '6 juegos'),
    precio_costo: 204000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Creta Blue c/Sillas Bertoia',
    descripcion: d('Sillón de pana 180x80 + 4 sillones Bertoia + trío de mesas de rattán o dúo indonesia y rodaja de guayubira.', '8 juegos'),
    precio_costo: 204000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Creta Blue c/Silloncitos MDQ',
    descripcion: d('Sillón de pana 180x80 + 4 sillones MDQ + trío de mesas de rattán o dúo indonesia y rodaja de guayubira.', '8 juegos'),
    precio_costo: 239600,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Creta Blue c/Sillas Cross',
    descripcion: d('Sillón de pana 180x80 + 4 sillas cross + trío de mesas de rattán o dúo indonesia y rodaja de guayubira.', '6 juegos'),
    precio_costo: 204000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Antonia c/Sillas Tolix',
    descripcion: d('Sillón de hierro antonia 150x65 + 2 sillones individuales antonia 65x65 + mesa ratona de hierro 80x60 + 4 sillas tolix cobre o negras.', '18 juegos'),
    precio_costo: 80000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Antonia',
    descripcion: d('Sillón de hierro antonia 150x65 + 2 sillones individuales antonia 65x65 + mesa ratona de hierro 80x60 + 4 bancos de madera individual.', '18 juegos'),
    precio_costo: 66000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Antonia c/Sillas Bertoia',
    descripcion: d('Sillón de hierro antonia 150x65 + 2 sillones individuales antonia 65x65 + mesa ratona de hierro 80x60 + 4 sillas bertoia.', '8 juegos'),
    precio_costo: 89000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Antonia c/Sillas Cross',
    descripcion: d('Sillón de hierro antonia 150x65 + 2 sillones individuales antonia 65x65 + mesa ratona de hierro 80x60 + 4 sillas cross.', '18 juegos'),
    precio_costo: 79900,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Antonia c/Gervasoni',
    descripcion: d('Sillón de hierro antonia 150x65 + 2 sillones individuales antonia 65x65 + mesa ratona de hierro 80x60 + 2 gervasoni individual.', '18 juegos'),
    precio_costo: 93000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Antonia c/Poltronas Kraft',
    descripcion: d('Sillón de hierro antonia 150x65 + 2 sillones individuales antonia 65x65 + mesa ratona de hierro 80x60 + 2 poltronas kraft.', '16 juegos'),
    precio_costo: 93000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Antonia c/Silloncitos MDQ',
    descripcion: d('Sillón de hierro antonia 150x65 + 2 sillones individuales antonia 65x65 + mesa ratona de hierro 80x60 + 2 sillón mdq individual.', '16 juegos'),
    precio_costo: 99000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Antonia c/Silloncitos MDQ XL',
    descripcion: d('Sillón de hierro antonia 150x65 + 2 sillones individuales antonia 65x65 + mesa ratona de hierro 80x60 + 4 sillón mdq individual.', '16 juegos'),
    precio_costo: 133500,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living de Hierro Clásico',
    descripcion: d('Sillón de 180x80 + 2 Puff de 80x40 + 1 mesa ratona de hierro de 80x80 + 3 puff simples de 40x40.', '20 juegos'),
    precio_costo: 60000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living de Hierro Clásico c/Sillas Tolix',
    descripcion: d('Sillón de 180x80 + 4 sillas tolix negras + 1 mesa ratona de hierro de 80x80 + 3 puff simples de 40x40.', '12 juegos'),
    precio_costo: 75000,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Rústico de Madera',
    descripcion: d('Sillón de madera rústico 1,35x0,45 con respaldo + 2 bancos de madera de 1,20x0,40 + Mesa de madera de 50x70 + 2 sillas kentucky.', '12 juegos'),
    precio_costo: 57500,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },

  // ── MESAS Y SILLAS ───────────────────────────────────────────────
  // Bar c/banquetas hierro-madera
  {
    nombre: 'Mesa Alta Bar p/4ps c/Banquetas Hierro-Madera',
    descripcion: d('Mesa alta de hierro y madera 70x70 + 4 banquetas altas de hierro y madera.', '30 unidades'),
    precio_costo: 37000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta Bar p/6ps c/Banquetas Hierro-Madera',
    descripcion: d('Mesa alta de hierro y madera 120x35 + 6 banquetas altas de hierro y madera.', '12 unidades'),
    precio_costo: 49500,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta Bar p/8ps c/Banquetas Hierro-Madera',
    descripcion: d('Mesa alta de hierro y madera 200x80 + 8 banqueta de hierro y madera.', '15 unidades'),
    precio_costo: 74500,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // Bar c/Tolix
  {
    nombre: 'Mesa Alta Bar p/4ps c/Taburete Tolix',
    descripcion: d('Mesa alta de hierro y madera 70x70 + 4 Taburete Tolix.', '30 unidades'),
    precio_costo: 37000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta Bar p/6ps c/Taburete Tolix',
    descripcion: d('Mesa alta de hierro y madera 120x35 + 6 taburete tolix.', '12 unidades'),
    precio_costo: 49500,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta Bar p/8ps c/Taburete Tolix',
    descripcion: d('Mesa alta de hierro y madera 200x80 + 8 taburete tolix.', '15 unidades'),
    precio_costo: 74500,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // Bar c/Tulum
  {
    nombre: 'Mesa Alta Bar p/4ps c/Banqueta Tulum (70x70)',
    descripcion: d('Mesa alta de hierro y madera 70x70 + 4 banqueta tulum.', '6 unidades'),
    precio_costo: 44000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta Bar p/4ps c/Banqueta Tulum (120x35)',
    descripcion: d('Mesa alta de hierro y madera 120x35 + 4 banqueta tulum.', '6 unidades'),
    precio_costo: 44000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta Bar p/8ps c/Banqueta Tulum',
    descripcion: d('Mesa alta de hierro y madera 200x80 + 8 banqueta tulum.', '3 unidades'),
    precio_costo: 86000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // Bar c/MDQ
  {
    nombre: 'Mesa Alta Bar p/4ps c/Banqueta MDQ (70x70)',
    descripcion: d('Mesa alta hierro y madera 70x70 + 4 banqueta mdq.', '9 unidades'),
    precio_costo: 47000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta Bar p/4ps c/Banqueta MDQ (120x35)',
    descripcion: d('Mesa alta hierro y madera 120x35 + 4 banqueta mdq.', '6 unidades'),
    precio_costo: 47000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta Bar p/8ps c/Banqueta MDQ',
    descripcion: d('Mesa alta de hierro y madera 200x80 + 8 banquetas mdq.', '3 unidades'),
    precio_costo: 90500,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // Toscana/Creta altas
  {
    nombre: 'Mesa Alta Toscana p/4ps c/Banqueta MDQ',
    descripcion: d('Mesa alta de paraíso 120x60 + 4 banqueta mdq.', '6 unidades'),
    precio_costo: 52000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta Creta p/4ps c/Banqueta Creta',
    descripcion: d('Mesa alta de paraíso 120x60 + 4 banqueta creta.', '6 unidades'),
    precio_costo: 69700,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Alta Toscana p/4ps c/Banqueta Tulum',
    descripcion: d('Mesa alta de paraíso 120x60 + 4 banqueta tulum.', '6 unidades'),
    precio_costo: 48500,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // Mesones
  {
    nombre: 'Mesón Toscana p/10ps c/Sillas Cross',
    descripcion: d('Mesón de paraíso 200x120 + 10 sillas cross.', '13 unidades'),
    precio_costo: 93200,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesón Toscana p/8ps c/Silloncito Creta',
    descripcion: d('Mesa paraíso con patas torneadas de 200x120 + 8 sillón creta individual.', '2 unidades'),
    precio_costo: 190000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Toscana p/8ps c/Sillas Luis XV',
    descripcion: d('Mesa paraíso con patas torneadas de 200x120 + 8 sillas Luis XV.', '8 unidades'),
    precio_costo: 122600,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Serpentina p/7ps c/Sillas Cross',
    descripcion: d('Mesa serpentina con patas torneadas de 200x100 + 7 sillas cross.', '14 unidades'),
    precio_costo: 93200,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // Community
  {
    nombre: 'Mesa Community p/10ps c/Sillas Tolix',
    descripcion: d('Mesa community de hierro y madera 200x80 + 10 sillas tolix cobre o negras.', '12 unidades'),
    precio_costo: 63000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Community p/8ps c/Sillas Cross',
    descripcion: d('Mesa community de hierro y madera de 200x80 + 8 sillas cross.', '17 unidades'),
    precio_costo: 65000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Rústica p/10ps c/Sillas Tijera',
    descripcion: d('Mesa rústica 200x80 + 10 sillas tijera.', '20 unidades'),
    precio_costo: 55000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // Cafetín sets
  {
    nombre: 'Mesa Cafetín p/4ps c/Sillas Cross',
    descripcion: d('Mesa cafetín de hierro y madera de 60cm diámetro + 4 sillas cross.', '10 unidades'),
    precio_costo: 26000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Cafetín p/4ps c/Sillas Bertoia',
    descripcion: d('Mesa cafetín de hierro y madera de 60cm diámetro + 4 sillas bertoia.', '8 unidades'),
    precio_costo: 29000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Cafetín p/3ps c/Sillas Cafetín',
    descripcion: d('Mesa cafetín de hierro y madera de 60cm diámetro + 3 sillas cafetín.', '9 unidades'),
    precio_costo: 21500,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Cafetín p/4ps c/Sillas Tolix',
    descripcion: d('Mesa cafetín de hierro y madera de 60cm diámetro + 4 sillas Tolix.', '10 unidades'),
    precio_costo: 24000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Cafetín p/3ps c/Silloncito MDQ',
    descripcion: d('Mesa cafetín de hierro y madera de 60cm diámetro + 3 silloncitos mdq.', '10 unidades'),
    precio_costo: 56000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Cafetín Paraíso p/4ps c/Sillas Luis XV',
    descripcion: d('Mesa cafetín de paraíso de 70cm diámetro + 4 sillas Luis XV.', '12 unidades'),
    precio_costo: 61000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesas Feria c/Bancos',
    descripcion: d('Mesa rústica de madera 210x070x075 + 2 bancos de madera haciendo juego.', '45 unidades'),
    precio_costo: 52500,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Pic Nic',
    descripcion: d('Mesa picnic de 200x80x35.', '6 unidades'),
    precio_costo: 29000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // Sillas individuales
  {
    nombre: 'Sillas Plegables c/Almohadón',
    descripcion: d('Silla de madera plegable con almohadón blanco.', '60 unidades'),
    precio_costo: 2300,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Sillas Cross',
    descripcion: d('Sillas Cross con almohadón natural.', '230 unidades'),
    precio_costo: 4200,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Sillas Luis XV',
    descripcion: d('Sillas Luis XV natural.', '67 unidades'),
    precio_costo: 9200,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Sillas Tijera',
    descripcion: d('Sillas tijera color petiribi.', '300 unidades'),
    precio_costo: 2300,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  // Mesas individuales
  {
    nombre: 'Mesa Antique',
    descripcion: d('Mesón de madera antiguo de 120x100. Para mesa de Ceremonia o Arreglos florales.', '1 unidad'),
    precio_costo: 56500,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Toscana Individual',
    descripcion: d('Mesa de paraíso con patas torneadas aprox 120x060x75.', '3 unidades'),
    precio_costo: 28000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Cafetín Paraíso Individual',
    descripcion: d('Mesa de paraíso cafetín con patas torneadas aprox 70cm de diámetro.', '10 unidades'),
    precio_costo: 25000,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },

  // ── BANCOS ───────────────────────────────────────────────────────
  {
    nombre: 'Bancos de Madera',
    descripcion: d('Bancos de madera de 120x40.', '30 unidades'),
    precio_costo: 9200,
    id_categoria: CAT_IDS.BANCOS,
  },

  // ── GENERAL ──────────────────────────────────────────────────────
  {
    nombre: 'Pérgola de Madera',
    descripcion: d('Pérgola de madera 300x300x240 con red de sombreo color arena.', '8 unidades'),
    precio_costo: 66500,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Barra de Madera',
    descripcion: d('Barra de madera de 200x80x105, hueca.', '6 unidades'),
    precio_costo: 60500,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Barra de Chapa',
    descripcion: d('Barra de 200x80x135 con back de apoyo a 75cm.', '2 unidades'),
    precio_costo: 60500,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Spot DJ (Tipi + Caña)',
    descripcion: d('Tipi de madera + 3 Pantallas de luz + corralito de caña 360.', '1 unidad'),
    precio_costo: 85000,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Carpa Tipi',
    descripcion: d('Tipi de madera + Pantallas de luz.', '2 unidades'),
    precio_costo: 70000,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Honguito Calefactor',
    descripcion: d('Honguito calefactor con garrafa de 10k.', '10 unidades'),
    precio_costo: 72000,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Fogonero',
    descripcion: d('Fogonero de 50cm diámetro y 40cm de alto.', '3 unidades'),
    precio_costo: 12500,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Arco de Ceremonia Madera',
    descripcion: d('Arco de madera aprox 180x200. Formato recto, hexagonal o triangular.', 'Disponible'),
    precio_costo: 22000,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Mesa de Ceremonia Rústica',
    descripcion: d('Mesa de ceremonia 100x50 (rústica).', '2 unidades'),
    precio_costo: 8900,
    id_categoria: CAT_IDS.GENERAL,
  },
  {
    nombre: 'Sombrilla Boho',
    descripcion: d('Sombrilla de 3mt con terminación boho.', 'Sin stock'),
    precio_costo: 38000,
    id_categoria: CAT_IDS.GENERAL,
  },

  // ── OBJETO DECO ──────────────────────────────────────────────────
  {
    nombre: 'Estantería de Hierro',
    descripcion: d('Estantería de hierro y madera de 160x200 con 5 estantes de 35 y 30 de profundidad.', '8 unidades'),
    precio_costo: 32000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Biombo Industrial',
    descripcion: d('Biombo de 150x200.', '2 unidades'),
    precio_costo: 23000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Hamaca de Hierro',
    descripcion: d('Hamaca de hierro con pie para colgar.', '2 unidades'),
    precio_costo: 42000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: "Corpórea LOVE (madera)",
    descripcion: d('Corpórea de madera con luz led cálida 1mt alto.', 'Consultar'),
    precio_costo: 60500,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Pedestal de Hierro',
    descripcion: d('Pedestal de hierro y madera de 30x30x105.', '10 unidades'),
    precio_costo: 9200,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Corpórea BAR (chapa)',
    descripcion: d('Corpórea de chapa con luz led cálida 35cm alto.', '2 unidades'),
    precio_costo: 32000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Alfombra de Yute',
    descripcion: d('Alfombra de yute 200x160.', '6 unidades'),
    precio_costo: 14000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Alfombra Persa',
    descripcion: d('Alfombra persa en diferentes medidas y colores.', '16 unidades'),
    precio_costo: 22900,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: 'Alfombra de Arroz',
    descripcion: d('Alfombra de arroz 200x160.', '16 unidades'),
    precio_costo: 22900,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: "Cartel Neón 'Let's get this party started'",
    descripcion: d("Cartel de neón 'Let's get this party started'. Medida aprox 125x60.", 'Consultar'),
    precio_costo: 46000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: "Cartel Neón 'Let's party'",
    descripcion: d("Cartel de neón 'Let's party'. Medida aprox 70x30.", 'Consultar'),
    precio_costo: 16000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: "Cartel Neón 'Let's celebrate'",
    descripcion: d("Cartel de neón 'Let's celebrate'. Medida aprox 80x40.", 'Consultar'),
    precio_costo: 28000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: "Cartel Neón 'Crazy in love'",
    descripcion: d("Cartel de neón 'Crazy in love'. Medida aprox 70x20.", 'Consultar'),
    precio_costo: 16000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
  {
    nombre: "Cartel Neón 'Better together'",
    descripcion: d("Cartel de neón 'Better together'. Medida aprox 95x75.", 'Consultar'),
    precio_costo: 35000,
    id_categoria: CAT_IDS.OBJETO_DECO,
  },
];

async function run() {
  console.log('=== INSERCIÓN CATÁLOGO ESTILO INDUSTRIAL ===\n');

  console.log('1️⃣  Creando proveedor "Estilo Industrial"...');
  const { data: provData, error: provErr } = await supabase
    .from('proveedores')
    .insert({ nombre: 'Estilo Industrial', notas: 'Catálogo PDF 2026' })
    .select()
    .single();

  if (provErr) {
    console.error('Error creando proveedor:', provErr.message);
    return;
  }
  console.log(`   ✅ Proveedor creado con ID: ${provData.id}`);

  const proveedorId = provData.id;

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

  console.log(`   ✅ ${insertedItems.length} productos insertados!\n`);

  insertedItems.forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.nombre} - $${item.precio_costo?.toLocaleString('es-AR')}`);
  });

  console.log(`\n🎉 ¡Catálogo Estilo Industrial integrado!`);
  console.log('\n⚠️  PENDIENTE: Chester (9 var), Bali (9 var), Gervasoni (3 var), Caña (4 var), Creta base (8 var) — ver pp.4-37 del PDF.');
}

run();
