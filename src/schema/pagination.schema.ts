import { ArgsType, ClassType, Field, Int, ObjectType } from "type-graphql";
import { IsInt, IsPositive } from "class-validator";

@ArgsType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsInt()
  @IsPositive()
  page: number;
  @Field(() => Int, { defaultValue: 20, nullable: true })
  @IsInt()
  @IsPositive()
  limit?: number;
}

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType()
  abstract class PaginatedResponseClass {
    @Field()
    page: number;
    @Field(() => [TItemClass])
    items: TItem[];
    @Field()
    totalPages: number;
    @Field()
    totalItems: number;
  }
  return PaginatedResponseClass;
}
