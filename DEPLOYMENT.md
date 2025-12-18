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

---

## Scheduler / Scheduled Publishing

This repository now includes a small scheduler utility and a manual trigger to auto-publish posts that were scheduled via the `publishedAt` timestamp.

How it works
- Posts with `published: false` and a `publishedAt` value <= current time are considered due and will be marked `published: true` when the scheduler runs.

Local testing
- Run the scheduler once using: `npm run run-scheduler` (uses `ts-node` to run `scripts/run-scheduled.ts`).
- You can also trigger it via the admin UI: **Blog Management → Run Scheduler** (uses `/api/admin/run-scheduled`).

Production
- Recommended: run the scheduler as a separate worker (e.g., a small Node process under `PM2` or `systemd`) to run every minute.
- Alternative: use a cron job that hits the `/api/admin/run-scheduled` endpoint or calls the `scripts/run-scheduled.ts` script.

Security note
- The admin manual trigger endpoint should be restricted. You can set `SCHEDULER_SECRET` in environment variables and the endpoint will require the `x-scheduler-secret` header to run.

Examples
- systemd unit (runs the scheduler as a persistent process):

```ini
[Unit]
Description=Techwin Scheduler
After=network.target

[Service]
Type=simple
WorkingDirectory=/path/to/techwin
Environment="NODE_ENV=production"
Environment="MONGODB_URI=your_mongo_uri"
Environment="SCHEDULER_SECRET=your-secret"
ExecStart=/usr/bin/env node /path/to/techwin/node_modules/ts-node/dist/bin.js /path/to/techwin/src/server/scheduler.ts
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

- Cron (hit API endpoint every minute with secret header):

```sh
* * * * * curl -X POST -H "x-scheduler-secret: your-secret" https://your-site.com/api/admin/run-scheduled
```

Local test
- Run one-off test script: `npm run test-scheduler` (requires `MONGODB_URI` pointing to a test DB).
- Run scheduler locally: `npm run start-scheduler` (runs in-process and logs results).
