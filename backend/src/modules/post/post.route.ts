import express from "express";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema } from "./post.schema.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { createPostController, getUserPostsController } from "./post.controller.js";

const router = express.Router();

router
    .route("/create")
    .post(
        verifyUser,
        upload.single("media"),
        validate(createPostSchema),
        createPostController
    );

router
    .route("/your-posts")
    .post(verifyUser, getUserPostsController);

export default router;