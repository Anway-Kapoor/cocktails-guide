'use client';

import { useState } from 'react';
import CocktailGrid from "@/components/CocktailGrid";
import SearchBar from "@/components/SearchBar";
import { searchCocktails } from "@/services/cocktailService";

export default function Home() {
  const [cocktails, setCocktails] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchCocktails(query);
    setCocktails(results);
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] px-4 py-12">
      <h2 className="text-xl text-center">In development. More features coming soon!</h2>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400 text-center mb-12 leading-tight">
          The Tipsy Guide
        </h1>
        
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        <CocktailGrid cocktails={cocktails} />
      </div>

      <style jsx>{`
        .glass-panel {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 1.5rem 2rem;
        }
      `}</style>
    </div>
  );
}