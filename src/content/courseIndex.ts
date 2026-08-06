// ═══════════════════════════════════════════════════════════════════
// FocusOS Learning Engine — Branching Skill Tree Architecture
// ═══════════════════════════════════════════════════════════════════
//
// The entire tree starts from Level 0: "What is Information?"
// After that, it branches into 8 tracks. Each lesson can have
// prerequisites from its own track or cross-track dependencies.
//
// To add a new lesson:
//   1. Create .md files in lessons/en/ and lessons/pl/
//   2. Import them below with ?raw
//   3. Set markdownEn/markdownPl to the imported content
//   4. Add i18n keys to en.json and pl.json
//
// Lessons without content use empty strings and are shown as
// "Coming Soon" in the UI — no crash, no import errors.
// ═══════════════════════════════════════════════════════════════════

// ── Existing lesson content imports ──
import level0En from "./lessons/en/what-is-information.md?raw";
import level0Pl from "./lessons/pl/what-is-information.md?raw";
import cpuLessonEn from "./lessons/en/cpu-from-inside.md?raw";
import cpuLessonPl from "./lessons/pl/cpu-from-inside.md?raw";
import transformerLessonEn from "./lessons/en/how-transformer-works.md?raw";
import transformerLessonPl from "./lessons/pl/how-transformer-works.md?raw";
import urlLessonEn from "./lessons/en/what-happens-after-typing-url.md?raw";
import urlLessonPl from "./lessons/pl/what-happens-after-typing-url.md?raw";

// ═══════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════

export interface Lesson {
  id: string;
  titleKey: string;       // i18n key
  descriptionKey: string; // i18n key
  icon: string;           // emoji
  markdownPl: string;     // raw md content (Polish) — empty = stub
  markdownEn: string;     // raw md content (English) — empty = stub
  readTimeMin: number;
  requires: string[];     // lesson IDs that must be completed first
}

export interface Track {
  id: string;
  titleKey: string;       // i18n key
  icon: string;           // emoji
  color: string;          // accent color (hex)
  lessons: Lesson[];
}

// ═══════════════════════════════════════════════════════════════════
// LEVEL 0 — The Root
// ═══════════════════════════════════════════════════════════════════

export const LEVEL_0: Lesson = {
  id: "what-is-information",
  titleKey: "courses.level0Title",
  descriptionKey: "courses.level0Desc",
  icon: "🌱",
  markdownPl: level0Pl,
  markdownEn: level0En,
  readTimeMin: 6,
  requires: [],
};

// ═══════════════════════════════════════════════════════════════════
// TRACKS — 8 branches from Level 0
// ═══════════════════════════════════════════════════════════════════

export const TRACKS: Track[] = [
  // ── 🧠 HARDWARE ──
  {
    id: "hardware",
    titleKey: "tracks.hardware",
    icon: "🧠",
    color: "#00ffcc",
    lessons: [
      {
        id: "hw-how-bit-works",
        titleKey: "courses.hwBitTitle",
        descriptionKey: "courses.hwBitDesc",
        icon: "💡",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 5,
        requires: ["what-is-information"],
      },
      {
        id: "hw-logic-gates",
        titleKey: "courses.hwGatesTitle",
        descriptionKey: "courses.hwGatesDesc",
        icon: "⚡",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 7,
        requires: ["hw-how-bit-works"],
      },
      {
        id: "hw-cpu-instructions",
        titleKey: "courses.hwCpuTitle",
        descriptionKey: "courses.hwCpuDesc",
        icon: "🔧",
        markdownPl: cpuLessonPl,
        markdownEn: cpuLessonEn,
        readTimeMin: 8,
        requires: ["hw-logic-gates"],
      },
    ],
  },

  // ── 💻 PROGRAMMING ──
  {
    id: "programming",
    titleKey: "tracks.programming",
    icon: "💻",
    color: "#a78bfa",
    lessons: [
      {
        id: "code-variables",
        titleKey: "courses.codeVarTitle",
        descriptionKey: "courses.codeVarDesc",
        icon: "📦",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 5,
        requires: ["what-is-information"],
      },
      {
        id: "code-functions",
        titleKey: "courses.codeFnTitle",
        descriptionKey: "courses.codeFnDesc",
        icon: "🔀",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 6,
        requires: ["code-variables"],
      },
      {
        id: "code-compiler-vs-interpreter",
        titleKey: "courses.codeCompTitle",
        descriptionKey: "courses.codeCompDesc",
        icon: "⚙️",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 7,
        requires: ["code-functions"],
      },
    ],
  },

  // ── 🌐 INTERNET & NETWORKS ──
  {
    id: "internet",
    titleKey: "tracks.internet",
    icon: "🌐",
    color: "#38bdf8",
    lessons: [
      {
        id: "net-ip-address",
        titleKey: "courses.netIpTitle",
        descriptionKey: "courses.netIpDesc",
        icon: "🏠",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 5,
        requires: ["what-is-information"],
      },
      {
        id: "net-dns",
        titleKey: "courses.netDnsTitle",
        descriptionKey: "courses.netDnsDesc",
        icon: "📖",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 6,
        requires: ["net-ip-address"],
      },
      {
        id: "net-what-happens-url",
        titleKey: "courses.urlTitle",
        descriptionKey: "courses.urlDesc",
        icon: "🔗",
        markdownPl: urlLessonPl,
        markdownEn: urlLessonEn,
        readTimeMin: 9,
        requires: ["net-dns"],
      },
    ],
  },

  // ── 📐 MATHEMATICS ──
  {
    id: "math",
    titleKey: "tracks.math",
    icon: "📐",
    color: "#f59e0b",
    lessons: [
      {
        id: "math-vectors",
        titleKey: "courses.mathVecTitle",
        descriptionKey: "courses.mathVecDesc",
        icon: "➡️",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 7,
        requires: ["what-is-information"],
      },
      {
        id: "math-vector-space",
        titleKey: "courses.mathSpaceTitle",
        descriptionKey: "courses.mathSpaceDesc",
        icon: "🌌",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 8,
        requires: ["math-vectors"],
      },
      {
        id: "math-matrices",
        titleKey: "courses.mathMatTitle",
        descriptionKey: "courses.mathMatDesc",
        icon: "🔢",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 8,
        requires: ["math-vector-space"],
      },
    ],
  },

  // ── 🤖 AI ──
  {
    id: "ai",
    titleKey: "tracks.ai",
    icon: "🤖",
    color: "#c084fc",
    lessons: [
      {
        id: "ai-how-understands-text",
        titleKey: "courses.aiTextTitle",
        descriptionKey: "courses.aiTextDesc",
        icon: "💬",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 7,
        requires: ["code-variables", "math-vectors"],
      },
      {
        id: "ai-embeddings",
        titleKey: "courses.aiEmbTitle",
        descriptionKey: "courses.aiEmbDesc",
        icon: "🧬",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 8,
        requires: ["ai-how-understands-text", "math-vector-space"],
      },
      {
        id: "ai-transformer",
        titleKey: "courses.transformerTitle",
        descriptionKey: "courses.transformerDesc",
        icon: "🔮",
        markdownPl: transformerLessonPl,
        markdownEn: transformerLessonEn,
        readTimeMin: 10,
        requires: ["ai-embeddings", "math-matrices"],
      },
    ],
  },

  // ── 🔐 CRYPTOGRAPHY ──
  {
    id: "crypto",
    titleKey: "tracks.crypto",
    icon: "🔐",
    color: "#ef4444",
    lessons: [
      {
        id: "crypto-keys",
        titleKey: "courses.cryptoKeysTitle",
        descriptionKey: "courses.cryptoKeysDesc",
        icon: "🔑",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 6,
        requires: ["math-vectors"],
      },
      {
        id: "crypto-sha256",
        titleKey: "courses.cryptoShaTitle",
        descriptionKey: "courses.cryptoShaDesc",
        icon: "🧮",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 7,
        requires: ["hw-how-bit-works"],
      },
    ],
  },

  // ── 🎵 AUDIO ──
  {
    id: "audio",
    titleKey: "tracks.audio",
    icon: "🎵",
    color: "#10b981",
    lessons: [
      {
        id: "audio-pcm",
        titleKey: "courses.audioPcmTitle",
        descriptionKey: "courses.audioPcmDesc",
        icon: "🔊",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 6,
        requires: ["what-is-information"],
      },
      {
        id: "audio-fft",
        titleKey: "courses.audioFftTitle",
        descriptionKey: "courses.audioFftDesc",
        icon: "📊",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 8,
        requires: ["audio-pcm", "math-vectors"],
      },
    ],
  },

  // ── 🚀 ENGINEERING ──
  {
    id: "engineering",
    titleKey: "tracks.engineering",
    icon: "🚀",
    color: "#f97316",
    lessons: [
      {
        id: "eng-gps",
        titleKey: "courses.engGpsTitle",
        descriptionKey: "courses.engGpsDesc",
        icon: "📡",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 7,
        requires: ["net-ip-address", "math-vectors"],
      },
      {
        id: "eng-imu",
        titleKey: "courses.engImuTitle",
        descriptionKey: "courses.engImuDesc",
        icon: "🧭",
        markdownPl: "",
        markdownEn: "",
        readTimeMin: 6,
        requires: ["math-vectors"],
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
// Flat lookups
// ═══════════════════════════════════════════════════════════════════

/** Every lesson in the system (Level 0 + all tracks) */
export const ALL_LESSONS: Lesson[] = [
  LEVEL_0,
  ...TRACKS.flatMap((t) => t.lessons),
];

/** Quick ID → Lesson lookup */
export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

/** Check if a lesson has actual written content (not a stub) */
export function lessonHasContent(lesson: Lesson): boolean {
  return !!(lesson.markdownEn || lesson.markdownPl);
}

/** Get the right language markdown for a lesson */
export function getLessonMarkdown(lesson: Lesson, lang: string): string {
  return lang === "pl" ? lesson.markdownPl : lesson.markdownEn;
}

/** Find which track a lesson belongs to (undefined for Level 0) */
export function getTrackForLesson(lessonId: string): Track | undefined {
  return TRACKS.find((t) => t.lessons.some((l) => l.id === lessonId));
}
