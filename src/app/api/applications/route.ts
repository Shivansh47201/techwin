// src/app/api/applications/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import { applications as staticApplications } from "@/data/applications";

/**
 * Public API to fetch ALL applications (both static and dynamic)
 * Only returns published dynamic applications
 */
export async function GET() {
  try {
    await connectDB();
    
    // Fetch published dynamic applications from MongoDB
    const Model: any = Application as unknown as any;
    const dynamicApps = await Model.find({ status: "published" } as any).sort({ createdAt: -1 });
    
    // Convert static applications to the same format
    const staticAppsFormatted = staticApplications.map((app) => ({
      slug: app.slug,
      title: app.name,
      shortDescription: app.heading,
      hero: {
        title: app.heading,
        image: app.image || "",
      },
      status: "published" as const,
      isStatic: true, // Flag to identify static applications
    }));
    
    // Combine both - dynamic apps first, then static
    const allApps = [
      ...dynamicApps.map((app: any) => ({
        ...app.toObject(),
        isStatic: false,
      })),
      ...staticAppsFormatted,
    ];
    
    return NextResponse.json({ success: true, data: allApps });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
