import Image from "next/image";

export default function DocsImage() {
  return (
    <div className="relative mx-auto hidden h-20 w-[95%] rounded-lg md:block md:h-32 lg:h-44">
      <Image
        loading="lazy"
        src="/alps-range.jpg"
        alt="Alpstein"
        fill
        priority={false}
        className="rounded-lg object-cover"
      />

      <div className="absolute inset-0 rounded-md bg-neutral-700/30" />
      <div className="absolute bottom-3 left-0 pl-10 text-neutral-700 lg:w-4/7">
        <h2 className="text-2xl font-medium">Welcome to Alpstein</h2>
        <p className="text-[8px] leading-[15px] font-extralight tracking-widest text-wrap text-neutral-700 md:text-xs lg:text-sm">
          Alpstein gives you an extra edge with assisted AI insights and real-time market data.
        </p>
      </div>
    </div>
  );
}
