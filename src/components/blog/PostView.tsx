// src/components/blog/PostView.tsx
import React from "react";

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  publishedAt?: string | Date | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  seoTitle?: string;
  seoDescription?: string;
};

export default function PostView({ post }: { post: Post }) {
  const formatDate = (d?: string | Date | null) => {
    if (!d) return "";
    const date = typeof d === "string" ? new Date(d) : d;
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <article>
        <header>
          <h1 style={{ fontSize: "28px", marginBottom: 8 }}>{post.title}</h1>
          {post.excerpt && <p style={{ color: "#666" }}>{post.excerpt}</p>}
          <div style={{ color: "#999", fontSize: 13, marginTop: 6 }}>
            {post.author && <span>By {post.author}</span>}
            {post.publishedAt ? <span> • {formatDate(post.publishedAt)}</span> : null}
          </div>
        </header>

        {post.coverImage ? (
          <div style={{ marginTop: 18 }}>
            <img src={post.coverImage} alt={post.title} style={{ width: "100%", borderRadius: 6 }} />
          </div>
        ) : null}

        <section style={{ marginTop: 20 }}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </section>

        {post.tags && post.tags.length > 0 && (
          <footer style={{ marginTop: 20 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {post.tags.map((t) => (
                <span key={t} style={{ padding: "4px 8px", background: "#f3f4f6", borderRadius: 999 }}>
                  {t}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>
    </main>
  );
}
