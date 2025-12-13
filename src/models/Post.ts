// src/models/Post.ts
// Mongoose model for Blog Posts with TypeScript typings and indexes.

import mongoose, { Schema, Document, Model } from "mongoose";

// TS interface describing a Post document
export interface IPost extends Document {
  // Basic Content
  slug: string;
  title: string;
  excerpt?: string;
  content: string; 
  tags: string[];

  coverImage?: string;
  coverImageAlt?: string; // Alt text for featured image
  images?: Array<{
    url: string;
    alt?: string;
    title?: string;
    caption?: string;
    uploadedAt?: Date;
  }>;
  
  // SEO & Meta - Complete
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  metaImage?: string; // Meta OG image (can differ from cover)
  metaAuthor?: string;
  canonical?: string;
  
  // Content Structure & Headings (H1 to H6)
  h1?: string;
  h2?: string[];
  h3?: string[];
  h4?: string[];
  h5?: string[];
  h6?: string[];
  headings?: Array<{
    level: number; // 1-6
    text: string;
    id?: string; // auto-generated anchor ID
  }>;
  
  // Links Management
  author?: string;
  internalLinks?: string[]; // Array of linked post slugs
  externalLinks?: Array<{
    url: string;
    title?: string;
    anchor?: string;
    nofollow?: boolean;
  }>;
  
  // Publishing & Status
  published: boolean;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  
  // Analytics & Metadata
  readingTime?: number; // in minutes
  wordCount?: number;
  viewCount?: number;
  lastViewedAt?: Date;
}

// Mongoose Schema
const PostSchema = new Schema<IPost>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      match: /^[a-z0-9\-]+$/,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    excerpt: {
      type: String,
      maxlength: 500,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    
    // Images
    coverImage: {
      type: String,
      trim: true,
    },
    coverImageAlt: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    images: {
      type: [
        {
          url: String,
          alt: String,
          title: String,
          caption: String,
          uploadedAt: Date,
        },
      ],
      default: [],
    },
    
    // SEO & Meta - Complete
    seoTitle: {
      type: String,
      maxlength: 60,
    },
    seoDescription: {
      type: String,
      maxlength: 160,
    },
    seoKeywords: {
      type: [String],
      default: [],
      maxlength: 10,
    },
    metaImage: {
      type: String,
      trim: true,
    },
    metaAuthor: {
      type: String,
      trim: true,
    },
    canonical: {
      type: String,
      trim: true,
    },
    
    // Content Structure & Headings (H1 to H6)
    h1: {
      type: String,
    },
    h2: {
      type: [String],
      default: [],
    },
    h3: {
      type: [String],
      default: [],
    },
    h4: {
      type: [String],
      default: [],
    },
    h5: {
      type: [String],
      default: [],
    },
    h6: {
      type: [String],
      default: [],
    },
    headings: {
      type: [
        {
          level: { type: Number, min: 1, max: 6 },
          text: String,
          id: String,
        },
      ],
      default: [],
    },
    
    // Links Management
    author: {
      type: String,
      trim: true,
    },
    internalLinks: {
      type: [String],
      default: [],
    },
    externalLinks: {
      type: [
        {
          url: String,
          title: String,
          anchor: String,
          nofollow: Boolean,
        },
      ],
      default: [],
    },
    
    // Publishing & Status
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
      index: true,
    },
    
    // Analytics & Metadata
    readingTime: {
      type: Number,
    },
    wordCount: {
      type: Number,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    lastViewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Additional compound index for efficient blog filtering
PostSchema.index({ published: 1, publishedAt: -1 });

// Avoid OverwriteModelError in dev (Next.js hot reload)
const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;

/*
Usage in API Routes:

import { connectToDatabase } from "@/lib/db";
import Post from "@/models/Post";

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();
  const newPost = await Post.create(body);

  return Response.json(newPost);
}

*/
