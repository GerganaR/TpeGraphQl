import { ObjectType, Field, Authorized } from "type-graphql";
import { prop as Prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose"
import { ObjectId } from "mongodb"
import { Game } from "./game-entity";
import { UserRoles } from "../resolvers/user/user-roles";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })

@ObjectType()
export class User {

  @Field()
  readonly _id: ObjectId;

  @Prop({required: true})
  @Field()
  firstName: string;

  @Prop({required: true})
  @Field()
  lastName: string;

  @Prop({required: true})
  @Field()
  email: string;

  @Prop({required: true})
  @Field()
  password: string;

  @Field()
  @Prop({default: Date.now()})
  lastLogin?: number;

  @Field(type => [Game])
  @Prop({default: []})
  games?: Game[]

  @Field(type => [String])
  @Prop({default: [UserRoles.USER]})
  roles?: string[]
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true }})