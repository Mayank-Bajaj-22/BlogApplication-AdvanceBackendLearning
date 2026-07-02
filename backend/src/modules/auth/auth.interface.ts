// dependency inversion principle

// service -->  interface <-- repository

import { User, RefreshToken } from "@prisma/client";

export interface IAuthRepository {
    findUserById(id: string) : Promise<User | null>;
    findUserByUsername(username: string) : Promise<User | null>;
    findUserByEmail(email: string) : Promise<User | null>;
    createUser(username: string, email: string, passsword: string) : Promise<User>;
    createRefreshToken(data: {token: string, userId: string, expiresAt: Date}) : Promise<RefreshToken>;
    findRefreshToken(token: string) : Promise<RefreshToken | null>;
    findRefreshTokenByUserId(userId: string) : Promise<RefreshToken[]>;
    deleteRefreshTokenById(id: string) : Promise<void>;
    deleteRefreshTokenByToken(token: string) : Promise<void>;
    deleteAllRefreshTokenByUser(userId: string) : Promise<void>;
}