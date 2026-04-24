import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import fs from 'fs';
import path from 'path';

// ── Resolve logo as base64 data URI (embedded in PDF) ──
const logoFilePath = path.resolve(process.cwd(), 'public/images/Logos Ines Pieres/2.png');
let LOGO_DATA_URI = '';
try {
  const logoBuffer = fs.readFileSync(logoFilePath);
  LOGO_DATA_URI = `data:image/png;base64,${logoBuffer.toString('base64')}`;
} catch (e) {
  console.warn('Could not load logo for PDF');
}

// ── Color palette ──
const COLORS = {
  black: '#1a1a1a',
  darkGray: '#2d2d2d',
  gray: '#6b6b6b',
  lightGray: '#e8e3de',
  cream: '#f9f6f1',
  accent: '#8B7355',
  white: '#ffffff',
};

// ── Styles ──
const styles = StyleSheet.create({
  page: { backgroundColor: COLORS.white, fontFamily: 'Helvetica' },

  coverPage: {
    backgroundColor: COLORS.black,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    height: '100%',
  },
  coverLogo: { width: 280, marginBottom: 50 },
  coverDivider: { width: 60, height: 1, backgroundColor: COLORS.accent, marginBottom: 35, marginTop: 0 },
  coverSubtitle: { fontSize: 10, color: COLORS.lightGray, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 60 },
  coverClientBlock: { borderWidth: 1, borderColor: COLORS.accent, padding: 30, alignItems: 'center', width: '80%' },
  coverClientLabel: { fontSize: 7, color: COLORS.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 },
  coverClientName: { fontSize: 22, color: COLORS.white, letterSpacing: 2, fontFamily: 'Helvetica-Bold', marginBottom: 6 },
  coverEventDetails: { fontSize: 9, color: COLORS.lightGray, letterSpacing: 1, marginTop: 4 },
  coverFooter: { position: 'absolute', bottom: 30, fontSize: 8, color: COLORS.gray, letterSpacing: 2 },

  sectionPage: {
    backgroundColor: COLORS.cream,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    height: '100%',
  },
  sectionTitle: { fontSize: 28, color: COLORS.black, letterSpacing: 6, textTransform: 'uppercase', fontFamily: 'Helvetica-Bold' },
  sectionLine: { width: 40, height: 2, backgroundColor: COLORS.accent, marginTop: 16 },

  productPage: { padding: 0, backgroundColor: COLORS.white, display: 'flex', flexDirection: 'column' },
  productHalf: { flex: 1, display: 'flex', flexDirection: 'column', borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  productHalfLast: { flex: 1, display: 'flex', flexDirection: 'column' },
  productImage: { width: '100%', flex: 1, objectFit: 'cover' },
  productImagePlaceholder: { flex: 1, backgroundColor: COLORS.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  productImagePlaceholderText: { color: COLORS.lightGray, fontSize: 10, letterSpacing: 2 },
  productInfoBar: {
    padding: '8 20',
    backgroundColor: COLORS.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  productName: { fontSize: 9, color: COLORS.darkGray, fontFamily: 'Helvetica-Bold', letterSpacing: 1, textTransform: 'uppercase', flex: 1 },
  productQty: { fontSize: 8, color: COLORS.accent, letterSpacing: 1, fontFamily: 'Helvetica-Bold', marginLeft: 10 },
  productProvider: { fontSize: 7, color: COLORS.gray, letterSpacing: 1 },

  closingPage: {
    backgroundColor: COLORS.cream,
    padding: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  closingLogoSmall: { width: 120, marginBottom: 40, opacity: 0.6 },
  closingDivider: { width: 60, height: 1, backgroundColor: COLORS.accent, marginBottom: 40 },
  closingLabel: { fontSize: 9, color: COLORS.gray, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 },
  closingAmount: { fontSize: 42, color: COLORS.black, fontFamily: 'Helvetica-Bold', letterSpacing: 2, marginBottom: 8 },
  closingApprox: { fontSize: 9, color: COLORS.gray, letterSpacing: 3, marginBottom: 50, textTransform: 'uppercase' },
  closingBreakdownBox: {
    width: 320,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    padding: 24,
    marginBottom: 50,
  },
  closingBreakdownTitle: { fontSize: 7, color: COLORS.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14, fontFamily: 'Helvetica-Bold' },
  closingBreakdownRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  closingBreakdownLabel: { fontSize: 8, color: COLORS.gray, letterSpacing: 1 },
  closingBreakdownValue: { fontSize: 8, color: COLORS.darkGray, fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  closingBreakdownDivider: { height: 1, backgroundColor: COLORS.lightGray, marginVertical: 8 },
  closingContact: { fontSize: 8, color: COLORS.gray, letterSpacing: 2, marginBottom: 4, textTransform: 'uppercase' },
  closingTagline: { fontSize: 7, color: COLORS.lightGray, letterSpacing: 3, textTransform: 'uppercase', position: 'absolute', bottom: 30 },

  pageNumber: { position: 'absolute', bottom: 14, right: 30, fontSize: 7, color: COLORS.lightGray, letterSpacing: 2 },
});

// ── Types ──
interface BudgetItem {
  id: string;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  proveedor: string;
  url_imagen: string | null;
  living?: number;
}

interface BudgetConfig {
  ivaActivo?: boolean;
  comisionSalon?: { activa: boolean; tipo: 'porcentaje' | 'por_pax'; valor: number };
  comisionPlanner?: { activa: boolean; valor: number };
  _comisionSalonAmt?: number;
  _comisionPlannerAmt?: number;
}

interface Presupuesto {
  id: string;
  nombre_cliente: string;
  email_cliente?: string;
  telefono_cliente?: string;
  fecha_evento?: string;
  lugar_evento?: string;
  items_json: BudgetItem[];
  subtotal: number;
  flete: number;
  iva: number;
  total: number;
  config_json?: BudgetConfig;
}

// ── Helpers ──
const fmtPrice = (n: number) => `$${Math.round(n).toLocaleString('es-AR')}`;

function chunks<T>(arr: T[], n: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
  return result;
}

const getSectionLabel = (living: number) =>
  living === 0 ? 'General' : `Living ${living}`;

// ── Component ──
export function PresupuestoPdf({ presupuesto }: { presupuesto: Presupuesto }) {
  const allItems: BudgetItem[] = Array.isArray(presupuesto.items_json)
    ? presupuesto.items_json
    : [];

  // Normalize living field (backward compat)
  const normalized = allItems.map(i => ({ ...i, living: i.living ?? 1 }));

  // Separate catalog (with photos) from generic items
  const catalogItems = normalized.filter(i => !i.id.startsWith('gen-'));
  const genericItems  = normalized.filter(i =>  i.id.startsWith('gen-'));

  // Distinct living numbers present in catalog items
  const livingNumbers = [...new Set(catalogItems.map(i => i.living))].sort((a, b) => a - b);
  const multiLiving = livingNumbers.length > 1;

  // Recalculate subtotals for breakdown display
  const subtotalCatalogo = catalogItems.reduce((s, i) => s + i.precio_unitario * i.cantidad * 1.1, 0);
  const subtotalGenericos = genericItems.reduce((s, i) => s + i.precio_unitario * i.cantidad, 0);

  // Config with defaults
  const cfg = presupuesto.config_json ?? {};
  const ivaActivo       = cfg.ivaActivo !== false;
  const salonActiva     = cfg.comisionSalon?.activa !== false;
  const plannerActiva   = cfg.comisionPlanner?.activa !== false;
  const salonValor      = cfg.comisionSalon?.valor ?? 10;
  const salonTipo       = cfg.comisionSalon?.tipo ?? 'porcentaje';
  const plannerValor    = cfg.comisionPlanner?.valor ?? 10;

  // Use stored computed amounts to avoid recalculation issues (especially for $/pax mode)
  const comisionSalonAmt   = cfg._comisionSalonAmt ?? 0;
  const comisionPlannerAmt = cfg._comisionPlannerAmt ?? 0;

  const baseTotal = subtotalCatalogo + subtotalGenericos + (ivaActivo ? presupuesto.iva : 0);

  return (
    <Document
      title={`Presupuesto - ${presupuesto.nombre_cliente}`}
      author="Inés Pieres Eventos"
      subject="Presupuesto de Muebles y Ambientación"
    >
      {/* ══════════════ PORTADA ══════════════ */}
      <Page size="A4" style={styles.coverPage}>
        <Image src={LOGO_DATA_URI} style={styles.coverLogo} />
        <View style={styles.coverDivider} />
        <Text style={styles.coverSubtitle}>Propuesta de Ambientación</Text>
        <View style={styles.coverClientBlock}>
          <Text style={styles.coverClientLabel}>Preparado para</Text>
          <Text style={styles.coverClientName}>{presupuesto.nombre_cliente}</Text>
          {presupuesto.fecha_evento && (
            <Text style={styles.coverEventDetails}>
              {presupuesto.fecha_evento}
              {presupuesto.lugar_evento ? `  ·  ${presupuesto.lugar_evento}` : ''}
            </Text>
          )}
        </View>
        <Text style={styles.coverFooter}>INÉS PIERES EVENTOS  ·  BUENOS AIRES</Text>
      </Page>

      {/* ══════════════ PÁGINAS POR LIVING ══════════════ */}
      {livingNumbers.length > 0
        ? livingNumbers.map(n => {
            const itemsForLiving = catalogItems.filter(i => i.living === n);
            const pairs = chunks(itemsForLiving, 2);

            return [
              // Section page only when multiple livings
              multiLiving ? (
                <Page key={`section-${n}`} size="A4" style={styles.sectionPage}>
                  <Text style={styles.sectionTitle}>{getSectionLabel(n)}</Text>
                  <View style={styles.sectionLine} />
                </Page>
              ) : null,

              // Product pages for this living
              ...pairs.map((pair, pageIdx) => (
                <Page key={`living-${n}-p${pageIdx}`} size="A4" style={styles.productPage}>
                  {pair.map((item, idx) => {
                    const isLast = idx === pair.length - 1 && pair.length < 2;
                    const containerStyle = isLast ? styles.productHalfLast : styles.productHalf;
                    return (
                      <View key={`${item.id}-${item.living}`} style={containerStyle}>
                        {item.url_imagen ? (
                          <Image src={item.url_imagen} style={styles.productImage} />
                        ) : (
                          <View style={styles.productImagePlaceholder}>
                            <Text style={styles.productImagePlaceholderText}>INÉS PIERES EVENTOS</Text>
                          </View>
                        )}
                        <View style={styles.productInfoBar}>
                          <View style={{ flex: 1, paddingRight: 10 }}>
                            <Text style={styles.productName}>{item.nombre}</Text>
                            <Text style={styles.productProvider}>{item.proveedor}</Text>
                          </View>
                          <Text style={styles.productQty}>×{item.cantidad}</Text>
                        </View>
                      </View>
                    );
                  })}
                  <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                  />
                </Page>
              )),
            ].filter(Boolean);
          })
        : null
      }

      {/* ══════════════ PÁGINA FINAL: TOTAL ══════════════ */}
      <Page size="A4" style={styles.closingPage}>
        <Image src={LOGO_DATA_URI} style={styles.closingLogoSmall} />
        <View style={styles.closingDivider} />
        <Text style={styles.closingLabel}>Inversión estimada</Text>
        <Text style={styles.closingAmount}>{fmtPrice(presupuesto.total)}</Text>
        <Text style={styles.closingApprox}>Presupuesto Aproximado</Text>

        <View style={styles.closingBreakdownBox}>
          <Text style={styles.closingBreakdownTitle}>Desglose</Text>

          {subtotalCatalogo > 0 && (
            <View style={styles.closingBreakdownRow}>
              <Text style={styles.closingBreakdownLabel}>Mobiliario y ambientación</Text>
              <Text style={styles.closingBreakdownValue}>{fmtPrice(subtotalCatalogo)}</Text>
            </View>
          )}

          {subtotalGenericos > 0 && (
            <View style={styles.closingBreakdownRow}>
              <Text style={styles.closingBreakdownLabel}>Accesorios y logística</Text>
              <Text style={styles.closingBreakdownValue}>{fmtPrice(subtotalGenericos)}</Text>
            </View>
          )}

          {/* Backward compat: old presupuestos with flete in separate field */}
          {presupuesto.flete > 0 && subtotalGenericos === 0 && (
            <View style={styles.closingBreakdownRow}>
              <Text style={styles.closingBreakdownLabel}>Flete y mano de obra</Text>
              <Text style={styles.closingBreakdownValue}>{fmtPrice(presupuesto.flete)}</Text>
            </View>
          )}

          {ivaActivo && presupuesto.iva > 0 && (
            <View style={styles.closingBreakdownRow}>
              <Text style={styles.closingBreakdownLabel}>IVA</Text>
              <Text style={styles.closingBreakdownValue}>{fmtPrice(presupuesto.iva)}</Text>
            </View>
          )}

          {(salonActiva || plannerActiva) && (
            <View style={styles.closingBreakdownDivider} />
          )}

          {(subtotalCatalogo > 0 || subtotalGenericos > 0) && (salonActiva || plannerActiva) && (
            <View style={styles.closingBreakdownRow}>
              <Text style={styles.closingBreakdownLabel}>Subtotal</Text>
              <Text style={styles.closingBreakdownValue}>{fmtPrice(baseTotal)}</Text>
            </View>
          )}

          {salonActiva && comisionSalonAmt > 0 && (
            <View style={styles.closingBreakdownRow}>
              <Text style={styles.closingBreakdownLabel}>
                {`Comisión Salón${salonTipo === 'porcentaje' ? ` (${salonValor}%)` : ''}`}
              </Text>
              <Text style={styles.closingBreakdownValue}>{fmtPrice(comisionSalonAmt)}</Text>
            </View>
          )}

          {plannerActiva && comisionPlannerAmt > 0 && (
            <View style={styles.closingBreakdownRow}>
              <Text style={styles.closingBreakdownLabel}>{`Comisión Planner (${plannerValor}%)`}</Text>
              <Text style={styles.closingBreakdownValue}>{fmtPrice(comisionPlannerAmt)}</Text>
            </View>
          )}

          <View style={styles.closingBreakdownDivider} />

          <View style={styles.closingBreakdownRow}>
            <Text style={[styles.closingBreakdownLabel, { fontFamily: 'Helvetica-Bold', color: '#1a1a1a' }]}>
              TOTAL
            </Text>
            <Text style={[styles.closingBreakdownValue, { fontSize: 10 }]}>
              {fmtPrice(presupuesto.total)}
            </Text>
          </View>
        </View>

        <Text style={styles.closingContact}>contacto@inespiereseventos.com</Text>
        <Text style={styles.closingContact}>+54 11 · Buenos Aires, Argentina</Text>
        <Text style={styles.closingTagline}>AMBIENTACIÓN · DISEÑO · EXPERIENCIAS ÚNICAS</Text>
      </Page>
    </Document>
  );
}
