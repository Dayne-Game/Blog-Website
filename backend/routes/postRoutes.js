import express from "express";
const router = express.Router();

import { getPostById, getUsersPosts, getPosts, deletePost, updatePost, createPost } from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getPosts).post(protect, createPost);
router.route("/:id").get(getPostById).delete(protect, deletePost).put(protect, updatePost);
router.get("/users", protect, getUsersPosts);

export default router;
