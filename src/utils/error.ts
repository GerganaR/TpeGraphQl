import { GraphQLError } from "graphql";

export function AppError(message: string, code: string) {
  return new GraphQLError(message, {
    extensions: {
      code,
    },
  });
}
