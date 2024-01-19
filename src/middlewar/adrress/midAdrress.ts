import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../util/apiError.js";
import { number, object, string } from "yup";

const midAdrressCreateSchema = object({
    cep: string().required().length(8),
    street: string().required().min(4),
    number: number().min(1),
    neighborhood: string().required(),
    city: string().required().min(4),
    custommerId: string().required(),
});

const MidAdrressCreate = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midAdrressCreateSchema
        .validate(request.body)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const midAdrressUpdateSchema = object({
    cep: string().required().length(8),
    street: string().required().min(4),
    number: number().min(1),
    neighborhood: string().required(),
    city: string().required().min(4),
    custommerId: string().required(),
});
const MidAdrressUpdate = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midAdrressUpdateSchema
        .validate(request.body)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const midAdrressGetAdrress = object({
    cep: string().required().length(8),
});
const MidAdrressGetAdrress = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midAdrressGetAdrress
        .validate(request.body)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const midGetAdrressCustommerId = object({
    custommerId: string().required(),
});
const MidGetAdrressCustommerId = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midGetAdrressCustommerId
        .validate(request.params)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const midAdrressDeleteSchema = object({
    custommerId: string().required(),
});
const MidAdrressDelete = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midAdrressDeleteSchema
        .validate(request.body)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

export {
    MidAdrressCreate,
    MidAdrressUpdate,
    MidAdrressDelete,
    MidAdrressGetAdrress,
    MidGetAdrressCustommerId,
};
