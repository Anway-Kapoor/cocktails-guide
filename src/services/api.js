export default async function fetchApi(action, query = '') {
  try {
    
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_SITE_URL 
        ? process.env.NEXT_PUBLIC_SITE_URL
        : process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000';
    
    const apiUrl = `${baseUrl}/api/cocktails?action=${encodeURIComponent(action)}`;
    
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
