import { PaginationInput } from "../schema/pagination.schema";
import {
  BaseWorkoutInput,
  Workout,
  WorkoutModel,
} from "../schema/workout.schema";
import { PaginationService } from "./pagination.service";

export class WorkoutService {
  async getWorkouts(paginatedInput: PaginationInput) {
    const workoutPaginationServices = new PaginationService({
      model: WorkoutModel,
      populate: "reservedPlaces trainer",
    });
    return workoutPaginationServices.getPaginatedItems(paginatedInput);
  }

  async getWorkout(_id: string) {
    const workout = await WorkoutModel.findById(_id)
      .populate("reservedPlaces trainer")
      .exec();
    return workout;
  }

  async createWorkout(workout: BaseWorkoutInput) {
    // const newWorkout = new WorkoutModel(workout);
    // return newWorkout.save();
    const createWorkout = await WorkoutModel.create(workout);
    return createWorkout.populate("reservedPlaces trainer");
  }
  async deleteWorkout(_id: string) {
    // return WorkoutModel.findByIdAndRemove(_id);
    const deletedWorkout = await WorkoutModel.findByIdAndDelete(_id)
      .populate("reservedPlaces trainer")
      .exec();
    return deletedWorkout;
  }
  async updateWorkout(_id: string, workout: BaseWorkoutInput) {
    return WorkoutModel.findByIdAndUpdate(_id, workout, { new: true });
  }

  async getWorkoutsByDate(workoutDate: string) {
    try {
      // Fetch workouts from the database based on the workoutDate field
      const workouts = await WorkoutModel.find({ workoutDate })
        .populate("trainer")
        .populate({ path: "reservedPlaces", populate: { path: "user" } });

      return workouts;
    } catch (error) {
      // Handle error
      throw new Error("Failed to fetch workouts by date.");
    }
  }

  static async getWorkoutsByDateAndTime(
    workoutDate: string,
    workoutTime: string
  ): Promise<Workout[]> {
    try {
      const workouts = await WorkoutModel.find({ workoutDate, workoutTime })
        .populate("trainer")
        .populate({ path: "reservedPlaces", populate: { path: "user" } });
      return workouts;
    } catch (error) {
      // Handle error
      throw new Error("Failed to fetch workouts by date and time.");
    }
  }
}
