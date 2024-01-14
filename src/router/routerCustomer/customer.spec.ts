import { describe, test, expect } from "vitest";
import axios from "axios";

describe("Testes na pagina 'customer' || '/customer'", async () => {
    const localURL = (process.env.BASEURL || "http://localhost:3000") + "/customer";

    test("Post /customer cadastrando novo usuario", async () => {
        await axios.post(localURL, {
            name: "Anderson Ramos Padovani",
            phone: "(45) 9 9953-0893",
            password: "admin"
        }).then((res) => {
            expect(res.status).toBe(201); //Caso seja criado com seucesso 201 ok
        }).catch((err) => {            
            expect(err.response.status).toBe(409); //Caso banco de dados recuse por entrada duplicada 409 Conflict
        })
    })

    test("Get /custommer validando StatusCode e retorno", async () => {        
        const res = await axios.get(localURL);        

        expect(res.status).toBe(200);
        expect(res.data[0].name).toEqual("Anderson Ramos Padovani");
        
    });

    
})