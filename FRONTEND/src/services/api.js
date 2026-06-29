import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/adopciones';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAnimales = async () => {
  try {
    const response = await api.get('/api/');
    return response.data;
  } catch (error) {
    console.error('Error fetching animales:', error);
    throw error;
  }
};

export default api;