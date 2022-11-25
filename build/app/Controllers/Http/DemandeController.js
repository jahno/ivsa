"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Demande_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Demande"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const etat_1 = global[Symbol.for('ioc.use')]("App/Helpers/etat");
const ActionDemandeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Demande/ActionDemandeValidator"));
class DemandesController {
    async etat({ auth, response, params }) {
        const etat = params.etat_demande;
        const demandes = await Demande_1.default.query()
            .where("userIdReceive", auth.user?.id || 1)
            .where("etat", etat)
            .preload("user");
        return response.ok(demandes);
    }
    async recu({ auth, response, params }) {
        const etat = "";
        const demandes = await Demande_1.default.query()
            .where("etat", etat_1.Etat.ENCOURS)
            .where("userIdReceive", auth.user?.id || 1)
            .preload("user");
        return response.ok(demandes);
    }
    async accepter({ auth, response }) {
        const demandes = await Demande_1.default.query()
            .where("userIdDemande", auth.user?.id || 1)
            .where("etat", "=", etat_1.Etat.ACCEPTED)
            .preload("userReceive");
        const demandesJSON = demandes.map((demande) => {
            return {
                nom: demande.toObject().userReceive.nom,
                ecole: demande.toObject().userReceive.ecole,
                numero: demande.toObject().userReceive.numero,
                photo: demande.toObject().userReceive.photo,
            };
        });
        return response.ok(demandesJSON);
    }
    async actionDemande({ auth, response, request }) {
        const { id_demande, action } = await request.validate(ActionDemandeValidator_1.default);
        const demandes = await Demande_1.default.query()
            .where("id", id_demande)
            .where("user_id_receive", auth.user?.id || 1)
            .first();
        if (demandes == null) {
            return response.ok({ msg: "Vous ne pouvez pas effecteuer cette action" });
        }
        demandes.etat = action;
        demandes.save();
        return response.ok({ msg: "ok" });
    }
    async send({ auth, request, response }) {
        const newDemandeSchema = Validator_1.schema.create({
            user_id: Validator_1.schema.number(),
        });
        const payload = await request.validate({ schema: newDemandeSchema });
        const id_received = request.input("user_id");
        if (id_received == auth.user?.id) {
            return response.ok({ msg: "Vous ne pouvez pas effecteuer cette action" });
        }
        const checkExist = await Demande_1.default.query()
            .where("userIdDemande", auth.user?.id || 1)
            .where("userIdReceive", id_received)
            .first();
        if (checkExist) {
            return response.ok({
                msg: "Vous avez deja envoyer une demander a cet utilisateur",
            });
        }
        const demande = await Demande_1.default.create({
            userIdDemande: auth.user?.id,
            userIdReceive: id_received,
        });
        return response.ok({ msg: "Demande envoyer" });
    }
    async show({ auth, request, response, params }) {
        const newDemandeSchema = Validator_1.schema.create({
            id_demande: Validator_1.schema.number(),
        });
        const id_demande = params.id_demande;
        let demande;
        try {
            demande = await Demande_1.default.findOrFail(id_demande);
        }
        catch (error) {
            return response.ok({ msg: "Demande introuvable" });
        }
        if (demande.userIdDemande != auth.user?.id)
            return response.ok({ msg: "Impossible de consulter" });
        if (demande.etat == etat_1.Etat.ACCEPTED) {
            const user = await User_1.default.findOrFail(demande.userIdReceive);
            return response.ok({
                nom: user.nom,
                photo: user.photo,
                numero: user.numero,
            });
        }
        return response.ok({ msg: demande.etat });
    }
}
exports.default = DemandesController;
//# sourceMappingURL=DemandeController.js.map