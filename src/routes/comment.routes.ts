import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { errorHandlingMethod } from "../middleware/errorHandler.middleware";
import { AuthenticatedRequest } from "../request/authenticatedRequest";
import { prisma } from "../database";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CommentNotFoundError, ForbiddenError, PostNotFoundError } from "../errors";
import { CommentDataRequest, CommentDataRequestSchema } from "../models/request/comment.requests";
import { successResponse } from "../models/response/base.response";
import { validateObjectId } from "../util/validation";

const router = Router();

// Authentication not required
router.get("/:id", errorHandlingMethod(async (req, res) => {
    const id = validateObjectId(req.params.id);

    const comment = await prisma.comment.findFirst({
        where: {
            id: id
        },
        include: {
            post: true
        }
    });

    if (!comment) throw new CommentNotFoundError(id);

    res.send(successResponse(comment));
}));

router.post("/", authMiddleware, validationMiddleware(CommentDataRequestSchema), errorHandlingMethod(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const body = req.body as CommentDataRequest;

    const post = await prisma.post.findFirst({
        where: {
            id: body.post_id
        }
    });

    if (!post) throw new PostNotFoundError(body.post_id);

    const comment = await prisma.comment.create({
        data: {
            content: body.content,
            post_id: body.post_id,
            author_id: user.id
        }
    });

    console.log("Comment created: ", comment.id);
    res.send(successResponse(comment));
}));

router.patch("/:id", authMiddleware, errorHandlingMethod(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const id = req.params.id;
    const body = req.body as CommentDataRequest;

    const comment = await prisma.comment.findFirst({
        where: {
            id: id
        }
    });

    if (!comment) throw new CommentNotFoundError(id);

    if (comment.author_id !== user.id)
        throw new ForbiddenError("You are not allowed to update this comment.");
    

    if (body.post_id && comment.post_id !== body.post_id)
        throw new ForbiddenError("You are not allowed to change the post of this comment.");

    const updatedComment = await prisma.comment.update({
        where: {
            id: id
        },
        data: {
            content: body.content,
        }
    });

    console.log("Comment updated: ", updatedComment.id)
    res.send(successResponse(updatedComment));
}));

router.delete("/:id", authMiddleware, errorHandlingMethod(async (req, res) => {
    const { user } = req as AuthenticatedRequest;
    const id = validateObjectId(req.params.id);

    const comment = await prisma.comment.findFirst({
        where: {
            id: id
        }
    });

    if (!comment) throw new CommentNotFoundError(id);

    if (comment.author_id !== user.id)
        throw new ForbiddenError("You are not allowed to delete this comment.");

    const deletedComment = await prisma.comment.delete({
        where: {
            id: id
        }
    });

    console.log("Comment deleted: ", deletedComment.id)
    res.send(successResponse(deletedComment));
}));

export default router;