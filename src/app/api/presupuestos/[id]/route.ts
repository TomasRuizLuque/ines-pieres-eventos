import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { data, error } = await supabase
      .from('presupuestos')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[PATCH presupuesto] Supabase error:', error.message, error.details, error.hint);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Sync to Google Sheets (fire-and-forget, dynamic import to avoid Turbopack issues)
    import('@/lib/google-sheets')
      .then(({ syncPresupuestoToSheet }) => syncPresupuestoToSheet({
        nombre_cliente: data.nombre_cliente,
        nombres_novios: data.nombres_novios,
        fecha_evento: data.fecha_evento,
        lugar_evento: data.lugar_evento,
        cantidad_personas: data.cantidad_personas,
        formato: data.formato,
        ceremonia: data.ceremonia,
        presupuesto_destinado: data.presupuesto_destinado,
        total: data.total,
        estado: data.estado,
      }))
      .catch((err) => console.error('[PATCH presupuesto] Sheets sync error:', err));

    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          comision_salon: data.config_json?._comisionSalonAmt ?? 0,
          comision_planner: data.config_json?._comisionPlannerAmt ?? 0,
          es_nuevo: false,
        }),
      }).catch(() => {});
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('[PATCH presupuesto] Unexpected error:', err);
    return NextResponse.json({ error: String(err) }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const { error } = await supabase
      .from('presupuestos')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
