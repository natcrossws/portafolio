import type { Locale } from "@/lib/i18n/dictionaries";

export type PortfolioTheme =
  | "software"
  | "creative"
  | "frontend"
  | "branding";

export type LocalizedText = Record<Locale, string>;

export type ProjectScreenshot = {
  src: string;
  alt: LocalizedText;
  caption?: LocalizedText;
  /** Defaults to image. Use "video" for mp4/mov embeds in the detail carousel. */
  kind?: "image" | "video";
  /** Optional poster image for video shots. */
  poster?: string;
  /** Optional playback rate for video shots (e.g. 1.25). */
  playbackRate?: number;
  /**
   * Visual treatment on the detail page:
   * - feature: highlighted shot (e.g. component library)
   * - tall: full-page capture shown in a scrollable frame
   * - default: carousel slide
   */
  layout?: "default" | "feature" | "tall";
};

export type PortfolioProject = {
  id: string;
  theme: PortfolioTheme;
  /** Day.month, e.g. "02.06" */
  date: string;
  /** Two-digit year, e.g. "23" */
  yearShort: string;
  /** Optional display year for the case study meta (e.g. "2023-2024"). */
  yearLabel?: LocalizedText;
  /** Keep the case-study hero title on one line (desktop). */
  heroSingleLine?: boolean;
  image: string;
  /** Optional visual zoom for cover images (e.g. 1.2). */
  imageZoom?: number;
  title: LocalizedText;
  description: LocalizedText;
  /** Longer narrative for the detail page */
  story: LocalizedText;
  /** Why the institution / context matters */
  institutionNote: LocalizedText;
  /**
   * Optional note tying a featured screenshot (e.g. component library)
   * to how the public site was designed and built.
   */
  composeNote?: LocalizedText;
  role: LocalizedText;
  tags: LocalizedText[];
  place: LocalizedText;
  accent: string;
  screenshots: ProjectScreenshot[];
};

export const PORTFOLIO_THEMES: {
  id: PortfolioTheme;
  label: LocalizedText;
}[] = [
  {
    id: "software",
    label: {
      es: "Software Development",
      en: "Software Development",
    },
  },
  {
    id: "creative",
    label: {
      es: "Creative Technology",
      en: "Creative Technology",
    },
  },
  {
    id: "frontend",
    label: {
      es: "FrontEnd · UX/UI",
      en: "FrontEnd · UX/UI",
    },
  },
  {
    id: "branding",
    label: {
      es: "Branding",
      en: "Branding",
    },
  },
];

/** Projects per page when a theme needs pagination. */
export const PORTFOLIO_PAGE_SIZE = 3;

export const projects: PortfolioProject[] = [
  {
    id: "imss-bienestar-web",
    theme: "software",
    date: "09.25",
    yearShort: "24",
    yearLabel: { es: "2023-2024", en: "2023-2024" },
    image: "/software-development/sitioweb-imssbienestar.png",
    accent: "#fe507b",
    title: {
      es: "Sitio web nacional del IMSS Bienestar",
      en: "IMSS Bienestar national website",
    },
    description: {
      es: "Portal nacional IMSS-Bienestar: interfaces públicas y CMS a la medida para noticias y contenidos urgentes de alto impacto.",
      en: "IMSS-Bienestar national portal: public interfaces and a purpose-built CMS for news and high-impact urgent content.",
    },
    story: {
      es: "Portal nacional de IMSS-Bienestar para centralizar servicios, programas y actividades. Construí las interfaces públicas y, de forma central, un CMS a la medida para noticias y publicación urgente: rapidez, claridad y control editorial sin editar el sitio a mano.",
      en: "IMSS-Bienestar national portal to centralize services, programs, and activities. I built the public interfaces and, centrally, a purpose-built CMS for news and urgent publishing—fast, clear, and under editorial control without manual site edits.",
    },
    institutionNote: {
      es: "IMSS Bienestar es el programa federal de atención médica gratuita. Su sitio es la puerta de entrada a información de salud pública que afecta a comunidades en todo México.",
      en: "IMSS Bienestar is Mexico’s federal free healthcare program. Its website is the gateway to public health information that reaches communities nationwide.",
    },
    role: {
      es: "Desarrollo FrontEnd y BackEnd",
      en: "FrontEnd and BackEnd development",
    },
    tags: [
      { es: "Salud pública", en: "Public health" },
      { es: "Portal nacional", en: "National portal" },
    ],
    place: {
      es: "IMSS Bienestar · México",
      en: "IMSS Bienestar · Mexico",
    },
    screenshots: [
      {
        src: "/software-development/sitioweb-imssbienestar.png",
        alt: {
          es: "Captura del sitio IMSS Bienestar",
          en: "IMSS Bienestar site screenshot",
        },
        caption: {
          es: "Home institucional",
          en: "Institutional home",
        },
      },
      {
        src: "/software-development/imss-bienestar-sala-prensa.jpg",
        layout: "feature",
        alt: {
          es: "Sala de prensa del IMSS Bienestar — carrusel dinámico de comunicados",
          en: "IMSS Bienestar press room — dynamic news carousel",
        },
        caption: {
          es: "Sala de prensa · módulo dinámico",
          en: "Press room · dynamic module",
        },
      },
    ],
  },
  {
    id: "cms-cen-morena",
    theme: "software",
    date: "03.26",
    yearShort: "26",
    image: "/software-development/cms-morena.jpeg",
    imageZoom: 1.35,
    accent: "#7b5cff",
    title: {
      es: "CMS Institucional — CEN Morena",
      en: "Institutional CMS — CEN Morena",
    },
    description: {
      es: "CMS multi-instancia con publicación estática: una plataforma, muchas sedes, editor visual propio y sitios públicos en HTML pre-renderizado.",
      en: "Multi-instance CMS with static publishing: one platform, many sites, a custom visual editor, and public pages as pre-rendered HTML.",
    },
    story: {
      es: "Plataforma CMS a medida para administrar una red de sitios institucionales desde un solo sistema. Cada instancia tiene su propia identidad, navegación y contenido, pero comparte la misma base tecnológica, el mismo editor visual y el mismo flujo de publicación. El panel es dinámico; el sitio público se publica como HTML estático.",
      en: "Custom CMS platform to run a network of institutional sites from one system. Each instance keeps its own identity, navigation, and content while sharing the same stack, visual editor, and publishing flow. The admin panel is dynamic; the public site ships as static HTML.",
    },
    institutionNote: {
      es: "El CEN Morena articula comunicación política a escala nacional. Un CMS sólido reduce riesgos de inconsistencia, acelera publicaciones y da continuidad institucional entre equipos y entidades.",
      en: "CEN Morena coordinates political communication at national scale. A solid CMS reduces inconsistency, speeds publishing, and sustains institutional continuity across teams and entities.",
    },
    composeNote: {
      es: "El sitio nacional se diseñó y construyó ensamblando esta biblioteca: héroes, noticias, galerías, regeneración, redes, personas y más. Cada bloque del editor es la misma pieza que termina en el HTML estático publicado.",
      en: "The national site was designed and built by composing this library: heroes, news, galleries, Regeneración, social, people, and more. Each editor block is the same piece that lands in the published static HTML.",
    },
    role: {
      es: "Diseño UX/UI, Desarrollo FrontEnd y BackEnd, dirección técnica e implementación",
      en: "UX/UI design, FrontEnd and BackEnd development, technical leadership and implementation",
    },
    tags: [
      { es: "CMS", en: "CMS" },
      { es: "Multi-sitio", en: "Multi-site" },
      { es: "Componentes", en: "Components" },
    ],
    place: {
      es: "CEN Morena · México",
      en: "CEN Morena · Mexico",
    },
    screenshots: [
      {
        src: "/software-development/cms-morena.jpeg",
        layout: "feature",
        alt: {
          es: "Biblioteca de componentes del CMS: selector de bloques para componer páginas",
          en: "CMS component library: block picker for composing pages",
        },
        caption: {
          es: "Biblioteca de componentes",
          en: "Component library",
        },
      },
      {
        src: "/software-development/cms-morena-nacional.jpg",
        layout: "tall",
        alt: {
          es: "Página nacional de Morena construida con el CMS — captura completa del sitio publicado",
          en: "Morena national page built with the CMS — full capture of the published site",
        },
        caption: {
          es: "Sitio nacional · resultado publicado",
          en: "National site · published result",
        },
      },
    ],
  },
  {
    id: "kemarketing-saas",
    theme: "software",
    date: "06.25",
    yearShort: "25",
    image: "/software-development/kemarketing_favicon.png",
    accent: "#4c7bff",
    title: {
      es: "Esquema SaaS KeMarketing",
      en: "KeMarketing SaaS suite",
    },
    description: {
      es: "Plataformas SaaS: KePlayas, KeEscuelita, KeServicios y KeSonrisas — productos digitales verticales bajo un mismo esquema técnico.",
      en: "SaaS platforms: KePlayas, KeEscuelita, KeServicios, and KeSonrisas — vertical digital products on one technical scheme.",
    },
    story: {
      es: "Definición y desarrollo del esquema de plataformas SaaS de KeMarketing. Cada producto (KePlayas, KeEscuelita, KeServicios, KeSonrisas) atiende un vertical distinto compartiendo bases de arquitectura, identidad de producto y prácticas de entrega.",
      en: "Definition and build of KeMarketing’s SaaS platform scheme. Each product (KePlayas, KeEscuelita, KeServicios, KeSonrisas) serves a different vertical while sharing architecture, product identity, and delivery practices.",
    },
    institutionNote: {
      es: "KeMarketing opera productos para sectores reales (turismo, educación, servicios, salud dental). El esquema SaaS importa porque escala operación y calidad sin reinventar la base en cada cliente.",
      en: "KeMarketing ships products for real sectors (tourism, education, services, dental). The SaaS scheme matters because it scales operations and quality without reinventing the base for every client.",
    },
    role: {
      es: "Arquitectura y desarrollo de producto",
      en: "Product architecture & development",
    },
    tags: [
      { es: "SaaS", en: "SaaS" },
      { es: "Producto", en: "Product" },
    ],
    place: {
      es: "KeMarketing · México",
      en: "KeMarketing · Mexico",
    },
    screenshots: [
      {
        src: "/software-development/kemarketing_favicon.png",
        alt: {
          es: "Suite de productos KeMarketing",
          en: "KeMarketing product suite",
        },
        caption: {
          es: "Familia de productos",
          en: "Product family",
        },
      },
    ],
  },
  {
    id: "siqal",
    theme: "software",
    date: "11.21",
    yearShort: "23",
    yearLabel: { es: "2023", en: "2023" },
    heroSingleLine: true,
    image: "/software-development/siqal-stps.png",
    accent: "#fe6a3c",
    title: {
      es: "SIQAL — Secretaría del Trabajo",
      en: "SIQAL — Ministry of Labor",
    },
    description: {
      es: "Plataforma STPS para recibir, gestionar y dar seguimiento a reportes de vulneraciones laborales, accidentes e incumplimientos contractuales.",
      en: "STPS platform to receive, manage, and track reports of labor-rights violations, workplace accidents, and contractual breaches.",
    },
    story: {
      es: "Desarrollo de una plataforma digital para la STPS orientada a modernizar la recepción, la gestión y el seguimiento de reportes relacionados con posibles vulneraciones de derechos laborales, accidentes de trabajo e incumplimientos contractuales.",
      en: "Digital platform for STPS to modernize intake, management, and follow-up of reports on possible labor-rights violations, workplace accidents, and contractual breaches.",
    },
    institutionNote: {
      es: "La Secretaría del Trabajo y Previsión Social regula derechos laborales a nivel federal. SIQAL conecta a la ciudadanía con procesos formales: cada mejora técnica tiene impacto social directo.",
      en: "Mexico’s Ministry of Labor oversees labor rights at the federal level. SIQAL connects citizens to formal processes—every technical improvement has direct social impact.",
    },
    role: {
      es: "Desarrollo FrontEnd - UX/UI Design y Desarrollo BackEnd",
      en: "FrontEnd development - UX/UI Design and BackEnd development",
    },
    tags: [
      { es: "Gobierno", en: "Government" },
      { es: "Ciudadanía", en: "Citizen services" },
    ],
    place: {
      es: "STPS · México",
      en: "STPS · Mexico",
    },
    screenshots: [
      {
        src: "/software-development/siqal-stps.png",
        alt: {
          es: "Interfaz SIQAL",
          en: "SIQAL interface",
        },
        caption: {
          es: "Flujos de atención",
          en: "Service flows",
        },
      },
    ],
  },
  {
    id: "psicometricas-imss",
    theme: "software",
    date: "06.23",
    yearShort: "23",
    image: "/software-development/bolsadetrabajo-imssbienestar.png",
    accent: "#ffb240",
    title: {
      es: "Pruebas psicométricas — Bolsa de Trabajo IMSS Bienestar",
      en: "Psychometric tests — IMSS Bienestar job board",
    },
    description: {
      es: "Evaluación interactiva con drag and drop para la bolsa de trabajo de IMSS-Bienestar: jerarquizar elementos y traducirlos en respuestas estructuradas.",
      en: "Interactive drag-and-drop assessment for the IMSS-Bienestar job board: rank elements and turn them into structured responses.",
    },
    story: {
      es: "Desarrollo de una experiencia de evaluación interactiva para el sistema de bolsa de trabajo de IMSS-Bienestar, mediante una interfaz dinámica que permitía a las personas candidatas organizar y jerarquizar elementos a través de interacciones de arrastrar y soltar (drag and drop). La solución integró la manipulación visual con una lógica de identificación basada en posición y orden.",
      en: "Interactive assessment experience for the IMSS-Bienestar job board: a dynamic interface where candidates organize and rank elements via drag and drop. Visual manipulation is wired to position-and-order logic that turns user decisions into structured psychometric answers.",
    },
    institutionNote: {
      es: "La bolsa de trabajo del IMSS Bienestar vincula talento con el sistema de salud pública. Las pruebas psicométricas deben ser justas, seguras y entendibles: de ellas depende una parte del proceso de selección institucional.",
      en: "The IMSS Bienestar job board connects talent to the public health system. Psychometric tests must be fair, secure, and clear—they shape part of the institutional selection process.",
    },
    role: {
      es: "UX · desarrollo de evaluación",
      en: "UX · assessment development",
    },
    tags: [
      { es: "Psicometría", en: "Psychometrics" },
      { es: "Bolsa de trabajo", en: "Job board" },
    ],
    place: {
      es: "IMSS Bienestar · México",
      en: "IMSS Bienestar · Mexico",
    },
    screenshots: [
      {
        src: "/software-development/bolsadetrabajo-imssbienestar.png",
        alt: {
          es: "Flujo de prueba psicométrica / bolsa de trabajo",
          en: "Psychometric test / job board flow",
        },
        caption: {
          es: "Bolsa de trabajo IMSS Bienestar",
          en: "IMSS Bienestar job board",
        },
      },
    ],
  },
  {
    id: "control-gestion-chj",
    theme: "software",
    date: "02.24",
    yearShort: "24",
    image: "/software-development/cnhj-cen-morena.jpg",
    imageZoom: 1.25,
    accent: "#782028",
    title: {
      es: "Control de Gestión — CNHJ CEN Morena",
      en: "Case management — CNHJ CEN Morena",
    },
    description: {
      es: "SII-CNHJ: sistema para llevar un asunto jurídico de principio a fin —escrito, turno, expediente, Pleno, estrados y archivo.",
      en: "SII-CNHJ: a system to take a legal matter end to end—filing, assignment, case file, Plenary, bulletin board, and archive.",
    },
    story: {
      es: "El SII-CNHJ es la aplicación con la que la Comisión lleva un asunto de principio a fin: llega un escrito, se turna a una ponencia, se abre expediente, se instruye, se vota cuando el Pleno debe resolver, se publica en estrados lo que ya está listo y, más adelante, se entrega al archivo. Antes ese trabajo vivía en hojas de cálculo separadas; el sistema reúne el recorrido en una sola aplicación.",
      en: "SII-CNHJ is the app the Commission uses to take a matter end to end: filing, assignment, case file, instruction, Plenary vote, bulletin board, and archive. What used to live in separate spreadsheets now runs in one application.",
    },
    institutionNote: {
      es: "La Comisión Nacional de Honestidad y Justicia (CNHJ) resuelve asuntos internos con impacto en la integridad del partido. Un sistema de control de gestión claro protege plazos, evidencia y responsabilidad institucional.",
      en: "The National Honesty and Justice Commission (CNHJ) resolves internal matters that affect party integrity. Clear case management protects deadlines, evidence, and institutional accountability.",
    },
    role: {
      es: "Análisis y desarrollo de sistema",
      en: "Systems analysis & development",
    },
    tags: [
      { es: "Control de gestión", en: "Case management" },
      { es: "Institucional", en: "Institutional" },
    ],
    place: {
      es: "CNHJ · CEN Morena",
      en: "CNHJ · CEN Morena",
    },
    screenshots: [
      {
        src: "/software-development/cnhj-cen-morena.jpg",
        alt: {
          es: "Correspondencia · Secretaría Técnica — CNHJ",
          en: "Correspondence · Technical Secretariat — CNHJ",
        },
        caption: {
          es: "Correspondencia · Secretaría Técnica",
          en: "Correspondence · Technical Secretariat",
        },
      },
    ],
  },
  {
    id: "registro-judicial",
    theme: "software",
    date: "05.24",
    yearShort: "24",
    image: "/software-development/registro-judicial.png",
    accent: "#782028",
    title: {
      es: "Registro para cargo judicial federal — México",
      en: "Federal judicial office registration — Mexico",
    },
    description: {
      es: "Desarrollo del registro para cargo judicial federal, con la Consejería Jurídica del Ejecutivo Federal.",
      en: "Build of the federal judicial office registration, with the Legal Counsel of the Federal Executive.",
    },
    story: {
      es: "Implementación del sistema de registro para aspirantes a cargo judicial federal en México. El trabajo abarcó flujos de captura, validaciones y una experiencia guiada para un trámite jurídico de alto impacto institucional.",
      en: "Implementation of the registration system for federal judicial office applicants in Mexico. The work covered capture flows, validations, and a guided experience for a high-impact institutional legal procedure.",
    },
    institutionNote: {
      es: "La Consejería Jurídica del Ejecutivo Federal acompaña procesos de alto impacto constitucional. Un registro sólido es infraestructura democrática: acceso, trazabilidad y transparencia.",
      en: "The Legal Counsel of the Federal Executive supports high-impact constitutional processes. Solid registration is democratic infrastructure: access, traceability, and transparency.",
    },
    role: {
      es: "Desarrollo de plataforma",
      en: "Platform development",
    },
    tags: [
      { es: "Gobierno", en: "Government" },
      { es: "Registro", en: "Registration" },
    ],
    place: {
      es: "Consejería Jurídica del Ejecutivo Federal",
      en: "Legal Counsel of the Federal Executive",
    },
    screenshots: [
      {
        src: "/software-development/registro-judicial.png",
        alt: {
          es: "Flujo de registro — Credencial INE",
          en: "Registration flow — INE credential",
        },
        caption: {
          es: "Paso Credencial INE · postulación",
          en: "INE credential step · application",
        },
      },
    ],
  },
  {
    id: "atlas-del-mito",
    theme: "creative",
    date: "11.25",
    yearShort: "25",
    image: "/creative-technology/mapa-mitologias.jpg",
    accent: "#7b5cff",
    title: {
      es: "Atlas del mito",
      en: "Atlas of Myth",
    },
    description: {
      es: "Atlas interactivo de civilizaciones antiguas: mapa, animaciones míticas e iconografía en 3D.",
      en: "Interactive atlas of ancient civilizations: map, mythic animations, and 3D iconography.",
    },
    story: {
      es: "Un atlas interactivo de civilizaciones antiguas. Sobre el mapa, cada civilización cobra vida con animaciones que cuentan sus mitos y su iconografía. El proyecto cruza historia del arte y desarrollo de software.",
      en: "An interactive atlas of ancient civilizations. On the map, each civilization comes alive with animations that tell its myths and iconography. The project crosses art history and software development.",
    },
    institutionNote: {
      es: "Nace en el aula de mitología e iconografía: el código no sustituye al mito, lo hace explorable. El Atlas traduce relatos antiguos en un sistema visual navegable.",
      en: "It starts in a mythology and iconography classroom: code does not replace myth—it makes it explorable. The Atlas turns ancient stories into a navigable visual system.",
    },
    role: {
      es: "Creative coding · 3D",
      en: "Creative coding · 3D",
    },
    tags: [
      { es: "Creative coding", en: "Creative coding" },
      { es: "3D", en: "3D" },
    ],
    place: {
      es: "Mitología clásica · academia",
      en: "Classical mythology · academia",
    },
    screenshots: [
      {
        kind: "video",
        src: "/creative-technology/mapa-mitologias.mp4",
        poster: "/creative-technology/mapa-mitologias.jpg",
        playbackRate: 1.85,
        alt: {
          es: "Atlas del mito — recorrido del mapa interactivo",
          en: "Atlas of Myth — interactive map walkthrough",
        },
        caption: {
          es: "Mapa interactivo · demo",
          en: "Interactive map · demo",
        },
      },
    ],
  },
  {
    id: "whisper-of-the-sound",
    theme: "creative",
    date: "03.26",
    yearShort: "26",
    image: "/creative-technology/whisper-of-the-sound.jpg",
    accent: "#fe507b",
    title: {
      es: "Whisper of the sound",
      en: "Whisper of the sound",
    },
    description: {
      es: "Arte generativo con redes neuronales: pintura digital impulsada por sonido instrumental en vivo. Laboratorio de escucha en el navegador.",
      en: "Generative art with neural networks: digital painting driven by live instrumental sound. A listening lab in the browser.",
    },
    story: {
      es: "Una interpretación en vivo genera texturas que se acumulan, se deforman y se disuelven. La obra escucha comportamiento —energía, ataques, tonalidad, ruido—, no solo volumen. Hoy funciona el laboratorio de escucha en el navegador.",
      en: "A live performance generates textures that accumulate, deform, and dissolve. The work listens to behavior—energy, attacks, tonality, noise—not just volume. The browser listening lab is already working.",
    },
    institutionNote: {
      es: "Une interpretación musical y pintura digital: el instrumento deja de ser solo audio y se vuelve trazo. Es un puente entre performance y machine learning creativo.",
      en: "It joins musical performance and digital painting: the instrument becomes more than audio—it becomes mark-making. A bridge between performance and creative machine learning.",
    },
    role: {
      es: "Arte generativo · ML",
      en: "Generative art · ML",
    },
    tags: [
      { es: "Generativo", en: "Generative" },
      { es: "Sonido", en: "Sound" },
    ],
    place: {
      es: "En desarrollo · Laboratorio de escucha",
      en: "In progress · Listening lab",
    },
    screenshots: [
      {
        src: "/creative-technology/whisper-of-the-sound.jpg",
        layout: "feature",
        alt: {
          es: "Whisper of the sound — piano en vivo ante visualizaciones inmersivas de ondas de luz",
          en: "Whisper of the sound — live piano before immersive light-wave visualizations",
        },
        caption: {
          es: "Performance · ondas de luz",
          en: "Performance · light waves",
        },
      },
    ],
  },
  {
    id: "lore",
    theme: "creative",
    date: "06.26",
    yearShort: "26",
    image: "/creative-technology/lore-ui.jpg",
    accent: "#4c7bff",
    title: {
      es: "Lore",
      en: "Lore",
    },
    description: {
      es: "Biblioteca digital con lógica de videojuego: progreso de lectura visible, avatar y mascota literaria. En fase de diseño.",
      en: "A digital library with game-like logic: visible reading progress, avatar, and literary pet. Currently in design phase.",
    },
    story: {
      es: "¿Y si leer se sintiera como avanzar en un videojuego? Lore vuelve visible el progreso de lectura: cada libro suma, un avatar te representa y una mascota literaria te acompaña. Hoy están definidas arquitectura, base de datos y UX.",
      en: "What if reading felt like leveling up in a video game? Lore makes reading progress visible: each book counts, an avatar represents you, and a literary pet keeps you company. Architecture, database, and UX are already defined.",
    },
    institutionNote: {
      es: "La biblioteca deja de ser un estante estático: se vuelve un mundo jugable. Lore trata la lectura como progreso, identidad y compañía — no solo como archivo.",
      en: "The library stops being a static shelf and becomes a playable world. Lore treats reading as progress, identity, and companionship—not just as an archive.",
    },
    role: {
      es: "Creative coding · producto",
      en: "Creative coding · product",
    },
    tags: [
      { es: "Biblioteca", en: "Library" },
      { es: "Game-like", en: "Game-like" },
    ],
    place: {
      es: "En desarrollo · Fase de diseño",
      en: "In progress · Design phase",
    },
    screenshots: [
      {
        src: "/creative-technology/lore-ui.jpg",
        layout: "feature",
        alt: {
          es: "Lore — interfaz de biblioteca digital con lógica de videojuego",
          en: "Lore — digital library interface with game-like logic",
        },
        caption: {
          es: "UI · fase de diseño",
          en: "UI · design phase",
        },
      },
    ],
  },
  {
    id: "arte-a-tiempo",
    theme: "creative",
    date: "08.26",
    yearShort: "26",
    image: "/images/identity-art-gallery.jpg",
    accent: "#ffb240",
    title: {
      es: "Arte a tiempo",
      en: "Art on Time",
    },
    description: {
      es: "En desarrollo. Centraliza exposiciones de museos y galerías en Ciudad de México: cultura, creative coding, data-art y UI.",
      en: "In development. Centralizes museum and gallery exhibitions in Mexico City: culture, creative coding, data-art, and UI.",
    },
    story: {
      es: "Proyecto en desarrollo que busca reunir las exposiciones de arte en museos y galerías de la Ciudad de México. Combina cultura, código creativo, data-art y diseño UI para hacer visible la agenda cultural de la ciudad en una sola experiencia.",
      en: "A project in development to gather art exhibitions across Mexico City museums and galleries. It combines culture, creative code, data-art, and UI design to make the city’s cultural agenda visible in one experience.",
    },
    institutionNote: {
      es: "La CDMX concentra una escena artística dispersa. Arte a tiempo da mapa y ritmo a esa oferta: menos ruido, más acceso, más presencia cultural en la vida cotidiana.",
      en: "Mexico City holds a scattered art scene. Art on Time maps and paces that offer: less noise, more access, more cultural presence in everyday life.",
    },
    role: {
      es: "Data-art · UI",
      en: "Data-art · UI",
    },
    tags: [
      { es: "Data-art", en: "Data-art" },
      { es: "Cultura", en: "Culture" },
    ],
    place: {
      es: "Ciudad de México · en desarrollo",
      en: "Mexico City · in development",
    },
    screenshots: [
      {
        src: "/images/identity-art-gallery.jpg",
        alt: {
          es: "Arte a tiempo — agenda cultural",
          en: "Art on Time — cultural agenda",
        },
        caption: {
          es: "Exposiciones CDMX",
          en: "CDMX exhibitions",
        },
      },
    ],
  },
  {
    id: "kemarketing-saas-design",
    theme: "frontend",
    date: "06.25",
    yearShort: "25",
    yearLabel: { es: "2025 - actualidad", en: "2025 - present" },
    image: "/fronend_uxui/kemarketing-home.jpg",
    accent: "#4c7bff",
    title: {
      es: "Diseño web de plataformas SaaS — KeMarketing",
      en: "SaaS web design — KeMarketing",
    },
    description: {
      es: "Diseño de interfaces y experiencia para las plataformas SaaS de KeMarketing: productos verticales claros, coherentes y listos para escala.",
      en: "Interface and experience design for KeMarketing’s SaaS platforms: clear, coherent vertical products ready to scale.",
    },
    story: {
      es: "Diseño web de las plataformas SaaS de KeMarketing (KePlayas, KeEscuelita, KeServicios, KeSonrisas). El foco fue unificar patrones de UI, jerarquía visual y flujos de producto sin perder la identidad de cada vertical.",
      en: "Web design for KeMarketing’s SaaS platforms (KePlayas, KeEscuelita, KeServicios, KeSonrisas). Focus: unify UI patterns, visual hierarchy, and product flows without losing each vertical’s identity.",
    },
    institutionNote: {
      es: "KeMarketing opera productos para sectores reales. Un diseño SaaS sólido reduce fricción de adopción y sostiene la misma calidad en cada marca del ecosistema.",
      en: "KeMarketing ships products for real sectors. Solid SaaS design lowers adoption friction and keeps quality consistent across every brand in the ecosystem.",
    },
    role: {
      es: "UX/UI y FrontEnd",
      en: "UX/UI and FrontEnd",
    },
    tags: [
      { es: "SaaS", en: "SaaS" },
      { es: "UI", en: "UI" },
    ],
    place: {
      es: "KeMarketing · México",
      en: "KeMarketing · Mexico",
    },
    screenshots: [
      {
        src: "/fronend_uxui/kemarketing-home.jpg",
        layout: "feature",
        alt: {
          es: "KeMarketing — landing principal del ecosistema SaaS",
          en: "KeMarketing — main SaaS ecosystem landing",
        },
        caption: {
          es: "KeMarketing · home",
          en: "KeMarketing · home",
        },
      },
      {
        src: "/fronend_uxui/keescuelita.jpg",
        alt: {
          es: "KeEscuelita — plataforma educativa con IA",
          en: "KeEscuelita — AI-powered education platform",
        },
        caption: {
          es: "KeEscuelita",
          en: "KeEscuelita",
        },
      },
      {
        src: "/fronend_uxui/keplayas.jpg",
        alt: {
          es: "KePlayas — sitio con reservas y agente de IA",
          en: "KePlayas — site with bookings and AI agent",
        },
        caption: {
          es: "KePlayas",
          en: "KePlayas",
        },
      },
    ],
  },
  {
    id: "design-system-cen-morena",
    theme: "frontend",
    date: "03.26",
    yearShort: "26",
    image: "/fronend_uxui/design-system-cen-morena.png",
    accent: "#782028",
    title: {
      es: "Design System — CEN Morena",
      en: "Design System — CEN Morena",
    },
    description: {
      es: "Design system para la presencia web nacional y estatal del CEN Morena: componentes, criterios visuales y consistencia multi-sitio.",
      en: "Design system for CEN Morena’s national and state web presence: components, visual rules, and multi-site consistency.",
    },
    story: {
      es: "Definición y construcción del design system que sostiene las interfaces del CMS institucional del CEN Morena. Tokens, componentes y reglas de interacción para que sitios nacionales y estatales compartan un mismo lenguaje visual.",
      en: "Definition and build of the design system behind CEN Morena’s institutional CMS interfaces. Tokens, components, and interaction rules so national and state sites share one visual language.",
    },
    institutionNote: {
      es: "Sin un design system, cada entidad improvisa. Con él, la comunicación política gana coherencia, velocidad editorial y control de calidad a escala nacional.",
      en: "Without a design system, every entity improvises. With one, political communication gains coherence, editorial speed, and quality control at national scale.",
    },
    role: {
      es: "Design systems · UI",
      en: "Design systems · UI",
    },
    tags: [
      { es: "Design system", en: "Design system" },
      { es: "Institucional", en: "Institutional" },
    ],
    place: {
      es: "CEN Morena · México",
      en: "CEN Morena · Mexico",
    },
    screenshots: [
      {
        src: "/fronend_uxui/design-system-cen-morena.png",
        alt: {
          es: "Portal Design System — componentes CEN Morena",
          en: "Design System portal — CEN Morena components",
        },
        caption: {
          es: "Portal · Componentes",
          en: "Portal · Components",
        },
      },
    ],
  },
  {
    id: "evaluacion-psicometrica-ux",
    theme: "frontend",
    date: "06.23",
    yearShort: "23",
    image: "/software-development/bolsadetrabajo-imssbienestar.png",
    accent: "#fe9bca",
    title: {
      es: "Evaluación psicométrica (UX) — IMSS Bienestar",
      en: "Psychometric assessment (UX) — IMSS Bienestar",
    },
    description: {
      es: "UX de evaluaciones psicométricas para la bolsa de trabajo del IMSS Bienestar: claridad, ritmo y confianza en cada paso.",
      en: "UX for psychometric assessments on the IMSS Bienestar job board: clarity, pacing, and trust at every step.",
    },
    story: {
      es: "Diseño de experiencia para pruebas psicométricas integradas a la bolsa de trabajo: instrucciones entendibles, feedback oportuno y flujos que reducen ansiedad sin comprometer la integridad de los datos.",
      en: "Experience design for psychometric tests integrated into the job board: clear instructions, timely feedback, and flows that reduce anxiety without compromising data integrity.",
    },
    institutionNote: {
      es: "En selección para el sistema de salud pública, la UX de la prueba es parte del proceso justo: menos errores, más comprensión, mejor experiencia ciudadana.",
      en: "In selection for the public health system, assessment UX is part of a fair process: fewer errors, more clarity, a better citizen experience.",
    },
    role: {
      es: "UX / UI",
      en: "UX / UI",
    },
    tags: [
      { es: "UX", en: "UX" },
      { es: "Psicometría", en: "Psychometrics" },
    ],
    place: {
      es: "IMSS Bienestar · México",
      en: "IMSS Bienestar · Mexico",
    },
    screenshots: [
      {
        src: "/software-development/bolsadetrabajo-imssbienestar.png",
        alt: {
          es: "UX de evaluación psicométrica IMSS Bienestar",
          en: "IMSS Bienestar psychometric assessment UX",
        },
        caption: {
          es: "Flujos de evaluación",
          en: "Assessment flows",
        },
      },
    ],
  },
  {
    id: "registro-judicial-ux",
    theme: "frontend",
    date: "05.24",
    yearShort: "24",
    image: "/fronend_uxui/registro-judicial-landing.jpg",
    accent: "#782028",
    title: {
      es: "Registro para cargo judicial federal — México",
      en: "Federal judicial office registration — Mexico",
    },
    description: {
      es: "Diseño UX/UI del registro para cargo judicial federal, con la Consejería Jurídica del Ejecutivo Federal.",
      en: "UX/UI design for federal judicial office registration, with the Legal Counsel of the Federal Executive.",
    },
    story: {
      es: "Diseño de la experiencia de registro para aspirantes a cargo judicial federal en México. El reto fue traducir un trámite jurídico complejo en una interfaz clara, guiada y confiable, alineada a requisitos institucionales.",
      en: "Experience design for applicants registering for federal judicial office in Mexico. The challenge: turn a complex legal procedure into a clear, guided, trustworthy interface aligned with institutional requirements.",
    },
    institutionNote: {
      es: "La Consejería Jurídica del Ejecutivo Federal acompaña procesos de alto impacto constitucional. Un registro bien diseñado es acceso a la justicia en la práctica: menos barreras, más transparencia.",
      en: "The Legal Counsel of the Federal Executive supports high-impact constitutional processes. Well-designed registration is access to justice in practice: fewer barriers, more transparency.",
    },
    role: {
      es: "UX / UI institucional",
      en: "Institutional UX / UI",
    },
    tags: [
      { es: "UX", en: "UX" },
      { es: "Gobierno", en: "Government" },
    ],
    place: {
      es: "Consejería Jurídica del Ejecutivo Federal",
      en: "Legal Counsel of the Federal Executive",
    },
    screenshots: [
      {
        src: "/fronend_uxui/registro-judicial-landing.jpg",
        alt: {
          es: "Landing Elección Judicial — postulación a cargo federal",
          en: "Judicial Election landing — federal office application",
        },
        caption: {
          es: "Landing · Elección Judicial",
          en: "Landing · Judicial Election",
        },
      },
    ],
  },
  {
    id: "velavo-fam-ai",
    theme: "frontend",
    date: "10.22",
    yearShort: "22",
    image: "/fronend_uxui/velavo.jpg",
    accent: "#782028",
    title: {
      es: "VELAVO · FAM · Asuntos Internacionales",
      en: "VELAVO · FAM · International Affairs",
    },
    description: {
      es: "UX/UI de VELAVO y mapa interactivo para Asuntos Internacionales en la STPS.",
      en: "VELAVO UX/UI and an interactive map for International Affairs at STPS.",
    },
    story: {
      es: "Velavo: participación en el diseño de experiencia de usuario e interfaz de la plataforma, con aporte a la presentación visual de sus componentes y a la interacción con sus funcionalidades. Asuntos Internacionales: diseño y desarrollo de un mapa interactivo integrado en el sitio web del área.",
      en: "Velavo: UX/UI design for the platform—visual presentation of components and interaction with its features. International Affairs: design and development of an interactive map embedded in the area’s website.",
    },
    institutionNote: {
      es: "La STPS opera sistemas que tocan formalización laboral y atención ciudadana. La UI es donde la política pública se vuelve usable día a día.",
      en: "STPS runs systems that touch labor formalization and citizen service. UI is where public policy becomes usable every day.",
    },
    role: {
      es: "UI institucional",
      en: "Institutional UI",
    },
    tags: [
      { es: "UI", en: "UI" },
      { es: "STPS", en: "STPS" },
    ],
    place: {
      es: "STPS · México",
      en: "STPS · Mexico",
    },
    screenshots: [
      {
        src: "/fronend_uxui/velavo.jpg",
        alt: {
          es: "VELAVO — Programa de Verificación Laboral Voluntaria",
          en: "VELAVO — Voluntary Labor Verification Program",
        },
        caption: {
          es: "Home VELAVO · STPS",
          en: "VELAVO home · STPS",
        },
      },
    ],
  },
  {
    id: "margarita-beach",
    theme: "frontend",
    date: "08.24",
    yearShort: "24",
    image: "/fronend_uxui/margarita-beach.jpg",
    accent: "#1a5c5c",
    title: {
      es: "Margarita Beach",
      en: "Margarita Beach",
    },
    description: {
      es: "Diseño UX/UI para Margarita Beach: experiencia digital de marca hotelera / hospitality con foco en conversión y atmósfera.",
      en: "UX/UI design for Margarita Beach: a hospitality brand digital experience focused on conversion and atmosphere.",
    },
    story: {
      es: "Diseño de interfaz y experiencia para Margarita Beach. El trabajo priorizó una narrativa visual cálida, jerarquía clara de reserva/exploración y una UI que traduzca el destino en confianza digital.",
      en: "Interface and experience design for Margarita Beach. The work prioritized a warm visual narrative, clear booking/exploration hierarchy, and UI that turns the destination into digital trust.",
    },
    institutionNote: {
      es: "En hospitality, la web es el primer check-in. Margarita Beach necesita una UX que venda atmósfera sin perder claridad de producto y reserva.",
      en: "In hospitality, the website is the first check-in. Margarita Beach needs UX that sells atmosphere without losing product and booking clarity.",
    },
    role: {
      es: "UX / UI · hospitality",
      en: "UX / UI · hospitality",
    },
    tags: [
      { es: "Hospitality", en: "Hospitality" },
      { es: "UI", en: "UI" },
    ],
    place: {
      es: "Margarita Beach",
      en: "Margarita Beach",
    },
    screenshots: [
      {
        src: "/fronend_uxui/margarita-beach.jpg",
        alt: {
          es: "Margarita Beach — sección Activities",
          en: "Margarita Beach — Activities section",
        },
        caption: {
          es: "Activities · beach club",
          en: "Activities · beach club",
        },
      },
    ],
  },
  {
    id: "makaira",
    theme: "frontend",
    date: "09.24",
    yearShort: "24",
    image: "/fronend_uxui/makaira.png",
    accent: "#1d2b53",
    title: {
      es: "Makaira",
      en: "Makaira",
    },
    description: {
      es: "Diseño UX/UI para Makaira: interfaz de producto con identidad propia, flujos claros y presencia visual diferenciada.",
      en: "UX/UI design for Makaira: a product interface with its own identity, clear flows, and a distinct visual presence.",
    },
    story: {
      es: "Diseño de experiencia e interfaz para Makaira. Se trabajó la coherencia visual, la jerarquía de contenidos y los flujos de uso para que la marca se sienta premium y usable al mismo tiempo.",
      en: "Experience and interface design for Makaira. Visual coherence, content hierarchy, and usage flows were shaped so the brand feels premium and usable at once.",
    },
    institutionNote: {
      es: "Makaira es marca y producto a la vez: la UI tiene que sostener deseo y operación. El diseño es el puente entre identidad y uso cotidiano.",
      en: "Makaira is brand and product at once: UI must hold desire and operation. Design is the bridge between identity and everyday use.",
    },
    role: {
      es: "UX / UI · producto",
      en: "UX / UI · product",
    },
    tags: [
      { es: "Producto", en: "Product" },
      { es: "UI", en: "UI" },
    ],
    place: {
      es: "Makaira",
      en: "Makaira",
    },
    screenshots: [
      {
        src: "/fronend_uxui/makaira.png",
        alt: {
          es: "Makaira — selección de fecha en reserva",
          en: "Makaira — date selection in booking",
        },
        caption: {
          es: "Flujo de reserva · Fecha",
          en: "Booking flow · Date",
        },
      },
    ],
  },
  {
    id: "kemarketing-brand-architecture",
    theme: "branding",
    date: "03.25",
    yearShort: "25",
    heroSingleLine: true,
    image: "/branding/kemarketing/keMarketing_logoIG.jpg",
    imageZoom: 0.72,
    accent: "#fe507b",
    title: {
      es: "Arquitectura monolítica de marca: KeMarketing",
      en: "Monolithic brand architecture: KeMarketing",
    },
    description: {
      es: "Arquitectura de marca monolítica para KeMarketing: un sistema visual único que unifica producto, comunicación y experiencia digital.",
      en: "Monolithic brand architecture for KeMarketing: a single visual system that unifies product, communication, and digital experience.",
    },
    story: {
      es: "Definición de una arquitectura monolítica de marca para KeMarketing. Se construyó un lenguaje visual coherente —identidad, tipografía, color y aplicación— para que producto SaaS y marca comercial hablen con una sola voz.",
      en: "Definition of a monolithic brand architecture for KeMarketing. A coherent visual language—identity, type, color, and application—so the SaaS product and commercial brand speak with one voice.",
    },
    institutionNote: {
      es: "KeMarketing opera como producto y como marca. Una arquitectura monolítica evita fragmentación: todo touchpoint refuerza el mismo reconocimiento.",
      en: "KeMarketing operates as product and brand. Monolithic architecture avoids fragmentation: every touchpoint reinforces the same recognition.",
    },
    role: {
      es: "Arquitectura de marca",
      en: "Brand architecture",
    },
    tags: [
      { es: "Arquitectura de marca", en: "Brand architecture" },
      { es: "Identidad", en: "Identity" },
    ],
    place: {
      es: "KeMarketing",
      en: "KeMarketing",
    },
    screenshots: [
      {
        src: "/branding/kemarketing/keMarketing_logoIG.jpg",
        alt: {
          es: "Logo KeMarketing",
          en: "KeMarketing logo",
        },
        caption: {
          es: "KeMarketing",
          en: "KeMarketing",
        },
      },
      {
        src: "/branding/kemarketing/keServicios_logocorto.png",
        alt: {
          es: "Logo KeServicios",
          en: "KeServicios logo",
        },
        caption: {
          es: "KeServicios",
          en: "KeServicios",
        },
      },
      {
        src: "/branding/kemarketing/keEscuelira_logoCorto.jpg",
        alt: {
          es: "Logo KeEscuelita",
          en: "KeEscuelita logo",
        },
        caption: {
          es: "KeEscuelita",
          en: "KeEscuelita",
        },
      },
      {
        src: "/branding/kemarketing/KePlayas_logoHorizontal.png",
        alt: {
          es: "Logo KePlayas",
          en: "KePlayas logo",
        },
        caption: {
          es: "KePlayas",
          en: "KePlayas",
        },
      },
    ],
  },
  {
    id: "paovitalpies",
    theme: "branding",
    date: "06.24",
    yearShort: "24",
    image: "/branding/paovitalpies.png",
    accent: "#fe9bca",
    title: {
      es: "PaoVitalPies",
      en: "PaoVitalPies",
    },
    description: {
      es: "Identidad de marca para PaoVitalPies: sistema visual, tono y aplicaciones para una marca de bienestar y cuidado.",
      en: "Brand identity for PaoVitalPies: visual system, tone, and applications for a wellness and care brand.",
    },
    story: {
      es: "Diseño de identidad para PaoVitalPies. Se trabajó tipografía, paleta, símbolo y aplicaciones para construir una marca cercana, vital y reconocible en digital y en piezas de comunicación.",
      en: "Identity design for PaoVitalPies. Type, palette, symbol, and applications were shaped into a warm, vital, recognizable brand across digital and communication pieces.",
    },
    institutionNote: {
      es: "PaoVitalPies necesita una marca que transmita cuidado y confianza desde el primer contacto. La identidad es el primer acto de servicio.",
      en: "PaoVitalPies needs a brand that conveys care and trust from first contact. Identity is the first act of service.",
    },
    role: {
      es: "Identidad de marca",
      en: "Brand identity",
    },
    tags: [
      { es: "Identidad", en: "Identity" },
      { es: "Bienestar", en: "Wellness" },
    ],
    place: {
      es: "PaoVitalPies",
      en: "PaoVitalPies",
    },
    screenshots: [
      {
        src: "/branding/paovitalpies.png",
        alt: {
          es: "Identidad PaoVitalPies",
          en: "PaoVitalPies identity",
        },
        caption: {
          es: "Sistema de marca",
          en: "Brand system",
        },
      },
    ],
  },
  {
    id: "goo-arquitectos",
    theme: "branding",
    date: "09.23",
    yearShort: "23",
    image: "/branding/gooarquitectos.svg",
    imageZoom: 0.62,
    accent: "#4c7bff",
    title: {
      es: "GOO Arquitectos",
      en: "GOO Arquitectos",
    },
    description: {
      es: "Identidad de marca para GOO Arquitectos: lenguaje visual sólido, tipográfico y espacial para un estudio de arquitectura.",
      en: "Brand identity for GOO Arquitectos: a solid, typographic, spatial visual language for an architecture studio.",
    },
    story: {
      es: "Dirección de marca para GOO Arquitectos. Se definió un sistema de identidad que traduce rigor espacial y criterio de diseño en tipografía, color, papelería y presencia digital.",
      en: "Brand direction for GOO Arquitectos. An identity system that translates spatial rigor and design judgment into type, color, stationery, and digital presence.",
    },
    institutionNote: {
      es: "Un estudio de arquitectura se presenta primero como marca. GOO necesita una identidad tan clara como sus planos: proporción, jerarquía y carácter.",
      en: "An architecture studio presents itself first as a brand. GOO needs an identity as clear as its drawings: proportion, hierarchy, and character.",
    },
    role: {
      es: "Identidad de marca",
      en: "Brand identity",
    },
    tags: [
      { es: "Identidad", en: "Identity" },
      { es: "Arquitectura", en: "Architecture" },
    ],
    place: {
      es: "GOO Arquitectos",
      en: "GOO Arquitectos",
    },
    screenshots: [
      {
        src: "/branding/gooarquitectos.svg",
        alt: {
          es: "Identidad GOO Arquitectos",
          en: "GOO Arquitectos identity",
        },
        caption: {
          es: "Logo GOO Arquitectos",
          en: "GOO Arquitectos logo",
        },
      },
    ],
  },
];

export function projectsByTheme(theme: PortfolioTheme) {
  return projects.filter((project) => project.theme === theme);
}

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function paginateProjects<T>(items: T[], page: number, pageSize = PORTFOLIO_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total: items.length,
  };
}
