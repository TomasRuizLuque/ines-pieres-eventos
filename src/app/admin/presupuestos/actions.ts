'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function deletePresupuesto(id: string) {
  const { error } = await supabase
    .from('presupuestos')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error('No se pudo eliminar el presupuesto');
  }

  revalidatePath('/admin/presupuestos');
}
