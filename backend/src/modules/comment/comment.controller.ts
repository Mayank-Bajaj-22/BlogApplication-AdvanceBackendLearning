import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import commentService from "./comment.container.js";

export const createCommentController = CatchAsync(
    async (req: Request, res: Response) => {
        const postId = req.params.postId as string;

        const result = await commentService.createComment(
            postId,
            req.userId as string,
            req.body,
        );

        sendResponse(res, 201, {
            success: true,
            message: "Comment created successfully",
            data: result,
        });
    }
)

export const getCommentsByPostIdController = CatchAsync(
    async (req: Request, res: Response) => {
        const postId = req.params.postId as string;

        const { cursor, limit } = req.query;

        const parsedLimit = limit ? parseInt(limit as string) : 10;

        const result = await commentService.getCommentsByPostId(
            postId as string,
            parsedLimit,
            cursor as string,
        );

        sendResponse(res, 200, {
            success: true,
            message: "Comments fetched successfully",
            data: {
                result,
                meta: {
                nextCursor: result.length > 0 ? result[result.length - 1].id : null,
                },
            },
        });
    },
);

export const deleteCommentController = CatchAsync(
    async (req: Request, res: Response) => {
        const commentId = req.params.commentId as string;

        await commentService.deleteComment(
            commentId,
            req.userId as string,
        )

        sendResponse(res, 200, {
            success: true,
            message: "Comment deleted successfully"
        })
    },
);