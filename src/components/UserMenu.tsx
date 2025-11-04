"use client";

import { useState, useEffect, useRef } from "react";
import { User, LogOut, Settings, Heart, Clock } from "lucide-react";
import Link from "next/link";

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lấy user từ localStorage khi load
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  // Hover logic
  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => setIsOpen(true), 400); // mở sau 400ms
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => setIsOpen(false), 200); // đóng nhẹ sau 200ms
    setHoverTimeout(timeout);
  };

  return (
    <div
      className="relative"
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Nút user */}
      {!user ? (
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition font-medium"
        >
          <User className="w-5 h-5" />
          <span className="hidden xl:inline">Đăng nhập</span>
        </Link>
      ) : (
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition font-medium"
        >
          <img
            src={user?.avatar?.trim() ? user.avatar : "/default-avatar.png"}
            alt="avatar"
            className="w-8 h-8 rounded-full border border-gray-300 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-avatar.png";
            }}
          />
          <span className="hidden xl:inline">
            {user?.username || "Người dùng"}
          </span>
        </button>
      )}

      {/* Popup menu */}
      {user && isOpen && (
        <div
          className="absolute right-0 top-full w-56 bg-gray-800 border border-gray-700 
          rounded-xl shadow-lg py-2 text-sm animate-fadeIn z-50"
        >
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition"
          >
            <Settings className="w-4 h-4" /> Chỉnh sửa thông tin
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition"
          >
            <Heart className="w-4 h-4" /> Phim yêu thích
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition"
          >
            <Clock className="w-4 h-4" /> Phim đã xem
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-700 transition"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
