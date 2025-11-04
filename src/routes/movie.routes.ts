import express from "express";
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getRecommendedMovies,
  getPopularToday,
  getLatestMovies,
  getWeeklyHotMovies,
  getMoviesByType,
  getFeaturedMovies,
  getFavoriteMovies,
  getRecentlyUpdatedMovies,
} from "../controllers/movie.controller";

const router = express.Router();
router.get("/updated", getRecentlyUpdatedMovies);

router.get("/featured", getFeaturedMovies);
router.get("/favorite", getFavoriteMovies);
router.post("/", createMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

router.get("/home/recommend", getRecommendedMovies);
router.get("/home/today", getPopularToday);
router.get("/home/latest", getLatestMovies);
router.get("/home/week-hot", getWeeklyHotMovies);
router.get("/home/type/:type", getMoviesByType);
export default router;
