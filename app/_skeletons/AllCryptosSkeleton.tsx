import { cn } from "../lib/utils";

function AllCryptosSkeleton() {
  return (
    <ul className={`relative mt-14 flex flex-col gap-2 overflow-y-auto`}>
      {Array.from({ length: 9 }).map((_, index) => (
        <CryptoComp key={index} />
      ))}
    </ul>
  );
}

export default AllCryptosSkeleton;

function CryptoComp() {
  return (
    <li
      className={cn(
        // "relative h-18 w-67 cursor-pointer rounded-md p-2",
        "relative h-18 w-full cursor-pointer rounded-md p-2",
        "shadow-[var(--shadow)] transition-shadow duration-500 ease-in-out hover:bg-[var(--cardhover)]"
      )}
    >
      <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
    </li>
  );
}
