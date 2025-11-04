"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // hoặc useParams nếu React Router
import axios from "axios";

interface EpisodeData {
  _id: string;
  movieId: any;
  serverName: string;
  serverData: {
    name: string;
    slug?: string;
    filename?: string;
    linkEmbed?: string;
    linkM3u8?: string;
  }[];
}

const MovieDetailPage: React.FC = () => {
  const params = useParams();
  const movieId = params.id;
  const [episodes, setEpisodes] = useState<EpisodeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/episodes/movie/${movieId}`
        );
        setEpisodes(res.data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [movieId]);

  if (loading) return <p>Loading episodes...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Episodes</h1>
      {episodes.map((server) => (
        <div key={server._id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{server.serverName}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {server.serverData.map((ep) => (
              <div key={ep.slug} className="p-2 border rounded">
                <p className="font-medium">{ep.name}</p>
                <a
                  href={ep.linkEmbed || ep.linkM3u8}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline text-sm"
                >
                  Watch
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieDetailPage;
