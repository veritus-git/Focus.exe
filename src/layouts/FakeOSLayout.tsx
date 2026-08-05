import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GitBranch, Calculator, FileText } from "lucide-react";
import { useOSStore } from "../store/useOSStore";
import { DesktopIcon } from "../components/os/DesktopIcon";
import { Taskbar } from "../components/os/Taskbar";
import { DevBackdoor } from "../components/ui/DevBackdoor";
import { IntroMascot } from "../components/os/IntroMascot";
import { SkillTreeWindow } from "../features/skill-tree/SkillTreeWindow";
import { CalculatorWindow } from "../components/os/CalculatorWindow";
import { NotesWindow } from "../components/os/NotesWindow";

export const FakeOSLayout: React.FC = () => {
  const { t } = useTranslation();
  const { openWindows } = useOSStore();
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  return (
    <div className="w-screen h-screen bg-pastel-dimmed flex flex-col justify-between overflow-hidden relative select-none">
      {/* Silent Dev Backdoor shortcut listener (Ctrl+Shift+Q) */}
      <DevBackdoor />

      {/* Intro Animation Sequence with Falling Animated Pixel Bot */}
      <IntroMascot />

      {/* Desktop Area with 3 Vertically Arranged Icons */}
      <div className="flex-1 relative p-8 z-10">
        <DesktopIcon
          id="skillTree"
          label={t("desktop.skillTree")}
          icon={<GitBranch size={22} className="text-[#ffd700]" />}
          initialPos={{ x: 30, y: 30 }}
        />

        <DesktopIcon
          id="calculator"
          label={t("desktop.calculator")}
          icon={<Calculator size={22} className="text-emerald-400" />}
          initialPos={{ x: 30, y: 140 }}
        />

        <DesktopIcon
          id="notes"
          label={t("desktop.notes")}
          icon={<FileText size={22} className="text-amber-400" />}
          initialPos={{ x: 30, y: 250 }}
        />
      </div>

      {/* Render Open Windows */}
      {openWindows.includes("skillTree") && <SkillTreeWindow />}
      {openWindows.includes("calculator") && <CalculatorWindow />}
      {openWindows.includes("notes") && <NotesWindow />}

      {/* Taskbar with Shutdown & Integrated Countdown Timer */}
      <Taskbar secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} />
    </div>
  );
};
