import { ObjectType, Field, InputType } from "type-graphql";
import { prop as Prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectIdScalar } from "../object-id.scalar";
import { ObjectId } from "mongodb";
import { IsEmail, MinLength } from "class-validator";
import PaginatedResponse from "./pagination.schema";
import { BaseModel } from "./base-model.schema";

@ObjectType()
export class Trainer extends BaseModel {
  // @Field(() => ObjectIdScalar)
  // readonly _id: ObjectId;

  @Field()
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
  phone: string;

  @Field()
  @Prop({ required: false })
  avatar?: string;

  @Field()
  @Prop({ required: true })
  age: string;

  @Field({ nullable: false })
  @Prop({ required: false })
  height?: string;

  @Field({ nullable: false })
  @Prop({ required: false })
  weight?: string;

  @Field({ nullable: false })
  @Prop({ required: false })
  address?: string;

  @Field({ nullable: false })
  @Prop({ required: false })
  specialization?: string;

  @Field({ nullable: false })
  @Prop({ required: false })
  registrationDate?: Date;
}

@InputType()
export class BaseTrainerInput {
  @Field()
  @MinLength(3)
  firstName: string;

  @Field()
  @MinLength(3)
  lastName: string;

  @Field()
  @MinLength(3)
  phone: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  @MinLength(1)
  age: string;

  @Field({ nullable: true })
  height?: string;

  @Field({ nullable: true })
  weight?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  specialization?: string;

  @Field({ nullable: true })
  registrationDate?: Date;
}

@InputType()
export class CreateTrainerInput extends BaseTrainerInput {
  @Field()
  @IsEmail()
  email: string;
}

@ObjectType()
export class PaginatedTrainerResponse extends PaginatedResponse(Trainer) {}

export const TrainerModel = getModelForClass(Trainer, {
  schemaOptions: { timestamps: true },
});
