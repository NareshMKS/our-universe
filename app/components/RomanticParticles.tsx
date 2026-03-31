"use client";

import { useCallback, useEffect, useState } from "react";
import { loadFull } from "tsparticles";
import type { Engine, Container } from "tsparticles-engine";
import Particles from "react-tsparticles";

export function RomanticParticles() {
  // Defer particles boot a tiny bit so the first paint is faster.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setEnabled(true), 200);
    return () => window.clearTimeout(t);
  }, []);

  const init = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const loaded = useCallback(async (_container: Container | undefined) => {
    return;
  }, []);

  if (!enabled) return null;

  return (
    <Particles
      id="particles-background"
      init={init}
      loaded={loaded}
      className="fixed inset-0 z-0 pointer-events-none"
      options={{
        fullScreen: { enable: false, zIndex: 0 },
        background: {
          color: "transparent"
        },
        fpsLimit: 60,
      
        particles: {
          number: {
            value: 55,
            density: { enable: true, area: 800 }
          },
      
          color: {
            value: "#2563EB" // premium blue particles
          },
      
          shape: {
            type: "circle"
          },
      
          opacity: {
            value: 0.22,
            random: true,
            animation: {
              enable: true,
              speed: 0.4,
              minimumValue: 0.08,
              sync: false
            }
          },
      
          size: {
            value: { min: 1, max: 3 }
          },
      
          links: {
            enable: true,
            distance: 150,
            color: { value: "#DC2626" }, // red link lines
            opacity: 0.24,
            width: 1
          },
      
          move: {
            enable: true,
            speed: 0.38,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out"
            }
          }
        },
      
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            onClick: {
              enable: true,
              mode: "push"
            }
          },
      
          modes: {
            repulse: {
              distance: 120,
              duration: 0.35
            },
            push: {
              quantity: 2
            }
          }
        },
      
        detectRetina: true
      }}
    />
  );
}

