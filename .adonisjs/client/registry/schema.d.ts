/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'health_checks': {
    methods: ["GET","HEAD"]
    pattern: '/health'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/health_checks_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/health_checks_controller').default['handle']>>>
    }
  }
  'auth.discord.legacy': {
    methods: ["GET","HEAD"]
    pattern: '/api/auth/discord'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['redirect']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['redirect']>>>
    }
  }
  'auth.discord.callback.legacy': {
    methods: ["GET","HEAD"]
    pattern: '/api/auth/discord/callback'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['callback']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['callback']>>>
    }
  }
  'auth.discord.v1': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/discord'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['redirect']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['redirect']>>>
    }
  }
  'auth.discord.callback.v1': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/discord/callback'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['callback']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['callback']>>>
    }
  }
  'auth.me': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['me']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['me']>>>
    }
  }
  'auth.logout': {
    methods: ["DELETE"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
    }
  }
  'uploads.store': {
    methods: ["POST"]
    pattern: '/api/v1/uploads'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/uploads_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/uploads_controller').default['store']>>>
    }
  }
  'rounds.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rounds'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rounds_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rounds_controller').default['index']>>>
    }
  }
  'rounds.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rounds/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rounds_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rounds_controller').default['show']>>>
    }
  }
  'rounds.store': {
    methods: ["POST"]
    pattern: '/api/v1/rounds'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/round_validator').createRoundValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/round_validator').createRoundValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rounds_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rounds_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'rounds.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/rounds/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/round_validator').updateRoundValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/round_validator').updateRoundValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rounds_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rounds_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'rounds.finalize': {
    methods: ["POST"]
    pattern: '/api/v1/rounds/:id/finalize'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rounds_controller').default['finalize']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rounds_controller').default['finalize']>>>
    }
  }
  'entries.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rounds/:roundId/entries'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { roundId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['index']>>>
    }
  }
  'entries.store': {
    methods: ["POST"]
    pattern: '/api/v1/rounds/:roundId/entries'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/entry_validator').createEntryValidator)>>
      paramsTuple: [ParamValue]
      params: { roundId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/entry_validator').createEntryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'entries.update_status': {
    methods: ["PATCH"]
    pattern: '/api/v1/rounds/:roundId/entries/:id/status'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/entry_validator').updateEntryStatusValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { roundId: ParamValue; id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/entry_validator').updateEntryStatusValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['updateStatus']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['updateStatus']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'entries.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/rounds/:roundId/entries/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/entry_validator').updateEntryValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { roundId: ParamValue; id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/entry_validator').updateEntryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'entries.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/rounds/:roundId/entries/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { roundId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['destroy']>>>
    }
  }
  'entries.reinstate': {
    methods: ["POST"]
    pattern: '/api/v1/rounds/:roundId/entries/:id/reinstate'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { roundId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['reinstate']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['reinstate']>>>
    }
  }
  'ballots.store': {
    methods: ["POST"]
    pattern: '/api/v1/rounds/:roundId/ballots'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/ballot_validator').createBallotValidator)>>
      paramsTuple: [ParamValue]
      params: { roundId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/ballot_validator').createBallotValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ballots_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ballots_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'ballots.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rounds/:roundId/ballots/mine'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { roundId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ballots_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ballots_controller').default['show']>>>
    }
  }
  'leaderboard.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rounds/:roundId/leaderboard'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { roundId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/leaderboard_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/leaderboard_controller').default['show']>>>
    }
  }
  'leaderboard.finalized': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rounds/:roundId/results'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { roundId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/leaderboard_controller').default['finalized']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/leaderboard_controller').default['finalized']>>>
    }
  }
  'telemetry.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rounds/:roundId/telemetry'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { roundId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/telemetry_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/telemetry_controller').default['index']>>>
    }
  }
  'telemetry.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rounds/:roundId/telemetry/:entryId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { roundId: ParamValue; entryId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/telemetry_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/telemetry_controller').default['show']>>>
    }
  }
  'telemetry.stream': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rounds/:roundId/events'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { roundId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/telemetry_controller').default['stream']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/telemetry_controller').default['stream']>>>
    }
  }
  'shots.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/shots'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['index']>>>
    }
  }
  'shots.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/shots/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['show']>>>
    }
  }
  'shots.claim': {
    methods: ["POST"]
    pattern: '/api/v1/shots/:id/claim'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['claim']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['claim']>>>
    }
  }
  'shots.release': {
    methods: ["POST"]
    pattern: '/api/v1/shots/:id/release'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['release']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['release']>>>
    }
  }
  'shots.upload_url': {
    methods: ["POST"]
    pattern: '/api/v1/shots/:id/upload-url'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/shot_validator').getUploadUrlValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/shot_validator').getUploadUrlValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['uploadUrl']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['uploadUrl']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'shots.submit': {
    methods: ["POST"]
    pattern: '/api/v1/shots/:id/submit'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/shot_validator').submitWorkValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/shot_validator').submitWorkValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['submit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['submit']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'shots.store': {
    methods: ["POST"]
    pattern: '/api/v1/shots'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/shot_validator').createShotValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/shot_validator').createShotValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'shots.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/shots/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/shot_validator').updateShotValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/shot_validator').updateShotValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reviews.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/reviews'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['index']>>>
    }
  }
  'reviews.review': {
    methods: ["POST"]
    pattern: '/api/v1/reviews/:submissionId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/shot_validator').reviewDecisionValidator)>>
      paramsTuple: [ParamValue]
      params: { submissionId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/shot_validator').reviewDecisionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['review']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['review']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reviews.promote': {
    methods: ["POST"]
    pattern: '/api/v1/supervisors/promote/:userId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { userId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['promote']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['promote']>>>
    }
  }
  'reviews.sweep_expired': {
    methods: ["POST"]
    pattern: '/api/v1/shots/reclaim-expired'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['sweepExpired']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['sweepExpired']>>>
    }
  }
  'shots.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/shots/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/shots_controller').default['destroy']>>>
    }
  }
}
