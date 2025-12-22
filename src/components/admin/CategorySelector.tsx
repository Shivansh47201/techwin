"use client";

import React, { useEffect, useState, useRef } from 'react';

export default function CategorySelector({ value, onChange }: { value?: string; onChange: (v: string) => void; }) {
  const [categories, setCategories] = useState<{slug:string;title:string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const newInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        if (json?.success) {
          // Normalize different category shapes (DB vs filesystem)
          const cats = (json.categories || []).map((c: any) => ({
            slug: c.slug || c._id || c.id,
            title: c.title || c.metaTitle || c.name || (c.hero && c.hero.title) || (c.url ? c.url.replace(/\//g, " ") : c.slug || c._id),
          }));
          setCategories(cats);
        } else setError(json?.message || 'Failed to load categories');
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  // Focus the new-category input when entering add flow
  useEffect(() => {
    if (adding) {
      setTimeout(() => {
        newInputRef.current?.focus();
      }, 50);
    }
  }, [adding]);

  async function createCategory() {
    if (!newTitle.trim()) return setError('Enter a category name');
    setError(null);
    try {
      const res = await fetch('/api/admin/categories', { method: 'POST', body: JSON.stringify({ title: newTitle }), headers: { 'Content-Type': 'application/json' } });
      const json = await res.json();
      if (!json?.success) return setError(json?.message || 'Failed to create');
      const cat = json.category;
      const normalized = { slug: cat.slug || cat._id || cat.id, title: cat.metaTitle || cat.title || cat.name || cat.slug };
      setCategories((s) => {
        const found = s.find((c) => c.slug === normalized.slug);
        if (found) return s;
        return [...s, normalized];
      });
      setNewTitle('');
      setAdding(false);
      onChange(normalized.slug);
    } catch (e: any) {
      setError(String(e));
    }
  }

  return (
    <div>
      <label className="text-sm font-bold text-gray-700">Category <span className="text-red-500">*</span></label>
      <div className="">
        {loading ? (
          <div className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 text-sm text-gray-500">Loading categories...</div>
        ) : (
          // Always show the select; if adding is true, make the select show the Add New option as selected
          <select value={adding ? '__add_new__' : (value || '')} onChange={(e) => {
            const v = e.target.value;
            if (v === '__add_new__') { setAdding(true); setNewTitle(''); setError(null); return; }
            // Selecting any other value hides the add input and clears its state
            setAdding(false);
            setNewTitle('');
            setError(null);
            onChange(v);
          }} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none">
            <option value="">Select category...</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.title}</option>
            ))}
            <option value="__add_new__">➕ Add new category</option>
          </select>
        )}
      </div>

      {adding && (
        <div className="mt-3 space-y-2">
          <input ref={newInputRef} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm" placeholder="New category name" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <p className="text-xs text-gray-500">You're adding a new category — press Create to add it or Cancel to keep an existing one.</p>
          <div className="flex gap-2">
            <button type="button" onClick={createCategory} className="px-4 py-2 bg-[#3B9ACB] text-white rounded-lg">Create</button>
            <button type="button" onClick={() => { setAdding(false); setNewTitle(''); setError(null); }} className="px-4 py-2 bg-white border rounded-lg">Cancel</button>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      )}

      {!loading && !adding && categories.length === 0 && (
        <p className="text-xs text-gray-500 mt-2">No categories found — create one above.</p>
      )}
    </div>
  );
}
