import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import VotingRound from '#models/voting_round'

export default class Entry extends BaseModel {
  static table = 'entries'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare roundId: string

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare submittedBy: string | null

  @column()
  declare isQuarantined: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => VotingRound, { foreignKey: 'roundId' })
  declare votingRound: BelongsTo<typeof VotingRound>

  // assign id
  @beforeCreate()
  static assignUuid(entry: Entry) {
    if (!entry.id) {
      entry.id = randomUUID()
    }
  }
}
