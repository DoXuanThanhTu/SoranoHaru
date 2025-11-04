"use client";

interface Episode {
  slug: string;
  name: string;
  [key: string]: any; // nếu có thêm dữ liệu khác
}

interface EpisodeListProps {
  episodes: Episode[];
  currentEpisode: Episode;
  onSelect: (episode: Episode) => void;
}

export default function EpisodeList({
  episodes,
  currentEpisode,
  onSelect,
}: EpisodeListProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4 px-4">
      {episodes.map((ep) => (
        <button
          key={ep.slug}
          onClick={() => onSelect(ep)}
          className={`px-3 py-2 cursor-pointer rounded-md transition-colors ${
            currentEpisode.slug === ep.slug
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
          }`}
        >
          {ep.name}
        </button>
      ))}
    </div>
  );
}
