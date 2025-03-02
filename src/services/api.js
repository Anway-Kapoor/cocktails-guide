export default async function fetchApi(action, query = '') {
  try {
    // Build the URL to your Next.js API route with proper origin
    // This ensures we have a complete URL with protocol and host
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';
    
    console.log("Using base URL:", baseUrl);
    
    // Create the API endpoint path
    const apiUrl = `${baseUrl}/api/cocktails?action=${encodeURIComponent(action)}`;
    
    // Add query parameter if it exists
    const urlWithQuery = query 
      ? `${apiUrl}&query=${encodeURIComponent(query)}`
      : apiUrl;
    
    console.log("Fetching from:", urlWithQuery);
    
    const response = await fetch(urlWithQuery, {
      // Add cache: 'no-store' to prevent caching issues
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in fetchApi:', error);
    throw error;
  }
}
