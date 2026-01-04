"use client";
import { CandlestickSeries, createChart, UTCTimestamp } from "lightweight-charts";
import type { DeepPartial, TimeChartOptions } from "lightweight-charts"; // or your chart lib
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import axios from "axios";
import {
  useChart,
  useCurrentCryptoId,
  useTogglePosition,
  useTVAreaModal,
  useTVCandleModal,
} from "../lib/zustand";
import { IoIosExpand } from "react-icons/io";
import { IoIosContract } from "react-icons/io";
import { MdAreaChart } from "react-icons/md";

type BinanceKline = [
  number, // Open time (ms)
  string, // Open
  string, // High
  string, // Low
  string, // Close
  string, // Volume
  number, // Close time (ms)
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Ignore
];

type Candle = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

function TVCandleStick() {
  const { cryptoData } = useCurrentCryptoId();
  const container = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<Candle[]>([]);
  const { showCandleModal, toggleCandleShowModal } = useTVCandleModal();
  const { toggleAreaShowModal } = useTVAreaModal();
  const { toggleCurrChart } = useChart();
  const { positionDisplayed } = useTogglePosition();
  // const [markers, setMarkers] = useState("#ccc");
  const markers = "#ccc";
  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${cryptoData?.symbol}USDT&interval=4h&limit=500`
      );
      const formattedData: Candle[] = res.data.map((d: BinanceKline) => ({
        time: Math.floor(d[0] / 1000) as UTCTimestamp, // Binance gives ms
        open: Number(d[1]),
        high: Number(d[2]),
        low: Number(d[3]),
        close: Number(d[4]),
      }));
      setData(formattedData);
    }
    getData();
  }, [cryptoData]);

  useEffect(() => {
    if (!container.current) return;
    if (data.length === 0) return;

    const chartOptions: DeepPartial<TimeChartOptions> = {
      width: container.current.clientWidth,
      height: container.current.clientHeight,
      layout: {
        background: { color: "transparent" },
        // textColor: "#ccc",
        textColor: "#71717b",
        fontSize: showCandleModal ? 12 : 8,
      },
      grid: {
        vertLines: { color: "rgba(197, 203, 206, 0.1)", visible: false },
        horzLines: { color: "rgba(197, 203, 206, 0.1)", visible: false },
      },
      crosshair: {
        mode: 0,
      },
    };

    const chart = createChart(container.current, chartOptions);
    const candlestickSeries = chart.addSeries(CandlestickSeries);
    candlestickSeries.setData(data);

    candlestickSeries.createPriceLine({
      price: positionDisplayed === "short" ? cryptoData?.sellprice || 0 : cryptoData?.buyprice || 0,
      // color: "#3f3f46",
      // color: "#ffb900",
      color: markers,
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      // title: positionDisplayed === "short" || position === "short" ? "sell at" : "buy at",
      title: positionDisplayed === "short" ? "sell at" : "buy at",
    });
    candlestickSeries.createPriceLine({
      price:
        positionDisplayed === "short"
          ? cryptoData?.shortcoverprofit || 0
          : cryptoData?.takeprofit || 0,
      // color: "#3f3f46",
      // color: "#05df72",
      color: markers,
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "take profit",
    });
    candlestickSeries.createPriceLine({
      price:
        positionDisplayed === "short" ? cryptoData?.shortcoverloss || 0 : cryptoData?.stoploss || 0,
      // color: "#3f3f46",
      // color: "#ff6467",
      color: markers,
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "stop loss",
    });

    const handleResize = () => {
      if (container.current) {
        chart.applyOptions({
          width: container.current.clientWidth,
          height: container.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, showCandleModal, markers, positionDisplayed, cryptoData]);

  return (
    <div className={cn("relative h-full w-full pb-5")}>
      <div
        ref={container}
        className={cn(
          "h-full w-full",
          "mask-t-from-98% mask-r-from-99% mask-b-from-98% mask-l-from-99%"
        )}
      />
      <div className="absolute right-1 bottom-1 flex items-center gap-2">
        <button
          onClick={() => toggleCurrChart("area")}
          className="flex max-w-22 min-w-22 cursor-pointer items-center gap-1 rounded px-0.5 text-xl text-[var(--secondarytext)]"
        >
          <MdAreaChart />
          <span className="text-[10px]">Area Chart</span>
        </button>
        <div className="hidden lg:block">
          {showCandleModal ? (
            <button
              onClick={() => {
                toggleCandleShowModal(false);
                toggleAreaShowModal(false);
              }}
              className="text-md cursor-pointer text-[var(--secondarytext)]"
            >
              <IoIosContract />
            </button>
          ) : (
            <button
              onClick={() => {
                toggleCandleShowModal(true);
                toggleAreaShowModal(true);
              }}
              className="text-md cursor-pointer text-[var(--secondarytext)]"
            >
              <IoIosExpand />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TVCandleStick;
