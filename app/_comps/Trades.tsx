"use client";
import axios from "axios";
import Image from "next/image";
import { cn } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CryptoData, useAllTrades, useTradePaginate } from "../lib/zustand";
import Spinner from "../_comps/Spinner";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

function Trades() {
  const { allTrades, setAllTrades } = useAllTrades();
  const ref = useRef<HTMLDivElement | null>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { HasNextPage, LastSeenId, LastSeenTimeStamp, setCursor } = useTradePaginate();
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["finished_trades"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exec-cryptos?limit=${20}`, {
        withCredentials: true,
      });

      setAllTrades(res.data.data);
      setCursor(
        res.data.metadata.hasPrevPage,
        res.data.metadata.hasNextPage,
        res.data.metadata.lastSeenId,
        res.data.metadata.lastSeenTime,
        res.data.metadata.firstSeenId,
        res.data.metadata.firstSeenTime
      );
      return res.data.data;
    },
  });

  const fetchMore = useCallback(async () => {
    setLoadingMore(true);
    const res = await axios.get(
      `https://api.alpstein.tech/api/v1/exec-cryptos?action=next&limit=${10}&last_seen=${LastSeenTimeStamp}|${LastSeenId}`,
      {
        withCredentials: true,
      }
    );
    const newArr = [...allTrades, ...res.data.data];
    setAllTrades(newArr);
    setCursor(
      res.data.metadata.hasPrevPage,
      res.data.metadata.hasNextPage,
      res.data.metadata.lastSeenId,
      res.data.metadata.lastSeenTime,
      res.data.metadata.firstSeenId,
      res.data.metadata.firstSeenTime
    );
    setLoadingMore(false);
  }, [LastSeenTimeStamp, LastSeenId, setAllTrades, setCursor, allTrades]);

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    let lastScrollTop = container?.scrollTop;
    console.log(container.scrollTop, container.clientHeight, container.scrollHeight);
    function handleScroll() {
      console.log("Scrolling...");
      if (debounceTimeout.current != null) {
        console.log("Debounced");
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = container;
      console.log(scrollTop, scrollHeight, clientHeight);
      const isScrollingDown = scrollTop > lastScrollTop;

      if (isScrollingDown) {
        const progress = Math.floor((scrollTop / (scrollHeight - clientHeight)) * 100);
        if (progress >= 97 && HasNextPage) {
          console.log("Fetching more...");

          debounceTimeout.current = setTimeout(() => {
            fetchMore();
            clearTimeout(debounceTimeout.current!);
            debounceTimeout.current = null;
          }, 500);
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchMore, HasNextPage]);

  return (
    <div
      className={cn(
        "relative mx-auto flex h-screen",
        // "max-w-[1440px]",
        "max-w-7xl",
        "justify-between gap-4 p-2 lg:p-0",
        "3xl:max-h-[calc(1000px-100px)]"
      )}
    >
      <div
        className="hidden h-full min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
        style={{
          backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
          backgroundSize: "10px 10px",
        }}
      ></div>

      <div
        ref={ref}
        className={cn(
          "my-14 flex h-[calc(100vh-120px)] w-full",
          "flex-col overflow-y-scroll lg:my-0 lg:mt-20 lg:pb-5",
          "3xl:max-h-[calc(1000px-100px)]"
        )}
      >
        {isLoading && (
          <div className="flex h-screen w-full items-center justify-center lg:mt-0">
            <Spinner showPrice={true} />
          </div>
        )}
        {data && (
          <>
            <div
              className={`sticky top-0 left-0 grid w-full grid-cols-6 gap-1 rounded bg-indigo-200 p-2 text-[9px] font-medium text-zinc-700 md:gap-4 md:p-4 md:text-sm 2xl:p-1`}
            >
              <div className="flex items-center justify-center gap-1 pl-1 md:pl-6">
                <span>Coin</span>
              </div>
              <div className={`0 flex items-center justify-center gap-1 lg:gap-2`}>Review</div>
              <div className={`flex items-center justify-center gap-1 lg:gap-2`}>Status</div>
              <div className="flex items-center justify-center">Position</div>
              <div className="flex items-center justify-center">Triggerd at</div>
              <div className="flex items-center justify-center">Closure at</div>
            </div>

            {allTrades.map((d: CryptoData, index: number) => (
              <Comp
                dataLength={allTrades.length}
                index={index}
                key={d.id}
                id={d.id}
                symbol={d.symbol}
                status={d.status}
                position={d.triggeredposition}
                trigTime={d.triggeredat}
                closeTime={d.closureat}
              />
            ))}
            {loadingMore && (
              <div className="flex w-full justify-center p-1">
                <Spinner showPrice={false} />
              </div>
            )}
          </>
        )}
      </div>

      <div
        className="hidden h-full min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
        style={{
          backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
          backgroundSize: "10px 10px",
        }}
      ></div>
      {/* {loadingMore && (
        <div className="absolute bottom-14 left-0 my-5 flex w-full justify-center bg-lime-500 p-1 lg:bottom-2">
          <Spinner showPrice={false} />
        </div>
      )} */}
    </div>
  );
}

export default Trades;

function Comp({
  dataLength,
  index,
  id,
  symbol,
  status,
  position,
  trigTime,
  closeTime,
}: {
  dataLength: number;
  index: number;
  id: string;
  symbol: string;
  status: string;
  position: string;
  trigTime: number;
  closeTime: number;
}) {
  const router = useRouter();
  function timeFormat(time: number) {
    const t = new Date(time).toLocaleString().split(",");
    const formattedTime = `${t[1].split(":")[0]}:${t[1].split(":")[1]}`;
    return formattedTime;
  }
  function dateFormatter(time: number) {
    const date = new Date(time).toLocaleString().split(",");
    const formattedDate = `${date[0].split("/")[0]}/${date[0].split("/")[1]}`;
    return formattedDate;
  }
  return (
    <div
      className={`grid grid-cols-6 px-0 py-3 text-[9px] font-light text-[var(--secondarytext)] md:gap-4 md:p-4 md:text-xs 2xl:p-5 ${dataLength - 1 !== index ? "border-b-[0.5px] border-neutral-700/50" : ""} `}
    >
      <div className="flex items-center justify-center gap-1 pl-3 md:pl-6">
        <span>{index + 1}.</span>
        <Image height={20} width={20} src={`/${symbol}.png`} alt="crypto-image" />
        <span className="hidden text-[8px] md:block md:text-xs">{symbol}</span>
      </div>
      <div className="flex w-full items-center justify-center">
        <button
          className="flex w-fit cursor-pointer items-center justify-center rounded-full px-2 text-sky-600 md:bg-sky-700/20 md:hover:text-indigo-600 lg:font-medium"
          onClick={() => router.replace(`/trades/${id}`)}
        >
          review
        </button>
      </div>
      <div className={`flex items-center justify-center gap-1 lg:gap-2`}>
        <span
          className={`size-1 rounded-full md:size-2 ${status === "sl_hit" ? "bg-red-500" : "bg-green-500"}`}
        ></span>
        {status}
      </div>
      <div className="flex items-center justify-center">{position}</div>
      <div className="flex items-center justify-center text-[8px] md:text-xs">{`${timeFormat(trigTime)}|${dateFormatter(trigTime)}`}</div>
      <div className="flex items-center justify-center text-[8px] md:text-xs">{`${timeFormat(closeTime)}|${dateFormatter(closeTime)}`}</div>
    </div>
  );
}
