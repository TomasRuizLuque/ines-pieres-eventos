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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

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
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
