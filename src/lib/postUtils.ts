// lib/postUtils.ts
// Utility functions for extracting metadata from post content

export interface HeadingData {
  level: number;
  text: string;
  id?: string;
}

export interface LinkData {
  url: string;
  title?: string;
  anchor?: string;
}

/**
 * Extract all headings (H1-H6) from HTML content
 */
export function extractHeadings(html: string): HeadingData[] {
  const headings: HeadingData[] = [];
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, "").trim(); // Remove nested HTML tags

    if (text) {
      const id = `heading-${text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`;
      headings.push({ level, text, id });
    }
  }

  return headings;
}

/**
 * Extract the first H1 from headings
 */
export function getMainHeading(headings: HeadingData[]): string | undefined {
  return headings.find((h) => h.level === 1)?.text;
}

/**
 * Extract H2s from headings
 */
export function getH2Headings(headings: HeadingData[]): string[] {
  return headings.filter((h) => h.level === 2).map((h) => h.text);
}

/**
 * Extract H3s from headings
 */
export function getH3Headings(headings: HeadingData[]): string[] {
  return headings.filter((h) => h.level === 3).map((h) => h.text);
}

/**
 * Extract all links from HTML content
 */
export function extractLinks(html: string): LinkData[] {
  const links: LinkData[] = [];
  const linkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const url = match[1];
    const anchor = match[2].replace(/<[^>]*>/g, "").trim();

    if (url) {
      links.push({ url, anchor });
    }
  }

  return links;
}

/**
 * Extract all image URLs from HTML content
 */
export function extractImages(html: string): string[] {
  const images: string[] = [];
  const imgRegex = /<img([^>]*?)src=["']([^"']+)["']([^>]*)>/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    // match[2] === src, capture alt if present
    const src = match[2];
    images.push(src);
  }

  return images;
}

/**
 * Extract image objects including alt/title/caption from HTML
 */
export function extractImageObjects(html: string): Array<{ url: string; alt?: string; title?: string; caption?: string }> {
  const images: Array<{ url: string; alt?: string; title?: string; caption?: string }> = [];
  const imgRegex = /<img([^>]*?)src=["']([^"']+)["']([^>]*)>/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    const attrs = (match[1] + ' ' + match[3]).trim();
    const url = match[2];
    const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
    const titleMatch = attrs.match(/title=["']([^"']*)["']/i);
    const captionMatch = attrs.match(/data-caption=["']([^"']*)["']/i);

    images.push({
      url,
      alt: altMatch ? altMatch[1] : undefined,
      title: titleMatch ? titleMatch[1] : undefined,
      caption: captionMatch ? captionMatch[1] : undefined,
    });
  }

  return images;
}

/**
 * Calculate reading time in minutes based on word count
 * Average reading speed: ~200 words per minute
 */
export function calculateReadingTime(text: string): number {
  const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
  return Math.ceil(wordCount / 200);
}

/**
 * Count total words in HTML content
 */
export function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, ""); // Remove HTML tags
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

/**
 * Generate SEO description from content if not provided
 */
export function generateSEODescription(content: string, maxLength: number = 160): string {
  const text = content.replace(/<[^>]*>/g, "").trim(); // Remove HTML tags
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

/**
 * Extract internal links (posts from same site)
 */
export function extractInternalLinks(html: string, baseUrl: string = ""): string[] {
  const internalLinks: string[] = [];
  const links = extractLinks(html);

  links.forEach((link) => {
    if (
      link.url.startsWith("/") ||
      link.url.startsWith(baseUrl) ||
      !link.url.includes("http")
    ) {
      // Extract slug from URL (e.g., "/blog/post-title" -> "post-title")
      const slug = link.url.replace(/^\/blog\//, "").replace(/\/$/, "");
      if (slug && !internalLinks.includes(slug)) {
        internalLinks.push(slug);
      }
    }
  });

  return internalLinks;
}

/**
 * Extract external links (different domain)
 */
export function extractExternalLinks(html: string, baseUrl: string = ""): LinkData[] {
  const externalLinks: LinkData[] = [];
  const links = extractLinks(html);

  links.forEach((link) => {
    if (
      link.url.includes("http") &&
      !link.url.includes(baseUrl) &&
      !link.url.startsWith("/")
    ) {
      externalLinks.push(link);
    }
  });

  return externalLinks;
}
