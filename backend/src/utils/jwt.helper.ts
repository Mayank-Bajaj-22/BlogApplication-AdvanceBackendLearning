import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_EXPIRY, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRY, JWT_REFRESH_TOKEN_SECRET } from "../config/config.js";

const ACCESS_TOKEN_SECRET = JWT_ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = JWT_ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"];
const REFRESH_TOKEN_SECRET = JWT_REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = JWT_REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"];

export const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY
    });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
