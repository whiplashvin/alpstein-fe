"use client";
import { motion, useMotionTemplate, useMotionValue, animate } from "motion/react";
import { useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { cn } from "../lib/utils";
import { GiMountaintop } from "react-icons/gi";
// import { GiMountaintop } from "react-icons/gi";

function PremiumCard() {
  // const [background, setBackground] = useState("#e7e5e4");
  // const [background, setBackground] = useState("#09090b");
  const COLORS = useMemo(() => ["#1E67C6", "#CE84CF", "#715bff"], []);
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(170% 170% at 50% 0%, transparent 45%,${color})`;
  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color, COLORS]);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        // setBackground("#01030c");
        // setBackground("#09090b");
      } else {
        // setBackground("#f4f4f5");
        // setBackground("#e7e5e4");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    if (document.documentElement.classList.contains("dark")) {
      // setBackground("#01030c");
      // setBackground("#09090b");
    }

    return () => observer.disconnect();
  }, []);
  return (
    <motion.div
      style={{
        backgroundImage,
      }}
      className={cn(
        "relative grid h-full min-h-0 w-full grid-rows-[3fr_1fr] rounded-2xl rounded-xl p-2 lg:h-84",
        "shadow-[var(--shadow)] transition-shadow duration-500",
        "l:gap-2 flex flex-col gap-6 bg-[var(--stats-comp-inner)]/60 md:gap-3",
        "justify-between"
      )}
    >
      <div className="l:p-0 flex cursor-pointer items-center gap-2 p-6 text-sm text-[var(--logostroke)] opacity-90 transition-colors duration-700 md:text-sm lg:p-4 lg:text-sm">
        <span className="l:hidden lg:block">
          <GiMountaintop size={30} />
        </span>
        <span>Alpstein</span>
      </div>
      <div className="l:p-0 flex w-full flex-col gap-3 p-4 lg:p-4">
        <h2 className="text-sm font-extralight text-[var(--primarytext)] md:text-sm">
          Become a Premium Member
        </h2>
        <div>
          <p className="text-[10px] text-zinc-500 md:text-xs">Never miss an opportunity.</p>
          <p className="text-[10px] text-zinc-500 md:text-xs">
            Get instantly notified whenever a news is updated.
          </p>
        </div>
      </div>
      <div className="z-10 flex w-full flex-col gap-2 px-0">
        <input
          type="text"
          className={cn(
            "w-full rounded-md p-2 text-xs text-[var(--secondarytext)]",
            "shadow-[var(--shadow)] transition-shadow duration-500",
            "focus:outline-none"
          )}
          placeholder="Enter your email address"
        />
        <button
          disabled={true}
          className={cn(
            "w-full cursor-not-allowed rounded-md bg-transparent px-4 py-2 text-xs text-[var(--secondarytext)]",
            "shadow-[var(--shadow)] transition-shadow duration-500"
          )}
          onClick={() => alert("fasd")}
        >
          Coming soon...
        </button>
      </div>
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={200} count={200} factor={10} fade speed={1} />
        </Canvas>
      </div>
    </motion.div>
  );
}

export default PremiumCard;
