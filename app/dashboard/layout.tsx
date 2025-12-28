"use client";
import axios from "axios";
import { cn } from "../lib/utils";
import React from "react";
// import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import AllCryptosSkeleton from "../_skeletons/AllCryptosSkeleton";
import { useAllCryptos, usePaginate, useToggleSidebar } from "../lib/zustand";
// import Paginate from "../_comps/Paginate";
import Sidebar from "../_comps/Sidebar";
import AllCryptos from "../_comps/AllCryptos";
import Paginate from "../_comps/Paginate";

function Layout({ children }: { children: React.ReactNode }) {
  // const AllCryptos = dynamic(() => import("../_comps/AllCryptos"), {
  //   ssr: false,
  // });
  const { Limit, setCursor } = usePaginate();
  const { setAllCryptos } = useAllCryptos();
  const { showSidebar } = useToggleSidebar();
  const { isLoading } = useQuery({
    queryKey: ["cryptos"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/live-cryptos?limit=${Limit}`,
        {
          withCredentials: true,
        }
      );

      setAllCryptos(res.data.data);
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
  return (
    <div
      id="dashboard-root"
      className={cn(
        "relative flex h-screen w-full gap-0 overflow-hidden lg:grid lg:grid-cols-[1.5fr_6fr]",
        "bg-[var(--background)]",
        "mx-auto max-w-7xl border-x border-[var(--cardborder)]/50"
        // "md:bg-gradient-to-tl md:from-transparent md:from-20% md:via-slate-600/20 md:via-50% md:to-transparent md:to-80%"
      )}
      style={{
        userSelect: "none",
      }}
    >
      {showSidebar && <Sidebar />}
      {/* <div className="absolute top-12 left-0 hidden h-[0.5px] w-full bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% lg:block 2xl:top-18"></div> */}
      {/* <div className="absolute top-12 left-0 hidden h-[0.5px] w-full bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% lg:block 2xl:top-14"></div> */}
      <div className="flex hidden w-full justify-center p-2 lg:block">
        {isLoading ? (
          <AllCryptosSkeleton />
        ) : (
          <div className="3xl:h-[calc(1000px-100px)] relative flex flex-col justify-between overflow-scroll pb-3 md:h-[calc(100vh-114px)] lg:mt-14 lg:h-[calc(100vh-72px)] 2xl:mt-16">
            <AllCryptos />
            <Paginate />
            <div className="absolute top-0 -right-2 z-10 hidden h-full w-[0.5px] bg-gradient-to-t from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% md:block 2xl:max-h-[calc(1000px-56px)]"></div>
          </div>
        )}
      </div>
      <main className={cn("h-full w-full px-2")}>{children}</main>
    </div>
  );
}

export default Layout;
