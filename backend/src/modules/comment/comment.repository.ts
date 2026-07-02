import { prisma } from "../../lib/prisma.js";
import { ICommentRepository } from "./comment.interface.js";
import { createCommentDTO } from "./comment.schema.js";
import { Comment } from "@prisma/client";

export class CommentRepository implements ICommentRepository {
    async createComment(
        postId: string,
        userId: string,
        data: createCommentDTO
    ) : Promise<Comment> {
        const newComment = await prisma.comment.create({
            data: {
                postId,
                userId,
                comment: data.comment
            },
        });

        return newComment;
    }

    async getCommentsByPostId(
        postId: string,
        limit: number = 10,
        cursor?: string,
    ) : Promise<Comment[]> {
        const comments = await prisma.comment.findMany({
            where: {
                postId,
            },
            take: limit,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: {
                createdAt: "desc"
            },
        });

        return comments;
    }

    async getCommentById(
        id: string
    ) : Promise<Comment | null> {
        const comment = await prisma.comment.findUnique({
            where: {
                id,
            },
            include: {
                post: true
            }
        });

        return comment;
    }

    async deleteCommentById(
        id: string
    ) : Promise<void> {
        await prisma.comment.delete({
            where: {
                id,
            },
        });
    }
}