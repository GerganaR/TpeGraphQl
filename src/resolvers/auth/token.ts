import jsonwebtoken from "jsonwebtoken"
import {ObjectId} from "mongodb"
import dotenv from "dotenv";
dotenv.config();

export function getToken(_id: ObjectId, roles: string[]) {

    return jsonwebtoken.sign(
        {
            _id,
            roles,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRATION ?? '1d'
        }
    )
   
}