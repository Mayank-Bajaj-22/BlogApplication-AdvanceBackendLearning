import { AppError } from "../../utils/AppError.js";
import { hashPassword, hashRefreshToken } from "../../utils/auth.helper.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.helper.js";
import { toUserRepsonse } from "./auth.mapper.js";
import { authRepositry } from "./auth.repository.js";
import { registerUserDTO } from "./auth.schema.js";

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

        await authRepositry.createRefreshToekn({
            token: refreshToken,
            userId: newUser.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return {
            user: toUserRepsonse(newUser),
            accessToken,
            refreshToken,
        }
    }
};