import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { renderToBuffer } from '@react-pdf/renderer';
import { PresupuestoPdf } from '@/components/pdf/PresupuestoPdf';
import React from 'react';
import fs from 'fs';
import path from 'path';

/**
 * Reads an image file from disk and returns a base64 data URI
 * that can be embedded directly into the PDF.
 */
function imageToDataUri(relativeUrl: string): string | null {
  try {
    const decoded = decodeURIComponent(relativeUrl);
    const filePath = path.join(process.cwd(), 'public', decoded);
    
    if (!fs.existsSync(filePath)) {
      console.warn('Image not found:', filePath);
      return null;
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' 
               : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
               : ext === '.webp' ? 'image/webp'
               : 'image/png';
    
    return `data:${mime};base64,${fileBuffer.toString('base64')}`;
  } catch (err) {
    console.warn('Failed to read image:', relativeUrl, err);
    return null;
  }
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { data: presupuesto, error } = await supabase
    .from('presupuestos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !presupuesto) {
    return NextResponse.json({ error: 'Presupuesto no encontrado' }, { status: 404 });
  }

  try {
    // Pre-process items: embed images as base64 data URIs
    const itemsWithEmbeddedImages = (presupuesto.items_json || []).map(
      (item: { url_imagen: string | null;[key: string]: unknown }) => {
        if (item.url_imagen && item.url_imagen.startsWith('/images/')) {
          const dataUri = imageToDataUri(item.url_imagen);
          return { ...item, url_imagen: dataUri };
        }
        return item;
      }
    );

    const presupuestoForPdf = {
      ...presupuesto,
      items_json: itemsWithEmbeddedImages,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(PresupuestoPdf, { presupuesto: presupuestoForPdf }) as any;
    const buffer = await renderToBuffer(element);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="presupuesto-${presupuesto.nombre_cliente.replace(/\s+/g, '-').toLowerCase()}.pdf"`,
      },
    });
  } catch (err) {
    console.error('PDF generation error:', err);
    return NextResponse.json({ error: 'Error generando PDF' }, { status: 500 });
  }
}
