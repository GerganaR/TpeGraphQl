import { ArgsType, Field, InputType, ObjectType } from "type-graphql";
import { WorkoutTemplate } from "./workout-template.schema";
import { prop as Prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { ObjectIdScalar } from "../object-id.scalar";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";

import PaginatedResponse from "./pagination.schema";
import { Trainer } from "./trainer.schema";
import {
  ArrayNotEmpty,
  IsDate,
  IsNotEmpty,
  Min,
  MinLength,
} from "class-validator";
import { BaseModel } from "./base-model.schema";
import { Reservation } from "./reservation.schema";

@ObjectType()
export class Workout extends BaseModel {
  // @Field(() => ObjectIdScalar)
  // readonly _id: ObjectId;

  @Field({ defaultValue: "Pilates" })
  @Prop({ required: true, default: "Pilates" })
  name: string;

  @Field()
  @Prop({ required: true })
  location: string;

  @Field()
  @Prop({ required: true })
  level: string;

  // @Field()
  // @Prop({ required: true })
  // workoutDate: Date;
  @Field()
  @Prop({ required: true })
  workoutDate: string;

  @Field()
  @Prop({ required: true })
  workoutTime: string;

  @Field(() => [String], {
    defaultValue: [
      "yoga",
      "meditation",
      "mental health",
      "training",
      "workout",
    ],
  })
  @Prop({
    required: true,
    default: ["yoga", "meditation", "mental health", "training", "workout"],
  })
  tags: string[];

  @Field({ defaultValue: 7 })
  @Prop({ required: true, default: 7 })
  freeSpaces: number;

  @Field(() => Reservation)
  @Prop({ ref: "Reservation", required: true })
  reservedPlaces: Ref<Reservation, Types.ObjectId>;

  @Field(() => Trainer)
  @Prop({ ref: "Trainer", required: true })
  trainer: Ref<Trainer, Types.ObjectId>;
}

@InputType()
export class BaseWorkoutInput {
  @Field({ defaultValue: "Pilates" })
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Location is required" })
  location: string;

  @Field()
  @IsNotEmpty({ message: "Level is required" })
  level: string;

  // @Field()
  // @IsDate({ message: "Workout date must be a valid date" })
  // workoutDate: Date;

  @Field()
  workoutDate: string;

  @Field()
  @IsNotEmpty({ message: "Workout time is required" })
  workoutTime: string;

  @Field(() => [String], {
    defaultValue: [
      "yoga",
      "meditation",
      "mental health",
      "training",
      "workout",
    ],
  })
  @ArrayNotEmpty({ message: "At least one tag is required" })
  tags: string[];

  @Field({ defaultValue: 7 })
  freeSpaces: number;

  @Field(() => ObjectIdScalar)
  trainer: Types.ObjectId;

  @Field(() => ObjectIdScalar)
  reservedPlaces: Types.ObjectId;

  // @Field(() => [Reservation])
  // @Prop({ ref: "Reservation", default: [] })
  // reservedPlaces: Ref<Reservation, Types.ObjectId>[];
}

@ObjectType()
export class PaginatedWorkoutResponse extends PaginatedResponse(Workout) {}

export const WorkoutModel = getModelForClass(Workout, {
  schemaOptions: { timestamps: true },
});
