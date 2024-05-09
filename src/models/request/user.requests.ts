import Joi from 'joi';

export interface LoginRequest {
    email: string;
    password: string;
}

export const LoginRequestSchema = Joi.object<LoginRequest>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export const RegisterRequestSchema = Joi.object<RegisterRequest>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
});