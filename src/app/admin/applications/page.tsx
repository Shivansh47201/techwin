"use client";

import { useEffect, useState, useMemo } from "react";
// import Link from "next/link"; // Next/link replaced with <a> for preview
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  Box, 
  Calendar,
  ArrowRight
} from "lucide-react";
import type { Application } from "@/types/application";

export default function ApplicationsAdminList() {
  // --- STATE ---
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // --- FETCH DATA ---
  async function loadApplications(isRefresh = false) {
    if (!isRefresh) setLoading(true);
    try {
      // Trying to fetch from API
      // Note: In some preview environments (blob URLs), relative paths like '/api/...' might throw a URL parsing error.
      // We wrap this in a try-catch to prevent the whole app from crashing if the API is unreachable.
      const res = await fetch("/api/admin/applications");
      
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }
      
      const json = await res.json();
      setApplications(json.data || []);
    } catch (err) {
      console.error("Failed to load applications", err);
      // Fallback for preview/error state - keeping the list empty instead of crashing
      setApplications([]); 
      // Only show error toast if it's not the initial load to avoid flashing errors in preview
      if (isRefresh) {
        showNotification('error', "Failed to load applications");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  // --- ACTIONS ---
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSoftDelete = async (id: string) => {
    setActionLoading(true);
    try {
      // Update status to draft (Move to trash/draft logic)
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: 'draft' }),
      });

      if (res.ok) {
        setApplications(prev => prev.map(app => app._id === id ? { ...app, status: 'draft' } : app));
        showNotification('success', "Application moved to drafts");
        setDeleteModalOpen(null);
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      showNotification('error', "Failed to move to drafts");
    } finally {
      setActionLoading(false);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setApplications(prev => prev.filter(app => app._id !== id));
        showNotification('success', "Application permanently deleted");
        setDeleteModalOpen(null);
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error(error);
      showNotification('error', "Failed to delete application");
    } finally {
      setActionLoading(false);
    }
  };

  // --- COMPUTED DATA ---
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = (app.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (app.slug || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: applications.length,
      published: applications.filter(a => a.status === 'published').length,
      drafts: applications.filter(a => a.status !== 'published').length
    };
  }, [applications]);

  // --- RENDER ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-[#3B9ACB]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#3B9ACB]/20 border-t-[#3B9ACB] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Layers size={24} className="opacity-50" />
          </div>
        </div>
        <p className="mt-4 font-medium text-slate-500 animate-pulse">Loading Applications...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 sm:p-10 font-sans text-slate-900">
      
      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-5 duration-300 border ${
          notification.type === 'success' ? 'bg-white border-[#3B9ACB]/20 text-[#3B9ACB]' : 'bg-white border-red-200 text-red-600'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in" onClick={() => setDeleteModalOpen(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 mx-auto">
                <Trash2 className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Delete Application?</h3>
              <p className="text-center text-slate-500 mb-6 text-sm">
                Choose an action for this application.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => deleteModalOpen && handleSoftDelete(deleteModalOpen)}
                  disabled={actionLoading}
                  className="w-full py-3 px-4 bg-white border-2 border-slate-100 hover:border-[#3B9ACB] hover:text-[#3B9ACB] text-slate-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <Box size={18} className="text-slate-400 group-hover:text-[#3B9ACB]" />
                  Move to Drafts (Unpublish)
                </button>
                <button
                  onClick={() => deleteModalOpen && handlePermanentDelete(deleteModalOpen)}
                  disabled={actionLoading}
                  className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  {actionLoading ? "Processing..." : "Delete Permanently"}
                </button>
                <button
                  onClick={() => setDeleteModalOpen(null)}
                  disabled={actionLoading}
                  className="w-full py-2 text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
              <span className="bg-gradient-to-br from-[#3B9ACB] to-[#2A7DA8] text-transparent bg-clip-text">
                Applications
              </span>
              Manager
            </h1>
            <p className="mt-2 text-slate-500 font-medium">
              Manage your industry application pages and content.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => loadApplications(true)}
              className="p-3 rounded-xl bg-white text-slate-500 border border-slate-200 shadow-sm hover:text-[#3B9ACB] hover:border-[#3B9ACB] transition-all"
              title="Refresh Data"
            >
              <RefreshCw size={20} />
            </button>
            <a
              href="/admin/applications/new"
              className="group flex items-center gap-2 bg-[#3B9ACB] hover:bg-[#2A7DA8] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#3B9ACB]/30 transition-all hover:-translate-y-0.5"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              New Application
            </a>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-[#3B9ACB]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="p-4 rounded-xl bg-[#3B9ACB]/10 text-[#3B9ACB]">
              <Layers size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Apps</p>
              <h3 className="text-3xl font-black text-slate-800">{stats.total}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="p-4 rounded-xl bg-green-50 text-green-600">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Published</p>
              <h3 className="text-3xl font-black text-slate-800">{stats.published}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="p-4 rounded-xl bg-orange-50 text-orange-500">
              <Box size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Drafts</p>
              <h3 className="text-3xl font-black text-slate-800">{stats.drafts}</h3>
            </div>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#3B9ACB]/20 focus:bg-white transition-all text-slate-700 font-medium placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex items-center bg-slate-50 p-1.5 rounded-xl w-full md:w-auto">
            {['all', 'published', 'draft'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                  statusFilter === status 
                    ? 'bg-white text-[#3B9ACB] shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Application Info</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredApplications.map((app) => (
                  <tr 
                    key={app._id} 
                    className="group hover:bg-slate-50/80 transition-colors duration-200"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#3B9ACB]/10 flex items-center justify-center text-[#3B9ACB] shadow-sm">
                          <Layers size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-base">{app.title}</div>
                          <div className="text-xs text-slate-400 font-medium mt-0.5 line-clamp-1 max-w-[200px]">
                            {app.shortDescription || "No description"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <code className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                        /{app.slug}
                      </code>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                          app.status === "published"
                            ? "bg-green-50 text-green-700 border-green-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${app.status === "published" ? "bg-green-500" : "bg-amber-500"}`} />
                        {app.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1.5">
                        <Calendar size={14} className="text-slate-400" />
                        {app.updatedAt ? new Date(app.updatedAt).toLocaleDateString() : "—"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        {/* VIEW BUTTON - Only visible if published */}
                        {app.status === 'published' && (
                          <a
                            href={`/application/${app.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg text-slate-400 hover:text-[#3B9ACB] hover:bg-[#3B9ACB]/10 transition-colors"
                            title="View Application Page"
                          >
                            <Eye size={18} />
                          </a>
                        )}

                        {app.status === 'published' && <div className="w-px h-4 bg-slate-200" />}

                        <a
                          href={`/admin/applications/${app._id}`}
                          className="p-2 rounded-lg text-[#3B9ACB] bg-[#3B9ACB]/5 hover:bg-[#3B9ACB]/20 transition-colors"
                          title="Edit Application"
                        >
                          <Edit3 size={18} />
                        </a>
                        
                        <div className="w-px h-4 bg-slate-200" />
                        
                        <button
                          onClick={() => setDeleteModalOpen(app._id!)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                          <Search size={24} className="opacity-50" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">No applications found</h3>
                        <p className="text-sm mt-1 mb-6">
                          Try adjusting your search or add a new application.
                        </p>
                        <a
                          href="/admin/applications/new"
                          className="inline-flex items-center gap-2 text-[#3B9ACB] font-bold hover:underline"
                        >
                          Create New <ArrowRight size={16} />
                        </a>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Showing {filteredApplications.length} results</span>
            <span>Sorted by newest</span>
          </div>
        </div>
      </div>
    </div>
  );
}