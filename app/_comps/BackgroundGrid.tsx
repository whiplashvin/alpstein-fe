import { cn } from "../lib/utils";

function BackgroundGrid() {
  return (
    <div className="fixed relative top-0 left-0 z-0 flex h-screen flex-col items-center">
      <div
        className={cn(
          "absolute inset-0 z-10 h-full w-full opacity-30",
          "bg-[radial-gradient(70%_45%_at_50%_0%,_#a3b3ff_15%,_var(--background))]",
          "md:bg-[radial-gradient(70%_50%_at_50%_0%,_#a3b3ff_15%,_var(--background))]",
          "3xl:bg-[radial-gradient(70%_30%_at_50%_0%,_#a3b3ff_15%,_var(--background))]"
        )}
      />
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "md:[background-size:60px_60px]",
          "z-0 [background-image:linear-gradient(to_left,var(--herogrid)_1px,transparent_1px),linear-gradient(to_top,var(--herogrid)_1px,transparent_1px)] opacity-10"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center",
          "[mask-image:radial-gradient(ellipse_80%_80%_at_top,transparent_0%,black_80%)]",
          "bg-[var(--background)]"
        )}
      />
    </div>
  );
}

export default BackgroundGrid;
