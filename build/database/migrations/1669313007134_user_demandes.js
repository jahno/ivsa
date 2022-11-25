"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = "demande_user";
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");
            table.integer("user_id").unsigned().references("users.id");
            table.integer("demande_id").unsigned().references("demandes.id");
            table.unique(["user_id", "demande_id"]);
            table.string("status");
            table.timestamp("created_at", { useTz: true }).defaultTo(this.now());
            table.timestamp("updated_at", { useTz: true }).defaultTo(this.now());
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1669313007134_user_demandes.js.map