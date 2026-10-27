import type { Metadata } from "next";
import FacetPage from "@/components/FacetPage";
import { getFacet } from "@/lib/facets";
import { dictionaries } from "@/lib/i18n/dictionaries";

const facet = getFacet("software-developer");
const copy = dictionaries.es.identity.facets[facet.slug];

export const metadata: Metadata = {
  title: `${copy.lines.join(" ")} — Nataly Melo`,
  description: copy.lead,
};

export default function Page() {
  return <FacetPage facet={facet} />;
}
