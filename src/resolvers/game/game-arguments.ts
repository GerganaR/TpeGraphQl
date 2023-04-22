import { Field, InputType } from "type-graphql";
import { ObjectId } from "mongodb";

@InputType()
export class BaseGameInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image: string;
}

@InputType()
export class GameInput extends BaseGameInput {
  @Field()
  _id: ObjectId;
}