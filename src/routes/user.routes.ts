import { Router } from "express";
import { errorHandlingMethod } from "../middleware/errorHandler.middleware";
import { sign } from "../util/jwt";
import { prisma } from "../database";
import { ForbiddenError, InvalidCredentialsError } from "../errors";
import { validationMiddleware } from "../middleware/validation.middleware";
import { LoginRequestSchema, LoginRequest, RegisterRequestSchema, RegisterRequest } from "../models/request/user.requests";
import { LoginResponse } from "../models/response/login.response";
import { comparePassword, encryptPassword } from "../util/bcrypt";
import { successResponse } from "../models/response/base.response";

const router = Router();

router.post("/login", validationMiddleware(LoginRequestSchema), errorHandlingMethod(async (req, res, next) => {
    const body = req.body as LoginRequest;

    const assertNotNull = <T>(data: T): NonNullable<T> => {
        if (!data) {
            throw new InvalidCredentialsError();
        }
        return data;
    }

    const userCredentials = assertNotNull(await prisma.userCredentials.findFirst({
        where: {
            email: body.email.toLowerCase()
        }
    }));
    const user = assertNotNull(await prisma.user.findFirst({
        where: {
            id: userCredentials.user_id
        }
    }));

    if (!comparePassword(body.password, userCredentials.password)) {
        throw new InvalidCredentialsError();
    }

    const jwt = sign({id: user.id, email: userCredentials.email});

    userCredentials.session_token = jwt;
    await prisma.userCredentials.update({
        where: {
            id: userCredentials.id
        },
        data: {
            session_token: jwt
        }
    });

    const data: LoginResponse = {
        token: jwt,
        user
    }

    res.send(successResponse(data));
}));

router.post("/register", validationMiddleware(RegisterRequestSchema), errorHandlingMethod(async (req, res) => {
    let { name, email, password } = req.body as RegisterRequest;

    email = email.toLowerCase();

    const existingUser = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (existingUser) throw new ForbiddenError("A user with that email address already exists.");

    const encryptedPassword = await encryptPassword(password);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            credentials: {
                create: {
                    email,
                    password: encryptedPassword
                    // Generate without a session token
                }
            }
        }
    });

    res.send(successResponse(user));
}));

export default router;