import express from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post("/", auth, createPost);

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get("/", getPosts);

export default router;
