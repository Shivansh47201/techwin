// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Techwin",
  description:
    "Techwin Blog – laser technology insights, application notes, and product updates. Coming soon.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white pt-40 pb-16">
      {/* Background Accent */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#3B9ACB]/10 blur-3xl" />
      </div>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        {/* Back link */}
        <div className="mb-6 w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#3B9ACB] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3B9ACB]/20 bg-[#3B9ACB]/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#3B9ACB]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
          Blog Coming Soon
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Techwin Laser Insights
          <span className="block bg-linear-to-r from-[#3B9ACB] to-sky-400 bg-clip-text text-transparent">
            Blog launching soon
          </span>
        </h1>

        {/* Subheading */}
        <p className="mb-8 max-w-2xl text-balance text-sm text-slate-600 sm:text-base">
          We’re preparing in-depth articles on single-frequency fiber lasers, LiDAR,
          quantum applications, spectroscopy, and real-world case studies. Stay tuned
          for fresh content straight from the Techwin engineering team.
        </p>

        {/* Info card */}
        <div className="mb-10 w-full max-w-xl rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm ring-1 ring-slate-100/60 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B9ACB]/10">
                <Clock className="h-5 w-5 text-[#3B9ACB]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  First posts expected
                </p>
                <p className="text-sm font-medium text-slate-900">
                  Very soon – development in progress
                </p>
              </div>
            </div>

            {/* Fake subscribe button (no functionality, just UI) */}
            <button
              type="button"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-[#3B9ACB] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3384ac] active:scale-[0.98] sm:mt-0"
            >
              Get notified
            </button>
          </div>
        </div>

        {/* Placeholder “post skeletons” */}
        <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
          {[
            "Introduction to Single-Frequency Fiber Lasers",
            "LiDAR & Remote Sensing with Techwin Lasers",
            "Quantum & Cold Atom Experiments",
            "High-Power CW Solutions for Industry",
          ].map((title, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-2xl border border-slate-100 bg-white/70 p-4 text-left shadow-xs ring-1 ring-slate-100/60 backdrop-blur transition hover:-translate-y-1 hover:border-[#3B9ACB]/40 hover:shadow-md"
            >
              <div className="mb-3 h-2 w-20 rounded-full bg-[#3B9ACB]/10" />
              <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 line-clamp-3 text-xs text-slate-500">
                Placeholder draft topic. Full article will be available when the
                Techwin blog goes live.
              </p>
              <span className="mt-3 inline-flex text-[11px] font-medium text-[#3B9ACB]/80">
                Coming soon…
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
