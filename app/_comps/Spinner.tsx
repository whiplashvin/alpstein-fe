function Spinner({ showPrice }: { showPrice: boolean }) {
  return (
    // <span
    //   className={`spinner ${
    //     showPrice ? "size-7" : "size-4"
    //   } rounded-full border-1 border-zinc-700 border-r-zinc-500`}
    // ></span>
    <div
      className={`relative flex ${showPrice ? "size-7" : "size-4"} items-center justify-center overflow-hidden rounded-full bg-black`}
    >
      <span className="absolute inset-0 h-full w-full animate-spin bg-conic from-sky-400 from-15% to-0% [animation-duration:0.7s]" />
      <div className="absolute top-1/2 left-1/2 z-20 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--background)]"></div>
    </div>
  );
}

export default Spinner;
