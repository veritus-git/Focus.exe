// Centralized lesson & course definitions
// Each course maps to a category from the skill tree
// Each lesson is a markdown file imported at build time

import cpuLesson from "./lessons/cpu-from-inside.md?raw";
import transformerLesson from "./lessons/how-transformer-works.md?raw";
import urlLesson from "./lessons/what-happens-after-typing-url.md?raw";

export interface Lesson {
  id: string;
  titleKey: string;       // i18n key
  descriptionKey: string; // i18n key
  icon: string;           // emoji
  markdown: string;       // raw md content
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
        markdown: cpuLesson,
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
        markdown: transformerLesson,
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
        markdown: urlLesson,
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

export function getCourseForLesson(lessonId: string): Course | undefined {
  return COURSES.find((c) => c.lessons.some((l) => l.id === lessonId));
}
