import { google } from 'googleapis';

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const TAB_NAME = process.env.GOOGLE_SHEETS_TAB || 'PROYECTOS';
const HEADER_ROWS = 4; // Rows 1-4 are headers/legend, data starts at row 5

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!email || !key) {
    throw new Error('Missing Google Sheets credentials in environment variables');
  }

  return new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

const ESTADO_MAP: Record<string, string> = {
  pendiente_cotizacion: 'Pendiente',
  borrador: '',
  listo_para_enviar: 'Listo para Enviar',
  enviado: 'Enviado',
  aprobado: 'Aprobado',
};

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function formatDateShort(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getDate()}-${MONTHS[d.getMonth()]}-${String(d.getFullYear()).slice(-2)}`;
}

function todayFormatted(): string {
  const d = new Date();
  return `${d.getDate()}-${MONTHS[d.getMonth()]}-${String(d.getFullYear()).slice(-2)}`;
}

/** Parse a date string like "30-may-26" or "2026-05-30" into a comparable ISO string */
function parseFechaToISO(raw: string): string {
  if (!raw) return '';
  // Already ISO-ish: "2026-05-30"
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  // Spanish short: "30-may-26"
  const parts = raw.trim().split('-');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const monthIdx = MONTHS.indexOf(parts[1].toLowerCase());
    if (monthIdx >= 0) {
      let year = parseInt(parts[2], 10);
      if (year < 100) year += 2000;
      return `${year}-${String(monthIdx + 1).padStart(2, '0')}-${day}`;
    }
  }
  return raw;
}

interface PresupuestoSheetData {
  nombre_cliente: string;
  nombres_novios?: string;
  fecha_evento?: string | null;
  lugar_evento?: string;
  cantidad_personas?: string;
  formato?: string;
  ceremonia?: string;
  presupuesto_destinado?: string;
  total: number;
  estado: string;
}

/**
 * Sync a presupuesto to the PROYECTOS Google Sheet.
 * - Matches existing rows by NOVIOS (col B) + FECHA EVENTO (col C).
 * - If found: updates the row in place.
 * - If not found: appends a new row.
 * - After any write, sorts data rows by FECHA EVENTO ascending.
 *
 * Columns layout:
 *   A: (empty)  B: NOVIOS  C: FECHA EVENTO  D: FECHA PEDIDO
 *   E: ESTADO PRESU  F: (notes)  G: LUGAR  H: CANT PAX
 *   I: FORMATO  J: CEREMONIA  K: Presupuesto  L: ESTADO
 */
export async function syncPresupuestoToSheet(data: PresupuestoSheetData) {
  if (!SHEET_ID) {
    console.warn('[Google Sheets] GOOGLE_SHEETS_ID not set, skipping sync');
    return;
  }

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const novios = (data.nombres_novios || data.nombre_cliente || '').trim().toLowerCase();
    const fechaEventoFormatted = formatDateShort(data.fecha_evento);
    const fechaEventoISO = data.fecha_evento || '';

    // Read columns B and C to find a matching row
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${TAB_NAME}!B:C`,
    });

    const rows = existing.data.values || [];

    // Find matching row by NOVIOS + FECHA EVENTO (skip header rows)
    let matchRow = -1;
    for (let i = HEADER_ROWS; i < rows.length; i++) {
      const rowNovios = (rows[i]?.[0] || '').trim().toLowerCase();
      const rowFecha = (rows[i]?.[1] || '').trim();
      const rowFechaISO = parseFechaToISO(rowFecha);

      if (
        rowNovios && rowNovios === novios &&
        rowFechaISO === fechaEventoISO
      ) {
        matchRow = i + 1; // 1-indexed for Sheets API
        break;
      }
    }

    const rowData = [
      '',                                          // A
      data.nombres_novios || data.nombre_cliente || '', // B: NOVIOS
      fechaEventoFormatted,                        // C: FECHA EVENTO
      todayFormatted(),                            // D: FECHA PEDIDO
      ESTADO_MAP[data.estado] ?? data.estado,      // E: ESTADO PRESU
      '',                                          // F: notes
      data.lugar_evento || '',                     // G: LUGAR
      data.cantidad_personas || '',                // H: CANT PAX
      data.formato || '',                          // I: FORMATO
      data.ceremonia || '',                        // J: CEREMONIA
      data.total > 0 ? `$${Math.round(data.total).toLocaleString('es-AR')}` : '', // K
      ESTADO_MAP[data.estado] ?? data.estado,      // L: ESTADO
    ];

    if (matchRow > 0) {
      // Update existing row
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${TAB_NAME}!A${matchRow}:L${matchRow}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [rowData] },
      });
      console.log(`[Google Sheets] Updated row ${matchRow} for: ${rowData[1]}`);
    } else {
      // Append new row
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${TAB_NAME}!A:L`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [rowData] },
      });
      console.log(`[Google Sheets] Appended new row for: ${rowData[1]}`);
    }

    // Sort data rows by FECHA EVENTO (column C = index 2) ascending
    await sortSheetByFechaEvento(sheets);

  } catch (err) {
    console.error('[Google Sheets] Error syncing row:', err);
    // Don't throw — we don't want to block the main save flow
  }
}

/**
 * Sort all data rows (after header) by FECHA EVENTO column (C) ascending.
 * Uses the Sheets batchUpdate sortRange request.
 */
async function sortSheetByFechaEvento(
  sheets: ReturnType<typeof google.sheets>
) {
  if (!SHEET_ID) return;

  try {
    // First we need the sheetId (numeric) for the PROYECTOS tab
    const meta = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
      fields: 'sheets.properties',
    });

    const sheet = meta.data.sheets?.find(
      (s) => s.properties?.title === TAB_NAME
    );
    const sheetId = sheet?.properties?.sheetId ?? 0;

    // Get the total number of rows to know the sort range
    const countRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${TAB_NAME}!A:A`,
    });
    const totalRows = countRes.data.values?.length || 0;

    if (totalRows <= HEADER_ROWS + 1) return; // Nothing to sort

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            sortRange: {
              range: {
                sheetId,
                startRowIndex: HEADER_ROWS,   // Skip header rows (0-indexed)
                endRowIndex: totalRows,
                startColumnIndex: 0,          // A
                endColumnIndex: 12,           // through L
              },
              sortSpecs: [
                {
                  dimensionIndex: 2,          // Column C = FECHA EVENTO
                  sortOrder: 'ASCENDING',
                },
              ],
            },
          },
        ],
      },
    });

    console.log('[Google Sheets] Sorted by FECHA EVENTO ascending');
  } catch (err) {
    console.error('[Google Sheets] Error sorting sheet:', err);
  }
}
