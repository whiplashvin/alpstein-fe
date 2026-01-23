import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "../lib/utils";
function Feat() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const translateScale = useTransform(scrollYProgress, [0.6, 1], [1, 0.75]);
  return (
    <div className="mt-52 flex h-screen flex-col items-center gap-10 bg-[var(--background)]">
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.7, ease: "easeInOut" }}
        className="text-xs font-light text-[var(--secondarytext)]/70 md:text-xs"
      >
        WHAT ALPSTEIN HAS TO OFFER
      </motion.span>
      <motion.p className="mx-auto w-[80%] text-center text-lg font-light text-[var(--secondarytext)]/70 md:w-full md:text-xl">
        Among many other things, here are some features Alpstein comes with.
      </motion.p>

      <motion.div
        ref={ref}
        transition={{
          duration: 0.5,
          ease: "easeIn",
          delay: 1,
        }}
        style={{
          scale: translateScale,
        }}
        className="grid w-[80%] grid-cols-1 gap-10 md:grid-cols-2 lg:w-[90%] lg:grid-cols-4 lg:gap-5"
      >
        <Comp
          url={"/feature-1.png"}
          width={240}
          height={200}
          heading={"Relax! its just an opinion."}
          subHeading={
            "Get AI opinionated signals on what actions to take. A signal can be bullish, bearishor unclear."
          }
        />
        <Comp
          url={"/feature-2.png"}
          width={270}
          height={300}
          heading={"Keep yourself updated."}
          subHeading={
            "Get real-time P&L updates on generated signals. Also get current status of the signal."
          }
        />
        <Comp
          url={"/feature-3.png"}
          width={220}
          height={200}
          heading={"Get a feel of the market."}
          subHeading={
            "Yes, markets have sentiments too. Alpstein tracks bullish, bearish, volatility and whale movement."
          }
        />
        <Comp
          url={"/feat-4.png"}
          width={500}
          height={300}
          heading={"Think GUI is for dummies?"}
          subHeading={
            "Like doing everything from the terminal? We&apos;ve got you covered, introducing Alsptein TUI."
          }
        />
      </motion.div>
    </div>
  );
}

export default Feat;

function Comp({
  url,
  width,
  height,
  heading,
  subHeading,
}: {
  url: string;
  width: number;
  height: number;
  heading: string;
  subHeading: string;
}) {
  return (
    <div
      className={cn(
        "flex h-96 w-full flex-col rounded-2xl p-2",
        "border border-[var(--stats-comp-bg)]/90 bg-[var(--stats-comp-bg)]/30 backdrop-blur-xl",
        "bg-radial-[at_20%_20%] from-transparent from-60% via-indigo-300/20 via-80% to-indigo-400/20 to-100%"
      )}
    >
      <div className="relative h-2/3 overflow-hidden rounded-xl border border-[var(--stats-comp-inner-border)]/50 bg-[var(--stats-comp-inner)]/30 shadow-lg shadow-gray-500/50">
        <div className="absolute inset-0 z-20 h-full w-full rounded-xl dark:bg-neutral-800/20"></div>
        <motion.div className="perspective-distant">
          <Image
            src={url}
            width={width}
            height={height}
            alt="fads"
            className="absolute rounded-xl mask-b-from-20% shadow-xl"
            style={{ transform: "rotateY(40deg) rotateX(45deg) rotateZ(0deg)" }}
          />
        </motion.div>
        <motion.div className="translate-x-10 translate-y-5 perspective-distant">
          <Image
            src={url}
            width={width}
            height={height}
            alt="fads"
            className="absolute rounded-xl shadow-xl"
            style={{ transform: "rotateY(42deg) rotateX(45deg) rotateZ(0deg)" }}
          />
        </motion.div>
      </div>
      <div className="flex h-1/3 flex-col items-start justify-center">
        <h2 className="text-lg leading-5 font-medium text-[var(--secondarytext)] md:leading-7 lg:text-lg">
          {heading}
        </h2>
        <p className="mt-2 text-sm font-extralight text-[var(--secondarytext)]/80">{subHeading}</p>
      </div>
    </div>
  );
}
