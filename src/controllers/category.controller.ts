import { Request, Response } from "express";
import Category from "../models/category.model";
import Movie from "../models/movie.model";
// POST /api/categories
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description } = req.body;
    if (!name || !slug) {
      return res
        .status(400)
        .json({ message: "Missing required fields: name, slug" });
    }
    const category = new Category({ name, slug, description });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/categories
export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories || []);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/categories/:id
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /api/categories/:id
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/categories/:id
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// GET /api/categories/:slug/movies
export const getMoviesByCategory = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    // Tìm category theo slug
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Tìm tất cả phim có chứa categoryId
    const movies = await Movie.find({ categoryIds: category._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({ category, movies });
  } catch (error) {
    console.error("Error fetching movies by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// POST /api/categories/movies-by-many
export const getMoviesByMultipleCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const { slugs } = req.body; // mảng slug, ví dụ: ["phim-le", "phim-bo"]

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return res
        .status(400)
        .json({ message: "slugs must be a non-empty array" });
    }

    // Lấy danh sách category theo slug
    const categories = await Category.find({ slug: { $in: slugs } });

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    // Lấy tất cả _id của các category tìm được
    const categoryIds = categories.map((cat) => cat._id);

    // Tìm phim thuộc bất kỳ category nào trong danh sách
    const movies = await Movie.find({ categoryIds: { $in: categoryIds } })
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({ categories, movies });
  } catch (error) {
    console.error("Error fetching movies by multiple categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
