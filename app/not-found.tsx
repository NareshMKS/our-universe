import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#0F172A] text-[#F8FAFC]">
      <div className="max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(37,99,235,0.18)]">
        <h1 className="font-display text-4xl sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-white/70 leading-relaxed">
          The link you followed doesn&apos;t exist here.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.25)] hover:brightness-110 transition"
          >
            Return to home
          </Link>
        </div>
      </div>
    </main>
  );
}

