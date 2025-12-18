"use client";

import React, { useEffect, useState } from "react";
// Removed next/link import to fix build error
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  FileText, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  MoreVertical,
  LayoutDashboard,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

// --- Constants ---
const PRIMARY = "#3B9ACB";

// --- Types ---
type PostPreview = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  published: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  coverImage?: string; 
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(9); 
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [publishedFilter, setPublishedFilter] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null); 

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id: string) {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      setDeleteModalOpen(null);
      setNotification({ type: 'success', message: 'Post deleted successfully' });
      setTimeout(() => setNotification(null), 3000);
      fetchPosts(page);
    } catch (err: any) {
      console.error(err);
      setNotification({ type: 'error', message: err.message || "Delete failed" });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setDeleteLoading(false);
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
    <main className="flex-1 overflow-y-auto bg-slate-50 text-slate-900 font-sans w-full">
      
      {/* --- Notification Toast --- */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top ${notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {notification.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* --- Delete Confirmation Modal --- */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96 transform transition-all scale-100 border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-red-50">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Delete Post?</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">This action cannot be undone. The post and all its data will be permanently deleted.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModalOpen(null)}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-bold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalOpen)}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-bold disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* --- Header / Top Bar --- */}
      <header className="bg-white border-b border-slate-200 px-6 py-10 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <LayoutDashboard size={24} style={{ color: PRIMARY }} />
             </div>
             <div>
                <h1 className="text-xl font-bold text-slate-800 leading-tight">Blog Management</h1>
                <p className="text-xs text-slate-500 font-medium">Manage, create, and publish your content</p>
             </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
             <a 
               href="/admin/posts/new"
               className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 text-sm no-underline"
               style={{ backgroundColor: PRIMARY }}
             >
                <Plus size={18} /> Create New Post
             </a>
             <button
               onClick={async () => {
                 try {
                   const res = await fetch('/api/admin/run-scheduled', { method: 'POST' });
                   const data = await res.json();
                   if (!res.ok) throw new Error(data.message || 'Failed to run scheduler');
                   alert(`Scheduler ran — updated ${data.result?.updatedCount || 0} posts`);
                   // refresh the list after running
                   // (we rely on fetchPosts which will run on next mount or manually)
                 } catch (err: any) {
                   console.error(err);
                   alert(err.message || 'Scheduler failed');
                 }
               }}
               className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 text-sm"
               title="Run scheduled publisher"
             >
               <Clock size={16} /> Run Scheduler
             </button>          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
           
           <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-auto flex-1">
              <div className="relative w-full max-w-md">
                 <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                 <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    placeholder="Search by title..."
                 />
              </div>
              
              <div className="relative">
                 <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                 <select
                    value={publishedFilter}
                    onChange={(e) => {
                        setPublishedFilter(e.target.value);
                        setPage(1);
                        fetchPosts(1, search, e.target.value);
                    }}
                    className="pl-9 pr-8 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer hover:bg-slate-50 transition-all"
                 >
                    <option value="">All Status</option>
                    <option value="true">Published</option>
                    <option value="false">Drafts</option>
                 </select>
                 <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
           </form>

           <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <span className="bg-slate-100 px-3 py-1 rounded-full text-xs">Total: {total}</span>
           </div>
        </div>

        {/* Content Table/Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
             <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
                <span className="text-sm font-medium">Loading posts...</span>
             </div>
          ) : posts.length === 0 ? (
             <div className="p-16 text-center flex flex-col items-center">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                   <FileText size={32} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">No posts found</h3>
                <p className="text-slate-500 text-sm mb-6">Try adjusting your search or create a new one.</p>
                <a 
                   href="/admin/posts/new"
                   className="px-5 py-2 rounded-lg border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm no-underline"
                >
                   Clear Filters
                </a>
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[40%]">Post Details</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {posts.map((p) => (
                    <tr key={p._id} className="hover:bg-blue-50/30 transition-colors group">
                      
                      {/* Title & Slug */}
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                           <div className="p-2 bg-blue-50 text-blue-500 rounded-lg mt-1 shrink-0">
                              <FileText size={18} />
                           </div>
                           <div>
                              <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-blue-600 transition-colors">
                                 {p.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-400">
                                 <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{p.slug}</span>
                              </div>
                           </div>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        {p.published ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                             <CheckCircle2 size={12} /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                             <Clock size={12} /> Draft
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-slate-500">
                         <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400" />
                            {new Date(p.createdAt).toLocaleDateString("en-US", { 
                               day: 'numeric', month: 'short', year: 'numeric' 
                            })}
                         </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 group-hover:opacity-100 transition-opacity">
                          
                          <a
                            href={`/blog/${p.slug}`} // Assuming public path is /blog/slug
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="View Live"
                          >
                            <ExternalLink size={18} />
                          </a>

                          <a 
                            href={`/admin/posts/${p._id}`} 
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                            title="Edit Post"
                          >
                            <Edit3 size={18} />
                          </a>

                          <button
                            onClick={() => setDeleteModalOpen(p._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
           <p className="text-sm text-slate-500 font-medium order-2 md:order-1">
              Showing <span className="font-bold text-slate-800">{posts.length}</span> of <span className="font-bold text-slate-800">{total}</span> posts
           </p>
           
           <div className="flex items-center gap-2 order-1 md:order-2">
              <button
                onClick={() => goPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              
              <div className="flex items-center gap-1 px-2">
                 <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 font-bold rounded-lg text-sm border border-blue-100">
                    {page}
                 </span>
              </div>

              <button
                onClick={() => goPage(page + 1)}
                disabled={posts.length < limit} // Simplified check; ideally check against total
                className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                Next <ChevronRight size={16} />
              </button>
           </div>
        </div>

      </main>
    </main>
  );
}

// Simple Icon Component for the dropdown
function ChevronDownIcon({ className }: { className?: string }) {
    return (
        <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    )
}