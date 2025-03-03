export default async function fetchApi(action, query = '') {
  try {
    // Use the Next.js API route as a proxy instead of direct API calls
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_SITE_URL 
        ? process.env.NEXT_PUBLIC_SITE_URL
        : process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000';
    
    // Create the API endpoint path to our Next.js API route
    const apiUrl = `${baseUrl}/api/cocktails?action=${encodeURIComponent(action)}`;
    
    // Add query parameter if it exists
    const urlWithQuery = query 
      ? `${apiUrl}&query=${encodeURIComponent(query)}`
      : apiUrl;
    
    console.log("Fetching from:", urlWithQuery);
    
    const response = await fetch(urlWithQuery, {
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
