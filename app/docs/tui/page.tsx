"use client";
import { cn } from "@/app/lib/utils";
import Image from "next/image";

function page() {
  return (
    <div
      className={cn(
        "relative max-h-[calc(100vh-150px)] overflow-y-auto md:pt-10 lg:max-h-[calc(100vh-104px)]"
      )}
    >
      <div className="relative h-[200px] w-full">
        <Image
          src="/TUI-1.png"
          alt="tui-image"
          fill
          className={cn("rounded-lg object-cover object-top")}
        />
      </div>
      <div className="w-full tracking-wide md:mt-7 md:px-10 lg:mt-14 xl:px-20">
        <div className="my-5 text-xs font-light text-[var(--primarytext)]/60 md:text-base">
          <h3 className="text-lg font-medium tracking-normal text-[var(--primarytext)] md:text-2xl">
            Alpstein TUI — Trading insights in your terminal
          </h3>
          <p className="mt-4">
            A fully-featured terminal interface for Alpstein. Same AI opinions, same live data, same
            WebSocket stream—just without the browser. Built with Bubble Tea and Lipgloss.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">Installation</h4>
          <pre className="my-3 flex items-center justify-between rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
            <code>brew install whiplashvin/whiplashvin/alpstein-tui</code>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-copy cursor-pointer transition-all ease-in-out hover:scale-110"
              onClick={() =>
                navigator.clipboard.writeText("brew install whiplashvin/whiplashvin/alpstein-tui")
              }
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" />
              <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
            </svg>
          </pre>
          <p className="mt-3">
            On first launch, you&apos;ll be prompted for an authentication key. This connects your
            terminal session to your Alpstein account using the same JWT-based auth as the web app.
            Authenticate once, and you&apos;re in.
          </p>

          <div className="relative mt-10 h-[300px] w-full">
            <Image
              src="/TUI-2.png"
              alt="tui-image"
              fill
              className={cn("rounded-lg object-cover object-top")}
            />
          </div>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            What&apos;s on screen
          </h4>
          <ul className="my-3 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>Live prices</strong> — Real-time data for BTC, ETH, XRP, and other major
              pairs. Color-coded percentage changes update instantly via WebSocket.
            </li>
            <li>
              <strong>News feed</strong> — Articles from CoinTelegraph, The Block, and NewsBTC
              appear as they&apos;re scraped. Source, timestamp, and preview visible at a glance.
            </li>
            <li>
              <strong>Agent&apos;s opinion</strong> — The AI&apos;s current recommendation: position
              direction, entry price, take-profit, stop-loss, and risk/reward ratio.
            </li>
            <li>
              <strong>Live P&amp;L</strong> — If a signal is active, you see status (triggered or
              pending), creation price, and real-time profit/loss updating continuously.
            </li>
          </ul>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            Keyboard shortcuts
          </h4>
          <ul className="my-3 flex list-disc flex-col gap-2 pl-6">
            <li>
              <code>[↑] [↓]</code> — Scroll through news items
            </li>
            <li>
              <code>[n]</code> / <code>[p]</code> — Next / previous page
            </li>
            <li>
              <code>[x]</code> — Open the article source
            </li>
            <li>
              <code>[d]</code> — Open documentation{" "}
              <span className="text-[var(--primarytext)]/30">(upcoming)</span>
            </li>
            <li>
              <code>[t]</code> — View trade history{" "}
              <span className="text-[var(--primarytext)]/30">(upcoming)</span>
            </li>
          </ul>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">Why a TUI?</h4>
          <p className="mt-3">
            If you&apos;re already in the terminal—coding, deploying, debugging—switching to a
            browser tab breaks your flow. The TUI keeps Alpstein where you already are. Run it in a
            tmux pane, glance at the latest signal, and get back to work.
          </p>
          <p className="mt-3">No browser overhead, no mouse, no context switching. Just data.</p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">Try it</h4>
          <pre className="my-3 flex items-center justify-between rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
            <code>brew install whiplashvin/whiplashvin/alpstein-tui{"\n"}alpstein-tui</code>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-copy cursor-pointer transition-all ease-in-out hover:scale-110"
              onClick={() =>
                navigator.clipboard.writeText(
                  `brew install whiplashvin/whiplashvin/alpstein-tui \nalpstein-tui`
                )
              }
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" />
              <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
            </svg>
          </pre>
          <p className="mt-3">Two commands. That&apos;s it.</p>
        </div>
      </div>
    </div>
  );
}

export default page;
