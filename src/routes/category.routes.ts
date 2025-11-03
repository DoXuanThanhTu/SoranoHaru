import { getMoviesByMultipleCategories } from "./../controllers/category.controller";
import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getMoviesByCategory,
} from "../controllers/category.controller";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:slug/movies", getMoviesByCategory);
router.post("/movies-by-many", getMoviesByMultipleCategories);
export default router;
