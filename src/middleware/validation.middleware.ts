import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from 'joi';
import { errorHandlingMethod } from "./errorHandler.middleware";
import { ValidationError } from "../errors";

export const validationMiddleware = function <T>(schema: ObjectSchema<T>) {
    return errorHandlingMethod((req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body);
        if (result.error) {
            throw new ValidationError(result);
        }
        next();
    });
}