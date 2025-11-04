import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/**
 * Interface định nghĩa cấu trúc token decode ra
 */
export interface DecodedToken {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Interface mở rộng Request để thêm `user`
 */
export interface AuthRequest extends Request {
  user?: IUser;
}

/**
 * 🔹 Middleware: Yêu cầu đăng nhập (bắt buộc có token)
 */
export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Thiếu token xác thực" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    const user = await User.findById(decoded.userId).select("-passwordHash");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Token không hợp lệ hoặc user không tồn tại" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Lỗi xác thực:", error);
    res.status(401).json({ message: "Xác thực thất bại" });
  }
};

/**
 * 🔹 Middleware: Có thể có hoặc không có token
 */
export const optionalAuth = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

      const user = await User.findById(decoded.userId).select("-passwordHash");
      if (user) req.user = user;
    }
  } catch (error) {
    // Không sao nếu token không hợp lệ — optional
  }
  next();
};

/**
 * 🔹 Middleware: Chỉ cho phép admin truy cập
 */
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin mới có quyền truy cập" });
  }
  next();
};
