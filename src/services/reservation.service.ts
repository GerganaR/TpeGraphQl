import { PaginationInput } from "../schema/pagination.schema";
import {
  BaseReservationInput,
  ReservationModel,
} from "../schema/reservation.schema";
import { PaginationService } from "./pagination.service";

export class ReservationService {
  async getReservations(paginatedInput: PaginationInput) {
    const reservationPaginationServices = new PaginationService({
      model: ReservationModel,
      populate: "user workout",
    });
    return reservationPaginationServices.getPaginatedItems(paginatedInput);
  }

  async getReservation(_id: string) {
    const reservation = await ReservationModel.findById(_id)
      .populate("user workout")
      .exec();
    return reservation;
  }

  async createReservation(reservation: BaseReservationInput) {
    const newReservation = new ReservationModel(reservation);
    return newReservation.save();
  }
  async deleteReservation(_id: string) {
    // return WorkoutModel.findByIdAndRemove(_id);
    const deleteReservation = await ReservationModel.findByIdAndDelete(_id)
      .populate("user workout")
      .exec();
    return deleteReservation;
  }
  async updateReservation(_id: string, reservation: BaseReservationInput) {
    return ReservationModel.findByIdAndUpdate(_id, reservation, { new: true });
  }

  async findByWorkoutId(workoutId: string) {
    return ReservationModel.find({ workout: workoutId })
      .populate("user") // Populate the "user" field
      .exec();
  }
}
