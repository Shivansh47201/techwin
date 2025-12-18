import { NextResponse } from 'next/server';
import { readSiteSettings, writeSiteSettings } from '@/lib/siteSettings';

export async function GET() {
  try {
    const settings = await readSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    console.error('GET /api/admin/site-settings', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const current = await readSiteSettings();
    const updated = { ...current, ...body };
    await writeSiteSettings(updated);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    console.error('PUT /api/admin/site-settings', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
