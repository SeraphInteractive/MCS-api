import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { randomUUID } from 'node:crypto'
import VotingRound from '#models/voting_round'
import Ballot from '#models/ballot'
import type { AccessToken } from '@adonisjs/auth/access_tokens'

export default class User extends BaseModel {
  static table = 'users'

  // setup auth tokens provider
  static accessTokens = DbAccessTokensProvider.forModel(User)
  
  declare currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare discordId: string

  @column()
  declare discordUsername: string

  @column()
  declare discordAvatar: string | null

  @column()
  declare role: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => VotingRound, { foreignKey: 'createdBy' })
  declare votingRounds: HasMany<typeof VotingRound>

  @hasMany(() => Ballot, { foreignKey: 'voterId' })
  declare ballots: HasMany<typeof Ballot>

  // generate uuid before creating
  @beforeCreate()
  static assignUuid(user: User) {
    if (!user.id) {
      user.id = randomUUID()
    }
  }
}
