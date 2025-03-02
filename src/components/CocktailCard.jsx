import React from "react";
import Link from "next/link";

export default function CocktailCard({ cocktail, searchQuery = "" }) {
  // Ensure the ID is valid
  const cocktailId = cocktail?.idDrink ? String(cocktail.idDrink).trim() : '';
  
  // Create URL with search query parameter if it exists
  const detailsUrl = searchQuery 
    ? `/cocktails/${cocktailId}?from=search&q=${encodeURIComponent(searchQuery)}`
    : `/cocktails/${cocktailId}`;
  
  return (
    <div className="group">
      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/5 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-white mb-2">{cocktail.strDrink}</h2>
            <Link
              href={detailsUrl}
              className="inline-block text-xs md:text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all duration-300"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}