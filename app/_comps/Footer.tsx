import UserLogo from "./UserLogo";
import { BiStats } from "react-icons/bi";
import { SlDocs } from "react-icons/sl";
import { TbArrowsExchange2 } from "react-icons/tb";
import Link from "next/link";
import { useUser } from "../lib/zustand";
import { useRef } from "react";

function Footer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { currUser } = useUser();
  // const { setHeight } = useFooterHeight();

  // useEffect(() => {
  //   if (!ref.current) return;
  //   setHeight(ref.current.clientHeight);
  // }, [setHeight]);

  const LINKS = [
    { label: "Stats", url: "/dashboard", logo: <BiStats size={12} /> },
    { label: "Docs", url: "/docs/about", logo: <SlDocs size={12} /> },
    { label: "Trades", url: "/trades", logo: <TbArrowsExchange2 size={12} /> },
  ];
  return (
    currUser && (
      <div
        ref={ref}
        className="fixed bottom-0 left-0 z-50 grid w-full grid-cols-4 border-t border-[var(--cardborder)] bg-[var(--background)] p-2 text-[var(--secondarytext)] lg:hidden"
      >
        {LINKS.map((l, i) => (
          <Link href={l.url} className="flex w-full flex-col items-center text-[10px]" key={i}>
            {l.logo} {l.label}
          </Link>
        ))}
        <div className="flex justify-center">
          <UserLogo />
        </div>
      </div>
    )
  );
}

export default Footer;
