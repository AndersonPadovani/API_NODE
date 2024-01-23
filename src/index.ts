import "express-async-errors";
import express from "express";
import { networkInterfaces } from "os";
import dotenv from "dotenv";
import { appRouter } from "./router/routers.js";
import { MidError } from "./middlewar/midError.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const locaIpWiFi = networkInterfaces();

const App = express();

App.use(express.json());

App.use(appRouter);

App.use(MidError); //Middlewar que recebe todos os erros da aplicação com personalização de status code

App.listen(process.env.PORT || 3000, () => {
    console.log(
        `###  Servidor On ${
            locaIpWiFi["Wi-Fi"]![4].address || "localhost"
        }:${PORT} ###`
    );
});
