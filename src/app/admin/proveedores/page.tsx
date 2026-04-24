import { supabase } from '@/lib/supabase';
import styles from './page.module.css';
import Link from 'next/link';
import { Plus, Building2, Phone, Mail } from 'lucide-react';

export const revalidate = 0; // Para que no cachee y muestre datos frescos

export default async function ProveedoresPage() {
  const { data: proveedores } = await supabase
    .from('proveedores')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Proveedores</h1>
          <p className={styles.subtitle}>Gestiona los contactos de tus galpones y servicios.</p>
        </div>
        <Link href="/admin/proveedores/nuevo" className={styles.addButton}>
          <Plus size={20} />
          Nuevo Proveedor
        </Link>
      </header>

      <div className={styles.tableContainer}>
        {proveedores && proveedores.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Contacto</th>
                <th>Datos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map(prov => (
                <tr key={prov.id}>
                  <td>
                    <div className={styles.nameCell}>
                      <Building2 size={18} className={styles.icon} />
                      {prov.nombre}
                    </div>
                  </td>
                  <td>{prov.contacto || '-'}</td>
                  <td>
                    <div className={styles.contactCell}>
                      {prov.telefono && <span className={styles.badge}><Phone size={12}/> {prov.telefono}</span>}
                      {prov.email && <span className={styles.badge}><Mail size={12}/> {prov.email}</span>}
                    </div>
                  </td>
                  <td>
                    <button className={styles.actionBtn}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>
            <Building2 size={48} className={styles.emptyIcon} />
            <h3>No hay proveedores</h3>
            <p>Comienza agregando tu primer proveedor de mobiliario o servicios.</p>
            <Link href="/admin/proveedores/nuevo" className={styles.addButton}>Agregar el primero</Link>
          </div>
        )}
      </div>
    </div>
  );
}
