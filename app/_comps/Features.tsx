import { motion } from "motion/react";
import { cn } from "../lib/utils";

function Features() {
  return (
    <div className="mt-36 flex flex-col items-center bg-[var(--background)]">
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.7, ease: "easeInOut" }}
        className={cn(
          "h-fit rounded-full bg-[var(--bg-section)] px-3 py-0.5 text-xs font-extralight text-neutral-50 md:text-sm"
        )}
      >
        Features
      </motion.span>
      <div className="mx-auto mt-18 grid w-[80%] grid-rows-3 divide-y-1 divide-[var(--secondarytext)]/20 p-1 md:w-[90%] md:grid-cols-3 md:grid-rows-1 md:divide-x-1 md:divide-y-0 lg:w-[80%]">
        <motion.div
          className="w-full p-5"
          viewport={{ once: true, amount: 0.3 }} // triggers only when 30% is visible
        >
          <div className="flex items-center gap-2">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--secondarytext)"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 lg:w-20"
            >
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d="M15 18h-5"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
                d="M18 14h-8"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.9, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"
              />
              <motion.rect
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
                width="8"
                height="4"
                x="10"
                y="6"
                rx="1"
              />
            </motion.svg>
            <h2 className="text-xl leading-5 font-light text-[var(--secondarytext)]/90 md:leading-7 lg:text-3xl">
              Latest crypto articles
            </h2>
          </div>
          <p className="mt-7 text-xs font-light tracking-wide text-[var(--secondarytext)]/60 md:mt-10 md:text-sm">
            Get the latest crypto articles from the leading crypto news sources. Do not miss out on
            new articles.
          </p>
        </motion.div>

        <motion.div
          className="w-full p-5"
          viewport={{ once: true, amount: 0.3 }} // triggers only when 30% is visible
        >
          <div className="flex items-center gap-2">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--secondarytext)"
              stroke-width="0.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-10 lg:w-20"
            >
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d="M12 8V4H8"
              />
              <motion.rect
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
                width="16"
                height="12"
                x="4"
                y="8"
                rx="2"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M2 14h2"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M20 14h2"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M15 13v2"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M9 13v2"
              />
            </motion.svg>

            <h2 className="text-xl leading-5 font-light text-[var(--secondarytext)]/90 md:leading-7 lg:text-3xl">
              GPT-4o analysis
            </h2>
          </div>
          <p className="mt-7 text-xs font-light tracking-wide text-[var(--secondarytext)]/60 md:mt-10 md:text-sm">
            Crypto news articles are thoroughly analysed by GPT-4o within a strict format with
            proper gaurdrails.
          </p>
        </motion.div>

        <motion.div
          className="w-full p-5"
          viewport={{ once: true, amount: 0.3 }} // triggers only when 30% is visible
        >
          <div className="flex items-center gap-2">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--secondarytext)"
              stroke-width="0.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-10 lg:w-20"
            >
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M16.247 7.761a6 6 0 0 1 0 8.478"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M19.075 4.933a10 10 0 0 1 0 14.134"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M4.925 19.067a10 10 0 0 1 0-14.134"
              />
              <motion.path
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                d="M7.753 16.239a6 6 0 0 1 0-8.478"
              />
              <motion.circle
                initial={{ opacity: 0, scale: 0.5, pathLength: 0 }}
                whileInView={{ opacity: 1, scale: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                cx="12"
                cy="12"
                r="2"
              />
            </motion.svg>
            <h2 className="text-xl leading-5 font-light text-[var(--secondarytext)]/90 md:leading-7 lg:text-3xl">
              Price tracking with P&L
            </h2>
          </div>
          <p className="mt-7 text-xs font-light tracking-wide text-[var(--secondarytext)]/60 md:mt-10 md:text-sm">
            Price of every crypto under Alpstein&apos;s radar is tracked and a real-time profit and
            loss is calculated and displayed.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Features;
