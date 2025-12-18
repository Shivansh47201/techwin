import { readSiteSettings } from '@/lib/siteSettings';

export async function GET() {
  const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
  const settings = await readSiteSettings();
  const robots = settings.robotsTxt || `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml`;

  return new Response(robots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 's-maxage=3600' },
  });
}
