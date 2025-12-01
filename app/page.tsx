import BackgroundGrid from "./_comps/BackgroundGrid";
import { Hero } from "./_comps/Hero";
import SigninModal from "./_comps/SigninModal";

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
        <div className="flex h-screen items-center justify-center bg-[var(--background)]">
          <h1 className="text-4xl text-black dark:text-white">Test</h1>
        </div>
      </div>
    </div>
  );
}
