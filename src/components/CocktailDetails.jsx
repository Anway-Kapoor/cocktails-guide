"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function CocktailDetails({ cocktail }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const fromSearch = searchParams.get('from') === 'search';
  const searchQuery = searchParams.get('q') || '';
  
  // Store search state in localStorage when component mounts
  useEffect(() => {
    if (fromSearch && searchQuery) {
      localStorage.setItem('lastSearch', searchQuery);
    }
  }, [fromSearch, searchQuery]);
  
  const handleGoBack = () => {
    // Try to use browser's back functionality first
    if (window.history.length > 1) {
      router.back();
    } else {
      // If no history, check if we have a search query to return to
      const lastSearch = localStorage.getItem('lastSearch');
      if (fromSearch && searchQuery) {
        router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      } else if (lastSearch) {
        router.push(`/?search=${encodeURIComponent(lastSearch)}`);
      } else {
        // Default fallback to home
        router.push('/');
      }
    }
  };

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
    <div className="min-h-screen w-full bg-[#0F172A] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] px-3 sm:px-4 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="mb-4 sm:mb-8 px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-all duration-300 text-sm sm:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {fromSearch ? `Back to "${searchQuery}" results` : "Back"}
        </button>
        
        {/* Rest of your component remains the same */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-24">
          {/* Media Section */}
          <div className="relative group space-y-4 sm:space-y-8">
            {/* Image Container with Floating Video */}
            <div className="relative aspect-square rounded-xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white/5 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105"
              />
              {/* Video Overlay - Adjusted for mobile */}
              {videoId && (
                <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-[60%] sm:w-[45%] rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5 border border-white/10 transform transition-transform hover:scale-95">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title={`How to make ${cocktail.strDrink}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              )}
            </div>
            {/* Floating Glassmorphism Badges - Better mobile layout */}
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start">
              {cocktail.strCategory && (
                <div className="glass-badge">
                  <span className="text-xs text-rose-500">Category</span>
                  <span className="text-white font-medium text-sm sm:text-base">
                    {cocktail.strCategory}
                  </span>
                </div>
              )}
              {cocktail.strGlass && (
                <div className="glass-badge">
                  <span className="text-xs text-cyan-400">Glass</span>
                  <span className="text-white font-medium text-sm sm:text-base">
                    {cocktail.strGlass}
                  </span>
                </div>
              )}
              {cocktail.strAlcoholic && (
                <div className="glass-badge">
                  <span className="text-xs text-rose-400">Type</span>
                  <span className="text-white font-medium text-sm sm:text-base">
                    {cocktail.strAlcoholic}
                  </span>
                </div>
              )}
              {cocktail.strIBA && (
                <div className="glass-badge">
                  <span className="text-xs text-cyan-400">IBA</span>
                  <span className="text-white font-medium text-sm sm:text-base">
                    {cocktail.strIBA}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Details Section */}
          <div className="flex flex-col space-y-6 sm:space-y-10 py-4 sm:py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400 leading-tight pb-2">
              {cocktail.strDrink}
            </h1>
            <div className="space-y-6 sm:space-y-8">
              {/* Instructions */}
              <div className="glass-panel">
                <h3 className="section-title">
                  <span className="gradient-block bg-gradient-to-r from-rose-400 to-indigo-400" />
                  Crafting Instructions
                </h3>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
                  {cocktail.strInstructions}
                </p>
              </div>
              {/* Ingredients */}
              <div className="glass-panel">
                <h3 className="section-title">
                  <span className="gradient-block bg-gradient-to-r from-rose-400 to-indigo-400" />
                  Mix Components
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                  {cocktail.ingredients?.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 sm:space-x-3 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm sm:text-base"
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-400 rounded-full flex-shrink-0" />
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
          padding: 0.5rem 0.75rem;
          border-radius: 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 80px;
        }
        @media (min-width: 640px) {
          .glass-badge {
            padding: 0.75rem 1.25rem;
            border-radius: 1rem;
            min-width: 100px;
          }
        }
        .glass-panel {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1rem 1.25rem;
        }
        @media (min-width: 640px) {
          .glass-panel {
            border-radius: 1.5rem;
            padding: 1.5rem 2rem;
          }
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
        }
        @media (min-width: 640px) {
          .section-title {
            gap: 1rem;
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
          }
        }
        @media (min-width: 768px) {
          .section-title {
            font-size: 1.5rem;
          }
        }
        .gradient-block {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 0.375rem;
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .gradient-block {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
