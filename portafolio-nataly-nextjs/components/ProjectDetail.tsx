"use client";

import Link from "next/link";
import { useEffect } from "react";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { ContentBlock } from "@/lib/projectContent";
import type { PortfolioProject } from "@/lib/projects";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetail({
  project,
  bodyByLocale,
}: {
  project: PortfolioProject;
  bodyByLocale?: {
    es: ContentBlock[] | null;
    en: ContentBlock[] | null;
  };
}) {
  const { locale, t } = useI18n();
  const body = bodyByLocale?.[locale] ?? bodyByLocale?.es ?? null;

  useEffect(() => {
    document.title = `${project.title[locale]} — Nataly Melo`;
  }, [locale, project.title]);

  return (
    <main
      className={`${styles.page} ${styles.pageCase}`}
      lang={locale === "es" ? "es" : "en"}
      style={{ ["--project-accent" as string]: project.accent }}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <Link href="/#portafolio" className={styles.back}>
          <span className={styles.backInner}>
            <span className={styles.backArrow} aria-hidden="true">
              ←
            </span>
            {t.projectDetail.back}
          </span>
        </Link>

        <ProjectCaseStudy project={project} body={body} />

        <div className={styles.footer}>
          <Link href="/#portafolio" className={styles.more}>
            <span className={styles.moreInner}>
              <span className={styles.moreArrow} aria-hidden="true">
                ←
              </span>
              {t.projectDetail.backToPortfolio}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
