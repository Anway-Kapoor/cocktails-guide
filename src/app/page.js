'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CocktailGrid from "@/components/CocktailGrid";
import SearchBar from "@/components/SearchBar";
import AlphabetPagination from "@/components/AlphabetPagination";
import Pagination from "@/components/Pagination";
import { searchCocktails, getCocktailsByLetter } from "@/services/cocktailService";


function HomeContent() {
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get('search');
  
  // Remove isNavigatingBack state and related useEffect
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('a');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const ITEMS_PER_PAGE = 12;
  
  // Calculate total pages based on cocktails array length
  const totalPages = Math.ceil(cocktails.length / ITEMS_PER_PAGE);
  
  // Get current page cocktails
  const getCurrentPageCocktails = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return cocktails.slice(startIndex, endIndex);
  };
  
  
  // Handle letter selection
  const handleLetterSelect = (letter) => {
    // Update the current letter immediately for visual feedback
    setCurrentLetter(letter);
    // Then load the cocktails
    loadCocktailsByLetter(letter);
  };
  
  // Load cocktails by letter
  const loadCocktailsByLetter = async (letter) => {
    setLoading(true);
    try {
      const results = await getCocktailsByLetter(letter);
      setCocktails(results || []);
      setCurrentPage(1);
      setIsSearchMode(false);
      setSearchQuery('');
    } catch (error) {
      console.error("Error loading cocktails by letter:", error);
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle search
  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setSearchQuery(query);
    try {
      const results = await searchCocktails(query);
      setCocktails(results || []);
      setCurrentPage(1);
      setIsSearchMode(true);
      // Store the search query in localStorage
      localStorage.setItem('lastSearch', query);
    } catch (error) {
      console.error("Error searching cocktails:", error);
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial load and URL search parameter handling
  useEffect(() => {
    const handleInitialLoad = async () => {
      const currentSearchQuery = searchParams.get('search');
      const letterParam = searchParams.get('letter');
      
      setLoading(true);
      
      try {
        if (currentSearchQuery) {
          setIsSearchMode(true);
          setSearchQuery(currentSearchQuery);
          
          const results = await searchCocktails(currentSearchQuery);
          setCocktails(results || []);
          setCurrentPage(1);
          localStorage.setItem('lastSearch', currentSearchQuery);
        } else if (letterParam) {
          setCurrentLetter(letterParam);
          const results = await getCocktailsByLetter(letterParam);
          setCocktails(results || []);
          setCurrentPage(1);
          setIsSearchMode(false);
          setSearchQuery('');
        } else {
          const results = await getCocktailsByLetter(currentLetter);
          setCocktails(results || []);
          setIsSearchMode(false);
          setSearchQuery('');
        }
      } catch (error) {
        setCocktails([]);
      } finally {
        setLoading(false);
      }
    };
    
    handleInitialLoad();
  }, [searchParams]);
  
  // Improve mobile layout with better spacing and responsive elements
  return (
    <div className="min-h-screen w-full bg-[#0F172A] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] px-3 sm:px-4 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400 text-center mb-6 md:mb-12 leading-tight">
          Cocktail Hive
        </h1>
        
        <div className="mb-6 sm:mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {!isSearchMode && (
          <AlphabetPagination 
            currentLetter={currentLetter} 
            onLetterSelect={handleLetterSelect} 
          />
        )}
        
        {isSearchMode && (
          <div className="mb-6 sm:mb-8 text-center">
            <p className="text-white/80 text-sm sm:text-base">
              Showing results for &ldquo;{searchQuery}&rdquo;
              <button 
                onClick={() => loadCocktailsByLetter(currentLetter)}
                className="ml-2 sm:ml-4 px-2 sm:px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs sm:text-sm"
              >
                Back to Browse
              </button>
            </p>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-12 sm:py-20">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-rose-400"></div>
          </div>
        ) : cocktails && cocktails.length > 0 ? (
          <>
            <CocktailGrid 
              cocktails={getCurrentPageCocktails()} 
              searchQuery={isSearchMode ? searchQuery : ""}
            />
            
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            )}
          </>
        ) : (
          <div className="text-center py-12 sm:py-20">
            {isSearchMode && (
              <>
                <p className="text-white/80 text-lg mb-4">No cocktails found</p>
                <button 
                  onClick={() => loadCocktailsByLetter(currentLetter)}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
                >
                  Back to Browse
                </button>
              </>
            )}
          </div>
        )}
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

// Main component with Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-400"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}