// src/models/Product.ts
import mongoose, { Schema, Document, Model } from "mongoose";

/* -----------------------------
   Helper Sub-Schemas
--------------------------------*/

// Cloudinary Image
const CloudinaryImageSchema = new Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    alt: { type: String },
  },
  { _id: false }
);

// Simple Image (for frontend compatibility)
const ProductImageSchema = new Schema(
  {
    src: { type: String, required: true }, // Cloudinary URL
    alt: { type: String },
  },
  { _id: false }
);

// Specs Row
const SpecsRowSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

// Specs Block
const SpecsBlockSchema = new Schema(
  {
    label: { type: String },
    rows: { type: [SpecsRowSchema], default: [] },
  },
  { _id: false }
);

// Product Section (MOST IMPORTANT – very flexible)
const ProductSectionSchema = new Schema(
  {
    type: { type: String, required: true }, // text | features | specs | comparison | etc
    heading: { type: String },
    content: { type: Schema.Types.Mixed },
    bullets: { type: [String], default: [] },

    image: ProductImageSchema,

    // Specs variations (legacy + new)
    rows: { type: [SpecsRowSchema], default: [] },
    blocks: { type: [SpecsBlockSchema], default: [] },
    specGroups: { type: [SpecsBlockSchema], default: [] },
    groups: { type: [SpecsBlockSchema], default: [] },

    // Comparison table
    comparisonTable: {
      headers: { type: [String], default: [] },
      rows: { type: Schema.Types.Mixed, default: [] },
    },

    // Optional assets
    tableCsvUrl: { type: String },
    graphImageURL: { type: String },
  },
  { _id: false }
);

// Related Products
const RelatedProductSchema = new Schema(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    shortDescription: { type: String },
    image: ProductImageSchema,
    href: { type: String },
  },
  { _id: false }
);

/* -----------------------------
   MAIN PRODUCT INTERFACE
--------------------------------*/
export interface IProduct extends Document {
  slug: string;
  category: string;

  status: "draft" | "published";
  featured?: boolean;

  meta: {
    title: string;
    description: string;
    keywords?: string;
  };

  title: string;
  shortDescription: string;

  heroImage: {
    src: string;
    alt?: string;
  };

  galleryImages: {
    src: string;
    alt?: string;
  }[];

  previewImageSrc?: string;
  datasheetUrl?: string;
  datasheetImageSrc?: string;

  features?: string[];
  applicationAreas?: string[];

  sections: any[];

  relatedProducts?: any[];

  // Optional product-level assets
  tableCsvUrl?: string;
  graphImageURL?: string;
  tableImageURL?: string;

  // Optional canonical link (absolute or site-relative)
  canonical?: string;

  // Open Graph
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;

  // Schema.org
  schemaType?: string;
  schemaData?: any;

  headingLevels?: {
    hero?: string;
    features?: string;
    specs?: string;
    applications?: string;
    related?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

/* -----------------------------
   PRODUCT SCHEMA
--------------------------------*/
const ProductSchema = new Schema<IProduct>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      index: true, // important for /products/[category]
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    meta: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      keywords: { type: String },
    },

    title: { type: String, required: true },
    shortDescription: { type: String, required: true },

    heroImage: {
      src: { type: String, required: true },
      alt: { type: String },
    },

    galleryImages: {
      type: [ProductImageSchema],
      default: [],
    },

    previewImageSrc: { type: String },
    datasheetUrl: { type: String },
    datasheetImageSrc: { type: String },

    features: { type: [String], default: [] },
    applicationAreas: { type: [String], default: [] },

    sections: {
      type: Schema.Types.Mixed,
      default: [],
    },

    relatedProducts: {
      type: Schema.Types.Mixed,
      default: [],
    },

    tableCsvUrl: { type: String },
    graphImageURL: { type: String },
    tableImageURL: { type: String },

    // Optional canonical URL (absolute or site-relative)
    canonical: { type: String },

    // Open Graph
    ogType: { type: String, default: "product" },
    ogImage: { type: String },
    ogImageAlt: { type: String },

    // Schema.org
    schemaType: { type: String, default: "Product" },
    schemaData: { type: Schema.Types.Mixed },

    headingLevels: {
      hero: { type: String, default: "h1" },
      features: { type: String, default: "h2" },
      specs: { type: String, default: "h2" },
      applications: { type: String, default: "h2" },
      related: { type: String, default: "h2" },
    },
  },
  {
    timestamps: true,
  }
);

/* -----------------------------
   SAFE MODEL EXPORT
--------------------------------*/
const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
