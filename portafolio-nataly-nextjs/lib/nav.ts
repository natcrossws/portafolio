export type NavItemId = "contact" | "agency" | "artem" | "portfolio";

export type NavItem = {
  id: NavItemId;
  href?: string;
  external?: boolean;
  action?: "contact-modal";
};

/** Update Artem URL when the destination is final. */
export const NAV_ITEMS: NavItem[] = [
  {
    id: "contact",
    action: "contact-modal",
  },
  {
    id: "agency",
    href: "https://kemarketing.mx",
    external: true,
  },
  {
    id: "artem",
    href: "/artem-gallery",
  },
  {
    id: "portfolio",
    href: "/#portafolio",
  },
];
