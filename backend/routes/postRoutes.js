import express from "express";
const router = express.Router();

import { getPostById, getUsersPosts, getPosts, deletePost, updatePost, createPost, getUserPost} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getPosts).post(protect, createPost);
router.get("/user", protect, getUsersPosts);
router.get("/user/post", protect, getUserPost);
router.route("/:id").get(getPostById).delete(protect, deletePost).put(protect, updatePost);

export default router;
