// FocusOS Learning Engine — Branching Skill Tree Architecture
// To add a lesson: create .md in lessons/en/ + lessons/pl/, import here, add i18n keys.
// Empty markdownEn/Pl = stub shown as "Coming Soon".

import level0En from "./lessons/en/what-is-information.md?raw";
import level0Pl from "./lessons/pl/what-is-information.md?raw";
import cpuEn from "./lessons/en/cpu-from-inside.md?raw";
import cpuPl from "./lessons/pl/cpu-from-inside.md?raw";
import transformerEn from "./lessons/en/how-transformer-works.md?raw";
import transformerPl from "./lessons/pl/how-transformer-works.md?raw";
import urlEn from "./lessons/en/what-happens-after-typing-url.md?raw";
import urlPl from "./lessons/pl/what-happens-after-typing-url.md?raw";
import bitEn from "./lessons/en/how-bit-works.md?raw";
import bitPl from "./lessons/pl/how-bit-works.md?raw";

export interface Lesson {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  markdownPl: string;
  markdownEn: string;
  readTimeMin: number;
  requires: string[];
}

export interface Track {
  id: string;
  titleKey: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

const S = ""; // stub placeholder

export const LEVEL_0: Lesson = {
  id: "what-is-information", titleKey: "courses.level0Title", descriptionKey: "courses.level0Desc",
  icon: "🌱", markdownPl: level0Pl, markdownEn: level0En, readTimeMin: 6, requires: [],
};

export const TRACKS: Track[] = [
  {
    id: "hardware", titleKey: "tracks.hardware", icon: "🧠", color: "#00ffcc",
    lessons: [
      { id: "hw-how-bit-works", titleKey: "courses.hwBitTitle", descriptionKey: "courses.hwBitDesc", icon: "💡", markdownPl: bitPl, markdownEn: bitEn, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "hw-logic-gates", titleKey: "courses.hwGatesTitle", descriptionKey: "courses.hwGatesDesc", icon: "⚡", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["hw-how-bit-works"] },
      { id: "hw-cpu-instructions", titleKey: "courses.hwCpuTitle", descriptionKey: "courses.hwCpuDesc", icon: "🔧", markdownPl: cpuPl, markdownEn: cpuEn, readTimeMin: 8, requires: ["hw-logic-gates"] },
      { id: "hw-pipeline", titleKey: "courses.hwPipeTitle", descriptionKey: "courses.hwPipeDesc", icon: "🔄", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["hw-cpu-instructions"] },
      { id: "hw-cache", titleKey: "courses.hwCacheTitle", descriptionKey: "courses.hwCacheDesc", icon: "📦", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["hw-cpu-instructions"] },
      { id: "hw-ram", titleKey: "courses.hwRamTitle", descriptionKey: "courses.hwRamDesc", icon: "🧩", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["hw-cpu-instructions"] },
      { id: "hw-ssd", titleKey: "courses.hwSsdTitle", descriptionKey: "courses.hwSsdDesc", icon: "💾", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-ram"] },
      { id: "hw-multithreading", titleKey: "courses.hwThreadTitle", descriptionKey: "courses.hwThreadDesc", icon: "🧵", markdownPl: S, markdownEn: S, readTimeMin: 8, requires: ["hw-pipeline"] },
    ],
  },
  {
    id: "programming", titleKey: "tracks.programming", icon: "💻", color: "#a78bfa",
    lessons: [
      { id: "code-variables", titleKey: "courses.codeVarTitle", descriptionKey: "courses.codeVarDesc", icon: "📦", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "code-functions", titleKey: "courses.codeFnTitle", descriptionKey: "courses.codeFnDesc", icon: "🔀", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["code-variables"] },
      { id: "code-compiler-vs-interpreter", titleKey: "courses.codeCompTitle", descriptionKey: "courses.codeCompDesc", icon: "⚙️", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["code-functions"] },
      { id: "code-callstack", titleKey: "courses.codeStackTitle", descriptionKey: "courses.codeStackDesc", icon: "📚", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["code-functions"] },
      { id: "code-stack-heap", titleKey: "courses.codeHeapTitle", descriptionKey: "courses.codeHeapDesc", icon: "🏗️", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["code-callstack"] },
      { id: "code-pointers", titleKey: "courses.codePtrTitle", descriptionKey: "courses.codePtrDesc", icon: "👉", markdownPl: S, markdownEn: S, readTimeMin: 8, requires: ["code-stack-heap"] },
    ],
  },
  {
    id: "internet", titleKey: "tracks.internet", icon: "🌐", color: "#38bdf8",
    lessons: [
      { id: "net-ip-address", titleKey: "courses.netIpTitle", descriptionKey: "courses.netIpDesc", icon: "🏠", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "net-dns", titleKey: "courses.netDnsTitle", descriptionKey: "courses.netDnsDesc", icon: "📖", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["net-ip-address"] },
      { id: "net-tcp", titleKey: "courses.netTcpTitle", descriptionKey: "courses.netTcpDesc", icon: "🤝", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["net-ip-address"] },
      { id: "net-what-happens-url", titleKey: "courses.urlTitle", descriptionKey: "courses.urlDesc", icon: "🔗", markdownPl: urlPl, markdownEn: urlEn, readTimeMin: 9, requires: ["net-dns", "net-tcp"] },
      { id: "net-http", titleKey: "courses.netHttpTitle", descriptionKey: "courses.netHttpDesc", icon: "📡", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["net-what-happens-url"] },
      { id: "net-https", titleKey: "courses.netHttpsTitle", descriptionKey: "courses.netHttpsDesc", icon: "🔒", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["net-http", "crypto-keys"] },
    ],
  },
  {
    id: "math", titleKey: "tracks.math", icon: "📐", color: "#f59e0b",
    lessons: [
      { id: "math-vectors", titleKey: "courses.mathVecTitle", descriptionKey: "courses.mathVecDesc", icon: "➡️", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["what-is-information"] },
      { id: "math-derivatives", titleKey: "courses.mathDerivTitle", descriptionKey: "courses.mathDerivDesc", icon: "📈", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["math-vectors"] },
      { id: "math-vector-space", titleKey: "courses.mathSpaceTitle", descriptionKey: "courses.mathSpaceDesc", icon: "🌌", markdownPl: S, markdownEn: S, readTimeMin: 8, requires: ["math-vectors"] },
      { id: "math-probability", titleKey: "courses.mathProbTitle", descriptionKey: "courses.mathProbDesc", icon: "🎲", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["what-is-information"] },
      { id: "math-matrices", titleKey: "courses.mathMatTitle", descriptionKey: "courses.mathMatDesc", icon: "🔢", markdownPl: S, markdownEn: S, readTimeMin: 8, requires: ["math-vector-space"] },
      { id: "math-diff-eq", titleKey: "courses.mathDiffTitle", descriptionKey: "courses.mathDiffDesc", icon: "🌊", markdownPl: S, markdownEn: S, readTimeMin: 9, requires: ["math-derivatives"] },
      { id: "math-gradient-descent", titleKey: "courses.mathGradTitle", descriptionKey: "courses.mathGradDesc", icon: "⛰️", markdownPl: S, markdownEn: S, readTimeMin: 8, requires: ["math-derivatives", "ai-embeddings"] },
    ],
  },
  {
    id: "ai", titleKey: "tracks.ai", icon: "🤖", color: "#c084fc",
    lessons: [
      { id: "ai-how-understands-text", titleKey: "courses.aiTextTitle", descriptionKey: "courses.aiTextDesc", icon: "💬", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["code-variables", "math-vectors"] },
      { id: "ai-tokenization", titleKey: "courses.aiTokenTitle", descriptionKey: "courses.aiTokenDesc", icon: "✂️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["ai-how-understands-text"] },
      { id: "ai-embeddings", titleKey: "courses.aiEmbTitle", descriptionKey: "courses.aiEmbDesc", icon: "🧬", markdownPl: S, markdownEn: S, readTimeMin: 8, requires: ["ai-how-understands-text", "math-vector-space"] },
      { id: "ai-attention", titleKey: "courses.aiAttnTitle", descriptionKey: "courses.aiAttnDesc", icon: "🎯", markdownPl: S, markdownEn: S, readTimeMin: 9, requires: ["ai-embeddings", "math-matrices"] },
      { id: "ai-transformer", titleKey: "courses.transformerTitle", descriptionKey: "courses.transformerDesc", icon: "🔮", markdownPl: transformerPl, markdownEn: transformerEn, readTimeMin: 10, requires: ["ai-attention"] },
      { id: "ai-chatgpt", titleKey: "courses.aiGptTitle", descriptionKey: "courses.aiGptDesc", icon: "🧠", markdownPl: S, markdownEn: S, readTimeMin: 8, requires: ["ai-transformer"] },
      { id: "ai-context-window", titleKey: "courses.aiCtxTitle", descriptionKey: "courses.aiCtxDesc", icon: "📏", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["ai-transformer", "hw-cache"] },
    ],
  },
  {
    id: "crypto", titleKey: "tracks.crypto", icon: "🔐", color: "#ef4444",
    lessons: [
      { id: "crypto-sha256", titleKey: "courses.cryptoShaTitle", descriptionKey: "courses.cryptoShaDesc", icon: "🧮", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["hw-how-bit-works"] },
      { id: "crypto-keys", titleKey: "courses.cryptoKeysTitle", descriptionKey: "courses.cryptoKeysDesc", icon: "🔑", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["math-vectors"] },
      { id: "crypto-aes", titleKey: "courses.cryptoAesTitle", descriptionKey: "courses.cryptoAesDesc", icon: "🛡️", markdownPl: S, markdownEn: S, readTimeMin: 8, requires: ["crypto-sha256", "crypto-keys"] },
      { id: "crypto-digital-signature", titleKey: "courses.cryptoSigTitle", descriptionKey: "courses.cryptoSigDesc", icon: "✍️", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["crypto-keys"] },
    ],
  },
  {
    id: "audio", titleKey: "tracks.audio", icon: "🎵", color: "#10b981",
    lessons: [
      { id: "audio-pcm", titleKey: "courses.audioPcmTitle", descriptionKey: "courses.audioPcmDesc", icon: "🔊", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["what-is-information"] },
      { id: "audio-fft", titleKey: "courses.audioFftTitle", descriptionKey: "courses.audioFftDesc", icon: "📊", markdownPl: S, markdownEn: S, readTimeMin: 8, requires: ["audio-pcm", "math-vectors"] },
      { id: "audio-spectrogram", titleKey: "courses.audioSpecTitle", descriptionKey: "courses.audioSpecDesc", icon: "🌈", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["audio-fft"] },
      { id: "audio-vad", titleKey: "courses.audioVadTitle", descriptionKey: "courses.audioVadDesc", icon: "🎤", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["audio-spectrogram", "ai-how-understands-text"] },
    ],
  },
  {
    id: "engineering", titleKey: "tracks.engineering", icon: "🚀", color: "#f97316",
    lessons: [
      { id: "eng-gps", titleKey: "courses.engGpsTitle", descriptionKey: "courses.engGpsDesc", icon: "📡", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["net-ip-address", "math-vectors"] },
      { id: "eng-imu", titleKey: "courses.engImuTitle", descriptionKey: "courses.engImuDesc", icon: "🧭", markdownPl: S, markdownEn: S, readTimeMin: 6, requires: ["math-vectors"] },
      { id: "eng-lidar", titleKey: "courses.engLidarTitle", descriptionKey: "courses.engLidarDesc", icon: "🔦", markdownPl: S, markdownEn: S, readTimeMin: 7, requires: ["eng-gps"] },
      { id: "eng-autopilot", titleKey: "courses.engAutoTitle", descriptionKey: "courses.engAutoDesc", icon: "🛩️", markdownPl: S, markdownEn: S, readTimeMin: 9, requires: ["eng-imu", "math-diff-eq"] },
    ],
  },
];

export const ALL_LESSONS: Lesson[] = [LEVEL_0, ...TRACKS.flatMap((t) => t.lessons)];
export function getLessonById(id: string): Lesson | undefined { return ALL_LESSONS.find((l) => l.id === id); }
export function lessonHasContent(lesson: Lesson): boolean { return !!(lesson.markdownEn || lesson.markdownPl); }
export function getLessonMarkdown(lesson: Lesson, lang: string): string { return lang === "pl" ? lesson.markdownPl : lesson.markdownEn; }
export function getTrackForLesson(lessonId: string): Track | undefined { return TRACKS.find((t) => t.lessons.some((l) => l.id === lessonId)); }
