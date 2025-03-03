import fetchApi from "./api";

export async function searchCocktails(query) {
  const data = await fetchApi('search', query);
  return data.drinks || null;
}

export async function getRandomCocktail() {
  const data = await fetchApi('random');
  return data.drinks?.[0] || null;
}

export async function getCocktailByIngredient(query) {
  const data = await fetchApi('ingredient', query);
  return data.drinks || null;
}

export async function getCocktailsByLetter(letter) {
  const data = await fetchApi('letter', letter);
  return data.drinks || null;
}

export async function getCocktailById(id) {
  if (!id) return null;
  
  try {
    const stringId = String(id).trim();
    console.log("Fetching cocktail with ID:", stringId); // Add logging
    
    const data = await fetchApi('id', stringId);
    
    if (!data || !data.drinks) {
      console.log("No drinks data returned from API for ID:", stringId);
      return null;
    }
    
    const drink = data.drinks[0];
    
    if (!drink) {
      console.log("No drink found in API response for ID:", stringId);
      return null;
    }

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      
      if (ingredient) {
        ingredients.push(
          measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim()
        );
      }
    }
    
    return {
      ...drink,
      ingredients
    };
  } catch (error) {
    console.error("Error fetching cocktail by ID:", error);
    return null;
  }
}