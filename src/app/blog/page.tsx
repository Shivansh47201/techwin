import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
export const dynamic = "force-dynamic";

import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  User,
  Sparkles,
  Clock,
  Tag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Techwin",
  description:
    "Techwin Blog – laser technology insights, application notes, and product updates.",
};

/* ------------------ Utils ------------------ */
const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* ------------------ Page ------------------ */
export default async function BlogPage() {
  await connectDB();

  // Fetch logic remains exact same
  const posts = await Post.find({ published: true })
    .sort({ publishedAt: -1 })
    .lean();

  /* ================= EMPTY STATE (Improved Design) ================= */
  if (!posts || posts.length === 0) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-6 text-center">
        {/* Abstract Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <div className="group relative mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl shadow-slate-200 ring-1 ring-slate-100 transition-all duration-500 hover:scale-110 hover:shadow-[#3B9ACB]/20">
          <Sparkles className="h-10 w-10 text-[#3B9ACB] transition-transform duration-500 group-hover:rotate-12" />
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Insights <span className="text-[#3B9ACB]">Coming Soon</span>
        </h1>

        <p className="mb-10 max-w-lg text-lg text-slate-600">
          We are currently curating high-quality articles on fiber lasers, LiDAR systems, and quantum technology.
        </p>

        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#3B9ACB] hover:shadow-lg hover:shadow-[#3B9ACB]/30"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </main>
    );
  }

  /* ================= DATA SPLIT ================= */
  const [featuredPost, ...regularPosts] = posts;

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900">
      {/* ================= BACKGROUND PATTERN ================= */}
      {/* A tech-inspired dot grid pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white via-transparent to-slate-50/50"></div>

      {/* ================= HERO HEADER ================= */}
      <section className="relative pt-32 pb-20 text-center">
        {/* Soft Glow behind header */}
        <div className="absolute top-20 left-1/2 -z-10 h-64 w-96 -translate-x-1/2 rounded-full bg-[#3B9ACB]/10 blur-[80px]" />
        
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#3B9ACB] backdrop-blur-sm shadow-sm">
            <Sparkles className="h-3 w-3" /> Techwin Resources
          </div>
          
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Laser Technology <span className="text-[#3B9ACB]">Insights</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-slate-600 md:text-xl">
            Explore industry updates, deep-dive application notes, and the future of photonics.
          </p>
        </div>
      </section>

      {/* ================= FEATURED POST ================= */}
      {featuredPost && (
        <section className="mx-auto mb-24 max-w-7xl px-6">
          <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-white ring-1 ring-slate-200 shadow-2xl shadow-slate-200/50 transition-all hover:shadow-[#3B9ACB]/10">
            <div className="grid lg:grid-cols-12">
              
              {/* Image Section */}
              <div className="relative min-h-[400px] overflow-hidden bg-slate-100 lg:col-span-7">
                {featuredPost.coverImage ? (
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Sparkles className="h-20 w-20 text-slate-300" />
                  </div>
                )}
                {/* Overlay gradient for text readability on mobile if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden" />
              </div>

              {/* Content Section */}
              <div className="relative flex flex-col justify-center p-8 lg:col-span-5 lg:p-14">
                <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span className="flex items-center gap-1.5 rounded-full bg-[#3B9ACB] px-3 py-1 text-white">
                    <Sparkles className="h-3 w-3" /> Featured
                  </span>
                  {featuredPost.publishedAt && (
                    <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                      <Calendar className="h-3 w-3" />
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                  )}
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-900 transition-colors hover:text-[#3B9ACB] sm:text-4xl">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="mb-8 line-clamp-3 text-lg leading-relaxed text-slate-600">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 ring-4 ring-white">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">
                        {featuredPost.author || "Techwin Team"}
                      </p>
                      <p className="text-xs font-medium text-slate-500">
                        Editor in Chief
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group/btn flex h-12 w-12 items-center justify-center rounded-full bg-[#3B9ACB] text-white shadow-lg shadow-[#3B9ACB]/30 transition-all hover:scale-110 hover:bg-[#2a85b3]"
                  >
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:-rotate-45" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= REGULAR POSTS ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between border-b border-slate-200 pb-4">
          <h3 className="text-2xl font-bold text-slate-900">Latest Articles</h3>
          <div className="hidden text-sm font-medium text-slate-500 sm:block">
            Exploring {posts.length} articles
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((p: any) => (
            <article
              key={p._id}
              className="group relative flex flex-col rounded-3xl bg-white p-4 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#3B9ACB]/10"
            >
              {/* Image */}
              <Link
                href={`/blog/${p.slug}`}
                className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100"
              >
                {p.coverImage ? (
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Sparkles className="h-8 w-8 text-slate-300" />
                  </div>
                )}
                
                {/* Badge Overlay */}
                <div className="absolute top-3 right-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#3B9ACB] backdrop-blur-sm shadow-sm">
                  {p.category || "Tech"}
                </div>
              </Link>

              {/* Content */}
              <div className="flex flex-1 flex-col px-2">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {p.publishedAt && <span>{formatDate(p.publishedAt)}</span>}
                </div>

                <Link href={`/blog/${p.slug}`}>
                  <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-[#3B9ACB]">
                    {p.title}
                  </h3>
                </Link>

                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {p.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-500">
                    By {p.author || "Techwin"}
                  </span>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#3B9ACB] transition-all group-hover:gap-2"
                  >
                    Read
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}