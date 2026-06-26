import express from "express";
import { registerUserController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { registerUserSchema } from "./auth.schema.js";

const router = express.Router();

router
    .route('/register')
    .post(validate(registerUserSchema), registerUserController)

export default router;
