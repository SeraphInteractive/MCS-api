import redis from '@adonisjs/redis/services/main'
import BallotModel from '#models/ballot'
import Entry from '#models/entry'
import { aggregate_scores, calculate_bayesian_shrinkage, type Ballot as LogicBallot } from '@vote-internals/logic'

export class LeaderboardService {
  async computeLeaderboard(roundId: string): Promise<{ leaderboard: any[]; totalBallots: number; isConserved: boolean }> {
    const cacheKey = `leaderboard:${roundId}`
    const cached = await redis.get(cacheKey)

    // serve from cache if we have it
    if (cached) {
      return JSON.parse(cached)
    }

    // load up entries and ballots for this round
    const entries = await Entry.query().where('roundId', roundId)
    const ballots = await BallotModel.query().where('roundId', roundId)

    const entryIds = entries.map((e) => e.id)
    const quarantinedIds = new Set(entries.filter((e) => e.isQuarantined).map((e) => e.id))

    // map to logic formats
    const logicBallots: LogicBallot[] = ballots.map((b) => ({
      voterId: b.voterId,
      rank1: b.rank1EntryId,
      rank2: b.rank2EntryId,
      rank3: b.rank3EntryId,
    }))

    // do the math
    const aggregation = aggregate_scores(entryIds, logicBallots)

    // build leaderboard and calculate regularized scores
    const leaderboardData = aggregation.leaderboard
      .filter((breakdown) => !quarantinedIds.has(breakdown.entryId)) // drop quarantined ones
      .map((breakdown) => {
        const shrinkage = calculate_bayesian_shrinkage(breakdown, entryIds.length, aggregation.totalBallots)
        return {
          ...breakdown,
          regularizedMeanScore: shrinkage.regularizedMeanScore,
          regularizedTotalScore: shrinkage.regularizedTotalScore,
        }
      })
      .sort((a, b) => b.regularizedTotalScore - a.regularizedTotalScore) // top scores first

    const result = {
      leaderboard: leaderboardData,
      totalBallots: aggregation.totalBallots,
      isConserved: aggregation.isConserved,
    }

    // save to redis for next time
    await redis.setex(cacheKey, 10, JSON.stringify(result))

    return result
  }

  async getLiveLeaderboard(roundId: string) {
    return await this.computeLeaderboard(roundId)
  }
}

export default LeaderboardService
