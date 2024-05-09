import Joi from 'joi';

export interface PostDataRequest {
    title: string;
    content: string;
    categories: string[];
    tags: string[];
}

export const PostDataRequestSchema = Joi.object<PostDataRequest>({
    title: Joi.string().required().min(5).max(100),
    content: Joi.string().required().min(5),
    categories: Joi.array().items(Joi.string()).default([]),
    tags: Joi.array().items(Joi.string()).default([])
});