import CocktailCard from "./CocktailCard";

export default function CocktailGrid({ cocktails, searchQuery = "" }) {
  // Check if cocktails is null/undefined or not an array
  if (!cocktails || !Array.isArray(cocktails) || cocktails.length === 0) {
    return <p className="text-center text-gray-500">No cocktails found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {cocktails.map((cocktail) => (
        <CocktailCard 
          key={cocktail.idDrink} 
          cocktail={cocktail} 
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}
