"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import { Thumbs, Autoplay } from "swiper/modules";
import { Play, Heart, Info } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const TopSlide = ({ autoPlay = false }: { autoPlay?: boolean }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${API_URL}/movies/featured`);
        setMovies(res.data);
      } catch (error) {
        console.error("❌ Lỗi khi tải phim nổi bật:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-10 h-10 border-4 border-t-transparent border-red-600 rounded-full animate-spin" />
      </div>
    );

  if (!movies.length)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400">
        Không có phim nổi bật nào
      </div>
    );

  return (
    <div id="top_slide" className="relative w-full overflow-hidden">
      {/* Swiper chính */}
      <Swiper
        modules={[Thumbs, Autoplay]}
        onSwiper={setMainSwiper}
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full h-[70vh]"
        loop={false}
        allowTouchMove={!autoPlay}
        autoplay={
          autoPlay ? { delay: 5000, disableOnInteraction: false } : false
        }
      >
        {movies.map((m, i) => (
          <SwiperSlide key={m._id}>
            <div className="relative w-full h-full">
              {/* Ảnh nền */}
              <div
                className="absolute inset-0 bg-cover bg-center brightness-75 transition-all duration-700"
                style={{ backgroundImage: `url(${m.posterUrl || m.thumbUrl})` }}
              ></div>

              {/* Nội dung */}
              <div className="relative z-20 flex flex-col justify-center items-start px-8 sm:px-16 md:px-24 lg:px-32 h-full text-white">
                <div className="max-w-lg">
                  <h2 className="text-3xl font-bold mb-1">{m.name}</h2>
                  {m.englishName && (
                    <h3 className="text-lg italic text-gray-300 mb-3">
                      {m.englishName}
                    </h3>
                  )}

                  <div className="flex gap-2 mb-4 text-sm flex-wrap">
                    {m.imdb && (
                      <span className="bg-yellow-500 text-black px-2 py-1 rounded">
                        IMDb {m.imdb?.rating ?? "N/A"}
                      </span>
                    )}
                    {m.age && (
                      <span className="bg-gray-700 px-2 py-1 rounded">
                        {m.age}
                      </span>
                    )}
                    {m.year && (
                      <span className="bg-gray-700 px-2 py-1 rounded">
                        {m.year}
                      </span>
                    )}
                    {m.duration && (
                      <span className="bg-gray-700 px-2 py-1 rounded">
                        {m.duration}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-200 mb-6 line-clamp-3">
                    {m.description}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <Link
                      href={`/watch/${m._id}`}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full"
                    >
                      <Play size={18} /> Xem phim
                    </Link>
                    <button className="text-white hover:text-red-400">
                      <Heart size={20} />
                    </button>
                    <button className="text-white hover:text-red-400">
                      <Info size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Thumbnail */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={"auto"}
          spaceBetween={12}
          watchSlidesProgress
          modules={[Thumbs]}
          className="w-full max-w-[420px] h-[70px] cursor-pointer !overflow-visible"
        >
          {movies.map((m, i) => (
            <SwiperSlide
              key={m._id}
              className="!w-[100px] !h-[60px] flex-shrink-0"
              onClick={() => mainSwiper?.slideTo(i)}
            >
              <div className="w-full h-full rounded-lg overflow-hidden ring-2 ring-transparent hover:ring-red-500 transition-all duration-300 hover:scale-105">
                <img
                  src={m.thumbUrl || m.posterUrl}
                  alt={m.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
