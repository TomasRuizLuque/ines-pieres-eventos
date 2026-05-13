// Script to assign categories to Lambaré/Ines Pieres items
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wycbgmzsmivjkafknfgx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Y2JnbXpzbWl2amthZmtuZmd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjQzMTYyNCwiZXhwIjoyMDkyMDA3NjI0fQ.YJmAfG3hgeba9zYD9wwOl15W_8-wMlbh4AboFwvZ0P8'
);

const ILUMINACION_ITEMS = [
  'Lamparas Roma', 'Lamparas Mimbre', 'Pelotas Mimbre', 'Arbol encantado',
  'Parrillas con Luces', 'Navidad en Carpa 15 x 20', 'Navidad en carpa 20 x 30',
  'Araña Caireles', 'Mix Kermesse y Navidad 20 x 30', 'Mix Kermesse y Navidad 30 x 40',
  'Kermesse 20 x 30', 'Kermesse 30 x 40', 'Mix en Galeria en L',
  'Laterales Pista con Tramo', 'Laterales Pista Sin Tramo', 'Neón',
].map(n => n.trim().toLowerCase());

const FLORERIA_ITEMS = [
  'Florero Lata', 'Floreros Vicky', 'Floreros Panzones crudos',
  'Aereo sobre Pared x mts Secos 1', 'Aereo sobre Pared x mts Secos 2',
  'Aereo sobre Pared x mts Secos y Verdes', 'Arreglos para Frente de DJ x mt',
  'Techo Verde con Fanales x mts', 'Pared Secos x mt', 'Pared Verde x mt',
  'Columnas verdes mts', 'Frente DJ Cañas 1', 'Frente DJ Cañas 2',
  'Frente DJ Cañas + Totems', 'Orquideas', 'Arreglo Living',
  'Arreglo Arco Piso 3 mts (7 arreglos)', 'Arreglo esquinero y medio seco 1',
  'Arreglos esquinero y Piso seco', 'Arreglo Completo', 'Arreglo Mesa Alta',
  'Arreglo mesa rectangular', 'Arreglo mesa Redonda', 'Arreglo Isla de Catering',
  'Arreglo Piso', 'Arreglo Mesa Ceremonia Gr', 'Arreglo Mesa Ceremonia Normal',
  'Arreglo Nicho', 'Arreglo Chimenea x mt', 'Arreglo ventanas',
  'Arreglo Camino verdes x mesa', 'Arreglo Botellita', 'Arreglo Imperial x mt',
  'Arreglo Baño', 'Arreglo Arbolito', 'Arreglo Cilindros',
  'Arreglo Copon Gr', 'Arreglo Copon Ch', 'Arreglo Pedestal',
  'Aereo Pajaro simple', 'Aereo Pajaro doble cara',
  'Conos con  Eucaliptus c/', 'Techo Verde con lianas x mt',
].map(n => n.trim().toLowerCase());

async function main() {
  const iluminacionId = 'b3552413-b45a-4673-b2b8-b273e581d6f6';
  const floreriaId = '87b3ffee-4db7-4374-9f70-1c9e58c2ee17';

  // Fetch ALL items
  const { data: items, error } = await supabase
    .from('items')
    .select('id, nombre, id_categoria, id_proveedor, proveedores(nombre)');

  if (error || !items) { console.error('Error:', error); return; }
  console.log(`Total items in DB: ${items.length}`);

  let updatedIlum = 0, updatedFlor = 0;

  for (const item of items) {
    const nameLower = item.nombre.trim().toLowerCase();

    if (ILUMINACION_ITEMS.includes(nameLower)) {
      const { error: e } = await supabase.from('items').update({ id_categoria: iluminacionId }).eq('id', item.id);
      if (!e) { updatedIlum++; console.log(`  ✅ Iluminación: ${item.nombre}`); }
      else console.error(`  ❌ ${item.nombre}:`, e.message);
    } else if (FLORERIA_ITEMS.includes(nameLower)) {
      const { error: e } = await supabase.from('items').update({ id_categoria: floreriaId }).eq('id', item.id);
      if (!e) { updatedFlor++; console.log(`  ✅ Florería: ${item.nombre}`); }
      else console.error(`  ❌ ${item.nombre}:`, e.message);
    }
  }

  console.log(`\n✅ Done! Updated ${updatedIlum} to Iluminación, ${updatedFlor} to Florería`);
}

main().catch(console.error);
