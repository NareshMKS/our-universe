"use client";

import { useState } from "react";
import life from "@components/life.jpeg";
import { useReducedMotion, motion } from "framer-motion";

export function TogetherPhoto() {
  const reducedMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  return (
    <section id="together" className="relative py-14 sm:py-16 bg-transparent">
      <div className="absolute inset-0 -z-10 bg-[#0F172A]/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_55%),radial-gradient(circle_at_bottom,rgba(220,38,38,0.12),transparent_55%)]" />

      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reducedMotion ? 0 : 0.5,
            ease: "easeOut",
          }}
          className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8 md:flex-row-reverse lg:flex-row"
        >
          {/* Image half */}
          <div className="w-full md:w-1/2">
            <div className="relative group overflow-hidden rounded-2xl shadow-[0_0_60px_rgba(37,99,235,0.18)] border border-white/10">
              {!imgError ? (
                <img
                  src={life.src}
                  alt="Our together"
                  className="w-full max-h-[460px] object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="min-h-[260px] bg-gradient-to-br from-rose-500/20 via-indigo-500/10 to-purple-500/15" />
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-purple-500/10" />
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_55%)]" />
            </div>
          </div>

          {/* Text half */}
          <div className="w-full md:w-1/2 flex">
            <div className="glass-panel relative w-full rounded-2xl p-6 sm:p-8 overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.10)]">
              <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_55%),radial-gradient(circle_at_bottom,rgba(220,38,38,0.14),transparent_55%)]" />
              <div className="relative space-y-4">
                <p className="text-xs uppercase tracking-[0.26em] text-blue-400/90">
                  Our Together Photo
                </p>

                <h2 className="font-display text-[34px] sm:text-[38px] text-bold leading-[1.2] tracking-[0.04em] bg-gradient-to-r from-blue-200 to-red-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(37,99,235,0.14)]">
                  A Single Moment. <br /> A Lifetime.
                </h2>

                <p className="text-[17px] sm:text-[18px] leading-[1.8] text-white/75">
                  This is the frame we return to when life moves fast. The moment we shared together. Our beginning, our forever. <br /> <br />
                  <span className="font-accent text-[20px] text-white/90">
                    "And somehow... it was always you."
                  </span>
                </p>

                <p className="text-[17px] leading-[1.8] text-white/70">
                  <span className="font-accent text-[20px] text-white/90">
                    "I Love You."
                    <br />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

