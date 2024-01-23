import { test, expect } from "vitest";
import { getAddress } from "./getAddressViaCep.js";

test("Testando via Cep", async () => {
    const { bairro, localidade, logradouro } = await getAddress(85811450);

    expect(bairro).toEqual("Cancelli");
    expect(localidade).toEqual("Cascavel");
    expect(logradouro).toEqual("Rua Oswaldo Marcondes de Campos");
});
