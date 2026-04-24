'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';
import { Search, Filter, Image as ImageIcon, X } from 'lucide-react';
import { LINEAS_DE_PRODUCTO, MUEBLES_DE_PRODUCTO } from '@/lib/catalog-constants';

interface InventarioClientProps {
  items: any[];
}

function parseMeta(item: any) {
  try {
    if (item.descripcion) {
      return typeof item.descripcion === 'string' ? JSON.parse(item.descripcion) : item.descripcion;
    }
  } catch (e) {}
  return {};
}

export default function InventarioClient({ items }: InventarioClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState<string | null>(null);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null);
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [selectedLinea, setSelectedLinea] = useState<string | null>(null);
  const [selectedMueble, setSelectedMueble] = useState<string | null>(null);

  // Extract unique providers
  const proveedores = useMemo(() => {
    const set = new Set<string>();
    items.forEach(item => {
      if (item.proveedores?.nombre) set.add(item.proveedores.nombre);
    });
    return Array.from(set).sort();
  }, [items]);

  // Extract unique categories
  const categorias = useMemo(() => {
    const set = new Set<string>();
    items.forEach(item => {
      if (item.categorias?.nombre) set.add(item.categorias.nombre);
    });
    return Array.from(set).sort();
  }, [items]);

  // Extract unique tipos dynamically (less structured than linea/mueble)
  const tipos = useMemo(() => {
    const t = new Set<string>();
    items.forEach(item => {
      const meta = parseMeta(item);
      if (meta.tipo) t.add(meta.tipo);
    });
    return Array.from(t).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search
      const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.proveedores?.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Provider
      const matchesProveedor = selectedProveedor ? item.proveedores?.nombre === selectedProveedor : true;

      // Category
      const matchesCategoria = selectedCategoria ? item.categorias?.nombre === selectedCategoria : true;

      // Galpón-specific metadata filters
      const meta = parseMeta(item);
      const matchesTipo = selectedTipo ? meta.tipo === selectedTipo : true;
      const matchesLinea = selectedLinea ? meta.linea === selectedLinea : true;
      const matchesMueble = selectedMueble ? meta.mueble === selectedMueble : true;

      return matchesSearch && matchesProveedor && matchesCategoria && matchesTipo && matchesLinea && matchesMueble;
    });
  }, [items, searchTerm, selectedProveedor, selectedCategoria, selectedTipo, selectedLinea, selectedMueble]);

  let activeFiltersCount = 0;
  if (selectedProveedor) activeFiltersCount++;
  if (selectedCategoria) activeFiltersCount++;
  if (selectedTipo) activeFiltersCount++;
  if (selectedLinea) activeFiltersCount++;
  if (selectedMueble) activeFiltersCount++;

  const clearAllFilters = () => {
    setSelectedProveedor(null);
    setSelectedCategoria(null);
    setSelectedTipo(null);
    setSelectedLinea(null);
    setSelectedMueble(null);
    setSearchTerm('');
  };

  return (
    <>
      <div className={styles.filtersSection}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, proveedor..." 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          className={`${styles.filterBtn} ${showFilters || activeFiltersCount > 0 ? styles.activeFilter : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} /> Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </button>
      </div>

      {showFilters && (
        <div className={styles.advancedFilters}>
          <div className={styles.filtersHeader}>
            <span className={styles.filtersTitle}>Filtros avanzados</span>
            {activeFiltersCount > 0 && (
              <button className={styles.clearBtn} onClick={clearAllFilters}>
                <X size={14} /> Limpiar filtros
              </button>
            )}
          </div>
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
               <label>Proveedor</label>
               <select className={styles.select} value={selectedProveedor || ''} onChange={e => { setSelectedProveedor(e.target.value || null); setSelectedTipo(null); setSelectedLinea(null); setSelectedMueble(null); }}>
                 <option value="">Todos los proveedores</option>
                 {proveedores.map(p => <option key={p} value={p}>{p}</option>)}
               </select>
            </div>
            <div className={styles.filterGroup}>
               <label>Categoría</label>
               <select className={styles.select} value={selectedCategoria || ''} onChange={e => setSelectedCategoria(e.target.value || null)}>
                 <option value="">Todas las categorías</option>
                 {categorias.map(c => <option key={c} value={c}>{c}</option>)}
               </select>
            </div>
            {tipos.length > 0 && (
              <div className={styles.filterGroup}>
                 <label>Tipo de Producto</label>
                 <select className={styles.select} value={selectedTipo || ''} onChange={e => setSelectedTipo(e.target.value || null)}>
                   <option value="">Todos</option>
                   {tipos.map(t => <option key={t} value={t}>{t}</option>)}
                 </select>
              </div>
            )}
            <div className={styles.filterGroup}>
               <label>Línea de Producto</label>
               <select className={styles.select} value={selectedLinea || ''} onChange={e => setSelectedLinea(e.target.value || null)}>
                 <option value="">Todas las líneas</option>
                 {LINEAS_DE_PRODUCTO.map(l => <option key={l} value={l}>{l}</option>)}
               </select>
            </div>
            <div className={styles.filterGroup}>
               <label>Mueble de Producto</label>
               <select className={styles.select} value={selectedMueble || ''} onChange={e => setSelectedMueble(e.target.value || null)}>
                 <option value="">Todos los muebles</option>
                 {MUEBLES_DE_PRODUCTO.map(m => <option key={m} value={m}>{m}</option>)}
               </select>
            </div>
          </div>
        </div>
      )}

      <div className={styles.resultsCounter}>
        Mostrando {filteredItems.length} {filteredItems.length === 1 ? 'ítem' : 'ítems'}
        {filteredItems.length !== items.length && ` de ${items.length} totales`}
      </div>

      <div className={styles.grid}>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className={styles.card}>
              <div className={styles.imageContainer}>
                {item.url_imagen ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url_imagen} alt={item.nombre} className={styles.image} />
                ) : (
                  <div className={styles.noImage}>
                    <ImageIcon size={32} />
                  </div>
                )}
                <div className={styles.badge}>{item.categorias?.nombre || 'General'}</div>
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.itemName}>{item.nombre}</h3>
                <p className={styles.providerName}>{item.proveedores?.nombre}</p>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Costo aprox:</span>
                  <span className={styles.priceValue}>${item.precio_costo?.toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>No se encontraron resultados</h3>
            <p>Intentá con otra búsqueda o limpiá los filtros.</p>
          </div>
        )}
      </div>
    </>
  );
}
