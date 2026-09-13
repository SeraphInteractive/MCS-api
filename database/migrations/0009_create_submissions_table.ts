import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'submissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('shot_id').notNullable().references('id').inTable('shots').onDelete('CASCADE')
      table.uuid('contributor_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('version').notNullable().defaultTo(1)
      table.text('video_url').notNullable()
      table.text('blend_url').nullable()
      table.text('notes').nullable()
      table.string('status', 20).notNullable().defaultTo('pending_review')
      table.text('supervisor_notes').nullable()
      table.uuid('reviewed_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('reviewed_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      // indexes for review queue lookups
      table.index('shot_id')
      table.index('contributor_id')
      table.index('status')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
