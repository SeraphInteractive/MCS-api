import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'entries'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('status', 32).notNullable().defaultTo('pending_review')
      table.text('media_url').nullable()
      table.index(['round_id', 'status'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(['round_id', 'status'])
      table.dropColumn('media_url')
      table.dropColumn('status')
    })
  }
}
