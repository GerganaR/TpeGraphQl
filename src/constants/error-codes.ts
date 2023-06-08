import { ApolloServerErrorCode } from "@apollo/server/errors";

export const ErrorCodes = {
  ...ApolloServerErrorCode,
  UNAUTHENTICATED: "UNAUTHENTICATED",
};
