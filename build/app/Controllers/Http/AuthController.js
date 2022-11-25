"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Confi_1 = require("./../../Helpers/Confi");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const LoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/LoginValidator"));
const StoreUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/StoreUserValidator"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const fs = require("fs");
class AuthController {
    async register({ request, response, auth }) {
        const payload = await request.validate(StoreUserValidator_1.default);
        let nom_image = `${Date.now()}.${payload.image.extname}`;
        let chemin = await payload.image.move(Application_1.default.tmpPath("uploads"), {
            name: nom_image,
            overwrite: true,
        });
        const { image, ...prop } = payload;
        nom_image = Confi_1.Confi.URL_BASE + "uploads/" + nom_image;
        const user = await User_1.default.create({ ...prop, photo: nom_image });
        const token = await auth.use("api").generate(user);
        return response.created({
            msg: "utilisateur enregistrer avec succès",
            token,
        });
    }
    async login({ auth, request, response }) {
        const { email, password } = await request.validate(LoginValidator_1.default);
        const token = await auth.attempt(email, password);
        return response.ok(token);
    }
    async logout({ auth, request, response }) {
        const token = await auth.logout();
        return response.ok({ msg: "vous êtes deconnecter", token });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map