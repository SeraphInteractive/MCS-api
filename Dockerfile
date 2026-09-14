# syntax=docker/dockerfile:1.7

# Production image for Platform-API.
#   build: docker build -t platform-api .
#   run:   docker run --rm --env-file .env -p 3333:3333 platform-api
# Published to ghcr.io/seraphinteractive/platform-api by .github/workflows/docker-publish.yml.

ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
# @platform/internal-logic is a git dependency: npm clones it and runs its `prepare` build
RUN apk add --no-cache git

# all dependencies (compiler, assembler, test tooling)
FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# production dependencies only
FROM base AS production-deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --no-audit --no-fund

# compile typescript into build/
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node ace build

# lean runtime image
FROM node:${NODE_VERSION}-alpine AS runtime
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3333
WORKDIR /app
COPY --chown=node:node --from=production-deps /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/build ./
USER node
EXPOSE 3333

# /health returns 503 when postgres or redis are unreachable. Traefik only routes to healthy
# containers, so probe quickly (start-interval, docker 25+) until the first success.
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --start-interval=2s --retries=3 \
  CMD wget -qO /dev/null "http://127.0.0.1:${PORT}/health" || exit 1

# migrations are a separate step: `node ace migration:run --force` (see Platform-Deployment)
CMD ["node", "bin/server.js"]
