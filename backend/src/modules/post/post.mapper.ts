import { PostListItem } from "./post.response.js";

export const toPostListResponse = (posts: PostListItem[]): PostListItem[] => {
    return posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        userId: post.userId,
    }));
};