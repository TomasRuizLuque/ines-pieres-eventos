'use client';

import { Trash2 } from 'lucide-react';
import styles from './page.module.css';

export default function DeleteButton() {
  return (
    <button 
      type="submit" 
      className={styles.deleteBtn} 
      title="Eliminar" 
      onClick={(e) => {
        if (!confirm('¿Estás seguro de eliminar este presupuesto?')) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 size={16} />
    </button>
  );
}
