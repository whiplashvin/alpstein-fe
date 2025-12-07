"use client";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import AppStatsSkeleton from "../_skeletons/AppStatsSkeleton";
import { cn } from "../lib/utils";
import PopularSkeleton from "../_skeletons/PopularSkeleton";
import PerformersSkeleton from "../_skeletons/PerformersSkeleton";
import PremiumSkeleton from "../_skeletons/PremiumSkeleton";
import { useFooterHeight, useNavBarHeight } from "../lib/zustand";
import { useEffect } from "react";

const AppStats = dynamic(() => import("./AppStats"), {
  ssr: false,
  loading: () => <AppStatsSkeleton />,
});
const PopularCoins = dynamic(() => import("./PopularCoins"), {
  ssr: false,
  loading: () => <PopularSkeleton />,
});

const Performers = dynamic(() => import("./Performers"), {
  ssr: false,
  loading: () => <PerformersSkeleton />,
});

const PremiumCard = dynamic(() => import("./PremiumCard"), {
  ssr: false,
  loading: () => <PremiumSkeleton />,
});

function StatsDash() {
  const { height: navbar } = useNavBarHeight();
  const { height: footer } = useFooterHeight();
  useEffect(() => {
    console.log(window.innerHeight, window.outerHeight);
  }, []);
  console.log(navbar, footer);
  return (
    <motion.div
      className={cn(
        "relative mt-14 flex h-[calc(100vh-104px)] flex-col gap-3 overflow-scroll pb-2 md:pb-0 lg:mt-18",
        `md:h-[calc(100vh-114px)]`,
        "md:grid md:grid-rows-[2fr_1fr]",
        `l:grid-cols-[5fr_2fr] l:grid-rows-1 l:gap-2`,
        "3xl:h-[calc(1000px-100px)]",
        "lg:h-[calc(100vh-72px)]"
      )}
    >
      <div
        className={cn(
          "3xl:h-[calc(1000px-100px)]",
          "3xl:grid-rows-[1fr_2.5fr] 3xl:grid-cols-1",
          // `l:grid-rows-[1fr_2fr] l:grid-cols-1 l:gap-3 l:h-[calc(100vh-114px)] flex w-full flex-col gap-3 md:grid md:max-h-[calc(100vh-56px)] md:grid-cols-[1fr_2.5fr] 2xl:max-h-[calc(100vh-100px)]`
          `l:grid-rows-[1fr_2fr] l:grid-cols-1 l:gap-3 l:h-[calc(100vh-114px)] flex w-full flex-col gap-3 md:grid md:max-h-[calc(100vh-56px)] md:grid-cols-[1fr_2.5fr] 2xl:h-full`,
          "l:overflow-scroll"
        )}
      >
        <PopularCoins />
        {/* <div className="my-3 hidden h-[0.5px] bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% md:block"></div> */}
        <AppStats />
      </div>
      <div
        className={cn(
          "3xl:h-[calc(1000px-100px)]",
          "md:grid-rows-1",
          // "l:grid-cols-1 l:grid-rows-[1.5fr_1fr] l:h-[calc(100vh-114px)] grid grid-rows-[1.5fr_1fr] gap-2 md:max-h-[calc(100vh-56px)] md:grid-cols-[2fr_1fr] md:grid-rows-1 2xl:max-h-[calc(100vh-100px)]",
          "l:grid-cols-1 l:grid-rows-[1.5fr_1fr] l:h-[calc(100vh-114px)] grid grid-rows-[1.5fr_1fr] gap-2 md:max-h-[calc(100vh-56px)] md:grid-cols-[2fr_1fr] md:grid-rows-1 2xl:h-full",
          "l:overflow-scroll"
        )}
      >
        <Performers />
        <PremiumCard />
      </div>
    </motion.div>
  );
}

export default StatsDash;
