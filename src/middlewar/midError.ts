import { Request, Response, NextFunction } from "express";
import { ApiError } from "../util/apiError.js";

export const MidError = (
    error: Error & Partial<ApiError>,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const stsCode = error.statusCode ?? 500;
    const msgErro = error.statusCode ? error.message : "Internal Server Error!";
    // const msgErro = error.statusCode ? error.message : "Internal Server Error: " + error.message;

    response.status(stsCode).json({ message: msgErro });
};
