import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync.js";
import postService from "./post.container.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const createPostController = CatchAsync(
    async (req: Request, res: Response) => {
        let result;

        if (req.file?.path) {
            result = await postService.createPost(
                req.body,
                req.userId as string,
                req.file.path
            );
        } else {
            result = await postService.createPost(req.body, req.userId as string);
        }

        sendResponse(res, 201, {
            success: true,
            message: "Post created successfully",
            data: result,
        });
    },
);

export const getUserPostsController = CatchAsync(
    async (req: Request, res: Response) => {
        const result = await postService.getUserPosts(req.userId as string);
    }
)