import React from "react";
import { BinaryCounter } from "../interactive/BinaryCounter";
import { LogicGates } from "../interactive/LogicGates";

export interface LessonPage {
  type: "content" | "insight";
  content: string;
}

interface MarkdownRendererProps {
  content: string;
}

// Registry of interactive components that can be embedded via <!-- INTERACTIVE: name -->
const INTERACTIVE_COMPONENTS: Record<string, React.FC> = {
  "binary-counter": BinaryCounter,
  "logic-gates": LogicGates,
};

/**
 * Lightweight Markdown-to-JSX renderer.
 * Supports: headings, bold, italic, code blocks, inline code, blockquotes,
 * unordered/ordered lists, horizontal rules, tables, interactive embeds, and paragraphs.
 * No external dependencies.
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Interactive component embed: <!-- INTERACTIVE: name -->
    const interactiveMatch = line.trim().match(/^<!--\s*INTERACTIVE:\s*(.+?)\s*-->$/);
    if (interactiveMatch) {
      const componentName = interactiveMatch[1].trim();
      const Component = INTERACTIVE_COMPONENTS[componentName];
      if (Component) {
        elements.push(<Component key={elements.length} />);
      }
      i++;
      continue;
    }

    // Code block (```)
    if (line.trim().startsWith("```")) {
      const lang = line.trim().replace("```", "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={elements.length} className="my-6 rounded-2xl overflow-hidden border border-white/10">
          {lang && (
            <div className="px-5 py-2 bg-slate-800 text-xs font-mono-retro text-slate-400 uppercase tracking-wider border-b border-white/10">
              {lang}
            </div>
          )}
          <pre className="px-6 py-6 bg-slate-950 overflow-x-auto text-lg leading-relaxed">
            <code className="text-emerald-300 font-mono-retro text-lg">{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      continue;
    }

    // Table (lines starting with |)
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines
        .filter((tl) => !tl.trim().match(/^\|[\s\-:|]+\|$/))
        .map((tl) =>
          tl
            .split("|")
            .filter((c) => c.trim() !== "")
            .map((c) => c.trim())
        );

      if (rows.length > 0) {
        const header = rows[0];
        const body = rows.slice(1);
        elements.push(
          <div key={elements.length} className="my-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-lg">
              <thead>
                <tr className="bg-slate-800">
                  {header.map((cell, ci) => (
                    <th key={ci} className="px-5 py-3 text-left font-pixel-text text-sm text-white font-bold border-b border-white/10">
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, ri) => (
                  <tr key={ri} className="border-b border-white/5 hover:bg-slate-900/50">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-5 py-4 text-slate-300 text-base">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={elements.length} className="text-4xl font-pixel-text font-bold text-white mt-12 mb-6 leading-tight">
          {renderInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={elements.length} className="text-3xl font-pixel-text font-bold text-emerald-400 mt-10 mb-5 leading-snug">
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={elements.length} className="text-2xl font-pixel-text font-bold text-white mt-8 mb-4">
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      elements.push(
        <hr key={elements.length} className="my-8 border-white/10" />
      );
      i++;
      continue;
    }

    // Regular blockquote
    if (line.trim().startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      elements.push(
        <blockquote
          key={elements.length}
          className="my-6 pl-6 border-l-4 border-slate-500 bg-slate-800/30 py-5 pr-6 rounded-r-2xl text-xl text-slate-300/90 leading-[1.8] italic"
        >
          {quoteLines.map((ql, qi) => (
            <span key={qi}>
              {renderInline(ql)}
              {qi < quoteLines.length - 1 && <br />}
            </span>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered list (- item)
    if (line.trim().startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={elements.length} className="my-4 space-y-2.5 pl-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4 text-xl text-slate-300 leading-[1.8]">
              <span className="text-emerald-400 mt-1.5 shrink-0 text-xl">▸</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list (1. item)
    if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={elements.length} className="my-4 space-y-2.5 pl-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4 text-xl text-slate-300 leading-[1.8]">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[13px] font-bold text-emerald-400 shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={elements.length} className="text-xl text-slate-300 leading-[1.9] my-5">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-1 pb-10">{elements}</div>;
};

/**
 * Render inline markdown: **bold**, *italic*, `code`, and plain text.
 */
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      parts.push(
        <strong key={parts.length} className="text-white font-bold">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(
        <em key={parts.length} className="text-slate-200 italic">
          {match[3]}
        </em>
      );
    } else if (match[4]) {
      parts.push(
        <code key={parts.length} className="px-2 py-1 bg-slate-800 border border-white/10 rounded-md text-emerald-300 text-lg font-mono-retro">
          {match[4]}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

/**
 * Split markdown content by ---PAGE--- separator into pages.
 * It also extracts `> [!KEY]` blocks into their own separate "insight" pages
 * immediately following the content page.
 */
export function splitIntoPages(content: string): LessonPage[] {
  const rawPages = content.split(/^---PAGE---$/m).map((p) => p.trim()).filter(Boolean);
  const result: LessonPage[] = [];

  for (const pageText of rawPages) {
    const lines = pageText.split("\n");
    const contentLines: string[] = [];
    const insightLines: string[] = [];
    let inInsight = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().startsWith("> [!KEY]")) {
        inInsight = true;
        const firstLine = line.trim().replace(/^>\s*\[!KEY\]\s*/, "").trim();
        if (firstLine) insightLines.push(firstLine);
      } else if (inInsight && line.trim().startsWith(">")) {
        insightLines.push(line.trim().replace(/^>\s?/, ""));
      } else if (inInsight && (!line.trim().startsWith(">") || line.trim() === "")) {
        // end of insight
        inInsight = false;
        if (line.trim() !== "") {
          contentLines.push(line);
        }
      } else {
        contentLines.push(line);
      }
    }

    if (contentLines.join("").trim() !== "") {
      result.push({ type: "content", content: contentLines.join("\n").trim() });
    }
    if (insightLines.length > 0) {
      result.push({ type: "insight", content: insightLines.join("\n").trim() });
    }
  }

  return result;
}
