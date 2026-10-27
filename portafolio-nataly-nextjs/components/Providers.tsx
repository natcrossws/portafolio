"use client";

import type { ReactNode } from "react";
import CursorTrail from "@/components/CursorTrail";
import { I18nProvider } from "@/lib/i18n/I18nProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <CursorTrail />
      {children}
    </I18nProvider>
  );
}
