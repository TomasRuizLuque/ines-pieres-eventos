import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import styles from './page.module.css';
import PresupuestosListClient from './PresupuestosListClient';

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
  const enProceso = list.filter(p => p.estado === 'borrador' || p.estado === 'pendiente_cotizacion').length;
  const armados = list.filter(p => p.estado === 'listo_para_enviar' || p.estado === 'enviado' || p.estado === 'aprobado').length;

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
          <div className={styles.statLabel}>En Proceso</div>
          <div className={styles.statValue}>{enProceso}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Armados</div>
          <div className={styles.statValue}>{armados}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total</div>
          <div className={styles.statValue}>{totalPresupuestos}</div>
        </div>
      </div>

      <PresupuestosListClient presupuestos={list} />
    </div>
  );
}
