import React, { useState } from "react";

export default function MovieInfo({
  movie,
  categories,
  countries,
}: {
  movie: any;
  categories: any[];
  countries: any[];
}) {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="mx-auto max-w-6xl p-4 mt-6 bg-gray-900 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/3">
          <img
            src={movie.posterUrl}
            alt="poster"
            className="rounded-xl shadow-lg"
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

          {/* Mô tả phim (có giới hạn độ dài và nút xem thêm) */}
          <div className="mb-4 text-gray-300">
            <p
              className={`transition-all duration-300 ${
                showFull ? "line-clamp-none" : "line-clamp-3"
              }`}
            >
              {movie.description}
            </p>

            {/* nút xem thêm */}
            {movie.description?.length > 200 && (
              <button
                onClick={() => setShowFull((v) => !v)}
                className="text-purple-400 mt-1 hover:underline text-sm"
              >
                {showFull ? "Thu gọn ▲" : "Xem thêm ▼"}
              </button>
            )}
          </div>

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
                .map((id: any) => categories.find((c) => c.id === id)?.name)
                .join(", ")}
            </p>
            <p>
              <strong>Quốc gia:</strong>{" "}
              {movie.countryIds
                .map((id: any) => countries.find((c) => c.id === id)?.name)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
