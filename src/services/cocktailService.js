import { fetchApi } from "./api";

export async function searchCocktails(query) {
  const data = await fetchApi(`/search.php?s=${query}`);
  return data.drinks || null;
}

export async function getRandomCocktail() {
  const data = await fetchApi("/random.php");
  return data.drinks?.[0] || null;
}

export async function getCocktailByIngredient() {
  const data = await fetchApi(`/search.php?i=${query}`);
  return data.drinks || null;
}

export async function getCocktailById(id) {
  if (!id) return null;
  const data = await fetchApi(`/lookup.php?i=${id}`);
  const drink = data.drinks?.[0];
  
  if (!drink) return null;

  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    
    if (ingredient) {
      ingredients.push(
        measure ? `${measure} ${ingredient}` : ingredient
      );
    }
  }
  
  return {
    ...drink,
    ingredients
  };
}