"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  X,
  Edit,
  Trash2,
  Search,
  PlusCircle,
  MinusCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Movie {
  _id: string;
  name: string;
  year?: number;
  type?: string;
}

interface Episode {
  _id?: string;
  movieId: string;
  serverName: string;
  isAI?: boolean;
  priority?: number;
  serverData: {
    name: string;
    slug?: string;
    filename?: string;
    linkEmbed?: string;
    linkM3u8?: string;
    duration?: string;
    releaseDate?: string;
  }[];
}

export default function EpisodesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [episodes, setEpisodes] = useState<Record<string, Episode[]>>({});
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [search, setSearch] = useState("");

  /** 🔹 Lấy danh sách phim */
  const fetchMovies = async () => {
    const res = await fetch(`${API_URL}/movies`);
    const data = await res.json();
    setMovies(data);
  };

  /** 🔹 Lấy tập phim theo movieId */
  const fetchEpisodes = async (movieId: string) => {
    const res = await fetch(`${API_URL}/episodes/movies/${movieId}`);
    const data = await res.json();
    setEpisodes((prev) => ({ ...prev, [movieId]: data }));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  /** 🔹 Tìm kiếm phim */
  const filteredMovies = movies.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  /** 🔹 Xóa tập phim */
  const handleDeleteEpisode = async (id?: string, movieId?: string) => {
    if (!id || !movieId) return;
    if (!confirm("Bạn có chắc muốn xóa tập này?")) return;
    await fetch(`${API_URL}/episodes/${id}`, { method: "DELETE" });
    fetchEpisodes(movieId);
  };

  /** 🔹 Lưu hoặc chỉnh sửa tập phim */
  /** 🔹 Lưu hoặc chỉnh sửa tập phim */
  const handleSaveEpisode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEpisode?.movieId || !selectedEpisode.serverName)
      return alert("⚠️ Vui lòng nhập đầy đủ thông tin!");

    try {
      let url = "";
      let method = "POST";

      // Nếu người dùng chọn "Dán JSON" → dùng add-single
      if (selectedEpisode.isAI) {
        url = `${API_URL}/episodes/add-single`;
      } else {
        // Nếu nhập thủ công
        if (selectedEpisode._id) {
          url = `${API_URL}/episodes/${selectedEpisode._id}`;
          method = "PUT";
        } else {
          url = `${API_URL}/episodes`;
        }
      }

      const payload = {
        movieId: selectedEpisode.movieId,
        serverName: selectedEpisode.serverName,
        isAI: !!selectedEpisode.isAI,
        priority: selectedEpisode.priority || 0,
        serverData: selectedEpisode.serverData.map((ep) => ({
          name: ep.name,
          slug: ep.slug || ep.name,
          filename: ep.filename,
          linkEmbed: ep.linkEmbed,
          linkM3u8: ep.linkM3u8,
          duration: ep.duration,
          releaseDate: ep.releaseDate,
        })),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Không thể lưu tập phim");
      }

      alert("✅ Lưu tập phim thành công!");
      await fetchEpisodes(selectedEpisode.movieId);
      setShowEpisodeModal(false);
      setSelectedEpisode(null);
    } catch (err) {
      console.error("❌ Lỗi khi lưu:", err);
      alert("❌ Đã có lỗi khi lưu tập phim!");
    }
  };

  /** 🔹 Thêm hoặc xóa tập trong serverData */
  const handleAddServerData = () => {
    setSelectedEpisode((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        serverData: [
          ...(prev.serverData || []),
          { name: "", slug: "", linkEmbed: "", linkM3u8: "" },
        ],
      };
    });
  };

  const handleRemoveServerData = (index: number) => {
    setSelectedEpisode((prev) => {
      if (!prev) return prev;
      const newData = [...prev.serverData];
      newData.splice(index, 1);
      return { ...prev, serverData: newData };
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎞️ Quản lý tập phim</h1>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Tìm phim..."
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 ring-blue-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
          <Search size={16} /> Tìm
        </button>
      </div>

      {/* Movie Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 text-sm">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-3 border border-gray-700 text-left">Tên phim</th>
              <th className="p-3 border border-gray-700 text-center">Loại</th>
              <th className="p-3 border border-gray-700 text-center">Năm</th>
              <th className="p-3 border border-gray-700 text-center">Số tập</th>
              <th className="p-3 border border-gray-700 text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => {
              const eps = episodes[movie._id]?.length || 0;
              return (
                <tr key={movie._id} className="hover:bg-gray-800/40">
                  <td className="p-3 border border-gray-700">{movie.name}</td>
                  <td className="p-3 border border-gray-700 text-center">
                    {movie.type || "-"}
                  </td>
                  <td className="p-3 border border-gray-700 text-center">
                    {movie.year || "-"}
                  </td>
                  <td className="p-3 border border-gray-700 text-center">
                    {eps > 0 ? `${eps} tập` : "Chưa có"}
                  </td>
                  <td className="p-3 border border-gray-700 text-center">
                    <button
                      onClick={() => {
                        setSelectedMovie(movie);
                        fetchEpisodes(movie._id);
                        setShowModal(true);
                      }}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Quản lý tập
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- Modal xem & quản lý tập --- */}
      {showModal && selectedMovie && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-gray-800 p-6 rounded-xl w-[800px] max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              🎬 {selectedMovie.name} — Danh sách tập
            </h2>

            <button
              onClick={() => {
                setSelectedEpisode({
                  movieId: selectedMovie._id,
                  serverName: "",
                  serverData: [],
                });
                setShowEpisodeModal(true);
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded mb-4"
            >
              <Plus size={16} /> Thêm tập mới
            </button>

            <table className="w-full border-collapse border border-gray-700 text-sm">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="p-2 border border-gray-700">Server</th>
                  <th className="p-2 border border-gray-700 text-center">
                    Số tập
                  </th>
                  <th className="p-2 border border-gray-700 text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {(episodes[selectedMovie._id] || []).map((ep) => (
                  <tr key={ep._id}>
                    <td className="p-2 border border-gray-700">
                      {ep.serverName}
                    </td>
                    <td className="p-2 border border-gray-700 text-center">
                      {ep.serverData?.length || 0}
                    </td>
                    <td className="p-2 border border-gray-700 text-center">
                      <button
                        onClick={() => {
                          setSelectedEpisode(ep);
                          setShowEpisodeModal(true);
                        }}
                        className="p-2 hover:bg-blue-600 rounded mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteEpisode(ep._id, selectedMovie._id)
                        }
                        className="p-2 hover:bg-red-600 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- Modal thêm/sửa tập --- */}
      {/* --- Modal thêm/sửa tập --- */}
      {showEpisodeModal && selectedEpisode && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-gray-800 p-6 rounded-xl w-[700px] max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowEpisodeModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold mb-4">
              {selectedEpisode._id
                ? "📝 Chỉnh sửa tập phim"
                : "🎬 Thêm tập mới"}
            </h2>

            <form onSubmit={handleSaveEpisode} className="flex flex-col gap-4">
              {/* --- Server Info --- */}
              <div>
                <label className="text-sm text-gray-300">Tên server</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-700 mt-1"
                  value={selectedEpisode.serverName}
                  onChange={(e) =>
                    setSelectedEpisode((p) => ({
                      ...p!,
                      serverName: e.target.value,
                    }))
                  }
                />
              </div>

              {/* --- Toggle nhập liệu --- */}
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  className={`px-4 py-2 rounded font-semibold ${
                    !selectedEpisode.isAI
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() =>
                    setSelectedEpisode((p) => ({
                      ...p!,
                      isAI: false, // thủ công
                    }))
                  }
                >
                  📝 Nhập thủ công
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded font-semibold ${
                    selectedEpisode.isAI
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() =>
                    setSelectedEpisode((p) => ({
                      ...p!,
                      isAI: true, // paste JSON
                    }))
                  }
                >
                  📄 Dán JSON
                </button>
              </div>

              {/* --- Nếu nhập thủ công --- */}
              {!selectedEpisode.isAI && (
                <div>
                  <label className="text-sm text-gray-300">Danh sách tập</label>
                  {selectedEpisode.serverData.map((s, i) => (
                    <div
                      key={i}
                      className="border border-gray-600 rounded p-3 mb-2 bg-gray-700"
                    >
                      <div className="flex justify-between mb-2">
                        <h4 className="text-sm text-gray-300 font-semibold">
                          Tập {i + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleRemoveServerData(i)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <MinusCircle size={18} />
                        </button>
                      </div>
                      <input
                        placeholder="Tên tập..."
                        className="w-full p-2 rounded bg-gray-800 mb-2"
                        value={s.name}
                        onChange={(e) =>
                          setSelectedEpisode((p) => {
                            if (!p) return p;
                            const newData = [...p.serverData];
                            newData[i].name = e.target.value;
                            return { ...p, serverData: newData };
                          })
                        }
                      />
                      <input
                        placeholder="Link M3U8"
                        className="w-full p-2 rounded bg-gray-800 mb-2"
                        value={s.linkM3u8 || ""}
                        onChange={(e) =>
                          setSelectedEpisode((p) => {
                            if (!p) return p;
                            const newData = [...p.serverData];
                            newData[i].linkM3u8 = e.target.value;
                            return { ...p, serverData: newData };
                          })
                        }
                      />
                      <input
                        placeholder="Link Embed"
                        className="w-full p-2 rounded bg-gray-800"
                        value={s.linkEmbed || ""}
                        onChange={(e) =>
                          setSelectedEpisode((p) => {
                            if (!p) return p;
                            const newData = [...p.serverData];
                            newData[i].linkEmbed = e.target.value;
                            return { ...p, serverData: newData };
                          })
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddServerData}
                    className="flex items-center gap-2 text-green-400 hover:text-green-500"
                  >
                    <PlusCircle size={18} /> Thêm tập
                  </button>
                </div>
              )}

              {/* --- Nếu dán JSON --- */}
              {selectedEpisode.isAI && (
                <div>
                  <label className="text-sm text-gray-300">
                    Dán JSON server_data tại đây:
                  </label>
                  <textarea
                    rows={8}
                    placeholder={`Ví dụ:
[
  {
    "name": "1",
    "slug": "1",
    "filename": "Tập 1",
    "link_embed": "https://...",
    "link_m3u8": "https://..."
  }
]`}
                    className="w-full p-3 rounded bg-gray-700 mt-1 font-mono text-sm"
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (Array.isArray(parsed)) {
                          setSelectedEpisode((p) => ({
                            ...p!,
                            serverData: parsed.map((d) => ({
                              name: d.name || "",
                              slug: d.slug || "",
                              filename: d.filename || "",
                              linkEmbed: d.link_embed || d.linkEmbed || "",
                              linkM3u8: d.link_m3u8 || d.linkM3u8 || "",
                            })),
                          }));
                        }
                      } catch (err) {
                        console.error("❌ JSON không hợp lệ:", err);
                      }
                    }}
                  />
                  <p className="text-gray-400 text-xs mt-2">
                    ⚠️ Dán JSON đúng định dạng — sai cú pháp sẽ bị bỏ qua.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold mt-3"
              >
                💾 Lưu tập phim
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
