import { buildSchema } from "type-graphql";
import { TypegooseMiddleware } from "./typegoose-middleware";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "./object-id.scalar";
import * as path from "path";
import { UserResolver } from "./resolvers/user.resolver";
import { authChecker } from "./utils/auth-checker";
import { TrainerResolver } from "./resolvers/trainer.resolver";
import { WorkoutResolver } from "./resolvers/workout.resolver";
import { ReservationResolver } from "./resolvers/reservation.resolver";

//TODO add resolves
//TODO add authChecker
export const getSchema = async () => {
  return await buildSchema({
    resolvers: [
      UserResolver,
      TrainerResolver,
      WorkoutResolver,
      ReservationResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    // use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    authChecker,
  });
};
