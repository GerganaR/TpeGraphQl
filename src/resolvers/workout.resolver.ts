import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  ArgsType,
  Field,
} from "type-graphql";

import { PaginationInput } from "../schema/pagination.schema";
import { WorkoutService } from "../services/workout.service";
import {
  BaseWorkoutInput,
  PaginatedWorkoutResponse,
  Workout,
} from "../schema/workout.schema";

@Resolver()
export class WorkoutResolver {
  constructor(private workoutService: WorkoutService) {
    this.workoutService = new WorkoutService();
  }

  @Query(() => PaginatedWorkoutResponse)
  async workouts(
    @Args() paginatedInput: PaginationInput
  ): Promise<PaginatedWorkoutResponse> {
    return this.workoutService.getWorkouts(paginatedInput);
  }

  @Query(() => Workout)
  async workout(@Arg("_id") _id: string): Promise<Workout> {
    return this.workoutService.getWorkout(_id);
  }

  @Mutation(() => Workout)
  async createWorkout(
    @Arg("workout") workout: BaseWorkoutInput
  ): Promise<Workout> {
    return this.workoutService.createWorkout(workout);
  }

  //   @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => Workout)
  async deleteWorkout(@Arg("_id") _id: string): Promise<Workout> {
    return this.workoutService.deleteWorkout(_id);
  }
  @Mutation(() => Workout)
  async updateWorkout(
    @Arg("_id") _id: string,
    @Arg("workout") workout: BaseWorkoutInput
  ): Promise<Workout> {
    return this.workoutService.updateWorkout(_id, workout);
  }

  @Query(() => [Workout])
  async searchWorkoutsByDate(
    @Arg("workoutDate") workoutDate: string
  ): Promise<Workout[]> {
    return this.workoutService.getWorkoutsByDate(workoutDate);
  }

  @Query(() => [Workout])
  async searchWorkoutsByDateAndTime(
    @Arg("workoutDate") workoutDate: string,
    @Arg("workoutTime") workoutTime: string
  ): Promise<Workout[]> {
    // Call the service method to fetch the workouts
    const workouts = await WorkoutService.getWorkoutsByDateAndTime(
      workoutDate,
      workoutTime
    );
    return workouts;
  }
}
