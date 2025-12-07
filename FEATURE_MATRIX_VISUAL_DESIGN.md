# Feature Matrix - Visual Design Reference

## 🎨 Component Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ───────────────────── FEATURE MATRIX ──────────────────────   │
│                                                                 │
│  Engineered features that matter in the lab                    │
│  Compare the most critical performance aspects...              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Active Tab] [Tab 2] [Tab 3] [Tab 4] [Tab 5]                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────┐           │
│  │ 📊 Stability         │  │ 🔇 Low Noise         │           │
│  ├──────────────────────┤  ├──────────────────────┤           │
│  │ Hz-level linewidth   │  │ Ultra-low phase      │           │
│  │ with exceptional     │  │ and intensity noise  │           │
│  │ long-term frequency  │  │ for coherent appl.   │           │
│  │ stability            │  │ ...                  │           │
│  │                  ▼   │  │                  ▼   │           │
│  │ [Full Details]       │  │ [Full Details]       │           │
│  └──────────────────────┘  └──────────────────────┘           │
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────┐           │
│  │ 🌊 High Coherence    │  │ 🔧 Easy Integration  │           │
│  ├──────────────────────┤  ├──────────────────────┤           │
│  │ Exceptional coherence│  │ Compact fiber-coupled│           │
│  │ length enabling      │  │ design compatible    │           │
│  │ precision            │  │ with Yb-doped...     │           │
│  │ interferometry       │  │                      │           │
│  │                  ▼   │  │                  ▼   │           │
│  │ [Full Details]       │  │ [Full Details]       │           │
│  └──────────────────────┘  └──────────────────────┘           │
│                                                                 │
│  ┌──────────────────────┐  (Optional)                          │
│  │ ⭐ Point 5           │                                      │
│  └──────────────────────┘                                      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Category Info: [Product Type Name]                           │
│  This laser family excels in stability, low noise...           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│         [Request Detailed Specifications Button]               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Color Scheme

### Feature Colors
```
Stability       🔵 Blue Gradient      from-blue-400 to-blue-600
Low Noise       🟢 Green Gradient     from-green-400 to-green-600
High Coherence  🟣 Purple Gradient    from-purple-400 to-purple-600
Easy Integration 🟠 Orange Gradient   from-orange-400 to-orange-600
Point 5 (Bonus) 🩷 Pink Gradient      from-pink-400 to-pink-600
Point 6 (Bonus) 🟦 Indigo Gradient    from-indigo-400 to-indigo-600
```

## 📱 Responsive Breakpoints

### Mobile (< 768px)
```
- Single column feature cards
- Compact tab buttons (text centered)
- Full-width layout with padding
- Stacked tabs if needed
- Touch-friendly larger cards
```

### Tablet (768px - 1024px)
```
- 2-column feature card grid
- Horizontal scrolling tabs
- Medium padding and spacing
- Readable font sizes
```

### Desktop (> 1024px)
```
- 2-column feature card grid (default)
- All tabs visible in horizontal layout
- Optimal spacing and padding
- Full hover effects enabled
```

## 🎭 Interactive States

### Tab Button States
```
INACTIVE:  bg-slate-700 text-gray-300 border-slate-600
ACTIVE:    bg-gradient-to-r from-cyan-500 to-cyan-600
           text-white shadow-lg shadow-cyan-500/50

HOVER:     (inactive) bg-slate-600
           (active) scale-105
```

### Feature Card States
```
DEFAULT:   Shadow effect, rounded corners
HOVER:     Scale up (scale-105), enhanced shadow
EXPANDED:  Full content visible, additional details shown
```

## 🎨 Typography

```
Header:      text-3xl md:text-4xl font-bold text-white
Label:       "FEATURE MATRIX" text-cyan-400 uppercase text-sm
Title:       text-white font-bold text-lg
Description: text-gray-300 text-sm
Feature:     text-white font-semibold text-sm
Details:     text-gray-300 text-sm leading-relaxed
```

## 📐 Spacing & Layout

```
Section Padding:       py-16
Max Width:             max-w-6xl
Horizontal Padding:    px-4 sm:px-6 lg:px-8
Grid Gap:              gap-4
Tab Gap:               gap-2
Card Padding:          p-5
Header Margin Bottom:  mb-12
Category Info Margin:  mt-8
CTA Section Margin:    mt-8
```

## 🎬 Animations

```
Tab Buttons:    transition-all duration-300
                hover:scale-105
                
Feature Cards:  hover:scale-105 duration-300
                hover:shadow-2xl
                
Chevron Icon:   rotate-180 (when expanded)
                transition-transform duration-300
                
Gradient:       smooth color transitions
                no harsh changes
```

## 🌈 Visual Hierarchy

### Primary (Most Important)
- Feature labels (Stability, Low Noise, etc.)
- Active tab
- Feature summary text

### Secondary (Important)
- Feature icons/emojis
- Category info box
- CTA button

### Tertiary (Supporting)
- Inactive tabs
- Expanded details
- Verification badge

## 💡 Design Principles

1. **Clean**: Minimal clutter, focused content
2. **Scannable**: Quick feature identification
3. **Interactive**: Hover states and animations
4. **Responsive**: Works on all screen sizes
5. **Professional**: Modern gradient styling
6. **Accessible**: Clear color contrast
7. **Consistent**: Unified color and spacing

## 🎯 Feature Card Detail View

When a feature card is clicked/expanded:

```
┌─────────────────────────────────┐
│ 📊 Stability         [Expand ▲]  │
├─────────────────────────────────┤
│ Hz-level linewidth with          │
│ exceptional long-term frequency  │
│ stability                        │
│                                 │
│ ─────────────────────────────    │
│ Additional Details:             │
│ - Frequency locking capability  │
│ - < ±0.1 pm typical stability   │
│ - Environmental compensation    │
│                                 │
│ ✓ Verified & Tested            │
└─────────────────────────────────┘
```

## 🎨 Visual Distinction Examples

### Stability Feature
- Icon: 📊
- Color: Blue (measurement/data)
- Message: Consistency, drift, stability

### Low Noise Feature
- Icon: 🔇
- Color: Green (good/healthy)
- Message: Quiet, clean, pure

### High Coherence Feature
- Icon: 🌊
- Color: Purple (exotic/technical)
- Message: Phase, purity, coherence

### Easy Integration Feature
- Icon: 🔧
- Color: Orange (tools/practical)
- Message: Simple, compatible, ready

## 📊 Content Examples

### Stability Examples
- "Hz-level linewidth with exceptional long-term frequency stability"
- "Exceptional power stability with minimal output drift"
- "Stable spectral output with controlled bandwidth"

### Noise Examples
- "Ultra-low phase and intensity noise for coherent applications"
- "Low RIN with optimized noise floor for precise measurements"
- "Ultra-low speckle and noise characteristics"

### Coherence Examples
- "Exceptional coherence length enabling precision interferometry"
- "Very low coherence length ideal for OCT and interferometry"
- "World-class coherence length enabling advanced experiments"

### Integration Examples
- "Compact fiber-coupled design compatible with Yb-doped amplifiers"
- "Seamless integration with standard telecom fiber infrastructure"
- "Purpose-built for DAS and DTS deployments"

## 🎭 CSS Classes Used

```
Container:       w-full py-16 bg-gradient-to-br
                from-slate-900 via-slate-800 to-slate-900

Content Wrapper: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8

Tab Button:      px-4 py-2 rounded-lg font-medium
                transition-all duration-300

Feature Card:    bg-gradient-to-br p-0.5 rounded-xl
                shadow-lg hover:shadow-2xl
                transition-all duration-300 hover:scale-105

Feature Grid:    grid grid-cols-1 md:grid-cols-2 gap-4

Text Colors:     text-white text-gray-300 text-gray-400
                text-cyan-400 text-gray-200
```

## 🚀 Performance Optimizations

- Minimal re-renders (React hooks optimization)
- CSS transitions instead of JavaScript animations
- Lazy-loaded images/assets
- Optimized Tailwind CSS classes
- No unnecessary DOM elements
- Efficient state management

## ♿ Accessibility Features

- Semantic HTML structure
- Color contrast ratios meet WCAG AA standards
- Keyboard navigation support
- Focus states on interactive elements
- Clear visual hierarchy
- Readable font sizes
- Descriptive button labels

---

**Visual Design Version**: 1.0  
**Last Updated**: December 6, 2025  
**Status**: ✅ Production Ready
