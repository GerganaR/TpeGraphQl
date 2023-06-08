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
import { UserService } from "../services/user.service";
import {
  BaseUserInput,
  CreateUserInput,
  PaginatedUserResponse,
  User,
  UserLoginArgs,
} from "../schema/user.schema";
import { PaginationInput } from "../schema/pagination.schema";
import { UserRole } from "../enums/user-role";
import { Context } from "../types/context";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Query(() => PaginatedUserResponse)
  async users(
    @Args() paginatedInput: PaginationInput
  ): Promise<PaginatedUserResponse> {
    return this.userService.getUsers(paginatedInput);
  }

  @Query(() => Int)
  async usersCount(): Promise<number> {
    return this.userService.countUsers();
  }
  @Query(() => User)
  async user(@Arg("_id") _id: string): Promise<User> {
    return this.userService.getUser(_id);
  }

  @Mutation(() => String)
  async createUser(@Arg("user") user: CreateUserInput): Promise<string> {
    return this.userService.createUser(user);
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => User)
  async deleteUser(@Arg("_id") _id: string): Promise<User> {
    return this.userService.deleteUser(_id);
  }
  @Mutation(() => User)
  async updateUser(
    @Arg("_id") _id: string,
    @Arg("user") user: BaseUserInput
  ): Promise<User> {
    return this.userService.updateUser(_id, user);
  }

  @Mutation(() => String)
  async login(@Args() { email, password }: UserLoginArgs): Promise<string> {
    return this.userService.login(email, password);
  }

  @Query(() => User)
  async currentUser(@Ctx() { user }: Context): Promise<User> {
    return this.userService.currentUser(user);
  }
}
