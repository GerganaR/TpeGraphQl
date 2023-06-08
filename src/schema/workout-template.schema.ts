import { prop as Prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Trainer } from "./trainer.schema";
import { ObjectIdScalar } from "../object-id.scalar";
import { ObjectId } from "mongodb";
import { MinLength } from "class-validator";
import PaginatedResponse from "./pagination.schema";
import { BaseModel } from "./base-model.schema";

@ObjectType()
export class WorkoutTemplate extends BaseModel {
  // @Field(() => ObjectIdScalar)
  // readonly _id: ObjectId;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => Date)
  @Prop({ required: true })
  day: Date;

  @Field(() => String)
  @Prop({ required: true })
  time: string;

  @Field()
  @Prop({ required: true })
  freeSpaces: number;
}

@InputType()
export class BaseWorkoutTemplateInput {
  @Field()
  @MinLength(4)
  name: string;

  @Field(() => Date)
  day: Date;

  @Field(() => String)
  @MinLength(4)
  time: string;

  @Field()
  freeSpaces: number;
}

// doesn't work
@InputType()
export class SearchWorkoutByDayInput {
  @Field(() => Date)
  day: Date;
}

@ObjectType()
export class PaginatedWorkoutTemplateResponse extends PaginatedResponse(
  WorkoutTemplate
) {}

export const WorkoutTemplateModel = getModelForClass(WorkoutTemplate, {
  schemaOptions: { timestamps: true },
});
