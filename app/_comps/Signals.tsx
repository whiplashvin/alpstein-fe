import { cn } from "../lib/utils";
import { CryptoData, useCurrentCryptoId, useTogglePosition } from "../lib/zustand";
import { motion } from "motion/react";
import { FiTrendingUp } from "react-icons/fi";
import { FiTrendingDown } from "react-icons/fi";
import { IoRibbonSharp } from "react-icons/io5";
import { GrMoney } from "react-icons/gr";
import { MdOutlineAnchor } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";

const parentVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// const childVariant = {
//   hidden: { opacity: 0, y: -10 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   },
// };
function Signals({ includeHeading }: { includeHeading: boolean }) {
  const { cryptoData } = useCurrentCryptoId();
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={parentVariant}
      // key={`${currentCryptoId}-${positionDisplayed}`}
      className={cn("group relative flex w-full flex-col gap-1 rounded-lg opacity-80")}
    >
      {includeHeading && (
        <span className="font:medium text-sm text-[var(--secondarytext)] md:text-xs md:font-semibold 2xl:text-sm">
          Agent&apos;s opinion
        </span>
      )}
      <Card cryptoData={cryptoData!} />
    </motion.div>
  );
}

function Card({ cryptoData: d }: { cryptoData: CryptoData }) {
  const { positionDisplayed, togglePosition } = useTogglePosition();
  function timeFormatter() {
    const date = new Date(d!.createdat).toLocaleString().split(",");
    const formattedTime = `${date[1]?.split(":")[0]}:${date[1]?.split(":")[1]}`;
    return formattedTime;
  }
  function dateFormatter() {
    const date = new Date(d!.createdat).toLocaleString().split(",");
    const formattedDate = `${date[0]?.split("/")[0]}/${date[0]?.split("/")[1]}`;
    return formattedDate;
  }
  function calcLongRR() {
    const profit = d!.takeprofit;
    const buyPrice = d!.buyprice;
    const stopLoss = d!.stoploss;

    const rr = (profit - buyPrice) / (buyPrice - stopLoss);
    return Math.round(rr * 10) / 10;
  }

  function calcShortRR() {
    const profit = d!.shortcoverprofit;
    const sellPrice = d!.sellprice;
    const stopLoss = d!.shortcoverloss;

    const risk = stopLoss - sellPrice;
    const reward = sellPrice - profit;

    const rr = reward / risk;
    return Math.round(rr * 10) / 10;
  }
  return (
    <div className={cn("grid h-full w-full grid-cols-3 gap-1 rounded-md md:grid-cols-2")}>
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-2 rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 2xl:p-2",
          "border border-[var(--cardborder)]"
        )}
      >
        <div className="flex w-full items-center justify-between">
          <span>Position</span>
          {d.position === "unclear" && positionDisplayed === "long" && (
            <button
              className="cursor-pointer rounded bg-red-400 p-0.5 text-black"
              onClick={() => togglePosition("short")}
            >
              view short
            </button>
          )}
          {d.position === "unclear" && positionDisplayed === "short" && (
            <button
              className="cursor-pointer rounded bg-green-400 p-0.5 text-black"
              onClick={() => togglePosition("long")}
            >
              view long
            </button>
          )}
        </div>
        {/* <span className="text-base font-medium text-[var(--primarytext)] xl:text-lg"> */}
        <span className="text-sm font-light text-[var(--primarytext)]">{d.position}</span>
      </div>
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-2 rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 2xl:p-2",
          "border border-[var(--cardborder)]"
        )}
      >
        <span className="flex items-center gap-1">
          {(d.position === "long" || d.position === "unclear") && positionDisplayed === "long" ? (
            <FiTrendingUp size={15} className="" />
          ) : (
            <FiTrendingDown size={15} className="" />
          )}
          {(d.position === "long" || d.position === "unclear") && positionDisplayed === "long"
            ? "Buy"
            : "Sell"}
        </span>
        {/* <span className="text-base font-medium text-[var(--primarytext)] xl:text-lg"> */}
        <span className="text-sm font-light text-[var(--primarytext)]">
          {(d.position === "long" || d.position === "unclear") && positionDisplayed === "long"
            ? d.buyprice
            : d.sellprice}
        </span>
      </div>
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-2 rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 2xl:p-2",
          "border border-[var(--cardborder)]"
        )}
      >
        <span className="flex items-center gap-1">
          <GrMoney size={15} className="" />
          Take Profit
        </span>
        {/* <span className="text-base font-medium text-[var(--primarytext)] xl:text-lg"> */}
        <span className="text-sm font-light text-[var(--primarytext)]">
          {(d.position === "long" || d.position === "unclear") && positionDisplayed === "long"
            ? d.takeprofit
            : d.shortcoverprofit}
        </span>
      </div>
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-2 rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 2xl:p-2",
          "border border-[var(--cardborder)]"
        )}
      >
        <span className="flex items-center gap-1">
          <MdOutlineAnchor size={15} className="" />
          Stop Loss
        </span>
        {/* <span className="text-base font-medium text-[var(--primarytext)] xl:text-lg"> */}
        <span className="text-sm font-light text-[var(--primarytext)]">
          {(d.position === "long" || d.position === "unclear") && positionDisplayed === "long"
            ? d.stoploss
            : d.shortcoverloss}
        </span>
      </div>
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-2 rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 2xl:p-2",
          "border border-[var(--cardborder)]"
        )}
      >
        <span className="flex items-center gap-1">
          <IoRibbonSharp size={15} className="" />
          Risk/Reward
        </span>
        {/* <span className="text-base text-[var(--primarytext)] md:font-medium xl:text-lg"> */}
        <span className="text-sm font-light text-[var(--primarytext)]">
          {/* {d.position === "long" ? `1:${calcLongRR()}` : `1:${calcShortRR()}`} */}
          {(d.position === "long" || d.position === "unclear") && positionDisplayed === "long"
            ? `1:${calcLongRR()}`
            : `1:${calcShortRR()}`}
        </span>
      </div>
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-1 gap-2 rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 xl:p-1.5 2xl:p-2",
          "border border-[var(--cardborder)]"
        )}
      >
        <div className="flex w-full items-center justify-between">
          <span className="flex items-center gap-1">
            <IoIosTimer size={15} className="" />
            Created
          </span>
          <span>dd/mm</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="flex items-start gap-1 text-sm font-light text-[var(--primarytext)]">
            {timeFormatter()}
            <span className="text-[8px] font-light text-[var(--secondarytext)] md:font-medium">
              IST
            </span>
          </span>
          <span className="text-xs font-medium text-[var(--secondarytext)] md:text-sm">
            {dateFormatter()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signals;
