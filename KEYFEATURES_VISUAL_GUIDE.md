# KeyFeatures Component - Visual Guide

## 📺 What Users See on Category Pages

### Full Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                    Category Hero Section                        │
│              (Product Category Banner & Title)                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         FEATURE MATRIX                                          │
│                                                                 │
│  Engineered features that matter in the lab                    │
│  Compare the most critical performance aspects of this         │
│  laser family – stability, noise, coherence and                │
│  integration – in a clean, tab-based view.                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LEFT PANEL              │  RIGHT PANEL                        │
│                          │                                      │
│ ┌─────────────────────┐ │ ┌─────────────────────────────────┐  │
│ │ 5 engineered        │ │ │ 1.0 µm Single-Frequency        │  │
│ │ capabilities        │ │ │                                 │  │
│ │ Select to view      │ │ │ Performance metrics and         │  │
│ │                     │ │ │ technical specifications        │  │
│ │ ┌─────────────────┐ │ │ │                                 │  │
│ │ │ [1] 1.0 µm SF   │ │ │ │ [📊] [🔇] [🌊] [🔧] [⭐] [✨]  │  │
│ │ │ ← ACTIVE        │ │ │ │   FEATURE SELECTOR              │  │
│ │ └─────────────────┘ │ │ │                                 │  │
│ │                     │ │ │ ┌─────────────────────────────┐  │  │
│ │ ┌─────────────────┐ │ │ │ ● FOCUSED CAPABILITY #1     │  │  │
│ │ │ [2] 1.5 µm SF   │ │ │ │                             │  │  │
│ │ │                 │ │ │ │ 📊 Stability                │  │  │
│ │ └─────────────────┘ │ │ │                             │  │  │
│ │                     │ │ │ Hz-level linewidth with      │  │  │
│ │ ┌─────────────────┐ │ │ │ exceptional long-term        │  │  │
│ │ │ [3] 2.0 µm SF   │ │ │ │ frequency stability          │  │  │
│ │ │                 │ │ │ │                             │  │  │
│ │ └─────────────────┘ │ │ │ ┌─────────────────────────┐ │  │  │
│ │                     │ │ │ │ All Performance Metrics  │ │  │  │
│ │ ┌─────────────────┐ │ │ │ │                         │ │  │  │
│ │ │ [4] Ultra-      │ │ │ │ │ 📊 Stability: Hz-level  │ │  │  │
│ │ │     Narrow      │ │ │ │ │ 🔇 Noise: Ultra-low     │ │  │  │
│ │ │                 │ │ │ │ │ 🌊 Coherence: Excep...  │ │  │  │
│ │ └─────────────────┘ │ │ │ │ 🔧 Integration: Comp...  │ │  │  │
│ │                     │ │ │ │ ⭐ Bonus 5: Ideal for    │ │  │  │
│ │ ┌─────────────────┐ │ │ │ │ ✨ Bonus 6: Environ...   │ │  │  │
│ │ │ [5] Narrow      │ │ │ │ └─────────────────────────┘ │  │  │
│ │ │                 │ │ │ └─────────────────────────────┘  │  │
│ │ └─────────────────┘ │ │ │ ✓ Lab-ready specification     │  │
│ │                     │ │ │                                 │  │
│ └─────────────────────┘ │ └─────────────────────────────────┘  │
│                         │                                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  More Category Sections Below                   │
│              (Sub-categories, Specs, Applications, etc)         │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Interactive States

### 1. Initial View
```
Tab Panel shows 5 product types numbered 1-5
First product (1) is selected/highlighted
Right panel shows that product's features
Feature buttons are visible but not clicked
```

### 2. User Clicks Different Tab
```
Tab #3 gets highlighted
Right panel smoothly transitions to show Tab #3 data
New product name appears
Feature buttons reset (Stability selected by default)
```

### 3. User Clicks Feature Button
```
Clicked button gets highlighted with color gradient
Right panel content updates immediately
Shows detailed description of clicked feature
Grid view still visible showing all metrics
```

## 💫 Mobile View (< 768px)

```
┌────────────────────────────┐
│    Feature Matrix Section  │
├────────────────────────────┤
│                            │
│ FEATURE MATRIX             │
│ Engineered features that   │
│ matter in the lab...       │
│                            │
│ 5 capabilities             │
│ Select to view details     │
│                            │
│ [1] 1.0µm SF ←             │ ← Scrollable horizontally
│ [2] 1.5µm SF               │
│ [3] 2.0µm SF               │
│ [4] Ultra-Narrow           │
│ [5] Narrow                 │
│                            │
├────────────────────────────┤
│    Content Panel Below     │
│                            │
│ ● CAPABILITY #1            │
│ 1.0 µm Single-Frequency    │
│                            │
│ [📊] [🔇] [🌊] [🔧] [⭐]  │ ← Feature buttons
│                            │
│ ┌──────────────────────┐   │
│ │ 📊 Stability         │   │
│ │                      │   │
│ │ Hz-level linewidth   │   │
│ │ with exceptional...  │   │
│ └──────────────────────┘   │
│                            │
│ All Performance Metrics:   │
│ 📊 Stability: Hz-level...  │
│ 🔇 Noise: Ultra-low...     │
│ 🌊 Coherence: Excep...     │
│ 🔧 Integration: Comp...    │
│ ⭐ Bonus 5: Ideal for...   │
│ ✨ Bonus 6: Environ...     │
│                            │
└────────────────────────────┘
```

## 🖥️ Tablet View (768px - 1024px)

```
┌──────────────────────────────────────────────────────┐
│                   FEATURE MATRIX                     │
│   Engineered features that matter in the lab         │
│   Compare the most critical performance aspects...   │
├──────────────────────────────────────────────────────┤
│                                                      │
│  TABS (4-column grid)                               │
│  ┌────────────┬────────────┬────────────┬─────────┐ │
│  │ [1] 1.0µm  │ [2] 1.5µm  │ [3] 2.0µm  │ [4] ...│ │
│  │ SF ←       │ SF         │ SF         │        │ │
│  └────────────┴────────────┴────────────┴─────────┘ │
│                                                      │
│  CONTENT PANEL                                       │
│  ┌──────────────────────────────────────────────┐   │
│  │ 1.0 µm Single-Frequency                      │   │
│  │                                              │   │
│  │ [📊] [🔇] [🌊] [🔧] [⭐] [✨]               │   │
│  │   ↑ Selected Feature                         │   │
│  │                                              │   │
│  │ ┌──────────────────────────────────────────┐ │   │
│  │ │ 📊 Stability                             │ │   │
│  │ │ Hz-level linewidth with exceptional      │ │   │
│  │ │ long-term frequency stability            │ │   │
│  │ └──────────────────────────────────────────┘ │   │
│  │                                              │   │
│  │ All Metrics (2-column grid):                 │   │
│  │ ┌──────────────────┬──────────────────┐     │   │
│  │ │ 📊 Stability     │ 🔇 Noise         │     │   │
│  │ │ Hz-level...      │ Ultra-low...     │     │   │
│  │ ├──────────────────┼──────────────────┤     │   │
│  │ │ 🌊 Coherence     │ 🔧 Integration   │     │   │
│  │ │ Exceptional...   │ Compact...       │     │   │
│  │ ├──────────────────┼──────────────────┤     │   │
│  │ │ ⭐ Bonus 5       │ ✨ Bonus 6       │     │   │
│  │ │ Ideal for...     │ Environ...       │     │   │
│  │ └──────────────────┴──────────────────┘     │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## 🎨 Color Legend

```
📊 Stability Feature      → BLUE GRADIENT      (from-blue-400 to-blue-600)
🔇 Low Noise Feature      → GREEN GRADIENT     (from-green-400 to-green-600)
🌊 High Coherence Feature → PURPLE GRADIENT    (from-purple-400 to-purple-600)
🔧 Easy Integration       → ORANGE GRADIENT    (from-orange-400 to-orange-600)
⭐ Bonus Feature 5        → PINK GRADIENT      (from-pink-400 to-pink-600)
✨ Bonus Feature 6        → INDIGO GRADIENT    (from-indigo-400 to-indigo-600)
```

## 🔄 User Flow Example

### Scenario: Customer Comparing Single-Frequency Lasers

1. **Lands on Category Page**
   ```
   Sees: "Engineered features that matter in the lab"
   5 tabs showing: 1.0µm, 1.5µm, 2.0µm, Ultra-Narrow, Narrow
   Tab #1 (1.0µm) selected by default
   Feature buttons visible: Stability, Noise, Coherence, Integration, +2 bonus
   ```

2. **Clicks "Noise" Button**
   ```
   Button highlights with GREEN gradient
   Content panel updates to show:
   "Low phase and intensity noise for coherent applications"
   
   All metrics grid still shows all 6 features
   ```

3. **Clicks Tab #2 (1.5µm)**
   ```
   Tab #2 gets highlighted
   Right panel smoothly transitions
   Shows: "1.5 µm Single-Frequency"
   Feature buttons reset to "Stability" selected
   All content updates with 1.5µm specifications
   ```

4. **Clicks "Integration" Button**
   ```
   Button highlights with ORANGE gradient
   Shows: "Seamless integration with standard telecom infrastructure"
   Customer sees all 6 features in grid below
   ```

## 📊 Content Examples by Category

### Single-Frequency Fiber Laser (1.0 µm)
```
Tab Name: 1.0 µm Single-Frequency

STABILITY
└─ Hz-level linewidth with exceptional long-term frequency stability

NOISE
└─ Ultra-low phase and intensity noise for coherent applications

COHERENCE
└─ Exceptional coherence length enabling precision interferometry

INTEGRATION
└─ Compact fiber-coupled design compatible with Yb-doped amplifiers

BONUS 5
└─ Ideal for seeding high-power amplifier systems

BONUS 6
└─ Environmental compensation for field and lab deployments
```

### High-Power Fiber Laser (1.5 µm)
```
Tab Name: High-Power 1.5 µm CW

STABILITY
└─ Telecommunications-grade power stability at 1550 nm

NOISE
└─ Ultra-low noise for coherent communication systems

COHERENCE
└─ High spectral purity for long-distance coherent detection

INTEGRATION
└─ Seamless integration with telecom ecosystem and infrastructure

BONUS 5
└─ Optimized for distributed sensing and coherent LiDAR

BONUS 6
└─ Advanced thermal management for continuous kilowatt operation
```

## ✨ Animation Details

### Tab Switch Animation
```
When user clicks a new tab:
1. Tab button highlights instantly
2. Content panel fades out (opacity: 0)
3. Content updates
4. Content fades in (opacity: 1)
Duration: 350ms
Easing: [0.22, 0.9, 0.3, 1]
```

### Feature Button Click
```
When user clicks a feature button:
1. Button background changes to gradient color
2. Content in panel updates smoothly
3. All metrics grid updates
No full page transition - just content update
```

## 🎯 Key Interaction Zones

```
┌─────────────────────────────────────────┐
│  TAB BUTTONS (Clickable)                │
│  ├─ Product Type 1 ← Click to select    │
│  ├─ Product Type 2                      │
│  ├─ Product Type 3                      │
│  └─ ...                                 │
│                                         │
│  FEATURE BUTTONS (Clickable)            │
│  ├─ 📊 Stability ← Click for details    │
│  ├─ 🔇 Noise                            │
│  ├─ 🌊 Coherence                        │
│  ├─ 🔧 Integration                      │
│  ├─ ⭐ Bonus 5                          │
│  └─ ✨ Bonus 6                          │
│                                         │
│  CONTENT DISPLAY (Read-only)            │
│  ├─ Feature description                 │
│  ├─ All metrics grid                    │
│  └─ Lab-ready badge                     │
└─────────────────────────────────────────┘
```

## 📱 Responsive Transition Points

```
Mobile (< 768px)
├─ Single column tabs (horizontal scroll)
├─ Full-width content panel below
└─ Stacked feature buttons

Tablet (768px - 1024px)
├─ 4-column tab grid
├─ 4-column content grid
└─ Wrapped feature buttons (2 rows)

Desktop (> 1024px)
├─ All tabs visible in horizontal layout
├─ Full-width content panel
├─ Hover effects enabled
└─ Optimal spacing throughout
```

---

**Visual Guide Version**: 1.0  
**Last Updated**: December 7, 2025  
**Status**: ✅ Production Ready
