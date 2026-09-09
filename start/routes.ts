import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const RoundsController = () => import('#controllers/rounds_controller')
const EntriesController = () => import('#controllers/entries_controller')
const BallotsController = () => import('#controllers/ballots_controller')
const LeaderboardController = () => import('#controllers/leaderboard_controller')
const TelemetryController = () => import('#controllers/telemetry_controller')

router.get('/', () => { return { status: 'ok', service: 'mcs-voting-api', version: 'v1' } })

router.group(() => {
  // auth routes (no auth required for callback)
  router.get('auth/discord/callback', [AuthController, 'callback'])

  // authenticated routes
  router.group(() => {
    // user profile
    router.get('auth/me', [AuthController, 'me'])
    router.delete('auth/logout', [AuthController, 'logout'])

    // rounds (anyone can list/view)
    router.get('rounds', [RoundsController, 'index'])
    router.get('rounds/:id', [RoundsController, 'show'])

    // rounds (admin only)
    router.group(() => {
      router.post('rounds', [RoundsController, 'store'])
      router.patch('rounds/:id', [RoundsController, 'update'])
      router.post('rounds/:id/finalize', [RoundsController, 'finalize'])
    }).use(middleware.role({ roles: ['admin'] }))

    // entries (anyone can list)
    router.get('rounds/:roundId/entries', [EntriesController, 'index'])

    // entries (admin only)
    router.group(() => {
      router.post('rounds/:roundId/entries', [EntriesController, 'store'])
      router.patch('rounds/:roundId/entries/:id', [EntriesController, 'update'])
      router.delete('rounds/:roundId/entries/:id', [EntriesController, 'destroy'])
      router.post('rounds/:roundId/entries/:id/reinstate', [EntriesController, 'reinstate'])
    }).use(middleware.role({ roles: ['admin'] }))

    // ballots (any authenticated user)
    router.post('rounds/:roundId/ballots', [BallotsController, 'store'])
    router.get('rounds/:roundId/ballots/mine', [BallotsController, 'show'])

    // leaderboard (anyone can view)
    router.get('rounds/:roundId/leaderboard', [LeaderboardController, 'show'])
    router.get('rounds/:roundId/results', [LeaderboardController, 'finalized'])

    // telemetry (moderator+)
    router.group(() => {
      router.get('rounds/:roundId/telemetry', [TelemetryController, 'index'])
      router.get('rounds/:roundId/telemetry/:entryId', [TelemetryController, 'show'])
      router.get('rounds/:roundId/events', [TelemetryController, 'stream'])
    }).use(middleware.role({ roles: ['moderator'] }))

  }).use(middleware.auth())
}).prefix('/api/v1')
