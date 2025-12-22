// src/models/HomePage.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IHomePage extends Document {
  heroSlides: Array<{
    id: string;
    image: string;
    headline: string;
    sub: string;
    ctaLabel?: string;
    ctaLink?: string;
  }>;
  companyProfile: {
    image: string;
    headline: string;
    text: string;
    highlights: Array<{
      label: string;
      value: string;
    }>;
  };
  technicalHighlights: {
    heading: string;
    subheading: string;
    specs: Array<{
      id: string;
      title: string;
      desc: string;
      icon: string;
    }>;
  };
  trustStrip: {
    heading: string;
    bullets: Array<string>;
    counters: Array<{
      id: string;
      label: string;
      value: string;
    }>;
    logos: Array<{
      id: string;
      src: string;
      alt: string;
    }>;
    ctaLabel: string;
  };
  seo: {
    title: string;
    description: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
  headingLevels: {
    hero: string;
    companyProfile: string;
    productFamilies: string;
    applications: string;
    trustStrip: string;
    techHighlights: string;
  };
  updatedAt: Date;
  createdAt: Date;
}

const HomePageSchema = new Schema<IHomePage>(
  {
    heroSlides: [
      {
        id: { type: String, required: true },
        image: { type: String, required: true },
        headline: { type: String, required: true },
        sub: { type: String, required: true },
        ctaLabel: { type: String },
        ctaLink: { type: String },
      },
    ],
    companyProfile: {
      image: { type: String, required: true },
      headline: { type: String, required: true },
      text: { type: String, required: true },
      highlights: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },
    technicalHighlights: {
      heading: { type: String, required: true },
      subheading: { type: String, required: true },
      specs: [
        {
          id: { type: String, required: true },
          title: { type: String, required: true },
          desc: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
    },
    trustStrip: {
      heading: { type: String, required: true },
      bullets: [{ type: String }],
      counters: [
        {
          id: { type: String, required: true },
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
      logos: [
        {
          id: { type: String, required: true },
          src: { type: String, required: true },
          alt: { type: String, required: true },
        },
      ],
      ctaLabel: { type: String, required: true },
    },
    seo: {
      title: { type: String, required: false },
      description: { type: String, required: false },
      canonical: { type: String, required: false },
      ogTitle: { type: String, required: false },
      ogDescription: { type: String, required: false },
      ogImage: { type: String, required: false },
      twitterCard: { type: String, required: false },
      twitterTitle: { type: String, required: false },
      twitterDescription: { type: String, required: false },
      twitterImage: { type: String, required: false },
    },
    headingLevels: {
      hero: { type: String, default: 'h1' },
      companyProfile: { type: String, default: 'h2' },
      productFamilies: { type: String, default: 'h2' },
      applications: { type: String, default: 'h2' },
      trustStrip: { type: String, default: 'h3' },
      techHighlights: { type: String, default: 'h2' },
    },
  },
  { timestamps: true }
);

// Delete the existing model if it exists (for development hot reload)
if (mongoose.models.HomePage) {
  delete mongoose.models.HomePage;
}

export default mongoose.model<IHomePage>("HomePage", HomePageSchema);
