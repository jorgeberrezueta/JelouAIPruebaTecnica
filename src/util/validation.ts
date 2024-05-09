import Joi from 'joi';
import { ValidationError } from '../errors';

const ObjectIdSchema = Joi.string().hex().length(24);

export const validateObjectId = (id: string): string => {
    console.log("Validating")
    const result = ObjectIdSchema.validate(id);
    if (result.error) {
        throw new ValidationError(result);
    }
    return id;
}
