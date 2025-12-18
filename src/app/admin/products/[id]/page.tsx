"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductEditPage({ params }: any) {
  const id = params?.id
  const [product, setProduct] = useState<any>({ name: '', sku: '', category: '', shortDescription: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(()=>{ if(id) fetchOne() },[id])

  async function fetchOne(){
    setLoading(true)
    try{
      const res = await fetch(`/api/admin/products/${id}`)
      const data = await res.json()
      if(data) setProduct(data)
    }catch(e){console.error(e)}
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent){
    e.preventDefault()
    await fetch(`/api/admin/products/${id}`, { method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(product) })
    router.push('/admin/products')
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Edit Product — {product?.name || id}</h2>
      {loading ? <div>Loading…</div> : (
        <form onSubmit={handleSave} className="mt-4 grid grid-cols-1 gap-3">
          <input placeholder="Name" value={product.name || ''} onChange={e=>setProduct((p:any)=>({...p,name:e.target.value}))} />
          <input placeholder="SKU" value={product.sku || ''} onChange={e=>setProduct((p:any)=>({...p,sku:e.target.value}))} />
          <input placeholder="Category" value={product.category || ''} onChange={e=>setProduct((p:any)=>({...p,category:e.target.value}))} />
          <textarea placeholder="Short description" value={product.shortDescription || ''} onChange={e=>setProduct((p:any)=>({...p,shortDescription:e.target.value}))} />
          <div><button type="submit" className="btn">Save</button></div>
        </form>
      )}
    </div>
  )
}
