import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import { useAppStats } from "../lib/zustand";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatsDoughnutGraph() {
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

  const data = {
    labels: ["Long", "Short", "Unclear"],
    datasets: [
      {
        data: [stats?.numLong, stats?.numShort, stats?.numUnclear],
        // backgroundColor: ["#a3b3ff", "#ff637e", "#3ab2b2"],
        backgroundColor: ["#51a2ff", "#b8e6fe", "#c4b4ff"],
        // borderColor: ["#a3b3ff", "#ff637e", "#3ab2b2"],
        // borderColor: ["#51a2ff", "#b8e6fe", "#c4b4ff"],
        // borderWidth: 4,
        // borderColor: border,
        borderColor: "transparent",
        borderRadius: 3,
        hoverOffset: 0,
        // rotation: 180,
        // circumference: 180,
      },
    ],
  };
  // #51a2ff blue
  // #8e51ff violet
  // #7c86ff indigo
  // #74d4ff sky
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%", // controls the inner hole size
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
          padding: 16,
        },
      },
      datalabels: {
        // color: labelColor,
        color: "#333",
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
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default StatsDoughnutGraph;
