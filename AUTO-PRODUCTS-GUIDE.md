# Auto-Loading Products from products.json

## Overview
Products ab automatically `products.json` se load honge based on category slug. Koi manual update ki zaroorat nahi hai!
## Components with Auto-Load

### 1. SubCategoryGrid (Category Pages)
Full product grid with detailed cards

### 2. ProductFamilies (Home & Product Pages)  
Compact product family showcase

---
## How It Works

### 1. Products.json Structure
```json
{
  "products": [
    {
      "categorySlug": "single-frequency",
      "categoryTitle": "Single-Frequency Fiber Lasers",
      "categoryImage": "/category/Single-Frequency-Fiber-Lasers.jpg",
      "products": [
        {
          "slug": "1um-single",
          "title": "1.0 µm Single-Frequency Fiber Laser"
        },
        {
          "slug": "1-5um-single",
          "title": "1.5 µm Single-Frequency Fiber Laser"
        }
      ]
    }
  ]
}
```

### 2. Auto-Loading Logic

**SubCategoryGrid Component** ab 2 modes mein kaam karta hai:

#### Mode 1: Manual (Purana tarika)
```tsx
<SubCategoryGrid 
  items={manualItems} 
  categorySlug="single-frequency" 
/>
```

#### Mode 2: Auto-Load (Naya tarika)
```tsx
<SubCategoryGrid 
  categorySlug="single-frequency"
  autoLoad={true}
/>
```

### 3. Automatic Flow

1. **Page Load**: Category page check karta hai agar `subCategories` empty hai
2. **Auto-Load Trigger**: Agar empty hai to `autoLoad={true}` set karta hai
3. **API Call**: Component automatically API call karta hai `/api/products/category/single-frequency`
4. **Data Fetch**: API `products.json` read karta hai aur matching category ke products return karta hai
5. **Display**: Products automatically grid mein show ho jaate hain

## Usage Example

### 1. SubCategoryGrid - Category Page (Full Grid)

```tsx
// src/app/products/[category]/page.tsx
<SubCategoryGrid 
  categorySlug="single-frequency"
  autoLoad={true}
/>
```

### 2. ProductFamilies - Homepage (Compact Cards)

```tsx
// src/app/page.tsx
<ProductFamilies 
  category="single-frequency"
  autoLoad={true}
  heading="Featured Products"
  showSeeAllButton={true}
/>
```

### 3. ProductFamilies - Product Detail Page (Related Products)

```tsx
// Show other products from same category
<ProductFamilies 
  category={currentCategory}
  autoLoad={true}
  heading="More in this Category"
  showSeeAllButton={false}
/>
```

---

## In Category Page (src/app/products/[category]/page.tsx)

```tsx
export default async function CategoryPage({ params }: Props) {
  const slug = (await params).category;
  
  // ... fetch category data ...
  
  return (
    <main>
      {/* Other sections */}
      
      {/* Products Grid - Auto-loads if no manual items */}
      <SubCategoryGrid 
        items={subCategories} 
        categorySlug={slug} 
        autoLoad={!subCategories || subCategories.length === 0}
      />
      
      {/* Other sections */}
    </main>
  );
}
```

## Adding New Products

### Step 1: Add to products.json
```json
{
  "categorySlug": "single-frequency",
  "products": [
    {
      "slug": "new-laser",
      "title": "New Awesome Laser"
    }
  ]
}
```

### Step 2: That's it! 
Product automatically show hoga category page pe. No code changes needed!

## Product Details Enhancement

### Optional: Add product details in src/data/products/
Agar aap detailed information add karna chahte ho:

```typescript
// src/data/products/single-frequency/new-laser.ts
expComponents Comparison

| Feature | SubCategoryGrid | ProductFamilies |
|---------|----------------|-----------------|
| **Purpose** | Full category page grid | Compact showcase |
| **Card Size** | Large with details | Small & compact |
| **Layout** | 3 columns (desktop) | 4 columns (desktop) |
| **Best For** | Category pages | Homepage, product pages |
| **Shows** | Detailed product info | Quick product overview |
| **Auto-Load** | ✅ Yes | ✅ Yes |

---

## ort const newLaser = {
  slug: "new-laser",
  name: "New Awesome Laser",
  overview: {
    shortDescription: "High-precision laser for advanced applications",
    detailedDescription: "Full technical description..."
  },
  heroImage: {
    src: "/products/single-frequency/new-laser.jpg",
    alt: "New Awesome Laser — Techwin"
  },
  downloads: [
    {
      label: "Product Datasheet",
      href: "/downloads/new-laser-datasheet.pdf"
    }
  ]
};
```

## Features

### Auto-Generated Details
System automatically:
- ✅ Extracts wavelength tags (1.5 µm, 2.0 µm)
- ✅ Detects special tags (PM, CW, High-Power)
- ✅ Generates fallback descriptions
- ✅ Creates image paths
- ✅ Links to product detail pages

### Loading States
Component shows:
- Loading spinner during fetch
- Empty state if no products found
- Error handling for failed requests

## API Endpoint

**GET** `/api/products/category/[slug]`

**Response:**
```json
{
  "success": true,
  "categorySlug": "single-frequency",
  "products": [
    {
      "id": "1um-single",
      "name": "1.0 µm Single-Frequency Fiber Laser",
      "shortDescription": "High-precision laser...",
      "image": "/products/single-frequency/1um-single.jpg",
      "imageAlt": "1.0 µm Single-Frequency Fiber Laser — Techwin",
      "tag": "1.0 µm"
    }
  ],
  "count": 1
}
```

## Benefits

1. **No Manual Updates**: Add product to products.json, done!
2. **Two Components**: SubCategoryGrid (detailed) + ProductFamilies (compact)
3. **Consistent Data**: Single source of truth (products.json)
4. **Automatic Tags**: Wavelength and feature tags auto-detected
5. **Fallback Support**: Works with both manual and auto modes
6. **Future-Proof**: New categories automatically work
7. **Flexible Usage**: Homepage, category pages, product detail pages

## Real-World Examples

### Homepage (Featured Products)
```tsx
// Show compact product cards from single-frequency category
<ProductFamilies 
  category="single-frequency"
  autoLoad={true}
  heading="Featured Laser Systems"
  showSeeAllButton={true}
/>
```

### Category Page (Full Grid)
```tsx
// Show all products in this category with detailed cards
<SubCategoryGrid 
  categorySlug="seed-lasers"
  autoLoad={true}
/>
```

### Product Detail Page (Related Products)
```tsx
// Show other products from same category
<ProductFamilies 
  category="high-power"
  autoLoad={true}
  heading="More High-Power Lasers"
  showSeeAllButton={false}
/>
```

---

## Testing

Visit any category page:
- `/products/single-frequency` → Shows all single-frequency products
- `/products/seed-lasers` → Shows all seed lasers
- `/products/high-power` → Shows all high-power lasers

Products automatically load from products.json! 🚀
