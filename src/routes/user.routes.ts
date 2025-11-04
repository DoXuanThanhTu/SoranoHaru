import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { requireAuth, optionalAuth } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * 🔹 Đăng ký & Đăng nhập (public)
 */
router.post("/register", registerUser);
router.post("/login", loginUser);

/**
 * 🔹 Lấy danh sách người dùng (admin-only)
 * Có thể dùng requireAuth, và kiểm tra role trong controller.
 */
router.get("/", requireAuth, getAllUsers);

/**
 * 🔹 Lấy thông tin người dùng cụ thể (public nhưng có thể biết user hiện tại nếu có token)
 * → Dùng optionalAuth
 */
router.get("/:id", optionalAuth, getUserById);

/**
 * 🔹 Cập nhật thông tin người dùng (cần đăng nhập)
 */
router.put("/:id", requireAuth, updateUser);

/**
 * 🔹 Xóa người dùng (admin-only)
 */
router.delete("/:id", requireAuth, deleteUser);

export default router;
