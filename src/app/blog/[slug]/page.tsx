// app/blog/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db"; // named import
import Post from "@/models/Post";
import PostView from "@/components/blog/PostView"; // make sure this file exists (see below)

type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata | {}> {
  const slug = params.slug;
  try {
    await connectDB();
    const post = await Post.findOne({ slug, published: true }).lean().exec();
    if (!post) return {};
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      openGraph: {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt || undefined,
        images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      },
    };
  } catch (err) {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = params;

  await connectDB();

  const post = await Post.findOne({ slug, published: true }).lean().exec();

  if (!post) {
    notFound();
  }

  return <PostView post={post} />;
}
