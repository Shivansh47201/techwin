// src/components/quote/RequestQuoteModal.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  company: string;
  email: string;
  productInterest: string;
  message: string;
  honeypot?: string;
};

export default function RequestQuoteModal({ open, onClose }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    productInterest: "",
    message: "",
    honeypot: "",
  });
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setStatus(null);
      setTimeout(() => {
        modalRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function setField<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function validate() {
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) return "Please enter a valid email.";
    if (!form.productInterest) return "Please select product interest.";
    if (!form.name) return "Please enter your name.";
    // honeypot should be empty
    if (form.honeypot) return "Spam detected.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setStatus("error");
      alert(v);
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/request-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
      setForm({ name: "", company: "", email: "", productInterest: "", message: "", honeypot: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request Quote"
      className="fixed inset-0 z-60 flex items-center justify-center px-4 sm:px-6"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={onClose} />

      <div ref={modalRef} className="relative z-20 max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Request a Quote</h3>
            <p className="text-sm text-slate-600">Short form — we’ll reply within 1 business day.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded hover:bg-slate-100">
            ✕
          </button>
        </div>

        {/* body */}
        <div className="px-6 py-6">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="mx-auto w-20 h-20 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#0b2f4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h4 className="text-lg font-semibold">Thanks — we received your request</h4>
              <p className="mt-2 text-sm text-slate-600">Our team will contact you within 24 hours.</p>
              <div className="mt-6 flex justify-center gap-3">
                <Link href="/contact" className="px-4 py-2 rounded-md bg-white border text-[var(--color-primary)]">Contact page</Link>
                <button onClick={onClose} className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white">Done</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              {/* hidden honeypot */}
              <input type="text" name="honeypot" value={form.honeypot} onChange={(e)=>setField("honeypot", e.target.value)} style={{display:"none"}} autoComplete="off" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">Name *</span>
                  <input name="name" value={form.name} onChange={(e)=>setField("name", e.target.value)} className="mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)]" placeholder="Your full name" required />
                </label>
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">Company</span>
                  <input name="company" value={form.company} onChange={(e)=>setField("company", e.target.value)} className="mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)]" placeholder="Company / Org" />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">Email *</span>
                  <input name="email" type="email" value={form.email} onChange={(e)=>setField("email", e.target.value)} className="mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)]" placeholder="name@company.com" required />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">Product interest *</span>
                  <select name="productInterest" value={form.productInterest} onChange={(e)=>setField("productInterest", e.target.value)} required className="mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)]">
                    <option value="">— Select product family —</option>
                    <option value="single-frequency">Single-Frequency Fiber Lasers</option>
                    <option value="seed">Seed Lasers</option>
                    <option value="high-power">High-Power Fiber Lasers</option>
                    <option value="wavelength-conversion">Wavelength Conversion</option>
                    <option value="broadband">Broadband & ASE Sources</option>
                    <option value="fiber-amplifiers">Fiber Amplifiers</option>
                    <option value="testing">Testing Systems</option>
                    <option value="sled">SLED Light Sources</option>
                    <option value="other">Other / Custom</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-slate-700">Message</span>
                <textarea name="message" value={form.message} onChange={(e)=>setField("message", e.target.value)} rows={4} className="mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)]" placeholder="Project details, required timeline, budget (optional)..." />
              </label>

              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-500">By submitting you agree to our <Link href="/privacy-policy" className="underline">privacy policy</Link>.</div>

                <div className="flex items-center gap-3">
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)] text-white font-semibold shadow hover:brightness-95 disabled:opacity-60">
                    {submitting ? "Sending..." : "Send Request"}
                  </button>
                  <button type="button" onClick={onClose} className="px-4 py-2 rounded-full border border-slate-200 text-slate-700">Cancel</button>
                </div>
              </div>
              {status === "error" && <p className="text-sm text-red-600 mt-1">Something went wrong. Please try again or email us at <a href="mailto:info@techwin.com" className="underline">info@techwin.com</a>.</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
