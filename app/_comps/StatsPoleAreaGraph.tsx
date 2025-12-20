import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";
import { useAppStats } from "../lib/zustand";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function StatsPoleAreaGraph() {
  const { stats } = useAppStats();
  const [labelColor, setLabelColor] = useState("");
  const [poleBorder, setPoleBorder] = useState("");

  function updateColor() {
    const labelText = getComputedStyle(document.documentElement)
      .getPropertyValue("--primarytext")
      .trim();
    const pole = getComputedStyle(document.documentElement).getPropertyValue("--poleGraph").trim();
    setLabelColor(labelText);
    setPoleBorder(pole);
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

  const data = {
    labels: ["Target Hit", "SL Hit", "Pending", "Triggered"],
    datasets: [
      {
        label: "Trade Stats",
        data: [stats?.numTarget, stats?.numSL, stats?.numPending, stats?.numTriggered],
        // backgroundColor: ["#a3b3ff", "#ff637e", "#3ab2b2"],
        backgroundColor: ["#51a2ff", "#b8e6fe", "#c4b4ff", "#53eafd"],
        // borderColor: ["#a3b3ff", "#ff637e", "#3ab2b2"],
        borderColor: ["#51a2ff", "#b8e6fe", "#c4b4ff", "#53eafd"],
        borderWidth: 1,
      },
    ],
  };
  // #a2f4fd
  const options: ChartOptions<"polarArea"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: {
          // color: "rgba(255,255,255,0.1)",
          color: poleBorder,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: labelColor,
          font: {
            size: 10,
            weight: 300,
            family: "'Instrument', sans-serif",
          },
          padding: 14,
        },
      },
      datalabels: {
        color: labelColor,
        display: false,
      },
      // tooltip: {
      //   backgroundColor: "rgba(0, 0, 0, 0.7)",
      //   titleFont: { size: 13 },
      //   bodyFont: { size: 12 },
      //   padding: 8,
      // },
    },
  };

  return (
    <div className="relative max-h-[100%] min-h-[100%] max-w-full rounded-xl border border-[var(--stats-comp-inner-border)]/50 bg-[var(--stats-comp-inner)]/60 p-2 shadow-lg shadow-gray-500/50">
      <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></span>
      <PolarArea data={data} options={options} />
    </div>
  );
}

export default StatsPoleAreaGraph;
