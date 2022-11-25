"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bumblebee_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Bumblebee");
class UserTransformer extends Bumblebee_1.TransformerAbstract {
    transform(model) {
        console.log(model);
        return {
            id: model.id,
            name: model.user,
        };
    }
}
exports.default = UserTransformer;
//# sourceMappingURL=UserTransformer.js.map