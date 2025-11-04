"use client";
import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  RotateCcw,
  RotateCw,
} from "lucide-react";

export default function ModernPlayer({ linkEmbed }: { linkEmbed: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ⏰ Format thời gian (hh:mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`;
  };

  // ⚙️ Khởi tạo HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 5,
        maxBufferLength: 15,
        maxMaxBufferLength: 30,
        liveSyncDuration: 2,
        liveMaxLatencyDuration: 4,
        maxFragLookUpTolerance: 0.5,
      });
      hlsRef.current = hls;
      hls.attachMedia(video);

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleProgress = () => {
        if (!video.duration) return;
        const end = video.buffered.length
          ? video.buffered.end(video.buffered.length - 1)
          : 0;
        setBuffered((end / video.duration) * 100);
      };
      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
        setDuration(video.duration || 0);
        setProgress((video.currentTime / video.duration) * 100);
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("progress", handleProgress);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("progress", handleProgress);
        video.removeEventListener("timeupdate", handleTimeUpdate);
        hls.destroy();
      };
    }
  }, []);

  // 🔁 Load video mới
  useEffect(() => {
    if (!linkEmbed) return;
    const video = videoRef.current;
    if (!video) return;

    const cleanSrc = linkEmbed.trim();
    video.pause();

    if (Hls.isSupported()) {
      let hls = hlsRef.current;
      if (!hls) {
        hls = new Hls();
        hlsRef.current = hls;
        hls.attachMedia(video);
      }
      hls.loadSource(cleanSrc);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = cleanSrc;
      video.play().catch(() => {});
    }
  }, [linkEmbed]);

  // 👆 Nhận diện di chuyển chuột
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setShowControls(false), 2500);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
    }
    setVolume(newVol);
    setIsMuted(newVol === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const newTime = (Number(e.target.value) / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  const skipTime = (sec: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(
      Math.max(video.currentTime + sec, 0),
      video.duration
    );
  };

  const toggleFullScreen = () => {
    const player = videoRef.current?.parentElement;
    if (!player) return;
    if (!document.fullscreenElement) {
      player.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // ⌨️ Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "j":
          skipTime(-10);
          break;
        case "l":
          skipTime(10);
          break;
        case "m":
          toggleMute();
          break;
        case "f":
          toggleFullScreen();
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className={`relative w-full aspect-video bg-black rounded-xl overflow-hidden ${
        showControls ? "cursor-auto" : "cursor-none"
      }`}
      onMouseMove={handleMouseMove}
    >
      <video ref={videoRef} className="w-full h-full" autoPlay playsInline />

      {/* overlay click */}
      <div
        className="absolute inset-0"
        onClick={togglePlay}
        onDoubleClick={toggleFullScreen}
      />

      {/* controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white p-3 flex flex-col gap-2 transition-opacity duration-300 ${
          showControls ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* progress bar */}
        <div className="relative w-full h-1.5 bg-gray-700 rounded overflow-hidden mb-1">
          <div
            className="absolute top-0 left-0 h-full bg-gray-500/40"
            style={{ width: `${buffered}%` }}
          />
          <div
            className="absolute top-0 left-0 h-full bg-purple-500"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* buttons */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={() => skipTime(-10)}>
              <RotateCcw size={20} />
            </button>
            <button onClick={() => skipTime(10)}>
              <RotateCw size={20} />
            </button>
            <button onClick={toggleMute}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-purple-400"
            />

            {/* ⏱️ Hiển thị thời gian */}
            <div className="text-gray-300 text-xs select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            <button onClick={() => setShowSettings((s) => !s)}>
              <Settings size={20} />
            </button>
            {showSettings && (
              <div className="absolute bottom-9 right-0 bg-black/90 border border-gray-700 rounded-lg p-3 text-white w-48 space-y-3 shadow-lg">
                <p className="text-gray-400 text-sm">Không có tùy chọn</p>
              </div>
            )}
            <button onClick={toggleFullScreen}>
              {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
