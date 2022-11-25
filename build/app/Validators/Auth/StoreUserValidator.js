"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreUserValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.email(),
                Validator_1.rules.unique({ table: "users", column: "email " }),
            ]),
            nom: Validator_1.schema.string({ trim: true }),
            numero: Validator_1.schema.string(),
            image: Validator_1.schema.file({
                size: "2mb",
                extnames: ["jpg", "png", "gif", "jpeg"],
            }),
            description: Validator_1.schema.string(),
            ecole: Validator_1.schema.string(),
            password: Validator_1.schema.string(),
        });
        this.messages = {};
    }
}
exports.default = StoreUserValidator;
//# sourceMappingURL=StoreUserValidator.js.map