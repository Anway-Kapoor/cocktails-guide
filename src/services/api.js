const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

export async function fetchApi(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}
