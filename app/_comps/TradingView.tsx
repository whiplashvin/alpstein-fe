import axios from "axios";
import { createChart, AreaSeries, ColorType, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import type { DeepPartial, TimeChartOptions } from "lightweight-charts"; // or your chart lib
import {
  useChart,
  useCurrentCryptoId,
  useTogglePosition,
  useTVAreaModal,
  useTVCandleModal,
} from "../lib/zustand";
import { IoIosContract, IoIosExpand } from "react-icons/io";
// import { BiCandles } from "react-icons/bi";
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

type KL = {
  time: UTCTimestamp;
  value: number;
};

function TW() {
  const container = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<KL[]>([]);
  const rootStyles = getComputedStyle(document.documentElement);
  const { cryptoData } = useCurrentCryptoId();
  const defaultBorder = rootStyles.getPropertyValue("--background").trim();
  const defaultGrid = rootStyles.getPropertyValue("--graphgrid").trim();
  const defaultTvTop = rootStyles.getPropertyValue("--tvtop").trim();
  const defaultTvBot = rootStyles.getPropertyValue("--tvbottom").trim();
  // const [background, setBackground] = useState("#f4f4f5");
  const [background, setBackground] = useState("#e7e5e4");
  // const [grid, setGrid] = useState("#e4e4e7");
  const [grid, setGrid] = useState("#d4d4d8");
  const [tvtop, setTvtop] = useState("#51a2ff");
  const [tvbot, setTvbot] = useState("#fff");
  const [markers, setMarkers] = useState("#ccc");
  const { positionDisplayed } = useTogglePosition();
  const { showAreaModal, toggleAreaShowModal } = useTVAreaModal();
  const { toggleCandleShowModal } = useTVCandleModal();
  const { toggleCurrChart } = useChart();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${cryptoData?.symbol.toUpperCase()}USDT&interval=4h&limit=500`
      );
      const newData = res.data.map((d: BinanceKline) => ({
        time: Math.floor(d[0] / 1000),
        value: Number(d[4]),
      }));
      setData(newData);
    }
    getData();
  }, [cryptoData?.symbol]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        setBackground("#01030c");
        setGrid("#18181b");
        setTvtop("#2962ff");
        setTvbot("#d4d4d8");
        setMarkers("#ccc");
      } else {
        // setBackground("#f4f4f5");
        setBackground("#e7e5e4");
        // setGrid("#e4e4e7");
        setGrid("#d4d4d8");
        setTvtop("#51a2ff");
        setTvbot("#fff");
        setMarkers("000");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    if (document.documentElement.classList.contains("dark")) {
      setBackground(defaultBorder);
      setGrid(defaultGrid);
      setTvtop(defaultTvTop);
      setTvbot(defaultTvBot);
    }
    if (data.length > 0 && container.current) {
      container.current.innerHTML = "";
      const chartOptions: DeepPartial<TimeChartOptions> = {
        layout: {
          textColor: "#71717b",
          fontSize: showAreaModal ? 10 : 8,
          background: {
            type: ColorType.Solid,
            color: "transparent",
          },
        },
        grid: {
          // vertLines: { color: grid, visible: false },
          vertLines: { color: "rgba(197, 203, 206, 0.1)", visible: false },
          // horzLines: { color: grid, visible: true },
          horzLines: { color: "rgba(197, 203, 206, 0.1)", visible: false },
        },
        crosshair: {
          // vertLine: {
          //   color: "#2962FF",
          //   style: 2,
          //   width: 1,
          //   visible: true,
          //   labelVisible: true,
          // },
          // horzLine: {
          //   color: "#2962FF",
          //   style: 2, // Dashed
          //   width: 1,
          //   visible: true,
          //   labelVisible: true,
          // },
          mode: 0,
        },
      };
      const chart = createChart(container.current, chartOptions);
      const areaSeries = chart.addSeries(AreaSeries, {
        lineColor: tvtop,
        lineVisible: true,
        lineWidth: 2,
        topColor: "oklch(58.5% 0.233 277.117)",
        // topColor: "#555",
        // bottomColor: "oklch(87% 0.065 274.039)",
        bottomColor: "transparent",
        // bottomColor: tvbot,
        // bottomColor: "#aaa",
        relativeGradient: true,
        lastPriceAnimation: 1,
      });

      areaSeries.setData(data);

      areaSeries.createPriceLine({
        // price: positionDisplayed === "short" && position === "short" ? sellPrice : buyPrice,
        price:
          positionDisplayed === "short" ? cryptoData?.sellprice || 0 : cryptoData?.buyprice || 0,
        // color: "#3f3f46",
        // color: "#ffb900",
        color: markers,
        lineWidth: 1,
        lineStyle: 2,
        axisLabelVisible: true,
        // title: positionDisplayed === "short" || position === "short" ? "sell at" : "buy at",
        title: positionDisplayed === "short" ? "sell at" : "buy at",
      });
      areaSeries.createPriceLine({
        // price: positionDisplayed === "short" && position === "short" ? coverProfit : takeProfit,
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
      areaSeries.createPriceLine({
        // price: positionDisplayed === "short" && position === "short" ? coverLoss : stopLoss,
        price:
          positionDisplayed === "short"
            ? cryptoData?.shortcoverloss || 0
            : cryptoData?.stoploss || 0,
        // color: "#3f3f46",
        // color: "#ff6467",
        color: markers,
        lineWidth: 1,
        lineStyle: 2,
        axisLabelVisible: true,
        title: "stop loss",
      });

      // const targetPrice =
      //   // positionDisplayed === "short" || position === "short" ? sellPrice : buyPrice;
      //   positionDisplayed === "short" ? sellPrice : buyPrice;

      // const priceRange = targetPrice * 0.04; // 2% up/down
      // chart.priceScale("right").setVisibleRange({
      //   from: targetPrice - priceRange,
      //   to: targetPrice + priceRange,
      // });
    }
    return () => observer.disconnect();
  }, [
    data,
    defaultBorder,
    background,
    grid,
    defaultGrid,
    tvtop,
    tvbot,
    defaultTvTop,
    defaultTvBot,
    positionDisplayed,
    markers,
    showAreaModal,
    cryptoData,
  ]);
  return (
    <motion.div
      key={`${cryptoData?.id}-${positionDisplayed}`}
      className={cn(`relative h-full w-full pb-5`)}
    >
      <div
        ref={container}
        className={cn(
          "h-full w-full",
          "mask-t-from-98% mask-r-from-99% mask-b-from-98% mask-l-from-99%"
        )}
      ></div>

      <div className="absolute right-1 bottom-1 flex items-center gap-2">
        <button
          onClick={() => toggleCurrChart("candle")}
          className="flex max-w-22 min-w-22 cursor-pointer items-center gap-1 rounded px-0.5 text-xl text-[var(--secondarytext)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chart-candle"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M6 4l0 2" />
            <path d="M6 11l0 9" />
            <path d="M10 14m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M12 4l0 10" />
            <path d="M12 19l0 1" />
            <path d="M16 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M18 4l0 1" />
            <path d="M18 11l0 9" />
          </svg>
          <span className="text-[10px]">Candlestick</span>
        </button>
        <div className="hidden lg:block">
          {showAreaModal ? (
            <button
              onClick={() => {
                toggleAreaShowModal(false);
                toggleCandleShowModal(false);
              }}
              className="text-md cursor-pointer text-[var(--secondarytext)]"
            >
              <IoIosContract />
            </button>
          ) : (
            <button
              onClick={() => {
                toggleAreaShowModal(true);
                toggleCandleShowModal(true);
              }}
              className="text-md cursor-pointer text-[var(--secondarytext)]"
            >
              <IoIosExpand />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TW;
