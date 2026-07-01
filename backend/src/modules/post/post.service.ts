import { AppError } from "../../utils/AppError.js";
import { IFileService } from "../../utils/file.interface.js";
import { IPostRepository } from "./post.interface.js";
import { toPostListResponse } from "./post.mapper.js";
import { createPostDTO, updatePostDTO } from "./post.schema.js";

export class PostService {
    constructor(
        private repo: IPostRepository,
        private fileService: IFileService,
    ) {}

    async createPost (
        body: createPostDTO,
        userId: string,
        localFilePath?: string
    ) {
        let createdPost;

        const { title, content } = body;

        if (localFilePath) {
            const imageUrl = await this.fileService.upload(localFilePath);
            createdPost = await this.repo.createPost(
                title,
                content,
                userId,
                imageUrl,
            );
        } else {
            createdPost = await this.repo.createPost(
                title,
                content,
                userId
            );
        }

        return createdPost;
    }

    async getAllPosts(cursor?: string, limit?: number) {
        const posts = await this.repo.getAllPosts(cursor, limit);
        return {
            posts: toPostListResponse(posts),
            meta: {
                nextCursor: posts.length > 0 ? posts[posts.length - 1].id : null,
            },
        };
    }

    async getUserPosts (userId: string) {
        const posts = await this.repo.getPostsByUserId(userId);
        return toPostListResponse(posts);
    }

    async updatePost (userId: string, postId: string, data: updatePostDTO) {
        const post = await this.repo.getPostByPostIdAndUserId(postId, userId);

        // console.log(post);

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        const updatedPost = await this.repo.updatePost(postId, data);

        return updatedPost;
    }

    async deletePost (postId: string, userId: string) {
        const post = await this.repo.getPostByPostIdAndUserId(postId, userId);

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        if (post.imageUrl) {
            await this.fileService.delete(post.imageUrl);
        }

        await this.repo.deletePost(postId);

        return true;
    }
} 