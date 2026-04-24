import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, ClipboardList, PenSquare, Globe } from 'lucide-react';
import styles from './page.module.css';
import { deletePresupuesto } from './actions';
import DeleteButton from './DeleteButton';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PresupuestosPage() {
  const { data: presupuestos } = await supabase
    .from('presupuestos')
    .select('*')
    .order('created_at', { ascending: false });

  const list = presupuestos || [];
  const totalPresupuestos = list.length;
  const pendientesCotizacion = list.filter(p => p.estado === 'pendiente_cotizacion').length;
  const aprobados = list.filter(p => p.estado === 'aprobado').length;
  const borradores = list.filter(p => p.estado === 'borrador' || p.estado === 'enviado').length;

  const estadoLabel: Record<string, string> = {
    pendiente_cotizacion: 'Pendiente',
    borrador: 'Borrador',
    enviado: 'Enviado',
    aprobado: 'Aprobado',
  };

  const fmtPrice = (n: number) => `$${Math.round(n).toLocaleString('es-AR')}`;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1>Presupuestador</h1>
          <p>Armá y gestioná tus cotizaciones para eventos.</p>
        </div>
        <Link href="/admin/presupuestos/nuevo" className={styles.newBtn}>
          <Plus size={20} />
          Nuevo Presupuesto
        </Link>
      </header>

      <div className={styles.statsRow}>
        <div className={`${styles.statCard} ${pendientesCotizacion > 0 ? styles.statCardHighlight : ''}`}>
          <div className={styles.statLabel}>Pendientes de cotización</div>
          <div className={styles.statValue}>{pendientesCotizacion}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Borradores</div>
          <div className={styles.statValue}>{borradores}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Aprobados</div>
          <div className={styles.statValue}>{aprobados}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total</div>
          <div className={styles.statValue}>{totalPresupuestos}</div>
        </div>
      </div>

      {list.length > 0 ? (
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
            {list.map(p => {
              const deleteAction = deletePresupuesto.bind(null, p.id);
              
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
                    <span className={`${styles.estadoBadge} ${styles[p.estado] || ''}`}>
                      {estadoLabel[p.estado] || p.estado}
                    </span>
                  </td>
                  <td>{new Date(p.created_at).toLocaleDateString('es-AR')}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/presupuestos/${p.id}`} className={styles.editBtn} title="Editar">
                        <PenSquare size={16} />
                      </Link>
                      <form action={deleteAction}>
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={styles.emptyState}>
          <ClipboardList size={48} />
          <h3>Sin presupuestos todavía</h3>
          <p>Creá tu primer presupuesto tocando el botón &quot;Nuevo Presupuesto&quot;.</p>
        </div>
      )}
    </div>
  );
}
