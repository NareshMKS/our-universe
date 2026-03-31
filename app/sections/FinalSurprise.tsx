"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

export function FinalSurprise() {
  const [open, setOpen] = useState(false);

  const launchConfetti = useCallback(() => {
    const end = Date.now() + 700;
    const colors = ["#2563EB", "#DC2626", "#F43F5E", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 60,
        spread: 70,
        startVelocity: 45,
        ticks: 150,
        origin: { y: 0.6 },
        colors
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const onClick = () => {
    setOpen(true);
    launchConfetti();
  };

  return (
    <section
      id="forever"
      className="relative py-14 sm:py-16 lg:py-20 bg-transparent"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(37,99,235,0.16),transparent_55%)]" />
      <div className="section-wrapper relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.32em] text-red-400/90"
        >
          Our Beginning
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent"
        >
          The Best Answer of My Life
          <span className="block text-base font-normal text-white/70 mt-3">
            That one "yes" changed everything for me.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <motion.button
            type="button"
            onClick={onClick}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 px-10 py-4 text-base font-semibold tracking-wide text-white shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:brightness-110 transition transform"
            initial={false}
            animate={open ? { scale: 1 } : { scale: [1, 1.03, 1] }}
            transition={{
              duration: 1.6,
              repeat: open ? 0 : Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            Forever Starts Here <span aria-hidden="true">❤️</span>
          </motion.button>
          <p className="max-w-md text-xs text-white/60">
            When you said yes, it didn&apos;t just change that day-it changed the way I see everything that comes next.
          </p>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-xl px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative max-w-lg w-full rounded-2xl border border-red-500/25 bg-black/60 backdrop-blur-xl shadow-[0_0_50px_rgba(220,38,38,0.25)] p-6 sm:p-8 text-center overflow-hidden"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 text-xs uppercase tracking-[0.22em] text-white/50 hover:text-white/80"
                >
                  Close
                </button>
                <p className="text-xs uppercase tracking-[0.32em] text-red-400/90 mb-3">
                  Forever starts now
                </p>
                <h3 className="font-display text-2xl sm:text-3xl bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-3">
                  Thank you for saying yes.
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  I&apos;ll keep showing up - on the good days, on the hard days, and on all the ordinary days in between. Because that one "yes" is still shaping the way I love you.
                </p>
                <p className="mt-5 text-[11px] text-white/45 uppercase tracking-[0.26em]">
                  It's just our beginning - we&apos;re still going.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

