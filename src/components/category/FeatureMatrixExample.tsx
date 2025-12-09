'use client';

import React from 'react';
import FeatureMatrix from '@/components/category/FeatureMatrix';
import { singleFrequencyData } from '@/data/categories/singleFrequencyData';
import { broadbandAseData } from '@/data/categories/broadbandAseData';
import { seedFiberData } from '@/data/categories/seedFiberData';
import { highPowerData } from '@/data/categories/highPowerData';
import { fiberAmplifierData } from '@/data/categories/fiberAmplifierData';
import { laserTestingData } from '@/data/categories/laserTestingData';
import { pointLightSourceData } from '@/data/categories/pointLightSourceData';
import { sledLightData } from '@/data/categories/sledLightData';
import { wavelengthConversionData } from '@/data/categories/wavelengthConversionData';

/**
 * FEATURE MATRIX USAGE GUIDE
 * 
 * The Feature Matrix component displays critical performance aspects of laser families
 * in an interactive, tab-based view. Each category has 4-6 feature points covering:
 * - Stability: Power/output consistency and drift characteristics
 * - Low Noise: RIN, phase noise, and noise floor specifications
 * - High Coherence: Linewidth, spectral purity, and coherence length
 * - Easy Integration: Compatibility, connectors, and system integration
 * - Point 5 (optional): Category-specific advanced feature
 * - Point 6 (optional): Category-specific technical advantage
 */

export function FeatureMatrixExample() {
  return (
    <div className="w-full">
      {/* Example 1: Single-Frequency Fiber Lasers */}
      {singleFrequencyData.featureMatrix && (
        <FeatureMatrix
          data={singleFrequencyData.featureMatrix}
          title="Engineered features that matter in the lab"
          description="Compare the most critical performance aspects of this laser family – stability, noise, coherence and integration – in a clean, tab-based view."
        />
      )}

      {/* Example 2: Broadband ASE Sources */}
      {broadbandAseData.featureMatrix && (
        <FeatureMatrix
          data={broadbandAseData.featureMatrix}
          title="Broadband Light Source Features"
          description="Explore the engineered capabilities that make broadband and ASE sources ideal for testing, sensing, and imaging applications."
        />
      )}

      {/* Example 3: Seed Fiber Lasers */}
      {seedFiberData.featureMatrix && (
        <FeatureMatrix
          data={seedFiberData.featureMatrix}
          title="Seed Laser Performance Comparison"
          description="Compare seed laser specifications across wavelengths and performance tiers for optimal amplifier seeding."
        />
      )}

      {/* Example 4: High-Power Fiber Lasers */}
      {highPowerData.featureMatrix && (
        <FeatureMatrix
          data={highPowerData.featureMatrix}
          title="High-Power System Capabilities"
          description="Discover how high-power single-frequency lasers deliver both power and precision for industrial and research applications."
        />
      )}

      {/* Example 5: Fiber Amplifiers */}
      {fiberAmplifierData.featureMatrix && (
        <FeatureMatrix
          data={fiberAmplifierData.featureMatrix}
          title="Amplifier Performance Matrix"
          description="Compare fiber amplifier capabilities across architectures and power levels for seamless system integration."
        />
      )}

      {/* Example 6: Laser Testing Systems */}
      {laserTestingData.featureMatrix && (
        <FeatureMatrix
          data={laserTestingData.featureMatrix}
          title="Testing & Measurement Capabilities"
          description="Verify laser performance with precision spectral and noise testing solutions for production and research."
        />
      )}

      {/* Example 7: Point Light Sources */}
      {pointLightSourceData.featureMatrix && (
        <FeatureMatrix
          data={pointLightSourceData.featureMatrix}
          title="SLED Point Light Source Features"
          description="Compare low-coherence broadband sources optimized for OCT, imaging, and fiber sensing applications."
        />
      )}

      {/* Example 8: SLED Light Sources */}
      {sledLightData.featureMatrix && (
        <FeatureMatrix
          data={sledLightData.featureMatrix}
          title="SLED Module Comparison"
          description="Explore super-luminescent LED specifications across wavelengths for biomedical imaging and sensing systems."
        />
      )}

      {/* Example 9: Wavelength Conversion */}
      {wavelengthConversionData.featureMatrix && (
        <FeatureMatrix
          data={wavelengthConversionData.featureMatrix}
          title="Wavelength Conversion Systems"
          description="Discover UV, visible, and IR wavelength conversion capabilities for spectroscopy, lithography, and quantum applications."
        />
      )}
    </div>
  );
}

export default FeatureMatrixExample;
