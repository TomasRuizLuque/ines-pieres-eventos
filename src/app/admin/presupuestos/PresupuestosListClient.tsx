'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PenSquare, Globe, Eye, Trash2, ChevronDown, Loader2, Check } from 'lucide-react';
import styles from './page.module.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Presupuesto = any;

const estadoLabel: Record<string, string> = {
  pendiente_cotizacion: 'Pendiente',
  borrador: 'Borrador',
  listo_para_enviar: 'Listo para Enviar',
  enviado: 'Enviado',
  aprobado: 'Aprobado',
};

const fmtPrice = (n: number) => `$${Math.round(n).toLocaleString('es-AR')}`;

interface Props {
  presupuestos: Presupuesto[];
}

export default function PresupuestosListClient({ presupuestos }: Props) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Split presupuestos into "en proceso" and "armados"
  const enProceso = presupuestos.filter(
    p => p.estado === 'pendiente_cotizacion' || p.estado === 'borrador'
  );
  const armados = presupuestos.filter(
    p => p.estado === 'listo_para_enviar' || p.estado === 'enviado' || p.estado === 'aprobado'
  );

  const handleEstadoChange = async (p: Presupuesto, newEstado: string) => {
    if (newEstado === p.estado) return;

    setProcessingId(p.id);
    try {
      // Update estado
      const res = await fetch(`/api/presupuestos/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newEstado }),
      });
      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try { const body = await res.json(); msg = body.error || msg; } catch {}
        throw new Error(msg);
      }

      // If switching to "listo_para_enviar", also generate Excel
      if (newEstado === 'listo_para_enviar') {
        // Generate Excel (fire and forget download)
        const excelRes = await fetch(`/api/presupuestos/${p.id}/excel`);
        if (excelRes.ok) {
          const blob = await excelRes.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `presupuesto-${(p.nombre_cliente || 'evento').replace(/\s+/g, '-').toLowerCase()}.xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }

      setSuccessId(p.id);
      setTimeout(() => {
        setSuccessId(null);
        router.refresh();
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Error al cambiar el estado');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que querés eliminar este presupuesto?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/presupuestos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error deleting');
      router.refresh();
    } catch {
      alert('Error al eliminar');
    } finally {
      setDeletingId(null);
    }
  };

  const renderRow = (p: Presupuesto, showEstadoDropdown: boolean) => {
    const isProcessing = processingId === p.id;
    const isSuccess = successId === p.id;

    return (
      <tr key={p.id} className={p.estado === 'pendiente_cotizacion' ? styles.rowPendiente : ''}>
        <td>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <strong>{p.nombre_cliente}</strong>
            {p.origen === 'formulario_web' && (
              <span title="Desde formulario web" style={{ display: 'flex', alignItems: 'center' }}>
                <Globe size={13} color="#f59e0b" />
              </span>
            )}
          </div>
        </td>
        <td>{p.fecha_evento || '—'}</td>
        <td>{Array.isArray(p.items_json) ? p.items_json.length : 0} muebles</td>
        <td><strong>{p.total > 0 ? fmtPrice(p.total) : '—'}</strong></td>
        <td>
          {showEstadoDropdown ? (
            <div className={styles.estadoDropdownWrap}>
              {isProcessing ? (
                <span className={styles.estadoProcessing}>
                  <Loader2 size={14} className={styles.spinIcon} /> Procesando...
                </span>
              ) : isSuccess ? (
                <span className={styles.estadoSuccess}>
                  <Check size={14} /> ¡Listo!
                </span>
              ) : (
                <div className={styles.estadoSelectWrap}>
                  <select
                    className={`${styles.estadoSelect} ${styles[p.estado] || ''}`}
                    value={p.estado}
                    onChange={(e) => handleEstadoChange(p, e.target.value)}
                  >
                    <option value="borrador">Borrador</option>
                    <option value="listo_para_enviar">Listo para Enviar</option>
                  </select>
                  <ChevronDown size={12} className={styles.estadoSelectChevron} />
                </div>
              )}
            </div>
          ) : (
            <span className={`${styles.estadoBadge} ${styles[p.estado] || ''}`}>
              {estadoLabel[p.estado] || p.estado}
            </span>
          )}
        </td>
        <td>{new Date(p.created_at).toLocaleDateString('es-AR')}</td>
        <td>
          <div className={styles.actions}>
            <Link href={`/admin/presupuestos/${p.id}`} className={styles.viewBtn} title="Lectura">
              <Eye size={16} />
            </Link>
            <Link href={`/admin/presupuestos/${p.id}?edit=true`} className={styles.editBtn} title="Editar">
              <PenSquare size={16} />
            </Link>
            <button
              className={styles.deleteBtn}
              title="Eliminar"
              disabled={deletingId === p.id}
              onClick={() => handleDelete(p.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      {/* En Proceso table */}
      {enProceso.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>En Proceso</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha evento</th>
                <th>Ítems</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Creado</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {enProceso.map(p => renderRow(p, true))}
            </tbody>
          </table>
        </>
      )}

      {/* Presupuestos Armados table */}
      {armados.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>Presupuestos Armados</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha evento</th>
                <th>Ítems</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Creado</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {armados.map(p => renderRow(p, false))}
            </tbody>
          </table>
        </>
      )}

      {presupuestos.length === 0 && (
        <div className={styles.emptyState}>
          <h3>Sin presupuestos todavía</h3>
          <p>Creá tu primer presupuesto tocando el botón &quot;Nuevo Presupuesto&quot;.</p>
        </div>
      )}
    </>
  );
}
