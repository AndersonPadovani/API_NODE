import { Request, Response, Router } from "express";
import {
    MidProductCreate,
    MidProductDelete,
    MidProductGetByLikeName,
    MidProductGetByName,
    MidProductUpdate,
} from "../../middlewar/product/midProduct.js";
import * as Controler from "../../controlers/controlers.js";

const appRouter = Router();

appRouter.get(
    "/product",
    Controler.Product.getAll,
    (request: Request, response: Response) => {
        response.status(200).send();
    }
);

appRouter.get(
    "/product/name/:name",
    MidProductGetByName,
    Controler.Product.getByName,
    (request: Request, response: Response) => {
        response.status(200).json(request.body.resultDb);
    }
);

appRouter.get(
    "/product/like/:like",
    MidProductGetByLikeName,
    Controler.Product.getLikeName,
    (request: Request, response: Response) => {
        response.status(200).json(request.body.resultDb);
    }
);

appRouter.post(
    "/product",
    MidProductCreate,
    Controler.Product.Post,
    (request: Request, response: Response) => {
        response.status(201).send();
    }
);
appRouter.patch(
    "/product",
    MidProductUpdate,
    Controler.Product.Patch,
    (request: Request, response: Response) => {
        response.status(204).send();
    }
);
appRouter.delete(
    "/product",
    MidProductDelete,
    Controler.Product.Delete,
    (request: Request, response: Response) => {
        response.status(204).send();
    }
);

export { appRouter };
