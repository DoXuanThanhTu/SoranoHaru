import { Request, Response } from "express";
import Comment from "../models/comment.model";

// POST /api/comments
export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = new Comment(req.body);
    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/comments
export const getAllComments = async (_req: Request, res: Response) => {
  try {
    const comments = await Comment.find()
      .populate("userId", "username")
      .populate("movieId", "name")
      .populate("parentId");
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/comments/:id
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("userId", "username")
      .populate("movieId", "name")
      .populate("parentId");
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /api/comments/:id
export const updateComment = async (req: Request, res: Response) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/comments/:id
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// GET /api/comments/movie/:movieId
export const getAllCommentsByMovieID = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    if (!movieId) {
      return res.status(400).json({ message: "movieId is required" });
    }

    const comments = await Comment.find({ movieId })
      .populate("userId", "username avatar")
      .populate("movieId", "name")
      .populate("parentId");

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments by movieId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
