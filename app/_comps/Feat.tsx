import Image from "next/image";
import { motion } from "motion/react";
function Feat() {
  return (
    <div className="mt-52 flex h-screen flex-col items-center gap-10 bg-[var(--background)]">
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.7, ease: "easeInOut" }}
        className="text-xs font-light text-[var(--secondarytext)]/70 md:text-xs"
      >
        WHAT ALPSTEIN HAS TO OFFER
      </motion.span>
      <motion.p className="mx-auto w-[80%] text-center text-lg font-light text-[var(--secondarytext)]/70 md:w-full md:text-xl">
        Among many other things, here are some features Alpstein comes with.
      </motion.p>

      <div className="grid w-[70%] grid-cols-1 gap-10 md:grid-cols-2 lg:w-[90%] lg:grid-cols-4 lg:gap-5">
        <div className="relative h-96 w-full overflow-hidden rounded-2xl p-2 shadow-xl backdrop-blur-xl perspective-distant">
          <div className="absolute inset-0 z-20 h-full w-full rounded-xl dark:bg-neutral-800/30"></div>
          <motion.div className="perspective-distant">
            <Image
              src={"/feature-1.png"}
              width={220}
              height={200}
              alt="fads"
              className="absolute rounded-xl mask-b-from-20% shadow-xl"
              style={{ transform: "rotateY(40deg) rotateX(45deg) rotateZ(0deg)" }}
            />
          </motion.div>
          <motion.div className="translate-x-10 translate-y-5 perspective-distant">
            <Image
              src={"/feature-1.png"}
              width={220}
              height={200}
              alt="fads"
              className="absolute rounded-xl shadow-xl"
              style={{ transform: "rotateY(42deg) rotateX(45deg) rotateZ(0deg)" }}
            />
          </motion.div>
          <div className="absolute bottom-2 left-2">
            <h2 className="text-lg leading-5 font-medium text-[var(--secondarytext)] md:leading-7 lg:text-lg">
              Relax! its just an opinion.
            </h2>
            <p className="mt-2 text-sm font-extralight text-[var(--secondarytext)]/80">
              Get AI opinionated signals on what actions to take. A signal can be bullish, bearish
              or unclear.
            </p>
          </div>
        </div>
        <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl perspective-distant">
          <div className="absolute inset-0 z-20 h-full w-full rounded-xl dark:bg-neutral-800/30"></div>
          <motion.div className="perspective-distant">
            <Image
              src={"/feature-2.png"}
              width={270}
              height={300}
              alt="fads"
              className="absolute rounded-xl mask-b-from-20% shadow-xl"
              style={{ transform: "rotateY(40deg) rotateX(45deg) rotateZ(0deg)" }}
            />
          </motion.div>
          <motion.div className="translate-x-10 translate-y-5 perspective-distant">
            <Image
              src={"/feature-2.png"}
              width={270}
              height={300}
              alt="fads"
              className="absolute rounded-xl shadow-xl"
              style={{ transform: "rotateY(42deg) rotateX(45deg) rotateZ(0deg)" }}
            />
          </motion.div>
          <div className="absolute bottom-2 left-2">
            <h2 className="text-lg leading-5 font-medium text-[var(--secondarytext)] md:leading-7 lg:text-lg">
              Keep yourself updated.
            </h2>
            <p className="mt-2 text-sm font-extralight text-[var(--secondarytext)]/80">
              Get real-time P&L updates on generated signals. Also get current status of the signal.
            </p>
          </div>
        </div>
        <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl perspective-distant">
          <div className="absolute inset-0 z-20 h-full w-full rounded-xl dark:bg-neutral-800/30"></div>
          <motion.div className="perspective-distant">
            <Image
              src={"/feature-3.png"}
              width={220}
              height={200}
              alt="fads"
              className="absolute rounded-xl mask-b-from-20% shadow-xl"
              style={{ transform: "rotateY(40deg) rotateX(45deg) rotateZ(0deg)" }}
            />
          </motion.div>
          <motion.div className="translate-x-10 translate-y-5 perspective-distant">
            <Image
              src={"/feature-3.png"}
              width={220}
              height={200}
              alt="fads"
              className="absolute rounded-xl shadow-xl"
              style={{ transform: "rotateY(42deg) rotateX(45deg) rotateZ(0deg)" }}
            />
          </motion.div>
          <div className="absolute bottom-2 left-2">
            <h2 className="text-lg leading-5 font-medium text-[var(--secondarytext)] md:leading-7 lg:text-lg">
              Get a feel of the market.
            </h2>
            <p className="mt-2 text-sm font-extralight text-[var(--secondarytext)]/80">
              Yes, markets have sentiments too. Alpstein tracks bullish, bearish, volatility and
              whale movement.
            </p>
          </div>
        </div>
        <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl perspective-distant">
          <div className="bg-neutral-200/ absolute inset-0 z-20 h-full w-full rounded-xl bg-neutral-200/10 dark:bg-neutral-800/30"></div>
          <motion.div className="perspective-distant">
            <Image
              src={"/feat-4.png"}
              width={500}
              height={300}
              alt="fads"
              className="absolute rounded-xl shadow-xl"
            />
          </motion.div>
          <motion.div className="translate-x-10 translate-y-5 perspective-distant">
            <Image
              src={"/feat-4.png"}
              width={500}
              height={300}
              alt="fads"
              className="absolute rounded-xl shadow-xl"
            />
          </motion.div>
          <div className="absolute bottom-2 left-2">
            <h2 className="text-lg leading-5 font-medium text-[var(--secondarytext)] md:leading-7 lg:text-lg">
              Think GUI is for dummies?
            </h2>
            <p className="mt-2 text-sm font-extralight text-[var(--secondarytext)]/80">
              Like doing everything from the terminal? We&apos;ve got you covered, introducing
              Alsptein TUI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feat;
