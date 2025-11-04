"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "../utils/axiosClient";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axiosClient.post("/users/register", form);
      alert("Đăng ký thành công! Hãy đăng nhập.");
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Đăng ký tài khoản
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Tên người dùng"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded transition"
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-400">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-yellow-400 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}
