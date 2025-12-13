"use client";

/**
 * app/admin/posts/[id]/page.tsx
 *
 * Polished, attractive Edit Post page that uses src/components/admin/BlogEditor.
 * - Color scheme: primary = #3B9ACB, white background, black copy
 * - Responsive two-column layout (editor + sidebar)
 * - Loads post data from /api/admin/posts/[id] and passes it to BlogEditor
 * - Shows skeleton / loading UI while fetching
 *
 * Notes:
 * - This is a client component (uses fetch on client + router).
 * - Requires BlogEditor at src/components/admin/BlogEditor.tsx (already created).
 */

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import BlogEditor from "@/components/admin/BlogEditor";

const PRIMARY = "#3B9ACB";

type PostPayload = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  tags?: string[];
  coverImage?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function EditPostPageClient() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<PostPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/posts/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || "Failed to load post");
        }
        if (mounted) setPost(data.post);
      } catch (err: any) {
        console.error(err);
        if (mounted) setError(err.message || "Error loading post");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  function handleSaved(result: any) {
    // After saving, go back to posts list (or stay on edit)
    router.push("/admin/posts");
  }

  // Loading skeleton
  if (loading) {
    return (
      <div style={{ minHeight: "60vh", background: "#fff", color: "#000" }}>
        <header style={{ background: PRIMARY, padding: 24, color: "#fff" }}>
          <div className="max-w-6xl mx-auto">
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
              Loading post...
            </h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6">
          <div className="animate-pulse space-y-4">
            <div style={{ height: 22, width: "50%", background: "#e6f4fb", borderRadius: 6 }} />
            <div style={{ height: 14, width: "35%", background: "#f1f7fb", borderRadius: 6 }} />
            <div style={{ height: 360, width: "100%", background: "#f7fbfd", borderRadius: 8 }} />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "60vh", background: "#fff", color: "#000" }}>
        <header style={{ background: PRIMARY, padding: 24, color: "#fff" }}>
          <div className="max-w-6xl mx-auto">
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Edit Post</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6">
          <div style={{ padding: 24, borderRadius: 8, background: "#fff", border: "1px solid #fee" }}>
            <p style={{ color: "#b00", margin: 0 }}>Error: {error}</p>
            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => router.refresh()}
                style={{
                  background: PRIMARY,
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                }}
              >
                Retry
              </button>
              <Link href="/admin/posts" style={{ marginLeft: 12 }}>
                ← Back to posts
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#000" }}>
      {/* Header */}
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
              Edit: {post?.title ?? "Post"}
            </h1>
            <p style={{ margin: 0, opacity: 0.95 }}>
              Update content, images and metadata for this post.
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

      {/* Main layout */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editor column */}
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
              <div style={{ height: 6, background: PRIMARY, width: "100%" }} />
              <div className="p-6">
                <div className="mb-4">
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Article</h2>
                  <p style={{ margin: 0, color: "#333" }}>
                    Edit title, content, tags and cover image. Changes are saved when you click Save or Publish.
                  </p>
                </div>

                {/* BlogEditor in edit mode */}
                <BlogEditor mode="edit" initial={post ?? undefined} postId={post?._id} onSaved={handleSaved} />
              </div>
            </div>
          </section>

          {/* Sidebar */}
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
              <h3 style={{ marginTop: 0, fontSize: 16, fontWeight: 700 }}>Post details</h3>

              <div style={{ marginTop: 8 }}>
                <strong>Slug</strong>
                <div style={{ marginTop: 6, color: "#333" }}>{post?.slug}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <strong>Published</strong>
                <div style={{ marginTop: 6 }}>{post?.published ? "Yes" : "No"}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <strong>Last updated</strong>
                <div style={{ marginTop: 6 }}>
                  {post?.updatedAt ? new Date(post.updatedAt).toLocaleString() : "—"}
                </div>
              </div>

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
                  Back to posts
                </button>
              </div>

              <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: "#f9fcff" }}>
                <strong style={{ color: "#0b3b4d" }}>Quick actions</strong>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <button
                    onClick={() => {
                      // quick publish toggle (simple)
                      // For safety, navigate to the edit and use BlogEditor publish button
                      router.push(`/admin/posts/${post?._id}`);
                    }}
                    style={{
                      flex: 1,
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: `1px solid ${PRIMARY}`,
                      background: "#fff",
                      color: PRIMARY,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Open editor
                  </button>
                </div>
              </div>
            </div>

            {/* Extra card: preview */}
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
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Preview</h4>

              {post?.coverImage ? (
                <div style={{ marginTop: 10 }}>
                  <img
                    src={post.coverImage}
                    alt="cover"
                    style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    marginTop: 10,
                    width: "100%",
                    height: 140,
                    borderRadius: 8,
                    background: "#f3f7fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#667",
                  }}
                >
                  No cover image
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <h5 style={{ margin: "6px 0 4px", fontSize: 16 }}>{post?.title}</h5>
                <p style={{ margin: 0, color: "#444" }}>{post?.excerpt}</p>
                <a
                  href={`/posts/${post?.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-block", marginTop: 10, color: PRIMARY, textDecoration: "none" }}
                >
                  View on site →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
