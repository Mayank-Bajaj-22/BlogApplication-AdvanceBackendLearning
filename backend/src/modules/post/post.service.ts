import { IFileService } from "../../utils/file.interface.js";
import { IPostRepository } from "./post.interface.js";
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
            console.log(imageUrl)
        } else {
            createdPost = await this.repo.createPost(
                title,
                content,
                userId
            );
        }

        return createdPost;
    }
} 