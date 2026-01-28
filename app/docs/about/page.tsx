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
      <div className="w-full tracking-wide text-[var(--primarytext)] md:mt-7 md:px-10 lg:mt-14 xl:px-20">
        <div className="my-5 text-xs font-light text-[var(--secondarytext)] md:text-sm">
          <h3 className="text-lg font-semibold tracking-normal text-[var(--primarytext)]">
            Crypto trading shouldn&apos;t feel like information overload. Alpstein cuts through the
            noise.
          </h3>
          <p className="mt-4">
            The crypto market moves fast. News breaks every hour, prices shift in seconds, and
            sentiment changes with a single tweet. For traders trying to stay informed, it&apos;s
            exhausting—dozens of tabs open, endless scrolling, and still no clear picture of what
            really matters.
          </p>
          <p className="my-5">
            Alpstein solves this by doing the heavy lifting for you. It monitors trusted sources
            like CoinTelegraph, The Block, and NewsBTC around the clock, pulling in the stories that
            actually move markets.
          </p>
          <p>But it doesn&apos;t stop at collecting news. Alpstein uses AI to:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              Distill lengthy articles into actionable summaries—no more reading 10-minute deep
              dives when you need answers now.
            </li>
            <li>
              Analyze market sentiment—whether the narrative is bullish, bearish, or sitting in
              uncertain territory.
            </li>
            <li>
              Generate trading insights—price levels to watch, potential entry and exit points, and
              risk-reward considerations.
            </li>
          </ul>
          <p className="mt-4">
            Everything lands in one dashboard. Current prices, technical indicators, AI-generated
            opinions, and live news—all synchronized and updating in real time. No tab switching. No
            context switching. Just the information you need, when you need it.
          </p>
          <p className="mt-4">
            Alpstein started as a personal project born from frustration. The tools out there were
            either too complex, too expensive, or didn&apos;t show their reasoning. So I built
            something different—a platform that&apos;s transparent about how it thinks and why it
            suggests what it does.
          </p>
          <p className="mt-4">
            Every decision in Alpstein, from the microservices architecture to the way data flows
            across the interface, has been made with one goal: help traders make informed decisions
            faster. It&apos;s not about automating trades—it&apos;s about augmenting human judgment
            with AI that shows its work.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
