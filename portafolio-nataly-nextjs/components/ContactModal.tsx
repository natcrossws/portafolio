"use client";

import { useEffect, useId, useRef } from "react";
import { CONTACT } from "@/lib/contact";
import { useI18n } from "@/lib/i18n/I18nProvider";
import styles from "./ContactModal.module.css";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const { t, locale } = useI18n();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const location = CONTACT.location[locale];

  return (
    <div className={styles.root} role="presentation">
      <button
        type="button"
        className={styles.backdrop}
        aria-label={t.contactModal.close}
        onClick={onClose}
      />

      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className={styles.glow} aria-hidden="true" />

        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={t.contactModal.close}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7 7l10 10M17 7 7 17"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <p className={styles.eyebrow}>{t.nav.contact}</p>
        <h2 id={titleId} className={styles.title}>
          {t.contactModal.title}
        </h2>
        <p className={styles.subtitle}>{t.contactModal.subtitle}</p>

        <ul className={styles.list}>
          <li className={styles.row}>
            <span className={styles.meta}>{t.contactModal.email}</span>
            <a className={styles.value} href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </li>
          <li className={styles.row}>
            <span className={styles.meta}>{t.contactModal.phone}</span>
            <a className={styles.value} href={CONTACT.phoneHref}>
              {CONTACT.phone}
            </a>
          </li>
          <li className={styles.row}>
            <span className={styles.meta}>{t.contactModal.location}</span>
            <span className={styles.valuePlain}>{location}</span>
          </li>
        </ul>

        <div className={styles.actions}>
          <a className={styles.primary} href={`mailto:${CONTACT.email}`}>
            {t.contactModal.write}
          </a>
          <a className={styles.secondary} href={CONTACT.phoneHref}>
            {t.contactModal.call}
          </a>
        </div>
      </div>
    </div>
  );
}
