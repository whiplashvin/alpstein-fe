import { useEffect, useMemo, useRef, useState } from "react";
import { useMACD } from "../lib/zustand";

function calcEMA(prices: number[], period: number) {
  const k = 2 / (period + 1);
  const seed = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
  const ema = [seed];
  for (let i = period; i < prices.length; i++) {
    ema.push(prices[i] * k + ema[ema.length - 1] * (1 - k));
  }
  return ema;
}

function calcMACD(prices: number[]) {
  const ema12 = calcEMA(prices, 12);
  const ema26 = calcEMA(prices, 26);
  const offset = ema12.length - ema26.length;
  const macdLine = ema26.map((val, i) => ema12[i + offset] - val);
  const signalLine = calcEMA(macdLine, 9);
  const offset2 = macdLine.length - signalLine.length;
  const histogram = signalLine.map((val, i) => macdLine[i + offset2] - val);
  return { macdLine: macdLine.slice(-histogram.length), signalLine, histogram };
}

export default function MACDChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const containerRef = useRef(null);
  const MACDClosePrices = useMACD(state => state.MACDClosePrices);

  const { macdLine, signalLine, histogram } = useMemo(() => {
    if (MACDClosePrices.length < 35)
      return {
        macdLine: [],
        signalLine: [],
        histogram: [],
      };
    return calcMACD(MACDClosePrices);
  }, [MACDClosePrices]);

  const latest = useMemo(
    () => ({
      macd: macdLine[macdLine.length - 1]?.toFixed(4),
      signal: signalLine[signalLine.length - 1]?.toFixed(4),
      histogram: histogram[histogram.length - 1]?.toFixed(4),
    }),
    [macdLine, signalLine, histogram]
  );

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = dimensions;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx!.scale(dpr, dpr);

    const padL = 10,
      padR = 10,
      padT = 0,
      padB = 0;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;

    ctx!.clearRect(0, 0, width, height);

    const allVals = [...histogram, ...macdLine, ...signalLine];
    const minVal = Math.min(...allVals);
    const maxVal = Math.max(...allVals);
    const range = maxVal - minVal || 1;

    const toY = (v: number) => padT + chartH - ((v - minVal) / range) * chartH;
    const zeroY = toY(0);
    const barW = chartW / histogram.length;

    // Zero line
    ctx!.strokeStyle = "rgba(255,255,255,0.15)";
    ctx!.lineWidth = 1;
    ctx!.setLineDash([4, 4]);
    ctx!.beginPath();
    ctx!.moveTo(padL, zeroY);
    ctx!.lineTo(padL + chartW, zeroY);
    ctx!.stroke();
    ctx!.setLineDash([]);

    // Grid lines
    ctx!.strokeStyle = "rgba(255,255,255,0.05)";
    ctx!.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padT + (chartH / 4) * i;
      ctx!.beginPath();
      ctx!.moveTo(padL, y);
      ctx!.lineTo(padL + chartW, y);
      ctx!.stroke();
    }

    // Histogram bars
    histogram.forEach((val, i) => {
      const x = padL + i * barW;
      const y = toY(val);
      const barH = Math.abs(y - zeroY);
      const isPos = val >= 0;
      const isHovered = hovered === i;

      const alpha = isHovered ? 1 : 0.75;
      ctx!.fillStyle = isPos ? `rgba(52, 211, 153, ${alpha})` : `rgba(248, 113, 113, ${alpha})`;

      ctx!.beginPath();
      const radius = Math.min(2, barW * 0.1);
      const barX = x + barW * 0.15;
      const bW = barW * 0.7;
      if (isPos) {
        ctx!.roundRect(barX, y, bW, barH, [radius, radius, 0, 0]);
      } else {
        ctx!.roundRect(barX, zeroY, bW, barH, [0, 0, radius, radius]);
      }
      ctx!.fill();
    });

    // MACD Line
    ctx!.strokeStyle = "#60a5fa";
    ctx!.lineWidth = 0.5;
    ctx!.lineJoin = "round";
    ctx!.beginPath();
    macdLine.forEach((val, i) => {
      const x = padL + i * barW + barW / 2;
      const y = toY(val);
      if (i === 0) {
        ctx!.moveTo(x, y);
      } else {
        ctx!.lineTo(x, y);
      }
    });
    ctx!.stroke();

    // Signal Line
    ctx!.strokeStyle = "#f59e0b";
    ctx!.lineWidth = 0.5;
    ctx!.beginPath();
    signalLine.forEach((val, i) => {
      const x = padL + i * barW + barW / 2;
      const y = toY(val);
      if (i === 0) {
        ctx!.moveTo(x, y);
      } else {
        ctx!.lineTo(x, y);
      }
    });
    ctx!.stroke();

    // Hover tooltip line
    if (hovered !== null) {
      const x = padL + hovered * barW + barW / 2;
      ctx!.strokeStyle = "rgba(255,255,255,0.3)";
      ctx!.lineWidth = 1;
      ctx!.setLineDash([3, 3]);
      ctx!.beginPath();
      ctx!.moveTo(x, padT);
      ctx!.lineTo(x, padT + chartH);
      ctx!.stroke();
      ctx!.setLineDash([]);
    }
  }, [histogram, macdLine, signalLine, hovered, dimensions]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - 10;
    const barW = (dimensions.width - 20) / histogram.length;
    const idx = Math.floor(x / barW);
    if (idx >= 0 && idx < histogram.length) setHovered(idx);
    else setHovered(null);
  };

  const hoveredData =
    hovered !== null
      ? {
          macd: macdLine[hovered]?.toFixed(4),
          signal: signalLine[hovered]?.toFixed(4),
          histogram: histogram[hovered]?.toFixed(4),
        }
      : latest;

  const histNum = Number(hoveredData.histogram);
  return (
    <div className="flex h-full items-center justify-center rounded-lg border border-[var(--cardborder)] bg-[var(--background)] p-2">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] text-[var(--secondarytext)]">MACD</div>
            <div className="mt-1 text-[10px] text-[var(--secondarytext)]">12 / 26 / 9 · 1H</div>
          </div>

          <div className="gap flex gap-6">
            {[
              {
                label: "Hist",
                value: hoveredData.histogram,
                color: histNum >= 0 ? "#34d399" : "#f87171",
              },
              { label: "MACD", value: hoveredData.macd, color: "#60a5fa" },
              { label: "Signal", value: hoveredData.signal, color: "#f59e0b" },
            ].map(({ label, value, color }) => (
              <div key={label} className="align-center">
                <div className="text-[10px] font-medium" style={{ color }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {[
            { color: "#60a5fa", label: "MACD Line" },
            { color: "#f59e0b", label: "Signal Line" },
            { color: "#34d399", label: "Positive" },
            { color: "#f87171", label: "Negative" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-[4px]">
              <div className="rounded-px h-[2px] w-5" style={{ backgroundColor: color }} />
              <span className="text-[10px] text-[var(--secondarytext)]">{label}</span>
            </div>
          ))}
        </div>

        <div
          className="h-[70%] w-full cursor-crosshair"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
        >
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}
