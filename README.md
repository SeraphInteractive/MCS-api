# Platform-API

Backend API for ranked voting rounds, raid telemetry, Grab-Box shot inventory, and supervisor review desk. Built with AdonisJS 6, PostgreSQL, and Redis, integrating `@platform/internal-logic`.

## Features

- Discord OAuth: voter authentication and token management with role hierarchy (voter, contributor, senior_contributor, supervisor, admin).
- Voting Rounds & Ballots: 3-2-1 ranked ballots, anti-stacking validation, and mass conservation audits.
- Raid Telemetry & Quarantine: real-time velocity Z-scores and auto-quarantine for brigaded entries.
- Leaderboard: Borda tallies regularized with Bayesian shrinkage and cached in Redis.
- Grab-Box Inventory: shot claiming with 1-shot concurrency limit, tier-based deadlines (5-14 days), and Senior priority window locks.
- Storage & Video Submissions: presigned S3/R2 upload URLs for .mp4 and .blend files.
- Supervisor Review Desk: review queue with video playback, approval/revision state machine, and senior promotions.
- Expiry Daemon: automated 15-minute background task that reclaims abandoned shots.

## Setup

```bash
# install dependencies
npm install

# environment config
cp .env.example .env

# run database migrations
node ace migration:run

# start dev server
npm run dev

# run test suite
npm test
```

`@platform/internal-logic` is installed straight from its git repository at a pinned tag (see
`package.json`); `npm install` needs `git` on the PATH and builds the package on the fly. To move to
a newer release, bump the `#v…` ref and run `npm install` so the lockfile records the new commit.

## Docker & deployment

`Dockerfile` builds a production image (compiled `build/`, production dependencies only, runs as
the unprivileged `node` user, `HEALTHCHECK` on `GET /health`). `.github/workflows/docker-publish.yml`
publishes it to `ghcr.io/seraphinteractive/platform-api` on every push to `main` (`latest`, `main`,
`sha-<short>`) and on `v*.*.*` tags (`X.Y.Z`, `X.Y`); pull requests only build.

```bash
docker build -t platform-api .
docker run --rm --env-file .env -p 3333:3333 platform-api
# migrations are a separate step, e.g. before starting the server:
docker run --rm --env-file .env platform-api node ace migration:run --force
```

The production stack (Postgres, Redis, the Discord bot, Dokploy) lives in
[Platform-Deployment](https://github.com/SeraphInteractive/Platform-Deployment).

## API Endpoints

### Health
- `GET /health` – 200 when Postgres and Redis are reachable, 503 otherwise (used by the container health check)

### Auth
- `GET /api/v1/auth/discord/callback`
- `GET /api/v1/auth/me`
- `DELETE /api/v1/auth/logout`

### Rounds & Entries
- `GET /api/v1/rounds`
- `GET /api/v1/rounds/:id`
- `POST /api/v1/rounds` (admin)
- `PATCH /api/v1/rounds/:id` (admin)
- `POST /api/v1/rounds/:id/finalize` (admin)
- `GET /api/v1/rounds/:roundId/entries`
- `POST /api/v1/rounds/:roundId/entries` (admin)
- `PATCH /api/v1/rounds/:roundId/entries/:id` (admin)
- `DELETE /api/v1/rounds/:roundId/entries/:id` (admin)
- `POST /api/v1/rounds/:roundId/entries/:id/reinstate` (admin)

### Ballots & Leaderboards
- `POST /api/v1/rounds/:roundId/ballots`
- `GET /api/v1/rounds/:roundId/ballots/mine`
- `GET /api/v1/rounds/:roundId/leaderboard`
- `GET /api/v1/rounds/:roundId/results`
- `GET /api/v1/rounds/:roundId/telemetry` (supervisor+)
- `GET /api/v1/rounds/:roundId/events` (supervisor+)

### Grab-Box & Shots
- `GET /api/v1/shots` (filter by sceneNumber, difficultyTier, status)
- `GET /api/v1/shots/:id`
- `POST /api/v1/shots/:id/claim` (contributor+)
- `POST /api/v1/shots/:id/release` (contributor+)
- `POST /api/v1/shots/:id/upload-url` (contributor+)
- `POST /api/v1/shots/:id/submit` (contributor+)
- `POST /api/v1/shots` (supervisor+)
- `PATCH /api/v1/shots/:id` (supervisor+)
- `DELETE /api/v1/shots/:id` (admin)

### Supervisor Review Desk
- `GET /api/v1/reviews` (supervisor+)
- `POST /api/v1/reviews/:submissionId` (supervisor+)
- `POST /api/v1/supervisors/promote/:userId` (supervisor+)
- `POST /api/v1/shots/reclaim-expired` (supervisor+)
