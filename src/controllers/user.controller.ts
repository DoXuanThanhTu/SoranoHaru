import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import { AuthRequest } from "../middleware/authMiddleware";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/**
 * 🔹 Đăng ký người dùng mới
 */
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        message: "Thiếu thông tin bắt buộc (username, email, password)",
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email đã được sử dụng" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, passwordHash, role: "user" });

    const savedUser = await user.save();
    const { passwordHash: _, ...userData } = savedUser.toObject();

    res.status(201).json(userData);
  } catch (error) {
    console.error("❌ Lỗi khi đăng ký:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * 🔹 Đăng nhập
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ email và mật khẩu" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Tài khoản không tồn tại" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: "Mật khẩu không chính xác" });
      return;
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * 🔹 Lấy danh sách người dùng (Admin)
 */
export const getAllUsers = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      res
        .status(403)
        .json({ message: "Chỉ admin mới có quyền xem danh sách người dùng" });
      return;
    }

    const users = await User.find().select("-passwordHash");
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách người dùng:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * 🔹 Lấy thông tin người dùng theo ID
 */
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Lỗi lấy thông tin người dùng:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * 🔹 Cập nhật thông tin người dùng
 */
export const updateUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { username, avatar, password } = req.body;
    const targetId = req.params.id;

    // Chỉ cho phép người dùng tự cập nhật hoặc admin
    if (req.user?._id.toString() !== targetId && req.user?.role !== "admin") {
      res
        .status(403)
        .json({ message: "Không có quyền cập nhật người dùng này" });
      return;
    }

    const updateData: Partial<IUser> = {};
    if (username) updateData.username = username;
    if (avatar) updateData.avatar = avatar;
    if (password) updateData.passwordHash = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(targetId, updateData, {
      new: true,
    }).select("-passwordHash");

    if (!updatedUser) {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("❌ Lỗi cập nhật người dùng:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * 🔹 Xóa người dùng (Admin)
 */
export const deleteUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      res
        .status(403)
        .json({ message: "Chỉ admin mới có quyền xóa người dùng" });
      return;
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
      return;
    }

    res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    console.error("❌ Lỗi xóa người dùng:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
