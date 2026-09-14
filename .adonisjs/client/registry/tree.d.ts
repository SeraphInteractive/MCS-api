/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  healthChecks: typeof routes['health_checks']
  auth: {
    discord: {
      legacy: typeof routes['auth.discord.legacy']
      callback: {
        legacy: typeof routes['auth.discord.callback.legacy']
        v1: typeof routes['auth.discord.callback.v1']
      }
      v1: typeof routes['auth.discord.v1']
    }
    me: typeof routes['auth.me']
    logout: typeof routes['auth.logout']
  }
  uploads: {
    store: typeof routes['uploads.store']
  }
  rounds: {
    index: typeof routes['rounds.index']
    show: typeof routes['rounds.show']
    store: typeof routes['rounds.store']
    update: typeof routes['rounds.update']
    finalize: typeof routes['rounds.finalize']
  }
  entries: {
    index: typeof routes['entries.index']
    store: typeof routes['entries.store']
    updateStatus: typeof routes['entries.update_status']
    update: typeof routes['entries.update']
    destroy: typeof routes['entries.destroy']
    reinstate: typeof routes['entries.reinstate']
  }
  ballots: {
    store: typeof routes['ballots.store']
    show: typeof routes['ballots.show']
  }
  leaderboard: {
    show: typeof routes['leaderboard.show']
    finalized: typeof routes['leaderboard.finalized']
  }
  telemetry: {
    index: typeof routes['telemetry.index']
    show: typeof routes['telemetry.show']
    stream: typeof routes['telemetry.stream']
  }
  shots: {
    index: typeof routes['shots.index']
    show: typeof routes['shots.show']
    claim: typeof routes['shots.claim']
    release: typeof routes['shots.release']
    uploadUrl: typeof routes['shots.upload_url']
    submit: typeof routes['shots.submit']
    store: typeof routes['shots.store']
    update: typeof routes['shots.update']
    destroy: typeof routes['shots.destroy']
  }
  reviews: {
    index: typeof routes['reviews.index']
    review: typeof routes['reviews.review']
    promote: typeof routes['reviews.promote']
    sweepExpired: typeof routes['reviews.sweep_expired']
  }
}
