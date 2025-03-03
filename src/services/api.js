export default async function fetchApi(action, query = '') {
  try {
    // Improved base URL determination for both development and production
    let baseUrl;
    
    if (typeof window !== 'undefined') {
      // Browser environment - use the current origin
      baseUrl = window.location.origin;
    } else {
      // Server environment - determine from environment variables
      // Check for various Vercel environment variables
      if (process.env.VERCEL_URL) {
        baseUrl = `https://${process.env.VERCEL_URL}`;
      } else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
      } else if (process.env.NEXT_PUBLIC_SITE_URL) {
        // Custom environment variable you can set in your project
        baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      } else {
        // Fallback for local development
        baseUrl = 'http://localhost:3000';
      }
    }
    
    console.log("Using base URL:", baseUrl);
    console.log("Action:", action, "Query:", query);
    
    // Create the API endpoint path
    const apiUrl = `${baseUrl}/api/cocktails?action=${encodeURIComponent(action)}`;
    
    // Add query parameter if it exists
    const urlWithQuery = query 
      ? `${apiUrl}&query=${encodeURIComponent(query)}`
      : apiUrl;
    
    console.log("Fetching from:", urlWithQuery);
    
    const response = await fetch(urlWithQuery, {
      // Use no-store to prevent caching issues
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("API response received:", data ? "Data received" : "No data");
    
    return data;
  } catch (error) {
    console.error('Error in fetchApi:', error);
    throw error;
  }
}
