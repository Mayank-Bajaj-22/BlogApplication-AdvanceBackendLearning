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

export const getAllPostsController = CatchAsync(
    async (req: Request, res: Response) => {
        const { cursor, limit } = req.query;
        
        const parsedLimit = limit ? parseInt(limit as string) : 10;

        const result = await postService.getAllPosts(cursor as string, parsedLimit);

        sendResponse(res, 200, {
            success: true,
            message: "Posts fetched successfully",
            data: result,
        });
    },
);

export const getUserPostsController = CatchAsync(
    async (req: Request, res: Response) => {
        const result = await postService.getUserPosts(req.userId as string);

        sendResponse(res, 200, {
            success: true,
            message: "User posts fetched successfully",
            data: result,
        });
    }
);

export const updatePostController = CatchAsync(
    async (req: Request, res: Response) => {
        const postId = req.params.id as string;
        
        const result = await postService.updatePost(
            req.userId as string,
            postId,
            req.body
        );

        sendResponse(res, 200, {
            success: true,
            message: "Post updated successfully",
            data: result,
        });
    }
);

export const deletePostController = CatchAsync(
    async (req: Request, res: Response) => {
        const postId = req.params.id as string;

        const result = await postService.deletePost(
            postId, 
            req.userId as string
        );

        sendResponse(res, 200, {
            success: true,
            message: "Post deleted successfully",
        })
    }
)