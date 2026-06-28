import { prisma } from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository {
    async findUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }

    async findUserByUsername(username: string) {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        return user;
    }

    async findUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async createUser(username: string, email: string, password: string) {
        const createdUser = await prisma.user.create({
            data: {
                username,
                email,
                password
            },
        });

        return createdUser;
    }

    async createRefreshToken(data: {token: string, userId: string, expiresAt: Date}) {
        const refreshToken = await prisma.refreshToken.create({
            data,
        });

        return refreshToken;
    }

    async findRefreshToken(token: string) {
        const refreshToken = await prisma.refreshToken.findUnique({
            where: {
                token,
            },
        });

        return refreshToken;
    }

    async findRefreshTokenByUserId(userId: string) {
        const refreshToken = await prisma.refreshToken.findMany({
            where: {
                userId,
            },
        });

        return refreshToken;
    }

    async deleteRefreshTokenById(id: string) {
        await prisma.refreshToken.delete({
            where: {
                id,
            },
        });
    }

    async deleteRefreshTokenByToken(token: string) {
        await prisma.refreshToken.delete({
            where: {
                token,
            },
        });
    }

    async deleteAllRefreshTokenByUser(userId: string) {
        await prisma.refreshToken.deleteMany({
            where: {
                userId,
            },
        });
    }
}