"use client";
import BackgroundGrid from "./_comps/BackgroundGrid";
import Features from "./_comps/Features";
import { Hero } from "./_comps/Hero";
import HowItWorks from "./_comps/HowItWorks";
import SigninModal from "./_comps/SigninModal";
import Feat from "./_comps/Feat";
export default function Home() {
  return (
    <div
      style={{
        userSelect: "none",
      }}
    >
      <BackgroundGrid />
      <div className="absolute inset-x-0 top-0 mx-auto h-full w-full max-w-7xl">
        <Hero />
        <SigninModal />
        <Features />
        <HowItWorks />
        <Feat />
      </div>
    </div>
  );
}
