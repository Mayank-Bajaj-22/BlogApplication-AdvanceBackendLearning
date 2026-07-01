import { updatePostDTO } from "./post.schema.js";

export interface IPostRepository {
    createPost(
        title: string,
        content: string,
        userId: string,
        imageUrl?: string
    ) : Promise<any>;
    getPostById(postId: string) : Promise<any>;
    getAllPosts(cursor?: string, limit?: number): Promise<any>;
    getPostsByUserId(userId: string) : Promise<any>;
    getPostByPostIdAndUserId(postId: string, userId: string) : Promise<any>;
    updatePost(postId: string, data: updatePostDTO) : Promise<any>;
    deletePost(postId: string) : Promise<any>;
}