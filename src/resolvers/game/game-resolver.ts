import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { Game, GameModel } from "../../entities/game-entity";
import { UserRoles } from "../user/user-roles";
import { BaseGameInput, GameInput } from "./game-arguments";

@Resolver()
export class GameResolver {

  @Query(returns => [Game])
  async games():Promise<Game[]> {
    return GameModel.find({});
  }

  @Query(returns => Game)
  async game(@Arg("_id") _id: string):Promise<Game> {
    return GameModel.findById(_id);
  }

  @Mutation(returns => Game)
  async createGame(@Arg("data") data: BaseGameInput):Promise<Game> {
    const newUser = new GameModel(data);
    await newUser.save();
    return newUser
  }

  // @Authorized([UserRoles.ADMIN, UserRoles.SUPER_ADMIN])
  @Mutation(returns => Game)
  async deleteGame(@Arg("_id") _id: string):Promise<Game> {
    return GameModel.findByIdAndRemove(_id);
  }

  @Mutation(returns => Game)
  async editGame(@Arg("_id") _id: string, @Arg("data") data: GameInput):Promise<Game> {
    return GameModel.findByIdAndUpdate(_id, data, {new: true});
  }

}