import { Request, Response } from "express";

const Index = async (request: Request, response: Response) => {
    response.status(201).send();
};

const Post = async (request: Request, response: Response) => {
    response.status(201).send();
};

const Patch = (request: Request, response: Response) => {
    response.status(204).send();
};

const Delete = (request: Request, response: Response) => {
    response.status(204).send();
};

export { Index, Post, Patch, Delete };
