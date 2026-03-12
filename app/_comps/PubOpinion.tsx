import { IconType } from "react-icons";
import { cn } from "../lib/utils";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { useCurrentCryptoId } from "../lib/zustand";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

function PubOpinion() {
  const [voteCasted, setVoteCasted] = useState(false);
  const [upSelect, setUpSelect] = useState<boolean>(false);
  const [downSelect, setDownSelect] = useState<boolean>(false);
  const [upvote, setUpvote] = useState<number | null>(null);
  const [downvote, setDownvote] = useState<number | null>(0);
  const [message, setMessage] = useState("*You can cast your vote just once.");
  const { currentCryptoId } = useCurrentCryptoId();

  const { data, isLoading } = useQuery({
    queryKey: ["votes"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/votes/${currentCryptoId}`, {
        withCredentials: true,
      });
      return res.data.data;
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      setUpvote(data[0]);
      setDownvote(data[1]);
      switch (data[2]) {
        case "up":
          setUpSelect(true);
          setVoteCasted(true);
          setMessage("You've already casted your vote");
          break;
        case "down":
          setDownSelect(true);
          setVoteCasted(true);
          setMessage("You've already casted you vote");
          break;
        case "":
          setVoteCasted(false);
          break;
        default:
          break;
      }
      return () => {
        setUpSelect(false);
        setDownSelect(false);
        setVoteCasted(false);
        // setMessage("*You can cast your vote just once.");
      };
    }
  }, [data, isLoading]);

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3 rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:gap-2 md:p-1 xl:p-1.5 2xl:gap-3 2xl:p-3",
        "border border-[var(--cardborder)]"
      )}
    >
      <span className="text-sm font-semibold text-[var(--secondarytext)]">Public Opinion</span>
      <div className="flex w-full items-center justify-between gap-3 px-10">
        <Comp
          label="UpVote"
          val={upvote as number}
          Logo={FaThumbsUp}
          clickHandleUp={setUpSelect}
          clickHandleDown={setDownSelect}
          upActive={upSelect}
          downActive={downSelect}
          setVoteCasted={setVoteCasted}
          voteCasted={voteCasted}
          setterFunc={setUpvote}
          voteUrl={`https://api.alpstein.tech/api/v1/upvote/${currentCryptoId}`}
        />
        <div className="h-full w-[1px] rotate-12 bg-[var(--secondarytext)]"></div>
        <Comp
          label="DownVote"
          val={downvote as number}
          Logo={FaThumbsDown}
          clickHandleUp={setUpSelect}
          clickHandleDown={setDownSelect}
          upActive={upSelect}
          downActive={downSelect}
          setVoteCasted={setVoteCasted}
          voteCasted={voteCasted}
          setterFunc={setDownvote}
          voteUrl={`https://api.alpstein.tech/api/v1/downvote/${currentCryptoId}`}
        />
      </div>
      <span
        className={`text-center text-[12px] font-medium md:text-[10px] 2xl:text-[12px] ${voteCasted ? "text-blue-500" : "text-[var(--secondarytext)]"}`}
      >
        {message}
      </span>
    </div>
  );
}

function Comp({
  label,
  val,
  Logo,
  clickHandleUp,
  clickHandleDown,
  upActive,
  downActive,
  setVoteCasted,
  voteCasted,
  setterFunc,
  voteUrl,
}: {
  label: string;
  val: number;
  Logo: IconType;
  clickHandleUp: React.Dispatch<SetStateAction<boolean>>;
  clickHandleDown: React.Dispatch<SetStateAction<boolean>>;
  upActive: boolean;
  downActive: boolean;
  setVoteCasted: React.Dispatch<SetStateAction<boolean>>;
  voteCasted: boolean;
  setterFunc: React.Dispatch<SetStateAction<number | null>>;
  voteUrl: string;
}) {
  async function castVote(url: string) {
    await axios.post(url, {}, { withCredentials: true });
  }
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg text-[10px] text-[var(--secondarytext)]"
      )}
    >
      <span className={`flex items-center gap-1 font-medium`}>
        <button
          disabled={voteCasted}
          onClick={() => {
            setterFunc((vote: number | null) => (vote! += 1));
            if (label === "UpVote") {
              clickHandleUp(true);
              clickHandleDown(false);
              setVoteCasted(true);
            } else {
              clickHandleDown(true);
              clickHandleUp(false);
              setVoteCasted(true);
            }
            castVote(voteUrl);
            toast("Thanks for your vote!");
          }}
        >
          <Logo
            size={12}
            className={cn(
              "cursor-pointer",
              `${label === "UpVote" ? "hover:text-sky-500" : "hover:text-rose-500"}`,
              `${label === "UpVote" ? (upActive ? "text-sky-500" : "") : downActive ? "text-rose-500" : ""}`
            )}
          />
        </button>
        {label}
      </span>
      <span className="text-lg font-light text-[var(--primarytext)]">{val}</span>
    </div>
  );
}
export default PubOpinion;
