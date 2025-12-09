const fs = require('fs');
const path = require('path');

function normalizeSlug(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/--+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractTitleFromTypeScriptFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    for (const line of lines) {
      const match = line.match(/^  title\s*:\s*["']([^"']+)["']/);
      if (match && match[1]) {
        return match[1];
      }
    }
  } catch (err) {}
  return null;
}

const productsDir = './src/data/products/point-light-sources';
const entries = fs.readdirSync(productsDir, { withFileTypes: true });

const products = entries
  .filter(f => f.isDirectory() || /\.(json|md|ts|tsx|js)$/i.test(f.name))
  .map(f => {
    const rawName = f.isDirectory() ? f.name : f.name.replace(/\.(json|md|ts|tsx|js)$/i, '');
    const slug = normalizeSlug(rawName);
    let title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    
    if (!f.isDirectory() && (f.name.endsWith('.ts') || f.name.endsWith('.tsx'))) {
      const filePath = path.join(productsDir, f.name);
      const extractedTitle = extractTitleFromTypeScriptFile(filePath);
      if (extractedTitle) {
        title = extractedTitle;
      }
    }
    return { slug, title };
  });

console.log('Products found:', products.length);
products.forEach(p => console.log('-', p.slug, ':', p.title));

// Test if search would work
const q = 'point';
const results = products.filter(p => 
  p.title.toLowerCase().includes(q) ||
  p.slug.toLowerCase().includes(q)
);

console.log('\nSearch results for "point":');
results.forEach(r => console.log('-', r.title));
