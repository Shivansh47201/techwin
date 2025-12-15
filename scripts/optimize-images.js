#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
// Use sharp if available; the user can install it as devDependency
let sharp;
try { sharp = require('sharp'); } catch (e) {
  console.error('Please install sharp (npm i -D sharp) to run this script');
  process.exit(1);
}

const targets = ['public/images', 'public/products', 'public/hero', 'public/Images Techwin'];

function* walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function optimize() {
  for (const t of targets) {
    if (!fs.existsSync(t)) continue;
    for (const file of walk(t)) {
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
      try {
        const buf = await sharp(file).resize({ width: 1600, withoutEnlargement: true }).toBuffer();
        await sharp(buf).jpeg({ quality: 78 }).toFile(file);
        console.log('Optimized', file);
      } catch (err) {
        console.error('Failed', file, err.message);
      }
    }
  }
}

optimize();
