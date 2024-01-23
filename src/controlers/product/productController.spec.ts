import { describe, test, expect } from "vitest";
import axios from "axios";

describe("Testes na pagina 'product' || '/product'", async () => {
    const localURL =
        (process.env.BASEURL || "http://localhost:3000") + "/product";

    test("Post /product cadastrando novo produto", async () => {
        const res = await axios.post(localURL, {
            amount: "8",
            price: "2325.50",
            description: "Celular Xiaomi Poco X6 Pro",
            name: "Poco X6 - Pro 256Gb",
        });

        expect(res.status).toBe(201); //Caso seja criado com seucesso 201 ok
    });

    test("Get /product validando StatusCode e retorno de produto cadastrado", async () => {
        const res = await axios.get(localURL + "/name/Poco X6 - Pro 256Gb");

        expect(res.status).toBe(200);
        expect(res.data["name"]).toEqual("Poco X6 - Pro 256Gb");
    });

    test("Update /product Atualizando produto", async () => {
        const res = await axios.get(localURL + "/name/Poco X6 - Pro 256Gb");
        const { data } = res;

        const update = await axios.patch(localURL, {
            id: data["id"],
            amount: "8",
            price: "2325.50",
            description: "Celular Xiaomi Poco X6 Ultra",
            name: "Poco X6 - Ultra 1Tb",
        });

        expect(update.status).toBe(204);
    });

    test("Get /product validando se o produto foi atualizado com sucesso.", async () => {
        const res = await axios.get(localURL + "/name/Poco X6 - Ultra 1Tb");

        expect(res.status).toBe(200);
        expect(res.data["description"]).toEqual("Celular Xiaomi Poco X6 Ultra");
        expect(res.data["price"]).toEqual(2325.5);
    });

    test("/product Validando entrada duplicada de produto no banco de dados!", async () => {
        await axios
            .post(localURL, {
                amount: "8",
                price: "2325.50",
                description: "Celular Xiaomi Poco X6 Ultra",
                name: "Poco X6 - Ultra 1Tb",
            })
            .catch((err) => {
                expect(err.response.status).toBe(409); //Caso banco de dados recuse por entrada duplicada 409 Conflict
            });
    });

    test("/product Excluindo produto pelo id", async () => {
        const { data } = await axios.get(
            localURL + "/name/Poco X6 - Ultra 1Tb"
        );
        const firstUserDb = data["id"];

        const res = await axios.delete(localURL, {
            data: {
                id: firstUserDb,
            },
        });

        expect(res.status).toBe(204);
    });
});
