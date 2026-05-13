'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PenSquare, FileText, Image as ImageIcon, FileSpreadsheet } from 'lucide-react';
import styles from './PresupuestoView.module.css';

const MARKUP_NORMAL = 0.10;
const MARKUP_FLORERIA = 2.0;
const IVA_BASE_PERCENT = 0.30;
const IVA_RATE = 0.21;
const GALPON_NAME = 'Galpón Pueyrredón';

const getMarkup = (b: BudgetLineItem) => {
  const cat = b.categoria ? b.categoria.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "") : '';
  if (cat === 'floreria' || b.proveedor === 'Ines Pieres') return MARKUP_FLORERIA;
  return MARKUP_NORMAL;
};

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

interface PresupuestoRecord {
  id: string;
  nombre_cliente: string;
  email_cliente?: string;
  telefono_cliente?: string;
  fecha_evento?: string;
  lugar_evento?: string;
  estado?: string;
  total?: number;
  subtotal?: number;
  iva?: number;
  cantidad_personas?: string;
  items_json: BudgetLineItem[];
  config_json?: {
    ivaActivo?: boolean;
    comisionSalon?: { activa: boolean; tipo: string; valor: number };
    comisionPlanner?: { activa: boolean; valor: number };
    _comisionSalonAmt?: number;
    _comisionPlannerAmt?: number;
    sections?: Section[];
  };
  origen?: string;
  nombres_novios?: string;
  ceremonia?: string;
  formato?: string;
  estilo?: string;
  presupuesto_destinado?: string;
  links_inspiracion?: string;
  mensaje_adicional?: string;
  created_at?: string;
}

interface Props {
  presupuesto: PresupuestoRecord;
  onEdit: () => void;
}

const isGeneric = (id: string) => id.startsWith('gen-');

function deriveSections(pres: PresupuestoRecord): Section[] {
  const saved = pres.config_json?.sections;
  if (saved?.length) return saved;
  const items = Array.isArray(pres.items_json) ? pres.items_json : [];
  if (!items.length) return [];
  const maxId = Math.max(1, ...items.map(i => i.living ?? 1));
  return [
    { id: 0, name: 'General', group: 'Salón', isLiving: false },
    ...Array.from({ length: maxId }, (_, i) => ({
      id: i + 1,
      name: `Living ${i + 1}`,
      group: 'Salón' as SectionGroup,
      isLiving: true,
    })),
  ];
}

const ESTADO_LABELS: Record<string, string> = {
  pendiente_cotizacion: 'Pendiente',
  borrador: 'Borrador',
  listo_para_enviar: 'Listo para Enviar',
  enviado: 'Enviado',
  aprobado: 'Aprobado',
};

export default function PresupuestoView({ presupuesto, onEdit }: Props) {
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [generatingExcel, setGeneratingExcel] = useState(false);
  const [isUpdatingEstado, setIsUpdatingEstado] = useState(false);

  const fmtPrice = (n: number) => `$${Math.round(n).toLocaleString('es-AR')}`;

  const items: BudgetLineItem[] = Array.isArray(presupuesto.items_json)
    ? presupuesto.items_json.map(i => ({ ...i, living: i.living ?? 1 }))
    : [];

  const sections = deriveSections(presupuesto);
  const cfg = presupuesto.config_json;

  // Recalculate totals from items (more accurate than stored values)
  const subtotalCatalogo = items
    .filter(b => !isGeneric(b.id))
    .reduce((sum, b) => sum + b.precio_unitario * b.cantidad * (1 + getMarkup(b)), 0);

  const subtotalGenericos = items
    .filter(b => isGeneric(b.id))
    .reduce((sum, b) => sum + b.precio_unitario * b.cantidad * (1 + getMarkup(b)), 0);

  const subtotalGalpon = items
    .filter(b => !isGeneric(b.id) && b.proveedor === GALPON_NAME)
    .reduce((sum, b) => sum + b.precio_unitario * b.cantidad * (1 + getMarkup(b)), 0);

  const iva = subtotalGalpon * IVA_BASE_PERCENT * IVA_RATE;
  const ivaActivo = cfg?.ivaActivo !== false;
  const baseTotal = subtotalCatalogo + subtotalGenericos + (ivaActivo ? iva : 0);

  const comisionSalonAmt = cfg?._comisionSalonAmt ?? 0;
  const comisionPlannerAmt = cfg?._comisionPlannerAmt ?? 0;
  const total = presupuesto.total ?? (baseTotal + comisionSalonAmt + comisionPlannerAmt);

  const gananciaEstimada = items
    .reduce((sum, b) => sum + b.precio_unitario * b.cantidad * getMarkup(b), 0);

  const hasGalpon = items.some(b => !isGeneric(b.id) && b.proveedor === GALPON_NAME);

  const estado = presupuesto.estado || 'borrador';

  const handleGeneratePdf = async () => {
    setGeneratingPdf(true);
    try {
      const res = await fetch(`/api/presupuestos/${presupuesto.id}/pdf`);
      if (!res.ok) { alert('Error generando el PDF'); return; }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `presupuesto-${presupuesto.nombre_cliente.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch { alert('Error de conexión al generar PDF'); }
    finally { setGeneratingPdf(false); }
  };

  const handleGenerateExcel = async () => {
    setGeneratingExcel(true);
    try {
      const res = await fetch(`/api/presupuestos/${presupuesto.id}/excel`);
      if (!res.ok) { alert('Error generando el Excel'); return; }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `presupuesto-${presupuesto.nombre_cliente.replace(/\s+/g, '-').toLowerCase()}.xlsx`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch { alert('Error de conexión al generar Excel'); }
    finally { setGeneratingExcel(false); }
  };

  const handleChangeEstado = async (newEstado: string) => {
    setIsUpdatingEstado(true);
    try {
      const res = await fetch(`/api/presupuestos/${presupuesto.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newEstado }),
      });
      if (!res.ok) throw new Error();
      window.location.reload();
    } catch {
      alert('Error al actualizar el estado');
    } finally {
      setIsUpdatingEstado(false);
    }
  };

  const GROUPS: SectionGroup[] = ['Ceremonia', 'Recepción', 'Salón'];

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <Link href="/admin/presupuestos" className={styles.backLink}>
          <ArrowLeft size={14} /> Lista
        </Link>
        <select 
          className={`${styles.estadoSelect} ${styles[estado] || styles.borrador}`}
          value={estado}
          onChange={(e) => handleChangeEstado(e.target.value)}
          disabled={isUpdatingEstado}
        >
          {Object.entries(ESTADO_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
        <div className={styles.rightActions}>
          <button
            className={styles.pdfBtn}
            onClick={handleGenerateExcel}
            disabled={generatingExcel || items.length === 0}
          >
            <FileSpreadsheet size={14} />
            {generatingExcel ? 'Generando...' : 'Armar Excel'}
          </button>
          <button
            className={styles.pdfBtn}
            onClick={handleGeneratePdf}
            disabled={generatingPdf || items.length === 0}
          >
            <FileText size={14} />
            {generatingPdf ? 'Generando...' : 'PDF'}
          </button>
          <button className={styles.editBtn} onClick={onEdit}>
            <PenSquare size={14} /> Editar
          </button>
        </div>
      </div>

      {/* Info grid */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <p className={styles.infoCardTitle}>Cliente</p>
          <p className={styles.clientName}>{presupuesto.nombre_cliente}</p>
          {presupuesto.email_cliente && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{presupuesto.email_cliente}</span>
            </div>
          )}
          {presupuesto.telefono_cliente && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Teléfono</span>
              <span className={styles.infoValue}>{presupuesto.telefono_cliente}</span>
            </div>
          )}
          {presupuesto.fecha_evento && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Fecha del evento</span>
              <span className={styles.infoValue}>
                {new Date(presupuesto.fecha_evento + 'T00:00:00').toLocaleDateString('es-AR', {
                  weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
                })}
              </span>
            </div>
          )}
          {presupuesto.lugar_evento && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Lugar</span>
              <span className={styles.infoValue}>{presupuesto.lugar_evento}</span>
            </div>
          )}
          {presupuesto.cantidad_personas && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Personas</span>
              <span className={styles.infoValue}>{presupuesto.cantidad_personas}</span>
            </div>
          )}
        </div>

        <div className={styles.totalsCard}>
          <p className={styles.infoCardTitle}>Totales</p>
          {subtotalCatalogo > 0 && (
            <div className={styles.totalRow}>
              <span>Muebles (con markup)</span>
              <span>{fmtPrice(subtotalCatalogo)}</span>
            </div>
          )}
          {subtotalGenericos > 0 && (
            <div className={styles.totalRow}>
              <span>Genéricos</span>
              <span>{fmtPrice(subtotalGenericos)}</span>
            </div>
          )}
          {hasGalpon && (
            <div className={styles.totalRow}>
              <span>IVA (21% s/ 30%) {!ivaActivo && '(desactivado)'}</span>
              <span className={ivaActivo ? '' : styles.disabledValue}>{fmtPrice(iva)}</span>
            </div>
          )}
          <hr className={styles.totalDivider} />
          <div className={styles.totalRowBold}>
            <span>Subtotal</span>
            <span>{fmtPrice(baseTotal)}</span>
          </div>
          {comisionSalonAmt > 0 && (
            <div className={styles.totalRow}>
              <span>Com. Salón</span>
              <span>{fmtPrice(comisionSalonAmt)}</span>
            </div>
          )}
          {comisionPlannerAmt > 0 && (
            <div className={styles.totalRow}>
              <span>Com. Planner</span>
              <span>{fmtPrice(comisionPlannerAmt)}</span>
            </div>
          )}
          <hr className={styles.totalDivider} />
          <div className={styles.grandTotal}>
            <span>TOTAL</span>
            <span>{fmtPrice(total)}</span>
          </div>
          {gananciaEstimada > 0 && (
            <div className={styles.gananciaRow}>
              <span>Ganancia estimada (markup)</span>
              <span>{fmtPrice(gananciaEstimada)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Items by section */}
      {items.length > 0 && (
        <div className={styles.itemsSection}>
          <p className={styles.itemsTitle}>{items.length} ítem{items.length !== 1 ? 's' : ''}</p>
          {GROUPS.map(group => {
            const groupSections = sections.filter(s => s.group === group);
            if (!groupSections.length) return null;
            const hasAnyItems = groupSections.some(s => items.some(i => i.living === s.id));
            if (!hasAnyItems) return null;
            return (
              <div key={group} className={styles.eventGroup}>
                <div className={styles.eventGroupHeader}>{group}</div>
                {groupSections.map(section => {
                  const sectionItems = items.filter(i => i.living === section.id);
                  return (
                    <div key={section.id} className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <span className={styles.sectionName}>{section.name}</span>
                        <span className={styles.sectionCount}>{sectionItems.length} ítem{sectionItems.length !== 1 ? 's' : ''}</span>
                      </div>
                      {sectionItems.length === 0 ? (
                        <p className={styles.emptySection}>Sin ítems</p>
                      ) : (
                        sectionItems.map(item => {
                          const subtotal = item.precio_unitario * item.cantidad * (1 + getMarkup(item));
                          return (
                            <div key={`${item.id}-${item.living}`} className={styles.itemRow}>
                              {!isGeneric(item.id) && item.url_imagen ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={item.url_imagen} alt={item.nombre} className={styles.itemImg} />
                              ) : (
                                <div className={`${styles.itemNoImg} ${isGeneric(item.id) ? styles.itemNoImgGeneric : ''}`}>
                                  {isGeneric(item.id) ? <span className={styles.genDot} /> : <ImageIcon size={14} />}
                                </div>
                              )}
                              <div className={styles.itemInfo}>
                                <p className={styles.itemName}>{item.nombre}</p>
                                <p className={styles.itemProvider}>{isGeneric(item.id) ? 'Genérico' : item.proveedor}</p>
                              </div>
                              <span className={styles.itemQty}>× {item.cantidad}</span>
                              <span className={styles.itemPrice}>{fmtPrice(subtotal)}</span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
