// src/app/api/applications/[slug]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import { applications as staticApplications } from "@/data/applications";

/**
 * Public API to fetch a single application by slug
 * Checks both dynamic (MongoDB) and static (data folder) sources
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolved = await context.params;
    const slug = resolved?.slug;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // First, try to find in dynamic applications (MongoDB)
    const Model: any = Application as unknown as any;
    const dynamicApp = await Model.findOne({ 
      slug: slug, 
      status: "published" 
    } as any);

    if (dynamicApp) {
      return NextResponse.json({
        success: true,
        data: {
          ...dynamicApp.toObject(),
          isStatic: false,
        },
      });
    }

    // If not found in dynamic, check static applications
    const staticApp = staticApplications.find((app) => app.slug === slug);

    if (staticApp) {
      return NextResponse.json({
        success: true,
        data: {
          slug: staticApp.slug,
          title: staticApp.name,
          shortDescription: staticApp.heading,
          hero: {
            title: staticApp.heading,
            image: staticApp.image || "",
          },
          status: "published" as const,
          isStatic: true,
        },
      });
    }

    // Not found in either source
    return NextResponse.json(
      { success: false, message: "Application not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch application" },
      { status: 500 }
    );
  }
}
