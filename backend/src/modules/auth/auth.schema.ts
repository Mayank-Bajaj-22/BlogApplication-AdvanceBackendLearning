import { z } from "zod";

export const registerUserSchema = z
    .object({
        username: z.string().min(3, "Username must be at least 3 charcaters long."),
        email: z.email("Email is required"),
        password: z.string().min(6, "Password must be at least 6 characters long.")
    })
    .strict();

export type registerUserDTO = z.infer<typeof registerUserSchema>;