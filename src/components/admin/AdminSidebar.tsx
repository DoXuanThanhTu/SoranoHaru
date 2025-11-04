"use client";

import Link from "next/link";
import {
  Film,
  Users,
  MessageSquare,
  Layers,
  Globe,
  Eye,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">🎬 Admin Panel</h1>
        <nav className="space-y-2">
          <SidebarLink
            href="/admin/dashboard"
            icon={<Film size={18} />}
            label="Tổng quan"
          />
          <SidebarLink
            href="/admin/movies"
            icon={<Film size={18} />}
            label="Phim"
          />
          <SidebarLink
            href="/admin/categories"
            icon={<Layers size={18} />}
            label="Thể loại"
          />
          <SidebarLink
            href="/admin/countries"
            icon={<Globe size={18} />}
            label="Quốc gia"
          />
          <SidebarLink
            href="/admin/episodes"
            icon={<Film size={18} />}
            label="Tập phim"
          />
          <SidebarLink
            href="/admin/comments"
            icon={<MessageSquare size={18} />}
            label="Bình luận"
          />
          <SidebarLink
            href="/admin/users"
            icon={<Users size={18} />}
            label="Người dùng"
          />
          <SidebarLink
            href="/admin/views"
            icon={<Eye size={18} />}
            label="Lượt xem"
          />
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-700 w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
      >
        <LogOut size={18} /> Đăng xuất
      </button>
    </aside>
  );
}

function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
