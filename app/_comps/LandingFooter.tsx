import { GiMountaintop } from "react-icons/gi";
import { cn } from "../lib/utils";

function LandingFooter() {
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
      <div className="l:grid-cols-4 grid flex-1 grid-cols-1 gap-10 p-5 text-xs font-thin text-[var(--secondarytext)]/70 md:grid-cols-2 md:text-sm">
        <div className="flex flex-col gap-7">
          <div className="w-full pl-16 text-xs font-thin text-[var(--secondarytext)]/70 md:text-xs">
            PRODUCT
          </div>
          <ul className="flex flex-col items-center justify-center gap-5">
            <li className="flex w-full pl-16">Start Tracking</li>
            <li className="flex w-full pl-16">Why Alpstein</li>
            <li className="flex w-full pl-16">How Alpstein works</li>
            <li className="flex w-full pl-16">What Alpstien provides</li>
          </ul>
        </div>
        <div className="flex flex-col gap-7">
          <div className="w-full pl-16 text-xs font-thin text-[var(--secondarytext)]/70 md:text-xs">
            RESOURCES
          </div>
          <ul className="flex flex-col items-center justify-center gap-5">
            <li className="flex w-full pl-16">Docs</li>
            <li className="flex w-full pl-16">Blogs</li>
            <li className="flex w-full pl-16">TUI</li>
          </ul>
        </div>
        <div className="flex flex-col gap-7">
          <div className="w-full pl-16 text-xs font-thin text-[var(--secondarytext)]/70 md:text-xs">
            LEGAL
          </div>
          <ul className="flex flex-col items-center justify-center gap-5">
            <li className="flex w-full pl-16">ToS</li>
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
            <li className="flex w-full pl-16">Github</li>
            <li className="flex w-full pl-16">Twitter</li>
            <li className="flex w-full pl-16">LinkedIn</li>
            <li className="flex w-full pl-16">Email</li>
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
        <span className="text-rose-500">Disclaimer Risk Warning</span>
        <ul className="flex flex-col gap-5">
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
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
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
