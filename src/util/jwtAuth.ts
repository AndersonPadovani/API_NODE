import Jwt from "jsonwebtoken";
import { Unautorized } from "./apiError.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function JwtCreate(paiload: any): Promise<string> {
    const { password, ...PAYLOAD } = paiload;
    return Jwt.sign({ PAYLOAD }, process.env.JWT_PASSWORD!, {
        expiresIn: "1H",
    });
}

export async function JwtAuthenticateJwtToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        Jwt.verify(token, process.env.JWT_PASSWORD!, (err, decode) => {
            if (err) {
                throw new Unautorized(err.message);
            }

            resolve(decode);
        });
    });
}
