import React from "react";
import { useTranslation } from "react-i18next";
import { GitBranch } from "lucide-react";
import { useOSStore } from "../store/useOSStore";
import { DesktopIcon } from "../components/os/DesktopIcon";
import { Taskbar } from "../components/os/Taskbar";
import { DevBackdoor } from "../components/ui/DevBackdoor";
import { IntroMascot } from "../components/os/IntroMascot";
import { TopTimer } from "../components/os/TopTimer";
import { SkillTreeWindow } from "../features/skill-tree/SkillTreeWindow";

export const FakeOSLayout: React.FC = () => {
  const { t } = useTranslation();
  const { openWindows, minimizedWindows } = useOSStore();

  return (
    <div className="w-screen h-screen bg-pastel-wallpaper flex flex-col justify-between overflow-hidden relative select-none">
      {/* Silent Dev Backdoor shortcut listener (Ctrl+Shift+Q) */}
      <DevBackdoor />

      {/* 15-Minute Countdown Translucent iOS-style Timer in Top-Right Corner */}
      <TopTimer />

      {/* Intro Animation Sequence with Falling Bot */}
      <IntroMascot />

      {/* Main Desktop Area with Single Icon: SkillTree.exe */}
      <div className="flex-1 relative p-8 flex flex-col items-start gap-4 z-10">
        <DesktopIcon
          id="skillTree"
          label={t("desktop.skillTree")}
          icon={<GitBranch size={22} className="text-[#ffd700]" />}
        />
      </div>

      {/* Render Open Windows (SkillTree.exe) */}
      {openWindows.includes("skillTree") && !minimizedWindows.includes("skillTree") && (
        <SkillTreeWindow />
      )}

      {/* Minimalist Taskbar at bottom */}
      <Taskbar />
    </div>
  );
};
