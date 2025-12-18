"use client";

/**
 * app/admin/posts/new/page.tsx
 * Clean & fixed Admin Create Post page
 */

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BlogEditor from "@/components/admin/BlogEditor";

const PRIMARY = "#3B9ACB";

export default function NewPostPage() {
  const router = useRouter();

  function handleSaved(result: any) {
    router.push("/admin/posts");
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top header */}
      <header
        style={{
          background: PRIMARY,
          color: "#fff",
          padding: "28px 20px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          flexShrink: 0,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
              Create New Post
            </h1>
            <p style={{ margin: 0, opacity: 0.95 }}>
              Write and publish blog content for your site.
            </p>
          </div>

          <Link
            href="/admin/posts"
            style={{
              color: "#fff",
              textDecoration: "underline",
              fontWeight: 600,
            }}
          >
            ← Back to posts
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto max-w-7xl mx-auto p-4 md:p-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editor – wider */}
          <section className="lg:col-span-9">
            <div
              style={{
                border: `1px solid ${PRIMARY}`,
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
              }}
              className="shadow-sm"
            >
              <div style={{ height: 6, background: PRIMARY }} />

              <div className="p-6">
                <div className="mb-4">
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
                    Article
                  </h2>
                  <p style={{ margin: 0, color: "#333" }}>
                    Title, content, tags and cover image — full editor below.
                  </p>
                </div>

                <BlogEditor mode="create" onSaved={handleSaved} />
              </div>
            </div>
          </section>

          {/* Right side – empty spacer (future use) */}
          <aside className="lg:col-span-3" />
        </div>

        <div
          style={{
            marginTop: 24,
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

          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <Link
              href="/admin/posts"
              style={{
                padding: "10px 14px",
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
                padding: "10px 14px",
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
      </main>
    </div>
  );
}
