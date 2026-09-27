import type { Metadata } from "next";
import FacetPage from "@/components/FacetPage";
import { getFacet } from "@/lib/facets";

const facet = getFacet("frontend-ux-ui");

export const metadata: Metadata = {
  title: `${facet.lines.join(" ")} — Nataly Melo`,
  description: facet.lead,
};

export default function Page() {
  return <FacetPage facet={facet} />;
}
