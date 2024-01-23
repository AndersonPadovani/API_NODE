import { describe, test, expect } from "vitest";
import axios from "axios";

describe("Testes na pagina 'index' || '/'", async () => {
    const localURL = process.env.BASEURL || "http://localhost:3000";

    test("Verifica se a 'API' está online com retorno de status code 200", async () => {
        const res = await axios.get(localURL);

        expect(res.status).toBe(200);
    });
});
