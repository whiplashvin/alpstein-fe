/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { useCurrentCryptoId } from "../lib/zustand";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
const parentVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
function Accordion() {
  const { cryptoData } = useCurrentCryptoId();
  const [activeIndex, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(null);
  }, [cryptoData?.id]);

  const numItems = cryptoData?.position === "unclear" || cryptoData?.waitout !== "" ? 4 : 3;

  return (
    <motion.div
      key={cryptoData?.id}
      variants={parentVariant}
      initial="hidden"
      animate="show"
      className={cn(
        "flex h-full w-full flex-col gap-3 rounded-lg p-0",
        "overflow-y-scroll bg-slate-500/10"
      )}
    >
      {cryptoData?.buy !== "" && (
        <Comp
          index={0}
          heading="Should you consider buying"
          content={cryptoData!.buy}
          activeIndex={activeIndex}
          setActiveIndex={setIndex}
        />
      )}
      {cryptoData?.sell !== "" && (
        <Comp
          index={1}
          heading="Should you consider selling"
          content={cryptoData!.sell}
          activeIndex={activeIndex}
          setActiveIndex={setIndex}
        />
      )}
      {cryptoData?.waitout !== "" && cryptoData?.position !== "unclear" && (
        <Comp
          index={3}
          heading="Should you consider waiting out"
          content={cryptoData!.waitout}
          activeIndex={activeIndex}
          setActiveIndex={setIndex}
        />
      )}
      <Comp
        index={2}
        heading="Levels to monitor"
        content={cryptoData!.monitor}
        activeIndex={activeIndex}
        setActiveIndex={setIndex}
      />
      <Comp
        index={4}
        heading="Synopsis of the article"
        content={cryptoData!.synopsis}
        activeIndex={activeIndex}
        setActiveIndex={setIndex}
        numItems={numItems}
      />
    </motion.div>
  );
}

function Comp({
  index,
  heading,
  content,
  activeIndex,
  setActiveIndex,
  numItems,
}: {
  index: number;
  heading: string;
  content: string;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  numItems?: number;
}) {
  const show = activeIndex === index;

  const maxHeight = numItems === 4 ? 36 : 48;
  return (
    <div
      className={cn(
        `relative w-full ${!show ? "h-12" : "h-48"} p-3 font-light transition-all duration-500`
      )}
    >
      <motion.div
        //@ts-expect-error
        variants={childVariant}
        className="flex cursor-pointer items-center justify-between text-[var(--secondarytext)]"
        onClick={() => setActiveIndex(show ? null : index)}
      >
        <p className="text-[12px] font-light">{heading}</p>
        <button className="cursor-pointer text-[--primarytext]">
          {!show ? <IoChevronDown /> : <IoChevronUp />}
        </button>
      </motion.div>

      <motion.p
        className={`my-2 overflow-y-auto text-[10px] tracking-wider text-[var(--secondarytext)] transition-all ease-in-out ${
          show ? `opacity-100 duration-500` : "opacity-0 duration-0"
        }`}
        style={{ maxHeight: show ? `${maxHeight * 4}px` : 0 }}
      >
        {content}
      </motion.p>

      {index !== 4 && (
        <motion.div
          //@ts-expect-error
          variants={childVariant}
          className={`absolute bottom-0 left-0 h-[0.5px] w-full bg-gradient-to-r from-transparent from-[-5%] via-zinc-800 via-50% to-transparent to-105%`}
        ></motion.div>
      )}
    </div>
  );
}

export default Accordion;
