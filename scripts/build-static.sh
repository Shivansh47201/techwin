#!/bin/bash

# ====================================================================
# Techwin Static Export Build Script for Hostinger Deployment
# ====================================================================
# This script builds the Next.js application as a static site and
# prepares it for upload to Hostinger.

set -e  # Exit on error

echo "🔨 Starting Techwin Static Export Build..."
echo "==========================================="
echo ""

# Step 1: Clean previous builds
echo "📦 Step 1: Cleaning previous builds..."
rm -rf .next out dist 2>/dev/null || true
echo "✅ Cleaned"
echo ""

# Step 2: Generate products JSON (prebuild step)
echo "📄 Step 2: Generating products.json..."
node scripts/export-products-json.js
if [ -f "public/data/products.json" ]; then
    echo "✅ products.json generated successfully"
else
    echo "⚠️  Warning: products.json not found, continuing..."
fi
echo ""

# Step 3: Build Next.js as static export
echo "🏗️  Step 3: Building Next.js as static export..."
npm run build
echo "✅ Build completed"
echo ""

# Step 4: Verify output folder
if [ -d "out" ]; then
    echo "📁 Step 4: Verifying output folder..."
    FILE_COUNT=$(find out -type f | wc -l)
    echo "✅ Generated ${FILE_COUNT} static files in ./out"
    
    # Show structure
    echo ""
    echo "📂 Output folder structure:"
    du -sh out 2>/dev/null || echo "out/ folder ready"
    echo ""
    
    # Show important files
    if [ -f "out/index.html" ]; then
        echo "✅ index.html (homepage) found"
    fi
    if [ -f "out/about/index.html" ]; then
        echo "✅ about/index.html found"
    fi
    if [ -f "out/products/index.html" ]; then
        echo "✅ products/index.html found"
    fi
else
    echo "❌ ERROR: out/ folder not created. Build may have failed."
    exit 1
fi
echo ""

# Step 5: Check for .htaccess
if [ -f "public/.htaccess" ]; then
    echo "✅ .htaccess configuration file found"
    cp public/.htaccess out/.htaccess
    echo "✅ .htaccess copied to out/"
fi
echo ""

# Step 6: Summary
echo "==========================================="
echo "✨ Build Complete!"
echo "==========================================="
echo ""
echo "📍 Deploy Instructions for Hostinger:"
echo "   1. FTP/SFTP into your Hostinger account"
echo "   2. Navigate to your public_html folder (or domain root)"
echo "   3. Delete all existing files"
echo "   4. Upload all files from ./out/ folder"
echo "   5. Ensure .htaccess is uploaded (hidden file - enable viewing)"
echo ""
echo "📌 IMPORTANT:"
echo "   • All routes will be served as static HTML"
echo "   • APIs (/api/products, /api/search) will work from pre-generated JSON"
echo "   • Images and videos must be in public/ folder"
echo "   • Clear browser cache (Ctrl+Shift+Del) if pages don't update"
echo ""
echo "🔗 Test these URLs after deployment:"
echo "   • https://yourdomain.com/"
echo "   • https://yourdomain.com/about"
echo "   • https://yourdomain.com/products"
echo "   • https://yourdomain.com/search"
echo "   • https://yourdomain.com/api/products"
echo ""
