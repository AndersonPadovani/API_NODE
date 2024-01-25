import Jwt from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function JwtCreate(paiload: any): Promise<string> {
    const { password, ...PAYLOAD } = paiload;
    return Jwt.sign({ PAYLOAD }, process.env.JWT_PASSWORD!, {
        expiresIn: "1H",
    });
}

export async function JwtAuthenticateJwtToken(token: string) {
    Jwt.verify(token, process.env.JWT_PASSWORD!);
}
