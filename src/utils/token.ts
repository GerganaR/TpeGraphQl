import jsonwebtoken from "jsonwebtoken";
import { UserRole } from "../enums/user-role";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";

export function generateToken(_id: ObjectId, roles: UserRole[]) {
  return jsonwebtoken.sign(
    {
      _id,
      roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRATION ?? "1d",
    }
  );
}

export function getUserFromRequest(req: Request) {
  const authorization = req.headers.authorization;
  let user = null;
  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      user = jsonwebtoken.verify(token, process.env.JWT_SECRET) as any;
    } catch (e) {
      console.log(e?.message);
    }
  }
  return user;
}
