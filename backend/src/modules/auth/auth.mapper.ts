import { IUserResponse } from "../../types/index.js";

export const toUserRepsonse = (user: IUserResponse) => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};