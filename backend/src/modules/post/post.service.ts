import { IFileService } from "../../utils/file.interface.js";
import { IPostRepository } from "./post.interface.js";
import { toPostListResponse } from "./post.mapper.js";
import { createPostDTO } from "./post.schema.js";

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

    async getUserPosts (userId: string) {
        const posts = await this.repo.getPostsByUserId(userId);
        return toPostListResponse(posts);
    }
} 