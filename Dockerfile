# -----------------------
# 1. Build stage
# -----------------------
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# -----------------------
# 2. Runtime stage
# -----------------------
FROM node:20-alpine AS runtime

# ARG allows setting NODE_ENV at build time, ENV sets the runtime default
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Optional: copy your .env files if you want them inside the image
# But for Railway, it's better to set variables in the dashboard
# COPY .env* ./

# Start the app
CMD ["node", "dist/main"]
