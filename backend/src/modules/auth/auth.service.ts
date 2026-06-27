import { IJwtPayload } from "../../types/index.js";
import { AppError } from "../../utils/AppError.js";
import { comparePassword, hashPassword, hashRefreshToken } from "../../utils/auth.helper.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.helper.js";
import { toUserResponse } from "./auth.mapper.js";
import { authRepositry } from "./auth.repository.js";
import { loginUserDTO, refreshTokenDTO, registerUserDTO } from "./auth.schema.js";

export const AuthService = {
    registerUser: async (body: registerUserDTO) => {
        const { username, email, password } = body;

        const existingUserByUsername = await authRepositry.findUserByUsername(username);

        if (existingUserByUsername) {
            throw new AppError("User already exists", 400);
        };

        const existingUserByEmail = await authRepositry.findUserByEmail(email);

        if (existingUserByEmail) {
            throw new AppError("User already exists", 400);
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await authRepositry.createUser(
            username, 
            email,
            hashedPassword
        );

        const accessToken = generateAccessToken(newUser.id);
        const refreshToken = generateRefreshToken(newUser.id);

        const hashedRefreshToken = hashRefreshToken(refreshToken);

        await authRepositry.createRefreshToken({
            token: hashedRefreshToken,
            userId: newUser.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return {
            user: toUserResponse(newUser),
            accessToken,
            refreshToken,
        }
    },

    loginUser: async (body: loginUserDTO) => {
        const { email, password } = body;

        const user = await authRepositry.findUserByEmail(email);
        if (!user) {
            throw new AppError("Invalid credentials", 404);
        };

        const isPassword = await comparePassword(password, user.password);
        if (!isPassword) {
            throw new AppError("Invalid credentials", 401);
        };

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        const hashedRefreshToken = hashRefreshToken(refreshToken);

        await authRepositry.createRefreshToken({
            token: hashedRefreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        return {
            user: toUserResponse(user),
            accessToken,
            refreshToken,
        };
    },

    refreshToken: async (body: refreshTokenDTO) => {
        const { token } = body;

        if (!token) {
            throw new AppError("Refresh token required", 401);
        }

        let decoded;

        try {
            decoded = verifyRefreshToken(token) as IJwtPayload;
        } catch (error) {
            throw new AppError("Invalid or expired refresh token", 403);
        }

        const hashedToken = hashRefreshToken(token);

        const existingToken = await authRepositry.findRefreshToken(hashedToken);

        if (!existingToken) {
            throw new AppError("Refresh token not found", 403);
        }

        await authRepositry.deleteRefreshTokenById(existingToken.id);

        const newAccessToken = generateAccessToken(decoded.userId);
        const newRefreshToken = generateRefreshToken(decoded.userId);

        const newRefreshTokenHashed = hashRefreshToken(newRefreshToken);

        await authRepositry.createRefreshToken({
            token: newRefreshTokenHashed,
            userId: decoded.userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
};