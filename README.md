# MCS-api

Backend API for ranked 3-2-1 voting rounds, vote validation, and live raid telemetry. Built with AdonisJS 6, PostgreSQL, and Redis, integrating `@platform/internal-logic`.

## What it does

- Discord OAuth: authenticates voters via Discord OAuth, stores user details in PostgreSQL, and issues bearer tokens.
- Rounds and Entries: manages voting rounds across draft, open, closed, and finalized states with candidate entries.
- Ballots: accepts 3-2-1 ranked votes, validates against active round entries using `validate_ballot`, and supports last-write-wins updates while the round is open.
- Raid Telemetry and Quarantine: calculates rolling vote velocity Z-scores and runs `analyze_raid_risk`. If a critical threshold triggers, sets `is_quarantined = true` to hide the entry from active leaderboards.
- Live Events: SSE stream on `/api/v1/rounds/:roundId/events` broadcasting raid alerts and vote submissions.
- Leaderboards: computes Borda tallies and regularized standings with `calculate_bayesian_shrinkage`, cached in Redis for 10 seconds.
- Finalization: checks round closure, runs paired Z-score separation tests to verify statistical leads, and writes immutable snapshots to `round_results`.

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

## API Endpoints

### Auth
- `GET /api/v1/auth/discord/callback` (OAuth code exchange)
- `GET /api/v1/auth/me` (current authenticated profile)
- `DELETE /api/v1/auth/logout` (revoke access token)

### Rounds
- `GET /api/v1/rounds` (list rounds)
- `GET /api/v1/rounds/:id` (view round details)
- `POST /api/v1/rounds` (admin: create round)
- `PATCH /api/v1/rounds/:id` (admin: update round)
- `POST /api/v1/rounds/:id/finalize` (admin: finalize round)

### Entries
- `GET /api/v1/rounds/:roundId/entries` (list entries)
- `POST /api/v1/rounds/:roundId/entries` (admin: create entry)
- `PATCH /api/v1/rounds/:roundId/entries/:id` (admin: update entry)
- `DELETE /api/v1/rounds/:roundId/entries/:id` (admin: delete entry)
- `POST /api/v1/rounds/:roundId/entries/:id/reinstate` (admin: clear quarantine)

### Ballots
- `POST /api/v1/rounds/:roundId/ballots` (submit or update ballot)
- `GET /api/v1/rounds/:roundId/ballots/mine` (get caller ballot)

### Leaderboard and Results
- `GET /api/v1/rounds/:roundId/leaderboard` (live cached leaderboard)
- `GET /api/v1/rounds/:roundId/results` (immutable finalized results)

### Telemetry
- `GET /api/v1/rounds/:roundId/telemetry` (moderator+: round telemetry summary)
- `GET /api/v1/rounds/:roundId/telemetry/:entryId` (moderator+: entry telemetry history)
- `GET /api/v1/rounds/:roundId/events` (moderator+: SSE event stream)
