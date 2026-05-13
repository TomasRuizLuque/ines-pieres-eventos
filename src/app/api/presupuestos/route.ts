import { supabase } from '@/lib/supabase';
import { syncPresupuestoToSheet } from '@/lib/google-sheets';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('presupuestos')
      .insert(body)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Sync to Google Sheets (fire-and-forget)
    syncPresupuestoToSheet({
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
    }).catch(() => {});

    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          comision_salon: data.config_json?._comisionSalonAmt ?? 0,
          comision_planner: data.config_json?._comisionPlannerAmt ?? 0,
          es_nuevo: true,
        }),
      }).catch(() => {});
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('presupuestos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
