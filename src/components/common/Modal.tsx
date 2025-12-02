// src/components/common/Modal.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
  showClose?: boolean;
};

export default function Modal({ open, onClose, title, size = "md", children, className, showClose = true }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        // very small focus trap (keeps focus inside)
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
    if (open) {
      lastActiveRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      setTimeout(() => {
        // focus first focusable inside modal
        const focusable = dialogRef.current?.querySelector<HTMLElement>("button, a, input, textarea, [tabindex]");
        focusable?.focus();
      }, 40);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastActiveRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const width = size === "sm" ? "max-w-xl" : size === "lg" ? "max-w-4xl" : "max-w-2xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Dialog"}
        ref={dialogRef}
        initial={{ opacity: 0, y: 12, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28 }}
        className={clsx("relative z-10 w-full", width, "bg-white rounded-3xl shadow-xl overflow-hidden", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(48,135,192,0.06)]">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          </div>

          {showClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-[rgba(48,135,192,0.08)]"
              aria-label="Close dialog"
            >
              ✕
            </button>
          )}
        </div>

        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}
