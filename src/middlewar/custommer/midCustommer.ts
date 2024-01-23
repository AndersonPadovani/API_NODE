import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../util/apiError.js";
import { object, string } from "yup";

const midCustommerGetByPhoneSchema = object({
    phone: string().required().length(16),
});

const MidCustommerGetByPhone = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midCustommerGetByPhoneSchema
        .validate(request.params)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const midCustommerGetByEmailSchema = object({
    email: string().required().email(),
});

const MidCustommerGetByEmail = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midCustommerGetByEmailSchema
        .validate(request.params)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const midCustommerCreateSchema = object({
    name: string().required().min(4),
    phone: string().required().length(16),
    email: string().email(),
    password: string().required().min(4),
    cpf: string().length(11),
});

const MidCustommerCreate = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midCustommerCreateSchema
        .validate(request.body)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const midCustommerUpdateSchema = object({
    id: string().required(),
    name: string().min(4).required(),
    phone: string().length(16).required(),
    email: string().email().required(),
    password: string().min(4).required(),
    cpf: string().length(11).required(),
});
const MidCustommerUpdate = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midCustommerUpdateSchema
        .validate(request.body)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const midCustommerDeleteSchema = object({
    id: string().required(),
});
const MidCustommerDelete = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await midCustommerDeleteSchema
        .validate(request.body)
        .then(async () => {
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

export {
    MidCustommerCreate,
    MidCustommerUpdate,
    MidCustommerDelete,
    MidCustommerGetByPhone,
    MidCustommerGetByEmail,
};
