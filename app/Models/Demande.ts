import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Demande extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null })
  public userIdDemande: number;
  @column({ serializeAs: null })
  public userIdReceive: number;

  @column({ serializeAs: null })
  public etat: string;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    foreignKey: "userIdDemande", // defaults to userId
  })
  public user: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    foreignKey: "userIdReceive", //
  })
  public userReceive: BelongsTo<typeof User>;

  // @manyToMany(() => User)
  // public user: ManyToMany<typeof User>;
}
