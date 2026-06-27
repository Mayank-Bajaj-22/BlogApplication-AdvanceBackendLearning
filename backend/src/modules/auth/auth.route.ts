import express from "express";
import { loginUserController, refreshTokenController, registerUserController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginUserSchema, refreshTokenSchema, registerUserSchema } from "./auth.schema.js";

const router = express.Router();

router
    .route('/register')
    .post(validate(registerUserSchema), registerUserController);

router
    .route('/login')
    .post(validate(loginUserSchema), loginUserController);

router
    .route('/refreshToken')
    .post(validate(refreshTokenSchema), refreshTokenController);

export default router;
