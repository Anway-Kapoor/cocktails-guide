async function fetchApi(action, query = '') {
  try {
    // Ensure query is properly encoded
    const encodedQuery = encodeURIComponent(String(query).trim());
    
    // For server-side rendering, we need to use absolute URLs
    // For client-side, we can use relative URLs
    let url;
    
    if (typeof window === 'undefined') {
      // Server-side: use Node.js fetch with absolute URL
      // In production, you would use your actual domain
      url = `http://localhost:3000/api/cocktails?action=${encodeURIComponent(action)}&query=${encodedQuery}`;
    } else {
      // Client-side: can use relative URL
      url = `/api/cocktails?action=${encodeURIComponent(action)}&query=${encodedQuery}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}

export { fetchApi };
