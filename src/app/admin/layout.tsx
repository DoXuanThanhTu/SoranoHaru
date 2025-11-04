"use client";

import "../globals.css";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
  email?: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded: DecodedToken = jwtDecode(token);

        // ✅ Kiểm tra hạn token và quyền
        const isExpired = decoded.exp * 1000 < Date.now();
        if (!isExpired && decoded.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("❌ Lỗi khi decode token:", err);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  // ⏳ Hiển thị khi đang kiểm tra token
  if (isChecking)
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="text-lg animate-pulse">
          🔐 Đang kiểm tra quyền truy cập...
        </div>
      </div>
    );

  // 🚫 Không phải admin
  if (!isAdmin)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <h1 className="text-3xl font-bold mb-2">🚫 Truy cập bị từ chối</h1>
        <p>Bạn không có quyền vào trang quản trị.</p>
        <a
          href="/login"
          className="mt-4 text-sm text-blue-400 hover:text-blue-300"
        >
          → Quay lại đăng nhập
        </a>
      </div>
    );

  // ✅ Giao diện chính khi đã xác thực
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar cố định bên trái */}
      <AdminSidebar />

      {/* Nội dung bên phải */}
      <div className="flex-1 p-8 overflow-y-auto">{children}</div>
    </div>
  );
}
