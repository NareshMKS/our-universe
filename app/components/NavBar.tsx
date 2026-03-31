"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#together", label: "Together" },
  { href: "#story", label: "Timeline" },
  { href: "#why", label: "Value" },
  { href: "#letters", label: "Memories" },
  { href: "#forever", label: "Forever" },
  { href: "#footer", label: "Contact" },
];

export function NavBar() {
  const sections = useMemo(
    () => links.map((l) => ({ id: l.href.replace("#", ""), label: l.label })),
    []
  );

  const spySections = useMemo(
    () => sections.filter((s) => s.id !== "music"),
    [sections]
  );

  const [activeId, setActiveId] = useState<string>(spySections[0]?.id ?? "hero");

  useEffect(() => {
    const hashId = window.location.hash.replace("#", "");
    if (hashId && sections.some((s) => s.id === hashId)) setActiveId(hashId);

    const observed = spySections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (!observed.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    
        if (visibleSections.length > 0) {
          const topSection = visibleSections[0].target as HTMLElement;
          setActiveId(topSection.id);
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-20% 0px -50% 0px",
      }
    );

    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, spySections]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-30"
    >
      <nav className="section-wrapper pt-4 pb-3">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 via-transparent to-red-600/5 pointer-events-none" />
        <div
className="glass-panel flex items-center justify-between px-5 py-3 
bg-[#020617]/70 backdrop-blur-2xl 
border border-white/10 
shadow-[0_8px_40px_rgba(0,0,0,0.6)] 
rounded-2xl border-t border-blue-500/20" >
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]"
              aria-hidden="true"
            />
            <span className="text-sm font-semibold tracking-[0.22em] uppercase text-white/70">
              Our Story
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-xs font-medium">
            {links.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveId(id)}
                  className="relative group tracking-[0.18em] uppercase text-white/70 transition transform hover:scale-105"
                >
                  <span
                    className={
                      isActive
                        ? "text-red-400 font-semibold tracking-[0.2em]"
                        : "group-hover:text-blue-400"
                    }
                  >
                    {link.label}
                  </span>

                  <span
                    className={`pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-blue-600 via-white to-red-600 opacity-70 transition-transform ${
                      isActive ? "scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile: show anchor links horizontally */}
          <div className="md:hidden flex items-center gap-3 overflow-x-auto">
            {links.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveId(id)}
                  className={`shrink-0 text-[10px] uppercase tracking-[0.22em] transition ${
                    isActive ? "text-red-400" : "text-white/70 hover:text-blue-400"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

