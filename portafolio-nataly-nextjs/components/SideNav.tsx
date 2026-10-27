"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import ContactModal from "@/components/ContactModal";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { NAV_ITEMS, type NavItemId } from "@/lib/nav";
import type { Locale } from "@/lib/i18n/dictionaries";
import styles from "./SideNav.module.css";

const ICONS: Record<NavItemId, ReactNode> = {
  contact: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 8.2 12 13l7-4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  agency: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.5 19.5V8.2L12 4.5l7.5 3.7v11.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 19.5V12h6v7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M4.5 19.5h15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  artem: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4 15.5 8.5 11l3 2.8 3.2-4.2L20 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" />
    </svg>
  ),
  portfolio: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="3.5"
        y="7"
        width="17"
        height="12"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M3.5 12h17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

function labelFor(
  id: NavItemId,
  nav: ReturnType<typeof useI18n>["t"]["nav"],
) {
  switch (id) {
    case "contact":
      return nav.contact;
    case "agency":
      return nav.agency;
    case "artem":
      return nav.artem;
    case "portfolio":
      return nav.portfolio;
  }
}

export default function SideNav() {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();
  const [contactOpen, setContactOpen] = useState(false);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href.startsWith("/#") || href.startsWith("#")) {
      return pathname === "/";
    }
    return pathname === href;
  };

  return (
    <>
      <nav className={styles.nav} aria-label={t.nav.aria}>
        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => {
            const label = labelFor(item.id, t.nav);
            const active =
              item.action === "contact-modal"
                ? contactOpen
                : isActive(item.href);

            if (item.action === "contact-modal") {
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`${styles.item} ${active ? styles.itemActive : ""}`}
                    aria-haspopup="dialog"
                    aria-expanded={contactOpen}
                    onClick={() => setContactOpen(true)}
                  >
                    <span className={styles.icon}>{ICONS[item.id]}</span>
                    <span className={styles.label}>{label}</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`${styles.item} ${active ? styles.itemActive : ""}`}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={styles.icon}>{ICONS[item.id]}</span>
                  <span className={styles.label}>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className={styles.lang} role="group" aria-label={t.nav.language}>
          <button
            type="button"
            className={`${styles.langBtn} ${locale === "es" ? styles.langActive : ""}`}
            onClick={() => setLocale("es" satisfies Locale)}
            aria-pressed={locale === "es"}
          >
            ES
          </button>
          <span className={styles.langDivider} aria-hidden="true">
            /
          </span>
          <button
            type="button"
            className={`${styles.langBtn} ${locale === "en" ? styles.langActive : ""}`}
            onClick={() => setLocale("en")}
            aria-pressed={locale === "en"}
          >
            EN
          </button>
        </div>
      </nav>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
