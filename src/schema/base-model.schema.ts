import { Field, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../object-id.scalar";
import { Types } from "mongoose";

@ObjectType()
export class BaseModel {
  @Field(() => ObjectIdScalar)
  readonly _id: Types.ObjectId;

  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}
