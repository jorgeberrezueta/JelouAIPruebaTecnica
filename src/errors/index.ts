import { ValidationResult } from "joi";

export default class BaseError extends Error {
    statusCode: number;

    constructor(message: string = 'An error occurred.', statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class ValidationError extends BaseError {
    constructor(public result: ValidationResult) {
        super("Validation error", 400);
    }
}

export class InvalidCredentialsError extends BaseError {
    constructor(message: string = 'Invalid username or password.') {
        super(message, 401);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message: string = 'Unauthorized.') {
        super(message, 401);
    }
}

export class ForbiddenError extends BaseError {
    constructor(message: string = 'Forbidden.') {
        super(message, 403);
    }
}

export class PostNotFoundError extends BaseError {
    constructor(public postId: string) {
        super(`Post not found: ${postId}`, 404);
    }
}

export class CommentNotFoundError extends BaseError {
    constructor(public commentId: string) {
        super(`Comment not found: ${commentId}`, 404);
    }
}