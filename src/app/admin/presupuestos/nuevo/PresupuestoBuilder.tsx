'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import {
  Search, Plus, Minus, Trash2, Save, FileText,
  Image as ImageIcon, ShoppingCart,
} from 'lucide-react';
import { PRECIOS_GENERICOS } from '@/lib/pricing';
import { LINEAS_DE_PRODUCTO, MUEBLES_DE_PRODUCTO } from '@/lib/catalog-constants';

// ── Constants ──
const MARKUP = 0.10;
const IVA_BASE_PERCENT = 0.30;
const IVA_RATE = 0.21;
const GALPON_NAME = 'Galpón Pueyrredón';
const GENERAL_SECTION = 0;

const ALFOMBRA_NOMBRES = [
  'Alfombras Yute',
  'Alfombras Clasicas Ines Pieres',
  'Alfombras Clasicas Alquiladas',
  'Alfombras Mostaza',
];
const CAMINO_NOMBRES = [
  'Camino de Gasa Comun',
  'Camino de Gasa Largo',
  'Individual Yute',
];
const DEFAULTS_POR_LIVING = [
  { nombre: 'Alfombras Yute',       cantidad: 1 },
  { nombre: 'Almohadones',          cantidad: 3 },
  { nombre: 'Camino de Gasa Comun', cantidad: 1 },
  { nombre: 'Vaso Velita',          cantidad: 2 },
  { nombre: 'Velitas',              cantidad: 2 },
];

const GENERICOS_AGRUPADOS = [
  {
    categoria: 'Alfombras',
    items: [
      'Alfombras Yute',
      'Alfombras Clasicas Ines Pieres',
      'Alfombras Clasicas Alquiladas',
      'Alfombras Mostaza',
    ],
  },
  {
    categoria: 'Accesorios',
    items: [
      'Velitas',
      'Vaso Velita',
      'Individual Yute',
      'Camino de Gasa Comun',
      'Camino de Gasa Largo',
      'Cilindro',
      'Velon',
      'Frasco',
      'Floreros',
      'Almohadones',
      'Troncos',
    ],
  },
  {
    categoria: 'Logística',
    items: [
      'Viaticos',
      'Flete Proveedor Galpon Pueyrredon',
      'Flete Puro Living',
      'Flete Ines Pieres',
      'Ayudante Flete',
    ],
  },
  {
    categoria: 'Personal',
    items: [
      'Florista Comun',
      'Florista Premium',
      'Armado Ines Pieres',
      'Comida por persona',
    ],
  },
];

// ── Types ──
type SectionGroup = 'Ceremonia' | 'Recepción' | 'Salón';

interface Section {
  id: number;
  name: string;
  group: SectionGroup;
  isLiving: boolean;
}

const DEFAULT_SECTIONS: Section[] = [
  { id: 0, name: 'General', group: 'Salón', isLiving: false },
  { id: 1, name: 'Living 1', group: 'Salón', isLiving: true },
];

const SECTION_TYPES: { label: string; baseName: string; isLiving: boolean }[] = [
  { label: 'Living',           baseName: 'Living',           isLiving: true  },
  { label: 'Mesa Rectangular', baseName: 'Mesa Rectangular', isLiving: false },
  { label: 'DJ',               baseName: 'DJ',               isLiving: false },
  { label: 'Barra',            baseName: 'Barra',            isLiving: false },
  { label: 'Isla',             baseName: 'Isla',             isLiving: false },
];

interface CatalogItem {
  id: string;
  nombre: string;
  precio_costo: number;
  url_imagen: string | null;
  proveedores?: { nombre: string };
  categorias?: { nombre: string };
  descripcion?: string;
}

interface BudgetLineItem {
  id: string;
  nombre: string;
  precio_unitario: number;
  cantidad: number;
  proveedor: string;
  url_imagen: string | null;
  living: number;
}

interface BudgetConfig {
  ivaActivo: boolean;
  comisionSalon: { activa: boolean; tipo: 'porcentaje' | 'por_pax'; valor: number };
  comisionPlanner: { activa: boolean; valor: number };
  _comisionSalonAmt?: number;
  _comisionPlannerAmt?: number;
  sections?: Section[];
}

const DEFAULT_CONFIG: BudgetConfig = {
  ivaActivo: true,
  comisionSalon: { activa: true, tipo: 'porcentaje', valor: 10 },
  comisionPlanner: { activa: true, valor: 10 },
};

interface PresupuestoBuilderProps {
  items: CatalogItem[];
  initialData?: {
    id: string;
    nombre_cliente: string;
    email_cliente: string;
    telefono_cliente: string;
    fecha_evento: string;
    lugar_evento: string;
    items_json: (BudgetLineItem & { living?: number })[];
    estado?: string;
    config_json?: BudgetConfig;
    // Datos extra del formulario web
    origen?: string;
    nombres_novios?: string;
    cantidad_personas?: string;
    ceremonia?: string;
    formato?: string;
    estilo?: string;
    presupuesto_destinado?: string;
    links_inspiracion?: string;
    mensaje_adicional?: string;
  };
}

// ── Helpers ──
const isGeneric = (id: string) => id.startsWith('gen-');

const parseMeta = (item: CatalogItem) => {
  try {
    if (item.descripcion) {
      return typeof item.descripcion === 'string'
        ? JSON.parse(item.descripcion) : item.descripcion;
    }
  } catch { }
  return {};
};

const makeGenId = (nombre: string, living: number) =>
  `gen-${nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-l${living}`;

const buildBudgetSnapshot = (data: {
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente: string;
  fechaEvento: string;
  lugarEvento: string;
  cantidadPersonas: string;
  budgetItems: BudgetLineItem[];
  sections: Section[];
  config: BudgetConfig;
}) => JSON.stringify({
  nombreCliente: data.nombreCliente.trim(),
  emailCliente: data.emailCliente.trim(),
  telefonoCliente: data.telefonoCliente.trim(),
  fechaEvento: data.fechaEvento,
  lugarEvento: data.lugarEvento.trim(),
  cantidadPersonas: data.cantidadPersonas,
  budgetItems: data.budgetItems
    .map(item => ({ ...item, living: item.living ?? 1 }))
    .sort((a, b) => `${a.living}-${a.id}`.localeCompare(`${b.living}-${b.id}`)),
  sections: data.sections,
  config: data.config,
});

export default function PresupuestoBuilder({ items, initialData }: PresupuestoBuilderProps) {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const totalsRef = useRef<HTMLDivElement | null>(null);

  // ── Client info ──
  const [nombreCliente, setNombreCliente] = useState(initialData?.nombre_cliente || '');
  const [emailCliente, setEmailCliente] = useState(initialData?.email_cliente || '');
  const [telefonoCliente, setTelefonoCliente] = useState(initialData?.telefono_cliente || '');
  const [fechaEvento, setFechaEvento] = useState(initialData?.fecha_evento || '');
  const [lugarEvento, setLugarEvento] = useState(initialData?.lugar_evento || '');

  // ── Catalog filters ──
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProveedor, setSelectedProveedor] = useState<string>('');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('');
  const [selectedLinea, setSelectedLinea] = useState<string>('');
  const [selectedMueble, setSelectedMueble] = useState<string>('');

  // ── Tab: catalog vs generics ──
  const [activeTab, setActiveTab] = useState<'catalogo' | 'genericos'>('catalogo');

  // ── Sections system ──
  const [sections, setSections] = useState<Section[]>(() => {
    const saved = (initialData?.config_json as BudgetConfig)?.sections;
    if (saved?.length) return saved;
    if (!initialData?.items_json?.length) return DEFAULT_SECTIONS;
    const maxId = Math.max(1, ...initialData.items_json.map(i => i.living ?? 1));
    return [
      { id: 0, name: 'General', group: 'Salón' as SectionGroup, isLiving: false },
      ...Array.from({ length: maxId }, (_, i) => ({
        id: i + 1,
        name: `Living ${i + 1}`,
        group: 'Salón' as SectionGroup,
        isLiving: true,
      })),
    ];
  });
  const [activeSectionId, setActiveSectionId] = useState(1);
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [sectionEditValue, setSectionEditValue] = useState('');
  const [addingToGroup, setAddingToGroup] = useState<SectionGroup | null>(null);
  const [editingPriceKey, setEditingPriceKey] = useState<string | null>(null);

  // ── Budget items (backfill living for old records) ──
  const [budgetItems, setBudgetItems] = useState<BudgetLineItem[]>(() =>
    (initialData?.items_json || []).map(item => ({ ...item, living: item.living ?? 1 }))
  );

  // ── Config: commissions & IVA ──
  const [config, setConfig] = useState<BudgetConfig>(() =>
    initialData?.config_json
      ? { ...DEFAULT_CONFIG, ...initialData.config_json }
      : DEFAULT_CONFIG
  );

  // ── Pax count (for $/pax commission mode) ──
  const [cantidadPersonas, setCantidadPersonas] = useState(
    initialData?.cantidad_personas || ''
  );

  // ── Collapsible header sections ──
  const [clientExpanded, setClientExpanded] = useState(!initialData?.id);
  const [collapsedSections, setCollapsedSections] = useState<Record<number, boolean>>({});

  const [saving, setSaving] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [budgetHeaderHeight, setBudgetHeaderHeight] = useState<number | null>(null);
  const [budgetTotalsHeight, setBudgetTotalsHeight] = useState<number | null>(null);

  const currentSnapshot = useMemo(() => buildBudgetSnapshot({
    nombreCliente,
    emailCliente,
    telefonoCliente,
    fechaEvento,
    lugarEvento,
    cantidadPersonas,
    budgetItems,
    sections,
    config,
  }), [
    nombreCliente,
    emailCliente,
    telefonoCliente,
    fechaEvento,
    lugarEvento,
    cantidadPersonas,
    budgetItems,
    sections,
    config,
  ]);

  const [lastSavedSnapshot, setLastSavedSnapshot] = useState(currentSnapshot);
  const isDirty = currentSnapshot !== lastSavedSnapshot;

  useEffect(() => {
    window.history.pushState({ presupuestoGuard: true }, '', window.location.href);
  }, []);

  // ── Warn before closing ──
  useEffect(() => {
    const confirmLeave = () =>
      !isDirty || window.confirm('Tenés cambios sin guardar en este presupuesto. ¿Querés salir igual?');

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = '';
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const nextUrl = new URL(anchor.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;
      if (nextUrl.href === window.location.href) return;

      if (!confirmLeave()) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handlePopState = () => {
      if (!confirmLeave()) {
        window.history.pushState({ presupuestoGuard: true }, '', window.location.href);
        return;
      }
      window.removeEventListener('popstate', handlePopState);
      window.history.back();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [isDirty]);

  // ── Extract filter options ──
  const proveedores = useMemo(() => {
    const set = new Set<string>();
    items.forEach(item => { if (item.proveedores?.nombre) set.add(item.proveedores.nombre); });
    return Array.from(set).sort();
  }, [items]);

  const categorias = useMemo(() => {
    const set = new Set<string>();
    items.forEach(item => { if (item.categorias?.nombre) set.add(item.categorias.nombre); });
    return Array.from(set).sort();
  }, [items]);

  const filteredCatalog = useMemo(() => {
    return items.filter(item => {
      const matchSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.proveedores?.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchProv = selectedProveedor ? item.proveedores?.nombre === selectedProveedor : true;
      const matchCat = selectedCategoria ? item.categorias?.nombre === selectedCategoria : true;
      const meta = parseMeta(item);
      const matchLinea = selectedLinea ? meta.linea === selectedLinea : true;
      const matchMueble = selectedMueble ? meta.mueble === selectedMueble : true;
      return matchSearch && matchProv && matchCat && matchLinea && matchMueble;
    });
  }, [items, searchTerm, selectedProveedor, selectedCategoria, selectedLinea, selectedMueble]);

  // ── Section management ──
  const addSection = (group: SectionGroup, baseName: string, isLiving: boolean) => {
    const newId = sections.reduce((max, s) => Math.max(max, s.id), 0) + 1;
    let name = baseName;
    if (baseName === 'Living') {
      const count = sections.filter(s => s.name.startsWith('Living')).length;
      name = `Living ${count + 1}`;
    } else {
      const count = sections.filter(s => s.name.startsWith(baseName)).length;
      if (count > 0) name = `${baseName} ${count + 1}`;
    }
    setSections(prev => [...prev, { id: newId, name, group, isLiving }]);
    setActiveSectionId(newId);
    setAddingToGroup(null);
    if (isLiving) {
      const defaults = DEFAULTS_POR_LIVING.map(d => ({
        id: makeGenId(d.nombre, newId),
        nombre: d.nombre,
        precio_unitario: PRECIOS_GENERICOS[d.nombre as keyof typeof PRECIOS_GENERICOS],
        cantidad: d.cantidad,
        proveedor: 'Genérico',
        url_imagen: null,
        living: newId,
      }));
      setBudgetItems(prev => [...prev, ...defaults]);
    }
  };

  const deleteSection = (id: number) => {
    setBudgetItems(prev => prev.filter(b => b.living !== id));
    setSections(prev => prev.filter(s => s.id !== id));
    setActiveSectionId(prev => {
      if (prev !== id) return prev;
      const remaining = sections.filter(s => s.id !== id);
      return remaining[remaining.length - 1]?.id ?? 0;
    });
  };

  const updatePrice = (id: string, living: number, price: number) => {
    setBudgetItems(prev => prev.map(b =>
      b.id === id && b.living === living ? { ...b, precio_unitario: price } : b
    ));
  };

  // ── Living default item helpers (derived from budgetItems) ──
  const getLivingAlfombra = (n: number) =>
    budgetItems.find(b => b.living === n && ALFOMBRA_NOMBRES.includes(b.nombre));

  const getLivingCamino = (n: number) =>
    budgetItems.find(b => b.living === n && CAMINO_NOMBRES.includes(b.nombre));

  const toggleLivingAlfombra = (n: number) => {
    const existing = getLivingAlfombra(n);
    if (existing) {
      setBudgetItems(prev => prev.filter(b => !(b.living === n && ALFOMBRA_NOMBRES.includes(b.nombre))));
    } else {
      const nombre = 'Alfombras Yute';
      setBudgetItems(prev => [...prev, {
        id: makeGenId(nombre, n),
        nombre,
        precio_unitario: PRECIOS_GENERICOS['Alfombras Yute'],
        cantidad: 1,
        proveedor: 'Genérico',
        url_imagen: null,
        living: n,
      }]);
    }
  };

  const changeLivingAlfombraType = (n: number, tipo: string) => {
    const price = PRECIOS_GENERICOS[tipo as keyof typeof PRECIOS_GENERICOS];
    if (!price) return;
    setBudgetItems(prev =>
      prev.map(b =>
        b.living === n && ALFOMBRA_NOMBRES.includes(b.nombre)
          ? { ...b, id: makeGenId(tipo, n), nombre: tipo, precio_unitario: price }
          : b
      )
    );
  };

  const toggleLivingAlmohadones = (n: number) => {
    const existing = budgetItems.find(b => b.living === n && b.nombre === 'Almohadones');
    if (existing) {
      setBudgetItems(prev => prev.filter(b => !(b.living === n && b.nombre === 'Almohadones')));
    } else {
      setBudgetItems(prev => [...prev, {
        id: makeGenId('Almohadones', n),
        nombre: 'Almohadones',
        precio_unitario: PRECIOS_GENERICOS['Almohadones'],
        cantidad: 3,
        proveedor: 'Genérico',
        url_imagen: null,
        living: n,
      }]);
    }
  };

  const toggleLivingCamino = (n: number) => {
    const existing = getLivingCamino(n);
    if (existing) {
      setBudgetItems(prev => prev.filter(b => !(b.living === n && CAMINO_NOMBRES.includes(b.nombre))));
    } else {
      const nombre = 'Camino de Gasa Comun';
      setBudgetItems(prev => [...prev, {
        id: makeGenId(nombre, n),
        nombre,
        precio_unitario: PRECIOS_GENERICOS['Camino de Gasa Comun'],
        cantidad: 1,
        proveedor: 'Genérico',
        url_imagen: null,
        living: n,
      }]);
    }
  };

  const changeLivingCaminoType = (n: number, tipo: string) => {
    const price = PRECIOS_GENERICOS[tipo as keyof typeof PRECIOS_GENERICOS];
    if (!price) return;
    setBudgetItems(prev =>
      prev.map(b =>
        b.living === n && CAMINO_NOMBRES.includes(b.nombre)
          ? { ...b, id: makeGenId(tipo, n), nombre: tipo, precio_unitario: price }
          : b
      )
    );
  };

  const toggleSectionCollapsed = (living: number) => {
    setCollapsedSections(prev => ({
      ...prev,
      [living]: !prev[living],
    }));
  };

  const startResize = (section: 'header' | 'totals', event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const element = section === 'header' ? headerRef.current : totalsRef.current;
    if (!element) return;

    const startY = event.clientY;
    const startHeight = element.getBoundingClientRect().height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;

      if (section === 'header') {
        const nextHeight = Math.min(420, Math.max(76, startHeight + deltaY));
        setBudgetHeaderHeight(nextHeight);
        return;
      }

      const nextHeight = Math.min(420, Math.max(84, startHeight - deltaY));
      setBudgetTotalsHeight(nextHeight);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // ── Budget item operations ──
  const addItem = (item: CatalogItem) => {
    const existing = budgetItems.find(b => b.id === item.id && b.living === activeSectionId);
    if (existing) {
      setBudgetItems(prev => prev.map(b =>
        b.id === item.id && b.living === activeSectionId ? { ...b, cantidad: b.cantidad + 1 } : b
      ));
    } else {
      setBudgetItems(prev => [...prev, {
        id: item.id,
        nombre: item.nombre,
        precio_unitario: item.precio_costo,
        cantidad: 1,
        proveedor: item.proveedores?.nombre || '',
        url_imagen: item.url_imagen,
        living: activeSectionId,
      }]);
    }
  };

  const addGenericItem = (nombre: string) => {
    const genId = makeGenId(nombre, activeSectionId);
    const price = PRECIOS_GENERICOS[nombre as keyof typeof PRECIOS_GENERICOS];
    if (!price) return;
    const existing = budgetItems.find(b => b.id === genId);
    if (existing) {
      setBudgetItems(prev => prev.map(b => b.id === genId ? { ...b, cantidad: b.cantidad + 1 } : b));
    } else {
      setBudgetItems(prev => [...prev, {
        id: genId,
        nombre,
        precio_unitario: price,
        cantidad: 1,
        proveedor: 'Genérico',
        url_imagen: null,
        living: activeSectionId,
      }]);
    }
  };

  const updateQty = (id: string, living: number, delta: number) => {
    setBudgetItems(prev => prev.map(b => {
      if (b.id === id && b.living === living) {
        return { ...b, cantidad: Math.max(1, b.cantidad + delta) };
      }
      return b;
    }));
  };

  const removeItem = (id: string, living: number) => {
    setBudgetItems(prev => prev.filter(b => !(b.id === id && b.living === living)));
  };

  // ── Calculations ──
  const subtotalCatalogo = budgetItems
    .filter(b => !isGeneric(b.id))
    .reduce((sum, b) => sum + b.precio_unitario * b.cantidad * (1 + MARKUP), 0);

  const subtotalGenericos = budgetItems
    .filter(b => isGeneric(b.id))
    .reduce((sum, b) => sum + b.precio_unitario * b.cantidad, 0);

  const subtotalGalpon = budgetItems
    .filter(b => !isGeneric(b.id) && b.proveedor === GALPON_NAME)
    .reduce((sum, b) => sum + b.precio_unitario * b.cantidad * (1 + MARKUP), 0);

  const iva = subtotalGalpon * IVA_BASE_PERCENT * IVA_RATE;

  const baseTotal = subtotalCatalogo + subtotalGenericos + (config.ivaActivo ? iva : 0);

  const comisionSalonAmount = config.comisionSalon.activa
    ? config.comisionSalon.tipo === 'porcentaje'
      ? baseTotal * config.comisionSalon.valor / 100
      : config.comisionSalon.valor * parseInt(cantidadPersonas || '0', 10)
    : 0;

  const comisionPlannerAmount = config.comisionPlanner.activa
    ? baseTotal * config.comisionPlanner.valor / 100
    : 0;

  const total = baseTotal + comisionSalonAmount + comisionPlannerAmount;

  const gananciaEstimada = budgetItems
    .filter(b => !isGeneric(b.id))
    .reduce((sum, b) => sum + b.precio_unitario * b.cantidad * MARKUP, 0);

  const hasGalponItems = budgetItems.some(b => !isGeneric(b.id) && b.proveedor === GALPON_NAME);

  // ── Payload builder ──
  const buildPayload = () => ({
    nombre_cliente: nombreCliente,
    email_cliente: emailCliente,
    telefono_cliente: telefonoCliente,
    fecha_evento: fechaEvento || null,
    lugar_evento: lugarEvento,
    items_json: budgetItems,
    subtotal: Math.round(subtotalCatalogo + subtotalGenericos),
    flete: 0,
    iva: config.ivaActivo ? Math.round(iva) : 0,
    total: Math.round(total),
    cantidad_personas: cantidadPersonas,
    config_json: {
      ...config,
      sections,
      _comisionSalonAmt: Math.round(comisionSalonAmount),
      _comisionPlannerAmt: Math.round(comisionPlannerAmount),
    },
    estado: initialData?.estado && initialData.estado !== 'pendiente_cotizacion'
      ? initialData.estado : 'borrador',
  });

  // ── Save ──
  const handleSave = async () => {
    if (!nombreCliente.trim() || budgetItems.length === 0) return;
    setSaving(true);
    try {
      const method = initialData?.id ? 'PATCH' : 'POST';
      const url = initialData?.id ? `/api/presupuestos/${initialData.id}` : '/api/presupuestos';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      });
      if (res.ok) {
        setLastSavedSnapshot(currentSnapshot);
        router.push('/admin/presupuestos');
        router.refresh();
      }
      else alert('Error al guardar el presupuesto');
    } catch { alert('Error de conexión'); }
    finally { setSaving(false); }
  };

  // ── Generate PDF ──
  const handleGeneratePdf = async () => {
    if (budgetItems.length === 0) return;
    setGeneratingPdf(true);
    try {
      if (!nombreCliente.trim()) {
        alert('Ingresá el nombre del cliente antes de generar el PDF');
        return;
      }
      const method = initialData?.id ? 'PATCH' : 'POST';
      const url = initialData?.id ? `/api/presupuestos/${initialData.id}` : '/api/presupuestos';
      const saveRes = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      });
      if (!saveRes.ok) { alert('Error al guardar/actualizar antes de generar PDF'); return; }
      setLastSavedSnapshot(currentSnapshot);

      let id = initialData?.id;
      if (!id) { const saved = await saveRes.json(); id = saved.id; }

      const res = await fetch(`/api/presupuestos/${id}/pdf`);
      if (!res.ok) { alert('Error generando el PDF'); return; }
      const blob = await res.blob();
      const pdfUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `presupuesto-${nombreCliente.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(pdfUrl);
    } catch { alert('Error de conexión al generar PDF'); }
    finally { setGeneratingPdf(false); }
  };

  // ── Formatters ──
  const fmtPrice = (n: number) => `$${Math.round(n).toLocaleString('es-AR')}`;

  return (
    <div className={styles.builderLayout}>
      {/* ═══ LEFT: CATALOG ═══ */}
      <div className={styles.catalogPanel}>

        {/* Tab switcher */}
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'catalogo' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('catalogo')}
          >Catálogo</button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'genericos' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('genericos')}
          >Genéricos</button>
        </div>

        {/* Section selector */}
        <div className={styles.livingSelector}>
          {sections.map(s => (
            <button
              key={s.id}
              className={`${styles.livingSelectorBtn} ${activeSectionId === s.id ? styles.livingSelectorBtnActive : ''}`}
              onClick={() => setActiveSectionId(s.id)}
            >{s.name}</button>
          ))}
        </div>

        {activeTab === 'catalogo' ? (
          <>
            <div className={styles.catalogHeader}>
              <div className={styles.catalogSearch}>
                <Search size={16} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Buscar mueble..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className={styles.catalogFilters}>
                <select value={selectedProveedor} onChange={e => setSelectedProveedor(e.target.value)}>
                  <option value="">Todos los proveedores</option>
                  {proveedores.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={selectedCategoria} onChange={e => setSelectedCategoria(e.target.value)}>
                  <option value="">Todas las categorías</option>
                  {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={selectedLinea} onChange={e => setSelectedLinea(e.target.value)}>
                  <option value="">Todas las líneas</option>
                  {LINEAS_DE_PRODUCTO.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <select value={selectedMueble} onChange={e => setSelectedMueble(e.target.value)}>
                  <option value="">Todos los muebles</option>
                  {MUEBLES_DE_PRODUCTO.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.catalogGrid}>
              {filteredCatalog.map(item => (
                <div key={item.id} className={styles.catalogCard}>
                  {item.url_imagen ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url_imagen} alt={item.nombre} className={styles.catalogCardImg} />
                  ) : (
                    <div className={styles.catalogCardNoImg}><ImageIcon size={24} /></div>
                  )}
                  <div className={styles.catalogCardInfo}>
                    <p className={styles.catalogCardName} title={item.nombre}>{item.nombre}</p>
                    <p className={styles.catalogCardProvider}>{item.proveedores?.nombre}</p>
                    <p className={styles.catalogCardPrice}>{fmtPrice(item.precio_costo)}</p>
                  </div>
                  <button className={styles.catalogCardBtn} onClick={() => addItem(item)}>
                    <Plus size={14} /> Agregar a {sections.find(s => s.id === activeSectionId)?.name ?? 'Sección'}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.genericsPanel}>
            {GENERICOS_AGRUPADOS.map(group => (
              <div key={group.categoria} className={styles.genericCategory}>
                <h4 className={styles.genericCategoryTitle}>{group.categoria}</h4>
                <div className={styles.genericItemList}>
                  {group.items.map(nombre => {
                    const price = PRECIOS_GENERICOS[nombre as keyof typeof PRECIOS_GENERICOS];
                    const genId = makeGenId(nombre, activeSectionId);
                    const inBudget = budgetItems.find(b => b.id === genId);
                    return (
                      <button
                        key={nombre}
                        className={`${styles.genericItemBtn} ${inBudget ? styles.genericItemBtnActive : ''}`}
                        onClick={() => addGenericItem(nombre)}
                      >
                        <span className={styles.genericItemName}>{nombre}</span>
                        <span className={styles.genericItemPrice}>{fmtPrice(price)}</span>
                        {inBudget && (
                          <span className={styles.genericItemQtyBadge}>×{inBudget.cantidad}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ═══ RIGHT: BUDGET ═══ */}
      <div className={styles.budgetPanel}>
        <div
          ref={headerRef}
          className={styles.budgetHeader}
          style={budgetHeaderHeight ? { height: `${budgetHeaderHeight}px` } : undefined}
        >
          <h2><ShoppingCart size={18} /> {initialData?.id ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}</h2>

          {initialData?.origen === 'formulario_web' ? (
            /* Web form origin: solicitud data + client fields unified in yellow box */
            <div className={styles.webFormInfo}>
              <button className={styles.collapsibleToggle} onClick={() => setClientExpanded(e => !e)}>
                <span className={styles.webFormBadge}>📋 SOLICITUD DESDE LA WEB</span>
                <span className={styles.clientSummary}>
                  <span className={styles.clientSummaryName}>{nombreCliente || 'Cliente'}</span>
                  {fechaEvento && (
                    <span className={styles.clientSummaryDate}>
                      {new Date(fechaEvento + 'T00:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </span>
                  )}
                </span>
                <span className={styles.collapseChevron}>{clientExpanded ? '▲' : '▼'}</span>
              </button>
              {clientExpanded && (
                <div className={styles.webFormExpandedBody}>
                  <div className={styles.webFormGrid}>
                    {initialData.nombres_novios && (
                      <div className={styles.webFormItem}>
                        <span className={styles.webFormLabel}>Novios</span>
                        <span className={styles.webFormValue}>{initialData.nombres_novios}</span>
                      </div>
                    )}
                    {initialData.cantidad_personas && (
                      <div className={styles.webFormItem}>
                        <span className={styles.webFormLabel}>Personas</span>
                        <span className={styles.webFormValue}>{initialData.cantidad_personas}</span>
                      </div>
                    )}
                    {initialData.ceremonia && (
                      <div className={styles.webFormItem}>
                        <span className={styles.webFormLabel}>Ceremonia</span>
                        <span className={styles.webFormValue}>{initialData.ceremonia}</span>
                      </div>
                    )}
                    {initialData.formato && (
                      <div className={styles.webFormItem}>
                        <span className={styles.webFormLabel}>Formato</span>
                        <span className={styles.webFormValue}>{initialData.formato}</span>
                      </div>
                    )}
                    {initialData.estilo && (
                      <div className={styles.webFormItem}>
                        <span className={styles.webFormLabel}>Estilo</span>
                        <span className={styles.webFormValue}>{initialData.estilo}</span>
                      </div>
                    )}
                    {initialData.presupuesto_destinado && (
                      <div className={styles.webFormItem}>
                        <span className={styles.webFormLabel}>Presupuesto</span>
                        <span className={styles.webFormValue}>{initialData.presupuesto_destinado}</span>
                      </div>
                    )}
                  </div>
                  {initialData.links_inspiracion && (
                    <div className={styles.webFormNote}>
                      <span className={styles.webFormLabel}>Inspiración:</span> {initialData.links_inspiracion}
                    </div>
                  )}
                  {initialData.mensaje_adicional && (
                    <div className={styles.webFormNote}>
                      <span className={styles.webFormLabel}>Mensaje:</span> {initialData.mensaje_adicional}
                    </div>
                  )}
                  <div className={styles.webFormDivider} />
                  <div className={styles.clientFieldsBody}>
                    <div className={styles.clientField}>
                      <label>Cliente *</label>
                      <input placeholder="Nombre del cliente" value={nombreCliente} onChange={e => setNombreCliente(e.target.value)} />
                    </div>
                    <div className={styles.clientRow}>
                      <div className={styles.clientField}>
                        <label>Email</label>
                        <input placeholder="email@ejemplo.com" value={emailCliente} onChange={e => setEmailCliente(e.target.value)} />
                      </div>
                      <div className={styles.clientField}>
                        <label>Teléfono</label>
                        <input placeholder="+54 11..." value={telefonoCliente} onChange={e => setTelefonoCliente(e.target.value)} />
                      </div>
                    </div>
                    <div className={styles.clientRow}>
                      <div className={styles.clientField}>
                        <label>Fecha del evento</label>
                        <input type="date" value={fechaEvento} onChange={e => setFechaEvento(e.target.value)} />
                      </div>
                      <div className={styles.clientField}>
                        <label>Lugar</label>
                        <input placeholder="Ubicación" value={lugarEvento} onChange={e => setLugarEvento(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Regular client section (no web form) */
            <div className={styles.clientSection}>
              <button className={styles.collapsibleToggle} onClick={() => setClientExpanded(e => !e)}>
                <span className={styles.clientSummary}>
                  <span className={styles.clientSummaryName}>{nombreCliente || 'Cliente'}</span>
                  {fechaEvento && (
                    <span className={styles.clientSummaryDate}>
                      {new Date(fechaEvento + 'T00:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </span>
                  )}
                </span>
                <span className={styles.collapseChevron}>{clientExpanded ? '▲' : '▼'}</span>
              </button>
              {clientExpanded && (
                <div className={styles.clientFieldsBody}>
                  <div className={styles.clientField}>
                    <label>Cliente *</label>
                    <input placeholder="Nombre del cliente" value={nombreCliente} onChange={e => setNombreCliente(e.target.value)} />
                  </div>
                  <div className={styles.clientRow}>
                    <div className={styles.clientField}>
                      <label>Email</label>
                      <input placeholder="email@ejemplo.com" value={emailCliente} onChange={e => setEmailCliente(e.target.value)} />
                    </div>
                    <div className={styles.clientField}>
                      <label>Teléfono</label>
                      <input placeholder="+54 11..." value={telefonoCliente} onChange={e => setTelefonoCliente(e.target.value)} />
                    </div>
                  </div>
                  <div className={styles.clientRow}>
                    <div className={styles.clientField}>
                      <label>Fecha del evento</label>
                      <input type="date" value={fechaEvento} onChange={e => setFechaEvento(e.target.value)} />
                    </div>
                    <div className={styles.clientField}>
                      <label>Lugar</label>
                      <input placeholder="Ubicación" value={lugarEvento} onChange={e => setLugarEvento(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div
            className={styles.sectionResizeHandle}
            onMouseDown={e => startResize('header', e)}
            title="Arrastrá para cambiar el alto de esta sección"
          >
            <span className={styles.sectionResizeGrip} />
          </div>
        </div>

        {/* Items grouped by section and event area */}
        <div className={styles.budgetItems}>
          {budgetItems.length === 0 && sections.every(s => budgetItems.filter(b => b.living === s.id).length === 0) ? (
            <div className={styles.emptyBudget}>
              <ShoppingCart size={32} />
              <p>Agregá items del catálogo o genéricos<br/>para armar el presupuesto</p>
            </div>
          ) : (
            (['Ceremonia', 'Recepción', 'Salón'] as SectionGroup[]).map(group => {
              const groupSections = sections.filter(s => s.group === group);
              return (
                <div key={group} className={styles.budgetGroup}>
                  <div className={styles.budgetGroupHeader}>
                    <span className={styles.budgetGroupTitle}>{group}</span>
                    {addingToGroup === group ? (
                      <div className={styles.addSectionBtns}>
                        {SECTION_TYPES.map(t => (
                          <button key={t.baseName} className={styles.addSectionTypeBtn} onClick={() => addSection(group, t.baseName, t.isLiving)}>
                            {t.label}
                          </button>
                        ))}
                        <button className={styles.addSectionCancelBtn} onClick={() => setAddingToGroup(null)}>✕</button>
                      </div>
                    ) : (
                      <button className={styles.addSectionBtn} onClick={() => setAddingToGroup(group)}>+ Agregar</button>
                    )}
                  </div>

                  {groupSections.map(section => {
                    const sectionItems = budgetItems.filter(b => b.living === section.id);
                    const alfombra = getLivingAlfombra(section.id);
                    const camino = getLivingCamino(section.id);
                    const tieneAlmohadones = budgetItems.some(b => b.living === section.id && b.nombre === 'Almohadones');
                    const isCollapsed = collapsedSections[section.id];
                    const isGeneral = section.id === GENERAL_SECTION;

                    return (
                      <div key={section.id} className={styles.livingSection}>
                        <div className={styles.livingSectionHeader}>
                          <button
                            className={styles.sectionCollapseBtn}
                            onClick={() => toggleSectionCollapsed(section.id)}
                          >
                            <span className={styles.sectionCollapseChevron}>{isCollapsed ? '▶' : '▼'}</span>
                          </button>

                          {/* Editable section name */}
                          {editingSectionId === section.id ? (
                            <input
                              autoFocus
                              value={sectionEditValue}
                              onChange={e => setSectionEditValue(e.target.value)}
                              onBlur={() => {
                                setSections(prev => prev.map(s => s.id === section.id ? { ...s, name: sectionEditValue.trim() || s.name } : s));
                                setEditingSectionId(null);
                              }}
                              onKeyDown={e => {
                                if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                                if (e.key === 'Escape') setEditingSectionId(null);
                              }}
                              className={styles.sectionNameInput}
                            />
                          ) : (
                            <span
                              className={`${styles.livingSectionTitle} ${styles.livingSectionTitleEditable}`}
                              onClick={() => { setEditingSectionId(section.id); setSectionEditValue(section.name); }}
                              title="Click para editar nombre"
                            >
                              {section.name}
                            </span>
                          )}

                          <span className={styles.sectionCollapseMeta}>
                            {sectionItems.length} item{sectionItems.length === 1 ? '' : 's'}
                          </span>

                          {section.isLiving && !isCollapsed && (<>
                            <div className={styles.livingToggle}>
                              <button
                                className={`${styles.toggleChip} ${alfombra ? styles.toggleChipOn : styles.toggleChipOff}`}
                                onClick={() => toggleLivingAlfombra(section.id)}
                              >
                                {alfombra ? '✓' : '✗'} Alfombra
                              </button>
                              {alfombra && (
                                <select className={styles.toggleSelect} value={alfombra.nombre} onChange={e => changeLivingAlfombraType(section.id, e.target.value)}>
                                  <option value="Alfombras Yute">Yute</option>
                                  <option value="Alfombras Clasicas Ines Pieres">Clásica IP</option>
                                  <option value="Alfombras Mostaza">Mostaza</option>
                                </select>
                              )}
                            </div>
                            <button
                              className={`${styles.toggleChip} ${tieneAlmohadones ? styles.toggleChipOn : styles.toggleChipOff}`}
                              onClick={() => toggleLivingAlmohadones(section.id)}
                            >
                              {tieneAlmohadones ? '✓' : '✗'} Almohadones
                            </button>
                            <div className={styles.livingToggle}>
                              <button
                                className={`${styles.toggleChip} ${camino ? styles.toggleChipOn : styles.toggleChipOff}`}
                                onClick={() => toggleLivingCamino(section.id)}
                              >
                                {camino ? '✓' : '✗'} Camino
                              </button>
                              {camino && (
                                <select className={styles.toggleSelect} value={camino.nombre} onChange={e => changeLivingCaminoType(section.id, e.target.value)}>
                                  <option value="Camino de Gasa Comun">Gasa</option>
                                  <option value="Individual Yute">Individual Yute</option>
                                </select>
                              )}
                            </div>
                          </>)}

                          {!isGeneral && (
                            <button className={styles.deleteLivingBtn} onClick={() => deleteSection(section.id)} title={`Eliminar ${section.name}`}>
                              <Trash2 size={11} />
                            </button>
                          )}
                        </div>

                        {!isCollapsed && (sectionItems.length === 0 ? (
                          <p className={styles.livingEmpty}>Sin items — agregá desde el catálogo</p>
                        ) : (
                          sectionItems.map(item => {
                            const priceKey = `${item.id}-${item.living}`;
                            const isEditingPrice = editingPriceKey === priceKey;
                            return (
                              <div
                                key={priceKey}
                                className={`${styles.budgetItem} ${isGeneric(item.id) ? styles.budgetItemGeneric : ''}`}
                              >
                                {!isGeneric(item.id) && item.url_imagen ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={item.url_imagen} alt={item.nombre} className={styles.budgetItemImg} />
                                ) : (
                                  <div className={`${styles.budgetItemNoImg} ${isGeneric(item.id) ? styles.budgetItemNoImgGeneric : ''}`}>
                                    {isGeneric(item.id) ? <span className={styles.genDot} /> : <ImageIcon size={16} />}
                                  </div>
                                )}
                                <div className={styles.budgetItemInfo}>
                                  <p className={styles.budgetItemName} title={item.nombre}>{item.nombre}</p>
                                  {isGeneric(item.id) ? (
                                    isEditingPrice ? (
                                      <input
                                        type="number"
                                        autoFocus
                                        className={styles.priceEditInput}
                                        defaultValue={item.precio_unitario}
                                        onBlur={e => {
                                          const val = Number(e.target.value);
                                          if (val > 0) updatePrice(item.id, item.living, val);
                                          setEditingPriceKey(null);
                                        }}
                                        onKeyDown={e => {
                                          if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                                          if (e.key === 'Escape') setEditingPriceKey(null);
                                        }}
                                      />
                                    ) : (
                                      <p
                                        className={styles.genericPriceEditable}
                                        onClick={() => setEditingPriceKey(priceKey)}
                                        title="Click para editar precio"
                                      >
                                        {fmtPrice(item.precio_unitario)} ✎
                                      </p>
                                    )
                                  ) : (
                                    <p className={styles.budgetItemProvider}>{item.proveedor}</p>
                                  )}
                                </div>
                                <div className={styles.budgetItemQty}>
                                  <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.living, -1)}><Minus size={12} /></button>
                                  <span className={styles.qtyValue}>{item.cantidad}</span>
                                  <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.living, 1)}><Plus size={12} /></button>
                                </div>
                                <button className={styles.removeBtn} onClick={() => removeItem(item.id, item.living)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            );
                          })
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Totals */}
        {budgetItems.length > 0 && (
          <div
            ref={totalsRef}
            className={styles.budgetTotals}
            style={budgetTotalsHeight ? { height: `${budgetTotalsHeight}px` } : undefined}
          >
            <div
              className={`${styles.sectionResizeHandle} ${styles.sectionResizeHandleTop}`}
              onMouseDown={e => startResize('totals', e)}
              title="Arrastrá para cambiar el alto de esta sección"
            >
              <span className={styles.sectionResizeGrip} />
            </div>
            {subtotalCatalogo > 0 && (
              <div className={styles.totalRow}>
                <span>Muebles (con markup 10%)</span>
                <span>{fmtPrice(subtotalCatalogo)}</span>
              </div>
            )}
            {subtotalGenericos > 0 && (
              <div className={styles.totalRow}>
                <span>Genéricos</span>
                <span>{fmtPrice(subtotalGenericos)}</span>
              </div>
            )}

            {/* IVA toggle */}
            {hasGalponItems && (
              <div className={styles.totalRowToggle}>
                <button
                  className={`${styles.togglePill} ${config.ivaActivo ? styles.togglePillOn : styles.togglePillOff}`}
                  onClick={() => setConfig(c => ({ ...c, ivaActivo: !c.ivaActivo }))}
                  title="Activar/desactivar IVA"
                >IVA</button>
                <span>IVA (21% s/ 30%)</span>
                <span className={config.ivaActivo ? '' : styles.disabledValue}>{fmtPrice(iva)}</span>
              </div>
            )}

            <hr className={styles.totalDivider} />

            {/* Subtotal */}
            <div className={styles.totalRowBold}>
              <span>Subtotal</span>
              <span>{fmtPrice(baseTotal)}</span>
            </div>

            {/* Comisión Salón */}
            <div className={styles.totalRowToggle}>
              <button
                className={`${styles.togglePill} ${config.comisionSalon.activa ? styles.togglePillOn : styles.togglePillOff}`}
                onClick={() => setConfig(c => ({ ...c, comisionSalon: { ...c.comisionSalon, activa: !c.comisionSalon.activa } }))}
                title="Activar/desactivar Comisión Salón"
              >CS</button>
              <span>Com. Salón</span>
              <span className={styles.commissionControls}>
                {config.comisionSalon.tipo === 'porcentaje' ? (
                  <>
                    <input
                      type="number"
                      className={styles.commissionInput}
                      value={config.comisionSalon.valor}
                      onChange={e => setConfig(c => ({ ...c, comisionSalon: { ...c.comisionSalon, valor: Number(e.target.value) } }))}
                    />
                    <span>%</span>
                  </>
                ) : (
                  <>
                    <span>$</span>
                    <input
                      type="number"
                      className={styles.commissionInput}
                      value={config.comisionSalon.valor}
                      onChange={e => setConfig(c => ({ ...c, comisionSalon: { ...c.comisionSalon, valor: Number(e.target.value) } }))}
                    />
                    <span>/pax ×</span>
                    <input
                      type="number"
                      className={styles.commissionInput}
                      placeholder="pax"
                      value={cantidadPersonas}
                      onChange={e => setCantidadPersonas(e.target.value)}
                    />
                  </>
                )}
                <button
                  className={styles.modeToggleBtn}
                  title={config.comisionSalon.tipo === 'porcentaje' ? 'Cambiar a $/pax' : 'Cambiar a %'}
                  onClick={() => setConfig(c => ({
                    ...c, comisionSalon: {
                      ...c.comisionSalon,
                      tipo: c.comisionSalon.tipo === 'porcentaje' ? 'por_pax' : 'porcentaje'
                    }
                  }))}
                >↕</button>
              </span>
              <span className={config.comisionSalon.activa ? '' : styles.disabledValue}>{fmtPrice(comisionSalonAmount)}</span>
            </div>

            {/* Comisión Planner */}
            <div className={styles.totalRowToggle}>
              <button
                className={`${styles.togglePill} ${config.comisionPlanner.activa ? styles.togglePillOn : styles.togglePillOff}`}
                onClick={() => setConfig(c => ({ ...c, comisionPlanner: { ...c.comisionPlanner, activa: !c.comisionPlanner.activa } }))}
                title="Activar/desactivar Comisión Planner"
              >CP</button>
              <span>Com. Planner</span>
              <span className={styles.commissionControls}>
                <input
                  type="number"
                  className={styles.commissionInput}
                  value={config.comisionPlanner.valor}
                  onChange={e => setConfig(c => ({ ...c, comisionPlanner: { ...c.comisionPlanner, valor: Number(e.target.value) } }))}
                />
                <span>%</span>
              </span>
              <span className={config.comisionPlanner.activa ? '' : styles.disabledValue}>{fmtPrice(comisionPlannerAmount)}</span>
            </div>

            <hr className={styles.totalDivider} />

            <div className={styles.grandTotal}>
              <span>TOTAL</span>
              <span>{fmtPrice(total)}</span>
            </div>

            {/* Ganancia estimada — informational */}
            {gananciaEstimada > 0 && (
              <div className={styles.gananciaRow}>
                <span>Ganancia estimada (markup)</span>
                <span>{fmtPrice(gananciaEstimada)}</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className={styles.budgetActions}>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={!nombreCliente.trim() || budgetItems.length === 0 || saving}
          >
            <Save size={16} /> {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            className={styles.pdfBtn}
            onClick={handleGeneratePdf}
            disabled={budgetItems.length === 0 || generatingPdf}
          >
            <FileText size={16} /> {generatingPdf ? 'Generando...' : 'Generar PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}
