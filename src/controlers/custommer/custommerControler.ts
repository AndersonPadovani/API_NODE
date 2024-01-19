import { PrismaClient } from "@prisma/client";
import { BadRequest, Conflict } from "../../util/apiError.js";
import { NextFunction, Request, Response } from "express";
import { Sha1 } from "../../util/sha1.js";
import { date } from "yup";

const prisma = new PrismaClient();

interface reqBody {
    id?: string;
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    cpf?: string;
}

async function GetAll(
    request: Request,
    resposne: Response,
    next: NextFunction
) {
    const result = await prisma.custommer.findMany({});

    if (result.length <= 0) {
        throw new BadRequest("Nenhum usuario encontrado!");
    }

    return resposne.status(200).json(result);
}

async function GetById(
    request: Request,
    resposne: Response,
    next: NextFunction
) {}

async function Create(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const userData = request.body as reqBody;

    await prisma.custommer
        .create({
            data: {
                name: userData.name,
                phone: userData.phone!,
                email: userData.email,
                password: Sha1(userData.password!),
                cpf: userData.cpf,
            },
        })
        .catch((err) => {
            if (err.code === "P2002") {
                if (err.meta?.target?.includes("phone")) {
                    throw new Conflict(
                        `${userData.phone} já cadastrado no sistema!`
                    );
                } else if (err.meta?.target?.includes("email")) {
                    throw new Conflict(
                        `${userData.email} já cadastrado no sistema!`
                    );
                }
            }
        });

    next();
}

async function Patch(request: Request, resposne: Response, next: NextFunction) {
    const userData = request.body as reqBody;

    await prisma.custommer
        .update({
            where: {
                id: userData.id,
            },
            data: {
                name: userData.name,
                phone: userData.phone,
                email: userData.email,
                password: userData.password,
                cpf: userData.cpf,
                update_at: new Date(),
            },
        })
        .then(() => {
            next();
        })
        .catch((err) => {
            if (err.code === "P2002") {
                if (err.meta?.target?.includes("phone")) {
                    throw new Conflict(
                        `${userData.phone} já cadastrado no sistema!`
                    );
                } else if (err.meta?.target?.includes("email")) {
                    throw new Conflict(
                        `${userData.email} já cadastrado no sistema!`
                    );
                }
            }

            if (err.code === "P2025") {
                throw new BadRequest("Usuario não localizado!");
            }

            throw new BadRequest(
                `Falha ao atualizar o usuario:"${userData.name}". \nErro: ${err.message}`
            );
        });
}

async function Delete(
    request: Request,
    resposne: Response,
    next: NextFunction
) {
    const userData = request.body as reqBody;
    await prisma.custommer
        .delete({
            where: {
                id: userData.id,
            },
        })
        .then(() => next())
        .catch((err) => {
            if (err.code === "P2025") {
                throw new BadRequest("Usuario não localizado!");
            }
            throw new BadRequest(err.message);
        });
}

export { GetAll, GetById, Create, Patch, Delete };
