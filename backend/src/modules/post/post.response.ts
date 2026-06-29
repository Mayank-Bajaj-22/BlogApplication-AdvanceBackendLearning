export type PostListItem = {
    id: string;
    title: string;
    content: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}