import { IJwtPayload } from "../../types/index.js";
import { AppError } from "../../utils/AppError.js";
import { comparePassword, hashPassword, hashRefreshToken } from "../../utils/auth.helper.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.helper.js";
import { IAuthRepository } from "./auth.interface.js";
import { toUserResponse } from "./auth.mapper.js";
import { loginUserDTO, refreshTokenDTO, registerUserDTO } from "./auth.schema.js";

export class AuthService {
    constructor(private repo: IAuthRepository) {}
    async registerUser(body: registerUserDTO) : Promise<{
        user: ReturnType<typeof toUserResponse>
        accessToken: string;
        refreshToken: string;
    }> {
        const { username, email, password } = body;

        const existingUserByUsername = await this.repo.findUserByUsername(username);

        if (existingUserByUsername) {
            throw new AppError("User already exists", 400);
        };

        const existingUserByEmail = await this.repo.findUserByEmail(email);

        if (existingUserByEmail) {
            throw new AppError("User already exists", 400);
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await this.repo.createUser(
            username, 
            email,
            hashedPassword
        );

        const accessToken = generateAccessToken(newUser.id);
        const refreshToken = generateRefreshToken(newUser.id);

        const hashedRefreshToken = hashRefreshToken(refreshToken);

        await this.repo.createRefreshToken({
            token: hashedRefreshToken,
            userId: newUser.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return {
            user: toUserResponse(newUser),
            accessToken,
            refreshToken,
        }
    }

    async loginUser(body: loginUserDTO) {
        const { email, password } = body;

        const user = await this.repo.findUserByEmail(email);
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

        await this.repo.createRefreshToken({
            token: hashedRefreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        return {
            user: toUserResponse(user),
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(body: refreshTokenDTO) {
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

        const existingToken = await this.repo.findRefreshToken(hashedToken);

        if (!existingToken) {
            throw new AppError("Refresh token not found", 403);
        }

        await this.repo.deleteRefreshTokenById(existingToken.id);

        const newAccessToken = generateAccessToken(decoded.userId);
        const newRefreshToken = generateRefreshToken(decoded.userId);

        const newRefreshTokenHashed = hashRefreshToken(newRefreshToken);

        await this.repo.createRefreshToken({
            token: newRefreshTokenHashed,
            userId: decoded.userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }

    async getCurrentUser(userId: string) {
        const user = await this.repo.findUserById(userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return {
            user: toUserResponse(user),
        };
    }

    async logout(refreshToken: string) {
        if (!refreshToken) {
            throw new AppError("Refresh token required", 401);
        }

        const refreshTokenHashed = hashRefreshToken(refreshToken);

        const existingToken = await this.repo.findRefreshToken(refreshTokenHashed);

        if (!existingToken) {
            throw new AppError("Invalid refresh token", 404);
        }

        await this.repo.deleteRefreshTokenById(existingToken.id);

        return true;
    }

    async logoutAllDevices(userId: string) {
        if (!userId) {
            throw new AppError("User id not found", 404);
        }

        await this.repo.deleteAllRefreshTokenByUser(userId);

        return true;
    }
};