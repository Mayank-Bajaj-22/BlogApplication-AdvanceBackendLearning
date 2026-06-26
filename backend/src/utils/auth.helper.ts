import bcrypt from "bcrypt";
import crypto from "crypto";

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