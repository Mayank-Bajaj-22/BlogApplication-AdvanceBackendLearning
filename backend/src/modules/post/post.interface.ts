export interface IPostRepository {
    createPost(
        title: string,
        content: string,
        userId: string,
        imageUrl?: string
    ) : Promise<any>;
}