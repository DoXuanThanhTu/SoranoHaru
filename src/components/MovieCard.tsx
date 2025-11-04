import React, { useState } from "react";

interface Movie {
  _id: string;
  slug: string;
  name: string;
  thumbUrl?: string;
  posterUrl?: string;
  type: string;
  description?: string;
}

interface MovieCardProps {
  movie: Movie;
  onClick: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => onClick(movie._id)}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      {/* Ảnh phim */}
      <img
        src={movie.thumbUrl || movie.posterUrl}
        alt={movie.name}
        className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
      />
      <h2 className="mt-2 font-semibold text-lg text-center">{movie.name}</h2>

      {/* Popup */}
      {showPopup && (
        <div
          className="
            absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[115%] h-[120%]
            bg-zinc-900 text-white rounded-xl shadow-2xl
            transition-all duration-200 ease-out
            z-30 overflow-hidden
          "
        >
          <img
            src={movie.posterUrl || movie.thumbUrl}
            alt={movie.name}
            className="w-full h-3/5 object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold text-base mb-1">{movie.name}</h3>
            <p className="text-xs text-gray-300 line-clamp-2">
              {movie.description || "Không có mô tả"}
            </p>
            <div className="text-xs text-gray-400 mt-2 flex justify-between">
              <span>{movie.type}</span>
              <span>IMDb 6.9</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
