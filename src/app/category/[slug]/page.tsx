"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryType, MovieType } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dynamic = "force-dynamic";

async function getCategoryData(
  slug: string
): Promise<{ category: CategoryType | null; movies: MovieType[] }> {
  try {
    const res = await fetch(`${API_URL}/categories/${slug}/movies`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn("⚠️ Không thể fetch dữ liệu:", res.status);
      return { category: null, movies: [] };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching category:", error);
    return { category: null, movies: [] };
  }
}

// 🔹 Component MovieList
const MovieList = ({
  movies,
  title,
}: {
  movies: MovieType[];
  title?: string;
}) => (
  <section className="p-6">
    {title && (
      <h2 className="text-2xl font-bold mb-6 text-white uppercase">{title}</h2>
    )}
    {movies.length === 0 ? (
      <p className="text-gray-400">Không có phim nào.</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <Link
            key={movie._id || `movie${index}`}
            href={`/movie/${movie._id}`}
            className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition"
          >
            <div className="relative aspect-[2/3]">
              <img
                src={movie.posterUrl || movie.thumbUrl || "/placeholder.jpg"}
                alt={movie.name}
                className="w-full h-full object-cover"
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

// 🔹 Component MovieCategory
const MovieCategory = ({
  categoryName,
  movies,
}: {
  categoryName: string;
  movies: MovieType[];
}) => (
  <div>
    <h1 className="text-3xl font-bold text-white p-6 uppercase">
      {categoryName}
    </h1>
    <MovieList movies={movies} title={`Danh sách ${categoryName}`} />
  </div>
);

// 🔹 Trang chính CategoryPage
interface Props {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: Props) {
  const { slug } = use(params); // ✅ unwrap Promise

  const [data, setData] = React.useState<{
    category: CategoryType | null;
    movies: MovieType[];
  }>({ category: null, movies: [] });

  React.useEffect(() => {
    getCategoryData(slug).then(setData);
  }, [slug]);

  const { category, movies } = data;

  return (
    <main className="bg-[#111] pt-16">
      {category ? (
        <>
          <MovieCategory categoryName={category.name} movies={movies} />
          <MovieList movies={movies} title="Phim đề xuất" />
        </>
      ) : (
        <p className="text-gray-400 p-6">Không tìm thấy thể loại: {slug}</p>
      )}
    </main>
  );
}
