'use client';

import React from 'react';

export default function AlphabetPagination({ currentLetter, onLetterSelect }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-wrap justify-center gap-1 md:gap-2">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => onLetterSelect(letter.toLowerCase())}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentLetter === letter.toLowerCase()
                ? 'bg-gradient-to-r from-rose-400 to-indigo-400 text-white font-bold'
                : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}