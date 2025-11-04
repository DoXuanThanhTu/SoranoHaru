"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Plus, X, Search } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Movie {
  _id?: string;
  slug: string;
  name: string;
  originName?: string;
  alternativeNames?: string[];
  description?: string;
  content?: string;
  type: string;
  status?: string;
  year?: number;
  duration?: string;
  quality?: string;
  language?: string;
  viewCount?: number;
  thumbUrl?: string;
  posterUrl?: string;
  trailerUrl?: string;
  categoryIds: string[]; // có thể là ID hoặc slug/category name tuỳ API
  countryIds: string[];
  actor?: string[];
  director?: string[];
  tmdb?: Record<string, any>;
  imdb?: Record<string, any>;
  episodeCount?: number;
  latestEpisode?: string;
  seo?: Record<string, any>;
  breadcrumbs?: Record<string, any>[];

  // 🔽 Các trường thêm mới theo schema
  featured?: boolean; // phim đề cử
  isFavorite?: boolean; // được yêu thích
  viewsToday?: number; // lượt xem trong ngày
  viewsMonth?: number; // lượt xem trong tháng

  // timestamps (nếu API trả về)
  createdAt?: string;
  updatedAt?: string;
}

interface Option {
  _id: string;
  name: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [categories, setCategories] = useState<Option[]>([]);
  const [countries, setCountries] = useState<Option[]>([]);

  /** 🔹 Fetch danh sách phim */
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/movies`);
      const data = await res.json();
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Fetch danh mục & quốc gia */
  const fetchFilters = async () => {
    try {
      const [catRes, countryRes] = await Promise.all([
        fetch(`${API_URL}/categories`),
        fetch(`${API_URL}/categories`),
      ]);
      setCategories(await catRes.json());
      setCountries(await countryRes.json());
    } catch (err) {
      console.error("Error fetching filters:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchFilters();
  }, []);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // ❌ chặn cuộn body
    } else {
      document.body.style.overflow = "auto"; // ✅ bật lại khi đóng
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);
  /** 🔹 Lọc phim khi ấn nút tìm */
  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredMovies(movies);
      return;
    }
    const lower = search.toLowerCase();
    setFilteredMovies(
      movies.filter((m) => m.name?.toLowerCase().includes(lower))
    );
  };

  /** 🔹 Xóa phim */
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Bạn có chắc chắn muốn xóa phim này?")) return;

    try {
      const res = await fetch(`${API_URL}/movies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Xóa thất bại");
      setMovies((prev) => prev.filter((m) => m._id !== id));
      setFilteredMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa phim!");
    }
  };

  /** 🔹 Lưu phim mới hoặc chỉnh sửa */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovie?.name || !selectedMovie?.slug)
      return alert("Vui lòng nhập đầy đủ thông tin");

    const method = selectedMovie._id ? "PUT" : "POST";
    const url = selectedMovie._id
      ? `${API_URL}/movies/${selectedMovie._id}`
      : `${API_URL}/movies`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedMovie),
      });
      if (!res.ok) throw new Error("Lưu thất bại");
      setShowModal(false);
      setSelectedMovie(null);
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu phim!");
    }
  };

  /** 🔹 Chọn nhiều thể loại hoặc quốc gia */
  const toggleArrayValue = (
    field: "categoryIds" | "countryIds",
    id: string
  ) => {
    setSelectedMovie((prev) => {
      if (!prev) return prev;
      const current = prev[field] || [];
      const exists = current.includes(id);
      const updated = exists
        ? current.filter((c) => c !== id)
        : [...current, id];
      return { ...prev, [field]: updated };
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🎬 Quản lý phim
        </h1>
        <button
          onClick={() => {
            setSelectedMovie({
              slug: "",
              name: "",
              originName: "",
              type: "",
              year: 2025,
              categoryIds: [],
              countryIds: [],
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Thêm phim
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Nhập tên phim..."
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 ring-blue-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Search size={16} /> Tìm kiếm
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-10 text-gray-400">Đang tải...</div>
      ) : filteredMovies.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-sm">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="p-3 border border-gray-700 text-left">Poster</th>
                <th className="p-3 border border-gray-700 text-left">
                  Tên phim
                </th>
                <th className="p-3 border border-gray-700 text-center">Slug</th>
                <th className="p-3 border border-gray-700 text-center">Loại</th>
                <th className="p-3 border border-gray-700 text-center">Năm</th>
                <th className="p-3 border border-gray-700 text-center w-32">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie._id} className="hover:bg-gray-800/50">
                  <td className="p-3 border border-gray-700">
                    {movie.posterUrl ? (
                      <img
                        src={movie.posterUrl}
                        alt={movie.name}
                        className="w-14 h-20 object-cover rounded"
                      />
                    ) : (
                      <div className="w-14 h-20 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs">
                        No Img
                      </div>
                    )}
                  </td>
                  <td className="p-3 border border-gray-700">{movie.name}</td>
                  <td className="p-3 border border-gray-700 text-center">
                    {movie.slug}
                  </td>
                  <td className="p-3 border border-gray-700 text-center">
                    {movie.type || "-"}
                  </td>
                  <td className="p-3 border border-gray-700 text-center">
                    {movie.year || "-"}
                  </td>
                  <td className="p-3 border border-gray-700 text-center">
                    <button
                      onClick={() => {
                        setSelectedMovie(movie);
                        setShowModal(true);
                      }}
                      className="p-2 hover:bg-blue-600 rounded mr-2"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id)}
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
      ) : (
        <div className="text-center py-10 text-gray-400">Không có phim nào</div>
      )}

      {/* Modal thêm/sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-gray-800 p-6 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {selectedMovie?._id ? "📝 Chỉnh sửa phim" : "🎬 Thêm phim mới"}
            </h2>

            <form onSubmit={handleSave} className="flex flex-col gap-5">
              {/* --- Thông tin cơ bản --- */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                  🧱 Thông tin cơ bản
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-300">Tên phim</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.name || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Slug</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.slug || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          slug: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Tên gốc</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.originName || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          originName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Loại</label>
                    <select
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.type || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          type: e.target.value,
                        }))
                      }
                    >
                      <option value="">-- Chọn loại --</option>
                      <option value="movie">Phim lẻ</option>
                      <option value="series">Phim bộ</option>
                      <option value="tvshow">TV Show</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Trạng thái</label>
                    <input
                      type="text"
                      placeholder="VD: Đang chiếu / Hoàn thành"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.status || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          status: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Năm</label>
                    <input
                      type="number"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.year || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          year: +e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* --- Thể loại & Quốc gia --- */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                  🌍 Thể loại & Quốc gia
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-300">Thể loại</label>
                    <div className="bg-gray-700 rounded p-2 max-h-32 overflow-y-auto">
                      {categories.map((cat) => (
                        <label
                          key={cat._id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedMovie?.categoryIds?.includes(cat._id) ||
                              false
                            }
                            onChange={() =>
                              toggleArrayValue("categoryIds", cat._id)
                            }
                          />
                          {cat.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Quốc gia</label>
                    <div className="bg-gray-700 rounded p-2 max-h-32 overflow-y-auto">
                      {countries.map((country) => (
                        <label
                          key={country._id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedMovie?.countryIds?.includes(
                                country._id
                              ) || false
                            }
                            onChange={() =>
                              toggleArrayValue("countryIds", country._id)
                            }
                          />
                          {country.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Thông tin mở rộng --- */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                  ⚙️ Thông tin mở rộng
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-300">Thời lượng</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.duration || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          duration: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Chất lượng</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.quality || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          quality: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Ngôn ngữ</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.language || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          language: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">
                      Tập mới nhất
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.latestEpisode || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          latestEpisode: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* --- Hình ảnh --- */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                  🖼️ Hình ảnh & Trailer
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-300">Poster URL</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.posterUrl || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          posterUrl: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Thumb URL</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.thumbUrl || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          thumbUrl: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm text-gray-300">Trailer URL</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-gray-700 mt-1"
                      value={selectedMovie?.trailerUrl || ""}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          trailerUrl: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* --- Hiển thị --- */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                  🌟 Hiển thị
                </h3>
                <div className="flex items-center gap-6 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedMovie?.featured || false}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          featured: e.target.checked,
                        }))
                      }
                    />
                    <span>Phim nổi bật</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedMovie?.isFavorite || false}
                      onChange={(e) =>
                        setSelectedMovie((p) => ({
                          ...p!,
                          isFavorite: e.target.checked,
                        }))
                      }
                    />
                    <span>Yêu thích</span>
                  </label>
                </div>
              </div>

              {/* --- Mô tả --- */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                  📝 Mô tả
                </h3>
                <textarea
                  rows={4}
                  className="w-full p-2 rounded bg-gray-700"
                  value={selectedMovie?.description || ""}
                  onChange={(e) =>
                    setSelectedMovie((p) => ({
                      ...p!,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold mt-3"
              >
                💾 Lưu phim
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
