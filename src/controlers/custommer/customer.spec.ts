import { describe, test, expect } from "vitest";
import axios from "axios";

describe("Testes na pagina 'customer' || '/customer'", async () => {
    const localURL =
        (process.env.BASEURL || "http://localhost:3000") + "/customer";

    test("Post /customer cadastrando novo usuario", async () => {
        const res = await axios.post(localURL, {
            name: "Anderson Ramos Padovani",
            phone: "(45) 9 9953-0893",
            password: "admin",
        });

        expect(res.status).toBe(201); //Caso seja criado com seucesso 201 ok
    });

    test("Get /custommer validando StatusCode e retorno de usuario cadastrado", async () => {
        const res = await axios.get(localURL);

        expect(res.status).toBe(200);
        expect(res.data[0].name).toEqual("Anderson Ramos Padovani");
    });

    test("Update /custommer Atualizando usuario", async () => {
        const res = await axios.get(localURL);
        const { id, name, phone, password } = res.data[0];

        const email = "andersonpadovani@protonmail.com";
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

        const afterUpdate = await axios.get(localURL);
        expect(afterUpdate.data[0].email).toEqual(email);
    });

    test("/custommer Validando entrada duplicada de usuario no banco de dados!", async () => {
        await axios
            .post(localURL, {
                name: "Anderson Ramos Padovani",
                phone: "(45) 9 9953-0893",
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
        const { data } = await axios.get(localURL);
        const firstUserDb = data[0].id;

        const res = await axios.delete(localURL, {
            data: {
                id: firstUserDb,
            },
        });

        expect(res.status).toBe(204);
    });
});
