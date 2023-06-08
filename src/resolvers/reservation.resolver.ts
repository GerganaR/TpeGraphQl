import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { ReservationService } from "../services/reservation.service";
import {
  BaseReservationInput,
  PaginatedReservationResponse,
  Reservation,
  ReservationModel,
} from "../schema/reservation.schema";
import { PaginationInput } from "../schema/pagination.schema";

@Resolver()
export class ReservationResolver {
  constructor(private reservationService: ReservationService) {
    this.reservationService = new ReservationService();
  }

  @Query(() => PaginatedReservationResponse)
  async reservations(
    @Args() paginatedInput: PaginationInput
  ): Promise<PaginatedReservationResponse> {
    return this.reservationService.getReservations(paginatedInput);
  }

  @Query(() => Reservation)
  async reservation(@Arg("_id") _id: string): Promise<Reservation> {
    return this.reservationService.getReservation(_id);
  }

  //   @Query(() => [Workout])
  //   async searchWorkoutsByDate(@Arg("date") date: Date): Promise<Workout[]> {
  //     return this.workoutService.searchWorkoutsByDate(date);
  //   }

  @Mutation(() => Reservation)
  async createReservation(
    @Arg("reservation") reservation: BaseReservationInput
  ): Promise<Reservation> {
    return this.reservationService.createReservation(reservation);
  }

  //   @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => Reservation)
  async deleteReservation(@Arg("_id") _id: string): Promise<Reservation> {
    return this.reservationService.deleteReservation(_id);
  }
  @Mutation(() => Reservation)
  async updateReservation(
    @Arg("_id") _id: string,
    @Arg("reservation") reservation: BaseReservationInput
  ): Promise<Reservation> {
    return this.reservationService.updateReservation(_id, reservation);
  }

  @Query(() => [Reservation])
  async reservationsByWorkout(
    @Arg("workoutId") workoutId: string
  ): Promise<Reservation[]> {
    return this.reservationService.findByWorkoutId(workoutId);
  }
}
