import { supabase } from '@/lib/supabase';
import styles from './page.module.css';
import { Users, Sofa, FileText, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Ejemplos de consultas usando la BD recién creada
  const { count: providersCount } = await supabase.from('proveedores').select('*', { count: 'exact', head: true });
  const { count: itemsCount } = await supabase.from('items').select('*', { count: 'exact', head: true });
  
  // En caso de que la tabla budgets no exista aún porque no pase el script completo
  let budgetsCount = 0;
  try {
    const res = await supabase.from('budgets').select('*', { count: 'exact', head: true });
    budgetsCount = res.count || 0;
  } catch (e) {
    budgetsCount = 0;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Panel de Control</h1>
        <p className={styles.subtitle}>Resumen del estado de tus ambientaciones y proveedores.</p>
      </header>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Proveedores Activos</span>
            <Users className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statValue}>{providersCount || 0}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Muebles en Catálogo</span>
            <Sofa className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statValue}>{itemsCount || 0}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Presupuestos Armados</span>
            <FileText className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statValue}>{budgetsCount || 0}</div>
        </div>

        <div className={styles.statCard}>
           <div className={styles.statHeader}>
            <span className={styles.statTitle}>Ingresos Estimados</span>
            <TrendingUp className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statValue}>$0</div>
        </div>
      </div>
      
      <div className={styles.recentSection}>
        <h2>Actividad Reciente</h2>
        <div className={styles.emptyState}>
          <p>Tu sistema está limpio y listo para empezar a trabajar.</p>
          <p>Ve a "Proveedores" para cargar el primero.</p>
        </div>
      </div>
    </div>
  );
}
