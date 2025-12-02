// src/components/products/ProductComparisonTable.tsx
import React from "react";
import { ProductSection } from "@/types/categories";
import { cn } from "@/lib/utils";

interface ProductComparisonTableProps {
  section: ProductSection;
}

const ProductComparisonTable: React.FC<ProductComparisonTableProps> = ({
  section,
}) => {
  if (section.type !== "comparison" || !section.comparisonTable) {
    return null;
  }

  const { headers, rows } = section.comparisonTable;

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
        {section.heading}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  const isHighlighted =
                    typeof cell === "object" && cell.highlight;
                  const cellText =
                    typeof cell === "object" ? cell.text : cell;
                  return (
                    <td
                      key={cellIndex}
                      className={cn(
                        "px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-b border-gray-200",
                        isHighlighted ? "font-semibold text-blue-600" : ""
                      )}
                    >
                      {cellText}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductComparisonTable;
