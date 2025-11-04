import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Nếu người dùng vào đúng /admin thì cho qua
  if (url.pathname === "/admin") {
    return NextResponse.next();
  }

  // Kiểm tra nếu route bắt đầu bằng /admin/
  if (url.pathname.startsWith("/admin/")) {
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      const decoded = jwt.decode(token) as {
        role?: string;
        exp?: number;
      } | null;

      // Nếu token hết hạn
      if (!decoded || (decoded.exp && decoded.exp * 1000 < Date.now())) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }

      // Nếu không phải admin → redirect về trang chính
      if (decoded.role !== "admin") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }

      // ✅ Là admin → cho phép truy cập
      return NextResponse.next();
    } catch (err) {
      console.error("Lỗi khi decode token:", err);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Mặc định cho phép tất cả route khác
  return NextResponse.next();
}

// Áp dụng middleware cho tất cả route /admin/*
export const config = {
  matcher: ["/admin/:path*"],
};
