import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { BadRequest, Unautorized } from "../../util/apiError.js";
import { Sha1 } from "../../util/sha1.js";
import { JwtAuthenticateJwtToken, JwtCreate } from "../../util/jwtAuth.js";

const prisma = new PrismaClient();

interface authBody {
    email?: string;
    phone?: string;
    password: string;
    authType: "EMAIL" | "PHONE";
}

const Auth = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { email, phone, password, authType } = request.body as authBody;

    if (authType === "EMAIL") {
        await prisma.custommer
            .findUnique({
                where: {
                    email: email,
                },
            })
            .then((resDb) => {
                console.log(resDb);
            })
            .catch((err) => {
                throw new BadRequest(
                    `Falha de autenticação por Email ${err.code}`
                );
            });
    }

    const authPhone = await prisma.custommer
        .findUnique({
            where: {
                phone: phone,
            },
        })
        .catch((err) => {
            throw new BadRequest(
                `Falha de autenticação por Telefone ${err.code}`
            );
        });

    if (!authPhone || authPhone.password != Sha1(password)) {
        throw new Unautorized("Usuario ou senha incorretos!");
    }

    request.body.authToken = await JwtCreate(authPhone);

    next();
};

export { Auth };
