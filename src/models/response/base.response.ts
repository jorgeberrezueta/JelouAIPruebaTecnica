import Joi from "joi"

export type BaseResponse<T> = {
    data?: T | undefined,
    status: 'success' | 'error' | 'validation-error',
    messages?: any[]
}

export const errorResponse = <T>(messages?: any[]): BaseResponse<T> => {
    return {
        status: 'error',
        messages
    }
}

export const successResponse = <T>(data: T): BaseResponse<T> => {
    return {
        data,
        status: 'success'
    }
}

export const validationErrorResponse = <T>(validationResult: Joi.ValidationResult): BaseResponse<T> => {
    return {
        status: 'validation-error',
        messages: validationResult.error?.details
    }
}