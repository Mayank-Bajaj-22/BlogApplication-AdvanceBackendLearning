import express from "express";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createCommentSchema } from "./comment.schema.js";
import { createCommentController, deleteCommentController, getCommentsByPostIdController } from "./comment.controller.js";

const router = express.Router();

router
    .route("/create/post/:postId")
    .post(verifyUser, validate(createCommentSchema), createCommentController);

router
    .route("/:postId")
    .get(verifyUser, getCommentsByPostIdController);

router
    .route("/delete/:commentId")
    .delete(verifyUser, deleteCommentController);

export default router;