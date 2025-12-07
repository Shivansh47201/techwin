// src/components/products/ProductGraphsAndTableImageSection.tsx
"use client";

import React from "react";
import Image from "next/image";

type Props = {
  graphImageURL?: string;
  graphAlt?: string;

  heading?: string;
  subheading?: string;

  tableImageURL?: string;
  tableImageAlt?: string;

  className?: string;
};

function safe(src?: string) {
  return src ? encodeURI(src) : undefined;
}

export default function ProductGraphsAndTableImageSection({
  graphImageURL,
  graphAlt = "Performance graph",
  heading = "Product Information",
  subheading,
  tableImageURL,
  tableImageAlt = "Specification table",
  className = "",
}: Props) {
  // agar na graph hai na table → section mat dikhao
  if (!graphImageURL && !tableImageURL) return null;

  return (
    <section className={`py-4 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#3B9ACB]">
            {heading}
          </h3>
          {subheading && (
            <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* GRAPH — ab chhota, compact */}
        {graphImageURL && (
          <div className="flex justify-center mb-6 px-4">
            <div
              className="w-full bg-white rounded-xl shadow-md overflow-visible"
              // yahan se size control hoga
              style={{ maxWidth: "720px" }}
            >
              <div className="w-full bg-white flex items-center justify-center px-3 py-3">
                <Image
                  src={safe(graphImageURL)!}
                  alt={graphAlt}
                  width={1600}
                  height={1000}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* TABLE — bada hi rahe */}
        {tableImageURL && (
          <div className="flex justify-center">
            <div
              className="w-full bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              style={{ maxWidth: "1150px" }}
            >
              <div className="w-full flex items-center justify-center bg-white px-2 py-4">
                <Image
                  src={safe(tableImageURL)!}
                  alt={tableImageAlt}
                  width={2400}
                  height={1900}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                  sizes="(max-width: 1024px) 100vw, 90vw"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
