import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'shots'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('round_id').nullable().references('id').inTable('voting_rounds').onDelete('SET NULL')
      table.integer('scene_number').notNullable()
      table.string('shot_code', 50).notNullable().unique()
      table.string('title', 255).notNullable()
      table.text('description').nullable()
      table.string('difficulty_tier', 20).notNullable().defaultTo('easy')
      table.string('status', 20).notNullable().defaultTo('available')
      table.uuid('claimed_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('claimed_at').nullable()
      table.timestamp('deadline_at').nullable()
      table.timestamp('senior_priority_until').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      // indexes for filtering and queries
      table.index('status')
      table.index('claimed_by')
      table.index('difficulty_tier')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
