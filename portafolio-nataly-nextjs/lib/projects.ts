export type Project = {
  id: string;
  year: string;
  index: string;
  title: string;
  category: string;
  description: string;
  tone: "vino" | "azul" | "crema";
};

// Fuente: CV de Nataly Melo (Nataly_Melo_CV_Esp.pdf), orden de más reciente a más antiguo.
export const projects: Project[] = [
  {
    id: "cms-institucional",
    year: "2026",
    index: "01",
    title: "CMS Institucional",
    category: "Dirección técnica",
    description:
      "Lideré la implementación del CMS institucional como Subdirectora de Sistemas Informáticos, coordinando con equipos y usuarios estatales la definición, el desarrollo y la puesta en marcha.",
    tone: "vino",
  },
  {
    id: "data-art-freelance",
    year: "2025",
    index: "02",
    title: "Branding & Data Art",
    category: "Creative coding",
    description:
      "Proyectos independientes de branding, motion graphics y arte generativo: piezas visuales programadas que traducen sistemas y datos en composiciones gráficas y animadas.",
    tone: "azul",
  },
  {
    id: "design-system",
    year: "2024",
    index: "03",
    title: "Design System a Escala",
    category: "Frontend & sistemas",
    description:
      "Diseño y desarrollo de un CMS web a gran escala con un design system sobre SASS y Bootstrap que unificó criterios visuales y de interacción en múltiples propiedades web.",
    tone: "crema",
  },
  {
    id: "clinica-es-nuestra",
    year: "2024",
    index: "04",
    title: "La Clínica es Nuestra",
    category: "Producto institucional",
    description:
      "Desarrollo del portal web nacional y del portal La Clínica es Nuestra junto al área de diseño, mejorando accesibilidad, gestión de contenidos y participación de usuarios.",
    tone: "vino",
  },
  {
    id: "evaluacion-psicometrica",
    year: "2023",
    index: "05",
    title: "Evaluación Psicométrica",
    category: "UX & datos",
    description:
      "Experiencias de evaluación interactivas y seguras que convirtieron el comportamiento del usuario en datos estructurados para análisis psicométrico.",
    tone: "azul",
  },
  {
    id: "plataformas-stps",
    year: "2022",
    index: "06",
    title: "VELAVO · FAM · A. Internacionales",
    category: "Plataformas institucionales",
    description:
      "Diseño de interfaces y elementos gráficos en plataformas institucionales, y soporte al mantenimiento de sistemas de uso nacional como REPSE y SIRVOLAB.",
    tone: "crema",
  },
  {
    id: "siqal",
    year: "2021",
    index: "07",
    title: "SIQAL",
    category: "Plataforma nacional",
    description:
      "Colaboración en el desarrollo de SIQAL, plataforma nacional de atención al ciudadano enfocada en la gestión de quejas y procesos laborales.",
    tone: "vino",
  },
];
