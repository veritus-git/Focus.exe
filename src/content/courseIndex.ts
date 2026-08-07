// FocusOS Learning Engine — Radial Skill Tree Architecture
import level0En from "./lessons/en/what-is-information.md?raw";
import level0Pl from "./lessons/pl/what-is-information.md?raw";
import bitEn from "./lessons/en/how-bit-works.md?raw";
import bitPl from "./lessons/pl/how-bit-works.md?raw";
import gatesEn from "./lessons/en/logic-gates.md?raw";
import gatesPl from "./lessons/pl/logic-gates.md?raw";

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
  angle: number;
  lessons: Lesson[];
}

const S = ""; // stub placeholder

export const LEVEL_0: Lesson = {
  id: "what-is-information", titleKey: "courses.level0Title", descriptionKey: "courses.level0Desc",
  icon: "🌱", markdownPl: level0Pl, markdownEn: level0En, readTimeMin: 6, requires: [],
};

export const TRACKS: Track[] = [
  {
    id: "hardware", titleKey: "tracks.hardware", icon: "🧠", color: "#00ffcc", angle: 0,
    lessons: [
      { id: "hw-how-bit-works", titleKey: "courses.hw-how-bit-worksTitle", descriptionKey: "courses.hw-how-bit-worksDesc", icon: "💡", markdownPl: bitPl, markdownEn: bitEn, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "hw-logic-gates", titleKey: "courses.hw-logic-gatesTitle", descriptionKey: "courses.hw-logic-gatesDesc", icon: "⚡", markdownPl: gatesPl, markdownEn: gatesEn, readTimeMin: 5, requires: ["hw-how-bit-works"] },
      { id: "hw-cpu-instructions", titleKey: "courses.hw-cpu-instructionsTitle", descriptionKey: "courses.hw-cpu-instructionsDesc", icon: "🔧", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-logic-gates"] },
      { id: "hw-pipeline", titleKey: "courses.hw-pipelineTitle", descriptionKey: "courses.hw-pipelineDesc", icon: "🔄", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-cpu-instructions"] },
      { id: "hw-cache", titleKey: "courses.hw-cacheTitle", descriptionKey: "courses.hw-cacheDesc", icon: "📦", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-cpu-instructions"] },
      { id: "hw-ram", titleKey: "courses.hw-ramTitle", descriptionKey: "courses.hw-ramDesc", icon: "🧩", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-cpu-instructions"] },
      { id: "hw-multithreading", titleKey: "courses.hw-multithreadingTitle", descriptionKey: "courses.hw-multithreadingDesc", icon: "🧵", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-pipeline"] },
    ],
  },
  {
    id: "storage", titleKey: "tracks.storage", icon: "💾", color: "#0ea5e9", angle: 30,
    lessons: [
      { id: "storage-hdd-ssd", titleKey: "courses.storage-hdd-ssdTitle", descriptionKey: "courses.storage-hdd-ssdDesc", icon: "💿", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-ram"] },
      { id: "storage-nand", titleKey: "courses.storage-nandTitle", descriptionKey: "courses.storage-nandDesc", icon: "🔬", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["storage-hdd-ssd"] },
      { id: "storage-wear", titleKey: "courses.storage-wearTitle", descriptionKey: "courses.storage-wearDesc", icon: "📉", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["storage-nand"] },
      { id: "storage-raid", titleKey: "courses.storage-raidTitle", descriptionKey: "courses.storage-raidDesc", icon: "🗄️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["storage-hdd-ssd"] },
      { id: "storage-raid5", titleKey: "courses.storage-raid5Title", descriptionKey: "courses.storage-raid5Desc", icon: "🛡️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["storage-raid"] },
    ],
  },
  {
    id: "boot", titleKey: "tracks.boot", icon: "⚙️", color: "#8b5cf6", angle: 60,
    lessons: [
      { id: "boot-bios-uefi", titleKey: "courses.boot-bios-uefiTitle", descriptionKey: "courses.boot-bios-uefiDesc", icon: "🖥️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-how-bit-works"] },
      { id: "boot-bootloader", titleKey: "courses.boot-bootloaderTitle", descriptionKey: "courses.boot-bootloaderDesc", icon: "🚀", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["boot-bios-uefi"] },
      { id: "boot-gpt-mbr", titleKey: "courses.boot-gpt-mbrTitle", descriptionKey: "courses.boot-gpt-mbrDesc", icon: "💽", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["boot-bootloader"] },
      { id: "boot-secure-boot", titleKey: "courses.boot-secure-bootTitle", descriptionKey: "courses.boot-secure-bootDesc", icon: "🔐", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["boot-uefi"] },
      { id: "boot-tpm", titleKey: "courses.boot-tpmTitle", descriptionKey: "courses.boot-tpmDesc", icon: "🛡️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["boot-secure-boot"] },
    ],
  },
  {
    id: "networking", titleKey: "tracks.networking", icon: "🌐", color: "#3b82f6", angle: 90,
    lessons: [
      { id: "net-ip-address", titleKey: "courses.net-ip-addressTitle", descriptionKey: "courses.net-ip-addressDesc", icon: "🏠", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "net-dhcp", titleKey: "courses.net-dhcpTitle", descriptionKey: "courses.net-dhcpDesc", icon: "📡", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-ip-address"] },
      { id: "net-dns", titleKey: "courses.net-dnsTitle", descriptionKey: "courses.net-dnsDesc", icon: "📖", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-ip-address"] },
      { id: "net-nat", titleKey: "courses.net-natTitle", descriptionKey: "courses.net-natDesc", icon: "🔀", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-ip-address"] },
      { id: "net-tcp", titleKey: "courses.net-tcpTitle", descriptionKey: "courses.net-tcpDesc", icon: "🤝", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-ip-address"] },
      { id: "net-port-forwarding", titleKey: "courses.net-port-forwardingTitle", descriptionKey: "courses.net-port-forwardingDesc", icon: "🚪", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-nat", "net-tcp"] },
      { id: "net-wifi", titleKey: "courses.net-wifiTitle", descriptionKey: "courses.net-wifiDesc", icon: "📶", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-dhcp"] },
    ],
  },
  {
    id: "web", titleKey: "tracks.web", icon: "🕸️", color: "#06b6d4", angle: 120,
    lessons: [
      { id: "web-url", titleKey: "courses.web-urlTitle", descriptionKey: "courses.web-urlDesc", icon: "🔗", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-dns", "net-tcp"] },
      { id: "web-http", titleKey: "courses.web-httpTitle", descriptionKey: "courses.web-httpDesc", icon: "📡", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["web-url"] },
      { id: "web-https", titleKey: "courses.web-httpsTitle", descriptionKey: "courses.web-httpsDesc", icon: "🔒", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["web-http"] },
    ],
  },
  {
    id: "programming", titleKey: "tracks.programming", icon: "💻", color: "#a78bfa", angle: 150,
    lessons: [
      { id: "code-variables", titleKey: "courses.code-variablesTitle", descriptionKey: "courses.code-variablesDesc", icon: "📦", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "code-functions", titleKey: "courses.code-functionsTitle", descriptionKey: "courses.code-functionsDesc", icon: "🔀", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-variables"] },
      { id: "code-comp-int", titleKey: "courses.code-comp-intTitle", descriptionKey: "courses.code-comp-intDesc", icon: "⚙️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-functions"] },
      { id: "code-callstack", titleKey: "courses.code-callstackTitle", descriptionKey: "courses.code-callstackDesc", icon: "📚", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-functions"] },
      { id: "code-heap", titleKey: "courses.code-heapTitle", descriptionKey: "courses.code-heapDesc", icon: "🏗️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-callstack"] },
      { id: "code-pointers", titleKey: "courses.code-pointersTitle", descriptionKey: "courses.code-pointersDesc", icon: "👉", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-heap"] },
    ],
  },
  {
    id: "gpu", titleKey: "tracks.gpu", icon: "🎮", color: "#ef4444", angle: 180,
    lessons: [
      { id: "gpu-vs-cpu", titleKey: "courses.gpu-vs-cpuTitle", descriptionKey: "courses.gpu-vs-cpuDesc", icon: "⚔️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-how-bit-works"] },
      { id: "gpu-vram", titleKey: "courses.gpu-vramTitle", descriptionKey: "courses.gpu-vramDesc", icon: "🖼️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["gpu-vs-cpu"] },
      { id: "gpu-stutter", titleKey: "courses.gpu-stutterTitle", descriptionKey: "courses.gpu-stutterDesc", icon: "🛑", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["gpu-vram"] },
      { id: "gpu-upscaling", titleKey: "courses.gpu-upscalingTitle", descriptionKey: "courses.gpu-upscalingDesc", icon: "🔍", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["gpu-stutter"] },
      { id: "gpu-vrr", titleKey: "courses.gpu-vrrTitle", descriptionKey: "courses.gpu-vrrDesc", icon: "📺", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["gpu-vram"] },
    ],
  },
  {
    id: "math", titleKey: "tracks.math", icon: "📐", color: "#f59e0b", angle: 210,
    lessons: [
      { id: "math-vectors", titleKey: "courses.math-vectorsTitle", descriptionKey: "courses.math-vectorsDesc", icon: "➡️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "math-space", titleKey: "courses.math-spaceTitle", descriptionKey: "courses.math-spaceDesc", icon: "🌌", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["math-vectors"] },
      { id: "math-matrices", titleKey: "courses.math-matricesTitle", descriptionKey: "courses.math-matricesDesc", icon: "🔢", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["math-space"] },
      { id: "math-deriv", titleKey: "courses.math-derivTitle", descriptionKey: "courses.math-derivDesc", icon: "📈", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["math-vectors"] },
      { id: "math-diff", titleKey: "courses.math-diffTitle", descriptionKey: "courses.math-diffDesc", icon: "🌊", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["math-deriv"] },
      { id: "math-prob", titleKey: "courses.math-probTitle", descriptionKey: "courses.math-probDesc", icon: "🎲", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
    ],
  },
  {
    id: "ai", titleKey: "tracks.ai", icon: "🤖", color: "#c084fc", angle: 240,
    lessons: [
      { id: "ai-text", titleKey: "courses.ai-textTitle", descriptionKey: "courses.ai-textDesc", icon: "💬", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-variables", "math-vectors"] },
      { id: "ai-tokenization", titleKey: "courses.ai-tokenizationTitle", descriptionKey: "courses.ai-tokenizationDesc", icon: "✂️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["ai-text"] },
      { id: "ai-embeddings", titleKey: "courses.ai-embeddingsTitle", descriptionKey: "courses.ai-embeddingsDesc", icon: "🧬", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["ai-text", "math-space"] },
      { id: "ai-attention", titleKey: "courses.ai-attentionTitle", descriptionKey: "courses.ai-attentionDesc", icon: "🎯", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["ai-embeddings", "math-matrices"] },
      { id: "ai-transformer", titleKey: "courses.ai-transformerTitle", descriptionKey: "courses.ai-transformerDesc", icon: "🔮", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["ai-attention"] },
      { id: "ai-gpt", titleKey: "courses.ai-gptTitle", descriptionKey: "courses.ai-gptDesc", icon: "🧠", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["ai-transformer"] },
    ],
  },
  {
    id: "crypto", titleKey: "tracks.crypto", icon: "🔐", color: "#f43f5e", angle: 270,
    lessons: [
      { id: "crypto-sha256", titleKey: "courses.crypto-sha256Title", descriptionKey: "courses.crypto-sha256Desc", icon: "🧮", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-how-bit-works"] },
      { id: "crypto-keys", titleKey: "courses.crypto-keysTitle", descriptionKey: "courses.crypto-keysDesc", icon: "🔑", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["math-vectors"] },
      { id: "crypto-aes", titleKey: "courses.crypto-aesTitle", descriptionKey: "courses.crypto-aesDesc", icon: "🛡️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["crypto-sha256", "crypto-keys"] },
      { id: "crypto-sig", titleKey: "courses.crypto-sigTitle", descriptionKey: "courses.crypto-sigDesc", icon: "✍️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["crypto-keys"] },
    ],
  },
  {
    id: "system", titleKey: "tracks.system", icon: "🪟", color: "#10b981", angle: 300,
    lessons: [
      { id: "sys-registry", titleKey: "courses.sys-registryTitle", descriptionKey: "courses.sys-registryDesc", icon: "🗂️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["boot-bootloader"] },
      { id: "sys-pagefile", titleKey: "courses.sys-pagefileTitle", descriptionKey: "courses.sys-pagefileDesc", icon: "📄", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-ram"] },
      { id: "sys-safe-mode", titleKey: "courses.sys-safe-modeTitle", descriptionKey: "courses.sys-safe-modeDesc", icon: "🚑", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["sys-registry"] },
      { id: "sys-backup", titleKey: "courses.sys-backupTitle", descriptionKey: "courses.sys-backupDesc", icon: "🕒", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["sys-registry"] },
    ],
  },
  {
    id: "servers", titleKey: "tracks.servers", icon: "🖥️", color: "#f97316", angle: 330,
    lessons: [
      { id: "srv-ssh", titleKey: "courses.srv-sshTitle", descriptionKey: "courses.srv-sshDesc", icon: "🔑", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-ip-address"] },
      { id: "srv-docker", titleKey: "courses.srv-dockerTitle", descriptionKey: "courses.srv-dockerDesc", icon: "🐳", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-comp-int"] },
      { id: "srv-reverse-proxy", titleKey: "courses.srv-reverse-proxyTitle", descriptionKey: "courses.srv-reverse-proxyDesc", icon: "🔄", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-http"] },
    ],
  },
];

export const ALL_LESSONS: Lesson[] = [LEVEL_0, ...TRACKS.flatMap((t) => t.lessons)];
export function getLessonById(id: string): Lesson | undefined { return ALL_LESSONS.find((l) => l.id === id); }
export function lessonHasContent(lesson: Lesson): boolean { return !!(lesson.markdownEn || lesson.markdownPl); }
export function getLessonMarkdown(lesson: Lesson, lang: string): string { return lang === "pl" ? lesson.markdownPl : lesson.markdownEn; }
export function getTrackForLesson(lessonId: string): Track | undefined { return TRACKS.find((t) => t.lessons.some((l) => l.id === lessonId)); }

// Radial layout calculation
export const P: Record<string, { x: number; y: number }> = (() => {
  const positions: Record<string, { x: number; y: number }> = {};
  positions["what-is-information"] = { x: 0, y: 0 };
  
  // 1. Calculate depth
  const depths: Record<string, number> = { "what-is-information": 0 };
  let queue = ["what-is-information"];
  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const children = ALL_LESSONS.filter(l => l.requires.includes(currentId));
    for (const child of children) {
      if (depths[child.id] === undefined) {
        depths[child.id] = depths[currentId] + 1;
        queue.push(child.id);
      }
    }
  }

  // 2. Position nodes
  for (const track of TRACKS) {
    const baseAngle = track.angle;
    const lessonsByDepth: Record<number, string[]> = {};
    for (const lesson of track.lessons) {
      const d = depths[lesson.id] || 1;
      if (!lessonsByDepth[d]) lessonsByDepth[d] = [];
      lessonsByDepth[d].push(lesson.id);
    }
    
    for (const d of Object.keys(lessonsByDepth).map(Number)) {
      const ids = lessonsByDepth[d];
      const radius = d * 380; // 380px distance per depth
      const maxSpreadAngle = 24; 
      
      ids.forEach((id, index) => {
        let angleOffset = 0;
        if (ids.length > 1) {
          const step = maxSpreadAngle / (ids.length - 1);
          angleOffset = -maxSpreadAngle/2 + step * index;
        }
        
        const finalAngleRad = ((baseAngle + angleOffset) * Math.PI) / 180;
        positions[id] = {
          x: Math.round(Math.cos(finalAngleRad) * radius),
          y: Math.round(Math.sin(finalAngleRad) * radius),
        };
      });
    }
  }
  return positions;
})();
