import CocktailDetails from '@/components/CocktailDetails';
import { getCocktailById } from '@/services/cocktailService';

export default async function CocktailPage({ params }) {
  const cocktail = await getCocktailById(params.id);

  if (!cocktail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <h1 className="text-2xl font-bold text-white">Cocktail Not Found</h1>
      </div>
    );
  }

  return (
        <CocktailDetails cocktail={cocktail} />
  );
}

export async function generateMetadata({ params }) {
  try {
    if (!params?.id) {
      return { title: "Invalid Cocktail ID" };
    }

    const cocktail = await getCocktailById(params.id);

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