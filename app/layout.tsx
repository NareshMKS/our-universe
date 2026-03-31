import type { Metadata } from "next";
import { Dancing_Script, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { RomanticParticles } from "./components/RomanticParticles";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Our Universe - April 1 & April 2",
  description:
    "A gift built from the moments you accepted, and the life our " +
    "yes began."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable} ${dancingScript.variable} font-body text-[#F8FAFC] bg-[#0F172A] min-h-screen bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.28),transparent_55%),radial-gradient(circle_at_bottom,rgba(220,38,38,0.18),transparent_55%)]`}
      >
        <RomanticParticles />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

