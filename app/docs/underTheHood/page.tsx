import { cn } from "@/app/lib/utils";

function page() {
  return (
    <div
      className={cn(
        "relative max-h-[calc(100vh-150px)] overflow-y-auto md:pt-10 lg:max-h-[calc(100vh-104px)]"
      )}
    >
      <div className="w-full tracking-wide md:mt-7 md:px-10 lg:mt-14 xl:px-20">
        <div className="my-5 text-xs font-light text-[var(--primarytext)]/60 md:text-base">
          <h3 className="text-lg font-medium tracking-normal text-[var(--primarytext)] md:text-2xl">
            How Alpstein works under the hood
          </h3>
          <p className="mt-4">
            Alpstein isn&apos;t just a dashboard—it&apos;s a distributed system built with
            microservices, real-time data pipelines, and AI analysis working in concert. Here&apos;s
            how information flows from news sources to actionable insights.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            1. News Collection &amp; Scraping
          </h4>
          <p className="mt-3">
            The journey starts with a NodeJS scraper running on a 2-minute cron cycle, monitoring
            crypto news sources around the clock. It pulls articles from four major publications:
          </p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>Decrypt</strong> covers breaking crypto news and emerging trends
            </li>
            <li>
              <strong>CoinTelegraph</strong> pulls in-depth analysis and market commentary
            </li>
            <li>
              <strong>NewsBTC</strong> tracks price movements and trading narratives
            </li>
            <li>
              <strong>CoinDesk</strong> provides institutional and regulatory coverage
            </li>
          </ul>
          <p className="mt-3">
            These scrapers are coordinated by Prometheus and monitored with Grafana, OpenTelemetry,
            and Jaeger for performance tracking. Every scraped article gets timestamped,
            deduplicated, and pushed into a Redis queue for processing.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            2. Article Processing Pipeline
          </h4>
          <p className="mt-3">
            Raw articles flow from the Redis queue into the <strong>Golang LLM Service</strong>,
            which orchestrates the entire analysis pipeline. The LLM is equipped with tool-calling
            capabilities, meaning it can autonomously decide when it needs more context:
          </p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>Binance API Tool</strong> — the AI can pull live market data (prices, volume,
              order books) for any cryptocurrency mentioned in an article
            </li>
            <li>
              <strong>Langchain + QdrantDB Tool</strong> — the AI can search through historically
              processed articles using semantic similarity, finding related past coverage even when
              different terminology is used
            </li>
          </ul>
          <p className="mt-3">
            Articles are embedded using the <strong>all-mpnet-base-v2</strong> model and stored in
            QdrantDB, building a growing semantic memory of the entire crypto news landscape.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            3. AI Analysis &amp; Opinion Generation
          </h4>
          <p className="mt-3">
            The processed articles, combined with live market data from Binance (prices, RSI, EMA,
            SMA, volume), flow into the <strong>OpenAI LLM service</strong>. This is where the magic
            happens.
          </p>
          <p className="mt-3">The AI doesn&apos;t just summarize—it analyzes. It considers:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>Sentiment from multiple news articles (are narratives aligned or conflicting?)</li>
            <li>Technical indicators showing momentum, overbought/oversold conditions</li>
            <li>Historical context from QdrantDB (has this pattern happened before?)</li>
            <li>Current market structure (support/resistance levels, volume patterns)</li>
          </ul>
          <p className="mt-3">
            The output is a structured opinion with transparent reasoning: position type
            (long/short/unclear), entry levels, take-profit zones, stop-loss points, and risk-reward
            ratios. Every recommendation explains <em>why</em>, not just <em>what</em>.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            4. Data Storage &amp; Persistence
          </h4>
          <p className="mt-3">Everything gets stored for later analysis and audit trails:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>PostgreSQL</strong> holds the permanent record—articles, AI opinions, market
              snapshots, and metadata with timestamps
            </li>
            <li>
              <strong>Redis</strong> plays a dual role: it acts as the message queue between the
              NodeJS scraper and the Golang backend, and serves as the fast cache layer for the HTTP
              server, storing recent data and ensuring responses stay lightning-fast
            </li>
            <li>
              <strong>QdrantDB</strong> stores vector embeddings of every processed article,
              enabling semantic search across the entire news archive
            </li>
          </ul>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            5. Real-Time Signal Tracking
          </h4>
          <p className="mt-3">
            When the AI generates a trading signal—with entry price, take-profit, and stop-loss
            levels—a Golang WebSocket client picks it up and starts tracking it against a live
            Binance price stream. Here&apos;s what happens:
          </p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              The WebSocket monitors the real-time price for that asset. Once the price hits the
              AI&apos;s suggested entry, the signal status flips to <strong>triggered</strong>
            </li>
            <li>
              From that point, a live P&amp;L is calculated continuously—showing what your profit or
              loss would be if you had taken the same trade the AI suggested
            </li>
            <li>
              Both the NextJS web app and the Alpstein TUI connect to this WebSocket, so you see
              P&amp;L updating in real time on your screen
            </li>
          </ul>
          <p className="mt-3">
            Think of it as a paper-trading engine running on every AI signal. You can watch each
            recommendation play out live and judge the AI&apos;s accuracy before putting real money
            on the line.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            6. Serving the Data
          </h4>
          <p className="mt-3">
            The <strong>Golang HTTP Server</strong> acts as the central API gateway, serving
            processed analyses and market data to two frontends:
          </p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>NextJS Web App</strong> — a full-featured web dashboard for browsing
              AI-analyzed news, viewing market data, and exploring historical insights
            </li>
            <li>
              <strong>Alpstein TUI</strong> — a terminal-based interface for power users who prefer
              a keyboard-driven, distraction-free experience
            </li>
          </ul>
          <p className="mt-3">
            Both clients consume the same API and display the same data—pick whichever fits your
            workflow.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            7. Monitoring &amp; Observability
          </h4>
          <p className="mt-3">
            Running a distributed system means things can break in unexpected ways. Alpstein uses a
            full observability stack:
          </p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>Prometheus</strong> collects metrics from every service (request rates, error
              rates, latencies, queue depth, cache hit ratios)
            </li>
            <li>
              <strong>Grafana</strong> visualizes those metrics in real-time dashboards with
              alerting
            </li>
            <li>
              <strong>OpenTelemetry &amp; Jaeger</strong> provide distributed tracing, letting you
              follow a single article as it flows through scraper → queue → LLM → database →
              frontend
            </li>
          </ul>
          <p className="mt-3">
            If something breaks, we see exactly where and why. If performance degrades, we know
            which service is the bottleneck.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            Why this architecture?
          </h4>
          <p className="mt-3">
            Every piece serves a purpose. The polyglot design uses each language where it
            excels—NodeJS for async web scraping, Golang for high-concurrency backend orchestration,
            and Python-ecosystem tools (Langchain, Sentence Transformers) for ML and embeddings.
            Redis as a message queue decouples the scraper from the AI pipeline, so articles queue
            up naturally during traffic spikes instead of overwhelming the system.
          </p>
          <p className="mt-3">
            The LLM tool-calling pattern means the AI decides when to fetch market data or search
            historical articles—no hard-coded heuristics, just an intelligent agent that pulls
            context when it needs it.
          </p>
          <p className="mt-3">
            It&apos;s built to be reliable, observable, and fast—because in crypto markets, a few
            seconds can mean the difference between catching a move and missing it entirely.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
