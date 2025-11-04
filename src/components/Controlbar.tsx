// "use client";
// import React, { useState } from "react";
// import { Maximize, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

// export default function ControlBar({
//   viewCount,
//   onNext,
//   onPrev,
//   hasNext,
//   hasPrev,
// }) {
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [volume, setVolume] = useState(1);
//   const [progress, setProgress] = useState(0.4);
//   const [speed, setSpeed] = useState("1");
//   const [resolution, setResolution] = useState("auto");
//   const [subtitle, setSubtitle] = useState("-1");

//   const togglePlay = () => setIsPlaying(!isPlaying);
//   const handleVolume = (e) => setVolume(parseFloat(e.target.value));
//   const handleProgress = (e) => setProgress(parseFloat(e.target.value));

//   return (
//     <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md text-white p-3 flex flex-col gap-2">
//       {/* Thanh tiến trình */}
//       <input
//         min="0"
//         max="100"
//         type="range"
//         value={progress * 100}
//         onChange={handleProgress}
//         className="w-full accent-purple-500"
//       />

//       <div className="flex justify-between items-center text-sm">
//         {/* Cụm nút trái */}
//         <div className="flex items-center gap-3">
//           {/* Play/Pause */}
//           <button
//             onClick={togglePlay}
//             className="hover:text-purple-400 transition"
//           >
//             <Play />
//           </button>

//           {/* Tập trước */}
//           <button
//             onClick={onPrev}
//             disabled={!hasPrev}
//             className={`hover:text-purple-400 transition ${
//               !hasPrev ? "opacity-40 cursor-not-allowed" : ""
//             }`}
//           >
//             <SkipBack />
//           </button>

//           {/* Tập kế */}
//           <button
//             onClick={onNext}
//             disabled={!hasNext}
//             className={`hover:text-purple-400 transition ${
//               !hasNext ? "opacity-40 cursor-not-allowed" : ""
//             }`}
//           >
//             <SkipForward />
//           </button>

//           <span className="text-gray-400 ml-3">
//             👁 {viewCount.toLocaleString()} lượt xem
//           </span>
//         </div>

//         {/* Cụm nút phải */}
//         <div className="flex items-center gap-3">
//           {/* Tốc độ phát */}
//           <select
//             value={speed}
//             onChange={(e) => setSpeed(e.target.value)}
//             className="bg-gray-700 rounded px-1 text-xs"
//           >
//             <option value="0.5">0.5x</option>
//             <option value="1">1x</option>
//             <option value="1.25">1.25x</option>
//             <option value="1.5">1.5x</option>
//             <option value="2">2x</option>
//           </select>

//           {/* Độ phân giải */}
//           <select
//             value={resolution}
//             onChange={(e) => setResolution(e.target.value)}
//             className="bg-gray-700 rounded px-1 text-xs"
//           >
//             <option value="auto">Auto</option>
//             <option value="480p">480p</option>
//             <option value="720p">720p</option>
//             <option value="1080p">1080p</option>
//           </select>

//           {/* Phụ đề */}
//           <select
//             value={subtitle}
//             onChange={(e) => setSubtitle(e.target.value)}
//             className="bg-gray-700 rounded px-1 text-xs"
//           >
//             <option value="-1">Tắt phụ đề</option>
//             <option value="vi">Tiếng Việt</option>
//             <option value="en">English</option>
//           </select>

//           {/* Âm lượng */}
//           <div className="flex items-center gap-2">
//             <Volume2 className="w-5 h-5" />
//             <input
//               min="0"
//               max="1"
//               step="0.05"
//               value={volume}
//               onChange={handleVolume}
//               className="w-20 accent-purple-400"
//               type="range"
//             />
//           </div>

//           {/* Fullscreen */}
//           <button className="hover:text-purple-400 transition">
//             <Maximize />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
