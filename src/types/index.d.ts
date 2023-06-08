import { User } from "../schema/user.schema";

//TODO add User model definition
declare module "express" {
  export interface Request {
    user: User;
  }
}
