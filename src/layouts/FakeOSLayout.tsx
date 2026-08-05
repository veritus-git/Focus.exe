import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GitBranch } from "lucide-react";
import { useOSStore } from "../store/useOSStore";
import { DesktopIcon } from "../components/os/DesktopIcon";
import { Taskbar } from "../components/os/Taskbar";
import { DevBackdoor } from "../components/ui/DevBackdoor";
import { IntroMascot } from "../components/os/IntroMascot";
import { DynamicIsland } from "../components/os/DynamicIsland";
import { SkillTreeWindow } from "../features/skill-tree/SkillTreeWindow";

export const FakeOSLayout: React.FC = () => {
  const { t } = useTranslation();
  const { openWindows, minimizedWindows } = useOSStore();
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  return (
    <div className="w-screen h-screen bg-pastel-dimmed flex flex-col justify-between overflow-hidden relative select-none">
      {/* Silent Dev Backdoor shortcut listener (Ctrl+Shift+Q) */}
      <DevBackdoor />

      {/* iPhone X Style Dynamic Island Pill Widget Top Center */}
      <DynamicIsland onTimeChange={(sec) => setSecondsLeft(sec)} />

      {/* Intro Animation Sequence with Falling Animated Pixel Bot */}
      <IntroMascot />

      {/* Main Desktop Area with Single Draggable Icon: SkillTree.exe */}
      <div className="flex-1 relative p-8 z-10">
        <DesktopIcon
          id="skillTree"
          label={t("desktop.skillTree")}
          icon={<GitBranch size={22} className="text-[#ffd700]" />}
        />
      </div>

      {/* Render Open Windows (SkillTree.exe Fullscreen) */}
      {openWindows.includes("skillTree") && !minimizedWindows.includes("skillTree") && (
        <SkillTreeWindow />
      )}

      {/* Taskbar with Power Off & Icons Only open window list */}
      <Taskbar secondsLeft={secondsLeft} />
    </div>
  );
};
