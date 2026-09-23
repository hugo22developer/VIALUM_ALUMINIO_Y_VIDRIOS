export interface Product {
  slug: string;
  title: string;
  description: string;
  /** Ruta esperada en /public, p. ej. /products/canceles-de-bano/corredizo.jpg */
  image: string;
  specs: string[];
  simulationPrompt?: string;
}

export interface CategoryData {
  slug: string;
  /** Nombre completo, usado en títulos y breadcrumbs */
  label: string;
  /** Nombre corto, usado en el footer y chips */
  shortLabel: string;
  eyebrow: string;
  heroDescription: string;
  heroSpecs: string[];
  accent: string; // clase de gradiente Tailwind, coherente con Catalogo.tsx en home
  products: Product[];
}

export const CATEGORIES: CategoryData[] = [
  {
    slug: "canceles-de-bano",
    label: "Canceles de Baño",
    shortLabel: "Canceles de baño",
    eyebrow: "Línea Canceles",
    heroDescription:
      "Vidrio templado de 8mm y herrajes minimalistas: cero filtraciones, cero ruido en los rieles.",
    heroSpecs: ["Vidrio 8mm Templado", "Herrajes ocultos", "Instalación en 1 día"],
    accent: "from-glass-400/25 via-graphite-800 to-graphite-900",
    products: [
      {
        slug: "corredizo-minimalista",
        title: "Cancel Corredizo Minimalista",
        description:
          "Dos hojas sobre riel superior de aluminio anodizado, sin marco inferior visible. Ideal para baños donde el espacio de apertura es limitado.",
        image: "/products/canceles-de-bano/corredizo-minimalista.jpg",
        specs: ["8mm Templado", "Riel superior", "Anodizado mate"],
      },
      {
        slug: "abatible-frameless",
        title: "Cancel Abatible Frameless",
        description:
          "Una sola hoja sin marco perimetral, sostenida por bisagras de piso a techo. La opción más limpia visualmente para baños de autor.",
        image: "/products/canceles-de-bano/abatible-frameless.jpg",
        specs: ["10mm Templado", "Bisagra piso-techo", "Sin perfil visible"],
      },
      {
        slug: "fijo-panoramico",
        title: "Cancel Fijo Panorámico",
        description:
          "Panel fijo de gran formato para regaderas abiertas, con sello inferior antiderrame y esquinero de acero inoxidable.",
        image: "/products/canceles-de-bano/fijo-panoramico.jpg",
        specs: ["8mm Templado", "Sello antiderrame", "Esquinero inox"],
      },
      {
        slug: "en-angulo",
        title: "Cancel en Ángulo",
        description:
          "Configuración esquinera de dos hojas corredizas, pensada para regaderas en L donde se necesita aprovechar cada centímetro.",
        image: "/products/canceles-de-bano/en-angulo.jpg",
        specs: ["8mm Templado", "Riel doble vía", "Perfil esquinero"],
      },
    ],
  },
  {
    slug: "ventanas-puertas",
    label: "Ventanas y Puertas",
    shortLabel: "Ventanas y puertas",
    eyebrow: "Línea Ventanería",
    heroDescription:
      "Sistemas Serie 3 con cámara de aire DVH: el balance entre entrada de luz y control térmico real.",
    heroSpecs: ["Perfil Serie 3", "DVH 24mm", "Doble sello EPDM"],
    accent: "from-amber-500/20 via-graphite-800 to-graphite-900",
    products: [
      {
        slug: "ventana-corrediza-serie-3",
        title: "Ventana Corrediza Serie 3",
        description:
          "Dos o tres hojas sobre riel de rodamiento silencioso, con cámara DVH que reduce hasta 40% la transferencia de calor.",
        image: "/products/ventanas-puertas/ventana-corrediza.jpg",
        specs: ["Serie 3", "DVH 24mm", "2-3 hojas"],
      },
      {
        slug: "puerta-corrediza-panoramica",
        title: "Puerta Corrediza Panorámica",
        description:
          "Vanos de gran formato para conectar interior y jardín, con riel embebido a piso y opción de mosquitero integrado.",
        image: "/products/ventanas-puertas/puerta-corrediza.jpg",
        specs: ["Serie 4", "Riel embebido", "Mosquitero opcional"],
      },
      {
        slug: "ventana-proyectante",
        title: "Ventana Proyectante",
        description:
          "Apertura hacia afuera con brazo de compás, óptima para ventilación cruzada sin sacrificar hermeticidad ante lluvia.",
        image: "/products/ventanas-puertas/ventana-proyectante.jpg",
        specs: ["Serie 3", "Brazo compás", "Resistente a lluvia"],
      },
      {
        slug: "puerta-abatible",
        title: "Puerta Abatible de Aluminio",
        description:
          "Hoja abatible de una o dos piezas con cerradura multipunto, pensada para accesos principales de oficina y vivienda.",
        image: "/products/ventanas-puertas/puerta-abatible.jpg",
        specs: ["Serie 4", "Cerradura multipunto", "1-2 hojas"],
      },
    ],
  },
  {
    slug: "barandales-portones",
    label: "Barandales y Portones",
    shortLabel: "Barandales y portones",
    eyebrow: "Línea Exteriores",
    heroDescription:
      "Estructura de aluminio y vidrio pensada para exteriores: resistencia a intemperie sin perder la línea minimalista.",
    heroSpecs: ["Aluminio Reforzado", "Vidrio 10mm", "Anticorrosivo"],
    accent: "from-steel-400/25 via-graphite-800 to-graphite-900",
    products: [
      {
        slug: "barandal-vidrio-templado",
        title: "Barandal de Vidrio Templado",
        description:
          "Paneles de vidrio templado de 10mm con fijación puntual de acero inoxidable, para escaleras y balcones sin obstruir la vista.",
        image: "/products/barandales-portones/barandal-vidrio.jpg",
        specs: ["10mm Templado", "Fijación puntual", "Inox 304"],
      },
      {
        slug: "porton-corredizo-automatizado",
        title: "Portón Corredizo Automatizado",
        description:
          "Estructura de aluminio reforzado sobre riel de piso, compatible con motor y control remoto para acceso vehicular.",
        image: "/products/barandales-portones/porton-corredizo.jpg",
        specs: ["Aluminio reforzado", "Listo para motor", "Riel de piso"],
      },
      {
        slug: "barandal-minimalista",
        title: "Barandal Minimalista de Aluminio",
        description:
          "Postes delgados de aluminio anodizado con pasamanos continuo, diseñado para terrazas donde la ligereza visual es prioridad.",
        image: "/products/barandales-portones/barandal-minimalista.jpg",
        specs: ["Anodizado", "Pasamanos continuo", "Postes 40mm"],
      },
      {
        slug: "porton-abatible",
        title: "Portón Abatible Residencial",
        description:
          "Una o dos hojas abatibles con marco perimetral reforzado, tratamiento anticorrosivo y herrajes de alto tráfico.",
        image: "/products/barandales-portones/porton-abatible.jpg",
        specs: ["Anticorrosivo", "Herrajes alto tráfico", "1-2 hojas"],
      },
    ],
  },
  {
    slug: "muebles-a-medida",
    label: "Muebles a Medida",
    shortLabel: "Muebles a medida",
    eyebrow: "Línea Interiores",
    heroDescription:
      "Aluminio anodizado y cristal para mobiliario interior: la misma precisión de taller aplicada a piezas de uso diario.",
    heroSpecs: ["Aluminio + Cristal", "Acabado anodizado", "Diseño a medida"],
    accent: "from-glass-300/20 via-graphite-800 to-graphite-900",
    products: [
      {
        slug: "closet-puertas-cristal",
        title: "Clóset con Puertas de Cristal",
        description:
          "Sistema corredizo o abatible con puertas de cristal esmerilado o transparente sobre marco de aluminio delgado.",
        image: "/products/muebles-a-medida/closet-cristal.jpg",
        specs: ["Cristal esmerilado", "Marco delgado", "Corredizo o abatible"],
      },
      {
        slug: "vitrina-expositora",
        title: "Vitrina Expositora",
        description:
          "Estructura de aluminio con repisas de cristal templado, iluminación interior opcional para exhibición comercial.",
        image: "/products/muebles-a-medida/vitrina.jpg",
        specs: ["Cristal templado", "Iluminación opcional", "A medida"],
      },
      {
        slug: "division-ambientes",
        title: "División de Ambientes",
        description:
          "Paneles fijos o pivotantes de aluminio y vidrio para delimitar espacios de oficina u hogar sin cerrar la luz natural.",
        image: "/products/muebles-a-medida/division-ambientes.jpg",
        specs: ["Fijo o pivotante", "Vidrio 6mm", "Perfil slim"],
      },
      {
        slug: "cubierta-cristal",
        title: "Mesa con Cubierta de Cristal",
        description:
          "Estructura de aluminio anodizado con cubierta de cristal templado de canto pulido, para comedor o sala de juntas.",
        image: "/products/muebles-a-medida/cubierta-cristal.jpg",
        specs: ["Cristal 10mm", "Canto pulido", "Base anodizada"],
      },
    ],
  },
];

export function getCategory(slug: string | undefined): CategoryData | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
