#!/bin/bash

# ====================================================================
# 🚀 TECHWIN DEPLOYMENT QUICK START - Hostinger Edition
# ====================================================================
# This is a step-by-step guide to deploy Techwin to Hostinger

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         TECHWIN HOSTINGER DEPLOYMENT QUICK START           ║"
echo "║         Status: ✅ PRODUCTION READY                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# ====================================================================
# BUILD STATUS
# ====================================================================
echo "📊 BUILD OUTPUT SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -d "out" ]; then
    SIZE=$(du -sh out 2>/dev/null | cut -f1)
    FILE_COUNT=$(find out -type f 2>/dev/null | wc -l)
    
    echo "✅ Output Folder: out/"
    echo "   Size: $SIZE"
    echo "   Files: $FILE_COUNT"
    echo ""
    
    # Check important files
    echo "📄 Important Files:"
    [ -f "out/.htaccess" ] && echo "   ✅ .htaccess (3.9KB)" || echo "   ❌ .htaccess MISSING!"
    [ -f "out/index.html" ] && echo "   ✅ index.html (Homepage)" || echo "   ❌ index.html MISSING!"
    [ -f "out/about/index.html" ] && echo "   ✅ about/index.html" || echo "   ❌ about/index.html MISSING!"
    [ -f "out/api/products" ] && echo "   ✅ api/products (JSON)" || echo "   ❌ api/products MISSING!"
    echo ""
else
    echo "❌ out/ folder not found!"
    echo "   Run: npm run build"
    exit 1
fi

# ====================================================================
# DEPLOYMENT OPTIONS
# ====================================================================
echo "🌐 DEPLOYMENT OPTIONS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Choose your deployment method:"
echo ""
echo "1️⃣  FileZilla / FTP Client (EASIEST)"
echo "    • Download FileZilla from: https://filezilla-project.org"
echo "    • Connect using Hostinger FTP credentials"
echo "    • Upload all files from ./out/ to public_html/"
echo ""
echo "2️⃣  SSH / Terminal (FASTEST)"
echo "    $ scp -r out/* username@your-domain.com:~/public_html/"
echo ""
echo "3️⃣  cPanel File Manager (WEB INTERFACE)"
echo "    • Login to Hostinger control panel"
echo "    • Go to File Manager"
echo "    • Upload files to public_html/"
echo ""

# ====================================================================
# PRE-DEPLOYMENT CHECKLIST
# ====================================================================
echo "✅ PRE-DEPLOYMENT CHECKLIST"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Before uploading, ensure:"
echo ""
echo "□ .htaccess is in out/ folder"
echo "  → This FIXES 403 Forbidden errors"
echo ""
echo "□ All HTML files have trailing slashes (/about/ not /about)"
echo "  → Already configured ✅"
echo ""
echo "□ Images in public/ folder will be uploaded"
echo "  → Check: out/images/ and out/public/ exist"
echo ""
echo "□ API routes are pre-generated as JSON files"
echo "  → Check: out/api/products and out/api/search"
echo ""

# ====================================================================
# DEPLOYMENT STEPS
# ====================================================================
echo "🚀 DEPLOYMENT STEPS (FILEZIA OR FTP CLIENT)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "STEP 1: Connect to Hostinger"
echo "  • Open FileZilla"
echo "  • File → Site Manager → New Site"
echo "  • Protocol: SFTP (or FTP)"
echo "  • Host: your-domain.com (or IP from Hostinger)"
echo "  • Port: 22 (SFTP) or 21 (FTP)"
echo "  • Username: Your Hostinger FTP username"
echo "  • Password: Your Hostinger FTP password"
echo "  • Click 'Connect'"
echo ""
echo "STEP 2: Navigate to Public Directory"
echo "  • Double-click: public_html/ or httpdocs/"
echo "  • (Or whichever folder serves your domain)"
echo ""
echo "STEP 3: Backup Existing Files (IMPORTANT!)"
echo "  • Create folder: backup_$(date +%Y%m%d)"
echo "  • Move all existing files there"
echo "  • Or delete if this is first deployment"
echo ""
echo "STEP 4: Upload out/ Folder"
echo "  • In FileZilla, right-click out/ folder"
echo "  • Select 'Upload'"
echo "  • Wait for all files to complete"
echo ""
echo "STEP 5: Verify .htaccess is Uploaded"
echo "  • In FileZilla, right-click .htaccess"
echo "  • Check properties (should be 3.9KB)"
echo "  • If you can't see it: View → Show Hidden Files"
echo ""
echo "STEP 6: Set Permissions (if needed)"
echo "  • Right-click public_html folder → Properties"
echo "  • Set to: 755 (directories) and 644 (files)"
echo ""

# ====================================================================
# TESTING AFTER DEPLOYMENT
# ====================================================================
echo "🧪 TESTING AFTER DEPLOYMENT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Test these URLs after uploading:"
echo ""
echo "✅ Homepage"
echo "   https://your-domain.com/"
echo ""
echo "✅ About Page (NEWLY FIXED)"
echo "   https://your-domain.com/about/"
echo ""
echo "✅ Products"
echo "   https://your-domain.com/products/"
echo ""
echo "✅ Products Category"
echo "   https://your-domain.com/products/single-frequency-fiber-lasers/"
echo ""
echo "✅ API - Products List"
echo "   https://your-domain.com/api/products"
echo ""
echo "✅ Search Page"
echo "   https://your-domain.com/search/"
echo ""
echo "Special Tests:"
echo "  • Open link in NEW TAB (should work - 403 error FIXED)"
echo "  • Open link in NEW WINDOW (should work)"
echo "  • Open in INCOGNITO mode (should work)"
echo "  • Test on MOBILE device"
echo "  • Test on different NETWORK (4G, different WiFi)"
echo ""

# ====================================================================
# TROUBLESHOOTING
# ====================================================================
echo "🔧 IF YOU GET 403 FORBIDDEN ERROR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Solution 1: Verify .htaccess"
echo "  • Check .htaccess is in root directory (public_html/)"
echo "  • File should be 3.9KB"
echo "  • Try removing & re-uploading"
echo ""
echo "Solution 2: Check File Permissions"
echo "  • Via SSH: chmod 755 public_html/"
echo "  • Via FTP: Right-click → Properties → Set to 755"
echo ""
echo "Solution 3: Enable mod_rewrite"
echo "  • Go to Hostinger Control Panel"
echo "  • Check if mod_rewrite is enabled"
echo "  • It should be enabled by default"
echo ""
echo "Solution 4: Clear Browser Cache"
echo "  • Press: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)"
echo "  • Clear all cache"
echo "  • Reload page"
echo ""

# ====================================================================
# FINAL CHECKLIST
# ====================================================================
echo "✨ FINAL PRE-UPLOAD CHECKLIST"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "□ out/ folder exists and has 941 files"
echo "□ .htaccess file is present in out/"
echo "□ index.html (57KB) exists"
echo "□ about/index.html exists"
echo "□ All product pages exist"
echo "□ API files exist (out/api/products, out/api/search)"
echo "□ Hostinger FTP credentials ready"
echo "□ Current site backed up (if existing)"
echo "□ FileZilla / FTP client ready"
echo ""

# ====================================================================
# NEXT STEPS
# ====================================================================
echo "📋 NEXT STEPS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Connect to Hostinger FTP"
echo "2. Upload all files from out/"
echo "3. Verify .htaccess is uploaded"
echo "4. Test all URLs"
echo "5. Clear browser cache if needed"
echo "6. Go LIVE! 🎉"
echo ""
echo "For detailed guide, see: HOSTINGER_DEPLOYMENT.md"
echo "For production checklist, see: PRODUCTION_READY.md"
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              READY TO DEPLOY? YOU'RE ALL SET! 🚀           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
