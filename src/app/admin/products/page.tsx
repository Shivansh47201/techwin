"use client"
import React, { useEffect, useState } from 'react'

type Product = { id?: number; name: string; sku?: string; category?: string; shortDescription?: string }

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [newProduct, setNewProduct] = useState<Product>({ name: '', sku: '', category: '', shortDescription: '' })

  useEffect(() => { fetchList() }, [])

  async function fetchList() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      const arr = await res.json()
      setProducts(arr || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProduct) })
      if (res.ok) { setNewProduct({ name: '', sku: '', category: '', shortDescription: '' }); fetchList() }
    } catch (e) { console.error(e) }
  }

  async function handleDelete(id?: number) {
    if (!id) return
    if (!confirm('Delete this product?')) return
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    fetchList()
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Admin — Products</h2>
      <p className="text-sm text-slate-600">Add, edit and remove product entries (demo uses file storage).</p>

      <section className="mt-4">
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input placeholder="Name" value={newProduct.name} onChange={e=>setNewProduct(s=>({...s,name:e.target.value}))} />
          <input placeholder="SKU" value={newProduct.sku} onChange={e=>setNewProduct(s=>({...s,sku:e.target.value}))} />
          <input placeholder="Category" value={newProduct.category} onChange={e=>setNewProduct(s=>({...s,category:e.target.value}))} />
          <div><button className="btn" type="submit">Add product</button></div>
        </form>
      </section>

      <section className="mt-6">
        {loading ? <div>Loading…</div> : (
          <table className="min-w-full border">
            <thead><tr><th>ID</th><th>Name</th><th>SKU</th><th>Category</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p=> (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{p.category}</td>
                  <td>
                    <a href={`/admin/products/${p.id}`} className="mr-2">Edit</a>
                    <button onClick={()=>handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
