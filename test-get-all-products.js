// Direct test of getAllProducts without TypeScript compilation issues
const fs = require('fs');
const path = require('path');

// Directly replicate the function from products.ts
let _cachedProducts = null;

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

function findProductsDir() {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    const cand1 = path.join(dir, 'src', 'data', 'products');
    if (fs.existsSync(cand1)) return cand1;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  const fallbackA = path.join(process.cwd(), 'src', 'data', 'products');
  if (fs.existsSync(fallbackA)) return fallbackA;
  return null;
}

function getAllProducts() {
  if (_cachedProducts) return _cachedProducts;

  const productsDir = findProductsDir();
  if (!productsDir) {
    console.log('ERROR: productsDir not found!');
    return [];
  }

  console.log('Using productsDir:', productsDir);

  const categories = fs.readdirSync(productsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((dir) => {
      const dirName = dir.name;
      const categorySlug = normalizeSlug(dirName);
      const categoryPath = path.join(productsDir, dirName);

      const entries = fs.readdirSync(categoryPath, { withFileTypes: true });

      const productEntries = entries
        .filter((f) => f.isDirectory() || /\.(json|md|ts|tsx|js)$/i.test(f.name))
        .map((f) => {
          const rawName = f.isDirectory() ? f.name : f.name.replace(/\.(json|md|ts|tsx|js)$/i, '');
          const slug = normalizeSlug(rawName);

          let title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          try {
            if (!f.isDirectory() && (f.name.endsWith('.ts') || f.name.endsWith('.tsx'))) {
              const filePath = path.join(categoryPath, f.name);
              const extractedTitle = extractTitleFromTypeScriptFile(filePath);
              if (extractedTitle) {
                title = extractedTitle;
              }
            }
          } catch (err) {}
          return { slug, title };
        });

      return {
        categorySlug,
        categoryTitle: categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        products: productEntries,
      };
    });

  _cachedProducts = categories;
  return categories;
}

const products = getAllProducts();
console.log('Total categories:', products.length);
products.forEach(cat => {
  console.log(`\n${cat.categorySlug}: ${cat.products.length} products`);
  cat.products.slice(0, 3).forEach(p => console.log(`  - ${p.slug}: "${p.title}"`));
});

// Test search
const q = 'point';
console.log(`\n\nSearching for "${q}":`);
for (const category of products) {
  for (const product of category.products) {
    if (product.title.toLowerCase().includes(q) || product.slug.toLowerCase().includes(q)) {
      console.log(`FOUND: ${product.title}`);
    }
  }
}
