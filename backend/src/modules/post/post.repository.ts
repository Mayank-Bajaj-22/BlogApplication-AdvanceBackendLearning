import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";

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
}