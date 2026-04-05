import DocsImage from "@/app/_comps/DocsImage";
import { cn } from "@/app/lib/utils";

function page() {
  return (
    <div
      className={cn(
        "relative max-h-[calc(100vh-150px)] overflow-y-auto md:pt-10 lg:max-h-[calc(100vh-104px)]"
      )}
    >
      <DocsImage />
      <div className="w-full tracking-wide md:mt-7 md:px-10 lg:mt-14 xl:px-20">
        <div className="my-5 text-xs font-light text-[var(--primarytext)]/60 md:text-base">
          <h3 className="text-lg font-medium tracking-normal text-[var(--primarytext)] md:text-2xl">
            Crypto trading shouldn&apos;t feel like information overload. Alpstein cuts through the
            noise.
          </h3>
          <p className="mt-5">
            The crypto market moves fast. News breaks every hour, prices shift in seconds, and
            sentiment changes with a single tweet. Staying on top of it means dozens of tabs,
            endless scrolling, and still no clear picture of what actually matters.
          </p>
          <p className="my-5">
            Alpstein handles that for you. It monitors sources like CoinTelegraph, The Block, and
            NewsBTC around the clock, pulling in the stories that move markets—and ignoring
            everything that doesn&apos;t.
          </p>
          <p>From there, AI takes over:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              Articles get distilled into actionable summaries—skip the 10-minute deep dives when
              you just need the signal.
            </li>
            <li>
              Market sentiment is analyzed across sources—bullish, bearish, or uncertain, with
              reasoning attached.
            </li>
            <li>
              Trading insights are generated—price levels to watch, potential entries and exits, and
              risk-reward breakdowns.
            </li>
          </ul>
          <p className="mt-4">
            Everything lives in one dashboard. Current prices, technical indicators, AI-generated
            opinions, and live news—all synchronized and updating in real time. No tab switching. No
            context switching.
          </p>
          <p className="mt-4">
            Alpstein is transparent by design. Every AI opinion shows its reasoning—what data it
            looked at, what levels it flagged, and why. It&apos;s not about automating
            trades—it&apos;s about giving you better information, faster, so you can make your own
            calls with confidence.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
