import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";
import { updatePostDTO } from "./post.schema.js";

export class PostRepository implements IPostRepository {
    async createPost(
        title: string, 
        content: string,
        userId: string,
        imageUrl?: string
    ) {
        let createPost;

        if (imageUrl) {
            createPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    userId,
                    imageUrl,
                },
            });
        } else {
            createPost = await prisma.post.create({
                data: {
                    title, 
                    content,
                    userId,
                },
            })
        }

        return createPost;
    }

    async getAllPosts(cursor?: string, limit: number = 10) {
        const posts = await prisma.post.findMany({
            take: limit,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                title: true,
                content: true,
                imageUrl: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
            },
        });

        return posts;
    }
    async getPostById(postId: string) {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            }
        });

        return post;
    }

    async getPostsByUserId(userId: string) {
        const posts = await prisma.post.findMany({
            where: {
                userId,
            },
        });

        return posts;
    }

    async getPostByPostIdAndUserId(
        postId: string,
        userId: string,
    ) {
        const post = await prisma.post.findFirst({
            where: {
                id: postId,
                userId,
            },
        });

        return post;
    }

    async updatePost(
        postId: string,
        data: updatePostDTO
    ) {
        const updatePost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title: data.title,
                content: data.content,
            }
        });

        return updatePost;
    }

    async deletePost(postId: string) {
        await prisma.post.delete({
            where: {
                id: postId,
            }
        });
    }
}