/**
 * Insertar cat?logo Godino Saenz en Supabase
 * Fuente: catalogomuebles (2).pdf - Cat?logo Octubre 2024
 * Sin precios en el cat?logo: se usa placeholder de $1 para que aparezcan en el presupuestador.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CAT_IDS = {
  MOBILIARIO_LIVING: '17b46318-7c32-4364-9128-d41ed0222fe2',
  MESAS_SILLAS:      'a65ae374-d562-4860-a215-fdc11cf34b1b',
  GENERAL:           '24830643-89a5-42e3-a122-c80953e69996',
  OBJETO_DECO:       '3a961f2d-ec1a-4d81-ba50-45a34cb66ab1',
  BANCOS:            '003472f4-1521-465d-984c-7c191cdbf573',
};

const proveedor = 'Godino Saenz';
const PLACEHOLDER_PRICE = 1;

// â”€â”€ SILLAS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const sillas = [
  {
    nombre: 'Silla Malasia Negra',
    descripcion: JSON.stringify({ material: 'Mimbre y madera', medidas: 'Altura 80 cm, asiento 40x45 cm', color: 'Negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Malasia Natural',
    descripcion: JSON.stringify({ material: 'Mimbre y madera', medidas: 'Altura 80 cm, asiento 40x45 cm', color: 'Natural', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Thonet',
    descripcion: JSON.stringify({ material: 'Madera', medidas: 'Altura 90 cm, asiento 40x42 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Nepal',
    descripcion: JSON.stringify({ material: 'Mimbre y madera', medidas: 'Altura 90 cm, asiento 40x42 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Viena Arena',
    descripcion: JSON.stringify({ material: 'Madera y lino', medidas: 'Altura 100 cm, asiento 50x60 cm', color: 'Arena', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Viena Negra',
    descripcion: JSON.stringify({ material: 'Madera y pana', medidas: 'Altura 100 cm, asiento 50x60 cm', color: 'Negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Viena Esterilla',
    descripcion: JSON.stringify({ material: 'Madera', medidas: 'Altura 100 cm, asiento 50x60 cm', color: 'Esterilla', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Bamboo Negra',
    descripcion: JSON.stringify({ material: 'CaÃ±a de bamboo y madera', medidas: 'Altura 80 cm, base 50x50 cm', color: 'Negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Bamboo Caramel',
    descripcion: JSON.stringify({ material: 'CaÃ±a de bamboo y madera', medidas: 'Altura 80 cm, base 50x50 cm', color: 'Caramel', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Noruega',
    descripcion: JSON.stringify({ material: 'Madera', medidas: 'Altura 78 cm, base 45x50 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Cross Caramelo',
    descripcion: JSON.stringify({ material: 'Madera y fibra', medidas: 'Altura 80 cm, base 45x45 cm', color: 'Caramelo', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Cross Natural',
    descripcion: JSON.stringify({ material: 'Madera y fibra', medidas: 'Altura 80 cm, base 45x45 cm', color: 'Natural', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Cross Negra',
    descripcion: JSON.stringify({ material: 'Madera y fibra', medidas: 'Altura 80 cm, base 45x45 cm', color: 'Negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Ghost Cristal',
    descripcion: JSON.stringify({ material: 'AcrÃ­lico', medidas: 'Altura 90 cm, asiento 40x42 cm', color: 'Cristal', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Ghost Negra',
    descripcion: JSON.stringify({ material: 'AcrÃ­lico', medidas: 'Altura 90 cm, asiento 40x42 cm', color: 'Negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Ghost Cristal AP',
    descripcion: JSON.stringify({ material: 'Policarbonato', medidas: 'Altura 85 cm, base 55x50 cm', color: 'Cristal con apoyabrazos', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Ghost Blanca AP',
    descripcion: JSON.stringify({ material: 'Policarbonato', medidas: 'Altura 85 cm, base 55x50 cm', color: 'Blanca con apoyabrazos', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla ParÃ­s Blanca',
    descripcion: JSON.stringify({ material: 'Aluminio y policarbonato', medidas: 'Altura 85 cm, base 50x45 cm', color: 'Blanca', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla ParÃ­s Negra',
    descripcion: JSON.stringify({ material: 'Aluminio y policarbonato', medidas: 'Altura 85 cm, base 50x45 cm', color: 'Negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla ParÃ­s Blanca y Negra',
    descripcion: JSON.stringify({ material: 'Aluminio y policarbonato', medidas: 'Altura 85 cm, base 50x45 cm', color: 'Bicolor blanco y negro', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tiffany Negra',
    descripcion: JSON.stringify({ material: 'Madera torneada', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tiffany Blanca',
    descripcion: JSON.stringify({ material: 'Madera torneada', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Blanca', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tiffany Dorada',
    descripcion: JSON.stringify({ material: 'Madera torneada', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Dorada', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tiffany Madera',
    descripcion: JSON.stringify({ material: 'Madera torneada', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Madera natural', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tiffany Cristal',
    descripcion: JSON.stringify({ material: 'AcrÃ­lico', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Cristal', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tiffany Verde',
    descripcion: JSON.stringify({ material: 'Policarbonato', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Verde', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tiffany Violeta',
    descripcion: JSON.stringify({ material: 'Policarbonato', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Violeta', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tiffany Roja',
    descripcion: JSON.stringify({ material: 'Policarbonato', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Roja', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tiffany Amarilla',
    descripcion: JSON.stringify({ material: 'Policarbonato', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Amarilla', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Imperio',
    descripcion: JSON.stringify({ material: 'Policarbonato', medidas: 'Altura 85 cm, base 45x45 cm', color: 'Cristal', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla NapoleÃ³n',
    descripcion: JSON.stringify({ material: 'Madera torneada', medidas: 'Altura 80 cm, asiento 40x40 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tulum Beige',
    descripcion: JSON.stringify({ material: 'Hierro y cuerda (soga)', medidas: 'Altura 75 cm, base 40x40 cm', color: 'Beige', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Tulum Negra',
    descripcion: JSON.stringify({ material: 'Hierro y cuerda (soga)', medidas: 'Altura 75 cm, base 40x40 cm', color: 'Negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Mar del Plata Natural',
    descripcion: JSON.stringify({ material: 'Mimbre', medidas: 'Altura 80 cm, asiento 60x55 cm', color: 'Natural', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Mar del Plata',
    descripcion: JSON.stringify({ material: 'Mimbre', medidas: 'Altura 80 cm, asiento 60x55 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Estilo Esterilla Blanca',
    descripcion: JSON.stringify({ material: 'Madera, cuerina y esterilla', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Blanca arpillera', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Silla Estilo Esterilla Negra',
    descripcion: JSON.stringify({ material: 'Madera, cuerina y esterilla', medidas: 'Altura 80 cm, asiento 40x40 cm', color: 'Negra arpillera', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
];

// â”€â”€ LIVINGS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const livings = [
  {
    nombre: 'Living Grecia Rosa',
    descripcion: JSON.stringify({ material: 'Pana rosa + mesa hierro y vidrio', medidas: 'SillÃ³n 3c: 200x90x90 cm, SillÃ³n 1c: 60x80x80 cm', pax: 7, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 2 asientos + mesas milan cromadas', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Grecia VisÃ³n',
    descripcion: JSON.stringify({ material: 'Pana visÃ³n + mesa hierro y vidrio', medidas: 'SillÃ³n 3c: 200x90x90 cm, SillÃ³n 1c: 80x75x70 cm', pax: 7, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 2 asientos + mesas milan negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Grecia Negro',
    descripcion: JSON.stringify({ material: 'Pana negra + mesa hierro y vidrio', medidas: 'SillÃ³n 3c: 200x90x90 cm, SillÃ³n 1c: 60x80x80 cm', pax: 7, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 2 asientos + mesas milan cromadas', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Grecia Azul',
    descripcion: JSON.stringify({ material: 'Pana azul + mesa hierro y vidrio', medidas: 'SillÃ³n 3c: 200x90x90 cm, SillÃ³n 1c: 80x75x70 cm', pax: 7, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 2 asientos + mesas milan negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Valencia Negro',
    descripcion: JSON.stringify({ material: 'Pana negra + mesa hierro y vidrio', medidas: 'SillÃ³n 3c: 200x70x70 cm, SillÃ³n 1c: 77x70x70 cm, Camastro: 120x50 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 camastro + mesas valencia doradas', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Valencia Tiza',
    descripcion: JSON.stringify({ material: 'Pana tiza + mesa hierro y vidrio', medidas: 'SillÃ³n 3c: 200x70x70 cm, SillÃ³n 1c: 77x70x70 cm, Camastro: 120x50 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 camastro + mesas valencia doradas', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Valencia Verde',
    descripcion: JSON.stringify({ material: 'Pana verde + mesa hierro y vidrio', medidas: 'SillÃ³n 3c: 200x70x70 cm, SillÃ³n 1c: 77x70x70 cm, Camastro: 120x50 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 camastro + mesas valencia doradas', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Buenos Aires',
    descripcion: JSON.stringify({ material: 'Pana ocre + mesa de metal y espejo', medidas: 'SillÃ³n 3c: 200x90x90 cm, SillÃ³n 1c: 90x65x70 cm', pax: 5, componentes: '1 sillÃ³n 3c + 2 sillones 1c + mesas lyon doradas', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Malta',
    descripcion: JSON.stringify({ material: 'Pana gris + mesas cromadas', medidas: 'SillÃ³n 3c: 220x90x80 cm, SillÃ³n 1c: 70x85x70 cm', pax: 7, componentes: '1 sillÃ³n 3c + 2 sillones praga + mesas cromadas + 2 puffs', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living de Pana Verde',
    descripcion: JSON.stringify({ material: 'Pana verde + mesa madera con hierro', medidas: 'SillÃ³n 3c: 195x75x95 cm, SillÃ³n 1c: 75x85x80 cm, Camastro: 40x195x45 cm, Mesa: 50x130x50 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 camastro + mesa Bariloche madera natural', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Negro CapitonÃ©',
    descripcion: JSON.stringify({ material: 'Pana negra con terminaciones en madera + mesa de mÃ¡rmol blanco y hierro', medidas: 'SillÃ³n 3c: 200x100x70 cm, SillÃ³n 1c: 75x85x80 cm, Camastro: 40x160x50 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillitas + 1 camastro + mesa mÃ¡rmol blanco', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Pana VisÃ³n',
    descripcion: JSON.stringify({ material: 'Pana visÃ³n con terminaciones en madera + mesa de madera patinada', medidas: 'SillÃ³n 3c: 210x90x70 cm, SillÃ³n 1c: 85x80x70 cm, Camastro: 45x120x50 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 camastro + mesa madera patinada', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living New York',
    descripcion: JSON.stringify({ material: 'Cuero con terminaciones en madera + mesa de madera', medidas: 'SillÃ³n 3c: 215x75x105 cm, SillÃ³n 1c: 90x65x85 cm, Camastro: 50x150x55 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 camastro + mesa madera clÃ¡sica natural', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Viena',
    descripcion: JSON.stringify({ material: 'Madera y tapizados en lino', medidas: 'SillÃ³n 3c: 220x90x80 cm, SillÃ³n 1c: 70x85x70 cm, Camastro: 120x80x50 cm, Mesa: 45x50x100 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + mesa + camastro', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Boston Chester',
    descripcion: JSON.stringify({ material: 'SÃ­mil lino con cuerpo de madera; camastro y terminaciones en sÃ­mil rafia', medidas: 'SillÃ³n 3c: 210x90x80 cm, SillÃ³n 1c: 75x70x70 cm, Camastro: 30x140x80 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 camastro + mesa madera natural', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living California',
    descripcion: JSON.stringify({ material: 'SÃ­mil lino con terminaciones en madera; mesa de mÃ¡rmol blanco con patas doradas', medidas: 'SillÃ³n 3c: 215x85x105 cm, SillÃ³n 1c: 80x85x85 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + juego de mesas doble altura mÃ¡rmol blanco', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Boston',
    descripcion: JSON.stringify({ material: 'SÃ­mil lino con cuerpo en madera; camastro y terminaciÃ³n en sÃ­mil rafia', medidas: 'SillÃ³n 3c: 200x75x70 cm, SillÃ³n 1c: 75x70x70 cm, Camastro: 30x140x75 cm', pax: 7, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 camastro + mesa madera natural', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Bali',
    descripcion: JSON.stringify({ material: 'RatÃ¡n', medidas: 'SillÃ³n 3c: 190x80x80 cm, SillÃ³n 1c: 90x80x80 cm, Mesa: 60x50 cm', pax: 5, componentes: '1 sillÃ³n 3c + 2 sillones 1c + mesa redonda ratÃ¡n', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living CÃ¡diz',
    descripcion: JSON.stringify({ material: 'CaÃ±a al natural', medidas: 'SillÃ³n 3c: 200x90x70 cm, SillÃ³n 1c: 60x60x80 cm, Banco: 50x35x46 cm, Mesa: 65 cm diÃ¡m x 45 cm', pax: 7, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 banco + mesa redonda', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Ibiza',
    descripcion: JSON.stringify({ material: 'Madera y mesas de madera natural', medidas: 'SillÃ³n 3c: 220x80x60 cm, SillÃ³n 1c: 70x70x75 cm, Banco: 140x40x45 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 banco + juego mesas doble altura', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Ibiza Negro',
    descripcion: JSON.stringify({ material: 'Madera negro + mesas de madera', medidas: 'SillÃ³n 3c: 220x80x60 cm, SillÃ³n 1c: 70x70x75 cm, Banco: 140x40x45 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 banco + juego mesas doble altura', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Bagan',
    descripcion: JSON.stringify({ material: 'Mimbre', medidas: 'SillÃ³n 1c: 85x70x90 cm, Mesa: 60x40 cm', pax: 2, componentes: '2 sillones 1c + mesa mimbre', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Yakarta',
    descripcion: JSON.stringify({ material: 'Mimbre', medidas: 'SillÃ³n 2c: 150x70x90 cm, SillÃ³n 1c: 80x70x90 cm, Mesa: 80x50 cm', pax: 5, componentes: '1 sillÃ³n 2c + 2 sillones 1c + mesa mimbre', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Singapur',
    descripcion: JSON.stringify({ material: 'CaÃ±a de bamboo', medidas: 'SillÃ³n 3c: 90x190x80 cm, SillÃ³n 1c: 85x80x85 cm, Mesa: 45 cm diÃ¡m x 65 cm', pax: 5, componentes: '1 sillÃ³n 3c + 2 sillones 1c + mesa bamboo', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Gervasoni',
    descripcion: JSON.stringify({ material: 'Madera natural', medidas: 'SillÃ³n 3c: 150x65x75 cm, SillÃ³n 1c: 80x65x75 cm', pax: 5, componentes: '1 sillÃ³n 3c + 2 sillones 1c + juego mesas doble altura', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Tulum Negro',
    descripcion: JSON.stringify({ material: 'Soga cocida sobre metal; mesas con superficie de vidrio', medidas: 'SillÃ³n 1c: 95x60x70 cm, Mesas: 50 cm diÃ¡m x 50 y 45 cm', pax: 4, componentes: '4 sillones 1c + juego mesas doble altura vidrio', color: 'Negro', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Tulum Arena',
    descripcion: JSON.stringify({ material: 'Soga cocida sobre metal; mesas con superficie de vidrio', medidas: 'SillÃ³n 1c: 95x60x70 cm, Mesas: 50 cm diÃ¡m x 50 y 45 cm', pax: 4, componentes: '4 sillones 1c + juego mesas doble altura vidrio', color: 'Arena', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Jordania',
    descripcion: JSON.stringify({ material: 'RatÃ¡n natural', medidas: 'SillÃ³n 2c: 130x85x70 cm, SillÃ³n 1c: 80x80x70 cm, Mesa: 80x60 cm diÃ¡m', pax: 4, componentes: '1 sillÃ³n 2c + 2 sillones 1c + mesa redonda ratÃ¡n', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living Tiffany',
    descripcion: JSON.stringify({ material: 'Madera con mesa de madera clÃ¡sica', medidas: 'SillÃ³n 3c: 180x80x60 cm, SillÃ³n 1c: 80x60x60 cm, Mesa: 45x120x90 cm', pax: 5, componentes: '1 sillÃ³n 3c + 2 sillones 1c + mesa madera clÃ¡sica', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living de Estilo Blanco',
    descripcion: JSON.stringify({ material: 'Cuerina blanca con cuerpo en madera natural + mesa madera clÃ¡sica blanca', medidas: 'SillÃ³n 3c: 230x80x60 cm, SillÃ³n 1c: 80x75x60 cm, Camastro: 40x125x50 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 camastro + mesa madera blanca', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
  {
    nombre: 'Living de Estilo Negro',
    descripcion: JSON.stringify({ material: 'Pana negra con cuerpo en madera natural + mesa madera clÃ¡sica negra', medidas: 'SillÃ³n 3c: 230x80x60 cm, SillÃ³n 1c: 80x75x60 cm, Camastro: 40x125x50 cm', pax: 8, componentes: '1 sillÃ³n 3c + 2 sillones 1c + 1 camastro + mesa madera negra', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MOBILIARIO_LIVING,
  },
];

// â”€â”€ MESAS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const mesas = [
  {
    nombre: 'Mesa Viena',
    descripcion: JSON.stringify({ material: 'Madera 100%', medidas: 'Altura 75 cm, superficie 120x240 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Viena Roble',
    descripcion: JSON.stringify({ material: 'Madera roble', medidas: 'Altura 75 cm, superficie 120x240 cm', color: 'Roble', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Barcelona',
    descripcion: JSON.stringify({ material: 'Madera', medidas: 'Altura 75 cm, superficie 120x200 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Islandia',
    descripcion: JSON.stringify({ material: 'Madera', medidas: 'Altura 80 cm, superficie 220x120 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Amalfi',
    descripcion: JSON.stringify({ material: 'Madera 100%', medidas: 'Altura 80 cm, superficie 120x240 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Amalfi Redonda',
    descripcion: JSON.stringify({ material: 'Madera', medidas: 'DiÃ¡metro 160 cm, altura 80 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa de Acero',
    descripcion: JSON.stringify({ material: 'Acero con superficie de espejos', medidas: 'Altura 80 cm, superficie 200x120 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa de Campo',
    descripcion: JSON.stringify({ material: 'Madera 100% con patas torneadas', medidas: 'Altura 80 cm, superficie 220x100 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
  {
    nombre: 'Mesa Pic-Nic Baja',
    descripcion: JSON.stringify({ material: 'Madera 100%', medidas: 'Altura 70 cm, base 60x200 cm', proveedor }),
    precio_costo: 0,
    id_categoria: CAT_IDS.MESAS_SILLAS,
  },
];

async function run() {
  console.log('=== INSERCIÃ“N CATÃLOGO GODINO SAENZ ===\n');

  // 1. Buscar proveedor existente o crear
  console.log('1ï¸âƒ£  Buscando/creando proveedor "Godino Saenz"...');
  let proveedorId;

  const { data: existing } = await supabase
    .from('proveedores')
    .select('id')
    .eq('nombre', 'Godino Saenz')
    .single();

  if (existing) {
    proveedorId = existing.id;
    console.log(`   â™»ï¸  Proveedor ya existe con ID: ${proveedorId}`);
  } else {
    const { data: provData, error: provErr } = await supabase
      .from('proveedores')
      .insert({ nombre: 'Godino Saenz', notas: 'CatÃ¡logo Octubre 2024 â€” sillas, livings y mesas. Sin precios en catÃ¡logo.' })
      .select()
      .single();

    if (provErr) {
      console.error('Error creando proveedor:', provErr.message);
      return;
    }
    proveedorId = provData.id;
    console.log(`   âœ… Proveedor creado con ID: ${proveedorId}`);
  }

  // 2. Insertar todos los productos
  const todos = [...sillas, ...livings, ...mesas].map(p => ({
    ...p,
    precio_costo: p.precio_costo > 0 ? p.precio_costo : PLACEHOLDER_PRICE,
    id_proveedor: proveedorId,
  }));

  console.log(`\n2ï¸âƒ£  Insertando ${todos.length} productos (${sillas.length} sillas, ${livings.length} livings, ${mesas.length} mesas)...`);

  const { data: insertedItems, error: insertErr } = await supabase
    .from('items')
    .insert(todos)
    .select();

  if (insertErr) {
    console.error('Error insertando items:', insertErr.message);
    return;
  }

  console.log(`   âœ… ${insertedItems.length} productos insertados correctamente!\n`);
  insertedItems.forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.nombre}`);
  });

  console.log(`\nðŸŽ‰ Â¡CatÃ¡logo Godino Saenz completamente integrado!`);
  console.log(`   Proveedor ID para upload_fotos: ${proveedorId}`);
}

run();

