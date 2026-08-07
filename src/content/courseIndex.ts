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
      { id: "hw-intro", titleKey: "courses.hw-introTitle", descriptionKey: "courses.hw-introDesc", icon: "🖥️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "hw-history", titleKey: "courses.hw-historyTitle", descriptionKey: "courses.hw-historyDesc", icon: "📜", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-intro"] },
      { id: "hw-components", titleKey: "courses.hw-componentsTitle", descriptionKey: "courses.hw-componentsDesc", icon: "🧩", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-intro"] },
      { id: "hw-how-bit-works", titleKey: "courses.hw-how-bit-worksTitle", descriptionKey: "courses.hw-how-bit-worksDesc", icon: "💡", markdownPl: bitPl, markdownEn: bitEn, readTimeMin: 5, requires: ["hw-components"] },
      { id: "hw-logic-gates", titleKey: "courses.hw-logic-gatesTitle", descriptionKey: "courses.hw-logic-gatesDesc", icon: "⚡", markdownPl: gatesPl, markdownEn: gatesEn, readTimeMin: 5, requires: ["hw-how-bit-works"] },
      { id: "hw-alu", titleKey: "courses.hw-aluTitle", descriptionKey: "courses.hw-aluDesc", icon: "🧮", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-logic-gates"] },
      { id: "hw-cpu-instructions", titleKey: "courses.hw-cpu-instructionsTitle", descriptionKey: "courses.hw-cpu-instructionsDesc", icon: "🔧", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-alu"] },
      { id: "hw-cache", titleKey: "courses.hw-cacheTitle", descriptionKey: "courses.hw-cacheDesc", icon: "📦", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["hw-cpu-instructions"] },
    ],
  },
  {
    id: "storage", titleKey: "tracks.storage", icon: "💾", color: "#0ea5e9", angle: 22.5,
    lessons: [
      { id: "storage-intro", titleKey: "courses.storage-introTitle", descriptionKey: "courses.storage-introDesc", icon: "📥", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "storage-ram", titleKey: "courses.storage-ramTitle", descriptionKey: "courses.storage-ramDesc", icon: "🧩", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["storage-intro"] },
      { id: "storage-hdd-ssd", titleKey: "courses.storage-hdd-ssdTitle", descriptionKey: "courses.storage-hdd-ssdDesc", icon: "💿", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["storage-intro"] },
      { id: "storage-nand", titleKey: "courses.storage-nandTitle", descriptionKey: "courses.storage-nandDesc", icon: "🔬", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["storage-hdd-ssd"] },
      { id: "storage-raid", titleKey: "courses.storage-raidTitle", descriptionKey: "courses.storage-raidDesc", icon: "🗄️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["storage-hdd-ssd"] },
    ],
  },
  {
    id: "os", titleKey: "tracks.os", icon: "⚙️", color: "#8b5cf6", angle: 45,
    lessons: [
      { id: "os-intro", titleKey: "courses.os-introTitle", descriptionKey: "courses.os-introDesc", icon: "🖥️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "os-boot", titleKey: "courses.os-bootTitle", descriptionKey: "courses.os-bootDesc", icon: "🚀", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["os-intro"] },
      { id: "os-kernel", titleKey: "courses.os-kernelTitle", descriptionKey: "courses.os-kernelDesc", icon: "🧠", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["os-boot"] },
      { id: "os-scheduling", titleKey: "courses.os-schedulingTitle", descriptionKey: "courses.os-schedulingDesc", icon: "⏱️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["os-kernel"] },
      { id: "os-filesystems", titleKey: "courses.os-filesystemsTitle", descriptionKey: "courses.os-filesystemsDesc", icon: "📁", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["os-kernel"] },
    ],
  },
  {
    id: "networking", titleKey: "tracks.networking", icon: "🌐", color: "#3b82f6", angle: 67.5,
    lessons: [
      { id: "net-intro", titleKey: "courses.net-introTitle", descriptionKey: "courses.net-introDesc", icon: "📡", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "net-ip", titleKey: "courses.net-ipTitle", descriptionKey: "courses.net-ipDesc", icon: "🏠", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-intro"] },
      { id: "net-dns", titleKey: "courses.net-dnsTitle", descriptionKey: "courses.net-dnsDesc", icon: "📖", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-ip"] },
      { id: "net-tcp", titleKey: "courses.net-tcpTitle", descriptionKey: "courses.net-tcpDesc", icon: "🤝", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-ip"] },
      { id: "net-nat", titleKey: "courses.net-natTitle", descriptionKey: "courses.net-natDesc", icon: "🔀", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["net-tcp"] },
    ],
  },
  {
    id: "web", titleKey: "tracks.web", icon: "🕸️", color: "#06b6d4", angle: 90,
    lessons: [
      { id: "web-intro", titleKey: "courses.web-introTitle", descriptionKey: "courses.web-introDesc", icon: "🌐", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "web-http", titleKey: "courses.web-httpTitle", descriptionKey: "courses.web-httpDesc", icon: "📡", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["web-intro"] },
      { id: "web-dom", titleKey: "courses.web-domTitle", descriptionKey: "courses.web-domDesc", icon: "📄", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["web-intro"] },
      { id: "web-js", titleKey: "courses.web-jsTitle", descriptionKey: "courses.web-jsDesc", icon: "⚡", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["web-dom"] },
    ],
  },
  {
    id: "cloud", titleKey: "tracks.cloud", icon: "☁️", color: "#14b8a6", angle: 112.5,
    lessons: [
      { id: "cloud-intro", titleKey: "courses.cloud-introTitle", descriptionKey: "courses.cloud-introDesc", icon: "☁️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "cloud-servers", titleKey: "courses.cloud-serversTitle", descriptionKey: "courses.cloud-serversDesc", icon: "🖥️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["cloud-intro"] },
      { id: "cloud-docker", titleKey: "courses.cloud-dockerTitle", descriptionKey: "courses.cloud-dockerDesc", icon: "🐳", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["cloud-servers"] },
      { id: "cloud-load-balancing", titleKey: "courses.cloud-load-balancingTitle", descriptionKey: "courses.cloud-load-balancingDesc", icon: "⚖️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["cloud-servers"] },
    ],
  },
  {
    id: "programming", titleKey: "tracks.programming", icon: "💻", color: "#a78bfa", angle: 135,
    lessons: [
      { id: "code-intro", titleKey: "courses.code-introTitle", descriptionKey: "courses.code-introDesc", icon: "⌨️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "code-variables", titleKey: "courses.code-variablesTitle", descriptionKey: "courses.code-variablesDesc", icon: "📦", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-intro"] },
      { id: "code-functions", titleKey: "courses.code-functionsTitle", descriptionKey: "courses.code-functionsDesc", icon: "🔀", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-variables"] },
      { id: "code-callstack", titleKey: "courses.code-callstackTitle", descriptionKey: "courses.code-callstackDesc", icon: "📚", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-functions"] },
      { id: "code-heap", titleKey: "courses.code-heapTitle", descriptionKey: "courses.code-heapDesc", icon: "🏗️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["code-callstack"] },
    ],
  },
  {
    id: "compilers", titleKey: "tracks.compilers", icon: "⚙️", color: "#d946ef", angle: 157.5,
    lessons: [
      { id: "comp-intro", titleKey: "courses.comp-introTitle", descriptionKey: "courses.comp-introDesc", icon: "📚", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "comp-vs-int", titleKey: "courses.comp-vs-intTitle", descriptionKey: "courses.comp-vs-intDesc", icon: "📜", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["comp-intro"] },
      { id: "comp-ast", titleKey: "courses.comp-astTitle", descriptionKey: "courses.comp-astDesc", icon: "🌳", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["comp-vs-int"] },
      { id: "comp-jit", titleKey: "courses.comp-jitTitle", descriptionKey: "courses.comp-jitDesc", icon: "⚡", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["comp-ast"] },
    ],
  },
  {
    id: "algorithms", titleKey: "tracks.algorithms", icon: "🧮", color: "#fb923c", angle: 180,
    lessons: [
      { id: "algo-intro", titleKey: "courses.algo-introTitle", descriptionKey: "courses.algo-introDesc", icon: "📝", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "algo-arrays", titleKey: "courses.algo-arraysTitle", descriptionKey: "courses.algo-arraysDesc", icon: "📊", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["algo-intro"] },
      { id: "algo-bigo", titleKey: "courses.algo-bigoTitle", descriptionKey: "courses.algo-bigoDesc", icon: "⏱️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["algo-arrays"] },
      { id: "algo-hash", titleKey: "courses.algo-hashTitle", descriptionKey: "courses.algo-hashDesc", icon: "🏷️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["algo-arrays"] },
      { id: "algo-sort", titleKey: "courses.algo-sortTitle", descriptionKey: "courses.algo-sortDesc", icon: "🔄", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["algo-bigo"] },
    ],
  },
  {
    id: "databases", titleKey: "tracks.databases", icon: "🗃️", color: "#fbbf24", angle: 202.5,
    lessons: [
      { id: "db-intro", titleKey: "courses.db-introTitle", descriptionKey: "courses.db-introDesc", icon: "📁", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "db-sql-nosql", titleKey: "courses.db-sql-nosqlTitle", descriptionKey: "courses.db-sql-nosqlDesc", icon: "⚖️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["db-intro"] },
      { id: "db-acid", titleKey: "courses.db-acidTitle", descriptionKey: "courses.db-acidDesc", icon: "🛡️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["db-sql-nosql"] },
      { id: "db-indexes", titleKey: "courses.db-indexesTitle", descriptionKey: "courses.db-indexesDesc", icon: "📑", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["db-sql-nosql"] },
    ],
  },
  {
    id: "math", titleKey: "tracks.math", icon: "📐", color: "#f59e0b", angle: 225,
    lessons: [
      { id: "math-intro", titleKey: "courses.math-introTitle", descriptionKey: "courses.math-introDesc", icon: "🧮", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "math-vectors", titleKey: "courses.math-vectorsTitle", descriptionKey: "courses.math-vectorsDesc", icon: "➡️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["math-intro"] },
      { id: "math-matrices", titleKey: "courses.math-matricesTitle", descriptionKey: "courses.math-matricesDesc", icon: "🔢", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["math-vectors"] },
      { id: "math-prob", titleKey: "courses.math-probTitle", descriptionKey: "courses.math-probDesc", icon: "🎲", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["math-intro"] },
    ],
  },
  {
    id: "ai", titleKey: "tracks.ai", icon: "🤖", color: "#c084fc", angle: 247.5,
    lessons: [
      { id: "ai-intro", titleKey: "courses.ai-introTitle", descriptionKey: "courses.ai-introDesc", icon: "🧠", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "ai-ml", titleKey: "courses.ai-mlTitle", descriptionKey: "courses.ai-mlDesc", icon: "📈", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["ai-intro"] },
      { id: "ai-text", titleKey: "courses.ai-textTitle", descriptionKey: "courses.ai-textDesc", icon: "💬", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["ai-ml"] },
      { id: "ai-transformer", titleKey: "courses.ai-transformerTitle", descriptionKey: "courses.ai-transformerDesc", icon: "🔮", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["ai-text"] },
    ],
  },
  {
    id: "crypto", titleKey: "tracks.crypto", icon: "🔐", color: "#f43f5e", angle: 270,
    lessons: [
      { id: "crypto-intro", titleKey: "courses.crypto-introTitle", descriptionKey: "courses.crypto-introDesc", icon: "🔒", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "crypto-sha256", titleKey: "courses.crypto-sha256Title", descriptionKey: "courses.crypto-sha256Desc", icon: "🧮", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["crypto-intro"] },
      { id: "crypto-keys", titleKey: "courses.crypto-keysTitle", descriptionKey: "courses.crypto-keysDesc", icon: "🔑", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["crypto-intro"] },
      { id: "crypto-aes", titleKey: "courses.crypto-aesTitle", descriptionKey: "courses.crypto-aesDesc", icon: "🛡️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["crypto-sha256", "crypto-keys"] },
    ],
  },
  {
    id: "security", titleKey: "tracks.security", icon: "🕵️", color: "#ef4444", angle: 292.5,
    lessons: [
      { id: "sec-intro", titleKey: "courses.sec-introTitle", descriptionKey: "courses.sec-introDesc", icon: "🛡️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "sec-phishing", titleKey: "courses.sec-phishingTitle", descriptionKey: "courses.sec-phishingDesc", icon: "🎣", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["sec-intro"] },
      { id: "sec-malware", titleKey: "courses.sec-malwareTitle", descriptionKey: "courses.sec-malwareDesc", icon: "🦠", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["sec-intro"] },
      { id: "sec-firewall", titleKey: "courses.sec-firewallTitle", descriptionKey: "courses.sec-firewallDesc", icon: "🧱", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["sec-intro"] },
    ],
  },
  {
    id: "graphics", titleKey: "tracks.graphics", icon: "🎮", color: "#ec4899", angle: 315,
    lessons: [
      { id: "gfx-intro", titleKey: "courses.gfx-introTitle", descriptionKey: "courses.gfx-introDesc", icon: "🎨", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "gfx-gpu", titleKey: "courses.gfx-gpuTitle", descriptionKey: "courses.gfx-gpuDesc", icon: "⚔️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["gfx-intro"] },
      { id: "gfx-raster", titleKey: "courses.gfx-rasterTitle", descriptionKey: "courses.gfx-rasterDesc", icon: "🖼️", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["gfx-gpu"] },
      { id: "gfx-raytracing", titleKey: "courses.gfx-raytracingTitle", descriptionKey: "courses.gfx-raytracingDesc", icon: "✨", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["gfx-raster"] },
    ],
  },
  {
    id: "quantum", titleKey: "tracks.quantum", icon: "⚛️", color: "#6366f1", angle: 337.5,
    lessons: [
      { id: "q-intro", titleKey: "courses.q-introTitle", descriptionKey: "courses.q-introDesc", icon: "🔬", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["what-is-information"] },
      { id: "q-qubit", titleKey: "courses.q-qubitTitle", descriptionKey: "courses.q-qubitDesc", icon: "🌀", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["q-intro"] },
      { id: "q-superposition", titleKey: "courses.q-superpositionTitle", descriptionKey: "courses.q-superpositionDesc", icon: "🌓", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["q-qubit"] },
      { id: "q-entanglement", titleKey: "courses.q-entanglementTitle", descriptionKey: "courses.q-entanglementDesc", icon: "🔗", markdownPl: S, markdownEn: S, readTimeMin: 5, requires: ["q-superposition"] },
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
      
      // Increased base radius to 650 to prevent track overlap at depth 1
      const radiusBase = 650 + (d - 1) * 500; 
      
      ids.forEach((id, index) => {
        // pseudo-random deterministic numbers based on id
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        // Jitter radius by ±100px for chaos
        const rJitter = (hash % 200) - 100;
        const radius = radiusBase + rJitter;

        // Spread angle if multiple nodes at same depth
        const maxSpreadAngle = 10; 
        let angleOffset = 0;
        if (ids.length > 1) {
          const step = maxSpreadAngle / (ids.length - 1);
          angleOffset = -maxSpreadAngle/2 + step * index;
        }

        // Jitter angle by ±4 degrees for chaos
        const aJitter = ((hash * 7) % 8) - 4;
        const finalAngleRad = ((baseAngle + angleOffset + aJitter) * Math.PI) / 180;
        
        positions[id] = {
          x: Math.round(Math.cos(finalAngleRad) * radius),
          y: Math.round(Math.sin(finalAngleRad) * radius),
        };
      });
    }
  }

  // 3. Simple physics repulsion step to absolutely guarantee no overlapping
  const MIN_DIST = 180;
  const ids = Object.keys(positions);
  for (let iter = 0; iter < 50; iter++) {
    let moved = false;
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        if (ids[i] === 'what-is-information' || ids[j] === 'what-is-information') continue;
        
        const p1 = positions[ids[i]];
        const p2 = positions[ids[j]];
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist === 0) {
          dx = Math.random() - 0.5;
          dy = Math.random() - 0.5;
          dist = Math.sqrt(dx * dx + dy * dy);
        }
        
        if (dist < MIN_DIST) {
          const overlap = MIN_DIST - dist;
          const pushX = (dx / dist) * (overlap / 2);
          const pushY = (dy / dist) * (overlap / 2);
          
          p1.x += pushX;
          p1.y += pushY;
          p2.x -= pushX;
          p2.y -= pushY;
          moved = true;
        }
      }
    }
    if (!moved) break;
  }

  return positions;
})();
