import { Request, Response, Router } from "express";
import {
    MidAdrressCreate,
    MidAdrressDelete,
    MidAdrressGetAdrress,
    MidAdrressUpdate,
    MidGetAdrressCustommerId,
} from "../../middlewar/adrress/midAdrress.js";
import * as Controler from "../../controlers/controlers.js";

const appRouter = Router();

appRouter.get("/adrress", MidAdrressGetAdrress, Controler.Adrress.GetAdrress);
appRouter.get(
    "/adrress/:custommerId",
    MidGetAdrressCustommerId,
    (request: Request, response: Response) => {
        response.status(201).send();
    }
);
appRouter.post(
    "/adrress",
    MidAdrressCreate,
    Controler.Adrress.Create,
    (request: Request, response: Response) => {
        response.status(201).send();
    }
);
appRouter.patch(
    "/adrress",
    MidAdrressUpdate,
    Controler.Adrress.Patch,
    (request: Request, response: Response) => {
        response.status(204).send();
    }
);
appRouter.delete(
    "/adrress",
    MidAdrressDelete,
    Controler.Adrress.Delete,
    (request: Request, response: Response) => {
        response.status(204).send();
    }
);

export { appRouter };
