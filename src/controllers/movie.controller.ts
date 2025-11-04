import { Request, Response } from "express";
import Movie from "../models/movie.model";

// POST /api/movies
export const createMovie = async (req: Request, res: Response) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/movies
export const getAllMovies = async (_req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies || []);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/movies/:id
export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findById(req.params.id).populate(
      "categoryIds",
      "name slug"
    ); // chỉ lấy field name
    // .populate("countryIds", "name");

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /api/movies/:id
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedMovie)
      return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/movies/:id
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie)
      return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// GET /api/movies/recommend
export const getRecommendedMovies = async (_req: Request, res: Response) => {
  try {
    const movies = await Movie.find({ isRecommended: true })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/movies/popular-today
export const getPopularToday = async (_req: Request, res: Response) => {
  try {
    const movies = await Movie.find().sort({ viewsToday: -1 }).limit(10);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching popular today movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/movies/latest
export const getLatestMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("name latestEpisode _id"); // ✅ chỉ lấy field cần thiết

    // Nếu muốn frontend hiển thị "episode"
    const formatted = movies.map((m) => ({
      _id: m._id,
      name: m.name,
      episode: m.latestEpisode || 0,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// GET /api/movies/week-hot
export const getWeeklyHotMovies = async (_req: Request, res: Response) => {
  try {
    const movies = await Movie.find().sort({ viewsWeek: -1 }).limit(10);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching weekly hot movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/movies/type/:type  (ví dụ /api/movies/type/movie, /type/tv)
export const getMoviesByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const movies = await Movie.find({ type }).sort({ updatedAt: -1 }).limit(10);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies by type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// GET /api/movies/featured
export const getFeaturedMovies = async (_req: Request, res: Response) => {
  try {
    const movies = await Movie.find({ featured: true })
      .sort({ updatedAt: -1 })
      .limit(20);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching featured movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/movies/favorite
export const getFavoriteMovies = async (_req: Request, res: Response) => {
  try {
    const movies = await Movie.find({ isFavorite: true })
      .sort({ updatedAt: -1 })
      .limit(20);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getRecentlyUpdatedMovies = async (req: Request, res: Response) => {
  try {
    const { limit = 20 } = req.query; // cho phép giới hạn số lượng trả về

    const movies = await Movie.find()
      .sort({ updatedAt: -1 })
      .limit(Number(limit));

    res.status(200).json(movies || []);
  } catch (error) {
    console.error("Error fetching recently updated movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
