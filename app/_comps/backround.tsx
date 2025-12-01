"use client";
import { cn } from "../lib/utils";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import InfiniteSlide from "./InfiniteSlide";
// import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Button2 from "./Button2";
import { useShowSigninModal, useUser } from "../lib/zustand";
import HeroImage from "./HeroImage";
export function GridBackgroundDemo() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  // const [imageUrl, setImageUrl] = useState("/hero-white.png");
  // const rootStyles = getComputedStyle(document.documentElement);
  // const defaultUrl = rootStyles.getPropertyValue("--url").trim();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const translateScale = useTransform(scrollYProgress, [0.4, 1], [1, 0.75]);
  // const translateMarquee = useTransform(scrollYProgress, [0.4, 1], [1, 0.4]);
  // const translateBlur = useTransform(scrollYProgress, [0.4, 1], [0, 3]);
  const { currUser } = useUser();
  const { toggleShowModal } = useShowSigninModal();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      // const isDark = document.documentElement.classList.contains("dark");
      // if (isDark) {
      //   setImageUrl("/landing-dark.png");
      // } else {
      //   setImageUrl("/hero-white.png");
      // }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    if (document.documentElement.classList.contains("dark")) {
      // setImageUrl("/landing-dark.png");
    }
    return () => observer.disconnect();
  }, []);

  const navigate = useRouter();

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col items-center bg-[var(--background)]">
      <div
        className={cn(
          "absolute inset-0 z-10 h-full w-full opacity-30",
          "bg-[radial-gradient(70%_80%_at_50%_0%,_#a3b3ff_15%,_var(--background))]",
          "md:bg-[radial-gradient(70%_50%_at_50%_0%,_#a3b3ff_15%,_var(--background))]"
        )}
        style={
          {
            //#314158
            //#a3b3ff
            // backgroundImage: "radial-gradient(70% 50% at 50% 0%, #a3b3ff 15%, var(--background))",
            // backgroundImage: "radial-gradient(70% 80% at 50% 0%, #a3b3ff 15%, var(--background))",
          }
        }
      />
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "md:[background-size:60px_60px]",
          "z-0 [background-image:linear-gradient(to_left,var(--herogrid)_1px,transparent_1px),linear-gradient(to_top,var(--herogrid)_1px,transparent_1px)] opacity-10"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center",
          "[mask-image:radial-gradient(ellipse_80%_80%_at_top,transparent_0%,black_80%)]",
          "bg-[var(--background)]"
        )}
      />
      <div className="md2:mt-40 z-10 mt-32 flex w-full flex-col items-center justify-center gap-5 md:mt-36 lg:mt-30 lg:h-1/3 lg:gap-8">
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
          className="px-0 text-center text-5xl font-light text-[var(--primarytext)]/80 transition-colors duration-700 md:px-14 md:text-5xl lg:px-44 lg:text-6xl"
        >
          {/* Cut through crypto chaos, with{" "}
          <span className="font-medium text-[var(--primarytext)]/60">intelligent</span> insights. */}
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
          className="max-w-2xl px-4 text-center text-xs font-extralight tracking-wide text-[var(--primarytext)]/70 transition-colors duration-500 md:px-0 md:text-base lg:leading-5"
        >
          {/* Make crypto articles make sense. Intense, data heavy blogs cleansed and made actionable. */}
          Stay ahead with AI-powered crypto analysis. Intense, data heavy blogs cleansed and made
          actionable.
        </motion.p>
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
          <Button2 text={"Read docs"} onClick={() => navigate.push("/docs")} />
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
          {/* <InfiniteSlide /> */}
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
          }}
          ref={imageRef}
          className="l:w-[850px] z-10 mt-0 w-[350px] md:w-[650px] lg:w-[1100px]"
        >
          {/* <div className="absolute bottom-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 rounded-t-xl bg-[var(--background)] bg-lime-500 opacity-10"></div> */}
          {/* <Image
            src={imageUrl}
            height={400}
            width={1100}
            alt="temp"
            className="rounded-t-xl bg-[var(--background)]"
            style={{
              maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
            }}
          /> */}
        </motion.div>
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
        }}
        ref={imageRef}
        // className="l:bottom-25 l:w-[850px] absolute left-1/2 z-10 hidden -translate-x-1/2 md:bottom-65 md:block md:w-[650px] lg:bottom-20 lg:w-[900px]"
        className={cn(
          "mx-auto my-10 hidden h-96 w-[80%] rounded-xl border border-white/70 bg-white/50 p-2 backdrop-blur-xl md:block"
          // "bg-radial-[at_20%_20%] from-transparent from-60% via-blue-300/20 via-80% to-blue-400/20 to-100%"
        )}
      >
        <HeroImage />
        {/* <div className="absolute bottom-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 rounded-t-xl bg-[var(--background)] bg-lime-500 opacity-10"></div> */}
        {/* <Image
          src={imageUrl}
          height={400}
          width={1100}
          alt="temp"
          className="rounded-t-xl bg-[var(--background)]"
          style={{
            maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
          }}
        /> */}
      </motion.div>
    </div>
  );
}
