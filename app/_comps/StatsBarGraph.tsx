import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";
import { useAppStats } from "../lib/zustand";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatsBarGraph() {
  const { stats } = useAppStats();
  // const [barColor, setBarColor] = useState("");
  // const [textColor, setTextColor] = useState("");
  const [labelColor, setLabelColor] = useState("");

  const updateBarColor = () => {
    // const barColor = getComputedStyle(document.documentElement)
    //   .getPropertyValue("--barChart")
    //   .trim();
    // const barText = getComputedStyle(document.documentElement).getPropertyValue("--barText").trim();
    const labelText = getComputedStyle(document.documentElement)
      .getPropertyValue("--primarytext")
      .trim();

    // setBarColor(barColor);
    // setTextColor(barText);
    setLabelColor(labelText);
  };

  useEffect(() => {
    updateBarColor();

    // Watch for dark mode toggle
    const observer = new MutationObserver(() => {
      updateBarColor();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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

  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const today = new Date(year, month, date);

  const labels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (7 - i));

    return `${d.getDate()}/${d.getMonth() + 1}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Articles",
        data: [
          stats?.seventh,
          stats?.sixth,
          stats?.fifth,
          stats?.fourth,
          stats?.third,
          stats?.second,
          stats?.first,
        ],
        // backgroundColor: barColor,
        backgroundColor: "#a3b3ff",
        borderRadius: 50,
        barThickness: 2, // <<<< reduce bar width (fixed)
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

export default StatsBarGraph;
