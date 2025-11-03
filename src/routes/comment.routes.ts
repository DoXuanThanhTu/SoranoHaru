import express from "express";
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  getAllCommentsByMovieID,
} from "../controllers/comment.controller";

const router = express.Router();

router.post("/", createComment);
router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/movie/:movieId", getAllCommentsByMovieID);
export default router;
