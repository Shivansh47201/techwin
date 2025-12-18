import React, { useState } from 'react'

type FormState = {
  fullName: string
  company: string
  email: string
  phone: string
  productModel: string
  requiredPower: string
  wavelength: string
  application: string
  timeline: string
  preferredContact: string
}

const initialState: FormState = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  productModel: '',
  requiredPower: '',
  wavelength: '',
  application: '',
  timeline: 'ASAP',
  preferredContact: 'Email'
}

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (!form.fullName || !form.company || !form.email || !form.application) {
      setMessage('Please fill required fields.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error('Network response was not ok')
      const body = await res.json()
      if (body?.success) {
        setMessage('Thanks — your request has been received. We will respond within 1 business day.')
        setForm(initialState)
      } else {
        setMessage('Submission failed, please try again.')
      }
    } catch (err) {
      console.error(err)
      setMessage('Submission failed, please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="quote-form">
      <div>
        <label>Full name*</label>
        <input value={form.fullName} onChange={e => update('fullName', e.target.value)} required />
      </div>
      <div>
        <label>Company*</label>
        <input value={form.company} onChange={e => update('company', e.target.value)} required />
      </div>
      <div>
        <label>Email*</label>
        <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required />
      </div>
      <div>
        <label>Phone</label>
        <input value={form.phone} onChange={e => update('phone', e.target.value)} />
      </div>
      <div>
        <label>Product model / SKU</label>
        <input value={form.productModel} onChange={e => update('productModel', e.target.value)} />
      </div>
      <div>
        <label>Required output power</label>
        <input value={form.requiredPower} onChange={e => update('requiredPower', e.target.value)} placeholder="e.g., 20 W" />
      </div>
      <div>
        <label>Wavelength / spectral needs</label>
        <input value={form.wavelength} onChange={e => update('wavelength', e.target.value)} placeholder="e.g., 1064 nm" />
      </div>
      <div>
        <label>Application / brief description*</label>
        <textarea value={form.application} onChange={e => update('application', e.target.value)} required />
      </div>
      <div>
        <label>Timeline*</label>
        <select value={form.timeline} onChange={e => update('timeline', e.target.value)}>
          <option>ASAP</option>
          <option>1-4 weeks</option>
          <option>1-3 months</option>
          <option>3+ months</option>
        </select>
      </div>
      <div>
        <label>Preferred contact method</label>
        <select value={form.preferredContact} onChange={e => update('preferredContact', e.target.value)}>
          <option>Email</option>
          <option>Phone</option>
          <option>Video call</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Request Quote'}</button>
      </div>

      <p className="hint">Accepted file attachments are handled by email after submission. For drawings or large files, please reply to our confirmation email.</p>

      {message && <div className="form-message">{message}</div>}
    </form>
  )
}
