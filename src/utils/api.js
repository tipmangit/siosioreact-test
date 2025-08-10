const API_BASE_URL = 'http://localhost/siosio';

export const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options.headers,
      },
    });
    
    const data = await response.json();
    if (!data.success && data.errors) {
      throw new Error(data.errors.join('\n'));
    }
    return data;
  } catch (error) {
    throw error;
  }
};