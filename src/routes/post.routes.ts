import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { errorHandlingMethod } from "../middleware/errorHandler.middleware";
import { AuthenticatedRequest } from "../request/authenticatedRequest";
import { prisma } from "../database";
import { validationMiddleware } from "../middleware/validation.middleware";
import { PostDataRequest, PostDataRequestSchema } from "../models/request/post.requests";
import { ForbiddenError, PostNotFoundError } from "../errors";
import { successResponse } from "../models/response/base.response";
import { validateObjectId } from "../util/validation";

const router = Router();

// Authentication not required
router.get("/", errorHandlingMethod(async (req, res) => {
    const { filter, tags, categories } = req.query;

    const where: any = {
        AND: []
    }

    if (filter) {
        // Case insensitive search on title and content
        where.AND.push({
            OR: [
                { title: { contains: filter.toString(), mode: "insensitive" } },
                { content: { contains: filter.toString(), mode: "insensitive" } },
            ]
        });
    }

    if (tags) {
        // Post must have all tags
        where.AND.push({
            tags: { hasEvery: tags.toString().split(",") }
        });
    }

    if (categories) {
        // Post must have all categories
        where.AND.push({
            categories: { hasEvery: categories.toString().split(",") }
        });
    }

    const posts = await prisma.post.findMany({
        where,
        include: { author: true }
    });

    res.send(successResponse(posts));
}));

// Authentication not required
// Uses the post ID to return the post and it's relations (author and comments)
router.get("/:id", errorHandlingMethod(async (req, res) => {
    const id = validateObjectId(req.params.id);

    const post = await prisma.post.findFirst({
        where: {
            id: id
        },
        include: {
            comments: {
                include: {
                    author: true
                }
            },
            author: true
        }
    });

    if (!post) throw new PostNotFoundError(id);

    res.send(successResponse(post));
}));

router.post("/", authMiddleware, validationMiddleware(PostDataRequestSchema), errorHandlingMethod(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const body = req.body as PostDataRequest;

    const comment = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            author_id: user.id,
            categories: body.categories,
            tags: body.tags
        }
    });

    console.log("Comment created: ", comment.id);
    res.send(successResponse(comment));
}));

router.patch("/:id", authMiddleware, errorHandlingMethod(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const id = validateObjectId(req.params.id);
    const body = req.body as PostDataRequest;

    const post = await prisma.post.findFirst({
        where: {
            id: id,
        }
    });

    if (!post) throw new PostNotFoundError(id);

    if (post.author_id !== user.id)
        throw new ForbiddenError("You are not allowed to update this post.");

    const updatedPost = await prisma.post.update({
        where: {
            id: id
        },
        data: {
            title: body.title,
            content: body.content,
            categories: body.categories,
            tags: body.tags
        }
    });

    console.log("Post updated: ", updatedPost.id)
    res.send(successResponse(updatedPost));
}));

router.delete("/:id", authMiddleware, errorHandlingMethod(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const id = validateObjectId(req.params.id);

    const post = await prisma.post.findFirst({
        where: {
            id: id
        }
    });

    if (!post) throw new PostNotFoundError(id);

    if (post.author_id !== user.id)
        throw new ForbiddenError("You are not allowed to delete this post.");

    const deletedPost = await prisma.post.delete({
        where: {
            id: id
        }
    });

    console.log("Post deleted: ", deletedPost.id)
    res.send(successResponse(deletedPost));
}));

export default router;