// Centralized lesson & course definitions
// Each course maps to a category in the skill tree
// Bilingual: each lesson has both Polish and English markdown

// Polish lessons
import cpuLessonPl from "./lessons/pl/cpu-from-inside.md?raw";
import transformerLessonPl from "./lessons/pl/how-transformer-works.md?raw";
import urlLessonPl from "./lessons/pl/what-happens-after-typing-url.md?raw";

// English lessons
import cpuLessonEn from "./lessons/en/cpu-from-inside.md?raw";
import transformerLessonEn from "./lessons/en/how-transformer-works.md?raw";
import urlLessonEn from "./lessons/en/what-happens-after-typing-url.md?raw";

export interface Lesson {
  id: string;
  titleKey: string;       // i18n key
  descriptionKey: string; // i18n key
  icon: string;           // emoji
  markdownPl: string;     // raw md content (Polish)
  markdownEn: string;     // raw md content (English)
  readTimeMin: number;
}

export interface Course {
  id: string;
  titleKey: string;
  icon: string;
  color: string;          // accent color
  lessons: Lesson[];
}

export const COURSES: Course[] = [
  {
    id: "how-computer-works",
    titleKey: "courses.howComputerWorks",
    icon: "🧠",
    color: "#00ffcc",
    lessons: [
      {
        id: "cpu-from-inside",
        titleKey: "courses.cpuTitle",
        descriptionKey: "courses.cpuDesc",
        icon: "⚡",
        markdownPl: cpuLessonPl,
        markdownEn: cpuLessonEn,
        readTimeMin: 8,
      },
    ],
  },
  {
    id: "ai",
    titleKey: "courses.ai",
    icon: "🤖",
    color: "#a78bfa",
    lessons: [
      {
        id: "how-transformer-works",
        titleKey: "courses.transformerTitle",
        descriptionKey: "courses.transformerDesc",
        icon: "🔮",
        markdownPl: transformerLessonPl,
        markdownEn: transformerLessonEn,
        readTimeMin: 10,
      },
    ],
  },
  {
    id: "internet",
    titleKey: "courses.internet",
    icon: "🌐",
    color: "#38bdf8",
    lessons: [
      {
        id: "what-happens-after-typing-url",
        titleKey: "courses.urlTitle",
        descriptionKey: "courses.urlDesc",
        icon: "🔗",
        markdownPl: urlLessonPl,
        markdownEn: urlLessonEn,
        readTimeMin: 9,
      },
    ],
  },
];

// Flat lookup for quick access
export const ALL_LESSONS: Lesson[] = COURSES.flatMap((c) => c.lessons);

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getLessonMarkdown(lesson: Lesson, lang: string): string {
  return lang === "pl" ? lesson.markdownPl : lesson.markdownEn;
}
