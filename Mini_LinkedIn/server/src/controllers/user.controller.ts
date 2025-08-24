import { Response } from "express";
import { AuthRequest } from "../types/express.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import {
  getPaginationOptions,
  createPaginatedResponse,
} from "../utils/pagination.js";

// @desc    Get user profile by ID with customizable fields
// @route   GET /api/users/:userId
// @access  Public
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    // Define which fields are always public
    const publicFields = "name email title bio skills";

    // Additional fields that can be requested if authenticated
    const privateFields = "experience education createdAt updatedAt";

    // Determine which fields to return
    let fieldsToSelect = publicFields;
    if (req.user && req.user.id === req.params.userId) {
      // If it's the user's own profile, include private fields
      fieldsToSelect += " " + privateFields;
    }

    const user = await User.findById(req.params.userId)
      .select(fieldsToSelect)
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user's post count
    const postCount = await Post.countDocuments({ author: req.params.userId });

    // Add computed fields
    const userResponse = {
      ...user,
      postCount,
    };

    res.json(userResponse);
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get user's posts with pagination and filtering
// @route   GET /api/users/:userId/posts
// @access  Public
export const getUserPosts = async (req: AuthRequest, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = getPaginationOptions(req.query);
    const dateFilter: any = {};

    // Add date filtering if provided
    if (req.query.startDate) {
      dateFilter.createdAt = { $gte: new Date(req.query.startDate as string) };
    }
    if (req.query.endDate) {
      dateFilter.createdAt = {
        ...dateFilter.createdAt,
        $lte: new Date(req.query.endDate as string),
      };
    }

    // Build query
    const query = {
      author: req.params.userId,
      ...dateFilter,
    };

    // Get total count
    const total = await Post.countDocuments(query);

    // Get posts with pagination
    const posts = await Post.find(query)
      .sort({ [sortBy as string]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("author", "name")
      .populate({
        path: "comments.author",
        select: "name",
      })
      .populate("likes", "name")
      .lean();

    res.json(
      createPaginatedResponse(posts, total, { page, limit, sortBy, sortOrder })
    );
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
