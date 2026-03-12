"use client";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useCurrentCryptoId } from "../lib/zustand";
import { useEffect, useRef, useState } from "react";
function CryptoAbout() {
  const { cryptoData } = useCurrentCryptoId();
  const ref = useRef<HTMLDivElement | null>(null);
  const [mask, setMask] = useState("mask-b-from-80%");

  useEffect(() => {
    if (!ref.current) return;
    const maxScroll = ref.current.scrollHeight - ref.current.clientHeight;
    const parent = ref.current;
    function handleScroll() {
      if (ref.current?.scrollTop === 0) {
        setMask("mask-b-from-80%");
      }
      if (ref.current!.scrollTop > 0 && ref.current!.scrollTop < maxScroll) {
        setMask("mask-t-from-90% mask-b-from-90%");
      }
      if (ref.current?.scrollTop == maxScroll) {
        setMask("mask-t-from-90%");
      }
    }
    parent.addEventListener("scroll", handleScroll);
    return () => parent.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <motion.div
      key={cryptoData?.id}
      className={cn(
        "h-96 w-full rounded-md bg-rose-500 bg-white p-px lg:h-full lg:min-h-full",
        "animate-[var(--animate-rotate-border)] bg-conic/[from_var(--border-angle)] from-[var(--btnbg)] from-0% via-indigo-500/80 via-15% to-[var(--btnbg)] to-0%"
      )}
    >
      <div className="h-full w-full rounded-md bg-[var(--background)]">
        <div
          ref={ref}
          className={cn(
            "max-h-full min-h-full max-w-full min-w-full overflow-y-auto rounded-md p-2 text-[11px] font-medium text-[var(--secondarytext)]",
            "bg-gradient-to-tr from-slate-600/10 from-[20%] via-violet-400/20 via-[80%] to-indigo-700/30 to-[100%]",
            `${mask}`
          )}
        >
          {cryptoData?.about}
        </div>
      </div>
    </motion.div>
  );
}

export default CryptoAbout;
