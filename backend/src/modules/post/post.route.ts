import express from "express";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.schema.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { createPostController, deletePostController, getAllPostsController, getUserPostsController, updatePostController } from "./post.controller.js";

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
    .route('/')
    .get(getAllPostsController);

router
    .route("/your-posts")
    .get(verifyUser, getUserPostsController);

router
    .route("/:id")
    .patch(verifyUser, validate(updatePostSchema), updatePostController);

router
    .route("/:id")
    .delete(verifyUser, deletePostController);

export default router;