// src/models/Application.ts
import mongoose, { Schema, model, models } from "mongoose";

const ApplicationSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    title: { type: String, required: true },
    shortDescription: String,

    metaTitle: String,
    metaDescription: String,
    canonicalUrl: String,

    // Open Graph
    ogType: { type: String, default: "article" },
    ogImage: String,
    ogImageAlt: String,

    // Schema.org
    schemaType: { type: String, default: "Service" },
    schemaData: Schema.Types.Mixed,

    hero: {
      title: { type: String, required: true },
      subtitle: String,
      image: { type: String, required: true },
      imageAlt: String,
    },

    // White Hero Section
    whiteHeroTitle: String,
    whiteHeroDescription: String,

    overview: String,

    keyFeatures: [String],
    useCases: [String],
    benefits: [String],
    industries: [String],

    galleryImages: [String],
    bannerImage: String,

    cta: {
      label: String,
      href: String,
    },

    headingLevels: {
      hero: { type: String, default: "h1" },
      whiteHero: { type: String, default: "h2" },
      overview: { type: String, default: "h2" },
      features: { type: String, default: "h2" },
      useCases: { type: String, default: "h2" },
      benefits: { type: String, default: "h2" },
      cta: { type: String, default: "h2" },
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
  },
  { timestamps: true }
);

export default models.Application ||
  model("Application", ApplicationSchema);
