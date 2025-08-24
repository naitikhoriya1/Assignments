import { Request, Response } from "express";
import { Post } from "../models/post.model.js";
import { AuthenticatedRequest } from "../types/express.js";

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { text } = req.body;
    const author = req.user?.id;

    if (!text) {
      return res.status(400).json({ message: "Post text is required" });
    }

    const post = new Post({
      text,
      author,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("author", "name title")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
