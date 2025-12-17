"use client";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

// const MOBLE_BREAKPOINT = 430;
const TABLET_BREAKPOINT = 768;
const LAPTOP_BREAKPOINT = 1024;

type Binance = {
  logo: string;
  svgH: string;
  svgW: string;
};
type Block = {
  logo: string;
  svgH: string;
  svgW: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};
function HowItWorks() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update(); // immediate first run
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cpuChip = width! >= LAPTOP_BREAKPOINT ? "24" : width! >= TABLET_BREAKPOINT ? "20" : "14";
  const binance: Binance =
    width! >= LAPTOP_BREAKPOINT
      ? { logo: "24", svgH: "130", svgW: "10" }
      : width! >= TABLET_BREAKPOINT && width < LAPTOP_BREAKPOINT
        ? { logo: "20", svgH: "100", svgW: "10" }
        : { logo: "14", svgH: "80", svgW: "10" };

  const block: Block =
    width! >= LAPTOP_BREAKPOINT
      ? { logo: "24", svgH: "80", svgW: "450" }
      : width >= TABLET_BREAKPOINT && width < LAPTOP_BREAKPOINT
        ? { logo: "14", svgH: "40", svgW: "250" }
        : { logo: "14", svgH: "30", svgW: "150" };

  const tele: Block =
    width! >= LAPTOP_BREAKPOINT
      ? { logo: "24", svgH: "10", svgW: "450" }
      : width >= TABLET_BREAKPOINT && width < LAPTOP_BREAKPOINT
        ? { logo: "14", svgH: "10", svgW: "280" }
        : { logo: "14", svgH: "10", svgW: "150" };

  const news: Block =
    width! >= LAPTOP_BREAKPOINT
      ? { logo: "24", svgH: "80", svgW: "450" }
      : width >= TABLET_BREAKPOINT && width < LAPTOP_BREAKPOINT
        ? { logo: "14", svgH: "40", svgW: "250" }
        : { logo: "14", svgH: "30", svgW: "150" };
  return (
    <div className="mt-36 flex h-screen flex-col items-center gap-10 bg-[var(--background)]">
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.7, ease: "easeInOut" }}
        className={cn(
          // "h-fit rounded-full bg-[var(--bg-section)] px-3 py-0.5 text-xs font-extralight text-neutral-50 md:text-sm"
          "text-xs font-medium text-[var(--secondarytext)]/70 md:text-xs"
        )}
      >
        HOW ALPSTEIN WORKS
      </motion.span>
      <motion.p className="mx-auto w-[80%] text-center text-lg font-light text-[var(--secondarytext)]/70 md:w-full md:text-xl">
        At its core, Alpstein is a multi-process system,
        <br className="hidden md:block" /> all working in synergy to curate a single actionable
        output.
      </motion.p>
      <div
        className={cn(
          "md2:w-[75%] l:w-[80%] relative mx-auto flex h-80 w-[80%] flex-col gap-0 rounded-[20px] p-0 md:h-96 md:w-[80%]",
          "flex flex-col justify-center gap-5 lg:gap-18"
        )}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--grid-dots) 1px, transparent 0)`,
          backgroundSize: "10px 10px",
          backgroundRepeat: "repeat",
        }}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            "[mask-image:radial-gradient(ellipse_80%_80%_at_center,transparent_0%,black_80%)]",
            "bg-[var(--background)]"
          )}
        />

        <BlockSVG block={block} />
        <TelegraphSVG tele={tele} />
        <NewsSVG news={news} />
        <LLMComp cpuChip={cpuChip} />
        <Binance binance={binance} />
        <RAG rag={binance} />
      </div>
    </div>
  );
}

export default HowItWorks;

function BlockSVG({ block }: { block: Block }) {
  return (
    <div className="relative h-7 gap-2">
      <span className="absolute top-1/2 left-0 -translate-y-1/2 text-[10px] text-[var(--primarytext)]/50 lg:text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={`${block.logo}`}
          height={`${block.logo}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primarytext)"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      </span>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1753.3247696504095 300.20295004399395"
        width={`${block.svgW}`}
        height={`${block.svgH}`}
        stroke="url(#line-gradient)"
        className={`absolute top-1/2 left-4 md:left-12 lg:left-14`}
      >
        <defs>
          <motion.linearGradient
            gradientUnits="userSpaceOnUse"
            id="line-gradient"
            initial={{
              x1: "0%",
              x2: "10%",
            }}
            animate={{
              x1: "100%",
              x2: "110%",
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              repeatDelay: 0.9,
            }}
          >
            <stop stopColor="var(--svg-path)" />
            <stop offset="0.33" stopColor="var(--secondarytext)" />
            <stop offset="0.66" stopColor="var(--secondarytext)" />
            <stop offset="1" stopColor="var(--svg-path)" />
          </motion.linearGradient>
        </defs>
        <g stroke-linecap="round">
          <g transform="translate(10 14.143902692013853) rotate(0 866.6623848252048 135.95757232998312)">
            <path
              d="M0 0 C463.05 -1.11, 926.09 -2.21, 1733.32 -4.14 M0 0 C605.73 -1.45, 1211.46 -2.9, 1733.32 -4.14 M1733.32 -4.14 C1733.05 58.22, 1732.78 120.59, 1732.09 276.06 M1733.32 -4.14 C1733.01 66.74, 1732.7 137.62, 1732.09 276.06"
              stroke-width="5"
              fill="none"
            ></path>
          </g>
        </g>
        <mask></mask>
      </svg>
    </div>
  );
}

function TelegraphSVG({ tele }: { tele: Block }) {
  return (
    <div className="relative">
      <span className="text-[10px] text-[var(--primarytext)]/50 lg:text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={`${tele.logo}`}
          height={`${tele.logo}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primarytext)"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M10 18v-7" />
          <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" />
          <path d="M14 18v-7" />
          <path d="M18 18v-7" />
          <path d="M3 22h18" />
          <path d="M6 18v-7" />
        </svg>
      </span>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1741.9665531330365 21.06138083287715"
        width={`${tele.svgW}`}
        height={`${tele.svgH}`}
        stroke="url(#line-three-gradient)"
        className={`absolute top-1/2 left-4 -translate-y-1/2 md:left-7 lg:left-10`}
      >
        <defs>
          <motion.linearGradient
            gradientUnits="userSpaceOnUse"
            id="line-three-gradient"
            initial={{
              x1: "0%",
              x2: "10%",
            }}
            animate={{
              x1: "100%",
              x2: "105%",
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              repeatDelay: 1.4,
            }}
          >
            <stop stopColor="var(--svg-path)" />
            <stop offset="0.33" stopColor="var(--secondarytext)" />
            <stop offset="0.66" stopColor="var(--secondarytext)" />
            <stop offset="1" stopColor="var(--svg-path)" />
          </motion.linearGradient>
        </defs>
        <g stroke-linecap="round">
          <g transform="translate(10 10) rotate(0 860.9832765665183 0.5306904164385742)">
            <path
              d="M0 0 C680.17 0.42, 1360.33 0.84, 1721.97 1.06 M0 0 C514.05 0.32, 1028.09 0.63, 1721.97 1.06"
              stroke-width="5"
              fill="none"
            ></path>
          </g>
        </g>
        <mask></mask>
      </svg>
      <span className="absolute top-1/2 right-0 -translate-y-1/2 text-[var(--primarytext)]/50">
        <div className="relative size-5 rounded-full md:size-10">
          <span className="absolute inset-0 z-10 h-full w-full rounded-full dark:bg-neutral-800/50"></span>
          <Image src="/BTC.png" alt="crypto-image" fill className="rounded-full object-contain" />
        </div>
      </span>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1741.9665531330365 21.06138083287715"
        width={`${tele.svgW}`}
        height={`${tele.svgH}`}
        stroke="url(#line-zero-gradient)"
        className={`absolute top-1/2 right-6 -translate-y-1/2 md:right-10`}
      >
        <defs>
          <motion.linearGradient
            gradientUnits="userSpaceOnUse"
            id="line-zero-gradient"
            initial={{
              x1: "0%",
              x2: "10%",
            }}
            animate={{
              x1: "100%",
              x2: "110%",
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              repeatDelay: 2,
            }}
          >
            <stop stopColor="var(--svg-path)" />
            <stop offset="0.33" stopColor="#fe9a00" />
            <stop offset="0.66" stopColor="#fe9a00" />
            <stop offset="1" stopColor="var(--svg-path)" />
          </motion.linearGradient>
        </defs>
        <g stroke-linecap="round">
          <g transform="translate(10 10) rotate(0 860.9832765665183 0.5306904164385742)">
            <path
              d="M0 0 C680.17 0.42, 1360.33 0.84, 1721.97 1.06 M0 0 C514.05 0.32, 1028.09 0.63, 1721.97 1.06"
              strokeWidth="5"
              fill="none"
            ></path>
          </g>
        </g>
        <mask></mask>
      </svg>
    </div>
  );
}
function NewsSVG({ news }: { news: Block }) {
  return (
    <div className="relative h-7 gap-2">
      <span className="absolute top-1/2 left-0 -translate-y-1/2 text-[10px] text-[var(--primarytext)]/50 lg:text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={`${news.logo}`}
          height={`${news.logo}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primarytext)"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 18h-5" />
          <path d="M18 14h-8" />
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
          <rect width="8" height="4" x="10" y="6" rx="1" />
        </svg>
      </span>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1725.5511639186861 294.49878675756554"
        width={`${news.svgW}`}
        height={`${news.svgH}`}
        stroke="url(#line-two-gradient)"
        className={`absolute bottom-1/2 left-4 md:left-12 lg:left-14`}
      >
        <defs>
          <motion.linearGradient
            gradientUnits="userSpaceOnUse"
            id="line-two-gradient"
            initial={{
              x1: "0%",
              x2: "10%",
            }}
            animate={{
              x1: "100%",
              x2: "105%",
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              repeatDelay: 1.2,
            }}
          >
            <stop stopColor="var(--svg-path)" />
            <stop offset="0.33" stopColor="var(--secondarytext)" />
            <stop offset="0.66" stopColor="var(--secondarytext)" />
            <stop offset="1" stopColor="var(--svg-path)" />
          </motion.linearGradient>
        </defs>
        <g stroke-linecap="round">
          <g transform="translate(10 282.30350506249806) rotate(0 852.7755819593431 -135.0541116837153)">
            <path
              d="M0 0 C528.86 0.68, 1057.72 1.36, 1705.25 2.2 M0 0 C508.8 0.66, 1017.6 1.31, 1705.25 2.2 M1705.25 2.2 C1705.35 -93.75, 1705.46 -189.69, 1705.55 -272.3 M1705.25 2.2 C1705.32 -66.17, 1705.4 -134.54, 1705.55 -272.3"
              stroke-width="5"
              fill="none"
            ></path>
          </g>
        </g>
        <mask></mask>
      </svg>
    </div>
  );
}
function LLMComp({ cpuChip }: { cpuChip: string }) {
  return (
    <div
      className={cn(
        "absolute top-1/2 left-1/2 z-10 size-10 -translate-x-1/2 -translate-y-1/2 md:size-12"
      )}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "overflow-hidden rounded-lg bg-neutral-300 p-px dark:bg-neutral-800"
        )}
      >
        <div
          className={cn(
            "absolute h-full w-full",
            "inset-0 scale-[1.5] animate-spin [background-image:conic-gradient(at_center,transparent,blue_20%,transparent_30%)] [animation-duration:1s]"
          )}
        />
        <div
          className={cn(
            "absolute h-full w-full",
            "inset-0 scale-[1.5] animate-spin [background-image:conic-gradient(at_center,transparent,#c800de_20%,transparent_30%)] [animation-delay:0.5s] [animation-duration:1s]"
          )}
        />
        <div className="relative z-20 flex h-full w-full items-center justify-center rounded-[7px] bg-[var(--background)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${cpuChip}`}
            height={`${cpuChip}`}
            viewBox="0 0 24 24"
            fill="none"
            // stroke="#c800de"
            stroke="#00b8db"
            stroke-width="0.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 20v2" />
            <path d="M12 2v2" />
            <path d="M17 20v2" />
            <path d="M17 2v2" />
            <path d="M2 12h2" />
            <path d="M2 17h2" />
            <path d="M2 7h2" />
            <path d="M20 12h2" />
            <path d="M20 17h2" />
            <path d="M20 7h2" />
            <path d="M7 20v2" />
            <path d="M7 2v2" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="8" y="8" width="8" height="8" rx="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}
function Binance({ binance }: { binance: Binance }) {
  return (
    <div
      className={`absolute top-20 left-1/2 flex -translate-x-1/2 flex-col items-center lg:top-5`}
    >
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={`${binance.logo}`}
          height={`${binance.logo}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primarytext)"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
          <line x1="6" x2="6.01" y1="6" y2="6" />
          <line x1="6" x2="6.01" y1="18" y2="18" />
        </svg>
        <span className="text-[10px] text-[var(--primarytext)]/70 lg:text-sm">Binance API</span>
      </div>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20.304911158962568 634.5749549049656"
        width={`${binance.svgW}`}
        height={`${binance.svgH}`}
        stroke="url(#line-four-gradient)"
      >
        <defs>
          <motion.linearGradient
            gradientUnits="userSpaceOnUse"
            id="line-four-gradient"
            initial={{
              y1: "-10%",
              y2: "0%",
            }}
            animate={{
              y1: "100%",
              y2: "110%",
            }}
            transition={{
              duration: 1,
              repeatDelay: 1, // 👈 pause for ~0.8sec top & bottom
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            <stop stopColor="var(--svg-path)" />
            <stop offset="0.33" stopColor="#e12afb" />
            <stop offset="0.66" stopColor="#e12afb" />
            <stop offset="1" stopColor="var(--svg-path)" />
          </motion.linearGradient>
        </defs>
        <g stroke-linecap="round">
          <g transform="translate(10 10) rotate(0 0.15245557948128408 307.2874774524828)">
            <path
              d="M0 0 C0.12 236.94, 0.24 473.87, 0.3 614.57 M0 0 C0.11 218.53, 0.22 437.05, 0.3 614.57"
              stroke-width="5"
              fill="none"
            ></path>
          </g>
        </g>
        <mask></mask>
      </svg>
    </div>
  );
}
function RAG({ rag }: { rag: Binance }) {
  return (
    <div
      className={`absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center lg:bottom-5`}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20.304911158962568 634.5749549049656"
        width={`${rag.svgW}`}
        height={`${rag.svgH}`}
        stroke="url(#line-five-gradient)"
      >
        <defs>
          <motion.linearGradient
            gradientUnits="userSpaceOnUse"
            id="line-five-gradient"
            initial={{
              y1: "100%",
              y2: "110%",
            }}
            animate={{
              y1: "-10%",
              y2: "0%",
            }}
            transition={{
              duration: 1,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0.8, // pause after each run
            }}
          >
            <stop stopColor="var(--svg-path)" />
            <stop offset="0.33" stopColor="blue" />
            <stop offset="0.66" stopColor="blue" />
            <stop offset="1" stopColor="var(--svg-path)" />
          </motion.linearGradient>
        </defs>
        <g stroke-linecap="round">
          <g transform="translate(10 10) rotate(0 0.15245557948128408 307.2874774524828)">
            <path
              d="M0 0 C0.12 236.94, 0.24 473.87, 0.3 614.57 M0 0 C0.11 218.53, 0.22 437.05, 0.3 614.57"
              stroke-width="5"
              fill="none"
            ></path>
          </g>
        </g>
        <mask></mask>
      </svg>
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={`${rag.logo}`}
          height={`${rag.logo}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primarytext)"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 15 21.84" />
          <path d="M21 5V8" />
          <path d="M21 12L18 17H22L19 22" />
          <path d="M3 12A9 3 0 0 0 14.59 14.87" />
        </svg>
        <span className="text-[10px] text-[var(--primarytext)]/70 lg:text-sm">RAG/Qdrant</span>
      </div>
    </div>
  );
}
