import Link from 'next/link';
import { LayoutDashboard, Users, Sofa, FileText, Settings, LogOut } from 'lucide-react';
import styles from './layout.module.css';
import { logout } from '@/app/login/actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>INÉS PIERES Admin</div>
        <nav>
          <Link href="/admin" className={styles.navLink}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/proveedores" className={styles.navLink}>
            <Users size={20} />
            <span>Proveedores</span>
          </Link>
          <Link href="/admin/inventario" className={styles.navLink}>
            <Sofa size={20} />
            <span>Inventario de Muebles</span>
          </Link>
          <Link href="/admin/presupuestos" className={styles.navLink}>
            <FileText size={20} />
            <span>Presupuestador</span>
          </Link>
        </nav>
        <div className={styles.navBottom}>
          <form action={logout} className={styles.logoutForm}>
            <button type="submit" className={styles.logoutButton}>
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </button>
          </form>
        </div>
      </aside>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
