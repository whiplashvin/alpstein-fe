"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserLogo from "./UserLogo";
import { useShowSigninModal, useUser } from "../lib/zustand";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

const PATHS = [
  { label: "News", path: "/dashboard" },
  { label: "Docs", path: "/docs" },
  { label: "Trades", path: "/trades" },
];

function AuthenticatedNav() {
  const [activePath, setActivePath] = useState("/dashboard");
  const { currUser, setUser } = useUser();
  const { toggleShowModal } = useShowSigninModal();
  const path = usePathname();

  useEffect(() => {
    if (path.startsWith("/docs")) return;
    async function getData() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          withCredentials: true,
        });
        console.log(res.data);
        setUser(true, res.data.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          toggleShowModal(true);
          setUser(false, null);
          redirect("/");
        }
      }
    }
    getData();
  }, [setUser, toggleShowModal, path]);

  useEffect(() => {
    setActivePath(path.toLowerCase());
  }, [path]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="relative hidden items-center gap-6 md:flex"
    >
      {PATHS.map(
        p =>
          currUser && (
            <Link key={p.label} href={p.path} className="relative">
              {activePath.startsWith(p.path) && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                  className="inxet-x-0 absolute -bottom-0.5 h-[1px] w-full bg-[var(--secondarytext)]"
                />
              )}
              <span className="font-light md:text-xs">{p.label}</span>
            </Link>
          )
      )}
      <UserLogo />
    </motion.div>
  );
}

export default AuthenticatedNav;
