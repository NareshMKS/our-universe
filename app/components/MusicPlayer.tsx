"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { title } from "process";

const CONSENT_KEY = "musicConsent:v1";
const MUSIC_TRACK_KEY = "musicTrackIndex:v1";
const MUSIC_VOLUME_KEY = "musicVolume:v1";

// mp3 files stored next to this component
// `new URL(..., import.meta.url)` ensures bundlers emit them and returns a valid URL.
const TRACKS = [
  {
    title: "Oorum Blood",
    src: new URL("./oorumblood.mp3", import.meta.url).toString(),
  },
  {
    title: "Pavazha Malli",
    src: new URL("./pavazhamalli.mp3", import.meta.url).toString(),
  },
  {
    title: "Anbil Avan",
    src: new URL("./anbilavan.mp3", import.meta.url).toString(),
  },
  {
    title: "Call This Love",
    src: new URL("./ithinktheycallthislove.mp3", import.meta.url).toString(),
  },
  {
    title: "Uyirey",
    src: new URL("./uyire.mp3", import.meta.url).toString(),
  }
];

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // IMPORTANT: keep first render deterministic to avoid hydration mismatch.
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  const shouldPlayRef = useRef(false);
  const autoplayAttemptedRef = useRef(false);
  const volumeRef = useRef(0.28);
  const mutedRef = useRef(true);

  // User-controlled settings
  const [volume, setVolume] = useState(0.28); // low default (0.2–0.4)
  const [muted, setMuted] = useState(true); // start muted for autoplay policy

  useEffect(() => {
    setMounted(true);

    // Load persisted selection/settings AFTER mount to avoid hydration mismatch.
    try {
      const rawTrack = window.localStorage.getItem(MUSIC_TRACK_KEY);
      const n = rawTrack ? Number(rawTrack) : 0;
      if (Number.isFinite(n)) {
        setTrackIndex(Math.max(0, Math.min(TRACKS.length - 1, Math.trunc(n))));
      }
    } catch {
      // ignore
    }

    try {
      const rawVol = window.localStorage.getItem(MUSIC_VOLUME_KEY);
      const n = rawVol ? Number(rawVol) : 0.28;
      if (Number.isFinite(n)) setVolume(Math.max(0, Math.min(1, n)));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const fadeVolumeTo = (to: number, durationMs: number) => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve();

    const clampedTo = Math.max(0, Math.min(1, to));
    const from = audio.volume;
    const start = performance.now();

    return new Promise<void>((resolve) => {
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / Math.max(1, durationMs));
        const value = from + (clampedTo - from) * t;
        audio.volume = Math.max(0, Math.min(1, value));
        if (t >= 1) resolve();
        else requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });
  };

  useEffect(() => {
    const audio = new Audio(TRACKS[trackIndex]?.src ?? TRACKS[0].src);
    audio.loop = false;
    audio.muted = true; // keep muted until user interaction
    audio.volume = volume;

    // Use `canplay` (faster) so the UI isn't blocked while loading large audio files.
    audio.addEventListener("canplay", () => {
      setIsReady(true);
    });

    // Auto-advance playlist when the current song ends.
    audio.onended = () => {
      shouldPlayRef.current = true;
      setIsPlaying(true);
      setTrackIndex((i) => (i + 1) % TRACKS.length);
    };

    audioRef.current = audio;

    // Attempt autoplay on load. If blocked, show a soft overlay.
    (async () => {
      if (autoplayAttemptedRef.current) return;
      autoplayAttemptedRef.current = true;
      try {
        shouldPlayRef.current = true;
        audio.muted = true;
        audio.volume = volumeRef.current;
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        shouldPlayRef.current = false;
        setIsPlaying(false);
        setAutoplayBlocked(true);
      }
    })();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    // When switching tracks, keep the same volume/mute, and keep playing if already playing.
    const audio = audioRef.current;
    const next = TRACKS[trackIndex];
    if (!audio || !next) return;

    const shouldPlay = shouldPlayRef.current;
    shouldPlayRef.current = false;

    // Smooth fade-out when moving to the next song.
    if (shouldPlay && !mutedRef.current) {
      audio.muted = false;
      audio.volume = volumeRef.current;
      void fadeVolumeTo(0, 120);
    }

    audio.pause();
    audio.src = next.src;
    audio.load();
    setIsReady(false);

    const onCanPlay = async () => {
      setIsReady(true);
      if (shouldPlay) {
        try {
          audio.muted = mutedRef.current;
          audio.volume = mutedRef.current ? 0 : volumeRef.current;
          await audio.play();
          setIsPlaying(true);

          // Fade-in for cinematic transitions.
          if (!mutedRef.current) {
            audio.volume = 0;
            await fadeVolumeTo(volumeRef.current, 180);
          }
        } catch {
          // ignore
        }
      }
    };

    audio.addEventListener("canplay", onCanPlay, { once: true });
    return () => audio.removeEventListener("canplay", onCanPlay);
  }, [trackIndex]);

  useEffect(() => {
    // If user consented before, we can skip the disclaimer (but still require
    // a user gesture in this session to start playback).
    try {
      const v = window.localStorage.getItem(CONSENT_KEY);
      if (v === "ok") setDisclaimerOpen(false);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(MUSIC_TRACK_KEY, String(trackIndex));
    } catch {
      // ignore
    }
  }, [trackIndex]);

  useEffect(() => {
    try {
      window.localStorage.setItem(MUSIC_VOLUME_KEY, String(volume));
    } catch {
      // ignore
    }
  }, [volume]);

  useEffect(() => {
    // Keep live settings synced to the underlying audio element.
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
    audio.muted = muted;
  }, [muted, volume]);

  const startPlayback = async (opts?: { unmute?: boolean }) => {
    const audio = audioRef.current;
    if (!audio) return;
    const unmute = opts?.unmute ?? false;

    try {
      shouldPlayRef.current = true;

      // Persist consent and allow autoplay for the current session only after this click.
      try {
        window.localStorage.setItem(CONSENT_KEY, "ok");
      } catch {
        // ignore
      }

      // Keep controls available; user can close manually.

      if (unmute) {
        setMuted(false);
        mutedRef.current = false;
      }

      audio.muted = unmute ? false : mutedRef.current;
      audio.volume = unmute ? volumeRef.current : mutedRef.current ? 0 : volumeRef.current;

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Playback error:", err);
    }
  };

  const pausePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    shouldPlayRef.current = false;
  };

  const onMusicButtonClick = () => {
    // Always open the music controls when the user clicks.
    setDisclaimerOpen(true);

    if (isPlaying) {
      if (mutedRef.current) {
        // Autoplay may have started muted; clicking should enable sound, not pause.
        void startPlayback({ unmute: true });
        return;
      }

      pausePlayback();
      return;
    }

    // User interaction unlock: unmute and start (or resume).
    void startPlayback({ unmute: true });
  };

  return (
    <>
      <motion.button
        id="music"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        onClick={onMusicButtonClick}
        className="fixed bottom-6 right-6 z-30"
        aria-label={isPlaying ? "Pause our song" : "Play our song"}
      >
        <motion.div
          animate={{
            scale: isPlaying ? [1, 1.08, 1] : 1,
          }}
          transition={{
            duration: isPlaying ? 1.6 : 0.8,
            repeat: isPlaying ? Infinity : 0,
          }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-red-600 to-blue-700"
        >
          <div className="absolute inset-1 rounded-full bg-black/70 backdrop-blur-xl border border-white/15" />
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              ease: "linear",
              duration: 10,
            }}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-black/60 border border-white/20"
          >
            <span className="absolute inset-2 rounded-full border border-white/10" />
            <span className="absolute inset-4 rounded-full bg-gradient-to-b from-blue-400 to-red-600" />
            <span className="relative text-xs font-semibold tracking-[0.18em] uppercase text-white/80">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </motion.div>
        </motion.div>
        <p className="mt-2 text-[10px] text-center text-white/60 tracking-[0.26em] uppercase">
          {mounted ? TRACKS[trackIndex]?.title ?? "Our song" : "Our song"}
        </p>
      </motion.button>

      <AnimatePresence>
        {autoplayBlocked && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              void startPlayback({ unmute: true });
              setAutoplayBlocked(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative max-w-md w-full rounded-2xl border border-white/10 bg-[#0B1221]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(37,99,235,0.18)] p-6 text-center"
              role="button"
              tabIndex={0}
            >
              <p className="text-[16px] leading-[1.8] text-white/85">
                Music is part of this experience <span className="font-accent text-white/95">💙</span>
                <br />
                Tap to begin
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {disclaimerOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative max-w-lg w-full rounded-2xl border border-red-500/25 bg-[#0B1221]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(220,38,38,0.25)] p-6 sm:p-7"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,#DC26201A,transparent_55%),radial-gradient(circle_at_bottom,#2563EB14,transparent_55%)]" />

              <div className="relative">
                <h3 className="font-display text-[30px] sm:text-[34px] leading-[1.2] tracking-[0.03em] bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                  Music Disclaimer ❤️
                </h3>

                <p className="mt-3 text-[17px] leading-relaxed text-white/75">
                  This experience includes background music that plays automatically ❤️
                  To keep it comfortable in classes/meetings, you can use Low Volume.
                </p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-white/80">Song</p>
                    <p className="text-sm text-white/60">
                      {TRACKS[trackIndex]?.title ?? "Our song"}
                    </p>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        (() => {
                          shouldPlayRef.current = true;
                          setMuted(false);
                          mutedRef.current = false;
                          return setTrackIndex(
                            (i) => (i - 1 + TRACKS.length) % TRACKS.length
                          );
                        })()
                      }
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-blue-500/25 transition"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        shouldPlayRef.current = true;
                        setMuted(false);
                        mutedRef.current = false;
                        setTrackIndex((i) => (i + 1) % TRACKS.length);
                      }}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-red-500/25 transition"
                    >
                      Next
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-white/80">Volume</p>
                    <p className="text-sm text-white/60">{Math.round(volume * 100)}%</p>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="mt-3 w-full"
                  />

                  <div className="mt-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <button
                      type="button"
                      onClick={() => setMuted((v) => !v)}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-red-500/25 hover:shadow-[0_0_20px_rgba(220,38,38,0.12)] transition"
                    >
                      {muted ? "Unmute" : "Mute"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setVolume(0.12);
                        setMuted(false);
                      }}
                      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-red-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_25px_rgba(37,99,235,0.18)] hover:brightness-110 transition"
                    >
                      Reduce for meetings/classes
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {!isPlaying ? (
                    <button
                      type="button"
                      onClick={() => startPlayback({ unmute: true })}
                      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:brightness-110 transition disabled:opacity-50"
                    >
                      Continue / Enter
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={pausePlayback}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:border-red-500/25 transition"
                    >
                      Pause music
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setDisclaimerOpen(false)}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 hover:border-red-500/25 transition"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

