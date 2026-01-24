import { cn } from "@/app/lib/utils";

function page() {
  return (
    <div
      className={cn(
        "relative max-h-[calc(100vh-150px)] overflow-y-auto md:pt-10 lg:max-h-[calc(100vh-104px)]"
      )}
    >
      <div className="w-full tracking-wide text-[var(--primarytext)] md:mt-7 md:px-10 lg:mt-14 xl:px-20">
        <div className="my-5 text-xs font-light text-[var(--secondarytext)] md:text-sm">
          <h3 className="text-lg font-semibold tracking-normal text-[var(--primarytext)]">
            Alpstein TUI — Trading insights in your terminal
          </h3>
          <p className="mt-4">
            Not everyone wants to leave their terminal. For developers and traders who live in the
            command line, Alpstein offers a fully-featured terminal user interface (TUI) that brings
            the same AI-powered insights directly to your shell.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            Why a terminal interface?
          </h4>
          <p className="mt-3">
            Context switching kills productivity. If you&apos;re coding, debugging, or managing
            infrastructure, opening a browser tab breaks your flow. The TUI keeps you in your
            zone—same terminal, same keyboard shortcuts, zero friction.
          </p>
          <p className="mt-3">
            It&apos;s also fast. No browser overhead, no rendering delays. Just raw data streaming
            to your screen in milliseconds.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">Installation</h4>
          <p className="mt-3">
            Installing the TUI is as simple as any command-line tool. If you&apos;re on macOS or
            Linux with Homebrew:
          </p>
          <pre className="my-3 rounded-md bg-zinc-900 p-4 text-sm text-zinc-100">
            <code>brew tap alpstein/tap{"\n"}brew install alpstein</code>
          </pre>
          <p className="mt-3">
            Once installed, launch it with a single command. You&apos;ll be prompted to enter your
            authentication key, which connects the TUI to your Alpstein account securely.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            What you get in the terminal
          </h4>
          <p className="mt-3">
            The TUI isn&apos;t a stripped-down version—it&apos;s the full Alpstein experience,
            optimized for keyboard-driven workflows:
          </p>

          <ul className="my-3 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>Live market data</strong> — Real-time prices for BTC, ETH, XRP, and other
              major cryptocurrencies. Prices update instantly, with percentage changes color-coded
              (green for gains, red for losses).
            </li>
            <li>
              <strong>News feed</strong> — Scraped articles from CoinTelegraph, The Block, and
              NewsBTC appear as soon as they&apos;re published. Each headline shows the source,
              timestamp, and a brief preview. Scroll through them with arrow keys.
            </li>
            <li>
              <strong>Agent&apos;s opinion</strong> — The AI&apos;s current market analysis is front
              and center. You see the position recommendation (long, short, or unclear), entry
              price, take-profit and stop-loss levels, risk/reward ratio, and when the opinion was
              generated.
            </li>
            <li>
              <strong>Live stats</strong> — If there&apos;s an active position, you see creation
              price, current status (triggered or pending), and live profit/loss percentage updating
              in real time.
            </li>
          </ul>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            Navigation & keyboard shortcuts
          </h4>
          <p className="mt-3">
            Everything is keyboard-driven. No mouse needed, no clicking around. The TUI supports
            intuitive shortcuts displayed at the bottom of the screen:
          </p>
          <ul className="my-3 flex list-disc flex-col gap-2 pl-6">
            <li>
              <code>[n]</code> — Jump to the next news article
            </li>
            <li>
              <code>[d]</code> — Open documentation (this page!)
            </li>
            <li>
              <code>[t]</code> — View trades and position history
            </li>
            <li>
              <code>[↑] [↓]</code> — Scroll through news items
            </li>
            <li>
              <code>[x]</code> — Open expanded news view
            </li>
          </ul>
          <p className="mt-3">
            The interface is responsive and clean. Built with Bubble Tea (Go&apos;s TUI framework)
            and styled with Lipgloss, it feels native to the terminal—smooth scrolling, clean
            layouts, and no visual clutter.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            Authentication & security
          </h4>
          <p className="mt-3">
            On first launch, the TUI prompts you for an authentication key. This connects your
            terminal session to your Alpstein account using the same secure JWT-based authentication
            as the web interface.
          </p>
          <p className="mt-3">
            The key is stored locally and reused for future sessions, so you only authenticate once.
            If you need to switch accounts or revoke access, simply clear the stored credentials and
            re-authenticate.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            Real-time updates, no polling
          </h4>
          <p className="mt-3">
            Just like the web dashboard, the TUI uses WebSocket connections to stream updates. When
            a new article is scraped, when prices change, or when the AI generates a fresh opinion,
            it appears instantly in your terminal—no refresh needed, no manual updates.
          </p>
          <p className="mt-3">
            This makes it ideal for keeping Alpstein running in a tmux pane or a split terminal
            window while you work. Glance over, catch the latest market move, and get back to
            coding.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            Built for traders who code
          </h4>
          <p className="mt-3">
            The TUI is designed for people who think in terminals—developers, sysadmins, quants,
            anyone who prefers keyboards over mice. It respects your workflow, stays out of your
            way, and delivers the same insights as the web interface without forcing you to leave
            the command line.
          </p>
          <p className="mt-3">
            Whether you&apos;re deploying to production, debugging a trading bot, or just prefer the
            aesthetic of green text on black backgrounds, the TUI gives you Alpstein exactly where
            you need it.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            Try it yourself
          </h4>
          <pre className="my-3 rounded-md bg-zinc-900 p-4 text-sm text-zinc-100">
            <code>brew install alpstein{"\n"}alpstein</code>
          </pre>
          <p className="mt-3">
            That&apos;s it. Two commands, and you&apos;re tracking crypto markets from your
            terminal.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
