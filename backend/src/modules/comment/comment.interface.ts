import { createCommentDTO } from "./comment.schema.js";
import { Comment } from "@prisma/client";

export interface ICommentRepository {
    createComment(
        postId: string,
        userId: string,
        data: createCommentDTO
    ): Promise<Comment>;
    getCommentsByPostId(
        postId: string, 
        limit: number, 
        cursor?: string,
    ) : Promise<Comment[]>;
    getCommentById(id: string) : Promise<any>;
    deleteCommentById(id: string) : Promise<void>;
}