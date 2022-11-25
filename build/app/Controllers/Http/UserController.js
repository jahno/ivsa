"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UsersController {
    async me({ auth, response }) {
        return response.ok({ user: auth.user });
    }
    async home({ response }) {
        const user = await User_1.default.query().orderByRaw("RAND()").first();
        return response.ok(user);
    }
}
exports.default = UsersController;
//# sourceMappingURL=UserController.js.map