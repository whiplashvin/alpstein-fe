import { IconType } from "react-icons";
import { cn } from "../lib/utils";
import { SiChartmogul } from "react-icons/si";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { useCurrentCryptoId } from "../lib/zustand";

type TickerData = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
};

function Stats() {
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");

  const { cryptoData } = useCurrentCryptoId();
  const { data, isLoading } = useQuery({
    queryKey: ["ohlc"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.binance.com/api/v3/ticker/tradingDay?symbol=${cryptoData?.symbol.toUpperCase()}USDT`
      );
      return data;
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      const ticker: TickerData = data;

      setHigh(() => {
        const num = Number(ticker.highPrice).toFixed(2);
        return String(num);
      });
      setLow(() => {
        const num = Number(ticker.lowPrice).toFixed(2);
        return String(num);
      });
      setOpen(() => {
        const num = Number(ticker.openPrice).toFixed(2);
        return String(num);
      });
      setClose(() => {
        const num = Number(ticker.lastPrice).toFixed(2);
        return String(num);
      });
    }
  }, [data, isLoading]);

  return (
    <motion.div className="flex w-full flex-col gap-1 rounded-lg">
      {/* <span className="font:medium text-sm text-[var(--secondarytext)] md:text-xs md:font-semibold 2xl:text-sm">
        OHLC
      </span> */}
      {isLoading ? (
        <div className="flex h-30 w-full items-center justify-center rounded-lg border border-[var(--cardborder)]">
          <Spinner showPrice={true} />
        </div>
      ) : (
        <div className="grid h-full w-full grid-cols-2 gap-1">
          <Comp label="High" val={high} Logo={SiChartmogul} />
          <Comp label="Low" val={low} Logo={SiChartmogul} />
          <Comp label="Open" val={open} Logo={SiChartmogul} />
          <Comp label="Close" val={close} Logo={SiChartmogul} />
        </div>
      )}
    </motion.div>
  );
}

function Comp({ label, val, Logo }: { label: string; val: string; Logo: IconType }) {
  return (
    <div
      className={cn(
        // "flex flex-col items-start justify-center rounded-lg p-2 text-[10px] text-[var(--secondarytext)]",
        "flex flex-col items-start justify-center gap-2 rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 xl:p-1.5 2xl:p-1.5",
        "border border-[var(--cardborder)]"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1">
          <Logo size={15} />
          {label}
        </span>
      </div>
      {/* <span className="text-base font-light text-[var(--primarytext)] md:text-lg"> */}
      {/* <span className="font-mdeium text-base text-[var(--primarytext)] 2xl:text-lg">{val}</span> */}
      <span className="text-sm font-light text-[var(--primarytext)]">{val}</span>
    </div>
  );
}
export default Stats;
