import express from "express";
import {
  createEpisode,
  getAllEpisodes,
  getEpisodeById,
  getEpisodesByMovieId,
  updateEpisode,
  deleteEpisode,
  addEpisodeToServerData,
} from "../controllers/episode.controller";

const router = express.Router();

// 🔹 Route đặc biệt nên đặt TRƯỚC :id
router.get("/movies/:movieId", getEpisodesByMovieId);

// CRUD cơ bản
router.post("/", createEpisode);
router.get("/", getAllEpisodes);
router.get("/:id", getEpisodeById);
router.put("/:id", updateEpisode);
router.delete("/:id", deleteEpisode);

// 🔹 Route thêm tập nhanh (paste JSON / thủ công)
router.post("/add-single", addEpisodeToServerData);

export default router;
