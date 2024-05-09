import { Request, Response, NextFunction } from "express";
import BaseError, { ValidationError } from "../errors";
import { errorResponse, validationErrorResponse } from "../models/response/base.response";
import { errorLogger } from "../util/logging";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        const validationError = err as ValidationError;
        return res.status(400).send(validationErrorResponse(validationError.result));
    }
    
    if (err instanceof BaseError) {
        return res.status(err.statusCode).send(errorResponse([err.message]));
    }
    // Return all other uncaught errors as 500
    errorLogger.error("", err);
    res.status(500).send(errorResponse([err.message]));
}

type ExpressFunction = (req: Request, res: Response, next: NextFunction) => void;

export const errorHandlingMethod = (func: ExpressFunction): ExpressFunction => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (error) {
            next(error); // Catch all errors
        }
    }
}
