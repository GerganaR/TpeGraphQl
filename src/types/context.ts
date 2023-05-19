import { Request } from 'express'
//TODO add User model definition
export interface Context {
    req: Request,
    user: any,
    ip: any,
    location: any,
    md: any,
}
