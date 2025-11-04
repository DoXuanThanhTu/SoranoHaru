"use client";

import React, { useState } from "react";
import { movie, episodes, comments, categories, countries } from "../mockdata";

/**
 * Trang xem phim (WatchPage)
 */
export default function WatchPage() {
  const [currentEpisode, setCurrentEpisode] = useState(
    episodes[0].serverData[0]
  );

  const isSeries = movie.type === "series" || movie.type === "phimbo";

  return (
    <div
      id="wrapper"
      className="relative bg-gray-950 text-gray-100 min-h-screen"
    >
      {/* ==== Banner ==== */}
      <div className="mb-8 w-full flex justify-center">
        <img
          src={movie.thumbUrl}
          alt={movie.name}
          className="w-full max-w-6xl rounded-xl shadow-lg"
        />
      </div>

      {/* ==== Player Section ==== */}
      <div className="mx-auto w-full max-w-6xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <a
            href={`/phim/${movie.slug}`}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <i className="fa-solid fa-angle-left"></i>
          </a>
          <h2 className="text-lg font-semibold">
            {isSeries ? `Xem ${currentEpisode.name}` : `Xem phim ${movie.name}`}
          </h2>
        </div>

        <div className="aspect-video w-full mb-4">
          <iframe
            src={currentEpisode.linkEmbed}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>

        {/* ==== Control Bar ==== */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm border-t border-gray-800 pt-3">
          <button className="hover:text-red-400">❤️ Yêu thích</button>
          <button className="hover:text-blue-400">+ Thêm vào</button>
          <span className="text-gray-400">
            👁 {movie.viewCount.toLocaleString()} lượt xem
          </span>
          <button className="hover:text-orange-400">🚩 Báo lỗi</button>
        </div>
      </div>

      {/* ==== Episode List (for series only) ==== */}
      {isSeries && (
        <div className="mx-auto max-w-6xl p-4 bg-gray-900 rounded-xl shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-3">🎞 Danh sách tập</h3>
          <div className="flex flex-wrap gap-2">
            {episodes[0].serverData.map((ep, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentEpisode(ep)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentEpisode.name === ep.name
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {ep.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==== Movie Info ==== */}
      <div className="mx-auto max-w-6xl p-4 mt-6 bg-gray-900 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/3">
            <img
              src={movie.posterUrl}
              alt="poster"
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{movie.name}</h2>
            <p className="italic text-gray-400 mb-2">{movie.originName}</p>

            <div className="flex flex-wrap gap-2 mb-3 text-sm">
              <span className="bg-yellow-500 px-2 py-0.5 rounded">
                IMDB {movie.imdb?.voteAverage ?? "?"}
              </span>
              <span className="bg-gray-700 px-2 py-0.5 rounded">
                {movie.quality}
              </span>
              <span className="bg-red-600 px-2 py-0.5 rounded">
                {movie.status}
              </span>
              <span className="bg-gray-700 px-2 py-0.5 rounded">
                {movie.year}
              </span>
              <span className="bg-gray-700 px-2 py-0.5 rounded">
                {movie.duration}
              </span>
            </div>

            <p className="text-gray-300 mb-4">{movie.description}</p>

            <div className="text-sm text-gray-400 space-y-1">
              <p>
                <strong>Đạo diễn:</strong> {movie.director?.join(", ")}
              </p>
              <p>
                <strong>Diễn viên:</strong> {movie.actor?.join(", ")}
              </p>
              <p>
                <strong>Thể loại:</strong>{" "}
                {movie.categoryIds
                  .map((id) => categories.find((c) => c.id === id)?.name)
                  .join(", ")}
              </p>
              <p>
                <strong>Quốc gia:</strong>{" "}
                {movie.countryIds
                  .map((id) => countries.find((c) => c.id === id)?.name)
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==== Comment Section ==== */}
      <div className="mx-auto max-w-6xl p-4 mt-8 bg-gray-900 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          💬 Bình luận ({comments.length})
        </h3>

        {comments.map((c) => (
          <div
            key={c.id}
            className="border-t border-gray-800 py-3 first:border-t-0"
          >
            <p className="text-gray-200">{c.content}</p>
            <div className="text-xs text-gray-500 mt-1 flex gap-3">
              <span>👍 {c.likes}</span>
              <span>👎 {c.dislikes}</span>
              <span>{c.createdAt?.toLocaleDateString("vi-VN")}</span>
            </div>
          </div>
        ))}

        {/* Ô nhập bình luận */}
        <div className="mt-6 border border-gray-800 rounded-lg p-4">
          <textarea
            className="w-full bg-gray-800 text-gray-200 rounded-lg p-2 resize-none"
            placeholder="Viết bình luận..."
          ></textarea>
          <div className="flex justify-end mt-2">
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
