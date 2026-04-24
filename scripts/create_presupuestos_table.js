/**
 * Crear tabla 'presupuestos' en Supabase
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  console.log('Verificando si la tabla presupuestos ya existe...');
  
  // Try inserting a test row to see if the table exists
  const { error: checkErr } = await supabase
    .from('presupuestos')
    .select('id')
    .limit(1);

  if (!checkErr) {
    console.log('✅ La tabla "presupuestos" ya existe.');
    return;
  }

  console.log('La tabla no existe. Hay que crearla desde el dashboard de Supabase.');
  console.log('\nEjecuta este SQL en el SQL Editor de Supabase:\n');
  
  const sql = `
CREATE TABLE presupuestos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_cliente text NOT NULL,
  email_cliente text,
  telefono_cliente text,
  fecha_evento date,
  lugar_evento text,
  items_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric DEFAULT 0,
  flete numeric DEFAULT 0,
  iva numeric DEFAULT 0,
  total numeric DEFAULT 0,
  estado text DEFAULT 'borrador' CHECK (estado IN ('borrador', 'enviado', 'aprobado', 'rechazado')),
  notas text,
  created_at timestamp with time zone DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE presupuestos ENABLE ROW LEVEL SECURITY;

-- Política permisiva para uso interno
CREATE POLICY "Allow all for authenticated" ON presupuestos FOR ALL USING (true);
`;

  console.log(sql);
}

run();
