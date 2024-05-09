import Joi from 'joi';

export interface CommentDataRequest {
    content: string;
    post_id: string;
}

export const CommentDataRequestSchema = Joi.object<CommentDataRequest>({
    content: Joi.string().required().min(5),
    post_id: Joi.string().hex().length(24),
});