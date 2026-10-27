"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  PORTFOLIO_PAGE_SIZE,
  PORTFOLIO_THEMES,
  paginateProjects,
  projectsByTheme,
  type PortfolioTheme,
} from "@/lib/projects";
import styles from "./Portfolio.module.css";

function yearRangeLabel(years: string[]) {
  if (years.length === 0) return "";
  const full = years
    .map((y) => (y.length === 2 ? `20${y}` : y))
    .map(Number)
    .filter((n) => !Number.isNaN(n));
  if (full.length === 0) return "";
  const min = Math.min(...full);
  const max = Math.max(...full);
  return min === max ? String(max) : `${min} — ${max}`;
}

export default function Portfolio() {
  const { locale, t } = useI18n();
  const [theme, setTheme] = useState<PortfolioTheme>("software");
  const [page, setPage] = useState(1);

  const allItems = useMemo(() => projectsByTheme(theme), [theme]);
  const paged = useMemo(
    () => paginateProjects(allItems, page, PORTFOLIO_PAGE_SIZE),
    [allItems, page],
  );
  const range = useMemo(
    () => yearRangeLabel(allItems.map((item) => item.yearShort)),
    [allItems],
  );

  useEffect(() => {
    setPage(1);
  }, [theme]);

  const showPager = paged.totalPages > 1;

  return (
    <section id="portafolio" className={styles.section} aria-label={t.portfolio.aria}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <h2 className={styles.title}>{t.portfolio.title}</h2>
        </header>

        <div className={styles.board}>
          <div className={styles.tabRail}>
            <div className={styles.tabs} role="tablist" aria-label={t.portfolio.tabsAria}>
              {PORTFOLIO_THEMES.map((item) => {
                const active = item.id === theme;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`portfolio-tab-${item.id}`}
                    aria-selected={active}
                    aria-controls="portfolio-panel"
                    className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                    onClick={() => setTheme(item.id)}
                  >
                    <span className={styles.tabLabel}>{item.label[locale]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="portfolio-panel"
            className={styles.panel}
            role="tabpanel"
            aria-labelledby={`portfolio-tab-${theme}`}
          >
            {range ? <p className={styles.yearLabel}>{range}</p> : null}

            {paged.items.length === 0 ? (
              <p className={styles.empty}>{t.portfolio.empty}</p>
            ) : (
              <>
                <ul className={styles.list}>
                  {paged.items.map((project) => (
                    <li key={project.id} className={styles.row}>
                      <div className={styles.thumb}>
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          sizes="(max-width: 720px) 180px, 280px"
                          quality={92}
                          className={styles.thumbImage}
                          style={
                            project.imageZoom
                              ? {
                                  transform: `scale(${project.imageZoom})`,
                                  ...(project.imageZoom < 1
                                    ? { objectFit: "contain" as const }
                                    : null),
                                }
                              : undefined
                          }
                        />
                      </div>

                      <div className={styles.meta}>
                        <span className={styles.place}>
                          <svg
                            className={styles.placeIcon}
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path
                              d="M8 1.6c-2.4 0-4.4 1.9-4.4 4.3 0 3.2 4.4 8.5 4.4 8.5s4.4-5.3 4.4-8.5C12.4 3.5 10.4 1.6 8 1.6zm0 6.1A1.8 1.8 0 1 1 8 4a1.8 1.8 0 0 1 0 3.7z"
                              fill="currentColor"
                            />
                          </svg>
                          {project.place[locale]}
                        </span>
                        <h3 className={styles.projectTitle}>{project.title[locale]}</h3>
                      </div>

                      <div className={styles.copy}>
                        <p className={styles.description}>{project.description[locale]}</p>
                        <div className={styles.copyFooter}>
                          <Link href={`/portafolio/${project.id}`} className={styles.more}>
                            <span className={styles.moreInner}>
                              <span>{t.portfolio.seeMore}</span>
                              <svg
                                className={styles.moreIcon}
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                              >
                                <path
                                  d="M3.5 6.25 8 10.75l4.5-4.5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {showPager ? (
                  <nav className={styles.pager} aria-label={t.portfolio.pagination}>
                    <button
                      type="button"
                      className={styles.pagerBtn}
                      disabled={paged.page <= 1}
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                    >
                      {t.portfolio.prev}
                    </button>
                    <p className={styles.pagerStatus}>
                      {t.portfolio.pageOf
                        .replace("{page}", String(paged.page))
                        .replace("{total}", String(paged.totalPages))}
                    </p>
                    <button
                      type="button"
                      className={styles.pagerBtn}
                      disabled={paged.page >= paged.totalPages}
                      onClick={() =>
                        setPage((current) => Math.min(paged.totalPages, current + 1))
                      }
                    >
                      {t.portfolio.next}
                    </button>
                  </nav>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
