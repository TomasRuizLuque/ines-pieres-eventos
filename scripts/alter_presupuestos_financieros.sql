ALTER TABLE presupuestos
  ADD COLUMN IF NOT EXISTS aplica_iva boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS comision_salon boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS comision_salon_tipo text DEFAULT 'porcentaje',
  ADD COLUMN IF NOT EXISTS comision_salon_monto numeric DEFAULT 10,
  ADD COLUMN IF NOT EXISTS comision_planner boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS comision_planner_monto numeric DEFAULT 10;
