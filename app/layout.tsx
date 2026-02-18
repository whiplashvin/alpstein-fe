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
  description:
    "A multi process system that tracks important crypto articles in real-time and an actionable, unbiased and market aware opinion is generated with live P&L.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Alpstein",
    description:
      "A multi process system that tracks important crypto articles in real-time and an actionable, unbiased and market aware opinion is generated with live P&L.",
    url: "https://alpstein.tech",
    siteName: "Alpstein",
    images: [
      {
        url: "/landing.png",
        width: 1000,
        height: 1000,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpstein",
    creator: "https://whiplashvin.dev",
    description:
      "A multi process system that tracks important crypto articles in real-time and an actionable, unbiased and market aware opinion is generated with live P&L.",
    images: ["https://alpstein.tech/landing.png"],
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
