Deployment checklist (auto-generated)

- [ ] Verify environment variables set for production (if any)
- [ ] Build: `npm run build` (done)
- [ ] Start preview: `npm run start` (done)
- [ ] Verify homepage and category routes return 200 (done)
- [ ] Verify representative product pages return 200 (done)
- [ ] Ensure static assets are present under `.next/static` and `/public` (verify manually)
- [ ] Confirm API routes `/api/products` and `/api/search` return expected JSON (manual check)
- [ ] Check server logs for runtime errors (monitor `/tmp/preview.log`)
- [ ] Prepare deployment target (VPS/PAAS) and set NODE_ENV=production
- [ ] Set up process manager (pm2, systemd, Docker) for `npm run start`
- [ ] Configure reverse proxy and TLS (nginx/Caddy)"
}