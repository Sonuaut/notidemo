/**
 * Utility function to make API requests through our proxy
 * to avoid ngrok warnings
 */
export async function fetchFromApi(endpoint: string, options: RequestInit = {}) {
  console.log(`Making API request to: ${endpoint}`);
  
  try {
    // Make sure endpoint doesn't start with a slash
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    
    // Make sure we're not including the full URL in the endpoint
    const finalEndpoint = cleanEndpoint.includes('http') 
      ? cleanEndpoint.split('/api/v1/')[1] 
      : cleanEndpoint;
    
    console.log(`Cleaned endpoint: ${finalEndpoint}`);
    
    // Add ngrok-skip-browser-warning header to bypass the warning
    const headers = new Headers(options.headers || {});
    headers.append('ngrok-skip-browser-warning', '1');
    
    const updatedOptions = {
      ...options,
      headers
    };
    
    const response = await fetch(`/api/proxy/${finalEndpoint}`, updatedOptions);
    
    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      const errorData = await response.json();
      console.error('Error details:', errorData);
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";


