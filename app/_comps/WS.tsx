"use client";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

interface TickerData {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; // Last price
  P: string; // Price change percent
  h: string; // High price
  l: string; // Low price
  v: string; // Base asset volume
}

function WS({ symbol, showPrice }: { symbol: string | undefined; showPrice: boolean }) {
  const [price, setPrice] = useState<string | null>(null);
  const [change, setChange] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol?.toLowerCase()}usdt@ticker`
    );

    ws.onopen = () => {};

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data: TickerData = JSON.parse(event.data);
        setPrice(data.c);
        setChange(data.P);
      } catch (err) {
        setError("Failed to parse WebSocket message");
        console.error("Parsing error:", err);
      }
    };

    ws.onerror = (error: Event) => {
      setError("WebSocket error occurred");
      console.log("WebSocket error:", error);
    };

    ws.onclose = () => {};

    // Cleanup function
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [symbol]);

  return (
    <div className="text-[10px]">
      {error ? (
        <p className="font-extralight text-red-500">{error}</p>
      ) : price ? (
        <div className={`flex items-center gap-2`}>
          {showPrice && (
            // <div className="text-lg text-zinc-200">
            <div className="text-sm text-[var(--primarytext)]">
              $
              {parseFloat(price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
          )}
          <div
            className={`${
              // change?.startsWith("-") ? "text-red-400" : "text-green-400"
              change?.startsWith("-") ? "text-red-500" : "text-green-500"
            } text-xs`}
          >
            {change?.startsWith("-") ? <span>&#9660;{change}</span> : <span>&#9650;{change}</span>}%
          </div>
        </div>
      ) : (
        <div className="flex w-10 justify-end">
          <Spinner showPrice={false} />
        </div>
      )}
    </div>
  );
}

export default WS;
