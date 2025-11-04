"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Play, Heart, Plus, Share2, MessageCircle } from "lucide-react";
import CommentSection from "@/components/CommentSection";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Episode {
  name: string;
  slug?: string;
  filename?: string;
  linkEmbed?: string;
  linkM3u8?: string;
}

interface MovieDetail {
  _id: string;
  slug?: string;
  name: string;
  originName?: string;
  year?: number;
  type: string;
  status?: string;
  episodeCount?: number;
  latestEpisode?: string;
  quality?: string;
  language?: string;
  viewCount?: number;
  thumbUrl?: string;
  posterUrl?: string;
  categoryIds?: any[];
  countryIds?: any[];
  actor?: string[];
  director?: string[];
  imdb?: { voteAverage: number; voteCount: number };
  tmdb?: { voteAverage: number; voteCount: number };
  seo?: { title?: string; description?: string };
  episodes?: Episode[];
  description?: string;
  duration?: string;
}

const MovieDetailPage: React.FC = () => {
  const params = useParams();
  const movieId = params.id;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [relatedMovies, setRelatedMovies] = useState<MovieDetail[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch movie + episodes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await axios.get(`${API_URL}/movies/${movieId}`);
        const episodeRes = await axios.get(
          `${API_URL}/episodes/movies/${movieId}`
        );

        const movieData = movieRes.data;
        setMovie(movieData);

        // Flatten episodes
        const allEpisodes: Episode[] = [];
        episodeRes.data.forEach((s: any) => {
          allEpisodes.push(...s.serverData);
        });
        setEpisodes(allEpisodes);

        // Fetch related movies (same category)
        if (movieData.categoryIds?.length > 0) {
          const firstCategorySlug = movieData.categoryIds[0].slug;
          const relatedRes = await axios.get(
            `${API_URL}/categories/${firstCategorySlug}/movies`
          );
          // Lọc ra chính phim hiện tại
          const filtered = relatedRes.data.movies.filter(
            (m: any) => m._id !== movieId
          );
          setRelatedMovies(filtered.slice(0, 8));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Đang tải...</p>;
  if (!movie)
    return (
      <p className="text-center text-red-400 mt-10">Không tìm thấy phim</p>
    );

  return (
    <div className="bg-[#0f0f10] min-h-screen text-white">
      {/* Background banner */}
      {movie.thumbUrl && (
        <div
          className="h-[400px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${movie.thumbUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] via-[#0f0f10]/60 to-transparent" />
        </div>
      )}

      {/* Thông tin phim */}
      <div className="max-w-6xl mx-auto px-4 relative -mt-40 flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="min-w-[220px] md:w-1/4">
          <img
            src={movie.posterUrl || movie.thumbUrl || "/no-poster.png"}
            alt={movie.name}
            className="rounded-lg shadow-lg object-cover w-[300px] h-[450px]"
          />
        </div>

        {/* Nội dung */}
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold">{movie.name}</h1>
          {movie.originName && (
            <p className="text-yellow-400">{movie.originName}</p>
          )}

          {/* Thông tin cơ bản */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
            {movie.imdb?.voteAverage && (
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded font-semibold">
                IMDb {movie.imdb.voteAverage}
              </span>
            )}
            {movie.duration && <span>{movie.duration}</span>}
            {movie.year && <span>{movie.year}</span>}
            {movie.status && <span>{movie.status}</span>}
            {movie.latestEpisode && <span>Tập {movie.latestEpisode}</span>}
          </div>

          {/* Thể loại / quốc gia */}
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.categoryIds?.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/category/${cat.slug}`}
                className="bg-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-600 transition"
              >
                {cat.name}
              </Link>
            ))}
            {/* {movie.countryIds?.map((cty: any) => (
              <Link
                key={cty._id}
                href={`/country/${cty.slug}`}
                className="bg-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-600 transition"
              >
                {cty.name}
              </Link>
            ))} */}
          </div>

          {/* Nút hành động */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Link
              href={`/watch/${movie._id}?ep=1`}
              className="flex items-center gap-2 bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full hover:bg-yellow-400 transition"
            >
              <Play className="w-5 h-5" /> Xem Ngay
            </Link>
            <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700">
              <Heart className="w-4 h-4" /> Yêu thích
            </button>
            <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700">
              <Plus className="w-4 h-4" /> Thêm vào
            </button>
            <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700">
              <Share2 className="w-4 h-4" /> Chia sẻ
            </button>
            <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700">
              <MessageCircle className="w-4 h-4" /> Bình luận
            </button>
          </div>

          {/* Giới thiệu */}
          {movie.description && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-1">Giới thiệu:</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {movie.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Danh sách tập phim */}
      <div className="max-w-6xl mx-auto px-4 mt-10 pb-10">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Tập phim
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {episodes.map((ep, index) => (
            <Link
              key={index}
              href={`/watch/${movie._id}?ep=${index + 1}`}
              className="block bg-gray-800 text-white text-sm p-2 rounded text-center hover:bg-yellow-500 hover:text-black transition"
            >
              {ep.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Bình luận */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="bg-gray-900/50 rounded-xl p-4 shadow-md">
          <CommentSection movieId={movie._id} />
        </div>
      </div>

      {/* 🎬 Phim cùng thể loại */}
      <div className="max-w-6xl mx-auto px-4 mt-10 pb-16">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Phim cùng thể loại
        </h2>
        {relatedMovies.length === 0 ? (
          <p className="text-gray-400">Không có phim cùng thể loại.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {relatedMovies.map((m) => (
              <Link
                key={m._id}
                href={`/movie/${m._id}`}
                className="block bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition"
              >
                <img
                  src={m.posterUrl || m.thumbUrl || "/no-poster.png"}
                  alt={m.name}
                  className="w-full h-60 object-cover"
                />
                <div className="p-2 text-sm text-center text-white truncate">
                  {m.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
