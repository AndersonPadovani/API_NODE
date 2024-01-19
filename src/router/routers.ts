import { Router } from "express";
import Controler from "../controlers/controlers.js";
import {
    MidCustommerCreate,
    MidCustommerDelete,
    MidCustommerUpdate,
} from "../middlewar/custommer/midCustommer.js";
import {
    MidProductCreate,
    MidProductUpdate,
} from "../middlewar/product/midProduct.js";
import {
    MidAdrressCreate,
    MidAdrressUpdate,
    MidAdrressDelete,
    MidAdrressGetAdrress,
    MidGetAdrressCustommerId,
} from "../middlewar/adrress/midAdrress.js";

import { Index } from "./routerIndex/index.js";
import * as RouterCustommer from "./routerCustomer/customer.js";
import * as RouterProduct from "./routerProduct/routerProduct.js";
import * as Adrress from "./routerAddress/adrress.js";

const appRouter = Router();

appRouter.get("/", Index);

// Rotas Cutomer GET | POST | UPDATE | DELETE
appRouter.get("/customer", Controler.Customer.GetAll);
appRouter.post(
    "/customer",
    MidCustommerCreate,
    Controler.Customer.Create,
    RouterCustommer.Post
);
appRouter.patch(
    "/customer",
    MidCustommerUpdate,
    Controler.Customer.Patch,
    RouterCustommer.Patch
);
appRouter.delete(
    "/customer",
    MidCustommerDelete,
    Controler.Customer.Delete,
    RouterCustommer.Delete
);

// Rotas Product GET | POST | UPDATE | DELETE
appRouter.get("/product", Controler.Product.getAll);
appRouter.post(
    "/product",
    MidProductCreate,
    Controler.Product.Post,
    RouterProduct.Post
);
appRouter.patch(
    "/product",
    MidProductUpdate,
    Controler.Product.Patch,
    RouterProduct.Patch
);
appRouter.delete("/product", Controler.Product.Delete, RouterProduct.Delete);

// Rotas Adrress GET | POST | UPDATE | DELETE
appRouter.get("/adrress", MidAdrressGetAdrress, Controler.Adrress.GetAdrress);
appRouter.get(
    "/adrress/:custommerId",
    MidGetAdrressCustommerId,
    Controler.Adrress.GetByCustommerId
);
appRouter.post(
    "/adrress",
    MidAdrressCreate,
    Controler.Adrress.Create,
    Adrress.Post
);
appRouter.patch(
    "/adrress",
    MidAdrressUpdate,
    Controler.Adrress.Patch,
    Adrress.Patch
);
appRouter.delete(
    "/adrress",
    MidAdrressDelete,
    Controler.Adrress.Delete,
    Adrress.Delete
);

export { appRouter };
