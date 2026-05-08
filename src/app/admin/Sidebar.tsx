'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Sofa, FileText, LogOut, ChevronLeft, Menu } from 'lucide-react';
import styles from './layout.module.css';

export default function Sidebar({ logoutAction }: { logoutAction: () => void }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        {!collapsed && <div className={styles.logo}>INÉS PIERES</div>}
        <button 
          className={styles.collapseToggle} 
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expandir menú" : "Contraer menú"}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav>
        <Link href="/admin" className={styles.navLink} title={collapsed ? "Dashboard" : undefined}>
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link href="/admin/proveedores" className={styles.navLink} title={collapsed ? "Proveedores" : undefined}>
          <Users size={20} />
          {!collapsed && <span>Proveedores</span>}
        </Link>
        <Link href="/admin/inventario" className={styles.navLink} title={collapsed ? "Inventario de Muebles" : undefined}>
          <Sofa size={20} />
          {!collapsed && <span>Inventario de Muebles</span>}
        </Link>
        <Link href="/admin/presupuestos" className={styles.navLink} title={collapsed ? "Presupuestador" : undefined}>
          <FileText size={20} />
          {!collapsed && <span>Presupuestador</span>}
        </Link>
      </nav>
      <div className={styles.navBottom}>
        <form action={logoutAction} className={styles.logoutForm}>
          <button type="submit" className={styles.logoutButton} title={collapsed ? "Cerrar sesión" : undefined}>
            <LogOut size={20} />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
