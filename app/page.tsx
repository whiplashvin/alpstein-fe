"use client";
import BackgroundGrid from "./_comps/BackgroundGrid";
import Features from "./_comps/Features";
import { Hero } from "./_comps/Hero";
import HowItWorks from "./_comps/HowItWorks";
import SigninModal from "./_comps/SigninModal";
import Feat from "./_comps/Feat";
import { useEffect, useRef } from "react";
import { useNavbarBackdropBlur } from "./lib/zustand";
import FAQ from "./_comps/FAQ";
import LandingFooter from "./_comps/LandingFooter";

export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { setTrigger } = useNavbarBackdropBlur();

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;

    function handleScroll(container: HTMLDivElement) {
      const { bottom, height } = container.getBoundingClientRect();
      const remainingPert = (bottom / height) * 100;
      if (remainingPert <= 90) {
        setTrigger(true);
      } else {
        setTrigger(false);
      }
    }

    window.addEventListener("scroll", () => {
      return handleScroll(container);
    });

    return () =>
      window.removeEventListener("scroll", () => {
        return handleScroll(container);
      });
  }, [setTrigger]);

  return (
    <div
      style={{
        userSelect: "none",
      }}
    >
      <SigninModal />
      <BackgroundGrid />
      <div ref={ref} className="absolute inset-x-0 top-0 mx-auto h-full w-full max-w-7xl">
        <Hero />
        <Features />
        <HowItWorks />
        <Feat />
        <FAQ />
        <LandingFooter />
      </div>
    </div>
  );
}
