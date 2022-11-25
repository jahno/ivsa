import { TransformerAbstract } from "@ioc:Adonis/Addons/Bumblebee";

export default class UserTransformer extends TransformerAbstract {
  public transform(model) {
    console.log(model);
    return {
      id: model.id,
      name: model.user,
    };
  }
}
