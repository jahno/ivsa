import { Confi } from "./../../Helpers/Confi";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import LoginValidator from "App/Validators/Auth/LoginValidator";
import StoreUserValidator from "App/Validators/Auth/StoreUserValidator";
import Application from "@ioc:Adonis/Core/Application";

const fs = require("fs");

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(StoreUserValidator);

    let nom_image = `${Date.now()}.${payload.image.extname}`;

    let chemin = await payload.image.move(Application.tmpPath("uploads"), {
      name: nom_image,
      overwrite: true,
    });

    const { image, ...prop } = payload;
    nom_image = Confi.URL_BASE + "uploads/" + nom_image;
    const user = await User.create({ ...prop, photo: nom_image });
    const token = await auth.use("api").generate(user);
    return response.created({
      msg: "utilisateur enregistrer avec succès",
      token,
    });
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator);

    const token = await auth.attempt(email, password);
    //const user = auth.user!;
    // ...user.serialize(),
    return response.ok(token);
  }

  public async logout({ auth, request, response }: HttpContextContract) {
    const token = await auth.logout();
    return response.ok({ msg: "vous êtes deconnecter", token });
  }
}
