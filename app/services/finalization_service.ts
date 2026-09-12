import VotingRound from '#models/voting_round'
import BallotModel from '#models/ballot'
import Entry from '#models/entry'
import RoundResult from '#models/round_result'
import { DateTime } from 'luxon'
import { eventBus } from './event_bus.js'
import {
  aggregate_scores,
  calculate_bayesian_shrinkage,
  evaluate_rank_separation,
  type Ballot as LogicBallot,
  type EntryScoreBreakdown,
} from '@platform/internal-logic'

export class FinalizationService {
  async finalizeRound(roundId: string, userId: string): Promise<RoundResult> {
    // ensure round is ready to be locked in
    const round = await VotingRound.findOrFail(roundId)
    if (round.status !== 'closed') {
      throw new Error('round is not closed')
    }

    const entries = await Entry.query().where('roundId', roundId)
    const ballots = await BallotModel.query().where('roundId', roundId)

    const entryIds = entries.map((e) => e.id)
    const logicBallots: LogicBallot[] = ballots.map((b) => ({
      voterId: b.voterId,
      rank1: b.rank1EntryId,
      rank2: b.rank2EntryId,
      rank3: b.rank3EntryId,
    }))

    // compute final raw scores
    const aggregation = aggregate_scores(entryIds, logicBallots)

    // apply regularized scoring
    const leaderboardData = aggregation.leaderboard
      .map((breakdown) => {
        const shrinkage = calculate_bayesian_shrinkage(breakdown, entryIds.length, aggregation.totalBallots)
        return {
          ...breakdown,
          regularizedMeanScore: shrinkage.regularizedMeanScore,
          regularizedTotalScore: shrinkage.regularizedTotalScore,
        }
      })
      .sort((a, b) => b.regularizedTotalScore - a.regularizedTotalScore)

    // test for statistical ties among the top contenders
    const separationResults = []
    const topCount = Math.min(5, leaderboardData.length)
    for (let i = 0; i < topCount - 1; i++) {
      const breakdownA = leaderboardData[i] as EntryScoreBreakdown
      const breakdownB = leaderboardData[i + 1] as EntryScoreBreakdown
      const separation = evaluate_rank_separation(breakdownA, breakdownB, logicBallots)
      separationResults.push(separation)
    }

    // save the final results record
    const result = await RoundResult.create({
      roundId,
      totalBallots: aggregation.totalBallots,
      totalPoints: aggregation.totalPointsAwarded,
      isConserved: aggregation.isConserved,
      leaderboard: leaderboardData,
      separationResults: separationResults,
      finalizedAt: DateTime.now(),
      finalizedBy: userId,
    })

    // mark round as fully finalized
    round.status = 'finalized'
    await round.save()

    // notify anything listening
    eventBus.emit('round:finalized', {
      roundId,
      resultId: result.id,
    })

    return result
  }

  async finalize(roundId: string, userId: string): Promise<RoundResult> {
    return await this.finalizeRound(roundId, userId)
  }
}

export default FinalizationService
