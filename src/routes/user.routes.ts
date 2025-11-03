import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = express.Router();

// Tạo người dùng mới
router.post("/", createUser);

// Lấy tất cả người dùng
router.get("/", getAllUsers);

// Lấy người dùng theo ID
router.get("/:id", getUserById);

// Cập nhật người dùng
router.put("/:id", updateUser);

// Xóa người dùng
router.delete("/:id", deleteUser);

export default router;
