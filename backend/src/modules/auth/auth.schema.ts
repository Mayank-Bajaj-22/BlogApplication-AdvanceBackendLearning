import { z } from "zod";

export const registerUserSchema = z
    .object({
        username: z.string().min(3, "Username must be at least 3 charcaters long."),
        email: z.email("Email is required"),
        password: z.string().min(6, "Password must be at least 6 characters long.")
    })
    .strict();

export const loginUserSchema = z
    .object({
        email: z.email("Email is required"),
        password: z.string(),
    })
    .strict();

export const refreshTokenSchema = z
    .object({
        token: z.string(),
    })
    .strict();

export type registerUserDTO = z.infer<typeof registerUserSchema>;
export type loginUserDTO = z.infer<typeof loginUserSchema>;
export type refreshTokenDTO = z.infer<typeof refreshTokenSchema>;