import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../util/apiError.js";
import { object, string } from "yup";

const userSchema = object({
    name: string().required().min(4),
    phone: string().required().length(16),
    email: string().email(),
    password: string().required().min(4),
    cpf: string().length(11)
})

export const MidCustommer = async (request: Request, response: Response, next: NextFunction) => {

    await userSchema.validate(request.body).then(async () => {
        next();                     
    }).catch((err) => {
        throw new BadRequest(err)
    })
}