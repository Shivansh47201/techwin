// src/components/products/ProductContent.tsx
import React from "react";
import { ProductSection } from "@/types/categories";
import ProductComparisonTable from "./ProductComparisonTable";
import Image from "next/image";

interface ProductContentProps {
  sections: ProductSection[];
}

const ProductContent: React.FC<ProductContentProps> = ({ sections }) => {
  return (
    <div className="py-12">
      {sections.map((section, index) => (
        <div key={index} className="mb-12">
          {section.type === "comparison" ? (
            <ProductComparisonTable section={section} />
          ) : (
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                {section.heading}
              </h2>
              {section.image && (
                <div className="my-6">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={800}
                    height={400}
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
                <ul className="mt-6 space-y-3">
                  {section.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0"
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

export default ProductContent;
