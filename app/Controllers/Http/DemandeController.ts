import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Demande from "App/Models/Demande";
import User from "App/Models/User";
import { schema } from "@ioc:Adonis/Core/Validator";
import { Etat } from "App/Helpers/etat";
import ActionDemandeValidator from "App/Validators/Demande/ActionDemandeValidator";
import UserTransformer from "App/Transformers/UserTransformer";

export default class DemandesController {
  public async etat({ auth, response, params }: HttpContextContract) {
    const etat = params.etat_demande;
    // const demandes = await User.query()
    //   .where("id", auth.user?.id || 1)
    //   .preload("demandes", (demande) => {
    //     demande.where("etat", etat);
    //     demande.where("userIdReceive", auth.user?.id || 1);
    //     demande.preload("user");
    //   })
    //   .first();

    const demandes = await Demande.query()
      .where("userIdReceive", auth.user?.id || 1)
      .where("etat", etat)
      .preload("user");

    return response.ok(demandes);
  }

  public async recu({ auth, response, params }: HttpContextContract) {
    const etat = "";
    // const demandes = await User.query()
    //   .where("id", auth.user?.id || 1)
    //   .preload("demandes", (demande) => {
    //     demande.where("etat", etat);
    //     demande.where("userIdReceive", auth.user?.id || 1);
    //     demande.preload("user");
    //   })
    //   .first();

    const demandes = await Demande.query()
      .where("etat", Etat.ENCOURS)
      .where("userIdReceive", auth.user?.id || 1)
      .preload("user");

    return response.ok(demandes);
  }

  public async accepter({ auth, response }: HttpContextContract) {
    const demandes = await Demande.query()
      .where("userIdDemande", auth.user?.id || 1)
      .where("etat", "=", Etat.ACCEPTED)
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

  public async actionDemande({ auth, response, request }: HttpContextContract) {
    const { id_demande, action } = await request.validate(
      ActionDemandeValidator
    );

    const demandes = await Demande.query()
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

  public async send({ auth, request, response }: HttpContextContract) {
    const newDemandeSchema = schema.create({
      user_id: schema.number(),
    });

    const payload = await request.validate({ schema: newDemandeSchema });

    const id_received = request.input("user_id");

    if (id_received == auth.user?.id) {
      return response.ok({ msg: "Vous ne pouvez pas effecteuer cette action" });
    }

    const checkExist = await Demande.query()
      .where("userIdDemande", auth.user?.id || 1)
      .where("userIdReceive", id_received)
      .first();

    if (checkExist) {
      return response.ok({
        msg: "Vous avez deja envoyer une demander a cet utilisateur",
      });
    }

    const demande = await Demande.create({
      userIdDemande: auth.user?.id,
      userIdReceive: id_received,
    });
    return response.ok({ msg: "Demande envoyer" });
  }

  public async show({ auth, request, response, params }: HttpContextContract) {
    const newDemandeSchema = schema.create({
      id_demande: schema.number(),
    });

    //const payload = await request.validate({ schema: newDemandeSchema });
    const id_demande = params.id_demande;
    let demande;
    try {
      demande = await Demande.findOrFail(id_demande);
    } catch (error) {
      return response.ok({ msg: "Demande introuvable" });
    }

    if (demande.userIdDemande != auth.user?.id)
      return response.ok({ msg: "Impossible de consulter" });

    if (demande.etat == Etat.ACCEPTED) {
      const user = await User.findOrFail(demande.userIdReceive);
      return response.ok({
        nom: user.nom,
        photo: user.photo,
        numero: user.numero,
      });
    }

    return response.ok({ msg: demande.etat });
  }
}
