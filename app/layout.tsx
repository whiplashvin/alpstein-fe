import type { Metadata } from "next";
import { Geist, Geist_Mono, Inconsolata, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./lib/Provider";
import Navbar from "./_comps/Navbar";
import LogoutModal from "./_comps/LogoutModal";
import { Analytics } from "@vercel/analytics/next";

// const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });
const incon = Inconsolata({ subsets: ["latin"], display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], display: "swap" });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s / Alpstein",
    default: "Alsptein",
  },
  icons: {
    icon: "/logo.svg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        id="root-container"
        className={`${geistSans.variable} ${geistMono.variable} ${incon.style} ${instrument.className} relative bg-[var(--background)] antialiased`}
      >
        <Navbar />
        <LogoutModal />
        <Provider>
          {children}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
