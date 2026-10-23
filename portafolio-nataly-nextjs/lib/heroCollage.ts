export type HeroTheme = "paintings" | "branding" | "software";

export type HeroTile = {
  src: string;
  alt: string;
};

export const HERO_THEMES: HeroTheme[] = ["paintings", "branding", "software"];

export const HERO_INTERVAL_MS = 6500;

/** Eight floating tiles — layout keys match CSS classes tile1…tile8. */
export const HERO_SETS: Record<HeroTheme, HeroTile[]> = {
  paintings: [
    {
      src: "/images/hero/paintings/01.jpg",
      alt: "Sala de exposición con paneles translúcidos",
    },
    {
      src: "/images/hero/paintings/03.jpg",
      alt: "Pintura clásica en tonos cálidos",
    },
    {
      src: "/images/hero/paintings/04.jpg",
      alt: "Detalle de pintura abstracta",
    },
    {
      src: "/images/hero/paintings/05.jpg",
      alt: "Obra de arte contemporánea",
    },
    {
      src: "/images/hero/paintings/06.jpg",
      alt: "Composición pictórica",
    },
    {
      src: "/images/hero/paintings/08.jpg",
      alt: "Estudio con atmósfera cálida",
    },
    {
      src: "/images/hero/paintings/02.jpg",
      alt: "Galería de arte",
    },
    {
      src: "/images/hero/paintings/07.jpg",
      alt: "Pintura en primer plano",
    },
  ],
  branding: [
    {
      src: "/images/hero/branding/01.jpg",
      alt: "Wireframes y sketching de una app",
    },
    {
      src: "/images/hero/branding/02.jpg",
      alt: "Materiales de diseño y muestras de color",
    },
    {
      src: "/images/hero/branding/03.jpg",
      alt: "Mesa de trabajo de branding",
    },
    {
      src: "/images/hero/branding/05.jpg",
      alt: "Proceso de diseño de interfaz",
    },
    {
      src: "/images/hero/branding/07.jpg",
      alt: "Herramientas de diseño gráfico",
    },
    {
      src: "/images/hero/branding/08.jpg",
      alt: "Pieza creativa",
    },
    {
      src: "/images/hero/branding/06.jpg",
      alt: "Identidad visual",
    },
    {
      src: "/images/hero/branding/04.jpg",
      alt: "Moodboard de marca",
    },
  ],
  software: [
    {
      src: "/images/hero/software/01.png",
      alt: "Escritorio de desarrollo con código",
    },
    {
      src: "/images/hero/software/02.jpg",
      alt: "Cuaderno con diagrama de sistema",
    },
    {
      src: "/images/hero/software/03.jpg",
      alt: "Código en pantalla",
    },
    {
      src: "/images/hero/software/04.jpg",
      alt: "Workstation de software",
    },
    {
      src: "/images/hero/software/05.jpg",
      alt: "Editor de código",
    },
    {
      src: "/images/hero/software/06.jpg",
      alt: "Laptop con desarrollo",
    },
    {
      src: "/images/hero/software/07.jpg",
      alt: "Programación en progreso",
    },
    {
      src: "/images/hero/software/08.jpg",
      alt: "Escritorio con laptop",
    },
  ],
};
