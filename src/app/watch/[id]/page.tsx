"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Banner from "../../../components/Banner";
import Player from "../../../components/Player";
import EpisodeList from "../../../components/EpisodeList";
import MovieInfo from "../../../components/MovieInfo";
import CommentSection from "../../../components/CommentSection";
import CastList from "../../../components/CastList";
import RecommendList from "../../../components/RecommendList";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function WatchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const movieId = pathname.split("/").pop(); // Lấy movieId từ URL
  const epParam = searchParams.get("ep") || "1";

  const [movie, setMovie] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!movieId) return;

    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/episodes/movies/${movieId}`);
        const data = res.data;

        if (!data || data.length === 0) {
          setMovie(null);
          setEpisodes([]);
          return;
        }

        setMovie(data[0].movieId);
        setEpisodes(data[0].serverData);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu phim:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);
  useEffect(() => {
    if (episodes.length === 0) return;
    const epSelected =
      episodes.find((ep) => ep.slug === epParam) || episodes[0];
    setCurrentEpisode(epSelected);
  }, [epParam, episodes]);

  const handleEpisodeSelect = (ep: any) => {
    setCurrentEpisode(ep);
    // Cập nhật query param mà không remount page
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("ep", ep.slug);
    window.history.replaceState(
      null,
      "",
      `${pathname}?${searchParams.toString()}`
    );
  };

  const handleNextEpisode = () => {
    if (!episodes || !currentEpisode) return;
    const idx = episodes.findIndex((ep) => ep.slug === currentEpisode.slug);
    if (idx < episodes.length - 1) handleEpisodeSelect(episodes[idx + 1]);
  };

  const handlePrevEpisode = () => {
    if (!episodes || !currentEpisode) return;
    const idx = episodes.findIndex((ep) => ep.slug === currentEpisode.slug);
    if (idx > 0) handleEpisodeSelect(episodes[idx - 1]);
  };

  if (loading) return <div className="text-white p-4">Đang tải dữ liệu...</div>;
  if (!movie || !currentEpisode)
    return <div className="text-white p-4">Không tìm thấy phim hoặc tập</div>;

  const isSeries = movie.type === "series" || movie.type === "phimbo";

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Banner movie={movie} />

      <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-8">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <h2 className="text-lg md:text-xl font-semibold truncate">
            {isSeries
              ? `Xem tập ${currentEpisode.name} - ${movie.name}`
              : `Xem phim ${movie.name}`}
          </h2>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <Player linkEmbed={currentEpisode.linkM3u8} />
          </div>
        </div>

        {isSeries && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevEpisode}
              disabled={
                episodes.findIndex((ep) => ep.slug === currentEpisode.slug) ===
                0
              }
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-40 cursor-pointer"
            >
              Tập trước
            </button>
            <button
              onClick={handleNextEpisode}
              disabled={
                episodes.findIndex((ep) => ep.slug === currentEpisode.slug) ===
                episodes.length - 1
              }
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-40 cursor-pointer"
            >
              Tập kế tiếp
            </button>
          </div>
        )}

        {isSeries && (
          <div className="bg-gray-900/50 rounded-xl p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-2">
              Danh sách tập
            </h3>
            <EpisodeList
              episodes={episodes}
              currentEpisode={currentEpisode}
              onSelect={handleEpisodeSelect}
            />
          </div>
        )}

        <div className="bg-gray-900/50 rounded-xl p-4 shadow-md">
          <MovieInfo
            movie={movie}
            categories={movie.categories || []}
            countries={movie.countries || []}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-[60%] w-full bg-gray-900/50 rounded-xl p-4 shadow-md">
            <CommentSection movieId={movie._id || []} />
          </div>
          <div className="lg:w-[40%] w-full space-y-6">
            <CastList cast={movie.cast || []} />
            <RecommendList movies={movie.recommendations || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
