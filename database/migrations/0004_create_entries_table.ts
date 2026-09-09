import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('round_id').notNullable().references('id').inTable('voting_rounds').onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.text('description').nullable()
      table.string('submitted_by', 255).nullable()
      table.boolean('is_quarantined').notNullable().defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      
      // index for performance
      table.index('round_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
