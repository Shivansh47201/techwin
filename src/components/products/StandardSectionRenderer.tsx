// src/components/products/StandardSectionRenderer.tsx
import React from "react";
import { ProductSection } from "@/types/categories";
import ProductComparisonTable from "./ProductComparisonTable";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface StandardSectionRendererProps {
  sections: ProductSection[];
}

const StandardSectionRenderer: React.FC<StandardSectionRendererProps> = ({ sections }) => {
  return (
    <div className="py-12 space-y-16">
      {sections.map((section, index) => (
        <div key={index}>
          {section.type === "comparison" ? (
            <ProductComparisonTable section={section} />
          ) : (
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                {section.heading}
              </h2>
              {section.image && (
                <div className="my-6 relative w-full h-64 md:h-96">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              {section.content && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              )}
              {section.bullets && (
                <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {section.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-800 font-medium">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StandardSectionRenderer;
