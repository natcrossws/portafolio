export type FacetSlug =
  | "creative-technologist"
  | "software-developer"
  | "frontend-ux-ui"
  | "historia-arte-musica";

export type Facet = {
  slug: FacetSlug;
  note: string;
  lines: string[];
  href: string;
  cta: string;
  image?: string;
  video?: string;
  alt: string;
  position?: string;
  lead: string;
};

export const FACETS: Facet[] = [
  {
    slug: "creative-technologist",
    note: "Práctica",
    lines: ["Creative", "Technologist"],
    href: "/creative-technologist",
    cta: "Explorar",
    video: "/videos/estela-petalos.mp4",
    alt: "Animación de pétalos en estela.",
    lead: "Código, imagen y materia en una misma práctica: piezas generativas, instalaciones y experimentos visuales.",
  },
  {
    slug: "software-developer",
    note: "Ingeniería",
    lines: ["Software", "Developer"],
    href: "/software-developer",
    cta: "Explorar",
    image: "/images/identity-software-desk.png",
    alt: "Escritorio de desarrollo con monitores, código en pantalla y una taza Women Who Code.",
    position: "center 40%",
    lead: "Ingeniería de software con foco en productos digitales, sistemas mantenibles y liderazgo técnico.",
  },
  {
    slug: "frontend-ux-ui",
    note: "Especialidad en diseño",
    lines: ["Frontend", "& UX/UI"],
    href: "/frontend-ux-ui",
    cta: "Explorar",
    image: "/images/identity-design-wireframes.jpg",
    alt: "Bocetos y wireframes de una app móvil: sketching, planificación y miniaturas digitales.",
    position: "center 42%",
    lead: "Interfaces, design systems y experiencia de usuario: del wireframe al front end en producción.",
  },
  {
    slug: "historia-arte-musica",
    note: "Estudiante · piano",
    lines: ["Historia", "del Arte", "y Música"],
    href: "/historia-arte-musica",
    cta: "Explorar",
    image: "/images/identity-art-gallery.jpg",
    alt: "Sala de exposición con paneles de tela translúcida y fotografías en blanco y negro.",
    position: "center 45%",
    lead: "Historia del Arte en curso y formación musical en piano: la mirada estética que alimenta el trabajo creativo.",
  },
];

export function getFacet(slug: FacetSlug) {
  const facet = FACETS.find((item) => item.slug === slug);
  if (!facet) throw new Error(`Facet not found: ${slug}`);
  return facet;
}
