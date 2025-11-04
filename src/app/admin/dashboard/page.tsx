"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return router.push("/admin/login");

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.role !== "admin") throw new Error("Không có quyền truy cập");
      setAdmin(decoded);
    } catch {
      localStorage.removeItem("adminToken");
      router.push("/admin/login");
    }
  }, [router]);

  if (!admin)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Đang tải...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🎛️ Admin Dashboard</h1>
      <p>
        Xin chào, <span className="text-blue-400">{admin.id}</span>
      </p>
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          router.push("/admin/login");
        }}
        className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
      >
        Đăng xuất
      </button>
    </div>
  );
}
