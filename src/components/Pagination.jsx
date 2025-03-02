'use client';

import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  
  // Create an array of page numbers to display
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Limit the number of page buttons shown
  const getVisiblePageNumbers = () => {
    if (totalPages <= 7) return pageNumbers;
    
    if (currentPage <= 3) {
      return [...pageNumbers.slice(0, 5), '...', totalPages];
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', ...pageNumbers.slice(totalPages - 5)];
    }
    
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  };
  
  return (
    <div className="flex justify-center mt-8 mb-12">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? 'bg-white/5 text-white/40 cursor-not-allowed'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
          }`}
        >
          Previous
        </button>
        
        {getVisiblePageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              page === currentPage
                ? 'bg-gradient-to-r from-rose-400 to-indigo-400 text-white font-bold'
                : page === '...'
                ? 'bg-transparent text-white/60 cursor-default'
                : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? 'bg-white/5 text-white/40 cursor-not-allowed'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}