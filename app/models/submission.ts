import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Shot from '#models/shot'

export default class Submission extends BaseModel {
  static table = 'submissions'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare shotId: string

  @column()
  declare contributorId: string

  @column()
  declare version: number

  @column()
  declare videoUrl: string

  @column()
  declare blendUrl: string | null

  @column()
  declare notes: string | null

  @column()
  declare status: 'pending_review' | 'revision_requested' | 'approved'

  @column()
  declare supervisorNotes: string | null

  @column()
  declare reviewedBy: string | null

  @column.dateTime()
  declare reviewedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Shot)
  declare shot: BelongsTo<typeof Shot>

  @belongsTo(() => User, { foreignKey: 'contributorId' })
  declare contributor: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'reviewedBy' })
  declare reviewer: BelongsTo<typeof User>

  // assign id
  @beforeCreate()
  static assignUuid(submission: Submission) {
    if (!submission.id) {
      submission.id = randomUUID()
    }
  }
}
