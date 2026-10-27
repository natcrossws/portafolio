import type { LocalizedText } from "@/lib/projects";

export type CaseStudyCopy = {
  heroTitle: {
    line1: LocalizedText;
    line2: LocalizedText;
    accent: LocalizedText;
  };
  heroLead: LocalizedText;
  meta: {
    project: LocalizedText;
    year: LocalizedText;
    label: LocalizedText;
    role: LocalizedText;
  };
  metaLabels: {
    project: LocalizedText;
    year: LocalizedText;
    label: LocalizedText;
    role: LocalizedText;
  };
  componentsCaption: LocalizedText;
  compareTitle: LocalizedText;
  compareLead: LocalizedText;
  compareLeftTitle: LocalizedText;
  compareRightTitle: LocalizedText;
  compareLeft: LocalizedText[];
  compareRight: LocalizedText[];
  stepsTitle: LocalizedText;
  steps: { title: LocalizedText; body: LocalizedText }[];
  frontsTitle: LocalizedText;
  frontsLead: LocalizedText;
  adminTitle: LocalizedText;
  adminPill: LocalizedText;
  adminItems: LocalizedText[];
  publicTitle: LocalizedText;
  publicPill: LocalizedText;
  publicItems: LocalizedText[];
  resultCaption: LocalizedText;
  principlesTitle: LocalizedText;
  principles: { title: LocalizedText; body: LocalizedText }[];
};

export const CMS_CASE_STUDY: CaseStudyCopy = {
  heroTitle: {
    line1: {
      es: "Un CMS para muchos sitios,",
      en: "A CMS for many sites,",
    },
    line2: {
      es: "publicado como",
      en: "published as",
    },
    accent: {
      es: "HTML estático",
      en: "static HTML",
    },
  },
  heroLead: {
    es: "Plataforma a medida para administrar una red de sitios institucionales desde un solo sistema. Cada instancia tiene identidad, navegación y contenido propios; el panel es dinámico y el sitio público se publica como HTML pre-renderizado.",
    en: "A custom platform to run a network of institutional sites from one system. Each instance keeps its own identity, navigation, and content; the admin panel is dynamic and the public site ships as pre-rendered HTML.",
  },
  meta: {
    project: { es: "CMS CEN Morena", en: "CEN Morena CMS" },
    year: { es: "2024-2026", en: "2024-2026" },
    label: { es: "Multi-sitio · Componentes", en: "Multi-site · Components" },
    role: {
      es: "Diseño UX/UI, Desarrollo FrontEnd y BackEnd, dirección técnica e implementación",
      en: "UX/UI design, FrontEnd and BackEnd development, technical leadership and implementation",
    },
  },
  metaLabels: {
    project: { es: "Proyecto", en: "Project" },
    year: { es: "Año", en: "Year" },
    label: { es: "Enfoque", en: "Focus" },
    role: { es: "Rol", en: "Role" },
  },
  componentsCaption: {
    es: "Biblioteca de componentes — con estos bloques se diseñó y construyó la página nacional",
    en: "Component library — the national page was designed and built with these blocks",
  },
  compareTitle: {
    es: "El problema frente a WordPress",
    en: "The problem versus WordPress",
  },
  compareLead: {
    es: "Cuando hay muchas sedes, el modelo dinámico por visita se vuelve frágil. Este proyecto cambia el enfoque de entrega.",
    en: "With many sites, a live dynamic model gets fragile. This project changes the delivery approach.",
  },
  compareLeftTitle: {
    es: "WordPress típico",
    en: "Typical WordPress",
  },
  compareRightTitle: {
    es: "Este CMS",
    en: "This CMS",
  },
  compareLeft: [
    {
      es: "Varias instalaciones o un multisite complejo de gobernar",
      en: "Several installs or a complex multisite to govern",
    },
    {
      es: "Experiencias de edición distintas según tema y plugins",
      en: "Different editing experiences by theme and plugins",
    },
    {
      es: "Sitio público atado al rendimiento del CMS en cada visita",
      en: "Public site tied to CMS performance on every visit",
    },
    {
      es: "Alto costo de coherencia visual entre sitios",
      en: "High cost of visual consistency across sites",
    },
  ],
  compareRight: [
    {
      es: "Una plataforma, muchas instancias por diseño",
      en: "One platform, many instances by design",
    },
    {
      es: "Editor visual propio con bloques y reglas comunes",
      en: "Custom visual editor with shared blocks and rules",
    },
    {
      es: "Al publicar, el contenido se congela en HTML estático",
      en: "On publish, content freezes into static HTML",
    },
    {
      es: "El público consume el resultado ya construido",
      en: "The public consumes the already built result",
    },
  ],
  stepsTitle: {
    es: "De la edición al sitio público",
    en: "From editing to the public site",
  },
  steps: [
    {
      title: {
        es: "Núcleo de aplicación",
        en: "Application core",
      },
      body: {
        es: "Orquesta instancias, páginas, menús, medios, entradas y usuarios. Cada sitio se administra como un producto independiente dentro de la misma plataforma.",
        en: "Orchestrates instances, pages, menus, media, entries, and users. Each site is administered as an independent product inside the same platform.",
      },
    },
    {
      title: {
        es: "Composición de páginas",
        en: "Page composition",
      },
      body: {
        es: "El contenido no es una plantilla fija: página → secciones → columnas → componentes. Esa jerarquía une editor, vista previa y publicación.",
        en: "Content is not a fixed template: page → sections → columns → components. That hierarchy ties editor, preview, and publishing together.",
      },
    },
    {
      title: {
        es: "Publicación estática",
        en: "Static publishing",
      },
      body: {
        es: "Al publicar, un generador pre-renderiza componentes, arma el HTML final y actualiza el catálogo del sitio. El resultado queda listo para hosting estático.",
        en: "On publish, a generator pre-renders components, builds final HTML, and updates the site catalog. The result is ready for static hosting.",
      },
    },
  ],
  frontsTitle: {
    es: "Dos frentes, un mismo lenguaje de componentes",
    en: "Two fronts, one component language",
  },
  frontsLead: {
    es: "La misma biblioteca de bloques alimenta el panel de edición y el HTML público. Lo que se diseña en el editor es lo que se publica.",
    en: "The same block library feeds the editing panel and the public HTML. What you design in the editor is what gets published.",
  },
  adminTitle: {
    es: "Administración",
    en: "Administration",
  },
  adminPill: {
    es: "Panel de edición",
    en: "Editing panel",
  },
  adminItems: [
    {
      es: "Interfaces server-rendered con interacción en el cliente",
      en: "Server-rendered interfaces with client interaction",
    },
    {
      es: "Page builder visual: canvas, layout y biblioteca de bloques",
      en: "Visual page builder: canvas, layout, and block library",
    },
    {
      es: "Misma lógica de render en edición y en HTML publicado",
      en: "Same render logic in editing and published HTML",
    },
    {
      es: "Módulos para listados, medios, menús y instancias",
      en: "Modules for listings, media, menus, and instances",
    },
  ],
  publicTitle: {
    es: "Sitio público",
    en: "Public site",
  },
  publicPill: {
    es: "HTML publicado",
    en: "Published HTML",
  },
  publicItems: [
    {
      es: "Páginas pre-renderizadas listas para el visitante",
      en: "Pre-rendered pages ready for the visitor",
    },
    {
      es: "Router estático generado desde el catálogo de páginas",
      en: "Static router generated from the page catalog",
    },
    {
      es: "Componentes ricos embebidos en el HTML final",
      en: "Rich components embedded in the final HTML",
    },
    {
      es: "Entrega liviana: sin armar la página en cada visita",
      en: "Lightweight delivery: no page build on every visit",
    },
  ],
  resultCaption: {
    es: "Sitio nacional construido con la biblioteca de componentes",
    en: "National site built with the component library",
  },
  principlesTitle: {
    es: "Seis principios que guiaron la experiencia",
    en: "Six principles that shaped the experience",
  },
  principles: [
    {
      title: {
        es: "Edición visual sin pensar en código",
        en: "Visual editing without thinking in code",
      },
      body: {
        es: "Armar layout, soltar bloques y ver el resultado en contexto, cerca de un page builder.",
        en: "Assemble layout, drop blocks, and see the result in context—close to a page builder.",
      },
    },
    {
      title: {
        es: "Flujo editorial claro",
        en: "Clear editorial flow",
      },
      body: {
        es: "Borrador → vista previa → publicar. La salida a público es una decisión explícita.",
        en: "Draft → preview → publish. Going public is an explicit decision.",
      },
    },
    {
      title: {
        es: "Preview alineado con producción",
        en: "Preview aligned with production",
      },
      body: {
        es: "La vista previa usa el mismo pipeline de componentes que la publicación.",
        en: "Preview uses the same component pipeline as publishing.",
      },
    },
    {
      title: {
        es: "Velocidad percibida al publicar",
        en: "Perceived speed when publishing",
      },
      body: {
        es: "Se regenera lo esencial primero; el visitante navega HTML ya generado.",
        en: "What matters regenerates first; visitors browse already generated HTML.",
      },
    },
    {
      title: {
        es: "Biblioteca institucional",
        en: "Institutional library",
      },
      body: {
        es: "Héroes, noticias, regeneración, redes, personas y galerías — no un editor vacío.",
        en: "Heroes, news, Regeneración, social, people, and galleries—not an empty editor.",
      },
    },
    {
      title: {
        es: "Multi-instancia sin fricción",
        en: "Multi-instance without friction",
      },
      body: {
        es: "Cada sitio en su contexto, con la misma experiencia de uso en toda la red.",
        en: "Each site in its own context, with the same experience across the network.",
      },
    },
  ],
};
