"use client";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { usePathname, useRouter } from "next/navigation";

enum TABS {
  about,
  underTheHood,
  tui,
}

function Layout({ children }: { children: React.ReactNode }) {
  const [currTab, setCurrTab] = useState("about");
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    setCurrTab(path.split("/")[2]);
  }, [path]);
  return (
    <div
      className={cn(
        "mt-14 h-[calc(100vh-104px)]",
        "flex items-center justify-center",
        "mx-auto max-w-7xl border-x border-[var(--cardborder)]/50",
        "p-2 lg:mt-14 lg:flex lg:h-[calc(100vh-56px)] lg:items-center lg:gap-0 lg:p-0",
        "bg-[var(--background)]",
        "3xl:max-h-[calc(1000px-100px)]"
        // "bg-rose-500"
      )}
    >
      <div className="h-full w-full px-2 lg:px-10">
        <div className="flex flex-col">
          <div className="mb-2 h-full w-full lg:hidden">
            <ul className="flex gap-10 text-base font-light text-[var(--secondarytext)]">
              <button
                onClick={() => {
                  router.replace("/docs/about");
                }}
                className="relative cursor-pointer hover:text-[var(--secondarytext)]/50"
              >
                About
                {currTab === TABS[0] && (
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--secondarytext)]" />
                )}
              </button>
              <button
                onClick={() => {
                  router.replace("/docs/underTheHood");
                }}
                className="relative cursor-pointer hover:text-[var(--secondarytext)]/50"
              >
                Under the hood
                {currTab === TABS[1] && (
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--secondarytext)]" />
                )}
              </button>
              <button
                onClick={() => {
                  router.replace("/docs/tui");
                }}
                className="relative cursor-pointer hover:text-[var(--secondarytext)]/50"
              >
                Alpstein TUI
                {currTab === TABS[2] && (
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--secondarytext)]" />
                )}
              </button>
            </ul>
          </div>
          <div className="h-[0.5px] w-full bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% 2xl:top-18"></div>
          <div className="grid max-h-[calc(1000px-100px)] grid-cols-1 gap-2 lg:h-[calc(100vh-56px)] lg:grid-cols-[1fr_0.1fr_4fr_0.1fr]">
            <div className="hidden h-full w-full lg:block lg:px-5 lg:py-10">
              <ul className="font-meidium flex w-full flex-col gap-5 text-base text-[var(--secondarytext)]">
                <button
                  onClick={() => {
                    router.replace("/docs/about");
                  }}
                  className="relative w-fit cursor-pointer text-sm hover:text-[var(--secondarytext)]/50"
                >
                  About
                  {currTab === TABS[0] && (
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--secondarytext)]" />
                  )}
                </button>
                <button
                  onClick={() => {
                    router.replace("/docs/underTheHood");
                  }}
                  className="relative w-fit cursor-pointer text-sm hover:text-[var(--secondarytext)]/50"
                >
                  Under the hood
                  {currTab === TABS[1] && (
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--secondarytext)]" />
                  )}
                </button>
                <button
                  onClick={() => {
                    router.replace("/docs/tui");
                  }}
                  className="relative w-fit cursor-pointer text-sm hover:text-[var(--secondarytext)]/50"
                >
                  Alpstein TUI
                  {currTab === TABS[2] && (
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--secondarytext)]" />
                  )}
                </button>
              </ul>
            </div>
            <div
              className="hidden min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
              style={{
                backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
                backgroundSize: "10px 10px",
              }}
            ></div>
            {children}
            <div
              className="hidden min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
              style={{
                backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
                backgroundSize: "10px 10px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
