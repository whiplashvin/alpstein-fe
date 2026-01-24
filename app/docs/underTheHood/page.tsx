import { cn } from "@/app/lib/utils";

function page() {
  return (
    <div
      className={cn(
        "relative max-h-[calc(100vh-150px)] overflow-y-auto md:pt-10 lg:max-h-[calc(100vh-104px)]"
      )}
    >
      {/* <Image
        loading="lazy"
        src="/alps-range.jpg"
        alt="Alpstein"
        fill
        priority={false}
        className="rounded-lg object-cover"
      /> */}
      <div className="w-full tracking-wide text-[var(--primarytext)] md:mt-7 md:px-10 lg:mt-14 xl:px-20">
        <div className="my-5 text-xs font-light text-[var(--secondarytext)] md:text-sm">
          <h3 className="text-lg font-semibold tracking-normal text-[var(--primarytext)]">
            How Alpstein works under the hood
          </h3>
          <p className="mt-4">
            Alpstein isn&apos;t just a dashboard—it&apos;s a distributed system built with
            microservices, real-time data pipelines, and AI analysis working in concert. Here&apos;s
            how information flows from news sources to actionable insights.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            1. News Collection & Scraping
          </h4>
          <p className="mt-3">
            The journey starts with specialized scrapers monitoring crypto news sources around the
            clock. Three scraping services run continuously:
          </p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>CoinTelegraph scraper</strong> pulls breaking news and analysis from one of
              crypto&apos;s most trusted publications
            </li>
            <li>
              <strong>The Block scraper</strong> tracks institutional movements and regulatory
              developments
            </li>
            <li>
              <strong>NewsAPI handler</strong> aggregates stories from multiple sources for broader
              coverage
            </li>
          </ul>
          <p className="mt-3">
            These scrapers are coordinated by Prometheus and monitored with Grafana and Jaeger for
            performance tracking. Every scraped article gets timestamped and queued for processing.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            2. Article Processing Pipeline
          </h4>
          <p className="mt-3">
            Raw articles flow into two parallel services that prepare them for AI analysis:
          </p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>LLM SERVICE</strong> preprocesses articles—cleaning HTML, extracting key
              information, and structuring data for the AI model
            </li>
            <li>
              <strong>RAG SERVICE</strong> runs retrieval-augmented generation to add context. It
              searches through historical articles and market data to find relevant patterns and
              similar past events
            </li>
          </ul>
          <p className="mt-3">
            Both services cache their work in Redis for fast access, ensuring the same article
            isn&apos;t processed twice and responses stay lightning-fast.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            3. AI Analysis & Opinion Generation
          </h4>
          <p className="mt-3">
            The processed articles, combined with live market data from Binance (prices, RSI, EMA,
            SMA, volume), flow into the <strong>OpenAI-LLM service</strong>. This is where the magic
            happens.
          </p>
          <p className="mt-3">The AI doesn&apos;t just summarize—it analyzes. It considers:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>Sentiment from multiple news articles (are narratives aligned or conflicting?)</li>
            <li>Technical indicators showing momentum, overbought/oversold conditions</li>
            <li>Historical context from the RAG service (has this pattern happened before?)</li>
            <li>Current market structure (support/resistance levels, volume patterns)</li>
          </ul>
          <p className="mt-3">
            The output is a structured opinion with transparent reasoning: position type
            (long/short/unclear), entry levels, take-profit zones, stop-loss points, and risk-reward
            ratios. Every recommendation explains <em>why</em>, not just <em>what</em>.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            4. Data Storage & Persistence
          </h4>
          <p className="mt-3">Everything gets stored for later analysis and audit trails:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>PostgreSQL</strong> holds the permanent record—articles, AI opinions, market
              snapshots, and metadata with timestamps
            </li>
            <li>
              <strong>Redis</strong> acts as the fast cache layer, storing recent articles,
              rate-limiting data (using sorted sets for distributed rate limiting), and session
              information
            </li>
          </ul>
          <p className="mt-3">
            Redis also uses Append-Only File (AOF) persistence, so even cache data survives server
            restarts.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            5. Real-Time Updates to Frontend
          </h4>
          <p className="mt-3">
            The <strong>GOLANG HTTP Server</strong> orchestrates everything, serving as the API
            gateway between the backend services and the Next.js frontend. It handles:
          </p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>Authentication via OAuth 2.0 with Google (JWT tokens for session management)</li>
            <li>
              Rate limiting using Redis sorted sets (sliding window algorithm, distributed across
              instances)
            </li>
            <li>
              WebSocket connections for live updates—prices, news, and AI opinions stream to your
              dashboard
            </li>
          </ul>
          <p className="mt-3">
            When new analysis is ready, it&apos;s pushed instantly over WebSocket. No polling. No
            delays. Just live data flowing to your screen.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            6. Monitoring & Observability
          </h4>
          <p className="mt-3">
            Running a distributed system means things can break in unexpected ways. Alpstein uses a
            full observability stack:
          </p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>Prometheus</strong> collects metrics from every service (request rates, error
              rates, latencies)
            </li>
            <li>
              <strong>Grafana</strong> visualizes those metrics in real-time dashboards
            </li>
            <li>
              <strong>OpenTelemetry & Jaeger</strong> provide distributed tracing, letting you
              follow a single request as it flows through scrapers → processors → AI → database →
              frontend
            </li>
          </ul>
          <p className="mt-3">
            If something breaks, you see exactly where and why. If performance degrades, you know
            which service is the bottleneck.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            7. Deployment & Infrastructure
          </h4>
          <p className="mt-3">
            Alpstein runs in production on a Hetzner VM, with every service containerized via Docker
            and deployed with a CI/CD pipeline:
          </p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>
              <strong>NGINX</strong> acts as the reverse proxy, routing traffic to the right
              services and handling TLS/SSL encryption
            </li>
            <li>
              <strong>GitHub Actions</strong> manages continuous deployment—every code push triggers
              automated builds and deployments
            </li>
            <li>
              Secrets are managed through environment variables and GitHub Secrets, never hardcoded
            </li>
          </ul>
          <p className="mt-3">
            The result? A production-grade platform that handles real traffic, scales horizontally,
            and stays available 24/7.
          </p>

          <h4 className="mt-6 text-base font-semibold text-[var(--primarytext)]">
            Why this architecture?
          </h4>
          <p className="mt-3">
            Every piece serves a purpose. Microservices allow independent scaling—if scraping load
            increases, only those services scale up. Redis sorted sets enable distributed rate
            limiting that works across multiple backend instances. The RAG service ensures AI
            recommendations have historical context, not just current headlines.
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
