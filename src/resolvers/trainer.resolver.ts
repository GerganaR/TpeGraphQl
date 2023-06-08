import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  Authorized,
  Ctx,
  Int,
} from "type-graphql";
import { TrainerService } from "../services/trainer.service";
import {
  BaseTrainerInput,
  CreateTrainerInput,
  PaginatedTrainerResponse,
  Trainer,
} from "../schema/trainer.schema";
import { PaginationInput } from "../schema/pagination.schema";
import { UserRole } from "../enums/user-role";
import { User } from "../schema/user.schema";

@Resolver()
export class TrainerResolver {
  constructor(private trainerService: TrainerService) {
    this.trainerService = new TrainerService();
  }

  @Query(() => PaginatedTrainerResponse)
  async trainers(
    @Args() paginatedInput: PaginationInput
  ): Promise<PaginatedTrainerResponse> {
    return this.trainerService.getTrainers(paginatedInput);
  }
  @Query(() => Int)
  async trainerCount(): Promise<number> {
    return this.trainerService.countTrainers();
  }

  @Query(() => Trainer)
  async trainer(@Arg("_id") _id: string): Promise<Trainer> {
    return this.trainerService.getTrainer(_id);
  }

  @Mutation(() => Trainer)
  async createTrainer(
    @Arg("trainer") trainer: CreateTrainerInput
  ): Promise<Trainer> {
    return this.trainerService.createTrainer(trainer);
  }

  //   @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => Trainer)
  async deleteTrainer(@Arg("_id") _id: string): Promise<Trainer> {
    return this.trainerService.deleteTrainer(_id);
  }
  @Mutation(() => Trainer)
  async updateTrainer(
    @Arg("_id") _id: string,
    @Arg("trainer") trainer: BaseTrainerInput
  ): Promise<Trainer> {
    return this.trainerService.updateTrainer(_id, trainer);
  }
}
