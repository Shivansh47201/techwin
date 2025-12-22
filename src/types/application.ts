// src/types/application.ts
export type ApplicationStatus = "draft" | "published";

export interface ApplicationHero {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
}

export interface ApplicationCTA {
  label: string;
  href: string;
}

export interface Application {
  _id?: string;

  slug: string;
  title: string;
  shortDescription?: string;

  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;

  hero: ApplicationHero;

  // White Hero Section (after main hero)
  whiteHeroTitle?: string;
  whiteHeroDescription?: string;

  overview?: string;
  keyFeatures?: string[];
  useCases?: string[];
  benefits?: string[];
  industries?: string[];

  galleryImages?: string[];
  bannerImage?: string;

  cta?: ApplicationCTA;

  status: ApplicationStatus;

  createdAt?: string;
  updatedAt?: string;
}
