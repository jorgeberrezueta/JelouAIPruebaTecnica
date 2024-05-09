import { NextFunction, Request, Response } from "express";
import { verify } from "../util/jwt";
import { errorHandlingMethod } from "./errorHandler.middleware";
import { UnauthorizedError } from "../errors";
import { prisma } from "../database";
import { AuthenticatedRequest } from "../request/authenticatedRequest";

const authMiddleware = errorHandlingMethod(async function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];

    if (!token) {
        throw new UnauthorizedError("No token provided.");
    }

    const args = token.split(" ");
    if (args.length !== 2 && args[0] !== "Bearer") {
        throw new UnauthorizedError("Invalid token format.");
    }

    try {
        const session_token = args[1];
        // Verify the token (expiration, signature, etc.)
        verify(session_token);

        // Verify if the token is the latest session token
        const credentials = await prisma.userCredentials.findFirst({
            where: {
                session_token
            },
            include: {
                user: true
            }
        });
        // Assume the token is invalid
        if (!credentials) throw new Error();

        (req as AuthenticatedRequest).user = credentials.user;
        next();
    } catch (error) {
        throw new UnauthorizedError("Invalid token."); // Send to the error handler
    }
});

export { authMiddleware };