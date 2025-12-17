"use client";
import Spinner from "@/app/_comps/Spinner";
import { cn } from "@/app/lib/utils";
import { CryptoData, useCurrentCryptoId } from "@/app/lib/zustand";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import TradeReview from "@/app/_comps/TradeReview";

function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { setCryptoData } = useCurrentCryptoId();
  const { isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/crypto/${id}`, {
        withCredentials: true,
      });

      setCryptoData(res.data.data[1].about as string, res.data.data[0] as CryptoData);
      return res.data.data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center text-[var(--secondarytext)]">
          <Spinner showPrice={true} />
        </div>
      ) : (
        <div
          className={cn(
            "mx-auto mt-5 max-w-[1440px] grid-cols-[auto_1fr_auto] gap-4 md:mt-0 md:grid",
            "flex items-center justify-center",
            "h-screen bg-[var(--background)]",
            "max-w-7xl",
            "justify-between gap-4 p-2 lg:p-0",
            "3xl:max-h-[calc(1000px-100px)]"
          )}
        >
          <div
            className="hidden h-full w-10 border-x border-[var(--cardborder)]/40 bg-fixed lg:block"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
              backgroundSize: "10px 10px",
            }}
          ></div>
          <TradeReview />
          <div
            className="hidden h-full w-10 border-x border-[var(--cardborder)]/40 bg-fixed lg:block"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
              backgroundSize: "10px 10px",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Page;

{
}
