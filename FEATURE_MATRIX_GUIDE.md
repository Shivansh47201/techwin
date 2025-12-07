# Feature Matrix Component Implementation Guide

## Overview

The **Feature Matrix** is a reusable, interactive component that displays critical performance specifications of laser product categories in a clean, tabbed interface. It's designed to help customers quickly compare key metrics (Stability, Noise, Coherence, Integration) across different product types within a category.

## Component Location

- **Component**: `/src/components/category/FeatureMatrix.tsx`
- **Data Files**: `/src/data/categories/[categoryName]Data.ts` (all 8 files updated)
- **Example Usage**: `/src/components/category/FeatureMatrixExample.tsx`

## Features

✅ **Tab-based Interface**: Switch between different product types/subcategories  
✅ **4-6 Feature Points**: Stability, Noise, Coherence, Integration + 2 optional bonus points  
✅ **Expandable Cards**: Click to see full feature descriptions  
✅ **Gradient Styling**: Beautiful, modern UI with hover effects  
✅ **Responsive Design**: Works seamlessly on mobile, tablet, and desktop  
✅ **Production Ready**: Type-safe TypeScript with full error handling  

## Data Structure

Each category now includes a `featureMatrix` property in its `CategoryData`:

```typescript
featureMatrix?: {
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
};
```

## Updated Categories (All 8)

1. ✅ **Broadband ASE Sources** - 5 product types with feature matrices
2. ✅ **Single-Frequency Fiber Lasers** - 5 laser types with detailed specs
3. ✅ **Seed Fiber Lasers** - 5 seed laser configurations
4. ✅ **High-Power Fiber Lasers** - 5 power classes (1um, 1.5um, 2um, LiDAR, Kilowatt)
5. ✅ **Fiber Amplifiers** - 5 amplifier types (PM, High-Power, Modules, 1um, 1.5um)
6. ✅ **Laser Testing Systems** - 5 testing configurations (Spectral, Noise, Combined, LiDAR, Quantum)
7. ✅ **Point Light Sources** - 5 SLED variations (1um, 1.5um, 2um, OCT, Sensing)
8. ✅ **SLED Light Sources** - 5 SLED modules (1um, 1.5um, 2um, Imaging, Sensing)
9. ✅ **Wavelength Conversion** - 5 conversion options (193nm, 266nm, 355nm, 532nm, 780nm)

## Usage Example

### Basic Implementation in a Category Page

```typescript
import FeatureMatrix from '@/components/category/FeatureMatrix';
import { singleFrequencyData } from '@/data/categories/singleFrequencyData';

export default function SingleFrequencyCategoryPage() {
  return (
    <div>
      {/* Other page content */}
      
      {/* Feature Matrix Section */}
      {singleFrequencyData.featureMatrix && (
        <FeatureMatrix
          data={singleFrequencyData.featureMatrix}
          title="Engineered features that matter in the lab"
          description="Compare the most critical performance aspects of this laser family – stability, noise, coherence and integration – in a clean, tab-based view."
        />
      )}
    </div>
  );
}
```

### Advanced: Multiple Categories in One View

```typescript
import FeatureMatrix from '@/components/category/FeatureMatrix';
import { singleFrequencyData, broadbandAseData, highPowerData } from '@/data/categories';

export default function ComparisonPage() {
  return (
    <div className="space-y-12">
      {singleFrequencyData.featureMatrix && (
        <FeatureMatrix data={singleFrequencyData.featureMatrix} />
      )}
      {broadbandAseData.featureMatrix && (
        <FeatureMatrix data={broadbandAseData.featureMatrix} />
      )}
      {highPowerData.featureMatrix && (
        <FeatureMatrix data={highPowerData.featureMatrix} />
      )}
    </div>
  );
}
```

## Feature Matrix Props

```typescript
interface FeatureMatrixProps {
  data: FeatureMatrixData;              // Required: Feature matrix data structure
  title?: string;                       // Optional: Main heading (default: "Feature Matrix")
  description?: string;                 // Optional: Subtitle/description text
}
```

## Feature Points Explained

### Core 4 Features (Required)

**1. Stability** 📊
- Power/output consistency over time
- Drift characteristics and long-term stability
- Frequency/wavelength lock capabilities

**2. Low Noise** 🔇
- Relative Intensity Noise (RIN) performance
- Phase noise characteristics
- Signal-to-noise ratio

**3. High Coherence** 🌊
- Linewidth specifications (Hz/kHz level)
- Spectral purity and bandwidth
- Coherence length for interferometry

**4. Easy Integration** 🔧
- Connector types and fiber compatibility
- Form factor (compact, modular, industrial)
- Control interfaces and power management

### Bonus Features (Optional)

**Point 5 & 6**: Category-specific advantages such as:
- Customization options
- Wavelength availability
- Advanced modulation capabilities
- Environmental compensation
- Factory calibration
- Long operational lifetime

## Visual Design

### Color Scheme
- **Stability**: Blue gradient (📊)
- **Noise**: Green gradient (🔇)
- **Coherence**: Purple gradient (🌊)
- **Integration**: Orange gradient (🔧)
- **Bonus 5**: Pink gradient (⭐)
- **Bonus 6**: Indigo gradient (✨)

### Responsive Behavior
- **Mobile**: Single column layout with stacked tabs
- **Tablet**: 2-column grid (responsive)
- **Desktop**: 2-column grid with hover effects
- **Animations**: Smooth transitions and expandable cards

## Integration Checklist

- [x] Create FeatureMatrix component with TypeScript support
- [x] Add featureMatrix data to all 8 category data files
- [x] Add featureMatrix type to CategoryData interface
- [x] Create comprehensive feature points across all categories
- [x] Ensure responsive design and mobile compatibility
- [x] Add gradient styling and visual hierarchy
- [x] Test component with multiple categories
- [x] Create usage examples and documentation

## Next Steps (Optional Enhancements)

1. **Export Functionality**: Add ability to export feature comparison as PDF
2. **Advanced Filtering**: Filter features by performance tier or wavelength
3. **Comparison Mode**: Compare across multiple categories side-by-side
4. **Analytics**: Track which features users explore most
5. **Dynamic Data**: Connect to product database for real-time updates
6. **Localization**: Support multiple languages for international markets

## Customization

### Changing Titles and Descriptions

```typescript
<FeatureMatrix
  data={data}
  title="Your Custom Title"
  description="Your custom description text here"
/>
```

### Modifying Feature Categories

Edit the `featuresList` array in `FeatureMatrix.tsx` to change:
- Feature names and labels
- Icons and emojis
- Color gradients
- Feature keys

### Adding Custom Styling

The component uses Tailwind CSS. Modify classes in:
- Header section styles
- Tab button styles
- Feature card gradients
- Responsive breakpoints

## Troubleshooting

**Q: Feature matrix not showing?**
A: Ensure the category data includes the `featureMatrix` property. Check browser console for errors.

**Q: Categories tab not switching?**
A: Verify that `activeTab` state is updating correctly. Check that all tabs have unique IDs.

**Q: Styling not applying?**
A: Clear Tailwind cache and rebuild. Ensure Tailwind is configured to watch the component file.

**Q: Performance issues?**
A: Component is optimized for ~5-6 tabs. For more, consider pagination or lazy loading.

## File References

- Type definitions: `src/types/categories.ts`
- Component: `src/components/category/FeatureMatrix.tsx`
- Category data files in: `src/data/categories/`
- Example usage: `src/components/category/FeatureMatrixExample.tsx`

## Support

For questions or issues with the Feature Matrix component:
1. Review the example implementation
2. Check the category data structure
3. Verify TypeScript interfaces match
4. Test in different browsers for compatibility
5. Check Tailwind CSS configuration

---

**Last Updated**: December 6, 2025  
**Component Version**: 1.0.0  
**Status**: Production Ready ✅
