import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GitBranch } from "lucide-react";
import { useOSStore } from "../store/useOSStore";
import { DesktopIcon } from "../components/os/DesktopIcon";
import { Taskbar } from "../components/os/Taskbar";
import { DevBackdoor } from "../components/ui/DevBackdoor";
import { IntroMascot } from "../components/os/IntroMascot";
import { SkillTreeWindow } from "../features/skill-tree/SkillTreeWindow";

export const FakeOSLayout: React.FC = () => {
  const { t } = useTranslation();
  const { openWindows } = useOSStore();
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  // Boot sequence: start pure black → fade in UI → then mascot drops
  const [bootPhase, setBootPhase] = useState<"black" | "fadein" | "ready">("black");
  useEffect(() => {
    // Hold black for 300ms, then start 700ms fade-out of black curtain
    const t1 = setTimeout(() => setBootPhase("fadein"), 300);
    // Ready phase drops mascot after curtain fades
    const t2 = setTimeout(() => setBootPhase("ready"), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Calculate center of screen for desktop icon
  const iconX = typeof window !== "undefined" ? Math.round(window.innerWidth / 2 - 40) : 400;
  const iconY = typeof window !== "undefined" ? Math.round(window.innerHeight / 2 - 60) : 300;

  return (
    <div className="w-screen h-screen bg-slate-950 flex flex-col justify-between overflow-hidden relative select-none">
      {/* Boot curtain — pure black overlay fading out */}
      {bootPhase !== "ready" && (
        <div
          className="fixed inset-0 z-[200] bg-black pointer-events-none transition-opacity duration-700 ease-out"
          style={{ opacity: bootPhase === "black" ? 1 : 0 }}
        />
      )}

      {/* Silent Dev Backdoor shortcut listener (Ctrl+Shift+Q) */}
      <DevBackdoor />

      {/* Intro Animation Sequence — starts after boot curtain fades */}
      {bootPhase === "ready" && <IntroMascot />}

      {/* Desktop Area with SkillTree icon centered on screen */}
      <div className="flex-1 relative p-8 z-10">
        <DesktopIcon
          id="skillTree"
          label={t("desktop.skillTree")}
          icon={<GitBranch size={22} className="text-[#ffd700]" />}
          initialPos={{ x: iconX, y: iconY }}
        />
      </div>

      {/* Render Open Windows */}
      {openWindows.includes("skillTree") && <SkillTreeWindow />}

      {/* Taskbar with Shutdown & Integrated Countdown Timer */}
      <Taskbar secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} />
    </div>
  );
};
