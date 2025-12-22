// src/models/AboutPage.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IAboutPage extends Document {
  hero: {
    title: string;
    subtitle: string;
    description?: string;
    backgroundImage: string;
    backgroundVideo?: string;
  };
  intro: {
    title: string;
    subtitle: string;
    leadText: string;
    image: string;
    sections: Array<{
      heading: string;
      content: string;
    }>;
    quote: string;
  };
  whoWeAre: {
    image: string;
    imageAlt: string;
    content: string;
  };
  expertise: {
    title: string;
    description: Array<string>;
    highlights: Array<string>;
  };
  productLines: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  commitmentSections: Array<{
    id: string;
    title: string;
    body: string;
    image: string;
  }>;
  whyChoose: {
    title: string;
    description: string;
    points: Array<{
      title: string;
      desc: string;
      icon: string;
    }>;
  };
  finalStatement: {
    title: string;
    content: string;
  };
  sustainabilityTabs: Array<{
    id: number;
    label: string;
    heading: string;
    body: string;
    rightCardTitle: string;
    rightCardItems: Array<{
      title: string;
      description: string;
    }>;
  }>;
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
    aboutHero: string;
    techwinIntro: string;
    whoWeAre: string;
    expertiseProducts: string;
    commitment: string;
    whyChoose: string;
    sustainability: string;
    finalStatement: string;
  };
  updatedAt: Date;
  createdAt: Date;
}

const AboutPageSchema = new Schema<IAboutPage>(
  {
    hero: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      description: { type: String, required: false },
      backgroundImage: { type: String, required: true },
      backgroundVideo: { type: String },
    },
    intro: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      leadText: { type: String, required: true },
      image: { type: String, required: true },
      sections: [
        {
          heading: { type: String, required: true },
          content: { type: String, required: true },
        },
      ],
      quote: { type: String, required: true },
    },
    whoWeAre: {
      image: { type: String, required: true },
      imageAlt: { type: String, required: true },
      content: { type: String, required: true },
    },
    expertise: {
      title: { type: String, required: true },
      description: [{ type: String }],
      highlights: [{ type: String }],
    },
    productLines: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
    commitmentSections: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        body: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    whyChoose: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      points: [
        {
          title: { type: String, required: true },
          desc: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
    },
    finalStatement: {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
    sustainabilityTabs: [
      {
        id: { type: Number, required: true },
        label: { type: String, required: true },
        heading: { type: String, required: true },
        body: { type: String, required: true },
        rightCardTitle: { type: String, required: true },
        rightCardItems: [
          {
            title: { type: String, required: true },
            description: { type: String, required: true },
          },
        ],
      },
    ],
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
      aboutHero: { type: String, default: 'h1' },
      techwinIntro: { type: String, default: 'h2' },
      whoWeAre: { type: String, default: 'h2' },
      expertiseProducts: { type: String, default: 'h2' },
      commitment: { type: String, default: 'h2' },
      whyChoose: { type: String, default: 'h2' },
      sustainability: { type: String, default: 'h2' },
      finalStatement: { type: String, default: 'h3' },
    },
  },
  { timestamps: true }
);

// Delete the existing model if it exists (for development hot reload)
if (mongoose.models.AboutPage) {
  delete mongoose.models.AboutPage;
}

export default mongoose.model<IAboutPage>("AboutPage", AboutPageSchema);
