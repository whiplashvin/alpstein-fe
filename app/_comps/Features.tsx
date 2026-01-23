import { cn } from "../lib/utils";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
// import { useEffect, useState } from "react";

// const TABLET_BREAKPOINT = 768;
// const LAPTOP_BREAKPOINT = 1024;

function Features() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const translateScale = useTransform(scrollYProgress, [0.6, 1], [1, 0.75]);
  //   const [width, setWidth] = useState(0);

  //   function handleResize() {
  //     setWidth(window.innerWidth);
  //   }
  //   useEffect(() => {
  //     setWidth(window.innerWidth);
  //     window.addEventListener("resize", handleResize);
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);

  //   const SVG1 =
  //     width >= LAPTOP_BREAKPOINT
  //       ? { height: "50", width: "50" }
  //       : width >= TABLET_BREAKPOINT && width < LAPTOP_BREAKPOINT
  //         ? { height: "40", width: "40" }
  //         : { height: "30", width: "30" };
  //   const SVG2 =
  //     width >= LAPTOP_BREAKPOINT
  //       ? { height: "60", width: "60" }
  //       : width >= TABLET_BREAKPOINT && width < LAPTOP_BREAKPOINT
  //         ? { height: "50", width: "50" }
  //         : { height: "40", width: "40" };
  //   const SVG3 =
  //     width >= LAPTOP_BREAKPOINT
  //       ? { height: "60", width: "60" }
  //       : width >= TABLET_BREAKPOINT && width < LAPTOP_BREAKPOINT
  //         ? { height: "50", width: "50" }
  //         : { height: "40", width: "40" };
  return (
    <div className="mt-40 flex flex-col items-center gap-10 bg-[var(--background)]">
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.7, ease: "easeInOut" }}
        className={cn(
          //   "h-fit rounded-full bg-[var(--bg-section)] px-3 py-0.5 text-xs font-extralight text-neutral-50 md:text-sm"
          "text-xs font-light text-[var(--secondarytext)]/70 md:text-xs"
        )}
      >
        WHY ALPSTEIN
      </motion.span>
      <motion.p className="mx-auto w-[80%] text-center text-base font-light text-[var(--secondarytext)]/70 md:w-full md:text-xl">
        Ever felt the need for someone who reads crypto articles for you,
        <br className="hidden md:block" /> also giving you a clear actionable path?
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
        className="l:w-[80%] l:grid-cols-3 l:grid-rows-1 l:divide-x-1 l:divide-y-0 mx-auto grid w-[80%] grid-rows-3 divide-y-1 divide-[var(--secondarytext)]/20 p-1 md:w-[90%]"
      >
        <motion.div
          className="flex w-full flex-col gap-5 p-5"
          viewport={{ once: true, amount: 0.3 }} // triggers only when 30% is visible
        >
          <div className="flex flex-col items-start gap-5">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              //   width={`${SVG1.width}`}
              //   height={`${SVG1.height}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--secondarytext)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d="M15 18h-5"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
                d="M18 14h-8"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.9, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"
              />
              <motion.rect
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
                width="8"
                height="4"
                x="10"
                y="6"
                rx="1"
              />
            </motion.svg>
            <h2 className="text-base leading-5 text-[var(--secondarytext)]/80 md:leading-7 lg:text-lg">
              LATEST CRYPTO ARTICLES
            </h2>
          </div>
          <p className="text-xs font-light tracking-wide text-[var(--secondarytext)]/80 md:mt-0 md:text-sm">
            Get the latest crypto articles from the leading crypto news sources. Do not miss out on
            new articles.
          </p>
        </motion.div>

        <motion.div
          className="flex w-full flex-col gap-5 p-5"
          viewport={{ once: true, amount: 0.3 }} // triggers only when 30% is visible
        >
          <div className="flex flex-col items-start gap-5">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              //   width={`${SVG2.width}`}
              //   height={`${SVG2.height}`}
              //   width="24"
              //   height="24"
              //   viewBox="0 0 24 24"
              //   fill="none"
              //   stroke="var(--secondarytext)"
              //   strokeWidth="0.8"
              //   strokeLinecap="round"
              //   strokeLinejoin="round"

              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--secondarytext)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d="M12 8V4H8"
              />
              <motion.rect
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
                width="18"
                height="15"
                x="3"
                y="7"
                rx="2"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M1 14h2"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M21 14h2"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M15 13v2"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M9 13v2"
              />
            </motion.svg>

            {/* <h2 className="text-lg leading-5 font-light text-[var(--secondarytext)]/90 md:leading-7 lg:text-3xl">
              GPT-4o analysis
            </h2> */}
            <h2 className="text-base leading-5 text-[var(--secondarytext)]/80 md:leading-7 lg:text-lg">
              GPT-4o ANALYSIS
            </h2>
          </div>
          {/* <p className="mt-7 text-xs font-light tracking-wide text-[var(--secondarytext)]/60 md:mt-10 md:text-sm"> */}
          <p className="text-xs font-light tracking-wide text-[var(--secondarytext)]/80 md:mt-0 md:text-sm">
            Crypto news articles are thoroughly analysed by GPT-4o within a strict format and even
            stricter gaurdrails.
          </p>
        </motion.div>

        <motion.div
          className="flex w-full flex-col gap-5 p-5"
          viewport={{ once: true, amount: 0.3 }} // triggers only when 30% is visible
        >
          <div className="flex flex-col items-start gap-5">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              //   width={`${SVG3.width}`}
              //   height={`${SVG3.height}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--secondarytext)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M16.247 7.761a6 6 0 0 1 0 8.478"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M19.075 4.933a10 10 0 0 1 0 14.134"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M4.925 19.067a10 10 0 0 1 0-14.134"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M7.753 16.239a6 6 0 0 1 0-8.478"
              />
              <motion.circle
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                cx="12"
                cy="12"
                r="2"
              />
            </motion.svg>
            {/* <h2 className="text-lg leading-5 font-light text-[var(--secondarytext)]/90 md:leading-7 lg:text-3xl">
              Price tracking with P&L
            </h2> */}
            <h2 className="text-base leading-5 text-[var(--secondarytext)]/80 md:leading-7 lg:text-lg">
              PRICE TRACKING WITH P&L
            </h2>
          </div>
          {/* <p className="mt-7 text-xs font-light tracking-wide text-[var(--secondarytext)]/60 md:mt-10 md:text-sm"> */}
          {/* <p className="text-xs font-light tracking-wide text-[var(--secondarytext)]/60 md:mt-0 md:text-sm"> */}
          <p className="text-xs font-light tracking-wide text-[var(--secondarytext)]/80 md:mt-0 md:text-sm">
            Price of every crypto under Alpstein&apos;s radar is tracked and a real-time profit and
            loss is calculated and displayed.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Features;
