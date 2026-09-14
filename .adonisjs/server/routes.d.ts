import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'health_checks': { paramsTuple?: []; params?: {} }
    'auth.discord.legacy': { paramsTuple?: []; params?: {} }
    'auth.discord.callback.legacy': { paramsTuple?: []; params?: {} }
    'auth.discord.v1': { paramsTuple?: []; params?: {} }
    'auth.discord.callback.v1': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'uploads.store': { paramsTuple?: []; params?: {} }
    'rounds.index': { paramsTuple?: []; params?: {} }
    'rounds.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rounds.store': { paramsTuple?: []; params?: {} }
    'rounds.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rounds.finalize': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'entries.index': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'entries.store': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'entries.update_status': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'id': ParamValue} }
    'entries.update': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'id': ParamValue} }
    'entries.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'id': ParamValue} }
    'entries.reinstate': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'id': ParamValue} }
    'ballots.store': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'ballots.show': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'leaderboard.show': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'leaderboard.finalized': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'telemetry.index': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'telemetry.show': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'entryId': ParamValue} }
    'telemetry.stream': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'shots.index': { paramsTuple?: []; params?: {} }
    'shots.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'shots.claim': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'shots.release': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'shots.upload_url': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'shots.submit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'shots.store': { paramsTuple?: []; params?: {} }
    'shots.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.index': { paramsTuple?: []; params?: {} }
    'reviews.review': { paramsTuple: [ParamValue]; params: {'submissionId': ParamValue} }
    'reviews.promote': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'reviews.sweep_expired': { paramsTuple?: []; params?: {} }
    'shots.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'health_checks': { paramsTuple?: []; params?: {} }
    'auth.discord.legacy': { paramsTuple?: []; params?: {} }
    'auth.discord.callback.legacy': { paramsTuple?: []; params?: {} }
    'auth.discord.v1': { paramsTuple?: []; params?: {} }
    'auth.discord.callback.v1': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'rounds.index': { paramsTuple?: []; params?: {} }
    'rounds.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'entries.index': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'ballots.show': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'leaderboard.show': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'leaderboard.finalized': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'telemetry.index': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'telemetry.show': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'entryId': ParamValue} }
    'telemetry.stream': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'shots.index': { paramsTuple?: []; params?: {} }
    'shots.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'health_checks': { paramsTuple?: []; params?: {} }
    'auth.discord.legacy': { paramsTuple?: []; params?: {} }
    'auth.discord.callback.legacy': { paramsTuple?: []; params?: {} }
    'auth.discord.v1': { paramsTuple?: []; params?: {} }
    'auth.discord.callback.v1': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'rounds.index': { paramsTuple?: []; params?: {} }
    'rounds.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'entries.index': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'ballots.show': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'leaderboard.show': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'leaderboard.finalized': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'telemetry.index': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'telemetry.show': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'entryId': ParamValue} }
    'telemetry.stream': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'shots.index': { paramsTuple?: []; params?: {} }
    'shots.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.index': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'auth.logout': { paramsTuple?: []; params?: {} }
    'entries.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'id': ParamValue} }
    'shots.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'uploads.store': { paramsTuple?: []; params?: {} }
    'rounds.store': { paramsTuple?: []; params?: {} }
    'rounds.finalize': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'entries.store': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'entries.reinstate': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'id': ParamValue} }
    'ballots.store': { paramsTuple: [ParamValue]; params: {'roundId': ParamValue} }
    'shots.claim': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'shots.release': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'shots.upload_url': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'shots.submit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'shots.store': { paramsTuple?: []; params?: {} }
    'reviews.review': { paramsTuple: [ParamValue]; params: {'submissionId': ParamValue} }
    'reviews.promote': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'reviews.sweep_expired': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'rounds.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'entries.update_status': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'id': ParamValue} }
    'entries.update': { paramsTuple: [ParamValue,ParamValue]; params: {'roundId': ParamValue,'id': ParamValue} }
    'shots.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}