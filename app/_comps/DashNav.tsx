import { useEffect } from "react";
import { useDashNav } from "../lib/zustand";

function DashNav() {
  useEffect(() => {
    const interval = setInterval(() => console.log("Logging from mobile comp"), 2000);

    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className="mt-0 flex w-full items-center justify-between py-3 text-xs font-medium text-zinc-600">
      <Nav label="Opinion/Indicators" ind={0} />
      <Nav label="Charts/Rationale" ind={1} />
      <Nav label="Votes/Sentiment" ind={2} />
    </div>
  );
}

function Nav({ label, ind }: { label: string; ind: number }) {
  const { currTab, setCurrTab } = useDashNav();
  return (
    <span
      className={`rounded-full ${currTab === ind ? "bg-neutral-300" : ""} cursor-pointer px-2 py-1`}
      onClick={() => setCurrTab(ind)}
    >
      {label}
    </span>
  );
}
export default DashNav;
