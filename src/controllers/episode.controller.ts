import { Request, Response } from "express";
import Episode from "../models/episode.model";

// POST /api/episodes
export const createEpisode = async (req: Request, res: Response) => {
  try {
    const {
      movieId,
      serverName,
      isAI = false,
      priority = 0,
      serverData = [],
    } = req.body;

    if (!movieId || !serverName) {
      return res
        .status(400)
        .json({ message: "Missing required fields: movieId, serverName" });
    }

    const episode = new Episode({
      movieId,
      serverName,
      isAI,
      priority,
      serverData,
    });

    const savedEpisode = await episode.save();
    res.status(201).json(savedEpisode);
  } catch (error) {
    console.error("Error creating episode:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/episodes
export const getAllEpisodes = async (_req: Request, res: Response) => {
  try {
    const episodes = await Episode.find().populate("movieId");
    res.status(200).json(episodes || []);
  } catch (error) {
    console.error("Error fetching episodes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/episodes/:id
export const getEpisodeById = async (req: Request, res: Response) => {
  try {
    const episode = await Episode.findById(req.params.id).populate("movieId");
    if (!episode) return res.status(404).json({ message: "Episode not found" });
    res.status(200).json(episode);
  } catch (error) {
    console.error("Error fetching episode:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/movies/:movieId/episodes
export const getEpisodesByMovieId = async (req: Request, res: Response) => {
  try {
    const episodes = await Episode.find({
      movieId: req.params.movieId,
    }).populate("movieId");
    res.status(200).json(episodes || []);
  } catch (error) {
    console.error("Error fetching episodes by movieId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /api/episodes/:id
export const updateEpisode = async (req: Request, res: Response) => {
  try {
    const updatedEpisode = await Episode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEpisode)
      return res.status(404).json({ message: "Episode not found" });
    res.status(200).json(updatedEpisode);
  } catch (error) {
    console.error("Error updating episode:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/episodes/:id
export const deleteEpisode = async (req: Request, res: Response) => {
  try {
    const deletedEpisode = await Episode.findByIdAndDelete(req.params.id);
    if (!deletedEpisode)
      return res.status(404).json({ message: "Episode not found" });
    res.status(200).json({ message: "Episode deleted successfully" });
  } catch (error) {
    console.error("Error deleting episode:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// POST /api/episodes/add-single
export const addEpisodeToServerData = async (req: Request, res: Response) => {
  try {
    const {
      movieId,
      serverName,
      isAI = false,
      priority = 0,
      serverData,
    } = req.body;

    if (!movieId || !serverName || !serverData || !Array.isArray(serverData)) {
      return res
        .status(400)
        .json({ message: "Missing required fields or serverData is invalid" });
    }

    // Lấy document Episode hiện tại cho server
    let episodeDoc = await Episode.findOne({ movieId, serverName });

    if (!episodeDoc) {
      // Nếu chưa có document cho server này, tạo mới
      episodeDoc = new Episode({
        movieId,
        serverName,
        isAI,
        priority,
        serverData,
      });
      await episodeDoc.save();
      return res
        .status(201)
        .json({
          message: "Server created with new episode(s)",
          episode: episodeDoc,
        });
    }

    // Duyệt từng tập trong serverData gửi lên
    for (const newEp of serverData) {
      const exists = episodeDoc.serverData.some((ep) => ep.slug === newEp.slug);
      if (!exists) {
        episodeDoc.serverData.push(newEp);
      }
    }

    await episodeDoc.save();
    res
      .status(200)
      .json({ message: "Episode(s) added successfully", episode: episodeDoc });
  } catch (error) {
    console.error("Error adding episode(s):", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
