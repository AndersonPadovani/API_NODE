import { Request, Response } from "express";
import {PrismaClient} from '@prisma/client'
import { BadRequest } from "../../util/apiError.js";


const prisma = new PrismaClient();

const Get = async (request: Request, response: Response) => {
    const result = await prisma.custommer.findMany({})

    if(result.length <= 0){
        throw new BadRequest("Nenhum usuario encontrado!");
    }

    return response.status(200).json(result)

}

const Post = async (request: Request, response: Response) => {
    response.status(201).send();
}

const Patch = (request: Request, response: Response) => {
    response.status(200).json({"ApiStatus": "ON", "Page": "patchCustomer"}).send()
}

const Delete = (request: Request, response: Response) => {
    response.status(200).json({"ApiStatus": "ON", "Page": "deleteCustomer"}).send()
}

export {Get, Post, Patch, Delete};