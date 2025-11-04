"use client";
import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Twitter,
  Send,
} from "lucide-react";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={30}
              height={30}
              priority
              className="object-contain"
            />
            <div>
              <h2 className="text-xl font-semibold text-white">SoraNoHaru</h2>
              <p className="text-sm text-gray-400">Phim hay mỗi ngày</p>
            </div>
          </div>

          {/* Icon mạng xã hội */}
          <div className="flex gap-3">
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 transition"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500 transition"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 transition"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-sky-400 transition"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-500 transition"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Menu trên */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm border-b border-gray-800 pb-3">
          <li className="hover:text-white cursor-pointer transition">
            Hỏi - Đáp
          </li>
          <li className="hover:text-white cursor-pointer transition">
            Chính sách bảo mật
          </li>
          <li className="hover:text-white cursor-pointer transition">
            Điều khoản sử dụng
          </li>
          <li className="hover:text-white cursor-pointer transition">
            Giới thiệu
          </li>
          <li className="hover:text-white cursor-pointer transition">
            Liên hệ
          </li>
        </ul>

        {/* Mô tả */}
        <p className="text-sm text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
          SoraNoHaru – Trang xem phim online chất lượng cao miễn phí Vietsub,
          thuyết minh, lồng tiếng full HD. Kho phim đa dạng thể loại, cập nhật
          liên tục từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái
          Lan, Nhật Bản, Âu Mỹ... Khám phá nền tảng phim trực tuyến hiện đại với
          chất lượng 4K cực nét.
        </p>

        {/* Bản quyền */}
        <div className="text-center text-sm text-gray-500 pt-3 border-t border-gray-800">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-300">SoraNoHaru</span>. Tất cả
          các phim chỉ phục vụ mục đích học tập & chia sẻ, không lưu trữ video
          trên hệ thống.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
