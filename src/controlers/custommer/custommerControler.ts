import { PrismaClient } from "@prisma/client";
import { Conflict } from "../../util/apiError.js";
import { NextFunction, Request, Response } from "express";
import { Sha1 } from "../../util/sha1.js";


const prisma = new PrismaClient();

interface reqBody{
    name: string,
    phone: string,
    email?: string,
    password: string,
    cpf?: number
}

async function Create(request: Request, response:Response, next: NextFunction){
    const userData = request.body as reqBody;    

    await prisma.custommer.create({
        data: {
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            password: Sha1(userData.password),
            cpf: userData.cpf
        }
    }).catch((err) => {
        if(err.code === "P2002"){                
            if(err.meta?.target?.includes("phone")){
                throw new Conflict(`${userData.phone} já cadastrado no sistema!`)
            }else if(err.meta?.target?.includes("email")) {
                throw new Conflict(`${userData.email} já cadastrado no sistema!`)
            }
        }            
    })

    next();
}

export {Create}
