"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MovieType } from "@/types";

interface MovieCategoryProps {
  movies: MovieType[];
  categoryName: string;
}

const MovieCategory: React.FC<MovieCategoryProps> = ({
  movies,
  categoryName,
}) => {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white uppercase">
        {categoryName}
      </h2>

      {movies.length === 0 ? (
        <p className="text-gray-400">Không có phim nào trong danh mục này.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <Link
              // key={movie._id}
              href={`/phim/${movie.slug}`}
              className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <div className="relative aspect-[2/3]">
                <Image
                  src={movie.posterUrl || movie.thumbUrl || "/placeholder.jpg"}
                  alt={movie.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {movie.name}
                </h3>
                <p className="text-xs text-gray-400">
                  {movie.year || "N/A"} · {movie.quality || ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieCategory;
