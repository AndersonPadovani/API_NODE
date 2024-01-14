import { describe, test, expect } from "vitest";
import axios from "axios";

describe("Testes na pagina 'index' || '/'", async () => {
    const localURL = process.env.BASEURL || "http://localhost:3000";

    test("Verifica se a pagina index esta retornando status 200", async () => {
        const res = await axios.get(localURL);

        expect(res.status).toBe(200);
    });

    test("Verifica se a pagina Index esta vindo em formato JSON", async () => {
        const res = await axios.get(localURL);        
        expect(res.data["ApiStatus"]).toBe("ON");
    })
    
})