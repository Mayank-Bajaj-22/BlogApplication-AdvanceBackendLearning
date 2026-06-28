import bcrypt from "bcrypt";
import crypto from "crypto";
import { NODE_ENV } from "../config/config.js";
import { Response } from "express";


export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
    password: string,
    hashedPasswordInDb: string,
) => {
    return await bcrypt.compare(password, hashedPasswordInDb);
};

export const hashRefreshToken = (refreshToken: string) => {
    return crypto.createHash("sha256").update(refreshToken).digest("hex");
};

export const setCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string
) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

export const destroyCookies = (res: Response) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax",
    });
};