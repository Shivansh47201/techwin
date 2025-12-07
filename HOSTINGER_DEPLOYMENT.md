# 🚀 Techwin Hostinger Deployment Guide - Static Export

## Overview
This guide explains how to deploy Techwin's Next.js application as a **fully static site** to Hostinger using the `out` folder.

---

## 📋 Pre-Deployment Checklist

- [x] About page fully configured (`/src/app/about/page.tsx`)
- [x] All routing working locally (`npm run dev`)
- [x] Products JSON generated (`public/data/products.json`)
- [x] .htaccess configured (`public/.htaccess`)
- [x] Static export enabled (`output: "export"` in next.config.ts)
- [x] Build script ready (`scripts/build-static.sh`)

---

## 🔧 Build Process

### Option 1: Quick Build (Using Script)
```bash
# Make script executable
chmod +x scripts/build-static.sh

# Run the build
./scripts/build-static.sh
```

### Option 2: Manual Build
```bash
# 1. Clean previous builds
rm -rf .next out dist

# 2. Generate products data
node scripts/export-products-json.js

# 3. Build as static export
npm run build

# 4. Verify
ls -la out/
```

---

## 📊 Expected Output Structure

After build, your `out/` folder should contain:
```
out/
├── index.html              (Homepage)
├── about/
│   └── index.html         (About page)
├── products/
│   ├── index.html         (Products catalog)
│   ├── [category]/
│   │   └── [product]/
│   │       └── index.html (Individual product pages)
├── search/
│   └── index.html         (Search page)
├── contact/
│   └── index.html         (Contact page)
├── application/
│   ├── index.html
│   └── [slug]/
│       └── index.html
├── api/
│   ├── products/
│   │   └── index.json    (Products API)
│   └── search/
│       └── index.json    (Search API)
├── _next/                 (Next.js static assets)
│   ├── static/
│   ├── image/
│   └── ...
├── public/                (Images, videos, etc.)
├── .htaccess             (Web server configuration)
└── 404.html              (Error page)
```

---

## ✅ Verification Checklist

Before uploading to Hostinger, verify locally:

```bash
# 1. Check build completed without errors
ls -la out/index.html

# 2. Check .htaccess is present
ls -la out/.htaccess

# 3. Check API JSON files exist
ls -la out/api/products/
ls -la out/api/search/

# 4. Count total files
find out -type f | wc -l

# 5. Check folder size
du -sh out/
```

---

## 🌐 Hostinger FTP Deployment

### Step 1: Connect via FTP/SFTP
1. Open Hostinger control panel
2. Go to **Files → FTP Accounts** (or use SSH)
3. Download FTP credentials
4. Use FileZilla or similar FTP client to connect

```bash
# Or via SSH/SFTP (if available)
sftp username@your-domain.com
```

### Step 2: Navigate to Public Directory
```bash
# In FTP/SFTP
cd public_html/
# or
cd httpdocs/
# or
cd yourdomainname.com/
```

### Step 3: Backup Current Files
```bash
# Create backup folder
mkdir backup_$(date +%Y%m%d)
mv * backup_$(date +%Y%m%d)/ 2>/dev/null
```

### Step 4: Upload Files from `out/`
**Using FileZilla:**
1. Right-click on `out` folder locally
2. Select "Upload"
3. Upload all files from `out/` to `public_html/`

**Using Command Line (SCP):**
```bash
scp -r out/* username@your-domain.com:~/public_html/
```

### Step 5: Verify Permissions
Ensure proper permissions:
```bash
# Via SSH/FTP Terminal
chmod 755 public_html/
chmod 644 public_html/*.html
chmod 644 public_html/.htaccess
chmod 755 public_html/*/ (all directories)
```

---

## 🛠️ Troubleshooting

### ❌ 403 Forbidden Error
**Solution:** 
1. Check .htaccess is uploaded to root
2. Verify file permissions (644 for files, 755 for directories)
3. Enable mod_rewrite on Hostinger (check in Control Panel)

```bash
# SSH: Check .htaccess syntax
apache2ctl -t
# or
apachectl configtest
```

### ❌ 404 on New Tab/Window/Incognito
**Solution:** This is caused by missing trailing slashes or SPA routing issues.
1. Ensure `.htaccess` is configured correctly
2. Add trailing slashes in rewrite rules (already done)
3. Test with: `curl -v https://your-domain.com/about/`

### ❌ Images Not Loading
**Solution:**
1. Ensure `public/` folder is uploaded
2. Check paths are absolute (e.g., `/images/file.jpg` not `./images/file.jpg`)
3. Verify MIME types: Go to Hostinger Control Panel → File Manager → Images folder → Properties

### ❌ API Routes Return 404
**Solution:**
1. Verify `/api/products/index.json` exists in `out/`
2. Check .htaccess rewrite rules
3. Ensure `public/data/products.json` was generated before build

---

## 🔍 Testing After Deployment

### Test URLs:
```
✅ https://your-domain.com/
✅ https://your-domain.com/about/
✅ https://your-domain.com/products/
✅ https://your-domain.com/search/
✅ https://your-domain.com/contact/
✅ https://your-domain.com/application/
✅ https://your-domain.com/api/products/
✅ https://your-domain.com/api/search/
```

### Test in Different Scenarios:
- ✅ Open link in new tab
- ✅ Open link in new window
- ✅ Open in incognito/private mode
- ✅ Test on different browsers (Chrome, Firefox, Safari)
- ✅ Test on mobile devices
- ✅ Test on different networks (WiFi, 4G)

### Browser Cache Issues:
If pages don't update after upload:
```bash
# Hard refresh in browser
Ctrl + Shift + Delete  (Windows)
Cmd + Shift + Delete   (Mac)
Cmd + Option + E       (Safari)

# Then clear specific domain cache and reload
```

---

## 📝 Environment Variables for Hostinger

If needed, create a `.env.production` file (though not required for static export):

```bash
# .env.production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_METADATA_BASE=https://your-domain.com
```

---

## 🔄 Rollback Procedure

If something goes wrong:

```bash
# Via FTP/SSH
cd public_html/
rm -rf * (all current files)
cp -r ../backup_YYYYMMDD/* . (restore backup)
```

---

## 📊 Performance Optimization

After deployment, optimize for speed:

### Enable Caching Headers (already in .htaccess)
```
✅ Static assets: 1 year cache
✅ HTML pages: 1 hour cache
✅ API responses: No cache (revalidate always)
```

### Compress Content (already in .htaccess)
```
✅ GZIP compression enabled
✅ Brotli compression (if available on Hostinger)
```

### CDN (Optional)
1. Go to Hostinger Control Panel
2. Enable **Cloudflare** or **Bunnycdn** if available
3. Point to your domain

---

## 🎯 Summary

| Step | Command | Time |
|------|---------|------|
| Clean | `rm -rf .next out` | <1s |
| Generate | `node scripts/export-products-json.js` | 2-5s |
| Build | `npm run build` | 30-60s |
| Upload | Via FTP to Hostinger | 5-15s |
| Test | Verify all routes | 2-5 min |

**Total deployment time: ~5-15 minutes**

---

## ✨ Success Indicators

- ✅ All pages load without 404 errors
- ✅ No 403 Forbidden errors
- ✅ Images and videos display correctly
- ✅ Links work in new tabs/windows/incognito
- ✅ API endpoints return JSON
- ✅ Search functionality works
- ✅ About page displays fully
- ✅ Contact form is accessible
- ✅ Mobile responsive on all pages

---

## 📞 Support

If you encounter issues:

1. Check Hostinger control panel logs
2. Verify .htaccess configuration
3. Test locally first: `npm run build && npm start`
4. Check file permissions (644 files, 755 directories)
5. Clear browser cache completely

---

**Last Updated:** December 6, 2025
**Status:** ✅ Production Ready
