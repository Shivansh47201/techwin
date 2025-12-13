"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// Minimal Post type matching your Mongoose model
type PostPreview = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  published: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [publishedFilter, setPublishedFilter] = useState<string>("");

  async function fetchPosts(p = page, q = search, published = publishedFilter) {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("page", String(p));
      params.set("limit", String(limit));
      if (q) params.set("search", q);
      if (published) params.set("published", published);

      const res = await fetch(`/api/admin/posts?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data.posts ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      console.error(err);
      alert("Error loading posts — check console.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      // refresh
      fetchPosts(page);
      alert("Deleted successfully");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Delete failed");
    }
  }

  function goPage(p: number) {
    setPage(p);
    fetchPosts(p);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchPosts(1);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blog Posts — Admin</h1>
        <div className="flex gap-2">
          <Link href="/admin/posts/create" className="px-4 py-2 rounded bg-sky-600 text-white shadow">
            + Create Post
          </Link>
        </div>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
        <input
          aria-label="Search titles or slugs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
          placeholder="Search title or slug"
        />

        <select
          value={publishedFilter}
          onChange={(e) => setPublishedFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>

        <button className="px-4 py-2 rounded bg-slate-700 text-white">Search</button>
      </form>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center">
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.title}</div>
                    {p.excerpt && <div className="text-sm text-gray-500">{p.excerpt}</div>}
                  </td>
                  <td className="px-4 py-3">{p.slug}</td>
                  <td className="px-4 py-3">
                    {p.published ? (
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">Published</span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-sm">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{new Date(p.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/posts/${p._id}/edit`} className="px-3 py-1 border rounded">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-1 border rounded text-red-600"
                      >
                        Delete
                      </button>
                      <a
                        href={`/posts/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 border rounded"
                      >
                        View
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>
          Showing {posts.length} of {total}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <div className="px-3 py-1 border rounded">Page {page}</div>
          <button
            onClick={() => goPage(page + 1)}
            disabled={posts.length < limit}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
