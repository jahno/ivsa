"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get("/", async () => {
    return { hello: "world" };
});
Route_1.default.group(() => {
    Route_1.default.get("image/:nom_image", "AuthController.readImage");
    Route_1.default.post("register", "AuthController.register");
    Route_1.default.post("login", "AuthController.login");
    Route_1.default.get("home", "UserController.home");
    Route_1.default.get("logout", "AuthController.logout").middleware(["auth"]);
    Route_1.default.get("user", "AuthController.me").middleware(["auth"]);
    Route_1.default.group(() => {
        Route_1.default.get("", "DemandeController.recu");
        Route_1.default.get("accepter", "DemandeController.accepter");
        Route_1.default.post("send", "DemandeController.send");
        Route_1.default.get("/show/:id_demande", "DemandeController.show");
        Route_1.default.post("/etat/action", "DemandeController.actionDemande");
    })
        .prefix("demande")
        .middleware("auth");
}).prefix("api");
//# sourceMappingURL=routes.js.map