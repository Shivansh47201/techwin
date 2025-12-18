// Utility helpers for blog content normalization and H1 extraction
export function extractFirstH1(html: string) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  let inner = m[1];
  // If the H1 contains nested block tags, take only the portion before the first block tag
  const cutoff = inner.search(/<(p|div|br|h[2-6])\b/i);
  if (cutoff !== -1) inner = inner.slice(0, cutoff);
  const text = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text || null;
}

export function normalizeContent(html: string, featuredImageSrc?: string) {
  let normalized = html.replace(/src="uploads\//gi, 'src="/uploads/');

  // Unwrap H1 if present and remove the title portion we already displayed in the hero.
  const h1Match = normalized.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const inner = h1Match[1];
    const titleText = extractFirstH1(html) || "";
    let replacement = inner;
    if (titleText) {
      const esc = titleText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      replacement = inner.replace(new RegExp(esc, "i"), "").trim();
    }
    normalized = normalized.replace(/<h1[\s\S]*?>[\s\S]*?<\/h1>/i, replacement || "");
  }

  if (featuredImageSrc) {
    try {
      const parts = featuredImageSrc.split("/");
      const basename = parts[parts.length - 1];
      if (basename) {
        const escBase = basename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const imgRe = new RegExp(`<img[^>]+${escBase}[^>]*>`, "i");
        const pos = normalized.search(imgRe);
        if (pos !== -1 && pos < 400) {
          normalized = normalized.replace(imgRe, "");
        }
      }
    } catch (err) {
      // noop
    }
  }

  normalized = normalized.replace(/<span[^>]*>\s*<\/span>/gi, '');
  normalized = normalized.replace(/<([a-z0-9]+)[^>]*>\s*<\/\1>/gi, '');

  normalized = normalized.replace(/^(?:\s|(?:<br[^>]*>\s*)|(?:<p[^>]*>\s*<\/p>\s*))+/, '');
  normalized = normalized.replace(/(?:<br[^>]*>\s*){2,}/gi, '<br/>');
  normalized = normalized.trim();

  return normalized;
}
