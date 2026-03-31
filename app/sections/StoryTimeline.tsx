"use client";

import { motion, useReducedMotion } from "framer-motion";

const events = [
  {
    date: "May 19, 2020",
    title: "The First Message, The First Feeling",
    description:
      "For no clear reason, just a feeling I couldn’t ignore, I messaged you. Before that, I had this strange dream — you were standing in my house, already mine. So I simply said, 'Hi Dharshini', not knowing it would mean everything."
  },
  {
    date: "July 16, 2020",
    title: "Three Words, A Hundred Fears",
    description:
      "My feelings had grown too strong to hide. With fear, with hesitation, counting down in my heart — 3… 2… 1… I said it: 'I’m sorry… I love you.' I didn’t know what would happen next, only that it was real."
  },
  {
    date: "July 21, 2020",
    title: "The Day That Broke Me",
    description:
      "You said no… and everything felt heavy. I cried more than I ever thought I would, trying to forget you — but I couldn’t. Some feelings don’t leave, no matter how hard you try."
  },
  {
    date: "April 1, 2021",
    title: "A Joke That Held the Truth",
    description:
      "I hid my feelings behind a playful moment, calling it a prank… but my heart meant every word. This time, I didn’t hold back. It wasn’t a joke — it was always you."
  },
  {
    date: "April, 2021",
    title: "The Yes That Changed Everything",
    description:
      "When I asked again, you didn’t answer immediately… but later, you said yes. In that moment, everything felt right. The waiting, the pain, the hope — it all finally made sense."
  },
  {
    date: "From then to now",
    title: "Us, through everything",
    description:
      "From that moment until now, we’ve been through it all — fights, love, tears, laughter, and memories that shaped us. It was never perfect, but it was always real. And through everything, I’ve only wanted one thing… you."
  },
  {
    date: "Forever",
    title: "Only you, always",
    description:
      "No matter where life takes us, no matter what we face… I want you by my side, till my last breath. Not just as part of my life — but as my forever. I love you."
  }
];

export function StoryTimeline() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="story"
      className="relative py-14 sm:py-16 lg:py-20 bg-transparent"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.26),transparent_55%),radial-gradient(circle_at_bottom,rgba(220,38,38,0.14),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0F172A]/95 via-[#0F172A]/60 to-transparent" />
      <div className="section-wrapper relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-400/90">
            Story Timeline
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-4xl bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(37,99,235,0.18)]">
          Where It All Began and Never Ended
            <span className="block text-base font-normal text-white/60 mt-3">
            From Nervous to Forever.
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 relative">
          {/* Softer, less harsh timeline line */}
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/35 via-white/10 to-red-600/35" />
          <div className="space-y-20">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              const isHighlighted = Boolean((event as { highlight?: boolean }).highlight);
              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={undefined}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.35,
                    delay: 0,
                    ease: "easeOut"
                  }}
                  className={`relative flex items-stretch transition-transform ${
                    isLeft ? "sm:justify-start" : "sm:justify-end"
                  }`}
                  style={{ willChange: "transform, opacity" }}
                  >
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 mt-1 h-4 w-4 rounded-full bg-black">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-red-600 shadow-[0_0_20px_rgba(37,99,235,0.35)]" />
                    <div className="absolute inset-1 rounded-full bg-black" />
                  </div>

                  <div
                    className={`mt-0 sm:w-1/2 pl-10 sm:pl-0 ${
                      isLeft ? "sm:pr-14" : "sm:pl-14"
                    }`}
                  >
                    <div
                      className={[
                        "glass-panel group relative overflow-hidden p-6 sm:p-7 transition-colors",
                        "border-blue-500/15 hover:border-red-500/25",
                        isHighlighted
                          ? "border-red-500/25 hover:shadow-[0_0_25px_rgba(220,38,38,0.16)] scale-[1.005]"
                          : "",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80",
                          isHighlighted
                            ? "from-red-600/20 via-transparent to-blue-600/10"
                            : "from-blue-600/15 via-transparent to-red-600/20",
                        ].join(" ")}
                      />
                      <div className="relative space-y-3">
                        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-blue-300/90">
                          {event.date}
                        </p>
                        <h3 className="font-display text-[22px] sm:text-[24px] text-white">
                          {event.title}
                        </h3>
                        <p className="text-[17px] leading-relaxed text-white/70">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

