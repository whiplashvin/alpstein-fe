import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { useState } from "react";
type QUESTIONS = {
  id: number;
  question: string;
  answer: string;
};
const faqs: QUESTIONS[] = [
  {
    id: 0,
    question: "Is Alpstein making actual trades with real money?",
    answer: `No, Alpstein generates trading insights and opinions based on AI analysis of market data and news sentiment. 
    It's designed as a research and analysis tool to help you make informed decisions. You remain in full control of your trading actions and capital.`,
  },
  {
    id: 1,
    question: "How does the AI generate trading opinions?",
    answer: `Alpstein combines multiple data sources: real-time price feeds from Binance, technical indicators (RSI, EMA, SMA, volume), and cryptocurrency news from trusted sources. 
    This information is fed into large language models that analyze market sentiment and technical patterns to generate actionable insights with transparent reasoning—including position 
    recommendations, profit targets, and risk levels.`,
  },
  {
    id: 2,
    question: "What makes Alpstein different from other crypto analysis tools?",
    answer: `Most trading bots are black boxes—you never know why they recommend a trade. Alpstein shows its reasoning: why it thinks a position makes sense, what the risk/reward ratio is, 
    and what market conditions support the decision. You get AI-powered insights with full transparency, plus access to the same data the AI analyzes so you can verify the logic yourself.`,
  },
  {
    id: 3,
    question: "Do I need trading experience to use Alpstein?",
    answer: `While Alpstein is designed for crypto enthusiasts and traders, you don't need to be an expert. The platform explains its reasoning in clear terms and provides context for each recommendation. 
    However, cryptocurrency trading carries inherent risks—you should understand basic trading concepts and only invest what you can afford to lose.`,
  },
  {
    id: 4,
    question: "How often does Alpstein update its market analysis?",
    answer: `Alpstein monitors markets continuously. News articles are scraped in real-time, price data and technical indicators are tracked live from Binance, and the AI generates fresh insights as market conditions change. 
    You'll see updates via the web dashboard or through the terminal interface (TUI) as they happen—no manual refreshing needed.`,
  },
];

function FAQ() {
  const [selected, setSelected] = useState<number | null>(0);
  const [show, setShow] = useState(true);

  function handleDisplay(id: number) {
    if (selected == id) {
      setShow(false);
      setSelected(null);
      return;
    }
    setSelected(id);
    setShow(true);
  }
  return (
    <div className="mt-40 flex flex-col items-center gap-10 bg-[var(--background)]">
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.7, ease: "easeInOut" }}
        className="text-xs font-thin text-[var(--secondarytext)]/70 md:text-xs"
      >
        FREQUENTLY ASKED QUESTIONS
      </motion.span>
      <motion.p className="mx-auto w-[80%] text-center text-base font-thin text-[var(--secondarytext)]/70 md:w-full md:text-lg">
        Here are answers to some questions you may have.
      </motion.p>

      <motion.ul className="l:w-[60%] flex w-[90%] flex-col gap-2 divide-y divide-[var(--stats-comp-bg)]">
        {faqs.map((faq, index) => (
          <motion.li
            onClick={() => handleDisplay(faq.id)}
            key={index}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-5 text-xs font-thin text-[var(--secondarytext)]/70 md:text-sm",
              "p-4"
            )}
          >
            <motion.div className="flex w-full items-center justify-between">
              {faq.question}
              {selected === faq.id && show ? (
                <motion.svg
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--secondarytext)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-up"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 15l6 -6l6 6" />
                </motion.svg>
              ) : (
                <motion.svg
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--secondarytext)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 9l6 6l6 -6" />
                </motion.svg>
              )}
            </motion.div>
            {selected === faq.id && show && (
              <motion.p
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
                className="p-2"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default FAQ;
