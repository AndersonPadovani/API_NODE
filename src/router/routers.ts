import { Router } from "express";
import * as RouterCustommer from "./routerCustomer/customer.js";
import * as RouterProdduct from "./routerProduct/routerProduct.js";
import * as RouterAddress from "./routerAddress/adrress.js";
import * as RouterAuth from "./routerAuth/auth.js";

import { Index } from "./routerIndex/index.js";

const appRouter = Router();

// Rotas Auth POST
appRouter.get("/", Index);

appRouter.use(RouterAuth.appRouter);

// Rotas Cutomer GET | POST | UPDATE | DELETE
appRouter.use(RouterCustommer.appRouter);

// Rotas Product GET | POST | UPDATE | DELETE
appRouter.use(RouterProdduct.appRouter);

// Rotas Adrress GET | POST | UPDATE | DELETE
appRouter.use(RouterAddress.appRouter);

export { appRouter };
