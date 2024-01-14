import 'express-async-errors';
import express from "express";
import {networkInterfaces} from "os";
import dotenv from 'dotenv';
import Routers from "./router/routers.js";
import { MidError } from "./middlewar/midError.js";
import { MidCustommer } from './middlewar/custommer/midCustommer.js';
import Controler from './controlers/controlers.js';
dotenv.config();

const PORT = process.env.PORT || 3000;
const locaIpWiFi = networkInterfaces()

const App = express();

App.use(express.json())

App.get("/", Routers.Index);

// Rotas Cutomer GET | POST | UPDATE | DELETE
App.get("/customer", Routers.Customer.Get)
App.post("/customer", MidCustommer, Controler.Customer.Create, Routers.Customer.Post)
App.patch("/customer", Routers.Customer.Patch)
App.delete("/customer", Routers.Customer.Delete)


App.use(MidError); //Middlewar que recebe todos os erros da aplicação com personalização de status code

App.listen(process.env.PORT || 3000, () => {
    console.log(`###  Servidor On ${locaIpWiFi['Wi-Fi']![4].address || "localhost"}:${PORT} ###`);
    
})
