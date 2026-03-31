"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const typewriterLines = [
  "I asked you, hiding my nerves behind a playful lie,",
  "Until the truth slipped out in three words: I love you.",
  "And somewhere along the way, you began to fall for me too.",
  "This is where I keep those moments, safe and forever ours.",
];

export function HeroSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-transparent"
    >
            <div className="absolute inset-0 -z-20">
  {/* Gradient base */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#020617]" />

  {/* Blue glow */}
  <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 blur-[140px] opacity-20" />

  {/* Red glow */}
  <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-red-600/30 blur-[140px] opacity-20" />

  {/* Center soft light */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_60%)]" />
      </div>

      <div className="section-wrapper relative z-10 flex flex-col gap-8 md:flex-row md:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 md:min-h-[520px] flex flex-col justify-between gap-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-[#0F172A]/40 px-4 py-1 text-[11px] uppercase tracking-[0.26em] text-white/70 backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
            Our Beginning
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-display lg:text-[30px] text-[46px] sm:text-[52px] leading-tight tracking-[0.05em] bg-gradient-to-r from-blue-200 to-red-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(37,99,235,0.26)]"
          >
            The Day You Changed Everything
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="max-w-xl text-[17px] sm:text-[18px] leading-[1.8] text-white/70"
          >
          One Moment Became Our Forever. I Made This For You, So We Can Always Return To That Feeling, Whenever We Want.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-red-600/15 opacity-70" />
              <div className="relative space-y-1 text-xs font-medium tracking-[0.22em] text-white/60 uppercase">
                <span className="text-[10px] text-white/40">Memories I Still Hold Close</span>
                {typewriterLines.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.8 + index * 0.9,
                      duration: 0.9
                    }}
                    className="font-body text-[11px] normal-case tracking-normal text-white/80"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#story"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-red-600 px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-[1.05] transition duration-300"              >
   A Journey Back to Us
              </a>
              <p className="text-[11px] text-white/50">
              Scroll to step into our timeline, and read the words I wrote for you after.
                            </p>
            </div>
          </motion.div>
        </motion.div>
 
        <motion.div
          className="mt-6 flex-1 md:min-h-[520px] md:mt-0 md:self-stretch"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
        >
          <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
            <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.35),transparent_55%),radial-gradient(circle_at_bottom,rgba(220,38,38,0.22),transparent_55%)] blur-[90px] opacity-45" />

            <div className="absolute inset-0 rounded-[32px] border border-blue-500/15 bg-[#1E293B]/30 backdrop-blur-2xl" />

            <div className="relative h-full rounded-[32px] border border-white/10 bg-[#1E293B]/35 p-6 backdrop-blur-2xl flex flex-col justify-between shadow-[0_0_45px_rgba(37,99,235,0.14)] overflow-hidden">
              {/* Darker premium layers (reduce "lite" look) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_55%),radial-gradient(circle_at_bottom,rgba(220,38,38,0.12),transparent_55%)]" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/16 via-[#0F172A]/20 to-red-600/10" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-white/50">
                    The Beginning of Everything
                  </p>
                  <p className="font-display text-[26px] leading-[1.3] tracking-[0.01em] bg-gradient-to-r from-blue-200 to-red-200 bg-clip-text text-transparent">
                    The question I kept rehearsing until it finally became real.
                  </p>
                  <p className="text-[15px] sm:text-[16px] text-white/75 leading-relaxed">
                    And in that moment... everything changed.
                  </p>
                </div>
                {/* Fills the visual center gap with a subtle premium heart */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center h-16 w-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_28px_rgba(37,99,235,0.18)]">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="text-white/80"
                    >
                      <path
                        d="M12 21s-7-4.534-9.5-8.5C.6 9.1 2.3 6 5.7 6c1.9 0 3.2 1.1 4 2.1.8-1 2.1-2.1 4-2.1 3.4 0 5.1 3.1 3.2 6.5C19 16.466 12 21 12 21Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.8 11.7c1.2 2 3.7 4 6.2 5.5 2.5-1.5 5-3.5 6.2-5.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        opacity="0.7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-white/60">
                  <p>
                    I remember the nerves, the silence, and how much I wanted that moment to be yours.
                  </p>
                  <p className="text-[10px] text-white/40">
                    This is your gift - so we can return to it whenever we want.
                  </p>
                  <p className="text-[10px] text-white/45 leading-relaxed">
                    April didn’t just answer my question. It changed how I see everything.
                  </p>
                  <p className="text-[10px] text-white/45 leading-relaxed">
                    Every time we read this again, I fall for you all over again.
                  </p>
                  <p className="text-[10px] text-white/45 leading-relaxed">
                    This card holds the part of me that waited, hoped, and got the best answer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

