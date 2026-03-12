import axios from "axios";
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { cn } from "../lib/utils";
import { TbSum } from "react-icons/tb";
import { IconType } from "react-icons";
import { IoStatsChartSharp } from "react-icons/io5";
import { SiChartmogul } from "react-icons/si";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { useCurrentCryptoId, useMACD } from "../lib/zustand";
type BinanceKline = [
  number, // Open time (ms since epoch)
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Close time (ms since epoch)
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Unused field
];

function Indicators() {
  const { cryptoData } = useCurrentCryptoId();
  const [smaTimeFrame, setSmaTimeFrame] = useState(55);
  const [emaPeriod, setEmaPeriod] = useState(55);
  const { setMACDClosePrices } = useMACD();

  const { data, isLoading } = useQuery({
    queryKey: ["indicators", cryptoData?.symbol],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${cryptoData?.symbol.toUpperCase()}USDT&interval=1h&limit=200`
      );
      return res.data;
    },
  });

  const closePrices = useMemo(() => {
    return data?.map((d: BinanceKline) => parseFloat(d[4])) ?? [];
  }, [data]);

  useEffect(() => {
    if (closePrices.length === 0) return;
    setMACDClosePrices(closePrices);
  }, [closePrices, setMACDClosePrices]);

  const calcVolume = useMemo(() => {
    if (!data) return "N/A";
    const vol = Number(data?.at(-1)[5]) / 1000;
    if (vol > 999) {
      return `${(vol / 1000).toFixed(2)}M`;
    }
    return `${vol.toFixed(2)}K`;
  }, [data]);

  const rsi = useMemo(() => {
    if (closePrices.length === 0) return "N/A";
    const changes = [];
    for (let i = 1; i < closePrices?.length; i++) {
      changes.push(closePrices[i] - closePrices[i - 1]);
    }

    const gains = changes.map(change => (change > 0 ? change : 0));
    const losses = changes.map(change => (change < 0 ? Math.abs(change) : 0));

    const period = 14;

    let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
    let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

    let rs = avgGain / avgLoss;
    let rsi = 100 - 100 / (1 + rs);

    // Smooth RSI over remaining candles
    for (let i = period; i < gains.length; i++) {
      const gain = gains[i];
      const loss = losses[i];

      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;

      rs = avgGain / avgLoss;
      rsi = 100 - 100 / (1 + rs);
    }

    return rsi.toFixed(2);
  }, [closePrices]);

  const ema = useMemo(() => {
    if (closePrices.length === 0) return "N/A";
    const k = 2 / (emaPeriod + 1); // smoothing factor
    let ema = closePrices[0];
    for (let i = 1; i < closePrices?.length; i++) {
      ema = closePrices[i] * k + ema * (1 - k);
    }
    return ema.toFixed(2);
  }, [closePrices, emaPeriod]);

  const sma = useMemo(() => {
    if (closePrices.length === 0) return "N/A";
    const latest100 = closePrices.slice(-smaTimeFrame);
    const sma = latest100.reduce((a: number, b: number) => a + b, 0) / smaTimeFrame;
    return sma.toFixed(2);
  }, [closePrices, smaTimeFrame]);

  return (
    <motion.div className={cn("flex h-full w-full flex-col gap-1 rounded-lg")}>
      {/* <span className="font:medium text-sm text-[var(--secondarytext)] md:text-xs md:font-semibold 2xl:text-sm">
        Indicators
      </span> */}
      {isLoading ? (
        <div className="flex h-30 w-full items-center justify-center rounded-lg border border-[var(--cardborder)]">
          <Spinner showPrice={true} />
        </div>
      ) : (
        <div className="grid h-full w-full grid-cols-2 gap-1 rounded-md">
          <Indicator label={"RSI"} val={rsi} Logo={SiChartmogul} />
          <Indicator
            label={"EMA"}
            val={ema as string}
            Logo={TbSum}
            timeFrame={emaPeriod}
            timeFrameSelector={setEmaPeriod}
          />

          <Indicator
            label={"SMA"}
            val={sma}
            Logo={TbSum}
            timeFrame={smaTimeFrame}
            timeFrameSelector={setSmaTimeFrame}
          />
          <Indicator label={"Volume"} val={calcVolume} Logo={IoStatsChartSharp} />
        </div>
      )}
    </motion.div>
  );
}

function Indicator({
  label,
  val,
  Logo,
  timeFrame,
  timeFrameSelector,
}: {
  label: string;
  val: string | number;
  Logo: IconType;
  timeFrame?: number;
  timeFrameSelector?: React.Dispatch<SetStateAction<number>>;
}) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-start justify-center gap-2 rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 xl:p-1.5 2xl:p-1",
        "border border-[var(--cardborder)]"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1">
          <Logo size={15} />
          {label}
        </span>
        {label === "EMA" || label === "SMA" ? (
          <div>
            <select
              className="w-12 outline-none"
              onChange={e => timeFrameSelector?.(Number(e.target.value))}
              value={timeFrame}
            >
              <option className="bg-rose-500 text-green-500" value={21}>
                21 d
              </option>
              <option className="bg-rose-500 text-green-500" value={55}>
                55 d
              </option>
              <option className="bg-rose-500 text-green-500" value={100}>
                100 d
              </option>
              <option className="bg-rose-500 text-green-500" value={200}>
                200 d
              </option>
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* <span className="text-base font-medium text-[var(--primarytext)] 2xl:text-lg">{val}</span> */}
      <span className="text-sm font-light text-[var(--primarytext)]">{val}</span>
    </motion.div>
  );
}

export default Indicators;
