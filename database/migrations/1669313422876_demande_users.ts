import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "demande_user";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enum("etat", ["en_cours", "accepter", "refuser"])
        .defaultTo("en_cours");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
