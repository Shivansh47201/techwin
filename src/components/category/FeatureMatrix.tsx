'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FeatureMatrixData {
  categories: {
    id: string;
    name: string;
    features: {
      stability: string;
      noise: string;
      coherence: string;
      integration: string;
      bonus5?: string;
      bonus6?: string;
    };
  }[];
}

interface FeatureMatrixProps {
  data: FeatureMatrixData;
  title?: string;
  description?: string;
}

const FeatureMatrix: React.FC<FeatureMatrixProps> = ({
  data,
  title = 'Feature Matrix',
  description = 'Compare the most critical performance aspects of this laser family – stability, noise, coherence and integration – in a clean, tab-based view.',
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedFeatures, setExpandedFeatures] = useState<string[]>([]);

  const toggleFeature = (featureKey: string) => {
    setExpandedFeatures((prev) =>
      prev.includes(featureKey)
        ? prev.filter((f) => f !== featureKey)
        : [...prev, featureKey]
    );
  };

  const activeCategory = data.categories[activeTab];

  const featuresList = [
    {
      key: 'stability',
      label: 'Stability',
      icon: '📊',
      color: 'from-blue-400 to-blue-600',
    },
    {
      key: 'noise',
      label: 'Low Noise',
      icon: '🔇',
      color: 'from-green-400 to-green-600',
    },
    {
      key: 'coherence',
      label: 'High Coherence',
      icon: '🌊',
      color: 'from-purple-400 to-purple-600',
    },
    {
      key: 'integration',
      label: 'Easy Integration',
      icon: '🔧',
      color: 'from-orange-400 to-orange-600',
    },
  ];

  // Optional bonus features
  const bonusFeatures = [];
  if (activeCategory.features.bonus5) {
    bonusFeatures.push({
      key: 'bonus5',
      label: 'Point 5',
      icon: '⭐',
      color: 'from-pink-400 to-pink-600',
    });
  }
  if (activeCategory.features.bonus6) {
    bonusFeatures.push({
      key: 'bonus6',
      label: 'Point 6',
      icon: '✨',
      color: 'from-indigo-400 to-indigo-600',
    });
  }

  const allFeatures = [...featuresList, ...bonusFeatures];

  return (
    <section className="w-full py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"></div>
            <span className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">
              FEATURE MATRIX
            </span>
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {data.categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveTab(index);
                  setExpandedFeatures([]);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600 border border-slate-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allFeatures.map((feature, index) => {
            const featureValue = activeCategory.features[feature.key as keyof typeof activeCategory.features];

            return (
              <div
                key={feature.key}
                className={`bg-gradient-to-br ${feature.color} p-0.5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
                onClick={() => toggleFeature(feature.key)}
              >
                <div className="bg-slate-800 rounded-lg p-5 h-full">
                  {/* Feature Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <h3 className="text-white font-bold text-lg">{feature.label}</h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-300 ${
                        expandedFeatures.includes(feature.key) ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Feature Value (Always Visible) */}
                  <p className="text-gray-200 text-sm font-semibold mb-2 line-clamp-2">
                    {featureValue}
                  </p>

                  {/* Expanded Details */}
                  {expandedFeatures.includes(feature.key) && (
                    <div className="mt-3 pt-3 border-t border-slate-600">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {featureValue}
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <span className="text-cyan-400 text-xs font-semibold">
                          ✓ Verified & Tested
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Info Card */}
        <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-xl p-6">
          <h3 className="text-white font-bold text-lg mb-2">
            {activeCategory.name}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            This laser family excels in {featuresList
              .map((f) => f.label.toLowerCase())
              .join(', ')}.
            All features have been engineered and validated for production-grade reliability.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Want to learn more about these features?
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
            Request Detailed Specifications
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureMatrix;
