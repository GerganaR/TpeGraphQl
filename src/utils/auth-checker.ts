import { AuthChecker } from "type-graphql";
import { Context } from "../types/context";
import { UserRole } from "../enums/user-role";

export const authChecker: AuthChecker<Context> = (
  { context: { user } },
  roles
) => {
  if (!user?.roles) {
    return false;
  }
  // user.roles=[USER, ADMIN]
  // roles=[ADMIN]
  return user.roles.some((role) => roles.includes(role));
};
