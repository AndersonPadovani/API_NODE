import { test, expect } from "vitest";
import { getAddress } from "./getAddressViaCep.js";

test("Testando via Cep", async () => {
    const { bairro } = await getAddress(85811450);

    expect(bairro).toEqual("Cancelli");
});
