import { AppError } from "../../utils/AppError.js";
import { IPostRepository } from "../post/post.interface.js";
import { ICommentRepository } from "./comment.interface.js";
import { createCommentDTO } from "./comment.schema.js";

export class CommentService {
    constructor (
        private commentRepo: ICommentRepository,
        private postRepo: IPostRepository
    ) {}

    async createComment(postId: string, userId: string, data: createCommentDTO) {
        const post = await this.postRepo.getPostById(postId);

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        const newComment = await this.commentRepo.createComment(
            postId,
            userId,
            data,
        );

        return newComment;
    }

    async getCommentsByPostId(postId: string, limit: number, cursor?: string) {
        const post = await this.postRepo.getPostById(postId);

        if(!post){
            throw new AppError("Post not found",404);
        }

        const comments = await this.commentRepo.getCommentsByPostId(
            postId,
            limit,
            cursor,
        );

        return comments;
    }

    async deleteComment(commentId: string, userId: string) {
        const comment = await this.commentRepo.getCommentById(commentId);

        if (!comment) {
            throw new AppError("Comment not found", 404);
        }

        if (!(comment.userId === userId || comment.post.userId === userId)) {
            throw new AppError("Unauthorized to perform this action.", 401);
        }

        await this.commentRepo.deleteCommentById(commentId);

        return true;
    }
}