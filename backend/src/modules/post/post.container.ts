import { CloudinaryService } from "../../utils/cloudinary.service.js";
import { PostRepository } from "./post.repository.js";
import { PostService } from "./post.service.js";

const postRepository = new PostRepository();
const fileService = new CloudinaryService();

const postService = new PostService(postRepository, fileService);

export default postService;