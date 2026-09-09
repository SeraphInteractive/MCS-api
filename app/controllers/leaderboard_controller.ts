import { HttpContext } from '@adonisjs/core/http'
import LeaderboardService from '#services/leaderboard_service'
import RoundResult from '#models/round_result'

export default class LeaderboardController {
  async show({ params }: HttpContext) {
    const leaderboardService = new LeaderboardService()
    const leaderboard = await leaderboardService.getLiveLeaderboard(params.roundId)
    
    return { data: leaderboard }
  }

  async finalized({ params }: HttpContext) {
    const result = await RoundResult.findByOrFail('roundId', params.roundId)
    return { data: result }
  }
}
