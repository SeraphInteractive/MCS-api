/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'health_checks': {
    methods: ["GET","HEAD"],
    pattern: '/health',
    tokens: [{"old":"/health","type":0,"val":"health","end":""}],
    types: placeholder as Registry['health_checks']['types'],
  },
  'auth.discord.legacy': {
    methods: ["GET","HEAD"],
    pattern: '/api/auth/discord',
    tokens: [{"old":"/api/auth/discord","type":0,"val":"api","end":""},{"old":"/api/auth/discord","type":0,"val":"auth","end":""},{"old":"/api/auth/discord","type":0,"val":"discord","end":""}],
    types: placeholder as Registry['auth.discord.legacy']['types'],
  },
  'auth.discord.callback.legacy': {
    methods: ["GET","HEAD"],
    pattern: '/api/auth/discord/callback',
    tokens: [{"old":"/api/auth/discord/callback","type":0,"val":"api","end":""},{"old":"/api/auth/discord/callback","type":0,"val":"auth","end":""},{"old":"/api/auth/discord/callback","type":0,"val":"discord","end":""},{"old":"/api/auth/discord/callback","type":0,"val":"callback","end":""}],
    types: placeholder as Registry['auth.discord.callback.legacy']['types'],
  },
  'auth.discord.v1': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/discord',
    tokens: [{"old":"/api/v1/auth/discord","type":0,"val":"api","end":""},{"old":"/api/v1/auth/discord","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/discord","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/discord","type":0,"val":"discord","end":""}],
    types: placeholder as Registry['auth.discord.v1']['types'],
  },
  'auth.discord.callback.v1': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/discord/callback',
    tokens: [{"old":"/api/v1/auth/discord/callback","type":0,"val":"api","end":""},{"old":"/api/v1/auth/discord/callback","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/discord/callback","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/discord/callback","type":0,"val":"discord","end":""},{"old":"/api/v1/auth/discord/callback","type":0,"val":"callback","end":""}],
    types: placeholder as Registry['auth.discord.callback.v1']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/me',
    tokens: [{"old":"/api/v1/auth/me","type":0,"val":"api","end":""},{"old":"/api/v1/auth/me","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/me","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'auth.logout': {
    methods: ["DELETE"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'uploads.store': {
    methods: ["POST"],
    pattern: '/api/v1/uploads',
    tokens: [{"old":"/api/v1/uploads","type":0,"val":"api","end":""},{"old":"/api/v1/uploads","type":0,"val":"v1","end":""},{"old":"/api/v1/uploads","type":0,"val":"uploads","end":""}],
    types: placeholder as Registry['uploads.store']['types'],
  },
  'rounds.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rounds',
    tokens: [{"old":"/api/v1/rounds","type":0,"val":"api","end":""},{"old":"/api/v1/rounds","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds","type":0,"val":"rounds","end":""}],
    types: placeholder as Registry['rounds.index']['types'],
  },
  'rounds.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rounds/:id',
    tokens: [{"old":"/api/v1/rounds/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:id","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['rounds.show']['types'],
  },
  'rounds.store': {
    methods: ["POST"],
    pattern: '/api/v1/rounds',
    tokens: [{"old":"/api/v1/rounds","type":0,"val":"api","end":""},{"old":"/api/v1/rounds","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds","type":0,"val":"rounds","end":""}],
    types: placeholder as Registry['rounds.store']['types'],
  },
  'rounds.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/rounds/:id',
    tokens: [{"old":"/api/v1/rounds/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:id","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['rounds.update']['types'],
  },
  'rounds.finalize': {
    methods: ["POST"],
    pattern: '/api/v1/rounds/:id/finalize',
    tokens: [{"old":"/api/v1/rounds/:id/finalize","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:id/finalize","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:id/finalize","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:id/finalize","type":1,"val":"id","end":""},{"old":"/api/v1/rounds/:id/finalize","type":0,"val":"finalize","end":""}],
    types: placeholder as Registry['rounds.finalize']['types'],
  },
  'entries.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rounds/:roundId/entries',
    tokens: [{"old":"/api/v1/rounds/:roundId/entries","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/entries","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/entries","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/entries","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/entries","type":0,"val":"entries","end":""}],
    types: placeholder as Registry['entries.index']['types'],
  },
  'entries.store': {
    methods: ["POST"],
    pattern: '/api/v1/rounds/:roundId/entries',
    tokens: [{"old":"/api/v1/rounds/:roundId/entries","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/entries","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/entries","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/entries","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/entries","type":0,"val":"entries","end":""}],
    types: placeholder as Registry['entries.store']['types'],
  },
  'entries.update_status': {
    methods: ["PATCH"],
    pattern: '/api/v1/rounds/:roundId/entries/:id/status',
    tokens: [{"old":"/api/v1/rounds/:roundId/entries/:id/status","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/status","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/status","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/status","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/status","type":0,"val":"entries","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/status","type":1,"val":"id","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['entries.update_status']['types'],
  },
  'entries.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/rounds/:roundId/entries/:id',
    tokens: [{"old":"/api/v1/rounds/:roundId/entries/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id","type":0,"val":"entries","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['entries.update']['types'],
  },
  'entries.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/rounds/:roundId/entries/:id',
    tokens: [{"old":"/api/v1/rounds/:roundId/entries/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id","type":0,"val":"entries","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['entries.destroy']['types'],
  },
  'entries.reinstate': {
    methods: ["POST"],
    pattern: '/api/v1/rounds/:roundId/entries/:id/reinstate',
    tokens: [{"old":"/api/v1/rounds/:roundId/entries/:id/reinstate","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/reinstate","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/reinstate","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/reinstate","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/reinstate","type":0,"val":"entries","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/reinstate","type":1,"val":"id","end":""},{"old":"/api/v1/rounds/:roundId/entries/:id/reinstate","type":0,"val":"reinstate","end":""}],
    types: placeholder as Registry['entries.reinstate']['types'],
  },
  'ballots.store': {
    methods: ["POST"],
    pattern: '/api/v1/rounds/:roundId/ballots',
    tokens: [{"old":"/api/v1/rounds/:roundId/ballots","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/ballots","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/ballots","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/ballots","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/ballots","type":0,"val":"ballots","end":""}],
    types: placeholder as Registry['ballots.store']['types'],
  },
  'ballots.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rounds/:roundId/ballots/mine',
    tokens: [{"old":"/api/v1/rounds/:roundId/ballots/mine","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/ballots/mine","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/ballots/mine","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/ballots/mine","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/ballots/mine","type":0,"val":"ballots","end":""},{"old":"/api/v1/rounds/:roundId/ballots/mine","type":0,"val":"mine","end":""}],
    types: placeholder as Registry['ballots.show']['types'],
  },
  'leaderboard.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rounds/:roundId/leaderboard',
    tokens: [{"old":"/api/v1/rounds/:roundId/leaderboard","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/leaderboard","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/leaderboard","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/leaderboard","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/leaderboard","type":0,"val":"leaderboard","end":""}],
    types: placeholder as Registry['leaderboard.show']['types'],
  },
  'leaderboard.finalized': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rounds/:roundId/results',
    tokens: [{"old":"/api/v1/rounds/:roundId/results","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/results","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/results","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/results","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/results","type":0,"val":"results","end":""}],
    types: placeholder as Registry['leaderboard.finalized']['types'],
  },
  'telemetry.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rounds/:roundId/telemetry',
    tokens: [{"old":"/api/v1/rounds/:roundId/telemetry","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/telemetry","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/telemetry","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/telemetry","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/telemetry","type":0,"val":"telemetry","end":""}],
    types: placeholder as Registry['telemetry.index']['types'],
  },
  'telemetry.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rounds/:roundId/telemetry/:entryId',
    tokens: [{"old":"/api/v1/rounds/:roundId/telemetry/:entryId","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/telemetry/:entryId","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/telemetry/:entryId","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/telemetry/:entryId","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/telemetry/:entryId","type":0,"val":"telemetry","end":""},{"old":"/api/v1/rounds/:roundId/telemetry/:entryId","type":1,"val":"entryId","end":""}],
    types: placeholder as Registry['telemetry.show']['types'],
  },
  'telemetry.stream': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rounds/:roundId/events',
    tokens: [{"old":"/api/v1/rounds/:roundId/events","type":0,"val":"api","end":""},{"old":"/api/v1/rounds/:roundId/events","type":0,"val":"v1","end":""},{"old":"/api/v1/rounds/:roundId/events","type":0,"val":"rounds","end":""},{"old":"/api/v1/rounds/:roundId/events","type":1,"val":"roundId","end":""},{"old":"/api/v1/rounds/:roundId/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['telemetry.stream']['types'],
  },
  'shots.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/shots',
    tokens: [{"old":"/api/v1/shots","type":0,"val":"api","end":""},{"old":"/api/v1/shots","type":0,"val":"v1","end":""},{"old":"/api/v1/shots","type":0,"val":"shots","end":""}],
    types: placeholder as Registry['shots.index']['types'],
  },
  'shots.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/shots/:id',
    tokens: [{"old":"/api/v1/shots/:id","type":0,"val":"api","end":""},{"old":"/api/v1/shots/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/shots/:id","type":0,"val":"shots","end":""},{"old":"/api/v1/shots/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['shots.show']['types'],
  },
  'shots.claim': {
    methods: ["POST"],
    pattern: '/api/v1/shots/:id/claim',
    tokens: [{"old":"/api/v1/shots/:id/claim","type":0,"val":"api","end":""},{"old":"/api/v1/shots/:id/claim","type":0,"val":"v1","end":""},{"old":"/api/v1/shots/:id/claim","type":0,"val":"shots","end":""},{"old":"/api/v1/shots/:id/claim","type":1,"val":"id","end":""},{"old":"/api/v1/shots/:id/claim","type":0,"val":"claim","end":""}],
    types: placeholder as Registry['shots.claim']['types'],
  },
  'shots.release': {
    methods: ["POST"],
    pattern: '/api/v1/shots/:id/release',
    tokens: [{"old":"/api/v1/shots/:id/release","type":0,"val":"api","end":""},{"old":"/api/v1/shots/:id/release","type":0,"val":"v1","end":""},{"old":"/api/v1/shots/:id/release","type":0,"val":"shots","end":""},{"old":"/api/v1/shots/:id/release","type":1,"val":"id","end":""},{"old":"/api/v1/shots/:id/release","type":0,"val":"release","end":""}],
    types: placeholder as Registry['shots.release']['types'],
  },
  'shots.upload_url': {
    methods: ["POST"],
    pattern: '/api/v1/shots/:id/upload-url',
    tokens: [{"old":"/api/v1/shots/:id/upload-url","type":0,"val":"api","end":""},{"old":"/api/v1/shots/:id/upload-url","type":0,"val":"v1","end":""},{"old":"/api/v1/shots/:id/upload-url","type":0,"val":"shots","end":""},{"old":"/api/v1/shots/:id/upload-url","type":1,"val":"id","end":""},{"old":"/api/v1/shots/:id/upload-url","type":0,"val":"upload-url","end":""}],
    types: placeholder as Registry['shots.upload_url']['types'],
  },
  'shots.submit': {
    methods: ["POST"],
    pattern: '/api/v1/shots/:id/submit',
    tokens: [{"old":"/api/v1/shots/:id/submit","type":0,"val":"api","end":""},{"old":"/api/v1/shots/:id/submit","type":0,"val":"v1","end":""},{"old":"/api/v1/shots/:id/submit","type":0,"val":"shots","end":""},{"old":"/api/v1/shots/:id/submit","type":1,"val":"id","end":""},{"old":"/api/v1/shots/:id/submit","type":0,"val":"submit","end":""}],
    types: placeholder as Registry['shots.submit']['types'],
  },
  'shots.store': {
    methods: ["POST"],
    pattern: '/api/v1/shots',
    tokens: [{"old":"/api/v1/shots","type":0,"val":"api","end":""},{"old":"/api/v1/shots","type":0,"val":"v1","end":""},{"old":"/api/v1/shots","type":0,"val":"shots","end":""}],
    types: placeholder as Registry['shots.store']['types'],
  },
  'shots.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/shots/:id',
    tokens: [{"old":"/api/v1/shots/:id","type":0,"val":"api","end":""},{"old":"/api/v1/shots/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/shots/:id","type":0,"val":"shots","end":""},{"old":"/api/v1/shots/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['shots.update']['types'],
  },
  'reviews.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/reviews',
    tokens: [{"old":"/api/v1/reviews","type":0,"val":"api","end":""},{"old":"/api/v1/reviews","type":0,"val":"v1","end":""},{"old":"/api/v1/reviews","type":0,"val":"reviews","end":""}],
    types: placeholder as Registry['reviews.index']['types'],
  },
  'reviews.review': {
    methods: ["POST"],
    pattern: '/api/v1/reviews/:submissionId',
    tokens: [{"old":"/api/v1/reviews/:submissionId","type":0,"val":"api","end":""},{"old":"/api/v1/reviews/:submissionId","type":0,"val":"v1","end":""},{"old":"/api/v1/reviews/:submissionId","type":0,"val":"reviews","end":""},{"old":"/api/v1/reviews/:submissionId","type":1,"val":"submissionId","end":""}],
    types: placeholder as Registry['reviews.review']['types'],
  },
  'reviews.promote': {
    methods: ["POST"],
    pattern: '/api/v1/supervisors/promote/:userId',
    tokens: [{"old":"/api/v1/supervisors/promote/:userId","type":0,"val":"api","end":""},{"old":"/api/v1/supervisors/promote/:userId","type":0,"val":"v1","end":""},{"old":"/api/v1/supervisors/promote/:userId","type":0,"val":"supervisors","end":""},{"old":"/api/v1/supervisors/promote/:userId","type":0,"val":"promote","end":""},{"old":"/api/v1/supervisors/promote/:userId","type":1,"val":"userId","end":""}],
    types: placeholder as Registry['reviews.promote']['types'],
  },
  'reviews.sweep_expired': {
    methods: ["POST"],
    pattern: '/api/v1/shots/reclaim-expired',
    tokens: [{"old":"/api/v1/shots/reclaim-expired","type":0,"val":"api","end":""},{"old":"/api/v1/shots/reclaim-expired","type":0,"val":"v1","end":""},{"old":"/api/v1/shots/reclaim-expired","type":0,"val":"shots","end":""},{"old":"/api/v1/shots/reclaim-expired","type":0,"val":"reclaim-expired","end":""}],
    types: placeholder as Registry['reviews.sweep_expired']['types'],
  },
  'shots.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/shots/:id',
    tokens: [{"old":"/api/v1/shots/:id","type":0,"val":"api","end":""},{"old":"/api/v1/shots/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/shots/:id","type":0,"val":"shots","end":""},{"old":"/api/v1/shots/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['shots.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
