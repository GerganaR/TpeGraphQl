import { PaginationInput } from "../schema/pagination.schema";
import {
  BaseTrainerInput,
  CreateTrainerInput,
  TrainerModel,
} from "../schema/trainer.schema";
import { PaginationService } from "./pagination.service";

export class TrainerService {
  async getTrainers(paginatedInput: PaginationInput) {
    const trainerPaginationServices = new PaginationService({
      model: TrainerModel,
    });
    return trainerPaginationServices.getPaginatedItems(paginatedInput);
  }
  async getTrainer(_id: string) {
    return TrainerModel.findById(_id).lean();
  }

  async createTrainer(trainer: CreateTrainerInput) {
    return TrainerModel.create(trainer);
  }
  async deleteTrainer(_id: string) {
    return TrainerModel.findByIdAndRemove(_id);
  }
  async updateTrainer(_id: string, trainer: BaseTrainerInput) {
    return TrainerModel.findByIdAndUpdate(_id, trainer, { new: true });
  }
  async countTrainers() {
    return TrainerModel.countDocuments();
  }
}
