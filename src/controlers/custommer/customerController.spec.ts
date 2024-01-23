import { describe, test, expect } from "vitest";
import axios from "axios";

describe("Testes na pagina 'customer' || '/customer'", async () => {
    const localURL =
        (process.env.BASEURL || "http://localhost:3000") + "/customer";

    test("Post /customer cadastrando novo usuario", async () => {
        const res = await axios.post(localURL, {
            name: "Jhon Doe",
            phone: "(45) 9 9999-9999",
            password: "admin",
        });

        expect(res.status).toBe(201); //Caso seja criado com seucesso 201 ok
    });

    test("Get /custommer validando StatusCode e retorno de usuario cadastrado", async () => {
        const res = await axios.get(localURL + "/phone/(45) 9 9999-9999");

        expect(res.status).toBe(200);
        expect(res.data["name"]).toEqual("Jhon Doe");
    });

    test("Update /custommer Atualizando usuario", async () => {
        const res = await axios.get(localURL + "/phone/(45) 9 9999-9999");
        const { id, name, phone, password } = res.data;

        const email = "jhon@doe.com.br";
        const cpf = "12345678910";

        const update = await axios.patch(localURL, {
            id: id,
            name: name,
            phone: phone,
            email: email,
            password: password,
            cpf: cpf,
        });

        expect(update.status).toBe(204);
    });

    test("Get /custommer validando se o usuario foi atualizado com sucesso.", async () => {
        const res = await axios.get(localURL + "/phone/(45) 9 9999-9999");

        expect(res.status).toBe(200);
        expect(res.data["name"]).toEqual("Jhon Doe");
        expect(res.data["email"]).toEqual("jhon@doe.com.br");
    });

    test("/custommer Validando entrada duplicada de usuario no banco de dados!", async () => {
        await axios
            .post(localURL, {
                name: "Jhon Doe",
                phone: "(45) 9 9999-9999",
                password: "admin",
            })
            .then((res) => {
                expect(res.status).toBe(201); //Caso seja criado com seucesso 201 ok
            })
            .catch((err) => {
                expect(err.response.status).toBe(409); //Caso banco de dados recuse por entrada duplicada 409 Conflict
            });
    });

    test("/custommer Excluindo usuario pelo id", async () => {
        const { data } = await axios.get(localURL + "/phone/(45) 9 9999-9999");
        const firstUserDb = data["id"];

        const res = await axios.delete(localURL, {
            data: {
                id: firstUserDb,
            },
        });

        expect(res.status).toBe(204);
    });
});
