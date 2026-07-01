import { z } from "zod";

export const createPostSchema = z
    .object({
        title: z.string().min(1, "Post title cannot be empty"),
        content: z.string().min(10, "Post description must be at least 10 characters long"),
    })
    .strict();

export const updatePostSchema = z
    .object({
        title: z.string().min(1, "Post title cannot be empty").optional(),
        content: z.string().min(10, "Post descriptrion must be at least 10 characters long").optional(),
    })
    .strict();

export type createPostDTO = z.infer<typeof createPostSchema>;
export type updatePostDTO = z.infer<typeof updatePostSchema>;