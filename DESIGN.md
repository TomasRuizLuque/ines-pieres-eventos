---
name: Inés Pieres Eventos
description: Ambientación de eventos — transformamos espacios en experiencias memorables.
colors:
  olive-deep: "#3d4a29"
  olive-mid: "#5a6b40"
  olive-dark: "#151a0e"
  sand-warm: "#f4efeb"
  sand-mid: "#e8e3d6"
  sand-dark: "#e5dac1"
  gold-earth: "#c4b087"
  olive-mist: "#d1dac5"
  text-dark: "#1a1a1a"
  text-mid: "#4a4a4a"
  text-light: "#f9f9f9"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 4vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "normal"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2rem, 3.5vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Lato, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "normal"
  label:
    fontFamily: "Lato, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.15em"
rounded:
  pill: "50px"
  card: "12px"
  input: "6px"
  organic: "100px 0 100px 0"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "2rem"
  lg: "4rem"
  xl: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.sand-warm}"
    textColor: "{colors.olive-deep}"
    rounded: "{rounded.pill}"
    padding: "1rem 2.5rem"
  button-primary-hover:
    backgroundColor: "{colors.sand-dark}"
    textColor: "{colors.olive-deep}"
    rounded: "{rounded.pill}"
    padding: "1rem 2.5rem"
  button-submit:
    backgroundColor: "{colors.sand-warm}"
    textColor: "{colors.olive-deep}"
    rounded: "{rounded.input}"
    padding: "1.2rem 2rem"
  button-submit-hover:
    backgroundColor: "{colors.sand-dark}"
    textColor: "{colors.olive-deep}"
    rounded: "{rounded.input}"
    padding: "1.2rem 2rem"
---

# Design System: Inés Pieres Eventos

## 1. Overview

**Creative North Star: "El Jardín Íntimo"**

Este sistema visual habita en el cruce entre lo orgánico y lo elegante. No es un catálogo de servicios — es un jardín que te recibe. La paleta es la de la tierra después de la lluvia: oliva profundo, arena cálida, oro apagado. La tipografía habla en dos voces: Playfair Display para los momentos que piden emoción, Lato para la claridad funcional. El movimiento es contenido, intencional — como el viento suave que mueve las flores en una ambientación real.

Lo que este sistema rechaza explícitamente: fondos todo blanco que parecen catálogos de productos, grillas repetitivas de fotos sin alma, cualquier tipografía que se sienta corporativa o genérica, degradados de color morado o azul "de IA", stock photos de novias sonrientes genéricas, y cualquier cosa que se sienta transaccional.

El tono no es el de una empresa que ofrece servicios — es el de alguien que va a transformar el día más importante de tu vida. El diseño llega primero con emoción, después con información.

**Key Characteristics:**
- Paleta terrestre y botánica — oliva, arena, oro
- Tipografía serif de autoridad para emocionar, sans limpia para informar
- Superficies oscuras (olive-deep) y claras (sand-warm) que se alternan para crear ritmo
- Sombras suaves y difusas — nada duro ni dramático
- Movimiento lento y orgánico, nunca ansioso
- Formas orgánicas (border-radius asimétrico) que rompen la rigidez digital

## 2. Colors: La Paleta del Jardín

Una paleta de tierra y luz que evoca naturaleza cultivada, no naturaleza salvaje.

### Primary
- **Deep Olive** (`#3d4a29`): El verde oscuro de una hoja densa a la sombra. Color ancla del sistema — fondo de secciones de alto impacto (contacto, footer), texto de encabezados sobre fondos claros, bordes decorativos.
- **Mid Olive** (`#5a6b40`): Variante intermedia del oliva. Para estados hover, capas secundarias, y transiciones de fondo.
- **Void Olive** (`#151a0e`): El verde casi negro del suelo del bosque de noche. Exclusivo para el fondo más profundo del footer — nunca como color de texto o superficie general.

### Secondary
- **Earth Gold** (`#c4b087`): El dorado apagado de la luz filtrándose entre hojas. Exclusivo para labels de categoría, detalles de acento en el carrusel, y elementos de firma. No para fondos grandes ni botones.
- **Olive Mist** (`#d1dac5`): El verde claro del follaje a contraluz. Para texto acento dentro de superficies oscuras (hero) donde el oliva puro quedaría sordo.

### Neutral
- **Warm Sand** (`#f4efeb`): La arena cálida que es el fondo base del sitio completo. Nunca frío, nunca puro blanco.
- **Sand Mid** (`#e8e3d6`): Una gradación del sand para degradados sutiles y profundidad en secciones claras.
- **Sand Dark** (`#e5dac1`): El estado hover del sand-warm. Para botones en reposo sobre superficies oscuras.
- **Text Dark** (`#1a1a1a`): Casi negro con una leve temperatura cálida. Nunca `#000000` puro.
- **Text Mid** (`#4a4a4a`): Para párrafos de cuerpo sobre fondos claros — suficiente contraste, sin el peso del negro.
- **Text Light** (`#f9f9f9`): Para texto sobre superficies de olive-deep.

### Named Rules
**La Regla del Oliva.** El `olive-deep` (#3d4a29) es el único color saturado que tiene peso real en el sistema. Cuando aparece, define. No lo diluyas con demasiado contexto — que su presencia sea un evento.

**La Regla del Blanco.** `#ffffff` no existe en este sistema. Toda superficie "blanca" es `sand-warm` (#f4efeb). El blanco puro destruye la temperatura orgánica del jardín.

## 3. Typography

**Display Font:** Playfair Display (con fallback Georgia, serif)
**Body Font:** Lato (con fallback system-ui, sans-serif)

**Character:** Playfair Display porta la emoción — sus serifas pronunciadas y su contraste dramático hacen que los titulares se lean como el primer verso de un poema. Lato porta la claridad — su geometría humanista funciona a tamaños pequeños y en mayúsculas sin perder calidez. Juntos crean la tensión correcta entre lo poético y lo funcional.

### Hierarchy
- **Display** (peso 500, clamp(3rem, 6vw, 6rem), line-height 1.1): Solo para el H1 del hero. Puede ir en italic para la palabra dinámica animada. Color: sand-warm sobre fondos oscuros.
- **Headline** (peso 500, clamp(2.5rem, 4vw, 4rem), line-height 1.15): H2 de secciones principales (contacto, "quiénes somos"). Color: olive-deep sobre fondos claros, sand-warm sobre fondos oscuros.
- **Title** (peso 500, clamp(2rem, 3.5vw, 3.5rem), line-height 1.2): H2 del carrusel de trabajos. También para el nombre de firma en la sección Historia (italic, 2rem).
- **Body** (peso 400, 1.1rem, line-height 1.8, máx. 65ch): Párrafos narrativos. Color: text-mid (#4a4a4a) sobre fondos claros, sand-warm con 85% de opacidad sobre fondos oscuros. La línea nunca pasa los 65ch.
- **Label** (peso 700, 0.75rem, letter-spacing 0.15em, UPPERCASE): Para categorías del carrusel, indicadores de sección, texto de navegación. Color: gold-earth para labels dentro de superficies, sand-warm para nav sobre hero.

### Named Rules
**La Regla de la Firma.** El nombre "Inés Pieres" en la sección Historia usa Playfair Display en italic a 2rem — es el único lugar donde la tipografía opera como firma manuscrita. No replicar este tratamiento en otros contextos.

**La Regla del Label.** Todo label usa Lato uppercase 0.75rem con letter-spacing 0.15em. Nunca mezclar este tratamiento con Playfair Display — los labels son funcionales, no emocionales.

## 4. Elevation

Este sistema es plano por defecto, con sombras suaves y difusas reservadas para superficies que se elevan de su contexto. No hay sombras oscuras ni dramáticas — la profundidad viene de la temperatura de color y del fondo fotográfico, no del drop shadow.

El vidrio esmerilado (frosted glass) es el único mecanismo de capas que este sistema usa activamente — en el formulario sobre el fondo olive-deep y en los botones CTA sobre el hero fotográfico.

### Shadow Vocabulary
- **Ambient Lift** (`0 10px 30px rgba(0,0,0,0.1)`): Cards del carrusel en reposo. Muy difuso, casi imperceptible.
- **Portrait Shadow** (`0 20px 40px rgba(0,0,0,0.1)`): Imagen portrait en la sección Historia. Misma difusión, mayor desplazamiento vertical.
- **Form Container** (`0 10px 40px rgba(0,0,0,0.15)`): La caja de formulario sobre el fondo olive. Ligeramente más presente que ambient lift.
- **Hover Glow Cream** (`0 5px 15px rgba(244,239,235,0.2)`): Estado hover del botón de envío sobre superficie oscura. La sombra usa el color del propio botón, no negro.

### Named Rules
**La Regla Plana.** Las superficies descansan planas. Las sombras aparecen solo cuando un elemento necesita distinguirse de su fondo o responder a interacción. Un shadow-md de Tailwind con rgba(0,0,0,0.3) es prohibido — si se ve como un shadow de Bootstrap 2014, es demasiado.

## 5. Components

### Buttons
El único CTA del sitio es un botón pill — contenido, confiado, sin urgencia.
- **Shape:** Cápsula completa (50px radius). La redondez es orgánica, no digital.
- **Primary (sobre hero oscuro):** Fondo `rgba(0,0,0,0.2)` + `backdrop-filter: blur(5px)`, borde `1px solid rgba(244,239,235,0.5)`, texto sand-warm, Lato uppercase 0.85rem tracking 2px.
- **Hover:** Fondo sand-warm sólido, texto olive-deep, lift `translateY(-3px)`, sombra ambient `0 10px 20px rgba(0,0,0,0.2)`.
- **Submit (sobre fondo olive-deep):** Fondo sand-warm sólido, texto olive-deep, border-radius 6px (no pill), padding 1.2rem full-width.
- **Submit Hover:** Fondo sand-dark (#e5dac1), lift `translateY(-2px)`, cream glow shadow.
- **Transition:** `all 0.4s ease` para el CTA principal, `all 0.3s ease` para el submit.

### Cards — Carrusel de Trabajos
El carrusel es la galería del jardín — las imágenes son lo que venden.
- **Dimensiones:** 35vw × 55vh (desktop), 85vw × 50vh (mobile).
- **Corner Style:** 12px — gently curved, no pill.
- **Overlay:** Gradiente `linear-gradient(to top, rgba(30,30,30,0.8) 0%, rgba(30,30,30,0) 50%)` siempre visible. En hover sube a 0.95 y alcanza 65%.
- **Hover:** `transform: scale(1.05)` en la imagen inner a `0.8s cubic-bezier(0.25, 1, 0.5, 1)` — lento, orgánico.
- **Label de categoría:** gold-earth (#c4b087), uppercase, 0.75rem, tracking 2px.
- **Título:** Playfair Display 1.8rem sand-warm.
- **Shadow:** ambient-lift en reposo.

### Form Box
La caja del formulario flota sobre el fondo olive-deep como una superficie de vidrio empañado.
- **Background:** `rgba(255,255,255,0.1)` + `backdrop-filter: blur(15px)`.
- **Border:** `1px solid rgba(255,255,255,0.2)`.
- **Corner Style:** 12px.
- **Shadow:** form-container `0 10px 40px rgba(0,0,0,0.15)`.

### Inputs / Fields
- **Style:** Fondo `rgba(255,255,255,0.15)`, borde `1px solid rgba(255,255,255,0.3)`, texto blanco, border-radius 6px, padding 0.8rem 1rem.
- **Focus:** Borde `rgba(255,255,255,0.8)`, fondo `rgba(255,255,255,0.25)`, ring `0 0 0 3px rgba(255,255,255,0.2)`. Sin outline nativo.
- **Labels:** Lato 0.9rem, `rgba(244,239,235,0.8)` — legible pero no compite con el input.
- **Placeholder/vacío:** Se heredan del fondo.

### Navigation
- **Style:** Lato uppercase 0.85rem, letter-spacing 2px. Transparente sobre el hero, con texto sand-warm y text-shadow para legibilidad. Sobre fondos claros, texto olive-deep.
- **Hover:** Subrayado de 1px que se dibuja de izquierda a derecha (`scaleX` 0→1) a 0.3s ease.
- **CTA nav link:** Frosted glass pill — mismo tratamiento que el botón hero, con padding 0.6rem 1.5rem y border-radius 4px.
- **Mobile:** El nav colapsa y desaparece por debajo de 768px.

### Portrait Frame — Sección Historia
Componente signature del sistema: la imagen portrait con forma orgánica y bloque decorativo offset.
- **Shape:** `border-radius: 100px 0 100px 0` — alternando esquinas redondeadas que sugieren una hoja o pétalo.
- **Decorative block:** Un borde outline (1px solid olive-deep) con el mismo border-radius, desplazado -20px top y -20px left. Crea profundidad sin sombra.
- **Shadow:** portrait-shadow `0 20px 40px rgba(0,0,0,0.1)`.

## 6. Do's and Don'ts

### Do:
- **Usá `#f4efeb` (sand-warm) como fondo base.** Nunca `#ffffff` — el blanco puro destruye la temperatura del jardín.
- **Dejá que las imágenes hablen.** En el carrusel y el hero, las fotos son el contenido principal. El texto apoya, no compite.
- **Usá Playfair Display solo para momentos emocionales.** Titulares de sección, el H1 del hero, la firma de Inés. Para todo lo demás, Lato.
- **Mantené las sombras difusas.** `rgba(0,0,0,0.1)` con blur grande. Nunca oscuro ni recortado.
- **Usá la forma orgánica del portrait** (`100px 0 100px 0`) cuando quieras diferenciar una imagen con carga emocional de las fotos del carrusel.
- **Alternate surfaces:** Alternár entre sand-warm (claro) y olive-deep (oscuro) entre secciones crea ritmo y evita la monotonía del sitio todo blanco.
- **Usá `gold-earth` (#c4b087) con parsimonia** — solo para labels de categoría y detalles de acento. Es el dorado del jardín, no del casino.

### Don't:
- **No hagas sitios todo blancos que parezcan catálogos.** Este no es un catálogo. Es una experiencia. Si una sección no evoca nada, rediseñala.
- **No uses grillas de fotos simétricas sin alma.** El carrusel horizontal con cards de tamaño heterogéneo es intencional. Las grillas tipo Pinterest con thumbnails idénticos son lo opuesto de lo que es Inés.
- **No listes servicios como ítems de menú.** Cualquier lista de servicios debe ir acompañada de lenguaje emocional, no de bullets secos.
- **No uses degradados morados, azules ni ningún color de "IA".** La paleta es tierra, oliva, oro, arena. Un violeta apareciendo es una alarma roja.
- **No uses Inter, Roboto, ni ninguna sans genérica** para los titulares. Playfair Display es la voz emocional de Inés — reemplazarla por una sans neutraliza la identidad.
- **No uses sombras oscuras tipo `rgba(0,0,0,0.3)` con `box-shadow: 0 4px 8px`.** Eso es la sombra del catálogo de 2014. Aquí las sombras son susurros, no gritos.
- **No uses glassmorphism como decoración.** El frosted glass existe solo en el formulario (sobre superficie oscura) y en los botones CTA (sobre hero fotográfico). Fuera de esos contextos, es decoración vacía.
- **No coloques stock photos de novias sonriendo genéricas.** Solo trabajo real de Inés. La autenticidad es el argumento de venta.
- **No repitas el mismo card layout.** Si tenés que mostrar trabajos en grilla, variá el tamaño y el recorte. El `border-radius: 100px 0 100px 0` del portrait puede aparecer en otros contextos de imagen individual — nunca en una grilla repetitiva.
