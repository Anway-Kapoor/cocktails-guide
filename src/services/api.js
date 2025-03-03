export default async function fetchApi(action, query = '') {
  try {
    // Use the CocktailDB API directly
    const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";
    
    // Determine the endpoint based on the action
    let endpoint = '';
    
    switch (action) {
      case 'search':
        endpoint = `/search.php?s=${encodeURIComponent(query || '')}`;
        break;
      case 'letter':
        endpoint = `/search.php?f=${encodeURIComponent(query || '')}`;
        break;
      case 'id':
        endpoint = `/lookup.php?i=${encodeURIComponent(query || '')}`;
        break;
      case 'random':
        endpoint = '/random.php';
        break;
      case 'ingredient':
        endpoint = `/filter.php?i=${encodeURIComponent(query || '')}`;
        break;
      default:
        throw new Error('Invalid action');
    }
    
    const apiUrl = `${BASE_URL}${endpoint}`;
    console.log("Fetching from:", apiUrl);
    
    const response = await fetch(apiUrl, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchApi:', error);
    throw error;
  }
}
