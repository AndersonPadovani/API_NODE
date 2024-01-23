import { Request, Response, Router } from "express";
import {
    MidCustommerCreate,
    MidCustommerDelete,
    MidCustommerGetByEmail,
    MidCustommerGetByPhone,
    MidCustommerUpdate,
} from "../../middlewar/custommer/midCustommer.js";
import * as Controler from "../../controlers/controlers.js";

const appRouter = Router();

appRouter.get(
    "/customer",
    Controler.Customer.GetAll,
    (request: Request, response: Response) => {
        return response.status(200).json(request.body.resultDb);
    }
);

appRouter.get(
    "/customer/phone/:phone",
    MidCustommerGetByPhone,
    Controler.Customer.GetByPhone,
    (request: Request, response: Response) => {
        return response.status(200).json(request.body.resultDb);
    }
);

appRouter.get(
    "/customer/email/:email",
    MidCustommerGetByEmail,
    Controler.Customer.GetByPhone,
    (request: Request, response: Response) => {
        return response.status(200).json(request.body.resultDb);
    }
);

appRouter.post(
    "/customer",
    MidCustommerCreate,
    Controler.Customer.Create,
    (request: Request, response: Response) => {
        response.status(201).send();
    }
);
appRouter.patch(
    "/customer",
    MidCustommerUpdate,
    Controler.Customer.Patch,
    (request: Request, response: Response) => {
        response.status(204).send();
    }
);
appRouter.delete(
    "/customer",
    MidCustommerDelete,
    Controler.Customer.Delete,
    (request: Request, response: Response) => {
        response.status(204).send();
    }
);

export { appRouter };
