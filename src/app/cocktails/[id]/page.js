import CocktailDetails from '@/components/CocktailDetails';
import { getCocktailById } from '@/services/cocktailService';

export default async function CocktailPage({ params }) {
  try {
    
    const resolvedParams = await Promise.resolve(params);
    
    if (!resolvedParams || typeof resolvedParams.id === 'undefined') {
      console.error("Invalid params object:", resolvedParams);
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
          <h1 className="text-2xl font-bold text-white">Invalid Cocktail ID</h1>
        </div>
      );
    }
    
  
    const id = String(resolvedParams.id).trim();
    const cocktail = await getCocktailById(id);

    if (!cocktail) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
          <h1 className="text-2xl font-bold text-white">Cocktail Not Found</h1>
        </div>
      );
    }

    return <CocktailDetails cocktail={cocktail} />;
  } catch (error) {
    console.error("Error in CocktailPage:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <h1 className="text-2xl font-bold text-white">Error Loading Cocktail</h1>
      </div>
    );
  }
}

export async function generateMetadata({ params }) {
  try {
    // Convert params to a Promise and await it before accessing properties
    const resolvedParams = await Promise.resolve(params);
    
    if (!resolvedParams || typeof resolvedParams.id === 'undefined') {
      return { title: "Invalid Cocktail ID" };
    }

    const id = String(resolvedParams.id).trim();
    
    const cocktail = await getCocktailById(id);

    return {
      title: cocktail ? `${cocktail.strDrink} - Cocktail Explorer` : "Cocktail Not Found",
      description: cocktail?.strInstructions || "Cocktail details",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error Loading Cocktail",
      description: "Unable to load cocktail details",
    };
  }
}