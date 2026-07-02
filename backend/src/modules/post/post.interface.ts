import { updatePostDTO } from "./post.schema.js";
import { Post } from "@prisma/client";

export interface IPostRepository {
    createPost(
        title: string,
        content: string,
        userId: string,
        imageUrl?: string
    ) : Promise<Post>;
    getPostById(postId: string) : Promise<Post | null>;
    getAllPosts(cursor?: string, limit?: number): Promise<Post[]>;
    getPostsByUserId(userId: string) : Promise<Post[]>;
    getPostByPostIdAndUserId(postId: string, userId: string) : Promise<Post | null>;
    updatePost(postId: string, data: updatePostDTO) : Promise<Post>;
    deletePost(postId: string) : Promise<void>;
}