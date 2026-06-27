export interface IUserResponse {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
};

export interface IJwtPayload {
    userId: string
};