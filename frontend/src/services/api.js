import axios from 'axios';

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if(token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);

export const addProduce = (data) => api.post('/farmer/add', data);
export const getProduces = () => api.get('/farmer/produces');

export const transferProduce = (data) => api.post('/distributor/transfer', data);
export const updateStock = (data) => api.post('/retailer/updateStock', data);

export const getProduceDetails = (id) => api.get(`/consumer/${id}`);

export default api;
