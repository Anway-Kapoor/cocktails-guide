export default async function fetchApi(action, query = '') {
  try {
    // Build the URL to your Next.js API route with proper origin
    // This ensures we have a complete URL with protocol and host
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:3000';
    
    // Create the API endpoint path
    const apiUrl = `${baseUrl}/api/cocktails?action=${encodeURIComponent(action)}`;
    
    // Add query parameter if it exists
    const urlWithQuery = query 
      ? `${apiUrl}&query=${encodeURIComponent(query)}`
      : apiUrl;
    
    const response = await fetch(urlWithQuery);
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in fetchApi:', error);
    throw error;
  }
}
