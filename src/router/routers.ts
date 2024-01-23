import { Router } from "express";
import * as RouterCustommer from "./routerCustomer/customer.js";
import * as RouterProdduct from "./routerProduct/routerProduct.js";
import * as RouterAddress from "./routerAddress/adrress.js";

import { Index } from "./routerIndex/index.js";

const appRouter = Router();

appRouter.get("/", Index);

// Rotas Cutomer GET | POST | UPDATE | DELETE
appRouter.use(RouterCustommer.appRouter);

// Rotas Product GET | POST | UPDATE | DELETE
appRouter.use(RouterProdduct.appRouter);

// Rotas Adrress GET | POST | UPDATE | DELETE
appRouter.use(RouterAddress.appRouter);

export { appRouter };
