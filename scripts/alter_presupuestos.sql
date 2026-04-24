-- Agregar columnas nuevas para datos del formulario web
ALTER TABLE presupuestos
  ADD COLUMN IF NOT EXISTS nombres_novios text,
  ADD COLUMN IF NOT EXISTS cantidad_personas text,
  ADD COLUMN IF NOT EXISTS ceremonia text,
  ADD COLUMN IF NOT EXISTS formato text,
  ADD COLUMN IF NOT EXISTS estilo text,
  ADD COLUMN IF NOT EXISTS presupuesto_destinado text,
  ADD COLUMN IF NOT EXISTS links_inspiracion text,
  ADD COLUMN IF NOT EXISTS mensaje_adicional text,
  ADD COLUMN IF NOT EXISTS origen text DEFAULT 'manual';
