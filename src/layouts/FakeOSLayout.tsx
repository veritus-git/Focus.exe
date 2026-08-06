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

  // Boot sequence: start pure black → fade to reveal dimmed desktop → mascot drops
  const [bootPhase, setBootPhase] = useState<"black" | "fadein" | "ready">("black");

  useEffect(() => {
    // Hold black for 300ms, then start 700ms fade-out of black curtain
    const t1 = setTimeout(() => setBootPhase("fadein"), 300);
    // Ready phase drops mascot after curtain fades
    const t2 = setTimeout(() => setBootPhase("ready"), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="w-screen h-screen bg-pastel-dimmed flex flex-col justify-between overflow-hidden relative select-none">
      {/* Black boot curtain overlay — pure #000000 fading out */}
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

      {/* Desktop Area with SkillTree icon only */}
      <div className="flex-1 relative p-8 z-10">
        <DesktopIcon
          id="skillTree"
          label={t("desktop.skillTree")}
          icon={<GitBranch size={22} className="text-[#ffd700]" />}
          initialPos={{ x: 30, y: 30 }}
        />
      </div>

      {/* Render Open Windows */}
      {openWindows.includes("skillTree") && <SkillTreeWindow />}

      {/* Taskbar with Shutdown & Integrated Countdown Timer */}
      <Taskbar secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} />
    </div>
  );
};
