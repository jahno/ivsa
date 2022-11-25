import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async me({ auth, response }: HttpContextContract) {
    return response.ok({ user: auth.user });
  }

  public async home({ response }: HttpContextContract) {
    const user = await User.query().orderByRaw("RAND()").first();
    return response.ok(user);
  }
}
