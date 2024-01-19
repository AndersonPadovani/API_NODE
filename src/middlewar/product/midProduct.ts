import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../util/apiError.js";
import { number, object, string } from "yup";

const midProductCreateSchema = object({
    name: string().required().min(4),
    description: string().required().min(4),
    price: number()
        .typeError("O preço deve ser um número")
        .positive("O preço deve ser um número positivo")
        .required("O preço é obrigatório"),
    amount: number().required().min(1),
});

const MidProductCreate = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midProductCreateSchema
        .validate(request.body)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const midProductUpdateSchema = object({
    id: string().required(),
    name: string().required().min(4),
    description: string().required().min(4),
    price: number()
        .typeError("O preço deve ser um número")
        .positive("O preço deve ser um número positivo")
        .required("O preço é obrigatório"),
    amount: number().required().min(1),
});
const MidProductUpdate = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midProductUpdateSchema
        .validate(request.body)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const midProductDeleteSchema = object({
    id: string().required(),
});
const MidProductDelete = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midProductDeleteSchema
        .validate(request.body)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

export { MidProductCreate, MidProductUpdate, MidProductDelete };
