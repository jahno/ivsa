import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "demandes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table
        .integer("user_id_demande")
        .unsigned()
        .references("id")
        .inTable("users");

      table
        .integer("user_id_receive")
        .unsigned()
        .references("id")
        .inTable("users");

      table
        .enum("etat", ["en_cours", "accepter", "refuser"])
        .defaultTo("en_cours");
      table.timestamp("created_at", { useTz: true }).defaultTo(this.now());
      table.timestamp("updated_at", { useTz: true }).defaultTo(this.now());
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
