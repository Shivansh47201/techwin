"use client";

import { useEffect, useState, useMemo } from "react";
// Replaced next/link with standard anchor tags for preview compatibility
// import Link from "next/link"; 
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Box,
  Eye, // Added Eye icon for preview
  Loader2
} from "lucide-react";

export default function AdminProductsPage() {
  // --- Existing Logic & State ---
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // --- New UI Logic (Client-side only) ---
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  async function loadProducts(isRefresh = false) {
    if (!isRefresh) setLoading(true); // Only show full loader on initial mount
    try {
      const res = await fetch("/api/admin/products");
      const json = await res.json();
      setProducts(json.data || []);
    } catch (err) {
      console.error("Failed to load", err);
      // Fallback for preview if API fails
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, hard = false) {
    setDeleteLoading(true);
    const previous = products;
    // Optimistic update
    setProducts((prev) => prev.filter((p) => p._id !== id));

    try {
      const url = `/api/admin/products/${id}${hard ? '?hard=true' : ''}`;
      const res = await fetch(url, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      
      setDeleteModalOpen(null);
      setNotification({ type: 'success', message: hard ? 'Product permanently deleted' : 'Product moved to draft' });
      setTimeout(() => setNotification(null), 3000);
      loadProducts(true); // Sync with server without full reload
    } catch (err: any) {
      console.error(err);
      setProducts(previous); // Revert
      setNotification({ type: 'error', message: err.message || 'Failed to delete product' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setDeleteLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // --- Derived State for UI (Real Data) ---
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: products.length,
      published: products.filter(p => p.status === 'published').length,
      drafts: products.filter(p => p.status !== 'published').length
    };
  }, [products]);

  // --- Render Helpers ---

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
        {/* Background blobs for aesthetics */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#3B9ACB]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-[#2A7DA8]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative flex flex-col items-center z-10">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#3B9ACB]/20 border-t-[#3B9ACB] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-12 bg-[#3B9ACB] rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-[#3B9ACB]/40">
                 <Package size={24} className="text-white" />
               </div>
            </div>
          </div>
          <h2 className="mt-8 text-2xl font-bold text-slate-800 tracking-tight">Loading Dashboard</h2>
          <p className="text-slate-400 font-medium mt-2 animate-pulse">Syncing your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 sm:p-10 font-sans text-slate-900">
      
      {/* --- Notification Toast --- */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-5 duration-300 border ${
          notification.type === 'success' 
            ? 'bg-white border-[#3B9ACB]/20 shadow-[#3B9ACB]/10' 
            : 'bg-white border-red-200 shadow-red-500/10'
        }`}>
          <div className={`p-2 rounded-full ${notification.type === 'success' ? 'bg-[#3B9ACB]/10 text-[#3B9ACB]' : 'bg-red-50 text-red-500'}`}>
            {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          </div>
          <div>
            <h4 className={`font-bold text-sm ${notification.type === 'success' ? 'text-[#3B9ACB]' : 'text-red-600'}`}>
              {notification.type === 'success' ? 'Success' : 'Error'}
            </h4>
            <p className="text-sm text-slate-600 font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      {/* --- Delete Modal --- */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in" onClick={() => setDeleteModalOpen(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 mx-auto">
                <Trash2 className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Delete Product?</h3>
              <p className="text-center text-slate-500 mb-6 text-sm">
                This action affects your live store. You can move it to drafts to keep the data, or delete it permanently.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => deleteModalOpen && handleDelete(deleteModalOpen, false)}
                  disabled={deleteLoading}
                  className="w-full py-3 px-4 bg-white border-2 border-slate-100 hover:border-[#3B9ACB] hover:text-[#3B9ACB] text-slate-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <Box size={18} className="text-slate-400 group-hover:text-[#3B9ACB]" />
                  Move to Drafts (Safe)
                </button>
                <button
                  onClick={() => deleteModalOpen && handleDelete(deleteModalOpen, true)}
                  disabled={deleteLoading}
                  className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  {deleteLoading ? "Processing..." : "Delete Permanently"}
                </button>
                <button
                  onClick={() => setDeleteModalOpen(null)}
                  disabled={deleteLoading}
                  className="w-full py-2 text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="h-1.5 w-full bg-gradient-to-r from-red-400 to-red-600" />
          </div>
        </div>
      )}

      {/* --- Header Section --- */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
              <span className="bg-gradient-to-br from-[#3B9ACB] to-[#2A7DA8] text-transparent bg-clip-text">
                Product
              </span>
              Management
            </h1>
            <p className="mt-2 text-slate-500 font-medium">
              Oversee your inventory, manage status, and organize your catalog.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* REMOVED: Preview Store Button as requested */}
            
            <button 
              onClick={() => loadProducts(true)}
              className="p-3 rounded-xl bg-white text-slate-500 border border-slate-200 shadow-sm hover:text-[#3B9ACB] hover:border-[#3B9ACB] transition-all group"
              title="Refresh Data"
            >
              <RefreshCw size={20} className="group-active:animate-spin" />
            </button>
            <a
              href="/admin/products/new"
              className="group flex items-center gap-2 bg-[#3B9ACB] hover:bg-[#2A7DA8] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#3B9ACB]/30 transition-all hover:-translate-y-0.5"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              Add Product
            </a>
          </div>
        </div>

        {/* --- Stats Cards (Live Data) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-[#3B9ACB]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="p-4 rounded-xl bg-[#3B9ACB]/10 text-[#3B9ACB]">
              <Package size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Products</p>
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

        {/* --- Toolbar & Filters --- */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or category..." 
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

        {/* --- Main Data Table --- */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Product Info</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProducts.map((p) => (
                  <tr 
                    key={p._id} 
                    className="group hover:bg-slate-50/80 transition-colors duration-200"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#3B9ACB]/10 flex items-center justify-center text-[#3B9ACB] shadow-sm">
                          <Package size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-base">{p.title}</div>
                          <div className="text-xs text-slate-400 font-mono mt-1 group-hover:text-[#3B9ACB] transition-colors">
                            /{p.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold capitalize border border-slate-200">
                        {p.category}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                          p.status === "published"
                            ? "bg-green-50 text-green-700 border-green-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === "published" ? "bg-green-500" : "bg-amber-500"}`} />
                        {p.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {/* UPDATED: Removed hover logic, now ALWAYS visible */}
                      <div className="flex items-center justify-center gap-2">
                        
                        {/* New Preview Button - Only for Published */}
                        {p.status === 'published' && (
                          <a
                            href={`/products/${p.category}/${p.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg text-slate-400 hover:text-[#3B9ACB] hover:bg-[#3B9ACB]/10 transition-colors"
                            title="Preview Product"
                          >
                            <Eye size={18} />
                          </a>
                        )}

                        {/* Divider if Preview exists */}
                        {p.status === 'published' && <div className="w-px h-4 bg-slate-200" />}

                        <a
                          href={`/admin/products/${p._id}`}
                          className="p-2 rounded-lg text-[#3B9ACB] bg-[#3B9ACB]/5 hover:bg-[#3B9ACB]/20 transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 size={18} />
                        </a>
                        
                        <div className="w-px h-4 bg-slate-200" />
                        
                        <button
                          onClick={() => setDeleteModalOpen(p._id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                          <Search size={24} className="opacity-50" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">No products found</h3>
                        <p className="text-sm mt-1">
                          Try adjusting your search or filter to find what you're looking for.
                        </p>
                        {searchQuery && (
                           <button 
                            onClick={() => {setSearchQuery(''); setStatusFilter('all');}}
                            className="mt-4 text-[#3B9ACB] font-bold hover:underline"
                           >
                             Clear filters
                           </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer of Table */}
          <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Showing {filteredProducts.length} results</span>
            <span>Sorted by newest</span>
          </div>
        </div>
      </div>
    </div>
  );
}