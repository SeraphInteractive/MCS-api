import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ballots'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('round_id').notNullable().references('id').inTable('voting_rounds').onDelete('CASCADE')
      table.uuid('voter_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('rank1_entry_id').notNullable().references('id').inTable('entries')
      table.uuid('rank2_entry_id').notNullable().references('id').inTable('entries')
      table.uuid('rank3_entry_id').notNullable().references('id').inTable('entries')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      
      // one ballot per round per voter
      table.unique(['voter_id', 'round_id'])
      table.index('round_id')
      table.index('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
