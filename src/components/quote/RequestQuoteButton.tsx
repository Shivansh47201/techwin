// src/components/quote/RequestQuoteButton.tsx
"use client";

import React from "react";
import { useRequestQuote } from "@/context/RequestQuoteContext";

export default function RequestQuoteButton() {
  const { openModal } = useRequestQuote();

  return (
    <>
      {/* Sticky floating button (bottom-right) */}
      <button
        onClick={openModal}
        aria-label="Request a Quote"
        className="fixed z-50 right-4 bottom-4 sm:right-5 sm:bottom-5 md:right-8 md:bottom-8 flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-full shadow-lg text-white font-semibold"
        style={{ background: "var(--color-primary)", boxShadow: "0 12px 30px rgba(16,64,102,0.16)" }}
      >
        <svg
          className="h-5 w-5 sm:h-auto sm:w-auto"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path d="M12 2v6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12h-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 12h6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22v-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="hidden sm:inline">Request Quote</span>
      </button>
    </>
  );
}
