"use client";

/**
 * app/admin/posts/[id]/page.tsx
 * Final, fixed Edit Post page
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

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<PostPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* -----------------------------------------------------------
     Load post
  ------------------------------------------------------------ */
  useEffect(() => {
    if (!id) return;

    async function loadPost() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/posts/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to load post");
        }

        setPost(data.post); // ✅ correct
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error loading post");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  function handleSaved() {
    router.push("/admin/posts");
  }

  /* -----------------------------------------------------------
     Loading
  ------------------------------------------------------------ */
  if (loading) {
    return (
      <div style={{ paddingTop: 96 }}>
        <p className="p-6">Loading post…</p>
      </div>
    );
  }

  /* -----------------------------------------------------------
     Error
  ------------------------------------------------------------ */
  if (error || !post) {
    return (
      <div style={{ paddingTop: 96 }}>
        <p className="p-6 text-red-600">Error: {error}</p>
        <Link href="/admin/posts" className="p-6 underline">
          ← Back to posts
        </Link>
      </div>
    );
  }

  /* -----------------------------------------------------------
     Page
  ------------------------------------------------------------ */
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        color: "#000",
        paddingTop: 96, // ✅ avoids navbar overlap
      }}
    >
      {/* Header */}
      <header
        style={{
          background: PRIMARY,
          color: "#fff",
          padding: "26px 20px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
              Edit Post
            </h1>
            <p style={{ margin: 0, opacity: 0.95 }}>
              Update content and publish changes
            </p>
          </div>

          <Link
            href="/admin/posts"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            ← Back to posts
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editor (WIDER) */}
          <section className="lg:col-span-9">
            <div
              style={{
                border: `1px solid ${PRIMARY}`,
                borderRadius: 12,
                background: "#fff",
                overflow: "hidden",
              }}
              className="shadow-sm"
            >
              <div style={{ height: 6, background: PRIMARY }} />

              <div className="p-6">
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
                  Article
                </h2>
                <p style={{ color: "#333", marginBottom: 16 }}>
                  Edit title, content, SEO and cover image.
                </p>

                {/* ✅ Correct props */}
                <BlogEditor
                  mode="edit"
                  postId={post._id}
                  initial={post}
                  onSaved={handleSaved}
                />
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div
              style={{
                borderRadius: 12,
                border: "1px solid #e6eef6",
                padding: 16,
                background: "#fff",
              }}
              className="shadow-sm"
            >
              <h3 style={{ marginTop: 0, fontSize: 15, fontWeight: 700 }}>
                Post Info
              </h3>

              <div className="mt-3">
                <strong>Slug</strong>
                <div className="text-sm text-gray-700">{post.slug}</div>
              </div>

              <div className="mt-3">
                <strong>Status</strong>
                <div className="text-sm">
                  {post.published ? "Published" : "Draft"}
                </div>
              </div>

              <div className="mt-3">
                <strong>Updated</strong>
                <div className="text-sm">
                  {post.updatedAt
                    ? new Date(post.updatedAt).toLocaleString()
                    : "—"}
                </div>
              </div>

              <div className="mt-4">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "8px",
                    borderRadius: 8,
                    background: PRIMARY,
                    color: "#fff",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  View Live →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
