"use client"; // Bắt buộc — error.tsx phải là client component

import { useEffect } from "react";

export default function CategoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log lỗi ra console (chỉ chạy client)
  useEffect(() => {
    console.error("⚠️ Lỗi trong Category Page:", error);
  }, [error]);

  return (
    <div className="text-center text-white py-16 bg-gray-900 rounded-xl mx-4 my-8 shadow-md">
      <h2 className="text-2xl font-bold mb-3 text-red-400">
        Có lỗi xảy ra khi tải dữ liệu phim 😢
      </h2>
      <p className="text-gray-400 mb-6">
        Không thể tải danh mục hoặc danh sách phim. Vui lòng thử lại sau.
      </p>
      <button
        onClick={() => reset()} // Gọi hàm reset() để reload lại page
        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
      >
        Thử lại
      </button>
    </div>
  );
}
