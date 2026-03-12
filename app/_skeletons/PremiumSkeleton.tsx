import { cn } from "../lib/utils";

function PremiumSkeleton() {
  return (
    <div
      className={cn(
        "l:h-51 l2:h-84 md2:h-80 relative grid h-full w-full grid-rows-[3fr_1fr] rounded-2xl rounded-xl p-2 md:h-70 lg:flex-1",
        // "shadow-[var(--shadow)] transition-shadow duration-500"
        "overflow-hidden border border-[var(--stats-comp-bg)] bg-[var(--stats-comp-bg)]/20 backdrop-blur-xl"
      )}
    >
      <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
    </div>
  );
}

export default PremiumSkeleton;
