import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import ExcelJS from 'exceljs';
import path from 'path';

const MARKUP_NORMAL = 0.10;
const MARKUP_FLORERIA = 2.0;
const isGeneric = (id: string) => id.startsWith('gen-');


const YELLOW_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFFFF2CC' },
};

/**
 * Template fixed layout:
 * Row 20: CEREMONIA header | Rows 22-46: Ceremonia items
 * Row 48: RECEPCIÓN header | Rows 50-91: Recepción items
 * Row 93: SALÓN header     | Rows 95-137: Salón items
 * Row 139: Canon fijo      | Row 141: Totals
 */

type SectionGroup = 'Ceremonia' | 'Recepción' | 'Salón';

interface Section {
  id: number;
  name: string;
  group: SectionGroup;
  isLiving: boolean;
}

interface BudgetLineItem {
  id: string;
  nombre: string;
  precio_unitario: number;
  cantidad: number;
  proveedor: string;
  url_imagen: string | null;
  living: number;
  categoria?: string;
}

const checkFloreria = (item: BudgetLineItem): boolean => {
  // Normalize accents: 'Florería' → 'floreria'
  const cat = (item.categoria ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
  return cat === 'floreria' || item.proveedor === 'Ines Pieres';
};

const GROUP_RANGES: Record<string, { startRow: number; endRow: number }> = {
  Ceremonia: { startRow: 22, endRow: 46  },
  Recepción: { startRow: 50, endRow: 91  },
  Salón:     { startRow: 95, endRow: 137 },
};

const PROTECTED_ROWS = new Set([20, 48, 93, 139, 141]);

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const { data: presupuesto, error } = await supabase
      .from('presupuestos')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !presupuesto) {
      return NextResponse.json({ error: 'Presupuesto no encontrado' }, { status: 404 });
    }

    const items: BudgetLineItem[] = Array.isArray(presupuesto.items_json)
      ? presupuesto.items_json.map((i: any) => ({ ...i, living: i.living ?? 1 }))
      : [];

    const savedSections: Section[] = presupuesto.config_json?.sections ?? [];

    // ── Load template ──
    const workbook = new ExcelJS.Workbook();
    const templatePath = path.join(process.cwd(), 'plantilla_presupuesto.xlsx');
    await workbook.xlsx.readFile(templatePath);
    const sheet = workbook.worksheets[0];

    // ── 1. Populate header ──
    sheet.getCell('E4').value  = presupuesto.nombres_novios || presupuesto.nombre_cliente || '';
    if (presupuesto.created_at) {
      sheet.getCell('E5').value = new Date(presupuesto.created_at).toLocaleDateString('es-AR');
    }
    if (presupuesto.fecha_evento) {
      sheet.getCell('E7').value = new Date(presupuesto.fecha_evento + 'T00:00:00').toLocaleDateString('es-AR');
    }
    sheet.getCell('E8').value  = presupuesto.lugar_evento      || '';
    sheet.getCell('E10').value = presupuesto.cantidad_personas || '';
    sheet.getCell('E11').value = presupuesto.formato           || '';
    sheet.getCell('E12').value = presupuesto.ceremonia         || '';
    sheet.getCell('E13').value = presupuesto.mensaje_adicional || '';
    
    // If estado is borrador or undefined, leave it blank, otherwise use the estado
    const estadoStr = (presupuesto.estado || 'borrador').toLowerCase();
    sheet.getCell('E14').value = estadoStr === 'borrador' ? '' : presupuesto.estado;

    // ── 2. Clear ALL item rows ──
    for (let r = 22; r <= 137; r++) {
      if (PROTECTED_ROWS.has(r)) continue;
      const row = sheet.getRow(r);
      row.hidden = false;
      row.height = 15; // Reset height to prevent squished rows
      
      row.getCell(3).value = null;  // C: Nombre
      row.getCell(4).value = null;  // D: Cantidad
      row.getCell(5).value = null;  // E: Costo Unitario
      row.getCell(7).value = null;  // G: Mark-up (break shared formula chain)
      // Don't clear F, H-N (formulas that reference D, E, G — they'll compute 0 for empty rows)
    }

    // ── 3. Write items ──
    const GROUPS: SectionGroup[] = ['Ceremonia', 'Recepción', 'Salón'];

    const applyYellow = (row: ExcelJS.Row, colCount = 14) => {
      for (let col = 1; col <= colCount; col++) {
        row.getCell(col).fill = YELLOW_FILL;
      }
    };

    for (const group of GROUPS) {
      const range = GROUP_RANGES[group];
      if (!range) continue;

      const groupSections = savedSections.filter(s => s.group === group);
      const groupSectionIds = new Set(groupSections.map(s => s.id));
      const groupItems = items.filter(i => groupSectionIds.has(i.living));

      if (groupItems.length === 0) {
        for (let r = range.startRow; r <= range.endRow; r++) {
          sheet.getRow(r).hidden = true;
        }
        continue;
      }

      let currentRow = range.startRow;

      for (const section of groupSections) {
        const sectionItems = items.filter(i => i.living === section.id);
        if (sectionItems.length === 0) continue;
        if (currentRow > range.endRow) break;

        // Section sub-header: bold, no underline
        const headerRow = sheet.getRow(currentRow);
        headerRow.getCell(3).value = section.name;
        headerRow.getCell(3).font = { bold: true, underline: false, size: 11 };
        applyYellow(headerRow);
        currentRow++;

        for (const item of sectionItems) {
          if (currentRow > range.endRow) break;

          const itemRow = sheet.getRow(currentRow);

          itemRow.getCell(3).value = item.nombre;
          itemRow.getCell(3).font = { bold: false, underline: false, size: 11 };

          itemRow.getCell(4).value = item.cantidad;
          itemRow.getCell(4).numFmt = '0';

          itemRow.getCell(5).value = item.precio_unitario;
          itemRow.getCell(5).numFmt = '#,##0.00';

          const markupValue = checkFloreria(item) ? MARKUP_FLORERIA : MARKUP_NORMAL;
          itemRow.getCell(7).value = markupValue;
          itemRow.getCell(7).numFmt = '0.0%';

          itemRow.getCell(15).value = isGeneric(item.id) ? 'Otros servicios' : 'Mobiliario';

          applyYellow(itemRow);
          currentRow++;
        }

        // Blank separator after section
        currentRow++;
      }

      // Hide all surplus rows in this group's range
      for (let r = currentRow; r <= range.endRow; r++) {
        sheet.getRow(r).hidden = true;
      }
    }

    // ── 4. Export raw buffer ──
    const rawBuffer = await workbook.xlsx.writeBuffer();

    // ── 5. Strip named ranges via direct XML manipulation ──
    // ExcelJS re-serializes named ranges from the template in a format Excel
    // can't parse, triggering the "removed records" recovery dialog.
    // We post-process the zip to remove <definedNames> from workbook.xml entirely.
    let finalBuffer: Buffer | ArrayBuffer = rawBuffer;
    try {
      const JSZip = (await import('jszip')).default;
      const zip = await JSZip.loadAsync(rawBuffer);
      const entry = zip.file('xl/workbook.xml');
      if (entry) {
        let xml: string = await entry.async('string');
        // Remove both filled and self-closing <definedNames> elements
        xml = xml.replace(/<definedNames[^>]*>[\s\S]*?<\/definedNames>/g, '');
        xml = xml.replace(/<definedNames[^>]*\/>/g, '');
        zip.file('xl/workbook.xml', xml);
        finalBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
      }
    } catch (zipErr) {
      console.warn('[Excel] Could not strip named ranges, using raw buffer:', zipErr);
    }

    const clientSlug = (presupuesto.nombre_cliente || 'presupuesto')
      .replace(/\s+/g, '-')
      .toLowerCase();

    return new NextResponse(finalBuffer as ArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="presupuesto-${clientSlug}.xlsx"`,
      },
    });

  } catch (error) {
    console.error('Error Excel:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
