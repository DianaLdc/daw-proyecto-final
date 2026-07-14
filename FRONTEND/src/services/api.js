import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/adopciones';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
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

export const getCasosExito = async () => {
  try {
    const response = await api.get('/api/?estado=adoptado');
    return response.data.filter(a => a.estado === 'adoptado');
  } catch (error) {
    console.error('Error fetching casos de exito:', error);
    throw error;
  }
};

export const apiLogin = async (username, password) => {
  try {
    const response = await api.post('/api/login/', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiRegistro = async (username, email, password) => {
  try {
    const response = await api.post('/api/registro/', { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiSolicitarAdopcion = async (datosCompletos) => {
  try {
    const response = await api.post('/api/adopciones/solicitud/', datosCompletos);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;