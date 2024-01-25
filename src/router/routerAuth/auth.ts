import { Request, Response, Router } from "express";
import { MidAuth } from "../../middlewar/auth/midAuth.js";
import * as Controler from "../../controlers/controlers.js";

const appRouter = Router();

appRouter.post(
    "/auth",
    MidAuth,
    Controler.AuthCustommer.Auth,
    (request: Request, response: Response) => {
        response.status(200).json({ TOKEN: request.body.authToken });
    }
);

export { appRouter };
