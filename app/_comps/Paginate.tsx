"use client";

import axios from "axios";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { useAllCryptos, usePaginate } from "../lib/zustand";

function Paginate() {
  const { setAllCryptos } = useAllCryptos();
  const {
    Limit,
    HasPrevPage,
    HasNextPage,
    LastSeenId,
    LastSeenTimeStamp,
    setCursor,
    FirstSeenTimeStamp,
    FirstSeenId,
  } = usePaginate();
  return (
    <div className={`flex h-10 w-full items-center justify-center gap-4`}>
      {HasPrevPage && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-full p-1 text-[var(--primarytext)] hover:border hover:border-[var(--secondarytext)]"
          onClick={async () => {
            const res = await axios.get(
              `https://api.alpstein.tech/api/v1/live-cryptos?action=prev&limit=${Limit}&last_seen=${FirstSeenTimeStamp}|${FirstSeenId}`,
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
            console.log(res.data.metadata);
          }}
        >
          <GoChevronLeft size={25} className="" />
        </button>
      )}
      {HasNextPage && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-full p-1 text-[var(--primarytext)] hover:border hover:border-[var(--secondarytext)]"
          onClick={async () => {
            const res = await axios.get(
              `https://api.alpstein.tech/api/v1/live-cryptos?action=next&limit=${Limit}&last_seen=${LastSeenTimeStamp}|${LastSeenId}`,
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
            console.log(res.data.metadata);
          }}
        >
          <GoChevronRight size={25} className="" />
        </button>
      )}
    </div>
  );
}

export default Paginate;
