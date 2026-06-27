import { Request, Response } from "express";
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