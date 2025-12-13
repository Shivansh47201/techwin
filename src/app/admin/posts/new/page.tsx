"use client";

/**
 * app/admin/posts/new/page.tsx
 *
 * Admin "Create Post" page — visually polished and interactive.
 * - Uses src/components/admin/BlogEditor (reusable editor)
 * - Color scheme: primary = #3B9ACB, white background, black text
 * - Responsive two-column layout (editor + sidebar on wide screens)
 *
 * Notes:
 * - This is a client component (uses router, state, and BlogEditor which is client).
 * - BlogEditor handles uploads and saving; this page only provides page-level chrome + navigation.
 */

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BlogEditor from "@/components/admin/BlogEditor";

const PRIMARY = "#3B9ACB";

export default function NewPostPage() {
  const router = useRouter();

  // Called after BlogEditor successfully saves the post.
  // `result` is whatever BlogEditor passes to onSaved (usually the created/updated post)
  function handleSaved(result: any) {
    // If API returned the post, navigate to posts list or edit page
    const id = result?._id ?? result?.id;
    if (id) {
      // Go to edit page for further tweaks, or to the list
      router.push(`/admin/posts`);
    } else {
      router.push("/admin/posts");
    }
  }

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#000" }}>
      {/* Top header / hero */}
      <header
        style={{
          background: PRIMARY,
          color: "#fff",
          padding: "28px 20px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
              Create New Post
            </h1>
            <p style={{ margin: 0, opacity: 0.95 }}>
              Write and publish blog content for your site.
            </p>
          </div>

          <nav aria-label="breadcrumb" style={{ textAlign: "right" }}>
            <Link
              href="/admin/posts"
              style={{
                color: "#fff",
                textDecoration: "underline",
                opacity: 0.95,
              }}
            >
              ← Back to posts
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column: Editor card */}
          <section className="lg:col-span-8">
            <div
              style={{
                border: `1px solid ${PRIMARY}`,
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
              }}
              className="shadow-sm"
            >
              {/* subtle top accent */}
              <div
                style={{
                  height: 6,
                  background: PRIMARY,
                  width: "100%",
                }}
              />

              <div className="p-6">
                {/* Card heading */}
                <div className="mb-4">
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
                    Article
                  </h2>
                  <p style={{ margin: 0, color: "#333" }}>
                    Title, content, tags and cover image — full editor below.
                  </p>
                </div>

                {/* BlogEditor component (large, takes care of title, content, cover, tags, publish) */}
                <BlogEditor mode="create" onSaved={handleSaved} />
              </div>
            </div>
          </section>

          {/* Right column: Helpful controls / tips */}
          <aside className="lg:col-span-4">
            <div
              style={{
                borderRadius: 12,
                border: "1px solid #e6eef6",
                padding: 18,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(59,154,203,0.06)",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: 16, fontWeight: 700 }}>
                Tips & Actions
              </h3>

              <ul style={{ paddingLeft: 18, color: "#111", lineHeight: 1.65 }}>
                <li>
                  Use a short, descriptive title — it becomes the page headline.
                </li>
                <li>
                  Slug will be generated automatically from the title but you
                  can edit it.
                </li>
                <li>
                  Upload a high-quality cover image (recommended ratio 16:9).
                </li>
                <li>
                  Use tags to improve discoverability — add multiple tags as
                  needed.
                </li>
                <li>
                  You can insert images directly inside the article — the editor
                  uploads them to your site and inserts the URL.
                </li>
              </ul>

              <div style={{ marginTop: 18 }}>
                <button
                  onClick={() => router.push("/admin/posts")}
                  style={{
                    width: "100%",
                    background: "#fff",
                    color: PRIMARY,
                    border: `2px solid ${PRIMARY}`,
                    padding: "10px 12px",
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>

              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 8,
                  background: "#f9fcff",
                }}
              >
                <strong style={{ color: "#0b3b4d" }}>Note on uploads</strong>
                <p style={{ margin: "6px 0 0", color: "#444", fontSize: 13 }}>
                  Files are uploaded to <code>/public/uploads/blogs/&lt;slug&gt;</code>{" "}
                  and will be served from <code>/uploads/blogs/&lt;slug&gt;</code>.
                  For production hosting (Vercel) you should use external storage
                  like S3 or R2.
                </p>
              </div>
            </div>

            {/* Small stats / quick links card */}
            <div
              style={{
                marginTop: 16,
                borderRadius: 12,
                padding: 16,
                background: "#fff",
                border: "1px solid #f0f6fb",
              }}
              className="shadow-sm"
            >
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
                Quick Links
              </h4>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <Link
                  href="/admin/posts"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "8px 10px",
                    borderRadius: 8,
                    background: PRIMARY,
                    color: "#fff",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Posts
                </Link>
                <Link
                  href="/admin"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${PRIMARY}`,
                    color: PRIMARY,
                    background: "#fff",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
