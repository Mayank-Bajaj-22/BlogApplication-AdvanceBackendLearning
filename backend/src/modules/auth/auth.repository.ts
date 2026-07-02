import { prisma } from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";
import { User, RefreshToken } from "@prisma/client";

export class AuthRepository implements IAuthRepository {
    async findUserById(id: string) : Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }

    async findUserByUsername(username: string) : Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        return user;
    }

    async findUserByEmail(email: string) : Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async createUser(username: string, email: string, password: string) : Promise<User> {
        const createdUser = await prisma.user.create({
            data: {
                username,
                email,
                password
            },
        });

        return createdUser;
    }

    async createRefreshToken(data: {token: string, userId: string, expiresAt: Date}) : Promise<RefreshToken> {
        const refreshToken = await prisma.refreshToken.create({
            data,
        });

        return refreshToken;
    }

    async findRefreshToken(token: string): Promise<RefreshToken | null> {
        const refreshToken = await prisma.refreshToken.findUnique({
            where: {
                token,
            },
        });

        return refreshToken;
    }

    async findRefreshTokenByUserId(userId: string): Promise<RefreshToken[]> {
        const refreshToken = await prisma.refreshToken.findMany({
            where: {
                userId,
            },
        });

        return refreshToken;
    }

    async deleteRefreshTokenById(id: string) : Promise<void> {
        await prisma.refreshToken.delete({
            where: {
                id,
            },
        });
    }

    async deleteRefreshTokenByToken(token: string) : Promise<void> {
        await prisma.refreshToken.delete({
            where: {
                token,
            },
        });
    }

    async deleteAllRefreshTokenByUser(userId: string) : Promise<void> {
        await prisma.refreshToken.deleteMany({
            where: {
                userId,
            },
        });
    }
}