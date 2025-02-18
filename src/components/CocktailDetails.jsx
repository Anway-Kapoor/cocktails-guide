"use client";

import React from "react";

export default function CocktailDetails({ cocktail }) {
  if (!cocktail) {
    return (
      <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center">
        <div className="text-center p-6 text-white">Loading...</div>
      </div>
    );
  }

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:.*[?&]v=|embed\/|v\/)|youtu\.be\/)([^&?\s]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(cocktail.strVideo);

  return (
    <div className="min-h-screen w-full bg-[#0F172A] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Media Section */}
          <div className="relative group space-y-8">
            {/* Image Container with Floating Video */}
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/5 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105"
              />

              {/* Video Overlay */}
              {videoId && (
                <div className="absolute bottom-8 right-8 w-[45%] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5 border border-white/10 transform transition-transform hover:scale-95">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`How to make ${cocktail.strDrink}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              )}
            </div>

            {/* Floating Glassmorphism Badges */}
            <div className="flex space-x-6 justify-center lg:justify-start">
              <div className="glass-badge">
                <span className="text-xs text-rose-400">Category</span>
                <span className="text-white font-medium">
                  {cocktail.strCategory}
                </span>
              </div>
              <div className="glass-badge">
                <span className="text-xs text-cyan-400">Glass</span>
                <span className="text-white font-medium">
                  {cocktail.strGlass}
                </span>
              </div>
              <div className="glass-badge">
                <span className="text-xs text-rose-400">Alcoholic or not</span>
                <span className="text-white font-medium">
                  {cocktail.strAlcoholic}
                </span>
              </div>
              <div className="glass-badge">
                <span className="text-xs text-cyan-400">IBA</span>
                <span className="text-white font-medium">
                  {cocktail.strIBA}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col space-y-10 py-8">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400 leading-tight pb-2">
              {cocktail.strDrink}
            </h1>

            <div className="space-y-8">
              {/* Instructions */}
              <div className="glass-panel">
                <h3 className="section-title">
                  <span className="gradient-block bg-gradient-to-r from-purple-500 to-pink-500" />
                  Crafting Instructions
                </h3>
                <p className="text-lg text-white/80 leading-relaxed font-light">
                  {cocktail.strInstructions}
                </p>
              </div>

              {/* Ingredients */}
              <div className="glass-panel">
                <h3 className="section-title">
                  <span className="gradient-block bg-gradient-to-r from-blue-500 to-cyan-500" />
                  Mix Components
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cocktail.ingredients?.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3 py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                      <span className="text-white/90 font-medium">
                        {ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-badge {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1.25rem;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .glass-panel {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 1.5rem 2rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.5rem;
        }

        .gradient-block {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 0.5rem;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
