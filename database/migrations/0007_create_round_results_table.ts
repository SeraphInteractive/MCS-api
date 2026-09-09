import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'round_results'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('round_id').notNullable().references('id').inTable('voting_rounds').unique()
      table.integer('total_ballots').notNullable()
      table.integer('total_points').notNullable()
      table.boolean('is_conserved').notNullable()
      table.jsonb('leaderboard').notNullable()
      table.jsonb('separation_results').notNullable().defaultTo('[]')
      table.timestamp('finalized_at').notNullable()
      table.uuid('finalized_by').notNullable().references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
