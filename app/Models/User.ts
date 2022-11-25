import Hash from "@ioc:Adonis/Core/Hash";
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Demande from "./Demande";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nom: string;

  @column({ serializeAs: null })
  public numero: string;

  @column()
  public description: string;

  @column()
  public email: string;

  @column()
  public ecole: string;

  @column()
  public photo: string;

  @column({ serializeAs: null })
  public password: string;

  @column({ serializeAs: null })
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  // @manyToMany(() => Demande)
  // public demandes: ManyToMany<typeof Demande>;
  @hasMany(() => Demande, {
    foreignKey: "userIdReceive", // defaults to userId
  })
  public demandes: HasMany<typeof Demande>;
}
