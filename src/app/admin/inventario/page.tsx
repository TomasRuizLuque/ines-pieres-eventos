import { supabase } from '@/lib/supabase';
import styles from './page.module.css';
import Link from 'next/link';
import { Plus, Search, Filter, Image as ImageIcon } from 'lucide-react';
import InventarioClient from './InventarioClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InventarioPage() {
  const { data: items } = await supabase
    .from('items')
    .select(`
      *,
      categorias ( nombre ),
      proveedores ( nombre )
    `)
    .order('created_at', { ascending: false });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Inventario de Muebles</h1>
          <p className={styles.subtitle}>Catálogo general de equipamiento para armar presupuestos.</p>
        </div>
        <Link href="/admin/inventario/nuevo" className={styles.addButton}>
          <Plus size={20} />
          Nuevo Ítem
        </Link>
      </header>

        <InventarioClient items={items || []} />
    </div>
  );
}
