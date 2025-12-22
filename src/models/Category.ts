// src/models/Category.ts
import mongoose, { Schema, Document, Model } from "mongoose";

/* --------------------------------
   Helper Sub Schemas
---------------------------------*/

const BreadcrumbSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String },
  },
  { _id: false }
);

const CTASchema = new Schema(
  {
    label: { type: String },
    href: { type: String },
    external: { type: Boolean, default: false },
  },
  { _id: false }
);

const HeroSchema = new Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String },
    image: { type: String, required: true }, // Cloudinary URL
    imageAlt: { type: String },
    breadcrumb: { type: [BreadcrumbSchema], default: [] },
    ctaPrimary: { type: CTASchema },
    ctaSecondary: { type: CTASchema },
  },
  { _id: false }
);

const IntroSchema = new Schema(
  {
    heading: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const SubCategorySchema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    details: { type: String },
  },
  { _id: false }
);

const FeatureMatrixSchema = new Schema(
  {
    categories: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        features: {
          stability: { type: String },
          noise: { type: String },
          coherence: { type: String },
          integration: { type: String },
          bonus5: { type: String },
          bonus6: { type: String },
        },
      },
    ],
  },
  { _id: false }
);

/* --------------------------------
   MAIN CATEGORY INTERFACE
---------------------------------*/
export interface ICategory extends Document {
  slug: string;
  url: string;

  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  
  // Open Graph
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  
  // Schema.org
  schemaType?: string; // e.g., "Product", "Service", "Organization"
  schemaData?: any; // JSON-LD data

  hero: any;
  intro: any;

  keyFeatures: string[];
  subCategories: any[];
  technicalBenefits: string[];
  applications: string[];

  cta: {
    heading?: string;
    primary: any;
    secondary?: any;
  };

  contactPhone?: string;
  notes?: string;

  featureMatrix?: any;

  headingLevels?: {
    hero?: string;
    intro?: string;
    keyFeatures?: string;
    subCategories?: string;
    technicalBenefits?: string;
    applications?: string;
    cta?: string;
  };

  status: "draft" | "published";

  createdAt: Date;
  updatedAt: Date;
}

/* --------------------------------
   CATEGORY SCHEMA
---------------------------------*/
const CategorySchema = new Schema<ICategory>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    url: {
      type: String,
      required: true,
    },

    metaTitle: {
      type: String,
      required: true,
    },

    metaDescription: {
      type: String,
      required: true,
    },

    canonicalUrl: {
      type: String,
    },

    // Open Graph
    ogType: {
      type: String,
      default: "website",
    },
    ogImage: {
      type: String,
    },
    ogImageAlt: {
      type: String,
    },

    // Schema.org
    schemaType: {
      type: String,
      default: "Product",
    },
    schemaData: {
      type: Schema.Types.Mixed,
    },

    hero: {
      type: HeroSchema,
      required: true,
    },

    intro: {
      type: IntroSchema,
      required: true,
    },

    keyFeatures: {
      type: [String],
      default: [],
    },

    subCategories: {
      type: Schema.Types.Mixed,
      default: [],
    },

    technicalBenefits: {
      type: [String],
      default: [],
    },

    applications: {
      type: [String],
      default: [],
    },

    cta: {
      heading: { type: String },
      primary: { type: CTASchema, required: true },
      secondary: { type: CTASchema },
    },

    contactPhone: { type: String },
    notes: { type: String },

    featureMatrix: {
      type: Schema.Types.Mixed,
    },

    headingLevels: {
      hero: { type: String, default: "h1" },
      intro: { type: String, default: "h2" },
      keyFeatures: { type: String, default: "h2" },
      subCategories: { type: String, default: "h2" },
      technicalBenefits: { type: String, default: "h2" },
      applications: { type: String, default: "h2" },
      cta: { type: String, default: "h2" },
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* --------------------------------
   SAFE EXPORT
---------------------------------*/
const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
