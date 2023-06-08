import { Request } from "express";
import { User } from "../schema/user.schema";
export interface Context {
  req: Request;
  user: User;
  ip: any;
  location: any;
  md: any;
}
