import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import VotingRound from '#models/voting_round'
import Submission from '#models/submission'

export default class Shot extends BaseModel {
  static table = 'shots'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare roundId: string | null

  @column()
  declare sceneNumber: number

  @column()
  declare shotCode: string

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare difficultyTier: 'easy' | 'medium' | 'hard' | 'complex'

  @column()
  declare status: 'available' | 'claimed' | 'submitted' | 'approved'

  @column()
  declare claimedBy: string | null

  @column.dateTime()
  declare claimedAt: DateTime | null

  @column.dateTime()
  declare deadlineAt: DateTime | null

  @column.dateTime()
  declare seniorPriorityUntil: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => VotingRound)
  declare round: BelongsTo<typeof VotingRound>

  @belongsTo(() => User, { foreignKey: 'claimedBy' })
  declare claimer: BelongsTo<typeof User>

  @hasMany(() => Submission)
  declare submissions: HasMany<typeof Submission>

  // assign id
  @beforeCreate()
  static assignUuid(shot: Shot) {
    if (!shot.id) {
      shot.id = randomUUID()
    }
  }
}
