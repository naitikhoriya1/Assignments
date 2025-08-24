import express from "express";
import { getUserProfile, getUserPosts } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/users/:userId
// @desc    Get user profile
// @access  Public
router.get("/:userId", getUserProfile);

// @route   GET /api/users/:userId/posts
// @desc    Get user's posts
// @access  Public
router.get("/:userId/posts", getUserPosts);

export default router;
