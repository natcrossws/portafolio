import type { Metadata } from "next";
import ArtemGallery from "@/components/ArtemGallery";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = {
  title: dictionaries.es.artem.metaTitle,
  description: dictionaries.es.artem.metaDescription,
};

export default function Page() {
  return <ArtemGallery />;
}
