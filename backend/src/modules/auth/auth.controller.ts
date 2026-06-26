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
