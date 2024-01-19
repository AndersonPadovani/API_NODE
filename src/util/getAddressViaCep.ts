import axios from "axios";
import { InternalServerError } from "./apiError.js";

const getAddress = async (cep: number) => {
    const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;
    const dataCep = await axios.get(viaCepUrl).catch(() => {
        throw new InternalServerError("Falha ao buscar ceep!");
    });

    return dataCep.data;
};

export { getAddress };
