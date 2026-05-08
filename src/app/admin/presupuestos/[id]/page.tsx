import { supabase } from '@/lib/supabase';
import PresupuestoPageClient from './PresupuestoPageClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EditarPresupuestoPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const [{ data: items }, { data: presupuesto, error }] = await Promise.all([
    supabase
      .from('items')
      .select('*, categorias(nombre), proveedores(nombre)')
      .order('nombre', { ascending: true }),
    supabase
      .from('presupuestos')
      .select('*')
      .eq('id', id)
      .single(),
  ]);

  if (error || !presupuesto) {
    notFound();
  }

  return (
    <PresupuestoPageClient
      items={items || []}
      presupuesto={presupuesto}
    />
  );
}
