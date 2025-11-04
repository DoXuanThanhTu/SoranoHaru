"use client";
import React from "react";

export default function RecommendList({ movies }: { movies: any[] }) {
  return (
    <div className="bg-gray-900/50 rounded-xl p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
        Phim đề xuất
      </h3>
      <div className="space-y-3">
        {movies.map((movie, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 hover:bg-gray-800/60 p-2 rounded-lg transition-colors cursor-pointer"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-20 h-28 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm md:text-base line-clamp-2">
                {movie.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {movie.year} • {movie.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
