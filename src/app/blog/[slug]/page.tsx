import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { ArrowLeft, Calendar, User, Clock, Sparkles } from "lucide-react";
import ShareButton from "@/components/blog/ShareButton";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type Props = {
  params: { slug: string };
};

/* =====================================================
   SEO METADATA (Logic Preserved)
===================================================== */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  try {
    const routeParams = (await Promise.resolve(params)) as { slug?: string };
    if (!routeParams?.slug) {
      return {
        title: "Blog | Techwin",
      };
    }

    const slug = routeParams.slug.replace(/\/$/, "").toLowerCase();

    await connectDB();

    // CASE-INSENSITIVE slug match
    const post = await Post.findOne({
      slug: new RegExp(`^${slug}$`, "i"),
      published: true,
    }).lean();

    if (!post) {
      return {
        title: "Blog | Techwin",
      };
    }

    const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
      .replace(/\/$/, "");

    const absolute = (url?: string) => {
      if (!url) return undefined;
      if (url.startsWith("http")) return url;
      return `${SITE}${url.startsWith("/") ? url : `/${url}`}`;
    };

    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      keywords: post.seoKeywords,
      alternates: {
        canonical: post.canonical
          ? absolute(post.canonical)
          : `${SITE}/blog/${post.slug}`,
      },
      openGraph: {
        type: "article",
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        images: absolute(post.metaImage || post.coverImage)
          ? [{ url: absolute(post.metaImage || post.coverImage)! }]
          : undefined,
      },
    };
  } catch (err) {
    console.error("generateMetadata error:", err);
    return {
      title: "Blog | Techwin",
    };
  }
}

/* =====================================================
   CONTENT NORMALIZER (Logic Preserved)
===================================================== */
function extractFirstH1(html: string) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  let inner = m[1];
  const cutoff = inner.search(/<(p|div|br|h[2-6])\b/i);
  if (cutoff !== -1) inner = inner.slice(0, cutoff);
  const text = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text || null;
}

function normalizeContent(html: string, featuredImageSrc?: string) {
  let normalized = html.replace(/src="uploads\//gi, 'src="/uploads/');

  const h1Match = normalized.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const inner = h1Match[1];
    const titleText = extractFirstH1(html) || "";
    let replacement = inner;
    if (titleText) {
      const esc = titleText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      replacement = inner.replace(new RegExp(esc, "i"), "").trim();
    }
    normalized = normalized.replace(/<h1[\s\S]*?>[\s\S]*?<\/h1>/i, replacement || "");
  }

  if (featuredImageSrc) {
    try {
      const parts = featuredImageSrc.split("/");
      const basename = parts[parts.length - 1];
      if (basename) {
        const escBase = basename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const imgRe = new RegExp(`<img[^>]+${escBase}[^>]*>`, "i");
        const pos = normalized.search(imgRe);
        if (pos !== -1 && pos < 400) {
          normalized = normalized.replace(imgRe, "");
        }
      }
    } catch (err) {
      // noop
    }
  }

  normalized = normalized.replace(/<span[^>]*>\s*<\/span>/gi, '');
  normalized = normalized.replace(/<([a-z0-9]+)[^>]*>\s*<\/\1>/gi, '');
  normalized = normalized.replace(/^(?:\s|(?:<br[^>]*>\s*)|(?:<p[^>]*>\s*<\/p>\s*))+/, '');
  normalized = normalized.replace(/(?:<br[^>]*>\s*){2,}/gi, '<br/>');
  normalized = normalized.trim();

  return normalized;
}

/* =====================================================
   BLOG PAGE COMPONENT
===================================================== */
export default async function BlogPage({ params }: Props) {
  const routeParams = (await Promise.resolve(params)) as { slug?: string };
  if (!routeParams?.slug) return notFound();

  const slug = routeParams.slug.replace(/\/$/, "").toLowerCase();

  await connectDB();

  // CASE-INSENSITIVE slug match
  const post = await Post.findOne({
    slug: new RegExp(`^${slug}$`, "i"),
    published: true,
  }).lean();

  if (!post) {
    if (process.env.NODE_ENV !== "production") {
      const countAll = await Post.countDocuments({ slug: new RegExp(`^${slug}$`, "i") });
      const countPublished = await Post.countDocuments({ slug: new RegExp(`^${slug}$`, "i"), published: true });
      const samples = await Post.find({ slug: new RegExp(`^${slug}$`, "i") }).lean().limit(5);

      return (
        <main className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Debug: Post not found</h1>
          <p className="mb-4">Requested slug: <code className="bg-slate-100 px-2 py-1 rounded">{slug}</code></p>
          <pre className="bg-slate-900 text-slate-50 p-6 rounded-xl overflow-x-auto mb-4 text-sm">
            {JSON.stringify({ countAll, countPublished, samples }, null, 2)}
          </pre>
          <p className="text-sm text-slate-500">
            If <code>countAll</code> is 0 the slug likely doesn't exist. If <code>countAll</code> &gt; 0 but <code>countPublished</code> is 0 the post exists but isn't published.
          </p>
        </main>
      );
    }
    return notFound();
  }

  const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

  /* -------- JSON-LD -------- */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.metaImage || post.coverImage,
    author: {
      "@type": "Person",
      name: post.author || "Techwin",
    },
    publisher: {
      "@type": "Organization",
      name: "Techwin",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/blog/${post.slug}`,
    },
  };

  // Fetch latest published posts (exclude current post)
  const latestPosts = await Post.find({ published: true, _id: { $ne: post._id } })
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  const contentFirstH1 = extractFirstH1(post.content || "") || null;
  // Prefer explicit post.h1 (saved from editor or title fallback). If not present, use the title, otherwise fall back to the first H1 found in content.
  const displayTitle = (post.h1 && post.h1.trim())
    ? post.h1.trim()
    : (post.title && !/^my blog$/i.test(post.title) ? post.title : (contentFirstH1 || post.title));

  return (
    <article className="min-h-screen bg-white text-slate-900 selection:bg-[#3B9ACB] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[65vh] min-h-[500px] w-full bg-slate-900 mt-27">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 select-none">
          {post.metaImage || post.coverImage ? (
            <img
              src={post.metaImage || post.coverImage}
              alt={displayTitle}
              className="h-full w-full object-cover opacity-80"
              loading="eager"
            />
          ) : (
            // Fallback gradient if no image
            <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-950" />
          )}
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-24 md:pb-32">
          <div className="mx-auto w-full max-w-4xl">
            {/* Back Button */}
            <Link
              href="/blog"
              className="group mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4  transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              {displayTitle}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-200 md:text-base">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B9ACB] text-white ring-2 ring-white/20">
                  <User className="h-5 w-5" />
                </div>
                <span>{post.author || "Techwin Team"}</span>
              </div>

              {post.publishedAt && (
                <div className="flex items-center gap-2 opacity-80">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative z-10 mx-auto -mt-20 max-w-4xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-12 md:p-16">
          
          {/* Prose Content */}
          <div
            className="prose prose-lg max-w-none text-slate-600 
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 
              prose-h1:hidden 
              prose-a:font-semibold prose-a:text-[#3B9ACB] prose-a:no-underline prose-a:transition-colors prose-a:duration-200 hover:prose-a:text-[#2a7ba3] 
              prose-blockquote:border-l-4 prose-blockquote:border-[#3B9ACB] prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-700
              prose-strong:font-bold prose-strong:text-slate-900 
              prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[#3B9ACB] prose-code:before:content-none prose-code:after:content-none
              prose-img:rounded-3xl prose-img:shadow-lg prose-img:transition-transform hover:prose-img:scale-[1.01]"
            dangerouslySetInnerHTML={{
              __html: normalizeContent(post.content || "", post.metaImage || post.coverImage),
            }}
          />

          {/* Bottom Tags / Share */}
          <div className="mt-16 flex items-center justify-between gap-6 border-t border-slate-100 pt-10">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Share this article</span>
              <div className="flex gap-2">
                <ShareButton url={`${SITE}/blog/${post.slug}`} title={displayTitle} />
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* ================= LATEST ARTICLES ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-slate-100 -mt-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Latest from the blog</h2>
                <p className="text-sm text-slate-500 mt-1">Explore our recent articles and insights.</p>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-[#3B9ACB] hover:text-[#2a7ba3]">View all</Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {latestPosts && latestPosts.length ? (
                latestPosts.map((p: any) => (
                  <Link key={String(p._id)} href={`/blog/${p.slug}`} className="group block rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition transform hover:-translate-y-1">
                    <div className="h-44 w-full bg-slate-100 overflow-hidden">
                      {(p.metaImage || p.coverImage) ? (
                        <img src={p.metaImage || p.coverImage} alt={p.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-500">No Image</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-slate-500">{p.publishedAt && new Date(p.publishedAt).toLocaleDateString("en-US")}</div>
                      <div className="mt-2 font-semibold text-slate-900 group-hover:text-[#3B9ACB]">{p.title}</div>
                      <div className="mt-2 text-sm text-slate-600">{(p.excerpt || '').slice(0, 110)}{(p.excerpt && p.excerpt.length > 110) ? '…' : ''}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-sm text-slate-500">No recent posts</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}