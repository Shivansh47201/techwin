// src/components/common/Button.tsx
"use client";

import React from "react";
import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
  as?: "button" | "a";
  loading?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
};

export default function Button({
  variant = "primary",
  as = "button",
  className,
  loading = false,
  children,
  href,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-medium transition focus:outline-none focus-visible:ring-4";
  const sizeClass = (rest as any).size === "lg" ? "px-6 py-3 text-base" : (rest as any).size === "sm" ? "px-3 py-1 text-sm" : "";
  const variants: Record<string, string> = {
    primary:
      "bg-[--color-primary] text-white hover:brightness-95 focus-visible:ring-[rgba(48,135,192,0.14)] shadow-[0_8px_20px_rgba(48,135,192,0.12)]",
    secondary:
      "border border-[--color-primary] text-[--color-primary] bg-white hover:bg-[--color-primary]/10 focus-visible:ring-[rgba(48,135,192,0.08)]",
    ghost: "bg-transparent text-[--color-primary] hover:bg-[--color-primary]/6",
  };

  const content = (
    <button
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={clsx(base, sizeClass, variants[variant], className, loading && "opacity-80 pointer-events-none")}
      aria-busy={loading}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.35)" strokeWidth="4" />
          <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}
      <span>{children}</span>
    </button>
  );

  if (as === "a") {
    // anchor link variant — spread anchor attributes too
    return (
      <a href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={clsx(base, sizeClass, variants[variant], className)}>
        {children}
      </a>
    );
  }

  return content;
}
