// test integration with vote internals logic package
import { test } from '@japa/runner'
import {
  validate_ballot,
  aggregate_scores,
  calculate_bayesian_shrinkage,
  analyze_raid_risk,
  evaluate_rank_separation,
} from '@platform/internal-logic'

test.group('Logic Integration', () => {
  test('validates valid 3-2-1 ballot', async ({ assert }) => {
    const validEntries = new Set(['entry-a', 'entry-b', 'entry-c'])
    const ballot = {
      voterId: 'user-1',
      rank1: 'entry-a',
      rank2: 'entry-b',
      rank3: 'entry-c',
    }

    const result = validate_ballot(ballot, validEntries)
    assert.isTrue(result.isValid)
    assert.lengthOf(result.errors, 0)
  })

  test('catches anti stacking in ballot validation', async ({ assert }) => {
    const validEntries = new Set(['entry-a', 'entry-b'])
    const ballot = {
      voterId: 'user-1',
      rank1: 'entry-a',
      rank2: 'entry-a',
      rank3: 'entry-b',
    }

    const result = validate_ballot(ballot, validEntries)
    assert.isFalse(result.isValid)
    assert.isTrue(result.errors.some((e) => e.includes('Anti-stacking')))
  })

  test('aggregates scores and confirms conservation of 6N points', async ({ assert }) => {
    const entryIds = ['entry-a', 'entry-b', 'entry-c']
    const ballots = [
      { voterId: 'u1', rank1: 'entry-a', rank2: 'entry-b', rank3: 'entry-c' },
      { voterId: 'u2', rank1: 'entry-b', rank2: 'entry-a', rank3: 'entry-c' },
    ]

    const res = aggregate_scores(entryIds, ballots)
    assert.equal(res.totalBallots, 2)
    assert.equal(res.totalPointsAwarded, 12)
    assert.isTrue(res.isConserved)

    const entryA = res.scores.get('entry-a')!
    assert.equal(entryA.rawScore, 5) // 3 + 2
  })

  test('calculates bayesian shrinkage regularized scores', async ({ assert }) => {
    const breakdown = {
      entryId: 'entry-1',
      rank1Count: 1,
      rank2Count: 0,
      rank3Count: 0,
      appearanceCount: 1,
      rawScore: 3,
    }

    const shrunk = calculate_bayesian_shrinkage(breakdown, 10, 100)
    assert.isAbove(shrunk.regularizedTotalScore, 0)
    assert.equal(shrunk.priorK, 30)
  })

  test('analyzes raid risk with composite score', async ({ assert }) => {
    const breakdown = {
      entryId: 'entry-raid',
      rank1Count: 50,
      rank2Count: 1,
      rank3Count: 0,
      appearanceCount: 51,
      rawScore: 152,
    }

    const telemetry = analyze_raid_risk(breakdown, 3.5)
    assert.isTrue(telemetry.severity === 'CRITICAL_RAID' || telemetry.severity === 'SUSPICIOUS')
    assert.isAbove(telemetry.compositeScore, 0.4)
  })

  test('evaluates rank separation between two breakdowns', async ({ assert }) => {
    const breakdownA = {
      entryId: 'entry-a',
      rank1Count: 80,
      rank2Count: 10,
      rank3Count: 5,
      appearanceCount: 95,
      rawScore: 265,
    }
    const breakdownB = {
      entryId: 'entry-b',
      rank1Count: 10,
      rank2Count: 10,
      rank3Count: 50,
      appearanceCount: 70,
      rawScore: 100,
    }

    const ballots = [
      ...Array(80).fill(null).map((_, i) => ({ voterId: `vA${i}`, rank1: 'entry-a', rank2: 'entry-b', rank3: 'other' })),
      ...Array(10).fill(null).map((_, i) => ({ voterId: `vB${i}`, rank1: 'entry-b', rank2: 'entry-a', rank3: 'other' })),
    ]

    const sep = evaluate_rank_separation(breakdownA, breakdownB, ballots)
    assert.equal(sep.entryA, 'entry-a')
    assert.equal(sep.entryB, 'entry-b')
    assert.isAbove(sep.zScore, 1.96)
    assert.equal(sep.status, 'DECISIVE_LEAD')
  })
})
