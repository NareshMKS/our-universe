"use client";

import { motion, useReducedMotion } from "framer-motion";

// TODO: replace with your real details
const PHONE_NUMBER = "8754276530";
const INSTAGRAM_URL = "https://www.instagram.com/peacebro_naresh";

export function Footer() {
  const reducedMotion = useReducedMotion();

  return (
    <footer id="footer" className="relative py-14 sm:py-16 bg-transparent">
      <div className="absolute inset-0 -z-10 bg-[#0F172A]/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.14),transparent_55%),radial-gradient(circle_at_bottom,rgba(147,51,234,0.12),transparent_55%)]" />

      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
          className="glass-panel relative overflow-hidden rounded-2xl p-6 sm:p-8"
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-rose-500/10 via-transparent to-purple-500/10" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.26em] text-white/55">
                Stay close
              </p>
              <h2 className="font-display text-[30px] sm:text-[34px] leading-[1.2] tracking-[0.03em] bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Love Chats, Calls, Reels, Fights
              </h2>
              <p className="text-[17px] leading-[1.8] text-white/70">
                If you miss me, you know where to find me.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(220,38,38,0.25)] hover:brightness-110 transition"
              >
                Chat / Call
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:border-purple-400/25 hover:shadow-[0_0_25px_rgba(147,51,234,0.14)] transition"
              >
                Reels + Notes
              </a>
            </div>
          </div>

          <p className="relative mt-6 text-[12px] uppercase tracking-[0.26em] text-white/45">
            Made with Patience, Nerves, and a Lot of Love.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

