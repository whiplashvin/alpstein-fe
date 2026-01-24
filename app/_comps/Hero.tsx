"use client";
import { cn } from "../lib/utils";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import InfiniteSlide from "./InfiniteSlide";
// import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Button2 from "./Button2";
import { useRootRef, useShowSigninModal, useUser } from "../lib/zustand";
import Image from "next/image";

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const { setRef } = useRootRef();
  // const [imageUrl, setImageUrl] = useState("/hero-img-light.png");
  // const rootStyles = getComputedStyle(document.documentElement);
  // const defaultUrl = rootStyles.getPropertyValue("--url").trim();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const translateScale = useTransform(scrollYProgress, [0.4, 1], [1, 0.75]);
  // const translateMarquee = useTransform(scrollYProgress, [0.4, 1], [1, 0.4]);
  // const translateBlur = useTransform(scrollYProgress, [0.4, 1], [0, 3]);
  const { currUser } = useUser();
  const { toggleShowModal } = useShowSigninModal();

  useEffect(() => {
    if (ref.current) {
      setRef(ref.current);
    }
    const observer = new MutationObserver(() => {
      // const isDark = document.documentElement.classList.contains("dark");
      // if (isDark) {
      //   setImageUrl("/hero-img-dark.png");
      // } else {
      //   setImageUrl("/hero-img-light.png");
      // }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    if (document.documentElement.classList.contains("dark")) {
      // setImageUrl("/hero-img-dark.png");
    }
    return () => observer.disconnect();
  }, [setRef]);

  const navigate = useRouter();

  return (
    <div ref={ref} className="3xl:gap-18 relative z-0 flex w-full flex-col items-center gap-16">
      <div className="md2:mt-40 3xl:mt-52 3xl:gap-8 z-10 mt-36 flex w-full flex-col items-center gap-5 lg:mt-46 lg:gap-5">
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
            duration: 0.5,
            ease: "easeIn",
            delay: 0.2,
          }}
          className="3xl:text-7xl 3xl:w-4/5 w-full px-2 text-center text-2xl font-light text-[var(--primarytext)]/80 transition-colors duration-700 md:text-5xl lg:w-2/3 lg:text-6xl"
        >
          AI-powered{" "}
          <span className="font-semibold text-[var(--primarytext)]/90">real-time crypto</span>{" "}
          insights. Sans noise.
        </motion.h2>
        <motion.p
          initial={{
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
            // y: 100,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            // y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeIn",
            delay: 0.2,
          }}
          className="3xl:text-lg 3xl:w-4/5 w-full px-6 text-center text-xs font-extralight tracking-wide text-[var(--primarytext)]/70 transition-colors duration-500 md:w-2/3 md:px-0 md:text-base lg:leading-5"
        >
          Stay ahead with intelligent crypto analysis. Intense, data heavy blogs cleansed and made
          actionable.
        </motion.p>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)",
          y: 100,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
          delay: 0.3,
        }}
        className="flex items-center justify-center gap-4"
      >
        <Button2
          text={"Try for free"}
          onClick={() => {
            if (currUser === null) {
              toggleShowModal(true);
              navigate.push("/");
            } else {
              navigate.push("/dashboard");
            }
          }}
        />
        <Button2 text={"Read docs"} onClick={() => navigate.push("/docs/about")} />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)",
          y: 100,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
          delay: 0.5,
        }}
        className=""
        // style={{ scale: translateMarquee, filter: useMotionTemplate`blur(${translateBlur}px)` }}
      >
        <InfiniteSlide />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)",
          y: 100,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
          delay: 1,
        }}
        style={{
          scale: translateScale,
          // filter: useMotionTemplate`blur(${translateBlur}px)`,
          // maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
        }}
        ref={imageRef}
        // className="l:bottom-25 l:w-[850px] absolute left-1/2 z-10 hidden -translate-x-1/2 md:bottom-65 md:block md:w-[650px] lg:bottom-20 lg:w-[900px]"
        className={
          cn(
            "relative mx-auto h-full max-h-fit w-[90%] rounded-2xl border border-[var(--hero-img-border)]/70 bg-[var(--hero-img-border)]/30 p-2 backdrop-blur-xl md:w-[80%]",
            "shadow-2xl"
          )
          // "bg-radial-[at_20%_20%] from-transparent from-60% via-blue-300/20 via-80% to-blue-400/20 to-100%"
        }
      >
        <div className="absolute inset-0 h-full w-full rounded-xl dark:bg-neutral-800/30"></div>
        {/* <HeroImage /> */}
        {/* <div className="absolute bottom-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 rounded-t-xl bg-[var(--background)] bg-lime-500 opacity-10"></div> */}
        <Image
          src={"/hero.png"}
          height={200}
          width={1100}
          alt="temp"
          className="rounded-xl"
          // style={{
          //   maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
          // }}
        />
      </motion.div>
    </div>
  );
}
