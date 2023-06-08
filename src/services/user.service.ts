import {
  BaseUserInput,
  CreateUserInput,
  User,
  UserModel,
} from "../schema/user.schema";
import { PaginationInput } from "../schema/pagination.schema";
import { PaginationService } from "./pagination.service";
import { AppError } from "../utils/error";
import { ErrorCodes } from "../constants/error-codes";
import { generateToken } from "../utils/token";
import bcryptjs from "bcryptjs";
import { Context } from "../types/context";

export class UserService {
  async getUsers(paginatedInput: PaginationInput) {
    const userPaginationServices = new PaginationService({ model: UserModel });
    return userPaginationServices.getPaginatedItems(paginatedInput);
  }
  async getUser(_id: string) {
    return UserModel.findById(_id).lean();
  }
  // async createUser(user: CreateUserInput) {
  //   const password = bcryptjs.hashSync(user.password, 10);
  //   const userData = { ...user, password };

  //   try {
  //     const createdUser = await UserModel.create(userData);
  //     return generateToken(createdUser._id, createdUser.roles);
  //   } catch (error) {
  //     // Handle specific errors or rethrow as AppError
  //     if (error.code === "SOME_ERROR_CODE") {
  //       throw AppError("Custom error message", "CUSTOM_ERROR_CODE");
  //     }

  //     // Rethrow other errors
  //     throw error;
  //   }
  // }
  async createUser(user: CreateUserInput) {
    const password = bcryptjs.hashSync(user.password, 10);
    const userData = { ...user, password };
    const createdUser = await UserModel.create(userData);
    return generateToken(createdUser._id, createdUser.roles);
  }
  async deleteUser(_id: string) {
    return UserModel.findByIdAndRemove(_id);
  }

  // @Mutation((returns) => User)
  // async editUser(
  //   @Arg("_id") _id: string,
  //   @Arg("data") data: EditUserInput
  // ): Promise<User> {
  //   const userData = data.password
  //     ? { ...data, password: bcryptjs.hashSync(data.password, 10) }
  //     : data;
  //   return await UserModel.findByIdAndUpdate(_id, userData, { new: true });
  // }
  async updateUser(_id: string, user: BaseUserInput) {
    const userData = user.password
      ? { ...user, password: bcryptjs.hashSync(user.password, 10) }
      : user;
    return UserModel.findByIdAndUpdate(_id, userData, { new: true });
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      throw AppError("User not found", ErrorCodes.BAD_USER_INPUT);
    }
    const isMatching = await bcryptjs.compare(password, user.password);
    if (!isMatching) {
      throw AppError("Password is invalid", ErrorCodes.BAD_USER_INPUT);
    }
    return generateToken(user._id, user.roles);
  }

  async currentUser(user: User) {
    if (!user?._id) {
      throw AppError("Unauthenticated", ErrorCodes.UNAUTHENTICATED);
    }
    return UserModel.findById(user._id).lean();
  }

  async countUsers() {
    return UserModel.countDocuments();
  }
}
