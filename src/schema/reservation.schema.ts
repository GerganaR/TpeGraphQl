import { prop as Prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../object-id.scalar";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import { User } from "./user.schema";
import { Workout } from "./workout.schema";
import { IsDate, Min } from "class-validator";
import PaginatedResponse from "./pagination.schema";
import { BaseModel } from "./base-model.schema";

@ObjectType()
export class Reservation extends BaseModel {
  // @Field(() => ObjectIdScalar)

  // readonly _id: ObjectId;

  @Field(() => User)
  @Prop({ ref: "User", required: true })
  user: Ref<User, Types.ObjectId>;

  @Field(() => Workout)
  @Prop({ ref: "Workout", required: true })
  workout: Ref<Workout, Types.ObjectId>;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field()
  @Prop({ required: true })
  bookedPlace: number;
}

@InputType()
export class BaseReservationInput {
  @Field(() => ObjectIdScalar)
  user: Types.ObjectId;

  @Field(() => ObjectIdScalar)
  workout: Types.ObjectId;

  @Field()
  @IsDate()
  date: Date;

  @Field()
  @Min(1) // Use @Min decorator for numbers
  bookedPlace: number;
}

@ObjectType()
export class PaginatedReservationResponse extends PaginatedResponse(
  Reservation
) {}

export const ReservationModel = getModelForClass(Reservation, {
  schemaOptions: { timestamps: true },
});
