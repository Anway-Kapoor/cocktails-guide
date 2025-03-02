'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="max-w-xl mx-auto flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for cocktails..."
          className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400/50 text-white placeholder-white/50 backdrop-blur-sm"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-rose-400 to-indigo-400 text-white rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-rose-400/50 transition-all duration-300 font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
}
