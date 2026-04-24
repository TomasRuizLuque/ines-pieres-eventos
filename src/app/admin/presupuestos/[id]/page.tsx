import { supabase } from '@/lib/supabase';
import PresupuestoBuilder from '../nuevo/PresupuestoBuilder';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EditarPresupuestoPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  // Cargar inventario completo
  const { data: items } = await supabase
    .from('items')
    .select(`
      *,
      categorias ( nombre ),
      proveedores ( nombre )
    `)
    .order('nombre', { ascending: true });

  // Cargar presupuesto específico
  const { data: presupuesto, error } = await supabase
    .from('presupuestos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !presupuesto) {
    notFound();
  }

  return (
    <PresupuestoBuilder
      items={items || []}
      initialData={{
        id: presupuesto.id,
        nombre_cliente: presupuesto.nombre_cliente,
        email_cliente: presupuesto.email_cliente || '',
        telefono_cliente: presupuesto.telefono_cliente || '',
        fecha_evento: presupuesto.fecha_evento || '',
        lugar_evento: presupuesto.lugar_evento || '',
        estado: presupuesto.estado,
        items_json: Array.isArray(presupuesto.items_json) ? presupuesto.items_json : [],
        config_json: presupuesto.config_json || undefined,
        // Web form data
        origen: presupuesto.origen || 'manual',
        nombres_novios: presupuesto.nombres_novios || '',
        cantidad_personas: presupuesto.cantidad_personas || '',
        ceremonia: presupuesto.ceremonia || '',
        formato: presupuesto.formato || '',
        estilo: presupuesto.estilo || '',
        presupuesto_destinado: presupuesto.presupuesto_destinado || '',
        links_inspiracion: presupuesto.links_inspiracion || '',
        mensaje_adicional: presupuesto.mensaje_adicional || '',
      }}
    />
  );
}
