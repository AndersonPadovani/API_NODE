import { NextFunction, Request, Response } from "express";
import { BadRequest, Unautorized } from "../../util/apiError.js";
import { object, string } from "yup";
import { JwtAuthenticateJwtToken } from "../../util/jwtAuth.js";

interface authBody {
    email?: string;
    phone?: string;
    password?: string;
}

const MidAuth = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const dataAuth = request.body as authBody;

    const midAuthEmailSchema = object({
        email: string().required().email(),
        password: string().required().min(4),
    });

    const midAuthPhoneSchema = object({
        phone: string().required().length(16),
        password: string().required().min(4),
    });

    if (dataAuth.email) {
        await midAuthEmailSchema
            .validate(request.body)
            .then(async () => {
                request.body.authType = "EMAIL";
                next();
            })
            .catch((err) => {
                throw new BadRequest(err);
            });
    }

    await midAuthPhoneSchema
        .validate(request.body)
        .then(async () => {
            request.body.authType = "PHONE";
            next();
        })
        .catch((err) => {
            throw new BadRequest(err);
        });
};

const MidAuthRouter = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const midJwtTokenSchema = object({
        bearer: string().required(),
    });

    await midJwtTokenSchema
        .validate(request.headers)
        .then(async () => {
            const jwtValidate = await JwtAuthenticateJwtToken(
                request.headers.bearer!.toString()
            );
            console.log(jwtValidate);

            request.body.JwtDecode = jwtValidate;
            next();
        })
        .catch((err) => {
            throw new Unautorized(err);
        });
};

export { MidAuth, MidAuthRouter };
