"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const etat_1 = global[Symbol.for('ioc.use')]("App/Helpers/etat");
class ActionDemandeValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            id_demande: Validator_1.schema.number(),
            action: Validator_1.schema.enum([etat_1.Etat.ACCEPTED, etat_1.Etat.REFUSER]),
        });
        this.messages = {};
    }
}
exports.default = ActionDemandeValidator;
//# sourceMappingURL=ActionDemandeValidator.js.map