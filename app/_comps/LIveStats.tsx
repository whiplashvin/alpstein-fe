import { cn } from "../lib/utils";
import { SiStackblitz } from "react-icons/si";
import { JSX, useEffect, useState } from "react";
import { useCurrentCryptoId } from "../lib/zustand";

const status = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-activity"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 12h4l3 8l4 -16l3 8h4" />
  </svg>
);

const priceAtCreation = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-clock-dollar"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M20.866 10.45a9 9 0 1 0 -7.815 10.488" />
    <path d="M12 7v5l1.5 1.5" />
    <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
    <path d="M19 21v1m0 -8v1" />
  </svg>
);
const position = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-geometry"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 21l4 -12m2 0l1.48 4.439m.949 2.847l1.571 4.714" />
    <path d="M10 7a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M4 12c1.526 2.955 4.588 5 8 5c3.41 0 6.473 -2.048 8 -5" />
    <path d="M12 5v-2" />
  </svg>
);
const pl = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-scale"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 20l10 0" />
    <path d="M6 6l6 -1l6 1" />
    <path d="M12 3l0 17" />
    <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
    <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
  </svg>
);
function LIveStats({ includeHeading }: { includeHeading: boolean }) {
  const { cryptoData } = useCurrentCryptoId();
  return (
    <div className={cn("flex w-full flex-col gap-1 rounded-lg")}>
      {includeHeading && (
        <span className="font:medium flex items-center gap-2 text-start text-sm text-[var(--secondarytext)] md:text-xs md:font-semibold 2xl:text-sm">
          Live Stats{" "}
          <span className="text-violet-500">
            <SiStackblitz />
          </span>
        </span>
      )}

      <div className="grid h-full w-full grid-cols-2 gap-1">
        <Comp
          label="Price at creation"
          val={String(Number(cryptoData?.priceAtCreation).toFixed(2))}
          Logo={priceAtCreation}
        />
        <Comp label="Status" val={cryptoData?.status} Logo={status} />
        <Comp label="Position Triggered" val={cryptoData?.triggeredposition} Logo={position} />
        <PandL id={cryptoData?.id} />
      </div>
    </div>
  );
}

function Comp({ label, val, Logo }: { label: string; val?: string; Logo: JSX.Element }) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 xl:p-1.5 2xl:p-1.5",
        "w-full border border-[var(--cardborder)]"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1">
          {Logo}
          {label}
        </span>
        {label === "Status" && (
          <span className="relative flex size-1.5">
            <>
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${val === "pending" ? "bg-amber-500" : val === "triggered" ? "bg-green-500" : ""} opacity-75`}
              ></span>
              <span
                className={`relative inline-flex size-1.5 rounded-full ${val === "pending" ? "bg-amber-500" : val === "triggered" ? "bg-green-500" : ""}`}
              ></span>
            </>
          </span>
        )}
      </div>
      <span className="text-base font-medium text-[var(--primarytext)] 2xl:text-lg">{val}</span>
    </div>
  );
}

export function PandL({ id }: { id?: string }) {
  const [kind, setKind] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
    ws.onopen = () => {
      ws.send(JSON.stringify({ event: "SUB", payload: id }));
    };

    const heartBeatInterval = setInterval(() => {
      ws.send(JSON.stringify({ event: "ping" }));
    }, 55000);

    ws.onmessage = event => {
      try {
        const msg = JSON.parse(event.data as string);
        const final = msg.value.toFixed(2);
        setKind(msg.kind);
        setValue(final);
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    };

    ws.onerror = (error: Event) => {
      console.log("WebSocket error:", error);
    };

    ws.onclose = () => {
      ws.send(JSON.stringify({ event: "UNSUB", payload: id }));
      clearInterval(heartBeatInterval);
    };
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ event: "UNSUB", payload: id }));
      }
      ws.close();
      clearInterval(heartBeatInterval);
      console.log("WS disconnected..");
    };
  }, [id]);
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 xl:p-1.5",
        "w-full border border-[var(--cardborder)]"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1">
          {pl}
          P&L
        </span>
      </div>
      {value ? (
        <span
          className={cn(
            "text-base font-medium text-[var(--primarytext)] 2xl:text-lg",
            `${kind === "profit" ? "text-green-500" : "text-red-500"}`
          )}
        >
          {`${kind === "profit" ? "+" : "-"} ${value} %`}
        </span>
      ) : (
        "-"
      )}
    </div>
  );
}
export default LIveStats;
