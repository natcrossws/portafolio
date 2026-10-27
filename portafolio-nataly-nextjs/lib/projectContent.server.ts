import { existsSync, readFileSync } from "fs";
import path from "path";
import type { Locale } from "@/lib/i18n/dictionaries";
import {
  parseProjectContent,
  type ContentBlock,
} from "@/lib/projectContent";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function isEmptyTemplate(raw: string) {
  const stripped = raw
    .replace(/^#.*$/gm, "")
    .replace(/^##\s+\w+.*$/gm, "")
    .trim();
  return stripped.length < 40;
}

function readContentFile(filePath: string): ContentBlock[] | null {
  if (!existsSync(filePath)) return null;
  const raw = readFileSync(filePath, "utf8");
  if (isEmptyTemplate(raw)) return null;
  const blocks = parseProjectContent(raw);
  return blocks.length ? blocks : null;
}

/** ES: `id.txt` · EN: `id.en.txt` (falls back to ES if missing). */
export function getProjectContent(
  id: string,
  locale: Locale = "es",
): ContentBlock[] | null {
  if (locale === "en") {
    const en = readContentFile(path.join(CONTENT_DIR, `${id}.en.txt`));
    if (en) return en;
  }
  return readContentFile(path.join(CONTENT_DIR, `${id}.txt`));
}

export function getProjectContentLocales(id: string): {
  es: ContentBlock[] | null;
  en: ContentBlock[] | null;
} {
  const es = readContentFile(path.join(CONTENT_DIR, `${id}.txt`));
  const en =
    readContentFile(path.join(CONTENT_DIR, `${id}.en.txt`)) ?? es;
  return { es, en };
}

export function getProjectContentLead(
  id: string,
  locale: Locale = "es",
): string | null {
  const blocks = getProjectContent(id, locale);
  if (!blocks) return null;
  const paragraph = blocks.find((b) => b.type === "paragraph");
  return paragraph?.type === "paragraph" ? paragraph.text : null;
}
