// src/components/common/Card.tsx
"use client";

import React from "react";
import clsx from "clsx";

type Props = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  image?: string | React.ReactNode;
  alt?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Card({ title, subtitle, image, alt, className, onClick, children, footer }: Props) {
  return (
    <article
      role={onClick ? "button" : undefined}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      className={clsx(
        "group bg-white rounded-2xl border border-[rgba(48,135,192,0.06)] shadow-[0_8px_20px_rgba(48,135,192,0.04)] overflow-hidden transition-transform hover:-translate-y-1",
        className
      )}
    >
      {image && (
        <div className="p-5">
          {typeof image === "string" ? (
            <img src={image} alt={alt ?? ""} className="w-full h-40 object-contain rounded-xl" />
          ) : (
            image
          )}
        </div>
      )}

      <div className="p-5 pt-0">
        {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
        {subtitle && <p className="text-sm text-slate-600 mt-2">{subtitle}</p>}

        {children && <div className="mt-3 text-sm text-slate-700">{children}</div>}

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </article>
  );
}
