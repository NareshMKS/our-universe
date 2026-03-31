import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          background: "#05010a",
          deepPurple: "#1a0630",
          pink: "#ff4b91",
          purple: "#c471f5"
        }
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "system-ui", "sans-serif"],
        accent: ["var(--font-dancing-script)", "cursive"]
      },
      boxShadow: {
        "glow-pink": "0 0 25px rgba(255, 75, 145, 0.6)",
        "glow-purple": "0 0 30px rgba(196, 113, 245, 0.5)"
      },
      backgroundImage: {
        "universe-gradient":
          "radial-gradient(circle at top, rgba(196,113,245,0.35), transparent 55%), radial-gradient(circle at bottom, rgba(255,75,145,0.25), transparent 55%), linear-gradient(135deg, #05010a, #120018, #05010a)"
      }
    }
  },
  plugins: []
};

export default config;

