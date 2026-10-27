export type FacetSlug =
  | "creative-technologist"
  | "software-developer"
  | "frontend-ux-ui"
  | "historia-arte-musica";

export type FacetMedia = {
  slug: FacetSlug;
  href: string;
  image?: string;
  video?: string;
  position?: string;
};

/** Media + routes only — copy lives in i18n dictionaries. */
export const FACETS: FacetMedia[] = [
  {
    slug: "creative-technologist",
    href: "/creative-technologist",
    video: "/videos/estela-petalos.mp4",
  },
  {
    slug: "software-developer",
    href: "/software-developer",
    image: "/images/identity-software-desk.png",
    position: "center 40%",
  },
  {
    slug: "frontend-ux-ui",
    href: "/frontend-ux-ui",
    image: "/images/identity-design-wireframes.jpg",
    position: "center 42%",
  },
  {
    slug: "historia-arte-musica",
    href: "/historia-arte-musica",
    image: "/images/identity-art-gallery.jpg",
    position: "center 45%",
  },
];

export function getFacet(slug: FacetSlug) {
  const facet = FACETS.find((item) => item.slug === slug);
  if (!facet) throw new Error(`Facet not found: ${slug}`);
  return facet;
}
