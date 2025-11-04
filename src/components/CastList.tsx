"use client";
import React from "react";

export default function CastList({ cast }: { cast: any[] }) {
  return (
    <div className="bg-gray-900/50 rounded-xl p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
        Diễn viên
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {cast.map((actor, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center space-y-2"
          >
            <img
              src={actor.image}
              alt={actor.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-700 hover:scale-105 transition-transform"
            />
            <p className="text-sm font-medium truncate w-full">{actor.name}</p>
            {actor.role && (
              <p className="text-xs text-gray-400 truncate">{actor.role}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
