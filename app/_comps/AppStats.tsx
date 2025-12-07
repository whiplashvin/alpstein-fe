"use client";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import React from "react";
import StatsBarGraph from "./StatsBarGraph";
import StatsDoughnutGraph from "./StatsDoughnutGraph";
import StatsPoleAreaGraph from "./StatsPoleAreaGraph";
import StatsHalfDoughnut from "./StatsHalfDoughnut";

function AppStats() {
  return (
    <div className="flex h-full w-full gap-3 overflow-x-scroll md:grid md:grid-cols-2 md:gap-2 lg:h-fit lg:gap-2">
      <Comp1 label={"Week's total articles"} graph={<StatsBarGraph />} />
      <Comp1 label={"Positions generated "} graph={<StatsDoughnutGraph />} />
      <Comp1 label={"Weekly performance"} graph={<StatsPoleAreaGraph />} />
      <Comp1 label={"Week's sentiments"} graph={<StatsHalfDoughnut />} />
    </div>
  );
}

export default AppStats;

function Comp1({ label, graph }: { label: string; graph: React.ReactElement }) {
  return (
    <div
      // [@media(min-width:1024px)_and_(max-height:1366px)]:h-76 [@media(min-width:1024px)_and_(max-height:768px)]:h-44 [@media(min-width:1024px)_and_(max-height:820px)]:h-50
      className={cn(
        // "[@media(min-width:1024px)_and_(min-height:1366px)]:h-96",
        // "l:h-50 l2:h-52 md2:h-86 3xl:h-74 flex h-52 w-72 flex-col gap-5 rounded-2xl p-2 md:h-72 md:max-w-full md:min-w-full lg:h-65",
        "l:h-50 l2:h-52 md2:h-86 3xl:h-74 flex h-52 w-72 flex-col gap-5 rounded-2xl p-2 md:h-72 md:max-w-full md:min-w-full lg:h-70",
        "relative",
        "border border-[var(--stats-comp-bg)]/90 bg-[var(--stats-comp-bg)]/30 backdrop-blur-xl",
        "bg-radial-[at_20%_20%] from-transparent from-60% via-blue-300/20 via-80% to-blue-400/20 to-100%"
      )}
    >
      <motion.h2
        initial={{
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.2,
          ease: "easeIn",
          delay: 0.1,
        }}
        className="l:text-sm flex items-center gap-1 text-xs font-light text-[var(--secondarytext)] md:gap-2 md:text-base"
      >
        {label}
      </motion.h2>
      <div className="min-h-0 flex-1">{graph}</div>
    </div>
  );
}
