import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { BadRequest, Conflict } from "../../util/apiError.js";

const prisma = new PrismaClient();

interface ProdSchema {
    id: string;
    name: string;
    description: string;
    price: string;
    amount: string;
}

const getAll = async (request: Request, response: Response) => {
    const productDb = await prisma.product.findMany({});

    if (productDb.length <= 0) {
        throw new BadRequest("Nenhum usuario encontrado!");
    }

    return response.status(200).json(productDb);
};
const Post = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const productData = request.body as ProdSchema;
    await prisma.product
        .create({
            data: {
                name: productData.name,
                description: productData.description,
                price: parseFloat(productData.price),
                amount: parseInt(productData.amount),
            },
        })
        .then(() => {
            next();
        })
        .catch((err) => {
            if (err.code === "P2002") {
                throw new Conflict(
                    `${productData.name} já cadastrado no sistema!`
                );
            }
            throw new BadRequest(err);
        });
};
const Patch = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const productData = request.body as ProdSchema;

    await prisma.product
        .update({
            where: {
                id: productData.id,
            },
            data: {
                name: productData.name,
                description: productData.description,
                price: parseFloat(productData.price),
                amount: parseInt(productData.amount),
                update_at: new Date(),
            },
        })
        .then(() => next())
        .catch((err) => {
            if (err.code === "P2002") {
                throw new Conflict(
                    `${productData.name} já cadastrado no sistema!`
                );
            } else if (err.code === "P2025") {
                throw new BadRequest(
                    `Id: ${productData.id} do produto não localizado!`
                );
            }
        });
};
const Delete = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const productData = request.body as ProdSchema;

    await prisma.product
        .delete({
            where: {
                id: productData.id,
            },
        })
        .then(() => next())
        .catch((err) => {
            if (err.code === "P2025") {
                throw new BadRequest(
                    `Id: ${productData.id} do produto não localizado!`
                );
            }
        });
};

export { getAll, Post, Patch, Delete };
