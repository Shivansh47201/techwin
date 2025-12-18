import fs from 'fs/promises';
import path from 'path';

const SETTINGS_PATH = path.join(process.cwd(), 'data', 'site-settings.json');

export interface SiteSettings {
  analyticsId?: string; // e.g., G-XXXX or UA-XXXX
  robotsTxt?: string;
  sitemapEnabled?: boolean;
  includePostsInSitemap?: boolean;
}

export async function readSiteSettings(): Promise<SiteSettings> {
  try {
    const raw = await fs.readFile(SETTINGS_PATH, 'utf-8');
    return JSON.parse(raw) as SiteSettings;
  } catch (err) {
    return {
      analyticsId: '',
      robotsTxt: `User-agent: *\nAllow: /\nSitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sitemap.xml`,
      sitemapEnabled: true,
      includePostsInSitemap: true,
    };
  }
}

export async function writeSiteSettings(settings: SiteSettings) {
  await fs.mkdir(path.dirname(SETTINGS_PATH), { recursive: true });
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf-8');
}
