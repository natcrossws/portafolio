export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_STORAGE_KEY = "nataly-locale";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    aria: string;
    contact: string;
    agency: string;
    artem: string;
    portfolio: string;
    language: string;
  };
  hero: {
    aria: string;
    role1: string;
    role2: string;
    role3a: string;
    role3b: string;
  };
  about: {
    aria: string;
    kicker: string;
    title: string;
    photoAlt: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
  };
  identity: {
    aria: string;
    explore: string;
    facets: Record<
      string,
      {
        note: string;
        lines: string[];
        alt: string;
        lead: string;
      }
    >;
  };
  portfolio: {
    aria: string;
    title: string;
    tabsAria: string;
    empty: string;
    seeMore: string;
    pagination: string;
    prev: string;
    next: string;
    pageOf: string;
  };
  projectDetail: {
    back: string;
    backToPortfolio: string;
    whyInstitution: string;
    overview: string;
    index: string;
    visualCue: string;
    screenshots: string;
    screenshotsLead: string;
    componentsTitle: string;
    componentsLead: string;
    resultTitle: string;
    resultLead: string;
    glance: string;
    metaProject: string;
    metaYear: string;
    metaLabel: string;
    metaRole: string;
    prevShot: string;
    nextShot: string;
  };
  socials: {
    aria: string;
    networks: string;
    rights: string;
  };
  facetPage: {
    back: string;
  };
  contactModal: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    close: string;
    write: string;
    call: string;
  };
  artem: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    illustrationsTitle: string;
    prev: string;
    next: string;
    pageOf: string;
    artist: string;
    filters: {
      all: string;
      painting: string;
      illustration: string;
    };
    close: string;
    medium: {
      painting: string;
      illustration: string;
    };
    works: Record<
      string,
      {
        title: string;
        note: string;
      }
    >;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  es: {
    meta: {
      title: "Nataly Melo — Software Engineer → Creative Technologist",
      description:
        "Portafolio de Nataly Melo: ingeniera de software que hace arte con código.",
    },
    nav: {
      aria: "Navegación principal",
      contact: "Contacto",
      agency: "Agencia",
      artem: "Artem Gallery",
      portfolio: "Portafolio",
      language: "Idioma",
    },
    hero: {
      aria: "Portada",
      role1: "Creative Technologist",
      role2: "Software Development Lead",
      role3a: "FrontEnd",
      role3b: "UX/UI",
    },
    about: {
      aria: "Sobre mí",
      kicker: "Creative Technologist",
      title: "Sobre mí",
      photoAlt:
        "Nataly Melo en una biblioteca, con un libro abierto, frente a estanterías de madera.",
      paragraphs: [
        "¡Hola! Soy Nataly Melo, Creative Technologist con formación en Ingeniería de Software y estudiante de Historia del Arte y Música.",
        "Cuento con más de cinco años de experiencia en desarrollo de software, creando sitios web, aplicaciones y soluciones digitales. Combino programación, desarrollo de interfaces y resolución de problemas para transformar ideas en experiencias digitales funcionales.",
        "Mi formación artística alimenta mi interés por explorar nuevas posibilidades creativas a través de la tecnología, en especial la interacción entre código, sonido e imagen.",
        "Fuera del código, recorro museos, estudio la cultura visual y toco el piano: encuentro inspiración donde se cruzan el arte, la música y la tecnología.",
      ],
      stats: [
        { value: "5+ años", label: "desarrollando software" },
        { value: "Ingeniería", label: "de Software" },
        { value: "Arte + Música", label: "formación en curso" },
      ],
    },
    identity: {
      aria: "Quién soy",
      explore: "Explorar",
      facets: {
        "creative-technologist": {
          note: "Práctica",
          lines: ["Creative", "Technologist"],
          alt: "Animación de pétalos en estela.",
          lead: "Código, imagen y materia en una misma práctica: piezas generativas, instalaciones y experimentos visuales.",
        },
        "software-developer": {
          note: "Ingeniería",
          lines: ["Software", "Developer"],
          alt: "Escritorio de desarrollo con monitores, código en pantalla y una taza Women Who Code.",
          lead: "Ingeniería de software con foco en productos digitales, sistemas mantenibles y liderazgo técnico.",
        },
        "frontend-ux-ui": {
          note: "Especialidad en diseño",
          lines: ["Frontend", "& UX/UI"],
          alt: "Bocetos y wireframes de una app móvil: sketching, planificación y miniaturas digitales.",
          lead: "Interfaces, design systems y experiencia de usuario: del wireframe al front end en producción.",
        },
        "historia-arte-musica": {
          note: "Estudiante · piano",
          lines: ["Historia", "del Arte", "y Música"],
          alt: "Sala de exposición con paneles de tela translúcida y fotografías en blanco y negro.",
          lead: "Historia del Arte en curso y formación musical en piano: la mirada estética que alimenta el trabajo creativo.",
        },
      },
    },
    portfolio: {
      aria: "Portafolio",
      title: "Portafolio",
      tabsAria: "Temas del portafolio",
      empty: "Pronto más proyectos en este tema.",
      seeMore: "Ver más",
      pagination: "Paginación del portafolio",
      prev: "Anterior",
      next: "Siguiente",
      pageOf: "Página {page} de {total}",
    },
    projectDetail: {
      back: "Volver al portafolio",
      backToPortfolio: "Volver al portafolio",
      whyInstitution: "Por qué importa la institución",
      overview: "El proyecto",
      index: "En esta página",
      visualCue: "Vista del proyecto",
      screenshots: "Capturas",
      screenshotsLead: "Implementación real: pantallas y flujos del sistema.",
      componentsTitle: "Diseño con componentes",
      componentsLead:
        "La página se arma con bloques reutilizables: misma biblioteca en el editor y en el sitio público.",
      resultTitle: "Resultado publicado",
      resultLead:
        "Así quedó la página nacional construida con esos componentes — HTML estático pre-renderizado.",
      glance: "En una mirada",
      metaProject: "Proyecto",
      metaYear: "Año",
      metaLabel: "Enfoque",
      metaRole: "Rol",
      prevShot: "Captura anterior",
      nextShot: "Captura siguiente",
    },
    socials: {
      aria: "Redes",
      networks: "Redes sociales",
      rights: "Todos los derechos reservados.",
    },
    facetPage: {
      back: "Volver",
    },
    contactModal: {
      title: "Hablemos",
      subtitle: "Cuéntame de tu próximo proyecto.",
      email: "Correo",
      phone: "Teléfono",
      location: "Ubicación",
      close: "Cerrar",
      write: "Escribir",
      call: "Llamar",
    },
    artem: {
      metaTitle: "Artem Gallery — Nataly Melo",
      metaDescription: "Pinturas e ilustraciones de Nataly Melo.",
      eyebrow: "Arte",
      title: "Artem Gallery",
      lead: "Pinturas e ilustraciones.",
      illustrationsTitle: "Ilustraciones",
      prev: "Anterior",
      next: "Siguiente",
      pageOf: "de",
      artist: "Nataly Melo",
      filters: {
        all: "Todo",
        painting: "Pinturas",
        illustration: "Ilustraciones",
      },
      close: "Cerrar",
      medium: {
        painting: "Pintura",
        illustration: "Ilustración",
      },
      works: {
        "serie-flores-1": {
          title: "Flores I",
          note: "",
        },
        "serie-flores-2": {
          title: "Flores II",
          note: "",
        },
        "retrato-mariposa": {
          title: "Mariposa",
          note: "",
        },
        "retrato-psique": {
          title: "Psique",
          note: "",
        },
        "retrato-gatito": {
          title: "Gatito",
          note: "",
        },
        "ilustracion-cangrejo": {
          title: "Cangrejo",
          note: "",
        },
        "ilustracion-pez": {
          title: "Pez dorado",
          note: "",
        },
        "ilustracion-cangrejo-ermitano": {
          title: "Cangrejo ermitaño",
          note: "",
        },
        "ilustracion-kemarketing": {
          title: "KeMarketing",
          note: "",
        },
      },
    },
  },
  en: {
    meta: {
      title: "Nataly Melo — Software Engineer → Creative Technologist",
      description:
        "Nataly Melo’s portfolio: a software engineer who makes art with code.",
    },
    nav: {
      aria: "Main navigation",
      contact: "Contact",
      agency: "Agency",
      artem: "Artem Gallery",
      portfolio: "Portfolio",
      language: "Language",
    },
    hero: {
      aria: "Hero",
      role1: "Creative Technologist",
      role2: "Software Development Lead",
      role3a: "FrontEnd",
      role3b: "UX/UI",
    },
    about: {
      aria: "About me",
      kicker: "Creative Technologist",
      title: "About me",
      photoAlt:
        "Nataly Melo in a library, holding an open book, in front of wooden bookshelves.",
      paragraphs: [
        "Hi! I'm Nataly Melo, a Creative Technologist with a background in Software Engineering and a student of Art History and Music.",
        "I have over five years of experience in software development, building websites, applications, and digital solutions. I combine programming, interface development, and problem-solving to turn ideas into functional digital experiences.",
        "My artistic training fuels my interest in exploring new creative possibilities through technology, especially the interplay of code, sound, and image.",
        "Away from code, I visit museums, study visual culture, and play the piano: I find inspiration where art, music, and technology meet.",
      ],
      stats: [
        { value: "5+ years", label: "building software" },
        { value: "Engineering", label: "Software" },
        { value: "Art + Music", label: "studies in progress" },
      ],
    },
    identity: {
      aria: "Who I am",
      explore: "Explore",
      facets: {
        "creative-technologist": {
          note: "Practice",
          lines: ["Creative", "Technologist"],
          alt: "Animation of petals in a trail.",
          lead: "Code, image, and material in one practice: generative pieces, installations, and visual experiments.",
        },
        "software-developer": {
          note: "Engineering",
          lines: ["Software", "Developer"],
          alt: "Development desk with monitors, code on screen, and a Women Who Code mug.",
          lead: "Software engineering focused on digital products, maintainable systems, and technical leadership.",
        },
        "frontend-ux-ui": {
          note: "Design specialty",
          lines: ["Frontend", "& UX/UI"],
          alt: "Sketches and wireframes for a mobile app: planning and digital thumbnails.",
          lead: "Interfaces, design systems, and user experience: from wireframe to production front end.",
        },
        "historia-arte-musica": {
          note: "Student · piano",
          lines: ["Art History", "& Music"],
          alt: "Exhibition room with translucent fabric panels and black-and-white photographs.",
          lead: "Art History in progress and piano training: the aesthetic eye that feeds creative work.",
        },
      },
    },
    portfolio: {
      aria: "Portfolio",
      title: "Portfolio",
      tabsAria: "Portfolio topics",
      empty: "More projects in this topic coming soon.",
      seeMore: "See more",
      pagination: "Portfolio pagination",
      prev: "Previous",
      next: "Next",
      pageOf: "Page {page} of {total}",
    },
    projectDetail: {
      back: "Back to portfolio",
      backToPortfolio: "Back to portfolio",
      whyInstitution: "Why the institution matters",
      overview: "The project",
      index: "On this page",
      visualCue: "Project view",
      screenshots: "Screenshots",
      screenshotsLead: "Real implementation: screens and system flows.",
      componentsTitle: "Designed with components",
      componentsLead:
        "The page is assembled from reusable blocks: the same library in the editor and on the public site.",
      resultTitle: "Published result",
      resultLead:
        "How the national page looked after building it with those components — pre-rendered static HTML.",
      glance: "At a glance",
      metaProject: "Project",
      metaYear: "Year",
      metaLabel: "Focus",
      metaRole: "Role",
      prevShot: "Previous screenshot",
      nextShot: "Next screenshot",
    },
    socials: {
      aria: "Social",
      networks: "Social networks",
      rights: "All rights reserved.",
    },
    facetPage: {
      back: "Back",
    },
    contactModal: {
      title: "Let’s talk",
      subtitle: "Tell me about your next project.",
      email: "Email",
      phone: "Phone",
      location: "Location",
      close: "Close",
      write: "Write",
      call: "Call",
    },
    artem: {
      metaTitle: "Artem Gallery — Nataly Melo",
      metaDescription:
        "A gallery of paintings and illustrations: an aesthetic look at color, form, and atmosphere.",
      eyebrow: "Art",
      title: "Artem Gallery",
      lead: "Paintings and illustrations.",
      illustrationsTitle: "Illustrations",
      prev: "Previous",
      next: "Next",
      pageOf: "of",
      artist: "Nataly Melo",
      filters: {
        all: "All",
        painting: "Paintings",
        illustration: "Illustrations",
      },
      close: "Close",
      medium: {
        painting: "Painting",
        illustration: "Illustration",
      },
      works: {
        "serie-flores-1": {
          title: "Flowers I",
          note: "",
        },
        "serie-flores-2": {
          title: "Flowers II",
          note: "",
        },
        "retrato-mariposa": {
          title: "Butterfly",
          note: "",
        },
        "retrato-psique": {
          title: "Psyche",
          note: "",
        },
        "retrato-gatito": {
          title: "Kitten",
          note: "",
        },
        "ilustracion-cangrejo": {
          title: "Crab",
          note: "",
        },
        "ilustracion-pez": {
          title: "Goldfish",
          note: "",
        },
        "ilustracion-cangrejo-ermitano": {
          title: "Hermit crab",
          note: "",
        },
        "ilustracion-kemarketing": {
          title: "KeMarketing",
          note: "",
        },

      },
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
