export default async function fetchApi(action, query = '') {
  const url = `/api/cocktails?action=${action}&query=${encodeURIComponent(query)}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}
