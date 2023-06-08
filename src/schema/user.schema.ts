import { prop as Prop, getModelForClass } from "@typegoose/typegoose";
import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { UserRole } from "../enums/user-role";
import { ObjectIdScalar } from "../object-id.scalar";
import { IsEmail, MinLength, MaxLength, isNotEmpty } from "class-validator";
import PaginatedResponse from "./pagination.schema";
import { BaseModel } from "./base-model.schema";

registerEnumType(UserRole, {
  name: "UserRole",
});

@ObjectType()
export class User extends BaseModel {
  @Field()
  //   анотация за mongodb, typegoose
  @Prop({ required: true })
  firstName: string;

  @Field()
  @Prop({ required: true })
  lastName: string;

  @Field()
  @Prop({ required: true })
  email: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  avatar?: string;

  @Field()
  @Prop({ required: true })
  age: string;

  @Field()
  @Prop({ required: true })
  address: string;

  @Field()
  @Prop({ required: true })
  phone: string;

  // @Field({ nullable: true })
  // @Prop({ required: false, default: Date.now })
  // createdAt?: Date;

  //   опционално, ?
  // @Field({ nullable: true })
  // @Prop({ required: false })
  // occupation?: string;

  @Prop({ type: [String], enum: UserRole, default: [UserRole.USER] })
  @Field(() => [UserRole])
  roles: UserRole[];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class BaseUserInput {
  @Field()
  @MaxLength(30)
  firstName: string;
  @Field()
  @MaxLength(30)
  lastName: string;
  @Field()
  @MinLength(6)
  password: string;
  @Field()
  @MinLength(3)
  phone: string;
  @Field()
  @MinLength(3)
  address: string;
  @Field()
  @MaxLength(4)
  age: string;
  @Field({ nullable: true })
  avatar?: string;
  // @Field({ nullable: true })
  // occupation?: string;
}
@InputType()
export class CreateUserInput extends BaseUserInput {
  @Field()
  @IsEmail()
  email: string;
}

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(User) {}

@ArgsType()
export class UserLoginArgs {
  @Field()
  @IsEmail()
  email: string;
  @MinLength(6)
  @Field()
  password: string;
}
