# Small production Dockerfile for Next.js standalone output
FROM node:20-bullseye-slim AS base
WORKDIR /app

# Install production deps only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --legacy-peer-deps

# Copy built standalone app
COPY . .
RUN npm run build

# Final image uses minimal runtime
FROM node:20-bullseye-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copy only what the standalone build needs
COPY --from=base /app/.next/standalone .
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
