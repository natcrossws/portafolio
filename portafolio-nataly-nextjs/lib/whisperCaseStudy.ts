import type { LocalizedText } from "@/lib/projects";

export type WhisperCaseCopy = {
  heroTitle: {
    line1: LocalizedText;
    line2: LocalizedText;
    accent: LocalizedText;
  };
  heroLead: LocalizedText;
  meta: {
    project: LocalizedText;
    year: LocalizedText;
    label: LocalizedText;
    role: LocalizedText;
  };
  ideaTitle: LocalizedText;
  ideaBody: LocalizedText;
  ideaNote: LocalizedText;
  pipelineTitle: LocalizedText;
  pipelineLead: LocalizedText;
  pipeline: { title: LocalizedText; body: LocalizedText }[];
  labTitle: LocalizedText;
  labLead: LocalizedText;
  labItems: LocalizedText[];
  mapTitle: LocalizedText;
  mapLead: LocalizedText;
  mappings: { from: LocalizedText; to: LocalizedText }[];
  roadmapTitle: LocalizedText;
  roadmap: { title: LocalizedText; body: LocalizedText }[];
  stackTitle: LocalizedText;
  stack: LocalizedText[];
};

export const WHISPER_CASE_STUDY: WhisperCaseCopy = {
  heroTitle: {
    line1: {
      es: "Whisper of the sound:",
      en: "Whisper of the sound:",
    },
    line2: {
      es: "pintura digital impulsada por",
      en: "digital painting driven by",
    },
    accent: {
      es: "sonido en vivo",
      en: "live sound",
    },
  },
  heroLead: {
    es: "Arte generativo con redes neuronales: una interpretación en vivo genera texturas que se acumulan, se deforman y se disuelven. Hoy funciona el laboratorio de escucha en el navegador.",
    en: "Generative art with neural networks: a live performance generates textures that accumulate, deform, and dissolve. The browser listening lab is already working.",
  },
  meta: {
    project: { es: "Whisper of the sound", en: "Whisper of the sound" },
    year: { es: "2026", en: "2026" },
    label: { es: "Generativo · Sonido · ML", en: "Generative · Sound · ML" },
    role: { es: "Arte generativo · ML", en: "Generative art · ML" },
  },
  ideaTitle: {
    es: "La idea documentada",
    en: "The documented idea",
  },
  ideaBody: {
    es: "No busco que la obra identifique instrumentos con precisión, sino que escuche comportamiento: energía, ataques, tonalidad, ruido. Esa es la diferencia entre una obra que escucha y un visualizador que solo reacciona al volumen.",
    en: "I am not aiming for the piece to identify instruments with precision, but to listen to behavior: energy, attacks, tonality, noise. That is the difference between a work that listens and a visualizer that only reacts to volume.",
  },
  ideaNote: {
    es: "La imagen recuerda lo que escuchó; el silencio la vacía.",
    en: "The image remembers what it heard; silence empties it.",
  },
  pipelineTitle: {
    es: "Flujo del sistema",
    en: "System flow",
  },
  pipelineLead: {
    es: "Cadena de escucha en el navegador: de la captura al análisis y, más adelante, al lienzo generativo.",
    en: "Listening chain in the browser: from capture to analysis and, later, to the generative canvas.",
  },
  pipeline: [
    {
      title: { es: "Captura", en: "Capture" },
      body: {
        es: "Micrófono sin procesamiento de videollamada, para no recortar armónicos.",
        en: "Microphone without videocall processing, so harmonics are not clipped.",
      },
    },
    {
      title: { es: "Señal", en: "Signal" },
      body: {
        es: "Web Audio API: forma de onda, espectro logarítmico y nivel con pico.",
        en: "Web Audio API: waveform, logarithmic spectrum, and level with peak.",
      },
    },
    {
      title: { es: "Análisis", en: "Analysis" },
      body: {
        es: "Tono y nota (C1–C7), cents, y clasificación voz / tonal / percusión / ruido.",
        en: "Pitch and note (C1–C7), cents, and voice / tonal / percussion / noise classification.",
      },
    },
    {
      title: { es: "Modelo", en: "Model" },
      body: {
        es: "Reconocimiento de instrumentos con AST/AudioSet vía Transformers.js.",
        en: "Instrument recognition with AST/AudioSet via Transformers.js.",
      },
    },
    {
      title: { es: "Memoria", en: "Memory" },
      body: {
        es: "Semillas: picos que decaen y notas que se sostienen en el tiempo.",
        en: "Seeds: peaks that decay and notes that sustain over time.",
      },
    },
    {
      title: { es: "Lienzo", en: "Canvas" },
      body: {
        es: "Próximo: partículas, Perlin, shaders y StyleGAN2 con texturas de pintura.",
        en: "Next: particles, Perlin, shaders, and StyleGAN2 with paint textures.",
      },
    },
  ],
  labTitle: {
    es: "Laboratorio de escucha · estado actual",
    en: "Listening lab · current state",
  },
  labLead: {
    es: "La primera lección ya corre en el navegador y está documentada paso a paso.",
    en: "The first lesson already runs in the browser and is documented step by step.",
  },
  labItems: [
    {
      es: "Captura limpia de micrófono",
      en: "Clean microphone capture",
    },
    {
      es: "Visualización de onda y espectro",
      en: "Waveform and spectrum view",
    },
    {
      es: "Detección de tono y nota",
      en: "Pitch and note detection",
    },
    {
      es: "Clasificación en tiempo real",
      en: "Real-time classification",
    },
    {
      es: "IA de instrumentos en el cliente",
      en: "On-device instrument AI",
    },
    {
      es: "Memoria inicial de eventos",
      en: "Initial event memory",
    },
  ],
  mapTitle: {
    es: "Mapa sonido → imagen",
    en: "Sound → image map",
  },
  mapLead: {
    es: "Reglas de traducción que definen cómo cada capa auditiva se vuelve trazo visual.",
    en: "Translation rules that define how each auditory layer becomes a visual mark.",
  },
  mappings: [
    { from: { es: "Graves", en: "Lows" }, to: { es: "Movimiento denso", en: "Dense motion" } },
    { from: { es: "Medios", en: "Mids" }, to: { es: "Fluido", en: "Fluid" } },
    { from: { es: "Agudos", en: "Highs" }, to: { es: "Partículas", en: "Particles" } },
    { from: { es: "Amplitud", en: "Amplitude" }, to: { es: "Deformación", en: "Deformation" } },
    { from: { es: "Ritmo", en: "Rhythm" }, to: { es: "Pulsos", en: "Pulses" } },
    { from: { es: "Silencio", en: "Silence" }, to: { es: "Disolución", en: "Dissolution" } },
  ],
  roadmapTitle: {
    es: "Hoja de ruta",
    en: "Roadmap",
  },
  roadmap: [
    {
      title: {
        es: "Escuchar por bandas",
        en: "Listen by bands",
      },
      body: {
        es: "Graves, medios y agudos como señales propias, más detección de ataques.",
        en: "Lows, mids, and highs as their own signals, plus attack detection.",
      },
    },
    {
      title: {
        es: "Música vs ruido",
        en: "Music vs noise",
      },
      body: {
        es: "Distinguir la música del ruido y leer el comportamiento del sonido.",
        en: "Distinguish music from noise and read the behavior of sound.",
      },
    },
    {
      title: {
        es: "Primer lienzo",
        en: "First canvas",
      },
      body: {
        es: "Partículas, ruido Perlin, persistencia en pantalla y shaders.",
        en: "Particles, Perlin noise, screen persistence, and shaders.",
      },
    },
    {
      title: {
        es: "Controles en vivo",
        en: "Live controls",
      },
      body: {
        es: "Probar en performance cómo cada sonido se traduce en imagen.",
        en: "Test in performance how each sound translates into image.",
      },
    },
  ],
  stackTitle: {
    es: "Stack documentado",
    en: "Documented stack",
  },
  stack: [
    { es: "JavaScript", en: "JavaScript" },
    { es: "Web Audio API", en: "Web Audio API" },
    { es: "Transformers.js", en: "Transformers.js" },
    { es: "AST / AudioSet", en: "AST / AudioSet" },
    { es: "StyleGAN2", en: "StyleGAN2" },
    { es: "p5.js (próx.)", en: "p5.js (soon)" },
  ],
};
