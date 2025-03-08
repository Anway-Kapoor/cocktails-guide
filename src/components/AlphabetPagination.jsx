'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AlphabetPagination({ currentLetter, onLetterSelect }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Handle letter selection with URL update
  const handleLetterClick = (letter) => {
    // Update URL with the selected letter
    const params = new URLSearchParams(searchParams.toString());
    params.set('letter', letter);
    
    // Update URL without refreshing the page
    router.push(`/?${params.toString()}`, { scroll: false });
    
    // Call the parent component's handler
    onLetterSelect(letter);
  };
  
  return (
    <div className="mb-5 md:mb-8 overflow-x-auto pb-2">
      <div className="flex flex-wrap justify-center gap-1 md:gap-2 min-w-max mx-auto">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter.toLowerCase())}
            className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 text-xs md:text-base ${
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