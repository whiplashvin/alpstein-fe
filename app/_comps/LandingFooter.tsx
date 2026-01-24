import { GiMountaintop } from "react-icons/gi";
import { cn } from "../lib/utils";
import Link from "next/link";
import { useHowAlpsRef, useRootRef, useWhatAlpsRef, useWhyAlpsRef } from "../lib/zustand";

function LandingFooter() {
  const { ref: rootRef } = useRootRef();
  const { ref: whyRef } = useWhyAlpsRef();
  const { ref: howRef } = useHowAlpsRef();
  const { ref: whatRef } = useWhatAlpsRef();

  return (
    <div
      className={cn(
        "mx-auto mt-40 flex w-[90%] flex-col gap-10",
        "border-t border-[var(--stats-comp-bg)]/90 bg-[var(--stats-comp-bg)]/10 backdrop-blur-xl",
        "rounded-t-xl"
      )}
    >
      <div className="mt-10 ml-10 flex items-center gap-1 text-sm text-[var(--primarytext)] opacity-90 transition-colors duration-700 md:gap-2 md:text-base 2xl:text-lg">
        <GiMountaintop size={25} />
        <span>Alpstein</span>
      </div>
      <div className="l:grid-cols-4 grid flex-1 grid-cols-1 gap-10 p-5 text-xs font-thin text-[var(--secondarytext)] md:grid-cols-2 md:text-sm">
        <div className="flex flex-col gap-7">
          <div className="w-full pl-16 text-xs font-thin text-[var(--secondarytext)]/70 md:text-xs">
            PRODUCT
          </div>
          <ul className="flex flex-col items-center justify-center gap-5">
            <li
              className="flex w-full cursor-pointer pl-16 transition-all duration-300 ease-in-out hover:scale-105"
              onClick={() =>
                rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              Start Tracking
            </li>
            <li
              className="flex w-full cursor-pointer pl-16 transition-all duration-300 ease-in-out hover:scale-105"
              onClick={() =>
                whyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
            >
              Why Alpstein
            </li>
            <li
              className="flex w-full cursor-pointer pl-16 transition-all duration-300 ease-in-out hover:scale-105"
              onClick={() =>
                howRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
            >
              How Alpstein works
            </li>
            <li
              className="flex w-full cursor-pointer pl-16 transition-all duration-300 ease-in-out hover:scale-105"
              onClick={() =>
                whatRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
            >
              What Alpstien provides
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-7">
          <div className="w-full pl-16 text-xs font-thin text-[var(--secondarytext)]/70 md:text-xs">
            RESOURCES
          </div>
          <ul className="flex flex-col items-center justify-center gap-5">
            <Link href={"/docs/about"} className="flex w-full pl-16 hover:scale-105">
              About
            </Link>
            <Link href={"/docs/underTheHood"} className="flex w-full pl-16 hover:scale-105">
              Under The Hood
            </Link>
            <Link href={"/docs/tui"} className="flex w-full pl-16 hover:scale-105">
              Alpstein TUI
            </Link>
          </ul>
        </div>
        <div className="flex flex-col gap-7">
          <div className="w-full pl-16 text-xs font-thin text-[var(--secondarytext)]/70 md:text-xs">
            LEGAL
          </div>
          <ul className="flex flex-col items-center justify-center gap-5">
            <li className="flex w-full pl-16">Privacy</li>
            <li className="flex w-full pl-16">Cookie</li>
            <li className="flex w-full pl-16">Policy</li>
          </ul>
        </div>
        <div className="flex flex-col gap-7">
          <div className="w-full pl-16 text-xs font-thin text-[var(--secondarytext)]/70 md:text-xs">
            CONTACTS
          </div>
          <ul className="flex flex-col items-center justify-center gap-5">
            <Link
              href={"https://github.com/whiplashvin"}
              target={"_blank"}
              className="flex w-full items-center gap-1 pl-16 transition-all ease-in-out hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--secondarytext)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
              Github
            </Link>
            <Link
              href={"https://x.com/whiplashvin"}
              target={"_blank"}
              className="flex w-full items-center gap-1 pl-16 transition-all ease-in-out hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--secondarytext)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
              Twitter
            </Link>
            <Link
              href=""
              target={"_blank"}
              className="flex w-full items-center gap-1 pl-16 transition-all ease-in-out hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--secondarytext)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 11v5" />
                <path d="M8 8v.01" />
                <path d="M12 16v-5" />
                <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
              </svg>
              LinkedIn
            </Link>
          </ul>
        </div>
      </div>
      <div
        className={cn(
          "mx-auto w-[80%] text-xs text-[var(--secondarytext)]/70",
          "rounded-lg p-2",
          "border border-[var(--stats-comp-bg)]/90 bg-[var(--stats-comp-bg)]/30 backdrop-blur-xl",
          //   "bg-radial-[at_20%_20%] from-transparent from-50% via-indigo-300/10 via-70% to-indigo-400/10 to-100%"
          "leading-5 tracking-wide"
        )}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fe9a00"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 9v4" />
            <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0" />
            <path d="M12 16h.01" />
          </svg>
          <span>Disclaimer Risk Warning</span>
        </div>
        <ul className="mt-5 flex flex-col gap-5">
          <p>
            Cryptocurrency trading carries substantial risk of loss and is not suitable for all
            investors. Alpstein provides AI-generated market analysis and trading insights for
            informational and educational purposes only.
          </p>
          <p>
            This is NOT financial, investment, or trading advice. All content, opinions, and
            recommendations are based on automated analysis and should not be considered
            professional guidance.
          </p>
          <p>
            No Guarantees: Past performance does not guarantee future results. Market conditions can
            change rapidly and unpredictably. The AI&apos;s analysis may be incomplete, inaccurate,
            or outdated.
          </p>
          <p>
            Your Responsibility: By using Alpstein, you acknowledge that: All trading decisions are
            your sole responsibility. You should conduct your own research (DYOR) before making any
            trades. You should consult qualified financial advisors for personalized advice.
          </p>
          <p>You understand the risks and only invest capital you can afford to lose entirely.</p>
          <p>
            Alpstein and its creator are not liable for any losses incurred from using this
            platform.
          </p>
        </ul>
      </div>
      <div className="my-4 flex w-full items-center justify-center gap-2 text-xs text-[var(--secondarytext)]/70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--secondarytext)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-copyright"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M14 9.75a3.016 3.016 0 0 0 -4.163 .173a2.993 2.993 0 0 0 0 4.154a3.016 3.016 0 0 0 4.163 .173" />
        </svg>
        <p>2026 Alpstein. All rights reserved.</p>
      </div>
    </div>
  );
}

export default LandingFooter;
