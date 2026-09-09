import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // using gen_random_uuid for pg
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.string('discord_id', 20).notNullable().unique()
      table.string('discord_username', 255).notNullable()
      table.string('discord_avatar', 255).nullable()
      // role enum
      table.enum('role', ['voter', 'moderator', 'admin']).notNullable().defaultTo('voter')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
