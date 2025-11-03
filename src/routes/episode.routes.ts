import express from "express";
import {
  createEpisode,
  getAllEpisodes,
  getEpisodeById,
  getEpisodesByMovieId,
  updateEpisode,
  deleteEpisode,
} from "../controllers/episode.controller";

const router = express.Router();

// CRUD routes
router.post("/", createEpisode);
router.get("/", getAllEpisodes);
router.get("/:id", getEpisodeById);
router.put("/:id", updateEpisode);
router.delete("/:id", deleteEpisode);

// Lấy tất cả episode của 1 movie
router.get("/movies/:movieId", getEpisodesByMovieId);

export default router;
