import { Request, Response } from "express";

const Index = (request: Request, response: Response) => {
    response.status(200).json({"ApiStatus": "ON"}).send()
}

export {Index};