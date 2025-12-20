import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  ScriptableContext,
} from "chart.js";
import { useEffect, useState } from "react";
import { useAppStats } from "../lib/zustand";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatsHalfDoughnut() {
  const { stats } = useAppStats();
  const [labelColor, setLabelColor] = useState("");

  function updateColor() {
    const labelText = getComputedStyle(document.documentElement)
      .getPropertyValue("--primarytext")
      .trim();
    setLabelColor(labelText);
  }

  useEffect(() => {
    updateColor();

    const observer = new MutationObserver(() => {
      updateColor();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  });

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: labelColor,
          font: {
            size: 10,
            weight: 300,
            family: "'Instrument', sans-serif",
          },
          padding: 8,
        },
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      datalabels: {
        display: false,
        // color: "#333",
      },
    },
  };

  const labels = ["#bearish", "#volatility", "#bullish", "#whale"];

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        // label: "Articles",
        data: [
          stats?.numBearish || 0,
          stats?.numVolatility || 0,
          stats?.numBullish || 0,
          stats?.numWhale || 0,
        ],
        // backgroundColor: "#a3b3ff",
        backgroundColor: (ctx: ScriptableContext<"bar">) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;

          if (!chartArea) return undefined; // required for initial load

          // Create gradient top→bottom
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0.0, "#51a2ff"); // Start
          gradient.addColorStop(0.33, "#b8e6fe");
          gradient.addColorStop(0.66, "#c4b4ff");
          gradient.addColorStop(1.0, "#53eafd"); // End

          return gradient;
        },
        borderRadius: 5,
        barThickness: 5,
      },
    ],
  };
  return (
    <div className="relative max-h-[100%] min-h-[100%] max-w-full rounded-xl border border-[var(--stats-comp-inner-border)]/50 bg-[var(--stats-comp-inner)]/60 p-2 shadow-lg shadow-gray-500/50">
      <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></span>
      <Bar data={data} options={options} />
    </div>
  );
}

export default StatsHalfDoughnut;
