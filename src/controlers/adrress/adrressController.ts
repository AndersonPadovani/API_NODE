import { PrismaClient } from "@prisma/client";
import { BadRequest, Conflict } from "../../util/apiError.js";
import { NextFunction, Request, Response } from "express";
import { getAddress } from "../../util/getAddressViaCep.js";

const prisma = new PrismaClient();

interface adrressBody {
    id?: string;
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    number?: string;
    custommerId: string;
}

async function GetAdrress(
    request: Request,
    resposne: Response,
    next: NextFunction
) {
    const { logradouro, bairro, localidade, erro } = await getAddress(
        parseInt(request.body.cep)
    );

    console.log(request.params);

    if (erro) {
        throw new BadRequest("Cep informado não foi localizado!");
    }

    resposne.status(200).json({
        logradouro: logradouro,
        bairro: bairro,
        localidade: localidade,
    });
}

async function GetByCustommerId(
    request: Request,
    resposne: Response,
    next: NextFunction
) {
    const custommer = request.params.custommerId;

    console.log(custommer);

    const resDb = await prisma.address
        .findMany({
            where: {
                CustommerId: custommer,
            },
        })
        .catch(() => {
            throw new BadRequest("Usuario não localizado!");
        });

    if (resDb.length <= 0) {
        throw new BadRequest("Nenhum usuario encontrado!");
    }

    resposne.status(200).json(resDb);
}

async function Create(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const adrresData = request.body as adrressBody;
    await prisma.address
        .create({
            data: {
                cep: parseInt(adrresData.cep),
                street: adrresData.street,
                neighborhood: adrresData.neighborhood,
                number: parseInt(adrresData.number!) || 1,
                city: adrresData.city,
                CustommerId: adrresData.custommerId,
            },
        })
        .then(() => {
            next();
        })
        .catch((err) => {
            if (err.code === "P2002") {
                throw new Conflict(
                    `Usuario ja tem endereço registrado no sistema!`
                );
            } else if (err.code === "P2003") {
                throw new Conflict(`Id de usuario não localizado!`);
            }

            throw new BadRequest(err.code + err);
        });
}

async function Patch(request: Request, resposne: Response, next: NextFunction) {
    const adrresData = request.body as adrressBody;
    await prisma.address
        .update({
            where: { CustommerId: adrresData.custommerId },
            data: {
                cep: parseInt(adrresData.cep),
                street: adrresData.street,
                neighborhood: adrresData.neighborhood,
                number: parseInt(adrresData.number!) || 1,
                city: adrresData.city,
                update_at: new Date(),
            },
        })
        .then(() => {
            next();
        })
        .catch((err) => {
            if (err.code === "P2003" || err.code === "P2025") {
                throw new BadRequest(`Id de usuario não localizado!`);
            }

            throw new BadRequest(err.code + err);
        });
}

async function Delete(
    request: Request,
    resposne: Response,
    next: NextFunction
) {
    const adrresData = request.body as adrressBody;

    await prisma.address
        .delete({
            where: { CustommerId: adrresData.custommerId },
        })
        .then(() => next())
        .catch((err) => {
            if (err.code === "P2025") {
                throw new BadRequest("Usuario não localizado!");
            }
            throw new BadRequest("Falha: " + err.message);
        });
}

export { GetAdrress, GetByCustommerId, Create, Patch, Delete };
