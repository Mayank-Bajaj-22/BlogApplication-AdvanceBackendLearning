import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import { IJwtPayload } from "../types/index.js";

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new AppError("Unauthorized request", 401);
        }

        const decoded = verifyAccessToken(token) as IJwtPayload;

        req.userId = decoded.userId;

        next();
    } catch (error) {
        next(new AppError("Invalid or expired token", 401));
    }
};
