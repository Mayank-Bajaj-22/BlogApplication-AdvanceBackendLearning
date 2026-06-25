import express, { Request, Response } from "express";

export const app = express();

app.get('/health-check', (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: "Api is working fine!"
    })
})