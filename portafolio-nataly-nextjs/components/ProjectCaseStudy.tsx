"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { CMS_CASE_STUDY } from "@/lib/cmsCaseStudy";
import {
  groupContentSections,
  isHighlightParagraph,
  type ContentBlock,
  type ContentSection,
} from "@/lib/projectContent";
import type { PortfolioProject, ProjectScreenshot } from "@/lib/projects";
import { WHISPER_CASE_STUDY } from "@/lib/whisperCaseStudy";
import styles from "./ProjectCaseStudy.module.css";

function BrowserFrame({
  children,
  caption,
  tab,
}: {
  children: ReactNode;
  caption?: string;
  tab?: string;
}) {
  return (
    <figure className={styles.browser}>
      <div className={styles.chrome} aria-hidden="true">
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
        {tab ? <span className={styles.tab}>{tab}</span> : null}
      </div>
      <div className={styles.browserMedia}>{children}</div>
      {caption ? <figcaption className={styles.browserCaption}>{caption}</figcaption> : null}
    </figure>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function isVideoShot(shot: ProjectScreenshot) {
  return (
    shot.kind === "video" || /\.(mp4|webm|mov|ogg)(\?|$)/i.test(shot.src)
  );
}

function splitHeroTitle(title: string, singleLine = false) {
  if (singleLine) {
    return {
      line1: title,
      line2: null as string | null,
      accent: null as string | null,
      stacked: false,
      singleLine: true,
    };
  }
  const dash = title.split(/\s+[—–-]\s+/);
  if (dash.length >= 2) {
    return {
      line1: dash[0],
      line2: dash.slice(1).join(" — "),
      accent: null as string | null,
      stacked: true,
      singleLine: false,
    };
  }
  return {
    line1: title,
    line2: null as string | null,
    accent: null as string | null,
    stacked: false,
    singleLine: false,
  };
}

function ShotVisual({
  shot,
  locale,
  priority = false,
  tall = false,
}: {
  shot: ProjectScreenshot;
  locale: Locale;
  priority?: boolean;
  tall?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = shot.playbackRate ?? 1;
  }, [shot.playbackRate, shot.src]);

  if (isVideoShot(shot)) {
    return (
      <video
        ref={videoRef}
        className={styles.browserVideo}
        controls
        playsInline
        preload="metadata"
        poster={shot.poster}
        aria-label={shot.alt[locale]}
        onLoadedMetadata={(event) => {
          event.currentTarget.playbackRate = shot.playbackRate ?? 1;
        }}
      >
        <source src={shot.src} type="video/mp4" />
      </video>
    );
  }

  const image = (
    <Image
      src={shot.src}
      alt={shot.alt[locale]}
      width={tall ? 1200 : 2400}
      height={tall ? 3767 : 1500}
      sizes={
        tall
          ? "(max-width: 960px) 100vw, 520px"
          : "(max-width: 960px) 100vw, min(1180px, 92vw)"
      }
      quality={95}
      className={styles.browserImage}
      priority={priority}
    />
  );

  if (tall) {
    return (
      <div className={styles.tallScroll} tabIndex={0} aria-label={shot.alt[locale]}>
        {image}
      </div>
    );
  }

  return image;
}

function CaseBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className={styles.bodySectionContent}>
      {blocks.map((block, index) => {
        if (block.type === "list") {
          return (
            <ul key={index} className={styles.bodyList}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }

        if (isHighlightParagraph(block.text)) {
          return (
            <blockquote key={index} className={styles.pullQuote}>
              <p>{block.text}</p>
            </blockquote>
          );
        }

        return (
          <p key={index} className={styles.bodyParagraph}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function GenericBody({
  sections,
  storyFallback,
}: {
  sections: ContentSection[];
  storyFallback?: string;
}) {
  if (!sections.length && storyFallback) {
    return (
      <article className={styles.bodySection}>
        <p className={styles.bodyParagraph}>{storyFallback}</p>
      </article>
    );
  }

  return (
    <div className={styles.bodySections}>
      {sections.map((section, index) => {
        const title = section.headingLabel ?? section.heading;
        return (
          <article key={section.id} className={styles.bodySection}>
            {title ? (
              <header className={styles.bodySectionHead}>
                <p className={styles.num} aria-hidden="true">
                  {section.indexLabel
                    ? pad(Number(section.indexLabel) || index + 1)
                    : pad(index + 1)}
                </p>
                <h3 className={styles.bodySectionTitle}>{title}</h3>
              </header>
            ) : null}
            <CaseBlocks blocks={section.blocks} />
          </article>
        );
      })}
    </div>
  );
}

function WhisperBody({
  featureShot,
  locale,
}: {
  featureShot?: ProjectScreenshot;
  locale: Locale;
}) {
  const copy = WHISPER_CASE_STUDY;

  return (
    <>
      {featureShot ? (
        <BrowserFrame
          tab={locale === "es" ? "Documento visual" : "Visual document"}
          caption={featureShot.caption?.[locale]}
        >
          <ShotVisual shot={featureShot} locale={locale} priority />
        </BrowserFrame>
      ) : null}

      <section aria-labelledby="idea-title">
        <div className={styles.sectionHead}>
          <h2 id="idea-title" className={styles.sectionTitle}>
            {copy.ideaTitle[locale]}
          </h2>
        </div>
        <div className={styles.docPanel}>
          <p className={styles.bodyParagraph}>{copy.ideaBody[locale]}</p>
          <p className={styles.docNote}>{copy.ideaNote[locale]}</p>
        </div>
      </section>

      <section aria-labelledby="pipeline-title">
        <div className={styles.sectionHead}>
          <h2 id="pipeline-title" className={styles.sectionTitle}>
            {copy.pipelineTitle[locale]}
          </h2>
          <p className={styles.sectionLead}>{copy.pipelineLead[locale]}</p>
        </div>
        <div className={styles.flow} role="list">
          {copy.pipeline.map((step, index) => (
            <article key={step.title.es} className={styles.flowNode} role="listitem">
              <p className={styles.flowIndex}>{pad(index + 1)}</p>
              <h3 className={styles.flowTitle}>{step.title[locale]}</h3>
              <p className={styles.flowBody}>{step.body[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="lab-title">
        <div className={styles.sectionHead}>
          <h2 id="lab-title" className={styles.sectionTitle}>
            {copy.labTitle[locale]}
          </h2>
          <p className={styles.sectionLead}>{copy.labLead[locale]}</p>
        </div>
        <div className={styles.labGrid}>
          {copy.labItems.map((item, index) => (
            <div key={item.es} className={styles.labItem}>
              <p className={styles.labItemIndex}>{pad(index + 1)}</p>
              <p className={styles.labItemText}>{item[locale]}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="map-title">
        <div className={styles.sectionHead}>
          <h2 id="map-title" className={styles.sectionTitle}>
            {copy.mapTitle[locale]}
          </h2>
          <p className={styles.sectionLead}>{copy.mapLead[locale]}</p>
        </div>
        <div className={styles.mapGrid}>
          {copy.mappings.map((item) => (
            <article key={item.from.es} className={styles.mapCard}>
              <p className={styles.mapFrom}>{item.from[locale]}</p>
              <p className={styles.mapArrow} aria-hidden="true">
                →
              </p>
              <p className={styles.mapTo}>{item.to[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="roadmap-title">
        <div className={styles.sectionHead}>
          <h2 id="roadmap-title" className={styles.sectionTitle}>
            {copy.roadmapTitle[locale]}
          </h2>
        </div>
        <div className={`${styles.steps} ${styles.stepsFour}`}>
          {copy.roadmap.map((step, index) => (
            <article key={step.title.es} className={styles.step}>
              <p className={styles.num} aria-hidden="true">
                {pad(index + 1)}
              </p>
              <h3 className={styles.stepTitle}>{step.title[locale]}</h3>
              <p className={styles.stepBody}>{step.body[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="stack-title">
        <div className={styles.sectionHead}>
          <h2 id="stack-title" className={styles.sectionTitle}>
            {copy.stackTitle[locale]}
          </h2>
        </div>
        <div className={styles.stackRow}>
          {copy.stack.map((item) => (
            <span key={item.es} className={styles.stackChip}>
              {item[locale]}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

function BrandArchitectureBody({
  project,
  locale,
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  const logo = project.screenshots[0] ?? {
    src: project.image,
    alt: project.title,
  };

  return (
    <>
      <figure className={styles.brandLogoStage}>
        <Image
          src={logo.src}
          alt={logo.alt[locale]}
          width={720}
          height={720}
          quality={95}
          priority
          className={styles.brandLogoImage}
        />
      </figure>

      <aside className={styles.institutionCard}>
        <p className={styles.heroLeadEyebrow}>
          {locale === "es" ? "Por qué importa" : "Why it matters"}
        </p>
        <p className={styles.heroLead}>{project.institutionNote[locale]}</p>
      </aside>

      <section aria-labelledby="brand-pillars-title">
        <div className={styles.sectionHead}>
          <h2 id="brand-pillars-title" className={styles.sectionTitle}>
            {locale === "es" ? "Pilares del sistema" : "System pillars"}
          </h2>
        </div>
        <div className={styles.steps}>
          {(
            [
              {
                es: {
                  title: "Una marca madre",
                  body: "KeMarketing ancla el reconocimiento; los verticales heredan ritmo, tipografía y lógica visual.",
                },
                en: {
                  title: "One parent brand",
                  body: "KeMarketing anchors recognition; verticals inherit rhythm, type, and visual logic.",
                },
              },
              {
                es: {
                  title: "Identidades hermanas",
                  body: "Cada producto (Playas, Escuelita, Servicios…) tiene acento propio sin romper la familia.",
                },
                en: {
                  title: "Sibling identities",
                  body: "Each product (Playas, Escuelita, Servicios…) keeps its own accent without breaking the family.",
                },
              },
              {
                es: {
                  title: "Menos fragmentación",
                  body: "Producto, comunicación y experiencia digital hablan con una sola voz.",
                },
                en: {
                  title: "Less fragmentation",
                  body: "Product, communication, and digital experience speak with one voice.",
                },
              },
            ] as const
          ).map((item, index) => (
            <article key={item.es.title} className={styles.step}>
              <p className={styles.num} aria-hidden="true">
                {pad(index + 1)}
              </p>
              <h3 className={styles.stepTitle}>{item[locale].title}</h3>
              <p className={styles.stepBody}>{item[locale].body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function CmsBody({
  featureShot,
  tallShot,
  locale,
}: {
  featureShot?: ProjectScreenshot;
  tallShot?: ProjectScreenshot;
  locale: Locale;
}) {
  const copy = CMS_CASE_STUDY;

  return (
    <>
      {featureShot ? (
        <BrowserFrame
          tab={copy.adminPill[locale]}
          caption={copy.componentsCaption[locale]}
        >
          <ShotVisual shot={featureShot} locale={locale} priority />
        </BrowserFrame>
      ) : null}

      <section aria-labelledby="compare-title">
        <div className={styles.sectionHead}>
          <h2 id="compare-title" className={styles.sectionTitle}>
            {copy.compareTitle[locale]}
          </h2>
          <p className={styles.sectionLead}>{copy.compareLead[locale]}</p>
        </div>
        <div className={styles.compare}>
          <div className={`${styles.comparePane} ${styles.compareLeft}`}>
            <p className={styles.comparePaneTitle}>{copy.compareLeftTitle[locale]}</p>
            <ul className={styles.compareList}>
              {copy.compareLeft.map((item) => (
                <li key={item.es}>{item[locale]}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.comparePane} ${styles.compareRight}`}>
            <p className={styles.comparePaneTitle}>{copy.compareRightTitle[locale]}</p>
            <ul className={styles.compareList}>
              {copy.compareRight.map((item) => (
                <li key={item.es}>{item[locale]}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title">
        <div className={styles.sectionHead}>
          <h2 id="steps-title" className={styles.sectionTitle}>
            {copy.stepsTitle[locale]}
          </h2>
        </div>
        <div className={styles.steps}>
          {copy.steps.map((step, index) => (
            <article key={step.title.es} className={styles.step}>
              <p className={styles.num} aria-hidden="true">
                {pad(index + 1)}
              </p>
              <h3 className={styles.stepTitle}>{step.title[locale]}</h3>
              <p className={styles.stepBody}>{step.body[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="fronts-title">
        <div className={styles.sectionHead}>
          <h2 id="fronts-title" className={styles.sectionTitle}>
            {copy.frontsTitle[locale]}
          </h2>
          <p className={styles.sectionLead}>{copy.frontsLead[locale]}</p>
        </div>
        <div className={styles.fronts}>
          <div className={styles.frontsCopy}>
            <div className={styles.frontBlock}>
              <span className={styles.tab}>{copy.adminPill[locale]}</span>
              <h3 className={styles.frontTitle}>{copy.adminTitle[locale]}</h3>
              <ul className={styles.frontList}>
                {copy.adminItems.map((item) => (
                  <li key={item.es}>{item[locale]}</li>
                ))}
              </ul>
            </div>
            <div className={styles.frontBlock}>
              <span className={styles.tab}>{copy.publicPill[locale]}</span>
              <h3 className={styles.frontTitle}>{copy.publicTitle[locale]}</h3>
              <ul className={styles.frontList}>
                {copy.publicItems.map((item) => (
                  <li key={item.es}>{item[locale]}</li>
                ))}
              </ul>
            </div>
          </div>

          {tallShot ? (
            <div className={styles.tallBrowser}>
              <BrowserFrame
                tab={copy.publicPill[locale]}
                caption={copy.resultCaption[locale]}
              >
                <ShotVisual shot={tallShot} locale={locale} tall />
              </BrowserFrame>
            </div>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="principles-title">
        <div className={styles.sectionHead}>
          <h2 id="principles-title" className={styles.sectionTitle}>
            {copy.principlesTitle[locale]}
          </h2>
        </div>
        <div className={styles.principles}>
          {copy.principles.map((item, index) => (
            <article key={item.title.es} className={styles.principle}>
              <p className={styles.num} aria-hidden="true">
                {pad(index + 1)}
              </p>
              <h3 className={styles.principleTitle}>{item.title[locale]}</h3>
              <p className={styles.principleBody}>{item.body[locale]}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default function ProjectCaseStudy({
  project,
  body,
}: {
  project: PortfolioProject;
  body: ContentBlock[] | null;
}) {
  const { locale, t } = useI18n();
  const isCms = project.id === "cms-cen-morena";
  const isWhisper = project.id === "whisper-of-the-sound";
  const isBrandBook = project.id === "kemarketing-brand-architecture";
  const cmsCopy = CMS_CASE_STUDY;
  const whisperCopy = WHISPER_CASE_STUDY;

  const featureShot = project.screenshots.find((s) => s.layout === "feature");
  const tallShot = project.screenshots.find((s) => s.layout === "tall");
  const defaultShots = project.screenshots.filter(
    (s) => s.layout !== "feature" && s.layout !== "tall",
  );

  const hero = isCms
    ? {
        line1: cmsCopy.heroTitle.line1[locale],
        line2: cmsCopy.heroTitle.line2[locale],
        accent: cmsCopy.heroTitle.accent[locale],
        stacked: true,
        singleLine: false,
      }
    : isWhisper
      ? {
          line1: whisperCopy.heroTitle.line1[locale],
          line2: whisperCopy.heroTitle.line2[locale],
          accent: whisperCopy.heroTitle.accent[locale],
          stacked: true,
          singleLine: false,
        }
      : splitHeroTitle(project.title[locale], project.heroSingleLine);

  const lead = isCms
    ? cmsCopy.heroLead[locale]
    : isWhisper
      ? whisperCopy.heroLead[locale]
      : project.story[locale];
  const yearLabel = isCms
    ? cmsCopy.meta.year[locale]
    : isWhisper
      ? whisperCopy.meta.year[locale]
      : (project.yearLabel?.[locale] ?? `20${project.yearShort}`);
  const focusLabel = isCms
    ? cmsCopy.meta.label[locale]
    : isWhisper
      ? whisperCopy.meta.label[locale]
      : project.tags.map((tag) => tag[locale]).join(" · ") ||
        project.place[locale];
  const projectLabel = isCms
    ? cmsCopy.meta.project[locale]
    : isWhisper
      ? whisperCopy.meta.project[locale]
      : project.title[locale];
  const roleLabel = isCms
    ? cmsCopy.meta.role[locale]
    : isWhisper
      ? whisperCopy.meta.role[locale]
      : project.role[locale];

  const { lede, sections } = body?.length
    ? groupContentSections(body)
    : { lede: null, sections: [] };

  const genericSections =
    lede && sections.every((section) => section.heading)
      ? [
          {
            id: "intro",
            heading: null,
            indexLabel: null,
            headingLabel: null,
            blocks: [{ type: "paragraph" as const, text: lede }],
          },
          ...sections,
        ]
      : sections;

  const heroShot =
    featureShot ??
    defaultShots[0] ??
    (project.image
      ? ({
          src: project.image,
          alt: {
            es: project.title.es,
            en: project.title.en,
          },
        } satisfies ProjectScreenshot)
      : undefined);

  const remainingShots = featureShot
    ? [...defaultShots, ...(tallShot ? [tallShot] : [])]
    : [...defaultShots.slice(heroShot && !featureShot ? 1 : 0), ...(tallShot ? [tallShot] : [])];

  return (
    <div className={styles.case}>
      <header className={styles.hero}>
        <h1
          className={`${styles.heroTitle} ${
            hero.singleLine
              ? styles.heroTitleSingle
              : hero.stacked
                ? ""
                : styles.heroTitleWrap
          }`}
        >
          <span className={styles.heroLine}>{hero.line1}</span>
          {hero.line2 ? (
            <span className={styles.heroLine}>
              {hero.line2}
              {hero.accent ? (
                <>
                  {" "}
                  <em className={styles.heroAccent}>{hero.accent}</em>
                </>
              ) : null}
            </span>
          ) : null}
        </h1>

        <aside className={styles.heroLeadCard}>
          <span className={styles.heroLeadAccent} aria-hidden="true" />
          <p className={styles.heroLeadEyebrow}>{t.projectDetail.glance}</p>
          <p className={styles.heroLead}>{lead}</p>
        </aside>

        <dl className={styles.meta}>
          {(
            [
              [t.projectDetail.metaProject, projectLabel],
              [t.projectDetail.metaYear, yearLabel],
              [t.projectDetail.metaLabel, focusLabel],
              [t.projectDetail.metaRole, roleLabel],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className={styles.metaItem}>
              <dt className={styles.metaLabel}>{label}</dt>
              <dd className={styles.metaValue}>{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {isCms ? (
        <CmsBody
          featureShot={featureShot}
          tallShot={tallShot}
          locale={locale}
        />
      ) : isWhisper ? (
        <WhisperBody featureShot={featureShot ?? heroShot} locale={locale} />
      ) : isBrandBook ? (
        <BrandArchitectureBody project={project} locale={locale} />
      ) : (
        <>
          {heroShot ? (
            <BrowserFrame
              tab={t.projectDetail.visualCue}
              caption={heroShot.caption?.[locale]}
            >
              <ShotVisual
                shot={heroShot}
                locale={locale}
                priority
                tall={heroShot.layout === "tall"}
              />
            </BrowserFrame>
          ) : null}

          <aside className={styles.institutionCard}>
            <p className={styles.heroLeadEyebrow}>
              {t.projectDetail.whyInstitution}
            </p>
            <p className={styles.heroLead}>{project.institutionNote[locale]}</p>
          </aside>

          <section aria-labelledby="overview-title">
            <div className={styles.sectionHead}>
              <h2 id="overview-title" className={styles.sectionTitle}>
                {t.projectDetail.overview}
              </h2>
            </div>
            <GenericBody
              sections={genericSections}
              storyFallback={
                genericSections.length ? undefined : project.story[locale]
              }
            />
          </section>

          {remainingShots.length ? (
            <section aria-labelledby="shots-title">
              <div className={styles.sectionHead}>
                <h2 id="shots-title" className={styles.sectionTitle}>
                  {t.projectDetail.screenshots}
                </h2>
                <p className={styles.sectionLead}>
                  {t.projectDetail.screenshotsLead}
                </p>
              </div>
              <div className={`${styles.shotsGrid} ${styles.shotsGridWide}`}>
                {remainingShots.map((shot, index) => (
                  <BrowserFrame
                    key={`${shot.src}-${index}`}
                    tab={t.projectDetail.visualCue}
                    caption={shot.caption?.[locale]}
                  >
                    <ShotVisual
                      shot={shot}
                      locale={locale}
                      tall={shot.layout === "tall"}
                    />
                  </BrowserFrame>
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
