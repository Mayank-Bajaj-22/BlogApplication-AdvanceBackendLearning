import { prisma } from "../../lib/prisma.js"

export const authRepositry = {
    findUserById: async (id: string) => {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    },

    findUserByUsername: async (username: string) => {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        return user;
    },

    findUserByEmail: async (email: string) => {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    },

    createUser: async (username: string, email: string, password: string) => {
        const createdUser = await prisma.user.create({
            data: {
                username,
                email,
                password
            },
        });

        return createdUser;
    },

    createRefreshToken: async (data: {token: string, userId: string, expiresAt: Date}) => {
        const refreshToken = await prisma.refreshToken.create({
            data,
        });

        return refreshToken;
    },

    findRefreshToken: async (token: string) => {
        const refreshToken = await prisma.refreshToken.findUnique({
            where: {
                token,
            },
        });

        return refreshToken;
    },

    findRefreshTokenByUserId: async (userId: string) => {
        const refreshToken = await prisma.refreshToken.findMany({
            where: {
                userId,
            },
        });

        return refreshToken;
    },

    deleteRefreshTokenById: async (id: string) => {
        await prisma.refreshToken.delete({
            where: {
                id,
            },
        });
    },

    deleteRefreshTokenByToken: async (token: string) => {
        await prisma.refreshToken.delete({
            where: {
                token,
            },
        });
    },

    deleteAllRefreshTokenByUser: async (userId: string) => {
        await prisma.refreshToken.deleteMany({
            where: {
                userId,
            },
        });
    }
};
