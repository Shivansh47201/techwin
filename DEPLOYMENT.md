**Deployment Notes for 2GB Server**

- Build in CI or on a builder machine (avoid building on 2GB server).
- Use Next.js standalone output to produce a minimal runtime: `output: 'standalone'` in `next.config.ts`.
- Docker approach (recommended):
  - `docker build -t myapp:latest .` (build on CI)
  - `docker run -d --restart unless-stopped -p 3000:3000 --name app myapp:latest`

- If you must build on a 2GB VM, add 1GB swap temporarily:
  ```sh
  sudo fallocate -l 1G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  # add to /etc/fstab: /swapfile none swap sw 0 0
  ```

- Use a CDN or external image hosting (Cloudinary) to reduce on-server storage and bandwidth.
- Use `npm ci --omit=dev` or `pnpm install --prod` on the server to keep modules small.
- Monitor process memory with e.g., `pm2` or `systemd` and restart on OOM.

- Healthcheck endpoint: GET `/api/health` returns `{ status: 'ok' }`.

Environment variables required (example):
- `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL` (or `TO_EMAILS`)
- `MONGODB_URI` or whatever DB config you use
- `NEXT_PUBLIC_...` for any client-side envs

If you want, I can:
- Add a `docker-compose.yml` and a small `systemd` unit for production.
- Run bundle analyzer and make a list of large client libs to lazy-load.
