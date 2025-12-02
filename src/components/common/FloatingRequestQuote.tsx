// src/components/common/FloatingRequestQuote.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import Image from "next/image";

/**
 * FloatingRequestQuote
 *
 * Fixed floating button bottom-right that opens a modal request form.
 * - Accessible (aria, focus management)
 * - Animated (entrance, hover, modal)
 * - Polished styling matching Techwin theme tokens (--color-primary)
 *
 * Drop this component in your layout (e.g., app/layout.tsx or pages/_app.tsx)
 */

export default function FloatingRequestQuote() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");

  // refs for focus management
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Open modal and focus first input
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstInputRef.current?.focus(), 80);
      // lock scroll
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    } else {
      // restore focus to button when modal closed
      openButtonRef.current?.focus();
    }
  }, [open]);

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Basic client-side validation
  function validate() {
    if (!name.trim()) return "Please enter your name.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email.";
    if (!message.trim()) return "Please enter a short message or requirement.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);

    try {
      // POST to the existing API endpoint (you mentioned /api/request-quote earlier).
      const res = await fetch("/api/request-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          product,
          message,
          source: "website-floating-quote",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server error");
      }

      setSuccess("Thanks — your request has been submitted. We will contact you soon.");
      // reset fields lightly
      setName("");
      setCompany("");
      setEmail("");
      setProduct("");
      setMessage("");
      setTimeout(() => setOpen(false), 1200);
    } catch (err: any) {
      setError(err?.message || "Submission failed. Try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        ref={openButtonRef}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="request-quote-modal"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.03, y: -2 }}
        className="
          fixed z-50 right-6 bottom-6 md:right-10 md:bottom-10
          bg-[--color-primary] text-white rounded-3xl shadow-[0_12px_30px_rgba(48,135,192,0.22)]
          px-4 py-3 flex items-center gap-3 focus:outline-none
          focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.14)]
          hover:shadow-[0_18px_48px_rgba(48,135,192,0.28)]
        "
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
          <Send className="w-5 h-5" />
        </span>
        <span className="hidden sm:inline-block text-sm font-medium">Request Quote</span>
        <span className="sr-only">Open Request Quote form</span>
      </motion.button>

      {/* Modal */}
      {open && (
        <div
          id="request-quote-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rq-title"
          className="fixed inset-0 z-60 flex items-end md:items-center justify-center p-6 md:p-8"
          onClick={() => setOpen(false)}
        >
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.28 }}
          />

          <motion.div
            ref={modalRef}
            role="document"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.36, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl md:max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(48,135,192,0.06)]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[rgba(48,135,192,0.06)]">
                  {/* small brand/icon */}
                  <Image src="/techwin-company/mini-logo.png" alt="" width={36} height={36} />
                </div>
                <div>
                  <h3 id="rq-title" className="text-lg md:text-xl font-semibold text-slate-900">
                    Request a Quote
                  </h3>
                  <p className="text-sm text-slate-600">Tell us your requirements — we will respond within 1 business day.</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.08)]"
                aria-label="Close request quote dialog"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* body */}
            <form onSubmit={onSubmit} className="px-6 py-6 md:px-8 md:py-8">
              {/* success / error */}
              {success && (
                <div className="mb-4 rounded-lg bg-green-50 border border-green-100 text-green-800 px-4 py-2 text-sm">
                  {success}
                </div>
              )}
              {error && (
                <div className="mb-4 rounded-lg bg-rose-50 border border-rose-100 text-rose-800 px-4 py-2 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-xs text-slate-700 mb-1">Name *</span>
                  <input
                    ref={firstInputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-[rgba(48,135,192,0.06)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.08)]"
                    placeholder="Your full name"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-xs text-slate-700 mb-1">Company</span>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-[rgba(48,135,192,0.06)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.08)]"
                    placeholder="Company / Institution"
                  />
                </label>

                <label className="flex flex-col md:col-span-1">
                  <span className="text-xs text-slate-700 mb-1">Email *</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-[rgba(48,135,192,0.06)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.08)]"
                    type="email"
                    placeholder="name@company.com"
                    required
                  />
                </label>

                <label className="flex flex-col md:col-span-1">
                  <span className="text-xs text-slate-700 mb-1">Product / Interest</span>
                  <input
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-[rgba(48,135,192,0.06)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.08)]"
                    placeholder="e.g. High-power fiber laser (1.5 µm)"
                  />
                </label>
              </div>

              <label className="flex flex-col mt-4">
                <span className="text-xs text-slate-700 mb-1">Message *</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="px-3 py-3 rounded-xl border border-[rgba(48,135,192,0.06)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.08)] min-h-[120px]"
                  placeholder="Describe your requirements, target wavelength, power, or timeline..."
                  required
                />
              </label>

              <div className="mt-5 flex items-center gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-2 text-sm border hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-[--color-primary] text-white text-sm font-medium hover:brightness-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.12)]"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Sending..." : "Send Request"}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
