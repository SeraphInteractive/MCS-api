import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Entry from '#models/entry'
import VotingRound from '#models/voting_round'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Ensure active round exists
    let round = await VotingRound.query().where('id', 'round-01').first()
    if (!round) {
      let admin = await User.first()
      if (!admin) {
        admin = await User.create({
          discordId: '000000000000000000',
          discordUsername: 'system_admin',
          role: 'admin',
        })
      }
      round = await VotingRound.create({
        id: 'round-01',
        title: 'Round 1: Narrative & Scene Concepts',
        status: 'OPEN',
        createdBy: admin.id,
      })
    }

    // Remove existing entries
    await Entry.query().where('roundId', round.id).delete()

    // Create 6 test entries
    await Entry.createMany([
      {
        id: 'entry-001',
        roundId: round.id,
        title: 'Test Entry 1',
        description: 'First test scene proposal exploring the narrative arc.',
        status: 'approved',
        submittedBy: 'Creator1',
        isQuarantined: false
      },
      {
        id: 'entry-002',
        roundId: round.id,
        title: 'Test Entry 2',
        description: 'Second test scene proposal with visual reference benchmarking.',
        status: 'approved',
        submittedBy: 'Creator2',
        isQuarantined: false
      },
      {
        id: 'entry-003',
        roundId: round.id,
        title: 'Test Entry 3',
        description: 'Third test scene proposal featuring custom modular set design.',
        status: 'approved',
        submittedBy: 'Creator3',
        isQuarantined: false
      },
      {
        id: 'entry-004',
        roundId: round.id,
        title: 'Test Entry 4',
        description: 'Fourth test audition concept with lossless dialogue sample.',
        status: 'approved',
        submittedBy: 'Creator4',
        isQuarantined: false
      },
      {
        id: 'entry-005',
        roundId: round.id,
        title: 'Test Entry 5',
        description: 'Fifth test shot breakdown with 3D camera path coordinates.',
        status: 'approved',
        submittedBy: 'Creator5',
        isQuarantined: false
      },
      {
        id: 'entry-006',
        roundId: round.id,
        title: 'Test Entry 6',
        description: 'Sixth test climax sequence featuring cinematic lighting.',
        status: 'approved',
        submittedBy: 'Creator6',
        isQuarantined: false
      }
    ])
  }
}
