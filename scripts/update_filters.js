/**
 * Actualizar los campos de filtros del catálogo de Galpón Pueyrredón.
 * Guarda la info de la API en el campo 'descripcion' (como JSON) para no tener
 * que alterar el esquema de Supabase manualmente.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  console.log('Obteniendo catálogo completo desde la API pública de Galpón Pueyrredón para sacar LÍNEAS y FILTROS...');
  const res = await fetch('https://api-prod.galponpueyrredon.com.ar/api/products');
  const d = await res.json();
  const products = d.data;

  console.log(`Recibidos ${products.length} productos! Actualizando base de datos...`);

  // Extraer todos los items actuales
  const { data: items, error } = await supabase.from('items').select('id, nombre');
  if (error) { console.error(error); return; }

  let updatedCount = 0;

  for (let prod of products) {
    // Recrear exactamente cómo generamos el nombre antes
    let name = prod.name.trim();
    if (prod.code) name += ` - ${prod.code}`;

    // Buscar en Supabase
    const dbItem = items.find(i => i.nombre === name);
    if (!dbItem) continue;

    // Generar el objeto JSON para meter en 'descripcion'
    const meta = {
      text: prod.description || '',
      tipo: prod.product_type?.name || null,
      linea: prod.product_line?.name || null,
      mueble: prod.product_furniture?.name || null
    };

    const { error: updErr } = await supabase
      .from('items')
      .update({ descripcion: JSON.stringify(meta) })
      .eq('id', dbItem.id);

    if (!updErr) updatedCount++;
  }

  console.log(`\n✅ ¡${updatedCount} ítems actualizados con sus 3 nuevos filtros!`);
}

run();
