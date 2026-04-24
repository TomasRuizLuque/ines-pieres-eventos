import { supabase } from '@/lib/supabase';
import PresupuestoBuilder from './PresupuestoBuilder';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NuevoPresupuestoPage() {
  const { data: items } = await supabase
    .from('items')
    .select(`
      *,
      categorias ( nombre ),
      proveedores ( nombre )
    `)
    .order('nombre', { ascending: true });

  return <PresupuestoBuilder items={items || []} />;
}
