import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Entry from '#models/entry'
import VotingRound from '#models/voting_round'

export default class RaidTelemetry extends BaseModel {
  static table = 'raid_telemetries'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare entryId: string

  @column()
  declare roundId: string

  @column()
  declare compositeScore: number

  @column()
  declare severity: string

  @column()
  declare skewRatio: number

  @column()
  declare rankEntropy: number

  @column()
  declare velocityZScore: number

  // parse json flags
  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value)
  })
  declare flags: any

  // parse json breakdown
  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value)
  })
  declare breakdown: any

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Entry)
  declare entry: BelongsTo<typeof Entry>

  @belongsTo(() => VotingRound)
  declare votingRound: BelongsTo<typeof VotingRound>

  // get uuid on create
  @beforeCreate()
  static assignUuid(telemetry: RaidTelemetry) {
    if (!telemetry.id) {
      telemetry.id = randomUUID()
    }
  }
}
