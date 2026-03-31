"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MemoryLetter = {
  key: string;
  title: string;
  body: string;
  clueQuestion: string;
  answers: string[];
};

const MEMORIES: MemoryLetter[] = [
  {
    key: "Hi Nanba..",
    title: "April 2021 – 'Hi Nanba'",
    body: "It was just another school day… until it wasn’t.\n\nYou walked up to me in 10th class and said, “Hi Nanba.”\n\nThat one sentence — so simple — somehow changed everything. I didn’t know what to say… I just stood there, fully blushing, with the widest smile I couldn’t control.\n\nIn that moment, I didn’t realize it was the beginning of something unforgettable. But my heart knew… something had started.",
    clueQuestion: "That moment made my heart react… what did I have?",
    answers: ["smile", "blush", "big smile", "blushed"],
  },
  {
    key: "Real Love",
    title: "October 2021 – The Day You Missed Me",
    body: "I wasn’t there that day.\n\nJust a normal absence… I had gone to my native place, thinking it was nothing big.\n\nBut you felt it differently.\n\nYou told me you cried.\n\nCried because I wasn’t in class.\n\nThat hit me in a way I can’t explain. It wasn’t just missing someone… it was care, it was attachment, it was something deeper.\n\nThat’s when I realized — I mattered to you. Truly.",
    clueQuestion: "What did you feel when I wasn’t there?",
    answers: ["miss you", "missed you", "i missed you", "miss"],
  },
  {
    key: "First Kiss",
    title: "Jan 25, 2023 – First Real Kiss",
    body: "So many times before, it was just words…\n\n“Kiss” in chats, emojis, imagination — everything virtual.\n\nBut that day… it became real.\n\nFor the first time in my life, I held your hand… and kissed it.\n\nIt wasn’t loud, it wasn’t dramatic — but it meant everything.\n\nThat one small moment carried all the feelings I had kept inside for so long.\n\nFrom virtual… to real.\n\nFrom words… to us.",
    clueQuestion: "Where did I kiss you for the first time?",
    answers: ["hand", "your hand", "on hand"],
  },
];

function normalizeAnswer(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

export function SecretLetters() {
  const [active, setActive] = useState<MemoryLetter | null>(null);
  const [unlockedByKey, setUnlockedByKey] = useState<Record<string, boolean>>({});
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const isUnlocked = (key: string) => Boolean(unlockedByKey[key]);

  const tryUnlockActive = () => {
    if (!active) return;
    const normalized = normalizeAnswer(answer);
    const ok = active.answers.some((a) => normalizeAnswer(a) === normalized);
    if (ok) {
      setUnlockedByKey((prev) => ({ ...prev, [active.key]: true }));
      setFeedback(null);
      return;
    }
    setFeedback("Not quite... but you're close ❤️");
  };

  return (
    <section
      id="letters"
      className="relative py-14 sm:py-16 bg-transparent"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(220,38,38,0.13),transparent_55%)]" />
      <div className="section-wrapper relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-blue-400/90">
            Notes From Our Beginning
          </p>
          <h2 className="mt-3 font-display text-[34px] sm:text-[38px] bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent tracking-[0.03em] leading-[1.2]">
            Unlock Each Memory
            <span className="block text-[16px] font-normal text-white/60 mt-3 leading-[1.7]">
              Each Note Has Its Own Little Clue.
            </span>
          </h2>
          <p className="mt-4 text-[16px] text-white/65 leading-[1.8]">
            Tap a card. If it is locked, it will ask you something sweet.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MEMORIES.map((letter, index) => {
            const isLocked = !isUnlocked(letter.key);
            return (
            <button
              key={letter.key}
              type="button"
              onClick={() => {
                setActive(letter);
                setAnswer("");
                setFeedback(null);
              }}
              aria-disabled={false}
              className="group relative text-left rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-[0_0_20px_rgba(37,99,235,0.08)] hover:border-red-500/20 hover:shadow-[0_0_35px_rgba(37,99,235,0.18),0_0_30px_rgba(220,38,38,0.12)] transition transform hover:scale-[1.01] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/12 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition pointer-events-none" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/50">
                    Memory {index + 1}
                  </p>
                  <span className="h-2.5 w-2.5 mt-1 rounded-full bg-gradient-to-r from-blue-600 to-red-600 shadow-[0_0_20px_rgba(37,99,235,0.35)]" />
                </div>

                <h3 className="mt-3 font-display text-xl text-white/95">
                  {letter.title}
                </h3>
                <p
                  className={[
                    "mt-2 text-sm text-white/65 leading-relaxed",
                    isLocked ? "blur-[2px]" : "blur-0",
                  ].join(" ")}
                >
                  {letter.body.length > 140
                    ? `${letter.body.slice(0, 140)}...`
                    : letter.body}
                </p>

                {isLocked ? (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0F172A]/40 px-3 py-2 text-xs text-white/70 backdrop-blur-xl">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="text-white/80"
                    >
                      <path
                        d="M7 10V7a5 5 0 0110 0v3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 10h12v10H6V10z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>This memory is waiting...</span>
                  </div>
                ) : (
                  <span className="mt-4 inline-flex text-xs uppercase tracking-[0.22em] text-white/55">
                    Tap to open
                  </span>
                )}
              </div>
            </button>
            );
          })}
        </motion.div>

        <div className="mt-10 text-center">
          <p className="text-[16px] text-white/75 leading-[1.8] drop-shadow-[0_0_18px_rgba(37,99,235,0.35)]">
            For More Memories, Let's Create Them.
            <br /> <span className="ml-2 font-accent text-white/90">With Love</span>
          </p>
          <p className="mt-2 text-[14px] text-white/55 leading-[1.8]">
            Blooms of Kisses 💋💋💋 and Hugs 🤗🤗🤗
          </p>
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-xl px-4 pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative max-w-lg w-full rounded-2xl border border-red-500/25 bg-[#0B1221]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(220,38,38,0.35)] p-6 sm:p-7 overflow-hidden"
              >
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 text-xs uppercase tracking-[0.22em] text-white/50 hover:text-white/80"
                >
                  Close
                </button>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/12 via-transparent to-red-600/10" />

                <p className="relative text-xs uppercase tracking-[0.28em] text-white/50 mb-3">
                  {isUnlocked(active.key) ? "A moment from our memory" : "This memory is locked"}
                </p>

                <h3 className="relative font-display text-2xl bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-3">
                  {isUnlocked(active.key) ? active.title : "This memory is waiting..."}
                </h3>

                <p className="relative text-sm text-white/75 leading-relaxed whitespace-pre-line">
                  {isUnlocked(active.key)
                    ? active.body
                    : "Answer the clue above to reveal what I wrote in that exact moment."}
                </p>

                {!isUnlocked(active.key) ? (
                  <form
                    className="relative mt-6 space-y-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      tryUnlockActive();
                    }}
                  >
                    <p className="text-xs uppercase tracking-[0.26em] text-white/55">
                      Clue
                    </p>
                    <p className="text-[16px] text-white/80 leading-relaxed">
                      {active.clueQuestion}
                    </p>

                    <input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      className="w-full rounded-2xl bg-[#0F172A]/60 border border-white/10 px-4 py-2 text-sm text-white/90 placeholder:text-white/30 backdrop-blur-xl outline-none focus:border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.08)]"
                    />

                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-red-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.28)] hover:scale-[1.01] transition transform"
                    >
                      Unlock this memory
                    </button>

                    {feedback && (
                      <motion.p
                        key={feedback}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-300/90"
                      >
                        {feedback}
                      </motion.p>
                    )}
                  </form>
                ) : (
                  <p className="relative mt-6 text-[17px] text-white/70 leading-[1.8]">
                    And somehow... it was always you.
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

