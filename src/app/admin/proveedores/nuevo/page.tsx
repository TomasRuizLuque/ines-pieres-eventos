import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import styles from './page.module.css';

export default function NuevoProveedor() {
  async function addProvider(formData: FormData) {
    'use server';
    
    const nombre = formData.get('nombre') as string;
    const contacto = formData.get('contacto') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string;
    const notas = formData.get('notas') as string;

    const { error } = await supabase.from('proveedores').insert([{
      nombre,
      contacto,
      email,
      telefono,
      notas
    }]);

    if (!error) {
      // Forzamos el refresco de cache en Next.js para que la lista muestre al nuevo
      revalidatePath('/admin/proveedores');
      redirect('/admin/proveedores');
    } else {
      console.error(error);
      // Idealmente, se podría retornar un error state al React component, pero para ir rápido:
      throw new Error("Error al guardar proveedor");
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <Link href="/admin/proveedores" className={styles.backButton}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className={styles.title}>Nuevo Proveedor</h1>
            <p className={styles.subtitle}>Agregá un galpón o empresa de servicios a tu catálogo.</p>
          </div>
        </div>
      </header>

      <div className={styles.formCard}>
        <form action={addProvider} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="nombre">Nombre de la Empresa / Galpón *</label>
            <input type="text" id="nombre" name="nombre" required placeholder="Ej: Ambientaciones BA" />
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="contacto">Nombre del Contacto</label>
              <input type="text" id="contacto" name="contacto" placeholder="Ej: Juana Gomez" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="telefono">Teléfono / WhatsApp</label>
              <input type="tel" id="telefono" name="telefono" placeholder="+54 9 11 ..." />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="contacto@empresa.com" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="notas">Notas (Condiciones, flete, etc.)</label>
            <textarea id="notas" name="notas" rows={4} placeholder="Ej: Cobran 10% extra por flete a Pilar..."></textarea>
          </div>

          <div className={styles.actions}>
            <Link href="/admin/proveedores" className={styles.cancelBtn}>Cancelar</Link>
            <button type="submit" className={styles.saveBtn}>
              <Save size={18} />
              Guardar Proveedor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
