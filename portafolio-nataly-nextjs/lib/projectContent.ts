export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function isBanner(line: string) {
  return /^=+$/.test(line) || /^-+$/.test(line);
}

function isHeadingCandidate(line: string, next?: string) {
  if (!line || line.startsWith("•") || line.startsWith("- ")) return false;
  // Numbered / lettered subsections: "3. Pipeline…", "A) Frontend…"
  if (/^\d+\.\s+\S/.test(line) && line.length < 90) return true;
  if (/^[A-Z]\)\s+\S/.test(line) && line.length < 90) return true;
  if (/^[A-ZÁÉÍÓÚÜÑ0-9][A-ZÁÉÍÓÚÜÑ0-9\s/·:,()—–-]{2,}$/.test(line) && line.length < 90) {
    return true;
  }
  if (next && /^-+$/.test(next) && line.length < 90) return true;
  return false;
}

export function parseProjectContent(raw: string): ContentBlock[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const blocks: ContentBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push({ type: "paragraph", text });
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    blocks.push({ type: "list", items: list });
    list = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    const trimmed = line.trim();
    const next = lines[i + 1]?.trim();
    const indentedContinuation = /^ {2,}\S/.test(line) && !/^[•·]/.test(trimmed);

    if (!trimmed) {
      flushList();
      flushParagraph();
      continue;
    }

    if (isBanner(trimmed)) {
      flushList();
      flushParagraph();
      continue;
    }

    if (/^(Fin del documento|End of document)$/i.test(trimmed)) {
      flushList();
      flushParagraph();
      break;
    }

    const bullet = trimmed.match(/^[•·]\s+(.*)$/) || trimmed.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1].trim());
      continue;
    }

    // Headings first — even when indented (e.g. "  3. Pipeline…")
    if (isHeadingCandidate(trimmed, next)) {
      flushList();
      flushParagraph();
      if (next && /^-+$/.test(next)) i += 1;
      blocks.push({ type: "heading", text: trimmed });
      continue;
    }

    // Soft-wrapped continuation under a bullet or paragraph
    if (indentedContinuation) {
      if (list.length) {
        list[list.length - 1] = `${list[list.length - 1]} ${trimmed}`;
        continue;
      }
      // New body block after a heading: start a fresh paragraph
      if (blocks.at(-1)?.type === "heading" && !paragraph.length) {
        paragraph.push(trimmed);
        continue;
      }
      paragraph.push(trimmed);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushList();
  flushParagraph();
  return blocks;
}

export type ContentSection = {
  id: string;
  heading: string | null;
  /** Optional big index extracted from "1. Título" / "A) Título" */
  indexLabel: string | null;
  headingLabel: string | null;
  blocks: ContentBlock[];
};

function slugifyHeading(text: string, fallback: string) {
  const base = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || fallback;
}

function splitHeading(text: string) {
  const numbered = text.match(/^(\d+)\.\s+(.*)$/);
  if (numbered) {
    return { indexLabel: numbered[1], headingLabel: numbered[2] };
  }
  const lettered = text.match(/^([A-Z])\)\s+(.*)$/);
  if (lettered) {
    return { indexLabel: lettered[1], headingLabel: lettered[2] };
  }
  return { indexLabel: null, headingLabel: text };
}

export function groupContentSections(blocks: ContentBlock[]): {
  lede: string | null;
  sections: ContentSection[];
} {
  let lede: string | null = null;
  const sections: ContentSection[] = [];
  let current: ContentSection | null = null;
  let sectionCount = 0;

  const pushCurrent = () => {
    if (current && (current.heading || current.blocks.length)) {
      sections.push(current);
    }
    current = null;
  };

  for (const block of blocks) {
    if (block.type === "heading") {
      pushCurrent();
      sectionCount += 1;
      const { indexLabel, headingLabel } = splitHeading(block.text);
      current = {
        id: slugifyHeading(block.text, `seccion-${sectionCount}`),
        heading: block.text,
        indexLabel,
        headingLabel,
        blocks: [],
      };
      continue;
    }

    if (!current) {
      if (block.type === "paragraph" && !lede) {
        lede = block.text;
        continue;
      }
      sectionCount += 1;
      current = {
        id: `seccion-${sectionCount}`,
        heading: null,
        indexLabel: null,
        headingLabel: null,
        blocks: [],
      };
    }

    current.blocks.push(block);
  }

  pushCurrent();
  return { lede, sections };
}

export function isHighlightParagraph(text: string) {
  return /^(en una frase|idea central|el aporte clave|resultado|el reto|el mapa de la obra|in one sentence|core idea|the key contribution|the challenge|outcome|result|the map of the work)\b/i.test(
    text.trim(),
  );
}
