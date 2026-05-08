'use client';

import { useState } from 'react';
import PresupuestoBuilder from '../nuevo/PresupuestoBuilder';
import PresupuestoView from './PresupuestoView';

interface CatalogItem {
  id: string;
  nombre: string;
  precio_costo: number;
  url_imagen: string | null;
  proveedores?: { nombre: string };
  categorias?: { nombre: string };
  descripcion?: string;
}

interface Props {
  items: CatalogItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  presupuesto: any;
}

export default function PresupuestoPageClient({ items, presupuesto }: Props) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  if (mode === 'edit') {
    return (
      <PresupuestoBuilder
        items={items}
        initialData={{
          id: presupuesto.id,
          nombre_cliente: presupuesto.nombre_cliente,
          email_cliente: presupuesto.email_cliente || '',
          telefono_cliente: presupuesto.telefono_cliente || '',
          fecha_evento: presupuesto.fecha_evento || '',
          lugar_evento: presupuesto.lugar_evento || '',
          estado: presupuesto.estado,
          items_json: Array.isArray(presupuesto.items_json) ? presupuesto.items_json : [],
          config_json: presupuesto.config_json || undefined,
          origen: presupuesto.origen || 'manual',
          nombres_novios: presupuesto.nombres_novios || '',
          cantidad_personas: presupuesto.cantidad_personas || '',
          ceremonia: presupuesto.ceremonia || '',
          formato: presupuesto.formato || '',
          estilo: presupuesto.estilo || '',
          presupuesto_destinado: presupuesto.presupuesto_destinado || '',
          links_inspiracion: presupuesto.links_inspiracion || '',
          mensaje_adicional: presupuesto.mensaje_adicional || '',
        }}
      />
    );
  }

  return <PresupuestoView presupuesto={presupuesto} onEdit={() => setMode('edit')} />;
}
