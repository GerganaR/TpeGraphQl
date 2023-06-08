import { TrainerResolver } from "./trainer.resolver";
import { UserResolver } from "./user.resolver";
export const resolvers = [UserResolver, TrainerResolver] as const;
