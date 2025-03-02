import { NextResponse } from 'next/server';

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const query = searchParams.get('query');
  
  if (!action) {
    return NextResponse.json({ error: 'Action parameter is required' }, { status: 400 });
  }
  
  let endpoint = '';
  
  switch (action) {
    case 'search':
      endpoint = `/search.php?s=${query}`;
      break;
    case 'letter':
      endpoint = `/search.php?f=${query}`;
      break;
    case 'id':
      endpoint = `/lookup.php?i=${query}`;
      break;
    case 'random':
      endpoint = '/random.php';
      break;
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `API call failed: ${response.statusText}` }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from CocktailDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from CocktailDB' }, 
      { status: 500 }
    );
  }
}