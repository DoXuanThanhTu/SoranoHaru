"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CommentSection({ movieId }: { movieId: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Lấy danh sách bình luận từ server
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_URL}/comments/movie/${movieId}`);
        setComments(res.data || []);
      } catch (error) {
        console.error("Lỗi khi tải bình luận:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchComments();
  }, [movieId]);

  // Gửi bình luận mới
  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/comments", {
        content: newComment,
        movieId,
        userId: "654a1b2c3d4e5f006789abcd", // Thay bằng userId thực tế
      });

      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4 mt-8 bg-gray-900 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        💬 Bình luận ({comments.length})
      </h3>

      {loading ? (
        <p className="text-gray-400">Đang tải bình luận...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-400">Chưa có bình luận nào.</p>
      ) : (
        comments.map((c) => (
          <div
            key={c._id}
            className="border-t border-gray-800 py-3 first:border-t-0 flex gap-3 items-start"
          >
            <img
              src={c.userId?.avatar || "/default-avatar.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-200">{c.content}</p>
              <div className="text-xs text-gray-500 mt-1 flex gap-3">
                {c.userId?.username && <span>👤 {c.userId.username}</span>}
                <span>👍 {c.likes}</span>
                <span>👎 {c.dislikes}</span>
                <span>{new Date(c.createdAt).toLocaleDateString("vi-VN")}</span>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="mt-6 border border-gray-800 rounded-lg p-4">
        <textarea
          className="w-full bg-gray-800 text-gray-200 rounded-lg p-2 resize-none"
          placeholder="Viết bình luận..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
