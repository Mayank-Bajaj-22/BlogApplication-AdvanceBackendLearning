import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync.js";
import { AuthService } from "./auth.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const registerUserController = CatchAsync(
    async (req: Request, res: Response) => {
        const result = await AuthService.registerUser(req.body);

        sendResponse(res, 201, {
            success: true,
            message: "Account created successfully",
            data: result,
        });
    },
);

export const loginUserController = CatchAsync(
    async (req: Request, res: Response) => {
        const result = await AuthService.loginUser(req.body);

        sendResponse(res, 200, {
            success: true,
            message: "Logged in successfully",
            data: result,
        });
    },
);

export const refreshTokenController = CatchAsync(
    async (req: Request, res: Response) => {
        const result = await AuthService.refreshToken(req.body);

        sendResponse(res, 200, {
            success: true,
            message: "Tokens refreshed successfully",
            data: result,
        });
    }
);

export const currentUserController = CatchAsync(
    async (req: Request, res: Response) => {
        const result = await AuthService.getCurrentUser(req?.userId as string);

        sendResponse(res, 200, {
            success: true,
            message: "User detail fetched successfully",
            data: result,
        });
    }
);

export const logoutController = CatchAsync(
    async (req: Request, res: Response) => {
        const { refreshToken } = req.body;

        const result = await AuthService.logout(refreshToken);

        sendResponse(res, 200, {
            success: true,
            message: "Logged out successfully",
        });
    }
);

export const logoutAllController = CatchAsync(
    async (req: Request, res: Response) => {
        const result = await AuthService.logoutAllDevices(req.userId as string);

        sendResponse(res, 200, {
            success: true,
            message: "Logged out of all devices",
        });
    }
);