"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const reasons = [
  {
    title: "I Love You Without Conditions",
    description:
      "No matter what happens — even when we argue, even when I feel hurt — my love for you doesn’t change. I may feel everything deeply, but I will never choose to leave you."
  },
  {
    title: "Your Care Means Everything to Me",
    description:
      "The way you care for me, even in small moments, stays with me. I may wish for it more sometimes, but every bit of it you give… I truly hold close."
  },
  {
    title: "You Are the One I Once Dreamed Of",
    description:
      "The girl I once imagined as my future, my wife… is now the one loving me. When a dream becomes real, how could I ever let it go?"
  },
  {
    title: "Your Presence Feels Like Home",
    description:
      "You, with your beauty, your love, your presence beside me… it feels unreal sometimes. Having you in my life is something I never want to lose."
  },
  {
    title: "Even Your Tears Matter to Me",
    description:
      "When you cry for me, it doesn’t push me away — it makes me care more, love more. Because it shows how real we are to each other."
  },
  {
    title: "We Are Not Perfect, but We Are Real",
    description:
      "There are moments you hurt me, and moments I feel low… but most of the time, we choose each other. And even in your worst days, I’ll be there for you."
  },
  {
    title: "We Belong Together in Every Way",
    description:
      "At the end of everything, it feels simple — we can’t live without each other. Not because we have to, but because we truly want to."
  }
];
export function WhyILoveYou() {
  const [active, setActive] = useState<null | (typeof reasons)[number]>(null);

  return (
    <section
      id="why"
      className="relative overflow-hidden py-14 sm:py-16 bg-transparent"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#2563EB20,transparent_55%),radial-gradient(circle_at_bottom,#DC26201A,transparent_55%)]" />
      <div className="absolute inset-0 starry-bg opacity-30" />
      <div className="section-wrapper relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-blue-400/90">
            Why I Value You
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            The Reasons Never Stopped
            <span className="block text-base font-normal text-white/60 mt-3">
            They Just Became More Real.
            </span>
          </h2>
          <p className="mt-4 text-sm text-white/65">
            Tap A Card to See What I Keep Remembering From Our Life Together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mt-14 mx-auto max-w-3xl rounded-[32px] border border-blue-500/15 bg-[#1E293B]/45 backdrop-blur-xl overflow-hidden p-6 sm:p-7 shadow-[0_0_20px_rgba(37,99,235,0.12)]"
        >
          <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <motion.button
                key={reason.title}
                onClick={() => setActive(reason)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className={`group relative flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-all shadow-[0_0_20px_rgba(37,99,235,0.06)] hover:-translate-y-0.5 hover:scale-[1.02] hover:border-red-500/20 hover:shadow-[0_0_30px_rgba(37,99,235,0.18),0_0_30px_rgba(220,38,38,0.12)] ${
                  index === 0 || index === 5
                    ? "ring-1 ring-red-500/20 shadow-[0_0_30px_rgba(37,99,235,0.22),0_0_35px_rgba(220,38,38,0.18)]"
                    : ""
                }`}
                aria-label={reason.title}
              >
                <span
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  aria-hidden="true"
                />
                <span className="relative mt-1 h-3.5 w-3.5 rounded-full bg-gradient-to-r from-blue-600 to-red-600 shadow-[0_0_20px_rgba(37,99,235,0.35)]" />
                <span className="flex-1">
                  <span className="block text-[16px] font-semibold text-white/90 leading-[1.4]">
                    {reason.title}
                  </span>
                  <span className="mt-1 block text-xs text-white/60">Tap to open</span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative max-w-md w-full rounded-2xl border border-red-500/25 bg-[#0B1221]/80 backdrop-blur-xl shadow-[0_0_20px_rgba(220,38,38,0.5)] p-6 sm:p-7"
              >
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 text-xs uppercase tracking-[0.22em] text-white/50 hover:text-white/80"
                >
                  Close
                </button>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-300/90 mb-3">
                  A reason I keep choosing you
                </p>
                <h3 className="font-display text-[26px] bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2 tracking-[0.01em]">
                  {active.title}
                </h3>
                <p className="text-[17px] text-white/70 leading-[1.8]">
                  {active.description}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

