export type ArtemKind = "painting" | "illustration";

export type ArtemWork = {
  id: string;
  kind: ArtemKind;
  src: string;
  aspect: "portrait" | "landscape" | "square";
  year: string;
  size: string;
};

export const ARTEM_WORKS: ArtemWork[] = [
  {
    id: "serie-flores-1",
    kind: "painting",
    src: "/artem/serie-flores-1.jpg",
    aspect: "square",
    year: "2023",
    size: "40 × 40 cm",
  },
  {
    id: "serie-flores-2",
    kind: "painting",
    src: "/artem/serie-flores-2.jpg",
    aspect: "square",
    year: "2023",
    size: "40 × 40 cm",
  },
  {
    id: "retrato-mariposa",
    kind: "illustration",
    src: "/artem/retrato-mariposa.png",
    aspect: "portrait",
    year: "2024",
    size: "30 × 40 cm",
  },
  {
    id: "retrato-psique",
    kind: "painting",
    src: "/artem/retrato-psique.png",
    aspect: "landscape",
    year: "2024",
    size: "50 × 35 cm",
  },
  {
    id: "retrato-gatito",
    kind: "painting",
    src: "/artem/retrato-gatito-peloblanconegro.jpg",
    aspect: "portrait",
    year: "2023",
    size: "30 × 40 cm",
  },
  {
    id: "ilustracion-cangrejo",
    kind: "illustration",
    src: "/artem/illustrations/Cangrejo.jpg",
    aspect: "square",
    year: "2024",
    size: "Digital",
  },
  {
    id: "ilustracion-pez",
    kind: "illustration",
    src: "/artem/illustrations/il1.png",
    aspect: "landscape",
    year: "2024",
    size: "Digital",
  },
  {
    id: "ilustracion-cangrejo-ermitano",
    kind: "illustration",
    src: "/artem/illustrations/il4.png",
    aspect: "landscape",
    year: "2024",
    size: "Digital",
  },
  {
    id: "ilustracion-kemarketing",
    kind: "illustration",
    src: "/artem/illustrations/ilustration-kemarketing.svg",
    aspect: "landscape",
    year: "2025",
    size: "Digital",
  },
];

export const ARTEM_PAINTINGS = ARTEM_WORKS.filter((w) => w.kind === "painting");
export const ARTEM_ILLUSTRATIONS = ARTEM_WORKS.filter(
  (w) => w.kind === "illustration",
);
