import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'raid_telemetries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('entry_id').notNullable().references('id').inTable('entries').onDelete('CASCADE')
      table.uuid('round_id').notNullable().references('id').inTable('voting_rounds').onDelete('CASCADE')
      table.decimal('composite_score', 5, 4).notNullable()
      table.string('severity', 20).notNullable()
      table.decimal('skew_ratio', 8, 4).notNullable()
      table.decimal('rank_entropy', 5, 4).notNullable()
      table.decimal('velocity_z_score', 8, 4).notNullable()
      table.jsonb('flags').notNullable().defaultTo('[]')
      table.jsonb('breakdown').notNullable().defaultTo('{}')
      table.timestamp('created_at').notNullable()
      
      // index for lookups
      table.index(['entry_id', 'round_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
