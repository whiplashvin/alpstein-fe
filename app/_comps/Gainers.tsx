import Image from "next/image";
import { Performer } from "./Performers";
import { cn } from "../lib/utils";

function Gainers({ gainers }: { gainers: Performer[] }) {
  return (
    <div
      className={cn(
        "l:h-52 l:p-2 h-64 rounded-xl border border-[var(--stats-comp-inner-border)]/50 bg-[var(--stats-comp-inner)]/60 p-3 md:h-52 md:h-full lg:h-full lg:p-3"
      )}
    >
      <h2 className={cn("l:text-xs text-xs font-light text-[var(--secondarytext)] md:text-base")}>
        Top Gainers
      </h2>
      <ul
        className={cn("l:mt-1 l:gap-2 mt-3 flex flex-col gap-4 md:gap-1 md:gap-4 lg:mt-3 lg:gap-3")}
      >
        <li
          className={cn(
            "l:text-xs grid grid-cols-3 items-center rounded bg-neutral-300/20 p-1 text-[12px] text-[var(--secondarytext)] md:text-sm"
          )}
        >
          <span className="flex items-center justify-center">Symbol</span>
          <span className="flex items-center justify-center">Price</span>
          <span className="flex items-center justify-center">24hChange</span>
        </li>
        {gainers.map((c, index) => (
          <li
            className={cn(
              "l:text-[10px] grid grid-cols-3 items-center px-3 text-[10px] text-[var(--primarytext)] md:text-sm"
            )}
            key={index}
          >
            <span className="flex items-center justify-start gap-2">
              <Image
                height={20}
                width={20}
                src={`https://bin.bnbstatic.com/static/assets/logos/${c.symbol.split("USDT")[0]}.png`}
                alt=""
              />
              <span>{c.symbol.split("USDT")[0].slice(0, 4)}</span>
            </span>
            <span className="flex items-center justify-center">{Number(c.p).toFixed(4)}</span>
            <span className="flex items-center justify-center text-green-400">{c.pcp}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gainers;
