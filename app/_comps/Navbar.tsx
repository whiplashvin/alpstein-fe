"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiMountaintop } from "react-icons/gi";
import { useNavBarHeight, useShowSigninModal, useUser, useUserModal } from "../lib/zustand";
import AuthenticatedNav from "./AuthenticatedNav";
import { cn } from "../lib/utils";
import { UserModal } from "./UserModal";
import SideBarToggle from "./SideBarToggle";
import DarkModelToggle from "./DarkModelToggle";
import { useEffect, useRef } from "react";

function Navbar() {
  const path = usePathname();
  const { currUser } = useUser();
  const { toggleShowModal } = useShowSigninModal();
  const { showUserModal } = useUserModal();
  const ref = useRef<HTMLDivElement | null>(null);
  const { setHeight } = useNavBarHeight();

  useEffect(() => {
    if (!ref.current) return;
    setHeight(ref.current.clientHeight);
  }, [setHeight]);

  return (
    <div
      ref={ref}
      id="navbar"
      className={cn(
        "top-0 w-full p-3",
        "lg:top-0 lg:w-[90%] lg:px-6 lg:py-0",
        "fixed left-1/2 z-50 -translate-x-1/2",
        "flex justify-between",
        "2xl:py-2",
        // "mx-auto max-w-[1512px]",
        "mx-auto max-w-7xl",
        `${path === "/" ? "bg-transparent" : "border-x border-[var(--cardborder)]/50 bg-[var(--background)]"}`
        // "bg-rose-500"
      )}
    >
      {currUser && showUserModal && (
        <UserModal fName={currUser.firstName} lName={currUser.lastName} />
      )}
      <Link
        className="flex cursor-pointer items-center gap-1 text-sm text-[var(--primarytext)] opacity-90 transition-colors duration-700 md:gap-2 md:text-base 2xl:text-lg"
        href="/"
      >
        <GiMountaintop size={25} />
        <span>Alpstein</span>
      </Link>
      {path.startsWith("/dashboard") && <SideBarToggle />}
      <div className="flex items-center gap-4">
        <div className="hidden h-10 items-center gap-6 text-[12px] text-[var(--secondarytext)] opacity-90 transition-colors duration-700 lg:flex 2xl:text-xs">
          {path !== "/" && <AuthenticatedNav />}
          {path === "/" && currUser === null && (
            <button onClick={() => toggleShowModal(true)} className="text-[var(--secondarytext)]">
              Sign In
            </button>
          )}
        </div>

        <DarkModelToggle />
      </div>
    </div>
  );
}

export default Navbar;
